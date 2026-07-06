# Requirements — Sección Filosofía Data-Driven
**Etapa del viaje del héroe: El Llamado a la Aventura**

## Descripción general
Sección del sitio web que presenta la filosofía central de Nous Concepts como compañía Data-Driven, funcionando como el "momento revelador" que llama al visitante (héroe) a salir de su statu quo de decisiones sin datos.

## Requisitos funcionales

### RF-1: Presentación de la filosofía como planteamiento narrativo
**User Story:** Como visitante del sitio, quiero entender rápidamente qué significa que Nous Concepts sea "Data-Driven" y por qué debería importarme, para sentir que esto responde a un problema que yo tengo.

Criterios de aceptación:
1. CUANDO el visitante llegue a esta sección mediante scroll, ENTONCES el sitio DEBERÁ mostrar primero un planteamiento de tensión/problema (statu quo de decisiones sin datos) antes de introducir la solución.
2. CUANDO se revele el mensaje central, ENTONCES DEBERÁ incluir la idea de que cada campaña, desarrollo web o automatización está sustentado por análisis en tiempo real.

### RF-2: Presentación de los tres pilares activada por scroll
**User Story:** Como visitante, quiero ver revelarse los pilares de la filosofía Data-Driven a medida que avanzo, para entender los beneficios de forma progresiva y no abrumadora.

Criterios de aceptación:
1. CUANDO cada tarjeta de pilar entre en el viewport, ENTONCES DEBERÁ animarse individualmente (no las tres a la vez) en el orden: Optimización de ROI, Decisiones Basadas en Evidencia, Experiencias Personalizadas.
2. CUANDO se muestre cada pilar, ENTONCES DEBERÁ incluir su descripción correspondiente según el documento fuente.

## Requisitos no funcionales
- **Claridad visual**: los tres pilares deben distinguirse visualmente entre sí (iconografía o tarjetas separadas).
- **Tono de etapa**: paleta de colores fríos/neutros, coherente con el tono "tensión/revelación" definido en `Steering/storytelling.md`.
- **Responsive**: la sección debe adaptarse correctamente a pantallas móviles, con animaciones simplificadas.
- **Accesibilidad**: la revelación progresiva debe tener una versión estática equivalente si `prefers-reduced-motion` está activo.
