import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { ROOT } from './lib/config.mjs';
import { inspectCalendarComposition } from './lib/calendar-composition.mjs';

test('calendar controls match independently measured Agent Hub Button/IconButton and exact local glyphs', () => {
  const report = inspectCalendarComposition(path.join(ROOT, 'docs/agent-hub/design'));
  assert.deepEqual(report.issues, []);
  assert.equal(report.controls.length, 5);
  assert(report.controls.every(control => control.status === 'match'));
  assert.equal(report.runtimeVerified, false);
  assert.equal(report.allStatesVerified, false);
  assert.deepEqual(JSON.parse(fs.readFileSync(path.join(ROOT, 'docs/agent-hub/design/references/calendar-composition.json'), 'utf8')), report);
});
