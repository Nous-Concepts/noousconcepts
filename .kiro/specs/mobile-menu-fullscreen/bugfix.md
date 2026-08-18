# Bugfix Requirements Document

## Introduction

El menú móvil fullscreen no soporta sublistas expandibles/colapsables (estilo acordeón) para los ítems "ENTRETENIMIENTO" y "EDUCACIÓN". Actualmente ambos se muestran como enlaces planos sin sub-ítems. Según el wireframe, estos dos ítems deben funcionar como acordeones que al hacer tap revelan una lista de sub-ítems debajo de ellos. Ambos pueden estar abiertos simultáneamente o de forma independiente. El menú permanece en dark mode y el resto del comportamiento (overlay fullscreen, botón cerrar, logo, 9 ítems principales) ya funciona correctamente.

## Bug Analysis

### Current Behavior (Defect)

1.1 WHEN the user taps "ENTRETENIMIENTO" in the mobile fullscreen menu THEN the system navigates away to contenidos.html#entretenimiento instead of expanding a sublist of sub-items (Neo Samanía Conexión, La Última Función, Pánico Disfórico, Colombia Mix, Carnaval Distópico)

1.2 WHEN the user taps "EDUCACIÓN" in the mobile fullscreen menu THEN the system navigates away to contenidos.html#educacion instead of expanding a sublist of sub-items (El Combo, Naranja Digital)

1.3 WHEN the mobile fullscreen menu is opened THEN the system does not display any expand/collapse indicator (e.g., chevron or arrow icon) next to "ENTRETENIMIENTO" or "EDUCACIÓN" to signal they have sub-items

1.4 WHEN the mobile fullscreen menu is opened THEN the system renders "ENTRETENIMIENTO" and "EDUCACIÓN" as flat `<a>` links identical to all other menu items, with no nested `<ul>` sub-menu structure

### Expected Behavior (Correct)

2.1 WHEN the user taps "ENTRETENIMIENTO" in the mobile fullscreen menu THEN the system SHALL toggle (expand/collapse) a sublist containing the items: Neo Samanía Conexión, La Última Función, Pánico Disfórico, Colombia Mix, Carnaval Distópico — displayed directly below "ENTRETENIMIENTO"

2.2 WHEN the user taps "EDUCACIÓN" in the mobile fullscreen menu THEN the system SHALL toggle (expand/collapse) a sublist containing the items: El Combo, Naranja Digital — displayed directly below "EDUCACIÓN"

2.3 WHEN the mobile fullscreen menu is opened THEN the system SHALL display an expand/collapse indicator (chevron/arrow) next to "ENTRETENIMIENTO" and "EDUCACIÓN" to visually signal that they have expandable sub-items

2.4 WHEN "ENTRETENIMIENTO" is expanded and the user taps "EDUCACIÓN" THEN the system SHALL expand "EDUCACIÓN" independently without collapsing "ENTRETENIMIENTO" (both can be open simultaneously)

2.5 WHEN an accordion item is expanded THEN the system SHALL update the `aria-expanded` attribute on the toggle element to "true", and WHEN collapsed SHALL set it to "false"

2.6 WHEN the user taps an already-expanded accordion item ("ENTRETENIMIENTO" or "EDUCACIÓN") THEN the system SHALL collapse (hide) its sublist

### Unchanged Behavior (Regression Prevention)

3.1 WHEN the mobile fullscreen menu is opened THEN the system SHALL CONTINUE TO display all menu items in the correct order: PRESENTACIÓN, ENTRETENIMIENTO, EDUCACIÓN, GDE, RSE, I+D, SIRUMA, Servicios, ¿Quienes Somos?

3.2 WHEN the user taps a non-accordion menu item (PRESENTACIÓN, GDE, RSE, I+D, SIRUMA, Servicios, ¿Quienes Somos?) THEN the system SHALL CONTINUE TO navigate to the corresponding page and close the overlay

3.3 WHEN the fullscreen overlay is open THEN the system SHALL CONTINUE TO display the logo "NOUS CONCEPTS" at the top-left and the close (X) button at the top-right

3.4 WHEN the close (X) button is tapped or Escape is pressed THEN the system SHALL CONTINUE TO close the fullscreen overlay, restore body scroll, manage focus back to the header menu button, and update ARIA attributes

3.5 WHEN the viewport is wider than 768px (desktop) THEN the system SHALL CONTINUE TO display the desktop navigation bar without the fullscreen overlay or accordion behavior
