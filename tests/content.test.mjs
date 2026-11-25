import { test } from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import { content } from '../js/content.js';

const allImages = () => [
  ...content.chapters.flatMap(c => c.images),
  ...content.team.images,
  ...content.hero.stage,
];

test('chapters ids', () => {
  assert.deepStrictEqual(content.chapters.map(c => c.id), ['desarmamos', 'armamos', 'potenciamos', 'competimos']);
});
test('no second phone', () => {
  assert.ok(!JSON.stringify(content).includes('941'));
});
test('images exist', () => {
  for (const i of allImages()) {
    assert.ok(fs.existsSync(new URL('..' + i.src.replace(/^\./, ''), import.meta.url)), i.src);
  }
});
test('every image has alt', () => {
  allImages().forEach(i => assert.ok(i.alt.length > 5, i.src));
});
