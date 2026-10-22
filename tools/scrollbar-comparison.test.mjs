import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { ROOT } from './lib/config.mjs';
import { inspectScrollbarComparison } from './lib/scrollbar-comparison.mjs';

const designRoot = path.join(ROOT, 'docs/agent-hub/design');
const read = (root, name) => JSON.parse(fs.readFileSync(path.join(root, 'references', name), 'utf8'));
const write = (root, name, value) => fs.writeFileSync(path.join(root, 'references', name), `${JSON.stringify(value, null, 2)}\n`);

function fixture(run) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'aifrica-scrollbar-comparison-'));
  try {
    fs.mkdirSync(path.join(root, 'references'));
    for (const name of ['scrollbar.figma.json', 'scrollbar.variables.figma.json']) {
      fs.copyFileSync(path.join(designRoot, 'references', name), path.join(root, 'references', name));
    }
    run(root);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
}

test('Scrollbar preserves the opaque4px sample and identifies common differences without claiming runtime behavior', () => {
  const report = inspectScrollbarComparison(designRoot);
  assert.deepEqual(report.issues, []);
  assert.equal(report.status, 'match');
  assert.deepEqual([report.sample.rightRemainder, report.sample.bottomRemainder], [4, 17]);
  assert.equal(report.sample.contentRatioVerified, false);
  assert.equal(report.sample.runtimeFixedLengthAdopted, false);
  assert.equal(report.commonComparison.agentHubHoverVerified, false);
  assert.equal(report.commonComparison.viewportReservationVerified, false);
  assert.equal(report.runtimeVerified, false);
  assert.equal(report.allStatesVerified, false);
  assert.equal(report.requiredAssetCount, 0);
  assert.deepEqual(read(designRoot, 'scrollbar-comparison.json'), report);
});

test('Scrollbar catches common-alpha substitution, altered geometry, phantom surface/border and invented states', () => {
  const cases = [
    [snapshot => { snapshot.styles.s001.visual.fills[0].opacity = 0.3; }, /actual thumb fill and alpha/],
    [snapshot => { snapshot.styles.s001.layout.width = 6; }, /measured4x160 sample/],
    [snapshot => { snapshot.styles.s001.visual.radius = 2; }, /thumb full radius/],
    [snapshot => { snapshot.styles.s000.visual.fills = [{ type: 'SOLID', hex: '#FFFFFF', opacity: 1 }]; }, /no surface paint/],
    [snapshot => { snapshot.styles.s000.visual.border.paints = [{ type: 'SOLID', hex: '#DDDDDD', opacity: 1 }]; }, /no rendered stroke/],
    [snapshot => { snapshot.styles.s000.layout.width = 10; }, /comparison frame11x180/],
    [snapshot => { snapshot.styles.s001.layout.height = 174; }, /sample remainder/],
    [snapshot => { snapshot.styles.s001.layout.layoutPositioning = 'AUTO'; }, /independent of parent padding/],
    [snapshot => { snapshot.roots[0].variantProperties = { state: 'hovered' }; }, /no supplied state/],
    [snapshot => { snapshot.styles.s001.bindings.topLeftRadius.id = 'VariableID:3273:21'; }, /semantic radius binding/],
  ];
  for (const [mutate, expected] of cases) fixture(root => {
    const snapshot = read(root, 'scrollbar.figma.json');
    mutate(snapshot);
    write(root, 'scrollbar.figma.json', snapshot);
    assert(inspectScrollbarComparison(root).issues.some(issue => expected.test(issue)), String(expected));
  });
});
