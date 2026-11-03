# Interseccionalidad y Modelos Predictivos en la Inserción Laboral Juvenil en el Perú (ENAHO 2025)

[![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?style=flat&logo=vercel)](https://vercel.com/)
[![React](https://img.shields.io/badge/React-19-blue?style=flat&logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-v4-38bdf8?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![PWA Ready](https://img.shields.io/badge/PWA-100%25_Offline-emerald?style=flat&logo=pwa)](https://web.dev/progressive-web-apps/)
[![KaTeX](https://img.shields.io/badge/KaTeX-Math_Render-purple?style=flat)](https://katex.org/)

Plataforma web ejecutiva interactiva y aplicación web progresiva (**PWA 100% Offline**) de exposición científica y defensa metodológica, basada en el artículo y la investigación ganadora del **Premio Nacional de las Juventudes 2026** (Secretaría Nacional de la Juventud - SENAJU) por **Gustavo Fernando Huamán Fernández**.

---

## 🎯 Arquitectura de Modelos Explicados en la Web

La plataforma desglosa matemáticamente y empíricamente los 5 modelos centrales aplicados sobre la muestra representativa de **13,361 jóvenes** de la Encuesta Nacional de Hogares (**ENAHO 2025 - INEI**):

1. **K-Prototypes Clustering (Huang, 1998)**:
   - Fusión de distancia euclidiana para variables continuas y distancia de Hamming para variables categóricas nominales/ordinales.
   - Ponderación de varianza mediante hiperparámetro $\gamma$.
   - Identificación de **4 tipologías etnodemográficas óptimas** en la PEA juvenil (*Urbano Mestizo Pleno*, *Jóvenes en Transición Formativa*, *Vulnerables Periurbanos*, *Rural Originario Agrario*).

2. **Regresión Logística Multivariada (Logit)**:
   - Mapeo no lineal sigmoide con razones de momios (*Odds Ratios*).
   - Inferencia de brecha de género: penalización máxima en juventud temprana (15-20 años) con $\text{OR} = 0.65$ ($p < 0.001$).
   - Efecto de sobrecarga de cuidado infantil: $\text{OR} = 1.45$ en periferias urbanas por presión de subsistencia.
   - Retorno educativo: $+31\%$ en momios de empleo por año de estudio formal en zonas rurales originarias ($\text{OR} = 1.31$).

3. **Ensambles Supervisados de Machine Learning (Random Forest & XGBoost)**:
   - Captura de fronteras no lineales y efectos de umbral en clases desbalanceadas (tasa base del 91.1%).
   - Optimización de segundo orden de Newton con gradientes $g_i$ y hessianos $h_i$.
   - **AUC-ROC = 0.785** frente a $0.658$ del Logit tradicional (**+19.3% de ganancia discriminatoria**).

4. **Interpretabilidad Algorítmica con TreeSHAP (Lundberg et al., 2020)**:
   - Axiomas fundamentales de Shapley de la teoría de juegos cooperativos (Eficiencia, Simetría, Jugador Nulo, Aditividad).
   - Reducción de complejidad computacional exponencial $\mathcal{O}(2^M)$ a tiempo polinomial $\mathcal{O}(TLD^2)$.
   - Descomposición aditiva local y diagramas Beeswarm globales.

5. **Double Machine Learning (DML - Chernozhukov et al., 2018)**:
   - Inferencia causal libre del sesgo de regularización generado por algoritmos de Machine Learning.
   - Ortogonalidad de Neyman y estimación cruzada (*K-Fold Cross-Fitting*).
   - Aislamiento del efecto causal puro de la identidad interseccional.

---

## ⚡ Características de la Aplicación

- **Modo Presentación Diapositivas (PPT Explicativo)**: 14 diapositivas ejecutivas widescreen 16:9 con navegación por teclado (`←`, `→`, `Espacio`), cronómetro de defensa para sustentar, cuadrícula general y pantalla completa (`F`).
- **Simulador Interactivo de Microdatos**: Modifica sexo, edad, escolaridad, etnia, lengua nativa, territorio y dependientes infantiles para visualizar la asignación en tiempo real de clúster, cálculo de momios y gráfico Waterfall de TreeSHAP.
- **Explorador Teórico Matemático**: Ecuaciones nativas renderizadas con **KaTeX**, código fuente ejecutable en Python 3.10 y justificación metodológica.
- **Visor y Descarga del Manuscrito Oficial**: PDF completo incrustado y descargable (`investigacion_senaju_2026.pdf`).
- **PWA 100% Offline**: Service Worker con CacheStorage para descargar todos los recursos y utilizar la aplicación sin internet en cualquier momento o lugar.

---

## 🚀 Despliegue en Vercel

El proyecto está configurado para despliegue instantáneo sin configuraciones manuales:

1. Importa este repositorio en [Vercel](https://vercel.com/new).
2. El framework se detectará automáticamente como **Vite**.
3. Haz clic en **Deploy**. ¡Listo!

---

## 💻 Ejecución Local

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar servidor de desarrollo
npm run dev

# 3. Compilar para producción
npm run build
```

---

## 📚 Cita Académica

```bibtex
@article{huaman2026interseccionalidad,
  title={Interseccionalidad de G{\'e}nero y Etnicidad en la Inserci{\'o}n Laboral Juvenil en el Per{\'u}: Tipolog{\'i}as Basadas en Clustering y Modelamiento Predictivo},
  author={Huam{\'a}n Fern{\'a}ndez, Gustavo Fernando},
  journal={Secretar{\'i}a Nacional de la Juventud (SENAJU)},
  year={2026},
  month={Agosto},
  note={Premio Nacional de Investigaci{\'o}n de las Juventudes 2026}
}
```

