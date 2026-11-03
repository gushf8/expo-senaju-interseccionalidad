import React, { useState, useMemo } from 'react';
import { CLUSTERS, SIMULATION_BASE_STATS } from '../data/paperData';
import ShapWaterfall from './charts/ShapWaterfall';
import MathView from './MathView';
import { Sparkles, Sliders, User, Info, CheckCircle2, AlertTriangle } from 'lucide-react';

export default function InteractiveLab() {
  // Person State
  const [sexo, setSexo] = useState('mujer'); // 'mujer' | 'hombre'
  const [edad, setEdad] = useState(19);
  const [escolaridad, setEscolaridad] = useState(10);
  const [ambito, setAmbito] = useState('urbano'); // 'urbano' | 'rural'
  const [etnia, setEtnia] = useState('originaria'); // 'originaria' | 'mestizo' | 'afro' | 'blanco'
  const [lengua, setLengua] = useState('nativa'); // 'nativa' | 'castellano'
  const [ninosMenores5, setNinosMenores5] = useState(1);
  const [adultosMayores, setAdultosMayores] = useState(0);

  // K-Prototypes distance assignment simulation
  const assignedCluster = useMemo(() => {
    // Score based on features
    if (ambito === 'rural' || (etnia === 'originaria' && escolaridad <= 7)) {
      return CLUSTERS[3]; // Rural Originario
    }
    if (ninosMenores5 >= 1 && (escolaridad <= 9 || edad >= 23)) {
      return CLUSTERS[2]; // Periurbano vulnerable
    }
    if (edad <= 20) {
      return CLUSTERS[1]; // Transición formativa
    }
    return CLUSTERS[0]; // Urbano mestizo pleno
  }, [sexo, edad, escolaridad, ambito, etnia, lengua, ninosMenores5]);

  // SHAP Waterfall calculations
  const shapBreakdown = useMemo(() => {
    const list = [];

    // Ámbito
    const isRural = ambito === 'rural';
    const ruralImpact = isRural ? 0.082 : -0.021;
    list.push({
      name: 'Ámbito Geográfico',
      featureDisplay: isRural ? 'Rural (Agrario)' : 'Urbano',
      impact: ruralImpact
    });

    // Edad
    const edadDiff = edad - 22;
    const edadImpact = Number((edadDiff * 0.007).toFixed(3));
    list.push({
      name: 'Edad Cumplida',
      featureDisplay: `${edad} años (${edadDiff >= 0 ? '+' : ''}${edadDiff} vs media)`,
      impact: edadImpact
    });

    // Sexo
    const isMujer = sexo === 'mujer';
    let sexImpact = isMujer ? -0.045 : 0.025;
    // Interaction: if in Transition group (age <= 20), gender penalty is even harsher
    if (isMujer && edad <= 20) {
      sexImpact -= 0.035;
    }
    list.push({
      name: 'Sexo Biológico',
      featureDisplay: isMujer ? 'Mujer (Femenino)' : 'Varón (Masculino)',
      impact: Number(sexImpact.toFixed(3))
    });

    // Carga de Cuidado (Niños < 5)
    let ninosImpact = 0;
    if (ninosMenores5 > 0) {
      if (isMujer) {
        ninosImpact = -0.038 * ninosMenores5;
      } else {
        // En varones opera como presión para buscar cualquier trabajo
        ninosImpact = 0.018 * ninosMenores5;
      }
    }
    list.push({
      name: 'Carga de Cuidado (<5 años)',
      featureDisplay: `${ninosMenores5} niños dependientes`,
      impact: Number(ninosImpact.toFixed(3))
    });

    // Escolaridad
    const educDiff = escolaridad - 11;
    let educImpact = educDiff * 0.009;
    if (isRural) {
      // Retorno extraordinario en rural
      educImpact = educDiff * 0.016;
    }
    list.push({
      name: 'Años de Escolaridad',
      featureDisplay: `${escolaridad} años formales`,
      impact: Number(educImpact.toFixed(3))
    });

    // Etnia y Lengua
    if (etnia === 'originaria' || lengua === 'nativa') {
      const etniaImpact = isRural ? 0.008 : -0.024;
      list.push({
        name: 'Identidad Étnico-Lingüística',
        featureDisplay: `${etnia === 'originaria' ? 'Etnia Indígena' : 'Mestizo/Otro'} • ${lengua === 'nativa' ? 'Lengua Nativa' : 'Castellano'}`,
        impact: Number(etniaImpact.toFixed(3))
      });
    }

    return list;
  }, [sexo, edad, escolaridad, ambito, etnia, lengua, ninosMenores5]);

  // Final predicted probability
  const predictedProb = useMemo(() => {
    let p = SIMULATION_BASE_STATS.overallEmploymentRate;
    shapBreakdown.forEach((item) => {
      p += item.impact;
    });
    return Math.min(Math.max(p, 0.25), 0.99);
  }, [shapBreakdown]);

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-indigo-950/70 via-purple-950/40 to-slate-900 border border-indigo-500/30 rounded-2xl p-5 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                Laboratorio Interactivo de Microdatos
              </span>
              <span className="text-xs text-slate-400 font-mono">ENAHO 2025 • N = 13,361</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
              Simulador Etnodemográfico & Algorítmico en Tiempo Real
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
              Configura los atributos de un joven peruano y observa cómo el algoritmo <strong>K-Prototypes</strong> lo clasifica, qué <strong>Odds Ratio</strong> aplica y cómo <strong>TreeSHAP</strong> descompone su probabilidad de ocupación.
            </p>
          </div>

          {/* Quick Presets */}
          <div className="flex flex-wrap gap-2">
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
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-pink-950/60 border border-pink-500/40 text-pink-200 hover:bg-pink-900 transition-colors"
            >
              Caso Clúster 2: Joven 18a (Máxima Brecha)
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
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-950/60 border border-amber-500/40 text-amber-200 hover:bg-amber-900 transition-colors"
            >
              Caso Clúster 3: Madre Periurbana (Cuidado)
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
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-950/60 border border-emerald-500/40 text-emerald-200 hover:bg-emerald-900 transition-colors"
            >
              Caso Clúster 4: Joven Rural Educado
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Controls vs Live Inference */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Controls Column (5 cols) */}
        <div className="lg:col-span-5 bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg flex flex-col gap-4">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <Sliders className="w-5 h-5 text-indigo-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Variables del Informante (ENAHO)
            </h3>
          </div>

          {/* Sexo */}
          <div>
            <label className="text-xs font-semibold text-slate-300 mb-1.5 block">
              1. Sexo Biológico (p207)
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setSexo('mujer')}
                className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border ${
                  sexo === 'mujer'
                    ? 'bg-pink-600 text-white border-pink-400 shadow-lg shadow-pink-600/30'
                    : 'bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-700'
                }`}
              >
                Mujer (Femenino)
              </button>
              <button
                type="button"
                onClick={() => setSexo('hombre')}
                className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border ${
                  sexo === 'hombre'
                    ? 'bg-sky-600 text-white border-sky-400 shadow-lg shadow-sky-600/30'
                    : 'bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-700'
                }`}
              >
                Varón (Masculino)
              </button>
            </div>
          </div>

          {/* Edad */}
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1">
              <span>2. Edad Cumplida (p208a)</span>
              <span className="font-mono text-indigo-400 font-bold">{edad} años</span>
            </div>
            <input
              type="range"
              min="15"
              max="29"
              value={edad}
              onChange={(e) => setEdad(Number(e.target.value))}
              className="w-full accent-indigo-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-0.5">
              <span>15 (Adolescente)</span>
              <span>22 (Intermedio)</span>
              <span>29 (Adulto Joven)</span>
            </div>
          </div>

          {/* Escolaridad */}
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1">
              <span>3. Años de Escolaridad (p301a)</span>
              <span className="font-mono text-emerald-400 font-bold">{escolaridad} años</span>
            </div>
            <input
              type="range"
              min="0"
              max="18"
              value={escolaridad}
              onChange={(e) => setEscolaridad(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-0.5">
              <span>0 (Sin nivel)</span>
              <span>6 (Primaria)</span>
              <span>11 (Secundaria)</span>
              <span>16 (Superior)</span>
            </div>
          </div>

          {/* Ámbito Geográfico */}
          <div>
            <label className="text-xs font-semibold text-slate-300 mb-1.5 block">
              4. Ámbito Territorial (estrato)
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setAmbito('urbano')}
                className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border ${
                  ambito === 'urbano'
                    ? 'bg-indigo-600 text-white border-indigo-400'
                    : 'bg-slate-800 text-slate-400 border-slate-700'
                }`}
              >
                Urbano / Capital
              </button>
              <button
                type="button"
                onClick={() => setAmbito('rural')}
                className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border ${
                  ambito === 'rural'
                    ? 'bg-emerald-600 text-white border-emerald-400'
                    : 'bg-slate-800 text-slate-400 border-slate-700'
                }`}
              >
                Rural / Agrario
              </button>
            </div>
          </div>

          {/* Autoidentificación Étnica & Lengua */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-300 mb-1.5 block">
                5. Etnia (p558c)
              </label>
              <select
                value={etnia}
                onChange={(e) => setEtnia(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-2.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
              >
                <option value="originaria">Indígena / Nativa</option>
                <option value="mestizo">Mestizo / Criollo</option>
                <option value="afro">Afroperuano</option>
                <option value="blanco">Blanco / Otro</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 mb-1.5 block">
                6. Lengua (p300a)
              </label>
              <select
                value={lengua}
                onChange={(e) => setLengua(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-2.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
              >
                <option value="nativa">Quechua / Aimara / Nativa</option>
                <option value="castellano">Castellano</option>
              </select>
            </div>
          </div>

          {/* Carga de cuidado */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-300 mb-1.5 block">
                7. Niños &lt; 5 años
              </label>
              <div className="flex gap-1.5">
                {[0, 1, 2, 3].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setNinosMenores5(num)}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                      ninosMenores5 === num
                        ? 'bg-indigo-600 text-white border-indigo-400'
                        : 'bg-slate-800 text-slate-400 border-slate-700'
                    }`}
                  >
                    {num === 3 ? '3+' : num}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 mb-1.5 block">
                8. Adultos &gt; 65a
              </label>
              <div className="flex gap-1.5">
                {[0, 1, 2].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setAdultosMayores(num)}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                      adultosMayores === num
                        ? 'bg-indigo-600 text-white border-indigo-400'
                        : 'bg-slate-800 text-slate-400 border-slate-700'
                    }`}
                  >
                    {num === 2 ? '2+' : num}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Live Output Column (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          {/* Assigned Cluster Card */}
          <div
            className="rounded-2xl p-4 border transition-all duration-300"
            style={{
              backgroundColor: assignedCluster.accentBg,
              borderColor: assignedCluster.borderColor
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: assignedCluster.color }}
                />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Tipología K-Prototypes Asignada
                </span>
              </div>
              <span
                className="px-2.5 py-0.5 rounded-full text-[11px] font-bold text-white shadow-sm"
                style={{ backgroundColor: assignedCluster.color }}
              >
                Clúster {assignedCluster.id}: {assignedCluster.name}
              </span>
            </div>

            <p className="text-xs text-slate-200 mt-2">
              {assignedCluster.description}
            </p>

            <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-white/10 text-center">
              <div className="bg-slate-900/40 rounded-lg p-2">
                <div className="text-[10px] text-slate-400">Peso en PEA</div>
                <div className="text-sm font-bold text-white font-mono">{assignedCluster.share}%</div>
              </div>
              <div className="bg-slate-900/40 rounded-lg p-2">
                <div className="text-[10px] text-slate-400">Tasa Ocupación</div>
                <div className="text-sm font-bold text-white font-mono">{assignedCluster.metrics.ocupacion}%</div>
              </div>
              <div className="bg-slate-900/40 rounded-lg p-2">
                <div className="text-[10px] text-slate-400">Penalización Mujer</div>
                <div className={`text-sm font-bold font-mono ${assignedCluster.id === 2 ? 'text-rose-400' : 'text-slate-200'}`}>
                  OR = {assignedCluster.oddsRatios[0].or.toFixed(2)}
                </div>
              </div>
            </div>
          </div>

          {/* TreeSHAP Local Waterfall */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-pink-400" />
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  Descomposición Local TreeSHAP (&phi;_i)
                </h4>
              </div>
              <span className="text-[11px] font-mono text-slate-400">
                P(Ocupación) = {(predictedProb * 100).toFixed(1)}%
              </span>
            </div>

            <ShapWaterfall baseValue={0.911} contributions={shapBreakdown} />
          </div>

          {/* Causal Note */}
          <div className="bg-indigo-950/40 border border-indigo-500/30 rounded-xl p-3 text-xs text-slate-300 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="text-indigo-200">Lectura Causal Interseccional (DML):</strong> Si esta persona es mujer en transición formativa (15-20 años) con dependientes infantiles, la penalización no es simplemente la suma de variables, sino un efecto multiplicador de exclusión laboral que exige políticas de cuidado directo para no truncar su educación.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
