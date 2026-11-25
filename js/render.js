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
    <section class="chapter chapter--${esc(ch.id)} ${idx % 2 && ch.id !== 'competimos' ? 'is-flip' : ''}" id="${esc(ch.id)}" data-wa-msg="${esc(ch.waMessage)}" aria-labelledby="${esc(ch.id)}-t">
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

export function renderTeam(el, team) {
  const [main, ...rest] = team.images;
  el.innerHTML = `
    <figure class="team-hero">${imgTag(main, 'reveal-img')}</figure>
    <div class="light-inner team-grid">
      <div class="team-copy">
        <p class="eyebrow">05 · El equipo</p>
        <h2 class="display team-title" id="equipo-t">${esc(team.title)}</h2>
        <p class="team-text">${esc(team.text)}</p>
      </div>
      <div class="team-mosaic">${rest.map(i => `<figure>${imgTag(i, 'reveal-img')}</figure>`).join('')}</div>
    </div>`;
  el.setAttribute('aria-labelledby', 'equipo-t');
}

export function renderVisit(el, c) {
  const k = c.contact;
  const maps = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(k.mapsQuery);
  const embed = 'https://www.google.com/maps?output=embed&q=' + encodeURIComponent(k.mapsQuery);
  el.dataset.waMsg = 'Hola Nacho Racing, quiero agendar una visita al taller';
  el.setAttribute('aria-labelledby', 'visitanos-t');
  el.innerHTML = `
    <div class="light-inner visit-grid">
      <div class="pass">
        <div class="pass-top">
          <p class="eyebrow">06 · Visítanos</p>
          <img src="./assets/img/icon-192.png" alt="" width="44" height="44">
        </div>
        <h2 class="display visit-title" id="visitanos-t">${esc(c.visit.title)}</h2>
        <dl class="pass-data">
          <div><dt>Dirección</dt><dd>${esc(k.address)}</dd></div>
          <div><dt>Referencia</dt><dd>${esc(k.reference)}</dd></div>
          <div><dt>Horario</dt><dd>${esc(k.hours)}</dd></div>
          <div><dt>WhatsApp</dt><dd>${esc(k.whatsappDisplay)}</dd></div>
        </dl>
        <div class="pass-ctas">
          <a class="btn btn-red" href="${waLink('Hola Nacho Racing, quiero agendar una visita al taller')}" target="_blank" rel="noopener">Escríbenos por WhatsApp</a>
          <a class="btn btn-blue" href="${maps}" target="_blank" rel="noopener">Cómo llegar</a>
        </div>
      </div>
      <div class="map">
        <iframe title="Mapa de ubicación de Nacho Racing" src="${embed}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
      </div>
    </div>`;
}

export function renderFooter(el, c) {
  el.innerHTML = `
    <div class="footer-inner">
      <a class="brand" href="#hero"><img src="./assets/img/icon-192.png" alt="" width="36" height="36"><span class="brand-word"><b>NACHO</b> <i>RACING</i></span></a>
      <p class="footer-motto">${esc(c.brand.motto)}</p>
      <a class="footer-fb" href="${esc(c.contact.facebook)}" target="_blank" rel="noopener">Síguenos en Facebook</a>
      <p class="footer-copy">© ${new Date().getFullYear()} Nacho Racing · ${esc(c.brand.location)}</p>
    </div>`;
}

export function renderAll(c) {
  renderHero(c);
  renderChapters(document.getElementById('capitulos'), c.chapters, c.achievements);
  renderTeam(document.getElementById('equipo'), c.team);
  renderVisit(document.getElementById('visitanos'), c);
  renderFooter(document.getElementById('footer'), c);
  document.querySelectorAll('[data-wa]').forEach(a => { a.href = waLink(); });
  bindContextualWhatsApp(document.getElementById('wa-fab'));
}
