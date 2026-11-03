import React, { useState } from 'react';
import { CLUSTERS } from '../../data/paperData';

export default function ForestPlot() {
  const [activeFilter, setActiveFilter] = useState('all');

  // Collect all odds ratios
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
  const width = 600;
  const rowHeight = 36;
  const height = filteredItems.length * rowHeight + 60;
  const plotLeft = 210;
  const plotRight = width - 40;
  const plotWidth = plotRight - plotLeft;

  const getX = (val) => {
    const clamped = Math.min(Math.max(val, minVal), maxVal);
    return plotLeft + ((clamped - minVal) / (maxVal - minVal)) * plotWidth;
  };

  const xNull = getX(1.0);

  return (
    <div className="w-full flex flex-col items-center">
      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between w-full gap-2 mb-3">
        <div className="flex items-center gap-1.5 text-xs text-slate-300">
          <span className="font-semibold text-indigo-400">Filtrar por Grupo:</span>
          <select
            value={activeFilter}
            onChange={(e) => setActiveFilter(e.target.value)}
            className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
          >
            <option value="all">Todos los Clústeres (Consolidado)</option>
            {CLUSTERS.map((c) => (
              <option key={c.id} value={c.id}>
                Clúster {c.id}: {c.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-3 text-[11px] text-slate-400">
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
            Penalización (OR &lt; 1)
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
            Ventaja / Impulso (OR &gt; 1)
          </span>
        </div>
      </div>

      <div className="w-full overflow-x-auto bg-slate-950/70 border border-slate-800/80 rounded-xl p-3 shadow-inner">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full min-w-[560px]">
          {/* Header Axis */}
          <line x1={plotLeft} y1={25} x2={plotRight} y2={25} stroke="#334155" strokeWidth="1" />
          {[0.5, 0.75, 1.0, 1.25, 1.5, 2.0].map((tick) => {
            const tx = getX(tick);
            return (
              <g key={tick}>
                <line x1={tx} y1={22} x2={tx} y2={28} stroke="#64748b" strokeWidth="1" />
                <text
                  x={tx}
                  y={16}
                  textAnchor="middle"
                  className={`text-[10px] font-mono ${tick === 1.0 ? 'fill-indigo-300 font-bold' : 'fill-slate-400'}`}
                >
                  {tick.toFixed(2)}
                </text>
              </g>
            );
          })}

          {/* Reference Line at OR = 1.0 */}
          <line
            x1={xNull}
            y1={25}
            x2={xNull}
            y2={height - 20}
            stroke="#6366f1"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
          <text
            x={xNull}
            y={height - 8}
            textAnchor="middle"
            className="text-[9px] font-mono fill-indigo-400 font-bold"
          >
            Línea Base Neutra (OR = 1.0)
          </text>

          {/* Rows */}
          {filteredItems.map((item, idx) => {
            const y = 50 + idx * rowHeight;
            const xVal = getX(item.or);
            const xLow = getX(item.ciLow);
            const xHigh = getX(item.ciHigh);
            const isDisadvantage = item.or < 1.0;
            const pointColor = item.critical
              ? (isDisadvantage ? '#f43f5e' : '#10b981')
              : (item.sig ? item.clusterColor : '#94a3b8');

            return (
              <g key={`${item.clusterId}-${item.factor}-${idx}`} className="group hover:opacity-100">
                {/* Background hover highlight */}
                <rect
                  x={0}
                  y={y - 14}
                  width={width}
                  height={rowHeight - 4}
                  fill="rgba(255, 255, 255, 0.02)"
                  className="group-hover:fill-slate-800/40 rounded transition-colors"
                />

                {/* Label & Cluster */}
                <text
                  x={12}
                  y={y - 2}
                  className="text-[11px] font-medium fill-slate-200"
                >
                  {item.factor}
                </text>
                <text
                  x={12}
                  y={y + 10}
                  className="text-[9px] font-mono fill-slate-400"
                >
                  Clúster {item.clusterId} • {item.clusterName.split(' ')[0]}
                </text>

                {/* Confidence Interval Whisker */}
                <line
                  x1={xLow}
                  y1={y}
                  x2={xHigh}
                  y2={y}
                  stroke={pointColor}
                  strokeWidth="2"
                  strokeOpacity={item.sig ? 0.9 : 0.4}
                />
                {/* Whiskers End Caps */}
                <line x1={xLow} y1={y - 4} x2={xLow} y2={y + 4} stroke={pointColor} strokeWidth="1.5" />
                <line x1={xHigh} y1={y - 4} x2={xHigh} y2={y + 4} stroke={pointColor} strokeWidth="1.5" />

                {/* Point Estimate Circle or Square */}
                <circle
                  cx={xVal}
                  cy={y}
                  r={item.critical ? "5.5" : "4.5"}
                  fill={pointColor}
                  stroke="#ffffff"
                  strokeWidth="1.5"
                />

                {/* Value Text */}
                <text
                  x={width - 8}
                  y={y + 3}
                  textAnchor="end"
                  className={`text-[10px] font-mono ${item.sig ? 'font-bold fill-white' : 'fill-slate-400'}`}
                >
                  {item.or.toFixed(2)}
                  <tspan className="text-[9px] fill-slate-400"> (p={item.p < 0.001 ? '<.001' : item.p.toFixed(3)})</tspan>
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
