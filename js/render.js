import { waLink } from './whatsapp.js';

const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const imgTag = (i, cls = '', lazy = true) =>
  `<img class="${cls}" src="${esc(i.src)}" alt="${esc(i.alt)}"${lazy ? ' loading="lazy" decoding="async"' : ''}>`;

export function renderHero(c) {
  document.getElementById('hero-stats').innerHTML = c.stats
    .map(s => `<li><b>${esc(s.value)}</b><span>${esc(s.label)}</span></li>`).join('');
  // Lista duplicada para un bucle continuo sin saltos
  const items = c.specialties.map(s => `<span>${esc(s)}</span>`).join('');
  document.getElementById('marquee').innerHTML = items + items.replaceAll('<span>', '<span aria-hidden="true">');
}

function chapterHead(ch) {
  return `
    <div class="ch-head">
      <span class="ch-num" aria-hidden="true">${esc(ch.number)}</span>
      <h2 class="ch-title display">${esc(ch.title)}</h2>
      <p class="ch-text">${esc(ch.text)}</p>
      <a class="ch-cta" href="${waLink(ch.waMessage)}" target="_blank" rel="noopener">Consultar por WhatsApp <span aria-hidden="true">→</span></a>
    </div>`;
}

function chapterBody(ch, achievements) {
  if (ch.id === 'competimos') {
    return `
      <ul class="achievements">${achievements.map(a => `<li>${esc(a)}</li>`).join('')}</ul>
      <div class="track" tabindex="0" aria-label="Galería de competencia, desliza para ver más">
        ${ch.images.map(i => `<figure class="track-item">${imgTag(i, 'reveal-img')}</figure>`).join('')}
      </div>
      <p class="track-hint" aria-hidden="true">Desliza →</p>`;
  }
  return `<div class="ch-media ch-media--${ch.images.length}">
    ${ch.images.map(i => `<figure class="ch-fig">${imgTag(i, 'reveal-img')}</figure>`).join('')}
  </div>`;
}

export function renderChapters(el, chapters, achievements) {
  el.innerHTML = chapters.map((ch, idx) => `
    <section class="chapter chapter--${esc(ch.id)} ${idx % 2 ? 'is-flip' : ''}" id="${esc(ch.id)}" data-wa-msg="${esc(ch.waMessage)}" aria-labelledby="${esc(ch.id)}-t">
      <div class="ch-inner">
        ${chapterHead(ch).replace('class="ch-title display"', `class="ch-title display" id="${esc(ch.id)}-t"`)}
        ${chapterBody(ch, achievements)}
      </div>
    </section>`).join('');
}

/** El botón flotante de WhatsApp adopta el mensaje de la sección visible. */
export function bindContextualWhatsApp(fab) {
  const sections = document.querySelectorAll('[data-wa-msg]');
  if (!('IntersectionObserver' in window) || !fab) return;
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) fab.href = waLink(e.target.dataset.waMsg || undefined); });
  }, { rootMargin: '-45% 0px -45% 0px' });
  sections.forEach(s => io.observe(s));
  const hero = document.getElementById('hero');
  if (hero) { hero.dataset.waMsg = ''; io.observe(hero); }
}

export function renderAll(c) {
  renderHero(c);
  renderChapters(document.getElementById('capitulos'), c.chapters, c.achievements);
  document.querySelectorAll('[data-wa]').forEach(a => { a.href = waLink(); });
  bindContextualWhatsApp(document.getElementById('wa-fab'));
}
