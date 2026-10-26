// EDITA ESTE ARCHIVO para personalizar la página. No necesitas tocar index.html.
// Guarda las imágenes dentro de la carpeta "fotos" y escribe aquí su ruta, por ejemplo: "fotos/recuerdo-01.jpg".
const CONFIG = {
  name: "[NOMBRE]",
  duration: "[TIEMPO]",
  welcome: "Hice este rincón para guardar lo que más me gusta: nuestras historias, incluso las pequeñas.",
  photos: [
    { src: "", caption: "Ese día que no queríamos que terminara", fecha: "[FECHA]" },
    { src: "", caption: "Una pausa en medio de cualquier día", fecha: "[FECHA]" },
    { src: "", caption: "Nuestro lugar, por un ratito", fecha: "[FECHA]" },
    { src: "", caption: "La risa que salió sin planear", fecha: "[FECHA]" },
    { src: "", caption: "Un recuerdo que siempre vuelve", fecha: "[FECHA]" },
    { src: "", caption: "Otro día siendo equipo", fecha: "[FECHA]" }
  ],
  events: [
    { fecha: "[FECHA]", titulo: "Cómo nos conocimos", detalle: "[Escribe aquí cómo empezó todo: dónde, cuándo y qué recuerdas de ese primer momento.]", foto: "" },
    { fecha: "[FECHA]", titulo: "Nuestra primera cita", detalle: "[Añade un detalle que todavía te haga sonreír: el lugar, la conversación o los nervios.]", foto: "" },
    { fecha: "[FECHA]", titulo: "Un día que se quedó", detalle: "[Un viaje, una pequeña tradición o cualquier momento que quieras guardar.]", foto: "" }
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
  flowers: [
    { nombre: "[Nombre de la flor]", fecha: "[FECHA]", ocasion: "[Ocasión]", nota: "[Escribe la historia o el recuerdo que acompaña a estas flores.]" },
    { nombre: "[Nombre de la flor]", fecha: "[FECHA]", ocasion: "[Ocasión]", nota: "[Añade aquí una pequeña nota que solo ustedes entiendan.]" }
  ]
};
