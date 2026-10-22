import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { ROOT } from './lib/config.mjs';

test('reconstructed brand SVG retains provenance and independently addressable vector layers', () => {
  const root = path.join(ROOT, 'docs/agent-hub/design');
  const derived = JSON.parse(fs.readFileSync(path.join(root, 'references/brand-mark.reconstruction.json')));
  const original = JSON.parse(fs.readFileSync(path.join(root, 'asset-manifest.json'))).brandMark;
  assert.equal(derived.originalVector, false);
  assert.equal(derived.figmaMeasurement, false);
  assert.equal(derived.source.path, original.path);
  assert.equal(derived.source.sha256, original.sha256);
  const hash = bytes => createHash('sha256').update(bytes).digest('hex');
  assert.equal(hash(fs.readFileSync(path.join(root, original.path))), original.sha256);
  assert.notEqual(derived.asset.path, original.path);
  const bytes = fs.readFileSync(path.join(root, derived.asset.path));
  assert.equal(hash(bytes), derived.asset.sha256);
  assert.equal(bytes.length, derived.asset.bytes);
  const svg = bytes.toString('utf8');
  assert(svg.includes(`viewBox="${derived.asset.viewBox.join(' ')}"`));
  // An SVG wrapper around the flattened PNG cannot support per-ellipse motion.
  assert.doesNotMatch(svg, /<image\b|<script\b|<foreignObject\b|\bon\w+\s*=|(?:href|src)\s*=/i);
  const groups = [...svg.matchAll(/<g data-brand-layer="([^"]+)"[^>]*>([\s\S]*?)<\/g>/g)];
  assert.deepEqual(groups.map(match => match[1]), derived.paintOrder);
  for (const layer of derived.layers) {
    const group = groups.find(match => match[1] === layer.id);
    assert(group, layer.id);
    assert.equal([...group[2].matchAll(/<ellipse\b/g)].length, 1, layer.id);
    assert.doesNotMatch(group[2], /<image\b/);
    assert(layer.radii[0] > layer.radii[1], 'Preserve the flattened ellipse proportions');
  }
  const ids = [...svg.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
  assert.equal(new Set(ids).size, ids.length);
  for (const match of svg.matchAll(/url\(#([^)]+)\)/g)) assert(ids.includes(match[1]), `Missing ${match[1]}`);
});
