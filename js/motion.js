// Animaciones de scroll. Todo el contenido es visible sin este archivo:
// si GSAP no carga o el usuario pidió menos movimiento, no se hace nada.
export function initMotion() {
  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;
  if (!gsap || !ScrollTrigger) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  gsap.registerPlugin(ScrollTrigger);
  document.documentElement.classList.add('has-motion');

  // HERO — entrada del título y paso "bloque abierto → motor armado" al hacer scroll.
  // Escenario preparado para reemplazar por la animación de piezas instalándose.
  gsap.from('.hero-title span', { yPercent: 110, opacity: 0, duration: 1.1, stagger: .12, ease: 'power4.out' });
  gsap.from('.hero .eyebrow, .hero-lead, .hero-ctas, .hero-stats', { y: 24, opacity: 0, duration: .9, stagger: .08, delay: .35, ease: 'power3.out' });
  gsap.timeline({ scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: .6 } })
    .to('[data-stage="open"]', { opacity: 0, scale: 1.08, ease: 'none' }, 0)
    .fromTo('[data-stage="built"]', { opacity: 0, scale: 1.15 }, { opacity: 1, scale: 1, ease: 'none' }, 0)
    .to('.hero-content', { y: -60, opacity: .2, ease: 'none' }, 0);

  // Contador en las cifras numéricas del hero (2.9K)
  document.querySelectorAll('.hero-stats b').forEach(b => {
    const m = b.textContent.match(/^(\d+(?:\.\d+)?)(.*)$/);
    if (!m || !m[1].includes('.')) return;
    const target = parseFloat(m[1]); const suffix = m[2]; const o = { v: 0 };
    gsap.to(o, { v: target, duration: 1.6, delay: .6, ease: 'power2.out', onUpdate: () => { b.textContent = o.v.toFixed(1) + suffix; } });
  });

  // CAPÍTULOS — número, título y texto suben; fotos se revelan con máscara diagonal
  gsap.utils.toArray('.chapter').forEach(ch => {
    const tl = gsap.timeline({ scrollTrigger: { trigger: ch, start: 'top 72%' } });
    tl.from(ch.querySelector('.ch-num'), { xPercent: -20, opacity: 0, duration: .9, ease: 'power3.out' })
      .from(ch.querySelectorAll('.ch-title, .ch-text, .ch-cta'), { y: 40, opacity: 0, duration: .8, stagger: .08, ease: 'power3.out' }, '<.1');
    ch.querySelectorAll('.reveal-img').forEach((img, i) => {
      gsap.fromTo(img.parentElement,
        { clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)' },
        { clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', duration: 1.1, delay: i * .12, ease: 'power3.inOut',
          scrollTrigger: { trigger: img.parentElement, start: 'top 85%' } });
      gsap.fromTo(img, { scale: 1.25 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: img.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } });
    });
  });
  gsap.from('.achievements li', { x: -30, opacity: 0, stagger: .12, duration: .7, ease: 'power3.out', scrollTrigger: { trigger: '.achievements', start: 'top 85%' } });

  // EQUIPO — foto grande con paralaje suave
  gsap.fromTo('.team-hero img', { yPercent: -8, scale: 1.1 }, { yPercent: 8, scale: 1, ease: 'none', scrollTrigger: { trigger: '.team-hero', start: 'top bottom', end: 'bottom top', scrub: true } });
  gsap.from('.team-copy > *, .team-mosaic figure', { y: 40, opacity: 0, stagger: .1, duration: .8, ease: 'power3.out', scrollTrigger: { trigger: '.team-grid', start: 'top 80%' } });

  // VISÍTANOS — el pase entra girando levemente
  gsap.from('.pass', { y: 60, rotate: -3, opacity: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: '.visit', start: 'top 75%' } });

  window.addEventListener('load', () => ScrollTrigger.refresh());
}
