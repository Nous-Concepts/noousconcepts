# Storytelling Steering — Sitio Web Nous Concepts

Basado en: la guía "Introducción a la Narración Visual" (fuente de referencia principal) y artículos sobre scrollytelling (Genially Blog y Scrollytelling.ai). Este documento traduce ambos marcos —narrativo y técnico-narrativo— en lineamientos de diseño para el sitio.

## Principio rector
"En marketing, una imagen realmente vale más que mil palabras": la información acompañada de un objeto visual se retiene muchísimo mejor que el texto solo. El sitio de Nous Concepts debe usar la narración visual —imágenes, datos visualizados, animación— para convertir la navegación en un viaje emocional, no en una lectura pasiva.

## Qué es el scrollytelling y por qué se adopta aquí
El scrollytelling es una técnica narrativa en la que los elementos de una página cambian a medida que el usuario hace scroll: textos que aparecen, gráficos que se construyen, imágenes que se transforman, todo sincronizado con el desplazamiento. No es lo mismo que el storytelling (el arte de contar historias) sino una forma de *aplicarlo* de manera interactiva: el usuario controla el ritmo de la historia con su propio scroll.

Se adopta para el sitio de Nous Concepts por cuatro razones (alineadas con la evidencia de la industria):
1. **Es intuitivo**: el scroll es el gesto más natural en la navegación web; no requiere que el visitante aprenda a interactuar.
2. **Le da control al visitante**: el héroe de la historia (el cliente o inversionista) avanza a su propio ritmo, evitando la saturación de información.
3. **Genera conexión**: al tener que interactuar (hacer scroll) para que la historia avance, el visitante se convierte en parte activa del relato, no en un lector pasivo.
4. **Motiva a seguir explorando**: cada nuevo tramo de scroll revela algo (una animación, un dato, una transición), generando curiosidad por lo que sigue.

## El Viaje del Héroe como estructura narrativa del sitio
El sitio se estructura como un arco de "viaje del héroe", donde el héroe es el visitante (cliente PYME o inversionista) y Nous Concepts es el mentor/aliado:

1. **El Viaje (Llamada a la Aventura)** — El visitante llega con un "mundo normal": procesos manuales, decisiones basadas en intuición, falta de datos. La sección de Filosofía Data-Driven actúa como el momento revelador que lo llama a la aventura de transformarse.
2. **La Transformación** — El visitante conoce los Servicios Estratégicos: las pruebas y herramientas (consultoría, marketing con IA, automatización) que atraviesa para lograr su transformación digital.
3. **El Retorno** — La Propuesta de Valor para Inversionistas muestra a la empresa/cliente ya transformado: resultados cuantificables, dominio digital, escalabilidad.
4. **La Gloria / Mirada al Futuro** — La Visión de Futuro cierra el relato proyectando al héroe (cliente) dominando su sector, e invita a iniciar su propio viaje mediante un llamado a la acción.

## Técnicas de scrollytelling a aplicar (con referencia a patrones de la industria)
- **Scroll como activador (triggered animation)**: cada elemento (tarjeta, gráfico, frase destacada) permanece oculto o neutro hasta que entra en el viewport, momento en el que se anima (fade-in, desplazamiento, construcción progresiva). Técnicamente se implementa con la Intersection Observer API.
- **Steppers narrativos**: dentro de "Servicios Estratégicos" y "Narrativa Viaje del Héroe", el contenido se organiza en pasos (steps) que se revelan uno a uno a medida que el usuario avanza, en vez de mostrar todo de golpe.
- **Parallax sutil**: capas de fondo que se mueven a distinta velocidad que el contenido principal al hacer scroll, para reforzar la sensación de profundidad entre etapas del viaje (usar con moderación para no afectar el rendimiento ni distraer del mensaje).
- **Construcción progresiva de datos**: los gráficos de ROI, eficiencia y escalabilidad no aparecen estáticos; se "dibujan" o cuentan (contadores animados) en sincronía con el scroll, siguiendo el patrón de "Snappy Data Transitions" usado en scrollytelling editorial de alto nivel.
- **Indicador de progreso**: una barra o conjunto de puntos que muestra en qué etapa del viaje se encuentra el visitante, permitiéndole también saltar directamente a una etapa (ver `Specs/narrativa-viaje-del-heroe`).

## Conceptos básicos de narración aplicados al sitio
- **Autenticidad**: cada dato o cifra mostrada debe ser real y verificable; evitar lenguaje publicitario vacío.
- **Conocimiento de la audiencia**: tono ligeramente distinto entre "cliente PYME" (cercano, práctico) e "inversionista" (analítico, orientado a cifras), sin perder consistencia de marca.
- **Estructura simple**: cada sección sigue el patrón problema → solución → resolución.

## Color y tipografía con intención emocional
- Colores cálidos para bloques de energía/acción (CTA, resultados); colores fríos o neutros para bloques de confianza y solidez (datos, propuesta de inversión).
- Máximo 2-3 fuentes, jerarquía visual clara (evitar "paredes de texto").

## Qué hacer y qué no hacer en la narrativa scrollytelling
**Hacer:**
- Reservar la animación para los momentos que refuercen el mensaje (restraint beats spectacle: no todo tramo necesita animación).
- Dejar que el visitante controle el ritmo; nunca forzar scroll automático sin posibilidad de pausa o control manual.
- Probar la experiencia con animaciones desactivadas para asegurar que el contenido siga siendo comprensible.

**No hacer:**
- No sobrecargar de efectos visuales que compitan con el mensaje central o generen distracción.
- No usar scrollytelling en secciones donde el contenido es simple y no lo necesita (aplicar con propósito, no como adorno).
- No sacrificar el rendimiento ni la accesibilidad por el efecto visual (ver `Steering/tech.md`).

## Relación con las Specs
El detalle de implementación de esta narrativa vive en `Specs/narrativa-viaje-del-heroe` (marco transversal de scrollytelling) y se refleja en cada spec de sección (`filosofia-data-driven`, `servicios-estrategicos`, `propuesta-valor-inversionistas`, `vision-futuro`), donde cada una indica explícitamente su etapa del viaje del héroe y sus elementos de scrollytelling propios.
