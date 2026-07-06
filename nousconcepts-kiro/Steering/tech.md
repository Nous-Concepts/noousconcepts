# Tech Steering — Sitio Web Nous Concepts

## Stack base solicitado
Como línea base, el sitio se construye con **HTML, CSS y JavaScript** (sin dependencia obligatoria de un framework pesado), organizado bajo el patrón **MVC (Modelo-Vista-Controlador)** adaptado a frontend. Esto facilita separar el contenido narrativo (datos del viaje del héroe), la presentación (secciones, animaciones) y la lógica de interacción (scroll, triggers), mejorando mantenibilidad y escalabilidad a medida que se agreguen nuevas etapas o contenido.

## Cómo se traduce MVC a un sitio con scrollytelling
| Capa | Responsabilidad | Ejemplo en este proyecto |
| --- | --- | --- |
| **Modelo** | Contiene los datos puros de contenido: textos, pilares, servicios, métricas, etapas del viaje del héroe. Sin lógica visual. | `journeyModel.js`, `servicesModel.js`, `metricsModel.js` (objetos/JSON con el contenido de cada sección) |
| **Vista** | Renderiza el HTML/CSS de cada sección a partir de los datos del Modelo. No decide cuándo animar, solo cómo se ve. | `philosophyView.js`, `servicesView.js`, `investorValueView.js`, `futureVisionView.js` |
| **Controlador** | Escucha eventos de scroll, decide cuándo activar una animación o transición, actualiza el indicador de progreso y coordina Modelo↔Vista. | `scrollController.js` (Intersection Observer + orquestación de triggers), `journeyProgressController.js` |

Esta separación permite, por ejemplo, cambiar el copy o las métricas de un servicio (Modelo) sin tocar la lógica de animación (Controlador), o rediseñar visualmente una sección (Vista) sin afectar cómo se activa el scroll.

## Propuesta de stack técnico específico para scrollytelling
Manteniendo HTML/CSS/JS como base, se recomienda incorporar las siguientes herramientas, evaluadas específicamente para la técnica de scrollytelling:

- **Intersection Observer API (nativa del navegador)**: para detectar cuándo una sección o elemento entra en el viewport y disparar su animación de entrada. Es la base recomendada por ser nativa, performante y sin dependencias externas.
- **GSAP + ScrollTrigger** (opcional, para animaciones más ricas): librería estándar de la industria para sincronizar animaciones complejas con la posición de scroll (parallax, construcción progresiva de gráficos, transiciones entre etapas). Se recomienda evaluarla si el nivel de producción visual lo justifica; si se prefiere mantener el proyecto 100% sin dependencias externas, la Intersection Observer API nativa cubre los casos básicos (fade-in, conteo animado, activación de pasos).
- **Lenis o similar (opcional)**: librería ligera de "smooth scroll" para suavizar el desplazamiento y mejorar la sensación cinematográfica del recorrido narrativo, manteniendo el control total del usuario sobre el ritmo.
- **Chart.js o D3.js (ligero)**: para la construcción progresiva de los gráficos de ROI, eficiencia y escalabilidad mencionados en `Steering/storytelling.md`, sincronizados con el scroll a través del Controlador.

**Recomendación de alcance**: comenzar con Intersection Observer nativa (sin dependencias) para la versión inicial del sitio, y evaluar GSAP/ScrollTrigger únicamente si se requieren transiciones más elaboradas (parallax multicapa, morphing) que resulten costosas de mantener a mano.

## Estructura de carpetas de código sugerida (bajo MVC)
```
src/
├── index.html
├── css/
│   ├── base.css
│   ├── journey-stages.css        (paletas por etapa del viaje)
│   └── animations.css
├── js/
│   ├── models/
│   │   ├── journeyModel.js
│   │   ├── servicesModel.js
│   │   └── metricsModel.js
│   ├── views/
│   │   ├── philosophyView.js
│   │   ├── servicesView.js
│   │   ├── investorValueView.js
│   │   └── futureVisionView.js
│   └── controllers/
│       ├── scrollController.js
│       └── journeyProgressController.js
└── assets/
    ├── icons/
    └── images/
```

## Requisitos técnicos transversales
- **Responsive design**: el sitio debe verse correctamente en dispositivos móviles y de escritorio; las animaciones de scroll deben tener una versión simplificada en mobile.
- **Rendimiento**: usar carga diferida (lazy loading) de imágenes; evitar animaciones que generen "layout shift" (inestabilidad visual) durante la carga.
- **SEO básico**: metadatos, títulos y estructura semántica correctos; el contenido narrativo debe existir en el HTML (no depender exclusivamente de JavaScript) para mantener indexabilidad.
- **Accesibilidad**: todas las animaciones deben respetar `prefers-reduced-motion`, mostrando el contenido directamente sin efectos si el usuario lo prefiere; contraste de color adecuado; texto alternativo en elementos visuales.
- **Analítica**: integración de analítica web para medir hasta qué etapa del viaje llegan los visitantes (profundidad de scroll), útil para validar si la narrativa retiene la atención.

## Criterios de decisión tecnológica
- Priorizar tecnologías nativas del navegador (Intersection Observer, CSS transitions/animations) antes que librerías pesadas, salvo que la complejidad visual lo justifique.
- Toda animación o efecto narrativo debe tener una versión degradada funcional para navegadores o dispositivos con menor capacidad.
- Mantener la separación Modelo-Vista-Controlador incluso en componentes pequeños, para que el proyecto escale si se agregan nuevas etapas o secciones al viaje del héroe.

## Fuera de alcance (por ahora)
- Desarrollo de un backend complejo de gestión de proyectos/clientes; el sitio es principalmente informativo, narrativo y de captación de leads.
- Frameworks SPA pesados (React, Vue, Angular) no se consideran necesarios para el alcance actual, dado que el sitio es mayormente un long-scroll narrativo; podrían evaluarse a futuro si el proyecto crece en interactividad más allá del scrollytelling.
