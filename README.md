# NOUS CONCEPTS — Sitio Web

Sitio web estático para **NOUS CONCEPTS**, un estudio creativo especializado en cómics, animación y video, ubicado en el Caribe colombiano.

## Estructura del Proyecto

```
noousconcepts/
├── index.html              # Redirección a src/pages/home.html
├── package.json            # Configuración del proyecto y dependencias de desarrollo
├── README.md               # Este archivo
├── public/                 # Archivos servidos directamente sin procesamiento
└── src/
    ├── pages/              # Páginas HTML del sitio (home, contenidos, servicios)
    ├── styles/             # Hojas de estilo CSS
    ├── components/         # Componentes reutilizables (nav, footer)
    ├── js/                 # Scripts JavaScript
    └── assets/
        ├── images/         # Imágenes organizadas por página
        │   ├── home/
        │   ├── contenidos/
        │   └── servicios/
        ├── icons/          # Íconos SVG (redes sociales, UI)
        └── fonts/          # Fuentes tipográficas personalizadas
```

## Páginas

- **Inicio** (`home.html`) — Landing page con identidad del estudio
- **Contenidos Originales** (`contenidos.html`) — Portafolio de proyectos creativos
- **Servicios** (`servicios.html`) — Catálogo de servicios ofrecidos

## Desarrollo

```bash
# Instalar dependencias
npm install

# Ejecutar tests
npm test

# Ejecutar tests en modo watch
npm run test:watch
```

## Tecnologías

- HTML5, CSS3, JavaScript (vanilla)
- Vitest + fast-check para testing
- Sin framework ni build step — sitio estático puro
