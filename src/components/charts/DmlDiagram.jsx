import React from 'react';

export default function DmlDiagram() {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full max-w-[540px] bg-slate-950/80 border border-slate-800 rounded-xl p-4 shadow-inner">
        <svg viewBox="0 0 520 250" className="w-full h-full overflow-visible">
          {/* Confounders X */}
          <rect x="200" y="20" width="120" height="48" rx="8" fill="#1e1b4b" stroke="#818cf8" strokeWidth="2" />
          <text x="260" y="42" textAnchor="middle" className="text-[12px] font-bold fill-indigo-200">
            Confusores (X)
          </text>
          <text x="260" y="56" textAnchor="middle" className="text-[9px] fill-slate-300">
            Hogar, activos, shocks
          </text>

          {/* Treatment D */}
          <rect x="50" y="160" width="130" height="55" rx="8" fill="#311042" stroke="#ec4899" strokeWidth="2" />
          <text x="115" y="184" textAnchor="middle" className="text-[12px] font-bold fill-pink-200">
            Tratamiento (D)
          </text>
          <text x="115" y="200" textAnchor="middle" className="text-[9px] fill-slate-300">
            Identidad Interseccional
          </text>

          {/* Outcome Y */}
          <rect x="340" y="160" width="130" height="55" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
          <text x="405" y="184" textAnchor="middle" className="text-[12px] font-bold fill-emerald-200">
            Resultado (Y)
          </text>
          <text x="405" y="200" textAnchor="middle" className="text-[9px] fill-slate-300">
            Ocupación Laboral
          </text>

          {/* Arrows from X to D and Y */}
          {/* X -> D */}
          <path d="M 220 68 L 135 155" fill="none" stroke="#818cf8" strokeWidth="2" strokeDasharray="4 4" />
          <polygon points="130,160 142,154 136,146" fill="#818cf8" />
          <text x="150" y="105" className="text-[9px] font-mono fill-indigo-300">
            m_0(X) = E[D|X]
          </text>

          {/* X -> Y */}
          <path d="M 300 68 L 385 155" fill="none" stroke="#818cf8" strokeWidth="2" strokeDasharray="4 4" />
          <polygon points="390,160 384,146 378,154" fill="#818cf8" />
          <text x="350" y="105" className="text-[9px] font-mono fill-indigo-300">
            l_0(X) = E[Y|X]
          </text>

          {/* Causal Arrow D -> Y */}
          <path d="M 185 187 L 332 187" fill="none" stroke="#f59e0b" strokeWidth="3" />
          <polygon points="338,187 326,181 326,193" fill="#f59e0b" />
          <text x="260" y="180" textAnchor="middle" className="text-[12px] font-mono font-bold fill-amber-300">
            Efecto Causal &theta;_0
          </text>

          {/* Residual Orthogonalization Tag */}
          <rect x="180" y="210" width="160" height="26" rx="6" fill="#0f172a" stroke="#f59e0b" strokeWidth="1" />
          <text x="260" y="227" textAnchor="middle" className="text-[10px] font-mono font-semibold fill-amber-300">
            Ortogonalidad de Neyman
          </text>
        </svg>
      </div>

      <div className="grid grid-cols-2 gap-3 mt-3 w-full max-w-[540px] text-xs">
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-2.5">
          <div className="text-pink-300 font-semibold mb-1">1. Residualización Doble</div>
          <p className="text-slate-400 text-[11px]">
            Se predice D con X (residuos V) y se predice Y con X (residuos U) usando Random Forest o XGBoost.
          </p>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-2.5">
          <div className="text-emerald-300 font-semibold mb-1">2. Cross-Fitting (K Folds)</div>
          <p className="text-slate-400 text-[11px]">
            La regresión de U sobre V se hace fuera de muestra, destruyendo el sesgo de regularización paramétrica.
          </p>
        </div>
      </div>
    </div>
  );
}
