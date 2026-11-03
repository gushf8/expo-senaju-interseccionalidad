import React, { useState } from 'react';

export default function RocCurve() {
  const [hoverX, setHoverX] = useState(null);

  const size = 380;
  const pad = 50;
  const plotSize = size - pad * 2;

  // Generate realistic smooth ROC points
  // Chance: y = x
  // Logit (AUC ~ 0.658): y = x^0.55
  // XGBoost (AUC ~ 0.785): y = x^0.28
  const steps = 40;
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

  // Fill areas
  const xgbArea = `${xgbPath} L ${pad + plotSize} ${pad + plotSize} L ${pad} ${pad + plotSize} Z`;

  return (
    <div className="w-full flex flex-col items-center">
      <div className="relative w-full max-w-[380px] aspect-square flex items-center justify-center bg-slate-950/70 border border-slate-800 rounded-xl p-2 shadow-inner">
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
          {/* Shaded Area for XGBoost Gain */}
          <path d={xgbArea} fill="rgba(16, 185, 129, 0.12)" />

          {/* Grid lines */}
          {[0, 0.2, 0.4, 0.6, 0.8, 1.0].map((t) => {
            const pos = pad + t * plotSize;
            return (
              <g key={t}>
                {/* Horizontal */}
                <line x1={pad} y1={pos} x2={pad + plotSize} y2={pos} stroke="#1e293b" strokeWidth="1" strokeDasharray="3 3" />
                <text x={pad - 8} y={pos + 4} textAnchor="end" className="text-[10px] font-mono fill-slate-400">
                  {(1 - t).toFixed(1)}
                </text>
                {/* Vertical */}
                <line x1={pos} y1={pad} x2={pos} y2={pad + plotSize} stroke="#1e293b" strokeWidth="1" strokeDasharray="3 3" />
                <text x={pos} y={pad + plotSize + 16} textAnchor="middle" className="text-[10px] font-mono fill-slate-400">
                  {t.toFixed(1)}
                </text>
              </g>
            );
          })}

          {/* Diagonal Chance Line */}
          <path d={diagonalPath} stroke="#64748b" strokeWidth="1.5" strokeDasharray="4 4" />

          {/* Logit ROC Curve */}
          <path d={logitPath} fill="none" stroke="#38bdf8" strokeWidth="2.5" />

          {/* XGBoost ROC Curve */}
          <path d={xgbPath} fill="none" stroke="#10b981" strokeWidth="3" />

          {/* Axes labels */}
          <text
            x={pad + plotSize / 2}
            y={size - 4}
            textAnchor="middle"
            className="text-[11px] font-semibold fill-slate-300"
          >
            Tasa de Falsos Positivos (1 - Especificidad)
          </text>
          <text
            x={14}
            y={pad + plotSize / 2}
            textAnchor="middle"
            transform={`rotate(-90, 14, ${pad + plotSize / 2})`}
            className="text-[11px] font-semibold fill-slate-300"
          >
            Sensibilidad (True Positive Rate)
          </text>

          {/* Interactive Hover Point */}
          {hoverX !== null && (() => {
            const fpr = (hoverX - pad) / plotSize;
            const tprLogit = Math.pow(fpr, 0.58) * 0.96 + fpr * 0.04;
            const tprXgb = Math.pow(fpr, 0.28) * 0.98 + fpr * 0.02;
            const pyLogit = pad + (1 - tprLogit) * plotSize;
            const pyXgb = pad + (1 - tprXgb) * plotSize;

            return (
              <g>
                <line x1={hoverX} y1={pad} x2={hoverX} y2={pad + plotSize} stroke="#818cf8" strokeWidth="1" strokeDasharray="2 2" />
                <circle cx={hoverX} cy={pyLogit} r="4" fill="#38bdf8" stroke="#fff" strokeWidth="1.5" />
                <circle cx={hoverX} cy={pyXgb} r="5" fill="#10b981" stroke="#fff" strokeWidth="2" />
              </g>
            );
          })()}
        </svg>
      </div>

      {/* Legend & AUC Comparison */}
      <div className="grid grid-cols-2 gap-3 mt-3 w-full max-w-[380px]">
        <div className="bg-emerald-950/40 border border-emerald-500/30 rounded-lg p-2.5 flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-emerald-400 flex-shrink-0" />
          <div className="overflow-hidden">
            <div className="text-xs font-bold text-emerald-200">XGBoost / RF</div>
            <div className="text-[10px] text-slate-300 font-mono">AUC = 0.785 (+19.3%)</div>
          </div>
        </div>

        <div className="bg-sky-950/40 border border-sky-500/30 rounded-lg p-2.5 flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-sky-400 flex-shrink-0" />
          <div className="overflow-hidden">
            <div className="text-xs font-bold text-sky-200">Logit Multivariado</div>
            <div className="text-[10px] text-slate-300 font-mono">AUC = 0.658 (Base)</div>
          </div>
        </div>
      </div>
    </div>
  );
}
