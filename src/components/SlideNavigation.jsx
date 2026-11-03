import React, { useState, useEffect } from 'react';
import { SLIDES_DATA } from '../data/paperData';
import { ChevronLeft, ChevronRight, Maximize2, Minimize2, Play, Pause, RotateCcw, LayoutGrid } from 'lucide-react';

export default function SlideNavigation({
  currentSlide,
  onSlideChange,
  isFullscreen,
  onToggleFullscreen
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [showGrid, setShowGrid] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isPlaying) {
      interval = setInterval(() => {
        onSlideChange((prev) => (prev < SLIDES_DATA.length - 1 ? prev + 1 : 0));
      }, 7000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, onSlideChange]);

  useEffect(() => {
    let interval = null;
    if (timerActive) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerActive]);

  const formatTimer = (sec) => {
    const mins = Math.floor(sec / 60);
    const s = sec % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const progressPercent = ((currentSlide + 1) / SLIDES_DATA.length) * 100;

  return (
    <div className="w-full flex flex-col items-center gap-1.5 max-w-3xl px-2">
      {/* Indigo to Cyan to Emerald Progress Bar */}
      <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
        <div
          className="bg-gradient-to-r from-indigo-600 via-cyan-500 to-emerald-500 h-full transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Control Dock */}
      <div className="w-full bg-white border border-slate-200 rounded-2xl px-3 py-1.5 flex items-center justify-between shadow-sm backdrop-blur-md">
        {/* Left: Stopwatch */}
        <div className="flex items-center gap-1.5">
          <div className="font-mono text-xs font-bold text-indigo-950 bg-indigo-50 px-2 py-0.5 rounded-lg border border-indigo-200">
            {formatTimer(timerSeconds)}
          </div>
          <button
            onClick={() => setTimerActive(!timerActive)}
            className="text-[10px] font-bold px-2 py-0.5 rounded-lg bg-indigo-100 text-indigo-900 hover:bg-indigo-200 transition-colors"
          >
            {timerActive ? 'Pausar' : 'Tiempo'}
          </button>
          {timerSeconds > 0 && (
            <button
              onClick={() => {
                setTimerActive(false);
                setTimerSeconds(0);
              }}
              className="text-slate-400 hover:text-indigo-800 p-0.5"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
          )}
        </div>

        {/* Center: Slide Arrows & Number */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => onSlideChange(Math.max(0, currentSlide - 1))}
            disabled={currentSlide === 0}
            className="p-1.5 rounded-xl bg-slate-50 text-indigo-900 hover:bg-indigo-600 hover:text-white disabled:opacity-30 transition-all border border-slate-200"
            title="Anterior (Flecha Izq)"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <span className="text-xs font-mono font-bold text-indigo-950 px-2.5 py-0.5 bg-slate-50 rounded-lg border border-slate-200">
            {currentSlide + 1} / {SLIDES_DATA.length}
          </span>

          <button
            onClick={() => onSlideChange(Math.min(SLIDES_DATA.length - 1, currentSlide + 1))}
            disabled={currentSlide === SLIDES_DATA.length - 1}
            className="p-1.5 rounded-xl bg-slate-50 text-indigo-900 hover:bg-indigo-600 hover:text-white disabled:opacity-30 transition-all border border-slate-200"
            title="Siguiente (Flecha Der)"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => setShowGrid(!showGrid)}
            className={`p-1.5 rounded-xl transition-all border ${
              showGrid
                ? 'bg-cyan-700 text-white border-cyan-700'
                : 'bg-slate-50 text-cyan-900 border-slate-200 hover:bg-cyan-50'
            }`}
            title="Ver todas las diapositivas"
          >
            <LayoutGrid className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Right: Autoplay & Fullscreen */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`p-1.5 rounded-xl transition-all border ${
              isPlaying
                ? 'bg-emerald-700 text-white border-emerald-700'
                : 'bg-slate-50 text-emerald-900 border-slate-200 hover:bg-emerald-50'
            }`}
            title={isPlaying ? 'Pausar auto' : 'Reproducir'}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={onToggleFullscreen}
            className="p-1.5 rounded-xl bg-slate-50 text-indigo-900 hover:bg-indigo-700 hover:text-white transition-all border border-slate-200"
            title="Pantalla completa (F)"
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Grid Thumbnail Modal */}
      {showGrid && (
        <div className="w-full bg-white border border-slate-200 rounded-2xl p-3 shadow-xl mt-1 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-1.5 max-h-56 overflow-y-auto">
          {SLIDES_DATA.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => {
                onSlideChange(idx);
                setShowGrid(false);
              }}
              className={`p-1.5 rounded-xl text-left border transition-all flex flex-col justify-between h-16 ${
                currentSlide === idx
                  ? 'border-indigo-600 bg-indigo-50 text-indigo-950 font-bold shadow-xs'
                  : 'border-slate-100 bg-white text-slate-600 hover:border-slate-300'
              }`}
            >
              <span className="text-[9px] font-mono font-bold text-indigo-700">#{s.id}</span>
              <span className="text-[10px] line-clamp-2 leading-tight">
                {s.title}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
