import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { ROOT } from './lib/config.mjs';
import { inspectElevationCompatibility } from './lib/elevation-comparison.mjs';

test('Agent Hub Elevation matches EffectStyles and existing Calendar/Switch shadows without opacity inheritance', () => {
  const designRoot = path.join(ROOT, 'docs/agent-hub/design');
  const report = inspectElevationCompatibility(designRoot);
  assert.deepEqual(report.issues, []);
  assert.equal(report.styleChecks.length, 6);
  assert(report.styleChecks.every(row => row.status === 'match'));
  assert.equal(report.comparisons.length, 5);
  assert(report.comparisons.every(row => row.status === 'match' && row.componentOpacity === 1));
  assert.equal(report.comparisons[0].boardSampleOpacity, 0.9);
  assert.equal(report.runtimeVerified, false);
  const recorded = JSON.parse(fs.readFileSync(path.join(designRoot, 'references/elevation-component-comparison.json'), 'utf8'));
  assert.deepEqual(recorded, report);
});
