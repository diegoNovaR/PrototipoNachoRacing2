import { waLink } from './whatsapp.js';

const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

export function renderHero(c) {
  document.getElementById('hero-stats').innerHTML = c.stats
    .map(s => `<li><b>${esc(s.value)}</b><span>${esc(s.label)}</span></li>`).join('');
  // Lista duplicada para un bucle continuo sin saltos
  const items = c.specialties.map(s => `<span>${esc(s)}</span>`).join('');
  document.getElementById('marquee').innerHTML = items + items.replaceAll('<span>', '<span aria-hidden="true">');
}

export function renderAll(c) {
  renderHero(c);
  document.querySelectorAll('[data-wa]').forEach(a => { if (!a.dataset.waMsg) a.href = waLink(); });
}
