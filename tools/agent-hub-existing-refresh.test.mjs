import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { ROOT } from './lib/config.mjs';

const designRoot = path.join(ROOT, 'docs/agent-hub/design');
const read = relative => fs.readFileSync(path.join(designRoot, relative));
const snapshot = JSON.parse(read('references/existing-components-refresh.figma.json'));
const metadataBytes = read('references/components-refresh-2026-11-05.metadata.xml');
const metadata = new Map([...metadataBytes.toString('utf8').matchAll(/<(?:frame|symbol)\b[^>]*>/g)].map(match => {
  const attrs = Object.fromEntries([...match[0].matchAll(/([\w:-]+)="([^"]*)"/g)].map(part => [part[1], part[2]]));
  return [attrs.id, attrs];
}));
const byId = new Map(snapshot.components.map(component => [component.componentId, component]));
const box = value => [Number(value.width), Number(value.height)];

// 현재 metadata 관찰과 과거 실측을 함께 검사하여 과거 수치를 조용히 덮어쓰는 회귀를 막습니다.
test('기존6계열의 현재 관찰은 보드 원본과 연결되고 최초 실측은 보존된다', () => {
  assert.equal(createHash('sha256').update(metadataBytes).digest('hex'), snapshot.source.metadataSha256);
  assert.equal(snapshot.evidenceRules.nativePropertiesRecollected, false);
  assert.equal(byId.size, 6);
  for (const component of snapshot.components) {
    assert(metadata.has(component.correspondingBoardNodeId), component.componentId);
    for (const variant of component.metadataVariants) {
      const original = metadata.get(variant.id);
      assert(original, variant.id);
      assert.equal(variant.name, original.name, variant.id);
      assert.deepEqual(box(variant), box(original), variant.id);
    }
    const history = component.historicalSnapshot;
    assert.equal(createHash('sha256').update(read(history.path)).digest('hex'), history.sha256, history.path);
  }
});

test('Button의 추가8종은 primary24와 ghost32의4상태만 늘린다', () => {
  const component = byId.get('AgentHubButton');
  const history = JSON.parse(read(component.historicalSnapshot.path));
  const oldIds = new Set(history.variants.map(variant => variant.nodeId));
  const added = component.metadataVariants.filter(variant => !oldIds.has(variant.id));
  assert.equal(oldIds.size, 44);
  assert.equal(component.metadataVariants.length, 52);
  assert.equal(added.length, 8);
  assert.deepEqual(new Set(added.map(variant => variant.id)), new Set(component.observations.addedSourceNodeIds));
  for (const recipe of component.observations.addedSizeRecipes) {
    const variants = added.filter(variant => variant.name.startsWith(`type=${recipe.type}, size=${recipe.size}, `));
    assert.equal(variants.length, 4);
    assert.deepEqual(new Set(variants.map(variant => variant.name.split('state=')[1])), new Set(['enabled', 'hovered', 'pressed', 'disabled']));
    assert(variants.every(variant => variant.height === recipe.size));
  }
});

test('Scrollbar·Divider는 축별 샘플을 구분하고 no-runtime은20px 헤더로78px를 구성한다', () => {
  const scroll = byId.get('AgentHubScrollbar').observations;
  const vertical = scroll.directions.find(item => item.direction === 'vertical');
  const horizontal = scroll.directions.find(item => item.direction === 'horizontal');
  assert.deepEqual(box(horizontal), box(vertical).reverse());
  assert.deepEqual(box(horizontal.thumb), box(vertical.thumb).reverse());
  for (const item of scroll.directions) {
    assert.deepEqual(box(item), box(metadata.get(item.nodeId)));
    assert.deepEqual([item.thumb.x, item.thumb.y], [3, 3]);
  }
  for (const item of byId.get('Divider').observations.directions) {
    assert.equal(item.width, item.lineWidth + item.paddingX * 2);
    assert.equal(item.height, item.lineHeight + item.paddingY * 2);
  }
  const session = byId.get('AgentHubSessionPanel').observations;
  const empty = session.newState;
  const surface = session.surfaceFromContext;
  assert.deepEqual(box(empty), box(metadata.get(empty.nodeId)));
  assert.equal(empty.toggleVisible || empty.actionVisible || empty.countVisible, false);
  // 두 텍스트20px·간격4px·상하 padding32px·border2px로 확인한 외곽을 설명합니다.
  assert.equal(empty.height, surface.hintLineHeight * 2 + surface.sectionGap + surface.paddingY * 2 + surface.borderWidth * 2);
});

test('FilterChip의 동일 폭과 Group의344→334 변경을 구분하고 미확인 내부 배치를 만들지 않는다', () => {
  const chip = byId.get('AgentHubFilterChip');
  assert.deepEqual(chip.observations.currentNativeStrokesIncludedInLayout, { collected: false, value: null });
  for (const size of ['sm', 'md', 'lg']) {
    const variants = chip.metadataVariants.filter(variant => variant.name.startsWith(`size=${size}, `));
    assert.equal(variants.length, 8);
    const expected = chip.observations.latestMetadataSizes[size];
    assert(variants.every(variant => variant.width === expected.width && variant.height === expected.height));
  }
  const group = byId.get('AgentHubFilterChipGroup');
  const old = JSON.parse(read(group.historicalSnapshot.path));
  const oldHug = old.variants.find(variant => variant.nodeId === '3099:25138');
  const oldLayout = old.styles[oldHug.styleRef].layout;
  const current = metadata.get('3099:25138');
  assert.deepEqual([oldLayout.width, oldLayout.height], group.observations.historicalHugSample);
  assert.deepEqual(box(current), group.observations.currentHugSample);
  assert.deepEqual([oldLayout.width, Number(current.width)], [344, 334]);
  assert.equal(group.observations.currentNestedInstanceDetailsCollected, false);
  assert.equal(group.observations.currentWrapRowItemCounts, null);
});
