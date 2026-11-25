---
name: responsive-multiplataforma
description: Revisa el desarrollo front de Nacho Racing para móvil (prioridad), tablet y escritorio, incluyendo comportamiento tipo app (PWA, botón WhatsApp fijo, gestos). Usar al diseñar layouts y antes de dar por terminado un prototipo o la versión final.
---

# Desarrollo móvil y escritorio

## Anchos a probar
360, 390, 768, 1024, 1440, 1920 px. Sin scroll horizontal en ninguno.

## Móvil (la mayoría del tráfico vendrá de Facebook/WhatsApp)
- Botón WhatsApp fijo, zona del pulgar (abajo), ≥48 px, sin tapar contenido clave.
- Hero legible sin zoom; títulos con `clamp()`.
- Imágenes `srcset`/WebP, `loading="lazy"` salvo el hero.
- Animaciones ligeras (transform/opacity), desactivadas con `prefers-reduced-motion`.
- Enlaces `tel:` y `https://wa.me/51…` funcionan en un toque; mapa abre Google Maps.

## Escritorio
- Aprovechar el ancho con composiciones editoriales (grid asimétrico), no estirar el móvil.
- Hover con sentido; nada esencial solo en hover (no existe en táctil).

## Tipo app
- `manifest.json` + iconos del logo NR + `theme-color` para que se pueda "Agregar a inicio".
- Safe areas (`env(safe-area-inset-bottom)`) para iPhone.

## Verificación
Usar el navegador (Chrome) en cada ancho, capturar pantalla, revisar consola sin errores y Lighthouse móvil (objetivo: Rendimiento ≥85, Accesibilidad ≥90).

## Salida
Tabla `Ancho | Problema | Captura/Evidencia | Arreglo`.
