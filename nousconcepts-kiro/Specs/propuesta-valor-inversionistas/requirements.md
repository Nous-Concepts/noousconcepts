# Requirements — Sección Propuesta de Valor para Inversionistas
**Etapa del viaje del héroe: El Retorno**

## Descripción general
Sección del sitio dirigida a inversionistas potenciales, mostrando a la empresa ya "transformada": resultados cuantificables, dominio digital y capacidad de escalar, presentados con datos que se construyen progresivamente al hacer scroll.

## Requisitos funcionales

### RF-1: Presentación del mensaje para inversionistas
**User Story:** Como inversionista visitando el sitio, quiero entender rápidamente por qué invertir en Nous Concepts, para evaluar la oportunidad.

Criterios de aceptación:
1. CUANDO el visitante llegue a esta sección, ENTONCES el sitio DEBERÁ mostrar el mensaje: "Invertir en Nous Concepts significa apostar por una empresa que escala sus capacidades mediante tecnología de vanguardia".

### RF-2: Presentación de diferenciadores con datos animados
**User Story:** Como inversionista, quiero ver los diferenciadores de la empresa acompañados de indicadores visuales que se construyen ante mí, para percibir solidez y dinamismo al mismo tiempo.

Criterios de aceptación:
1. CUANDO se cargue la sección, ENTONCES DEBERÁ mostrarse un bloque para cada diferenciador: Dominio Digital, IA Conversacional, Escalabilidad.
2. CUANDO un indicador o cifra asociada a un diferenciador entre en el viewport, ENTONCES DEBERÁ animarse progresivamente (ej. conteo ascendente) en lugar de aparecer estático.
3. CUANDO se muestre "IA Conversacional", ENTONCES DEBERÁ mencionarse explícitamente la implementación de chatbots para automatizar soporte y ventas 24/7.
4. CUANDO se muestre "Escalabilidad", ENTONCES DEBERÁ mencionarse que las soluciones son adaptables desde micro PYMES hasta grandes estructuras.

### RF-3: Llamado a la acción para inversionistas
**User Story:** Como inversionista interesado, quiero una forma clara de contactar a la empresa, para iniciar conversaciones de inversión.

Criterios de aceptación:
1. CUANDO el inversionista termine de leer la sección, ENTONCES el sitio DEBERÁ ofrecer un botón o enlace de contacto específico ("Contactar para inversión").

## Requisitos no funcionales
- **Credibilidad**: el diseño y tono deben transmitir seriedad y solidez, adecuados para una audiencia de inversionistas.
- **Tono de etapa**: paleta corporativa sobria (logro/solidez), coherente con `Steering/storytelling.md`.
- **Diferenciación visual**: esta sección debe distinguirse de "Servicios Estratégicos" para dejar claro que el mensaje es distinto (inversión vs. contratación).
- **Accesibilidad**: las animaciones de conteo deben mostrar el valor final directamente si `prefers-reduced-motion` está activo.
