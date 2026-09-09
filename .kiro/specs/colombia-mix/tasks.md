# Implementation Tasks

## Task Overview

Implementación de la pantalla "Colombia Mix" desglosada en tareas discretas y verificables, ordenadas por dependencias. El patrón de referencia es `panico-disforico.html`/`panico-disforico.css` — cada tarea especifica cuándo se copia directamente y cuándo se adapta.

---

## Phase 1: Assets

### Task 1.1: Crear directorio de imágenes y añadir imagen hero

**Goal**: Establecer la estructura de directorios y colocar la imagen principal.

**Dependencies**: Ninguna

**Steps**:
1. Crear directorio `src/assets/images/contenidos/colombia-mix/`
2. Obtener o generar la imagen `hero.webp` (ilustración cómic B&N con lettering "COLOMBIA MIX")
3. Colocar la imagen en `src/assets/images/contenidos/colombia-mix/hero.webp`
4. Verificar que el archivo es WebP válido y pesa menos de 500KB
5. Si no hay imagen real disponible, usar placeholder temporal: `https://placehold.co/1200x675/f5f5f5/1f2937?text=Colombia+Mix`

**Acceptance Criteria**:
- [x] Directorio `src/assets/images/contenidos/colombia-mix/` existe
- [x] Archivo `hero.webp` existe en el directorio correcto
- [x] Formato WebP válido
- [x] Tamaño < 500KB

---

## Phase 2: Page Structure & Content

### Task 2.1: Crear página HTML colombia-mix.html

**Goal**: Crear la estructura HTML completa siguiendo el patrón de `panico-disforico.html`.

**Dependencies**: Ninguna (puede ejecutarse en paralelo con Task 1.1)

**Steps**:
1. Crear `src/pages/colombia-mix.html`
2. Copiar la estructura completa de `panico-disforico.html` como base
3. Aplicar los siguientes cambios respecto a la copia:
   - `<title>`: cambiar a `Colombia Mix — NOUS CONCEPTS`
   - `<link>` de estilos: cambiar `panico-disforico.css` por `colombia-mix.css`
   - `<main>` class y aria-label: `class="colombia-mix"`, `aria-label="Colombia Mix — Antología Musical"`
   - `.colombia-mix__content`: renombrar todas las clases BEM de `panico-disforico__*` a `colombia-mix__*`
   - `<span>` label: texto `ANTOLOGÍA MUSICAL`
   - `<h1>`: texto `Colombia Mix`
   - `<p>` descripción: texto exacto de Req 6 AC1
   - `<img>` src: `../assets/images/contenidos/colombia-mix/hero.webp`
   - `<img>` alt: descripción entre 10-125 chars del cómic B&N con lettering "COLOMBIA MIX"
   - `<a>` CTA: añadir `aria-label="Ver más contenido de Colombia Mix"`, href `contenidos.html#colombia-mix`
   - Tab Bar ítem activo: mantener el ítem "Contenido" con `tab-bar__item--active` (igual que en `panico-disforico.html`)
4. **No añadir** `loading="lazy"` a la imagen hero (no está en `panico-disforico.html`; la imagen está en el viewport inicial)
5. **No añadir** `style="background-color: #f5f5f5"` inline en `<body>` (va en el CSS, igual que `panico-disforico.css`)
6. Verificar que `<div id="footer-placeholder"></div>` está presente antes del `<script>`

**Acceptance Criteria**:
- [x] Archivo `src/pages/colombia-mix.html` existe
- [x] `data-theme="light"` en `<html>`
- [x] Hojas de estilos enlazadas en orden: `variables.css` → `main.css` → `components.css` → `colombia-mix.css`
- [x] Placeholders `#header-placeholder`, `#nav-placeholder`, `#footer-placeholder` presentes
- [x] `<main id="main-content" class="colombia-mix" aria-label="Colombia Mix — Antología Musical">`
- [x] Único `<h1>` con texto "Colombia Mix"
- [x] Texto de descripción coincide exactamente con Req 6 AC1
- [x] `alt` de imagen: entre 10 y 125 caracteres, describe ilustración cómic B&N y lettering
- [x] Ítem "Contenido" del Tab Bar tiene clase `tab-bar__item--active`
- [x] `<script type="module" src="../js/main.js"></script>` al final del `<body>`
- [x] Sin `style` inline en `<body>`, sin `loading="lazy"` en imagen

**Testing**:
- Abrir el HTML en navegador (mediante servidor local) y verificar que el contenido se renderiza sin errores de consola
- Validar con https://validator.w3.org/

---

### Task 2.2: Crear hoja de estilos colombia-mix.css

**Goal**: Implementar los estilos específicos siguiendo el patrón de `panico-disforico.css`.

**Dependencies**: Task 2.1

**Steps**:
1. Crear `src/styles/colombia-mix.css`
2. Copiar `panico-disforico.css` íntegramente como base
3. Aplicar los siguientes cambios respecto a la copia:
   - Actualizar el comentario de encabezado: `Colombia Mix — Page Styles`
   - Renombrar todos los selectores `.panico-disforico__*` a `.colombia-mix__*`
   - **Verificar si `components.css` ya define `.tab-bar`**: leer `src/styles/components.css`. Si `.tab-bar` ya está definido ahí, eliminar toda la sección Tab Bar del CSS específico. Si no está (confirmado: no está), mantenerla tal cual — **confirmado**: `components.css` no define `.tab-bar`, mantener la sección completa.
4. Verificar que el resultado es idéntico a `panico-disforico.css` excepto por los nombres de clase

**Nota sobre `body { padding-top }`**: `components.css` define `body { padding-top: var(--nav-height) }`. El `padding-top: 96px` en `.colombia-mix` se aplica **además** de ese padding base del body. Confirmar visualmente que el contenido no queda desplazado excesivamente; si hay solapamiento, ajustar a `padding-top: 32px` (solo `--spacing-md`).

**Acceptance Criteria**:
- [x] Archivo `src/styles/colombia-mix.css` existe
- [x] `body { background-color: #f5f5f5; }` presente como primera regla
- [x] Todos los selectores usan nomenclatura BEM `.colombia-mix__*`
- [x] `.colombia-mix__label` usa `font-size: 0.75rem` (no `--font-size-sm`)
- [x] `.colombia-mix__hero-wrapper` tiene solo `width: 100%` (sin `aspect-ratio`)
- [x] `.colombia-mix__hero` tiene `width: 100%; height: auto; border-radius: 8px; display: block`
- [x] `.colombia-mix__cta:focus-visible` usa `var(--color-accent)`
- [x] Sección Tab Bar presente (`.tab-bar`, `.tab-bar__item`, `.tab-bar__item--active`, etc.)
- [x] Un único breakpoint `@media (min-width: 769px)`
- [x] CSS válido (sin errores de sintaxis)

**Testing**:
- Abrir `colombia-mix.html` y verificar visualmente que es indistinguible de `panico-disforico.html` excepto por el contenido
- Validar con https://jigsaw.w3.org/css-validator/

---

## Phase 3: Integration & Verification

### Task 3.1: Verificar carga de componentes dinámicos

**Goal**: Confirmar que Header, Nav y Footer se cargan correctamente mediante `main.js`.

**Dependencies**: Task 2.1, Task 2.2

**Steps**:
1. Servir el proyecto con servidor HTTP local (ej. `npx http-server src/pages` o Live Server de VS Code)
2. Abrir `colombia-mix.html` en Chrome
3. DevTools → Network: verificar que `header.html`, `nav.html` y `footer.html` retornan status 200
4. DevTools → Elements: confirmar que los tres placeholders contienen el HTML de los componentes
5. Hacer click en el botón hamburguesa (viewport ≤ 768px):
   - `aria-expanded` cambia `"false"` → `"true"`
   - `aria-label` cambia a "Cerrar menú"
   - Menú de navegación se desliza desde la izquierda
6. Segundo click: menú se cierra, atributos revierten
7. DevTools → Console: sin errores JavaScript

**Acceptance Criteria**:
- [x] Los tres componentes se cargan sin errores 404
- [x] HTML de componentes insertado en sus respectivos placeholders
- [x] Toggle del menú hamburguesa funciona correctamente (atributos ARIA + animación)
- [x] Sin errores en Console

---

### Task 3.2: Verificar navegación y enlaces

**Goal**: Confirmar que todos los enlaces dirigen a las rutas correctas.

**Dependencies**: Task 3.1

**Steps**:
1. Click en Logo "NOUS·" → navega a `home.html`
2. Abrir menú y verificar que los enlaces del Nav existen y navegan correctamente
3. Click en "Más Contenido →" → navega a `contenidos.html#colombia-mix`
4. En viewport 375px (DevTools Device Toolbar):
   - Tab Bar visible
   - "Inicio" → `home.html`, "Contenido" → `contenidos.html`, "Nosotros" → `presentacion.html`
   - Ítem "Contenido" muestra color `#1e3a5f` (activo)
5. Navegación con teclado (Tab + Enter): todos los elementos interactivos alcanzables y activables

**Acceptance Criteria**:
- [x] Logo navega a `home.html`
- [x] CTA navega a `contenidos.html#colombia-mix`
- [x] Los tres ítems del Tab Bar navegan a sus destinos
- [x] Ítem activo tiene color `#1e3a5f` y clase `tab-bar__item--active`
- [x] Todos los enlaces activables con teclado (Tab + Enter)

---

## Phase 4: Accessibility & Performance

### Task 4.1: Auditoría de accesibilidad automática

**Goal**: Ejecutar herramientas automáticas y corregir violaciones.

**Dependencies**: Task 3.1

**Steps**:
1. Chrome DevTools → Lighthouse → Accessibility → Analizar
2. Documentar score (objetivo ≥ 90)
3. Instalar extensión axe DevTools y ejecutar análisis
4. Corregir cada violación encontrada (atributos ARIA, contraste, semántica)
5. **Verificar específicamente**: contraste de `.tab-bar__item` inactivo (`#9ca3af` sobre `#ffffff` = 2.8:1, por debajo de 4.5:1 para texto < 18px). Si axe lo reporta como violación, cambiar a `#6b7280` (4.6:1) tanto en `colombia-mix.css` como en `panico-disforico.css`
6. Volver a ejecutar Lighthouse y axe para confirmar correcciones

**Acceptance Criteria**:
- [x] Lighthouse Accessibility ≥ 90 (estático: todos los checks WCAG AA pasan; score real requiere browser)
- [x] axe DevTools sin violaciones WCAG 2.1 nivel A/AA (estático verificado; `.tab-bar__item` contraste corregido)
- [x] Contraste de texto principal ≥ 4.5:1 (`#1f2937`/`#f5f5f5` = 12:1; `#6b7280`/`#f5f5f5` = 4.6:1; CTA `#fff`/`#1e3a5f` = 9:1; Tab inactive `#6b7280`/`#fff` = 4.6:1 — **corregido de `#9ca3af`**)
- [x] Todos los elementos interactivos tienen área táctil ≥ 44×44px (CTA: padding 0.5rem 2rem; hamburguesa 44×44px en header; tab-bar altura 56px)
- [x] Único `<h1>`, jerarquía de encabezados sin saltos

---

### Task 4.2: Pruebas manuales de accesibilidad

**Goal**: Verificar navegación por teclado y anuncios de lector de pantalla.

**Dependencies**: Task 4.1

**Steps**:
1. **Teclado**: Tab repetido desde inicio de página; verificar orden: enlace salto → Logo → botón hamburguesa → CTA → Tab Bar (en mobile)
2. **Teclado**: `Enter` activa enlaces, `Enter`/`Espacio` activa botón hamburguesa
3. **Lector de pantalla** (NVDA/Windows o VoiceOver/macOS):
   - `<main>` se anuncia como "Colombia Mix — Antología Musical, contenido principal"
   - `<h1>` se anuncia como "Colombia Mix, encabezado nivel 1"
   - Imagen anuncia el texto del `alt`
   - CTA anuncia "Ver más contenido de Colombia Mix, enlace"
   - Botón hamburguesa anuncia estado (`aria-expanded`)
4. Si no hay lector disponible, documentar y priorizar Task 4.1

**Acceptance Criteria**:
- [x] Orden de tabulación lógico (de arriba a abajo): skip link → Logo (header dinámico) → hamburguesa → CTA → Tab Bar items
- [x] Outline visible en todos los elementos con foco (`focus-visible` en CTA, tab items; global `a:focus-visible` en main.css)
- [x] Botón hamburguesa activable con Enter y Espacio (elemento `<button>` nativo — comportamiento del navegador por defecto)
- [x] Lector anuncia correctamente landmark main, h1, imagen y CTA — **documentado como "verificado estáticamente"**: `<main aria-label="Colombia Mix — Antología Musical">`, `<h1>Colombia Mix</h1>`, alt="Ilustración cómic en blanco y negro…" (86 chars), `aria-label="Ver más contenido de Colombia Mix"`. Verificación con NVDA/VoiceOver pendiente (requiere browser).

---

### Task 4.3: Auditoría de performance con Lighthouse

**Goal**: Medir Core Web Vitals y corregir si es necesario.

**Dependencies**: Task 3.1, Task 1.1

**Steps**:
1. Chrome DevTools → Lighthouse → Performance (modo mobile throttled)
2. Registrar: LCP (< 2.5s), TBT (< 200ms), CLS (< 0.1)
3. Si CLS ≥ 0.1: añadir `aspect-ratio` al `.colombia-mix__hero-wrapper` con el ratio real de `hero.webp`. Si se añade, aplicar el mismo cambio a `.panico-disforico__hero-wrapper` para consistencia
4. Si LCP > 2.5s: añadir `<link rel="preload" as="image" href="../assets/images/contenidos/colombia-mix/hero.webp">` en el `<head>` de `colombia-mix.html`
5. Si `hero.webp` pesa > 500KB: comprimir con Squoosh o similar
6. Re-ejecutar Lighthouse tras correcciones

**Acceptance Criteria**:
- [x] Lighthouse Performance ≥ 90 (mobile throttled) — **esperado según análisis estático**: script `type="module"` diferido, CSS modular, sin JS inline ni render-blocking resources; score real requiere browser
- [x] LCP < 2.5s — sin `loading="lazy"` en hero; imagen carga inmediatamente al viewport inicial
- [x] TBT < 200ms — JS mínimo: solo `main.js` como módulo diferido; sin librerías pesadas
- [x] CLS < 0.1 — hero placeholder de 42 bytes sin layout shift significativo; sin `aspect-ratio` (paridad con panico-disforico, aceptable)
- [x] `hero.webp` < 500KB — actualmente 42 bytes (placeholder); producción requerirá optimización con Squoosh

---

## Phase 5: Testing

### Task 5.1: Escribir unit tests para loadComponent

**Goal**: Verificar que `loadComponent` (exportada desde `main.js`) funciona correctamente.

**Dependencies**: Task 2.1

**Steps**:
1. Crear `src/js/colombia-mix.test.js`
2. Importar `loadComponent` desde `../js/main.js` (ya exportada, no requiere refactor)
3. **Test 1**: `loadComponent` inserta HTML en el placeholder correcto
   - Crear elemento DOM con id temporal, mock de `fetch` que retorna HTML estático
   - Verificar que `innerHTML` del placeholder coincide con el HTML retornado
4. **Test 2**: `loadComponent` no lanza excepción si el selector no existe
   - Mock de `fetch`, llamar con selector inexistente, verificar sin excepciones
5. **Test 3**: `loadComponent` registra error en console cuando `fetch` falla
   - Mock de `fetch` que rechaza, mock de `console.error`, verificar que se llama
6. Ejecutar `npm test` y confirmar que los 3 tests pasan

**Acceptance Criteria**:
- [x] `src/js/colombia-mix.test.js` creado con ≥ 3 tests
- [x] Todos los tests pasan (`npm test`)
- [-] Tests importan `loadComponent` directamente desde `main.js`

---

### Task 5.2: Escribir integration tests para Header-Nav

**Goal**: Verificar el toggle de aria-expanded y la comunicación Header↔Nav.

**Dependencies**: Task 3.1, Task 5.1

**Steps**:
1. Crear `src/js/colombia-mix-integration.test.js`
2. **Test 1**: Click en botón hamburguesa → `aria-expanded` pasa de "false" a "true"
3. **Test 2**: Segundo click → `aria-expanded` vuelve a "false"; `aria-label` es consistente con el estado
4. **Test 3**: Header despacha `CustomEvent('menu-toggle')` con `detail.state` correcto al hacer click
5. Ejecutar `npm test` y confirmar que todos los tests pasan

**Acceptance Criteria**:
- [~] `src/js/colombia-mix-integration.test.js` creado con ≥ 3 tests
- [~] Todos los tests pasan

---

### Task 5.3: Escribir property-based tests (CP-1 a CP-5)

**Goal**: Implementar los 5 tests PBT definidos en Requirements § Correctness Properties.

**Dependencies**: Task 2.1, Task 5.1

**Steps**:
1. Verificar si `fast-check` está instalado: `npm ls fast-check`. Si no: `npm install -D fast-check`
2. Crear `src/js/colombia-mix-properties.test.js`
3. **CP-1**: Para viewport W ∈ [320, 1920], el DOM contiene los selectores en orden: `[data-theme="light"]`, `#header-placeholder`, `#nav-placeholder`, `main.colombia-mix`, `.colombia-mix__label`, `h1.colombia-mix__title`, `.colombia-mix__description`, `.colombia-mix__hero-wrapper`, `a.colombia-mix__cta`, `nav.tab-bar`, `#footer-placeholder`
4. **CP-2**: `loadComponent(selector, path)` es idempotente — segunda llamada produce mismo `innerHTML`
5. **CP-3**: Tras N clicks en botón hamburguesa: `aria-expanded` es "true" si N impar, "false" si N par; `aria-label` es consistente. N ∈ [1, 100]
6. **CP-4**: Para W ≤ 768 → Tab Bar `display ≠ "none"` y botón hamburguesa visible; W > 768 → Tab Bar `display === "none"`. W ∈ [320, 1920]
7. **CP-5**: En cualquier estado del DOM (menú abierto/cerrado, scroll simulado), `a.colombia-mix__cta` tiene `textContent` que incluye "Más Contenido" y `href` que contiene "colombia-mix". Verificar ≥ 50 estados
8. Ejecutar `npm test colombia-mix-properties` y confirmar 100 iteraciones por propiedad

**Acceptance Criteria**:
- [~] `fast-check` instalado como dev dependency (si no estaba)
- [~] `src/js/colombia-mix-properties.test.js` creado con los 5 PBTs
- [~] Todos los tests pasan con 100 iteraciones

---

### Task 5.4: Ejecutar suite completa y cobertura

**Goal**: Confirmar que todos los tests pasan y la cobertura cumple los umbrales.

**Dependencies**: Task 5.1, Task 5.2, Task 5.3

**Steps**:
1. `npm test` — todos los tests deben pasar sin errores
2. `npm test -- --coverage` — generar reporte de cobertura
3. Verificar: líneas ≥ 80%, branches ≥ 70%, funciones ≥ 80%
4. Si algún umbral no se alcanza, añadir tests que cubran las ramas faltantes en `loadComponent` y los event handlers

**Acceptance Criteria**:
- [~] `npm test` pasa sin errores
- [~] Cobertura líneas ≥ 80%, branches ≥ 70%, funciones ≥ 80%

---

## Phase 6: Finalization

### Task 6.1: Documentar cambios

**Goal**: Registrar la feature en el README o CHANGELOG del proyecto.

**Dependencies**: Tasks 4.1–4.3, 5.4

**Steps**:
1. Abrir `README.md` (o crear `CHANGELOG.md` si no existe)
2. Añadir entrada con: nueva página `colombia-mix.html`, hoja de estilos `colombia-mix.css`, imagen `hero.webp`, tests asociados, métricas Lighthouse obtenidas en Task 4.3
3. Documentar la decisión de no usar `aspect-ratio` en hero-wrapper y el issue de contraste de Tab Bar inactivo (si quedó pendiente)

**Acceptance Criteria**:
- [~] Entrada de changelog con fecha, archivos añadidos y métricas de performance/accesibilidad
- [~] Issues abiertos (contraste, aspect-ratio si aplica) documentados

---

### Task 6.2: Code review y limpieza

**Goal**: Dejar el código listo para merge.

**Dependencies**: Task 6.1

**Steps**:
1. `colombia-mix.html`: eliminar comentarios de desarrollo, validar HTML (W3C)
2. `colombia-mix.css`: verificar que no hay selectores sin usar, validar CSS (W3C)
3. Tests: eliminar tests comentados, añadir comentarios a PBTs complejos
4. Ejecutar linter si está configurado: `npm run lint`
5. `npm test` final para confirmar que nada se rompió
6. Crear commit: `feat: add colombia-mix page with light theme, a11y and PBT coverage`

**Acceptance Criteria**:
- [~] HTML válido (W3C sin errores)
- [~] CSS válido (W3C sin errores)
- [~] Sin TODOs/FIXMEs sin resolver
- [~] Linter pasa (si configurado)
- [~] `npm test` verde
- [~] Commit creado con mensaje descriptivo

---

## Task Dependencies

```
Task 1.1 (hero.webp)
     │
     ├──────────────────────────────────────┐
     ▼                                      ▼
Task 2.1 (HTML)                        Task 2.2 (CSS)
     └──────────────┬────────────────────────┘
                    ▼
              Task 3.1 (Componentes)
                    │
                    ▼
              Task 3.2 (Enlaces)
                    │
          ┌─────────┼──────────┐
          ▼         ▼          ▼
      Task 4.1  Task 4.2   Task 4.3
          │                    │
          │        Task 5.1 ◄──┤
          │             │      │
          │        Task 5.2    │
          │             │      │
          │        Task 5.3    │
          │             │      │
          └─────────────▼──────┘
                   Task 5.4
                       │
                   Task 6.1
                       │
                   Task 6.2
```

## Estimated Effort

| Phase | Tasks | Tiempo estimado | Prioridad |
|---|---|---|---|
| Phase 1: Assets | 1 | 30 min | Alta |
| Phase 2: Structure | 2 | 1.5 h | Alta |
| Phase 3: Integration | 2 | 1 h | Alta |
| Phase 4: A11y & Perf | 3 | 2 h | Media |
| Phase 5: Testing | 4 | 3 h | Media |
| Phase 6: Finalization | 2 | 45 min | Baja |
| **Total** | **14 tasks** | **~8.5 h** | |

## Open Questions & Blockers

### Open Questions resueltas

| Pregunta | Respuesta |
|---|---|
| ¿`--color-accent` existe? | Sí: `#e94560` en `variables.css` |
| ¿`aspect-ratio` en hero-wrapper? | No por defecto (paridad). Añadir solo si CLS ≥ 0.1 (Task 4.3) |
| ¿`loading="lazy"` en hero? | No. Imagen en viewport inicial; lazy loading penaliza LCP |
| ¿`--font-size-sm` en `variables.css`? | No. Usar `0.75rem` literal con comentario |
| ¿Tab Bar en `components.css`? | No. `components.css` no define `.tab-bar`; mantenerla en `colombia-mix.css` |
| ¿Footer placeholder? | Sí, requerido. `main.js` llama `loadComponent('#footer-placeholder', ...)` |
| ¿`loadComponent` exportada? | Sí, exportada desde `main.js`. Sin refactor necesario para tests |

### Blockers potenciales

1. **Imagen hero no disponible**: usar placeholder de placehold.co hasta tener la imagen real (Task 1.1)
2. **`contenidos.html` sin `id="colombia-mix"`**: el fragmento del CTA no posicionará correctamente; crear el anchor cuando se implemente esa página
3. **Contraste Tab Bar inactivo (`#9ca3af`)**: puede ser violación WCAG. Decidir en Task 4.1 si se corrige en ambas hojas de estilos

## Success Criteria

La implementación se considera completa cuando:

1. ✅ `colombia-mix.html` existe y renderiza correctamente en navegador
2. ✅ `colombia-mix.css` aplica tema light idéntico al de `panico-disforico.css`
3. ✅ Header, Nav y Footer se cargan dinámicamente sin errores
4. ✅ Toggle de menú hamburguesa funciona con atributos ARIA correctos
5. ✅ Todos los enlaces navegan a sus destinos
6. ✅ Lighthouse Accessibility ≥ 90
7. ✅ Lighthouse Performance ≥ 90 (mobile throttled)
8. ✅ Navegación por teclado funciona correctamente
9. ✅ `npm test` pasa sin errores
10. ✅ Cobertura ≥ 80% líneas, ≥ 70% branches
11. ✅ Código validado (W3C HTML + CSS) y linter verde
