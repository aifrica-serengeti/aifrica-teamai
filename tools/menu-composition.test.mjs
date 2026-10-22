import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { ROOT } from './lib/config.mjs';
import { inspectMenuComposition } from './lib/menu-composition.mjs';

const designRoot = path.join(ROOT, 'docs/agent-hub/design');
const references = ['menu.figma.json', 'menu.variables.figma.json', 'menu.assets.json', 'elevation.figma.json'];
const read = (root, name) => JSON.parse(fs.readFileSync(path.join(root, 'references', name), 'utf8'));
const write = (root, name, value) => fs.writeFileSync(path.join(root, 'references', name), `${JSON.stringify(value, null, 2)}\n`);
const walk = node => [node, ...(node.children ?? []).flatMap(walk)];
const find = (snapshot, id) => snapshot.roots.flatMap(root => walk(root.tree)).find(node => node.nodeId === id);

function fixture(run) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'aifrica-menu-composition-'));
  try {
    fs.mkdirSync(path.join(root, 'references'));
    for (const name of references) fs.copyFileSync(path.join(designRoot, 'references', name), path.join(root, 'references', name));
    fs.copyFileSync(path.join(designRoot, 'asset-manifest.json'), path.join(root, 'asset-manifest.json'));
    for (const asset of read(root, 'menu.assets.json').assets) {
      const destination = path.join(root, asset.path);
      fs.mkdirSync(path.dirname(destination), { recursive: true });
      fs.copyFileSync(path.join(designRoot, asset.path), destination);
    }
    run(root);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
}

test('Menu preserves eight item variants and eleven enabled rows including full hidden properties and distinct effect identity', () => {
  const report = inspectMenuComposition(designRoot);
  assert.deepEqual(report.issues, []);
  assert.equal(report.variants.length, 8);
  assert(report.variants.every(variant => variant.status === 'match'));
  assert.equal(report.rows.length, 11);
  assert(report.rows.every(row => row.status === 'match' && row.width === 158 && row.height === 28));
  assert.equal(report.panel.status, 'match');
  assert.equal(report.panel.height, 318);
  assert.equal(report.panel.effectValuesMatch, 'Mid');
  assert.equal(report.panel.effectIdentityMatches, false);
  assert.equal(report.panel.scrollbarVisible, false);
  assert.equal(report.assets.length, 11);
  assert(report.assets.every(asset => asset.status === 'match'));
  assert.equal(report.runtimeVerified, false);
  assert.equal(report.allStatesVerified, false);
  assert.deepEqual(read(designRoot, 'menu-composition.json'), report);
});

test('Menu rejects wrong row source, exposed hidden content, merged destructive colors, fake scrollbar and shifted border layout', () => {
  const cases = [
    [snapshot => { find(snapshot, '3136:16074').instance.source.id = '3135:15991'; }, /enabled default source/],
    [snapshot => { find(snapshot, 'I3136:16074;3135:15952').visible = true; }, /visibility/],
    [snapshot => { snapshot.styles[find(snapshot, '3135:15996').styleRef].visual.fills[0].hex = '#D00A0A'; }, /value retains separate palette/],
    [snapshot => { find(snapshot, '3192:35200').visible = true; }, /scroll drawing hidden/],
    [snapshot => { snapshot.styles[find(snapshot, '3135:16036').styleRef].layout.strokesIncludedInLayout = false; }, /panel border reserves layout/],
  ];
  for (const [mutate, expected] of cases) fixture(root => {
    const snapshot = read(root, 'menu.figma.json');
    mutate(snapshot);
    write(root, 'menu.figma.json', snapshot);
    assert(inspectMenuComposition(root).issues.some(issue => expected.test(issue)), String(expected));
  });
});

test('Menu verifies exact supplied hidden-state SVG paint even if a changed fixture declares a new matching hash', () => {
  fixture(root => {
    const manifest = read(root, 'menu.assets.json');
    const asset = manifest.assets.find(entry => entry.color === '#757575');
    const file = path.join(root, asset.path);
    const svg = fs.readFileSync(file, 'utf8').replaceAll('#757575', '#1C1C1C');
    fs.writeFileSync(file, svg);
    asset.sha256 = createHash('sha256').update(svg).digest('hex');
    asset.bytes = Buffer.byteLength(svg);
    write(root, 'menu.assets.json', manifest);
    assert(inspectMenuComposition(root).issues.some(issue => issue.includes('exact supplied state-paint color mismatch')));
  });
});
