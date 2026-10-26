# Fotos del sitio

Ya están conectadas las imágenes que compartiste:

- **Yayis siendo Yayis:** 49 fotos en `fotos/YayisSiendoYayis/`, renombradas `yayis-01.jpeg` a `yayis-49.jpeg`. Aparecen en `fotos.html` con títulos numerados.
- **Flores:** 28 imágenes en `fotos/flores/`, renombradas `flor-01.jpeg` a `flor-28.jpeg`. Aparecen como tarjetas numeradas en `flores.html`.
- Los primeros tres momentos de `historia.html` ya usan las fotos 01, 02 y 03 de Yayis.

Las referencias se generan en `config.js` con rutas relativas, así que puedes editar ahí pies de foto, fechas, nombres de flores, ocasiones y notas. Para cambiar una imagen, conserva el nombre numerado esperado o cambia su ruta en `config.js`. No muevas las carpetas: sus rutas se usan desde todas las páginas.

Las fechas, ocasiones y recuerdos siguen como marcadores para que agregues los datos reales. El sitio tiene páginas separadas: `index.html`, `fotos.html`, `historia.html`, `quiz.html` y `flores.html`.

En `quiz.html` se pueden añadir preguntas con el formulario. Las preguntas nuevas se guardan en ese navegador; para que se distribuyan a otras personas, agrégalas también a `quiz.questions` en `config.js` y vuelve a publicar.
