import fs from 'node:fs';
import path from 'node:path';

const paint = rows => rows.map(row => ({ hex: row.hex, opacity: row.opacity, token: row.token }));
const effects = rows => rows.map(row => Object.fromEntries(
  ['type', 'visible', 'radius', 'offset', 'spread', 'blendMode', 'showShadowBehindNode', 'color'].map(key => [key, row[key]]),
));

export function inspectChatComposerComposition(designRoot) {
  const read = name => JSON.parse(fs.readFileSync(path.join(designRoot, 'references', name), 'utf8'));
  const composer = read('chat-composer.figma.json');
  const attach = read('icon-button-attach.figma.json');
  const chips = read('agent-type-chip.figma.json');
  const elevation = read('elevation.figma.json');
  const assets = read('chat-composer.assets.json');
  const overflow = elevation.levels.find(level => level.level === 'Overflow');
  const issues = [], actions = [], shadows = [], selectors = [], styleReferences = [];
  const equal = (actual, expected, label) => {
    const same = typeof actual === 'number' && typeof expected === 'number'
      ? Math.abs(actual - expected) < 0.0001 : JSON.stringify(actual) === JSON.stringify(expected);
    if (!same) issues.push(`${label}: ${JSON.stringify(actual)} != ${JSON.stringify(expected)}`);
  };
  const flatten = node => [node, ...(node.children || []).flatMap(flatten)];
  for (const variant of composer.variants) {
    const state = variant.variant.state;
    const nodes = flatten(variant), start = issues.length;
    const surface = composer.styles[variant.styleRef];
    if (!overflow) issues.push('Missing Overflow foundation');
    else {
      equal(variant.effectStyleId, overflow.effectStyleId, `${state} Overflow style identity`);
      equal(effects(surface.visual.effects), effects(overflow.effects), `${state} Overflow effects`);
    }
    shadows.push({ state, nodeId: variant.nodeId, level: 'Overflow', status: issues.length === start ? 'match' : 'mismatch' });
    const buttons = nodes.filter(node => node.type === 'INSTANCE' && ['3104:20', '3104:21'].includes(node.instance?.source?.id));
    equal(buttons.length, 2, `${state} measured circular actions`);
    for (const node of buttons) {
      const start = issues.length;
      const isAttach = node.instance.source.id === '3104:20';
      const role = isAttach ? 'attach' : 'send';
      const blue = !isAttach && ['typing', 'agent-selected'].includes(state);
      const sourceState = isAttach ? 'default' : 'hovered';
      const primitive = attach.variants.find(item => item.nodeId === node.instance.source.id);
      const visualReference = blue ? attach.variants.find(item => item.variant.state === 'state5') : primitive;
      if (!primitive || !visualReference) { issues.push(`${state}/${role}: missing standalone reference`); continue; }
      const actual = composer.styles[node.styleRef];
      equal(node.instance.variant, { state: sourceState }, `${state}/${role} actual source variant`);
      for (const dimension of ['width', 'height', 'padding']) equal(actual.layout[dimension], primitive.layout[dimension], `${state}/${role} ${dimension}`);
      equal(actual.visual.radius, primitive.visual.radius, `${state}/${role} radius`);
      equal(paint(actual.visual.border.paints), paint(primitive.visual.border.paints), `${state}/${role} border`);
      equal(paint(actual.visual.fills), paint(visualReference.visual.fills), `${state}/${role} surface override`);
      const glyph = node.children?.find(child => child.type === 'INSTANCE' && child.visible);
      const asset = assets.assets.find(asset => asset.role === role);
      if (!glyph || !asset) { issues.push(`${state}/${role}: missing glyph/asset`); continue; }
      equal(glyph.instance?.source?.id, asset.sourceNodeId, `${state}/${role} exact glyph source`);
      equal(glyph.position, { x: 4, y: 4 }, `${state}/${role} centered glyph`);
      const box = composer.styles[glyph.styleRef].layout;
      equal(box.width, asset.width, `${state}/${role} glyph width`);
      equal(box.height, asset.height, `${state}/${role} glyph height`);
      for (const vector of glyph.children || []) {
        const line = composer.styles[vector.styleRef].visual.border;
        equal(line.width, 1.5, `${vector.nodeId} stroke width`);
        equal(line.cap, 'ROUND', `${vector.nodeId} cap`);
        equal(line.join, 'ROUND', `${vector.nodeId} join`);
        equal(line.paints[0]?.hex, blue ? '#FFFFFF' : '#1C1C1C', `${vector.nodeId} semantic color`);
      }
      actions.push({ state, role, nodeId: node.nodeId, sourceNodeId: node.instance.source.id, sourceState,
        glyphSourceNodeId: glyph.instance.source.id, visualReferenceState: blue ? 'state5 (visual only)' : sourceState,
        overrides: isAttach ? [] : ['glyph', ...(blue ? ['surface', 'glyphColor'] : [])],
        status: issues.length === start ? 'match' : 'mismatch' });
    }
    const selector = variant.children.find(node => node.name === 'chip/project-select');
    const selectorStart = issues.length;
    if (!selector) { issues.push(`${state}: missing project selector`); continue; }
    const layout = composer.styles[selector.styleRef].layout;
    equal(layout.layoutPositioning, 'ABSOLUTE', `${state} project positioning`);
    equal(selector.position, { x: 9, y: 62 }, `${state} project offset including border`);
    equal(layout.height, 28, `${state} selector height`);
    equal(surface.layout.clipsContent, false, `${state} outside selector visible`);
    const folder = selector.children.find(node => node.type === 'INSTANCE');
    equal(folder?.instance?.source?.id, '2037:4537', `${state} resized folder source`);
    if (folder) {
      equal(folder.instance.source.width, 20, `${state} native source width`);
      equal(composer.styles[folder.styleRef].layout.width, 16, `${state} effective folder width`);
      equal(composer.styles[folder.styleRef].layout.height, 16, `${state} effective folder height`);
      for (const vector of folder.children || []) equal(composer.styles[vector.styleRef].visual.border.width, 1, `${state} actual folder stroke`);
    }
    selectors.push({ state, nodeId: selector.nodeId, surfaceHeight: surface.layout.height,
      visibleBottom: selector.position.y + layout.height, status: issues.length === selectorStart ? 'match' : 'mismatch' });
    if (state === 'agent-selected') {
      const start = issues.length;
      const chip = nodes.find(node => node.instance?.source?.id === '2079:11964');
      const reference = chips.variants.find(node => node.variant['agent-types'] === 'workflow');
      if (!chip || !reference) issues.push('Missing selected-agent chip or workflow style reference');
      else {
        const a = composer.styles[chip.styleRef];
        for (const key of ['width', 'height', 'maxWidth', 'padding']) equal(a.layout[key], reference.layout[key], `agent-selected Chip ${key}`);
        equal(a.visual.radius, reference.visual.radius, 'agent-selected Chip radius');
        equal(paint(a.visual.fills), paint(reference.visual.fills), 'agent-selected Chip palette');
        const label = chip.children.find(node => node.type === 'TEXT');
        const labelStyle = composer.styles[label.styleRef];
        equal(label.text, reference.text.label, 'agent-selected workflow sample');
        equal(labelStyle.text.fontSize, reference.text.fontSize, 'agent-selected Chip font size');
        equal(labelStyle.text.fontWeight, reference.text.fontWeight, 'agent-selected Chip font weight');
        equal(labelStyle.text.lineHeight, reference.text.lineHeight, 'agent-selected Chip line height');
        equal(paint(labelStyle.visual.fills), paint(reference.text.fills), 'agent-selected Chip label color');
        styleReferences.push({ nodeId: chip.nodeId, sourceNodeId: chip.instance.source.id, referenceComponent: 'AgentHubAgentTypeChip',
          referenceNodeId: reference.nodeId, sourceReuse: false, status: issues.length === start ? 'match' : 'mismatch' });
      }
      const divider = nodes.find(node => node.instance?.source?.id === '2019:118');
      if (!divider) issues.push('Missing selected-agent Divider');
      else {
        const d = composer.styles[divider.styleRef];
        equal(d.layout.height, 12, 'selected-agent Divider resized height');
        equal(d.layout.padding, { left: 8, right: 8, top: 0, bottom: 0 }, 'selected-agent Divider spacing');
      }
    }
  }
  return { schemaVersion: 1, solution: 'agent-hub', scope: 'Chat Composer measured instances, overrides and existing design references',
    runtimeVerified: false, allStatesVerified: false, actions, shadows, selectors, styleReferences,
    limits: ['Four static Light samples only; source hovered is not Composer pointer-hover or request state',
      'state5 is a visual reference only; global semantics remain undefined',
      'Workflow style match does not change the common Chip source identity',
      'No upload, submit, agent/project popup, multiline, keyboard, dark or responsive runtime is verified'], issues };
}
