import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { ROOT } from './lib/config.mjs';

const designRoot = path.join(ROOT, 'docs/agent-hub/design');
const readJson = relative => JSON.parse(fs.readFileSync(path.join(designRoot, relative), 'utf8'));
const observation = readJson('references/cards-actions-refresh.figma.json').actionBar;
const manifest = readJson('references/components-refresh.assets.json');
const bySource = new Map(manifest.assets.map(asset => [asset.sourceAsset, asset]));
const attributes = tag => Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map(match => [match[1], match[2]]));
const paths = sourceAsset => {
  const asset = bySource.get(sourceAsset);
  assert(asset, sourceAsset);
  const svg = fs.readFileSync(path.join(designRoot, asset.path), 'utf8');
  return [...svg.matchAll(/<path\b[^>]*>/g)].map(match => attributes(match[0]));
};
const color = value => value === 'white' ? '#FFFFFF' : value?.toUpperCase();

// context 변수1.25를 실제16px path에 추가하는 오류를 원본 export와 교차 검사합니다.
test('ActionBar16px path는 SVG 기본1px,20px icon-action은 명시1.25px를 보존한다', () => {
  const actionSlots = observation.assetSlots.filter(slot => slot.displaySizePx.every(size => size === 16));
  assert.equal(actionSlots.length, 12);
  for (const slot of actionSlots) {
    const stroked = paths(slot.sourceAsset).filter(item => item.stroke && item.stroke !== 'none');
    assert(stroked.length > 0, slot.slot);
    for (const item of stroked) {
      assert.equal(item['stroke-width'], undefined, `${slot.slot}: 원본은 stroke-width 생략`);
      assert.equal(Number(item['stroke-width'] ?? 1), 1, slot.slot);
    }
  }
  for (const size of Object.values(observation.parts.action.sizes)) assert.equal(size.glyphStroke, 1);
  assert.equal(observation.parts.action.resolvedVariables['var(--icon-stroke-16)'], '1.25');
  for (const slot of observation.assetSlots.filter(slot => slot.slot.startsWith('iconAction.'))) {
    for (const item of paths(slot.sourceAsset).filter(item => item.stroke)) assert.equal(Number(item['stroke-width'] ?? 1), 1.25, slot.slot);
  }
});

test('조합 action2와 기본 숨김 more의 paint는 독립 part의 palette로 덮지 않는다', () => {
  assert.equal(observation.parts.action.states.disabled.glyph, '#AAAAAA');
  assert.equal(observation.generatedProperties.more, false);
  assert.equal(observation.composedPaintOverrides.length, 4);
  for (const record of observation.composedPaintOverrides) {
    const actual = paths(record.sourceAsset);
    for (const item of actual.filter(item => item.stroke)) assert.equal(Number(item['stroke-width'] ?? 1), record.glyphStroke, record.slot);
    if (record.slot.endsWith('action2.disabled')) {
      assert.equal(record.glyphColor, '#8F8F8F');
      assert.equal(record.standaloneDisabledGlyph, '#AAAAAA');
      assert(actual.filter(item => item.stroke).every(item => color(item.stroke) === record.glyphColor), record.slot);
    } else {
      assert.equal(record.defaultVisible, false, record.slot);
      assert.deepEqual(actual.map(item => color(item.fill)), record.pathFills.map(color), record.slot);
      assert.deepEqual(actual.map(item => color(item.stroke)), record.pathStrokes.map(color), record.slot);
    }
  }
});
