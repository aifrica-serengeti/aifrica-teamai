import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { ROOT } from './lib/config.mjs';
import { inspectUserMessageComposition } from './lib/user-message-composition.mjs';

const designRoot = path.join(ROOT, 'docs/agent-hub/design');
const read = name => JSON.parse(fs.readFileSync(path.join(designRoot, 'references', name), 'utf8'));

test('User-message bubbles preserve actual Chip/Divider reuse, schedule composition and hidden-arrow boundaries', () => {
  const report = inspectUserMessageComposition(designRoot);
  assert.deepEqual(report.issues, []);
  assert.equal(report.bubbles.length, 3);
  assert(report.bubbles.every(item => item.status === 'match'));
  assert.equal(report.reuse.length, 2);
  assert(report.reuse.every(item => item.status === 'match'));
  assert.equal(report.hidden.length, 3);
  assert(report.hidden.every(item => item.rendered === false));
  assert.equal(report.schedule.status, 'match');
  assert.equal(report.schedule.innerBubbleType, 'FRAME');
  assert.equal(report.schedule.innerBubbleSourceReuse, false);
  assert.equal(report.runtimeVerified, false);
  assert.deepEqual(read('message-user-composition.json'), report);
});

test('User-message schedule icon is the intact12px export of its resized20px source instance', () => {
  const manifest = read('message-user.assets.json');
  const snapshot = read('message-user.figma.json');
  assert.equal(manifest.assets.length, 1);
  const asset = manifest.assets[0];
  const flatten = node => [node, ...(node.children || []).flatMap(flatten)];
  const node = snapshot.variants.flatMap(flatten).find(node => node.nodeId === asset.exportedInstanceNodeId);
  assert.equal(node.visible, true);
  assert.equal(node.instance.source.id, asset.sourceNodeId);
  assert.equal(node.instance.source.width, asset.sourceWidth);
  assert.equal(asset.sourceWidth, 20);
  assert.equal(asset.width, 12);
  assert.equal(asset.strokeWidth, 0.75);
  const layout = snapshot.styles[node.styleRef].layout;
  assert.equal(layout.width, asset.width);
  assert.equal(layout.height, asset.height);
  const bytes = fs.readFileSync(path.join(designRoot, asset.path));
  assert.equal(bytes.length, asset.bytes);
  assert.equal(createHash('sha256').update(bytes).digest('hex'), asset.sha256);
  const svg = bytes.toString('utf8');
  assert(svg.includes('viewBox="0 0 12 12"'));
  assert(svg.includes('width="12"') && svg.includes('height="12"'));
  assert.doesNotMatch(svg, /<script\b|<foreignObject\b|(?:href|src)=["'](?:https?:|\/\/|data:)|\bon[a-z]+\s*=/i);
});
