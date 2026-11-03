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
    color: "#4338ca", // Morado Azulado / Índigo Real
    accentBg: "rgba(67, 56, 202, 0.07)",
    borderColor: "rgba(67, 56, 202, 0.35)",
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
    description: "Juventud en capitales y costa urbana con secundaria completa o superior. Penalización de género moderada y estadísticamente significativa (OR = 0.76).",
    policyTarget: "Inserción formal, intermediación laboral calificada y reducción de subempleo invisible."
  },
  {
    id: 2,
    name: "Jóvenes en Transición Formativa",
    share: 39.7,
    n: 5299,
    color: "#0891b2", // Cyan Glaciar Tecnológico
    accentBg: "rgba(8, 145, 178, 0.07)",
    borderColor: "rgba(8, 145, 178, 0.35)",
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
    description: "Juventud temprana (15-20 años) entre estudio y trabajo. Brecha de género extrema: mujeres con 35% menor probabilidad de inserción que varones (OR = 0.65).",
    policyTarget: "Becas de permanencia técnica/universitaria y subsidios para jóvenes mujeres cuidadoras."
  },
  {
    id: 3,
    name: "Vulnerables Periurbanos",
    share: 15.0,
    n: 1998,
    color: "#312e81", // Índigo Profundo
    accentBg: "rgba(49, 46, 129, 0.07)",
    borderColor: "rgba(49, 46, 129, 0.35)",
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
    description: "Periferias urbanas con alta carga familiar. Niños pequeños elevan en 45% los momios de ocupación (OR = 1.45) por forzosa necesidad de subsistencia.",
    policyTarget: "Cunas públicas universales y centros de cuidado infantil en polígonos periurbanos."
  },
  {
    id: 4,
    name: "Rural Originario Agrario",
    share: 5.0,
    n: 667,
    color: "#059669", // Verde Esmeralda Puro
    accentBg: "rgba(5, 150, 105, 0.07)",
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
    description: "Áreas andinas y amazónicas con alta absorción agrícola familiar. Cada año de estudio dispara en +31% los momios de inserción productiva (OR = 1.31).",
    policyTarget: "Educación intercultural bilingüe técnica, alfabetización digital y créditos agrarios juveniles."
  }
];

export const THEORETICAL_MODELS = [
  {
    id: "k-prototypes",
    name: "K-Prototypes Clustering",
    subtitle: "Segmentación no supervisada para datos mixtos (Huang, 1998)",
    badge: "Fase 1: No Supervisada",
    tagColor: "indigo",
    whyUsed: "La ENAHO combina variables continuas (edad, escolaridad) con nominales (etnia, lengua, territorio). K-Means colapsa con categorías y K-Modes destruye distancias métricas. K-Prototypes unifica ambos con el hiperparámetro gamma.",
    formulaTeX: `E = \\sum_{j=1}^{k} \\sum_{i=1}^{n} u_{ij} \\left[ \\sum_{r=1}^{p} (x_{ir} - m_{jr})^2 + \\gamma \\sum_{s=1}^{q} \\delta(x_{is}, m_{js}) \\right]`,
    components: [
      { symbol: "u_{ij} \\in \\{0, 1\\}", desc: "Pertenencia determinista del individuo i al clúster j" },
      { symbol: "\\sum (x_{ir} - m_{jr})^2", desc: "Distancia euclidiana cuadrática continua" },
      { symbol: "\\delta(x_{is}, m_{js})", desc: "Función de disimilitud simple para variables categóricas" },
      { symbol: "\\gamma", desc: "Balance de escala entre espacio métrico y categórico" }
    ],
    validationDetails: "Selección en k = 4 mediante el método del codo (reducción de inercia de 20.24%) y silueta con matriz de Gower.",
    pythonCode: `# Implementación oficial con kmodes
from kmodes.kprototypes import KPrototypes

kproto = KPrototypes(n_clusters=4, init='Huang', gamma=0.75, random_state=42)
clusters = kproto.fit_predict(X_mixed, categorical=[2, 3, 4, 6])`
  },
  {
    id: "logit",
    name: "Regresión Logística Multivariada",
    subtitle: "Inferencia econométrica y razones de momios (Odds Ratios)",
    badge: "Fase 2: Inferencia Clásica",
    tagColor: "cyan",
    whyUsed: "Estima el efecto ceteris paribus de las covariables interseccionales sobre la probabilidad de ocupación en la PEA, reportando Odds Ratios e intervalos al 95%.",
    formulaTeX: `\\ln\\left(\\frac{P(Y=1|X)}{1 - P(Y=1|X)}\\right) = \\beta_0 + \\beta_{sexo}\\text{Mujer} + \\beta_{etnia}\\text{Originaria} + \\beta_{educ}\\text{Educ} + \\sum \\theta_m Z_m`,
    components: [
      { symbol: "\\text{OR} = \\exp(\\beta_k)", desc: "Razón de momios: probabilidad de ocupado vs desocupado" },
      { symbol: "P(Y=1|X) = \\frac{1}{1 + e^{-X\\beta}}", desc: "Enlace sigmoide acotado en el soporte [0, 1]" },
      { symbol: "Z_m", desc: "Vector de covariables demográficas de control" },
      { symbol: "\\text{SE robustos}", desc: "Corrección por conglomerado censal y factores ENAHO" }
    ],
    validationDetails: "Modelos independientes por clúster: penalización femenina crítica en C2 (OR = 0.65) y retorno escolar en C4 (OR = 1.31).",
    pythonCode: `# Inferencia econométrica con statsmodels
import statsmodels.api as sm

model = sm.Logit(y_cluster, sm.add_constant(X_cluster))
res = model.fit(cov_type='cluster', cov_kwds={'groups': df['conglome']})
odds_ratios = np.exp(res.params)`
  },
  {
    id: "xgboost",
    name: "Ensamble Supervisado (XGBoost & RF)",
    subtitle: "Aprendizaje no lineal de gradiente optimizado de segundo orden",
    badge: "Fase 3: ML Predictivo",
    tagColor: "emerald",
    whyUsed: "La tasa base de ocupación juvenil es 91.1% (desbalanceada). XGBoost captura no linealidades e interacciones de orden superior que el Logit subestima.",
    formulaTeX: `\\mathcal{L}^{(t)} \\approx \\sum_{i=1}^{n} \\left[ g_i f_t(x_i) + \\frac{1}{2} h_i f_t^2(x_i) \\right] + \\gamma T + \\frac{1}{2} \\lambda \\sum_{j=1}^{T} w_j^2`,
    components: [
      { symbol: "g_i, h_i", desc: "Gradiente y hessiano de segundo orden de la pérdida logística" },
      { symbol: "f_t(x)", desc: "Nuevo árbol de regresión aditivo para corregir residuos" },
      { symbol: "\\gamma T", desc: "Penalización por número total de hojas terminales" },
      { symbol: "\\frac{1}{2}\\lambda \\sum w_j^2", desc: "Regularización L2 sobre las ponderaciones de las hojas" }
    ],
    validationDetails: "5-Fold CV estratificado. XGBoost alcanzó AUC = 0.785 frente a 0.658 del Logit (+19.3% de ganancia discriminatoria).",
    pythonCode: `# Pipeline con XGBoost optimizado
from xgboost import XGBClassifier

xgb = XGBClassifier(n_estimators=300, max_depth=5, learning_rate=0.03, random_state=42)
xgb.fit(X_train, y_train)`
  },
  {
    id: "treeshap",
    name: "Interpretabilidad Algorítmica (TreeSHAP)",
    subtitle: "Atribución aditiva local basada en teoría de juegos (Lundberg et al., 2020)",
    badge: "Fase 4: Explicabilidad (XAI)",
    tagColor: "cyan",
    whyUsed: "Convierte modelos de caja negra en decisiones auditables, calculando el impacto neto individual (phi) de cada variable en la probabilidad de empleo.",
    formulaTeX: `\\phi_i(f, x) = \\sum_{S \\subseteq F \\setminus \\{i\\}} \\frac{|S|!(|F| - |S| - 1)!}{|F|!} \\left[ f_x(S \\cup \\{i\\}) - f_x(S) \\right]`,
    components: [
      { symbol: "\\phi_i(f, x)", desc: "Valor Shapley de atribución neta de la variable i" },
      { symbol: "F, S", desc: "Espacio total y subconjunto de variables en coalición" },
      { symbol: "f(x) = E[f(X)] + \\sum \\phi_i", desc: "Axioma de eficiencia: suma exacta de aportes marginales" },
      { symbol: "O(TLD^2)", desc: "Complejidad polinomial exacta de TreeSHAP en árboles" }
    ],
    validationDetails: "Ruralidad y edad aportan los mayores impulsos positivos (+0.18, +0.14); género femenino resta hasta -0.19.",
    pythonCode: `# Explicabilidad local y global
import shap

explainer = shap.TreeExplainer(xgb)
shap_values = explainer(X_test)
shap.summary_plot(shap_values, X_test)`
  },
  {
    id: "dml",
    name: "Double Machine Learning (DML)",
    subtitle: "Inferencia causal ortogonal libre de sesgo de regularización (Chernozhukov, 2018)",
    badge: "Fase 5: Causalidad Robusta",
    tagColor: "indigo",
    whyUsed: "El ML tradicional introduce sesgo de regularización al estimar efectos causales. DML usa ortogonalidad de Neyman y Cross-Fitting para aislar el efecto puro de la interseccionalidad.",
    formulaTeX: `\\psi(W; \\theta_0, \\eta_0) = \\big( Y - \\ell_0(X) - \\theta_0 (D - m_0(X)) \\big) \\big( D - m_0(X) \\big) = 0`,
    components: [
      { symbol: "Y, D, X", desc: "Resultado (Empleo), Tratamiento (Interseccionalidad) y Confusores" },
      { symbol: "l_0(X), m_0(X)", desc: "Funciones de molestia aprendidas mediante Random Forest" },
      { symbol: "\\partial_\\eta E[\\psi] = 0", desc: "Ortogonalidad de Neyman: insensibilidad ante errores en eta" },
      { symbol: "K\\text{-Fold Cross-Fitting}", desc: "Partición cruzada que garantiza convergencia sqrt(N)" }
    ],
    validationDetails: "Aísla una penalización neta pura de -7.4 puntos porcentuales en mujeres indígenas rurales atribuible a discriminación estructural de mercado.",
    pythonCode: `# Inferencia Causal con DoubleML
from doubleml import DoubleMLPLR, DoubleMLData
from sklearn.ensemble import RandomForestClassifier, RandomForestRegressor

dml_data = DoubleMLData(df, y_col='ocupado', d_cols='mujer_indigena', x_cols=covariates)
dml = DoubleMLPLR(dml_data, ml_l=RandomForestRegressor(), ml_m=RandomForestClassifier())
dml.fit()`
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
      "Microdatos oficiales ENAHO 2025 (N = 13,361 jóvenes de 15 a 29 años en la PEA).",
      "Arquitectura analítica dual: Clustering K-Prototypes + Logit, XGBoost, TreeSHAP y DML.",
      "4 tipologías etnodemográficas divergentes con brechas de género de hasta 35% en momios."
    ],
    keyStats: [
      { label: "Muestra ENAHO", value: "13,361", detail: "Jóvenes en PEA" },
      { label: "Tasa Ocupación Base", value: "91.1%", detail: "Con alta precariedad" },
      { label: "Tipologías Óptimas", value: "4 Grupos", detail: "K-Prototypes mixto" },
      { label: "Ganancia XGBoost", value: "+19.3%", detail: "AUC (0.785 vs 0.658)" }
    ]
  },
  {
    id: 2,
    title: "La Paradoja Ocupacional de las Juventudes",
    subtitle: "¿Por qué el 91.1% de ocupación enmascara exclusión y precariedad?",
    category: "EL PROBLEMA",
    takeaways: [
      "La tasa oficial de ocupación supera el 90%, pero esconde informalidad crítica (76.4%) y autoempleo familiar.",
      "Las brechas no son lineales: una mujer joven en transición formativa sufre castigos distintos a una mujer rural con hijos.",
      "El análisis unidimensional fracasa en capturar cómo etnicidad, lengua y territorio multiplican la vulnerabilidad."
    ],
    chartType: "paradoxSummary",
    keyStats: [
      { label: "Desempleo Abierto", value: "8.9%", detail: "Bajo pero engañoso" },
      { label: "Informalidad Real", value: "76.4%", detail: "Sin derechos laborales" },
      { label: "Doble Carga Cuidados", value: "2.8x", detail: "Horas no remuneradas" },
      { label: "Jóvenes NiNi", value: "18.2%", detail: "67% mujeres en hogar" }
    ]
  },
  {
    id: 3,
    title: "Arquitectura Metodológica Tripartita",
    subtitle: "De la segmentación no supervisada a la inferencia causal ortogonal",
    category: "DISEÑO DE INVESTIGACIÓN",
    takeaways: [
      "Fase 1: K-Prototypes para datos mixtos (edad continua + etnia/lengua cualitativa).",
      "Fase 2: Logit intra-clúster para extraer Odds Ratios de género y cuidado.",
      "Fase 3: Random Forest y XGBoost con validación cruzada estratificada (5-Fold CV).",
      "Fase 4: Explicabilidad algorítmica con TreeSHAP para auditoría individual y global.",
      "Fase 5: Double Machine Learning (DML) para neutralizar sesgos de regularización."
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
      "K-Means con One-Hot Encoding distorsiona los centros geométricos y crea ortogonalidades falsas.",
      "K-Prototypes integra la distancia euclidiana cuadrática y la distancia simple de Hamming.",
      "El parámetro gamma (gamma) actúa como pivote de equilibrio de varianza entre ambos subespacios.",
      "Validación dual: Método del Codo (Elbow) y Coeficiente de Silueta con matriz de Gower."
    ],
    chartType: "elbowPlot"
  },
  {
    id: 5,
    title: "Caso Práctico: Las 4 Tipologías Etnodemográficas",
    subtitle: "Segmentación óptima de 13,361 jóvenes de la PEA peruana (k = 4)",
    category: "RESULTADOS CLUSTERING",
    takeaways: [
      "Clúster 1: Urbano Mestizo Pleno (40.4%, N=5,397) - 11 años de educación formal y ocupación en servicios.",
      "Clúster 2: Transición Formativa (39.7%, N=5,299) - Juventud temprana (18.8 años) con máxima brecha de género.",
      "Clúster 3: Vulnerables Periurbanos (15.0%, N=1,998) - 46.8% con infantes, forzados a subsistencia laboral.",
      "Clúster 4: Rural Originario Agrario (5.0%, N=667) - 64.2% rural, 44.7% etnia indígena y 25.8% lengua nativa."
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
      "El modelo de probabilidad lineal produce probabilidades absurdas (<0 o >1) y heterocedasticidad.",
      "Logit usa la función sigmoide logística g(p) = ln(p / (1 - p)), mapeando al rango estricto [0, 1].",
      "Odds Ratio (OR = exp(beta)): cambio proporcional en momios de ocupación; OR < 1 indica desventaja.",
      "Errores estándar robustos clusterizados a nivel de conglomerado censal (conglome)."
    ],
    chartType: "logitSigmoid"
  },
  {
    id: 7,
    title: "Caso Práctico: Forest Plot de Odds Ratios por Clúster",
    subtitle: "Asimetría de la brecha de género y presiones familiares",
    category: "RESULTADOS ECONOMÉTRICOS",
    takeaways: [
      "Penalización de género máxima en Clúster 2 (18a): OR = 0.65 (IC 95%: 0.54-0.77; p < 0.001).",
      "Presión de subsistencia en Clúster 3: infantes < 5 años elevan ocupación en +45% (OR = 1.45; p = 0.038).",
      "Retorno extraordinario en Clúster 4 Rural: cada año de estudio eleva en +31% la ocupación (OR = 1.31; p = 0.001)."
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
      "Los ensambles basados en árboles descubren fronteras no lineales y umbrales críticos de edad.",
      "XGBoost calcula la aproximación de Taylor de 2do orden usando gradientes (g_i) y hessianos (h_i).",
      "Regularización gamma * T + 0.5 * lambda * sum(w^2) previene el sobreajuste en covariables correlacionadas.",
      "Validación: 5-Fold Stratified Cross-Validation manteniendo la distribución original de clases."
    ],
    chartType: "xgboostArchitecture"
  },
  {
    id: 9,
    title: "Caso Práctico: Comparativa ML vs Econometría",
    subtitle: "Superioridad predictiva en clases desbalanceadas (91.1% vs 8.9%)",
    category: "RESULTADOS PREDICTIVOS",
    takeaways: [
      "En datos con 91.1% de ocupación, la Exactitud (Accuracy) es engañosa y ciega ante desocupados.",
      "Curva ROC y AUC: XGBoost/RF alcanzó AUC = 0.785 frente a 0.658 del Logit tradicional.",
      "Ganancia relativa de +19.3% en capacidad discriminatoria de inserción y precariedad laboral."
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
      "El valor Shapley es la única solución que cumple: Eficiencia, Simetría, Jugador Nulo y Aditividad.",
      "TreeSHAP computa valores condicionales en tiempo polinomial O(TLD^2) en lugar de 2^|F| exponencial.",
      "Eficiencia aditiva: f(x) = E[f(X)] + sum(phi_i), permitiendo auditorías de equidad algorítmica.",
      "Descompone tanto explicaciones individuales (waterfall) como patrones globales (beeswarm)."
    ],
    chartType: "shapAxioms"
  },
  {
    id: 11,
    title: "Caso Práctico: Impacto Direccional TreeSHAP",
    subtitle: "Descomposición Beeswarm de determinantes en la juventud",
    category: "RESULTADOS EXPLICABILIDAD",
    takeaways: [
      "Ámbito Rural: Mayor impulso individual positivo (phi = +0.18) por absorción agrícola y familiar.",
      "Edad: Contribución positiva (phi = +0.14), acelerando la inserción a partir de los 22 años.",
      "Sexo Femenino: Mayor penalización negativa del sistema (phi = -0.19 en mujeres jóvenes de 18-20a).",
      "Infantes < 5 años: Impacto asimétrico; en mujeres resta -0.12 y en varones presiona al empleo informal."
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
      "Machine Learning es ideal para predecir Y, pero produce sesgo de regularización sobre parámetros causales.",
      "En ML ingenuo: sqrt(N) * (theta_naive - theta_0) tiende a infinito por el shrinkage de parámetros.",
      "Solución DML (Chernozhukov, 2018): 1) Ortogonalidad de Neyman y 2) K-Fold Cross-Fitting.",
      "Garantiza convergencia paramétrica estándar sqrt(N) y normalidad asintótica con miles de confusores."
    ],
    chartType: "dmlConcept"
  },
  {
    id: 13,
    title: "Caso Práctico: Aislamiento Causal de la Interseccionalidad",
    subtitle: "Efecto causal puro del estatus 'Mujer Indígena Rural' en el Perú",
    category: "RESULTADOS CAUSALES",
    takeaways: [
      "DML residualiza el empleo y la identidad interseccional con bosques aleatorios no paramétricos.",
      "Efecto causal promedio (ATE): penalización neta pura de -7.4 puntos porcentuales en empleo digno.",
      "Demuestra que la brecha se origina en discriminación estructural y no en supuestas diferencias de productividad."
    ],
    chartType: "causalComparison"
  },
  {
    id: 14,
    title: "Agenda de Política Pública y Conclusiones",
    subtitle: "Recomendaciones estratégicas para SENAJU, MTPE, MIMP y MINEDU",
    category: "PROPUESTA ESTRATÉGICA",
    takeaways: [
      "1. Sistema de Cuidados Juvenil (MIMP / SENAJU): Guarderías Cuna Más en conglomerados periurbanos (C3).",
      "2. Subsidio al Primer Empleo Femenino (MTPE): Incentivos fiscales focalizados en mujeres de 15 a 20 años (C2).",
      "3. Potenciamiento de Educación Técnica EIB (MINEDU): Aprovechar el +31% de retorno educativo en el medio rural (C4).",
      "4. Monitoreo Algorítmico Continuo (INEI): Auditorías con TreeSHAP sobre encuestas de hogares en tiempo real."
    ],
    keyStats: [
      { label: "Prioridad 1", value: "Cuidado Infantil", detail: "Foco en Clúster 3" },
      { label: "Prioridad 2", value: "Transición 15-20", detail: "Foco en Clúster 2" },
      { label: "Prioridad 3", value: "Educación EIB", detail: "+31% de retorno rural" },
      { label: "Prioridad 4", value: "Auditorías XAI", detail: "Supervisión continua" }
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
