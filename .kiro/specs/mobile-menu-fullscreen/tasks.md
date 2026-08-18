# Implementation Plan

## Overview

Add accordion submenu behavior to ENTRETENIMIENTO and EDUCACIÓN items in the mobile fullscreen menu. Currently both render as flat `<a>` links that navigate away. The fix replaces them with toggle buttons that expand/collapse nested sublists (5 sub-items for ENTRETENIMIENTO, 2 for EDUCACIÓN). Each accordion operates independently, includes a chevron indicator, manages `aria-expanded`, and submenu links auto-close the overlay.

This plan validates all four correctness properties from `design.md`:
- **Property 1: Bug Condition** — accordion toggle expands/collapses its sublist (Requirements 2.1, 2.2, 2.5, 2.6)
- **Property 2: Preservation** — non-accordion items and existing controls unchanged (Requirements 3.1–3.5)
- **Property 3: Independent Accordion State** — accordions operate independently (Requirement 2.4)
- **Property 4: Visual Indicator Presence** — chevron reflects expanded/collapsed state (Requirement 2.3)

## Tasks

- [x] 1. Write bug condition exploration test
  - **Property 1: Bug Condition** - Accordion Toggle Missing for ENTRETENIMIENTO and EDUCACIÓN
  - **CRITICAL**: This test MUST FAIL on unfixed code - failure confirms the bug exists
  - **DO NOT attempt to fix the test or the code when it fails**
  - **NOTE**: This test encodes the expected behavior - it will validate the fix when it passes after implementation
  - **GOAL**: Surface counterexamples that demonstrate the bug exists
  - **Scoped PBT Approach**: Scope the property to the concrete failing cases: tapping ENTRETENIMIENTO or EDUCACIÓN in the mobile menu (viewport ≤ 768px)
  - Create test file `src/js/nav-accordion.test.js` using Vitest and fast-check
  - Set up DOM with current `nav.html` content (flat `<a>` links for ENTRETENIMIENTO and EDUCACIÓN)
  - Property: for any accordion target from fc.constantFrom('ENTRETENIMIENTO', 'EDUCACIÓN') and viewport width from fc.integer({min: 320, max: 768}), when menu is opened (.is-open):
    - Assert `.nav-accordion-toggle` button exists for the target item (Bug Condition: targetIsPlainLink and NOT hasExpandableSubmenu)
    - Assert `.nav-submenu` `<ul>` exists nested inside the target's `<li>` with correct sub-item count (5 for ENTRETENIMIENTO, 2 for EDUCACIÓN)
    - Assert `.nav-accordion-chevron` span exists inside the toggle button
    - Assert `aria-expanded` attribute is present on the toggle button (initially "false")
    - Simulate click on the toggle and assert `.is-expanded` class is added to the parent `.nav-accordion-item`
    - Assert `aria-expanded` changes to "true" after click
  - Run test on UNFIXED code using `npx vitest --run src/js/nav-accordion.test.js`
  - **EXPECTED OUTCOME**: Test FAILS (this is correct - it proves the bug exists: no toggle buttons, no submenus, no chevrons, no aria-expanded)
  - Document counterexamples found (e.g., "ENTRETENIMIENTO is a plain <a> link, no .nav-accordion-toggle found", "no .nav-submenu exists", "no chevron indicator")
  - Mark task complete when test is written, run, and failure is documented
  - _Requirements: 1.1, 1.2, 1.3, 1.4_

- [x] 2. Write preservation property tests (BEFORE implementing fix)
  - **Property 2: Preservation** - Non-Accordion Items and Overlay Controls Unchanged
  - **IMPORTANT**: Follow observation-first methodology
  - Create preservation tests in `src/js/nav-accordion-preservation.test.js` using Vitest and fast-check
  - Observe on UNFIXED code:
    - Non-accordion items (PRESENTACIÓN, GDE, RSE, I+D, SIRUMA, Servicios, ¿Quienes Somos?) clicking navigates and closes overlay
    - Close button (X) still closes the overlay
    - Escape key still closes the overlay
    - Logo "NOUS CONCEPTS" and close button remain in `.nav-overlay-header`
    - The 9 main `<li>` items remain in correct order
    - Desktop nav (viewport > 768px) displays inline without overlay behavior
  - Write property-based tests:
    - Property: for any non-accordion item from fc.constantFrom('PRESENTACIÓN', 'GDE', 'RSE', 'I+D', 'SIRUMA', 'Servicios', '¿Quienes Somos?'), clicking it calls closeMobileMenu (overlay closes)
    - Property: for any sequence of open/close states, close button and Escape key close the overlay and restore ARIA state
    - Property: the 9 main items always appear in the correct order in the DOM (read each item's top-level control via `:scope > a, :scope > button`, strip the chevron glyph, so the assertion is robust to the accordion structure)
    - Property: `.nav-overlay-header` contains logo "NOUS CONCEPTS" and `.nav-close-btn`
  - Run tests on UNFIXED code using `npx vitest --run src/js/nav-accordion-preservation.test.js`
  - **EXPECTED OUTCOME**: Tests PASS (this confirms baseline behavior to preserve)
  - Mark task complete when tests are written, run, and passing on unfixed code
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_

- [x] 3. Fix for accordion submenu behavior in ENTRETENIMIENTO and EDUCACIÓN

  - [x] 3.1 Update nav.html with accordion structure for ENTRETENIMIENTO and EDUCACIÓN
    - Replace ENTRETENIMIENTO `<li>` (currently `<a href="contenidos.html#entretenimiento">`) with accordion structure:
      - `<li class="nav-accordion-item" role="none">`
      - `<button class="nav-accordion-toggle" type="button" aria-expanded="false" aria-controls="submenu-entretenimiento">ENTRETENIMIENTO <span class="nav-accordion-chevron" aria-hidden="true">›</span></button>`
      - `<ul id="submenu-entretenimiento" class="nav-submenu" role="menu">` with 5 items: Neo Samanía Conexión, La Última Función, Pánico Disfórico, Colombia Mix, Carnaval Distópico
    - Replace EDUCACIÓN `<li>` (currently `<a href="contenidos.html#educacion">`) with accordion structure:
      - `<li class="nav-accordion-item" role="none">`
      - `<button class="nav-accordion-toggle" type="button" aria-expanded="false" aria-controls="submenu-educacion">EDUCACIÓN <span class="nav-accordion-chevron" aria-hidden="true">›</span></button>`
      - `<ul id="submenu-educacion" class="nav-submenu" role="menu">` with 2 items: El Combo, Naranja Digital
    - Maintain the correct order of all 9 main items (PRESENTACIÓN, ENTRETENIMIENTO, EDUCACIÓN, GDE, RSE, I+D, SIRUMA, Servicios, ¿Quienes Somos?)
    - _Bug_Condition: isBugCondition(input) where targetIsPlainLink(input.target) AND NOT hasExpandableSubmenu(input.target.parentElement)_
    - _Expected_Behavior: Accordion items have toggle button, chevron, nested submenu with correct sub-items_
    - _Preservation: Non-accordion items remain as `<a>` links with same href and data-page attributes_
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 3.1_

  - [x] 3.2 Add accordion CSS styles to components.css
    - Add `.nav-accordion-toggle` styles inside ≤ 768px media query: full width, flex, centered text, same font-size as nav links, no background/border, cursor pointer, color-text-muted with hover/focus to color-text
    - Add `.nav-accordion-chevron` styles: inline-block, transition transform 0.3s ease
    - Add `.nav-accordion-item.is-expanded .nav-accordion-chevron` with `transform: rotate(90deg)`
    - Add `.nav-submenu` hidden by default: `display: none; list-style: none; padding: 0; margin: 0`
    - Add `.nav-accordion-item.is-expanded .nav-submenu` with `display: block`
    - Add `.nav-submenu li a` styles: block display, padding with indentation, font-size-base, color-text-muted, center align, hover/focus color-accent
    - _Bug_Condition: No CSS styles exist for accordion toggle, chevron, or submenu_
    - _Expected_Behavior: Accordion visually matches nav link style, chevron rotates on expand, submenu appears/hides_
    - _Preservation: Existing nav-links, nav-overlay-header, nav-close-btn, desktop styles unchanged_
    - _Requirements: 2.1, 2.2, 2.3, 2.6, 3.3, 3.5_

  - [x] 3.3 Add initAccordionMenus() function to nav.js
    - Create `initAccordionMenus()` function that:
      - Selects all `.nav-accordion-toggle` elements
      - For each toggle, registers click listener that toggles `.is-expanded` on parent `.nav-accordion-item` and updates `aria-expanded` ("true"/"false")
      - Does NOT collapse other accordions when one is expanded (independent state)
      - Registers click listeners on `.nav-submenu a` links to call `closeMobileMenu()` (auto-close overlay)
    - Call `initAccordionMenus()` from `initNavigation()` after `initMobileMenuControls()`
    - Export `initAccordionMenus` for testing
    - _Bug_Condition: No JS logic exists for accordion expand/collapse_
    - _Expected_Behavior: Click toggle → parent gets .is-expanded, aria-expanded updates, independent per accordion, submenu links close overlay_
    - _Preservation: Existing toggleMobileMenu, listenMenuToggleEvent, closeMobileMenu, initMobileMenuControls unchanged_
    - _Requirements: 2.1, 2.2, 2.4, 2.5, 2.6, 3.2, 3.4_

  - [x] 3.4 Verify bug condition exploration test now passes
    - **Property 1: Expected Behavior** - Accordion Toggle Expands/Collapses Sublist
    - **IMPORTANT**: Re-run the SAME test from task 1 - do NOT write a new test
    - The test from task 1 encodes the expected behavior (toggle buttons, submenus, chevrons, aria-expanded, expand on click)
    - When this test passes, it confirms the expected behavior is satisfied
    - Run bug condition exploration test: `npx vitest --run src/js/nav-accordion.test.js`
    - **EXPECTED OUTCOME**: Test PASSES (confirms bug is fixed)
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6_

  - [x] 3.5 Verify preservation tests still pass
    - **Property 2: Preservation** - Non-Accordion Items and Overlay Controls Unchanged
    - **IMPORTANT**: Re-run the SAME tests from task 2 - do NOT write new tests
    - Run preservation property tests: `npx vitest --run src/js/nav-accordion-preservation.test.js`
    - **EXPECTED OUTCOME**: Tests PASS (confirms no regressions)
    - Confirm all tests still pass after fix (non-accordion navigation, close button, Escape, logo, item order, desktop nav)

- [x] 4. Write independent accordion state property test
  - **Property 3: Independent Accordion State** - Accordions Operate Independently
  - **GOAL**: Verify that expanding/collapsing one accordion never affects the other (both can be open simultaneously)
  - Add a property-based test (in `src/js/nav-accordion.test.js` or a new `src/js/nav-accordion-independence.test.js`) using Vitest and fast-check
  - Property: for any sequence of toggle actions from fc.array(fc.constantFrom('ENTRETENIMIENTO', 'EDUCACIÓN')), after applying each click:
    - Track the expected independent state of each accordion (a click flips only its own target)
    - Assert each `.nav-accordion-item.is-expanded` state and each toggle's `aria-expanded` match the independently-tracked expectation
    - Assert that toggling one target NEVER changes the `.is-expanded` state or `aria-expanded` of the other target
  - Include a concrete case: expand ENTRETENIMIENTO, then expand EDUCACIÓN, and assert BOTH remain expanded simultaneously (7 sub-items visible: 5 + 2)
  - Run test: `npx vitest --run` on the relevant file
  - **EXPECTED OUTCOME**: Test PASSES (initAccordionMenus toggles only the clicked item's parent)
  - _Requirements: 2.4_

- [x] 5. Write visual indicator property test
  - **Property 4: Visual Indicator Presence** - Chevron Reflects Expanded/Collapsed State
  - **GOAL**: Verify each accordion item always displays a chevron indicator that reflects the current expand/collapse state
  - Add a property-based test (in `src/js/nav-accordion.test.js` or a new `src/js/nav-accordion-indicator.test.js`) using Vitest and fast-check
  - Property: for any accordion target from fc.constantFrom('ENTRETENIMIENTO', 'EDUCACIÓN') and any toggle count from fc.integer({min: 0, max: 5}):
    - Assert a `.nav-accordion-chevron` element is present inside the toggle in every state
    - After each toggle, assert the chevron's visual state tracks `.is-expanded` on the parent `.nav-accordion-item` (collapsed → no `.is-expanded`; expanded → `.is-expanded` present, which drives the CSS `rotate(90deg)`)
    - Assert `aria-expanded` on the toggle stays consistent with the presence of `.is-expanded` (true ⇔ expanded)
  - Run test: `npx vitest --run` on the relevant file
  - **EXPECTED OUTCOME**: Test PASSES (chevron span exists; `.is-expanded` drives chevron rotation per components.css)
  - _Requirements: 2.3_

- [x] 6. Fix regression in existing fullscreen preservation test
  - **Property 2: Preservation** - Main Item Count Robust to Accordion Structure
  - **CONTEXT**: `src/js/nav-fullscreen.test.js` asserts `navMenu.querySelectorAll('li').length === 9`. After the accordion fix this counts nested submenu `<li>` too (9 main + 5 + 2 = 16), so the test fails even though the 9 main items are preserved (Requirement 3.1 still holds).
  - Update the assertion in `src/js/nav-fullscreen.test.js` to count only the direct-child main items: use `navMenu.querySelectorAll(':scope > li')` (or filter `navMenu.children` for `LI`) so it counts the 9 top-level items and ignores nested `.nav-submenu` items
  - Keep the rest of the test unchanged (overlay header, logo text, close button assertions)
  - Run test: `npx vitest --run src/js/nav-fullscreen.test.js`
  - **EXPECTED OUTCOME**: Test PASSES (9 main items preserved; nested submenu items correctly excluded)
  - _Requirements: 3.1_

- [x] 7. Checkpoint - Ensure all tests pass
  - Run full test suite: `npx vitest --run`
  - Verify `src/js/nav-accordion.test.js` passes (Property 1: accordion bug condition fixed)
  - Verify `src/js/nav-accordion-preservation.test.js` passes (Property 2: no regressions)
  - Verify the Property 3 (independence) and Property 4 (visual indicator) tests pass
  - Verify `src/js/nav-fullscreen.test.js` passes after the selector fix (task 6)
  - Verify existing tests still pass: `src/js/nav.test.js`, `src/js/nav-preservation.test.js`
  - Ensure all tests pass, ask the user if questions arise.


## Task Dependency Graph

```json
{
  "waves": [
    {"tasks": ["1", "2"]},
    {"tasks": ["3.1", "3.2", "3.3"]},
    {"tasks": ["3.4", "3.5"]},
    {"tasks": ["4", "5", "6"]},
    {"tasks": ["7"]}
  ]
}
```

## Notes

- The original fullscreen overlay fix (tasks 1-4 in previous plan) is ALREADY COMPLETED — this plan focuses solely on accordion submenu behavior
- Tests use Vitest with fast-check for property-based testing and jsdom for DOM simulation
- The exploration test (task 1) is expected to FAIL before the fix — this confirms the bug exists (no accordion structure)
- The preservation test (task 2) is expected to PASS before the fix — this captures baseline behavior of non-accordion items
- After the fix, both test suites (tasks 1 & 2) PASS — verified: 6/6 tests pass
- Tasks 4 and 5 add dedicated coverage for design correctness Property 3 (independent accordion state, Req 2.4) and Property 4 (visual indicator presence, Req 2.3), which are not yet explicitly tested
- Task 6 fixes a real regression: the accordion submenu `<li>` elements break `nav-fullscreen.test.js`'s broad `querySelectorAll('li')` count (16 vs expected 9). Scoping to direct-child `<li>` preserves the intent (9 main items) — Requirement 3.1
- Accordions operate independently (both can be open simultaneously) — no mutual exclusion logic
- Submenu links auto-close the overlay via the existing `closeMobileMenu()` path
- jsdom emits "Not implemented: navigation (except hash changes)" warnings when link clicks are simulated; these are harmless noise, not test failures
