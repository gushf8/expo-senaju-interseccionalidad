import React from 'react';
import { SLIDES_DATA, PAPER_METADATA } from '../data/paperData';
import RadarChart from './charts/RadarChart';
import ForestPlot from './charts/ForestPlot';
import RocCurve from './charts/RocCurve';
import ShapBeeswarm from './charts/ShapBeeswarm';
import ElbowPlot from './charts/ElbowPlot';
import DmlDiagram from './charts/DmlDiagram';
import MathView from './MathView';
import { Award, CheckCircle2, TrendingUp, Users, ArrowRight, ShieldAlert, Sparkles, AlertCircle } from 'lucide-react';

export default function SlideViewer({ currentSlideIndex = 0 }) {
  const slide = SLIDES_DATA[currentSlideIndex] || SLIDES_DATA[0];

  return (
    <div className="w-full flex flex-col items-center justify-center">
      {/* 16:9 Slide Canvas */}
      <div className="w-full max-w-6xl aspect-[16/9] min-h-[500px] sm:min-h-[580px] bg-gradient-to-br from-slate-950 via-[#0a0f1d] to-[#0c1427] border border-slate-800/90 rounded-2xl sm:rounded-3xl p-6 sm:p-10 shadow-2xl flex flex-col justify-between relative overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute -top-24 -left-24 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header of the Slide */}
        <div className="relative z-10 flex items-start justify-between gap-4 border-b border-slate-800/60 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold tracking-wider uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                {slide.category}
              </span>
              <span className="text-[11px] font-mono text-slate-400">
                DIAPOSITIVA {slide.id} DE {SLIDES_DATA.length}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight leading-snug">
              {slide.title}
            </h1>
            <p className="text-xs sm:text-sm text-indigo-300/90 font-medium mt-0.5">
              {slide.subtitle}
            </p>
          </div>

          {/* Institutional Badge */}
          <div className="hidden sm:flex flex-col items-end flex-shrink-0">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              SENAJU • PREMIO 2026
            </span>
            <span className="text-xs font-semibold text-slate-200">
              Gustavo Fernando Huamán F.
            </span>
          </div>
        </div>

        {/* Slide Body: Dual Column (Takeaways vs Visuals) */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 my-auto py-3 items-center">
          {/* Left Column: Bulleted Insights (6 or 5 cols) */}
          <div className="md:col-span-5 flex flex-col gap-3">
            {slide.id === 1 ? (
              // Special Cover Slide Presentation
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-600/30 border border-indigo-500/50 flex items-center justify-center text-indigo-300 shadow-lg shadow-indigo-600/20">
                    <Award className="w-7 h-7" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                      Investigación Ganadora Oficial
                    </div>
                    <div className="text-sm font-extrabold text-white">
                      Premio Nacional de las Juventudes 2026
                    </div>
                  </div>
                </div>

                <div className="space-y-2 mt-2">
                  {slide.takeaways.map((point, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed">
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 flex-shrink-0 mt-2" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              // Standard Slide Insights
              <div className="space-y-3">
                {slide.takeaways.map((point, idx) => (
                  <div
                    key={idx}
                    className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-3 flex items-start gap-3 shadow-sm hover:border-slate-700 transition-colors"
                  >
                    <CheckCircle2 className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                      {point}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: High-Impact Visual / Interactive Component (7 cols) */}
          <div className="md:col-span-7 flex flex-col items-center justify-center w-full">
            {/* Visual Switching by slide.chartType */}
            {slide.chartType === 'clusterRadar' && <RadarChart />}
            {slide.chartType === 'forestPlot' && <ForestPlot />}
            {slide.chartType === 'rocComparison' && <RocCurve />}
            {slide.chartType === 'shapBeeswarm' && <ShapBeeswarm />}
            {slide.chartType === 'elbowPlot' && <ElbowPlot />}
            {slide.chartType === 'dmlConcept' && <DmlDiagram />}

            {/* Special Visual: 91.1% Paradox */}
            {slide.chartType === 'paradoxSummary' && (
              <div className="grid grid-cols-2 gap-3 w-full max-w-lg">
                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
                  <div className="text-[10px] font-bold uppercase text-slate-400">
                    Ocupación Aparente (INEI)
                  </div>
                  <div className="text-3xl font-black text-emerald-400 font-mono my-2">
                    91.1%
                  </div>
                  <p className="text-[11px] text-slate-300">
                    Incluye trabajadores de subsistencia no remunerados en agricultura familiar y comercio informal.
                  </p>
                </div>

                <div className="bg-rose-950/40 border border-rose-500/30 rounded-xl p-4 flex flex-col justify-between">
                  <div className="text-[10px] font-bold uppercase text-rose-300">
                    Tasa de Informalidad Real
                  </div>
                  <div className="text-3xl font-black text-rose-400 font-mono my-2">
                    76.4%
                  </div>
                  <p className="text-[11px] text-slate-300">
                    Juventud empleada sin contrato, sin seguro de salud, ni aportes previsionales.
                  </p>
                </div>

                <div className="bg-amber-950/40 border border-amber-500/30 rounded-xl p-4 flex flex-col justify-between">
                  <div className="text-[10px] font-bold uppercase text-amber-300">
                    Población NiNi
                  </div>
                  <div className="text-3xl font-black text-amber-400 font-mono my-2">
                    18.2%
                  </div>
                  <p className="text-[11px] text-slate-300">
                    Jóvenes que no estudian ni trabajan; 67% son mujeres dedicadas al cuidado doméstico.
                  </p>
                </div>

                <div className="bg-indigo-950/40 border border-indigo-500/30 rounded-xl p-4 flex flex-col justify-between">
                  <div className="text-[10px] font-bold uppercase text-indigo-300">
                    Carga no Remunerada
                  </div>
                  <div className="text-3xl font-black text-indigo-400 font-mono my-2">
                    2.8x
                  </div>
                  <p className="text-[11px] text-slate-300">
                    Las mujeres jóvenes dedican casi el triple de horas a labores de cuidado infantil y de ancianos.
                  </p>
                </div>
              </div>
            )}

            {/* Methodology Pipeline Visual */}
            {slide.chartType === 'methodologyPipeline' && (
              <div className="flex flex-col gap-2.5 w-full max-w-lg">
                {[
                  { phase: "Fase 1: No Supervisada", model: "K-Prototypes", desc: "4 tipologías etnodemográficas mixtas (k=4) con distancia de Gower." },
                  { phase: "Fase 2: Inferencia Clásica", model: "Regresión Logit", desc: "Odds Ratios intra-clúster (OR=0.65 mujer en C2; OR=1.45 niños en C3)." },
                  { phase: "Fase 3: ML Supervisado", model: "Random Forest & XGBoost", desc: "Captura de no-linealidades (AUC-ROC 0.785 vs 0.658)." },
                  { phase: "Fase 4: Explicabilidad", model: "TreeSHAP (XAI)", desc: "Descomposición exacta de Shapley a nivel individual y global." },
                  { phase: "Fase 5: Inferencia Causal", model: "Double Machine Learning", desc: "Aislamiento del efecto puro de la interseccionalidad con ortogonalidad de Neyman." }
                ].map((item, idx) => (
                  <div key={idx} className="bg-slate-900/80 border border-slate-800 rounded-xl p-2.5 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-indigo-600/30 border border-indigo-400/40 flex items-center justify-center text-xs font-mono font-bold text-indigo-300">
                        {idx + 1}
                      </span>
                      <div>
                        <div className="text-xs font-bold text-white">{item.model}</div>
                        <div className="text-[10px] text-slate-400">{item.desc}</div>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-indigo-400 whitespace-nowrap">
                      {item.phase.split(':')[0]}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Default Stats Cards (for Slide 1 and 14) */}
            {slide.keyStats && !slide.chartType && (
              <div className="grid grid-cols-2 gap-3 w-full max-w-md">
                {slide.keyStats.map((st, sIdx) => (
                  <div
                    key={sIdx}
                    className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between shadow-lg"
                  >
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      {st.label}
                    </span>
                    <span className="text-2xl sm:text-3xl font-black text-indigo-400 font-mono my-1.5">
                      {st.value}
                    </span>
                    <span className="text-[11px] text-slate-300">
                      {st.detail}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Slide Footer: Bottom Meta */}
        <div className="relative z-10 flex items-center justify-between border-t border-slate-800/60 pt-3 text-[11px] text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Base Oficial: Microdatos ENAHO 2025 (INEI)</span>
          </div>
          <div className="font-mono text-slate-400">
            {slide.id} / {SLIDES_DATA.length}
          </div>
        </div>
      </div>
    </div>
  );
}
