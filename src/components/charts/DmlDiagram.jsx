import React from 'react';

export default function DmlDiagram() {
  return (
    <div className="w-full flex flex-col items-center max-w-lg mx-auto">
      <div className="w-full bg-white border border-slate-200 rounded-2xl p-3 shadow-sm">
        <svg viewBox="0 0 520 220" className="w-full h-full overflow-visible">
          {/* Confounders X: Morado Azulado / Índigo */}
          <rect x="200" y="15" width="120" height="42" rx="8" fill="#eef2ff" stroke="#4338ca" strokeWidth="1.8" />
          <text x="260" y="34" textAnchor="middle" className="text-[11px] font-bold fill-indigo-950">
            Confusores (X)
          </text>
          <text x="260" y="47" textAnchor="middle" className="text-[8px] fill-slate-600 font-medium">
            Hogar, activos, shocks
          </text>

          {/* Treatment D: Cyan Glaciar */}
          <rect x="50" y="140" width="130" height="48" rx="8" fill="#ecfeff" stroke="#0891b2" strokeWidth="1.8" />
          <text x="115" y="161" textAnchor="middle" className="text-[11px] font-bold fill-cyan-950">
            Tratamiento (D)
          </text>
          <text x="115" y="175" textAnchor="middle" className="text-[8px] fill-slate-600 font-medium">
            Identidad Interseccional
          </text>

          {/* Outcome Y: Verde Esmeralda */}
          <rect x="340" y="140" width="130" height="48" rx="8" fill="#ecfdf5" stroke="#059669" strokeWidth="1.8" />
          <text x="405" y="161" textAnchor="middle" className="text-[11px] font-bold fill-emerald-950">
            Resultado (Y)
          </text>
          <text x="405" y="175" textAnchor="middle" className="text-[8px] fill-slate-600 font-medium">
            Ocupación Laboral
          </text>

          {/* Arrows */}
          <path d="M 220 58 L 135 135" fill="none" stroke="#4338ca" strokeWidth="1.5" strokeDasharray="3 3" />
          <polygon points="130,140 142,134 136,126" fill="#4338ca" />
          <text x="150" y="90" className="text-[8px] font-mono fill-indigo-800 font-bold">
            m(X)
          </text>

          <path d="M 300 58 L 385 135" fill="none" stroke="#0891b2" strokeWidth="1.5" strokeDasharray="3 3" />
          <polygon points="390,140 384,126 378,134" fill="#0891b2" />
          <text x="350" y="90" className="text-[8px] font-mono fill-cyan-800 font-bold">
            l(X)
          </text>

          {/* Causal Arrow D -> Y */}
          <path d="M 185 164 L 332 164" fill="none" stroke="#059669" strokeWidth="2.5" />
          <polygon points="338,164 326,159 326,169" fill="#059669" />
          <text x="260" y="157" textAnchor="middle" className="text-[11px] font-mono font-bold fill-emerald-800">
            Efecto Causal &theta;
          </text>

          <rect x="180" y="185" width="160" height="22" rx="5" fill="#f0fdf4" stroke="#059669" strokeWidth="1" />
          <text x="260" y="199" textAnchor="middle" className="text-[9px] font-mono font-bold fill-emerald-900">
            Ortogonalidad de Neyman
          </text>
        </svg>
      </div>

      <div className="grid grid-cols-2 gap-2 mt-2 w-full text-xs">
        <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-2">
          <div className="text-indigo-900 font-bold text-[10px]">1. Residualización Doble</div>
          <p className="text-slate-600 text-[9px] mt-0.5">
            Predecir D con X y predecir Y con X destruye el sesgo de confusión.
          </p>
        </div>
        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-2">
          <div className="text-emerald-950 font-bold text-[10px]">2. Cross-Fitting K-Folds</div>
          <p className="text-slate-600 text-[9px] mt-0.5">
            Estimación fuera de muestra elimina el sesgo de regularización.
          </p>
        </div>
      </div>
    </div>
  );
}
