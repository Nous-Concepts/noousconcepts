# Design — Sección Filosofía Data-Driven
**Etapa del viaje del héroe: El Llamado a la Aventura**

## Visión general
Primera sección narrativa después del Hero, donde el scroll revela primero la tensión (statu quo) y luego, en pasos sucesivos, los tres pilares de la filosofía Data-Driven.

## Estructura visual (secuencia de scroll)
```
[Scroll paso 0] Título: "Somos una compañía Data-Driven"
                Párrafo de planteamiento (tensión/revelación)
        │
        ▼ (scroll)
[Scroll paso 1] Tarjeta "Optimización de ROI" — fade-in
        │
        ▼ (scroll)
[Scroll paso 2] Tarjeta "Decisiones Basadas en Evidencia" — fade-in
        │
        ▼ (scroll)
[Scroll paso 3] Tarjeta "Experiencias Personalizadas" — fade-in
```

## Mapeo a MVC (ver `Steering/tech.md`)
- **Modelo** (`philosophyModel.js`): objeto con el mensaje central y el arreglo de 3 pilares (título, ícono, descripción).
- **Vista** (`philosophyView.js`): renderiza el bloque introductorio y el componente reutilizable `PilarCard` por cada pilar del Modelo.
- **Controlador**: reutiliza `scrollController.js` (spec transversal) para observar cada `PilarCard` individualmente vía Intersection Observer y disparar su fade-in cuando entra en el viewport.

## Componentes

### Bloque introductorio
- Título (H2): "Somos una compañía Data-Driven".
- Texto de planteamiento (tensión) seguido del mensaje central sobre transformar información en motor de decisiones estratégicas.

### Tarjetas de pilares (`PilarCard`)
- Icono representativo (gráfico para ROI, lupa/datos para Evidencia, persona para Personalización).
- Título del pilar y descripción breve (extraída del documento fuente).
- Animación de entrada individual: fade-in + desplazamiento sutil (translateY 20px → 0), activada por Intersection Observer al 30% de visibilidad del elemento.

## Comportamiento responsive
- **Desktop**: las tarjetas pueden mostrarse en fila (grid de 3 columnas) revelándose secuencialmente de izquierda a derecha al hacer scroll.
- **Mobile**: tarjetas apiladas verticalmente, cada una revelándose al entrar en el viewport (comportamiento natural del scroll vertical).

## Consideraciones de diseño visual
- Paleta de colores fríos/neutros (azules, grises), coherente con el tono "tensión/revelación" de esta etapa.
- Espaciado generoso entre bloque introductorio y tarjetas para dar ritmo a la revelación.
- Si `prefers-reduced-motion` está activo, las tarjetas se muestran directamente sin animación de entrada.
