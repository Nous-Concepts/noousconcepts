# Design — Sección Propuesta de Valor para Inversionistas
**Etapa del viaje del héroe: El Retorno**

## Visión general
Sección de tono corporativo/serio que muestra a la empresa "transformada", usando datos animados (contadores, barras que se llenan) para representar visualmente el logro y la solidez, en vez de solo texto descriptivo.

## Estructura visual (secuencia de scroll)
```
[Scroll paso 0] Título + mensaje central de inversión
        │
        ▼ (scroll)
┌─────────────────┬─────────────────┬───────────────┐
│ Dominio Digital  │ IA Conversacional│ Escalabilidad │
│ [indicador       │ [indicador       │ [indicador    │
│  animado]        │  animado]        │  animado]     │
└─────────────────┴─────────────────┴───────────────┘
        │
        ▼ (scroll)
[CTA: "Contactar para Inversión"]
```

## Mapeo a MVC
- **Modelo** (`investorValueModel.js`): arreglo de 3 diferenciadores (título, descripción, valor/indicador asociado si aplica, ícono).
- **Vista** (`investorValueView.js`): renderiza el bloque introductorio, las tarjetas de diferenciadores y el CTA final.
- **Controlador**: reutiliza `scrollController.js` para disparar la animación de `AnimatedMetric` (definido en la spec transversal) cuando cada tarjeta entra en el viewport.

## Componentes

### Bloque introductorio
- Título (H2): "Propuesta de Valor para Inversionistas".
- Párrafo con el mensaje central sobre apostar por una empresa que escala mediante tecnología de vanguardia.

### Tarjetas de diferenciadores
1. **Dominio Digital** — enfoque en resultados cuantificables.
2. **IA Conversacional** — chatbots para automatizar soporte y ventas 24/7.
3. **Escalabilidad** — soluciones adaptables desde micro PYMES hasta grandes estructuras.

Cada tarjeta puede incorporar el componente `AnimatedMetric` cuando exista una cifra representativa asociada (ej. "24/7", "100% adaptable"), reforzando el patrón de "datos que cobran vida con el scroll" definido en la narrativa transversal.

### Llamado a la acción
- Botón destacado "Contactar para Inversión" que dirige a un formulario de contacto específico, segmentado como "interés: inversionista".

## Consideraciones de diseño visual
- Paleta corporativa sobria (azules oscuros, grises, un solo color de acento para el CTA) para transmitir seriedad y confianza, diferenciándose de la paleta de energía usada en "Servicios Estratégicos".
- Tipografía y espaciado que transmitan solidez (menos densidad de elementos por pantalla que en la etapa de Transformación).

## Comportamiento responsive
- **Desktop**: tres columnas para los diferenciadores, CTA centrado debajo.
- **Mobile**: diferenciadores apilados verticalmente, CTA de ancho completo para fácil interacción táctil.
