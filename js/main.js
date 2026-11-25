import { content } from './content.js';
import { renderAll } from './render.js';

renderAll(content);

// Barra superior con fondo al hacer scroll
const topbar = document.getElementById('topbar');
const onScroll = () => topbar.classList.toggle('is-scrolled', window.scrollY > 40);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// Animaciones: se cargan aparte; si fallan, la página queda completa y estática.
const startMotion = () => import('./motion.js').then(m => m.initMotion()).catch(() => {});
if (document.readyState === 'complete') startMotion();
else window.addEventListener('load', startMotion);
