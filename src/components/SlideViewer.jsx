import React, { useRef } from 'react';
import { SLIDES_DATA } from '../data/paperData';
import RadarChart from './charts/RadarChart';
import ForestPlot from './charts/ForestPlot';
import RocCurve from './charts/RocCurve';
import ShapBeeswarm from './charts/ShapBeeswarm';
import ElbowPlot from './charts/ElbowPlot';
import DmlDiagram from './charts/DmlDiagram';
import { Award, CheckCircle2, Sparkles } from 'lucide-react';

export default function SlideViewer({ currentSlideIndex = 0, onNextSlide, onPrevSlide }) {
  const slide = SLIDES_DATA[currentSlideIndex] || SLIDES_DATA[0];
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  // Touch Swipe for Mobile
  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 45;
    if (distance > minSwipeDistance && onNextSlide) {
      onNextSlide();
    } else if (distance < -minSwipeDistance && onPrevSlide) {
      onPrevSlide();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <div
      className="w-full flex flex-col items-center justify-center select-none"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* 16:9 Slide Canvas (Morado Azulado + Cyan + Esmeralda Triad) */}
      <div className="w-full max-w-6xl aspect-[16/9] min-h-[480px] sm:min-h-[560px] bg-white border border-indigo-200/80 rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-xl shadow-indigo-500/5 flex flex-col justify-between relative overflow-hidden landscape-slide-container">
        {/* Subtle Decorative Ambient Gradients */}
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-indigo-50/70 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-cyan-50/70 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header of the Slide */}
        <div className="relative z-10 flex items-start justify-between gap-3 border-b border-indigo-100 pb-2.5 sm:pb-3.5">
          <div className="overflow-hidden">
            <div className="flex items-center gap-1.5 mb-1">
              <span className="px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-black tracking-wider uppercase bg-indigo-50 text-indigo-900 border border-indigo-200">
                {slide.category}
              </span>
              <span className="text-[10px] sm:text-[11px] font-mono font-bold text-slate-500">
                #{slide.id}/{SLIDES_DATA.length}
              </span>
            </div>
            <h1 className="text-base sm:text-xl md:text-2xl font-black text-slate-900 tracking-tight leading-snug">
              {slide.title}
            </h1>
            <p className="text-[11px] sm:text-xs text-indigo-800 font-semibold mt-0.5 landscape-hide-subtext">
              {slide.subtitle}
            </p>
          </div>

          <div className="flex flex-col items-end flex-shrink-0">
            <span className="text-[9px] sm:text-[10px] font-black text-cyan-800 tracking-wider uppercase">
              SENAJU 2026
            </span>
            <span className="text-[10px] font-bold text-slate-700 hidden sm:block">
              Gustavo Huamán F.
            </span>
          </div>
        </div>

        {/* Slide Body */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-6 my-auto py-2 items-center">
          {/* Left Column: Takeaways */}
          <div className="md:col-span-5 flex flex-col gap-2">
            {slide.id === 1 ? (
              <div className="flex flex-col gap-2 sm:gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-700 shadow-sm flex-shrink-0">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-[10px] font-black uppercase text-indigo-700">
                      Investigación Ganadora Oficial
                    </div>
                    <div className="text-xs sm:text-sm font-black text-slate-900">
                      Premio Nacional Juventudes 2026
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5 mt-1">
                  {slide.takeaways.map((point, idx) => (
                    <div key={idx} className="bg-slate-50/80 border border-slate-200 rounded-xl p-2 sm:p-2.5 flex items-start gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-cyan-600 flex-shrink-0 mt-0.5" />
                      <span className="text-[11px] sm:text-xs font-medium text-slate-800 leading-snug">
                        {point}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-1.5 sm:space-y-2">
                {slide.takeaways.map((point, idx) => (
                  <div
                    key={idx}
                    className="bg-white border border-slate-200 rounded-xl p-2 sm:p-2.5 flex items-start gap-2 shadow-2xs hover:border-cyan-300 transition-colors"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <p className="text-[11px] sm:text-xs font-semibold text-slate-800 leading-snug">
                      {point}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Visuals */}
          <div className="md:col-span-7 flex flex-col items-center justify-center w-full">
            {slide.chartType === 'clusterRadar' && <RadarChart />}
            {slide.chartType === 'forestPlot' && <ForestPlot />}
            {slide.chartType === 'rocComparison' && <RocCurve />}
            {slide.chartType === 'shapBeeswarm' && <ShapBeeswarm />}
            {slide.chartType === 'elbowPlot' && <ElbowPlot />}
            {slide.chartType === 'dmlConcept' && <DmlDiagram />}

            {/* Paradox 91.1% Visual */}
            {slide.chartType === 'paradoxSummary' && (
              <div className="grid grid-cols-2 gap-2 w-full max-w-md">
                <div className="bg-indigo-50/70 border border-indigo-200 rounded-xl p-2.5 sm:p-3 flex flex-col justify-between">
                  <span className="text-[9px] font-black uppercase text-indigo-900">
                    Ocupación Aparente
                  </span>
                  <div className="text-2xl sm:text-3xl font-black text-indigo-700 font-mono my-1">
                    91.1%
                  </div>
                  <span className="text-[10px] text-slate-600 font-medium">
                    Incluye autoempleo precario familiar
                  </span>
                </div>

                <div className="bg-cyan-50/70 border border-cyan-200 rounded-xl p-2.5 sm:p-3 flex flex-col justify-between">
                  <span className="text-[9px] font-black uppercase text-cyan-900">
                    Informalidad Real
                  </span>
                  <div className="text-2xl sm:text-3xl font-black text-cyan-700 font-mono my-1">
                    76.4%
                  </div>
                  <span className="text-[10px] text-slate-600 font-medium">
                    Sin contrato ni derechos laborales
                  </span>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 sm:p-3 flex flex-col justify-between">
                  <span className="text-[9px] font-black uppercase text-slate-800">
                    Jóvenes NiNi
                  </span>
                  <div className="text-2xl sm:text-3xl font-black text-slate-800 font-mono my-1">
                    18.2%
                  </div>
                  <span className="text-[10px] text-slate-600 font-medium">
                    67% son mujeres en el hogar
                  </span>
                </div>

                <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-2.5 sm:p-3 flex flex-col justify-between">
                  <span className="text-[9px] font-black uppercase text-emerald-900">
                    Carga no Remunerada
                  </span>
                  <div className="text-2xl sm:text-3xl font-black text-emerald-700 font-mono my-1">
                    2.8x
                  </div>
                  <span className="text-[10px] text-slate-700 font-medium">
                    Horas de cuidado vs varones
                  </span>
                </div>
              </div>
            )}

            {/* Pipeline Visual */}
            {slide.chartType === 'methodologyPipeline' && (
              <div className="flex flex-col gap-1.5 w-full max-w-md">
                {[
                  { num: "1", name: "K-Prototypes", role: "Clustering mixto (k=4) sin perder datos cualitativos.", color: "bg-indigo-700" },
                  { num: "2", name: "Regresión Logit", role: "Odds Ratios intra-clúster con errores robustos.", color: "bg-cyan-700" },
                  { num: "3", name: "Random Forest & XGBoost", role: "Modelado supervisado no lineal (AUC 0.785 vs 0.658).", color: "bg-emerald-700" },
                  { num: "4", name: "TreeSHAP (XAI)", role: "Explicabilidad exacta basada en juegos cooperativos.", color: "bg-indigo-700" },
                  { num: "5", name: "Double Machine Learning", role: "Ortogonalidad de Neyman para inferencia causal pura.", color: "bg-cyan-700" }
                ].map((p) => (
                  <div key={p.num} className="bg-white border border-slate-200 rounded-xl p-2 flex items-center gap-2.5 shadow-2xs">
                    <span className={`w-5 h-5 rounded-full ${p.color} text-white font-mono text-[10px] font-bold flex items-center justify-center flex-shrink-0`}>
                      {p.num}
                    </span>
                    <div className="truncate">
                      <span className="text-[11px] font-bold text-slate-900 block leading-tight">{p.name}</span>
                      <span className="text-[9px] text-slate-600 font-medium truncate block">{p.role}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Default Stats Cards */}
            {slide.keyStats && !slide.chartType && (
              <div className="grid grid-cols-2 gap-2 w-full max-w-sm">
                {slide.keyStats.map((st, sIdx) => {
                  const borderCol = sIdx % 3 === 0 ? 'border-indigo-200 bg-indigo-50/60' : sIdx % 3 === 1 ? 'border-cyan-200 bg-cyan-50/60' : 'border-emerald-200 bg-emerald-50/60';
                  const textCol = sIdx % 3 === 0 ? 'text-indigo-800' : sIdx % 3 === 1 ? 'text-cyan-800' : 'text-emerald-800';
                  return (
                    <div key={sIdx} className={`border rounded-xl p-2.5 flex flex-col justify-between ${borderCol}`}>
                      <span className="text-[9px] font-bold uppercase text-slate-700">
                        {st.label}
                      </span>
                      <span className={`text-xl sm:text-2xl font-black font-mono my-0.5 ${textCol}`}>
                        {st.value}
                      </span>
                      <span className="text-[10px] text-slate-600 font-medium">
                        {st.detail}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Footer info */}
        <div className="relative z-10 flex items-center justify-between border-t border-slate-200 pt-2 text-[10px] text-slate-500">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="font-semibold text-slate-700">ENAHO 2025 • N=13,361</span>
          </div>
          <div className="font-mono font-bold text-indigo-900">
            Desliza &larr; &rarr; para navegar
          </div>
        </div>
      </div>
    </div>
  );
}
