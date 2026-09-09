# Requirements Document

## Introduction

Esta especificación define los requisitos para la pantalla "Colombia Mix" del sitio web "Nous Concepts" en modo claro (light mode) con diseño mobile-first. La pantalla presenta el contenido de un proyecto original de comedia social en formato de antología musical, ambientado en el Caribe colombiano con estética de historieta/cómic.

La pantalla muestra: un Header fijo con Logo a la izquierda y botón hamburguesa a la derecha, una etiqueta de categoría "ANTOLOGÍA MUSICAL", el título principal "Colombia Mix", una descripción/sinopsis del proyecto, una imagen hero tipo cómic en blanco y negro, un botón CTA "Más Contenido →" y una barra de navegación inferior (tab bar) con los ítems Inicio, Contenido (activo) y Nosotros.

La pantalla sigue el mismo patrón estructural y de comportamiento que `src/pages/panico-disforico.html`, reutilizando los tokens de diseño (`src/styles/variables.css`) y los componentes de Header, navegación y footer (`src/components/header.html`, `src/components/nav.html`, `src/components/footer.html`), garantizando coherencia visual y de comportamiento en todo el sitio.

### Propuesta de diagramación (mobile-first)

```
┌───────────────────────────────────────┐
│  NOUS·                            ☰   │  ← Header fijo (64px), fondo claro
├───────────────────────────────────────┤
│                                        │
│  ANTOLOGÍA MUSICAL                     │  ← Etiqueta de categoría (uppercase)
│                                        │
│  Colombia Mix                          │  ← Título principal h1, negrita
│                                        │
│  Una comedia social, centrada en una   │
│  familia disfuncional del caribe       │  ← Descripción/sinopsis
│  Colombiano...                         │
│                                        │
│  ┌────────────────────────────────┐   │
│  │  [Imagen cómic B&N             │   │  ← Imagen hero, ancho completo
│  │   COLOMBIA MIX lettering]      │   │
│  └────────────────────────────────┘   │
│                                        │
│         [ Más Contenido → ]            │  ← Botón CTA pill/rounded, centrado
│                                        │
├───────────────────────────────────────┤
│  🏠 Inicio  ▶ Contenido  ℹ Nosotros  │  ← Tab bar inferior, "Contenido" activo
└───────────────────────────────────────┘
```

## Glossary

- **Pantalla_Colombia_Mix**: Página del sitio web Nous Concepts que presenta el proyecto original "Colombia Mix", compuesta por Header, Etiqueta_Categoría, Título_Página, Sección_Descripción, Sección_Hero, Botón_CTA, Tab_Bar y Footer.
- **Header**: Componente fijo superior que contiene el Logo a la izquierda y el Botón_Hamburguesa a la derecha, definido en `src/components/header.html`. Es el mismo componente reutilizado en las demás pantallas del sitio.
- **Logo**: Enlace de marca con el texto "NOUS·" alineado al lado izquierdo del Header, que dirige a la página de inicio (`home.html`).
- **Botón_Hamburguesa**: Botón compuesto por tres líneas horizontales paralelas (≡), alineado al lado derecho del Header, que abre y cierra el Menú_Navegación.
- **Menú_Navegación**: Panel de navegación desplegable definido en `src/components/nav.html` que muestra los enlaces del sitio al activarse el Botón_Hamburguesa.
- **Footer**: Componente de pie de página definido en `src/components/footer.html`, cargado dinámicamente mediante `loadComponent('#footer-placeholder', '../components/footer.html')`.
- **Etiqueta_Categoría**: Elemento de texto en mayúsculas con el contenido "ANTOLOGÍA MUSICAL" que clasifica el tipo de proyecto presentado.
- **Título_Página**: Encabezado principal (`<h1>`) con el texto "Colombia Mix", en tipografía grande y negrita.
- **Sección_Descripción**: Bloque de texto con la sinopsis del proyecto Colombia Mix.
- **Sección_Hero**: Área que contiene la Imagen_Hero del proyecto.
- **Imagen_Hero**: Ilustración tipo cómic/historieta en blanco y negro con lettering "COLOMBIA MIX", que funciona como imagen principal de la pantalla.
- **Botón_CTA**: Enlace con apariencia de botón pill/redondeado con el texto "Más Contenido →" que dirige al usuario a `contenidos.html#colombia-mix`.
- **Tab_Bar**: Barra de navegación inferior fija con tres ítems: Inicio (ícono casa), Contenido (ícono play, activo) y Nosotros (ícono info).
- **Modo_Claro**: Esquema de colores con fondo crema/beige (`#f5f5f5`) y texto dark navy (`#1f2937`) aplicado mediante colores hardcoded en `colombia-mix.css`, igual que en `panico-disforico.css`. Los tokens de `variables.css` están definidos para el tema oscuro por defecto; el tema claro sobreescribe colores directamente en la hoja de estilos específica.
- **Tema_Light**: Configuración `data-theme="light"` aplicada al elemento `<html>` que señaliza el esquema de colores claro en la pantalla.
- **Viewport**: Área visible del navegador en el dispositivo del usuario.
- **Tokens_Diseño**: Conjunto de variables CSS definidas en `src/styles/variables.css` que establecen tipografía, espaciado y dimensiones del sitio. Los tokens de color de `variables.css` corresponden al tema oscuro; los colores del tema claro se definen como valores literales en `colombia-mix.css`, siguiendo el mismo patrón de `panico-disforico.css`.
- **BEM**: Metodología de nomenclatura CSS Block Element Modifier utilizada en las clases del proyecto (ej. `colombia-mix__title`).

## Requirements

### Requirement 1: Estructura general de la Pantalla_Colombia_Mix

**User Story:** Como visitante del sitio, quiero ver una pantalla dedicada al proyecto "Colombia Mix" con estructura clara y jerárquica, para explorar cómodamente la sinopsis e imagen del proyecto.

#### Acceptance Criteria

1. THE Pantalla_Colombia_Mix SHALL presentar los elementos en el siguiente orden vertical: Header, Etiqueta_Categoría, Título_Página, Sección_Descripción, Sección_Hero, Botón_CTA, Tab_Bar, Footer.
2. THE Pantalla_Colombia_Mix SHALL existir como un archivo HTML independiente en `src/pages/colombia-mix.html`.
3. THE Pantalla_Colombia_Mix SHALL cargar el Header mediante `loadComponent('#header-placeholder', '../components/header.html')`, el Menú_Navegación mediante `loadComponent('#nav-placeholder', '../components/nav.html')` y el Footer mediante `loadComponent('#footer-placeholder', '../components/footer.html')`, siguiendo el mismo patrón de inicialización que `src/pages/panico-disforico.html`.
4. THE Pantalla_Colombia_Mix SHALL ocupar el 100% del ancho del Viewport sin generar scroll horizontal en anchos de 320px a 1920px.
5. WHILE el ancho del Viewport sea mayor o igual a 320px, THE Pantalla_Colombia_Mix SHALL mostrar la Etiqueta_Categoría, el Título_Página, la Sección_Descripción, la Sección_Hero y el Botón_CTA sin superposición de contenido y sin texto truncado por desbordamiento.
6. THE Pantalla_Colombia_Mix SHALL incluir un archivo de estilos específico `src/styles/colombia-mix.css` enlazado en el `<head>` del documento HTML.
7. THE Pantalla_Colombia_Mix SHALL incluir las hojas de estilos `src/styles/variables.css`, `src/styles/main.css` y `src/styles/components.css` en el `<head>`, en ese orden, antes de `src/styles/colombia-mix.css`.
8. THE Pantalla_Colombia_Mix SHALL cargar el script principal mediante `<script type="module" src="../js/main.js"></script>` al final del `<body>`.

### Requirement 2: Tema claro como configuración predeterminada

**User Story:** Como visitante del sitio, quiero que la pantalla de Colombia Mix utilice un esquema de colores claro y cálido, para disfrutar de una experiencia visual adecuada al tono cómico y festivo del proyecto.

#### Acceptance Criteria

1. WHEN la Pantalla_Colombia_Mix se carga por primera vez, THE Pantalla_Colombia_Mix SHALL aplicar el Tema_Light estableciendo el atributo `data-theme="light"` en el elemento `<html>`, sin requerir interacción del usuario y sin depender de la preferencia del sistema operativo.
2. THE Pantalla_Colombia_Mix SHALL aplicar un fondo claro mediante la regla `body { background-color: #f5f5f5; }` en `colombia-mix.css`, siendo `#f5f5f5` el único color literal permitido fuera de los hardcoded del tema light, garantizando visibilidad en caso de fallo al cargar la hoja de estilos de variables.
3. THE Pantalla_Colombia_Mix SHALL aplicar color de texto dark navy (`#1f2937`) al Título_Página y color gris-azulado (`#6b7280`) a los párrafos de la Sección_Descripción, usando colores hardcoded en `colombia-mix.css` tal como hace `panico-disforico.css`.
4. THE Pantalla_Colombia_Mix SHALL utilizar los Tokens_Diseño de `src/styles/variables.css` para tipografía (`--font-heading`, `--font-body`), espaciado (`--spacing-xs`, `--spacing-sm`, `--spacing-md`) y dimensiones (`--nav-height`), sin redefinir estos valores en `src/styles/colombia-mix.css`.
5. THE Pantalla_Colombia_Mix SHALL mantener una relación de contraste mínima de 4.5:1 entre el color de texto principal y el color de fondo claro, conforme a WCAG 2.1 nivel AA.
6. IF la hoja de estilos `src/styles/variables.css` no se carga correctamente, THEN THE Pantalla_Colombia_Mix SHALL mostrar el contenido de texto con el color por defecto del navegador sobre el fondo claro de respaldo, sin ocultar ni colapsar ninguna sección de la página.

### Requirement 3: Header con Logo y Botón_Hamburguesa

**User Story:** Como visitante del sitio, quiero ver el logo del estudio y acceder al menú de navegación desde la pantalla de Colombia Mix, para orientarme y navegar fácilmente hacia otras secciones.

#### Acceptance Criteria

1. THE Header SHALL posicionarse con `position: fixed` en la parte superior del Viewport con altura de 64px (`--nav-height`), `z-index` de 1000, y fondo claro consistente con el Tema_Light, permaneciendo visible durante el scroll vertical.
2. THE Header SHALL mostrar el Logo con el texto "NOUS·" alineado al lado izquierdo, funcionando como enlace a `home.html` con atributo `aria-label` establecido a "NOUS CONCEPTS - Inicio".
3. WHILE el ancho del Viewport es menor o igual a 1024px, THE Header SHALL mostrar el Botón_Hamburguesa alineado al lado derecho con un área táctil mínima de 44×44px y ocultar los enlaces de navegación horizontal.
4. WHILE el ancho del Viewport es mayor a 1024px, THE Header SHALL ocultar el Botón_Hamburguesa y mostrar los enlaces de navegación en disposición horizontal con `display: flex`.
5. WHEN el usuario activa el Botón_Hamburguesa con el atributo `aria-expanded` en "false", THE Header SHALL establecer `aria-expanded` a "true", actualizar `aria-label` a "Cerrar menú" y despachar un `CustomEvent` de tipo `menu-toggle` en `document` con `detail.state` igual a "open".
6. WHEN el usuario activa el Botón_Hamburguesa con el atributo `aria-expanded` en "true", THE Header SHALL establecer `aria-expanded` a "false", actualizar `aria-label` a "Abrir menú" y despachar un `CustomEvent` de tipo `menu-toggle` en `document` con `detail.state` igual a "close".
7. THE Botón_Hamburguesa SHALL incluir el atributo `aria-controls` con valor igual al id del Menú_Navegación que controla, y el atributo `type` establecido a "button".

### Requirement 4: Etiqueta de categoría

**User Story:** Como visitante del sitio, quiero ver una etiqueta que identifique el tipo de proyecto presentado, para clasificar rápidamente "Colombia Mix" dentro del catálogo de Nous Concepts.

#### Acceptance Criteria

1. THE Etiqueta_Categoría SHALL mostrar el texto "ANTOLOGÍA MUSICAL" en mayúsculas mediante un elemento `<span>` con clase BEM `colombia-mix__label`.
2. THE Etiqueta_Categoría SHALL ubicarse como primer elemento dentro del contenedor de contenido `.colombia-mix__content`, antes del Título_Página.
3. THE Etiqueta_Categoría SHALL aplicar un tamaño de fuente menor al del cuerpo de texto, usando el valor literal `0.75rem` (equivalente a `--font-size-sm` que no está definido en `variables.css`), y un espaciado entre letras (`letter-spacing`) de al menos 0.1em para reforzar la apariencia de etiqueta en mayúsculas.
4. THE Etiqueta_Categoría SHALL aplicar el color `#6b7280` (gris-azulado del tema light), coherente con el valor usado en `panico-disforico.css`.
5. IF el texto de la Etiqueta_Categoría supera el ancho del contenedor, THEN THE Etiqueta_Categoría SHALL truncarse con elipsis (`text-overflow: ellipsis`) sin romper el layout de los elementos adyacentes.

### Requirement 5: Título principal

**User Story:** Como visitante del sitio, quiero ver el título "Colombia Mix" de forma destacada, para identificar inmediatamente de qué proyecto se trata en esta pantalla.

#### Acceptance Criteria

1. THE Título_Página SHALL mostrar el texto "Colombia Mix" utilizando un elemento `<h1>` con clase BEM `colombia-mix__title`.
2. THE Título_Página SHALL utilizar la tipografía `--font-heading` y un peso de fuente en negrita (700 o `bold`).
3. THE Título_Página SHALL aplicar color dark navy `#1f2937`, con contraste mínimo de 4.5:1 sobre el fondo claro `#f5f5f5`.
4. WHILE el ancho del Viewport es menor o igual a 768px, THE Título_Página SHALL utilizar el tamaño de fuente `--font-size-xl` (2rem).
5. WHILE el ancho del Viewport es mayor a 768px, THE Título_Página SHALL utilizar el tamaño de fuente `--font-size-hero` (3.5rem).
6. THE Título_Página SHALL ser el único elemento `<h1>` de la Pantalla_Colombia_Mix, estableciendo la jerarquía de encabezados de la página.
7. THE Título_Página SHALL ubicarse debajo de la Etiqueta_Categoría y separado de ella mediante el sistema de `gap` del contenedor flexible, siguiendo el patrón de `panico-disforico.css`.

### Requirement 6: Sección de descripción/sinopsis

**User Story:** Como visitante del sitio, quiero leer la sinopsis del proyecto Colombia Mix, para conocer el tono, género y argumento del proyecto antes de explorar más contenido.

#### Acceptance Criteria

1. THE Sección_Descripción SHALL mostrar el siguiente texto exacto en un elemento `<p>` con clase `colombia-mix__description`: "Una comedia social, centrada en una familia disfuncional del caribe Colombiano, que vive todo tipo de historias hilarantes mientras retrata entre risas la terrible realidad contemporanea."
2. THE Sección_Descripción SHALL aplicar una altura de línea (`line-height`) de 1.6 para garantizar legibilidad.
3. THE Sección_Descripción SHALL utilizar el color `#6b7280` (gris-azulado del tema light, igual que la Etiqueta_Categoría y `.panico-disforico__description`).
4. WHILE el ancho del Viewport es menor o igual a 768px, THE Sección_Descripción SHALL utilizar el tamaño de fuente `--font-size-base` (1rem).
5. WHILE el ancho del Viewport es mayor a 768px, THE Sección_Descripción SHALL utilizar el tamaño de fuente `--font-size-lg` (1.25rem).
6. THE Sección_Descripción SHALL estar contenida dentro del contenedor `.colombia-mix__content`, siguiendo el flujo vertical junto con la Etiqueta_Categoría, el Título_Página y el resto de elementos.
7. THE Sección_Descripción SHALL mantener un ancho máximo de 720px impuesto por el contenedor `.colombia-mix__content`, centrado horizontalmente mediante `margin-inline: auto`.

### Requirement 7: Imagen Hero

**User Story:** Como visitante del sitio, quiero ver la imagen ilustrativa del proyecto Colombia Mix, para tener una referencia visual inmediata del estilo gráfico de cómic/historieta del proyecto.

#### Acceptance Criteria

1. THE Imagen_Hero SHALL renderizarse dentro de un elemento `<div>` con clase `colombia-mix__hero-wrapper`, que a su vez está dentro de `.colombia-mix__content`.
2. THE Imagen_Hero SHALL utilizar un elemento `<img>` con clase `colombia-mix__hero`, atributo `src` apuntando a `../assets/images/contenidos/colombia-mix/hero.webp`, y un atributo `alt` descriptivo entre 10 y 125 caracteres que mencione el estilo de ilustración cómic en blanco y negro y el lettering "COLOMBIA MIX".
3. THE Imagen_Hero SHALL renderizarse con `width: 100%` y `height: auto` dentro de su contenedor, manteniendo el aspect-ratio original sin desbordamiento horizontal en cualquier tamaño de Viewport entre 320px y 1920px. El contenedor `.colombia-mix__hero-wrapper` usará `width: 100%` sin `aspect-ratio` fijo, igual que `.panico-disforico__hero-wrapper`, para respetar el ratio natural de la imagen.
4. THE Imagen_Hero SHALL aplicar `border-radius: 8px` para coherencia con el estilo visual del sitio (igual que en `panico-disforico.css`).
5. THE Imagen_Hero SHALL incluir `display: block` para eliminar el espacio blanco inferior generado por la alineación de línea base de los elementos `<img>`.
6. IF la Imagen_Hero no puede ser cargada (archivo no encontrado o error de red), THEN THE Pantalla_Colombia_Mix SHALL mostrar el texto alternativo del atributo `alt` dentro del espacio del contenedor, sin colapsar el layout de las secciones adyacentes.

### Requirement 8: Botón CTA "Más Contenido →"

**User Story:** Como visitante del sitio, quiero tener un enlace destacado que me lleve a más contenido relacionado con Colombia Mix, para explorar el proyecto con mayor profundidad desde la pantalla de inicio del contenido.

#### Acceptance Criteria

1. THE Botón_CTA SHALL renderizarse como un elemento `<a>` con clase `colombia-mix__cta`, con el texto visible "Más Contenido →" y el atributo `href` establecido a `contenidos.html#colombia-mix`.
2. THE Botón_CTA SHALL aplicar estilos de botón pill (redondeado) con `border-radius: 24px`, fondo `#1e3a5f` y texto blanco `#ffffff`, igual que `.panico-disforico__cta`.
3. THE Botón_CTA SHALL alinearse horizontalmente al centro de su contenedor mediante `align-self: center` (al ser hijo de un flex container con `flex-direction: column`).
4. THE Botón_CTA SHALL aplicar `padding: var(--spacing-xs) var(--spacing-md)` (0.5rem 2rem) para garantizar un área de toque mínima de 44px de altura en dispositivos móviles.
5. WHEN el Botón_CTA recibe el foco del teclado, THE Botón_CTA SHALL mostrar un indicador de foco visible mediante `outline: 2px solid var(--color-accent)` con `outline-offset: 2px`. El token `--color-accent` está definido en `variables.css` como `#e94560`.
6. WHEN el usuario activa el Botón_CTA, THE Pantalla_Colombia_Mix SHALL navegar a `contenidos.html` con el fragmento `#colombia-mix` posicionando la vista en la sección correspondiente de esa página.
7. THE Botón_CTA SHALL incluir el atributo `aria-label` con valor "Ver más contenido de Colombia Mix" para lectores de pantalla que necesiten contexto adicional sobre el destino del enlace.

### Requirement 9: Barra de navegación inferior (Tab Bar)

**User Story:** Como visitante del sitio en dispositivo móvil, quiero ver una barra de navegación inferior con los accesos principales del sitio, para cambiar de sección de forma rápida y directa con el pulgar.

#### Acceptance Criteria

1. THE Tab_Bar SHALL renderizarse como un elemento `<nav>` con clase `tab-bar` y atributo `aria-label="Navegación de secciones"`, posicionado con `position: fixed` en la parte inferior del Viewport (`bottom: 0`) con altura de 56px y `z-index: 100`.
2. THE Tab_Bar SHALL contener exactamente tres ítems de navegación (`<a>` con clase `tab-bar__item`): "Inicio" enlazando a `home.html`, "Contenido" enlazando a `contenidos.html`, y "Nosotros" enlazando a `presentacion.html`.
3. THE Tab_Bar SHALL marcar el ítem "Contenido" como activo mediante la clase adicional `tab-bar__item--active`, reflejando que el usuario se encuentra en una pantalla de contenido.
4. THE Tab_Bar SHALL mostrar en el ítem activo "Contenido" el ícono de play (`<svg>` con círculo y triángulo) con el color `#1e3a5f`, y en los ítems inactivos íconos de trazo con color `#9ca3af`, igual que en `panico-disforico.css`.
5. THE Tab_Bar SHALL aplicar fondo blanco (`background-color: #ffffff`) y borde superior (`border-top: 1px solid #e5e7eb`) para delimitarse visualmente del contenido de la página.
6. WHILE el ancho del Viewport es mayor a 768px, THE Tab_Bar SHALL ocultarse mediante `display: none`, ya que la navegación en desktop/tablet se realiza a través del Header.
7. THE Tab_Bar SHALL garantizar que cada ítem tenga un área táctil mínima de 44×44px mediante padding o altura mínima, para facilitar la interacción en dispositivos táctiles.
8. THE Tab_Bar SHALL incluir en cada ítem `<a>` un atributo `aria-label` descriptivo: "Ir a Inicio", "Ir a Contenidos (activo)" para el ítem activo, e "Ir a Nosotros".
9. THE Tab_Bar SHALL separar el contenido de la Pantalla_Colombia_Mix del borde inferior del Viewport mediante un `padding-bottom` de al menos 72px en el elemento `<main>`, para que el Botón_CTA y la Sección_Hero no queden ocultos detrás de la Tab_Bar.

### Requirement 10: Diseño mobile-first y responsivo

**User Story:** Como visitante del sitio desde un dispositivo móvil, quiero que la pantalla de Colombia Mix esté optimizada para pantallas pequeñas y se adapte correctamente a pantallas más grandes, para tener una experiencia de lectura y visualización cómoda en cualquier dispositivo.

#### Acceptance Criteria

1. THE Pantalla_Colombia_Mix SHALL definir los estilos base (sin media query) aplicando al contenedor `.colombia-mix` un `padding-top` de 96px (equivalente a `--nav-height` 64px más `--spacing-md` 32px, expresado como valor calculado o literal), `padding-inline` de `--spacing-sm` (1rem), y `padding-bottom` de 72px para dejar espacio sobre la Tab_Bar.
2. THE Pantalla_Colombia_Mix SHALL definir el contenedor `.colombia-mix__content` con `max-width: 720px`, `margin-inline: auto` y `display: flex; flex-direction: column; gap: var(--spacing-md)` en los estilos base.
3. WHILE el ancho del Viewport es mayor a 768px, THE Pantalla_Colombia_Mix SHALL aplicar `padding-inline: var(--spacing-md)` (2rem) al contenedor `.colombia-mix` y escalar el Título_Página a `--font-size-hero` (3.5rem).
4. WHILE el ancho del Viewport es mayor a 768px, THE Pantalla_Colombia_Mix SHALL ocultar la Tab_Bar y reducir el `padding-bottom` del elemento `<main>` al valor `--spacing-md` (2rem), ya que la navegación en esas dimensiones se realiza mediante el Header.
5. THE Pantalla_Colombia_Mix SHALL utilizar el breakpoint de 769px como umbral único para las variaciones responsivas de tipografía, espaciado y visibilidad de la Tab_Bar, sin definir media queries adicionales a otros valores de ancho distintos de este umbral.
6. THE Pantalla_Colombia_Mix SHALL restringir el ancho de la Imagen_Hero al 100% del ancho de su contenedor con `height: auto`, para que la imagen mantenga su aspect-ratio original sin desbordamiento horizontal en cualquier tamaño de Viewport.
7. THE Pantalla_Colombia_Mix SHALL incluir la meta etiqueta `<meta name="viewport" content="width=device-width, initial-scale=1.0">` en el `<head>` del documento HTML, para que el navegador móvil renderice la página al ancho real del dispositivo.

### Requirement 11: Accesibilidad de la pantalla

**User Story:** Como visitante del sitio que utiliza tecnologías de asistencia, quiero que todos los elementos de la pantalla de Colombia Mix sean accesibles, para navegar e interactuar con el contenido de forma independiente.

#### Acceptance Criteria

1. THE Pantalla_Colombia_Mix SHALL utilizar un elemento `<main>` con `id="main-content"` y atributo `aria-label="Colombia Mix — Antología Musical"`.
2. THE Pantalla_Colombia_Mix SHALL incluir un enlace de salto `<a href="#main-content" class="visually-hidden">Saltar al contenido principal</a>` como primer elemento hijo del `<body>`, para que los usuarios de teclado y lectores de pantalla puedan omitir el Header.
3. THE Título_Página SHALL ser el único elemento `<h1>` de la Pantalla_Colombia_Mix, estableciendo correctamente la jerarquía de encabezados sin saltar niveles.
4. THE Pantalla_Colombia_Mix SHALL permitir que todos los elementos interactivos (Logo, Botón_Hamburguesa, Botón_CTA y ítems de la Tab_Bar) sean alcanzables mediante la tecla Tab en un orden lógico de arriba hacia abajo.
5. WHILE un elemento interactivo recibe el foco del teclado, THE Pantalla_Colombia_Mix SHALL mostrar un indicador de foco visible con grosor mínimo de 2px y contraste mínimo de 3:1 respecto al fondo adyacente.
6. WHILE un elemento `<a>` tiene el foco del teclado, THE Pantalla_Colombia_Mix SHALL permitir su activación mediante la tecla Enter. WHILE un elemento `<button>` tiene el foco del teclado, THE Pantalla_Colombia_Mix SHALL permitir su activación mediante las teclas Enter o Espacio.
7. THE Imagen_Hero SHALL incluir un atributo `alt` con texto descriptivo entre 10 y 125 caracteres que describa el contenido visual de la ilustración, incluyendo referencia al estilo cómic en blanco y negro y al lettering "COLOMBIA MIX".
8. THE Pantalla_Colombia_Mix SHALL mantener contraste mínimo de 4.5:1 entre el color de texto principal y el color de fondo claro, cumpliendo WCAG 2.1 nivel AA.
9. WHEN los componentes Header, Menú_Navegación y Footer se cargan dinámicamente mediante JavaScript, THE Pantalla_Colombia_Mix SHALL mantener todos los atributos ARIA (`aria-label`, `aria-expanded`, `aria-controls`) y roles definidos en los componentes fuente, siendo los elementos interactivos inyectados alcanzables mediante teclado sin requerir recarga de la página.
10. THE Tab_Bar SHALL asegurar que el ítem activo "Contenido" sea perceptible mediante lectores de pantalla a través del atributo `aria-label` que incluya el estado "(activo)" en español.

### Requirement 12: Metadatos y SEO básico

**User Story:** Como administrador del sitio, quiero que la pantalla de Colombia Mix incluya los metadatos básicos correctos, para garantizar una representación adecuada en resultados de búsqueda y al compartir en redes sociales.

#### Acceptance Criteria

1. THE Pantalla_Colombia_Mix SHALL incluir en el `<head>` un elemento `<title>` con el valor "Colombia Mix — NOUS CONCEPTS".
2. THE Pantalla_Colombia_Mix SHALL incluir el atributo `lang="es"` en el elemento `<html>`, para indicar correctamente el idioma del contenido a navegadores y tecnologías de asistencia.
3. THE Pantalla_Colombia_Mix SHALL incluir la meta etiqueta `<meta charset="UTF-8">` como primera línea del `<head>`, antes de cualquier otro elemento.

## Correctness Properties

Las siguientes propiedades de corrección están destinadas a ser verificadas mediante pruebas basadas en propiedades (Property-Based Testing) utilizando Vitest con fast-check.

### Propiedad CP-1: Invariante de estructura DOM

**Descripción:** La estructura jerárquica de la Pantalla_Colombia_Mix debe preservar el orden correcto de los elementos independientemente del ancho del Viewport simulado.

**Patrón:** Invariante de estructura

**Propiedad:** Para cualquier configuración de ancho de Viewport entre 320px y 1920px, el DOM renderizado de `colombia-mix.html` SHALL contener, en orden, los selectores CSS: `[data-theme="light"]`, `#header-placeholder`, `#nav-placeholder`, `main.colombia-mix`, `.colombia-mix__label`, `h1.colombia-mix__title`, `.colombia-mix__description`, `.colombia-mix__hero-wrapper`, `a.colombia-mix__cta`, `nav.tab-bar`, `#footer-placeholder`.

**Decisión PBT:** Sí — la estructura DOM varía con anchos (Tab_Bar se oculta en desktop) y 100 iteraciones comprueban edge cases de breakpoints intermedios que pruebas puntuales no cubren.

---

### Propiedad CP-2: Round-trip de carga de componentes dinámicos

**Descripción:** El mecanismo `loadComponent` debe insertar exactamente el HTML del componente en el placeholder, sin pérdida ni duplicación de contenido, de forma idempotente.

**Patrón:** Round-trip / Idempotencia

**Propiedad:** PARA CUALQUIER componente HTML válido `C` cargado mediante `loadComponent(selector, path)`, el contenido interno del nodo `document.querySelector(selector)` después de la carga SHALL ser igual al contenido de `C`, y una segunda invocación de `loadComponent` con los mismos argumentos SHALL producir el mismo resultado que la primera (idempotencia). `loadComponent` es exportada desde `main.js` y puede importarse directamente en los tests.

**Decisión PBT:** Sí — el comportamiento de inserción varía con el contenido del componente (distintas longitudes, atributos, nodos anidados) y se puede simular con HTML generado aleatoriamente en memoria sin llamadas externas costosas.

---

### Propiedad CP-3: Invariante de atributos ARIA tras carga dinámica

**Descripción:** Los atributos ARIA del Botón_Hamburguesa deben mantenerse consistentes tras múltiples ciclos de apertura/cierre del menú.

**Patrón:** Invariante / Metamórfico

**Propiedad:** PARA CUALQUIER secuencia de N activaciones del Botón_Hamburguesa (donde N ≥ 1), el valor de `aria-expanded` después de N activaciones SHALL ser "true" si N es impar y "false" si N es par, y el valor de `aria-label` SHALL ser "Cerrar menú" cuando `aria-expanded` es "true" y "Abrir menú" cuando `aria-expanded` es "false". Esta invariante SHALL mantenerse para todo N entre 1 y 100.

**Decisión PBT:** Sí — el estado es una función determinista del número de activaciones, y probar con N arbitrario entre 1 y 100 garantiza que no existe ningún estado intermedio roto.

---

### Propiedad CP-4: Invariante de visibilidad de Tab_Bar vs Header

**Descripción:** La Tab_Bar y los controles de navegación del Header deben tener visibilidad mutuamente complementaria según el Viewport.

**Patrón:** Metamórfico / Invariante

**Propiedad:** PARA CUALQUIER ancho de Viewport W, si W ≤ 768px entonces la Tab_Bar SHALL tener `display` distinto de "none" y el Botón_Hamburguesa SHALL ser visible; si W > 768px entonces la Tab_Bar SHALL tener `display: none`. Esta propiedad SHALL mantenerse para cualquier valor entero de W entre 320px y 1920px.

**Decisión PBT:** Sí — el comportamiento varía de forma continua con W y es fácil de verificar sin llamadas externas. 100 iteraciones con W aleatorio cubren valores en torno al breakpoint donde las pruebas de ejemplo tienden a fallar.

---

### Propiedad CP-5: Invariante del texto del Botón_CTA

**Descripción:** El texto del Botón_CTA y su destino de navegación deben ser coherentes e invariantes independientemente del estado de la página.

**Patrón:** Invariante

**Propiedad:** En cualquier estado de la Pantalla_Colombia_Mix (menú abierto, menú cerrado, cualquier posición de scroll), el elemento `a.colombia-mix__cta` SHALL tener `textContent` que incluya el texto "Más Contenido" y el atributo `href` SHALL contener el fragmento "colombia-mix". Esta invariante SHALL verificarse en al menos 50 estados distintos simulados mediante variaciones en los atributos del DOM.

**Decisión PBT:** Sí — el contenido del botón podría verse afectado por manipulaciones del DOM (ej. inyección de scripts de terceros o efectos secundarios de loadComponent) y verificarlo en múltiples estados detecta regresiones no aparentes en pruebas de ejemplo estáticas.
