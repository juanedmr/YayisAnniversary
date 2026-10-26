// Funciones compartidas por la portada y las páginas de cada sección.
const $ = (selector, root = document) => root.querySelector(selector);
const escapeHTML = (value) => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));

// Datos comunes de portada y navegación.
document.querySelectorAll('[data-name]').forEach(element => { element.textContent = CONFIG.name; });
document.querySelectorAll('[data-welcome]').forEach(element => { element.textContent = CONFIG.welcome; });
if (document.querySelector('[data-duration]')) {
  const [year, month, day] = CONFIG.startDate.split('-').map(Number);
  const startUTC = Date.UTC(year, month - 1, day);
  function updateRelationshipCounter() {
    const now = new Date();
    const todayUTC = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
    const days = Math.floor((todayUTC - startUTC) / 86400000);
    document.querySelectorAll('[data-duration]').forEach(counter => {
      counter.textContent = days >= 0
        ? `Llevamos ${days.toLocaleString('es')} ${days === 1 ? 'día' : 'días'} compartiendo el camino.`
        : `Faltan ${Math.abs(days).toLocaleString('es')} días para empezar nuestro camino.`;
    });
  }
  updateRelationshipCounter();
  setInterval(updateRelationshipCounter, 60_000);
}

const menuButton = $('.nav-toggle');
const navLinks = $('#nav-links');
if (menuButton && navLinks) {
  const currentPage = document.body.dataset.page;
  const pageByHref = { 'fotos.html': 'photos', 'historia.html': 'history', 'quiz.html': 'quiz', 'flores.html': 'flowers' };
  navLinks.querySelectorAll('a').forEach(link => {
    if (pageByHref[link.getAttribute('href')] === currentPage) link.setAttribute('aria-current', 'page');
  });
  menuButton.addEventListener('click', () => {
    const expanded = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(expanded));
    menuButton.setAttribute('aria-label', expanded ? 'Cerrar menú' : 'Abrir menú');
    navLinks.classList.toggle('is-open', expanded);
  });
  navLinks.addEventListener('click', event => {
    if (!event.target.closest('a')) return;
    navLinks.classList.remove('is-open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Abrir menú');
  });
}

// La portada conserva la bienvenida; el botón abre el índice de secciones.
const welcome = $('#welcome');
const startButton = $('#start-button');
if (welcome && startButton) {
  startButton.addEventListener('click', () => {
    welcome.classList.add('is-gone');
    document.body.classList.remove('locked');
  });
}

// Galería con lightbox: cantidad flexible, navegación con botones, teclado y swipe.
const gallery = $('#gallery-grid');
if (gallery) {
  let photoIndex = 0;
  const frameTypes = ['portrait', 'landscape', 'wide', 'square', 'tall'];
  const framePool = Array.from({ length: Math.ceil(CONFIG.photos.length / frameTypes.length) }, () => [...frameTypes]).flat();
  for (let index = framePool.length - 1; index > 0; index--) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [framePool[index], framePool[randomIndex]] = [framePool[randomIndex], framePool[index]];
  }
  const shuffledFrames = framePool.slice(0, CONFIG.photos.length);
  gallery.innerHTML = CONFIG.photos.map((photo, index) => `
    <button class="photo-card frame-${shuffledFrames[index]}" type="button" data-photo="${index}" aria-label="Ver foto: ${escapeHTML(photo.caption)}">
      <span class="photo-art">${photo.src ? `<img src="${escapeHTML(photo.src)}" alt="${escapeHTML(photo.caption)}" loading="lazy">` : `<span class="photo-placeholder">Añade aquí<br>tu foto ${index + 1}</span>`}</span>
      <span class="photo-caption"><span>${escapeHTML(photo.caption)}</span></span>
    </button>`).join('');
  const lightbox = $('#lightbox');
  function showPhoto(index) {
    if (!CONFIG.photos.length) return;
    photoIndex = (index + CONFIG.photos.length) % CONFIG.photos.length;
    const photo = CONFIG.photos[photoIndex];
    $('#lightbox-image').innerHTML = photo.src ? `<img src="${escapeHTML(photo.src)}" alt="${escapeHTML(photo.caption)}">` : `<span class="photo-placeholder">Añade aquí tu foto ${photoIndex + 1}</span>`;
    $('#lightbox-caption').textContent = photo.caption;
  }
  gallery.addEventListener('click', event => {
    const card = event.target.closest('[data-photo]');
    if (!card) return;
    showPhoto(Number(card.dataset.photo));
    lightbox.showModal();
  });
  $('#previous-photo').addEventListener('click', () => showPhoto(photoIndex - 1));
  $('#next-photo').addEventListener('click', () => showPhoto(photoIndex + 1));
  $('#close-lightbox').addEventListener('click', () => lightbox.close());
  lightbox.addEventListener('click', event => { if (event.target === lightbox) lightbox.close(); });
  document.addEventListener('keydown', event => {
    if (!lightbox.open) return;
    if (event.key === 'ArrowLeft') showPhoto(photoIndex - 1);
    if (event.key === 'ArrowRight') showPhoto(photoIndex + 1);
  });
  let touchStartX = 0;
  lightbox.addEventListener('touchstart', event => { touchStartX = event.changedTouches[0].screenX; }, { passive: true });
  lightbox.addEventListener('touchend', event => {
    const delta = event.changedTouches[0].screenX - touchStartX;
    if (Math.abs(delta) > 55) showPhoto(photoIndex + (delta < 0 ? 1 : -1));
  }, { passive: true });
}

// La línea de tiempo usa un trazado ondulado y alterna los recuerdos a ambos lados.
const timeline = $('#timeline');
if (timeline) {
  timeline.innerHTML = CONFIG.events.map((event, index) => `
    <article class="event">
      <div class="event-image">${event.foto ? `<img src="${escapeHTML(event.foto)}" alt="${escapeHTML(event.fotoAlt || `Recuerdo: ${event.titulo}`)}" loading="lazy">` : `<span class="photo-placeholder">Añade una foto<br>a este recuerdo</span>`}</div>
      <div class="event-copy"><time class="event-date">${escapeHTML(event.fecha)}</time><h2>${escapeHTML(event.titulo)}</h2><p>${escapeHTML(event.detalle)}</p></div>
    </article>`).join('');
}

// Cuestionario. Las nuevas preguntas se guardan en localStorage de este navegador.
const quizGame = $('#quiz-game');
if (quizGame) {
  const storageKey = 'yayis-anniversary-custom-questions-v1';
  let extraQuestions = [];
  try { extraQuestions = JSON.parse(localStorage.getItem(storageKey) || '[]'); } catch { extraQuestions = []; }
  if (!Array.isArray(extraQuestions)) extraQuestions = [];
  const allQuestions = [...CONFIG.quiz.questions, ...extraQuestions];
  let currentQuestion = 0;
  let score = 0;
  const progress = $('.progress-track');
  function renderQuestion() {
    const question = allQuestions[currentQuestion];
    $('#question-count').textContent = `Pregunta ${currentQuestion + 1} de ${allQuestions.length}`;
    $('#score-label').textContent = `Aciertos: ${score}`;
    progress.setAttribute('aria-valuemax', allQuestions.length);
    progress.setAttribute('aria-valuenow', currentQuestion);
    $('#progress-fill').style.width = `${(currentQuestion / allQuestions.length) * 100}%`;
    $('#quiz-question').textContent = question.question;
    $('#quiz-feedback').textContent = '';
    $('#quiz-next').classList.remove('is-visible');
    $('#answers').innerHTML = question.options.map((option, index) => `<button class="answer" type="button" data-answer="${index}">${escapeHTML(option)}</button>`).join('');
    $('#answers').querySelectorAll('.answer').forEach(button => button.addEventListener('click', () => {
      const chosen = Number(button.dataset.answer);
      const correct = chosen === question.correct;
      if (correct) score++;
      $('#score-label').textContent = `Aciertos: ${score}`;
      $('#answers').querySelectorAll('.answer').forEach((answer, index) => {
        answer.disabled = true;
        if (index === question.correct) answer.classList.add('correct');
        else if (index === chosen) answer.classList.add('incorrect');
      });
      $('#quiz-feedback').textContent = correct ? question.correctNote : question.wrongNote;
      $('#quiz-next').classList.add('is-visible');
    }));
  }
  function celebrate() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const colors = ['#64865e', '#cf7f91', '#d9b84f', '#a9bd9e'];
    for (let index = 0; index < 42; index++) {
      const piece = document.createElement('span');
      piece.className = 'confetti';
      piece.style.left = `${Math.random() * 100}vw`;
      piece.style.background = colors[index % colors.length];
      piece.style.setProperty('--drift', `${Math.random() * 180 - 90}px`);
      piece.style.animationDelay = `${Math.random() * .6}s`;
      document.body.append(piece);
      piece.addEventListener('animationend', () => piece.remove(), { once: true });
    }
  }
  function finishQuiz() {
    quizGame.hidden = true;
    $('#quiz-result').classList.add('is-visible');
    const passed = score >= CONFIG.quiz.minimumCorrect;
    $('#result-title').textContent = passed ? 'Premio desbloqueado.' : 'Nos debemos la revancha.';
    $('#result-copy').textContent = passed
      ? `Acertaste ${score} de ${allQuestions.length}. Este premio ya es tuyo:`
      : `Acertaste ${score} de ${allQuestions.length}. El premio espera; seguro que la próxima ronda te acerca.`;
    $('#prize-text').textContent = passed ? CONFIG.quiz.prize : 'Una nueva oportunidad de recordar todo lo bonito.';
    $('#retry-button').textContent = passed ? 'Jugar otra vez' : 'Intentar de nuevo';
    progress.setAttribute('aria-valuenow', allQuestions.length);
    $('#progress-fill').style.width = '100%';
    if (passed) celebrate();
  }
  $('#quiz-next').addEventListener('click', () => {
    currentQuestion++;
    if (currentQuestion >= allQuestions.length) finishQuiz();
    else renderQuestion();
  });
  $('#retry-button').addEventListener('click', () => {
    currentQuestion = 0;
    score = 0;
    quizGame.hidden = false;
    $('#quiz-result').classList.remove('is-visible');
    renderQuestion();
  });
  renderQuestion();

  const questionForm = $('#question-form');
  const editorStatus = $('#editor-status');
  questionForm.addEventListener('submit', event => {
    event.preventDefault();
    const formData = new FormData(questionForm);
    const options = [0, 1, 2, 3].map(index => String(formData.get(`option${index}`) || '').trim()).filter(Boolean);
    const correct = Number(formData.get('correct'));
    if (options.length < 3 || correct >= options.length) {
      editorStatus.textContent = 'Completa al menos tres opciones y elige una respuesta correcta que exista.';
      return;
    }
    const question = {
      question: String(formData.get('question')).trim(),
      options,
      correct,
      correctNote: String(formData.get('correctNote')).trim(),
      wrongNote: String(formData.get('wrongNote')).trim()
    };
    extraQuestions.push(question);
    try {
      localStorage.setItem(storageKey, JSON.stringify(extraQuestions));
    } catch {
      extraQuestions.pop();
      editorStatus.textContent = 'No se pudo guardar en este navegador. Añádela en config.js para conservarla.';
      return;
    }
    allQuestions.push(question);
    questionForm.reset();
    $('#correct-note').value = 'Lo sabía, ese recuerdo también es tuyo.';
    $('#wrong-note').value = 'Casi; igual me encanta recordarlo contigo.';
    editorStatus.textContent = 'Pregunta guardada. Aparecerá en la siguiente ronda y queda guardada en este navegador.';
    if (currentQuestion === 0 && score === 0) renderQuestion();
  });
  $('#clear-custom-questions').addEventListener('click', () => {
    extraQuestions = [];
    try { localStorage.removeItem(storageKey); } catch { /* El juego sigue disponible aunque el navegador restrinja el almacenamiento. */ }
    allQuestions.splice(CONFIG.quiz.questions.length);
    currentQuestion = 0;
    score = 0;
    quizGame.hidden = false;
    $('#quiz-result').classList.remove('is-visible');
    renderQuestion();
    editorStatus.textContent = 'Se borraron las preguntas añadidas en este navegador.';
  });
}

// Jardín sin límite fijo: cada objeto de CONFIG.flowers se representa como una tarjeta.
const flowerGrid = $('#flower-grid');
if (flowerGrid) {
  const flowerSVG = '<svg viewBox="0 0 100 110" role="img" aria-label="Ilustración de una flor"><path d="M50 98V52M50 77c-17 0-24-11-24-11 14-6 23-2 24 11Zm0-11c16 1 23-8 23-8-13-7-23-3-23 8Z" fill="none" stroke="#36583c" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M50 45c-17 1-17-18-5-20-1-15 17-17 21-4 15-1 17 17 4 22 0 15-19 16-20 2Z" fill="#cf7f91" stroke="#36583c" stroke-width="2"/><circle cx="51" cy="35" r="6" fill="#d9b84f"/></svg>';
  flowerGrid.innerHTML = CONFIG.flowers.map((flower, index) => `
    <button class="flower-card" type="button" data-flower="${index}" aria-label="Leer el recuerdo de ${escapeHTML(flower.nombre)}">
      <span class="flower-art">${flower.foto ? `<img src="${escapeHTML(flower.foto)}" alt="${escapeHTML(flower.fotoAlt || flower.nombre)}" loading="lazy">` : flowerSVG}</span>
      <span class="flower-info"><h2>${escapeHTML(flower.nombre)}</h2><p>${escapeHTML(flower.fecha)} · ${escapeHTML(flower.ocasion)}</p><p class="flower-note">Toca para leer el recuerdo →</p></span>
    </button>`).join('');
  $('#flower-count').textContent = `${CONFIG.flowers.length} ${CONFIG.flowers.length === 1 ? 'flor' : 'flores'} y contando`;
  const flowerDialog = $('#flower-dialog');
  flowerGrid.addEventListener('click', event => {
    const card = event.target.closest('[data-flower]');
    if (!card) return;
    const flower = CONFIG.flowers[Number(card.dataset.flower)];
    $('#flower-dialog-title').textContent = flower.nombre;
    $('#flower-dialog-copy').textContent = flower.nota;
    flowerDialog.showModal();
  });
  $('#close-flower-dialog').addEventListener('click', () => flowerDialog.close());
  flowerDialog.addEventListener('click', event => { if (event.target === flowerDialog) flowerDialog.close(); });
}
