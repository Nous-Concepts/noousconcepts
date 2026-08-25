# Implementation Plan: Pánico Disfórico Screen

## Overview

Crear la pantalla de detalle de la serie Pánico Disfórico siguiendo el patrón establecido por `neo-samaria-conexion.html/.css`. La implementación consta de tres artefactos: la página HTML, la hoja de estilos CSS y el archivo de tests Vitest/jsdom.

## Tasks

- [x] 1. Crear la página HTML `src/pages/panico-disforico.html`
  - [x] 1.1 Escribir la estructura base del documento HTML
    - Declarar `<!DOCTYPE html>`, `<html lang="es" data-theme="dark">`, `<meta charset="UTF-8">`, `<meta name="viewport">`
    - Establecer `<title>Pánico Disfórico — NOUS CONCEPTS</title>`
    - Enlazar las cuatro hojas de estilo en orden: `variables.css` → `main.css` → `components.css` → `panico-disforico.css`
    - _Requirements: 1.1, 1.2, 2.1_

  - [x] 1.2 Añadir skip link, placeholders y script module
    - Insertar `<a href="#main-content" class="visually-hidden">Saltar al contenido principal</a>` como primer elemento enfocable del `<body>`
    - Insertar `<div id="header-placeholder"></div>` y `<div id="nav-placeholder"></div>` en ese orden
    - Insertar `<div id="footer-placeholder"></div>` antes del cierre de `</body>`
    - Añadir `<script type="module" src="../js/main.js"></script>` al final del `<body>`
    - _Requirements: 1.3, 1.4, 1.6, 8.1, 9.1, 9.2_

  - [x] 1.3 Implementar el bloque `<main>` con etiqueta, título, descripción, hero y CTA
    - Crear `<main id="main-content" class="panico-disforico" aria-label="Pánico Disfórico — Serie">`
    - Dentro de `.panico-disforico__content`: añadir `.panico-disforico__label` con texto `"SERIE"`, `<h1 class="panico-disforico__title">Pánico Disfórico</h1>`, `<p class="panico-disforico__description">` con la descripción completa de la serie
    - Añadir `.panico-disforico__hero-wrapper` con `<img class="panico-disforico__hero" src="../assets/images/contenidos/panico-disforico/hero.webp" alt="Logotipo de Pánico Disfórico con letras de estilo horror en rojo sobre fondo negro" />`
    - Añadir `<a class="panico-disforico__cta" href="contenidos.html#panico-disforico">Más Contenido →</a>`
    - _Requirements: 1.5, 3.1, 3.2, 3.4, 3.5, 4.1, 4.2, 4.4, 4.5, 5.1, 5.2, 5.3, 8.2, 8.3_

  - [x] 1.4 Implementar la Tab Bar con SVG icons inline
    - Crear `<nav class="tab-bar" aria-label="Navegación de secciones">` con tres `<a class="tab-bar__item">` enlazando a `home.html`, `contenidos.html` (con clase `tab-bar__item--active`) y `presentacion.html`
    - Incluir SVG inline (`aria-hidden="true"`, `width="24" height="24"`) para cada ítem: casa, play, info
    - Añadir `<span class="tab-bar__label">` con texto: `"Inicio"`, `"Contenido"`, `"Nosotros"`
    - Añadir `aria-label` en cada `<a>`: `"Ir a Inicio"`, `"Ir a Contenidos (activo)"`, `"Ir a Nosotros"`
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 8.4_

- [x] 2. Crear la hoja de estilos `src/styles/panico-disforico.css`
  - [x] 2.1 Escribir estilos base mobile-first (≤768px)
    - Encabezado de comentarios idéntico al de `neo-samaria-conexion.css`
    - Regla `body` con `background-color: var(--color-bg, #0f0f1a)` (único literal permitido como fallback)
    - Estilos para `.panico-disforico`: `padding-top: 96px`, `padding-inline: var(--spacing-sm)`, `padding-bottom: 72px`
    - Estilos para `.panico-disforico__content`: `max-width: 720px`, `margin-inline: auto`, `display: flex`, `flex-direction: column`, `gap: var(--spacing-md)`
    - Estilos para `__label`: `--color-text-muted`, `font-size: var(--font-size-sm, 0.75rem)`, `letter-spacing`
    - Estilos para `__title`: `--font-heading`, `--font-size-xl`, `--color-text`, `margin: 0`
    - Estilos para `__description`: `--color-text`, `line-height: 1.6`, `--font-size-base`, `margin: 0`
    - Estilos para `__hero-wrapper`: `width: 100%`; para `__hero`: `width: 100%`, `height: auto`, `border-radius: 8px`, `display: block`
    - Estilos para `__cta`: fondo `var(--color-secondary)`, color `var(--color-text)`, `border-radius: 24px`, `padding: var(--spacing-xs) var(--spacing-md)`, `text-decoration: none`; `__cta:focus-visible` con `outline: 2px solid var(--color-accent)`, `outline-offset: 2px`
    - _Requirements: 2.2, 2.3, 2.4, 3.1, 3.2, 3.4, 3.5, 4.3, 4.4, 5.3, 5.4, 5.5, 5.6, 7.1, 7.2, 7.3, 9.3_

  - [x] 2.2 Añadir estilos de Tab Bar y breakpoint responsive (>768px)
    - Estilos para `.tab-bar`: `position: fixed`, `bottom: 0`, `left: 0`, `right: 0`, `display: flex`, `justify-content: space-around`, `background-color: var(--color-primary)`, `height: 56px`, `z-index: 100`
    - Estilos para `.tab-bar__item`: `flex-direction: column`, `color: var(--color-text-muted)`, `text-decoration: none`; `--active`: `color: var(--color-accent)`, `border-bottom: 2px solid var(--color-accent)`; `__item:focus-visible`: `outline: 2px solid var(--color-accent)`
    - Sección `@media (min-width: 769px)`: aumentar `padding-inline` a `var(--spacing-md)`, reducir `padding-bottom` a `var(--spacing-md)`, aumentar `__title` a `--font-size-hero`, añadir `.tab-bar { display: none }`
    - _Requirements: 2.2, 3.3, 6.1, 6.4, 6.5, 6.6, 6.7, 6.8, 7.1, 7.4_

  - [x] 2.3 Verificar Property 1 — Sin colores literales en panico-disforico.css
    - **Property 1: Sin colores literales en panico-disforico.css**
    - El CSS no debe contener hex, `rgb()`, `hsl()` ni nombres de color salvo el fallback `var(--color-bg, #0f0f1a)` en `body`
    - **Validates: Requirements 2.2**

  - [x] 2.4 Verificar Property 3 — Tab Bar visible solo en móvil
    - **Property 3: Tab Bar visible solo en móvil**
    - `.tab-bar` usa `display: none` en el breakpoint `>768px` y está visible en base (≤768px)
    - **Validates: Requirements 6.7**

- [x] 3. Checkpoint — Revisar HTML y CSS antes de los tests
  - Ensure all implementation is in place, ask the user if questions arise.

- [x] 4. Crear el archivo de tests `src/js/panico-disforico.test.js`
  - [x] 4.1 Configurar el archivo de test con imports y helpers
    - Importar `describe`, `it`, `expect`, `beforeEach` desde `vitest`
    - Importar `readFileSync`, `existsSync` desde `fs` y `resolve` desde `path`
    - Leer `htmlPath` → `src/pages/panico-disforico.html` y `cssPath` → `src/styles/panico-disforico.css`
    - Copiar helpers `stripCssComments`, `relativeLuminance` y `contrastRatio` del archivo `neo-samaria-conexion.test.js`
    - _Requirements: 9.3_

  - [x] 4.2 Escribir tests de estructura DOM (describe "Estructura DOM")
    - Test: `<html>` tiene `data-theme="dark"` y `lang="es"`
    - Test: `<title>` es `"Pánico Disfórico — NOUS CONCEPTS"`
    - Test: orden en `<body>` → skip link → header-placeholder → nav-placeholder → main → tab-bar → footer-placeholder
    - Test: `<main>` tiene `id="main-content"` y `aria-label="Pánico Disfórico — Serie"`
    - Test: existe exactamente un `<h1>` con texto `"Pánico Disfórico"`
    - Test: `.panico-disforico__label` contiene texto `"SERIE"`
    - Test: `.panico-disforico__description` contiene la descripción completa de la serie
    - Test: `.panico-disforico__hero` tiene `src` con `contenidos/panico-disforico/hero.webp` y `alt` no vacío (longitud 10–125 caracteres)
    - Test: `.panico-disforico__cta` tiene `href="contenidos.html#panico-disforico"` y texto `"Más Contenido →"`
    - _Requirements: 1.1, 1.2, 1.5, 3.1, 3.2, 3.4, 4.1, 4.2, 5.1, 5.2, 8.2, 8.3_

  - [x] 4.3 Escribir tests de placeholders y script (describe "Placeholders y main.js")
    - Test: `#header-placeholder` existe en el DOM estático
    - Test: `#nav-placeholder` existe en el DOM estático
    - Test: `#footer-placeholder` existe en el DOM estático
    - Test: `<script type="module" src="../js/main.js">` está presente en el HTML
    - _Requirements: 1.3, 1.4, 1.6, 9.1, 9.2_

  - [x] 4.4 Escribir tests de Tab Bar (describe "Tab Bar")
    - Test: existe `<nav class="tab-bar" aria-label="Navegación de secciones">`
    - Test: la Tab Bar tiene exactamente 3 ítems `<a>`
    - Test: el ítem con clase `tab-bar__item--active` apunta a `contenidos.html`
    - Test: los tres `aria-label` de los ítems son `"Ir a Inicio"`, `"Ir a Contenidos (activo)"`, `"Ir a Nosotros"`
    - Test: cada ítem contiene un `<svg>` con `aria-hidden="true"` y un elemento `.tab-bar__label`
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 8.4_

  - [x] 4.5 Escribir tests de CSS y tokens de diseño (describe "CSS y tokens de diseño")
    - Test: el archivo CSS existe
    - Test: el CSS no contiene colores literales (hex/rgb) salvo el fallback permitido
    - Test: las media queries usan `min-width` (mobile-first)
    - Test: el breakpoint único es `768px` o `769px`
    - Test: `.tab-bar { display: none }` aparece dentro de la media query
    - Test: se referencian `--color-text`, `--font-heading`, `--spacing-md`, `--color-accent`
    - _Requirements: 2.2, 6.7, 7.4, 9.3_

  - [x] 4.6 Verificar Property 2 — Orden de carga de estilos en `<head>`
    - **Property 2: Orden de carga de estilos**
    - Test: en el `<head>`, el índice de `variables.css` < `main.css` < `components.css` < `panico-disforico.css`
    - **Validates: Requirements 2.1**

  - [x] 4.7 Verificar Property 4 — Contraste WCAG 2.1 AA
    - **Property 4: Contraste mínimo WCAG 2.1 AA**
    - Test: contraste `#eaeaea` sobre `#0f0f1a` ≥ 4.5:1 (texto normal)
    - Test: contraste `#a0a0a0` sobre `#0f0f1a` ≥ 3:1 (texto pequeño / muted)
    - **Validates: Requirements 8.5, 8.6**

  - [x] 4.8 Verificar Property 5 — Placeholders presentes en DOM estático
    - **Property 5: Placeholders presentes antes de main.js**
    - Test: `#header-placeholder`, `#nav-placeholder` y `#footer-placeholder` existen en el HTML sin ejecutar JS
    - **Validates: Requirements 1.3, 1.4**

- [x] 5. Checkpoint final — Ejecutar todos los tests
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Las tareas marcadas con `*` son opcionales para un MVP más rápido, pero se recomienda ejecutarlas para garantizar conformidad con las propiedades de corrección del diseño.
- Cada tarea referencia requisitos específicos para trazabilidad directa con `requirements.md`.
- El patrón base es `neo-samaria-conexion.html/.css/.test.js`; seguirlo fielmente garantiza consistencia de código.
- `main.js` no necesita modificación — la interfaz es puramente DOM-based mediante los tres placeholders.
- El asset `hero.webp` no es creado por este spec; el test verifica la ruta esperada pero no la existencia del archivo en disco.

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1"] },
    { "id": 1, "tasks": ["1.2", "1.3"] },
    { "id": 2, "tasks": ["1.4", "2.1"] },
    { "id": 3, "tasks": ["2.2", "4.1"] },
    { "id": 4, "tasks": ["2.3", "2.4", "4.2", "4.3", "4.4", "4.5"] },
    { "id": 5, "tasks": ["4.6", "4.7", "4.8"] }
  ]
}
```
