import React, { useMemo } from 'react';
import katex from 'katex';

export default function MathView({ math, display = false, className = '' }) {
  const html = useMemo(() => {
    try {
      return katex.renderToString(math, {
        displayMode: display,
        throwOnError: false,
        strict: false
      });
    } catch (e) {
      console.warn('KaTeX render error:', e);
      return `<span class="text-rose-400 font-mono text-sm">${math}</span>`;
    }
  }, [math, display]);

  return (
    <span
      className={`inline-block select-text ${display ? 'my-2 w-full text-center overflow-x-auto overflow-y-hidden' : ''} ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
