# Farmacia Atenas, C.A.

Sitio institucional estático desarrollado con HTML5, CSS3 y JavaScript, preparado para su publicación mediante GitHub Pages.

## Estado actual

- Diseño completo y adaptable a computadoras, tabletas y teléfonos.
- Menú transparente con desenfoque y cambio de apariencia al desplazarse.
- Video real de la farmacia como fondo de la portada, con fotografía de respaldo.
- Logotipo institucional en encabezado, pie de página y favicon.
- Secciones de historia, misión, visión, servicios, promociones, galería, ubicación y contacto.
- Promociones gráficas y audiovisuales cargadas dinámicamente desde `js/content.js`.
- Galería con fotografías reales de la fachada y los estantes.
- Cursor farmacéutico complementario para dispositivos con mouse.
- Metadatos SEO, manifiesto, `robots.txt`, `sitemap.xml` y navegación accesible.

## Recursos audiovisuales

Los archivos utilizados por el sitio están en `assets/`:

- `farmacia.mp4`: fondo de la portada superior.
- `antiacido.mp4` y `neuromix.mp4`: promociones audiovisuales.
- `FACHADA1.jpeg`, `FACHADA3.jpeg` y `ESTANTES3.jpeg`: presentación institucional y galería.
- `logoatenas.png`: identidad visual principal.
- Las demás imágenes PNG y JPEG se emplean en el catálogo de promociones.

## Editar promociones

Las promociones están centralizadas en `js/content.js`. Cada elemento indica tipo de recurso, archivo, categoría, nombre, texto alternativo y nota informativa.

Antes de anunciar precios o beneficios específicos deben confirmarse:

- nombre y presentación exacta;
- precio y moneda;
- fechas de inicio y finalización;
- disponibilidad;
- condición de venta y restricciones aplicables;
- autorización de Farmacia Atenas, C.A.

Las publicaciones no sustituyen la indicación médica.

## Datos pendientes

- Dirección exacta.
- Horario de atención.
- Enlaces de redes sociales.

## Contacto provisional

- Teléfono y WhatsApp de Nelson: `+58 0414-7411154`.
- Correo de Farmacia Atenas: `atenasacfarmacia@gmail.com`.

## Ejecución local

Puede abrirse con cualquier servidor estático. Por ejemplo:

```bash
python -m http.server 8080
```

Luego visitar `http://localhost:8080`.
