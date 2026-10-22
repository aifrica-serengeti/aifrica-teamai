import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { ROOT } from './lib/config.mjs';

test('Agent Hub manifest closes over intact portable SVG/PNG assets and original Figma sources', () => {
  const root = path.join(ROOT, 'docs/agent-hub/design');
  const manifest = JSON.parse(fs.readFileSync(path.join(root, 'asset-manifest.json'), 'utf8'));
  assert.equal(manifest.solution, 'agent-hub');
  const assets = [...manifest.icons, ...manifest.fileIcons, manifest.brandMark];
  assert.equal(new Set(assets.map(asset => asset.path)).size, assets.length);
  const sources = manifest.icons.flatMap(icon => icon.sources);
  assert.equal(new Set(sources.map(source => source.nodeId)).size, sources.length);
  assert.equal(sources.length, manifest.counts.figmaIconComponents);
  assert.equal(new Set(manifest.icons.map(icon => icon.name)).size, manifest.counts.iconNames);
  assert.equal(manifest.icons.length, manifest.counts.iconAssets);
  assert.equal(manifest.fileIcons.length, manifest.counts.fileIconAssets);
  assert.equal(manifest.counts.brandAssets, 1);
  assert.deepEqual(manifest.fileIcons.map(icon => icon.type).sort(), ['archive', 'code', 'document', 'pdf', 'presentation', 'spreadsheet']);
  for (const asset of assets) {
    assert.match(asset.path, /^assets\/[a-z0-9/-]+\.(svg|png)$/);
    const bytes = fs.readFileSync(path.join(root, asset.path));
    assert.equal(bytes.length, asset.bytes, asset.path);
    assert.equal(createHash('sha256').update(bytes).digest('hex'), asset.sha256, asset.path);
    if (asset.format !== 'svg') continue;
    const svg = bytes.toString('utf8');
    const width = asset.size ?? asset.width;
    const height = asset.size ?? asset.height;
    assert(svg.includes(`viewBox="0 0 ${width} ${height}"`), asset.path);
    assert.doesNotMatch(svg, /<script\b|<foreignObject\b|(?:href|src)=["'](?:https?:|\/\/|data:)|\bon[a-z]+\s*=/i, asset.path);
    const ids = new Set([...svg.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]));
    for (const match of svg.matchAll(/url\(#([^)]+)\)/g)) assert(ids.has(match[1]), `${asset.path}: unresolved ${match[1]}`);
    if (asset.sources) {
      // Figma omits stroke-width="1" because one is the SVG default.
      const strokes = [...svg.matchAll(/<[^>]+\bstroke="(?!none)[^"]+"[^>]*>/g)]
        .map(match => Number(match[0].match(/stroke-width="([^"]+)"/)?.[1] ?? 1));
      assert.deepEqual([...new Set(strokes)].sort((a, b) => a - b), asset.strokeWidths, asset.path);
    }
  }
  const logo = fs.readFileSync(path.join(root, manifest.brandMark.path));
  assert.equal(logo.subarray(0, 8).toString('hex'), '89504e470d0a1a0a');
  assert.equal(logo.readUInt32BE(16), manifest.brandMark.width);
  assert.equal(logo.readUInt32BE(20), manifest.brandMark.height);
  assert.equal(logo[25], 6, 'Logo must retain its RGBA source');
  assert.equal(createHash('sha1').update(logo).digest('hex'), manifest.brandMark.figmaImageHash);
});

test('SNB glyph slots preserve actual source, state paint, native geometry and effective visibility', () => {
  const root = path.join(ROOT, 'docs/agent-hub/design');
  const manifest = JSON.parse(fs.readFileSync(path.join(root, 'references/snb.assets.json'), 'utf8'));
  const snapshot = JSON.parse(fs.readFileSync(path.join(root, 'references/snb.figma.json'), 'utf8'));
  const nodes = new Map();
  function collect(node, visible = true) {
    const effectiveVisible = visible && node.visible !== false;
    nodes.set(node.nodeId, { node, effectiveVisible });
    for (const child of node.children ?? []) collect(child, effectiveVisible);
  }
  for (const source of snapshot.roots) collect(source.tree);
  const assets = new Map(manifest.assets.map(asset => [asset.path, asset]));
  assert.equal(assets.size, 31);
  assert.equal(manifest.glyphSlots.length, 54);
  assert.equal(manifest.glyphSlots.filter(slot => slot.effectiveVisible).length, 42);
  assert.equal(new Set(manifest.glyphSlots.map(slot => slot.nodeId)).size, 54);
  assert.equal(manifest.verification.runtimeVerified, false);
  const palette = node => {
    const result = new Set();
    const visit = current => {
      const visual = snapshot.styles[current.styleRef].visual;
      for (const paint of [...visual.fills, ...visual.border.paints]) if (paint.type === 'SOLID') result.add(paint.hex);
      for (const child of current.children ?? []) visit(child);
    };
    visit(node);
    return [...result].sort();
  };
  for (const slot of manifest.glyphSlots) {
    const entry = nodes.get(slot.nodeId), asset = assets.get(slot.path);
    assert(entry && asset, slot.nodeId);
    const { node, effectiveVisible } = entry;
    assert.equal(effectiveVisible, slot.effectiveVisible, slot.nodeId);
    const actualSource = node.instance?.source?.id ?? (node.type === 'COMPONENT' ? node.nodeId : null);
    assert.equal(actualSource, slot.actualSourceNodeId, slot.nodeId);
    assert.equal(asset.actualSourceNodeId, slot.actualSourceNodeId, slot.nodeId);
    if (actualSource === null) {
      assert.equal(node.type, 'FRAME', slot.nodeId);
      assert.equal(asset.sourceNodeId, node.nodeId, slot.nodeId);
    }
    const layout = snapshot.styles[node.styleRef].layout;
    assert.deepEqual([layout.width, layout.height], [slot.displayWidth, slot.displayHeight], slot.nodeId);
    assert.deepEqual([asset.width, asset.height], [layout.width, layout.height], slot.path);
    const sourcePaint = palette(node);
    // Hidden ancestors affect rendering, while a glyph's own source paint still exists.
    if (effectiveVisible && slot.slotPaint !== undefined) assert.deepEqual(sourcePaint, [...slot.slotPaint].sort(), slot.nodeId);
    assert.deepEqual([...asset.colors].sort(), sourcePaint, slot.path);
    if (asset.referenceOnly) assert.equal(effectiveVisible, false, slot.nodeId);
  }
  for (const asset of assets.values()) {
    assert.match(asset.path, /^assets\/snb\/[a-z0-9-]+\.svg$/);
    const bytes = fs.readFileSync(path.join(root, asset.path)), svg = bytes.toString('utf8');
    assert(bytes.length > 0, asset.path);
    assert.equal(bytes.length, asset.bytes, asset.path);
    assert.equal(createHash('sha256').update(bytes).digest('hex'), asset.sha256, asset.path);
    assert(svg.includes(`viewBox="0 0 ${asset.width} ${asset.height}"`), asset.path);
    assert.equal(Number(svg.match(/<svg\b[^>]*\bwidth="([\d.]+)"/)?.[1]), asset.width, asset.path);
    assert.equal(Number(svg.match(/<svg\b[^>]*\bheight="([\d.]+)"/)?.[1]), asset.height, asset.path);
    assert.doesNotMatch(svg, /<script\b|<foreignObject\b|(?:href|src)=["'](?:https?:|\/\/|data:)|\bon[a-z]+\s*=/i, asset.path);
    const ids = new Set([...svg.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]));
    for (const match of svg.matchAll(/url\(#([^)]+)\)/g)) assert(ids.has(match[1]), asset.path);
  }
});

test('Global Header preserves supplied FRAME glyph SVGs, including the 16px slot and 16.002px export distinction', () => {
  const root = path.join(ROOT, 'docs/agent-hub/design');
  const manifest = JSON.parse(fs.readFileSync(path.join(root, 'assets/global-header/manifest.json'), 'utf8'));
  const snapshot = JSON.parse(fs.readFileSync(path.join(root, 'references/global-header.figma.json'), 'utf8'));
  const expected = new Map([
    ['2611:62080', { role: 'service-logo-mark', size: [21.70786476135254, 21.70786476135254], native: [21.7079, 21.7079], colors: ['#0066FF', '#FFFFFF'], strokes: [], sha256: 'dfb0984164345aaae46d13d710289fdac2af6ad0f5980e4ab2611c3025877e51' }],
    ['2611:62090', { role: 'platform-shortcut-mark-16', size: [16, 16], native: [16.002, 16], colors: ['#0066FF', '#FFFFFF'], strokes: [], sha256: 'e5625ab750946c1cf2083d7e7634e103e3ff4681b5acd71597c0b9c6885da715' }],
    ['2611:62095', { role: 'notification-bell-20', size: [20, 20], native: [20, 20], colors: ['#1C1C1C'], strokes: [1.25], sha256: '0e088c542c84c16b033aeafddf5f73e6f019bc3103f3ffeeb3286561401e7147' }],
  ]);
  const nodes = new Map();
  function collect(node, visible = true) {
    const effectiveVisible = visible && node.visible !== false;
    nodes.set(node.nodeId, { node, effectiveVisible });
    for (const child of node.children ?? []) collect(child, effectiveVisible);
  }
  assert.equal(snapshot.roots.length, 1);
  const tree = snapshot.roots[0].tree;
  collect(tree);
  assert.equal(tree.nodeId, '2611:62099');
  assert.equal(nodes.size, 23);
  assert.equal(tree.children.filter(node => node.visible === false).length, 3);
  assert.equal(manifest.componentId, 'AgentHubGlobalHeader');
  assert.deepEqual(manifest.source.nodeIds, ['2611:62099']);
  assert.equal(snapshot.implementation.status, 'unmapped');
  assert.equal(manifest.verification.runtimeVerified, false);
  assert.equal(manifest.verification.allStatesVerified, false);
  assert.equal(manifest.verification.allSourceAndExportDimensionsIdentical, false);
  assert.equal(manifest.assets.length, 3);
  assert.deepEqual(new Set(manifest.assets.map(asset => asset.sourceNodeId)), new Set(expected.keys()));
  assert.equal(manifest.counts.bytes, 19096);
  assert.equal(manifest.existingAssetComparison.brandMark.reused, false);
  assert.equal(manifest.existingAssetComparison.snb.reused, false);
  for (const asset of manifest.assets) {
    const { node, effectiveVisible } = nodes.get(asset.sourceNodeId);
    const layout = snapshot.styles[node.styleRef].layout, contract = expected.get(asset.sourceNodeId);
    assert.equal(node.type, 'FRAME', asset.sourceNodeId);
    assert.equal(node.instance, undefined, asset.sourceNodeId);
    assert.equal(asset.sourceKind, 'FRAME', asset.sourceNodeId);
    assert.equal(asset.actualSourceNodeId, null, asset.sourceNodeId);
    assert.equal(asset.sourceRootNodeId, tree.nodeId);
    assert.equal(asset.role, contract.role);
    assert.equal(effectiveVisible, true, asset.sourceNodeId);
    assert.equal(asset.effectiveVisibleInCollectedRoot, effectiveVisible);
    assert.deepEqual([layout.width, layout.height], contract.size, asset.sourceNodeId);
    assert.deepEqual([asset.sourceWidth, asset.sourceHeight], contract.size, asset.sourceNodeId);
    assert.deepEqual([asset.displayWidth, asset.displayHeight], contract.size, asset.sourceNodeId);
    assert.deepEqual([asset.width, asset.height], contract.native, asset.path);
    assert.deepEqual(asset.slotPosition, node.position, asset.sourceNodeId);
    const palette = new Set(), strokes = new Set(), paintedNodes = [];
    function inspect(current) {
      const visual = snapshot.styles[current.styleRef].visual;
      const paints = [...visual.fills, ...visual.border.paints].filter(paint => paint.visible !== false && paint.opacity !== 0);
      for (const paint of paints) if (paint.type === 'SOLID') palette.add(paint.hex);
      if (visual.border.paints.some(paint => paint.visible !== false && paint.opacity !== 0)) strokes.add(visual.border.width);
      if (paints.length) paintedNodes.push(current.nodeId);
      for (const child of current.children ?? []) inspect(child);
    }
    inspect(node);
    assert.deepEqual([...palette].sort(), contract.colors, asset.sourceNodeId);
    assert.deepEqual([...asset.colors].sort(), contract.colors, asset.path);
    assert.deepEqual([...strokes].sort((a, b) => a - b), contract.strokes, asset.sourceNodeId);
    assert.deepEqual(asset.strokeWidths, contract.strokes, asset.path);
    assert.deepEqual(asset.sourcePaintLayers.map(layer => layer.nodeId), paintedNodes, asset.sourceNodeId);
    for (const layer of asset.sourcePaintLayers) {
      const child = nodes.get(layer.nodeId).node, childStyle = snapshot.styles[child.styleRef];
      assert.deepEqual(layer.position, child.position, layer.nodeId);
      assert.deepEqual([layer.width, layer.height], [childStyle.layout.width, childStyle.layout.height], layer.nodeId);
      assert.equal(layer.strokeWeight, childStyle.visual.border.paints.length ? childStyle.visual.border.width : null, layer.nodeId);
    }
    assert.match(asset.path, /^assets\/global-header\/[a-z0-9-]+\.svg$/);
    const bytes = fs.readFileSync(path.join(root, asset.path)), svg = bytes.toString('utf8');
    assert(bytes.length > 0, asset.path);
    assert.equal(bytes.length, asset.bytes, asset.path);
    assert.equal(createHash('sha256').update(bytes).digest('hex'), contract.sha256, asset.path);
    assert.equal(asset.sha256, contract.sha256, asset.path);
    assert.equal(Number(svg.match(/<svg\b[^>]*\bwidth="([\d.]+)"/)?.[1]), asset.width, asset.path);
    assert.equal(Number(svg.match(/<svg\b[^>]*\bheight="([\d.]+)"/)?.[1]), asset.height, asset.path);
    assert(svg.includes(`viewBox="${asset.viewBox}"`), asset.path);
    assert.equal(asset.viewBox, `0 0 ${asset.width} ${asset.height}`, asset.path);
    const svgPalette = [...new Set([...svg.matchAll(/\b(?:fill|stroke)="(#[a-f\d]{6}|white)"/gi)].map(match => match[1] === 'white' ? '#FFFFFF' : match[1].toUpperCase()))].sort();
    assert.deepEqual(svgPalette, contract.colors, asset.path);
    const svgStrokes = [...new Set([...svg.matchAll(/<[^>]+\bstroke="(?!none)[^"]+"[^>]*>/g)].map(match => Number(match[0].match(/stroke-width="([^"]+)"/)?.[1] ?? 1)))].sort((a, b) => a - b);
    assert.deepEqual(svgStrokes, contract.strokes, asset.path);
    assert.doesNotMatch(svg, /<script\b|<foreignObject\b|(?:href|src)=["'](?:https?:|\/\/|data:)|\bon[a-z]+\s*=/i, asset.path);
    const ids = new Set([...svg.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]));
    for (const match of svg.matchAll(/url\(#([^)]+)\)/g)) assert(ids.has(match[1]), asset.path);
  }
  assert.equal(nodes.get('2611:62091').node.position.x, -0.001953125);
  assert.equal(nodes.get('2611:62092').node.position.x, -0.001953125);
});

test('Chat Header reuses exact source glyphs only when actual override geometry, paint and native size match', () => {
  const root = path.join(ROOT, 'docs/agent-hub/design');
  const manifest = JSON.parse(fs.readFileSync(path.join(root, 'references/chat-header.assets.json'), 'utf8'));
  const library = JSON.parse(fs.readFileSync(path.join(root, 'asset-manifest.json'), 'utf8'));
  const snapshot = JSON.parse(fs.readFileSync(path.join(root, 'references/chat-header.figma.json'), 'utf8'));
  const expected = new Map([
    ['2751:14602', { control: '3016:79808', path: 'assets/icons/pause/16.svg', paths: 2, sha256: 'ead1a84110159283515040362c10ddab983c964b749906b55fdec1ae4578bb41' }],
    ['2916:58366', { control: '3016:79809', path: 'assets/icons/file/16.svg', paths: 2, sha256: 'e2269bdec107bd5d2cb573d89ae2b62df3009c966d26fd46222c9a5e9af9f5ca' }],
    ['2751:16967', { control: '3016:79810', path: 'assets/icons/more/16.svg', paths: 3, sha256: '77b730f2ba622b075bd5ef051caebcd7bdb9ef52941c412f43d691bfb46ef9d0' }],
  ]);
  const nodes = new Map();
  function collect(node) {
    nodes.set(node.nodeId, node);
    for (const child of node.children ?? []) collect(child);
  }
  assert.equal(snapshot.roots.length, 1);
  collect(snapshot.roots[0].tree);
  assert.equal(nodes.size, 19);
  assert.equal(nodes.get('3016:79726').type, 'RECTANGLE');
  assert.equal(manifest.componentId, 'AgentHubChatHeader');
  assert.deepEqual(manifest.source.nodeIds, ['2967:34438']);
  assert.equal(snapshot.implementation.status, 'unmapped');
  assert.equal(manifest.verification.runtimeVerified, false);
  assert.equal(manifest.verification.allStatesVerified, false);
  assert.equal(manifest.verification.providedAndReusedByteIdentityClaimed, false);
  assert.deepEqual(new Set(manifest.assets.map(asset => asset.sourceNodeId)), new Set(expected.keys()));
  assert.deepEqual(manifest.counts, { glyphSlots: 3, existingAssetsReused: 3, newSvgFiles: 0, reusedAssetBytes: 2563 });
  for (const asset of manifest.assets) {
    const contract = expected.get(asset.sourceNodeId), control = nodes.get(contract.control);
    const node = nodes.get(`I${contract.control};2427:25109`), layout = snapshot.styles[node.styleRef].layout;
    const original = library.icons.find(icon => icon.sources.some(source => source.nodeId === asset.sourceNodeId));
    assert.equal(asset.method, 'reuse-existing-exact-source');
    assert.equal(asset.path, contract.path);
    assert.equal(original.path, asset.path);
    assert.equal(asset.controlNodeId, control.nodeId);
    assert.equal(control.instance.source.id, '2427:25108');
    assert.deepEqual(control.instance.variant, { type: 'ghost', state: 'default', size: '24' });
    assert.deepEqual([snapshot.styles[control.styleRef].layout.width, snapshot.styles[control.styleRef].layout.height], [24, 24]);
    assert.equal(node.instance.source.id, asset.sourceNodeId);
    assert.equal(node.name, 'icon/plus/24', 'Inherited layer name must not replace the actual swapped source');
    assert.deepEqual(asset.instanceNodeIds, [node.nodeId]);
    assert.deepEqual([node.instance.source.width, node.instance.source.height], [16, 16]);
    assert.deepEqual([layout.width, layout.height], [16, 16]);
    assert.deepEqual([asset.sourceWidth, asset.sourceHeight, asset.displayWidth, asset.displayHeight, asset.width, asset.height], [16, 16, 16, 16, 16, 16]);
    assert.deepEqual(asset.slotPosition, { x: 4, y: 4 });
    assert.deepEqual(node.position, asset.slotPosition);
    assert.deepEqual(asset.colors, ['#1C1C1C']);
    assert.deepEqual(asset.strokeWidths, [1]);
    assert.equal(asset.geometryEquivalence.equivalent, true);
    assert.equal(asset.geometryEquivalence.providedPathCount, contract.paths);
    assert.equal(asset.geometryEquivalence.reusedPathCount, contract.paths);
    assert.equal(asset.geometryEquivalence.sourceVectorCount, node.children.length);
    assert.deepEqual(asset.sourcePaintLayers.map(layer => layer.nodeId), node.children.map(child => child.nodeId));
    for (const proof of asset.geometryEquivalence.pathComparisons) {
      const vector = nodes.get(proof.sourceVectorNodeId), style = snapshot.styles[vector.styleRef];
      assert.equal(vector.type, 'VECTOR');
      assert.deepEqual(proof.sourceVectorBounds, [vector.position.x, vector.position.y, style.layout.width, style.layout.height]);
      assert.equal(proof.geometry.equivalent, true);
      assert.equal(proof.geometry.numericTolerance, 0);
      assert.equal(proof.styleMatch, true);
      assert.equal(proof.noTransforms, true);
      assert.equal(proof.sourceBoundsMatch, true);
      const difference = Math.max(...proof.svgPathBounds.map((value, index) => Math.abs(value - proof.sourceVectorBounds[index])));
      assert.equal(difference, proof.maxCoordinateDifference);
      assert(difference <= 0.0001, proof.sourceVectorNodeId);
      assert.equal(style.visual.border.width, 1, proof.sourceVectorNodeId);
      for (const paint of [...style.visual.fills, ...style.visual.border.paints]) assert.equal(paint.hex, '#1C1C1C', proof.sourceVectorNodeId);
      assert.equal(proof.style.stroke, '#1C1C1C');
      assert.equal(proof.style['stroke-width'], '1');
    }
    const bytes = fs.readFileSync(path.join(root, asset.path)), svg = bytes.toString('utf8');
    assert.equal(bytes.length, asset.bytes);
    assert.equal(bytes.length, original.bytes);
    assert.equal(createHash('sha256').update(bytes).digest('hex'), contract.sha256, asset.path);
    assert.equal(asset.sha256, contract.sha256);
    assert.equal(original.sha256, contract.sha256);
    assert.equal((svg.match(/<path\b/g) ?? []).length, contract.paths);
    assert(svg.includes('viewBox="0 0 16 16"'), asset.path);
    assert.equal(Number(svg.match(/<svg\b[^>]*\bwidth="([\d.]+)"/)?.[1]), 16, asset.path);
    assert.equal(Number(svg.match(/<svg\b[^>]*\bheight="([\d.]+)"/)?.[1]), 16, asset.path);
    assert.deepEqual([...new Set([...svg.matchAll(/\b(?:fill|stroke)="(#[a-f\d]{6})"/gi)].map(match => match[1].toUpperCase()))], ['#1C1C1C']);
    assert.equal(asset.providedExport.byteIdenticalToReusedFile, false);
    assert.notEqual(asset.providedExport.sha256, asset.sha256);
    assert.deepEqual([asset.providedExport.width, asset.providedExport.height], [16, 16]);
    assert.deepEqual(asset.providedExport.colors, ['#1C1C1C']);
    assert.deepEqual(asset.providedExport.strokeWidths, [1]);
    if (asset.sourceNodeId === '2751:14602') {
      assert.equal(asset.providedExport.shapeAttributesIdenticalIgnoringIds, false);
      for (const proof of asset.geometryEquivalence.pathComparisons) {
        assert.equal(proof.geometry.direction, 'reversed');
        assert.equal(proof.geometry.segmentCount, 8);
      }
    } else assert.equal(asset.providedExport.shapeAttributesIdenticalIgnoringIds, true);
  }
});

test('Dialog assets close over visible source overrides, whole pin geometry and gradient-only fade provenance', () => {
  const root = path.join(ROOT, 'docs/agent-hub/design');
  const manifest = JSON.parse(fs.readFileSync(path.join(root, 'references/dialog.assets.json'), 'utf8'));
  const snapshot = JSON.parse(fs.readFileSync(path.join(root, 'references/dialog.figma.json'), 'utf8'));
  const assets = new Map(manifest.assets.map(asset => [asset.path, asset]));
  const nodes = new Map();
  function collect(node, parentVisible = true) {
    const visible = parentVisible && node.visible !== false;
    nodes.set(node.nodeId, { node, visible });
    for (const child of node.children ?? []) collect(child, visible);
  }
  for (const source of snapshot.roots) collect(source.tree);
  assert.equal(snapshot.roots.length, 2);
  assert.equal(nodes.size, 732);
  assert.equal(snapshot.implementation.status, 'unmapped');
  assert.equal(manifest.verification.runtimeVerified, false);
  assert.equal(manifest.verification.allStatesVerified, false);
  assert.equal(assets.size, 21);
  assert.equal(manifest.glyphSlots.length, 49);
  assert.equal(manifest.imageSlots.length, 31);
  assert.equal(manifest.counts.existingFilesReused, 19);
  assert.equal(manifest.counts.newRuntimeSvgFiles, 1);
  assert.equal(manifest.counts.newReferencePngFiles, 1);
  assert.equal(manifest.counts.newBytes, 8849);
  assert.equal(new Set(manifest.glyphSlots.map(slot => slot.nodeId)).size, 49);
  function palette(node) {
    const colors = new Set();
    function visit(current) {
      if (current.visible === false) return;
      const visual = snapshot.styles[current.styleRef].visual;
      for (const paint of [...visual.fills, ...visual.border.paints]) {
        if (paint.type === 'SOLID' && paint.visible !== false && paint.opacity !== 0) colors.add(paint.hex);
      }
      for (const child of current.children ?? []) visit(child);
    }
    visit(node);
    return [...colors].sort();
  }
  for (const slot of manifest.glyphSlots) {
    const { node, visible } = nodes.get(slot.nodeId), asset = assets.get(slot.path);
    const layout = snapshot.styles[node.styleRef].layout;
    assert(asset && !asset.referenceOnly, slot.nodeId);
    assert.equal(visible, true, slot.nodeId);
    assert.equal(slot.effectiveVisible, visible, slot.nodeId);
    assert.equal(node.instance?.source?.id ?? null, slot.sourceNodeId, slot.nodeId);
    assert.equal(asset.actualSourceNodeId, slot.sourceNodeId, slot.nodeId);
    assert.deepEqual([layout.width, layout.height], [slot.displayWidth, slot.displayHeight], slot.nodeId);
    assert.deepEqual([asset.width, asset.height], [slot.displayWidth, slot.displayHeight], slot.nodeId);
    assert.deepEqual(node.position, slot.slotPosition, slot.nodeId);
    assert.deepEqual(palette(node), slot.colors, slot.nodeId);
    assert.deepEqual(slot.colors, asset.colors, slot.nodeId);
    assert(asset.instanceNodeIds.includes(slot.nodeId), slot.nodeId);
    if (node.instance) assert.deepEqual([node.instance.source.width, node.instance.source.height], [asset.sourceWidth, asset.sourceHeight], slot.nodeId);
  }
  for (const slot of manifest.imageSlots) {
    const { node, visible } = nodes.get(slot.nodeId), asset = assets.get(slot.path);
    const style = snapshot.styles[node.styleRef], paint = style.visual.fills.find(paint => paint.type === 'IMAGE');
    assert.equal(visible, true, slot.nodeId);
    assert(asset.dynamicSample, slot.nodeId);
    assert.equal(paint.imageHash, asset.imageHash, slot.nodeId);
    assert.deepEqual([style.layout.width, style.layout.height], [slot.displayWidth, slot.displayHeight], slot.nodeId);
    assert.equal(paint.scaleMode, slot.paint.scaleMode, slot.nodeId);
    assert.deepEqual(paint.imageTransform, slot.paint.imageTransform, slot.nodeId);
    assert.deepEqual(paint.filters, slot.paint.filters, slot.nodeId);
  }
  for (const excluded of [...manifest.excludedGlyphSlots, ...manifest.excludedPrimitiveSlots]) {
    assert.equal(nodes.get(excluded.nodeId).visible, false, excluded.nodeId);
    assert.equal(excluded.runtimeAsset, false, excluded.nodeId);
  }
  for (const asset of manifest.assets) {
    assert.match(asset.path, /^assets\/[a-z0-9/-]+\.(svg|png)$/);
    const bytes = fs.readFileSync(path.join(root, asset.path));
    assert(bytes.length > 0, asset.path);
    assert.equal(bytes.length, asset.bytes, asset.path);
    assert.equal(createHash('sha256').update(bytes).digest('hex'), asset.sha256, asset.path);
    if (asset.format === 'png') {
      assert.equal(bytes.subarray(0, 8).toString('hex'), '89504e470d0a1a0a', asset.path);
      assert.deepEqual([bytes.readUInt32BE(16), bytes.readUInt32BE(20)], [asset.width, asset.height], asset.path);
      if (asset.imageHash) assert.equal(createHash('sha1').update(bytes).digest('hex'), asset.imageHash, asset.path);
      continue;
    }
    const svg = bytes.toString('utf8');
    assert.equal(Number(svg.match(/<svg\b[^>]*\bwidth="([\d.]+)"/)?.[1]), asset.width, asset.path);
    assert.equal(Number(svg.match(/<svg\b[^>]*\bheight="([\d.]+)"/)?.[1]), asset.height, asset.path);
    assert(svg.includes(`viewBox="${asset.viewBox}"`), asset.path);
    assert.doesNotMatch(svg, /<script\b|<foreignObject\b|(?:href|src)=["'](?:https?:|\/\/|data:)|\bon[a-z]+\s*=/i, asset.path);
    const ids = new Set([...svg.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]));
    for (const match of svg.matchAll(/url\(#([^)]+)\)/g)) assert(ids.has(match[1]), asset.path);
    const curves = asset.geometryProof?.providedCurveEquivalence;
    if (curves) for (const proof of curves.pathComparisons) {
      assert.equal(proof.equivalent, true, asset.path);
      assert.equal(proof.numericTolerance, 0, asset.path);
      assert.equal(proof.styleMatch, true, asset.path);
    }
  }
  const pin = assets.get('assets/icons/pin/16.svg');
  assert.equal(pin.sourceNodeId, '2308:44294');
  assert.deepEqual([pin.width, pin.height], [16, 16]);
  assert.equal(pin.providedFragment.runtimeAsset, false);
  assert.deepEqual([pin.providedFragment.width, pin.providedFragment.height], [10.3333, 14.3323]);
  assert.equal(pin.geometryProof.sourceWholeSvgExportByteIdenticalToLocal, true);
  assert.equal(pin.geometryProof.instanceWholeSvgExportShapeAttributesMatchIgnoringIds, true);
  assert.equal(assets.get('assets/icons/delay/20.svg').geometryProof.instanceWholeSvgExportByteIdenticalToLocal, true);
  const modelChevron = assets.get('assets/picker/model-chevron-down-16.svg');
  assert.equal(modelChevron.actualSourceNodeId, null);
  assert.equal(modelChevron.method, 'reuse-existing-geometry-and-paint');
  assert.equal(modelChevron.geometryProof.providedShapeAttributesMatchIgnoringIds, true);
  const fade = assets.get('assets/dialog/content-fade-reference.png'), fadeNode = nodes.get('3163:22406').node;
  const fadeStyle = snapshot.styles[fadeNode.styleRef];
  assert.equal(fade.referenceOnly, true);
  assert.equal(fade.runtimeAsset, false);
  assert.equal(fade.originalImagePaint, false);
  assert.deepEqual([fade.width, fade.height, fade.displayWidth, fade.displayHeight], [1024, 44, 1137, 48]);
  assert.equal(fadeStyle.visual.fills[0].type, 'GRADIENT_LINEAR');
  assert.equal(fadeStyle.visual.fills.some(paint => paint.type === 'IMAGE'), false);
  const gradient = manifest.nonAssetPaintSlots.find(slot => slot.nodeId === '3163:22406');
  assert.deepEqual(gradient.paint.gradientTransform, fadeStyle.visual.fills[0].gradientTransform);
  assert.deepEqual(gradient.paint.gradientStops.map(stop => [stop.position, stop.color.a]), fadeStyle.visual.fills[0].gradientStops.map(stop => [stop.position, stop.opacity]));
  for (const id of ['I3192:27854;3192:33995', 'I3163:22377;3192:33995']) {
    const node = nodes.get(id).node, style = snapshot.styles[node.styleRef];
    assert.equal(node.instance.source.id, '2611:59907');
    assert.deepEqual([style.layout.width, style.layout.height, style.visual.radius], [32, 32, 4]);
  }
  assert.equal(nodes.get('3192:27914').node.instance.source.id, '2019:3708');
  assert.equal(snapshot.styles[nodes.get('I3192:27914;5282:27347').node.styleRef].visual.radius, 8);
  assert.equal(nodes.get('3163:22407').node.instance.source.id, '3155:20473');
  assert.equal(snapshot.styles[nodes.get('I3163:22407;3155:20472').node.styleRef].visual.radius, 9999);
});

test('Search and FilterChip glyph instances resolve to exact Agent Hub assets at native dimensions', () => {
  const root = path.join(ROOT, 'docs/agent-hub/design');
  const manifest = JSON.parse(fs.readFileSync(path.join(root, 'asset-manifest.json'), 'utf8'));
  const flatten = node => [node, ...(node.children || []).flatMap(flatten)];
  for (const name of ['search', 'filter-chip']) {
    const snapshot = JSON.parse(fs.readFileSync(path.join(root, `references/${name}.figma.json`), 'utf8'));
    const instances = snapshot.variants.flatMap(flatten).filter(node => node.type === 'INSTANCE');
    assert(instances.length > 0);
    for (const node of instances) {
      const source = node.instance?.source;
      const asset = manifest.icons.find(asset => asset.sources.some(candidate => candidate.nodeId === source?.id));
      assert(asset, `${node.nodeId}: missing exact glyph source ${source?.id}`);
      const layout = snapshot.styles[node.styleRef].layout;
      for (const dimension of ['width', 'height']) {
        assert.equal(source[dimension], asset.size, node.nodeId);
        assert.equal(layout[dimension], asset.size, node.nodeId);
      }
      assert(fs.statSync(path.join(root, asset.path)).size > 0, node.nodeId);
      for (const child of flatten(node).filter(child => child.type === 'VECTOR' || child.type === 'LINE')) {
        const stroke = snapshot.styles[child.styleRef].visual.border;
        if (stroke.paints.length) assert(asset.strokeWidths.some(width => Math.abs(width - stroke.width) < 0.00001), child.nodeId);
      }
    }
  }
});

test('Checkbox supplied SVGs cover selected/mixed snapshots with intact native Box+Mark assets', () => {
  const root = path.join(ROOT, 'docs/agent-hub/design');
  const manifest = JSON.parse(fs.readFileSync(path.join(root, 'references/checkbox.assets.json'), 'utf8'));
  const snapshot = JSON.parse(fs.readFileSync(path.join(root, 'references/checkbox.figma.json'), 'utf8'));
  const expected = snapshot.variants.filter(node => node.variant.type !== 'unchecked');
  assert.equal(manifest.componentId, 'AgentHubCheckbox');
  assert.deepEqual(new Set(manifest.assets.map(asset => asset.nodeId)), new Set(expected.map(node => node.nodeId)));
  assert.equal(manifest.assets.length, expected.length);
  assert.equal(new Set(manifest.assets.map(asset => asset.path)).size, expected.length);
  for (const asset of manifest.assets) {
    const node = expected.find(node => node.nodeId === asset.nodeId);
    const layout = snapshot.styles[node.styleRef].layout;
    assert.deepEqual(asset.variant, node.variant);
    assert.equal(asset.width, layout.width);
    assert.equal(asset.height, layout.height);
    assert.match(asset.path, /^assets\/checkbox\/(small|medium|large)\/(checked|indeterminate)-(enabled|disabled)\.svg$/);
    const bytes = fs.readFileSync(path.join(root, asset.path));
    assert.equal(bytes.length, asset.bytes, asset.path);
    assert.equal(createHash('sha256').update(bytes).digest('hex'), asset.sha256, asset.path);
    const svg = bytes.toString('utf8');
    assert(svg.includes(`viewBox="0 0 ${asset.width} ${asset.height}"`), asset.path);
    assert.match(svg, new RegExp(`\\bwidth="${asset.width}"`), asset.path);
    assert.match(svg, new RegExp(`\\bheight="${asset.height}"`), asset.path);
    assert.doesNotMatch(svg, /<script\b|<foreignObject\b|(?:href|src)=["'](?:https?:|\/\/|data:)|\bon[a-z]+\s*=/i, asset.path);
    const ids = new Set([...svg.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]));
    for (const match of svg.matchAll(/url\(#([^)]+)\)/g)) assert(ids.has(match[1]), asset.path);
  }
});
