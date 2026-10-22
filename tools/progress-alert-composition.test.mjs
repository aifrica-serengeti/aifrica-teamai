import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { ROOT } from './lib/config.mjs';
import { inspectProgressAlertComposition } from './lib/progress-alert-composition.mjs';

const designRoot = path.join(ROOT, 'docs/agent-hub/design');
const read = name => JSON.parse(fs.readFileSync(path.join(designRoot, 'references', name), 'utf8'));

test('ProgressAlert reuses enabled tertiary28 buttons without hidden slots or extra border layout', () => {
  const report = inspectProgressAlertComposition(designRoot);
  assert.deepEqual(report.issues, []);
  assert.equal(report.buttons.length, 2);
  assert(report.buttons.every(button => button.status === 'match' && !button.insideBorderConsumesLayout));
  assert.equal(report.icon.status, 'match');
  assert.deepEqual(report.container, { strokesIncludedInLayout: true, measuredHeight: 46, buttonHeight: 28, verticalPadding: 8, borderWidth: 1 });
  assert.equal(report.runtimeVerified, false);
  assert.deepEqual(read('progress-alert-composition.json'), report);
});

test('ProgressAlert uses an intact exact-source20px circle-alert asset already in the icon library', () => {
  const manifest = read('progress-alert.assets.json');
  assert.equal(manifest.assets.length, 1);
  const asset = manifest.assets[0];
  assert.equal(asset.method, 'reuse-existing-exact-source');
  assert.equal(asset.sourceNodeId, '2898:23788');
  assert.equal(asset.width, 20);
  assert.equal(asset.height, 20);
  assert.equal(asset.strokeWidth, 1.25);
  const bytes = fs.readFileSync(path.join(designRoot, asset.path));
  assert.equal(bytes.length, asset.bytes);
  assert.equal(createHash('sha256').update(bytes).digest('hex'), asset.sha256);
  const svg = bytes.toString('utf8');
  assert(svg.includes('viewBox="0 0 20 20"'));
  assert(svg.includes('width="20"') && svg.includes('height="20"'));
  assert.doesNotMatch(svg, /<script\b|<foreignObject\b|(?:href|src)=["'](?:https?:|\/\/|data:)|\bon[a-z]+\s*=/i);
});
