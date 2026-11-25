# Prototipo Landing Nacho Racing — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Prototipo navegable one-page "Del bloque a la pista" con contenido y fotos reales, listo para revisión del cliente.

**Architecture:** Sitio estático. Todo el texto/datos vive en `js/content.js`; `js/render.js` pinta las secciones desde ese objeto; `js/motion.js` añade animaciones GSAP que se apagan con `prefers-reduced-motion`. El hero es un "escenario" con una capa intercambiable (`#hero-stage`) para la futura animación del bóxer.

**Tech Stack:** HTML, CSS, JS (ES modules) sin framework · GSAP 3.12.5 + ScrollTrigger por CDN (cdnjs) · Google Fonts Anton + Inter · `node --test` para lógica pura · servidor estático propio en Node (sin dependencias).

**Spec:** `docs/superpowers/specs/2026-11-25-landing-nacho-racing-design.md`

## Global Constraints
- Sin Higgsfield. Solo fotos de `assets/img/facebook/` y el logo del cliente.
- Ningún dato fuera de la tabla §3 del spec. 941 290 117 NO se muestra.
- WhatsApp: `51957616607`. Mensaje base: "Hola Nacho Racing, quiero cotizar".
- Colores: `--nr-red #FF3131`, `--nr-blue #2038C8`, `--nr-blue-text #5B7CFF`, `--nr-blue-deep #1A3FA0`, `--nr-white #FFFFFF`, `--ink #0A0C10`, `--wa #25D366` (solo botón WhatsApp).
- Anchos sin scroll horizontal: 360, 390, 768, 1024, 1440.
- Textos de capítulo: máximo 2 líneas en móvil.
- Idioma de la página: español (`lang="es"`).

## Review Focus
- Abrir la página con `file://` (doble clic): los módulos ES fallan → `README` y `npm start` indican usar el servidor; `index.html` muestra el contenido básico aunque JS falle (hero y CTA en HTML estático).
- GSAP/CDN no carga (sin internet): la página debe verse completa sin animaciones → `motion.js` sale temprano si `window.gsap` no existe; contenido nunca empieza con `opacity:0` en CSS.
- Usuario con `prefers-reduced-motion`: sin animaciones de scroll; todo visible.
- Botón WhatsApp fijo tapando el último texto o el mapa en móvil → `padding-bottom` del footer ≥ alto del botón + safe-area.
- Mensaje WhatsApp con tildes/espacios/“¿” → debe ir codificado con `encodeURIComponent` (test en Task 1).

---

### Task 1: Base del proyecto, contenido y enlace WhatsApp

**Files:**
- Create: `package.json`, `.gitignore`, `scripts/serve.mjs`, `js/content.js`, `js/whatsapp.js`
- Test: `tests/whatsapp.test.mjs`, `tests/content.test.mjs`

**Interfaces:**
- Produces: `export function waLink(message?: string): string` en `js/whatsapp.js` → `https://wa.me/51957616607?text=<encoded>`; sin mensaje usa el mensaje base.
- Produces: `export const content` en `js/content.js` con claves: `brand {name, tagline, location}`, `contact {whatsapp:'51957616607', address, reference, hours:'Lunes a viernes · 9:00 – 18:00', facebook}`, `stats [{value,label}]` (3), `specialties string[]`, `chapters [{id, number, title, text, waMessage, images:[{src,alt}]}]` (ids: `desarmamos, armamos, potenciamos, competimos`), `achievements string[]`, `team {title, text, images}`, `visit {title}`.
- `package.json` scripts: `"test": "node --test tests/"`, `"start": "node scripts/serve.mjs"` (puerto 5173, sirve la raíz con MIME correctos para html/css/js/jpg/png/webp/svg/json).

- [ ] **Step 1: Tests**
```js
// tests/whatsapp.test.mjs
import { test } from 'node:test'; import assert from 'node:assert';
import { waLink } from '../js/whatsapp.js';
test('default message', () => assert.strictEqual(waLink(), 'https://wa.me/51957616607?text=' + encodeURIComponent('Hola Nacho Racing, quiero cotizar')));
test('encodes accents and ¿', () => assert.ok(waLink('¿Armado de motor bóxer?').endsWith(encodeURIComponent('¿Armado de motor bóxer?'))));
// tests/content.test.mjs
import { content } from '../js/content.js';
test('chapters ids', () => assert.deepStrictEqual(content.chapters.map(c => c.id), ['desarmamos','armamos','potenciamos','competimos']));
test('no second phone', () => assert.ok(!JSON.stringify(content).includes('941')));
test('images exist', async () => { const fs = await import('node:fs'); for (const c of content.chapters) for (const i of c.images) assert.ok(fs.existsSync(new URL('..'+i.src.replace(/^\./,''), import.meta.url)), i.src); });
test('every image has alt', () => content.chapters.flatMap(c=>c.images).forEach(i => assert.ok(i.alt.length > 5)));
```
- [ ] **Step 2:** `npm test` → FAIL (módulos no existen).
- [ ] **Step 3:** Implementar `waLink`, `content` (datos solo de spec §3; imágenes apuntan a `./assets/img/opt/<nombre>.jpg`), `serve.mjs`, `package.json` con `"type":"module"`.
- [ ] **Step 4:** `npm test` → falla solo `images exist` hasta Task 2 (aceptado); el resto PASS.
- [ ] **Step 5:** Commit `feat: base del proyecto, contenido y enlace WhatsApp`.

### Task 2: Imágenes optimizadas y logo

**Files:**
- Create: `scripts/optimize-images.ps1`, `assets/img/opt/*.jpg`, `assets/img/logo-nr.png`, `assets/img/favicon.png`

- [ ] **Step 1:** Script PowerShell (System.Drawing) que redimensiona cada `assets/img/facebook/*.jpg` a lado mayor 1600 px, JPEG calidad 80, a `assets/img/opt/` con el mismo nombre. (WebP queda para la fase final.)
- [ ] **Step 2:** Copiar el logo entregado por el cliente a `assets/img/logo-nr.png` y generar `favicon.png` 192×192.
- [ ] **Step 3:** `npm test` → todo PASS; cada archivo de `opt/` < 400 KB.
- [ ] **Step 4:** Commit `feat: imágenes optimizadas y logo`.

### Task 3: Estructura HTML, tokens, hero y botón WhatsApp fijo

**Files:**
- Create: `index.html`, `css/tokens.css`, `css/base.css`, `css/hero.css`, `js/main.js`

**Interfaces:**
- Consumes: `content`, `waLink`.
- Produces: en `index.html` los contenedores `#hero`, `#hero-stage` (contiene `<img class="stage-layer" data-stage="open">` = `bloque-boxer-abierto` y `<img class="stage-layer" data-stage="built">` = `boxer-en-soporte`), `.marquee`, `#capitulos`, `#equipo`, `#visitanos`, `footer`, `a.wa-fab`. `js/main.js` importa `render.js` y `motion.js` y llama `renderAll(content)` y luego `initMotion()`.

- [ ] **Step 1:** `index.html` con hero en HTML estático (título "NACHO RACING", subtítulo, CTA `href` = `https://wa.me/51957616607?text=...` literal, "Ver el taller" → `#capitulos`), meta viewport, `theme-color #0A0C10`, OG title/description, fuentes, GSAP con `defer`.
- [ ] **Step 2:** `tokens.css` con los colores de Global Constraints + escalas `clamp()`; `base.css` reset, tipografía (Anton títulos inclinados `skewX(-8deg)`, Inter texto), `.wa-fab` fijo abajo-derecha 56 px, `bottom: calc(16px + env(safe-area-inset-bottom))`.
- [ ] **Step 3:** `hero.css`: stage a pantalla completa, foto bóxer con overlay oscuro + luces radiales rojo (izq.) / azul (der.), título gigante, 3 stats; línea diagonal degradado rojo→blanco→azul al pie; marquee.
- [ ] **Step 4:** Verificar en Chrome (`npm start`, http://localhost:5173) a 390 y 1440: hero legible sin scroll, CTA abre wa.me correcto, sin scroll horizontal.
- [ ] **Step 5:** Commit `feat: hero con motor bóxer y botón WhatsApp`.

### Task 4: Capítulos 01–04

**Files:**
- Create: `js/render.js`, `css/chapters.css`

**Interfaces:**
- Produces: `export function renderAll(content): void` y `renderChapters(el, chapters)`; cada capítulo = `<section class="chapter" id="<id>" data-wa="<waMessage>">` con número grande, título, texto, imágenes; `competimos` usa `.track` (galería horizontal con `overflow-x:auto; scroll-snap-type:x mandatory`) y lista de logros.
- `renderAll` también actualiza `href` del `.wa-fab` al entrar cada capítulo en pantalla (IntersectionObserver) con `waLink(chapter.waMessage)`.

- [ ] **Step 1:** Implementar render y estilos (alternar imagen izq./der. en escritorio, apilado en móvil; capítulo 02 con imagen sticky en ≥1024 px).
- [ ] **Step 2:** Verificar en Chrome 360/768/1440: textos ≤2 líneas en móvil, galería arrastrable, al bajar a "Potenciamos" el `.wa-fab` cambia su `href`.
- [ ] **Step 3:** Commit `feat: capítulos desarmamos-armamos-potenciamos-competimos`.

### Task 5: Equipo, Visítanos y footer (secciones claras)

**Files:**
- Modify: `js/render.js` (`renderTeam`, `renderVisit`), Create: `css/light.css`

- [ ] **Step 1:** Equipo: fondo blanco, `equipo-grupo` a todo ancho + mosaico `equipo-uniforme`, `mecanicos`; título "Las manos detrás de cada motor".
- [ ] **Step 2:** Visítanos: tarjeta "boleto de pits" con dirección, referencia, horario, botones WhatsApp y "Cómo llegar" (Google Maps búsqueda de la dirección), iframe de Google Maps `loading="lazy"`.
- [ ] **Step 3:** Footer con logo, Facebook, año; `padding-bottom` ≥ 56 px + 32 px + safe-area.
- [ ] **Step 4:** Verificar en Chrome 360 y 1440: el `.wa-fab` no tapa botones ni el mapa al final.
- [ ] **Step 5:** Commit `feat: secciones equipo y visítanos`.

### Task 6: Movimiento (GSAP) con respaldo

**Files:**
- Create: `js/motion.js`, Modify: `css/hero.css`

**Interfaces:**
- Produces: `export function initMotion(): void`.

- [ ] **Step 1:** `initMotion` sale si `!window.gsap` o `matchMedia('(prefers-reduced-motion: reduce)').matches`.
- [ ] **Step 2:** Hero: ScrollTrigger con pin del stage, crossfade `data-stage="open"` → `built` + leve escala (insinúa el armado). Capítulos: revelado con `clip-path` de imágenes y subida de textos; marquee infinito; contador en stats.
- [ ] **Step 3:** Verificar en Chrome: con red normal animaciones fluidas; con `gsap` bloqueado (DevTools → block URL) todo el contenido visible; consola sin errores.
- [ ] **Step 4:** Commit `feat: animaciones de scroll con respaldo`.

### Task 7: Revisión con las skills del proyecto

- [ ] **Step 1:** Ejecutar skills `critica-cliente`, `innovacion-web`, `responsive-multiplataforma`, `branding-nacho-racing` sobre el prototipo en Chrome; guardar resultados en `docs/revisiones/2026-11-25-prototipo.md` con capturas.
- [ ] **Step 2:** Corregir hallazgos de severidad alta; `npm test` PASS.
- [ ] **Step 3:** Commit `docs: revisión crítica del prototipo` y presentar al cliente para aprobación (push solo con su autorización).
