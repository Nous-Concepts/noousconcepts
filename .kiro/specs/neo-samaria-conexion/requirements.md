# Requirements Document

## Introduction

Esta especificación define los requisitos para la pantalla "Neo Samaria Conexión" del sitio web "Nous Concepts" en modo oscuro con diseño mobile-first. La pantalla presenta el contenido de un proyecto original de ciencia ficción ambientado en el Caribe colombiano, incluyendo un título, sinopsis textual e imágenes promocionales.

La pantalla se basa en un boceto wireframe mobile-first que muestra: un Header superior con Logo a la izquierda y menú hamburguesa a la derecha, un título "Neo Samaria Conexión" centrado, bloques de texto con la sinopsis del proyecto, y dos imágenes intercaladas con el contenido textual.

La pantalla reutiliza los tokens de diseño (variables CSS) y los patrones de Header/navegación ya definidos en las especificaciones existentes (`home-dark-mode-screen`, `header-dark-mode-home`, `mobile-menu-fullscreen`), garantizando coherencia visual y de comportamiento en todo el sitio.

NO se incluye ninguna sección "En Construcción".

### Propuesta de diagramación (basada en el boceto)

```
┌───────────────────────────────────────┐
│  Logo                            ☰     │  ← Header fijo (64px)
├───────────────────────────────────────┤
│                                         │
│        Neo Samaria Conexión             │  ← Título centrado
│                                         │
│  En una época donde lo poco que queda   │
│  de humanidad ha sido esclavizada por   │  ← Sinopsis (párrafo)
│  un sistema totalitario corporativo...  │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │         Imagen Hero              │   │  ← Imagen principal
│  └─────────────────────────────────┘   │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │         Imagen Secundaria        │   │  ← Imagen secundaria
│  └─────────────────────────────────┘   │
│                                         │
└───────────────────────────────────────┘
```

## Glossary

- **Pantalla_Neo_Samaria**: Página del sitio web Nous Concepts que presenta el proyecto original "Neo Samaria Conexión", compuesta por Header, Título_Página, Sección_Sinopsis y Sección_Imágenes.
- **Header**: Componente fijo superior que contiene el Logo a la izquierda y el Botón_Hamburguesa a la derecha, definido en `src/components/header.html`. Es el mismo componente reutilizado en las demás pantallas del sitio.
- **Logo**: Enlace de marca con el texto "NOUS CONCEPTS" alineado al lado izquierdo del Header, que dirige a la página de inicio.
- **Botón_Hamburguesa**: Botón compuesto por tres líneas horizontales paralelas, alineado al lado derecho del Header, que abre y cierra el menú de navegación.
- **Menú_Navegación**: Panel de navegación desplegable definido en `src/components/nav.html` que muestra los enlaces del sitio al activarse el Botón_Hamburguesa.
- **Título_Página**: Encabezado principal (h1) con el texto "Neo Samaria Conexión" centrado horizontalmente, ubicado debajo del Header.
- **Sección_Sinopsis**: Bloque de texto (uno o más párrafos) que presenta la sinopsis del proyecto Neo Samaria Conexión.
- **Sección_Imágenes**: Área que contiene las imágenes promocionales del proyecto (imagen hero/banner y imagen secundaria).
- **Imagen_Hero**: Imagen principal del proyecto Neo Samaria Conexión que funciona como banner visual.
- **Imagen_Secundaria**: Segunda imagen del proyecto que complementa la presentación visual.
- **Modo_Oscuro**: Esquema de colores con fondo oscuro (`--color-bg`, #0f0f1a) y texto claro (`--color-text`, #eaeaea) definido en las variables CSS del proyecto (`src/styles/variables.css`).
- **Viewport**: Área visible del navegador en el dispositivo del usuario.
- **Tokens_Diseño**: Conjunto de variables CSS definidas en `src/styles/variables.css` que establecen colores, tipografía, espaciado y dimensiones del sitio.

## Requirements

### Requirement 1: Estructura general de la Pantalla_Neo_Samaria

**User Story:** Como visitante del sitio, quiero ver una pantalla dedicada al proyecto "Neo Samaria Conexión" con estructura clara y jerárquica, para explorar cómodamente la sinopsis e imágenes del proyecto.

#### Acceptance Criteria

1. THE Pantalla_Neo_Samaria SHALL presentar los elementos en el siguiente orden vertical: Header, Título_Página, Sección_Sinopsis, Sección_Imágenes.
2. THE Pantalla_Neo_Samaria SHALL existir como un archivo HTML independiente en `src/pages/neo-samaria-conexion.html`.
3. THE Pantalla_Neo_Samaria SHALL cargar el Header mediante una llamada a `loadComponent('#header-placeholder', '../components/header.html')` y el Menú_Navegación mediante `loadComponent('#nav-placeholder', '../components/nav.html')`, siguiendo el mismo patrón de inicialización que las demás páginas del sitio.
4. THE Pantalla_Neo_Samaria SHALL ocupar el 100% del ancho del Viewport sin generar scroll horizontal en anchos de 320px a 1920px.
5. WHILE el ancho del Viewport sea mayor o igual a 320px, THE Pantalla_Neo_Samaria SHALL mostrar el Título_Página, la Sección_Sinopsis y la Sección_Imágenes sin superposición de contenido y sin texto truncado por desbordamiento.
6. THE Pantalla_Neo_Samaria SHALL incluir un archivo de estilos específico `src/styles/neo-samaria-conexion.css` enlazado en el documento HTML.

### Requirement 2: Modo oscuro como tema predeterminado

**User Story:** Como visitante del sitio, quiero que la pantalla de Neo Samaria Conexión utilice un esquema de colores oscuro, para tener una experiencia visual coherente con el resto del sitio de Nous Concepts.

#### Acceptance Criteria

1. WHEN la Pantalla_Neo_Samaria se carga por primera vez, THE Pantalla_Neo_Samaria SHALL aplicar el Modo_Oscuro estableciendo el atributo `data-theme="dark"` en el elemento `<html>`, sin requerir interacción del usuario, sin depender de la preferencia del sistema operativo y sin utilizar la media query `prefers-color-scheme`.
2. THE Pantalla_Neo_Samaria SHALL aplicar la variable CSS `--color-bg` como color de fondo del elemento `body` y de todos los elementos con la clase `.section` contenidos en la página.
3. THE Pantalla_Neo_Samaria SHALL aplicar la variable CSS `--color-text` como color de texto del Título_Página y de los párrafos de la Sección_Sinopsis.
4. THE Pantalla_Neo_Samaria SHALL utilizar los Tokens_Diseño definidos en `src/styles/variables.css` para todos los colores de fondo y de texto, sin definir valores de color literales en hojas de estilo fuera de dicho archivo de variables.
5. THE Pantalla_Neo_Samaria SHALL mantener una relación de contraste mínima de 4.5:1 entre el color de texto (`--color-text`) y el color de fondo (`--color-bg`) conforme a WCAG 2.1 nivel AA.
6. IF la hoja de estilos `src/styles/variables.css` no se carga correctamente, THEN THE Pantalla_Neo_Samaria SHALL mostrar el contenido de texto con el color por defecto del navegador sobre un fondo oscuro proporcionado por un valor de respaldo en la propiedad `background-color` del elemento `body`.

### Requirement 3: Header con Logo y menú hamburguesa

**User Story:** Como visitante del sitio, quiero ver el logo del estudio y acceder al menú de navegación desde la pantalla de Neo Samaria Conexión, para orientarme y navegar fácilmente.

#### Acceptance Criteria

1. THE Header SHALL posicionarse con `position: fixed` en la parte superior del Viewport con una altura de 64px definida por la variable `--nav-height`, un `z-index` de 1000 y `background-color` igual a `var(--color-primary)`, permaneciendo visible y superpuesto al contenido durante el scroll vertical.
2. THE Header SHALL mostrar el Logo con el texto "NOUS CONCEPTS" alineado al lado izquierdo, funcionando como enlace a `home.html` con el atributo `aria-label` establecido a "NOUS CONCEPTS - Inicio".
3. WHILE el ancho del Viewport es menor o igual a 1024px, THE Header SHALL mostrar el Botón_Hamburguesa alineado al lado derecho con un área táctil mínima de 44×44px y ocultar los enlaces de navegación horizontal.
4. WHILE el ancho del Viewport es mayor a 1024px, THE Header SHALL ocultar el Botón_Hamburguesa y mostrar los enlaces de navegación en disposición horizontal con `display: flex`.
5. WHEN el usuario activa el Botón_Hamburguesa estando el atributo `aria-expanded` en "false", THE Header SHALL establecer `aria-expanded` a "true", actualizar `aria-label` a "Cerrar menú" y despachar un `CustomEvent` de tipo `menu-toggle` en `document` con `detail.state` igual a "open".
6. WHEN el usuario activa el Botón_Hamburguesa estando el atributo `aria-expanded` en "true", THE Header SHALL establecer `aria-expanded` a "false", actualizar `aria-label` a "Abrir menú" y despachar un `CustomEvent` de tipo `menu-toggle` en `document` con `detail.state` igual a "close".
7. THE Botón_Hamburguesa SHALL incluir el atributo `aria-controls` con valor igual al id del elemento Menú_Navegación que controla, y el atributo `type` establecido a "button".

### Requirement 4: Título de la página centrado

**User Story:** Como visitante del sitio, quiero ver un título claro que identifique el proyecto "Neo Samaria Conexión", para saber qué contenido estoy explorando.

#### Acceptance Criteria

1. THE Título_Página SHALL mostrar el texto "Neo Samaria Conexión" utilizando un elemento `<h1>`.
2. THE Título_Página SHALL alinearse horizontalmente al centro de su contenedor mediante `text-align: center`.
3. THE Título_Página SHALL ubicarse debajo del Header fijo, con un padding-top mínimo de 96px (equivalente a `--nav-height` de 64px más `--spacing-md` de 32px) para garantizar que ninguna parte del título quede oculta por el Header.
4. THE Título_Página SHALL utilizar la tipografía definida en `--font-heading` y el color `--color-text`.
5. WHILE el ancho del Viewport es menor o igual a 768px, THE Título_Página SHALL utilizar el tamaño de fuente `--font-size-xl` (2rem).
6. WHILE el ancho del Viewport es mayor a 768px, THE Título_Página SHALL utilizar el tamaño de fuente `--font-size-hero` (3.5rem).
7. THE Título_Página SHALL ser el primer elemento de contenido visible dentro del `<main>`, de modo que el visitante lo identifique como encabezado principal de la página sin necesidad de hacer scroll.

### Requirement 5: Sección de sinopsis textual

**User Story:** Como visitante del sitio, quiero leer la sinopsis del proyecto Neo Samaria Conexión, para conocer la trama y el universo narrativo del proyecto.

#### Acceptance Criteria

1. THE Sección_Sinopsis SHALL mostrar el texto completo de la sinopsis: "En una época donde lo poco que queda de humanidad ha sido esclavizada por un sistema totalitario corporativo terriblemente materialista, un esclavo super humano creado por el todo poderoso 'Marques' se rebela, para unirse a una débil resistencia que es la esperanza de los desesperados habitantes de Neo Samaria, LA ULTIMA CIUDAD DEL CARIBE COLOMBIANO."
2. THE Sección_Sinopsis SHALL limitar el ancho máximo del bloque de texto a 720px y centrarlo horizontalmente mediante `margin-inline: auto`.
3. THE Sección_Sinopsis SHALL utilizar una altura de línea de 1.7 y alineación de texto a la izquierda (`text-align: left`) para el texto de los párrafos.
4. THE Sección_Sinopsis SHALL utilizar el color de texto `--color-text` sobre el color de fondo `--color-bg`.
5. WHILE el ancho del Viewport es mayor a 768px, THE Sección_Sinopsis SHALL utilizar el tamaño de fuente `--font-size-lg` (1.25rem) para el texto de los párrafos.
6. WHILE el ancho del Viewport es menor o igual a 768px, THE Sección_Sinopsis SHALL utilizar el tamaño de fuente `--font-size-base` (1rem) para el texto de los párrafos.
7. THE Sección_Sinopsis SHALL aplicar un padding-top de `--spacing-md` (2rem) para separar el contenido de la sección superior, y un padding-bottom de `--spacing-md` (2rem) para separar el contenido de la sección inferior.
8. THE Sección_Sinopsis SHALL estar contenida dentro de un elemento semántico `<section>` con un atributo `aria-label` que identifique la sección como sinopsis del proyecto.

### Requirement 6: Sección de imágenes del proyecto

**User Story:** Como visitante del sitio, quiero ver las imágenes promocionales del proyecto Neo Samaria Conexión, para tener una referencia visual del universo narrativo.

#### Acceptance Criteria

1. THE Sección_Imágenes SHALL contener dos elementos de imagen (`<img>`): la Imagen_Hero y la Imagen_Secundaria, presentados en orden vertical (uno debajo del otro) dentro de un contenedor con `display: flex; flex-direction: column`.
2. THE Sección_Imágenes SHALL mostrar cada imagen con un ancho del 100% del contenedor de contenido y un ancho máximo de 720px, centrada horizontalmente mediante `margin-inline: auto`.
3. THE Sección_Imágenes SHALL aplicar una separación vertical de `--spacing-md` (2rem) entre la Imagen_Hero y la Imagen_Secundaria.
4. THE Imagen_Hero SHALL incluir un atributo `alt` con un texto de al menos 10 caracteres y máximo 125 caracteres que describa el contenido visual específico de la imagen del proyecto.
5. THE Imagen_Secundaria SHALL incluir un atributo `alt` con un texto de al menos 10 caracteres y máximo 125 caracteres que describa el contenido visual específico de la imagen secundaria del proyecto.
6. WHILE las imágenes se cargan, THE Sección_Imágenes SHALL reservar el espacio vertical de cada imagen mediante un contenedor con `aspect-ratio` definido, para evitar desplazamiento del contenido (layout shift).
7. THE Sección_Imágenes SHALL almacenar las imágenes del proyecto en la ruta `src/assets/images/contenidos/neo-samaria/`.
8. THE Sección_Imágenes SHALL aplicar `border-radius` de 4px a cada imagen para coherencia con el estilo visual del sitio.
9. IF una imagen no puede ser cargada, THEN THE Sección_Imágenes SHALL mantener visible el texto alternativo (`alt`) dentro del espacio reservado por el contenedor, sin colapsar el layout de la sección.

### Requirement 7: Diseño mobile-first y responsivo

**User Story:** Como visitante del sitio desde un dispositivo móvil, quiero que la pantalla de Neo Samaria Conexión esté optimizada para pantallas pequeñas, para tener una experiencia de lectura y visualización cómoda.

#### Acceptance Criteria

1. THE Pantalla_Neo_Samaria SHALL definir los estilos base (sin media query) aplicando al Título_Página un tamaño de fuente de `--font-size-xl` (2rem) y al texto de la Sección_Sinopsis un tamaño de fuente de `--font-size-base` (1rem), de modo que estos estilos se apliquen en viewports con ancho menor o igual a 768px.
2. THE Pantalla_Neo_Samaria SHALL aplicar un padding horizontal igual a `--spacing-sm` (1rem) al contenedor de contenido en los estilos base.
3. WHILE el ancho del Viewport es mayor a 768px, THE Pantalla_Neo_Samaria SHALL escalar el Título_Página a `--font-size-hero` (3.5rem) y el texto de la Sección_Sinopsis a `--font-size-lg` (1.25rem).
4. THE Pantalla_Neo_Samaria SHALL utilizar el breakpoint de 768px (`--breakpoint-mobile`) como umbral único para las variaciones responsivas de tipografía y espaciado, sin definir media queries adicionales a otros valores de ancho.
5. WHILE el ancho del Viewport es mayor a 768px, THE Pantalla_Neo_Samaria SHALL aplicar un padding horizontal de `--spacing-md` (2rem) al contenedor de contenido.
6. THE Pantalla_Neo_Samaria SHALL restringir el ancho máximo de las imágenes al 100% del ancho de su contenedor y aplicar altura automática, de modo que las imágenes mantengan su aspect-ratio original sin desbordamiento horizontal en cualquier tamaño de Viewport.
7. THE Pantalla_Neo_Samaria SHALL incluir la meta etiqueta viewport con `width=device-width, initial-scale=1.0` para que el navegador móvil renderice la página al ancho real del dispositivo.

### Requirement 8: Accesibilidad de la pantalla

**User Story:** Como visitante del sitio que utiliza tecnologías de asistencia, quiero que todos los elementos de la pantalla de Neo Samaria Conexión sean accesibles, para navegar e interactuar con el contenido de forma independiente.

#### Acceptance Criteria

1. THE Pantalla_Neo_Samaria SHALL utilizar un elemento `<main>` como contenedor del contenido principal, con un atributo `aria-label` cuyo valor identifique la página como presentación del proyecto Neo Samaria Conexión.
2. THE Sección_Sinopsis SHALL estar contenida en un elemento semántico `<section>` con un atributo `aria-label` cuyo valor identifique el propósito de la sinopsis.
3. THE Sección_Imágenes SHALL estar contenida en un elemento semántico `<section>` con un atributo `aria-label` cuyo valor identifique la sección de imágenes del proyecto.
4. THE Título_Página SHALL ser el único elemento `<h1>` de la Pantalla_Neo_Samaria, estableciendo la jerarquía de encabezados de la página.
5. THE Pantalla_Neo_Samaria SHALL permitir que todos los elementos interactivos (Logo, Botón_Hamburguesa y enlaces de navegación) sean alcanzables mediante la tecla Tab en un orden de arriba hacia abajo y de izquierda a derecha: primero el Logo, luego el Botón_Hamburguesa (o enlaces de navegación del Header en Viewport mayor a 768px), y finalmente los enlaces dentro del Menú_Navegación si este se encuentra abierto.
6. WHILE un elemento interactivo recibe el foco del teclado, THE Pantalla_Neo_Samaria SHALL mostrar un indicador de foco visible con un grosor mínimo de 2px y un contraste mínimo de 3:1 respecto al fondo adyacente.
7. WHILE un elemento interactivo de tipo enlace (`<a>`) tiene el foco del teclado, THE Pantalla_Neo_Samaria SHALL permitir su activación mediante la tecla Enter. WHILE un elemento interactivo de tipo botón (`<button>`) tiene el foco del teclado, THE Pantalla_Neo_Samaria SHALL permitir su activación mediante las teclas Enter o Espacio.
8. THE Pantalla_Neo_Samaria SHALL mantener un contraste mínimo de 4.5:1 entre el texto (`--color-text`) y el fondo (`--color-bg`) cumpliendo el nivel AA de WCAG 2.1.
9. THE Imagen_Hero y la Imagen_Secundaria SHALL incluir atributos `alt` con un texto descriptivo de al menos 5 caracteres y máximo 150 caracteres que identifique el contenido visual representado en cada imagen.
10. WHEN los componentes Header y Menú_Navegación se cargan dinámicamente mediante JavaScript, THE Pantalla_Neo_Samaria SHALL mantener todos los atributos ARIA (`aria-label`, `aria-expanded`, `aria-controls`) y roles definidos en los componentes fuente, y los elementos interactivos inyectados SHALL ser alcanzables mediante teclado sin requerir recarga de la página.

### Requirement 9: Exclusión de sección "En Construcción"

**User Story:** Como visitante del sitio, quiero ver únicamente el contenido definitivo del proyecto, para tener una experiencia profesional y completa.

#### Acceptance Criteria

1. THE Pantalla_Neo_Samaria SHALL presentar exclusivamente las secciones definidas (Header, Título_Página, Sección_Sinopsis, Sección_Imágenes) sin incluir ningún elemento, texto, banner o sección que contenga alguna de las siguientes frases (en cualquier combinación de mayúsculas/minúsculas): "En Construcción", "Under Construction", "Coming Soon", "Próximamente", "Work in Progress", "Lorem Ipsum" o "Placeholder".
2. THE Pantalla_Neo_Samaria SHALL renderizar todas las imágenes de la Sección_Imágenes con un atributo `src` que apunte a un archivo de imagen existente, sin mostrar el icono de imagen rota del navegador ni imágenes en blanco con dimensiones de 0×0 píxeles.
3. THE Pantalla_Neo_Samaria SHALL renderizar el Título_Página con el texto definido en el Requirement 4, la Sección_Sinopsis con el texto definido en el Requirement 5, y la Sección_Imágenes con las dos imágenes definidas en el Requirement 6, sin omitir ninguno de estos elementos del DOM.
