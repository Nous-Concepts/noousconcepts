# Implementation Plan: Home Dark Mode Screen

## Overview

This plan implements the home screen (screen #1) for "Nous Concepts" in dark mode with a mobile-first approach. The existing codebase already has most of the structure and styles, but requires adjustments to: (1) reorder the first screen's sections (hero → scroll-more → description), (2) convert CSS to a mobile-first pattern, (3) ensure full accessibility compliance, and (4) add property-based and unit tests for the scroll and menu toggle behaviors.

## Tasks

- [x] 1. Restructure HTML for Screen #1 section order and accessibility
  - [x] 1.1 Reorder sections in `src/pages/home.html` so the first `.scroll-more` button is between the hero section and the description section, matching the required order: Hero → Scroll-More → Description
    - Move the first `<div class="scroll-more">` block from after the description section to between the hero and description sections
    - Update the `aria-label` on the scroll-more button to reference the description section (e.g., "Ir a la sección Descripción del estudio")
    - Ensure the hero section `aria-label` clearly identifies it as the main hero section (e.g., "Sección principal de Nous Concepts")
    - Verify the description section retains `aria-label="Descripción del estudio"`
    - _Requirements: 1.1, 5.8, 8.1, 8.2, 8.3_

  - [x] 1.2 Update header component `src/components/header.html` to include inline navigation links for desktop
    - Add a `<ul class="nav-links">` with navigation items (Inicio, Servicios, Contenidos) inside the header `<nav>` element
    - Ensure the links are hidden on mobile and visible on desktop via existing CSS classes
    - Verify `aria-controls` on the menu button references the correct navigation element id
    - _Requirements: 3.2, 3.8, 8.4_

- [x] 2. Refactor CSS to mobile-first approach
  - [x] 2.1 Refactor `src/styles/home.css` to use mobile-first base styles
    - Change base hero styles to use `min-height: 60vh` and `padding: var(--spacing-lg) var(--spacing-sm)` (mobile defaults)
    - Change base hero title to `font-size: var(--font-size-xl)` and tagline to `font-size: var(--font-size-lg)`
    - Change base description text to `font-size: var(--font-size-base)`
    - Replace `@media (max-width: 768px)` with `@media (min-width: 769px)` media query that scales up to desktop values
    - In the desktop media query: hero `min-height: calc(100vh - var(--nav-height))`, title `font-size: var(--font-size-hero)`, tagline `font-size: var(--font-size-xl)`, description text `font-size: var(--font-size-lg)`
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 4.2, 4.3_

  - [x] 2.2 Ensure dark mode styles are applied by default without `prefers-color-scheme`
    - Verify `body` background-color uses `var(--color-bg)` and color uses `var(--color-text)` in base styles
    - Verify hero uses `var(--color-secondary)` background
    - Verify description uses `var(--color-bg)` background and `var(--color-text-muted)` text color
    - Confirm no `prefers-color-scheme` media queries exist in any CSS file
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5_

  - [x] 2.3 Add keyboard focus styles for all interactive elements
    - Add `:focus-visible` outline of `2px solid var(--color-accent)` with `outline-offset: 2px` to all interactive elements (links, buttons) in `src/styles/main.css`
    - Ensure the scroll-more button's existing focus styles use `:focus-visible` instead of (or in addition to) `:focus`
    - Verify header logo and menu button have visible focus indicators
    - _Requirements: 5.7, 8.7, 8.8_

- [x] 3. Checkpoint - Ensure structure and styles are correct
  - Ensure all tests pass, ask the user if questions arise.

- [x] 4. Implement scroll-more and header behavior verification
  - [x] 4.1 Verify `src/js/scroll-more.js` correctly targets the next `<section>` sibling after the `.scroll-more` container
    - Confirm `scrollToNextSection` traverses `nextElementSibling` from the `.scroll-more` container (not the button) until a `<section>` is found
    - Confirm it calls `scrollIntoView({ behavior: 'smooth' })` on the found section
    - Confirm it returns without action if no section is found
    - _Requirements: 5.3, 5.9_

  - [x] 4.2 Verify `src/js/header.js` toggle behavior matches requirements
    - Confirm `toggleMenu` sets `aria-expanded` to `"true"` and `aria-label` to `"Cerrar menú"` when opening
    - Confirm `toggleMenu` sets `aria-expanded` to `"false"` and `aria-label` to `"Abrir menú"` when closing
    - Confirm `CustomEvent('menu-toggle')` is dispatched with correct detail
    - _Requirements: 3.6, 3.7, 8.4, 8.5_

  - [ ]* 4.3 Write property test for scroll targeting next section sibling
    - **Property 1: Scroll targets the next section sibling**
    - **Validates: Requirements 5.3**
    - Use fast-check to generate random DOM structures with 0–5 non-section elements between `.scroll-more` container and the next `<section>`
    - Assert `scrollIntoView` is called on the correct (first) section sibling
    - File: `src/js/scroll-more.test.js`

  - [ ]* 4.4 Write property test for scroll no-op when no section follows
    - **Property 2: Scroll does nothing when no section follows**
    - **Validates: Requirements 5.9**
    - Use fast-check to generate DOM structures where no `<section>` exists after `.scroll-more` container
    - Assert `scrollIntoView` is never called and no error is thrown
    - File: `src/js/scroll-more.test.js`

  - [ ]* 4.5 Write property test for menu toggle involution
    - **Property 3: Menu toggle is an involution (round-trip)**
    - **Validates: Requirements 3.6, 3.7, 8.4, 8.5**
    - Use fast-check to generate random number N (1–50) of toggle calls
    - Assert after N toggles: `aria-expanded === String(N % 2 !== 0)`
    - File: `src/js/header.test.js`

- [x] 5. Write unit tests for DOM structure and accessibility
  - [x]* 5.1 Write unit tests for home page layout and dark mode
    - Verify sections appear in correct order: hero → scroll-more → description (within main)
    - Verify body uses `var(--color-bg)` background (no hardcoded color)
    - Verify hero uses `var(--color-secondary)` background
    - Verify no `prefers-color-scheme` usage in stylesheets
    - File: `src/js/home-layout.test.js`
    - _Requirements: 1.1, 2.1, 2.5_

  - [x]* 5.2 Write unit tests for accessibility attributes
    - Verify hero section has `aria-label`
    - Verify description section has `aria-label`
    - Verify scroll-more button has `aria-label`
    - Verify menu button has `aria-expanded`, `aria-controls`, and `aria-label`
    - Verify all interactive elements are reachable via tab order
    - File: `src/js/home-layout.test.js`
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.7, 8.9_

- [x] 6. Final checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties from the design document
- Unit tests validate specific examples and edge cases
- The existing codebase already has much of the implementation; tasks focus on corrections and gaps
- JavaScript is the implementation language (vanilla JS, no frameworks)
- Vitest + JSDOM is the test environment; fast-check is used for property-based tests

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1", "1.2"] },
    { "id": 1, "tasks": ["2.1", "2.2", "2.3"] },
    { "id": 2, "tasks": ["4.1", "4.2"] },
    { "id": 3, "tasks": ["4.3", "4.4", "4.5", "5.1", "5.2"] }
  ]
}
```
