# Requirements Document

## Introduction

La pantalla **Pánico Disfórico** es una página de detalle de serie dentro del sitio web NOUS Concepts. Presenta al visitante la serie transmedia de cómic digital de terror, horror y suspenso inspirada en relatos paranormales reales. La pantalla debe ser visualmente consistente con el estilo oscuro/dramático del sitio, reutilizar los componentes existentes (header y nav), e incluir un hero visual de la serie junto a un botón de llamada a la acción que dirija a más contenido de la serie.

La página se implementa en HTML/CSS/JS vanilla, siguiendo el enfoque mobile-first ya establecido en páginas como `neo-samaria-conexion.html`.

---

## Glossary

- **Página**: El archivo `panico-disforico.html` ubicado en `src/pages/`.
- **Header**: Componente reutilizable `src/components/header.html` con el logo "NOUS·" a la izquierda y el botón de menú hamburguesa a la derecha.
- **Nav**: Componente reutilizable `src/components/nav.html` que provee la navegación principal del sitio con overlay a pantalla completa en móvil y tablet.
- **Tab_Bar**: Barra de navegación inferior fija, específica de esta página, con tres ítems: Inicio, Contenido (activo) y Nosotros.
- **Hero_Image**: Imagen principal de la serie con fondo negro y el logotipo "PÁNICO DISFÓRICO" en letras de estilo horror.
- **CTA_Button**: Botón de llamada a la acción "Más Contenido →" que navega hacia contenido adicional de la serie.
- **Serie_Label**: Etiqueta en texto pequeño con la palabra "SERIE" en mayúsculas, de color muted.
- **Design_Token**: Variable CSS definida en `src/styles/variables.css` (ej. `--color-bg`, `--color-accent`).
- **Main_JS**: Módulo `src/js/main.js` responsable de cargar los componentes header, nav y footer mediante inyección en placeholders del DOM.

---

## Requirements

### Requisito 1: Estructura HTML de la página

**User Story:** Como visitante del sitio, quiero una página dedicada a la serie Pánico Disfórico, para conocer de qué trata y acceder a su contenido.

#### Criterios de Aceptación

1. THE Página SHALL declarar `<!DOCTYPE html>`, `<html lang="es" data-theme="dark">`, `<meta charset="UTF-8">` y `<meta name="viewport" content="width=device-width, initial-scale=1.0">`.
2. THE Página SHALL establecer el `<title>` como `"Pánico Disfórico — NOUS CONCEPTS"`.
3. THE Página SHALL incluir un `<div id="header-placeholder"></div>` como primer elemento dentro de `<body>` para inyección del Header.
4. THE Página SHALL incluir un `<div id="nav-placeholder"></div>` inmediatamente después del header placeholder para inyección del Nav.
5. THE Página SHALL incluir un elemento `<main>` con `aria-label="Pánico Disfórico — Serie"` que contenga todo el contenido principal de la serie.
6. THE Página SHALL cargar el módulo `src/js/main.js` mediante `<script type="module">` al final de `<body>`.

### Requisito 2: Hojas de estilo y tokens de diseño

**User Story:** Como desarrollador, quiero que la página use las variables CSS existentes, para que el estilo sea consistente con el resto del sitio.

#### Criterios de Aceptación

1. THE Página SHALL enlazar las hojas de estilo en este orden: `variables.css`, `main.css`, `components.css`, `panico-disforico.css`.
2. THE Página SHALL no definir colores literales en su hoja de estilo propia; en su lugar SHALL referenciar Design_Tokens de `variables.css`.
3. THE Página SHALL usar `--color-bg` como color de fondo base del `<body>` (valor de referencia: `#0f0f1a`).
4. WHERE la propiedad CSS `var()` falle, THE Página SHALL usar `#0f0f1a` como color de fondo de respaldo en `body`.

### Requisito 3: Sección principal — etiqueta, título y descripción

**User Story:** Como visitante, quiero ver claramente de qué trata la serie antes de ver la imagen, para decidir si me interesa.

#### Criterios de Aceptación

1. THE Página SHALL renderizar la Serie_Label como un elemento de texto en mayúsculas con la palabra `"SERIE"`, usando `--color-text-muted` como color y un tamaño de fuente menor que `--font-size-base`.
2. THE Página SHALL renderizar el título principal `"Pánico Disfórico"` en un elemento `<h1>` usando `--font-heading` y `--font-size-xl` en móvil (viewport ≤ 768px).
3. WHEN el viewport supera 768px de ancho, THE Página SHALL aumentar el tamaño del `<h1>` a `--font-size-hero`.
4. THE Página SHALL renderizar la descripción: `"Una serie trans media que cuenta diversas historias de eventos relacionados con el mundo paranormal, mayormente inspirados en relatos reales. Explora diversos géneros desde el Terror, el Horror y el Suspenso, en formato de Comic Digital."` en un elemento `<p>` con `--color-text` y `line-height` de al menos `1.6`.
5. THE Página SHALL limitar el ancho máximo del bloque de texto (título + descripción) a `720px` y centrarlo horizontalmente con `margin-inline: auto`.

### Requisito 4: Hero Image de la serie

**User Story:** Como visitante, quiero ver la imagen representativa de la serie, para tener una impresión visual de su estética.

#### Criterios de Aceptación

1. THE Página SHALL incluir un elemento `<img>` para la Hero_Image con `src` apuntando a `../assets/images/contenidos/panico-disforico/hero.webp`.
2. THE Hero_Image SHALL tener un atributo `alt` descriptivo: `"Logotipo de Pánico Disfórico con letras de estilo horror en rojo sobre fondo negro"`.
3. THE Hero_Image SHALL tener esquinas redondeadas con `border-radius` de al menos `4px`.
4. THE Hero_Image SHALL tener un ancho del 100% de su contenedor y `height: auto` para mantener la proporción original.
5. THE Página SHALL envolver la Hero_Image en un contenedor con `max-width` de `720px` centrado horizontalmente.
6. IF el archivo de imagen no existe en la ruta especificada, THEN THE Página SHALL mostrar el texto alternativo del atributo `alt` sin romper el layout.

### Requisito 5: Botón de llamada a la acción (CTA)

**User Story:** Como visitante interesado en la serie, quiero un botón que me lleve a más contenido, para poder seguir explorando la serie.

#### Criterios de Aceptación

1. THE Página SHALL renderizar el CTA_Button como un elemento `<a>` con el texto `"Más Contenido →"`.
2. THE CTA_Button SHALL tener `href` apuntando a `contenidos.html#panico-disforico`.
3. THE CTA_Button SHALL usar `--color-secondary` o `--color-primary` como color de fondo y `--color-text` como color de texto.
4. THE CTA_Button SHALL tener `border-radius` de al menos `24px` (forma pill).
5. THE CTA_Button SHALL tener un padding horizontal de al menos `var(--spacing-md)` y padding vertical de al menos `var(--spacing-xs)`.
6. WHEN el CTA_Button recibe foco mediante teclado, THE CTA_Button SHALL mostrar un `outline` de `2px solid var(--color-accent)` con `outline-offset` de `2px`.
7. WHEN el usuario activa el CTA_Button, THE Página SHALL navegar a `contenidos.html#panico-disforico`.

### Requisito 6: Tab Bar de navegación inferior

**User Story:** Como visitante en móvil, quiero una barra de navegación en la parte inferior de la pantalla, para moverme fácilmente entre las secciones principales del sitio.

#### Criterios de Aceptación

1. THE Tab_Bar SHALL renderizarse como un elemento `<nav>` con `aria-label="Navegación de secciones"` fijo en la parte inferior del viewport (`position: fixed; bottom: 0`).
2. THE Tab_Bar SHALL contener exactamente tres ítems de navegación: **Inicio** (enlace a `home.html`), **Contenido** (enlace a `contenidos.html`, marcado como activo) y **Nosotros** (enlace a `presentacion.html`).
3. THE Tab_Bar SHALL mostrar un ícono SVG inline y una etiqueta de texto por debajo de cada ítem.
4. THE Tab_Bar SHALL marcar visualmente el ítem "Contenido" como activo mediante una línea indicadora o un color diferenciado usando `--color-accent`.
5. THE Tab_Bar SHALL tener fondo de color `--color-primary` o `--color-surface` con una opacidad del 100% para no transparentar el contenido subyacente.
6. THE Tab_Bar SHALL reservar espacio en la parte inferior del `<main>` para que el último elemento de contenido no quede oculto detrás de la barra (padding-bottom de al menos `56px`).
7. WHEN el viewport supera 768px de ancho, THE Tab_Bar SHALL ocultarse (display: none) para no interferir con la navegación de escritorio.
8. WHEN un ítem del Tab_Bar recibe foco mediante teclado, THE Tab_Bar SHALL mostrar un `outline` de `2px solid var(--color-accent)`.

### Requisito 7: Responsividad y diseño mobile-first

**User Story:** Como visitante desde móvil, quiero que la página se vea correctamente en pantallas pequeñas, para tener una buena experiencia independientemente de mi dispositivo.

#### Criterios de Aceptación

1. THE Página SHALL usar padding lateral de `--spacing-sm` en viewport ≤ 768px y de `--spacing-md` en viewport > 768px.
2. THE Página SHALL aplicar un `padding-top` al `<main>` de al menos `96px` para compensar el Header fijo de `--nav-height` (64px) más un espaciado adicional.
3. WHILE el viewport es ≤ 768px, THE Página SHALL mostrar los elementos (etiqueta, título, descripción, imagen, botón) en una única columna vertical centrada.
4. THE Página SHALL escalar correctamente el texto y los espaciados usando los Design_Tokens de `variables.css` sin incluir valores de tamaño o color literales en `panico-disforico.css`.

### Requisito 8: Accesibilidad

**User Story:** Como visitante que usa tecnología asistiva, quiero que la página sea navegable por teclado y compatible con lectores de pantalla, para acceder a todo su contenido.

#### Criterios de Aceptación

1. THE Página SHALL incluir un enlace de salto al contenido principal (`<a href="#main-content" class="visually-hidden">Saltar al contenido principal</a>`) como primer elemento enfocable.
2. THE Hero_Image SHALL tener un atributo `alt` no vacío que describa su contenido visual.
3. THE CTA_Button SHALL tener un texto de enlace descriptivo que indique su destino y acción.
4. THE Tab_Bar SHALL tener atributos `aria-label` en cada enlace que describan su destino: `"Ir a Inicio"`, `"Ir a Contenidos (activo)"`, `"Ir a Nosotros"`.
5. THE Página SHALL alcanzar un ratio de contraste de texto de al menos 4.5:1 entre `--color-text` (`#eaeaea`) y `--color-bg` (`#0f0f1a`) para cumplir WCAG 2.1 nivel AA.
6. THE Serie_Label SHALL tener un ratio de contraste de al menos 3:1 entre `--color-text-muted` (`#a0a0a0`) y `--color-bg` (`#0f0f1a`) para texto de tamaño reducido.

### Requisito 9: Consistencia con páginas existentes

**User Story:** Como desarrollador, quiero que la nueva página siga los mismos patrones que `neo-samaria-conexion.html`, para mantener la coherencia del código base.

#### Criterios de Aceptación

1. THE Página SHALL inyectar el Header usando `<div id="header-placeholder"></div>` cargado por Main_JS, de manera idéntica a `neo-samaria-conexion.html`.
2. THE Página SHALL inyectar el Nav usando `<div id="nav-placeholder"></div>` cargado por Main_JS.
3. THE Página SHALL tener su hoja de estilo propia en `src/styles/panico-disforico.css` con la misma estructura de comentarios y secciones que `neo-samaria-conexion.css`.
4. THE Página SHALL colocarse en `src/pages/panico-disforico.html` siguiendo la convención de nombres kebab-case del proyecto.
5. THE Nav SHALL incluir un enlace activo o resaltado al ítem "Pánico Disfórico" dentro del submenú "CONTENIDO" cuando la Página esté cargada.
