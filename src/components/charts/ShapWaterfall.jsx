import React from 'react';

export default function ShapWaterfall({ baseValue = 0.911, contributions = [] }) {
  const width = 500;
  const rowHeight = 30;
  const height = contributions.length * rowHeight + 70;
  const plotLeft = 150;
  const plotRight = width - 30;
  const plotWidth = plotRight - plotLeft;

  const minProb = 0.4;
  const maxProb = 1.0;

  const getX = (p) => {
    const clamped = Math.min(Math.max(p, minProb), maxProb);
    return plotLeft + ((clamped - minProb) / (maxProb - minProb)) * plotWidth;
  };

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
      <div className="w-full overflow-x-auto bg-white border border-purple-200 rounded-xl p-2.5 shadow-sm">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full min-w-[460px]">
          {/* Header Axis */}
          <line x1={plotLeft} y1={20} x2={plotRight} y2={20} stroke="#cbd5e1" strokeWidth="1" />
          {[0.5, 0.6, 0.7, 0.8, 0.9, 1.0].map((tick) => {
            const tx = getX(tick);
            return (
              <g key={tick}>
                <line x1={tx} y1={17} x2={tx} y2={23} stroke="#94a3b8" strokeWidth="1" />
                <text x={tx} y={12} textAnchor="middle" className="text-[9px] font-mono fill-slate-500">
                  {(tick * 100).toFixed(0)}%
                </text>
              </g>
            );
          })}

          {/* Base Value */}
          <line
            x1={getX(baseValue)}
            y1={20}
            x2={getX(baseValue)}
            y2={height - 25}
            stroke="#94a3b8"
            strokeWidth="1"
            strokeDasharray="3 3"
          />
          <text
            x={getX(baseValue)}
            y={height - 14}
            textAnchor="middle"
            className="text-[8px] font-mono fill-slate-500 font-semibold"
          >
            Base: {(baseValue * 100).toFixed(1)}%
          </text>

          {/* Steps */}
          {steps.map((st, i) => {
            const y = 35 + i * rowHeight;
            const x1 = getX(Math.min(st.start, st.end));
            const x2 = getX(Math.max(st.start, st.end));
            const barWidth = Math.max(x2 - x1, 3);
            const isPositive = st.delta >= 0;
            const barColor = isPositive ? '#059669' : '#e11d48';

            return (
              <g key={st.name}>
                <text x={6} y={y + 10} className="text-[10px] font-bold fill-slate-800">
                  {st.name}
                </text>
                <text x={6} y={y + 20} className="text-[8px] font-mono fill-purple-700">
                  {st.featureDisplay}
                </text>

                <rect
                  x={x1}
                  y={y + 2}
                  width={barWidth}
                  height={15}
                  rx="3"
                  fill={barColor}
                  fillOpacity="0.9"
                  stroke="#ffffff"
                  strokeWidth="1"
                />

                <text
                  x={isPositive ? x2 + 4 : x1 - 4}
                  y={y + 13}
                  textAnchor={isPositive ? 'start' : 'end'}
                  className={`text-[9px] font-mono font-bold ${isPositive ? 'fill-emerald-700' : 'fill-rose-700'}`}
                >
                  {isPositive ? `+${(st.delta * 100).toFixed(1)}%` : `${(st.delta * 100).toFixed(1)}%`}
                </text>
              </g>
            );
          })}

          {/* Final Line */}
          <line
            x1={getX(finalProb)}
            y1={20}
            x2={getX(finalProb)}
            y2={height - 25}
            stroke="#7c3aed"
            strokeWidth="2"
          />
          <text
            x={getX(finalProb)}
            y={height - 4}
            textAnchor="middle"
            className="text-[10px] font-mono font-black fill-purple-900"
          >
            f(x) = {(finalProb * 100).toFixed(1)}%
          </text>
        </svg>
      </div>

      <div className="flex items-center justify-between w-full mt-1.5 px-2 text-[11px]">
        <span className="text-slate-600">
          Tasa Base: <strong className="text-slate-900">91.1%</strong>
        </span>
        <span className="text-slate-600">
          Predicción: <strong className="text-purple-700 font-mono text-xs">{(finalProb * 100).toFixed(1)}%</strong>
        </span>
      </div>
    </div>
  );
}
