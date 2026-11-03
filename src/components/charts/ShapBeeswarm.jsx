import React, { useState } from 'react';

const SHAP_FEATURES = [
  {
    name: 'Ámbito Rural vs Urbano',
    code: 'rural',
    desc: 'Mayor autoempleo agrícola familiar',
    points: [
      { val: 0.28, featureVal: 1, color: '#e11d48' },
      { val: 0.22, featureVal: 1, color: '#e11d48' },
      { val: 0.16, featureVal: 1, color: '#f43f5e' },
      { val: 0.08, featureVal: 0, color: '#c084fc' },
      { val: -0.05, featureVal: 0, color: '#7c3aed' },
      { val: -0.12, featureVal: 0, color: '#581c87' },
    ]
  },
  {
    name: 'Edad (15 - 29 años)',
    code: 'edad',
    desc: 'Superación de transición formativa temprana',
    points: [
      { val: 0.20, featureVal: 28, color: '#e11d48' },
      { val: 0.14, featureVal: 25, color: '#f43f5e' },
      { val: 0.06, featureVal: 22, color: '#c084fc' },
      { val: -0.06, featureVal: 19, color: '#7c3aed' },
      { val: -0.16, featureVal: 16, color: '#581c87' },
    ]
  },
  {
    name: 'Sexo Femenino (Mujer)',
    code: 'mujer',
    desc: 'Penalización interseccional directa',
    points: [
      { val: -0.24, featureVal: 1, color: '#e11d48' },
      { val: -0.18, featureVal: 1, color: '#e11d48' },
      { val: -0.12, featureVal: 1, color: '#f43f5e' },
      { val: 0.08, featureVal: 0, color: '#7c3aed' },
      { val: 0.16, featureVal: 0, color: '#581c87' },
    ]
  },
  {
    name: 'Niños < 5 años (Cuidado)',
    code: 'ninos',
    desc: 'Frena mujeres, presiona varones',
    points: [
      { val: -0.18, featureVal: 2, color: '#e11d48' },
      { val: -0.12, featureVal: 1, color: '#f43f5e' },
      { val: 0.14, featureVal: 2, color: '#e11d48' },
      { val: 0.08, featureVal: 1, color: '#f43f5e' },
      { val: -0.02, featureVal: 0, color: '#7c3aed' },
    ]
  },
  {
    name: 'Años Escolaridad',
    code: 'educ',
    desc: 'Retornos heterogéneos según territorio',
    points: [
      { val: 0.18, featureVal: 16, color: '#e11d48' },
      { val: 0.11, featureVal: 13, color: '#f43f5e' },
      { val: 0.04, featureVal: 11, color: '#c084fc' },
      { val: -0.08, featureVal: 6, color: '#581c87' },
    ]
  }
];

export default function ShapBeeswarm() {
  const [hoveredPoint, setHoveredPoint] = useState(null);

  const width = 560;
  const rowHeight = 36;
  const height = SHAP_FEATURES.length * rowHeight + 50;
  const plotLeft = 175;
  const plotRight = width - 30;
  const plotWidth = plotRight - plotLeft;

  const minShap = -0.30;
  const maxShap = 0.30;

  const getX = (val) => plotLeft + ((val - minShap) / (maxShap - minShap)) * plotWidth;
  const xZero = getX(0.0);

  return (
    <div className="w-full flex flex-col items-center max-w-xl mx-auto">
      {/* Legend */}
      <div className="flex items-center justify-between w-full mb-1.5 px-1 text-[11px]">
        <span className="text-slate-600 font-semibold">Impacto Direccional (TreeSHAP &phi;)</span>
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] text-purple-700 font-bold">Bajo</span>
          <div className="w-12 h-1.5 rounded-full bg-gradient-to-r from-purple-700 via-pink-400 to-rose-600" />
          <span className="text-[10px] text-rose-600 font-bold">Alto</span>
        </div>
      </div>

      <div className="w-full overflow-x-auto bg-white border border-purple-200 rounded-xl p-2.5 shadow-sm">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full min-w-[500px]">
          {/* Zero line */}
          <line x1={xZero} y1={20} x2={xZero} y2={height - 15} stroke="#7c3aed" strokeWidth="1.5" strokeDasharray="3 3" />
          <text x={xZero} y={13} textAnchor="middle" className="text-[9px] font-mono fill-purple-700 font-black">
            &phi; = 0
          </text>
          <text x={plotLeft + 30} y={13} textAnchor="start" className="text-[9px] font-mono fill-rose-600 font-bold">
            &larr; Penaliza
          </text>
          <text x={plotRight - 30} y={13} textAnchor="end" className="text-[9px] font-mono fill-emerald-600 font-bold">
            Favorece &rarr;
          </text>

          {/* Rows */}
          {SHAP_FEATURES.map((feat, idx) => {
            const y = 38 + idx * rowHeight;
            return (
              <g key={feat.code}>
                <rect x={0} y={y - 12} width={width} height={rowHeight - 3} fill={idx % 2 === 0 ? '#faf5ff' : '#ffffff'} className="rounded" />
                <text x={8} y={y - 1} className="text-[10px] font-bold fill-slate-800">
                  {feat.name}
                </text>
                <text x={8} y={y + 10} className="text-[8px] font-sans fill-slate-500">
                  {feat.desc}
                </text>
                <line x1={plotLeft} y1={y} x2={plotRight} y2={y} stroke="#f1f5f9" strokeWidth="1" />

                {feat.points.map((pt, pIdx) => {
                  const px = getX(pt.val);
                  const jitter = ((pIdx % 3) - 1) * 3;
                  return (
                    <circle
                      key={pIdx}
                      cx={px}
                      cy={y + jitter}
                      r="4"
                      fill={pt.color}
                      stroke="#ffffff"
                      strokeWidth="1"
                      className="cursor-pointer"
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

      {hoveredPoint && (
        <div className="mt-1 text-[11px] bg-purple-50 border border-purple-300 rounded-lg px-2.5 py-1 text-slate-800 flex items-center gap-2">
          <strong className="text-purple-900">{hoveredPoint.feat}:</strong>
          <span className="font-mono">
            &phi; = <strong className={hoveredPoint.val >= 0 ? 'text-emerald-700' : 'text-rose-700'}>
              {hoveredPoint.val >= 0 ? `+${hoveredPoint.val.toFixed(2)}` : hoveredPoint.val.toFixed(2)}
            </strong>
          </span>
        </div>
      )}
    </div>
  );
}
