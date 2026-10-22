import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { ROOT } from './lib/config.mjs';
import { inspectCardComposition } from './lib/card-composition.mjs';

const designRoot = path.join(ROOT, 'docs/agent-hub/design');
const references = ['card.figma.json', 'card.variables.figma.json', 'card.assets.json', 'elevation.figma.json', 'button.figma.json', 'icon-button.figma.json'];
const read = (root, name) => JSON.parse(fs.readFileSync(path.join(root, 'references', name), 'utf8'));
const write = (root, name, value) => fs.writeFileSync(path.join(root, 'references', name), `${JSON.stringify(value, null, 2)}\n`);
const walk = node => [node, ...(node.children ?? []).flatMap(walk)];
const find = (snapshot, id) => snapshot.roots.flatMap(root => walk(root.tree)).find(node => node.nodeId === id);

function fixture(run) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'aifrica-card-composition-'));
  try {
    fs.mkdirSync(path.join(root, 'references'));
    for (const name of references) fs.copyFileSync(path.join(designRoot, 'references', name), path.join(root, 'references', name));
    for (const asset of read(root, 'card.assets.json').assets) {
      const destination = path.join(root, asset.path);
      fs.mkdirSync(path.dirname(destination), { recursive: true });
      fs.copyFileSync(path.join(designRoot, asset.path), destination);
    }
    run(root);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
}

test('Card families preserve25 layouts, actual nested sources, separate state axes and exact supplied assets', () => {
  const report = inspectCardComposition(designRoot);
  assert.deepEqual(report.issues, []);
  assert.equal(report.families.length, 5);
  assert.equal(report.families.reduce((sum, family) => sum + family.suppliedLayouts, 0), 25);
  assert(report.families.every(family => family.status === 'match'));
  assert(report.nested.every(composition => composition.status === 'match'));
  assert(report.assets.every(asset => asset.status === 'match'));
  assert.equal(report.runtimeVerified, false);
  assert.equal(report.allStatesVerified, false);
  assert.deepEqual(read(designRoot, 'card-composition.json'), report);
});

test('Card guards catch border physics, misleading common source, control resizing, missing pin and disabled saturation', () => {
  const cases = [
    [snapshot => { snapshot.styles[find(snapshot, '3128:25559').styleRef].layout.strokesIncludedInLayout = true; }, /border layout contract/],
    [snapshot => { find(snapshot, '2427:25257').instance.source.id = '2079:11964'; }, /actual common Pill source/],
    [snapshot => { snapshot.styles[find(snapshot, '3074:91439').styleRef].layout.width = 24; }, /actual control is20/],
    [snapshot => { snapshot.styles[find(snapshot, '3074:92067').styleRef].layout.width = 14; }, /toggle glyph16 differs/],
    [snapshot => { const actions = find(snapshot, '3095:42'); actions.children = actions.children.filter(child => child.nodeId !== '3095:43'); }, /pin exists only/],
    [snapshot => { snapshot.styles[find(snapshot, '3095:117').styleRef].visual.fills[0].filters.saturation = 0; }, /disabled saturation/],
    [snapshot => { delete find(snapshot, '3128:25550').componentPropertyReferences.visible; }, /size Boolean owner/],
  ];
  for (const [mutate, expected] of cases) fixture(root => {
    const snapshot = read(root, 'card.figma.json');
    mutate(snapshot);
    write(root, 'card.figma.json', snapshot);
    assert(inspectCardComposition(root).issues.some(issue => expected.test(issue)), String(expected));
  });
});

test('Card rejects false native asset geometry even with a matching replacement checksum', () => {
  fixture(root => {
    const manifest = read(root, 'card.assets.json');
    const asset = manifest.assets.find(entry => entry.path.endsWith('.svg') && entry.width === 16 && entry.height === 16);
    assert(asset, 'At least one exact native16 SVG is required');
    const file = path.join(root, asset.path);
    const svg = fs.readFileSync(file, 'utf8').replace(/viewBox="0 0 16(?:\.0)? 16(?:\.0)?"/, 'viewBox="0 0 24 24"');
    fs.writeFileSync(file, svg);
    asset.sha256 = createHash('sha256').update(svg).digest('hex');
    asset.bytes = Buffer.byteLength(svg);
    write(root, 'card.assets.json', manifest);
    assert(inspectCardComposition(root).issues.some(issue => issue.includes('native viewBox')));
  });
});
