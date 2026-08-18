# Requirements Document

## Introduction

Pantalla principal (screen #1) del sitio web "Nous Concepts" en modo oscuro con diseño mobile-first. La pantalla incluye un header con logo y menú hamburguesa, una sección hero con texto centrado, un botón "Más" con chevron para scroll, y una segunda sección de texto descriptivo. Todo el diseño utiliza fondo oscuro con texto claro, siguiendo los tokens de diseño existentes del proyecto.

## Glossary

- **Pantalla_Home**: La primera pantalla visible del sitio web Nous Concepts que el usuario ve al cargar la página
- **Header**: Componente fijo superior que contiene el logo del sitio y el botón de menú hamburguesa
- **Sección_Hero**: Área principal de contenido centrado que ocupa la mayor parte del viewport inicial
- **Botón_Más**: Elemento interactivo con texto "Más" y un chevron descendente que permite al usuario desplazarse a la siguiente sección
- **Sección_Descripción**: Bloque de texto secundario ubicado después del Botón_Más que presenta información adicional del estudio
- **Menú_Hamburguesa**: Icono de tres líneas horizontales que activa la navegación del sitio
- **Modo_Oscuro**: Esquema de colores con fondo oscuro (#0f0f1a) y texto claro (#eaeaea) definido en las variables CSS del proyecto
- **Viewport**: Área visible del navegador en el dispositivo del usuario

## Requirements

### Requirement 1: Estructura general de la Pantalla_Home

**User Story:** Como visitante del sitio, quiero ver una pantalla de inicio con estructura clara y jerárquica, para comprender rápidamente la identidad y propósito de Nous Concepts.

#### Acceptance Criteria

1. THE Pantalla_Home SHALL presentar las secciones en el siguiente orden vertical dentro del elemento main: Sección_Hero, Botón_Más, Sección_Descripción
2. THE Pantalla_Home SHALL ocupar el 100% del ancho del Viewport sin que ningún elemento genere scroll horizontal en anchos de 320px a 1920px
3. WHILE el ancho del Viewport sea mayor o igual a 320px, THE Pantalla_Home SHALL mostrar todas las secciones visibles sin superposición de contenido, sin texto truncado por desbordamiento y sin imágenes que excedan los límites de su contenedor
4. THE Header SHALL permanecer fijo en la parte superior del Viewport con una altura de 64px y mantenerse visible durante el scroll vertical

### Requirement 2: Modo oscuro como tema predeterminado

**User Story:** Como visitante del sitio, quiero que la pantalla utilice un esquema de colores oscuro, para tener una experiencia visual coherente con la identidad de marca de Nous Concepts.

#### Acceptance Criteria

1. THE Pantalla_Home SHALL aplicar la variable CSS --color-bg como color de fondo del elemento body y de todas las secciones de contenido principal (hero, description)
2. THE Pantalla_Home SHALL aplicar la variable CSS --color-text como color de texto en encabezados (h1–h6), párrafos de contenido principal y botones de acción
3. THE Pantalla_Home SHALL aplicar la variable CSS --color-text-muted como color de texto en subtítulos, taglines y párrafos descriptivos de sección
4. THE Pantalla_Home SHALL aplicar la variable CSS --color-surface como color de fondo en secciones de agrupación visual
5. THE Pantalla_Home SHALL aplicar el Modo_Oscuro al cargar la página sin requerir interacción del usuario, sin depender de la preferencia del sistema operativo, y sin utilizar media query prefers-color-scheme
6. THE Pantalla_Home SHALL mantener una relación de contraste mínima de 4.5:1 entre el color de texto (--color-text y --color-text-muted) y sus respectivos colores de fondo (--color-bg y --color-surface) conforme a WCAG 2.1 nivel AA

### Requirement 3: Header con logo y menú hamburguesa

**User Story:** Como visitante del sitio, quiero ver el nombre del estudio y acceder al menú de navegación desde cualquier punto de la página, para orientarme y navegar fácilmente.

#### Acceptance Criteria

1. THE Header SHALL posicionarse con position fixed en la parte superior del viewport con z-index superior al contenido de la página, permaneciendo visible durante el scroll vertical
2. THE Header SHALL mostrar el texto "NOUS CONCEPTS" como logo alineado al lado izquierdo, funcionando como enlace a la página de inicio
3. WHILE el viewport tiene un ancho menor o igual a 768px, THE Header SHALL mostrar el Menú_Hamburguesa (icono de 3 líneas horizontales paralelas) alineado al lado derecho con un área táctil mínima de 44×44px
4. THE Header SHALL utilizar un fondo con color --color-primary (#1a1a2e) para diferenciarse del contenido
5. THE Header SHALL tener una altura de 64px definida por la variable --nav-height
6. WHEN el usuario activa el Menú_Hamburguesa estando el panel cerrado, THE Header SHALL establecer el atributo aria-expanded a "true" en el botón, actualizar aria-label a "Cerrar menú", y despachar un evento que abra el panel de navegación debajo del header
7. WHEN el usuario activa el Menú_Hamburguesa estando el panel abierto, THE Header SHALL establecer el atributo aria-expanded a "false" en el botón, actualizar aria-label a "Abrir menú", y despachar un evento que cierre el panel de navegación
8. WHILE el viewport tiene un ancho mayor a 768px, THE Header SHALL ocultar el Menú_Hamburguesa y mostrar los enlaces de navegación directamente en línea

### Requirement 4: Sección Hero con texto centrado

**User Story:** Como visitante del sitio, quiero ver un mensaje principal impactante al llegar a la página, para entender inmediatamente la propuesta de valor del estudio.

#### Acceptance Criteria

1. THE Sección_Hero SHALL mostrar el bloque de texto (título y subtítulo) centrado horizontal y verticalmente dentro de su contenedor, con un ancho máximo de contenido textual de 800px
2. WHILE el ancho del viewport es ≤ 768px, THE Sección_Hero SHALL ocupar como mínimo el 60% de la altura del viewport y mostrar el título con tamaño --font-size-xl y el subtítulo con tamaño --font-size-lg
3. WHILE el ancho del viewport es > 768px, THE Sección_Hero SHALL ocupar como mínimo calc(100vh - 64px) de altura y mostrar el título con tamaño --font-size-hero y el subtítulo con tamaño --font-size-xl
4. THE Sección_Hero SHALL mostrar el título "NOUS CONCEPTS" con la tipografía definida en --font-heading y color --color-text (#eaeaea)
5. THE Sección_Hero SHALL mostrar el subtítulo descriptivo con la tipografía definida en --font-body y color --color-text-muted (#a0a0a0)
6. THE Sección_Hero SHALL utilizar el color de fondo --color-secondary (#16213e) para diferenciarse visualmente del resto de la página
7. THE Sección_Hero SHALL garantizar un ratio de contraste mínimo de 4.5:1 entre el texto mostrado y el fondo visible, conforme a WCAG 2.1 nivel AA

### Requirement 5: Botón "Más" con comportamiento de scroll

**User Story:** Como visitante del sitio, quiero tener una indicación visual para descubrir más contenido debajo de la sección hero, para explorar la página de forma intuitiva.

#### Acceptance Criteria

1. THE Botón_Más SHALL mostrar el texto "Más" seguido de un chevron descendente (▼), donde el texto y el icono se presentan en líneas separadas (bloque)
2. THE Botón_Más SHALL estar centrado horizontalmente en la página mediante su contenedor .scroll-more
3. WHEN el usuario hace clic en el Botón_Más, THE Pantalla_Home SHALL realizar un scroll suave (behavior: smooth) hacia la siguiente sección hermana inmediatamente posterior al contenedor del botón
4. THE Botón_Más SHALL utilizar el color --color-accent (#e94560) como color de texto en su estado por defecto
5. WHEN el usuario posiciona el cursor sobre el Botón_Más, THE Botón_Más SHALL cambiar el color de texto a --color-text (#eaeaea) y desplazarse 2px hacia abajo (translateY)
6. THE Botón_Más SHALL tener un área de interacción mínima de 44x44 píxeles para cumplir con accesibilidad táctil (padding mínimo de 0.5rem vertical y 1rem horizontal)
7. WHEN el Botón_Más recibe foco mediante teclado, THE Botón_Más SHALL mostrar un indicador de foco visible consistente en un outline de 2px sólido en --color-accent con un offset de 2px
8. THE Botón_Más SHALL incluir un atributo aria-label descriptivo que indique la sección destino del scroll
9. IF no existe una sección hermana posterior al contenedor del Botón_Más, THEN THE Botón_Más SHALL no ejecutar ninguna acción al ser clickeado y permanecer en su estado actual

### Requirement 6: Sección de descripción del estudio

**User Story:** Como visitante del sitio, quiero leer una descripción del estudio después de la sección hero, para conocer más sobre la identidad y servicios de Nous Concepts.

#### Acceptance Criteria

1. THE Sección_Descripción SHALL mostrar un bloque de texto con un ancho máximo de 720px centrado horizontalmente mediante margin-inline: auto
2. THE Sección_Descripción SHALL centrar el texto horizontalmente con text-align: center dentro de su contenedor
3. THE Sección_Descripción SHALL utilizar el color de fondo --color-bg (#0f0f1a)
4. THE Sección_Descripción SHALL utilizar una altura de línea de 1.7 para mejorar la legibilidad
5. THE Sección_Descripción SHALL utilizar el tamaño de fuente --font-size-lg (1.25rem) para el texto del párrafo en viewport > 768px
6. WHILE el ancho del viewport es ≤ 768px, THE Sección_Descripción SHALL utilizar el tamaño de fuente --font-size-base (1rem) para el texto del párrafo

### Requirement 7: Diseño mobile-first y responsivo

**User Story:** Como visitante del sitio desde un dispositivo móvil, quiero que la pantalla esté optimizada para pantallas pequeñas, para tener una experiencia de lectura cómoda.

#### Acceptance Criteria

1. THE Pantalla_Home SHALL definir los estilos base (sin media query) orientados a dispositivos con ancho ≤ 768px, aplicando min-height: 60vh a la Sección_Hero y padding de --spacing-lg vertical y --spacing-sm horizontal
2. THE Pantalla_Home SHALL ajustar el tamaño del título de la Sección_Hero al valor --font-size-xl (2rem) en los estilos base (dispositivos con ancho ≤ 768px)
3. THE Pantalla_Home SHALL ajustar el padding de la Sección_Hero a los valores --spacing-lg (4rem) vertical y --spacing-sm (1rem) horizontal en los estilos base (dispositivos con ancho ≤ 768px)
4. WHILE el ancho del viewport es > 768px, THE Pantalla_Home SHALL escalar el título de la Sección_Hero a --font-size-hero (3.5rem) y el subtítulo a --font-size-xl (2rem)

### Requirement 8: Accesibilidad de la pantalla

**User Story:** Como visitante del sitio que utiliza tecnologías de asistencia, quiero que todos los elementos sean accesibles, para navegar e interactuar con el contenido de forma independiente.

#### Acceptance Criteria

1. THE Sección_Hero SHALL incluir un atributo aria-label cuyo valor identifique el propósito de la sección principal
2. THE Sección_Descripción SHALL incluir un atributo aria-label cuyo valor identifique el propósito de la sección descriptiva
3. THE Botón_Más SHALL incluir un atributo aria-label cuyo valor indique la sección destino del desplazamiento
4. WHEN el usuario activa el Menú_Hamburguesa, THE Menú_Hamburguesa SHALL actualizar el atributo aria-expanded de "false" a "true", actualizar el aria-label a "Cerrar menú", y el atributo aria-controls SHALL referenciar el id del elemento de navegación desplegable
5. WHEN el usuario activa el Menú_Hamburguesa estando el menú abierto, THE Menú_Hamburguesa SHALL actualizar el atributo aria-expanded de "true" a "false" y actualizar el aria-label a "Abrir menú"
6. THE Pantalla_Home SHALL mantener un contraste mínimo de 4.5:1 entre el texto principal (--color-text) y el fondo (--color-bg) cumpliendo el nivel AA de WCAG 2.1
7. THE Pantalla_Home SHALL permitir que todos los elementos interactivos (botones, enlaces y controles de menú) sean alcanzables mediante la tecla Tab en un orden lógico que siga el flujo visual de la página
8. WHILE un elemento interactivo recibe el foco del teclado, THE Pantalla_Home SHALL mostrar un indicador de foco visible con un contraste mínimo de 3:1 respecto al fondo adyacente
9. WHEN un elemento interactivo tiene el foco del teclado, THE Pantalla_Home SHALL permitir su activación mediante las teclas Enter o Espacio
