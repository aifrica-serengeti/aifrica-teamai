import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { ROOT } from './lib/config.mjs';
import { inspectPickerComposition } from './lib/picker-composition.mjs';

const designRoot = path.join(ROOT, 'docs/agent-hub/design');
const references = ['picker.figma.json', 'picker.variables.figma.json', 'picker.assets.json',
  'search.figma.json', 'elevation.figma.json', 'icon-button.figma.json'];
const read = (root, name) => JSON.parse(fs.readFileSync(path.join(root, 'references', name), 'utf8'));
const write = (root, name, value) => fs.writeFileSync(path.join(root, 'references', name), `${JSON.stringify(value, null, 2)}\n`);
const walk = node => [node, ...(node.children ?? []).flatMap(walk)];
const find = (snapshot, id) => snapshot.roots.flatMap(root => walk(root.tree)).find(node => node.nodeId === id);

function fixture(run) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'aifrica-picker-composition-'));
  try {
    fs.mkdirSync(path.join(root, 'references'));
    for (const name of references) fs.copyFileSync(path.join(designRoot, 'references', name), path.join(root, 'references', name));
    fs.copyFileSync(path.join(designRoot, 'asset-manifest.json'), path.join(root, 'asset-manifest.json'));
    for (const asset of read(root, 'picker.assets.json').assets) {
      const destination = path.join(root, asset.path);
      fs.mkdirSync(path.dirname(destination), { recursive: true });
      fs.copyFileSync(path.join(designRoot, asset.path), destination);
    }
    run(root);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
}

test('Picker distinguishes actual reuse, intentional overrides, static clipping and original local assets', () => {
  const report = inspectPickerComposition(designRoot);
  assert.deepEqual(report.issues, []);
  for (const [field, count] of [['items', 6], ['customRows', 4], ['navigationRows', 14], ['footers', 2], ['shells', 2], ['buttons', 4]]) {
    assert.equal(report[field].length, count);
    assert(report[field].every(entry => entry.status === 'match'));
  }
  assert.equal(report.search.filterVisibleOverride, true);
  assert.equal(report.search.status, 'match');
  assert.deepEqual(report.footers.map(footer => footer.discoveryBranchPresent), [true, false]);
  assert(report.assets.every(asset => asset.status === 'match'));
  assert.equal(report.runtimeVerified, false);
  assert.equal(report.allStatesVerified, false);
  assert.deepEqual(read(designRoot, 'picker-composition.json'), report);
});

test('Picker rejects false item reuse, lost radius/filter overrides, exposed hidden fades and all-edge footer borders', () => {
  const cases = [
    [snapshot => { find(snapshot, '2978:58137').instance.source.id = '2627:61936'; }, /navigation source must not be PickerItem36/],
    [snapshot => { snapshot.styles[find(snapshot, '3016:104807').styleRef].visual.radius = 6; }, /explicit radius8 override/],
    [snapshot => { find(snapshot, '3079:114040').instance.componentProperties['filter#3124:0'].value = false; }, /explicitly enables filter Boolean/],
    [snapshot => { snapshot.styles[find(snapshot, '2978:58131').styleRef].visual.opacity = 1; }, /gradient branch remains opacity-zero/],
    [snapshot => { snapshot.styles[find(snapshot, '2978:58170').styleRef].visual.border.bottom = 1; }, /only top edge/],
  ];
  for (const [mutate, expected] of cases) fixture(root => {
    const snapshot = read(root, 'picker.figma.json');
    mutate(snapshot);
    write(root, 'picker.figma.json', snapshot);
    assert(inspectPickerComposition(root).issues.some(issue => expected.test(issue)), String(expected));
  });
});

test('Picker checks native PNG dimensions even when a changed fixture has a matching declared checksum', () => {
  fixture(root => {
    const manifest = read(root, 'picker.assets.json');
    const asset = manifest.assets.find(entry => entry.format === 'png');
    const file = path.join(root, asset.path), bytes = fs.readFileSync(file);
    bytes.writeUInt32BE(asset.width + 1, 16);
    fs.writeFileSync(file, bytes);
    asset.sha256 = createHash('sha256').update(bytes).digest('hex');
    if (asset.sha1) asset.sha1 = createHash('sha1').update(bytes).digest('hex');
    write(root, 'picker.assets.json', manifest);
    assert(inspectPickerComposition(root).issues.some(issue => issue.includes('native PNG dimensions')));
  });
});
