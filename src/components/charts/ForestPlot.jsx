import React, { useState } from 'react';
import { CLUSTERS } from '../../data/paperData';

export default function ForestPlot() {
  const [activeFilter, setActiveFilter] = useState('all');

  const items = CLUSTERS.flatMap((c) =>
    c.oddsRatios.map((item) => ({
      ...item,
      clusterId: c.id,
      clusterName: c.name,
      clusterColor: c.color
    }))
  );

  const filteredItems = activeFilter === 'all'
    ? items
    : items.filter((it) => it.clusterId === Number(activeFilter));

  const minVal = 0.4;
  const maxVal = 2.2;
  const width = 560;
  const rowHeight = 32;
  const height = filteredItems.length * rowHeight + 50;
  const plotLeft = 190;
  const plotRight = width - 35;
  const plotWidth = plotRight - plotLeft;

  const getX = (val) => {
    const clamped = Math.min(Math.max(val, minVal), maxVal);
    return plotLeft + ((clamped - minVal) / (maxVal - minVal)) * plotWidth;
  };

  const xNull = getX(1.0);

  return (
    <div className="w-full flex flex-col items-center max-w-xl mx-auto">
      {/* Minimal Top Bar */}
      <div className="flex items-center justify-between w-full gap-2 mb-2 px-1 text-[11px]">
        <div className="flex items-center gap-1.5 text-slate-700">
          <span className="font-bold text-indigo-700">Grupo:</span>
          <select
            value={activeFilter}
            onChange={(e) => setActiveFilter(e.target.value)}
            className="bg-indigo-50 border border-indigo-200 rounded-lg px-2 py-0.5 text-[11px] font-semibold text-indigo-900 focus:outline-none"
          >
            <option value="all">Todos los Clústeres</option>
            {CLUSTERS.map((c) => (
              <option key={c.id} value={c.id}>
                C{c.id}: {c.name.split(' ')[0]}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-3 text-[10px] text-slate-600 font-semibold">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-cyan-600 inline-block" />
            Penalización (&lt;1)
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-600 inline-block" />
            Impulso (&gt;1)
          </span>
        </div>
      </div>

      <div className="w-full overflow-x-auto bg-white border border-slate-200 rounded-xl p-2.5 shadow-sm">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full min-w-[500px]">
          {/* Header Axis */}
          <line x1={plotLeft} y1={22} x2={plotRight} y2={22} stroke="#cbd5e1" strokeWidth="1" />
          {[0.5, 0.75, 1.0, 1.25, 1.5, 2.0].map((tick) => {
            const tx = getX(tick);
            return (
              <g key={tick}>
                <line x1={tx} y1={19} x2={tx} y2={25} stroke="#94a3b8" strokeWidth="1" />
                <text
                  x={tx}
                  y={14}
                  textAnchor="middle"
                  className={`text-[9px] font-mono ${tick === 1.0 ? 'fill-indigo-700 font-black' : 'fill-slate-500'}`}
                >
                  {tick.toFixed(2)}
                </text>
              </g>
            );
          })}

          {/* Neutral Baseline */}
          <line
            x1={xNull}
            y1={22}
            x2={xNull}
            y2={height - 18}
            stroke="#4338ca"
            strokeWidth="1.5"
            strokeDasharray="3 3"
          />
          <text
            x={xNull}
            y={height - 6}
            textAnchor="middle"
            className="text-[8px] font-mono fill-indigo-700 font-bold"
          >
            Base (OR=1.0)
          </text>

          {/* Rows */}
          {filteredItems.map((item, idx) => {
            const y = 42 + idx * rowHeight;
            const xVal = getX(item.or);
            const xLow = getX(item.ciLow);
            const xHigh = getX(item.ciHigh);
            const isDisadvantage = item.or < 1.0;
            const pointColor = item.critical
              ? (isDisadvantage ? '#0891b2' : '#059669')
              : (item.sig ? item.clusterColor : '#64748b');

            return (
              <g key={`${item.clusterId}-${item.factor}-${idx}`}>
                <rect
                  x={0}
                  y={y - 12}
                  width={width}
                  height={rowHeight - 3}
                  fill={idx % 2 === 0 ? '#f8fafc' : '#ffffff'}
                  className="rounded"
                />

                <text x={8} y={y - 1} className="text-[10px] font-bold fill-slate-800">
                  {item.factor}
                </text>
                <text x={8} y={y + 10} className="text-[8px] font-mono fill-indigo-700">
                  C{item.clusterId} • {item.clusterName.split(' ')[0]}
                </text>

                <line
                  x1={xLow}
                  y1={y}
                  x2={xHigh}
                  y2={y}
                  stroke={pointColor}
                  strokeWidth="2"
                  strokeOpacity={item.sig ? 0.9 : 0.4}
                />
                <line x1={xLow} y1={y - 3} x2={xLow} y2={y + 3} stroke={pointColor} strokeWidth="1.5" />
                <line x1={xHigh} y1={y - 3} x2={xHigh} y2={y + 3} stroke={pointColor} strokeWidth="1.5" />

                <circle
                  cx={xVal}
                  cy={y}
                  r={item.critical ? "4.5" : "3.5"}
                  fill={pointColor}
                  stroke="#ffffff"
                  strokeWidth="1.2"
                />

                <text
                  x={width - 5}
                  y={y + 3}
                  textAnchor="end"
                  className={`text-[9px] font-mono ${item.sig ? 'font-bold fill-slate-900' : 'fill-slate-500'}`}
                >
                  {item.or.toFixed(2)}
                  <tspan className="text-[8px] fill-slate-500"> (p={item.p < 0.001 ? '<.001' : item.p.toFixed(3)})</tspan>
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
