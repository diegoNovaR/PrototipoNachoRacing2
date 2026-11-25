# Landing Nacho Racing — Diseño

Fecha: 2026-11-25 · Repo: github.com/diegoNovaR/PrototipoNachoRacing2 (privado)

## 1. Intención
Página informativa de una sola vista (one-page), solo front, para **captar clientes de alto rendimiento** (dueños de Subaru y autos deportivos, pilotos de rally/piques/circuito) para el taller Nacho Racing de Sachaca, Arequipa. Toda la página empuja a una acción: **escribir por WhatsApp al 957 616 607**.

Debe sentirse: moderna y no tradicional · confiable y segura · emocionante (personas reales, competencia) · elegante.

## 2. Objetivos, no-objetivos, anti-objetivos
**Objetivos**
- En 3 s se entiende: taller especialista en motores de alto rendimiento en Arequipa → botón WhatsApp.
- Contar el trabajo como historia "del bloque a la pista" con fotos reales del Facebook.
- Excelente en celular (tráfico principal desde Facebook/WhatsApp) y vistosa en escritorio.

**No-objetivos**
- Backend, formularios, tienda, blog, reservas, precios.
- Generar imágenes con Higgsfield (en pausa hasta nuevo aviso del cliente).

**Anti-objetivos (fracaso aunque "funcione")**
- Parecer plantilla de taller genérico (banner + iconos + "quiénes somos").
- Textos de relleno, servicios o cifras inventadas.
- Animaciones que traben el scroll o tarden en cargar en un celular de gama media.

## 3. Datos permitidos (fuente)
| Dato | Fuente | Estado |
|---|---|---|
| Nombre, logo NR | Cliente | Confirmado |
| Dirección: Carretera Variante de Uchumayo km 1.5, Sachaca (a la derecha del grifo Petroamérica / frente a Cruz del Sur) | Facebook | Confirmado |
| WhatsApp 957 616 607 | Facebook + cliente | Confirmado (uso actual) |
| Teléfono 941 290 117 | Portada de Facebook | Encontrado — se muestra solo si el cliente lo aprueba |
| Horario L–V 9:00–18:00 | Banner del Facebook | Confirmado |
| 2,9 mil seguidores | Facebook | Confirmado |
| Lema "servicio de calidad al mejor precio del mercado" | Facebook | Confirmado |
| Logro: piloto Dany Pérez, 1.er puesto Super Turismo y 2.º en la general | Publicación Facebook | Confirmado |
| "1er puesto Copa RPG · Piques legales 2023" | Prototipo anterior | Provisional (cliente autorizó, editable) |
| Especialidades: Subaru EJ20 · EJ25 · FA20 · EVO 4G63, armado de motores, turbo, pista | Prototipo anterior + fotos | Provisional (editable) |
| Servicios: armado de motores, turbo & admisión, motores de competencia | Prototipo anterior + fotos | Provisional (editable) |

Todo dato vive en un único archivo `content.js` para editarlo sin tocar el diseño.

## 4. Enfoques considerados
- **A · "Del bloque a la pista"** — recorrido narrativo por capítulos con scroll, base oscura elegante. **Elegido**: es lo menos tradicional y aprovecha las fotos reales.
- B · Telemetría / pit wall — HUD, tacómetros. Descartado: efectista, menos elegante, poco espacio para el equipo.
- C · Editorial premium claro — Descartado como base; se toma su estilo claro para las secciones "Equipo" y "Visítanos" (contraste de ritmo y confianza).

## 5. Estructura de la página
| # | Sección | Contenido | Fotos | Idea no tradicional |
|---|---|---|---|---|
| 0 | Hero | "NACHO RACING" gigante inclinado (eco del logo), subtítulo especialista alto rendimiento · Arequipa, CTA WhatsApp + "Ver el taller", 3 datos (logro, 2,9K seguidores, L–V 9–18) | **Fondo: motor bóxer** (`boxer-en-soporte`, `bloque-armado`) | Escenario preparado para la futura animación de piezas instalándose (ver §7) |
| — | Cinta | Marquee de especialidades | — | Línea diagonal rojo→blanco→azul |
| 01 | Desarmamos | Frase corta sobre diagnóstico y desarme | `bloque-boxer-abierto` | Foto que se "abre" con máscara al hacer scroll |
| 02 | Armamos | Medidas y torques controlados | `taller-motores-soportes`, `taller-banco` | Imagen fija (sticky) con texto que pasa |
| 03 | Potenciamos | Turbo, intercooler, admisión | `turbo` | Zoom suave + recorte duotono |
| 04 | Competimos | Logro Dany Pérez, Copa RPG (provisional), autos 158 y 639 | `rally-158`, `rally-639`, `trofeos`, `evento-pista` | Galería horizontal arrastrable |
| 05 | El equipo (claro) | "Las manos detrás de cada motor" | `equipo-grupo`, `equipo-uniforme`, `mecanicos` | Foto a todo ancho, momento emocional |
| 06 | Visítanos (claro) | Dirección + referencias, horario, mapa (Google Maps embebido), WhatsApp, Facebook | `banner-horario` opcional | Tarjeta tipo "boleto de pits" |
| — | Footer | Logo, enlaces, año | — | — |
| fijo | Botón WhatsApp | Siempre visible, zona del pulgar; mensaje prellenado "Hola Nacho Racing, quiero cotizar…" | — | En cada capítulo el mensaje cambia según el servicio |

## 6. Marca y estilo
- Paleta del logo (ver skill `branding-nacho-racing`): rojo #FF3131, azul #2038C8 (texto sobre oscuro aclarado a ~#5B7CFF), azul profundo #1A3FA0, blanco, fondo #0A0C10. Verde WhatsApp solo en ese botón.
- Proporción ~70 % neutros / 20 % azul / 10 % rojo.
- Tipografía: display condensada inclinada (eco del logo) + sans legible. Propuesta: *Anton* o *Bebas Neue* para títulos, *Inter* para texto (Google Fonts).
- Elegancia: mucho aire, pocas fuentes, fotos bien recortadas, sin sombras pesadas.

## 7. Hero con motor bóxer y animación futura
- **Ahora (prototipo):** fondo con foto real del bóxer, oscurecida y con luz roja/azul; al hacer scroll un efecto simple pasa de `bloque-boxer-abierto` → `bloque-armado` para insinuar el armado.
- **Después (pedido del cliente, fase posterior):** animación de piezas instalándose hasta quedar el motor armado. El hero se construye como un "escenario" con una sola capa intercambiable (imagen → secuencia de imágenes/video/canvas) para que esa animación entre sin rehacer el layout. Fuente del material (Higgsfield, 3D o video) por definir con el cliente.

## 8. Técnica
- HTML + CSS + JavaScript sin framework; GSAP + ScrollTrigger (CDN, versión fija) para el scroll; sitio estático publicable en GitHub Pages.
- Imágenes convertidas a WebP con `srcset`, lazy-load salvo hero.
- `prefers-reduced-motion` desactiva animaciones; contraste AA.
- `manifest.json` + iconos NR + `theme-color` (instalable en el celular).
- Verificación con Chrome del usuario en 360/390/768/1024/1440 px y con las 4 skills del proyecto.

## 9. Proceso
1. Aprobación de este documento.
2. **Prototipo** navegable (todas las secciones, contenido real, animaciones básicas) → revisión con el cliente usando las skills → ajustes.
3. **Desarrollo final**: pulido de animaciones, optimización, PWA, publicación.

## 10. Decisiones tomadas por Claude (revisables)
- Tipografías Anton/Bebas Neue + Inter.
- Mensaje de WhatsApp prellenado por sección.
- Mapa con Google Maps embebido.
- 941 290 117 no se muestra hasta confirmación.
- Repo privado (GitHub Pages gratis requiere pasarlo a público).

## 11. Pendiente para el builder
- Textos finales de cada capítulo (cortos, máx. 2 líneas), basados solo en los datos de §3.
- Recortes y tratamiento de cada foto.
