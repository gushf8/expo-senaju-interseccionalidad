import React from 'react';

export default function ShapWaterfall({ baseValue = 0.911, contributions = [] }) {
  // contributions: [{ name, val, impact, featureDisplay }]
  const width = 540;
  const rowHeight = 34;
  const height = contributions.length * rowHeight + 90;
  const plotLeft = 160;
  const plotRight = width - 40;
  const plotWidth = plotRight - plotLeft;

  const minProb = 0.4;
  const maxProb = 1.0;

  const getX = (p) => {
    const clamped = Math.min(Math.max(p, minProb), maxProb);
    return plotLeft + ((clamped - minProb) / (maxProb - minProb)) * plotWidth;
  };

  // Calculate cumulative steps
  let current = baseValue;
  const steps = contributions.map((item) => {
    const start = current;
    const end = Math.min(Math.max(current + item.impact, 0.05), 0.999);
    current = end;
    return {
      ...item,
      start,
      end,
      delta: item.impact
    };
  });

  const finalProb = current;

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full overflow-x-auto bg-slate-950/80 border border-slate-800 rounded-xl p-3 shadow-inner">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full min-w-[500px]">
          {/* Header Axis */}
          <line x1={plotLeft} y1={25} x2={plotRight} y2={25} stroke="#334155" strokeWidth="1" />
          {[0.5, 0.6, 0.7, 0.8, 0.9, 1.0].map((tick) => {
            const tx = getX(tick);
            return (
              <g key={tick}>
                <line x1={tx} y1={22} x2={tx} y2={28} stroke="#64748b" strokeWidth="1" />
                <text x={tx} y={16} textAnchor="middle" className="text-[10px] font-mono fill-slate-400">
                  {(tick * 100).toFixed(0)}%
                </text>
              </g>
            );
          })}

          {/* Base Value Line */}
          <line
            x1={getX(baseValue)}
            y1={25}
            x2={getX(baseValue)}
            y2={height - 35}
            stroke="#94a3b8"
            strokeWidth="1"
            strokeDasharray="3 3"
          />
          <text
            x={getX(baseValue)}
            y={height - 22}
            textAnchor="middle"
            className="text-[9px] font-mono fill-slate-400"
          >
            E[f(X)] = {(baseValue * 100).toFixed(1)}%
          </text>

          {/* Waterfall Bars */}
          {steps.map((st, i) => {
            const y = 45 + i * rowHeight;
            const x1 = getX(Math.min(st.start, st.end));
            const x2 = getX(Math.max(st.start, st.end));
            const barWidth = Math.max(x2 - x1, 3);
            const isPositive = st.delta >= 0;
            const barColor = isPositive ? '#10b981' : '#f43f5e';

            return (
              <g key={st.name}>
                {/* Feature Label */}
                <text x={10} y={y + 12} className="text-[11px] font-semibold fill-slate-200">
                  {st.name}
                </text>
                <text x={10} y={y + 24} className="text-[9px] font-mono fill-slate-400">
                  {st.featureDisplay}
                </text>

                {/* Bar */}
                <rect
                  x={x1}
                  y={y + 2}
                  width={barWidth}
                  height={18}
                  rx="3"
                  fill={barColor}
                  fillOpacity="0.85"
                  stroke="#ffffff"
                  strokeWidth="1"
                />

                {/* Delta text on bar */}
                <text
                  x={isPositive ? x2 + 6 : x1 - 6}
                  y={y + 15}
                  textAnchor={isPositive ? 'start' : 'end'}
                  className={`text-[10px] font-mono font-bold ${isPositive ? 'fill-emerald-300' : 'fill-rose-300'}`}
                >
                  {isPositive ? `+${(st.delta * 100).toFixed(1)}%` : `${(st.delta * 100).toFixed(1)}%`}
                </text>
              </g>
            );
          })}

          {/* Final Prediction Line */}
          <line
            x1={getX(finalProb)}
            y1={25}
            x2={getX(finalProb)}
            y2={height - 35}
            stroke="#ec4899"
            strokeWidth="2"
          />
          <text
            x={getX(finalProb)}
            y={height - 8}
            textAnchor="middle"
            className="text-[11px] font-mono font-bold fill-pink-400"
          >
            f(x) = {(finalProb * 100).toFixed(1)}%
          </text>
        </svg>
      </div>

      <div className="flex items-center justify-between w-full mt-2 px-2 text-xs">
        <span className="text-slate-400">
          Tasa Base PEA Juvenil: <strong className="text-slate-200">91.1%</strong>
        </span>
        <span className="text-slate-400">
          Probabilidad Calibrada Final: <strong className="text-pink-400 font-mono text-sm">{(finalProb * 100).toFixed(1)}%</strong>
        </span>
      </div>
    </div>
  );
}
