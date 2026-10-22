import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { ROOT } from './lib/config.mjs';
import { inspectFlyoutComposition } from './lib/flyout-composition.mjs';

const designRoot = path.join(ROOT, 'docs/agent-hub/design');
const references = ['flyout.figma.json', 'flyout.variables.figma.json', 'flyout.assets.json', 'flyout.motion.json', 'elevation.figma.json'];
const read = (root, name) => JSON.parse(fs.readFileSync(path.join(root, 'references', name), 'utf8'));
const write = (root, name, value) => fs.writeFileSync(path.join(root, 'references', name), `${JSON.stringify(value, null, 2)}\n`);
const walk = node => [node, ...(node.children ?? []).flatMap(walk)];
const find = (snapshot, id) => snapshot.roots.flatMap(root => walk(root.tree)).find(node => node.nodeId === id);

function fixture(run) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'aifrica-flyout-composition-'));
  try {
    fs.mkdirSync(path.join(root, 'references'));
    for (const name of references) fs.copyFileSync(path.join(designRoot, 'references', name), path.join(root, 'references', name));
    fs.copyFileSync(path.join(designRoot, 'asset-manifest.json'), path.join(root, 'asset-manifest.json'));
    for (const asset of read(root, 'flyout.assets.json').assets) {
      const destination = path.join(root, asset.path);
      fs.mkdirSync(path.dirname(destination), { recursive: true });
      fs.copyFileSync(path.join(designRoot, asset.path), destination);
    }
    run(root);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
}

test('Flyout preserves partial variants, actual footer and hidden-row overrides, exact assets and explicitly adopted Menu motion', () => {
  const report = inspectFlyoutComposition(designRoot);
  assert.deepEqual(report.issues, []);
  assert.equal(report.variants.length, 10);
  assert(report.variants.every(variant => variant.status === 'match'));
  assert.equal(report.rows.length, 16);
  assert.equal(report.rows.filter(row => row.visible).length, 11);
  assert.equal(report.rows.filter(row => !row.visible && row.externalPaintAliasOverride).length, 5);
  assert(report.rows.every(row => row.status === 'match'));
  for (const part of ['header', 'footer', 'shell', 'motion']) assert.equal(report[part].status, 'match');
  assert.equal(report.footer.actualHeight, 33);
  assert.equal(report.footer.standaloneHeight, 29);
  assert.equal(report.shell.observedContentFooterOverlap, 11);
  assert.equal(report.assets.length, 6);
  assert(report.assets.every(asset => asset.status === 'match'));
  assert.equal(report.motion.figmaMeasured, false);
  assert.equal(report.runtimeVerified, false);
  assert.equal(report.allStatesVerified, false);
  assert.deepEqual(read(designRoot, 'flyout-composition.json'), report);
});

test('Flyout rejects lost footer override, selected/pressed confusion, wrong glyph source or stroke and exposed hidden rows', () => {
  const cases = [
    [snapshot => { snapshot.styles[find(snapshot, '3010:23520').styleRef].layout.padding.bottom = 4; }, /actual footer bottom padding override/],
    [snapshot => { snapshot.styles[find(snapshot, '2975:76690').styleRef].visual.fills[0].opacity = 1; }, /pressed black alpha/],
    [snapshot => { find(snapshot, '3005:23097').instance.source.id = 'native16-substitute'; }, /exact file-text20 source/],
    [snapshot => { snapshot.styles[find(snapshot, 'I3005:23097;2762:73818').styleRef].visual.border.width = 0.8; }, /actual stroke survives resizing/],
    [snapshot => { find(snapshot, '3010:23495').visible = true; }, /eleven visible item slots/],
  ];
  for (const [mutate, expected] of cases) fixture(root => {
    const snapshot = read(root, 'flyout.figma.json');
    mutate(snapshot);
    write(root, 'flyout.figma.json', snapshot);
    assert(inspectFlyoutComposition(root).issues.some(issue => expected.test(issue)), String(expected));
  });
});

test('Flyout rejects reversed side motion, missing closing pointer guard and a false Figma-measured animation claim', () => {
  const cases = [
    [motion => { motion.sides.bottom.open.from.transform = 'translateY(6px)'; }, /bottom opening fade\/translation/],
    [motion => { motion.closedPointerEvents = 'auto'; }, /closing surface pointer guard/],
    [motion => { motion.figmaMeasured = true; }, /not measured Figma animation/],
  ];
  for (const [mutate, expected] of cases) fixture(root => {
    const motion = read(root, 'flyout.motion.json');
    mutate(motion);
    write(root, 'flyout.motion.json', motion);
    assert(inspectFlyoutComposition(root).issues.some(issue => expected.test(issue)), String(expected));
  });
});
