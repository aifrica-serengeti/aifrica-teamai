import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { ROOT } from './lib/config.mjs';

const references = path.join(ROOT, 'docs/agent-hub/design/references');
const readJson = name => JSON.parse(fs.readFileSync(path.join(references, name), 'utf8'));
const catalog = readJson('tokens.figma.json');
const resolved = readJson('tokens.variables.figma.json');
const metadata = fs.readFileSync(path.join(references, 'tokens.metadata.figma.xml'), 'utf8');
const byName = new Map(catalog.changes.map(change => [change.name, change]));

test('Agent Hub token changes keep metadata evidence separate from resolved context variables', () => {
  assert.equal(catalog.solution, 'agent-hub');
  assert.equal(catalog.source.nodeId, '3478:22777');
  assert.deepEqual(catalog.source, resolved.source);
  assert.equal(catalog.changes.length, 18);
  assert.equal(byName.size, catalog.changes.length);
  assert.equal((metadata.match(/name="Row"/g) ?? []).length, catalog.changes.length);
  assert.equal(catalog.changes.filter(change => change.kind === 'semantic-addition').length, 17);
  assert.equal(catalog.changes.filter(change => change.kind === 'primitive-update').length, 1);
  assert(Object.keys(resolved.values).length > catalog.changes.length);

  for (const change of catalog.changes) {
    assert.match(change.name, /^[a-z][a-z0-9/-]+$/);
    assert.match(change.changedAt, /^2026-10-\d{2}$/);
    assert.match(change.resolvedHex, /^#[a-f0-9]{6}(?:[a-f0-9]{2})?$/);
    assert.equal(change.resolvedHex, resolved.values[change.name]);
    assert(metadata.includes(`id="${change.rowNodeId}" name="Row"`));
    assert(metadata.includes(`name="${change.name}"`));
    assert(change.usage.length > 0);
    for (const id of change.sampleNodeIds) assert(metadata.includes(`id="${id}"`));
    if (change.kind === 'semantic-addition') {
      assert.equal(change.sourceAnnotation, `→ ${change.reportedPrimitiveAlias}`);
      assert(metadata.includes(`name="${change.sourceAnnotation}"`));
    }
  }
});

test('button and selection changes retain independent state roles and original alpha', () => {
  const active = byName.get('color/button/opacity-active');
  assert.equal(active.reportedPrimitiveAlias, 'alpha/100');
  assert.equal(active.resolvedHex, '#0000001a');
  assert.notEqual(active.resolvedHex, resolved.values['color/action/default-selected-hovered']);
  assert.equal(byName.get('color/action/default-disabled').reportedPrimitiveAlias, 'Monochrome/white');
  assert.equal(byName.get('color/action/default-disabled').resolvedHex, '#ffffff');
  assert.equal(byName.get('color/action/default-selected-hovered').resolvedHex, '#cce0ff');
  assert.equal(byName.get('color/action/default-selected-pressed').resolvedHex, '#99c2ff');
  assert.equal(byName.get('color/element/gray-subtler').resolvedHex, '#dddddd');
  assert.equal(byName.get('color/element/neutral').resolvedHex, '#8f8f8f');
});

test('code tokens preserve semantic names even when the resolved color is equal', () => {
  assert.equal(catalog.changes.filter(change => change.name.startsWith('color/code/')).length, 11);
  for (const role of ['text', 'line-number-current', 'cursor']) {
    assert.equal(byName.get(`color/code/${role}`).reportedPrimitiveAlias, 'gray/900');
    assert.equal(byName.get(`color/code/${role}`).resolvedHex, '#1c1c1c');
  }
  for (const [role, primitive, value] of [
    ['keyword', 'code/red', '#cf222e'],
    ['function', 'code/purple', '#8250df'],
    ['constant', 'code/blue', '#0550ae'],
    ['string', 'code/navy', '#0a3069'],
  ]) {
    assert.equal(byName.get(`color/code/${role}`).reportedPrimitiveAlias, primitive);
    assert.equal(byName.get(`color/code/${role}`).resolvedHex, value);
  }
  assert.equal(byName.get('color/code/line-fill-current').reportedPrimitiveAlias, 'alpha/50');
  assert.equal(byName.get('color/code/line-fill-current').resolvedHex, '#0000000d');
  assert.equal(byName.get('color/code/guide').resolvedHex, '#eeeeee');
});

test('yellow replaces the existing primitive without inventing a step or unobserved native graph', () => {
  const yellow = byName.get('yellow/600');
  assert.equal(yellow.kind, 'primitive-update');
  assert.equal(yellow.previousHex, '#d79c04');
  assert.equal(yellow.resolvedHex, '#f2a900');
  assert.equal(yellow.reportedPrimitiveAlias, null);
  assert.deepEqual(yellow.reportedDependentSemanticTokens, ['color/text/yellow-bold']);
  assert.equal(byName.has('yellow/550'), false);
  assert.equal(catalog.capture.nativeVariableGraphAvailable, false);
  assert.equal(catalog.capture.runtimeVerified, false);
  assert.equal(catalog.capture.variableIds, null);
  assert.equal(catalog.capture.modeIds, null);
  assert.equal(resolved.nativeVariableGraphAvailable, false);
  assert.equal(resolved.values['color/text/yellow-bold'], undefined);
});
