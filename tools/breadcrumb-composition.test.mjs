import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { ROOT } from './lib/config.mjs';
import { inspectBreadcrumbComposition } from './lib/breadcrumb-composition.mjs';

const designRoot = path.join(ROOT, 'docs/agent-hub/design');
const read = name => JSON.parse(fs.readFileSync(path.join(designRoot, 'references', name), 'utf8'));

test('Breadcrumb preserves actual separator sources, Light overrides and final-item omission', () => {
  const report = inspectBreadcrumbComposition(designRoot);
  assert.deepEqual(report.issues, []);
  assert.equal(report.instances.length, 8);
  assert(report.instances.every(instance => instance.status === 'match'));
  assert.equal(report.runtimeVerified, false);
  assert.equal(report.allStatesVerified, false);
  assert.deepEqual(read('breadcrumb-composition.json'), report);
  const temporary = fs.mkdtempSync(path.join(os.tmpdir(), 'aifrica-breadcrumb-probe-'));
  try {
    fs.mkdirSync(path.join(temporary, 'references'));
    for (const name of ['breadcrumb.figma.json', 'breadcrumb-separator.figma.json']) {
      fs.copyFileSync(path.join(designRoot, 'references', name), path.join(temporary, 'references', name));
    }
    const file = path.join(temporary, 'references/breadcrumb.figma.json');
    const altered = JSON.parse(fs.readFileSync(file, 'utf8'));
    altered.variants[1].children[0].children.find(node => node.type === 'INSTANCE').instance.source.id = '2372:36931';
    fs.writeFileSync(file, JSON.stringify(altered));
    assert(inspectBreadcrumbComposition(temporary).issues.some(issue => issue.includes('actual source')));
  } finally { fs.rmSync(temporary, { recursive: true, force: true }); }
});

test('Breadcrumb arrow is an intact whole separator asset with its own native padded geometry', () => {
  const manifest = read('breadcrumb.assets.json');
  const snapshot = read('breadcrumb-separator.figma.json');
  assert.equal(manifest.assets.length, 1);
  const asset = manifest.assets[0];
  const node = snapshot.variants.find(node => node.nodeId === asset.nodeId);
  assert.equal(node.variant['.type'], 'arrow');
  assert.equal(asset.includesSeparatorPadding, true);
  const layout = snapshot.styles[node.styleRef].layout;
  assert(Math.abs(layout.width - asset.width) < 0.00001);
  assert.equal(layout.height, asset.height);
  assert.deepEqual(layout.padding, { left: 8, right: 8, top: 0, bottom: 0 });
  const bytes = fs.readFileSync(path.join(designRoot, asset.path));
  assert.equal(bytes.length, asset.bytes);
  assert.equal(createHash('sha256').update(bytes).digest('hex'), asset.sha256);
  const svg = bytes.toString('utf8');
  assert(svg.includes(`viewBox="${asset.viewBox}"`));
  assert(svg.includes(`width="${asset.width}"`) && svg.includes(`height="${asset.height}"`));
  assert.doesNotMatch(svg, /<script\b|<foreignObject\b|(?:href|src)=["'](?:https?:|\/\/|data:)|\bon[a-z]+\s*=/i);
});
