# Requirements Document

## Introduction

Esta especificación define los requisitos para la Pantalla_Presentación (una nueva página "Presentación") del sitio web "Nous Concepts" en modo oscuro con diseño mobile-first. La pantalla se basa en un boceto a mano que muestra: un Header superior con Logo a la izquierda y menú hamburguesa a la derecha, un título "Presentación" alineado a la derecha debajo del Header, y un área principal de contenido textual (bloque de párrafos) que ocupa la mayor parte de la altura de la pantalla.

La pantalla reutiliza los tokens de diseño (variables CSS) y los patrones de Header/navegación ya definidos en las especificaciones existentes `home-dark-mode-screen`, `header-dark-mode-home` y `mobile-menu-fullscreen`, garantizando coherencia visual y de comportamiento en todo el sitio.

### Propuesta de diagramación (basada en el boceto)

```
┌───────────────────────────────────────┐
│  Logo                            ☰     │  ← Header fijo (64px)
├───────────────────────────────────────┤
│                        Presentación    │  ← Título, alineado a la derecha
│                                         │
│  Lorem ipsum dolor sit amet, consec-    │
│  tetur adipiscing elit. Sed do eius-    │  ← Bloque de contenido textual
│  mod tempor incididunt ut labore et     │     (párrafos), ocupa la mayor
│  dolore magna aliqua. Ut enim ad        │     parte de la altura
│  minim veniam, quis nostrud exerci-     │
│  tation ullamco laboris nisi ut...      │
│                                         │
└───────────────────────────────────────┘
```

## Glossary

- **Pantalla_Presentación**: Página del sitio web Nous Concepts que presenta información introductoria del estudio en formato de texto, compuesta por Header, Título_Presentación y Sección_Contenido.
- **Header**: Componente fijo superior que contiene el Logo a la izquierda y el Botón_Hamburguesa a la derecha, definido en `src/components/header.html`. Es el mismo componente reutilizado en las demás pantallas del sitio.
- **Logo**: Enlace de marca con el texto "NOUS CONCEPTS" alineado al lado izquierdo del Header, que dirige a la página de inicio.
- **Botón_Hamburguesa**: Botón compuesto por tres líneas horizontales paralelas, alineado al lado derecho del Header, que abre y cierra el menú de navegación.
- **Menú_Navegación**: Panel de navegación desplegable definido en `src/components/nav.html` que muestra los enlaces del sitio al activarse el Botón_Hamburguesa.
- **Título_Presentación**: Encabezado principal (h1) con el texto "Presentación" alineado al lado derecho, ubicado debajo del Header.
- **Sección_Contenido**: Bloque de texto (uno o más párrafos) que presenta el contenido descriptivo de la Pantalla_Presentación, ocupando la mayor parte de la altura del Viewport.
- **Modo_Oscuro**: Esquema de colores con fondo oscuro (`--color-bg`, #0f0f1a) y texto claro (`--color-text`, #eaeaea) definido en las variables CSS del proyecto (`src/styles/variables.css`).
- **Viewport**: Área visible del navegador en el dispositivo del usuario.
- **Tokens_Diseño**: Conjunto de variables CSS definidas en `src/styles/variables.css` que establecen colores, tipografía, espaciado y dimensiones del sitio.

## Requirements

### Requirement 1: Estructura general de la Pantalla_Presentación

**User Story:** Como visitante del sitio, quiero ver una pantalla de presentación con estructura clara y jerárquica, para leer con comodidad la información introductoria del estudio.

#### Acceptance Criteria

1. THE Pantalla_Presentación SHALL presentar los elementos en el siguiente orden vertical: Header, Título_Presentación, Sección_Contenido.
2. THE Pantalla_Presentación SHALL existir como un archivo HTML independiente en `src/pages/presentacion.html`.
3. THE Pantalla_Presentación SHALL cargar el Header mediante una llamada a `loadComponent('#header-placeholder', '../components/header.html')` y el Menú_Navegación mediante `loadComponent('#nav-placeholder', '../components/nav.html')`, siguiendo el mismo patrón de inicialización que la página de inicio.
4. THE Pantalla_Presentación SHALL ocupar el 100% del ancho del Viewport sin generar scroll horizontal en anchos de 320px a 1920px.
5. WHILE el ancho del Viewport sea mayor o igual a 320px, THE Pantalla_Presentación SHALL mostrar el Título_Presentación y la Sección_Contenido sin superposición de contenido y sin texto truncado por desbordamiento.

### Requirement 2: Modo oscuro como tema predeterminado

**User Story:** Como visitante del sitio, quiero que la pantalla de presentación utilice un esquema de colores oscuro, para tener una experiencia visual coherente con el resto del sitio de Nous Concepts.

#### Acceptance Criteria

1. WHEN la Pantalla_Presentación se carga por primera vez, THE Pantalla_Presentación SHALL aplicar el Modo_Oscuro sin requerir interacción del usuario, sin depender de la preferencia del sistema operativo y sin utilizar la media query `prefers-color-scheme`.
2. THE Pantalla_Presentación SHALL aplicar la variable CSS `--color-bg` como color de fondo del elemento body y de la Sección_Contenido.
3. THE Pantalla_Presentación SHALL aplicar la variable CSS `--color-text` como color de texto del Título_Presentación y de los párrafos de la Sección_Contenido.
4. THE Pantalla_Presentación SHALL utilizar los Tokens_Diseño definidos en `src/styles/variables.css` para todos los colores de fondo y de texto, sin definir valores de color literales fuera de dichas variables.
5. THE Pantalla_Presentación SHALL mantener una relación de contraste mínima de 4.5:1 entre el color de texto (`--color-text`) y el color de fondo (`--color-bg`) conforme a WCAG 2.1 nivel AA.

### Requirement 3: Header con Logo y menú hamburguesa

**User Story:** Como visitante del sitio, quiero ver el logo del estudio y acceder al menú de navegación desde la pantalla de presentación, para orientarme y navegar fácilmente.

#### Acceptance Criteria

1. THE Header SHALL posicionarse con `position: fixed` en la parte superior del Viewport con una altura de 64px definida por la variable `--nav-height` y un z-index superior al contenido de la página, permaneciendo visible durante el scroll vertical.
2. THE Header SHALL mostrar el Logo con el texto "NOUS CONCEPTS" alineado al lado izquierdo, funcionando como enlace a la página de inicio.
3. WHILE el ancho del Viewport es menor o igual a 768px, THE Header SHALL mostrar el Botón_Hamburguesa alineado al lado derecho con un área táctil mínima de 44×44px.
4. WHILE el ancho del Viewport es mayor a 768px, THE Header SHALL ocultar el Botón_Hamburguesa y mostrar los enlaces de navegación en disposición horizontal.
5. WHEN el usuario activa el Botón_Hamburguesa estando el Menú_Navegación cerrado, THE Header SHALL establecer el atributo `aria-expanded` a "true", actualizar `aria-label` a "Cerrar menú" y despachar el evento que abre el Menú_Navegación.
6. WHEN el usuario activa el Botón_Hamburguesa estando el Menú_Navegación abierto, THE Header SHALL establecer el atributo `aria-expanded` a "false", actualizar `aria-label` a "Abrir menú" y despachar el evento que cierra el Menú_Navegación.

### Requirement 4: Título de la presentación alineado a la derecha

**User Story:** Como visitante del sitio, quiero ver un título claro que identifique la sección de presentación, para saber en qué parte del sitio me encuentro.

#### Acceptance Criteria

1. THE Título_Presentación SHALL mostrar el texto "Presentación" utilizando un elemento `<h1>`.
2. THE Título_Presentación SHALL alinearse horizontalmente al lado derecho de su contenedor mediante `text-align: right`.
3. THE Título_Presentación SHALL ubicarse debajo del Header, con un margen superior suficiente para no quedar solapado por el Header fijo de 64px.
4. THE Título_Presentación SHALL utilizar la tipografía definida en `--font-heading` y el color `--color-text`.
5. WHILE el ancho del Viewport es menor o igual a 768px, THE Título_Presentación SHALL utilizar el tamaño de fuente `--font-size-xl` (2rem).
6. WHILE el ancho del Viewport es mayor a 768px, THE Título_Presentación SHALL utilizar el tamaño de fuente `--font-size-hero` (3.5rem).

### Requirement 5: Sección de contenido textual

**User Story:** Como visitante del sitio, quiero leer un bloque de texto con la presentación del estudio, para conocer su identidad, propósito y trayectoria.

#### Acceptance Criteria

1. THE Sección_Contenido SHALL mostrar uno o más párrafos de texto que presenten información introductoria del estudio.
2. THE Sección_Contenido SHALL limitar el ancho máximo del bloque de texto a 720px y centrarlo horizontalmente mediante `margin-inline: auto`.
3. THE Sección_Contenido SHALL utilizar una altura de línea de 1.7 para el texto de los párrafos, para mejorar la legibilidad.
4. THE Sección_Contenido SHALL utilizar el color de texto `--color-text` sobre el color de fondo `--color-bg`.
5. WHILE el ancho del Viewport es mayor a 768px, THE Sección_Contenido SHALL utilizar el tamaño de fuente `--font-size-lg` (1.25rem) para el texto de los párrafos.
6. WHILE el ancho del Viewport es menor o igual a 768px, THE Sección_Contenido SHALL utilizar el tamaño de fuente `--font-size-base` (1rem) para el texto de los párrafos.
7. THE Sección_Contenido SHALL ocupar como mínimo la altura resultante de `calc(100vh - var(--nav-height))` menos la altura del Título_Presentación, de manera que constituya el área principal visible de la pantalla.

### Requirement 6: Diseño mobile-first y responsivo

**User Story:** Como visitante del sitio desde un dispositivo móvil, quiero que la pantalla de presentación esté optimizada para pantallas pequeñas, para tener una experiencia de lectura cómoda.

#### Acceptance Criteria

1. THE Pantalla_Presentación SHALL definir los estilos base (sin media query) orientados a dispositivos con ancho menor o igual a 768px.
2. THE Pantalla_Presentación SHALL aplicar un padding horizontal igual a `--spacing-sm` (1rem) al contenedor de contenido en los estilos base.
3. WHILE el ancho del Viewport es mayor a 768px, THE Pantalla_Presentación SHALL escalar el Título_Presentación a `--font-size-hero` y el texto de la Sección_Contenido a `--font-size-lg`.
4. THE Pantalla_Presentación SHALL utilizar el breakpoint de 768px (`--breakpoint-mobile`) como umbral único para las variaciones responsivas de tipografía y espaciado.

### Requirement 7: Accesibilidad de la pantalla

**User Story:** Como visitante del sitio que utiliza tecnologías de asistencia, quiero que todos los elementos de la pantalla de presentación sean accesibles, para navegar e interactuar con el contenido de forma independiente.

#### Acceptance Criteria

1. THE Sección_Contenido SHALL estar contenida en un elemento semántico `<section>` o `<main>` con un atributo `aria-label` cuyo valor identifique el propósito de la presentación.
2. THE Título_Presentación SHALL ser el único elemento `<h1>` de la Pantalla_Presentación, estableciendo la jerarquía de encabezados de la página.
3. THE Pantalla_Presentación SHALL permitir que todos los elementos interactivos (Logo, Botón_Hamburguesa y enlaces de navegación) sean alcanzables mediante la tecla Tab en un orden que siga el flujo visual de la página.
4. WHILE un elemento interactivo recibe el foco del teclado, THE Pantalla_Presentación SHALL mostrar un indicador de foco visible con un contraste mínimo de 3:1 respecto al fondo adyacente.
5. WHEN un elemento interactivo tiene el foco del teclado, THE Pantalla_Presentación SHALL permitir su activación mediante las teclas Enter o Espacio.
6. THE Pantalla_Presentación SHALL mantener un contraste mínimo de 4.5:1 entre el texto (`--color-text`) y el fondo (`--color-bg`) cumpliendo el nivel AA de WCAG 2.1.
