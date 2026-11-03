import React, { useState } from 'react';
import { CLUSTERS } from '../../data/paperData';

const AXES = [
  { key: 'mujeres', label: '% Mujeres', max: 60, unit: '%' },
  { key: 'escolaridad', label: 'Escolaridad (años)', max: 12, unit: ' años' },
  { key: 'ruralidad', label: 'Ruralidad', max: 70, unit: '%' },
  { key: 'etniaOriginaria', label: 'Etnia Originaria', max: 50, unit: '%' },
  { key: 'lenguaNativa', label: 'Lengua Nativa', max: 30, unit: '%' },
  { key: 'pobreza', label: 'Pobreza Monetaria', max: 60, unit: '%' },
  { key: 'ocupacion', label: 'Tasa Ocupación', max: 100, unit: '%' }
];

export default function RadarChart({ activeClusterId = null, onSelectCluster }) {
  const [selectedCluster, setSelectedCluster] = useState(activeClusterId || null);

  const size = 420;
  const center = size / 2;
  const radius = size * 0.38;
  const totalAxes = AXES.length;

  const getCoordinates = (index, value, max) => {
    const angle = (Math.PI * 2 / totalAxes) * index - Math.PI / 2;
    const norm = Math.min(Math.max(value / max, 0.05), 1);
    const r = radius * norm;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return { x, y };
  };

  const currentActive = selectedCluster || activeClusterId;

  return (
    <div className="flex flex-col items-center w-full">
      <div className="relative w-full max-w-[420px] aspect-square flex items-center justify-center">
        <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full overflow-visible">
          {/* Background Concentric Webs */}
          {[0.25, 0.5, 0.75, 1].map((level, idx) => (
            <polygon
              key={idx}
              points={AXES.map((axis, i) => {
                const { x, y } = getCoordinates(i, axis.max * level, axis.max);
                return `${x},${y}`;
              }).join(' ')}
              fill="none"
              stroke="rgba(255, 255, 255, 0.07)"
              strokeWidth="1"
              strokeDasharray={level === 1 ? 'none' : '3 3'}
            />
          ))}

          {/* Axes Lines and Labels */}
          {AXES.map((axis, i) => {
            const { x, y } = getCoordinates(i, axis.max, axis.max);
            const angle = (Math.PI * 2 / totalAxes) * i - Math.PI / 2;
            const labelDist = radius + 24;
            const lx = center + labelDist * Math.cos(angle);
            const ly = center + labelDist * Math.sin(angle);

            return (
              <g key={axis.key}>
                <line
                  x1={center}
                  y1={center}
                  x2={x}
                  y2={y}
                  stroke="rgba(255, 255, 255, 0.12)"
                  strokeWidth="1"
                />
                <text
                  x={lx}
                  y={ly}
                  textAnchor="middle"
                  dominantBaseline="central"
                  className="text-[10px] sm:text-[11px] font-semibold fill-slate-300"
                >
                  {axis.label}
                </text>
              </g>
            );
          })}

          {/* Cluster Polygons */}
          {CLUSTERS.map((c) => {
            const isTarget = currentActive ? currentActive === c.id : true;
            const opacity = isTarget ? 0.35 : 0.06;
            const strokeOpacity = isTarget ? 1 : 0.2;
            const strokeWidth = isTarget ? 2.5 : 1;

            const points = AXES.map((axis, i) => {
              const val = c.metrics[axis.key];
              const { x, y } = getCoordinates(i, val, axis.max);
              return `${x},${y}`;
            }).join(' ');

            return (
              <g key={c.id} className="transition-all duration-300">
                <polygon
                  points={points}
                  fill={c.color}
                  fillOpacity={opacity}
                  stroke={c.color}
                  strokeOpacity={strokeOpacity}
                  strokeWidth={strokeWidth}
                  className="cursor-pointer hover:fill-opacity-50 transition-all"
                  onClick={() => {
                    const next = selectedCluster === c.id ? null : c.id;
                    setSelectedCluster(next);
                    if (onSelectCluster) onSelectCluster(next);
                  }}
                />
                {/* Vertex points */}
                {isTarget && AXES.map((axis, i) => {
                  const val = c.metrics[axis.key];
                  const { x, y } = getCoordinates(i, val, axis.max);
                  return (
                    <circle
                      key={i}
                      cx={x}
                      cy={y}
                      r="4"
                      fill={c.color}
                      stroke="#ffffff"
                      strokeWidth="1.5"
                    />
                  );
                })}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Cluster Switcher Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4 w-full">
        {CLUSTERS.map((c) => {
          const active = currentActive === c.id;
          return (
            <button
              key={c.id}
              onClick={() => {
                const next = currentActive === c.id ? null : c.id;
                setSelectedCluster(next);
                if (onSelectCluster) onSelectCluster(next);
              }}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all text-left border ${
                active
                  ? 'border-indigo-400 bg-indigo-950/60 text-white shadow-lg shadow-indigo-950/50'
                  : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700 hover:text-slate-200'
              }`}
            >
              <span
                className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: c.color }}
              />
              <span className="truncate">C{c.id}: {c.name.split(' ')[0]}</span>
              <span className="ml-auto text-[10px] font-mono text-slate-400">{c.share}%</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
