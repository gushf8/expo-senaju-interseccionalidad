import React, { useState } from 'react';
import { PAPER_METADATA } from '../data/paperData';
import { FileText, Download, ExternalLink, Copy, Check, BookOpen, Database } from 'lucide-react';

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
    <div className="w-full flex flex-col gap-4 max-w-5xl mx-auto">
      {/* Top Paper Header Card: Indigo + Cyan + Emerald */}
      <div className="bg-gradient-to-r from-indigo-50/70 via-white to-cyan-50/70 border border-indigo-200 rounded-2xl p-4 sm:p-6 shadow-sm flex flex-col sm:flex-row items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-700 flex-shrink-0 shadow-sm">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase bg-indigo-100 text-indigo-900 border border-indigo-200">
              Artículo Científico Oficial
            </span>
            <h2 className="text-base sm:text-lg font-black text-slate-900 mt-1 leading-snug">
              {PAPER_METADATA.title}
            </h2>
            <div className="flex flex-wrap items-center gap-2 mt-1.5 text-xs text-slate-600 font-semibold">
              <span><strong>Autor:</strong> {PAPER_METADATA.author}</span>
              <span>•</span>
              <span><strong>DNI:</strong> {PAPER_METADATA.dni}</span>
              <span>•</span>
              <span><strong>Conclusión:</strong> {PAPER_METADATA.date}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto flex-shrink-0">
          <a
            href={PAPER_METADATA.pdfPath}
            download="Investigacion_SENAJU_2026_Huaman.pdf"
            className="px-3.5 py-2 rounded-xl text-xs font-black bg-indigo-700 hover:bg-indigo-800 text-white flex items-center justify-center gap-1.5 shadow-sm transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            Descargar PDF Oficial
          </a>
          <a
            href={PAPER_METADATA.pdfPath}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2 rounded-xl text-xs font-black bg-white hover:bg-cyan-50 text-cyan-900 border border-cyan-200 flex items-center justify-center gap-1.5 transition-all"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Ver en Pestaña
          </a>
        </div>
      </div>

      {/* Grid: Metadata */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Metadatos Concurso */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col gap-2">
          <div className="flex items-center gap-1.5 border-b border-slate-100 pb-1.5">
            <BookOpen className="w-4 h-4 text-indigo-700" />
            <h3 className="text-xs font-black text-slate-900 uppercase">
              Metadatos del Concurso SENAJU 2026
            </h3>
          </div>
          <div className="space-y-1.5 text-xs text-slate-700">
            <div>
              <span className="text-slate-500 block text-[10px] font-bold">Eje Temático Principal:</span>
              <span className="font-semibold text-slate-900">{PAPER_METADATA.ejes[0]}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px] font-bold">Eje Secundario:</span>
              <span className="font-semibold text-slate-900">{PAPER_METADATA.ejes[1]}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px] font-bold">Muestra Representativa PEA:</span>
              <span className="font-mono font-bold text-indigo-800">{PAPER_METADATA.sampleSize.toLocaleString()} jóvenes de 15 a 29 años</span>
            </div>
          </div>
        </div>

        {/* ENAHO Módulos */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col gap-2">
          <div className="flex items-center gap-1.5 border-b border-slate-100 pb-1.5">
            <Database className="w-4 h-4 text-cyan-700" />
            <h3 className="text-xs font-black text-slate-900 uppercase">
              Microdatos ENAHO 2025 (INEI)
            </h3>
          </div>
          <ul className="space-y-1.5 text-xs text-slate-700">
            <li><strong className="text-indigo-900 font-mono">M200:</strong> Hogar (edad, sexo, parentesco, dependientes infantiles).</li>
            <li><strong className="text-cyan-900 font-mono">M300:</strong> Educación (lengua materna niñez, escolaridad aprobada).</li>
            <li><strong className="text-emerald-900 font-mono">M500:</strong> Empleo (condición actividad ocu500, autoidentificación étnica).</li>
            <li><strong className="text-indigo-900 font-mono">Sumaria:</strong> Estrato territorial, pobreza monetaria, factor de expansión.</li>
          </ul>
        </div>
      </div>

      {/* BibTeX Box */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-black uppercase text-indigo-900">
            Cita BibTeX Oficial
          </span>
          <button
            onClick={copyToClipboard}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-50 hover:bg-slate-100 text-indigo-900 border border-slate-200 transition-colors"
          >
            {copiedBib ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
            {copiedBib ? 'Copiado' : 'Copiar'}
          </button>
        </div>
        <pre className="bg-slate-900 text-indigo-200 p-3 rounded-xl font-mono text-[11px] overflow-x-auto leading-relaxed border border-slate-800">
          <code>{bibtex}</code>
        </pre>
      </div>

      {/* Embedded PDF Viewer */}
      <div className="bg-white border border-slate-200 rounded-2xl p-3 shadow-sm flex flex-col gap-2">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-xs font-black uppercase text-slate-900">
            Visor Integrado del PDF
          </h3>
          <span className="text-[10px] font-mono text-slate-500 font-semibold">
            15 Páginas • Guardado Offline en Cache
          </span>
        </div>
        <div className="w-full h-[550px] rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
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
