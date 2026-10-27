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
  // Acepta fechas compactas DDMMYY (por ejemplo, 281025) y las muestra como DD/MM/YY.
  function formatTimelineDate(value) {
    const date = String(value ?? '').trim();
    const compactDate = date.match(/^(\d{2})[./-]?(\d{2})[./-]?(\d{2})$/);
    return compactDate ? `${compactDate[1]}/${compactDate[2]}/${compactDate[3]}` : date;
  }

  timeline.innerHTML = CONFIG.events.map((event, index) => `
    <article class="event">
      <div class="event-image">${event.foto ? `<img src="${escapeHTML(event.foto)}" alt="${escapeHTML(event.fotoAlt || `Recuerdo: ${event.titulo}`)}" loading="lazy">` : `<span class="photo-placeholder">Añade una foto<br>a este recuerdo</span>`}</div>
      <div class="event-copy"><time class="event-date">${escapeHTML(formatTimelineDate(event.fecha))}</time><h2>${escapeHTML(event.titulo)}</h2><p>${escapeHTML(event.detalle)}</p></div>
    </article>`).join('');
  timeline.insertAdjacentHTML('beforeend', '<p class="timeline-ending" aria-label="Continuará">Continuará<span aria-hidden="true">…</span></p>');
}

// Cuestionario. Las nuevas preguntas se guardan en localStorage de este navegador.
const quizGame = $('#quiz-game');
if (quizGame) {
  const storageKey = 'yayis-anniversary-custom-questions-v1';
  const answersStorageKey = 'yayis-anniversary-quiz-answers-v1';
  let extraQuestions = [];
  try { extraQuestions = JSON.parse(localStorage.getItem(storageKey) || '[]'); } catch { extraQuestions = []; }
  if (!Array.isArray(extraQuestions)) extraQuestions = [];
  const allQuestions = [...CONFIG.quiz.questions, ...extraQuestions];
  let savedAnswers = [];
  try {
    const saved = JSON.parse(localStorage.getItem(answersStorageKey) || 'null');
    if (saved?.version === 1 && Array.isArray(saved.answers)) savedAnswers = saved.answers;
  } catch { savedAnswers = []; }
  savedAnswers = savedAnswers.filter((answer, index) => allQuestions[index]
    && answer.questionId === (allQuestions[index].id || `q${index + 1}`));
  let currentQuestion = savedAnswers.length;
  const progress = $('.progress-track');
  function renderQuestion() {
    const question = allQuestions[currentQuestion];
    $('#question-count').textContent = `Pregunta ${currentQuestion + 1} de ${allQuestions.length}`;
    progress.setAttribute('aria-valuemax', allQuestions.length);
    progress.setAttribute('aria-valuenow', currentQuestion);
    $('#progress-fill').style.width = `${(currentQuestion / allQuestions.length) * 100}%`;
    $('#quiz-question').textContent = question.question;
    $('#quiz-feedback').textContent = '';
    $('#quiz-next').classList.remove('is-visible');
    $('#answers').innerHTML = question.options.map((option, index) => `<button class="answer" type="button" data-answer="${index}">${escapeHTML(option)}</button>`).join('');
    $('#answers').querySelectorAll('.answer').forEach(button => button.addEventListener('click', () => {
      const chosen = Number(button.dataset.answer);
      $('#answers').querySelectorAll('.answer').forEach(answer => { answer.disabled = true; });
      savedAnswers.push({
        questionId: question.id || `q${currentQuestion + 1}`,
        question: question.question,
        selectedOptionIndex: chosen,
        selectedOption: question.options[chosen]
      });
      try {
        localStorage.setItem(answersStorageKey, JSON.stringify({ version: 1, updatedAt: new Date().toISOString(), answers: savedAnswers }));
      } catch { /* El juego sigue aunque el navegador no permita guardar respuestas. */ }
      $('#quiz-feedback').textContent = 'Respuesta guardada.';
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
    $('#result-title').textContent = 'Premio desbloqueado.';
    $('#result-copy').textContent = `Terminaste las ${allQuestions.length} preguntas. Tu premio sorpresa te espera:`;
    $('#prize-text').textContent = CONFIG.quiz.prize;
    $('#prize-letter-link').hidden = false;
    $('#retry-button').textContent = 'Jugar otra vez';
    progress.setAttribute('aria-valuenow', allQuestions.length);
    $('#progress-fill').style.width = '100%';
    celebrate();
  }
  $('#quiz-next').addEventListener('click', () => {
    currentQuestion++;
    if (currentQuestion >= allQuestions.length) finishQuiz();
    else renderQuestion();
  });
  $('#retry-button').addEventListener('click', () => {
    currentQuestion = 0;
    savedAnswers = [];
    try { localStorage.removeItem(answersStorageKey); } catch { /* El juego sigue aunque el navegador restrinja el almacenamiento. */ }
    quizGame.hidden = false;
    $('#quiz-result').classList.remove('is-visible');
    renderQuestion();
  });
  if (currentQuestion >= allQuestions.length) finishQuiz();
  else renderQuestion();

  const questionForm = $('#question-form');
  const editorStatus = $('#editor-status');
  questionForm.addEventListener('submit', event => {
    event.preventDefault();
    const formData = new FormData(questionForm);
    const options = [0, 1, 2, 3].map(index => String(formData.get(`option${index}`) || '').trim()).filter(Boolean);
    if (options.length < 3) {
      editorStatus.textContent = 'Completa al menos tres opciones.';
      return;
    }
    const question = {
      id: `custom-${Date.now()}`,
      question: String(formData.get('question')).trim(),
      options
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
    editorStatus.textContent = 'Pregunta guardada. Aparecerá en la siguiente ronda y queda guardada en este navegador.';
    if (currentQuestion === 0) renderQuestion();
  });
  $('#clear-custom-questions').addEventListener('click', () => {
    extraQuestions = [];
    savedAnswers = [];
    try { localStorage.removeItem(storageKey); } catch { /* El juego sigue disponible aunque el navegador restrinja el almacenamiento. */ }
    try { localStorage.removeItem(answersStorageKey); } catch { /* El juego sigue disponible aunque el navegador restrinja el almacenamiento. */ }
    allQuestions.splice(CONFIG.quiz.questions.length);
    currentQuestion = 0;
    quizGame.hidden = false;
    $('#quiz-result').classList.remove('is-visible');
    renderQuestion();
    editorStatus.textContent = 'Se borraron las preguntas añadidas en este navegador.';
  });
}

// Carta del premio: combina la plantilla editable con las respuestas guardadas del cuestionario.
const letterPage = $('#letter-body');
if (letterPage) {
  const answersKey = 'yayis-anniversary-quiz-answers-v1';
  let savedAnswers = [];
  try {
    const saved = JSON.parse(localStorage.getItem(answersKey) || 'null');
    if (saved?.version === 1 && Array.isArray(saved.answers)) savedAnswers = saved.answers;
  } catch { savedAnswers = []; }
  const answerById = Object.fromEntries(savedAnswers.map(answer => [answer.questionId, answer.selectedOption || '']));
  const template = CONFIG.quiz.letterTemplate || '';
  const letter = template.replace(/\{\{(name|q[1-8])\}\}/g, (_match, token) =>
    token === 'name' ? CONFIG.name : answerById[token] || '________');
  const letterContent = letter || 'Tu carta todavía está por escribirse. Cuando la tengas lista, colócala en CONFIG.quiz.letterTemplate dentro de config.js. Las respuestas de la ronda ya pueden usarse con los marcadores {{q1}} a {{q8}}.';
  letterPage.innerHTML = escapeHTML(letterContent).replace(/\[\[([ui]):([\s\S]*?)\]\]/g, (_match, style, text) =>
    style === 'u' ? `<u>${text}</u>` : `<em>${text}</em>`);
  $('#letter-status').textContent = savedAnswers.length
    ? `Se guardaron ${savedAnswers.length} pinocho respuestas que me diste para esta carta que hice con mucho amor para ti Yayis.`
    : 'Aún no hay respuestas guardadas. Completa la ronda del juego y vuelve a esta carta.';
  $('#letter-answers').innerHTML = savedAnswers.map(answer => `
    <div class="letter-answer"><dt>${escapeHTML(answer.question)}</dt><dd>${escapeHTML(answer.selectedOption)}</dd></div>`).join('')
    || '<p class="letter-empty">Tus respuestas aparecerán aquí después de jugar.</p>';
}

// Jardín sin límite fijo: cada objeto de CONFIG.flowers se representa como una tarjeta.
const flowerGrid = $('#flower-grid');
if (flowerGrid) {
  const meadow = flowerGrid;
  const flowers = CONFIG.flowers;
  function sizeGarden() {
    const width = meadow.clientWidth || window.innerWidth;
    let columns;
    if (width <= 440) columns = flowers.length <= 35 ? 2 : 3;
    else if (width <= 760) columns = flowers.length <= 8 ? 3 : 4;
    else if (flowers.length <= 12) columns = 3;
    else if (flowers.length <= 20) columns = 4;
    else if (flowers.length <= 30) columns = 5;
    else if (flowers.length <= 42) columns = 6;
    else columns = 7;
    const cellWidth = width / columns;
    const maximumBloom = width <= 440 ? 150 : width <= 760 ? 142 : 184;
    const bloomSize = Math.round(Math.max(88, Math.min(maximumBloom, cellWidth * .88)));
    meadow.style.setProperty('--garden-columns', columns);
    meadow.style.setProperty('--bloom-size', `${bloomSize}px`);
    meadow.style.setProperty('--flower-rows', Math.ceil(flowers.length / columns));
  }
  sizeGarden();
  window.addEventListener('resize', sizeGarden, { passive: true });

  flowerGrid.innerHTML = CONFIG.flowers.map((flower, index) => {
    const tilt = `${(Math.random() * 8 - 4).toFixed(1)}deg`;
    const stemHeight = `${54 + Math.floor(Math.random() * 68)}px`;
    const description = flower.descripcion || flower.nota || flower.nombre;
    const descriptionFontSize = `${Math.max(.82, Math.min(1.05, 48 / Math.max(48, description.length))).toFixed(2)}rem`;
    return `
      <button class="garden-flower" type="button" data-flower="${index}" style="--tilt:${tilt};--stem-height:${stemHeight};--description-size:${descriptionFontSize}" aria-label="Ver foto de ${escapeHTML(flower.nombre)}: ${escapeHTML(description)}">
        <span class="flower-bloom">${flower.foto ? `<img src="${escapeHTML(flower.foto)}" alt="${escapeHTML(flower.fotoAlt || flower.nombre)}" loading="lazy">` : `<span class="photo-placeholder">${escapeHTML(flower.nombre)}</span>`}</span>
        <span class="flower-description">${escapeHTML(description)}</span>
        <span class="flower-stem" aria-hidden="true"></span>
      </button>`;
  }).join('');
  $('#flower-count').textContent = `${CONFIG.flowers.length} ${CONFIG.flowers.length === 1 ? 'flor' : 'flores'} y contando`;
  const flowerLightbox = $('#flower-lightbox');
  let flowerIndex = 0;
  function showFlower(index) {
    if (!CONFIG.flowers.length) return;
    flowerIndex = (index + CONFIG.flowers.length) % CONFIG.flowers.length;
    const flower = CONFIG.flowers[flowerIndex];
    const description = flower.descripcion || flower.nota || flower.nombre;
    $('#flower-lightbox-image').innerHTML = flower.foto
      ? `<img src="${escapeHTML(flower.foto)}" alt="${escapeHTML(flower.fotoAlt || flower.nombre)}">`
      : `<span class="photo-placeholder">${escapeHTML(flower.nombre)}</span>`;
    $('#flower-lightbox-caption').textContent = description;
  }
  flowerGrid.addEventListener('click', event => {
    const card = event.target.closest('[data-flower]');
    if (!card) return;
    showFlower(Number(card.dataset.flower));
    flowerLightbox.showModal();
  });
  $('#previous-flower').addEventListener('click', () => showFlower(flowerIndex - 1));
  $('#next-flower').addEventListener('click', () => showFlower(flowerIndex + 1));
  $('#close-flower-lightbox').addEventListener('click', () => flowerLightbox.close());
  flowerLightbox.addEventListener('click', event => { if (event.target === flowerLightbox) flowerLightbox.close(); });
  document.addEventListener('keydown', event => {
    if (!flowerLightbox.open) return;
    if (event.key === 'ArrowLeft') showFlower(flowerIndex - 1);
    if (event.key === 'ArrowRight') showFlower(flowerIndex + 1);
  });
  let touchStartX = 0;
  flowerLightbox.addEventListener('touchstart', event => { touchStartX = event.changedTouches[0].screenX; }, { passive: true });
  flowerLightbox.addEventListener('touchend', event => {
    const delta = event.changedTouches[0].screenX - touchStartX;
    if (Math.abs(delta) > 55) showFlower(flowerIndex + (delta < 0 ? 1 : -1));
  }, { passive: true });
}
