import fs from 'node:fs';
import path from 'node:path';

const paints = rows => rows.map(row => ({ hex: row.hex, opacity: row.opacity, token: row.token }));

export function inspectProgressAlertComposition(designRoot) {
  const read = name => JSON.parse(fs.readFileSync(path.join(designRoot, 'references', name), 'utf8'));
  const alert = read('progress-alert.figma.json');
  const button = read('button.figma.json');
  const assets = read('progress-alert.assets.json');
  const manifest = JSON.parse(fs.readFileSync(path.join(designRoot, 'asset-manifest.json'), 'utf8'));
  const issues = [], buttons = [];
  const equal = (actual, expected, label) => {
    const same = typeof actual === 'number' && typeof expected === 'number'
      ? Math.abs(actual - expected) < 0.0001 : JSON.stringify(actual) === JSON.stringify(expected);
    if (!same) issues.push(`${label}: ${JSON.stringify(actual)} != ${JSON.stringify(expected)}`);
  };
  const root = alert.root, surface = alert.styles[root.styleRef];
  equal(root.type, 'COMPONENT', 'measured root kind');
  equal(alert.propertyDefinitions, {}, 'no measured root state or text props');
  equal(surface.layout.strokesIncludedInLayout, true, 'surface border consumes layout');
  equal(surface.visual.effects, [], 'surface has no shadow');
  const content = root.children.find(node => node.children?.some(child => child.name === 'title'));
  const actions = root.children.find(node => node.children?.some(child => child.instance?.source?.id === '3109:144'));
  if (!content || !actions) return { issues: [...issues, 'Missing content or actions group'] };
  const inset = surface.visual.border.width;
  equal(content.position.x, surface.layout.padding.left + inset, 'surface content inset');
  equal(actions.position.y, surface.layout.padding.top + inset, 'surface actions inset');
  equal(surface.layout.height, alert.styles[actions.styleRef].layout.height + surface.layout.padding.top + surface.layout.padding.bottom + inset * 2, 'surface natural height');
  equal(alert.styles[actions.styleRef].layout.gap, 8, 'action spacing');
  const primitive = button.variants.find(node => node.nodeId === '3109:144');
  if (!primitive) return { issues: [...issues, 'Missing tertiary28 enabled Button reference'] };
  for (const node of actions.children) {
    const start = issues.length;
    equal(node.instance?.source?.id, primitive.nodeId, `${node.nodeId} actual Button source`);
    equal(node.instance?.variant, primitive.variant, `${node.nodeId} actual Button variant`);
    const style = alert.styles[node.styleRef];
    for (const field of ['height', 'padding', 'gap', 'layoutMode', 'layoutSizingHorizontal', 'layoutSizingVertical']) {
      equal(style.layout[field], primitive.layout[field], `${node.nodeId} ${field}`);
    }
    equal(style.layout.strokesIncludedInLayout, false, `${node.nodeId} inside border does not consume layout`);
    equal(style.visual.radius, primitive.visual.radius, `${node.nodeId} radius`);
    equal(paints(style.visual.fills), paints(primitive.visual.fills), `${node.nodeId} surface`);
    equal(paints(style.visual.border.paints), paints(primitive.visual.border.paints), `${node.nodeId} border paint`);
    equal(style.visual.border.width, primitive.visual.border.width, `${node.nodeId} border width`);
    equal(style.visual.border.align, primitive.visual.border.align, `${node.nodeId} border alignment`);
    for (const property of ['leading-icon#3025:10', 'trailing-icon#3025:20', 'keycap#3110:28']) {
      equal(node.instance?.componentProperties?.[property]?.value, false, `${node.nodeId} disabled slot ${property}`);
    }
    const visible = node.children.filter(child => child.visible);
    equal(visible.length, 1, `${node.nodeId} label-only rendering`);
    const label = visible.find(child => child.type === 'TEXT');
    if (!label) issues.push(`${node.nodeId}: missing action label`);
    else {
      equal(label.text, node.instance.componentProperties['label#3025:0'].value, `${node.nodeId} label override`);
      equal(label.componentPropertyReferences?.characters, 'label#3025:0', `${node.nodeId} label binding`);
      const text = alert.styles[label.styleRef];
      equal(text.text.fontName, primitive.text.font, `${node.nodeId} font`);
      equal(text.text.fontSize, primitive.text.fontSize, `${node.nodeId} font size`);
      equal(text.text.fontWeight, primitive.text.fontWeight, `${node.nodeId} font weight`);
      equal(text.text.lineHeight, primitive.text.lineHeight, `${node.nodeId} line height`);
      equal(paints(text.visual.fills), paints(primitive.text.fills), `${node.nodeId} label color`);
      equal(style.layout.width, text.layout.width + style.layout.padding.left + style.layout.padding.right, `${node.nodeId} label-only width without extra CSS border`);
    }
    buttons.push({ nodeId: node.nodeId, sourceNodeId: primitive.nodeId, variant: node.instance?.variant,
      renderedSlots: ['label'], insideBorderConsumesLayout: false, status: issues.length === start ? 'match' : 'mismatch' });
  }
  equal(buttons.length, 2, 'measured action count');
  const iconStart = issues.length;
  const icon = content.children.find(node => node.type === 'INSTANCE');
  const asset = assets.assets[0];
  const original = manifest.icons.find(item => item.sources.some(source => source.nodeId === asset.sourceNodeId));
  if (!icon || !original) issues.push('Missing exact visible circle-alert asset');
  else {
    equal(icon.instance?.source?.id, asset.sourceNodeId, 'circle-alert exact source');
    equal(asset.path, original.path, 'existing circle-alert asset path');
    equal(asset.sha256, original.sha256, 'existing circle-alert hash');
    const box = alert.styles[icon.styleRef].layout;
    equal(box.width, asset.width, 'circle-alert native width');
    equal(box.height, asset.height, 'circle-alert native height');
    for (const vector of icon.children) {
      const stroke = alert.styles[vector.styleRef].visual.border;
      equal(stroke.width, asset.strokeWidth, `${vector.nodeId} stroke width`);
      equal(stroke.paints[0]?.hex, asset.color, `${vector.nodeId} semantic color`);
      equal(stroke.cap, 'ROUND', `${vector.nodeId} round cap`);
      equal(stroke.join, 'ROUND', `${vector.nodeId} round join`);
    }
  }
  return { schemaVersion: 1, solution: 'agent-hub', scope: 'Single ProgressAlert interruption sample and existing Button/Icon references',
    runtimeVerified: false, allStatesVerified: false, buttons,
    icon: { nodeId: icon?.nodeId, sourceNodeId: asset.sourceNodeId, status: issues.length === iconStart ? 'match' : 'mismatch' },
    container: { strokesIncludedInLayout: surface.layout.strokesIncludedInLayout, measuredHeight: surface.layout.height,
      buttonHeight: primitive.layout.height, verticalPadding: surface.layout.padding.top, borderWidth: inset },
    limits: ['One interrupted-response sample; no progress percentage, spinner, cancel, dismiss or auto-hide is provided',
      'Button variants are enabled references; root has no state enum',
      'Slot Booleans disable leading/trailing/keycaps; unused generated helper assets are not rendered',
      'Retry/edit handlers, request deduplication, focus/live announcements, responsive and dark runtime remain unverified'], issues };
}
