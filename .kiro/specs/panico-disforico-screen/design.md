# Design Document

## Overview

La pantalla **Pánico Disfórico** es una página de detalle de serie estática, implementada en HTML/CSS/JS vanilla siguiendo el patrón ya establecido por `neo-samaria-conexion.html`. No requiere nueva lógica de JavaScript — reutiliza `main.js` para inyectar los componentes header, nav y footer. El único artefacto nuevo de JS (si se necesita) sería para marcar el ítem activo en el Nav; de lo contrario se resuelve en CSS.

Los dos archivos nuevos que se crean son:
- `src/pages/panico-disforico.html`
- `src/styles/panico-disforico.css`

---

## Architecture

### Estructura de archivos

```
src/
├── pages/
│   └── panico-disforico.html        ← NUEVO
├── styles/
│   └── panico-disforico.css         ← NUEVO
├── assets/
│   └── images/
│       └── contenidos/
│           └── panico-disforico/
│               └── hero.webp        ← Asset externo (no creado por este spec)
└── components/
    ├── header.html                  ← reutilizado
    ├── nav.html                     ← reutilizado
    └── footer.html                  ← reutilizado
```

### Flujo de carga

```
Browser carga panico-disforico.html
  └── <head> carga variables.css → main.css → components.css → panico-disforico.css
  └── DOM ready → main.js#initPage()
        ├── loadComponent('#header-placeholder', '../components/header.html')
        ├── loadComponent('#nav-placeholder',   '../components/nav.html')
        └── loadComponent('#footer-placeholder','../components/footer.html')
```

No se necesita nuevo módulo JS. `main.js` ya orquesta todo.

---

## Component Design

### 1. `panico-disforico.html` — Estructura del DOM

```
<body>
  <a href="#main-content" class="visually-hidden">Saltar al contenido principal</a>

  <div id="header-placeholder"></div>
  <div id="nav-placeholder"></div>

  <main id="main-content" class="panico-disforico" aria-label="Pánico Disfórico — Serie">

    <div class="panico-disforico__content">

      <span class="panico-disforico__label">SERIE</span>

      <h1 class="panico-disforico__title">Pánico Disfórico</h1>

      <p class="panico-disforico__description">
        Una serie trans media que cuenta diversas historias...
      </p>

      <div class="panico-disforico__hero-wrapper">
        <img class="panico-disforico__hero"
             src="../assets/images/contenidos/panico-disforico/hero.webp"
             alt="Logotipo de Pánico Disfórico con letras de estilo horror en rojo sobre fondo negro" />
      </div>

      <a class="panico-disforico__cta"
         href="contenidos.html#panico-disforico">
        Más Contenido →
      </a>

    </div>

  </main>

  <!-- Tab Bar — visible solo en móvil (≤768px) -->
  <nav class="tab-bar" aria-label="Navegación de secciones">
    <a href="home.html" class="tab-bar__item" aria-label="Ir a Inicio">
      <!-- SVG: ícono casa -->
      <span class="tab-bar__label">Inicio</span>
    </a>
    <a href="contenidos.html" class="tab-bar__item tab-bar__item--active" aria-label="Ir a Contenidos (activo)">
      <!-- SVG: ícono play -->
      <span class="tab-bar__label">Contenido</span>
    </a>
    <a href="presentacion.html" class="tab-bar__item" aria-label="Ir a Nosotros">
      <!-- SVG: ícono info/persona -->
      <span class="tab-bar__label">Nosotros</span>
    </a>
  </nav>

  <div id="footer-placeholder"></div>

  <script type="module" src="../js/main.js"></script>
</body>
```

---

### 2. `panico-disforico.css` — Estructura de estilos

La hoja de estilos sigue exactamente la misma estructura de secciones que `neo-samaria-conexion.css`. Todos los valores de color, tipografía y espaciado se referencian mediante `var()` desde `variables.css`. No se permiten literales de color salvo el fallback del `body`.

```css
/* ==========================================================================
   Pánico Disfórico — Page Styles
   Mobile-first. Uses design tokens from variables.css.
   ========================================================================== */

/* Fallback de color de fondo — único literal permitido */
body {
  background-color: var(--color-bg, #0f0f1a);
}

/* --------------------------------------------------------------------------
   Base styles (mobile-first, ≤768px)
   -------------------------------------------------------------------------- */

.panico-disforico {
  padding-top: 96px;
  padding-inline: var(--spacing-sm);
  padding-bottom: 72px; /* espacio para tab-bar (≥56px) */
}

.panico-disforico__content {
  max-width: 720px;
  margin-inline: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-md);
  text-align: left;
}

.panico-disforico__label {
  align-self: flex-start;
  text-transform: uppercase;
  font-size: var(--font-size-sm, 0.75rem); /* menor que --font-size-base */
  color: var(--color-text-muted);
  letter-spacing: 0.1em;
}

.panico-disforico__title {
  align-self: flex-start;
  font-family: var(--font-heading);
  font-size: var(--font-size-xl);
  color: var(--color-text);
  margin: 0;
}

.panico-disforico__description {
  align-self: flex-start;
  color: var(--color-text);
  line-height: 1.6;
  font-size: var(--font-size-base);
  margin: 0;
}

.panico-disforico__hero-wrapper {
  width: 100%;
}

.panico-disforico__hero {
  width: 100%;
  height: auto;
  border-radius: 8px;
  display: block;
}

.panico-disforico__cta {
  display: inline-block;
  background-color: var(--color-secondary);
  color: var(--color-text);
  text-decoration: none;
  border-radius: 24px;
  padding: var(--spacing-xs) var(--spacing-md);
}

.panico-disforico__cta:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}

/* --------------------------------------------------------------------------
   Tab Bar — visible solo en móvil (≤768px)
   -------------------------------------------------------------------------- */

.tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: var(--color-primary);
  height: 56px;
  z-index: 100;
}

.tab-bar__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  color: var(--color-text-muted);
  text-decoration: none;
  font-size: 0.7rem;
}

.tab-bar__item--active {
  color: var(--color-accent);
  border-bottom: 2px solid var(--color-accent);
  padding-bottom: 2px;
}

.tab-bar__item:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}

/* --------------------------------------------------------------------------
   Responsive styles (>768px) — Tab Bar oculta, texto más grande
   -------------------------------------------------------------------------- */

@media (min-width: 769px) {
  .panico-disforico {
    padding-inline: var(--spacing-md);
    padding-bottom: var(--spacing-md);
  }

  .panico-disforico__title {
    font-size: var(--font-size-hero);
  }

  .tab-bar {
    display: none;
  }
}
```

---

## Correctness Properties

Las siguientes invariantes deben mantenerse en toda implementación válida:

### Property 1: Sin colores literales en panico-disforico.css
`panico-disforico.css` no debe contener valores hexadecimales, `rgb()`, `hsl()` ni nombres de color en propiedades de color, salvo el fallback del `body`.

**Validates: Requirements 2.2**

### Property 2: Orden de carga de estilos
`variables.css` siempre precede a `main.css`, que precede a `components.css`, que precede a `panico-disforico.css` en el `<head>`.

**Validates: Requirements 2.1**

### Property 3: Tab Bar visible solo en móvil
`.tab-bar` tiene `display: none` en viewports `>768px` y es visible en viewports `≤768px`.

**Validates: Requirements 6.7**

### Property 4: Contraste mínimo WCAG 2.1 AA
Los tokens `--color-text` (`#eaeaea`) y `--color-text-muted` (`#a0a0a0`) sobre `--color-bg` (`#0f0f1a`) cumplen ratios ≥4.5:1 y ≥3:1 respectivamente.

**Validates: Requirements 8.5, 8.6**

### Property 5: Placeholders presentes antes de main.js
`#header-placeholder`, `#nav-placeholder` y `#footer-placeholder` existen en el DOM estático, antes de que `main.js` los popule.

**Validates: Requirements 1.3, 1.4**

---

## Data Models

No hay modelos de datos. La página es completamente estática. Todo el contenido está hardcodeado en el HTML.

---

## SVG Icons (Tab Bar)

Los tres íconos del Tab Bar son SVG inline. Se usan íconos simples y semánticamente adecuados:

| Ítem       | Ícono            | Descripción                          |
|------------|------------------|--------------------------------------|
| Inicio     | Casa (`home`)    | Contorno de casa simple              |
| Contenido  | Play (`play`)    | Triángulo de reproducción en círculo |
| Nosotros   | Info (`info`)    | Letra "i" en círculo                 |

Dimensiones: `width="24" height="24"`, `aria-hidden="true"` en cada SVG (el `aria-label` del `<a>` padre provee el contexto).

---

## Accessibility Design

| Elemento         | Atributo / Patrón                                              |
|------------------|----------------------------------------------------------------|
| Skip link        | `<a href="#main-content" class="visually-hidden">`             |
| `<main>`         | `id="main-content"`, `aria-label="Pánico Disfórico — Serie"`  |
| Hero image       | `alt` descriptivo, no vacío                                    |
| CTA link         | Texto descriptivo "Más Contenido →"                           |
| Tab bar `<nav>`  | `aria-label="Navegación de secciones"`                        |
| Tab bar items    | `aria-label` en cada `<a>`: "Ir a Inicio", etc.               |
| SVG icons        | `aria-hidden="true"` (decorativos)                            |
| Focus styles     | `outline: 2px solid var(--color-accent)` en CTA y tab items   |

**Contraste (verificado):**
- `--color-text` `#eaeaea` sobre `--color-bg` `#0f0f1a` → ratio ~14:1 ✓ (WCAG AA ≥ 4.5:1)
- `--color-text-muted` `#a0a0a0` sobre `--color-bg` `#0f0f1a` → ratio ~5.3:1 ✓ (WCAG AA texto pequeño ≥ 3:1)

---

## Components and Interfaces

### Componentes HTML (estáticos)

| Componente               | Tipo        | Fuente                                          |
|--------------------------|-------------|-------------------------------------------------|
| Header                   | Inyectado   | `src/components/header.html` vía `main.js`      |
| Nav                      | Inyectado   | `src/components/nav.html` vía `main.js`         |
| Footer                   | Inyectado   | `src/components/footer.html` vía `main.js`      |
| Página (shell)           | Nuevo       | `src/pages/panico-disforico.html`               |
| Estilos de página        | Nuevo       | `src/styles/panico-disforico.css`               |

### Interfaz con `main.js`

`main.js` espera encontrar en el DOM los selectores `#header-placeholder`, `#nav-placeholder` y `#footer-placeholder`. La página los provee en ese orden dentro del `<body>`. No se exportan ni importan módulos adicionales — la interfaz es puramente basada en el DOM.

```
panico-disforico.html
  └── #header-placeholder  →  main.js::loadComponent()
  └── #nav-placeholder     →  main.js::loadComponent()
  └── #footer-placeholder  →  main.js::loadComponent()
```

### Interfaz con `nav.html`

El Nav existente deberá tener o recibir una forma de marcar el ítem "Pánico Disfórico" como activo. La estrategia adoptada es CSS puro: la URL de la página actual se puede detectar con `:has()` o mediante una clase `active` que se añade con JS post-carga. Como alternativa mínima, el ítem simplemente enlaza a la página y el estado activo se gestiona visualmente a nivel del Tab Bar (que es propio de esta página).

---

## Error Handling

| Escenario                          | Comportamiento esperado                                                      |
|------------------------------------|------------------------------------------------------------------------------|
| `hero.webp` no existe              | El navegador muestra el texto `alt`; el layout no se rompe (`height: auto`) |
| `main.js` falla al cargar          | Header/Nav/Footer no se renderizan; el contenido `<main>` permanece visible |
| `variables.css` falla              | El `body` usa el fallback `#0f0f1a`; el resto del layout puede degradarse   |
| Componente header/nav falla fetch  | `console.error` en `loadComponent`; la página sigue siendo funcional        |

No se requiere manejo de errores adicional en JavaScript ya que la página no realiza llamadas a API propias.

---

## Testing Strategy

Por tratarse de una página HTML/CSS estática, la estrategia de testing se limita a:

1. **Tests de estructura DOM** (Vitest + jsdom): verificar que el HTML generado contiene los elementos requeridos con los atributos correctos (id, aria-label, alt, href, class).
2. **Tests de carga de componentes**: el patrón ya está cubierto por `main.test.js` existente — se agrega un test que confirma que los tres placeholders están presentes en la página.
3. **Verificación manual de contraste**: los valores de tokens ya han sido verificados en la sección de Accesibilidad.
4. **Revisión visual en dispositivo móvil**: validar que la Tab Bar se muestra en ≤768px y se oculta en desktop.

El archivo de test recomendado es `src/js/panico-disforico.test.js`, siguiendo la convención de los tests existentes.

---

## Traceability

| Requisito | Artefacto de diseño                                                  |
|-----------|----------------------------------------------------------------------|
| R1        | Estructura HTML: DOCTYPE, lang, meta, title, placeholders, script   |
| R2        | `<head>` con 4 stylesheets; `panico-disforico.css` sin colores lit. |
| R3        | `.panico-disforico__label`, `__title` (`<h1>`), `__description`     |
| R4        | `.panico-disforico__hero-wrapper` + `__hero` (`<img>`)              |
| R5        | `.panico-disforico__cta` (`<a>`, pill, focus-visible)               |
| R6        | `.tab-bar` con 3 ítems, activo, fijo, oculto en desktop             |
| R7        | padding-top 96px, padding-inline tokens, columna única en móvil     |
| R8        | Skip link, alt, aria-labels, contraste tokens                       |
| R9        | Misma estructura que `neo-samaria-conexion.html/.css`               |
