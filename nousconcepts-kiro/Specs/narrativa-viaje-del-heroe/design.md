# Design — Narrativa: Viaje del Héroe vía Scrollytelling (marco transversal)

## Visión general
Capa de experiencia y de arquitectura que envuelve a las cuatro secciones del sitio, implementada mediante scrollytelling bajo el patrón MVC descrito en `Steering/tech.md`: el scroll dispara eventos que el Controlador interpreta para animar la Vista, usando los datos del Modelo.

## Mapa narrativo completo
```
[HERO / INICIO]
   "Tu empresa toma decisiones a ciegas. ¿Y si tus datos
    pudieran guiar cada paso?"
        │  (scroll)
        ▼
[ETAPA 1 — LA LLAMADA A LA AVENTURA]      → Sección: Filosofía Data-Driven
   Tono: tensión / revelación · Color: fríos/neutros
        │  (scroll — transición de fondo)
        ▼
[ETAPA 2 — LA TRANSFORMACIÓN]              → Sección: Servicios Estratégicos
   Tono: acción / capacidad · Color: energía moderada
        │  (scroll — transición de fondo)
        ▼
[ETAPA 3 — EL RETORNO]                     → Sección: Propuesta de Valor Inversionistas
   Tono: logro / solidez · Color: corporativo sobrio
        │  (scroll — transición de fondo)
        ▼
[ETAPA 4 — LA GLORIA / MIRADA AL FUTURO]   → Sección: Visión de Futuro
   Tono: aspiración / cierre · Color: acento de marca (CTA)
```

## Arquitectura MVC de la capa narrativa

### Modelo (`js/models/journeyModel.js`)
- Estructura de datos con las 4 etapas: `{ id, nombre, tono, paletaColor, umbralScroll }`.
- No contiene lógica de animación, solo la definición de contenido y metadatos narrativos de cada etapa.

### Vista (componentes por sección + `journeyProgressView.js`)
- Renderiza el indicador de progreso (`JourneyProgressNav`) y aplica las clases CSS correspondientes al tono/color de la etapa activa.
- Renderiza las transiciones de fondo (`StageTransition`) entre etapas.
- No decide cuándo cambiar de etapa: solo recibe instrucciones del Controlador.

### Controlador (`js/controllers/scrollController.js`, `journeyProgressController.js`)
- Usa Intersection Observer para detectar qué sección está en el viewport y determina la "etapa activa".
- Dispara las animaciones de entrada de cada elemento (fade-in, conteo animado, construcción de gráficos) cuando corresponde.
- Actualiza el indicador de progreso (Vista) según la etapa activa (Modelo).
- Escucha clics en el indicador de progreso y ejecuta scroll suave hacia la sección correspondiente.
- Verifica `prefers-reduced-motion` al iniciar y desactiva animaciones no esenciales si el usuario lo prefiere, dejando el contenido visible directamente.

## Componentes de UI

### Indicador de progreso del viaje (`JourneyProgressNav`)
- Barra de progreso vertical fija (desktop) o barra superior (mobile) que se llena a medida que el visitante avanza.
- Puntos de navegación clicables, uno por etapa, con el nombre corto ("El Llamado", "La Transformación", "El Retorno", "El Futuro").
- Estado activo resaltado según la sección visible en el viewport.

### Transiciones entre etapas (`StageTransition`)
- Fade-in / desplazamiento sutil al entrar cada etapa en el viewport (Intersection Observer).
- Cambio gradual de fondo (color o gradiente) entre una etapa y la siguiente.
- Deshabilitables vía `prefers-reduced-motion: reduce`, mostrando el contenido directamente.

### Métricas animadas (`AnimatedMetric`)
- Componente reutilizable para cifras (ROI, % de escalabilidad, etc.) que cuentan de 0 al valor final cuando entran en el viewport.
- Se pausa/omite la animación si `prefers-reduced-motion` está activo, mostrando el valor final directamente.

## Técnicas de scrollytelling aplicadas (ver `Steering/storytelling.md`)
- Scroll como activador (triggered animation) vía Intersection Observer.
- Steppers narrativos dentro de "Servicios Estratégicos".
- Parallax sutil entre etapas (opcional, evaluar con GSAP/ScrollTrigger si se requiere mayor riqueza visual).
- Construcción progresiva de datos (contadores, barras que se llenan).

## Consideraciones de diseño
- La narrativa debe poder "leerse" igual de bien si el visitante entra directamente a una sección desde un enlace externo — cada sección debe tener sentido de forma semi-independiente, aunque su impacto máximo ocurra en el recorrido completo.
- Evitar que el storytelling sacrifique la claridad comercial: cada etapa debe seguir comunicando datos y beneficios concretos, no solo emoción.

## Comportamiento responsive
- **Desktop**: indicador de progreso lateral fijo, transiciones con mayor riqueza visual (parallax sutil).
- **Mobile**: indicador de progreso simplificado en la parte superior, transiciones más ligeras para preservar el rendimiento.
