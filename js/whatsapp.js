export const WA_NUMBER = '51957616607';
export const WA_DEFAULT = 'Hola Nacho Racing, quiero cotizar';

/** Enlace wa.me con mensaje prellenado (codificado). */
export function waLink(message = WA_DEFAULT) {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
}
