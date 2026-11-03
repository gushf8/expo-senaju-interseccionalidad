import React, { useState, useEffect } from 'react';
import { Sparkles, DownloadCloud, Smartphone, Wifi, WifiOff, Presentation, Cpu, Sliders, FileText, CheckCircle2 } from 'lucide-react';

export default function Header({
  activeTab,
  onTabChange,
  installPrompt,
  onInstallClick,
  isOffline,
  onDownloadOffline,
  offlineCached
}) {
  const [downloading, setDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleDownloadAll = async () => {
    setDownloading(true);
    await onDownloadOffline();
    setDownloading(false);
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 4000);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-slate-950/85 backdrop-blur-xl border-b border-slate-800/80 px-4 sm:px-8 py-3 transition-all">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Brand & Identity */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 p-[1.5px] shadow-lg shadow-indigo-600/30 flex-shrink-0">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center text-indigo-400">
              <Sparkles className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-black text-white tracking-tight">
                SENAJU • ML LAB
              </span>
              <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                PWA 2026
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium truncate max-w-xs sm:max-w-sm">
              Gustavo Huamán • Interseccionalidad & Inserción Laboral
            </p>
          </div>
        </div>

        {/* Central Navigation Tabs */}
        <nav className="flex items-center bg-slate-900/90 border border-slate-800 rounded-xl p-1 gap-1">
          <button
            onClick={() => onTabChange('slides')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
              activeTab === 'slides'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Presentation className="w-3.5 h-3.5" />
            <span>Presentación PPT</span>
          </button>

          <button
            onClick={() => onTabChange('lab')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
              activeTab === 'lab'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Simulador Lab</span>
          </button>

          <button
            onClick={() => onTabChange('theory')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
              activeTab === 'theory'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>Teoría Modelos</span>
          </button>

          <button
            onClick={() => onTabChange('paper')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
              activeTab === 'paper'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Paper & PDF</span>
          </button>
        </nav>

        {/* Right Actions: Offline & PWA Install */}
        <div className="flex items-center gap-2">
          {/* Offline/Online Badge */}
          <div
            className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-semibold flex items-center gap-1.5 border ${
              isOffline
                ? 'bg-amber-950/60 border-amber-500/40 text-amber-300'
                : 'bg-emerald-950/40 border-emerald-500/30 text-emerald-300'
            }`}
          >
            {isOffline ? <WifiOff className="w-3.5 h-3.5" /> : <Wifi className="w-3.5 h-3.5" />}
            <span>{isOffline ? '100% Offline' : 'Online'}</span>
          </div>

          {/* Download for Offline Button */}
          <button
            onClick={handleDownloadAll}
            disabled={downloading}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 ${
              downloadSuccess || offlineCached
                ? 'bg-emerald-950/50 border-emerald-500/40 text-emerald-300'
                : 'bg-slate-900 hover:bg-slate-800 border-slate-700 text-slate-200'
            }`}
            title="Descargar todos los recursos (PDF, fórmulas, scripts) para navegar sin internet"
          >
            {downloadSuccess || offlineCached ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden sm:inline">Offline Guardado</span>
              </>
            ) : (
              <>
                <DownloadCloud className={`w-3.5 h-3.5 ${downloading ? 'animate-bounce' : ''}`} />
                <span className="hidden sm:inline">{downloading ? 'Guardando...' : 'Descargar Offline'}</span>
              </>
            )}
          </button>

          {/* PWA Install Button */}
          {installPrompt && (
            <button
              onClick={onInstallClick}
              className="px-3 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-pink-600 to-indigo-600 hover:from-pink-500 hover:to-indigo-500 text-white shadow-lg shadow-pink-600/25 flex items-center gap-1.5 transition-all animate-pulse-subtle"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Instalar App</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
