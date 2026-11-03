import React, { useState } from 'react';
import { CLUSTERS } from '../../data/paperData';

const AXES = [
  { key: 'mujeres', label: '% Mujeres', max: 60, unit: '%' },
  { key: 'escolaridad', label: 'Escolaridad', max: 12, unit: ' a' },
  { key: 'ruralidad', label: 'Ruralidad', max: 70, unit: '%' },
  { key: 'etniaOriginaria', label: 'Etnia Indígena', max: 50, unit: '%' },
  { key: 'lenguaNativa', label: 'Lengua Nativa', max: 30, unit: '%' },
  { key: 'pobreza', label: 'Pobreza', max: 60, unit: '%' },
  { key: 'ocupacion', label: 'Ocupación', max: 100, unit: '%' }
];

export default function RadarChart({ activeClusterId = null, onSelectCluster }) {
  const [selectedCluster, setSelectedCluster] = useState(activeClusterId || null);

  const size = 360;
  const center = size / 2;
  const radius = size * 0.36;
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
    <div className="flex flex-col items-center w-full max-w-[380px] mx-auto">
      <div className="relative w-full aspect-square flex items-center justify-center bg-white rounded-2xl p-1 border border-indigo-100 shadow-sm">
        <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full overflow-visible">
          {/* Concentric Web Lines */}
          {[0.25, 0.5, 0.75, 1].map((level, idx) => (
            <polygon
              key={idx}
              points={AXES.map((axis, i) => {
                const { x, y } = getCoordinates(i, axis.max * level, axis.max);
                return `${x},${y}`;
              }).join(' ')}
              fill={level === 1 ? '#f8fafc' : 'none'}
              stroke="#cbd5e1"
              strokeWidth="1"
              strokeDasharray={level === 1 ? 'none' : '3 3'}
            />
          ))}

          {/* Axes Lines and Labels */}
          {AXES.map((axis, i) => {
            const { x, y } = getCoordinates(i, axis.max, axis.max);
            const angle = (Math.PI * 2 / totalAxes) * i - Math.PI / 2;
            const labelDist = radius + 20;
            const lx = center + labelDist * Math.cos(angle);
            const ly = center + labelDist * Math.sin(angle);

            return (
              <g key={axis.key}>
                <line
                  x1={center}
                  y1={center}
                  x2={x}
                  y2={y}
                  stroke="#e2e8f0"
                  strokeWidth="1.2"
                />
                <text
                  x={lx}
                  y={ly}
                  textAnchor="middle"
                  dominantBaseline="central"
                  className="text-[9px] sm:text-[10px] font-bold fill-slate-800"
                >
                  {axis.label}
                </text>
              </g>
            );
          })}

          {/* Cluster Polygons */}
          {CLUSTERS.map((c) => {
            const isTarget = currentActive ? currentActive === c.id : true;
            const opacity = isTarget ? 0.35 : 0.08;
            const strokeOpacity = isTarget ? 1 : 0.3;
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
                {isTarget && AXES.map((axis, i) => {
                  const val = c.metrics[axis.key];
                  const { x, y } = getCoordinates(i, val, axis.max);
                  return (
                    <circle
                      key={i}
                      cx={x}
                      cy={y}
                      r="3.5"
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

      {/* Cluster Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 mt-2 w-full">
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
              className={`px-2 py-1 rounded-lg text-[10px] sm:text-xs font-bold flex items-center justify-between transition-all border ${
                active
                  ? 'border-indigo-700 bg-indigo-700 text-white shadow-sm'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center gap-1.5 truncate">
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: active ? '#ffffff' : c.color }}
                />
                <span className="truncate">C{c.id}: {c.name.split(' ')[0]}</span>
              </div>
              <span className={`font-mono text-[9px] ${active ? 'text-indigo-100' : 'text-slate-500'}`}>
                {c.share}%
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
