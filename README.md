# Farmacia Atenas, C.A.

Sitio institucional estático desarrollado con HTML5, CSS3 y JavaScript, preparado para su publicación mediante GitHub Pages.

## Estado actual

- Estructura completa y responsiva.
- Menú transparente con desenfoque y cambio de apariencia al desplazarse.
- Portada animada provisional preparada para video real.
- Secciones de historia, misión, visión, servicios, promociones, galería, ubicación y contacto.
- Promociones editables desde `js/content.js`.
- Metadatos SEO, favicon, manifiesto, `robots.txt` y `sitemap.xml`.
- Navegación accesible, menú móvil y soporte para reducción de movimiento.

## Sustituir el recurso principal por un video

1. Crear la carpeta `assets/video/`.
2. Agregar un archivo optimizado, preferiblemente `farmacia-hero.webm` y menor a 8 MB.
3. Editar `js/content.js`:

```js
heroVideo: "assets/video/farmacia-hero.webm",
```

El video debe ser corto, silencioso, reproducirse en bucle y contar con autorización de las personas que aparezcan. La imagen SVG actual seguirá funcionando como respaldo.

## Sustituir fotografías

Los bloques de galería son provisionales. Al recibir las fotografías reales se recomienda:

- exportarlas en WebP y JPG;
- usar un ancho máximo de 1600 px;
- eliminar metadatos innecesarios;
- proporcionar un texto alternativo descriptivo;
- evitar fotografías de pacientes, recetas o datos personales.

## Editar promociones

Todas las promociones están centralizadas en `js/content.js`. Antes de publicar una oferta real se debe confirmar:

- nombre y presentación exacta;
- precio y moneda;
- fechas de inicio y finalización;
- disponibilidad;
- condición de venta y restricciones aplicables;
- autorización de Farmacia Atenas, C.A.

Los ejemplos actuales son únicamente demostrativos y no constituyen recomendación médica.

## Datos pendientes

- Dirección exacta.
- Horario de atención.
- Enlaces de redes sociales.
- Fotografías y video autorizados.
- Promociones reales verificadas.

## Contacto provisional

- Teléfono y WhatsApp de Nelson: `+58 0414-7411154`.
- Correo de Farmacia Atenas: `atenasacfarmacia@gmail.com`.

## Ejecución local

Puede abrirse con cualquier servidor estático. Por ejemplo:

```bash
python -m http.server 8080
```

Luego visitar `http://localhost:8080`.
