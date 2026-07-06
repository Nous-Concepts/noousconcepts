# Requirements — Narrativa: Viaje del Héroe vía Scrollytelling (marco transversal)

## Descripción general
Esta spec no corresponde a una sección visual única, sino a la capa narrativa y técnica que conecta las cuatro secciones del sitio (Filosofía, Servicios, Propuesta de Valor, Visión de Futuro) mediante scrollytelling: el scroll del visitante actúa como motor que revela la historia, convirtiendo la navegación en un viaje emocional en lugar de una lectura plana.

## Requisitos funcionales

### RF-1: Estructura narrativa de tres actos activada por scroll
**User Story:** Como visitante del sitio, quiero que la historia se revele a medida que hago scroll, para sentir que controlo el ritmo de mi propio "viaje" por el contenido.

Criterios de aceptación:
1. CUANDO el visitante haga scroll hacia abajo, ENTONCES el sitio DEBERÁ revelar el contenido en el orden: Llamada a la Aventura (Filosofía) → Transformación (Servicios) → Retorno (Propuesta de Valor) → Gloria/Futuro (Visión de Futuro).
2. CUANDO un elemento (tarjeta, texto, gráfico) entre en el viewport, ENTONCES el sitio DEBERÁ activar su animación de entrada mediante Intersection Observer, sin requerir clics adicionales.
3. CUANDO el visitante detenga el scroll, ENTONCES las animaciones en curso DEBERÁN pausarse o completarse de forma natural, sin forzar auto-scroll.

### RF-2: Indicador de progreso del viaje
**User Story:** Como visitante, quiero tener una referencia visual de en qué parte del "viaje" me encuentro, para orientarme dentro de la narrativa del sitio.

Criterios de aceptación:
1. CUANDO el visitante haga scroll por el sitio, ENTONCES DEBERÁ existir un indicador visual (barra de progreso o puntos de navegación) que refleje la etapa actual del viaje del héroe.
2. CUANDO el visitante haga clic en el indicador de una etapa, ENTONCES el sitio DEBERÁ desplazarse directamente a esa sección (scroll suave).

### RF-3: Tono emocional y visual diferenciado por etapa
**User Story:** Como visitante, quiero percibir un tono emocional distinto en cada etapa del viaje (tensión inicial, esfuerzo/acción, logro, aspiración), para que la historia se sienta genuina y no repetitiva.

Criterios de aceptación:
1. CUANDO se muestre la etapa "Llamada a la Aventura", ENTONCES el tono visual/textual DEBERÁ transmitir el problema o statu quo (tensión inicial).
2. CUANDO se muestre la etapa "Transformación", ENTONCES el tono DEBERÁ transmitir acción y capacidad (los servicios como herramientas).
3. CUANDO se muestre la etapa "Retorno", ENTONCES el tono DEBERÁ transmitir logro y solidez (resultados, inversión).
4. CUANDO se muestre la etapa "Gloria/Futuro", ENTONCES el tono DEBERÁ transmitir aspiración y cierre emocional, con una invitación clara a la acción.

### RF-4: Datos que se construyen progresivamente con el scroll
**User Story:** Como visitante, quiero ver las métricas clave (ROI, escalabilidad, resultados) "cobrar vida" mientras hago scroll, para que los datos se sientan parte de la historia y no una simple tabla.

Criterios de aceptación:
1. CUANDO una métrica o gráfico entre en el viewport, ENTONCES el sitio DEBERÁ animarlo progresivamente (ej. conteo ascendente, barra que se llena) en lugar de mostrarlo estático de inmediato.

## Requisitos no funcionales
- **Autenticidad**: ningún elemento narrativo o dato mostrado debe ser exagerado o no verificable; se prioriza la honestidad de marca sobre el dramatismo.
- **Accesibilidad narrativa**: la historia debe ser comprensible incluso si las animaciones están desactivadas (`prefers-reduced-motion: reduce`); el contenido textual debe funcionar de forma independiente a los efectos visuales.
- **Rendimiento**: los efectos de scrollytelling no deben degradar el tiempo de carga ni la fluidez del sitio en dispositivos de gama media/baja; evitar layout shift durante las animaciones.
- **SEO**: el contenido debe existir en el HTML base y no depender exclusivamente de JavaScript para ser indexable.
