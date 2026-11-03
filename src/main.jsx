import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary capturó:', error, errorInfo);
  }

  handleReset = () => {
    if ('caches' in window) {
      caches.keys().then((keys) => {
        keys.forEach((k) => caches.delete(k));
      });
    }
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations().then((regs) => {
        regs.forEach((r) => r.unregister());
      });
    }
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          background: '#f8fafc',
          color: '#0f172a',
          fontFamily: 'system-ui, sans-serif',
          textAlign: 'center'
        }}>
          <div style={{
            maxWidth: '500px',
            background: '#ffffff',
            border: '2px solid #c7d2fe',
            borderRadius: '16px',
            padding: '30px',
            boxShadow: '0 10px 25px -5px rgba(67, 56, 202, 0.1)'
          }}>
            <h2 style={{ fontSize: '20px', fontWeight: '900', color: '#4338ca', marginBottom: '10px' }}>
              SENAJU ML Lab • Actualización de Versión
            </h2>
            <p style={{ fontSize: '13px', color: '#475569', marginBottom: '20px', lineHeight: '1.5' }}>
              Se ha detectado una nueva versión de la plataforma. Haz clic abajo para recargar y sincronizar todos los recursos actualizados.
            </p>
            <button
              onClick={this.handleReset}
              style={{
                background: '#4338ca',
                color: '#ffffff',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '10px',
                fontWeight: 'bold',
                cursor: 'pointer',
                fontSize: '14px',
                boxShadow: '0 4px 12px rgba(67, 56, 202, 0.3)'
              }}
            >
              Sincronizar y Recargar Ahora
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
