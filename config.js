// EDITA ESTE ARCHIVO para personalizar la página. No necesitas tocar index.html.
// Las fotos enumeradas se cargan desde fotos/YayisSiendoYayis y fotos/flores.
// Puedes cambiar sus pies de foto, fechas y recuerdos sin renombrar las imágenes.
const CONFIG = {
  name: "Yayis",
  startDate: "2025-10-28", // Fecha en formato AAAA-MM-DD; el contador se calcula automáticamente.
  welcome: "Hice este rincón para guardar lo que más me gusta: nuestras historias, incluso las pequeñas.",
  photos: Array.from({ length: 49 }, (_, index) => {
    const number = String(index + 1).padStart(2, "0");
    return {
      src: `fotos/YayisSiendoYayis/yayis-${number}.jpeg`,
      caption: `Yayis siendo Yayis ${number}`,
      fecha: "[FECHA]"
    };
  }),
  events: [
    { fecha: "[FECHA]", titulo: "Cómo nos conocimos", detalle: "[Escribe aquí cómo empezó todo: dónde, cuándo y qué recuerdas de ese primer momento.]", foto: "fotos/YayisSiendoYayis/yayis-01.jpeg" },
    { fecha: "[FECHA]", titulo: "Nuestra primera cita", detalle: "[Añade un detalle que todavía te haga sonreír: el lugar, la conversación o los nervios.]", foto: "fotos/YayisSiendoYayis/yayis-02.jpeg" },
    { fecha: "[FECHA]", titulo: "Un día que se quedó", detalle: "[Un viaje, una pequeña tradición o cualquier momento que quieras guardar.]", foto: "fotos/YayisSiendoYayis/yayis-03.jpeg" }
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
