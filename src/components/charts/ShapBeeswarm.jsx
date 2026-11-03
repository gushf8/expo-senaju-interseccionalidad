import React, { useState } from 'react';

const SHAP_FEATURES = [
  {
    name: 'Ámbito Rural vs Urbano',
    code: 'rural',
    desc: 'Mayor tasa de absorción en autoempleo agrícola familiar',
    points: [
      { val: 0.28, featureVal: 1, color: '#f43f5e' },
      { val: 0.24, featureVal: 1, color: '#f43f5e' },
      { val: 0.20, featureVal: 1, color: '#f43f5e' },
      { val: 0.16, featureVal: 1, color: '#fb7185' },
      { val: 0.12, featureVal: 1, color: '#fb7185' },
      { val: 0.04, featureVal: 0, color: '#38bdf8' },
      { val: -0.05, featureVal: 0, color: '#38bdf8' },
      { val: -0.09, featureVal: 0, color: '#0284c7' },
      { val: -0.14, featureVal: 0, color: '#0369a1' },
    ]
  },
  {
    name: 'Edad Cumplida (15 - 29)',
    code: 'edad',
    desc: 'Mayor madurez laboral y salida de etapa formativa inicial',
    points: [
      { val: 0.22, featureVal: 28, color: '#f43f5e' },
      { val: 0.18, featureVal: 26, color: '#f43f5e' },
      { val: 0.13, featureVal: 24, color: '#fb7185' },
      { val: 0.08, featureVal: 22, color: '#e0e7ff' },
      { val: -0.04, featureVal: 19, color: '#38bdf8' },
      { val: -0.11, featureVal: 17, color: '#0284c7' },
      { val: -0.18, featureVal: 15, color: '#0369a1' },
    ]
  },
  {
    name: 'Sexo Femenino (Mujer)',
    code: 'mujer',
    desc: 'Penalización interseccional directa y segregación ocupacional',
    points: [
      { val: -0.26, featureVal: 1, color: '#f43f5e' },
      { val: -0.22, featureVal: 1, color: '#f43f5e' },
      { val: -0.18, featureVal: 1, color: '#fb7185' },
      { val: -0.13, featureVal: 1, color: '#fb7185' },
      { val: 0.08, featureVal: 0, color: '#38bdf8' },
      { val: 0.14, featureVal: 0, color: '#0284c7' },
      { val: 0.19, featureVal: 0, color: '#0369a1' },
    ]
  },
  {
    name: 'Niños < 5 años en Hogar',
    code: 'ninos',
    desc: 'Carga de cuidado no remunerado (frena mujeres, presiona varones)',
    points: [
      { val: -0.18, featureVal: 2, color: '#f43f5e' },
      { val: -0.14, featureVal: 1, color: '#fb7185' },
      { val: 0.16, featureVal: 2, color: '#f43f5e' }, // Varón presionado
      { val: 0.11, featureVal: 1, color: '#fb7185' },
      { val: 0.02, featureVal: 0, color: '#38bdf8' },
      { val: -0.02, featureVal: 0, color: '#0284c7' },
    ]
  },
  {
    name: 'Años de Escolaridad Formal',
    code: 'educ',
    desc: 'Rendimiento altamente divergente según ámbito geográfico',
    points: [
      { val: 0.19, featureVal: 16, color: '#f43f5e' },
      { val: 0.14, featureVal: 14, color: '#fb7185' },
      { val: 0.07, featureVal: 11, color: '#e0e7ff' },
      { val: -0.04, featureVal: 7, color: '#38bdf8' },
      { val: -0.13, featureVal: 3, color: '#0369a1' },
    ]
  },
  {
    name: 'Autoidentificación Originaria',
    code: 'etnia',
    desc: 'Barreras de discriminación étnica latente en urbes',
    points: [
      { val: -0.11, featureVal: 1, color: '#f43f5e' },
      { val: -0.07, featureVal: 1, color: '#fb7185' },
      { val: 0.04, featureVal: 0, color: '#38bdf8' },
      { val: 0.08, featureVal: 0, color: '#0284c7' },
    ]
  }
];

export default function ShapBeeswarm() {
  const [hoveredPoint, setHoveredPoint] = useState(null);

  const width = 620;
  const rowHeight = 44;
  const height = SHAP_FEATURES.length * rowHeight + 60;
  const plotLeft = 190;
  const plotRight = width - 40;
  const plotWidth = plotRight - plotLeft;

  const minShap = -0.32;
  const maxShap = 0.32;

  const getX = (val) => {
    return plotLeft + ((val - minShap) / (maxShap - minShap)) * plotWidth;
  };

  const xZero = getX(0.0);

  return (
    <div className="w-full flex flex-col items-center">
      {/* Top Legend */}
      <div className="flex items-center justify-between w-full max-w-[620px] mb-2 px-1 text-xs">
        <span className="text-slate-400">Impacto Direccional (Valores SHAP &phi;)</span>
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-sky-400">Valor Bajo</span>
          <div className="w-16 h-2 rounded-full bg-gradient-to-r from-sky-500 via-purple-300 to-rose-500" />
          <span className="text-[11px] text-rose-400">Valor Alto</span>
        </div>
      </div>

      <div className="w-full overflow-x-auto bg-slate-950/70 border border-slate-800 rounded-xl p-3 shadow-inner">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full min-w-[580px]">
          {/* Central Zero Line */}
          <line
            x1={xZero}
            y1={25}
            x2={xZero}
            y2={height - 20}
            stroke="#6366f1"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
          <text
            x={xZero}
            y={16}
            textAnchor="middle"
            className="text-[10px] font-mono fill-indigo-300 font-bold"
          >
            &phi; = 0 (Sin Impacto)
          </text>
          <text
            x={plotLeft + 40}
            y={16}
            textAnchor="start"
            className="text-[10px] font-mono fill-rose-400"
          >
            &larr; Reduce Probabilidad
          </text>
          <text
            x={plotRight - 40}
            y={16}
            textAnchor="end"
            className="text-[10px] font-mono fill-emerald-400"
          >
            Aumenta Probabilidad &rarr;
          </text>

          {/* Feature Rows */}
          {SHAP_FEATURES.map((feat, idx) => {
            const y = 48 + idx * rowHeight;

            return (
              <g key={feat.code}>
                {/* Background Row Highlight */}
                <rect
                  x={0}
                  y={y - 16}
                  width={width}
                  height={rowHeight - 6}
                  fill="rgba(255, 255, 255, 0.015)"
                  className="hover:fill-slate-800/30 rounded"
                />

                {/* Feature Label */}
                <text
                  x={10}
                  y={y - 2}
                  className="text-[11px] font-semibold fill-slate-200"
                >
                  {feat.name}
                </text>
                <text
                  x={10}
                  y={y + 10}
                  className="text-[9px] font-sans fill-slate-400 truncate max-w-[170px]"
                >
                  {feat.desc}
                </text>

                {/* Guide line */}
                <line
                  x1={plotLeft}
                  y1={y}
                  x2={plotRight}
                  y2={y}
                  stroke="#1e293b"
                  strokeWidth="1"
                />

                {/* SHAP Scatter Points with jitter */}
                {feat.points.map((pt, pIdx) => {
                  const px = getX(pt.val);
                  // deterministic vertical jitter
                  const jitter = ((pIdx % 3) - 1) * 5;
                  const py = y + jitter;

                  return (
                    <circle
                      key={pIdx}
                      cx={px}
                      cy={py}
                      r="5"
                      fill={pt.color}
                      fillOpacity={0.85}
                      stroke="#ffffff"
                      strokeWidth="1"
                      className="cursor-pointer hover:r-7 transition-all"
                      onMouseEnter={() => setHoveredPoint({ feat: feat.name, ...pt })}
                      onMouseLeave={() => setHoveredPoint(null)}
                    />
                  );
                })}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Hover Info Tooltip */}
      {hoveredPoint && (
        <div className="mt-2 text-xs bg-slate-900 border border-indigo-500/40 rounded-lg px-3 py-1.5 text-slate-200 flex items-center gap-3">
          <span className="font-semibold text-indigo-300">{hoveredPoint.feat}</span>
          <span className="font-mono">
            Valor SHAP &phi;: <span className={hoveredPoint.val >= 0 ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
              {hoveredPoint.val >= 0 ? `+${hoveredPoint.val.toFixed(2)}` : hoveredPoint.val.toFixed(2)}
            </span>
          </span>
          <span className="text-[11px] text-slate-400">
            (Nivel: {hoveredPoint.featureVal})
          </span>
        </div>
      )}
    </div>
  );
}
