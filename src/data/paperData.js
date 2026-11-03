// Base de Datos Maestra y Modelo Conceptual
// Investigación Ganadora SENAJU 2026 - Gustavo Fernando Huamán Fernández

export const PAPER_METADATA = {
  title: "Interseccionalidad de Género y Etnicidad en la Inserción Laboral Juvenil en el Perú: Tipologías Basadas en Clustering y Modelamiento Predictivo",
  author: "Gustavo Fernando Huamán Fernández",
  institution: "Secretaría Nacional de la Juventud (SENAJU) - Premio Nacional de Juventudes 2026",
  dataSource: "Instituto Nacional de Estadística e Informática (INEI) - ENAHO 2025",
  sampleSize: 13361,
  population: "Jóvenes de 15 a 29 años en la Población Económicamente Activa (PEA)",
  date: "Agosto de 2026",
  pdfFileName: "investigacion_senaju_2026.pdf",
  pdfPath: "/investigacion_senaju_2026.pdf",
  dni: "73175432",
  ejes: [
    "Eje 8: Juventudes en situación de vulnerabilidad (Línea: Juventudes indígenas y afroperuanas)",
    "Eje 2: Trabajo (Línea: Inserción laboral juvenil)"
  ]
};

export const CLUSTERS = [
  {
    id: 1,
    name: "Urbano Mestizo Pleno",
    share: 40.4,
    n: 5397,
    color: "#7c3aed", // Royal Purple
    accentBg: "rgba(124, 58, 237, 0.08)",
    borderColor: "rgba(124, 58, 237, 0.35)",
    badge: "Mayoría consolidada",
    metrics: {
      mujeres: 38.6,
      edadMedia: 24.8,
      escolaridad: 11.0,
      ruralidad: 5.8,
      etniaOriginaria: 12.1,
      lenguaNativa: 4.2,
      pobreza: 14.2,
      ocupacion: 92.9,
      cuidadoInfantil: 18.2
    },
    oddsRatios: [
      { factor: "Mujer (vs Hombre)", or: 0.76, ciLow: 0.62, ciHigh: 0.94, p: 0.012, sig: true },
      { factor: "Etnia Originaria", or: 0.92, ciLow: 0.75, ciHigh: 1.13, p: 0.421, sig: false },
      { factor: "Años Escolaridad", or: 1.05, ciLow: 1.01, ciHigh: 1.10, p: 0.018, sig: true },
      { factor: "Niños < 5 años", or: 0.98, ciLow: 0.79, ciHigh: 1.21, p: 0.835, sig: false }
    ],
    description: "Juventud residente en ciudades capitales y costa urbana, con secundaria completa o superior técnica. La penalización de género es moderada pero estadísticamente significativa (OR = 0.76).",
    policyTarget: "Inserción formal, intermediación laboral calificada y reducción de subempleo invisible."
  },
  {
    id: 2,
    name: "Jóvenes en Transición Formativa",
    share: 39.7,
    n: 5299,
    color: "#db2777", // Fuchsia / Rose Deep
    accentBg: "rgba(219, 39, 119, 0.08)",
    borderColor: "rgba(219, 39, 119, 0.35)",
    badge: "Punto de Máxima Brecha",
    metrics: {
      mujeres: 42.4,
      edadMedia: 18.8,
      escolaridad: 9.8,
      ruralidad: 12.1,
      etniaOriginaria: 18.5,
      lenguaNativa: 7.1,
      pobreza: 22.8,
      ocupacion: 89.4,
      cuidadoInfantil: 12.5
    },
    oddsRatios: [
      { factor: "Mujer (vs Hombre)", or: 0.65, ciLow: 0.54, ciHigh: 0.77, p: 0.0001, sig: true, critical: true },
      { factor: "Etnia Originaria", or: 0.88, ciLow: 0.72, ciHigh: 1.07, p: 0.198, sig: false },
      { factor: "Años Escolaridad", or: 1.08, ciLow: 1.03, ciHigh: 1.14, p: 0.003, sig: true },
      { factor: "Niños < 5 años", or: 0.84, ciLow: 0.64, ciHigh: 1.11, p: 0.221, sig: false }
    ],
    description: "Juventud temprana (15-20 años) en dilema entre estudiar y trabajar. Es el grupo donde la brecha de género se agudiza al extremo: las mujeres tienen 35% menos probabilidad de ocupación que los varones (OR = 0.65).",
    policyTarget: "Becas de permanencia universitaria/técnica, tutorías de transición escuela-trabajo y subsidios para jóvenes mujeres cuidadoras."
  },
  {
    id: 3,
    name: "Vulnerables Periurbanos",
    share: 15.0,
    n: 1998,
    color: "#b45309", // Warm Amber
    accentBg: "rgba(180, 83, 9, 0.08)",
    borderColor: "rgba(180, 83, 9, 0.35)",
    badge: "Presión de Cuidado Extremo",
    metrics: {
      mujeres: 48.9,
      edadMedia: 25.4,
      escolaridad: 8.2,
      ruralidad: 20.4,
      etniaOriginaria: 28.3,
      lenguaNativa: 14.8,
      pobreza: 38.6,
      ocupacion: 89.4,
      cuidadoInfantil: 46.8
    },
    oddsRatios: [
      { factor: "Mujer (vs Hombre)", or: 0.72, ciLow: 0.54, ciHigh: 0.96, p: 0.024, sig: true },
      { factor: "Etnia Originaria", or: 0.83, ciLow: 0.64, ciHigh: 1.08, p: 0.165, sig: false },
      { factor: "Años Escolaridad", or: 1.04, ciLow: 0.98, ciHigh: 1.11, p: 0.192, sig: false },
      { factor: "Niños < 5 años", or: 1.45, ciLow: 1.02, ciHigh: 2.06, p: 0.038, sig: true, critical: true }
    ],
    description: "Hogares en periferias urbanas con alta dependencia demográfica. La presencia de niños pequeños eleva en 45% los momios de ocupación (OR = 1.45), obligando a aceptar empleos precarios por pura necesidad de subsistencia.",
    policyTarget: "Cunas infantiles públicas (Cuna Más universal urbano), guarderías en zonas industriales y programas de economía popular del cuidado."
  },
  {
    id: 4,
    name: "Rural Originario Agrario",
    share: 5.0,
    n: 667,
    color: "#059669", // Emerald Green
    accentBg: "rgba(5, 150, 105, 0.08)",
    borderColor: "rgba(5, 150, 105, 0.35)",
    badge: "Mayor Retorno al Capital Humano",
    metrics: {
      mujeres: 35.1,
      edadMedia: 23.9,
      escolaridad: 5.6,
      ruralidad: 64.2,
      etniaOriginaria: 44.7,
      lenguaNativa: 25.8,
      pobreza: 54.1,
      ocupacion: 94.8,
      cuidadoInfantil: 39.4
    },
    oddsRatios: [
      { factor: "Mujer (vs Hombre)", or: 0.89, ciLow: 0.55, ciHigh: 1.44, p: 0.638, sig: false },
      { factor: "Etnia Originaria", or: 0.94, ciLow: 0.61, ciHigh: 1.45, p: 0.782, sig: false },
      { factor: "Años Escolaridad", or: 1.31, ciLow: 1.12, ciHigh: 1.53, p: 0.001, sig: true, critical: true },
      { factor: "Niños < 5 años", or: 1.15, ciLow: 0.74, ciHigh: 1.78, p: 0.540, sig: false }
    ],
    description: "Comunidades rurales andinas y amazónicas con alta tasa de autoempleo agrícola familiar de subsistencia (94.8%). Cada año adicional de escolaridad dispara en +31% los momios de inserción productiva (OR = 1.31).",
    policyTarget: "Educación intercultural bilingüe (EIB) técnica, alfabetización digital rural y créditos productivos juveniles con pertinencia cultural."
  }
];

export const THEORETICAL_MODELS = [
  {
    id: "k-prototypes",
    name: "K-Prototypes Clustering",
    subtitle: "Segmentación no supervisada para datos mixtos (Huang, 1998)",
    badge: "Fase 1: No Supervisada",
    tagColor: "purple",
    whyUsed: "La ENAHO combina simultáneamente variables numéricas continuas (edad, escolaridad, dependientes) con variables categóricas nominales y ordinales (etnia, lengua, ámbito, pobreza). K-Means colapsa con datos categóricos y K-Modes destruye distancias continuas. K-Prototypes unifica ambos mundos.",
    formulaTeX: `E = \\sum_{j=1}^{k} \\sum_{i=1}^{n} u_{ij} \\left[ \\sum_{r=1}^{p} (x_{ir} - m_{jr})^2 + \\gamma \\sum_{s=1}^{q} \\delta(x_{is}, m_{js}) \\right]`,
    components: [
      { symbol: "u_{ij} \\in \\{0, 1\\}", desc: "Pertenencia dura de la observación i al clúster j" },
      { symbol: "\\sum_{r=1}^p (x_{ir} - m_{jr})^2", desc: "Distancia euclidiana al cuadrado para las p variables numéricas" },
      { symbol: "\\delta(x_{is}, m_{js})", desc: "Función de disimilitud simple para variables categóricas (0 si coinciden, 1 si difieren)" },
      { symbol: "\\gamma", desc: "Hiperparámetro de balance que equilibra las escalas de varianza entre el espacio numérico y categórico" }
    ],
    validationDetails: "La selección de k = 4 se realizó mediante el Elbow Method (inflexión del 20.24% en la inercia global de costo) y el coeficiente de silueta basado en la distancia de Gower.",
    pythonCode: `# Implementación oficial con kmodes
from kmodes.kprototypes import KPrototypes
import numpy as np

# Inicialización determinista con semilla fija
kproto = KPrototypes(
    n_clusters=4, 
    init='Huang', 
    gamma=0.75, 
    n_init=10, 
    random_state=42
)
clusters = kproto.fit_predict(X_mixed, categorical=[2, 3, 4, 6])`
  },
  {
    id: "logit",
    name: "Regresión Logística Multivariada",
    subtitle: "Inferencia causal y razones de momios (Odds Ratios)",
    badge: "Fase 2: Inferencia Econométrica",
    tagColor: "purple",
    whyUsed: "Permite estimar el efecto ceteris paribus de las variables interseccionales (género, etnicidad, lengua) sobre la probabilidad de ocupación en la PEA dentro de cada subpoblación homogénea descubierta por el clustering.",
    formulaTeX: `\\ln\\left(\\frac{P(Y=1|X)}{1 - P(Y=1|X)}\\right) = \\beta_0 + \\beta_{sexo}\\text{Mujer} + \\beta_{etnia}\\text{Originaria} + \\beta_{lengua}\\text{Nativa} + \\beta_{educ}\\text{Educ} + \\sum_{m} \\theta_m Z_m`,
    components: [
      { symbol: "\\text{OR} = \\exp(\\beta_k)", desc: "Razón de momios: razón entre la probabilidad de estar ocupado vs no ocupado ante un cambio unitario" },
      { symbol: "P(Y=1|X) = \\frac{1}{1 + e^{-X\\beta}}", desc: "Función de enlace sigmoide que garantiza probabilidades en el intervalo [0, 1]" },
      { symbol: "Z_m", desc: "Vector de covariables de control (edad, dependientes infantiles, adultos mayores, estrato)" },
      { symbol: "\\text{SE robustos}", desc: "Corrección por heterocedasticidad y diseño de muestreo complejo (factor de expansión ENAHO)" }
    ],
    validationDetails: "Se estimaron modelos independientes para cada uno de los 4 clústeres etnodemográficos, revelando que el impacto de ser mujer varía desde OR = 0.65 en jóvenes tempranos hasta OR = 0.89 en zonas rurales.",
    pythonCode: `# Inferencia econométrica con statsmodels
import statsmodels.api as sm

for c in range(1, 5):
    subset = df[df['cluster'] == c]
    X_c = sm.add_constant(subset[['mujer', 'etnia_indigena', 'lengua_nativa', 'escolaridad', 'infantes_menores5']])
    y_c = subset['ocupado']
    
    model = sm.Logit(y_c, X_c)
    res = model.fit(cov_type='cluster', cov_kwds={'groups': subset['conglome']})
    odds_ratios = np.exp(res.params)`
  },
  {
    id: "xgboost",
    name: "Ensamble Supervisado (Random Forest & XGBoost)",
    subtitle: "Aprendizaje no lineal de gradiente optimizado",
    badge: "Fase 3: Modelamiento Predictivo",
    tagColor: "purple",
    whyUsed: "La tasa base de ocupación en la PEA juvenil es muy desbalanceada (91.1%). Los modelos lineales subestiman umbrales críticos y no linealidades. XGBoost y Random Forest capturan interacciones complejas de orden superior.",
    formulaTeX: `\\mathcal{L}^{(t)} \\approx \\sum_{i=1}^{n} \\left[ g_i f_t(x_i) + \\frac{1}{2} h_i f_t^2(x_i) \\right] + \\gamma T + \\frac{1}{2} \\lambda \\sum_{j=1}^{T} w_j^2`,
    components: [
      { symbol: "g_i = \\partial_{\\hat{y}^{(t-1)}} l(y_i, \\hat{y}^{(t-1)})", desc: "Gradiente de primer orden de la función de pérdida logística" },
      { symbol: "h_i = \\partial^2_{\\hat{y}^{(t-1)}} l(y_i, \\hat{y}^{(t-1)})", desc: "Hessiano de segundo orden que calibra la curvatura de descenso" },
      { symbol: "f_t(x)", desc: "Nuevo árbol de decisión añadido en la iteración t para corregir los residuos" },
      { symbol: "\\gamma T + \\frac{1}{2}\\lambda \\sum w_j^2", desc: "Término de regularización de complejidad: penaliza hojas excesivas (T) y pesos extremos (w)" }
    ],
    validationDetails: "Validación cruzada estratificada de 5 pliegues (5-Fold CV). XGBoost alcanzó AUC-ROC = 0.785 frente a 0.658 del Logit tradicional (+19.3% de ganancia discriminatoria en clases desbalanceadas).",
    pythonCode: `# Pipeline con XGBoost optimizado
from xgboost import XGBClassifier
from sklearn.model_selection import StratifiedKFold

xgb = XGBClassifier(
    n_estimators=300,
    max_depth=5,
    learning_rate=0.03,
    subsample=0.8,
    colsample_bytree=0.8,
    scale_pos_weight=1.0,
    random_state=42
)
cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)`
  },
  {
    id: "treeshap",
    name: "Interpretabilidad Algorítmica con TreeSHAP",
    subtitle: "Atribución aditiva local basada en teoría de juegos cooperativos (Lundberg et al., 2020)",
    badge: "Fase 4: Explicabilidad (XAI)",
    tagColor: "purple",
    whyUsed: "Resuelve el problema de la 'caja negra' en Machine Learning. Permite saber exactamente cuánto empuja cada variable individual (en probabilidad marginal) a cada joven peruano hacia la ocupación o desocupación.",
    formulaTeX: `\\phi_i(f, x) = \\sum_{S \\subseteq F \\setminus \\{i\\}} \\frac{|S|!(|F| - |S| - 1)!}{|F|!} \\left[ f_x(S \\cup \\{i\\}) - f_x(S) \\right]`,
    components: [
      { symbol: "\\phi_i(f, x)", desc: "Valor Shapley: contribución marginal neta de la variable i a la predicción" },
      { symbol: "F", desc: "Conjunto total de covariables etnodemográficas y de capital humano" },
      { symbol: "S", desc: "Subconjunto de variables en coalición (todas las combinaciones posibles)" },
      { symbol: "f(x) = \\mathbb{E}[f(X)] + \\sum_{i=1}^{M} \\phi_i(x)", desc: "Axioma de Eficiencia Aditiva: la predicción es la suma del valor base y los efectos individuales" }
    ],
    validationDetails: "TreeSHAP reduce la complejidad computacional exponencial \\mathcal{O}(M 2^{|F|}) a tiempo polinómico \\mathcal{O}(TLD^2) navegando la estructura interna de los árboles. Reveló que la ruralidad y edad son los mayores impulsores positivos (+0.18, +0.14), mientras ser mujer y tener dependientes pequeños generan fuertes impactos negativos (-0.19, -0.12).",
    pythonCode: `# Explicabilidad local y global con TreeSHAP
import shap

explainer = shap.TreeExplainer(xgb)
shap_values = explainer(X_test)

# Generación del Beeswarm Summary Plot
shap.summary_plot(shap_values, X_test, plot_type="dot")`
  },
  {
    id: "dml",
    name: "Double Machine Learning (DML)",
    subtitle: "Inferencia Causal Libre de Sesgo de Regularización (Chernozhukov et al., 2018)",
    badge: "Fase 5: Inferencia Causal Robusta",
    tagColor: "purple",
    whyUsed: "Al usar ML estándar para inferir efectos causales, los algoritmos introducen sesgo de regularización (encogimiento de parámetros). DML elimina este sesgo aplicando ortogonalidad de Neyman y estimación cruzada (Cross-Fitting), aislando el impacto causal puro de la interseccionalidad.",
    formulaTeX: `\\psi(W; \\theta_0, \\eta_0) = \\big( Y - \\ell_0(X) - \\theta_0 (D - m_0(X)) \\big) \\big( D - m_0(X) \\big) = 0`,
    components: [
      { symbol: "Y = D\\theta_0 + g_0(X) + U", desc: "Ecuación de resultado (Ocupación juvenil) condicionada por el tratamiento D y confusores X" },
      { symbol: "D = m_0(X) + V", desc: "Ecuación del tratamiento (Condición interseccional: Mujer Indígena Rural) predicha por X" },
      { symbol: "\\partial_\\eta \\mathbb{E}[\\psi(W; \\theta_0, \\eta)]\\big|_{\\eta=\\eta_0} = 0", desc: "Condición de Ortogonalidad de Neyman: la derivada de Fréchet respecto a las funciones de molestia se anula" },
      { symbol: "K\\text{-Fold Cross-Fitting}", desc: "Partición muestral cruzada para evitar que el sobreajuste contamine la inferencia assintótica \\sqrt{N}" }
    ],
    validationDetails: "Garantiza que el estimador del efecto causal \\hat{\\theta}_{DML} converja a una distribución normal asintótica \\sqrt{N}(\\hat{\\theta} - \\theta_0) \\xrightarrow{d} \\mathcal{N}(0, \\sigma^2), permitiendo pruebas de hipótesis de Wald válidas aún con miles de covariables.",
    pythonCode: `# Inferencia Causal con DoubleML
from doubleml import DoubleMLPLR, DoubleMLData
from sklearn.ensemble import RandomForestRegressor, RandomForestClassifier

dml_data = DoubleMLData(df, y_col='ocupado', d_cols='mujer_indigena', x_cols=covariates)
dml_model = DoubleMLPLR(
    dml_data,
    ml_l=RandomForestRegressor(n_estimators=100),
    ml_m=RandomForestClassifier(n_estimators=100),
    n_folds=5
)
dml_model.fit()`
  }
];

export const SLIDES_DATA = [
  {
    id: 1,
    title: "Interseccionalidad y Modelos Predictivos",
    subtitle: "Barreras Estructurales en la Inserción Laboral Juvenil en el Perú (ENAHO 2025)",
    category: "PORTADA EJECUTIVA",
    author: "Gustavo Fernando Huamán Fernández",
    institution: "Premio Nacional de la Juventud 2026 - SENAJU",
    takeaways: [
      "Evaluación sobre microdatos oficiales de la ENAHO 2025 (N = 13,361 jóvenes de 15 a 29 años en la PEA).",
      "Arquitectura analítica dual: Segmentación no supervisada (K-Prototypes) + Modelamiento econométrico (Logit) y Machine Learning (XGBoost, TreeSHAP, DML).",
      "Descubrimiento de 4 tipologías etnodemográficas divergentes con brechas de género de hasta 35% en momios de ocupación."
    ],
    keyStats: [
      { label: "Muestra Representativa", value: "13,361", detail: "Jóvenes en la PEA" },
      { label: "Tasa Ocupación Base", value: "91.1%", detail: "Con alta precariedad" },
      { label: "Tipologías Etnodemográficas", value: "4 Clústeres", detail: "K-Prototypes óptimo" },
      { label: "Mejora ML vs Logit", value: "+19.3%", detail: "AUC-ROC (0.785 vs 0.658)" }
    ]
  },
  {
    id: 2,
    title: "La Paradoja Ocupacional de las Juventudes",
    subtitle: "¿Por qué el 91.1% de ocupación enmascara exclusión y precariedad?",
    category: "EL PROBLEMA",
    takeaways: [
      "En el Perú, la tasa global de ocupación juvenil supera el 90%, pero esta cifra esconde un submundo de informalidad (75%+), subempleo invisible y autoempleo familiar no remunerado.",
      "Las brechas no son lineales: una mujer joven en transición formativa enfrenta castigos laborales radicalmente distintos a una mujer rural con carga familiar.",
      "El enfoque tradicional unidimensional (analizar solo género o solo pobreza) fracasa en capturar cómo la etnicidad, la lengua nativa y el territorio multiplican la vulnerabilidad."
    ],
    chartType: "paradoxSummary",
    keyStats: [
      { label: "Desempleo Abierto", value: "8.9%", detail: "Bajo pero engañoso" },
      { label: "Informalidad Juvenil", value: "76.4%", detail: "Sin derechos laborales" },
      { label: "Doble Carga Femenina", value: "2.8x", detail: "Horas de cuidado no remunerado" },
      { label: "Población NiNi", value: "18.2%", detail: "Ni estudian ni trabajan" }
    ]
  },
  {
    id: 3,
    title: "Arquitectura Metodológica en 5 Fases",
    subtitle: "De la segmentación no supervisada a la inferencia causal explicable",
    category: "DISEÑO DE INVESTIGACIÓN",
    takeaways: [
      "Fase 1 (No supervisada): K-Prototypes para datos mixtos (edad continua + etnia/lengua categórica).",
      "Fase 2 (Inferencia econométrica): Regresión Logística intra-clúster para extraer Odds Ratios de género y cuidado.",
      "Fase 3 (Aprendizaje supervisado): Random Forest y XGBoost con validación cruzada estratificada (5-Fold CV).",
      "Fase 4 (XAI): Explicabilidad algorítmica con TreeSHAP para descomponer contribuciones a nivel individual.",
      "Fase 5 (Inferencia Causal): Double Machine Learning (DML) con ortogonalidad de Neyman para neutralizar sesgos de regularización."
    ],
    chartType: "methodologyPipeline"
  },
  {
    id: 4,
    title: "Modelo 1: Fundamento Teórico de K-Prototypes",
    subtitle: "¿Por qué K-Means falla y cómo Huang (1998) resuelve los datos mixtos?",
    category: "TEORÍA CLUSTERING",
    mathModelId: "k-prototypes",
    takeaways: [
      "K-Means asume distancias euclidianas continuas. Al aplicar One-Hot Encoding a variables cualitativas, K-Means distorsiona el centro geométrico y crea ortogonalidades falsas.",
      "K-Prototypes resuelve esto combinando la distancia euclidiana al cuadrado para variables continuas y la distancia de coincidencia simple (Hamming) para variables categóricas.",
      "El hiperparámetro gamma (gamma) actúa como un pivote de balance: iguala la magnitud de dispersión de las covariables categóricas con las numéricas.",
      "Criterio de validación dual: Curva del codo (Elbow Method) y Coeficiente de Silueta adaptado con matriz de Gower."
    ],
    chartType: "elbowPlot"
  },
  {
    id: 5,
    title: "Caso Práctico: Las 4 Tipologías Etnodemográficas",
    subtitle: "Segmentación óptima de 13,361 jóvenes de la PEA peruana (k = 4)",
    category: "RESULTADOS CLUSTERING",
    takeaways: [
      "Clúster 1: Urbano Mestizo Pleno (40.4%, N=5,397) - Jóvenes urbanos consolidados con 11 años de estudio.",
      "Clúster 2: Transición Formativa (39.7%, N=5,299) - Juventud temprana (18.8 años) atrapada entre estudio y empleo precario.",
      "Clúster 3: Vulnerables Periurbanos (15.0%, N=1,998) - 46.8% con niños pequeños, obligados a trabajar por necesidad de subsistencia.",
      "Clúster 4: Rural Originario Agrario (5.0%, N=667) - 64.2% rural, 44.7% etnia originaria, 25.8% lengua nativa y 5.6 años de educación."
    ],
    chartType: "clusterRadar"
  },
  {
    id: 6,
    title: "Modelo 2: Fundamento Teórico del Modelo Logit",
    subtitle: "De la probabilidad latente a las Razones de Momios (Odds Ratios)",
    category: "TEORÍA ECONOMÉTRICA",
    mathModelId: "logit",
    takeaways: [
      "El Modelo Lineal de Probabilidad (MLP) presenta el defecto fatal de predecir probabilidades fuera del intervalo [0, 1] y sufrir heterocedasticidad intrínseca.",
      "El modelo Logit aplica la función de enlace sigmoide logística g(p) = ln(p / (1 - p)), mapeando el soporte continuo (-inf, +inf) al rango estricto de probabilidad [0, 1].",
      "Interpretación clave: El Odds Ratio (OR = exp(beta)) expresa el cambio proporcional en los momios de ocupación. Un OR < 1 indica penalización o desventaja sistemática.",
      "Control econométrico riguroso: Errores estándar robustos clusterizados a nivel de conglomerado censal (conglome)."
    ],
    chartType: "logitSigmoid"
  },
  {
    id: 7,
    title: "Caso Práctico: Forest Plot de Odds Ratios por Clúster",
    subtitle: "Asimetría de la brecha de género y presiones familiares",
    category: "RESULTADOS ECONOMÉTRICOS",
    takeaways: [
      "Penalización de género máxima en Clúster 2 (Transición formativa): OR = 0.65 (IC 95%: 0.54-0.77; p < 0.001). Las mujeres tienen 35% menor momio de ocupación.",
      "Efecto de presión demográfica en Clúster 3 (Periurbano): La presencia de niños < 5 años eleva la ocupación en +45% (OR = 1.45; p = 0.038) como estrategia de sobrevivencia forzada.",
      "Retorno extraordinario a la educación en Clúster 4 (Rural Originario): Cada año de escolaridad incrementa los momios de inserción en +31% (OR = 1.31; p = 0.001)."
    ],
    chartType: "forestPlot"
  },
  {
    id: 8,
    title: "Modelo 3: Machine Learning Supervisado (XGBoost)",
    subtitle: "Optimización de segundo orden con penalización de complejidad",
    category: "TEORÍA MACHINE LEARNING",
    mathModelId: "xgboost",
    takeaways: [
      "Frente a modelos aditivos lineales, los ensambles basados en árboles (Random Forest y XGBoost) descubren fronteras de decisión no lineales e interacciones profundas de orden k.",
      "XGBoost calcula la aproximación de Taylor de segundo orden de la pérdida logística, usando el gradiente (g_i) y el hessiano (h_i) para una convergencia de Newton extraordinariamente precisa.",
      "La regularización gamma * T + 0.5 * lambda * sum(w^2) evita el sobreajuste incluso en presencia de 13,000+ filas y covariables correlacionadas.",
      "Estrategia de validación: 5-Fold Stratified Cross-Validation manteniendo la proporción original de ocupados/desocupados."
    ],
    chartType: "xgboostArchitecture"
  },
  {
    id: 9,
    title: "Caso Práctico: Comparativa ML vs Econometría",
    subtitle: "La superioridad predictiva en clases desbalanceadas (91.1% vs 8.9%)",
    category: "RESULTADOS PREDICTIVOS",
    takeaways: [
      "En datos con 91.1% de ocupados, la métrica tradicional de Exactitud (Accuracy) es engañosa: un modelo ingenuo que prediga 'todos ocupados' tendría 91.1% de exactitud pero cero utilidad práctica.",
      "Evaluación con Curva ROC y AUC: El ensamble XGBoost/Random Forest alcanzó un AUC-ROC = 0.785 frente a solo 0.658 del Logit tradicional.",
      "Ganancia relativa de +19.3% en capacidad discriminatoria, logrando separar verdaderos desocupados y trabajadores precarios que el Logit clasificaba erróneamente."
    ],
    chartType: "rocComparison"
  },
  {
    id: 10,
    title: "Modelo 4: Interpretabilidad Algorítmica con TreeSHAP",
    subtitle: "Axiomas de la Teoría de Juegos y descomposición exacta en árboles",
    category: "TEORÍA EXPLICABILIDAD (XAI)",
    mathModelId: "treeshap",
    takeaways: [
      "El valor Shapley es la única solución matemáticamente rigurosa que satisface simultáneamente los 4 axiomas de justicia distributiva: Eficiencia, Simetría, Jugador Nulo y Aditividad.",
      "Algoritmo TreeSHAP: Aprovecha la estructura de árbol para calcular los valores de Shapley condicionales en tiempo polinomial O(T * L * D^2), en lugar de la complejidad exponencial 2^|F| del KernelSHAP.",
      "Propiedad de Eficiencia Aditiva: La predicción individual f(x) es exactamente igual al valor base esperado más la suma de los valores Shapley de cada covariable.",
      "Permite auditorías de equidad y no discriminación en algoritmos públicos."
    ],
    chartType: "shapAxioms"
  },
  {
    id: 11,
    title: "Caso Práctico: Impacto Direccional TreeSHAP",
    subtitle: "Descomposición Beeswarm de los factores determinantes en la juventud",
    category: "RESULTADOS EXPLICABILIDAD",
    takeaways: [
      "Ámbito Rural: Es el factor de mayor empuje positivo individual (phi promedio = +0.18), reflejando la alta tasa de absorción de mano de obra en agricultura y autoempleo familiar.",
      "Edad cumplida: Contribución positiva lineal (phi = +0.14), mostrando mayor empleabilidad conforme se supera la barrera de los 22 años.",
      "Sexo Femenino: Concentra la mayor penalización negativa del sistema predictivo (phi = -0.19 en mujeres jóvenes de 18 a 22 años).",
      "Dependientes menores de 5 años: Impacto asimétrico; en mujeres empuja fuertemente hacia la inactividad (phi = -0.12), mientras que en varones empuja al empleo forzado."
    ],
    chartType: "shapBeeswarm"
  },
  {
    id: 12,
    title: "Modelo 5: Double Machine Learning (DML)",
    subtitle: "¿Por qué el ML estándar sesga los efectos causales y cómo DML lo cura?",
    category: "TEORÍA INFERENCIA CAUSAL",
    mathModelId: "dml",
    takeaways: [
      "El dilema de la econometría moderna: Machine Learning es genial para predecir Y dado X, pero pésimo para inferir el parámetro causal theta de un tratamiento D.",
      "¿Por qué falla el ML ingenuo? Por el Sesgo de Regularización. El shrinkage (Lasso, podas de árboles) sesga la estimación: sqrt(N) * (theta_naive - theta_0) tiende a infinito.",
      "La solución DML de Chernozhukov (2018): 1) Ortogonalidad de Neyman (la puntuación es inmune a pequeñas desviaciones en las funciones de molestia) y 2) Cross-Fitting (estimación fuera de muestra).",
      "Resultado: Convergencia paramétrica estándar sqrt(N) y normalidad asintótica para intervalos de confianza 100% confiables."
    ],
    chartType: "dmlConcept"
  },
  {
    id: 13,
    title: "Caso Práctico: Aislamiento Causal de la Interseccionalidad",
    subtitle: "Efecto causal puro del estatus 'Mujer Indígena Rural' en el Perú",
    category: "RESULTADOS CAUSALES",
    takeaways: [
      "Al aplicar DML con dos bosques aleatorios (uno para predecir empleo y otro para predecir la condición interseccional), se neutraliza el sesgo de confusión de dotación de activos y entorno del hogar.",
      "El efecto causal promedio (ATE) estimado mediante DML confirma una penalización neta pura de -7.4 puntos porcentuales en la probabilidad de acceso a empleo formal digno.",
      "Demuestra empíricamente que la brecha observada no se debe a 'menor productividad intrínseca' o preferencias individuales, sino a discriminación estructural de mercado."
    ],
    chartType: "causalComparison"
  },
  {
    id: 14,
    title: "Agenda de Política Pública y Conclusiones",
    subtitle: "Recomendaciones estratégicas para SENAJU, MTPE, MIMP y MINEDU",
    category: "PROPUESTA ESTRATÉGICA",
    takeaways: [
      "1. Sistema Nacional de Cuidados con Cobertura Juvenil (MIMP / SENAJU): Universalización de Cuna Más en conglomerados periurbanos (Clúster 3) para liberar tiempo formativo y laboral de madres jóvenes.",
      "2. Subsidio de Inserción Temprana para Mujeres (MTPE): Incentivos a la contratación formal y cuotas de primer empleo para jóvenes del Clúster 2 (15 a 20 años).",
      "3. Potenciamiento de la Educación Intercultural Bilingüe Técnica (MINEDU): Dado el retorno del 31% por año de escolaridad en el Clúster 4, priorizar institutos tecnológicos agropecuarios y digitalización rural.",
      "4. Monitoreo Algorítmico Continuo (INEI): Implementar auditorías con TreeSHAP en los censos y encuestas de hogares para detectar sesgos de género e interseccionales en tiempo real."
    ],
    keyStats: [
      { label: "Prioridad 1", value: "Cuidado Infantil", detail: "Liberación de horas de mujeres" },
      { label: "Prioridad 2", value: "Transición 15-20", detail: "Foco en Clúster 2" },
      { label: "Prioridad 3", value: "Educación EIB", detail: "+31% de retorno rural" },
      { label: "Prioridad 4", value: "XAI en Políticas", detail: "Auditorías continuas" }
    ]
  }
];

export const SIMULATION_BASE_STATS = {
  overallEmploymentRate: 0.911,
  featureShapWeights: {
    sexoMujer: -0.19,
    edadBase: 0.015,
    educBase: 0.022,
    ruralidad: 0.18,
    lenguaNativa: -0.04,
    etniaOriginaria: -0.05,
    ninosMenores5_mujer: -0.14,
    ninosMenores5_hombre: 0.08,
    adultosMayores: 0.02
  }
};
