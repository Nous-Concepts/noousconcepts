# Mobile Menu Fullscreen Bugfix Design — Acordeón Submenús

## Overview

El menú móvil fullscreen ya funciona correctamente (overlay oscuro, 9 enlaces, logo, botón cerrar, Escape, scroll lock). Lo que falta es el comportamiento de acordeón para los ítems "ENTRETENIMIENTO" y "EDUCACIÓN": al hacer tap deben expandir/colapsar sublistas de sub-ítems en lugar de navegar directamente. Ambos acordeones funcionan de forma independiente (ambos pueden estar abiertos simultáneamente). Se añade un indicador visual (chevron/flecha) y se gestiona `aria-expanded` para accesibilidad.

## Glossary

- **Bug_Condition (C)**: El usuario toca "ENTRETENIMIENTO" o "EDUCACIÓN" en el menú móvil — actualmente navega a otra página en vez de expandir una sublista
- **Property (P)**: Al tocar un ítem acordeón, se expande/colapsa su sublista de sub-ítems con animación y estado ARIA correcto
- **Preservation**: Los ítems no-acordeón siguen navegando y cerrando el overlay; logo, botón cerrar, Escape, scroll lock, y desktop nav no cambian
- **Accordion Item**: Un `<li>` del nav-menu que contiene un `<button>` toggle y una sublista `<ul>` anidada en vez de un `<a>` directo
- **Chevron**: Indicador visual (flecha ▸/▾) que rota al expandir/colapsar la sublista
- **.nav-submenu**: Clase CSS de la sublista anidada `<ul>` dentro de un accordion item
- **.nav-accordion-toggle**: Clase CSS del `<button>` que dispara expand/collapse
- **aria-expanded**: Atributo ARIA en el toggle button que refleja el estado expandido ("true") o colapsado ("false")

## Bug Details

### Bug Condition

El bug se manifiesta cuando el usuario toca "ENTRETENIMIENTO" o "EDUCACIÓN" en el menú móvil fullscreen. En vez de expandir una sublista con los sub-ítems correspondientes, el enlace `<a>` navega directamente a `contenidos.html#entretenimiento` o `contenidos.html#educacion`, cerrando el overlay.

**Formal Specification:**
```
FUNCTION isBugCondition(input)
  INPUT: input of type { target: Element, menuState: 'open', viewportWidth: number }
  OUTPUT: boolean

  RETURN input.viewportWidth <= 768
         AND input.menuState == 'open'
         AND input.target.textContent IN ['ENTRETENIMIENTO', 'EDUCACIÓN']
         AND targetIsPlainLink(input.target)
         AND NOT hasExpandableSubmenu(input.target.parentElement)
END FUNCTION
```

### Examples

- **Ejemplo 1**: Usuario toca "ENTRETENIMIENTO" → navega a contenidos.html#entretenimiento. Esperado: se expande sublista con Neo Samanía Conexión, La Última Función, Pánico Disfórico, Colombia Mix, Carnaval Distópico.
- **Ejemplo 2**: Usuario toca "EDUCACIÓN" → navega a contenidos.html#educacion. Esperado: se expande sublista con El Combo, Naranja Digital.
- **Ejemplo 3**: Usuario busca indicador visual de que hay sub-ítems → no hay chevron ni flecha. Esperado: chevron visible junto a ENTRETENIMIENTO y EDUCACIÓN.
- **Ejemplo 4**: Usuario expande ENTRETENIMIENTO y luego toca EDUCACIÓN → ENTRETENIMIENTO se colapsa (o navega). Esperado: ambos pueden estar abiertos simultáneamente de forma independiente.

## Expected Behavior

### Preservation Requirements

**Unchanged Behaviors:**
- Los ítems no-acordeón (PRESENTACIÓN, GDE, RSE, I+D, SIRUMA, Servicios, ¿Quienes Somos?) siguen navegando y cerrando el overlay al hacer tap
- El orden de los 9 ítems principales se mantiene intacto
- Logo "NOUS CONCEPTS" en top-left y botón cerrar (X) en top-right se mantienen
- Cerrar con botón X, Escape, scroll lock, y retorno de foco se mantienen
- La navegación desktop (viewport > 768px) no muestra acordeones ni sublistas
- El sistema de CustomEvent (`menu-toggle`) sigue funcionando sin cambios

**Scope:**
Todos los inputs que NO involucren tocar "ENTRETENIMIENTO" o "EDUCACIÓN" en el menú móvil deben ser completamente inalterados por este fix. Esto incluye:
- Clicks en ítems no-acordeón
- Interacción con botón cerrar y tecla Escape
- Navegación desktop completa
- Scroll lock y focus management

## Hypothesized Root Cause

Basado en el análisis del bug, las causas son:

1. **HTML plano sin estructura anidada**: `src/components/nav.html` renderiza ENTRETENIMIENTO y EDUCACIÓN como `<a>` planos idénticos a los demás ítems. No existe una sublista `<ul>` anidada ni un botón toggle.

2. **Sin lógica JS de acordeón**: `src/js/nav.js` no tiene ninguna función para manejar expand/collapse de sublistas. No hay event listeners para toggles de acordeón.

3. **Sin estilos de acordeón**: `src/styles/components.css` no contiene estilos para sublistas, chevrons, ni animaciones de expand/collapse.

4. **Sin atributos ARIA de acordeón**: No hay `aria-expanded` en elementos toggle de sublistas, ni `aria-controls` apuntando a las sublistas.

## Correctness Properties

Property 1: Bug Condition - Accordion Toggle Expands/Collapses Sublist

_For any_ tap on "ENTRETENIMIENTO" or "EDUCACIÓN" in the mobile fullscreen menu (viewport ≤ 768px), the toggle button SHALL expand the corresponding sublist if collapsed, or collapse it if expanded, without navigating away. The sublist SHALL display the correct sub-items (5 for ENTRETENIMIENTO, 2 for EDUCACIÓN), and `aria-expanded` SHALL reflect the current state.

**Validates: Requirements 2.1, 2.2, 2.5, 2.6**

Property 2: Preservation - Non-Accordion Items and Existing Controls Unchanged

_For any_ interaction that is NOT a tap on an accordion toggle (clicks on non-accordion items, close button, Escape key, desktop navigation), the fixed code SHALL produce the same behavior as the original code, preserving navigation, overlay close, scroll lock, focus management, ARIA state, and desktop layout.

**Validates: Requirements 3.1, 3.2, 3.3, 3.4, 3.5**

Property 3: Independent Accordion State

_For any_ sequence of taps on accordion toggles, each accordion SHALL operate independently — expanding one SHALL NOT affect the expanded/collapsed state of the other.

**Validates: Requirements 2.4**

Property 4: Visual Indicator Presence

_For any_ state of the mobile menu (open, with accordions expanded or collapsed), the accordion items SHALL display a chevron/arrow indicator that visually reflects the expanded or collapsed state.

**Validates: Requirements 2.3**

## Fix Implementation

### Changes Required

**File**: `src/components/nav.html`

**Changes**:
1. **Replace ENTRETENIMIENTO `<a>` with accordion structure**: Convertir el `<li>` de ENTRETENIMIENTO de un enlace plano a un `<button>` toggle con chevron + una `<ul>` sublista anidada con 5 sub-ítems
2. **Replace EDUCACIÓN `<a>` with accordion structure**: Convertir el `<li>` de EDUCACIÓN de un enlace plano a un `<button>` toggle con chevron + una `<ul>` sublista anidada con 2 sub-ítems
3. **Mantener el orden de los 9 ítems principales**: Los `<li>` acordeón quedan en la misma posición (2do y 3er ítem)

**HTML Structure para cada accordion item:**
```html
<li class="nav-accordion-item" role="none">
  <button class="nav-accordion-toggle" type="button"
          aria-expanded="false" aria-controls="submenu-entretenimiento">
    ENTRETENIMIENTO
    <span class="nav-accordion-chevron" aria-hidden="true">›</span>
  </button>
  <ul id="submenu-entretenimiento" class="nav-submenu" role="menu">
    <li role="none"><a href="contenidos.html#neo-samania" role="menuitem">Neo Samanía Conexión</a></li>
    <li role="none"><a href="contenidos.html#ultima-funcion" role="menuitem">La Última Función</a></li>
    <li role="none"><a href="contenidos.html#panico-disforico" role="menuitem">Pánico Disfórico</a></li>
    <li role="none"><a href="contenidos.html#colombia-mix" role="menuitem">Colombia Mix</a></li>
    <li role="none"><a href="contenidos.html#carnaval-distopico" role="menuitem">Carnaval Distópico</a></li>
  </ul>
</li>
```

---

**File**: `src/styles/components.css`

**Changes**:
1. **Accordion toggle button styles**: Estilo del botón toggle — ancho completo, texto centrado, mismo tamaño de fuente que los otros links, sin fondo ni borde, color texto, cursor pointer, padding igual a los links
2. **Chevron styles**: Span con transición `transform rotate(90deg)` cuando está expandido; posicionado a la derecha del texto
3. **Submenu hidden by default**: `.nav-submenu` con `display: none` por defecto
4. **Submenu visible when expanded**: `.nav-accordion-item.is-expanded .nav-submenu` con `display: block`
5. **Submenu item styles**: Sub-ítems con padding-left adicional para indentación, font-size ligeramente menor
6. **Chevron rotation**: `.nav-accordion-item.is-expanded .nav-accordion-chevron` con `transform: rotate(90deg)`
7. **Desktop hidden**: En viewport > 768px, los acordeones no se muestran como tales — se ocultan los submenús y chevrons, mostrando solo enlaces normales (o se deja como está si desktop no necesita cambios)

**CSS nuevo (dentro del media query ≤ 768px):**
```css
.nav-accordion-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-xs);
  width: 100%;
  padding: var(--spacing-sm);
  font-size: var(--font-size-lg);
  font-family: inherit;
  color: var(--color-text-muted);
  background: none;
  border: none;
  cursor: pointer;
  text-align: center;
  transition: color 0.2s ease;
}

.nav-accordion-toggle:hover,
.nav-accordion-toggle:focus {
  color: var(--color-text);
}

.nav-accordion-chevron {
  display: inline-block;
  transition: transform 0.3s ease;
  font-size: var(--font-size-base);
}

.nav-accordion-item.is-expanded .nav-accordion-chevron {
  transform: rotate(90deg);
}

.nav-submenu {
  display: none;
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-accordion-item.is-expanded .nav-submenu {
  display: block;
}

.nav-submenu li a {
  display: block;
  padding: var(--spacing-xs) var(--spacing-sm);
  font-size: var(--font-size-base);
  color: var(--color-text-muted);
  text-align: center;
  transition: color 0.2s ease;
}

.nav-submenu li a:hover,
.nav-submenu li a:focus {
  color: var(--color-accent);
}
```

---

**File**: `src/js/nav.js`

**Changes**:
1. **Nueva función `initAccordionMenus()`**: Selecciona todos los `.nav-accordion-toggle`, y para cada uno registra un click listener que:
   - Togglea la clase `.is-expanded` en el `<li>` padre (`.nav-accordion-item`)
   - Actualiza `aria-expanded` en el botón toggle ("true"/"false")
2. **Independencia de acordeones**: NO colapsar otros acordeones al expandir uno (cada toggle solo afecta su propio `<li>`)
3. **Registrar sub-link auto-close**: Los enlaces dentro de `.nav-submenu` también cierran el overlay al hacer click (reutilizar `closeMobileMenu()`)
4. **Llamar `initAccordionMenus()` desde `initNavigation()`**: Añadir la llamada al final de la inicialización
5. **Exportar `initAccordionMenus`**: Para testing

**Pseudocódigo de `initAccordionMenus()`:**
```javascript
function initAccordionMenus() {
  const toggles = document.querySelectorAll('.nav-accordion-toggle');
  
  toggles.forEach(function(toggle) {
    toggle.addEventListener('click', function() {
      const accordionItem = toggle.closest('.nav-accordion-item');
      const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
      
      // Toggle state
      toggle.setAttribute('aria-expanded', String(!isExpanded));
      accordionItem.classList.toggle('is-expanded');
    });
  });

  // Auto-close overlay when submenu links are clicked
  const submenuLinks = document.querySelectorAll('.nav-submenu a');
  submenuLinks.forEach(function(link) {
    link.addEventListener('click', closeMobileMenu);
  });
}
```

## Testing Strategy

### Validation Approach

La estrategia de testing sigue dos fases: primero, generar contraejemplos que demuestren el bug en código sin arreglar, luego verificar que el fix funciona correctamente y preserva el comportamiento existente.

### Exploratory Bug Condition Checking

**Goal**: Generar contraejemplos que demuestren el bug ANTES de implementar el fix. Confirmar o refutar el análisis de causa raíz.

**Test Plan**: Escribir tests que simulen taps en ENTRETENIMIENTO y EDUCACIÓN y verifiquen que NO existe sublista expandible. Ejecutar en código sin fix para observar fallos.

**Test Cases**:
1. **Accordion Structure Test**: Verificar que ENTRETENIMIENTO tiene un `<button>` toggle y una `<ul>` sublista (fallará — es un `<a>` plano)
2. **Expand Test**: Simular click en ENTRETENIMIENTO y verificar que aparece sublista con 5 ítems (fallará — navega)
3. **Chevron Test**: Verificar que existe `.nav-accordion-chevron` en ENTRETENIMIENTO y EDUCACIÓN (fallará — no existe)
4. **ARIA Test**: Verificar que `aria-expanded` existe en toggles (fallará — no hay toggles)

**Expected Counterexamples**:
- No existe `.nav-accordion-toggle` ni `.nav-submenu` en el DOM
- ENTRETENIMIENTO es un `<a href="contenidos.html#entretenimiento">` que navega en vez de expandir
- No hay ningún elemento chevron ni atributo `aria-expanded` en los ítems acordeón

### Fix Checking

**Goal**: Verificar que para todos los inputs donde la bug condition se cumple, la función corregida produce el comportamiento esperado.

**Pseudocode:**
```
FOR ALL input WHERE isBugCondition(input) DO
  result := clickAccordionToggle(input.target)
  ASSERT result.submenuVisible == true
  ASSERT result.ariaExpanded == 'true'
  ASSERT result.chevronRotated == true
  ASSERT result.submenuItemCount == expectedCount(input.target)
  ASSERT result.didNotNavigate == true
END FOR
```

### Preservation Checking

**Goal**: Verificar que para todos los inputs donde la bug condition NO se cumple, el código corregido produce el mismo resultado que el original.

**Pseudocode:**
```
FOR ALL input WHERE NOT isBugCondition(input) DO
  ASSERT originalBehavior(input) == fixedBehavior(input)
END FOR
```

**Testing Approach**: Property-based testing es recomendado para preservation checking porque:
- Genera muchos test cases automáticamente a través del dominio de inputs
- Detecta edge cases que tests manuales pueden perder
- Proporciona garantías fuertes de que el comportamiento existente no cambia

**Test Plan**: Observar el comportamiento del código sin fix para clicks en ítems no-acordeón, botón cerrar, Escape, y desktop nav. Luego escribir property-based tests capturando ese comportamiento.

**Test Cases**:
1. **Non-Accordion Navigation Preservation**: Verificar que clicks en PRESENTACIÓN, GDE, RSE, etc. siguen navegando y cerrando overlay
2. **Close Button Preservation**: Verificar que botón X sigue cerrando el overlay
3. **Escape Key Preservation**: Verificar que Escape sigue cerrando el overlay
4. **Desktop Nav Preservation**: Verificar que viewport > 768px muestra nav inline sin acordeones
5. **Scroll Lock Preservation**: Verificar que scroll se bloquea/desbloquea correctamente

### Unit Tests

- Test que click en `.nav-accordion-toggle` de ENTRETENIMIENTO togglea `.is-expanded` en su `<li>` padre
- Test que click en `.nav-accordion-toggle` de EDUCACIÓN togglea `.is-expanded` en su `<li>` padre
- Test que `aria-expanded` cambia de "false" a "true" y viceversa al hacer click
- Test que expandir ENTRETENIMIENTO no afecta el estado de EDUCACIÓN (independencia)
- Test que sublista de ENTRETENIMIENTO contiene exactamente 5 ítems
- Test que sublista de EDUCACIÓN contiene exactamente 2 ítems
- Test que chevron rota (tiene clase o transform) cuando está expandido
- Test que click en sub-link cierra el overlay (llama closeMobileMenu)

### Property-Based Tests

- Generar secuencias aleatorias de clicks en toggles y verificar que cada acordeón mantiene su estado independiente
- Generar combinaciones de expand/collapse y verificar consistencia de `aria-expanded` con `.is-expanded`
- Generar clicks aleatorios en ítems no-acordeón y verificar que siguen cerrando overlay y navegando

### Integration Tests

- Test flujo completo: abrir menú → tap ENTRETENIMIENTO → sublista visible → tap sub-ítem → overlay se cierra y navega
- Test flujo completo: abrir menú → expandir ambos → verificar 7 sub-ítems visibles (5+2) → colapsar uno → verificar que el otro sigue expandido
- Test que al cerrar overlay con X o Escape, los acordeones se resetean (o mantienen estado para próxima apertura — definir comportamiento)
- Test accesibilidad: verificar que screen reader puede navegar los acordeones con aria-expanded y role correctos
