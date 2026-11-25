import { test } from 'node:test';
import assert from 'node:assert';
import { waLink } from '../js/whatsapp.js';

test('default message', () => {
  assert.strictEqual(waLink(), 'https://wa.me/51957616607?text=' + encodeURIComponent('Hola Nacho Racing, quiero cotizar'));
});
test('encodes accents and ¿', () => {
  assert.ok(waLink('¿Armado de motor bóxer?').endsWith(encodeURIComponent('¿Armado de motor bóxer?')));
});
