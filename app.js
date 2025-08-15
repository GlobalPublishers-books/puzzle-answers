
// Guess the Legends: client-side gate + answer loader
const STORAGE_KEY = 'gtl_user'; // stored as { name, email, t }
const qs = new URLSearchParams(window.location.search);
const idRaw = qs.get('id');
const id = (idRaw || '').toString().padStart(2, '0'); // '01'..'40'

const els = {
  loading: document.getElementById('loading'),
  gate: document.getElementById('gate'),
  form: document.getElementById('gate-form'),
  msg: document.getElementById('gate-msg'),
  answer: document.getElementById('answer'),
  answerTitle: document.getElementById('answer-title'),
  answerBody: document.getElementById('answer-body'),
  notFound: document.getElementById('not-found'),
  puzzleIdField: document.getElementById('puzzleIdField'),
  forget: document.getElementById('forget')
};

function getUser() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || ''); }
  catch { return null; }
}
function setUser(name, email) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ name, email, t: Date.now() }));
}
function forgetUser() {
  localStorage.removeItem(STORAGE_KEY);
  location.reload();
}

function show(el) { el.style.display = ''; }
function hide(el) { el.style.display = 'none'; }

async function loadAnswers() {
  const res = await fetch('./answers.json', { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to load answers.json');
  return res.json();
}

function showAnswer(entry) {
  els.answerTitle.textContent = `Puzzle ${entry.id} — Answer`;
  els.answerBody.innerHTML = `
    <strong>Superhero:</strong> ${entry.hero}<br>
    <strong>Actor:</strong> ${entry.actor}
  `;
  hide(els.loading);
  show(els.answer);
}

async function init() {
  // Validate id param early
  if (!/^\d{2}$/.test(id)) {
    hide(els.loading); show(els.notFound); return;
  }

  try {
    const data = await loadAnswers();
    const entry = data.find(x => x.id === id);
    if (!entry) { hide(els.loading); show(els.notFound); return; }

    els.puzzleIdField.value = id;

    const user = getUser();
    if (user && user.email) {
      showAnswer(entry);
    } else {
      hide(els.loading);
      show(els.gate);
    }

    // AJAX Formspree submit
    els.form.addEventListener('submit', async (e) => {
      e.preventDefault();
      els.msg.textContent = 'Submitting…';

      const formData = new FormData(els.form);
      formData.set('subject', `GTL signup for puzzle ${id}`);

      try {
        const r = await fetch(els.form.action, {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
        });
        if (r.ok) {
          setUser(formData.get('name'), formData.get('email'));
          showAnswer(entry);
          hide(els.gate);
        } else {
          els.msg.textContent = 'Submission failed. Please try again.';
        }
      } catch (err) {
        els.msg.textContent = 'Network error. Please try again.';
      }
    });

    if (els.forget) els.forget.addEventListener('click', forgetUser);

  } catch (err) {
    hide(els.loading);
    show(els.notFound);
  }
}

init();
