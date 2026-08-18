# Implementation Plan: Header Dark Mode Home

## Overview

Implementación de un componente Header independiente (`header.html` + `header.js`), comunicación vía `CustomEvent` con el componente Nav existente, aplicación formal del modo oscuro en la página de inicio, y creación del botón "Más" con scroll suave entre secciones.

## Tasks

- [x] 1. Create Header component and integrate into page
  - [x] 1.1 Create `src/components/header.html` with semantic markup
    - Create the header HTML file with `<header class="site-header">` containing a `<nav>` with `aria-label`, logo link, and hamburger button
    - Use BEM classes: `.site-header`, `.site-header__logo`, `.site-header__menu-btn`, `.site-header__menu-icon`
    - Set `aria-expanded="false"`, `aria-controls="nav-menu"`, `aria-label="Abrir menú"` on the button
    - Ensure no `.main-nav`, `.nav-toggle`, `.nav-links`, or `#nav-menu` selectors are used
    - _Requirements: 1.1, 1.2, 2.1, 2.2, 2.3, 2.5, 3.1, 3.2, 3.3_

  - [x] 1.2 Create `src/js/header.js` with initialization and toggle logic
    - Export `initHeader()`, `toggleMenu()`, `getMenuState()` functions
    - `initHeader()` registers click event on `.site-header__menu-btn`
    - `toggleMenu()` toggles `aria-expanded` between "true"/"false", updates `aria-label` ("Abrir menú"/"Cerrar menú"), and dispatches `CustomEvent('menu-toggle', { detail: { state } })` on `document`
    - `getMenuState()` returns current state based on `aria-expanded` attribute
    - Include null checks for DOM elements, return early if not found
    - Do not import or invoke any function from `nav.js`
    - _Requirements: 1.2, 1.4, 3.2, 3.3, 3.4, 4.1, 4.3_

  - [x] 1.3 Update `src/pages/home.html` to include header placeholder
    - Add `<div id="header-placeholder"></div>` before `#nav-placeholder`
    - _Requirements: 1.3_

  - [x] 1.4 Update `src/js/main.js` to load header component and call `initHeader()`
    - Import `initHeader` from `./header.js`
    - Import `initScrollMoreButtons` from `./scroll-more.js`
    - Add `await loadComponent('#header-placeholder', '../components/header.html')` as first load call in `initPage()`
    - Call `initHeader()` after header HTML is loaded, before `initNavigation()`
    - Call `initScrollMoreButtons()` after `initNavigation()`
    - _Requirements: 1.3, 1.4_

- [x] 2. Update Nav component to listen for menu-toggle events
  - [x] 2.1 Add `listenMenuToggleEvent()` to `src/js/nav.js`
    - Add and export a `listenMenuToggleEvent()` function that listens for `'menu-toggle'` CustomEvent on `document`
    - On event, read `event.detail.state` and toggle `.is-open` class on `#nav-menu` accordingly (add if `'open'`, remove if `'close'`)
    - Update `aria-expanded` on `.nav-toggle` to match state
    - Call `listenMenuToggleEvent()` at the end of `initNavigation()`
    - _Requirements: 4.2, 4.4_

  - [x] 2.2 Implement focus management when menu closes
    - When the menu is closed (via `menu-toggle` event with state `'close'`), check if active element is inside `#nav-menu`
    - If so, move focus to `.site-header__menu-btn`
    - _Requirements: 3.6_

  - [ ]* 2.3 Write property test for toggle state consistency (Property 1)
    - **Property 1: Toggle state consistency**
    - Generate random sequences of toggle calls (length 1–50), verify `aria-expanded` matches parity and `aria-label` matches state
    - **Validates: Requirements 3.2, 3.3, 3.4**

  - [ ]* 2.4 Write property test for event dispatch correctness (Property 2)
    - **Property 2: Event dispatch correctness**
    - Generate random initial states, trigger toggle, verify dispatched event `detail.state` is correct
    - **Validates: Requirements 4.1**

  - [ ]* 2.5 Write property test for Nav response to menu-toggle events (Property 3)
    - **Property 3: Nav responds to menu-toggle events**
    - Generate random `menu-toggle` events with `'open'`/`'close'` state, verify nav DOM class and `aria-expanded` match
    - **Validates: Requirements 4.2, 4.4**

- [x] 3. Checkpoint - Verify Header and Nav integration
  - Ensure all tests pass, ask the user if questions arise.

- [x] 4. Add Header CSS styles and dark mode formalization
  - [x] 4.1 Add Header styles to `src/styles/components.css`
    - Add `.site-header` with `position: fixed`, `top: 0`, `width: 100%`, `height: 64px (var(--nav-height))`, `display: flex`, `justify-content: space-between`, `align-items: center`, `padding-inline: var(--spacing-sm)`, `background-color: var(--color-primary)`, `z-index: 1000`
    - Style `.site-header__logo` as link with brand font, text-decoration none, color `var(--color-text)`
    - Style `.site-header__menu-btn` with 44x44px minimum touch target, no background/border
    - Style `.site-header__menu-icon` with three lines (24px wide, 2px tall, 7px spacing) using pseudo-elements
    - Add responsive rules: hide hamburger above 768px, show nav-links horizontally; show hamburger below 768px
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 5.3, 7.1, 7.2, 7.3, 7.4, 7.5_

  - [x] 4.2 Formalize dark mode application in `src/styles/home.css`
    - Ensure `body` on home page uses `background-color: var(--color-bg)` and `color: var(--color-text)`
    - Verify all sections use dark mode tokens for backgrounds and text
    - Add explicit dark mode token usage to any element not yet using design tokens
    - _Requirements: 5.1, 5.2, 5.5_

  - [ ]* 4.3 Write property test for dark mode luminosity (Property 4)
    - **Property 4: Dark mode luminosity constraints**
    - For all background color tokens, verify relative luminance ≤ 0.05; for text tokens, verify ≥ 0.85
    - **Validates: Requirements 5.1, 5.3**

  - [ ]* 4.4 Write property test for contrast ratio compliance (Property 5)
    - **Property 5: Contrast ratio compliance**
    - For all (text, background) color pairs, compute WCAG contrast ratio and verify ≥ 4.5:1
    - **Validates: Requirements 5.4**

- [x] 5. Implement scroll-more button component
  - [x] 5.1 Create `src/js/scroll-more.js` with scroll logic
    - Export `initScrollMoreButtons()` and `scrollToNextSection(button)`
    - `initScrollMoreButtons()` queries all `.scroll-more__btn` elements and registers click handlers
    - `scrollToNextSection(button)` finds the nearest parent `.scroll-more`, then the next sibling `<section>`, and calls `scrollIntoView({ behavior: 'smooth' })` on it
    - If no next section exists, return without action
    - _Requirements: 6.4, 6.6_

  - [x] 5.2 Add scroll-more buttons to `src/pages/home.html`
    - Insert a `.scroll-more` div with a button between each pair of consecutive content sections (after description, services-preview, contents-preview, about)
    - Each button has `aria-label` indicating the target section (e.g., "Ir a la sección Servicios")
    - Button contains "Más" text and "▼" chevron icon
    - Do not add a button after the last section (cta)
    - _Requirements: 6.1, 6.2, 6.3, 6.5, 6.6_

  - [x] 5.3 Add scroll-more button styles to `src/styles/home.css`
    - Style `.scroll-more` centered horizontally with margin between sections
    - Style `.scroll-more__btn` with text centered, no background, accent color, keyboard focusable appearance
    - Style `.scroll-more__text` and `.scroll-more__icon` stacked vertically
    - _Requirements: 6.2, 6.3_

  - [ ]* 5.4 Write property test for scroll-more target identification (Property 6)
    - **Property 6: Scroll-more targets next section**
    - Generate DOM structures with varying numbers of sections and buttons, verify `scrollToNextSection` identifies the correct next `<section>` sibling
    - **Validates: Requirements 6.4**

  - [ ]* 5.5 Write unit tests for scroll-more edge cases
    - Test button with no next section returns without error
    - Test button correctly identifies next section when multiple buttons exist
    - Test keyboard activation (Enter and Space) triggers scroll
    - _Requirements: 6.4, 6.5, 6.6_

- [x] 6. Final checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties defined in the design
- Unit tests validate specific examples and edge cases
- The project uses Vitest + jsdom for testing and fast-check for property-based tests
- All JavaScript follows ES module syntax with named exports
- CSS uses existing design tokens from `variables.css`

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1", "1.2", "5.1"] },
    { "id": 1, "tasks": ["1.3", "1.4", "2.1", "5.2", "5.3"] },
    { "id": 2, "tasks": ["2.2", "4.1", "4.2"] },
    { "id": 3, "tasks": ["2.3", "2.4", "2.5", "4.3", "4.4", "5.4", "5.5"] }
  ]
}
```
