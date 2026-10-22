import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { ROOT } from './lib/config.mjs';
import { inspectFilterChipComposition } from './lib/filter-chip-composition.mjs';

test('FilterChipGroup instances preserve the measured standalone filter chips and slot overrides', () => {
  const designRoot = path.join(ROOT, 'docs/agent-hub/design');
  const report = inspectFilterChipComposition(designRoot);
  assert.deepEqual(report.issues, []);
  assert.equal(report.instances.length, 18);
  assert(report.instances.every(instance => instance.status === 'match'));
  assert.equal(report.runtimeVerified, false);
  assert.equal(report.allStatesVerified, false);
  assert.deepEqual(readReport(designRoot), report);
});

function readReport(designRoot) {
  return JSON.parse(fs.readFileSync(path.join(designRoot, 'references/filter-chip-composition.json'), 'utf8'));
}
