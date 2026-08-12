# Requirements Document

## Introduction

Este documento define los requisitos para la creación de la estructura de carpetas y archivos de un sitio web para NOUS CONCEPTS, un estudio creativo especializado en cómics, animación y video, ubicado en el Caribe colombiano. El sitio web reemplazará la página actual alojada en Google Sites y presentará los contenidos originales, servicios y la identidad de marca del estudio.

## Glossary

- **Sitio_Web**: El proyecto web completo de NOUS CONCEPTS, incluyendo todas sus páginas, assets y configuraciones.
- **Página_Inicio**: La página principal (landing page) del sitio web que presenta la identidad del estudio.
- **Página_Contenidos**: La página que muestra el portafolio de contenidos originales del estudio, organizados por categorías (educativos y entretenimiento).
- **Página_Servicios**: La página que describe los servicios creativos ofrecidos por el estudio.
- **Estructura_Carpetas**: La organización jerárquica de directorios y archivos que conforman el proyecto web.
- **Asset**: Recurso estático del sitio web como imágenes, íconos, fuentes tipográficas u hojas de estilo.
- **Componente**: Elemento reutilizable de la interfaz del sitio web (navegación, pie de página, tarjetas de proyecto).

## Requirements

### Requisito 1: Estructura Base del Proyecto

**Historia de Usuario:** Como desarrollador, quiero tener una estructura de carpetas bien organizada, para poder mantener y escalar el sitio web de forma eficiente.

#### Criterios de Aceptación

1. THE Estructura_Carpetas SHALL contener un directorio raíz con los siguientes archivos de configuración del proyecto: index.html, package.json y README.md.
2. THE Estructura_Carpetas SHALL contener un directorio `src` para el código fuente del sitio.
3. THE Estructura_Carpetas SHALL contener un directorio `src/pages` con un archivo HTML individual para cada página del sitio: Página_Inicio (home.html), Página_Contenidos (contenidos.html) y Página_Servicios (servicios.html).
4. THE Estructura_Carpetas SHALL contener un directorio `src/assets` con los subdirectorios `images`, `icons` y `fonts` para recursos estáticos.
5. THE Estructura_Carpetas SHALL contener un directorio `src/styles` para hojas de estilo CSS.
6. THE Estructura_Carpetas SHALL contener un directorio `src/components` para elementos reutilizables de la interfaz, incluyendo como mínimo los Componentes de navegación principal y pie de página.
7. THE Estructura_Carpetas SHALL contener un directorio `public` para archivos que se sirven directamente sin procesamiento.

### Requisito 2: Página de Inicio

**Historia de Usuario:** Como visitante, quiero ver una página de inicio atractiva que presente la identidad del estudio NOUS CONCEPTS, para entender qué hace y cómo contactarlos.

#### Criterios de Aceptación

1. THE Página_Inicio SHALL incluir una sección hero que muestre una imagen de banner a ancho completo y el texto "NOUS CONCEPTS" como nombre del estudio visible sin necesidad de scroll.
2. THE Página_Inicio SHALL mostrar un texto descriptivo que presente al estudio como fábrica de ideas y conceptos creativos, con una extensión máxima de 150 palabras.
3. THE Página_Inicio SHALL presentar el tagline "Un universo de fantasías y realidades" de forma visible dentro de la sección hero o inmediatamente después de ella.
4. THE Página_Inicio SHALL incluir una sección de servicios con una descripción general de máximo 100 palabras y un enlace funcional que navegue a la Página_Servicios.
5. THE Página_Inicio SHALL incluir una sección de contenidos originales con un enlace funcional que navegue a la Página_Contenidos.
6. THE Página_Inicio SHALL mostrar enlaces a redes sociales (Instagram, YouTube, Facebook) como íconos o texto identificable, donde cada enlace abra el perfil correspondiente del estudio en una nueva pestaña del navegador.
7. THE Página_Inicio SHALL incluir una sección "Sobre Nosotros" que contenga una descripción de máximo 200 palabras mencionando "Átomo Nous" como concepto fundacional o filosofía del estudio.
8. THE Página_Inicio SHALL incluir una llamada a la acción de contacto con el texto "Contáctanos y haremos realidad tus ideas." implementada como un enlace o botón visible que dirija al visitante a la información de contacto.
9. THE Página_Inicio SHALL presentar las secciones en el siguiente orden vertical: hero, descripción del estudio, servicios, contenidos originales, sobre nosotros, y llamada a la acción de contacto.

### Requisito 3: Página de Contenidos Originales

**Historia de Usuario:** Como visitante, quiero explorar los contenidos originales del estudio organizados por categoría, para conocer los proyectos creativos de NOUS CONCEPTS.

#### Criterios de Aceptación

1. THE Página_Contenidos SHALL mostrar una descripción introductoria de máximo 300 caracteres sobre la elaboración de historias mediante cómics, animación y video.
2. THE Página_Contenidos SHALL organizar los proyectos en dos secciones visualmente separadas por encabezado de categoría: "Educativos" y "Entretenimiento".
3. THE Página_Contenidos SHALL presentar cada proyecto mostrando como mínimo: título del proyecto, descripción textual y categoría a la que pertenece.
4. THE Página_Contenidos SHALL presentar el proyecto "El Combo" en la categoría Educativos con su descripción como serie animada educativa.
5. THE Página_Contenidos SHALL presentar el proyecto "Neo Samaria Conexión" en la categoría Entretenimiento con su descripción de ciencia ficción.
6. THE Página_Contenidos SHALL presentar el proyecto "Colombia Mix" en la categoría Entretenimiento con su descripción de comedia social.
7. THE Página_Contenidos SHALL presentar el proyecto "Pánico Disfórico" en la categoría Entretenimiento con su descripción de serie de cómic transmedia de horror y paranormal.
8. WHEN un proyecto tiene un enlace externo, THE Página_Contenidos SHALL mostrar un enlace visible al recurso externo que se abra en una nueva pestaña del navegador.
9. IF la Página_Contenidos no logra cargar la información de un proyecto, THEN THE Página_Contenidos SHALL mantener visible el resto de proyectos y categorías sin afectar la estructura general de la página.

### Requisito 4: Página de Servicios

**Historia de Usuario:** Como potencial cliente, quiero ver los servicios creativos que ofrece el estudio, para evaluar si pueden ayudarme con mi proyecto.

#### Criterios de Aceptación

1. THE Página_Servicios SHALL mostrar una sección introductoria que describa el uso de animación 2D y cómics como herramientas para contar historias.
2. THE Página_Servicios SHALL presentar la categoría "Creación y Narración Gráfica" mostrando para cada servicio (Story Board, Cómic, Ilustración Editorial y Concept Art) su nombre y una descripción breve de máximo 150 caracteres.
3. THE Página_Servicios SHALL presentar la categoría "Animación" mostrando los tipos de proyecto atendidos (educativos, publicitarios, institucionales y de entretenimiento) cada uno con su nombre y una descripción breve de máximo 150 caracteres.
4. THE Página_Servicios SHALL incluir una sección de contacto con al menos una dirección de correo electrónico y un enlace a las redes sociales del estudio, permitiendo al visitante solicitar información sobre los servicios.
5. WHEN el visitante selecciona un enlace de contacto en la Página_Servicios, THE Página_Servicios SHALL dirigir al visitante al canal de comunicación correspondiente (cliente de correo o perfil de red social).

### Requisito 5: Navegación y Componentes Comunes

**Historia de Usuario:** Como visitante, quiero navegar fácilmente entre las páginas del sitio, para encontrar la información que busco sin dificultad.

#### Criterios de Aceptación

1. THE Sitio_Web SHALL incluir un Componente de navegación principal con enlaces a Inicio, Contenidos Originales y Servicios, visible en la parte superior de todas las páginas.
2. THE Sitio_Web SHALL incluir un Componente de pie de página con enlaces a redes sociales (Instagram, YouTube, Facebook) e información de contacto (correo electrónico del estudio).
3. THE Sitio_Web SHALL mantener una identidad visual consistente en todas las páginas utilizando la misma hoja de estilos compartida, las mismas fuentes tipográficas y el mismo Componente de navegación y pie de página.
4. WHILE el viewport del navegador tiene un ancho igual o inferior a 768px, THE Sitio_Web SHALL mostrar el Componente de navegación en formato de menú colapsable que el visitante puede expandir y contraer.
5. WHEN el visitante se encuentra en una página del sitio, THE Sitio_Web SHALL indicar visualmente en el Componente de navegación cuál es la página activa mediante un estilo diferenciado en el enlace correspondiente.

### Requisito 6: Assets y Recursos Estáticos

**Historia de Usuario:** Como desarrollador, quiero tener los recursos estáticos organizados en carpetas específicas, para facilitar la gestión y optimización de imágenes, íconos y fuentes.

#### Criterios de Aceptación

1. THE Estructura_Carpetas SHALL contener un directorio `src/assets/images` con subdirectorios para cada página del sitio: `home`, `contenidos` y `servicios`.
2. THE Estructura_Carpetas SHALL contener un directorio `src/assets/icons` con archivos SVG o PNG para íconos de redes sociales (Instagram, YouTube, Facebook) y elementos de interfaz.
3. THE Estructura_Carpetas SHALL contener un directorio `src/assets/fonts` para fuentes tipográficas personalizadas del estudio.
4. THE Estructura_Carpetas SHALL incluir un archivo `.gitkeep` o archivo placeholder en cada subdirectorio vacío para indicar la ubicación esperada de cada recurso visual y preservar la estructura en el control de versiones.
