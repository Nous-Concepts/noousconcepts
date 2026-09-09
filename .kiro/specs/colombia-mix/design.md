# Design Document

## Introduction

Este documento establece las decisiones técnicas y arquitectónicas para implementar la pantalla "Colombia Mix" del sitio web Nous Concepts. La pantalla sigue el patrón ya establecido en `panico-disforico.html`, reutilizando componentes, hojas de estilos y tokens de diseño existentes. Donde este documento diverge del patrón de referencia, la desviación se justifica explícitamente.

### Principios de diseño

1. **Paridad con panico-disforico**: La implementación debe ser un espejo estructural de `panico-disforico.html`/`panico-disforico.css`. Cualquier desviación es una decisión deliberada documentada aquí.
2. **Reutilización de componentes**: Header (`header.html`), Nav (`nav.html`) y Footer (`footer.html`) se cargan dinámicamente mediante `main.js` sin modificaciones.
3. **Tokens primero, hardcoded cuando sea necesario**: Los tokens de `variables.css` se usan para tipografía y espaciado. Los colores del tema light se definen como valores literales en `colombia-mix.css`, igual que en `panico-disforico.css`, porque `variables.css` define el tema oscuro por defecto.
4. **Mobile-first**: Todos los estilos se escriben primero para móvil, con un único media query `@media (min-width: 769px)`.
5. **Accesibilidad desde el diseño**: Atributos ARIA, contraste y navegación por teclado son requisitos de implementación, no optimizaciones posteriores.

## High-Level Architecture

### Estructura de archivos

```
noousconcepts/
├── src/
│   ├── pages/
│   │   └── colombia-mix.html          [NUEVO]
│   ├── styles/
│   │   └── colombia-mix.css           [NUEVO]
│   ├── components/
│   │   ├── header.html                [EXISTENTE — sin cambios]
│   │   ├── nav.html                   [EXISTENTE — sin cambios]
│   │   └── footer.html                [EXISTENTE — sin cambios]
│   ├── js/
│   │   └── main.js                    [EXISTENTE — sin cambios]
│   └── assets/
│       └── images/
│           └── contenidos/
│               └── colombia-mix/
│                   └── hero.webp      [NUEVO]
```

### Flujo de renderizado

```
1. Browser carga colombia-mix.html
2. <html> tiene data-theme="light" — sin FOUC
3. CSS se carga en orden: variables.css → main.css → components.css → colombia-mix.css
4. colombia-mix.css aplica body { background-color: #f5f5f5 } como fallback
5. DOM muestra estructura con placeholders para header/nav/footer
6. main.js (módulo) se ejecuta tras DOMContentLoaded
7. loadComponent carga header.html → nav.html → footer.html en sus placeholders
8. initHeader(), initNavigation(), initScrollMoreButtons(), initFeaturedCards() se inicializan
9. Página totalmente interactiva
```

## Component Design

### 1. Página HTML: colombia-mix.html

**Responsabilidad**: Estructura semántica, carga de hojas de estilo y script principal.

#### Estructura del documento

```html
<!DOCTYPE html>
<html lang="es" data-theme="light">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Colombia Mix — NOUS CONCEPTS</title>
  <link rel="stylesheet" href="../styles/variables.css" />
  <link rel="stylesheet" href="../styles/main.css" />
  <link rel="stylesheet" href="../styles/components.css" />
  <link rel="stylesheet" href="../styles/colombia-mix.css" />
</head>
<body>
  <a href="#main-content" class="visually-hidden">Saltar al contenido principal</a>

  <div id="header-placeholder"></div>
  <div id="nav-placeholder"></div>

  <main id="main-content" class="colombia-mix" aria-label="Colombia Mix — Antología Musical">
    <div class="colombia-mix__content">
      <span class="colombia-mix__label">ANTOLOGÍA MUSICAL</span>

      <h1 class="colombia-mix__title">Colombia Mix</h1>

      <p class="colombia-mix__description">Una comedia social, centrada en una familia disfuncional del caribe Colombiano, que vive todo tipo de historias hilarantes mientras retrata entre risas la terrible realidad contemporanea.</p>

      <div class="colombia-mix__hero-wrapper">
        <img
          class="colombia-mix__hero"
          src="../assets/images/contenidos/colombia-mix/hero.webp"
          alt="Ilustración cómic en blanco y negro con lettering Colombia Mix, estilo historieta del Caribe colombiano"
        />
      </div>

      <a class="colombia-mix__cta" href="contenidos.html#colombia-mix" aria-label="Ver más contenido de Colombia Mix">Más Contenido →</a>
    </div>
  </main>

  <nav class="tab-bar" aria-label="Navegación de secciones">
    <a href="home.html" class="tab-bar__item" aria-label="Ir a Inicio">
      <svg class="tab-bar__icon" aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
        <polyline points="9 22 9 12 15 12 15 22"></polyline>
      </svg>
      <span class="tab-bar__label">Inicio</span>
    </a>
    <a href="contenidos.html" class="tab-bar__item tab-bar__item--active" aria-label="Ir a Contenidos (activo)">
      <svg class="tab-bar__icon" aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none"></circle>
        <polygon points="10 8 16 12 10 16"></polygon>
      </svg>
      <span class="tab-bar__label">Contenido</span>
    </a>
    <a href="presentacion.html" class="tab-bar__item" aria-label="Ir a Nosotros">
      <svg class="tab-bar__icon" aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="12"></line>
        <line x1="12" y1="16" x2="12.01" y2="16"></line>
      </svg>
      <span class="tab-bar__label">Nosotros</span>
    </a>
  </nav>

  <div id="footer-placeholder"></div>

  <script type="module" src="../js/main.js"></script>
</body>
</html>
```

**Decisiones clave**:
- `data-theme="light"` en `<html>` evita FOUC; el atributo es inmediato, no depende de JS.
- `background-color: #f5f5f5` va en `colombia-mix.css` (regla `body {}`), no como `style` inline en el HTML — igual que `panico-disforico.css`. El inline está eliminado del HTML.
- Sin `loading="lazy"` en la imagen hero: `panico-disforico.html` tampoco lo usa y la imagen está en el viewport inicial. Añadirlo retrasaría el LCP.
- `#footer-placeholder` presente para mantener paridad con `panico-disforico.html` y que `main.js` pueda inyectar el footer (`loadComponent('#footer-placeholder', '../components/footer.html')`).
- SVG icons copiados directamente de `panico-disforico.html` para garantizar coherencia visual pixel-perfect.
- `aria-label` en el `<a>` CTA proporciona contexto adicional al texto visible "Más Contenido →".

### 2. Hoja de estilos: colombia-mix.css

**Responsabilidad**: Estilos específicos de layout, tipografía y componentes de la pantalla Colombia Mix. Replica la estructura y los valores de `panico-disforico.css` con los cambios necesarios para el nuevo contenido.

#### Nomenclatura BEM

- **Bloque**: `.colombia-mix`
- **Elementos**: `__content`, `__label`, `__title`, `__description`, `__hero-wrapper`, `__hero`, `__cta`
- **Modificadores**: ninguno en esta fase

#### Estructura del archivo CSS

```css
/* ==========================================================================
   Colombia Mix — Page Styles
   Mobile-first. Uses design tokens from variables.css.
   Light theme variant for content page.
   ========================================================================== */

/* Background fallback in case variables.css fails to load.
   This is the ONLY literal color permitted outside the light theme hardcodes.
   Light theme background: #f5f5f5 */
body {
  background-color: #f5f5f5;
}

/* --------------------------------------------------------------------------
   Base styles (mobile-first, ≤768px)
   -------------------------------------------------------------------------- */

.colombia-mix {
  padding-top: 96px;           /* --nav-height(64px) + --spacing-md(32px) */
  padding-inline: var(--spacing-sm);
  padding-bottom: 72px;        /* espacio sobre tab-bar */
}

.colombia-mix__content {
  max-width: 720px;
  margin-inline: auto;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.colombia-mix__label {
  color: #6b7280;
  font-size: 0.75rem;          /* --font-size-sm no definido en variables.css */
  letter-spacing: 0.1em;
}

.colombia-mix__title {
  font-family: var(--font-heading);
  font-size: var(--font-size-xl);
  color: #1f2937;
  margin: 0;
}

.colombia-mix__description {
  color: #6b7280;
  line-height: 1.6;
  font-size: var(--font-size-base);
  margin: 0;
}

/* Hero wrapper: sin aspect-ratio fijo — igual que panico-disforico__hero-wrapper.
   El aspect-ratio real de la imagen se preserva mediante height: auto en el <img>. */
.colombia-mix__hero-wrapper {
  width: 100%;
}

.colombia-mix__hero {
  width: 100%;
  height: auto;
  border-radius: 8px;
  display: block;
}

.colombia-mix__cta {
  background-color: #1e3a5f;
  color: #ffffff;
  border-radius: 24px;
  padding: var(--spacing-xs) var(--spacing-md);
  text-decoration: none;
  display: inline-block;
  text-align: center;
  align-self: center;
}

.colombia-mix__cta:focus-visible {
  outline: 2px solid var(--color-accent);   /* #e94560 definido en variables.css */
  outline-offset: 2px;
}

/* --------------------------------------------------------------------------
   Tab Bar — copiado de panico-disforico.css (componente compartido)
   -------------------------------------------------------------------------- */

.tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #ffffff;
  border-top: 1px solid #e5e7eb;
  height: 56px;
  z-index: 100;
}

.tab-bar__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  color: #9ca3af;
  text-decoration: none;
  font-size: 0.7rem;
}

.tab-bar__icon {
  width: 24px;
  height: 24px;
  stroke-width: 1.5;
}

.tab-bar__item--active {
  color: #1e3a5f;
}

.tab-bar__item--active .tab-bar__icon {
  stroke: #1e3a5f;
  fill: #1e3a5f;
}

.tab-bar__item--active::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  right: 0;
  height: 2px;
  background-color: #1e3a5f;
}

.tab-bar__item {
  position: relative;
}

.tab-bar__item:focus-visible {
  outline: 2px solid #1e3a5f;
  outline-offset: 2px;
}

/* --------------------------------------------------------------------------
   Responsive styles (>768px) — single breakpoint, mobile-first min-width
   -------------------------------------------------------------------------- */

@media (min-width: 769px) {
  .colombia-mix {
    padding-inline: var(--spacing-md);
    padding-bottom: var(--spacing-md);
  }

  .colombia-mix__title {
    font-size: var(--font-size-hero);
  }

  .tab-bar {
    display: none;
  }
}
```

**Decisiones clave**:
- `font-size: 0.75rem` literal en `.colombia-mix__label` porque `--font-size-sm` no está definido en `variables.css`. Se documenta con comentario.
- Hero wrapper sin `aspect-ratio`: se eligió paridad sobre la mejora de CLS. Si en el futuro se decide adoptar `aspect-ratio`, debe aplicarse también a `panico-disforico__hero-wrapper` para consistencia.
- Tab Bar duplicada de `panico-disforico.css`: el selector `.tab-bar` es compartido por ambas páginas. Si `components.css` ya lo define, estas reglas deben eliminarse de `colombia-mix.css` para evitar duplicación. **Verificar el contenido de `components.css` durante la Task 2.2.**
- `:focus-visible` usa `var(--color-accent)` (`#e94560`), token existente en `variables.css`.
- Un único breakpoint `769px` — idéntico a `panico-disforico.css`.
- `padding-top: 96px` como valor literal (no `calc()`) para paridad con `panico-disforico.css`.

### 3. Componentes reutilizados sin modificaciones

#### main.js — contrato real

`main.js` ya exporta `loadComponent` e `initPage` y ejecuta la siguiente secuencia:

```javascript
async function initPage() {
  await loadComponent('#header-placeholder', '../components/header.html');
  await loadComponent('#nav-placeholder',   '../components/nav.html');
  await loadComponent('#footer-placeholder', '../components/footer.html');

  initHeader();
  initNavigation();
  initScrollMoreButtons();
  initFeaturedCards({ apiUrl: BLOG_API_URL });
}
document.addEventListener('DOMContentLoaded', initPage);
export { loadComponent, initPage, BLOG_API_URL };
```

`colombia-mix.html` no necesita lógica JS propia. `initFeaturedCards` busca su contenedor en el DOM; si no lo encuentra, falla silenciosamente sin romper la página.

#### Header, Nav, Footer

No requieren modificaciones. Se cargan dinámicamente y funcionan igual en todas las páginas.

## Data Flow & State Management

### Estado de navegación (menú abierto/cerrado)

```
Click en botón hamburguesa
  → Header: toggle aria-expanded ("false" ↔ "true")
  → Header: toggle aria-label ("Abrir menú" ↔ "Cerrar menú")
  → Header: dispatch CustomEvent('menu-toggle', { detail: { state: "open"|"close" } })
    → Nav: escucha 'menu-toggle'
      → state "open"  → transform: translateX(0)
      → state "close" → transform: translateX(-100%)
```

El estado vive en atributos ARIA del DOM, no en variables JS. La comunicación Header↔Nav es mediante CustomEvent para desacoplamiento de componentes.

### Carga de imagen hero

Sin `loading="lazy"`. La imagen hero está en el viewport inicial en móvil; lazy loading retrasaría el LCP. El espacio no se reserva con `aspect-ratio` (paridad con `panico-disforico`), por lo que puede haber un pequeño CLS al cargar. Si el CLS medido en Lighthouse supera 0.1, añadir `aspect-ratio` al wrapper es la corrección directa.

## Cross-Cutting Concerns

### Accesibilidad

#### Orden de tabulación (Tab)

```
1. Enlace "Saltar al contenido principal"   (.visually-hidden)
2. Logo "NOUS·"                              (header dinámico)
3. Botón hamburguesa                         (header dinámico, ≤1024px)
4. Botón CTA "Más Contenido →"              (main)
5. Ítems de Tab Bar                          (≤768px): Inicio, Contenido, Nosotros
```

#### Atributos ARIA

| Elemento | Atributo | Valor |
|---|---|---|
| `<html>` | `lang` | `"es"` |
| `<main>` | `aria-label` | `"Colombia Mix — Antología Musical"` |
| Botón hamburguesa | `aria-expanded` | `"true"` / `"false"` |
| Botón hamburguesa | `aria-controls` | id del nav |
| Botón hamburguesa | `aria-label` | `"Abrir menú"` / `"Cerrar menú"` |
| `<a>` CTA | `aria-label` | `"Ver más contenido de Colombia Mix"` |
| Tab Bar `<nav>` | `aria-label` | `"Navegación de secciones"` |
| Tab Bar ítem activo | `aria-label` | `"Ir a Contenidos (activo)"` |
| Imagen hero | `alt` | descripción 10-125 chars |
| SVG icons | `aria-hidden` | `"true"` |

#### Contraste de color (verificado manualmente)

| Texto | Color texto | Color fondo | Ratio | WCAG AA |
|---|---|---|---|---|
| Título, descripción | `#1f2937` / `#6b7280` | `#f5f5f5` | 12:1 / 4.6:1 | ✓ |
| Botón CTA | `#ffffff` | `#1e3a5f` | 9:1 | ✓ |
| Tab Bar activo | `#1e3a5f` | `#ffffff` | 9:1 | ✓ |
| Tab Bar inactivo | `#9ca3af` | `#ffffff` | 2.8:1 | ✗ texto UI pequeño* |

> *`#9ca3af` sobre `#ffffff` no alcanza 4.5:1. Para texto de 0.7rem (< 18px normal / < 14px bold) aplica el umbral 4.5:1 de WCAG AA. **Acción requerida**: evaluar subir contraste a `#6b7280` (#4.6:1) en Task 4.1. `panico-disforico.css` tiene el mismo valor; corregir en ambas hojas simultáneamente.

### Responsividad

| Viewport | Tab Bar | Botón hamburguesa | Títulos | padding-inline |
|---|---|---|---|---|
| ≤768px | `flex` | visible | `--font-size-xl` (2rem) | `--spacing-sm` (1rem) |
| ≥769px | `none` | oculto | `--font-size-hero` (3.5rem) | `--spacing-md` (2rem) |

Un único breakpoint `769px` — idéntico a `panico-disforico.css`.

### Performance

| Optimización | Implementación |
|---|---|
| Sin lazy loading en hero | Imagen en viewport inicial; carga inmediata mejora LCP |
| CSS modular | `colombia-mix.css` solo se carga en esta página |
| SVG inline | Sin requests adicionales para iconos de Tab Bar |
| `display: block` en `<img>` | Elimina espacio baseline |

**Métricas objetivo** (Lighthouse, throttling móvil):
- LCP: < 2.5s
- CLS: < 0.1 (riesgo moderado sin `aspect-ratio`; medir en Task 4.3)
- TBT: < 200ms

### Testing Strategy

| Nivel | Herramienta | Cobertura |
|---|---|---|
| Unit | Vitest + happy-dom | `loadComponent`: inserción, placeholder inexistente, error de fetch |
| Integration | Vitest + happy-dom | toggle aria-expanded, dispatch menu-toggle, transform Nav |
| Property-based | Vitest + fast-check | CP-1 a CP-5 (ver Requirements) |
| Accessibility | axe-core | violaciones WCAG 2.1 AA automáticas |
| Manual | Teclado + NVDA/VoiceOver | orden de foco, anuncios de lector |
| Visual regression | Playwright + Percy (futuro) | 320px, 768px, 1024px, 1920px |

`loadComponent` e `initPage` están exportadas desde `main.js` — importables directamente en tests sin refactor.

## Security Considerations

| Riesgo | Nivel | Mitigación |
|---|---|---|
| XSS via `innerHTML` en `loadComponent` | Bajo | HTML estático confiable (no user-generated) |
| CORS | Bajo | Todos los recursos desde el mismo origen |
| Clickjacking | Bajo | No hay contenido sensible embebible |

CSP futuro: `default-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline'`

## Resolved Design Questions

Las siguientes preguntas estaban abiertas en el borrador original y quedan resueltas aquí:

1. **¿`--color-accent` existe en `variables.css`?** → Sí: `--color-accent: #e94560`. Se usa en `:focus-visible` del CTA.

2. **¿`aspect-ratio` en hero-wrapper?** → No, por paridad con `panico-disforico__hero-wrapper` que solo tiene `width: 100%`. Si el CLS medido supera 0.1, se añade en Task 4.3 como corrección. La decisión queda explícita aquí para que no se añada por inercia.

3. **¿`loading="lazy"` en imagen hero?** → No. La imagen está en el viewport inicial en móvil; lazy loading penaliza LCP. `panico-disforico.html` tampoco lo usa.

4. **¿Placeholder durante carga de imagen?** → No en esta fase. El fondo de la página (`#f5f5f5`) actúa como fallback visual suficiente. Un skeleton animado es trabajo futuro.

5. **¿`--font-size-sm` existe en `variables.css`?** → No. Se usa `0.75rem` literal en `.colombia-mix__label` con comentario explicativo.

6. **¿Tab Bar en `components.css` o en `colombia-mix.css`?** → Verificar durante Task 2.2. Si `components.css` ya define `.tab-bar`, eliminar las reglas duplicadas de `colombia-mix.css`. Si no, mantenerlas (igual que en `panico-disforico.css`).

7. **¿Footer en la página?** → Sí. `panico-disforico.html` incluye `<div id="footer-placeholder"></div>` y `main.js` lo carga. `colombia-mix.html` debe incluirlo también.

## Future Work

1. **Contraste Tab Bar inactivo**: subir `#9ca3af` a `#6b7280` en ambas hojas de estilos de contenido si la auditoría confirma violación WCAG.
2. **`aspect-ratio` en hero-wrapper**: añadir si CLS ≥ 0.1 medido en Lighthouse.
3. **Open Graph tags**: `og:title`, `og:image`, `og:description` para compartir en redes sociales.
4. **Preload crítico**: `<link rel="preload" as="image">` para `hero.webp` si LCP no cumple < 2.5s.
5. **Animación fade-in**: opacidad al cargar la imagen hero.
6. **Dark mode toggle**: switch persistido en `localStorage`, compartido con todas las páginas.
7. **Service Worker**: caché de assets para navegación offline (PWA).

## Conclusion

La implementación consiste en crear `colombia-mix.html` y `colombia-mix.css` siguiendo la estructura de `panico-disforico.html`/`panico-disforico.css` casi literalmente, añadir la imagen `hero.webp` y verificar que los componentes dinámicos funcionan. Las desviaciones respecto al patrón de referencia son ninguna en el HTML y ninguna en el CSS base — solo difieren los nombres de clases BEM y el contenido. Las preguntas de diseño que estaban abiertas quedan todas resueltas en la sección "Resolved Design Questions".
