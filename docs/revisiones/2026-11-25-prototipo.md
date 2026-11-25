# Revisión crítica del prototipo — 2026-11-25

Revisado en el Chrome del usuario: escritorio (1568 px) y `dev/responsive.html` (360 / 390 / 768 px).

## critica-cliente
| Momento | Lo que ve el cliente | Lo que siente | Problema | Arreglo |
|---|---|---|---|---|
| 0–3 s | Motor bóxer abierto + "NACHO RACING" gigante + botón rojo WhatsApp | "Esto es serio, saben de motores" | — | — |
| Hero → scroll | El motor pasa de abierto a armado | Curiosidad | Aún es un fundido, no la animación de piezas | Fase siguiente (animación de armado) |
| Capítulos 01–04 | Fotos reales del taller, turbo, autos 158/639 | Confianza técnica | — | — |
| Competimos | Logros de Dany Pérez y Copa RPG | Orgullo / prueba social | Copa RPG es dato provisional | Confirmar con el cliente |
| Equipo | Foto grande del grupo con gorras NR | Cercanía, emoción | — | — |
| Visítanos | Dirección, referencia, horario, mapa | Seguridad de llegar | El mapa centra la zona, no el local exacto | Pedir enlace exacto de Google Maps |
| Siempre | Botón WhatsApp verde, cambia mensaje por sección | Facilidad | — | — |

Puntaje: Atención 8 · Confianza 8 · Emoción 7 · Conversión 8.

## innovacion-web
| Idea | Por qué no es tradicional | Riesgo | Decisión |
|---|---|---|---|
| Narrativa por capítulos 01–04 | Cuenta el proceso en vez de listar servicios | Ninguno | Mantener |
| Hero con motor que "se arma" | Prepara el momento wow | Aún es fundido simple | Mantener; mejorar en fase final |
| Revelado diagonal de fotos | Eco de la diagonal del logo | Leve costo en móviles viejos | Mantener (se apaga con reduced-motion) |
| WhatsApp contextual | Mensaje distinto por sección | Ninguno | Mantener |
| Pase de pits en Visítanos | Dato práctico con estilo de carrera | Ninguno | Mantener |

## responsive-multiplataforma
| Ancho | Problema | Arreglo |
|---|---|---|
| 360 / 390 | 2 px de scroll horizontal por el título inclinado | `overflow-x: clip` en html/body ✅ |
| 360 | Botón "Escríbenos por WhatsApp" partido en 2 líneas | Botones a ancho completo en ≤480 px ✅ |
| Todos | Footer no tapado por el botón WhatsApp | OK |
| — | PWA (manifest) e imágenes WebP | Pendiente para fase final (según plan) |

## branding-nacho-racing
| Elemento | Problema | Corrección |
|---|---|---|
| Eyebrow rojo sobre fondo claro | #FF3131 sobre #F5F6F8 ≈ 3.3:1 (no pasa AA en texto pequeño) | Usar #D91E1E ✅ |
| Títulos azules sobre oscuro | Se usa #5B7CFF (legible) | OK |
| Proporción de color | Neutros dominan, rojo solo en acción, azul en confianza | OK |
| Verde WhatsApp | Solo en el botón flotante | OK |
