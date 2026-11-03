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
      {/* Sleek Purple Progress Bar */}
      <div className="w-full bg-purple-100 h-1.5 rounded-full overflow-hidden border border-purple-200">
        <div
          className="bg-gradient-to-r from-purple-700 via-purple-600 to-pink-500 h-full transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Control Dock: White & Purple */}
      <div className="w-full bg-white/95 border border-purple-200/90 rounded-2xl px-3 py-1.5 flex items-center justify-between shadow-md backdrop-blur-md">
        {/* Left: Stopwatch */}
        <div className="flex items-center gap-1.5">
          <div className="font-mono text-xs font-bold text-purple-950 bg-purple-50 px-2 py-0.5 rounded-lg border border-purple-200">
            {formatTimer(timerSeconds)}
          </div>
          <button
            onClick={() => setTimerActive(!timerActive)}
            className="text-[10px] font-bold px-2 py-0.5 rounded-lg bg-purple-100 text-purple-900 hover:bg-purple-200 transition-colors"
          >
            {timerActive ? 'Pausar' : 'Tiempo'}
          </button>
          {timerSeconds > 0 && (
            <button
              onClick={() => {
                setTimerActive(false);
                setTimerSeconds(0);
              }}
              className="text-slate-400 hover:text-purple-800 p-0.5"
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
            className="p-1.5 rounded-xl bg-purple-50 text-purple-900 hover:bg-purple-600 hover:text-white disabled:opacity-30 transition-all border border-purple-200"
            title="Anterior (Flecha Izq)"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <span className="text-xs font-mono font-bold text-purple-950 px-2.5 py-0.5 bg-purple-50 rounded-lg border border-purple-200">
            {currentSlide + 1} / {SLIDES_DATA.length}
          </span>

          <button
            onClick={() => onSlideChange(Math.min(SLIDES_DATA.length - 1, currentSlide + 1))}
            disabled={currentSlide === SLIDES_DATA.length - 1}
            className="p-1.5 rounded-xl bg-purple-50 text-purple-900 hover:bg-purple-600 hover:text-white disabled:opacity-30 transition-all border border-purple-200"
            title="Siguiente (Flecha Der)"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => setShowGrid(!showGrid)}
            className={`p-1.5 rounded-xl transition-all border ${
              showGrid
                ? 'bg-purple-700 text-white border-purple-700'
                : 'bg-purple-50 text-purple-900 border-purple-200 hover:bg-purple-100'
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
                ? 'bg-purple-700 text-white border-purple-700'
                : 'bg-purple-50 text-purple-900 border-purple-200 hover:bg-purple-100'
            }`}
            title={isPlaying ? 'Pausar auto' : 'Reproducir'}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={onToggleFullscreen}
            className="p-1.5 rounded-xl bg-purple-50 text-purple-900 hover:bg-purple-700 hover:text-white transition-all border border-purple-200"
            title="Pantalla completa (F)"
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Grid Thumbnail Modal */}
      {showGrid && (
        <div className="w-full bg-white border border-purple-200 rounded-2xl p-3 shadow-xl mt-1 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-1.5 max-h-56 overflow-y-auto">
          {SLIDES_DATA.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => {
                onSlideChange(idx);
                setShowGrid(false);
              }}
              className={`p-1.5 rounded-xl text-left border transition-all flex flex-col justify-between h-16 ${
                currentSlide === idx
                  ? 'border-purple-600 bg-purple-100/70 text-purple-950 font-bold shadow-xs'
                  : 'border-purple-100 bg-white text-slate-600 hover:border-purple-300'
              }`}
            >
              <span className="text-[9px] font-mono font-bold text-purple-700">#{s.id}</span>
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
