import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { ROOT } from './lib/config.mjs';
import { inspectMessageExampleComposition } from './lib/message-example-composition.mjs';

const designRoot = path.join(ROOT, 'docs/agent-hub/design');
const read = name => JSON.parse(fs.readFileSync(path.join(designRoot, 'references', name), 'utf8'));

test('Message Example preserves semantic state colors, icon Boolean binding and content-based geometry', () => {
  const report = inspectMessageExampleComposition(designRoot);
  assert.deepEqual(report.issues, []);
  assert.equal(report.variants.length, 3);
  assert(report.variants.every(variant => variant.status === 'match'));
  assert.deepEqual(report.variants.map(variant => variant.background), ['#EBF3FF', '#CCE0FF', '#99C2FF']);
  assert.equal(report.buttonInstanceReuse, false);
  assert.equal(report.runtimeVerified, false);
  assert.deepEqual(read('message-example-composition.json'), report);
});

test('Message Example reuses the intact native20px arrow-right SVG for all three visible states', () => {
  const manifest = read('message-example.assets.json');
  assert.equal(manifest.assets.length, 1);
  const asset = manifest.assets[0];
  assert.equal(asset.method, 'reuse-existing-exact-source');
  assert.equal(asset.sourceNodeId, '2199:23690');
  assert.equal(asset.instanceNodeIds.length, 3);
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
