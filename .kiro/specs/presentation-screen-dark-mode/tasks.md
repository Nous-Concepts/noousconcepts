# Implementation Plan: Pantalla Presentación (Modo Oscuro)

## Overview

Implementar la nueva página de Presentación del sitio Nous Concepts siguiendo la arquitectura existente: HTML estático, CSS con variables (design tokens), y carga dinámica de componentes (Header, Nav) mediante `loadComponent`. La página aplica modo oscuro como tema predeterminado con diseño mobile-first. No requiere JavaScript adicional más allá de la inicialización estándar.

## Tasks

- [x] 1. Crear la página HTML de presentación
  - [x] 1.1 Crear `src/pages/presentacion.html` con la estructura semántica completa
    - Incluir `<!DOCTYPE html>`, `<html lang="es">`, meta viewport, meta charset
    - Enlazar hojas de estilo en orden: variables.css → main.css → components.css → presentacion.css
    - Incluir `<div id="header-placeholder"></div>` y `<div id="nav-placeholder"></div>`
    - Crear `<main class="presentacion" aria-label="Presentación del estudio Nous Concepts">`
    - Incluir `<h1 class="presentacion__title">Presentación</h1>`
    - Incluir `<section class="presentacion__content" aria-label="Contenido de la presentación">` con párrafo(s) de texto
    - Enlazar `<script type="module" src="../js/main.js"></script>` al final del body
    - _Requirements: 1.1, 1.2, 1.3, 4.1, 5.1, 7.1, 7.2_

- [x] 2. Crear la hoja de estilos específica de la página
  - [x] 2.1 Crear `src/styles/presentacion.css` con estilos mobile-first
    - Definir `.presentacion` con padding-top para compensar el Header fijo (64px / `--nav-height`), min-height de viewport, padding horizontal con `--spacing-sm`
    - Definir `.presentacion__title` con `text-align: right`, `font-family: var(--font-heading)`, `color: var(--color-text)`, `font-size: var(--font-size-xl)` (mobile)
    - Definir `.presentacion__content` con `max-width: 720px`, `margin-inline: auto`, `line-height: 1.7`, `color: var(--color-text)`, `font-size: var(--font-size-base)` (mobile)
    - Definir `.presentacion__content p` para estilos de párrafo
    - Agregar media query `@media (min-width: 769px)` para escalar título a `--font-size-hero` y contenido a `--font-size-lg`
    - Utilizar SOLO variables CSS para colores (sin valores hex/rgb literales)
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 4.2, 4.3, 4.4, 4.5, 4.6, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7, 6.1, 6.2, 6.3, 6.4_

- [x] 3. Checkpoint - Verificar estructura y estilos
  - Ensure all tests pass, ask the user if questions arise.

- [x] 4. Escribir tests unitarios
  - [x]* 4.1 Crear `src/js/presentacion.test.js` con tests de estructura HTML
    - Test: la página tiene un único elemento `<h1>`
    - Test: el `<h1>` contiene el texto "Presentación"
    - Test: existe `<main>` con `aria-label` descriptivo
    - Test: existe `<section>` con `aria-label` dentro de main
    - Test: orden vertical correcto: header-placeholder → nav-placeholder → main
    - Test: el main tiene la clase `presentacion`
    - _Requirements: 1.1, 4.1, 7.1, 7.2_

  - [x]* 4.2 Agregar tests de CSS y tokens de diseño en `src/js/presentacion.test.js`
    - Test: el archivo CSS no contiene valores de color literales (hex/rgb) fuera de comentarios
    - Test: las media queries usan `min-width` (no `max-width`) — mobile-first
    - Test: se usa 768px/769px como breakpoint (umbral único)
    - Test: se referencian las variables `--color-bg`, `--color-text`, `--font-heading`
    - _Requirements: 2.4, 6.1, 6.4_

  - [x]* 4.3 Agregar tests de contraste y accesibilidad en `src/js/presentacion.test.js`
    - Test: contraste entre `#eaeaea` (texto) y `#0f0f1a` (fondo) cumple ratio ≥ 4.5:1 WCAG AA
    - Test: `.presentacion__title` tiene `text-align: right`
    - _Requirements: 2.5, 4.2, 7.6_

- [x] 5. Final checkpoint - Verificar implementación completa
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property-based testing is NOT applicable for this feature (static UI rendering/layout with no variable input space)
- The Header and Nav components already have their own test coverage in existing specs — no need to re-test their behavior here
- Unit tests validate DOM structure, CSS compliance, and accessibility attributes using Vitest + jsdom

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1", "2.1"] },
    { "id": 1, "tasks": ["4.1", "4.2", "4.3"] }
  ]
}
```
