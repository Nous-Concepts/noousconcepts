# Tasks — Narrativa: Viaje del Héroe vía Scrollytelling (marco transversal)

- [ ] 1. Definir el Modelo de etapas del viaje
  - Crear `journeyModel.js` con las 4 etapas (id, nombre, tono, paleta, umbral de scroll)
  - _Requirements: RF-1, RF-3_

- [ ] 2. Implementar el Controlador de scroll
  - [ ] 2.1 Configurar Intersection Observer para detectar la sección activa
    - _Requirements: RF-1_
  - [ ] 2.2 Implementar disparo de animaciones de entrada por elemento
    - _Requirements: RF-1, RF-4_
  - [ ] 2.3 Implementar detección de `prefers-reduced-motion` y modo degradado
    - _Requirements: Accesibilidad narrativa (no funcional)_

- [ ] 3. Construir el indicador de progreso (`JourneyProgressNav`)
  - [ ] 3.1 Vista de barra/puntos de progreso
    - _Requirements: RF-2_
  - [ ] 3.2 Lógica de clic para scroll suave a cada etapa
    - _Requirements: RF-2_
  - [ ] 3.3 Sincronizar estado activo con el Controlador de scroll
    - _Requirements: RF-2_

- [ ] 4. Implementar transiciones entre etapas (`StageTransition`)
  - Cambios de fondo/color sincronizados con la etapa activa
  - _Requirements: RF-3_

- [ ] 5. Implementar componente de métricas animadas (`AnimatedMetric`)
  - Conteo progresivo de cifras al entrar en el viewport
  - _Requirements: RF-4_

- [ ] 6. Pruebas de rendimiento y accesibilidad
  - Verificar ausencia de layout shift durante animaciones
  - Verificar comportamiento correcto con `prefers-reduced-motion` activado
  - _Requirements: Rendimiento, Accesibilidad narrativa (no funcional)_

- [ ] 7. Pruebas de navegación directa a sección
  - Validar que cada sección tenga sentido si se accede directamente vía enlace externo
  - _Requirements: Consideraciones de diseño_
