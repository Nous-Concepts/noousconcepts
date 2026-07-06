# Structure Steering — Sitio Web Nous Concepts

## Estructura narrativa de páginas/secciones
El sitio se organiza como un único flujo narrativo (long-scroll) que sigue la estructura del "viaje del héroe" contada mediante scrollytelling, mapeada sobre las secciones del documento fuente "Propuesta de Inversión - Nous Concepts":

1. **Inicio / Hero** → presenta al visitante en su "mundo normal" y plantea la pregunta que despierta la aventura.
2. **Filosofía Data-Driven** (`Specs/filosofia-data-driven`) → Etapa "El Llamado a la Aventura".
3. **Servicios Estratégicos** (`Specs/servicios-estrategicos`) → Etapa "La Transformación".
4. **Propuesta de Valor para Inversionistas** (`Specs/propuesta-valor-inversionistas`) → Etapa "El Retorno".
5. **Visión de Futuro** (`Specs/vision-futuro`) → Etapa "La Gloria / Mirada al Futuro" + llamado a la acción final.

El marco narrativo y técnico transversal que conecta estas cuatro etapas (scrollytelling, transiciones, indicador de progreso) se especifica aparte en `Specs/narrativa-viaje-del-heroe`, ya que no es una sección visual propia sino una capa de experiencia y de arquitectura (Controlador) que atraviesa todo el sitio.

## Convención de carpetas del proyecto de especificación (Kiro)
```
nousconcepts-kiro/
├── Steering/
│   ├── product.md
│   ├── storytelling.md
│   ├── tech.md
│   └── structure.md
└── Specs/
    ├── narrativa-viaje-del-heroe/
    │   ├── requirements.md
    │   ├── design.md
    │   └── tasks.md
    ├── filosofia-data-driven/
    │   ├── requirements.md
    │   ├── design.md
    │   └── tasks.md
    ├── servicios-estrategicos/
    │   ├── requirements.md
    │   ├── design.md
    │   └── tasks.md
    ├── propuesta-valor-inversionistas/
    │   ├── requirements.md
    │   ├── design.md
    │   └── tasks.md
    └── vision-futuro/
        ├── requirements.md
        ├── design.md
        └── tasks.md
```

## Convención de carpetas del código fuente (MVC)
Ver el detalle completo en `Steering/tech.md`. En resumen:
```
src/
├── index.html
├── css/
├── js/
│   ├── models/        (contenido puro de cada sección/etapa)
│   ├── views/          (renderizado HTML de cada sección)
│   └── controllers/    (lógica de scroll, triggers, progreso)
└── assets/
```

## Principios de organización
- Cada sección del sitio web corresponde a una spec independiente, permitiendo desarrollarlas y priorizarlas por separado.
- `narrativa-viaje-del-heroe` es una spec transversal: define cómo se conectan emocional y técnicamente (vía scrollytelling/MVC) las cuatro secciones, y debe revisarse junto con cualquier cambio a las demás specs.
- Los documentos de `Steering` son transversales a todo el sitio (mensaje de marca, narrativa, stack técnico, estructura de navegación y de código) y deben mantenerse consistentes con cada spec.
- Cada spec sigue el mismo patrón: `requirements.md` (qué debe lograr la sección), `design.md` (cómo se construye visual, narrativa y técnicamente, incluyendo su mapeo a Modelo/Vista/Controlador) y `tasks.md` (plan de implementación).
