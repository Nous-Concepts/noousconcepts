# Requirements — Sección Visión de Futuro
**Etapa del viaje del héroe: La Gloria / Mirada al Futuro**

## Descripción general
Sección de cierre del sitio web que comunica la proyección a futuro de Nous Concepts y cierra el viaje narrativo invitando al visitante (héroe) a iniciar su propio camino mediante contacto.

## Requisitos funcionales

### RF-1: Mensaje de visión de futuro como cierre narrativo
**User Story:** Como visitante del sitio, quiero sentir que la historia llega a un cierre inspirador, para terminar mi recorrido con una impresión positiva y memorable de la marca.

Criterios de aceptación:
1. CUANDO el visitante llegue a esta sección (última etapa del scroll), ENTONCES el sitio DEBERÁ mostrar el mensaje: la empresa se proyecta como referente en la integración de creatividad, estrategia y tecnología.
2. CUANDO se muestre el mensaje, ENTONCES DEBERÁ incluir la idea de que los clientes no solo sobrevivirán sino que dominarán su sector gracias a la toma de decisiones basada en datos.

### RF-2: Cierre con llamado a la acción general
**User Story:** Como visitante que llegó al final del sitio, quiero una forma clara de continuar el contacto con la empresa, para no perder el interés generado durante el recorrido.

Criterios de aceptación:
1. CUANDO el visitante termine de leer esta sección, ENTONCES el sitio DEBERÁ mostrar un llamado a la acción final ("Hablemos de tu proyecto" o "Contáctanos").
2. CUANDO el visitante haga clic en el llamado a la acción, ENTONCES DEBERÁ dirigirse a un formulario de contacto o medio de comunicación directo.

## Requisitos no funcionales
- **Impacto visual**: al ser la sección de cierre del viaje, debe tener un diseño de mayor impacto (ej. fondo destacado, tipografía de mayor tamaño, posible animación final más notoria que en las etapas anteriores).
- **Tono de etapa**: color de acento de marca (aspiración/cierre), coherente con `Steering/storytelling.md`.
- **Consistencia de mensaje**: el tono debe conectar con la etapa "Llamado a la Aventura" del inicio del sitio, cerrando el relato de forma coherente (ej. respondiendo la pregunta planteada en el Hero inicial).
- **Accesibilidad**: la animación de cierre debe tener una versión estática equivalente si `prefers-reduced-motion` está activo.
