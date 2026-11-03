import React, { useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import Header from './components/Header';
import SlideViewer from './components/SlideViewer';
import SlideNavigation from './components/SlideNavigation';
import InteractiveLab from './components/InteractiveLab';
import TheoryExploration from './components/TheoryExploration';
import PaperViewer from './components/PaperViewer';
import { SLIDES_DATA } from './data/paperData';
import { Smartphone, RotateCw } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('slides');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [installPrompt, setInstallPrompt] = useState(null);
  const [offlineCached, setOfflineCached] = useState(false);
  const [isPortrait, setIsPortrait] = useState(false);

  // Monitor orientation for mobile landscape optimization
  useEffect(() => {
    const checkOrientation = () => {
      if (window.innerWidth < 768 && window.innerHeight > window.innerWidth) {
        setIsPortrait(true);
      } else {
        setIsPortrait(false);
      }
    };
    checkOrientation();
    window.addEventListener('resize', checkOrientation);
    window.addEventListener('orientationchange', checkOrientation);
    return () => {
      window.removeEventListener('resize', checkOrientation);
      window.removeEventListener('orientationchange', checkOrientation);
    };
  }, []);

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
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
  }, []);

  const handleInstallApp = async () => {
    if (!installPrompt) return;
    installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;
    if (outcome === 'accepted') {
      confetti({ particleCount: 90, spread: 70, origin: { y: 0.5 } });
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
            origin: { y: 0.3 }
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
          console.warn('Manual cache fallback failed:', err);
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

  const handleNextSlide = () => {
    setCurrentSlide((prev) => Math.min(SLIDES_DATA.length - 1, prev + 1));
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => Math.max(0, prev - 1));
  };

  return (
    <div className="min-h-screen bg-[#fcfbfe] text-slate-900 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Executive White & Purple Header */}
      <Header
        activeTab={activeTab}
        onTabChange={setActiveTab}
        installPrompt={installPrompt}
        onInstallClick={handleInstallApp}
        isOffline={isOffline}
        onDownloadOffline={handleDownloadOffline}
        offlineCached={offlineCached}
      />

      {/* Portrait helper alert for Mobile in Slide Mode */}
      {isPortrait && activeTab === 'slides' && (
        <div className="bg-purple-100 border-b border-purple-200 py-1 px-3 text-center flex items-center justify-center gap-1.5 text-[11px] font-bold text-purple-900">
          <RotateCw className="w-3.5 h-3.5 animate-spin" />
          <span>Gira tu móvil a horizontal para ver las diapositivas 16:9 encajadas</span>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-2 sm:px-6 py-3 sm:py-6 flex flex-col items-center justify-start">
        {activeTab === 'slides' && (
          <div className="w-full flex flex-col items-center gap-3 sm:gap-5">
            <SlideViewer
              currentSlideIndex={currentSlide}
              onNextSlide={handleNextSlide}
              onPrevSlide={handlePrevSlide}
            />
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

      {/* Footer */}
      <footer className="w-full border-t border-purple-100 bg-white/90 py-3 px-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1.5">
          <span>
            © 2026 <strong>Gustavo Fernando Huamán Fernández</strong> • Investigación Ganadora SENAJU
          </span>
          <div className="text-[11px] font-mono text-purple-800 font-semibold">
            Tema Blanco & Púrpura Real • PWA 100% Offline
          </div>
        </div>
      </footer>
    </div>
  );
}
