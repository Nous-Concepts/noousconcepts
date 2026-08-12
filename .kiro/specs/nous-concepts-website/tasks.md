# Implementation Plan: NOUS CONCEPTS Website

## Overview

Implementación de un sitio web estático para NOUS CONCEPTS usando HTML, CSS y JavaScript vanilla. El sitio consta de 3 páginas (Inicio, Contenidos, Servicios), componentes reutilizables (navegación y footer), un sistema de estilos con CSS custom properties, y pruebas automatizadas con Vitest y fast-check.

## Tasks

- [x] 1. Set up project structure and configuration
  - [x] 1.1 Create directory structure and configuration files
    - Create `package.json` with project metadata, scripts (`test`, `test:watch`), and devDependencies (vitest, fast-check, jsdom)
    - Create root `index.html` that redirects to `src/pages/home.html`
    - Create directories: `src/pages`, `src/styles`, `src/components`, `src/js`, `src/assets/images/home`, `src/assets/images/contenidos`, `src/assets/images/servicios`, `src/assets/icons`, `src/assets/fonts`, `public`
    - Add `.gitkeep` placeholder files in all empty asset subdirectories
    - Update `README.md` with project description
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 6.1, 6.2, 6.3, 6.4_

  - [x] 1.2 Create CSS design tokens and base styles
    - Create `src/styles/variables.css` with all CSS custom properties (colors, typography, spacing, breakpoints, nav-height)
    - Create `src/styles/main.css` that imports variables.css and defines base reset, body styles, and global utility classes
    - Create `src/styles/components.css` with styles for nav, footer, project cards, and shared component styles
    - _Requirements: 5.3_

- [x] 2. Implement reusable components and core JavaScript
  - [x] 2.1 Implement navigation component
    - Create `src/components/nav.html` with semantic navigation markup, ARIA attributes, hamburger toggle button, and links to all 3 pages
    - Create `src/js/nav.js` with functions: `initNavigation()`, `toggleMobileMenu()`, `setActivePage(pageName)`, `getPageNameFromPath(path)`
    - Include responsive behavior: menu collapses at viewport ≤ 768px, `aria-expanded` toggling, active page link class `nav-link--active`
    - _Requirements: 5.1, 5.4, 5.5_

  - [x] 2.2 Implement footer component
    - Create `src/components/footer.html` with social media links (Instagram, YouTube, Facebook) opening in new tabs with `rel="noopener noreferrer"`, contact email, and copyright notice
    - _Requirements: 5.2_

  - [x] 2.3 Implement component loader (`main.js`)
    - Create `src/js/main.js` with `loadComponent(selector, componentPath)` async function and `initPage()` orchestrator
    - Load `nav.html` into `#nav-placeholder` and `footer.html` into `#footer-placeholder`
    - Handle errors gracefully: log to console but don't break page if component fails to load
    - Call `initNavigation()` after nav component is loaded
    - _Requirements: 5.1, 5.2, 5.3_

  - [ ]* 2.4 Write property test for active page identification (Property 4)
    - **Property 4: Active page identification from path**
    - Test that `getPageNameFromPath` returns correct page identifier for any valid page path
    - Test that `setActivePage` results in exactly one nav link with active class
    - **Validates: Requirements 5.5**

- [x] 3. Implement page-specific styles
  - [x] 3.1 Create page-specific stylesheets
    - Create `src/styles/home.css` with styles for hero section, description, services preview, contents preview, about section, and CTA
    - Create `src/styles/contenidos.css` with styles for intro, category sections, and project cards grid
    - Create `src/styles/servicios.css` with styles for intro, service categories, service cards, and contact section
    - All stylesheets must use variables from `variables.css` for consistency
    - _Requirements: 5.3_

- [x] 4. Implement Página de Inicio (home.html)
  - [x] 4.1 Create home page HTML structure
    - Create `src/pages/home.html` with full HTML5 structure, meta tags, and stylesheet references
    - Include `#nav-placeholder` and `#footer-placeholder` divs
    - Implement hero section with full-width banner image area, "NOUS CONCEPTS" heading, and tagline "Un universo de fantasías y realidades"
    - Implement studio description section (max 150 words placeholder text about creative ideas factory)
    - Implement services preview section with description (max 100 words) and link to `servicios.html`
    - Implement original contents section with link to `contenidos.html`
    - Implement "Sobre Nosotros" section mentioning "Átomo Nous" (max 200 words)
    - Implement contact CTA with text "Contáctanos y haremos realidad tus ideas." as visible button/link
    - Include social media links (Instagram, YouTube, Facebook) opening in new tabs
    - Ensure sections appear in correct vertical order: hero, description, services, contents, about, CTA
    - Include script references to `main.js` and `nav.js`
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8, 2.9_

- [x] 5. Implement Página de Contenidos (contenidos.html)
  - [x] 5.1 Create contenidos page HTML structure
    - Create `src/pages/contenidos.html` with full HTML5 structure, meta tags, and stylesheet references
    - Include `#nav-placeholder` and `#footer-placeholder` divs
    - Implement introductory description (max 300 characters) about storytelling through comics, animation, and video
    - Implement "Educativos" category section with heading and project cards
    - Implement "Entretenimiento" category section with heading and project cards
    - Add "El Combo" project card in Educativos with description as educational animated series
    - Add "Neo Samaria Conexión" in Entretenimiento with sci-fi description
    - Add "Colombia Mix" in Entretenimiento with social comedy description
    - Add "Pánico Disfórico" in Entretenimiento with horror/paranormal transmedia comic description
    - Implement conditional external link rendering (with `target="_blank"` and `rel="noopener noreferrer"`)
    - Include script references to `main.js` and `nav.js`
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8, 3.9_

  - [ ]* 5.2 Write property test for project card rendering (Property 1)
    - **Property 1: Project card rendering completeness**
    - Generate random project objects with non-empty title, description, and valid category
    - Assert rendered HTML contains title text, description text, and category identifier
    - **Validates: Requirements 3.3**

  - [ ]* 5.3 Write property test for external link conditional rendering (Property 2)
    - **Property 2: External link conditional rendering**
    - Generate project objects with random enlaceExterno (null or valid URL)
    - Assert: if non-null link, rendered HTML includes anchor with `target="_blank"` and correct href; if null, no anchor element
    - **Validates: Requirements 3.8**

- [x] 6. Implement Página de Servicios (servicios.html)
  - [x] 6.1 Create servicios page HTML structure
    - Create `src/pages/servicios.html` with full HTML5 structure, meta tags, and stylesheet references
    - Include `#nav-placeholder` and `#footer-placeholder` divs
    - Implement introductory section about 2D animation and comics for storytelling
    - Implement "Creación y Narración Gráfica" category showing: Story Board, Cómic, Ilustración Editorial, Concept Art (each with name and description ≤ 150 chars)
    - Implement "Animación" category showing: Educativos, Publicitarios, Institucionales, Entretenimiento (each with name and description ≤ 150 chars)
    - Implement contact section with email address and social media links
    - Ensure contact links direct to email client or social media profiles
    - Include script references to `main.js` and `nav.js`
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_

  - [ ]* 6.2 Write property test for service description constraint (Property 3)
    - **Property 3: Service description constraint and rendering**
    - Generate service objects with random name and description (≤ 150 characters)
    - Assert rendered HTML contains service name and description text
    - Assert description length constraint is respected
    - **Validates: Requirements 4.2, 4.3**

- [x] 7. Checkpoint - Verify structure and page rendering
  - Ensure all tests pass, ask the user if questions arise.

- [x] 8. Create placeholder SVG icons for social media
  - [x] 8.1 Create SVG icon files
    - Create `src/assets/icons/instagram.svg` with a simple Instagram icon placeholder
    - Create `src/assets/icons/youtube.svg` with a simple YouTube icon placeholder
    - Create `src/assets/icons/facebook.svg` with a simple Facebook icon placeholder
    - _Requirements: 6.2_

- [x] 9. Install dependencies and wire everything together
  - [x] 9.1 Install project dependencies and verify build
    - Run `npm install` to install vitest, fast-check, and jsdom
    - Create `vitest.config.js` configuring jsdom environment
    - Verify the project structure matches all requirements by running tests
    - _Requirements: 1.1_

- [x] 10. Final checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties from the design document
- Unit tests validate specific examples and edge cases
- The site uses vanilla HTML/CSS/JS — no build step required beyond testing
- Components are loaded via JavaScript `fetch()` to avoid HTML duplication

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1"] },
    { "id": 1, "tasks": ["1.2", "8.1"] },
    { "id": 2, "tasks": ["2.1", "2.2", "3.1"] },
    { "id": 3, "tasks": ["2.3"] },
    { "id": 4, "tasks": ["2.4", "4.1", "5.1", "6.1"] },
    { "id": 5, "tasks": ["5.2", "5.3", "6.2"] },
    { "id": 6, "tasks": ["9.1"] }
  ]
}
```
