# Requirements Document

## Introduction

Esta funcionalidad añade una sección de "estrenos destacados" a la Pantalla_Home del sitio "NOUS CONCEPTS". La sección presenta una etiqueta superior ("ESTRENOS DESTACADOS"), un título de sección ("Cultura, relatos e historias que laten") y dos tarjetas destacadas cuyo contenido (imagen, categoría, tiempo de lectura, título, descripción y enlace) se obtiene dinámicamente desde la API del blog corporativo, en lugar de estar codificado en el HTML. La sección cierra con un botón "Más Contenido →" que dirige a la página con el listado completo de contenidos. El diseño es mobile-first, consistente con los tokens de diseño (variables CSS) existentes y con la identidad visual clara del sitio (fondo crema/marfil claro con acento navy/índigo profundo), y se implementa con JavaScript vanilla (ES modules) cargado vía `<script type="module">`, siguiendo el patrón de `fetch` ya utilizado en el proyecto.

## Glossary

- **Pantalla_Home**: La página de inicio del sitio web NOUS CONCEPTS ubicada en `src/pages/home.html`.
- **Seccion_Destacados**: Nueva sección de la Pantalla_Home que presenta la etiqueta "ESTRENOS DESTACADOS", el título "Cultura, relatos e historias que laten" y dos Tarjeta_Destacada, seguida del Boton_Mas_Contenido.
- **Etiqueta_Seccion**: Texto superior de la Seccion_Destacados con el valor "ESTRENOS DESTACADOS".
- **Titulo_Seccion**: Encabezado de la Seccion_Destacados con el valor "Cultura, relatos e historias que laten".
- **Tarjeta_Destacada**: Componente visual que representa una entrada del blog e incluye imagen, categoría, tiempo de lectura (opcional), título, descripción (opcional) y enlace al artículo.
- **API_Blog**: La API del blog corporativo que expone las entradas publicadas del blog en formato JSON.
- **Entrada_Blog**: Objeto de datos devuelto por la API_Blog que representa una publicación del blog.
- **Servicio_Blog**: Módulo JavaScript encargado de solicitar, validar y transformar las Entrada_Blog obtenidas desde la API_Blog para su presentación en las Tarjeta_Destacada.
- **Boton_Mas_Contenido**: Enlace de acción con el texto "Más Contenido →" ubicado al final de la Seccion_Destacados que dirige al listado completo de contenidos.
- **Estado_Carga**: Estado visual de la Seccion_Destacados mientras la solicitud a la API_Blog está en curso y aún no ha respondido.
- **Estado_Error**: Estado visual de la Seccion_Destacados cuando la solicitud a la API_Blog no devuelve datos utilizables.
- **Viewport**: Área visible del navegador en el dispositivo del usuario.

## Requirements

### Requirement 1: Estructura y contenido estático de la Seccion_Destacados

**User Story:** Como visitante del sitio, quiero ver una sección de estrenos destacados con una etiqueta, un título y dos tarjetas, para descubrir rápidamente el contenido más reciente del estudio.

#### Acceptance Criteria

1. THE Seccion_Destacados SHALL mostrar la Etiqueta_Seccion con el texto "ESTRENOS DESTACADOS" ubicada por encima del Titulo_Seccion.
2. THE Seccion_Destacados SHALL mostrar el Titulo_Seccion con el texto "Cultura, relatos e historias que laten" como encabezado de nivel h2.
3. THE Seccion_Destacados SHALL mostrar como máximo dos Tarjeta_Destacada ubicadas por debajo del Titulo_Seccion.
4. THE Seccion_Destacados SHALL mostrar el Boton_Mas_Contenido por debajo de las Tarjeta_Destacada.
5. THE Seccion_Destacados SHALL incluir un atributo aria-label cuyo valor identifique el propósito de la sección de estrenos destacados.

### Requirement 2: Obtención de contenido desde la API del blog corporativo

**User Story:** Como editor de contenido, quiero que las tarjetas destacadas se alimenten desde la API del blog corporativo, para que el contenido de la Pantalla_Home se mantenga actualizado sin modificar el código.

#### Acceptance Criteria

1. WHEN la Pantalla_Home termina de cargar el DOM, THE Servicio_Blog SHALL solicitar las Entrada_Blog a la API_Blog mediante una petición HTTP GET.
2. WHEN la API_Blog responde con un estado HTTP exitoso y un cuerpo JSON válido, THE Servicio_Blog SHALL seleccionar las dos primeras Entrada_Blog en el orden devuelto por la API_Blog para poblar las Tarjeta_Destacada.
3. THE Servicio_Blog SHALL mapear cada Entrada_Blog seleccionada a una Tarjeta_Destacada usando los campos de imagen, categoría, tiempo de lectura, título, descripción y enlace.
4. THE Pantalla_Home SHALL renderizar el contenido de cada Tarjeta_Destacada a partir de los datos devueltos por el Servicio_Blog y no a partir de contenido codificado en el HTML.
5. IF la API_Blog devuelve una sola Entrada_Blog, THEN THE Servicio_Blog SHALL poblar una única Tarjeta_Destacada con esa Entrada_Blog.

### Requirement 3: Mapeo de datos a los campos de la Tarjeta_Destacada

**User Story:** Como visitante del sitio, quiero ver la información clave de cada estreno en la tarjeta, para decidir si el contenido me interesa antes de abrirlo.

#### Acceptance Criteria

1. THE Tarjeta_Destacada SHALL mostrar la imagen de la Entrada_Blog con un atributo alt cuyo valor corresponda al título de la Entrada_Blog.
2. THE Tarjeta_Destacada SHALL mostrar la categoría de la Entrada_Blog como etiqueta de categoría (por ejemplo, "CINE" o "SERIE").
3. WHERE la Entrada_Blog incluye un valor de tiempo de lectura, THE Tarjeta_Destacada SHALL mostrar el tiempo de lectura con el formato "{n} min de lectura".
4. THE Tarjeta_Destacada SHALL mostrar el título de la Entrada_Blog como encabezado de la tarjeta.
5. WHERE la Entrada_Blog incluye un valor de descripción, THE Tarjeta_Destacada SHALL mostrar la descripción como texto de extracto.
6. THE Tarjeta_Destacada SHALL exponer el enlace de la Entrada_Blog como un elemento navegable que dirige al artículo completo.
7. IF un campo opcional (tiempo de lectura o descripción) está ausente en la Entrada_Blog, THEN THE Tarjeta_Destacada SHALL omitir el elemento correspondiente sin mostrar valores vacíos ni marcadores de posición.

### Requirement 4: Estado de carga

**User Story:** Como visitante del sitio, quiero recibir una indicación visual mientras se cargan los estrenos destacados, para entender que el contenido está en camino.

#### Acceptance Criteria

1. WHILE la solicitud a la API_Blog está en curso y aún no ha respondido, THE Seccion_Destacados SHALL mostrar el Estado_Carga en el área de las Tarjeta_Destacada.
2. WHEN el Servicio_Blog completa el mapeo de las Entrada_Blog, THE Seccion_Destacados SHALL reemplazar el Estado_Carga por las Tarjeta_Destacada renderizadas.
3. THE Estado_Carga SHALL incluir un atributo aria-live con valor "polite" para anunciar la actualización a las tecnologías de asistencia.

### Requirement 5: Manejo de errores y contenido de respaldo

**User Story:** Como visitante del sitio, quiero que la Pantalla_Home siga siendo utilizable aunque el blog no esté disponible, para no encontrarme con una sección rota o vacía.

#### Acceptance Criteria

1. IF la solicitud a la API_Blog falla por un error de red o un tiempo de espera agotado, THEN THE Seccion_Destacados SHALL mostrar el Estado_Error con un mensaje informativo en lugar de las Tarjeta_Destacada.
2. IF la API_Blog responde con un estado HTTP no exitoso, THEN THE Seccion_Destacados SHALL mostrar el Estado_Error con un mensaje informativo en lugar de las Tarjeta_Destacada.
3. IF la API_Blog responde con un cuerpo que no es JSON válido o no contiene ninguna Entrada_Blog, THEN THE Seccion_Destacados SHALL mostrar el Estado_Error con un mensaje informativo en lugar de las Tarjeta_Destacada.
4. WHEN se muestra el Estado_Error, THE Seccion_Destacados SHALL mantener visibles la Etiqueta_Seccion, el Titulo_Seccion y el Boton_Mas_Contenido.
5. IF la solicitud a la API_Blog falla, THEN THE Servicio_Blog SHALL registrar el error en la consola del navegador con un mensaje descriptivo que identifique la URL solicitada.

### Requirement 6: Botón "Más Contenido"

**User Story:** Como visitante del sitio, quiero un botón para ver más contenido al final de la sección, para explorar el catálogo completo de estrenos.

#### Acceptance Criteria

1. THE Boton_Mas_Contenido SHALL mostrar el texto "Más Contenido →".
2. WHEN el usuario activa el Boton_Mas_Contenido, THE Pantalla_Home SHALL navegar a la página de listado de contenidos (`contenidos.html`).
3. THE Boton_Mas_Contenido SHALL tener un área de interacción mínima de 44×44 píxeles para cumplir con accesibilidad táctil.
4. WHEN el Boton_Mas_Contenido recibe foco mediante teclado, THE Boton_Mas_Contenido SHALL mostrar un indicador de foco visible con un outline de 2px sólido en --color-accent y un offset de 2px.

### Requirement 7: Identidad visual clara (fondo crema con acento navy)

**User Story:** Como visitante del sitio, quiero que la sección de estrenos destacados sea coherente con la identidad visual clara del sitio (fondo crema/marfil claro con acento navy/índigo), para tener una experiencia consistente.

#### Acceptance Criteria

1. THE Seccion_Destacados SHALL aplicar la variable CSS --color-bg como color de fondo claro (crema/marfil) de la sección.
2. THE Titulo_Seccion SHALL aplicar la variable CSS --color-accent como color de texto y la tipografía serif definida en --font-heading.
3. THE Etiqueta_Seccion SHALL aplicar la variable CSS --color-accent como color de texto, mostrar el texto en mayúsculas y aplicar un letter-spacing de 0.1em o superior.
4. THE Tarjeta_Destacada SHALL aplicar la variable CSS --color-surface como color de fondo de la tarjeta, la variable CSS --color-text como color de texto de su título y la variable CSS --color-text-muted como color de su texto de descripción.
5. THE Boton_Mas_Contenido SHALL renderizarse como un botón con esquinas completamente redondeadas (forma de píldora), aplicando la variable CSS --color-accent como color de fondo y la variable CSS --color-bg como color de texto.
6. WHEN el Boton_Mas_Contenido se renderiza, THE Boton_Mas_Contenido SHALL mostrar una flecha "→" inmediatamente después del texto de su etiqueta, separada por un único espacio.
7. THE línea de metadatos de la Tarjeta_Destacada SHALL mostrar la categoría y el tiempo de lectura en la misma línea, separados por una viñeta "•".
8. THE Seccion_Destacados SHALL mantener una relación de contraste mínima de 4.5:1 entre el texto normal (menor a 18pt, o menor a 14pt en negrita) y su fondo visible, conforme a WCAG 2.1 nivel AA.
9. THE Seccion_Destacados SHALL mantener una relación de contraste mínima de 3:1 entre el texto de gran tamaño (18pt o mayor, o 14pt o mayor en negrita) y su fondo visible, conforme a WCAG 2.1 nivel AA.
10. THE Seccion_Destacados SHALL utilizar clases CSS con la convención BEM consistente con `home.css` y `components.css`.

### Requirement 8: Diseño mobile-first y responsivo

**User Story:** Como visitante del sitio desde un dispositivo móvil, quiero que la sección de estrenos destacados se adapte a pantallas pequeñas, para leer el contenido cómodamente.

#### Acceptance Criteria

1. THE Seccion_Destacados SHALL definir sus estilos base (sin media query) orientados a dispositivos con ancho ≤ 768px, apilando las dos Tarjeta_Destacada en una sola columna vertical.
2. WHILE el ancho del Viewport es > 768px, THE Seccion_Destacados SHALL disponer las dos Tarjeta_Destacada en un diseño de dos columnas.
3. THE Seccion_Destacados SHALL ocupar el 100% del ancho del Viewport sin generar scroll horizontal en anchos de 320px a 1920px.
4. THE Tarjeta_Destacada SHALL mostrar su imagen sin que exceda los límites de su contenedor en anchos de 320px a 1920px.

### Requirement 9: Accesibilidad de la sección

**User Story:** Como visitante del sitio que utiliza tecnologías de asistencia, quiero que la sección de estrenos destacados sea accesible, para consumir el contenido de forma independiente.

#### Acceptance Criteria

1. THE Tarjeta_Destacada SHALL exponer su enlace como un elemento alcanzable mediante la tecla Tab en un orden lógico que siga el flujo visual de la sección.
2. THE Tarjeta_Destacada SHALL proporcionar un nombre accesible para su enlace que incluya el título de la Entrada_Blog.
3. WHILE un elemento interactivo de la Seccion_Destacados recibe el foco del teclado, THE Seccion_Destacados SHALL mostrar un indicador de foco visible con un contraste mínimo de 3:1 respecto al fondo adyacente.
4. WHEN un elemento interactivo de la Seccion_Destacados tiene el foco del teclado, THE Seccion_Destacados SHALL permitir su activación mediante la tecla Enter.
5. THE imagen de cada Tarjeta_Destacada SHALL incluir un atributo alt no vacío conforme a WCAG 2.1 nivel A.
