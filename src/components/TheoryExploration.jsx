import React, { useState } from 'react';
import { THEORETICAL_MODELS } from '../data/paperData';
import MathView from './MathView';
import { BookOpen, Code2, Cpu, ShieldCheck, Layers } from 'lucide-react';

export default function TheoryExploration() {
  const [activeModelId, setActiveModelId] = useState('k-prototypes');

  const currentModel = THEORETICAL_MODELS.find((m) => m.id === activeModelId) || THEORETICAL_MODELS[0];

  return (
    <div className="w-full flex flex-col gap-4 max-w-6xl mx-auto">
      {/* Selector Tabs: Indigo + Cyan + Emerald Triad */}
      <div className="flex flex-wrap items-center gap-1.5 border-b border-slate-200 pb-2.5">
        {THEORETICAL_MODELS.map((m, idx) => {
          const active = m.id === activeModelId;
          const activeBg = idx % 3 === 0 ? 'bg-indigo-700 border-indigo-800' : idx % 3 === 1 ? 'bg-cyan-700 border-cyan-800' : 'bg-emerald-700 border-emerald-800';
          return (
            <button
              key={m.id}
              onClick={() => setActiveModelId(m.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all border ${
                active
                  ? `${activeBg} text-white shadow-sm`
                  : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>{m.name}</span>
            </button>
          );
        })}
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Column: Equations & Axioms (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-3">
          {/* Header Card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
            <div className="flex items-center gap-1.5 mb-1">
              <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase bg-indigo-50 text-indigo-900 border border-indigo-200">
                {currentModel.badge}
              </span>
              <span className="text-[10px] text-slate-500 font-mono font-bold">Fundamento Teórico</span>
            </div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900">
              {currentModel.name}
            </h2>
            <p className="text-xs text-indigo-800 font-bold mt-0.5">
              {currentModel.subtitle}
            </p>
            <p className="text-xs text-slate-700 mt-2 leading-relaxed">
              {currentModel.whyUsed}
            </p>
          </div>

          {/* Master Equation Card */}
          <div className="bg-white border-2 border-indigo-200 rounded-2xl p-4 shadow-sm relative overflow-hidden">
            <div className="text-[10px] font-black uppercase tracking-wider text-indigo-900 mb-1 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-indigo-700" />
              Función Objetivo / Formulación Matemática
            </div>

            <div className="bg-indigo-50/50 border border-indigo-100 rounded-xl p-3 my-2 text-center overflow-x-auto">
              <MathView math={currentModel.formulaTeX} display={true} className="text-indigo-950 font-bold text-base sm:text-lg" />
            </div>

            {/* Components Breakdown */}
            <div className="mt-2 flex flex-col gap-1.5">
              <div className="text-[10px] font-black text-slate-700 uppercase">
                Términos y Parámetros:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {currentModel.components.map((comp, idx) => (
                  <div key={idx} className="bg-slate-50 border border-slate-100 rounded-lg p-2 flex flex-col gap-0.5">
                    <div className="text-xs text-indigo-900 font-mono font-black">
                      <MathView math={comp.symbol} />
                    </div>
                    <div className="text-[10px] text-slate-600 font-medium leading-tight">
                      {comp.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Validation Protocol */}
          <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-3 flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-emerald-700 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-[10px] font-black text-emerald-950 uppercase">
                Validación en el Manuscrito ENAHO 2025
              </h4>
              <p className="text-xs text-slate-700 mt-0.5 leading-relaxed">
                {currentModel.validationDetails}
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Code & Empirical Case */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          {/* Code Implementation Card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-3.5 shadow-sm flex flex-col">
            <div className="flex items-center justify-between border-b border-slate-100 pb-1.5 mb-2">
              <div className="flex items-center gap-1.5">
                <Code2 className="w-4 h-4 text-cyan-700" />
                <span className="text-xs font-black text-slate-900 uppercase">
                  Código Python 3.10
                </span>
              </div>
              <span className="text-[9px] font-mono text-cyan-700 font-bold">Reproducible</span>
            </div>

            <pre className="bg-slate-900 text-cyan-200 p-3 rounded-xl font-mono text-[10px] sm:text-[11px] overflow-x-auto leading-relaxed border border-slate-800">
              <code>{currentModel.pythonCode}</code>
            </pre>
          </div>

          {/* Empirical Findings Box */}
          <div className="bg-gradient-to-br from-indigo-50/60 via-white to-cyan-50/60 border border-indigo-200 rounded-2xl p-4 shadow-sm flex flex-col gap-2">
            <div className="flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-indigo-700" />
              <h3 className="text-xs font-black text-slate-900 uppercase">
                Evidencia Empírica en SENAJU 2026
              </h3>
            </div>

            {activeModelId === 'k-prototypes' && (
              <div className="text-xs text-slate-700 flex flex-col gap-1.5 leading-relaxed">
                <p>• Muestra representativa de <strong className="text-indigo-950 font-bold">N = 13,361</strong> jóvenes en la PEA.</p>
                <p>• Los 4 clústeres revelan que la juventud rural con lengua nativa y la juventud urbana de 18 años viven realidades ocupacionales opuestas.</p>
              </div>
            )}

            {activeModelId === 'logit' && (
              <div className="text-xs text-slate-700 flex flex-col gap-1.5 leading-relaxed">
                <p>• Brecha de género máxima en <strong className="text-cyan-800 font-bold">Clúster 2 (OR = 0.65; p &lt; 0.001)</strong>.</p>
                <p>• Retorno extraordinario a la escolaridad en <strong className="text-emerald-700 font-bold">Clúster 4 Rural (OR = 1.31, +31% por año)</strong>.</p>
              </div>
            )}

            {activeModelId === 'xgboost' && (
              <div className="text-xs text-slate-700 flex flex-col gap-1.5 leading-relaxed">
                <p>• Superioridad discriminatoria frente al Logit: <strong className="text-indigo-950 font-bold">AUC 0.785 vs 0.658 (+19.3%)</strong>.</p>
                <p>• Captura umbrales de edad crítica y cargas de cuidado que los modelos lineales subestiman.</p>
              </div>
            )}

            {activeModelId === 'treeshap' && (
              <div className="text-xs text-slate-700 flex flex-col gap-1.5 leading-relaxed">
                <p>• Ruralidad ejerce el mayor impulso individual (<strong className="text-cyan-900 font-bold">&phi; &approx; +0.18</strong>).</p>
                <p>• Ser mujer joven resta hasta <strong className="text-rose-700 font-bold">&phi; &approx; -0.19</strong> en probabilidad de empleo formal.</p>
              </div>
            )}

            {activeModelId === 'dml' && (
              <div className="text-xs text-slate-700 flex flex-col gap-1.5 leading-relaxed">
                <p>• Aislamiento del efecto causal puro con <strong className="text-indigo-950 font-bold">Ortogonalidad de Neyman</strong>.</p>
                <p>• Confirma penalización pura de <strong className="text-rose-700 font-bold">-7.4 puntos porcentuales</strong> atribuible a discriminación estructural.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
