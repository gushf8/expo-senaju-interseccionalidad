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

  // Auto-play presentation timer
  useEffect(() => {
    let interval = null;
    if (isPlaying) {
      interval = setInterval(() => {
        onSlideChange((prev) => (prev < SLIDES_DATA.length - 1 ? prev + 1 : 0));
      }, 8000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, onSlideChange]);

  // Defense stop-watch timer
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
    <div className="w-full flex flex-col items-center gap-2 max-w-4xl">
      {/* Progress Bar */}
      <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden border border-slate-800">
        <div
          className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-full transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Control Bar */}
      <div className="w-full bg-slate-900/90 border border-slate-800/90 rounded-2xl px-4 py-2.5 flex items-center justify-between shadow-xl backdrop-blur-md">
        {/* Left: Defense Stopwatch */}
        <div className="flex items-center gap-2">
          <div className="font-mono text-xs sm:text-sm font-bold text-slate-200 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800">
            {formatTimer(timerSeconds)}
          </div>
          <button
            onClick={() => setTimerActive(!timerActive)}
            className="text-xs px-2 py-1 rounded bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors"
            title={timerActive ? 'Pausar cronómetro' : 'Iniciar cronómetro de defensa'}
          >
            {timerActive ? 'Pausar' : 'Defensa'}
          </button>
          {timerSeconds > 0 && (
            <button
              onClick={() => {
                setTimerActive(false);
                setTimerSeconds(0);
              }}
              className="text-slate-400 hover:text-slate-200"
              title="Reiniciar cronómetro"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Center: Slide Arrows & Jump Grid */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onSlideChange(Math.max(0, currentSlide - 1))}
            disabled={currentSlide === 0}
            className="p-2 rounded-xl bg-slate-800 text-slate-200 hover:bg-indigo-600 disabled:opacity-30 disabled:hover:bg-slate-800 transition-all"
            title="Diapositiva anterior (Flecha Izquierda)"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <span className="text-xs font-mono font-bold text-slate-200 px-3 py-1 bg-slate-950 rounded-lg border border-slate-800">
            {currentSlide + 1} / {SLIDES_DATA.length}
          </span>

          <button
            onClick={() => onSlideChange(Math.min(SLIDES_DATA.length - 1, currentSlide + 1))}
            disabled={currentSlide === SLIDES_DATA.length - 1}
            className="p-2 rounded-xl bg-slate-800 text-slate-200 hover:bg-indigo-600 disabled:opacity-30 disabled:hover:bg-slate-800 transition-all"
            title="Siguiente diapositiva (Flecha Derecha / Espacio)"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Grid View Modal Toggle */}
          <button
            onClick={() => setShowGrid(!showGrid)}
            className={`p-2 rounded-xl transition-all ${
              showGrid ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
            title="Ver cuadrícula de diapositivas"
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
        </div>

        {/* Right: Autoplay & Fullscreen */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`p-2 rounded-xl transition-all ${
              isPlaying ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
            title={isPlaying ? 'Pausar reproducción automática' : 'Reproducir presentación automática'}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>

          <button
            onClick={onToggleFullscreen}
            className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-indigo-600 hover:text-white transition-all"
            title={isFullscreen ? 'Salir de pantalla completa' : 'Pantalla completa (F)'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Grid Overview Modal */}
      {showGrid && (
        <div className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 shadow-2xl mt-2 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
          {SLIDES_DATA.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => {
                onSlideChange(idx);
                setShowGrid(false);
              }}
              className={`p-2 rounded-xl text-left border transition-all flex flex-col justify-between h-20 ${
                currentSlide === idx
                  ? 'border-indigo-500 bg-indigo-950/60 text-white shadow-md'
                  : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700 hover:text-slate-200'
              }`}
            >
              <span className="text-[10px] font-mono font-bold text-indigo-400">#{s.id}</span>
              <span className="text-[11px] font-semibold line-clamp-2 leading-tight">
                {s.title}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
