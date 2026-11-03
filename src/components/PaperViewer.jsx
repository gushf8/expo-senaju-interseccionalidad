import React, { useState } from 'react';
import { PAPER_METADATA } from '../data/paperData';
import { FileText, Download, ExternalLink, Copy, Check, BookOpen, Database, ShieldCheck } from 'lucide-react';

export default function PaperViewer() {
  const [copiedBib, setCopiedBib] = useState(false);

  const bibtex = `@article{huaman2026interseccionalidad,
  title={Interseccionalidad de G{\\'e}nero y Etnicidad en la Inserci{\\'o}n Laboral Juvenil en el Per{\\'u}: Tipolog{\\'i}as Basadas en Clustering y Modelamiento Predictivo},
  author={Huam{\\'a}n Fern{\\'a}ndez, Gustavo Fernando},
  journal={Secretar{\\'i}a Nacional de la Juventud (SENAJU)},
  year={2026},
  month={Agosto},
  note={Premio Nacional de Investigaci{\\'o}n de las Juventudes 2026}
}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(bibtex);
    setCopiedBib(true);
    setTimeout(() => setCopiedBib(false), 2000);
  };

  return (
    <div className="w-full flex flex-col gap-6 max-w-5xl mx-auto">
      {/* Top Paper Header Card */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col sm:flex-row items-start justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400 flex-shrink-0 shadow-lg">
            <FileText className="w-8 h-8" />
          </div>
          <div>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              Artículo Científico Oficial
            </span>
            <h2 className="text-lg sm:text-xl font-black text-white mt-1 leading-snug">
              {PAPER_METADATA.title}
            </h2>
            <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-slate-300">
              <span><strong>Autor:</strong> {PAPER_METADATA.author}</span>
              <span>•</span>
              <span><strong>DNI:</strong> {PAPER_METADATA.dni}</span>
              <span>•</span>
              <span><strong>Fecha:</strong> {PAPER_METADATA.date}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <a
            href={PAPER_METADATA.pdfPath}
            download="Investigacion_SENAJU_2026_Huaman.pdf"
            className="px-4 py-2.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 transition-all"
          >
            <Download className="w-4 h-4" />
            Descargar PDF Oficial
          </a>
          <a
            href={PAPER_METADATA.pdfPath}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center justify-center gap-2 transition-all"
          >
            <ExternalLink className="w-4 h-4" />
            Abrir en Pestaña
          </a>
        </div>
      </div>

      {/* Grid: Technical Details & Data Source */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Technical Metadata */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg flex flex-col gap-3">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
            <BookOpen className="w-4 h-4 text-indigo-400" />
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              Metadatos del Concurso SENAJU
            </h3>
          </div>

          <div className="space-y-2 text-xs text-slate-300">
            <div>
              <span className="text-slate-400 block text-[11px]">Convocatoria / Eje Principal:</span>
              <span className="font-semibold text-slate-100">{PAPER_METADATA.ejes[0]}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Eje Secundario:</span>
              <span className="font-semibold text-slate-100">{PAPER_METADATA.ejes[1]}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Población de Estudio:</span>
              <span className="font-semibold text-slate-100">{PAPER_METADATA.population}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Muestra Analizada:</span>
              <span className="font-mono font-bold text-indigo-400">{PAPER_METADATA.sampleSize.toLocaleString()} individuos representativos a nivel nacional</span>
            </div>
          </div>
        </div>

        {/* ENAHO Modules */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg flex flex-col gap-3">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
            <Database className="w-4 h-4 text-emerald-400" />
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              Bases Fusionadas (ENAHO 2025 - INEI)
            </h3>
          </div>

          <ul className="space-y-2 text-xs text-slate-300">
            <li className="flex items-start gap-2">
              <span className="font-bold text-emerald-400 font-mono">M200:</span>
              <span>Demografía del Hogar (edad, sexo, parentesco, dependientes infantiles y adultos mayores).</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-emerald-400 font-mono">M300:</span>
              <span>Educación (lengua materna de la niñez, años de escolaridad formal aprobados).</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-emerald-400 font-mono">M500:</span>
              <span>Empleo e Ingresos (condición de actividad ocu500, autoidentificación étnica p558c, horas).</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-emerald-400 font-mono">Sumaria:</span>
              <span>Estrato territorial (urbano/rural), pobreza monetaria y factor de ponderación (fac500a).</span>
            </li>
          </ul>
        </div>
      </div>

      {/* BibTeX Citation Box */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 shadow-xl">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Cita Académica BibTeX
          </span>
          <button
            onClick={copyToClipboard}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
          >
            {copiedBib ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            {copiedBib ? 'Copiado al Portapapeles' : 'Copiar BibTeX'}
          </button>
        </div>

        <pre className="bg-slate-900 p-4 rounded-xl font-mono text-xs text-indigo-300 overflow-x-auto leading-relaxed border border-slate-800">
          <code>{bibtex}</code>
        </pre>
      </div>

      {/* Embedded PDF Preview / Viewer */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-white">
            Visor Integrado del PDF
          </h3>
          <span className="text-[11px] font-mono text-slate-400">
            15 Páginas • Tamaño: 444 KB • Guardado Localmente en Cache
          </span>
        </div>
        <div className="w-full h-[650px] rounded-xl overflow-hidden border border-slate-800 bg-slate-950">
          <iframe
            src={`${PAPER_METADATA.pdfPath}#toolbar=1`}
            title="PDF Viewer"
            className="w-full h-full"
          />
        </div>
      </div>
    </div>
  );
}
