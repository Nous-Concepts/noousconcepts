# Implementation Plan: Neo Samaria Conexión

## Overview

Implementación de la pantalla "Neo Samaria Conexión" para el sitio Nous Concepts. Se crea una página HTML estática con su CSS modular dedicado, siguiendo el patrón mobile-first establecido en el proyecto. La página reutiliza los componentes Header y Nav existentes, cargados dinámicamente mediante `loadComponent()`, y presenta un título centrado, una sección de sinopsis textual y dos imágenes promocionales del proyecto de ciencia ficción.

## Tasks

- [x] 1. Crear estructura de archivos y página HTML
  - [x] 1.1 Crear el archivo `src/pages/neo-samaria-conexion.html` con la estructura HTML completa
    - Incluir `<!DOCTYPE html>`, `<html lang="es" data-theme="dark">`, meta charset y viewport
    - Enlazar las hojas de estilo: `variables.css`, `main.css`, `components.css`, `neo-samaria-conexion.css`
    - Agregar placeholders `#header-placeholder` y `#nav-placeholder`
    - Crear `<main class="neo-samaria" aria-label="Proyecto Neo Samaria Conexión">` con:
      - `<h1 class="neo-samaria__title">Neo Samaria Conexión</h1>`
      - `<section class="neo-samaria__synopsis" aria-label="Sinopsis del proyecto Neo Samaria Conexión">` con el texto completo de la sinopsis
      - `<section class="neo-samaria__images" aria-label="Imágenes del proyecto Neo Samaria Conexión">` con dos `<img>` envueltas en contenedores con `aspect-ratio`
    - Incluir `<script type="module" src="../js/main.js"></script>` antes de cerrar `</body>`
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.6, 2.1, 4.1, 4.2, 4.7, 5.1, 5.8, 6.1, 6.4, 6.5, 6.7, 7.7, 8.1, 8.2, 8.3, 8.4, 8.9, 8.10, 9.1, 9.3_

  - [x] 1.2 Crear el directorio `src/assets/images/contenidos/neo-samaria/` y agregar imágenes placeholder
    - Crear archivos de imagen `hero.webp` y `secondary.webp` (pueden ser placeholders iniciales)
    - Verificar que los atributos `src` de las imágenes apunten a rutas válidas
    - _Requirements: 6.7, 9.2_

- [x] 2. Implementar estilos CSS de la página
  - [x] 2.1 Crear el archivo `src/styles/neo-samaria-conexion.css` con estilos base (mobile-first)
    - Definir `.neo-samaria` con padding-top mínimo de 96px (offset del header fijo) y padding-inline de `var(--spacing-sm)`
    - Definir `.neo-samaria__title` con `text-align: center`, `font-family: var(--font-heading)`, `color: var(--color-text)`, `font-size: var(--font-size-xl)`
    - Definir `.neo-samaria__synopsis` con `max-width: 720px`, `margin-inline: auto`, `line-height: 1.7`, `text-align: left`, `color: var(--color-text)`, `font-size: var(--font-size-base)`, padding vertical de `var(--spacing-md)`
    - Definir `.neo-samaria__images` con `display: flex`, `flex-direction: column`, `gap: var(--spacing-md)`, `max-width: 720px`, `margin-inline: auto`
    - Definir `.neo-samaria__image-wrapper` con `aspect-ratio: 16/9`, `width: 100%`
    - Definir `.neo-samaria__image-wrapper img` con `width: 100%`, `height: auto`, `border-radius: 4px`, `display: block`
    - No usar valores de color literales (hex/rgb) — solo variables CSS
    - Incluir valor de respaldo para background en body: `background-color: var(--color-bg, #0f0f1a)` (único literal permitido como fallback)
    - _Requirements: 2.2, 2.3, 2.4, 2.6, 4.2, 4.3, 4.4, 4.5, 5.2, 5.3, 5.4, 5.6, 5.7, 6.2, 6.3, 6.6, 6.8, 7.1, 7.2, 7.6, 8.8_

  - [x] 2.2 Agregar media query responsive para viewport > 768px
    - Usar `@media (min-width: 769px)` como único breakpoint
    - Escalar `.neo-samaria__title` a `font-size: var(--font-size-hero)`
    - Escalar `.neo-samaria__synopsis` párrafos a `font-size: var(--font-size-lg)`
    - Aumentar padding-inline del contenedor a `var(--spacing-md)`
    - _Requirements: 4.6, 5.5, 7.3, 7.4, 7.5_

- [x] 3. Checkpoint - Verificar estructura y estilos
  - Ensure all tests pass, ask the user if questions arise.

- [x] 4. Agregar entrada de navegación y verificar integración
  - [x] 4.1 Actualizar `src/components/nav.html` para incluir enlace a Neo Samaria Conexión
    - Agregar un enlace a `neo-samaria-conexion.html` dentro del menú de navegación
    - Mantener la estructura y clases existentes del nav
    - _Requirements: 1.3, 3.1_

- [x] 5. Escribir tests unitarios
  - [ ]* 5.1 Crear archivo de test `src/js/neo-samaria-conexion.test.js` con tests de estructura DOM
    - Verificar que existe un único `<h1>` con texto "Neo Samaria Conexión"
    - Verificar orden vertical: header-placeholder → nav-placeholder → main
    - Verificar que `<main>` tiene clase `neo-samaria` y `aria-label` descriptivo
    - Verificar existencia de `<section>` con `aria-label` para sinopsis e imágenes
    - Verificar que existen dos elementos `<img>` dentro de la sección de imágenes
    - Verificar que cada imagen tiene atributo `alt` con longitud entre 10 y 125 caracteres
    - Verificar ausencia de textos prohibidos ("En Construcción", "Lorem Ipsum", etc.)
    - _Requirements: 1.1, 4.1, 4.7, 5.1, 6.1, 6.4, 6.5, 8.1, 8.2, 8.3, 8.4, 8.9, 9.1, 9.3_

  - [ ]* 5.2 Agregar tests de CSS y tokens de diseño al archivo de test
    - Verificar que `neo-samaria-conexion.css` no contiene valores de color literales (hex/rgb)
    - Verificar que las media queries usan `min-width` (mobile-first)
    - Verificar que el breakpoint único es 768px o 769px
    - Verificar que se referencian variables `--color-text`, `--font-heading`, `--spacing-md`
    - Verificar contraste WCAG ≥ 4.5:1 entre #eaeaea (texto) y #0f0f1a (fondo)
    - _Requirements: 2.4, 2.5, 7.1, 7.4, 8.8_

  - [ ]* 5.3 Agregar tests de contenido y accesibilidad
    - Verificar que el atributo `data-theme="dark"` está en el elemento `<html>`
    - Verificar que el texto de sinopsis contiene "Neo Samaria, LA ULTIMA CIUDAD DEL CARIBE COLOMBIANO"
    - Verificar que las imágenes apuntan a rutas en `contenidos/neo-samaria/`
    - Verificar que los contenedores de imagen tienen estilo para `aspect-ratio`
    - _Requirements: 2.1, 5.1, 6.6, 6.7, 6.9_

- [x] 6. Final checkpoint - Verificar tests y revisión completa
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- No property-based tests are included because the design has no Correctness Properties section (this is a static UI page)
- Unit tests validate DOM structure, CSS conventions, and accessibility attributes
- Los componentes Header y Nav se reutilizan sin modificación; `main.js` maneja su inicialización
- Las imágenes placeholder deben ser reemplazadas por assets finales del proyecto

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1", "1.2"] },
    { "id": 1, "tasks": ["2.1"] },
    { "id": 2, "tasks": ["2.2", "4.1"] },
    { "id": 3, "tasks": ["5.1", "5.2", "5.3"] }
  ]
}
```
