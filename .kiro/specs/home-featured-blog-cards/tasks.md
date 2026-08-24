# Implementation Plan: Home Featured Blog Cards

## Overview

Implementar la sección "Estrenos Destacados" en la página de inicio de NOUS CONCEPTS. Se crean dos módulos JavaScript (blog-service.js para datos, featured-cards.js para renderizado), la estructura HTML estática en home.html, y los estilos CSS BEM mobile-first. La sección obtiene dinámicamente hasta 2 posts del blog corporativo y maneja estados de carga y error con degradación elegante.

## Tasks

- [x] 1. Crear el módulo de servicio del blog y sus tests
  - [x] 1.1 Implementar `blog-service.js` con las funciones `fetchFeaturedPosts`, `mapApiPostToBlogPost` e `isValidBlogResponse`
    - Crear el archivo `src/js/blog-service.js`
    - Implementar `isValidBlogResponse(data)` que valida si la respuesta es un array con al menos un objeto con los campos requeridos
    - Implementar `mapApiPostToBlogPost(rawPost)` que transforma un objeto crudo de la API al formato BlogPost usando el DEFAULT_FIELD_MAP configurable
    - Implementar `fetchFeaturedPosts(apiUrl, options)` que realiza HTTP GET con AbortController para timeout (default 8s), valida la respuesta, y retorna hasta `maxPosts` (default 2) BlogPosts transformados en orden original
    - Lanzar Error descriptivo (incluyendo URL) en caso de fallo de red, timeout, HTTP no exitoso, JSON inválido o respuesta sin posts válidos
    - _Requirements: 2.1, 2.2, 2.3, 2.5, 5.1, 5.2, 5.3, 5.5_

  - [x] 1.2 Escribir property test para selección de posts (Property 1)
    - **Property 1: Selection limits to first 2 posts in order**
    - Para cualquier array de N posts válidos (N ≥ 0), `fetchFeaturedPosts` retorna un array de longitud `min(N, 2)` con los primeros elementos en orden original
    - Usar fast-check con generador `blogPostArrayArb`; mockear fetch para devolver el array
    - **Validates: Requirements 1.3, 2.2, 2.5**

  - [x] 1.3 Escribir property test para mapeo de campos (Property 2)
    - **Property 2: API-to-BlogPost mapping preserves all fields**
    - Para cualquier objeto crudo válido, `mapApiPostToBlogPost` produce un BlogPost donde cada campo corresponde al valor mapeado sin pérdida ni mutación
    - Usar fast-check con generador de objetos crudos de API
    - **Validates: Requirements 2.3**

  - [x] 1.4 Escribir property test para validación de respuestas (Property 5)
    - **Property 5: Validation rejects invalid blog responses**
    - Para cualquier valor que no sea un array, o sea un array sin objetos con campos requeridos, `isValidBlogResponse` retorna false
    - Usar fast-check con `fc.anything()` filtrado para valores inválidos
    - **Validates: Requirements 5.3**

  - [x] 1.5 Escribir unit tests de error handling para `blog-service.js`
    - Test: fetch rechazado por error de red lanza Error
    - Test: timeout excedido lanza Error
    - Test: HTTP status ≥ 400 lanza Error con status
    - Test: respuesta no-JSON lanza Error
    - Test: JSON válido sin posts válidos lanza Error
    - Test: El mensaje de error incluye la URL solicitada
    - _Requirements: 5.1, 5.2, 5.3, 5.5_

- [x] 2. Crear el módulo de renderizado de tarjetas y sus tests
  - [x] 2.1 Implementar `featured-cards.js` con las funciones `initFeaturedCards`, `renderCard`, `renderLoadingState` y `renderErrorState`
    - Crear el archivo `src/js/featured-cards.js`
    - Implementar `renderLoadingState(count)` que genera HTML de skeleton placeholders con aria-live="polite"
    - Implementar `renderErrorState()` que genera HTML con mensaje "No se pudieron cargar los estrenos destacados." y role="status"
    - Implementar `renderCard(post)` que genera HTML de una tarjeta con: img (src=imageUrl, alt=título), categoría, readingTime condicional ("{n} min de lectura"), título como heading, descripción condicional, enlace navegable con nombre accesible que incluye el título
    - Implementar `initFeaturedCards(config)` que orquesta: mostrar loading → fetch datos → renderizar tarjetas o error; capturar excepciones y loguear con console.error
    - _Requirements: 2.4, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 4.1, 4.2, 4.3, 5.4, 9.2_

  - [x] 2.2 Escribir property test para renderizado de tarjetas (Property 3)
    - **Property 3: Rendered card contains all present BlogPost fields**
    - Para cualquier BlogPost válido, `renderCard` produce HTML que contiene: imageUrl como img src, título como alt, categoría, título como heading, url como href, y (si no son null) readingTime y descripción
    - **Validates: Requirements 2.4, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6**

  - [x] 2.3 Escribir property test para campos opcionales ausentes (Property 4)
    - **Property 4: Optional fields absent when null produce no empty elements**
    - Para cualquier BlogPost con readingTime=null, el HTML no contiene elemento reading-time; con description=null, no contiene elemento description
    - **Validates: Requirements 3.7**

  - [x] 2.4 Escribir property test para nombre accesible del enlace (Property 6)
    - **Property 6: Card link accessible name includes post title**
    - Para cualquier BlogPost, `renderCard` produce HTML cuyo enlace tiene un nombre accesible que incluye el título del post
    - **Validates: Requirements 9.2, 9.5**

  - [x] 2.5 Escribir unit tests para estados de carga y error en `featured-cards.js`
    - Test: `renderLoadingState` genera HTML con clase `featured__loading` y aria-live="polite"
    - Test: `renderErrorState` genera HTML con clase `featured__error` y mensaje informativo
    - Test: `initFeaturedCards` muestra loading mientras fetch está en curso
    - Test: `initFeaturedCards` reemplaza loading por tarjetas en éxito
    - Test: `initFeaturedCards` muestra error state cuando fetch falla
    - Test: `initFeaturedCards` loguea error en consola con URL
    - _Requirements: 4.1, 4.2, 4.3, 5.1, 5.4, 5.5_

- [x] 3. Checkpoint - Verificar módulos JavaScript
  - Ensure all tests pass, ask the user if questions arise.

- [x] 4. Implementar estructura HTML y estilos CSS
  - [x] 4.1 Añadir la sección HTML estática de Estrenos Destacados en `home.html`
    - Insertar la sección entre "Contents Preview" y el scroll-more button previo a "About"
    - Incluir scroll-more button antes de la sección con aria-label adecuado
    - Agregar `<section class="featured" aria-label="Estrenos destacados del blog">` con etiqueta, título h2, contenedor de tarjetas (aria-live="polite"), y enlace CTA
    - El Boton_Mas_Contenido debe ser un `<a>` con href a `contenidos.html` y texto "Más Contenido →"
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 6.1, 6.2_

  - [x] 4.2 Crear el archivo de estilos `featured-cards.css` con convención BEM mobile-first
    - Crear `src/styles/featured-cards.css`
    - Definir estilos base (mobile ≤ 768px): `.featured` con --color-bg, `.featured__label` con --color-accent, `.featured__title` con --color-text y --font-heading, `.featured__cards` en flex column
    - Definir `.featured-card` con --color-surface como fondo y --color-text para título
    - Definir `.featured-card__image` con max-width 100% y object-fit cover
    - Definir `.featured__cta` con min 44×44px de área interactiva y focus visible (outline 2px solid --color-accent, offset 2px)
    - Agregar media query `@media (min-width: 769px)` para layout de 2 columnas en `.featured__cards`
    - Definir estilos de `.featured__loading` (skeleton animado) y `.featured__error`
    - Asegurar contraste mínimo 4.5:1 usando variables CSS existentes
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5, 7.6, 8.1, 8.2, 8.3, 8.4, 6.3, 6.4, 9.3_

  - [x] 4.3 Importar `featured-cards.css` en la página home y verificar carga
    - Agregar `<link>` a `featured-cards.css` en `home.html` o importar desde `home.css`
    - Verificar que no hay conflictos con estilos existentes
    - _Requirements: 7.6_

- [x] 5. Integrar módulos con la página de inicio
  - [x] 5.1 Integrar `featured-cards.js` en `main.js`
    - Importar `initFeaturedCards` desde `./featured-cards.js`
    - Invocar `initFeaturedCards()` dentro de `initPage()` después de la inicialización de componentes existentes
    - Configurar la URL de la API del blog como parámetro
    - _Requirements: 2.1, 2.4_

  - [x] 5.2 Verificar accesibilidad de navegación por teclado
    - Asegurar que los enlaces de las tarjetas son alcanzables con Tab en orden lógico
    - Asegurar que los enlaces se activan con Enter
    - Verificar indicadores de foco visibles en todos los elementos interactivos de la sección
    - _Requirements: 9.1, 9.3, 9.4_

- [x] 6. Final checkpoint - Verificar integración completa
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties using fast-check (already in devDependencies)
- Unit tests validate specific examples and edge cases using vitest + jsdom
- El proyecto usa JavaScript vanilla con ES modules — no hay framework ni bundler
- Los estilos siguen convención BEM consistente con `home.css` y `components.css`
- La URL de la API del blog se configura como parámetro para facilitar testing y despliegue

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1", "4.2"] },
    { "id": 1, "tasks": ["1.2", "1.3", "1.4", "1.5", "2.1", "4.1"] },
    { "id": 2, "tasks": ["2.2", "2.3", "2.4", "2.5", "4.3"] },
    { "id": 3, "tasks": ["5.1"] },
    { "id": 4, "tasks": ["5.2"] }
  ]
}
```
