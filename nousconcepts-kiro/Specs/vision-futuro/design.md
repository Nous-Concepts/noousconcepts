# Design — Sección Visión de Futuro
**Etapa del viaje del héroe: La Gloria / Mirada al Futuro**

## Visión general
Sección final del sitio, diseñada como el clímax visual del recorrido de scrollytelling: resume la ambición de la marca y cierra el ciclo narrativo abierto en el Hero inicial, conduciendo al visitante hacia la acción de contacto.

## Estructura visual (secuencia de scroll)
```
[Scroll paso 0] Título grande: "Nuestra Visión de Futuro"
                (animación de mayor impacto que en etapas anteriores)
        │
        ▼ (scroll)
[Scroll paso 1] Párrafo de cierre narrativo
        │
        ▼ (scroll)
[Scroll paso 2] CTA principal: "Hablemos de tu proyecto"
```

## Mapeo a MVC
- **Modelo** (`futureVisionModel.js`): mensaje de cierre y datos del CTA (texto, destino del enlace).
- **Vista** (`futureVisionView.js`): renderiza el bloque de mensaje final y el botón de CTA con mayor jerarquía visual que el resto del sitio.
- **Controlador**: reutiliza `scrollController.js`; al llegar a esta sección puede activar una transición final más notoria (ej. cambio de fondo a color de acento de marca) que cierra el recorrido de `StageTransition`.

## Componentes

### Bloque de mensaje final
- Título (H2) con tipografía destacada (mayor tamaño que otras secciones, al ser el cierre).
- Párrafo con el mensaje de visión: integración de creatividad, estrategia y tecnología; clientes que dominan su sector gracias a decisiones basadas en datos.

### Llamado a la acción final
- Botón principal, visualmente prominente (color de acento de la marca), con texto orientado a la acción ("Hablemos de tu proyecto" / "Contáctanos").
- Enlace hacia formulario de contacto general o canal de comunicación directo.

## Consideraciones de diseño visual
- Uso de un fondo distintivo (color sólido, degradado o textura sutil de marca) para diferenciar esta sección como el cierre del viaje.
- Espaciado amplio (padding generoso) para dar sensación de "punto final" antes del footer.
- El cierre debe hacer eco visual/textual del planteamiento inicial del Hero, cerrando el círculo narrativo.

## Comportamiento responsive
- **Desktop**: contenido centrado con ancho máximo definido, para mantener legibilidad; posible efecto de mayor impacto (ej. parallax final).
- **Mobile**: texto y botón de CTA ajustados a ancho completo, manteniendo jerarquía visual (título > párrafo > botón), con animaciones simplificadas.
