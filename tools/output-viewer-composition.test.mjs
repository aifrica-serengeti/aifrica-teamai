import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { ROOT } from './lib/config.mjs';
import { inspectOutputViewerComposition } from './lib/output-viewer-composition.mjs';

const designRoot = path.join(ROOT, 'docs/agent-hub/design');
const references = ['output-viewer.figma.json', 'output-viewer.variables.figma.json', 'output-viewer.assets.json', 'elevation.figma.json', 'icon-button.figma.json'];
const read = (root, name) => JSON.parse(fs.readFileSync(path.join(root, 'references', name), 'utf8'));
const write = (root, name, value) => fs.writeFileSync(path.join(root, 'references', name), `${JSON.stringify(value, null, 2)}\n`);
const walk = node => [node, ...(node.children ?? []).flatMap(walk)];
const find = (snapshot, id) => snapshot.roots.flatMap(root => walk(root.tree)).find(node => node.nodeId === id);

function fixture(run) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'aifrica-output-viewer-composition-'));
  try {
    fs.mkdirSync(path.join(root, 'references'));
    for (const name of references) fs.copyFileSync(path.join(designRoot, 'references', name), path.join(root, 'references', name));
    for (const asset of read(root, 'output-viewer.assets.json').assets) {
      const destination = path.join(root, asset.path);
      fs.mkdirSync(path.dirname(destination), { recursive: true });
      fs.copyFileSync(path.join(designRoot, asset.path), destination);
    }
    run(root);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
}

test('OutputViewer preserves native SLOT, mixed corners/edges, actual ghost24 glyph swaps and intact exact assets', () => {
  const report = inspectOutputViewerComposition(designRoot);
  assert.deepEqual(report.issues, []);
  assert.equal(report.shell.status, 'match');
  assert.equal(report.shell.contentType, 'SLOT');
  assert.equal(report.shell.rendererVerified, false);
  assert.equal(report.controls.length, 2);
  assert(report.controls.every(control => control.status === 'match'));
  assert.deepEqual(report.controls.map(control => control.glyphSourceNodeId), ['3015:24201', '2311:46284']);
  assert.equal(report.assets.length, 3);
  assert(report.assets.every(asset => asset.status === 'match'));
  assert.equal(report.runtimeVerified, false);
  assert.equal(report.allStatesVerified, false);
  assert.deepEqual(read(designRoot, 'output-viewer-composition.json'), report);
});

test('OutputViewer catches uniform corner substitution, doubled seam, lost SLOT/Boolean binding and misleading plus source', () => {
  const cases = [
    [snapshot => { snapshot.styles[find(snapshot, '3015:24203').styleRef].visual.cornerRadii.bottomLeftRadius = 16; }, /header asymmetric corners/],
    [snapshot => { snapshot.styles[find(snapshot, '3015:24236').styleRef].visual.border.top = 1; }, /content omits top border/],
    [snapshot => { find(snapshot, '3015:24236').type = 'FRAME'; }, /content remains native SLOT/],
    [snapshot => { delete find(snapshot, '3015:24208').componentPropertyReferences.visible; }, /exact visibility targets/],
    [snapshot => { find(snapshot, 'I3015:24222;2427:25109').instance.source.id = '2365:15015'; }, /actual glyph source overrides generated plus name/],
  ];
  for (const [mutate, expected] of cases) fixture(root => {
    const snapshot = read(root, 'output-viewer.figma.json');
    mutate(snapshot);
    write(root, 'output-viewer.figma.json', snapshot);
    assert(inspectOutputViewerComposition(root).issues.some(issue => expected.test(issue)), String(expected));
  });
});

test('OutputViewer rejects a false24px asset viewBox even when a changed fixture has a new matching checksum', () => {
  fixture(root => {
    const manifest = read(root, 'output-viewer.assets.json');
    const asset = manifest.assets.find(entry => entry.role === 'maximize-16');
    const file = path.join(root, asset.path);
    const svg = fs.readFileSync(file, 'utf8').replace('viewBox="0 0 16 16"', 'viewBox="0 0 24 24"');
    fs.writeFileSync(file, svg);
    asset.sha256 = createHash('sha256').update(svg).digest('hex');
    asset.bytes = Buffer.byteLength(svg);
    write(root, 'output-viewer.assets.json', manifest);
    assert(inspectOutputViewerComposition(root).issues.some(issue => issue.includes('viewBox')));
  });
});
