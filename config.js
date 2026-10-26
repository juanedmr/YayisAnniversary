// EDITA ESTE ARCHIVO para personalizar la página. No necesitas tocar index.html.
// Las fotos enumeradas se cargan desde fotos/YayisSiendoYayis y fotos/flores.
// Puedes cambiar sus pies de foto, fechas y recuerdos sin renombrar las imágenes.
const CONFIG = {
  name: "Yayis",
  startDate: "2025-10-28", // Fecha en formato AAAA-MM-DD; el contador se calcula automáticamente.
  welcome: "Hice este rincón para guardar lo que más me gusta: nuestras historias, incluso las pequeñas.",
  photos: [
    { src: "fotos/YayisSiendoYayis/aniohaseo yayis.jpeg", caption: "aniohaseo yayis" },
    { src: "fotos/YayisSiendoYayis/Despeinada Yayis.jpeg", caption: "Despeinada Yayis" },
    { src: "fotos/YayisSiendoYayis/Mi princesita Yayis.jpeg", caption: "Mi princesita Yayis" },
    { src: "fotos/YayisSiendoYayis/Mi yayis.jpeg", caption: "Mi yayis" },
    { src: "fotos/YayisSiendoYayis/Peinándose Yayis.jpeg", caption: "Peinándose Yayis" },
    { src: "fotos/YayisSiendoYayis/rum rum velocidad Yayis.jpeg", caption: "rum rum velocidad Yayis" },
    { src: "fotos/YayisSiendoYayis/Salud Yayis.jpeg", caption: "Salud Yayis" },
    { src: "fotos/YayisSiendoYayis/Yared viéndome.jpeg", caption: "Yared viéndome" },
    { src: "fotos/YayisSiendoYayis/Yared.jpeg", caption: "Yared" },
    { src: "fotos/YayisSiendoYayis/Yayis abeaja de wasap con su abejorro.jpeg", caption: "Yayis abeaja de wasap con su abejorro" },
    { src: "fotos/YayisSiendoYayis/Yayis acuatica.jpeg", caption: "Yayis acuatica" },
    { src: "fotos/YayisSiendoYayis/Yayis amorosa con flor en su cabeza.jpeg", caption: "Yayis amorosa con flor en su cabeza" },
    { src: "fotos/YayisSiendoYayis/Yayis arreglando peluca.jpeg", caption: "Yayis arreglando peluca" },
    { src: "fotos/YayisSiendoYayis/Yayis asustada.jpeg", caption: "Yayis asustada" },
    { src: "fotos/YayisSiendoYayis/Yayis bella.jpeg", caption: "Yayis bella" },
    { src: "fotos/YayisSiendoYayis/Yayis chef.jpeg", caption: "Yayis chef" },
    { src: "fotos/YayisSiendoYayis/Yayis chingándose un mango.jpeg", caption: "Yayis chingándose un mango" },
    { src: "fotos/YayisSiendoYayis/Yayis cocodrilina.jpeg", caption: "Yayis cocodrilina" },
    { src: "fotos/YayisSiendoYayis/Yayis comiendo pt1.jpeg", caption: "Yayis comiendo pt1" },
    { src: "fotos/YayisSiendoYayis/Yayis comiendo pt100.jpeg", caption: "Yayis comiendo pt100" },
    { src: "fotos/YayisSiendoYayis/Yayis comiendo pt3, perdio 400 varos.jpeg", caption: "Yayis comiendo pt3, perdio 400 varos" },
    { src: "fotos/YayisSiendoYayis/Yayis compradora de fotos de 200 peso.jpeg", caption: "Yayis compradora de fotos de 200 peso" },
    { src: "fotos/YayisSiendoYayis/Yayis con gato dormida de nuevo.jpeg", caption: "Yayis con gato dormida de nuevo" },
    { src: "fotos/YayisSiendoYayis/Yayis de portera.jpeg", caption: "Yayis de portera" },
    { src: "fotos/YayisSiendoYayis/Yayis durmiendo con gato.jpeg", caption: "Yayis durmiendo con gato" },
    { src: "fotos/YayisSiendoYayis/Yayis durmiendo.jpeg", caption: "Yayis durmiendo" },
    { src: "fotos/YayisSiendoYayis/Yayis empujando emputada", caption: "Yayis empujando emputada" },
    { src: "fotos/YayisSiendoYayis/Yayis emputada, pero lavandose su diente.jpeg", caption: "Yayis emputada, pero lavandose su diente" },
    { src: "fotos/YayisSiendoYayis/Yayis en un dinosaurio, rawrr.jpeg", caption: "Yayis en un dinosaurio, rawrr" },
    { src: "fotos/YayisSiendoYayis/Yayis enojada con flor en su cabeza.jpeg", caption: "Yayis enojada con flor en su cabeza" },
    { src: "fotos/YayisSiendoYayis/Yayis estrenona.jpeg", caption: "Yayis estrenona" },
    { src: "fotos/YayisSiendoYayis/Yayis grinch.jpeg", caption: "Yayis grinch" },
    { src: "fotos/YayisSiendoYayis/Yayis grosera.jpeg", caption: "Yayis grosera" },
    { src: "fotos/YayisSiendoYayis/Yayis misteriosa.jpeg", caption: "Yayis misteriosa" },
    { src: "fotos/YayisSiendoYayis/Yayis muy feliz en Morelia.jpeg", caption: "Yayis muy feliz en Morelia" },
    { src: "fotos/YayisSiendoYayis/Yayis peinadora de perros.jpeg", caption: "Yayis peinadora de perros" },
    { src: "fotos/YayisSiendoYayis/Yayis playera.jpeg", caption: "Yayis playera" },
    { src: "fotos/YayisSiendoYayis/Yayis posando.jpeg", caption: "Yayis posando" },
    { src: "fotos/YayisSiendoYayis/Yayis poseída.jpeg", caption: "Yayis poseída" },
    { src: "fotos/YayisSiendoYayis/Yayis preciosa, hermosa, deliciosa.jpeg", caption: "Yayis preciosa, hermosa, deliciosa" },
    { src: "fotos/YayisSiendoYayis/Yayis taco.jpeg", caption: "Yayis taco" },
    { src: "fotos/YayisSiendoYayis/Yayis tragalona.jpeg", caption: "Yayis tragalona" },
    { src: "fotos/YayisSiendoYayis/Yayis tragando, digo comiendo pt2.jpeg", caption: "Yayis tragando, digo comiendo pt2" },
    { src: "fotos/YayisSiendoYayis/Yayis troste.jpeg", caption: "Yayis troste" },
    { src: "fotos/YayisSiendoYayis/Yayis vomitona.jpeg", caption: "Yayis vomitona" },
    { src: "fotos/YayisSiendoYayis/Yayis y Toribio.jpeg", caption: "Yayis y Toribio" },
    { src: "fotos/YayisSiendoYayis/yayismeamaymeodia.jpeg", caption: "yayismeamaymeodia" },
    { src: "fotos/YayisSiendoYayis/yayismemedelaniñaqueincendiasucasa.jpeg", caption: "yayismemedelaniñaqueincendiasucasa" },
    { src: "fotos/YayisSiendoYayis/Yoyopa.jpeg", caption: "Yoyopa" }
  ],
  events: [
    { fecha: "[FECHA]", titulo: "Cómo nos conocimos", detalle: "[Escribe aquí cómo empezó todo: dónde, cuándo y qué recuerdas de ese primer momento.]", foto: "fotos/YayisSiendoYayis/aniohaseo yayis.jpeg" },
    { fecha: "[FECHA]", titulo: "Nuestra primera cita", detalle: "[Añade un detalle que todavía te haga sonreír: el lugar, la conversación o los nervios.]", foto: "fotos/YayisSiendoYayis/Mi princesita Yayis.jpeg" },
    { fecha: "[FECHA]", titulo: "Un día que se quedó", detalle: "[Un viaje, una pequeña tradición o cualquier momento que quieras guardar.]", foto: "fotos/YayisSiendoYayis/Yayis muy feliz en Morelia.jpeg" }
  ],
  quiz: {
    minimumCorrect: 2,
    prize: "[Describe aquí el premio: una cena, una escapada, una carta…]",
    questions: [
      { question: "¿Cuál fue uno de esos días que nos gusta recordar?", options: ["[Opción A]", "[Opción B]", "[Opción C]"], correct: 0, correctNote: "Lo sabía: ese recuerdo también es de tus favoritos.", wrongNote: "Acepto esa respuesta; igual me encanta recordarlo contigo." },
      { question: "¿Qué pequeño plan nos sale bien casi siempre?", options: ["[Opción A]", "[Opción B]", "[Opción C]"], correct: 1, correctNote: "Exacto. Ya tenemos nuestros clásicos.", wrongNote: "Buena teoría. Podemos comprobarla en nuestra próxima cita." },
      { question: "¿Qué palabra describe mejor nuestro equipo?", options: ["[Opción A]", "[Opción B]", "[Opción C]"], correct: 2, correctNote: "Esa era. Seguimos siendo un buen equipo.", wrongNote: "No era esa, pero me gusta cómo piensas." }
    ]
  },
  flowers: Array.from({ length: 28 }, (_, index) => {
    const number = String(index + 1).padStart(2, "0");
    return {
      nombre: `Flor ${number}`,
      foto: `fotos/flores/flor-${number}.jpeg`,
      fotoAlt: `Foto de la flor ${number}`,
      fecha: "[FECHA]",
      ocasion: "[Ocasión]",
      nota: "[Añade el recuerdo o la nota que acompaña a esta flor.]"
    };
  })
};
