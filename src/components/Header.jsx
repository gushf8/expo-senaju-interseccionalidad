import React, { useState } from 'react';
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
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-purple-200/90 px-3 sm:px-6 py-2 transition-all shadow-xs landscape-compact-header">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
        {/* Brand & Identity */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-purple-700 via-purple-600 to-pink-500 p-[1.5px] shadow-sm shadow-purple-600/30 flex-shrink-0">
            <div className="w-full h-full bg-white rounded-[9px] flex items-center justify-center text-purple-700">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs sm:text-sm font-black text-slate-900 tracking-tight">
                SENAJU • ML LAB
              </span>
              <span className="px-1.5 py-0.2 rounded text-[8px] sm:text-[9px] font-bold bg-purple-100 text-purple-800 border border-purple-300">
                PWA
              </span>
            </div>
            <p className="text-[10px] text-slate-500 font-medium hidden sm:block truncate max-w-xs">
              Gustavo Huamán • ENAHO 2025
            </p>
          </div>
        </div>

        {/* Central Navigation Tabs - Minimalist for Mobile */}
        <nav className="flex items-center bg-purple-50/80 border border-purple-200 rounded-xl p-0.5 gap-0.5">
          <button
            onClick={() => onTabChange('slides')}
            className={`px-2.5 sm:px-3 py-1 rounded-lg text-[11px] sm:text-xs font-bold flex items-center gap-1 transition-all ${
              activeTab === 'slides'
                ? 'bg-purple-700 text-white shadow-sm'
                : 'text-slate-600 hover:text-purple-900 hover:bg-white/60'
            }`}
            title="Presentación de diapositivas PPT"
          >
            <Presentation className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">PPT</span>
          </button>

          <button
            onClick={() => onTabChange('lab')}
            className={`px-2.5 sm:px-3 py-1 rounded-lg text-[11px] sm:text-xs font-bold flex items-center gap-1 transition-all ${
              activeTab === 'lab'
                ? 'bg-purple-700 text-white shadow-sm'
                : 'text-slate-600 hover:text-purple-900 hover:bg-white/60'
            }`}
            title="Simulador de microdatos"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">Lab</span>
          </button>

          <button
            onClick={() => onTabChange('theory')}
            className={`px-2.5 sm:px-3 py-1 rounded-lg text-[11px] sm:text-xs font-bold flex items-center gap-1 transition-all ${
              activeTab === 'theory'
                ? 'bg-purple-700 text-white shadow-sm'
                : 'text-slate-600 hover:text-purple-900 hover:bg-white/60'
            }`}
            title="Teoría de los 5 modelos"
          >
            <Cpu className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">Teoría</span>
          </button>

          <button
            onClick={() => onTabChange('paper')}
            className={`px-2.5 sm:px-3 py-1 rounded-lg text-[11px] sm:text-xs font-bold flex items-center gap-1 transition-all ${
              activeTab === 'paper'
                ? 'bg-purple-700 text-white shadow-sm'
                : 'text-slate-600 hover:text-purple-900 hover:bg-white/60'
            }`}
            title="Artículo y PDF"
          >
            <FileText className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">Paper</span>
          </button>
        </nav>

        {/* Right Actions: Offline & PWA */}
        <div className="flex items-center gap-1.5 flex-shrink-0">
          {/* Offline/Online Badge */}
          <div
            className={`px-2 py-0.5 rounded-lg text-[10px] font-mono font-bold flex items-center gap-1 border ${
              isOffline
                ? 'bg-amber-100 border-amber-300 text-amber-900'
                : 'bg-emerald-100 border-emerald-300 text-emerald-900'
            }`}
          >
            {isOffline ? <WifiOff className="w-3 h-3" /> : <Wifi className="w-3 h-3" />}
            <span className="hidden sm:inline">{isOffline ? 'Offline' : 'Online'}</span>
          </div>

          {/* Download for Offline Button */}
          <button
            onClick={handleDownloadAll}
            disabled={downloading}
            className={`p-1.5 sm:px-2.5 sm:py-1 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 ${
              downloadSuccess || offlineCached
                ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                : 'bg-white hover:bg-purple-50 border-purple-200 text-purple-900 shadow-2xs'
            }`}
            title="Descargar todos los recursos para modo 100% offline"
          >
            {downloadSuccess || offlineCached ? (
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            ) : (
              <DownloadCloud className={`w-3.5 h-3.5 text-purple-700 ${downloading ? 'animate-bounce' : ''}`} />
            )}
            <span className="hidden md:inline text-[11px]">
              {downloadSuccess || offlineCached ? 'Guardado' : 'Offline'}
            </span>
          </button>

          {/* PWA Install Button */}
          {installPrompt && (
            <button
              onClick={onInstallClick}
              className="px-2.5 py-1 rounded-xl text-xs font-bold bg-gradient-to-r from-purple-700 to-pink-600 text-white shadow-sm flex items-center gap-1 animate-pulse-subtle"
            >
              <Smartphone className="w-3 h-3" />
              <span className="hidden sm:inline">Instalar</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
