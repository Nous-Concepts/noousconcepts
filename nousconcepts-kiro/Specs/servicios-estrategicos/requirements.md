# Requirements — Sección Servicios Estratégicos
**Etapa del viaje del héroe: La Transformación**

## Descripción general
Sección del sitio que presenta los tres servicios estratégicos de Nous Concepts como las "pruebas y herramientas" que el héroe (cliente) atraviesa en su transformación digital: Consultoría de Aplicaciones Web, Marketing Digital e IA, y Transformación Digital.

## Requisitos funcionales

### RF-1: Presentación de servicios como pasos de transformación (steppers)
**User Story:** Como visitante potencial cliente, quiero ver los servicios presentados como pasos de un proceso de transformación, para entender cómo Nous Concepts me acompañaría en mi propio viaje.

Criterios de aceptación:
1. CUANDO el visitante haga scroll por esta sección, ENTONCES el sitio DEBERÁ presentar los tres servicios como pasos secuenciales (stepper narrativo), revelándose uno a la vez.
2. CUANDO se muestre cada servicio, ENTONCES DEBERÁ incluir su descripción correspondiente tal como aparece en el documento fuente.

### RF-2: Navegación hacia más información o contacto
**User Story:** Como visitante interesado en un servicio, quiero poder solicitar más información o contacto directamente desde esta sección, para avanzar en el proceso comercial.

Criterios de aceptación:
1. CUANDO el visitante interactúe con un servicio (ej. clic en tarjeta o botón), ENTONCES el sitio DEBERÁ ofrecer una acción clara (enlace a formulario de contacto).

## Requisitos no funcionales
- **Escaneabilidad**: la información debe presentarse de forma que un visitante entienda los tres servicios en pocos segundos por paso.
- **Tono de etapa**: paleta de colores de energía moderada (acción/capacidad), coherente con `Steering/storytelling.md`.
- **Consistencia**: el formato visual de cada paso/servicio debe ser uniforme.
- **Responsive**: los tres servicios deben visualizarse correctamente tanto en desktop como en mobile, con el stepper adaptado a scroll vertical simple en mobile.
- **Accesibilidad**: el stepper debe ser navegable y comprensible incluso con animaciones desactivadas.
