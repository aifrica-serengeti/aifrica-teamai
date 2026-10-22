import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { ROOT } from './lib/config.mjs';
import { inspectSessionComposition } from './lib/session-composition.mjs';

const designRoot = path.join(ROOT, 'docs/agent-hub/design');
const references = ['session.figma.json', 'session.variables.figma.json', 'session.assets.json', 'elevation.figma.json', 'icon-button.figma.json'];
const read = (root, name) => JSON.parse(fs.readFileSync(path.join(root, 'references', name), 'utf8'));
const write = (root, name, value) => fs.writeFileSync(path.join(root, 'references', name), `${JSON.stringify(value, null, 2)}\n`);
const walk = node => [node, ...(node.children ?? []).flatMap(walk)];
const find = (snapshot, id) => snapshot.roots.flatMap(root => walk(root.tree)).find(node => node.nodeId === id);

function fixture(run) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'aifrica-session-composition-'));
  try {
    fs.mkdirSync(path.join(root, 'references'));
    for (const name of references) fs.copyFileSync(path.join(designRoot, 'references', name), path.join(root, 'references', name));
    for (const asset of read(root, 'session.assets.json').assets) {
      const destination = path.join(root, asset.path);
      fs.mkdirSync(path.dirname(destination), { recursive: true });
      fs.copyFileSync(path.join(designRoot, asset.path), destination);
    }
    run(root);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
}

test('Session preserves six source families, nineteen variants, actual panel composition and exact supplied glyphs', () => {
  const report = inspectSessionComposition(designRoot);
  assert.deepEqual(report.issues, []);
  assert.deepEqual(report.panels.map(panel => panel.height), [934, 154]);
  assert(report.panels.every(panel => panel.status === 'match' && panel.contentWidth === 294));
  assert.equal(report.statePalettes.length, 12);
  assert(report.statePalettes.every(variant => variant.status === 'match'));
  assert.equal(report.compositions.length, 26);
  assert(report.compositions.every(composition => composition.status === 'match'));
  assert.equal(report.compositions.filter(composition => composition.selectedSemanticOverride).length, 1);
  assert.equal(report.assets.length, 17);
  assert(report.assets.every(asset => asset.status === 'match'));
  assert.equal(report.runtimeVerified, false);
  assert.equal(report.allStatesVerified, false);
  assert.deepEqual(read(designRoot, 'session-composition.json'), report);
});

test('Session detects lost border space, phantom final connector, wrong same-color alias, resized controls and hidden toggle changes', () => {
  const cases = [
    [snapshot => { snapshot.styles[find(snapshot, '2975:69459').styleRef].layout.strokesIncludedInLayout = false; }, /border included in layout/],
    [snapshot => { find(snapshot, '2975:68166').instance.componentProperties['connector#2987:8'].value = true; }, /last connector explicitly disabled/],
    [snapshot => { snapshot.styles[find(snapshot, '2975:69424').styleRef].visual.fills[0].token = { id: 'VariableID:3081:158', name: 'color/element/primary-subtle' }; }, /actual selected semantic override/],
    [snapshot => { snapshot.styles[find(snapshot, '2975:69422').styleRef].layout.width = 24; }, /actual control frame override/],
    [snapshot => { find(snapshot, '2975:68061').instance.componentProperties['toggle#2986:21'].value = true; }, /empty toggle hidden/],
  ];
  for (const [mutate, expected] of cases) fixture(root => {
    const snapshot = read(root, 'session.figma.json');
    mutate(snapshot);
    write(root, 'session.figma.json', snapshot);
    assert(inspectSessionComposition(root).issues.some(issue => expected.test(issue)), String(expected));
  });
});

test('Session catches a rescaled file-icon stroke even when a changed fixture declares its new matching checksum', () => {
  fixture(root => {
    const manifest = read(root, 'session.assets.json');
    const asset = manifest.assets.find(entry => entry.role === 'file-text-16');
    const file = path.join(root, asset.path);
    const svg = fs.readFileSync(file, 'utf8').replaceAll('stroke-width="1.25"', 'stroke-width="1"');
    fs.writeFileSync(file, svg);
    asset.sha256 = createHash('sha256').update(svg).digest('hex');
    asset.bytes = Buffer.byteLength(svg);
    write(root, 'session.assets.json', manifest);
    assert(inspectSessionComposition(root).issues.some(issue => issue.includes('exact export stroke widths')));
  });
});
