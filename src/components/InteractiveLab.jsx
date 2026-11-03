import React, { useState, useMemo } from 'react';
import { CLUSTERS, SIMULATION_BASE_STATS } from '../data/paperData';
import ShapWaterfall from './charts/ShapWaterfall';
import { Sparkles, Sliders, User, Info, CheckCircle2, ChevronRight, Compass } from 'lucide-react';

export default function InteractiveLab() {
  const [sexo, setSexo] = useState('mujer');
  const [edad, setEdad] = useState(19);
  const [escolaridad, setEscolaridad] = useState(10);
  const [ambito, setAmbito] = useState('urbano');
  const [etnia, setEtnia] = useState('originaria');
  const [lengua, setLengua] = useState('nativa');
  const [ninosMenores5, setNinosMenores5] = useState(1);
  const [adultosMayores, setAdultosMayores] = useState(0);

  // K-Prototypes clustering simulation
  const assignedCluster = useMemo(() => {
    if (ambito === 'rural' || (etnia === 'originaria' && escolaridad <= 7)) {
      return CLUSTERS[3];
    }
    if (ninosMenores5 >= 1 && (escolaridad <= 9 || edad >= 23)) {
      return CLUSTERS[2];
    }
    if (edad <= 20) {
      return CLUSTERS[1];
    }
    return CLUSTERS[0];
  }, [sexo, edad, escolaridad, ambito, etnia, lengua, ninosMenores5]);

  // SHAP Waterfall calculations
  const shapBreakdown = useMemo(() => {
    const list = [];

    const isRural = ambito === 'rural';
    const ruralImpact = isRural ? 0.082 : -0.021;
    list.push({
      name: 'Ámbito Geográfico',
      featureDisplay: isRural ? 'Rural' : 'Urbano',
      impact: ruralImpact
    });

    const edadDiff = edad - 22;
    const edadImpact = Number((edadDiff * 0.007).toFixed(3));
    list.push({
      name: 'Edad Cumplida',
      featureDisplay: `${edad} años`,
      impact: edadImpact
    });

    const isMujer = sexo === 'mujer';
    let sexImpact = isMujer ? -0.045 : 0.025;
    if (isMujer && edad <= 20) {
      sexImpact -= 0.035;
    }
    list.push({
      name: 'Sexo Biológico',
      featureDisplay: isMujer ? 'Mujer' : 'Varón',
      impact: Number(sexImpact.toFixed(3))
    });

    let ninosImpact = 0;
    if (ninosMenores5 > 0) {
      ninosImpact = isMujer ? -0.038 * ninosMenores5 : 0.018 * ninosMenores5;
    }
    list.push({
      name: 'Niños < 5 años',
      featureDisplay: `${ninosMenores5} infantes`,
      impact: Number(ninosImpact.toFixed(3))
    });

    const educDiff = escolaridad - 11;
    let educImpact = isRural ? educDiff * 0.016 : educDiff * 0.009;
    list.push({
      name: 'Escolaridad Formal',
      featureDisplay: `${escolaridad} años`,
      impact: Number(educImpact.toFixed(3))
    });

    if (etnia === 'originaria' || lengua === 'nativa') {
      const etniaImpact = isRural ? 0.008 : -0.024;
      list.push({
        name: 'Identidad Étnica',
        featureDisplay: `${etnia === 'originaria' ? 'Indígena' : 'Mestizo'}`,
        impact: Number(etniaImpact.toFixed(3))
      });
    }

    return list;
  }, [sexo, edad, escolaridad, ambito, etnia, lengua, ninosMenores5]);

  const predictedProb = useMemo(() => {
    let p = SIMULATION_BASE_STATS.overallEmploymentRate;
    shapBreakdown.forEach((item) => {
      p += item.impact;
    });
    return Math.min(Math.max(p, 0.25), 0.99);
  }, [shapBreakdown]);

  return (
    <div className="w-full flex flex-col gap-4 max-w-6xl mx-auto">
      {/* Top Banner - White & Purple */}
      <div className="bg-gradient-to-r from-purple-50 via-white to-pink-50 border border-purple-200 rounded-2xl p-4 sm:p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-1.5 mb-1">
              <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-purple-100 text-purple-900 border border-purple-200">
                Laboratorio Interactivo
              </span>
              <span className="text-[10px] text-slate-500 font-mono font-bold">ENAHO 2025 • N=13,361</span>
            </div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900">
              Simulador Etnodemográfico & Algorítmico
            </h2>
            <p className="text-xs text-slate-600 mt-0.5">
              Ajusta los atributos y observa la clasificación <strong>K-Prototypes</strong> y la descomposición <strong>TreeSHAP</strong>.
            </p>
          </div>

          {/* Quick Presets for Mobile */}
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => {
                setSexo('mujer');
                setEdad(18);
                setEscolaridad(10);
                setAmbito('urbano');
                setEtnia('mestizo');
                setLengua('castellano');
                setNinosMenores5(0);
              }}
              className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-pink-50 border border-pink-200 text-pink-800 hover:bg-pink-100"
            >
              C2: Joven 18a (Brecha Máxima)
            </button>
            <button
              onClick={() => {
                setSexo('mujer');
                setEdad(24);
                setEscolaridad(8);
                setAmbito('urbano');
                setEtnia('originaria');
                setLengua('nativa');
                setNinosMenores5(2);
              }}
              className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-amber-50 border border-amber-200 text-amber-900 hover:bg-amber-100"
            >
              C3: Madre Periurbana (Cuidado)
            </button>
            <button
              onClick={() => {
                setSexo('hombre');
                setEdad(23);
                setEscolaridad(12);
                setAmbito('rural');
                setEtnia('originaria');
                setLengua('nativa');
                setNinosMenores5(1);
              }}
              className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-emerald-50 border border-emerald-200 text-emerald-900 hover:bg-emerald-100"
            >
              C4: Rural Educado (+31% Retorno)
            </button>
          </div>
        </div>
      </div>

      {/* Grid: Controls vs Output */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Controls Column (5 cols) */}
        <div className="lg:col-span-5 bg-white border border-purple-200 rounded-2xl p-4 shadow-sm flex flex-col gap-3">
          <div className="flex items-center gap-1.5 border-b border-purple-100 pb-2">
            <Sliders className="w-4 h-4 text-purple-700" />
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">
              Variables del Informante
            </h3>
          </div>

          {/* Sexo */}
          <div>
            <label className="text-[11px] font-bold text-slate-700 mb-1 block">
              1. Sexo Biológico (p207)
            </label>
            <div className="grid grid-cols-2 gap-1.5">
              <button
                type="button"
                onClick={() => setSexo('mujer')}
                className={`py-1.5 px-2 rounded-xl text-xs font-bold transition-all border ${
                  sexo === 'mujer'
                    ? 'bg-purple-700 text-white border-purple-800 shadow-sm'
                    : 'bg-purple-50 text-slate-700 border-purple-200 hover:bg-purple-100'
                }`}
              >
                Mujer (Femenino)
              </button>
              <button
                type="button"
                onClick={() => setSexo('hombre')}
                className={`py-1.5 px-2 rounded-xl text-xs font-bold transition-all border ${
                  sexo === 'hombre'
                    ? 'bg-purple-700 text-white border-purple-800 shadow-sm'
                    : 'bg-purple-50 text-slate-700 border-purple-200 hover:bg-purple-100'
                }`}
              >
                Varón (Masculino)
              </button>
            </div>
          </div>

          {/* Edad */}
          <div>
            <div className="flex justify-between text-[11px] font-bold text-slate-700 mb-0.5">
              <span>2. Edad Cumplida</span>
              <span className="font-mono text-purple-800 font-black">{edad} años</span>
            </div>
            <input
              type="range"
              min="15"
              max="29"
              value={edad}
              onChange={(e) => setEdad(Number(e.target.value))}
              className="w-full accent-purple-700 cursor-pointer h-1.5"
            />
          </div>

          {/* Escolaridad */}
          <div>
            <div className="flex justify-between text-[11px] font-bold text-slate-700 mb-0.5">
              <span>3. Años de Escolaridad</span>
              <span className="font-mono text-purple-800 font-black">{escolaridad} años</span>
            </div>
            <input
              type="range"
              min="0"
              max="18"
              value={escolaridad}
              onChange={(e) => setEscolaridad(Number(e.target.value))}
              className="w-full accent-purple-700 cursor-pointer h-1.5"
            />
          </div>

          {/* Ámbito */}
          <div>
            <label className="text-[11px] font-bold text-slate-700 mb-1 block">
              4. Ámbito Territorial
            </label>
            <div className="grid grid-cols-2 gap-1.5">
              <button
                type="button"
                onClick={() => setAmbito('urbano')}
                className={`py-1.5 px-2 rounded-xl text-xs font-bold border ${
                  ambito === 'urbano'
                    ? 'bg-purple-700 text-white border-purple-800'
                    : 'bg-purple-50 text-slate-700 border-purple-200'
                }`}
              >
                Urbano / Capital
              </button>
              <button
                type="button"
                onClick={() => setAmbito('rural')}
                className={`py-1.5 px-2 rounded-xl text-xs font-bold border ${
                  ambito === 'rural'
                    ? 'bg-purple-700 text-white border-purple-800'
                    : 'bg-purple-50 text-slate-700 border-purple-200'
                }`}
              >
                Rural / Agrario
              </button>
            </div>
          </div>

          {/* Etnia & Lengua */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[10px] font-bold text-slate-700 mb-1 block">
                5. Etnia (p558c)
              </label>
              <select
                value={etnia}
                onChange={(e) => setEtnia(e.target.value)}
                className="w-full bg-purple-50 border border-purple-200 rounded-xl px-2 py-1.5 text-[11px] font-semibold text-slate-900"
              >
                <option value="originaria">Indígena / Nativa</option>
                <option value="mestizo">Mestizo / Criollo</option>
                <option value="afro">Afroperuano</option>
                <option value="blanco">Blanco / Otro</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] font-bold text-slate-700 mb-1 block">
                6. Lengua (p300a)
              </label>
              <select
                value={lengua}
                onChange={(e) => setLengua(e.target.value)}
                className="w-full bg-purple-50 border border-purple-200 rounded-xl px-2 py-1.5 text-[11px] font-semibold text-slate-900"
              >
                <option value="nativa">Quechua/Nativa</option>
                <option value="castellano">Castellano</option>
              </select>
            </div>
          </div>

          {/* Carga de Cuidado */}
          <div>
            <label className="text-[10px] font-bold text-slate-700 mb-1 block">
              7. Niños &lt; 5 años en el Hogar
            </label>
            <div className="flex gap-1">
              {[0, 1, 2, 3].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setNinosMenores5(num)}
                  className={`flex-1 py-1 rounded-lg text-xs font-bold border ${
                    ninosMenores5 === num
                      ? 'bg-purple-700 text-white border-purple-800'
                      : 'bg-purple-50 text-slate-700 border-purple-200'
                  }`}
                >
                  {num === 3 ? '3+' : num}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Live Output Column (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-3">
          {/* Assigned Cluster Card */}
          <div className="bg-white border-2 border-purple-300 rounded-2xl p-3.5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: assignedCluster.color }}
                />
                <span className="text-[10px] font-black uppercase text-purple-900">
                  Tipología K-Prototypes
                </span>
              </div>
              <span
                className="px-2.5 py-0.5 rounded-full text-[10px] font-black text-white"
                style={{ backgroundColor: assignedCluster.color }}
              >
                Clúster {assignedCluster.id}: {assignedCluster.name}
              </span>
            </div>

            <p className="text-xs text-slate-700 mt-1.5 font-medium leading-relaxed">
              {assignedCluster.description}
            </p>

            <div className="grid grid-cols-3 gap-2 mt-2 pt-2 border-t border-purple-100 text-center">
              <div className="bg-purple-50 rounded-lg p-1.5">
                <div className="text-[9px] text-slate-500 font-semibold">Peso PEA</div>
                <div className="text-sm font-black text-purple-900 font-mono">{assignedCluster.share}%</div>
              </div>
              <div className="bg-purple-50 rounded-lg p-1.5">
                <div className="text-[9px] text-slate-500 font-semibold">Tasa Ocupación</div>
                <div className="text-sm font-black text-purple-900 font-mono">{assignedCluster.metrics.ocupacion}%</div>
              </div>
              <div className="bg-purple-50 rounded-lg p-1.5">
                <div className="text-[9px] text-slate-500 font-semibold">Penalización Mujer</div>
                <div className={`text-sm font-black font-mono ${assignedCluster.id === 2 ? 'text-rose-700' : 'text-purple-900'}`}>
                  OR = {assignedCluster.oddsRatios[0].or.toFixed(2)}
                </div>
              </div>
            </div>
          </div>

          {/* TreeSHAP Local Waterfall */}
          <div className="bg-white border border-purple-200 rounded-2xl p-3 shadow-sm">
            <div className="flex items-center justify-between mb-1 px-1">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-purple-700" />
                <h4 className="text-[10px] font-black text-slate-900 uppercase">
                  Descomposición Local TreeSHAP (&phi;_i)
                </h4>
              </div>
              <span className="text-[10px] font-mono font-black text-purple-800">
                P(Ocupado) = {(predictedProb * 100).toFixed(1)}%
              </span>
            </div>

            <ShapWaterfall baseValue={0.911} contributions={shapBreakdown} />
          </div>

          {/* Causal Note */}
          <div className="bg-purple-50 border border-purple-200 rounded-xl p-2.5 text-[11px] text-slate-700 flex items-start gap-2">
            <Info className="w-4 h-4 text-purple-700 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="text-purple-950">Inferencia Causal (DML):</strong> La penalización observada en jóvenes mujeres con carga de cuidado no es aditiva aislada, sino un multiplicador estructural que requiere universalización de salas cuna para evitar deserción laboral.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
