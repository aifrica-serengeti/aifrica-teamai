import fs from 'node:fs';
import path from 'node:path';

export function inspectMessageExampleComposition(designRoot) {
  const read = name => JSON.parse(fs.readFileSync(path.join(designRoot, 'references', name), 'utf8'));
  const example = read('message-example.figma.json');
  const variables = read('message-example.variables.figma.json');
  const assets = read('message-example.assets.json');
  const manifest = JSON.parse(fs.readFileSync(path.join(designRoot, 'asset-manifest.json'), 'utf8'));
  const issues = [], variants = [];
  const equal = (actual, expected, label) => {
    const same = typeof actual === 'number' && typeof expected === 'number'
      ? Math.abs(actual - expected) < 0.0001 : JSON.stringify(actual) === JSON.stringify(expected);
    if (!same) issues.push(`${label}: ${JSON.stringify(actual)} != ${JSON.stringify(expected)}`);
  };
  function resolveColor(id, modes, seen = new Set()) {
    if (seen.has(id)) throw new Error(`Variable alias cycle ${id}`);
    seen.add(id);
    const variable = variables.variables.find(variable => variable.id === id);
    if (!variable) throw new Error(`Missing variable ${id}`);
    const collection = variables.collections.find(collection => collection.id === variable.variableCollectionId);
    if (!collection) throw new Error(`Missing collection ${variable.variableCollectionId}`);
    const mode = modes[collection.id] ?? collection.defaultModeId;
    const value = variable.valuesByMode[mode];
    if (!value) throw new Error(`Missing measured mode ${mode} for ${id}`);
    if (value.type === 'VARIABLE_ALIAS') return resolveColor(value.id, modes, seen);
    return `#${['r', 'g', 'b'].map(channel => Math.round(value[channel] * 255).toString(16).padStart(2, '0')).join('').toUpperCase()}`;
  }
  equal(example.propertyDefinitions['icon#2367:11'], { type: 'BOOLEAN', defaultValue: true }, 'source icon Boolean');
  const asset = assets.assets[0];
  const existing = manifest.icons.find(icon => icon.sources.some(source => source.nodeId === asset.sourceNodeId));
  if (!existing) return { issues: [...issues, 'Missing exact source in Agent Hub icon manifest'] };
  equal(asset.path, existing.path, 'reused arrow path');
  equal(asset.sha256, existing.sha256, 'reused arrow hash');
  for (const node of example.variants) {
    const start = issues.length, state = node.variant.state;
    const style = example.styles[node.styleRef];
    const fill = style.visual.fills[0];
    const suffix = state === 'enabled' ? '' : `-${state}`;
    equal(fill?.token?.name, `color/action/primary-subtle${suffix}`, `${state} semantic background`);
    if (fill?.token) equal(fill.hex, resolveColor(fill.token.id, node.resolvedVariableModes), `${state} resolved background`);
    equal(style.visual.border.paints, [], `${state} no rendered border`);
    equal(style.visual.effects, [], `${state} no shadow`);
    const label = node.children.find(child => child.type === 'TEXT');
    const icon = node.children.find(child => child.type === 'INSTANCE');
    if (!label || !icon) { issues.push(`${state}: missing label or visible icon`); continue; }
    equal(node.children.length, 2, `${state} label and single glyph only`);
    equal(icon.instance?.source?.id, asset.sourceNodeId, `${state} exact glyph source`);
    equal(icon.visible, true, `${state} measured icon visibility`);
    equal(icon.componentPropertyReferences?.visible, 'icon#2367:11', `${state} visibility property`);
    const text = example.styles[label.styleRef], box = example.styles[icon.styleRef];
    equal(text.text.fontName, { family: 'Pretendard', style: 'Regular' }, `${state} text font`);
    equal(text.text.fontSize, 14, `${state} text size`);
    equal(text.text.fontWeight, 400, `${state} regular weight`);
    equal(text.text.lineHeight, { unit: 'PIXELS', value: 20 }, `${state} line height`);
    equal(text.visual.fills[0]?.hex, '#1C1C1C', `${state} text color`);
    equal(box.layout.width, asset.width, `${state} native glyph width`);
    equal(box.layout.height, asset.height, `${state} native glyph height`);
    equal(label.position, { x: style.layout.padding.left, y: style.layout.padding.top }, `${state} label position`);
    equal(icon.position.x, label.position.x + text.layout.width + style.layout.gap, `${state} glyph after text`);
    equal(style.layout.width, style.layout.padding.left + text.layout.width + style.layout.gap + box.layout.width + style.layout.padding.right, `${state} measured content-based width`);
    equal(style.layout.height, Math.max(text.layout.height, box.layout.height) + style.layout.padding.top + style.layout.padding.bottom, `${state} measured content-based height`);
    for (const vector of icon.children) {
      const stroke = example.styles[vector.styleRef].visual.border;
      equal(stroke.width, asset.strokeWidth, `${vector.nodeId} stroke width`);
      equal(stroke.paints[0]?.hex, asset.color, `${vector.nodeId} semantic color`);
      equal(stroke.cap, 'ROUND', `${vector.nodeId} cap`);
      equal(stroke.join, 'ROUND', `${vector.nodeId} join`);
    }
    variants.push({ state, nodeId: node.nodeId, background: fill.hex, glyphNodeId: icon.nodeId,
      glyphSourceNodeId: icon.instance.source.id, visibilityProperty: icon.componentPropertyReferences.visible,
      status: issues.length === start ? 'match' : 'mismatch' });
  }
  return { schemaVersion: 1, solution: 'agent-hub', scope: 'Message Example state palettes, visible glyph sources and property bindings',
    runtimeVerified: false, allStatesVerified: false, buttonInstanceReuse: false, semanticReference: 'Button', variants,
    limits: ['Three Light icon-visible samples only; icon=false has a source Boolean but no separately measured render',
      'No Button/Card/UserMessage source instance exists; Button semantics do not establish source reuse',
      'Pressed is transient, not selected/sent/success; draft fill, immediate execution and route behavior are not verified',
      'Focus/disabled/loading/dark, long/wrapped/mobile and browser keyboard runtime remain unverified'], issues };
}
