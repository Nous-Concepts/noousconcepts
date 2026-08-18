# Requirements Document

## Introduction

Esta especificación define los requisitos para la creación de un componente Header independiente y la implementación del modo oscuro como tema por defecto en la página de inicio (pantalla #1) del sitio web de NOUS CONCEPTS. El Header debe ser un componente separado del menú de navegación existente (`nav.html`), conteniendo el logo a la izquierda y el ícono de menú hamburguesa a la derecha.

## Glossary

- **Header**: Componente de encabezado fijo ubicado en la parte superior de la página, que contiene el logo y el ícono de menú hamburguesa. Es independiente del componente de navegación.
- **Componente_Nav**: Componente de navegación existente (`nav.html`) que contiene los enlaces del menú desplegable. Es independiente del Header.
- **Ícono_Hamburguesa**: Botón visual compuesto por tres líneas horizontales paralelas que permite al usuario abrir el menú de navegación.
- **Logo**: Imagen o texto representativo de la marca NOUS CONCEPTS, ubicado en el lado izquierdo del Header.
- **Modo_Oscuro**: Esquema de colores con fondo oscuro y texto claro aplicado como tema por defecto a toda la pantalla de inicio.
- **Página_Inicio**: Primera pantalla del sitio web (screen #1) que presenta la información principal del estudio.
- **Botón_Más**: Elemento interactivo con el texto "Más" y un ícono de chevron/flecha hacia abajo, ubicado entre secciones de contenido para indicar contenido adicional.

## Requirements

### Requisito 1: Componente Header como archivo independiente

**Historia de usuario:** Como desarrollador, quiero que el Header sea un componente HTML separado en su propio archivo, para poder reutilizarlo de forma independiente al menú de navegación.

#### Criterios de aceptación

1. THE Header SHALL existir como un archivo HTML independiente en `src/components/header.html`
2. THE Header SHALL ser un componente separado del Componente_Nav de manera que `header.html` no contenga elementos con selectores de clase o id propios del Componente_Nav (`.main-nav`, `.nav-links`, `.nav-toggle`, `#nav-menu`), y `src/js/header.js` no importe ni invoque funciones de `nav.js`
3. THE Header SHALL cargarse en la Página_Inicio mediante una llamada a `loadComponent('#header-placeholder', '../components/header.html')` dentro de la función `initPage`, donde `#header-placeholder` es un elemento `div` presente en el HTML de la página antes del `#nav-placeholder`
4. THE Header SHALL tener su propio archivo JavaScript en `src/js/header.js` que exporte una función de inicialización invocada en `initPage` después de que el HTML del header haya sido insertado en el DOM, siguiendo el mismo patrón que `initNavigation` en `nav.js`

### Requisito 2: Estructura visual del Header

**Historia de usuario:** Como usuario, quiero ver el logo del estudio a la izquierda y el ícono de menú a la derecha del encabezado, para poder identificar la marca y acceder al menú fácilmente.

#### Criterios de aceptación

1. THE Header SHALL mostrar el Logo alineado al lado izquierdo y centrado verticalmente dentro del encabezado
2. WHILE el viewport tiene un ancho máximo de 768px, THE Header SHALL mostrar el Ícono_Hamburguesa alineado al lado derecho y centrado verticalmente dentro del encabezado
3. THE Header SHALL utilizar `display: flex` con `justify-content: space-between` y `align-items: center` para distribuir los elementos horizontalmente y centrarlos verticalmente
4. THE Header SHALL permanecer fijo en la parte superior de la ventana del navegador durante el scroll, con una altura de 64px y un z-index superior al resto del contenido de la página
5. THE Ícono_Hamburguesa SHALL estar compuesto por tres líneas horizontales paralelas de 24px de ancho y 2px de alto, con un espaciado uniforme de 7px entre cada línea

### Requisito 3: Accesibilidad del Header

**Historia de usuario:** Como usuario con tecnología asistiva, quiero que el Header tenga atributos ARIA apropiados, para poder navegar el sitio con un lector de pantalla.

#### Criterios de aceptación

1. THE Header SHALL utilizar la etiqueta semántica `<header>` como elemento contenedor, y contener un elemento `<nav>` con un atributo `aria-label` que describa su propósito de navegación
2. THE Ícono_Hamburguesa SHALL ser un elemento `<button>` con un atributo `aria-label` con el texto "Abrir menú" cuando el menú está cerrado, y "Cerrar menú" cuando el menú está abierto
3. THE Ícono_Hamburguesa SHALL tener un atributo `aria-expanded` con valor "false" cuando el menú está cerrado y "true" cuando el menú está abierto, y un atributo `aria-controls` cuyo valor coincida con el `id` del elemento de menú que controla
4. WHEN el usuario activa el Ícono_Hamburguesa, THE Header SHALL alternar el atributo `aria-expanded` de "false" a "true" o de "true" a "false", y actualizar el atributo `aria-label` del botón al texto correspondiente al nuevo estado, en un tiempo máximo de 200 milisegundos
5. THE Logo SHALL ser un enlace `<a>` que contenga texto visible legible o un atributo `aria-label` que identifique el destino como la página de inicio
6. IF el foco del teclado se encuentra dentro del menú de navegación y el menú se cierra, THEN THE Header SHALL mover el foco al Ícono_Hamburguesa

### Requisito 4: Comunicación entre Header y Componente_Nav

**Historia de usuario:** Como usuario, quiero que al presionar el ícono de hamburguesa en el Header se abra el menú de navegación, para poder acceder a las otras páginas del sitio.

#### Criterios de aceptación

1. WHEN el usuario hace clic en el Ícono_Hamburguesa, THE Header SHALL despachar un `CustomEvent` con un nombre definido (por ejemplo `menu-toggle`) sobre el `document`, cuyo `detail` contenga el estado solicitado del menú (`open` o `close`)
2. WHEN el Componente_Nav recibe el evento `CustomEvent` despachado por el Header, THE Componente_Nav SHALL alternar la visibilidad del menú agregando o removiendo una clase CSS indicadora de apertura en el elemento del menú, y actualizando el atributo `aria-expanded` del botón de alternancia al valor correspondiente (`true` para abierto, `false` para cerrado)
3. IF el Componente_Nav no está presente en la página, THEN THE Header SHALL despachar el evento `CustomEvent` sin lanzar excepciones no capturadas y sin alterar el estado visual de ningún otro elemento de la página
4. WHEN el usuario hace clic en el Ícono_Hamburguesa y el menú se encuentra visible, THE Componente_Nav SHALL ocultar el menú removiendo la clase CSS indicadora de apertura y estableciendo `aria-expanded` a `false` en el botón de alternancia

### Requisito 5: Modo oscuro como tema por defecto en la Página de Inicio

**Historia de usuario:** Como usuario, quiero que la página de inicio se muestre en modo oscuro por defecto, para tener una experiencia visual consistente con la identidad del estudio.

#### Criterios de aceptación

1. WHEN la Página_Inicio se carga por primera vez, THE Página_Inicio SHALL aplicar el Modo_Oscuro como tema visual sin requerir interacción del usuario, mostrando un color de fondo con luminosidad relativa igual o inferior a 0.05 y un color de texto con luminosidad relativa igual o superior a 0.85
2. THE Página_Inicio SHALL utilizar las variables CSS de modo oscuro definidas en el sistema de design tokens para todos los colores de fondo (background-color) y color de texto (color) en cada sección visible
3. THE Header SHALL aplicar un color de fondo con luminosidad relativa igual o inferior a 0.05 y un color de texto con luminosidad relativa igual o superior a 0.85, consistente con el Modo_Oscuro de la Página_Inicio
4. WHILE el Modo_Oscuro está activo, THE Página_Inicio SHALL mantener un ratio de contraste mínimo de 4.5:1 entre el texto y su fondo en todos los elementos de texto visibles
5. THE Página_Inicio SHALL aplicar el Modo_Oscuro a todos los elementos visibles incluyendo Header, secciones de contenido (hero, descripción, servicios, contenidos, sobre nosotros, contacto), enlaces, botones y Footer

### Requisito 6: Contenido principal de la Página de Inicio

**Historia de usuario:** Como usuario, quiero ver bloques de texto centrados y un botón "Más" con un chevron para explorar contenido adicional, para entender la propuesta del estudio de forma progresiva.

#### Criterios de aceptación

1. THE Página_Inicio SHALL mostrar cada sección de contenido principal (descripción, servicios, contenidos originales, sobre nosotros) con su texto centrado horizontalmente dentro de un ancho máximo de 720px y con márgenes laterales automáticos
2. THE Botón_Más SHALL mostrar el texto "Más" acompañado de un ícono de chevron (▼) apuntando hacia abajo, posicionado inmediatamente debajo del texto
3. THE Botón_Más SHALL estar centrado horizontalmente y posicionado entre dos secciones de contenido consecutivas, apareciendo después de cada sección excepto la última
4. WHEN el usuario hace clic en el Botón_Más, THE Página_Inicio SHALL realizar un scroll suave con una duración entre 300ms y 800ms hacia el inicio de la siguiente sección de contenido inmediatamente posterior al botón
5. THE Botón_Más SHALL ser accesible mediante navegación por teclado (focusable y activable con Enter y Espacio) y tener un `aria-label` que indique la sección destino del scroll (por ejemplo, "Ir a la sección Servicios")
6. IF el usuario hace clic en el Botón_Más y no existe una siguiente sección visible, THEN THE Página_Inicio SHALL no realizar ninguna acción de scroll y el botón no SHALL ser visible en dicha posición

### Requisito 7: Diseño responsivo del Header

**Historia de usuario:** Como usuario móvil, quiero que el Header se adapte a diferentes tamaños de pantalla, para poder usarlo cómodamente en cualquier dispositivo.

#### Criterios de aceptación

1. THE Header SHALL mantener la distribución Logo-izquierda e Ícono_Hamburguesa-derecha mediante layout flex con `justify-content: space-between` en viewports desde 320px hasta 768px de ancho
2. WHILE la pantalla tiene un ancho menor o igual a 768px, THE Header SHALL aplicar un padding horizontal igual a var(--spacing-sm) (1rem) y mantener una altura fija de 64px
3. THE Ícono_Hamburguesa SHALL tener un área de toque mínima de 44x44 píxeles para cumplir con las guías de accesibilidad táctil (WCAG 2.5.5 Target Size)
4. WHILE la pantalla tiene un ancho mayor a 768px, THE Header SHALL ocultar el Ícono_Hamburguesa y mostrar los nav-links en disposición horizontal
5. WHILE la pantalla tiene un ancho menor o igual a 768px, THE Ícono_Hamburguesa SHALL ser visible y los nav-links SHALL estar ocultos hasta que el usuario active el menú
