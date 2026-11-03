import React, { useState } from 'react';

export default function RocCurve() {
  const [hoverX, setHoverX] = useState(null);

  const size = 320;
  const pad = 42;
  const plotSize = size - pad * 2;

  const steps = 30;
  const logitPoints = [];
  const xgbPoints = [];

  for (let i = 0; i <= steps; i++) {
    const fpr = i / steps;
    const tprLogit = Math.min(Math.pow(fpr, 0.58) * 0.96 + fpr * 0.04, 1);
    const tprXgb = Math.min(Math.pow(fpr, 0.28) * 0.98 + fpr * 0.02, 1);

    const px = pad + fpr * plotSize;
    const pyLogit = pad + (1 - tprLogit) * plotSize;
    const pyXgb = pad + (1 - tprXgb) * plotSize;

    logitPoints.push({ fpr, tpr: tprLogit, x: px, y: pyLogit });
    xgbPoints.push({ fpr, tpr: tprXgb, x: px, y: pyXgb });
  }

  const logitPath = logitPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const xgbPath = xgbPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const diagonalPath = `M ${pad} ${pad + plotSize} L ${pad + plotSize} ${pad}`;
  const xgbArea = `${xgbPath} L ${pad + plotSize} ${pad + plotSize} L ${pad} ${pad + plotSize} Z`;

  return (
    <div className="w-full flex flex-col items-center max-w-[340px] mx-auto">
      <div className="relative w-full aspect-square flex items-center justify-center bg-white border border-slate-200 rounded-2xl p-2 shadow-sm">
        <svg
          viewBox={`0 0 ${size} ${size}`}
          className="w-full h-full overflow-visible"
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const relX = (e.clientX - rect.left) / rect.width * size;
            if (relX >= pad && relX <= pad + plotSize) {
              setHoverX(relX);
            }
          }}
          onMouseLeave={() => setHoverX(null)}
        >
          {/* Shaded Area for Gain in subtle emerald */}
          <path d={xgbArea} fill="rgba(5, 150, 105, 0.07)" />

          {/* Grid lines */}
          {[0, 0.2, 0.4, 0.6, 0.8, 1.0].map((t) => {
            const pos = pad + t * plotSize;
            return (
              <g key={t}>
                <line x1={pad} y1={pos} x2={pad + plotSize} y2={pos} stroke="#f1f5f9" strokeWidth="1" />
                <text x={pad - 5} y={pos + 3} textAnchor="end" className="text-[8px] font-mono fill-slate-500">
                  {(1 - t).toFixed(1)}
                </text>
                <line x1={pos} y1={pad} x2={pos} y2={pad + plotSize} stroke="#f1f5f9" strokeWidth="1" />
                <text x={pos} y={pad + plotSize + 12} textAnchor="middle" className="text-[8px] font-mono fill-slate-500">
                  {t.toFixed(1)}
                </text>
              </g>
            );
          })}

          <path d={diagonalPath} stroke="#cbd5e1" strokeWidth="1.2" strokeDasharray="3 3" />

          {/* Logit ROC Curve: Cyan */}
          <path d={logitPath} fill="none" stroke="#0891b2" strokeWidth="2.2" />

          {/* XGBoost ROC Curve: Morado Azulado / Índigo */}
          <path d={xgbPath} fill="none" stroke="#4338ca" strokeWidth="3" />

          {/* Axes labels */}
          <text
            x={pad + plotSize / 2}
            y={size - 2}
            textAnchor="middle"
            className="text-[9px] font-bold fill-slate-700"
          >
            Falsos Positivos (1 - Esp)
          </text>
          <text
            x={10}
            y={pad + plotSize / 2}
            textAnchor="middle"
            transform={`rotate(-90, 10, ${pad + plotSize / 2})`}
            className="text-[9px] font-bold fill-slate-700"
          >
            Sensibilidad (TPR)
          </text>

          {hoverX !== null && (() => {
            const fpr = (hoverX - pad) / plotSize;
            const tprXgb = Math.pow(fpr, 0.28) * 0.98 + fpr * 0.02;
            const pyXgb = pad + (1 - tprXgb) * plotSize;
            return (
              <circle cx={hoverX} cy={pyXgb} r="4" fill="#4338ca" stroke="#fff" strokeWidth="1.5" />
            );
          })()}
        </svg>
      </div>

      {/* Badges */}
      <div className="grid grid-cols-2 gap-2 mt-2 w-full">
        <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-1.5 flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-indigo-700 flex-shrink-0" />
          <div className="truncate">
            <div className="text-[10px] font-bold text-indigo-950">XGBoost / RF</div>
            <div className="text-[9px] text-indigo-700 font-mono font-semibold">AUC = 0.785 (+19%)</div>
          </div>
        </div>

        <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-1.5 flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-600 flex-shrink-0" />
          <div className="truncate">
            <div className="text-[10px] font-bold text-cyan-950">Logit Clásico</div>
            <div className="text-[9px] text-cyan-700 font-mono">AUC = 0.658 (Base)</div>
          </div>
        </div>
      </div>
    </div>
  );
}
