import React from 'react';

export default function ElbowPlot() {
  const points = [
    { k: 2, cost: 184500, label: 'k=2' },
    { k: 3, cost: 147200, label: 'k=3' },
    { k: 4, cost: 117400, label: 'k=4 (Óptimo)', isOptimal: true, drop: '-20.24%' },
    { k: 5, cost: 104100, label: 'k=5' },
    { k: 6, cost: 95800, label: 'k=6' },
  ];

  const width = 420;
  const height = 240;
  const pad = 45;
  const plotW = width - pad * 2;
  const plotH = height - pad * 2;

  const minK = 2;
  const maxK = 6;
  const minCost = 80000;
  const maxCost = 200000;

  const getX = (k) => pad + ((k - minK) / (maxK - minK)) * plotW;
  const getY = (c) => pad + (1 - (c - minCost) / (maxCost - minCost)) * plotH;

  const pathStr = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${getX(p.k)} ${getY(p.cost)}`).join(' ');

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full max-w-[420px] aspect-[16/9] bg-slate-950/70 border border-slate-800 rounded-xl p-2 shadow-inner">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
          {/* Grid lines */}
          {[100000, 140000, 180000].map((c) => {
            const y = getY(c);
            return (
              <g key={c}>
                <line x1={pad} y1={y} x2={pad + plotW} y2={y} stroke="#1e293b" strokeWidth="1" strokeDasharray="3 3" />
                <text x={pad - 6} y={y + 3} textAnchor="end" className="text-[9px] font-mono fill-slate-400">
                  {(c / 1000).toFixed(0)}k
                </text>
              </g>
            );
          })}

          {/* Elbow Curve */}
          <path d={pathStr} fill="none" stroke="#818cf8" strokeWidth="3" />

          {/* Points */}
          {points.map((p) => {
            const x = getX(p.k);
            const y = getY(p.cost);

            return (
              <g key={p.k}>
                <line x1={x} y1={pad + plotH} x2={x} y2={y} stroke="#334155" strokeWidth="1" strokeDasharray="2 2" />
                <circle
                  cx={x}
                  cy={y}
                  r={p.isOptimal ? "7" : "5"}
                  fill={p.isOptimal ? "#ec4899" : "#38bdf8"}
                  stroke="#ffffff"
                  strokeWidth="2"
                />
                <text x={x} y={pad + plotH + 16} textAnchor="middle" className="text-[10px] font-mono fill-slate-300">
                  k={p.k}
                </text>
                {p.isOptimal && (
                  <g>
                    <rect x={x - 42} y={y - 28} width="84" height="20" rx="4" fill="#831843" stroke="#f472b6" strokeWidth="1" />
                    <text x={x} y={y - 14} textAnchor="middle" className="text-[10px] font-bold fill-white">
                      Codo (-20.2%)
                    </text>
                  </g>
                )}
              </g>
            );
          })}

          {/* Labels */}
          <text x={pad + plotW / 2} y={height - 2} textAnchor="middle" className="text-[10px] font-semibold fill-slate-300">
            Número de Clústeres (k)
          </text>
          <text x={12} y={pad + plotH / 2} textAnchor="middle" transform={`rotate(-90, 12, ${pad + plotH / 2})`} className="text-[10px] font-semibold fill-slate-300">
            Inercia de Costo Mixto (E)
          </text>
        </svg>
      </div>
      <p className="text-[11px] text-slate-400 mt-2 text-center">
        Punto de inflexión óptimo en <strong className="text-pink-400">k = 4</strong>: minimiza la dispersión intra-clúster sin sobrefragmentar tipologías.
      </p>
    </div>
  );
}
