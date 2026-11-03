import React, { useState } from 'react';
import { THEORETICAL_MODELS } from '../data/paperData';
import MathView from './MathView';
import { BookOpen, Code2, Cpu, CheckCircle2, ArrowRight, ShieldCheck, Layers, GitBranch } from 'lucide-react';

export default function TheoryExploration() {
  const [activeModelId, setActiveModelId] = useState('k-prototypes');

  const currentModel = THEORETICAL_MODELS.find((m) => m.id === activeModelId) || THEORETICAL_MODELS[0];

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Top Selector Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-3">
        {THEORETICAL_MODELS.map((m) => {
          const active = m.id === activeModelId;
          return (
            <button
              key={m.id}
              onClick={() => setActiveModelId(m.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all border ${
                active
                  ? 'bg-indigo-600 border-indigo-400 text-white shadow-lg shadow-indigo-600/30'
                  : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              <Cpu className="w-4 h-4" />
              <span>{m.name}</span>
            </button>
          );
        })}
      </div>

      {/* Main Model Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Mathematical Formulation & Components (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-5">
          {/* Header Card */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl">
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                {currentModel.badge}
              </span>
              <span className="text-xs text-slate-400 font-mono">Fundamento Axiomático</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              {currentModel.name}
            </h2>
            <p className="text-xs sm:text-sm text-indigo-300 font-medium mt-0.5">
              {currentModel.subtitle}
            </p>
            <p className="text-xs sm:text-sm text-slate-300 mt-3 leading-relaxed">
              {currentModel.whyUsed}
            </p>
          </div>

          {/* Master Equation Card */}
          <div className="bg-slate-950 border border-indigo-500/40 rounded-2xl p-5 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-400" />
              Función Objetivo / Ecuación Maestra
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 my-2 text-center overflow-x-auto">
              <MathView math={currentModel.formulaTeX} display={true} className="text-indigo-200 text-lg sm:text-xl" />
            </div>

            {/* Components Breakdown */}
            <div className="mt-4 flex flex-col gap-2">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Desglose de Términos Matemáticos:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {currentModel.components.map((comp, idx) => (
                  <div key={idx} className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-3 flex flex-col gap-1">
                    <div className="text-xs text-indigo-300 font-mono font-bold">
                      <MathView math={comp.symbol} />
                    </div>
                    <div className="text-[11px] text-slate-300 leading-tight">
                      {comp.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Validation & Diagnostics */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                Protocolo de Validación en la Investigación
              </h4>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                {currentModel.validationDetails}
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Code & Empirical Case Study (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-5">
          {/* Code Implementation Card */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 shadow-xl flex flex-col">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
              <div className="flex items-center gap-2">
                <Code2 className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  Script de Python 3.10
                </span>
              </div>
              <span className="text-[10px] font-mono text-slate-400">Reproducibilidad</span>
            </div>

            <pre className="bg-slate-900/90 text-slate-200 p-3.5 rounded-xl font-mono text-[11px] sm:text-xs overflow-x-auto leading-relaxed border border-slate-800/60">
              <code>{currentModel.pythonCode}</code>
            </pre>
          </div>

          {/* Empirical Highlights in SENAJU Paper */}
          <div className="bg-gradient-to-br from-indigo-950/50 to-purple-950/40 border border-indigo-500/30 rounded-2xl p-5 shadow-lg flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-indigo-400" />
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                Aplicación en el Manuscrito ENAHO 2025
              </h3>
            </div>

            {activeModelId === 'k-prototypes' && (
              <div className="text-xs text-slate-300 flex flex-col gap-2 leading-relaxed">
                <p>
                  • Evaluado en <strong className="text-white">N = 13,361</strong> observaciones de la PEA juvenil.
                </p>
                <p>
                  • Descubrió que los jóvenes no se dividen por categorías binarias simplistas, sino en 4 constelaciones complejas donde la etnicidad rural y la juventud temprana urbana tienen dinámicas laborales opuestas.
                </p>
              </div>
            )}

            {activeModelId === 'logit' && (
              <div className="text-xs text-slate-300 flex flex-col gap-2 leading-relaxed">
                <p>
                  • Estimó que la brecha de género es máxima en el <strong className="text-pink-300">Clúster 2 (OR = 0.65; p &lt; 0.001)</strong>, confirmando la hipótesis de desventaja formativo-laboral inicial.
                </p>
                <p>
                  • Detectó que en el <strong className="text-emerald-300">Clúster 4 (Rural)</strong> la educación formal rinde un <strong className="text-white">+31% por año (OR = 1.31)</strong> en los momios de empleo.
                </p>
              </div>
            )}

            {activeModelId === 'xgboost' && (
              <div className="text-xs text-slate-300 flex flex-col gap-2 leading-relaxed">
                <p>
                  • Superó al Logit en <strong className="text-emerald-300">+19.3% de AUC-ROC (0.785 vs 0.658)</strong>.
                </p>
                <p>
                  • Fue capaz de identificar patrones no lineales y umbrales en edades críticas (18-20 años) que los modelos lineales ignoraban.
                </p>
              </div>
            )}

            {activeModelId === 'treeshap' && (
              <div className="text-xs text-slate-300 flex flex-col gap-2 leading-relaxed">
                <p>
                  • Cuantificó que la ruralidad ejerce el mayor impulso individual positivo (<strong className="text-white">&phi; &approx; +0.18</strong>) debido a la absorción agraria.
                </p>
                <p>
                  • Demostró que ser mujer joven resta hasta <strong className="text-rose-400">&phi; &approx; -0.19</strong> a la probabilidad de estar ocupada formalmente.
                </p>
              </div>
            )}

            {activeModelId === 'dml' && (
              <div className="text-xs text-slate-300 flex flex-col gap-2 leading-relaxed">
                <p>
                  • Eliminó el sesgo de regularización generado por algoritmos de árboles, aislando el parámetro causal puro de la interseccionalidad.
                </p>
                <p>
                  • Comprobó un efecto causal neto de <strong className="text-rose-400">-7.4 puntos porcentuales</strong> atribuible exclusivamente a discriminación y segmentación estructural de mercado.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
