# Fotos del sitio

Ya están conectadas las imágenes que compartiste:

- **Yayis siendo Yayis:** 49 fotos en `fotos/YayisSiendoYayis/`. La galería muestra como descripción el nombre de cada archivo, sin la extensión ni la fecha.
- **Flores:** 27 imágenes en `fotos/flores/`, renombradas `flor-01.jpeg` a `flor-28.jpeg`. Aparecen como tarjetas numeradas en `flores.html`.
- Los primeros tres momentos de `historia.html` ya usan las fotos 01, 02 y 03 de Yayis.

Las referencias están en `config.js` con rutas relativas. Los marcos de la galería se mezclan aleatoriamente entre formatos verticales, panorámicos, apaisados y cuadrados. Para cambiar una imagen, actualiza su `src` y `caption` en `config.js`; no muevas las carpetas porque las rutas se usan desde todas las páginas.

Las fechas, ocasiones y recuerdos de la línea de tiempo siguen como marcadores para que agregues los datos reales. El jardín presenta las fotos con tallos y hojas sobre una pradera. Cada objeto de `flowers` en `config.js` tiene una `descripcion` editable: se revela al pasar el cursor o enfocar la flor, y al tocarla se abre la foto ampliada con esa misma descripción. El jardín no muestra fechas. El sitio tiene páginas separadas: `index.html`, `fotos.html`, `historia.html`, `quiz.html` y `flores.html`.

En `quiz.html` se pueden añadir preguntas con el formulario. Las preguntas nuevas se guardan en ese navegador; para que se distribuyan a otras personas, agrégalas también a `quiz.questions` en `config.js` y vuelve a publicar.
