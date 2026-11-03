import React from 'react';

export default function ElbowPlot() {
  const points = [
    { k: 2, cost: 184500, label: 'k=2' },
    { k: 3, cost: 147200, label: 'k=3' },
    { k: 4, cost: 117400, label: 'k=4 (Óptimo)', isOptimal: true, drop: '-20.2%' },
    { k: 5, cost: 104100, label: 'k=5' },
    { k: 6, cost: 95800, label: 'k=6' },
  ];

  const width = 380;
  const height = 210;
  const pad = 40;
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
    <div className="w-full flex flex-col items-center max-w-[360px] mx-auto">
      <div className="w-full aspect-[16/10] bg-white border border-purple-200 rounded-2xl p-2 shadow-sm">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
          {[100000, 140000, 180000].map((c) => {
            const y = getY(c);
            return (
              <g key={c}>
                <line x1={pad} y1={y} x2={pad + plotW} y2={y} stroke="#f1f5f9" strokeWidth="1" />
                <text x={pad - 5} y={y + 3} textAnchor="end" className="text-[8px] font-mono fill-slate-400">
                  {(c / 1000).toFixed(0)}k
                </text>
              </g>
            );
          })}

          <path d={pathStr} fill="none" stroke="#7c3aed" strokeWidth="2.5" />

          {points.map((p) => {
            const x = getX(p.k);
            const y = getY(p.cost);

            return (
              <g key={p.k}>
                <line x1={x} y1={pad + plotH} x2={x} y2={y} stroke="#e2e8f0" strokeWidth="1" strokeDasharray="2 2" />
                <circle
                  cx={x}
                  cy={y}
                  r={p.isOptimal ? "6" : "4"}
                  fill={p.isOptimal ? "#ec4899" : "#7c3aed"}
                  stroke="#ffffff"
                  strokeWidth="2"
                />
                <text x={x} y={pad + plotH + 13} textAnchor="middle" className="text-[9px] font-mono font-bold fill-slate-700">
                  k={p.k}
                </text>
                {p.isOptimal && (
                  <g>
                    <rect x={x - 36} y={y - 24} width="72" height="18" rx="4" fill="#7c3aed" />
                    <text x={x} y={y - 12} textAnchor="middle" className="text-[9px] font-bold fill-white">
                      Codo -20.2%
                    </text>
                  </g>
                )}
              </g>
            );
          })}

          <text x={pad + plotW / 2} y={height - 2} textAnchor="middle" className="text-[9px] font-bold fill-slate-700">
            Número de Clústeres (k)
          </text>
          <text x={10} y={pad + plotH / 2} textAnchor="middle" transform={`rotate(-90, 10, ${pad + plotH / 2})`} className="text-[9px] font-bold fill-slate-700">
            Inercia (E)
          </text>
        </svg>
      </div>
      <p className="text-[10px] text-slate-500 mt-1.5 text-center">
        Punto óptimo en <strong className="text-purple-700 font-bold">k = 4</strong> (equilibrio de heterogeneidad).
      </p>
    </div>
  );
}
