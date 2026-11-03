import React, { useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import Header from './components/Header';
import SlideViewer from './components/SlideViewer';
import SlideNavigation from './components/SlideNavigation';
import InteractiveLab from './components/InteractiveLab';
import TheoryExploration from './components/TheoryExploration';
import PaperViewer from './components/PaperViewer';
import { SLIDES_DATA } from './data/paperData';

export default function App() {
  const [activeTab, setActiveTab] = useState('slides');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [installPrompt, setInstallPrompt] = useState(null);
  const [offlineCached, setOfflineCached] = useState(false);

  // Monitor Online/Offline status
  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Monitor PWA Install prompt
  useEffect(() => {
    const handleBeforeInstall = (e) => {
      e.preventDefault();
      setInstallPrompt(e);
      console.log('beforeinstallprompt capturado');
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
  }, []);

  const handleInstallApp = async () => {
    if (!installPrompt) return;
    installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;
    console.log('Resultado de instalación:', outcome);
    if (outcome === 'accepted') {
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    }
    setInstallPrompt(null);
  };

  // Pre-cache all resources via Service Worker
  const handleDownloadOffline = useCallback(async () => {
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      const channel = new MessageChannel();
      channel.port1.onmessage = (event) => {
        if (event.data && event.data.type === 'CACHE_ALL_COMPLETED') {
          setOfflineCached(true);
          confetti({
            particleCount: 80,
            spread: 60,
            origin: { y: 0.2 }
          });
        }
      };

      navigator.serviceWorker.controller.postMessage(
        {
          type: 'CACHE_ALL_RESOURCES',
          urls: [
            '/',
            '/index.html',
            '/manifest.json',
            '/icons/icon-192.png',
            '/icons/icon-512.png',
            '/icons/icon.svg',
            '/investigacion_senaju_2026.pdf'
          ]
        },
        [channel.port2]
      );
    } else {
      // Direct cache fallback
      if ('caches' in window) {
        try {
          const cache = await caches.open('senaju-manual-cache');
          await cache.addAll([
            '/',
            '/index.html',
            '/manifest.json',
            '/icons/icon-192.png',
            '/icons/icon-512.png',
            '/icons/icon.svg',
            '/investigacion_senaju_2026.pdf'
          ]);
          setOfflineCached(true);
          confetti({ particleCount: 60, spread: 50 });
        } catch (err) {
          console.warn('Manual cache failed:', err);
        }
      }
    }
  }, []);

  // Fullscreen Handler
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't intercept if typing in an input
      if (['INPUT', 'SELECT', 'TEXTAREA'].includes(e.target.tagName)) return;

      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
        if (activeTab === 'slides') {
          e.preventDefault();
          setCurrentSlide((prev) => Math.min(SLIDES_DATA.length - 1, prev + 1));
        }
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        if (activeTab === 'slides') {
          e.preventDefault();
          setCurrentSlide((prev) => Math.max(0, prev - 1));
        }
      } else if (e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        toggleFullscreen();
      } else if (e.key === '1') {
        setActiveTab('slides');
      } else if (e.key === '2') {
        setActiveTab('lab');
      } else if (e.key === '3') {
        setActiveTab('theory');
      } else if (e.key === '4') {
        setActiveTab('paper');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Executive Header */}
      <Header
        activeTab={activeTab}
        onTabChange={setActiveTab}
        installPrompt={installPrompt}
        onInstallClick={handleInstallApp}
        isOffline={isOffline}
        onDownloadOffline={handleDownloadOffline}
        offlineCached={offlineCached}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col items-center justify-start">
        {activeTab === 'slides' && (
          <div className="w-full flex flex-col items-center gap-6">
            <SlideViewer currentSlideIndex={currentSlide} />
            <SlideNavigation
              currentSlide={currentSlide}
              onSlideChange={setCurrentSlide}
              isFullscreen={isFullscreen}
              onToggleFullscreen={toggleFullscreen}
            />
          </div>
        )}

        {activeTab === 'lab' && <InteractiveLab />}

        {activeTab === 'theory' && <TheoryExploration />}

        {activeTab === 'paper' && <PaperViewer />}
      </main>

      {/* Bottom Footer Info */}
      <footer className="w-full border-t border-slate-900 bg-slate-950/80 py-4 px-6 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            © 2026 <strong>Gustavo Fernando Huamán Fernández</strong> • Investigación SENAJU / INEI ENAHO 2025
          </span>
          <div className="flex items-center gap-4 text-[11px] font-mono">
            <span>Atajos de teclado: &larr; &rarr; (Slides) • Espacio • F (Pantalla Completa) • 1-4 (Pestañas)</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
