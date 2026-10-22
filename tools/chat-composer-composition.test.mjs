import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { ROOT } from './lib/config.mjs';
import { inspectChatComposerComposition } from './lib/chat-composer-composition.mjs';

const designRoot = path.join(ROOT, 'docs/agent-hub/design');
const read = name => JSON.parse(fs.readFileSync(path.join(designRoot, 'references', name), 'utf8'));

test('Chat Composer keeps actual circular action sources, contextual overrides, Overflow and outside selector geometry', () => {
  const report = inspectChatComposerComposition(designRoot);
  assert.deepEqual(report.issues, []);
  assert.equal(report.actions.length, 8);
  assert.equal(report.shadows.length, 4);
  assert.equal(report.selectors.length, 4);
  assert.equal(report.styleReferences.length, 1);
  assert(report.actions.every(action => action.status === 'match'));
  assert(report.shadows.every(shadow => shadow.status === 'match'));
  assert(report.selectors.every(selector => selector.visibleBottom === 90));
  assert.equal(report.styleReferences[0].sourceReuse, false);
  assert.equal(report.runtimeVerified, false);
  assert.deepEqual(read('chat-composer-composition.json'), report);
});

test('Chat Composer assets preserve native source glyphs and the exact resized folder instance export', () => {
  const manifest = read('chat-composer.assets.json');
  const snapshot = read('chat-composer.figma.json');
  const main = JSON.parse(fs.readFileSync(path.join(designRoot, 'asset-manifest.json'), 'utf8'));
  const flatten = node => [node, ...(node.children || []).flatMap(flatten)];
  const nodes = snapshot.variants.flatMap(flatten);
  assert.equal(manifest.assets.length, 3);
  for (const asset of manifest.assets) {
    assert.equal(asset.instanceNodeIds.length, 4);
    const bytes = fs.readFileSync(path.join(designRoot, asset.path));
    assert.equal(bytes.length, asset.bytes);
    assert.equal(createHash('sha256').update(bytes).digest('hex'), asset.sha256);
    const svg = bytes.toString('utf8');
    assert(svg.includes(`viewBox="0 0 ${asset.width} ${asset.height}"`));
    assert(svg.includes(`width="${asset.width}"`) && svg.includes(`height="${asset.height}"`));
    assert.doesNotMatch(svg, /<script\b|<foreignObject\b|(?:href|src)=["'](?:https?:|\/\/|data:)|\bon[a-z]+\s*=/i);
    for (const id of asset.instanceNodeIds) {
      const node = nodes.find(node => node.nodeId === id);
      assert.equal(node.instance.source.id, asset.sourceNodeId);
      const layout = snapshot.styles[node.styleRef].layout;
      assert.equal(layout.width, asset.width);
      assert.equal(layout.height, asset.height);
    }
    if (asset.method === 'reuse-existing-exact-source') {
      const original = main.icons.find(icon => icon.sources.some(source => source.nodeId === asset.sourceNodeId));
      assert.equal(original.path, asset.path);
      assert.equal(original.sha256, asset.sha256);
    } else {
      assert.equal(asset.sourceWidth, 20);
      assert.equal(asset.width, 16);
      assert.equal(asset.strokeWidth, 1);
      assert.equal(asset.color, '#555555');
    }
  }
});
