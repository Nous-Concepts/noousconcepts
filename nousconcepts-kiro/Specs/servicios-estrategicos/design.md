# Design — Sección Servicios Estratégicos
**Etapa del viaje del héroe: La Transformación**

## Visión general
Sección implementada como un **stepper scrollytelling**: a medida que el visitante hace scroll, un panel lateral o central va cambiando de "paso" (servicio), reforzando la idea de que el cliente atraviesa un proceso de transformación guiado.

## Estructura visual (secuencia de scroll tipo stepper)
```
                     [Indicador de pasos: 1 — 2 — 3]

[Scroll paso 1] Consultoría de Aplicaciones Web
                 Desarrollo de bases de datos centralizadas...
        │
        ▼ (scroll)
[Scroll paso 2] Marketing Digital e IA
                 Estrategias de ads y e-commerce con IA...
        │
        ▼ (scroll)
[Scroll paso 3] Transformación Digital
                 Automatización de procesos para PYMES...
```

## Mapeo a MVC
- **Modelo** (`servicesModel.js`): arreglo de 3 servicios (id, título, descripción, ícono, enlace de CTA), en el mismo orden del documento fuente.
- **Vista** (`servicesView.js`): renderiza el stepper y el componente `ServicioStep` por cada servicio del Modelo.
- **Controlador**: extiende `scrollController.js` con lógica de "pinned stepper" (el panel de pasos permanece visible mientras el contenido asociado cambia a medida que se hace scroll dentro de la sección), usando Intersection Observer sobre umbrales intermedios para determinar el paso activo.

## Componentes

### Indicador de pasos (`StepIndicator`)
- Numeración o iconografía de 3 pasos, resaltando visualmente el paso activo según el scroll.

### Paso de servicio (`ServicioStep`)
- Icono representativo del servicio.
- Título y descripción (texto extraído del documento fuente).
- Botón/enlace de llamada a la acción ("Solicitar información") que dirige a la sección de contacto.

### Datos de contenido (fuente: documento de propuesta)
1. **Consultoría de Aplicaciones Web** — Desarrollo de bases de datos centralizadas para almacenamiento y generación de informes inteligentes.
2. **Marketing Digital e IA** — Estrategias de ads y e-commerce impulsadas por Inteligencia Artificial y segmentación avanzada.
3. **Transformación Digital** — Automatización de procesos para agilidad operativa y competitividad en micro y PYMES.

## Comportamiento responsive
- **Desktop**: layout tipo "pinned stepper" — el indicador de pasos permanece fijo mientras el contenido de cada servicio se desliza o transiciona a su lado.
- **Mobile**: se simplifica a un scroll vertical continuo con cada paso apareciendo como bloque independiente (sin pin, para evitar complejidad de scroll en pantallas pequeñas).

## Consideraciones de diseño visual
- Paleta de energía moderada (ej. tonos de acento cálido sobre fondo neutro) para transmitir acción/capacidad.
- Cada paso debe tener el mismo peso visual para no sugerir jerarquía entre servicios.
