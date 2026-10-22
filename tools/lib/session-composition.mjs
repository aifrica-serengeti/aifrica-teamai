import { createHash } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

const walk = node => [node, ...(node.children ?? []).flatMap(walk)];
const without = (value, names) => Object.fromEntries(Object.entries(value).filter(([key]) => !names.includes(key)));

export function inspectSessionComposition(designRoot) {
  const read = name => JSON.parse(fs.readFileSync(path.join(designRoot, 'references', name), 'utf8'));
  const session = read('session.figma.json'), variables = read('session.variables.figma.json');
  const assetManifest = read('session.assets.json'), elevation = read('elevation.figma.json');
  const buttons = read('icon-button.figma.json');
  const issues = [], panels = [], statePalettes = [], compositions = [], assets = [];
  const equal = (actual, expected, label) => {
    const same = typeof actual === 'number' && typeof expected === 'number'
      ? Math.abs(actual - expected) < 0.0001 : JSON.stringify(actual) === JSON.stringify(expected);
    if (!same) issues.push(`${label}: ${JSON.stringify(actual)} != ${JSON.stringify(expected)}`);
  };
  const check = (condition, label) => { if (!condition) issues.push(label); };
  const status = start => issues.length === start ? 'match' : 'mismatch';
  const all = session.roots.flatMap(root => walk(root.tree));
  const byId = new Map(all.map(node => [node.nodeId, node]));
  const node = id => {
    const value = byId.get(id);
    if (!value) throw new Error(`Missing measured Session node ${id}`);
    return value;
  };
  const style = target => session.styles[target.styleRef];
  const root = id => session.roots.find(entry => entry.tree.nodeId === id);
  const panelSet = root('2975:69460'), filled = node('2975:69459'), empty = node('2975:69458');
  equal(session.implementation, { status: 'unmapped', source: null, export: null }, 'consumer source/export remains unmapped');
  equal(session.roots.length, 6, 'six source roots');
  equal(session.roots.map(entry => entry.tree.children.length), [2, 4, 3, 4, 2, 4], 'nineteen supplied variants by source family');
  equal(panelSet.propertyDefinitions, null, 'panel property getter unavailable rather than empty');
  check(panelSet.propertyDefinitionsReadStatus?.includes('getter unavailable'), 'panel getter limitation must be preserved');
  for (const entry of session.roots.slice(1)) check(Boolean(entry.propertyDefinitions), `${entry.componentId}: separately collected property definitions`);
  const mid = elevation.effectStyles.find(effect => effect.name === 'Mid');
  for (const [panel, height, sectionNames] of [[filled, 934, ['schedule-section', 'progress-section', 'output-section', 'context-section']],
    [empty, 154, ['output-section', 'context-section']]]) {
    const start = issues.length, box = style(panel);
    equal([box.layout.width, box.layout.height], [320, height], `${panel.nodeId} measured panel geometry`);
    equal(box.layout.padding, { left: 12, right: 12, top: 16, bottom: 16 }, `${panel.nodeId} padding`);
    equal(box.layout.gap, 24, `${panel.nodeId} section spacing`);
    equal(box.layout.layoutSizingVertical, 'HUG', `${panel.nodeId} natural height`);
    equal(box.layout.strokesIncludedInLayout, true, `${panel.nodeId} border included in layout`);
    equal(box.visual.border.width, 1, `${panel.nodeId} border width`);
    equal(box.visual.border.paints[0]?.hex, '#EEEEEE', `${panel.nodeId} subtle border`);
    equal(box.visual.fills[0]?.hex, '#F6F7F9', `${panel.nodeId} blue-gray surface`);
    equal(box.visual.radius, 16, `${panel.nodeId} radius`);
    equal(panel.effectStyleId, mid?.id, `${panel.nodeId} actual Mid source`);
    equal(box.visual.effects, mid?.effects, `${panel.nodeId} Mid values`);
    equal(panel.children.map(child => child.name), sectionNames, `${panel.nodeId} actual section branches`);
    let y = 17;
    for (const section of panel.children) {
      equal(style(section).layout.width, 294, `${section.nodeId} content width reserves border and padding`);
      equal(section.position, { x: 13, y }, `${section.nodeId} section position`);
      y += style(section).layout.height + 24;
    }
    equal(y - 24 + 17, height, `${panel.nodeId} content-based panel height`);
    panels.push({ nodeId: panel.nodeId, state: panel.variant.state, width: 320, height, contentWidth: 294, status: status(start) });
  }
  for (const [id, height, padding] of [['2986:22114', 36, { left: 4, right: 4, top: 4, bottom: 4 }],
    ['2987:22151', 32, { left: 4, right: 4, top: 8, bottom: 8 }],
    ['2995:22304', 32, { left: 8, right: 8, top: 6, bottom: 6 }]]) {
    for (const variant of root(id).tree.children) {
      const start = issues.length, state = variant.variant.state, box = style(variant);
      equal(box.layout.height, height, `${variant.nodeId} row height`);
      equal(box.layout.padding, padding, `${variant.nodeId} row padding`);
      equal(box.visual.radius, 6, `${variant.nodeId} row radius`);
      equal(box.visual.border.paints, [], `${variant.nodeId} no rendered row border`);
      equal(box.visual.effects, [], `${variant.nodeId} no row shadow`);
      const color = state === 'selected' ? '#EBF3FF' : state === 'default' ? null : '#000000';
      equal(box.visual.fills.map(fill => fill.hex), color ? [color] : [], `${variant.nodeId} state surface`);
      if (color) equal(box.visual.fills[0].opacity, state === 'hovered' ? 0.05 : state === 'pressed' ? 0.1 : 1, `${variant.nodeId} state alpha separates selected from pressed`);
      statePalettes.push({ nodeId: variant.nodeId, state, background: color, status: status(start) });
    }
  }

  const familySources = new Map(session.roots.slice(1).flatMap(entry => entry.tree.children.map(variant => [variant.nodeId, entry.componentId])));
  const actual = walk(filled).concat(walk(empty)).filter(target => familySources.has(target.instance?.source?.id));
  const expectedCounts = { AgentHubSessionItem: 6, AgentHubSessionProgressStep: 4, AgentHubSessionContextItem: 5,
    AgentHubSessionSectionHeader: 6, AgentHubSessionHistoryItem: 5 };
  for (const [family, count] of Object.entries(expectedCounts)) equal(actual.filter(target => familySources.get(target.instance.source.id) === family).length, count, `${family} actual instance count`);
  for (const target of actual) {
    const start = issues.length, source = node(target.instance.source.id), family = familySources.get(source.nodeId);
    const a = style(target), b = style(source), properties = target.instance.componentProperties;
    equal(target.instance.variant, source.variant, `${target.nodeId} exact source variant`);
    equal(a.layout.width, b.layout.width, `${target.nodeId} source width`);
    equal(without(a.layout, ['layoutSizingHorizontal', 'height']), without(b.layout, ['layoutSizingHorizontal', 'height']), `${target.nodeId} root geometry reuse`);
    const historySelectedOverride = target.nodeId === '2975:69424';
    if (historySelectedOverride) {
      equal(without(a.visual, ['fills']), without(b.visual, ['fills']), `${target.nodeId} selected geometry and border`);
      equal(a.visual.fills[0]?.hex, b.visual.fills[0]?.hex, `${target.nodeId} same selected surface value`);
      equal(a.visual.fills[0]?.token, { id: 'VariableID:3081:25', name: 'color/action/default-selected' }, `${target.nodeId} actual selected semantic override`);
      equal(b.visual.fills[0]?.token, { id: 'VariableID:3081:158', name: 'color/element/primary-subtle' }, `${target.nodeId} standalone selected semantic source`);
      equal(a.bindings.fills?.[0]?.id, 'VariableID:3081:25', `${target.nodeId} actual selected fill binding`);
    } else equal(a.visual, b.visual, `${target.nodeId} source root paint`);
    equal(a.layout.height, target.nodeId === '2975:68166' ? 20 : b.layout.height, `${target.nodeId} source height or final connector reflow`);
    for (const child of walk(target)) {
      const visibleProperty = child.componentPropertyReferences?.visible;
      if (properties[visibleProperty]?.type === 'BOOLEAN') equal(child.visible, properties[visibleProperty].value, `${child.nodeId} actual Boolean visibility`);
      const textProperty = child.componentPropertyReferences?.characters;
      if (properties[textProperty]?.type === 'TEXT') equal(child.text, properties[textProperty].value, `${child.nodeId} actual text override`);
      if (child.type === 'TEXT') {
        const original = walk(source).find(candidate => child.nodeId.endsWith(`;${candidate.nodeId.replace(/^I/, '')}`));
        if (original) {
          equal(style(child).text, style(original).text, `${child.nodeId} source typography`);
          equal(style(child).visual, style(original).visual, `${child.nodeId} source text paint`);
        }
      }
      const swapProperty = child.componentPropertyReferences?.mainComponent;
      if (properties[swapProperty]?.type === 'INSTANCE_SWAP') equal(child.instance?.source?.id, properties[swapProperty].value, `${child.nodeId} actual icon source swap`);
    }
    compositions.push({ nodeId: target.nodeId, family, sourceNodeId: source.nodeId, variant: target.instance.variant,
      selectedSemanticOverride: historySelectedOverride ? 'color/action/default-selected' : null, status: status(start) });
  }

  const schedule = node('2975:69417');
  equal(schedule.instance.componentProperties['meta#2986:3']?.value, true, 'schedule meta explicitly enabled');
  equal(schedule.instance.componentProperties['icon#2986:9']?.value, '2053:5271', 'schedule icon exact source');
  const history = node('2975:69419');
  equal([style(history).layout.width, style(history).layout.height], [286, 204], 'schedule history white card dimensions');
  equal(style(history).visual.fills[0]?.hex, '#FFFFFF', 'schedule history white card');
  equal(style(history).visual.radius, 8, 'history card radius');
  const historyRows = actual.filter(target => familySources.get(target.instance.source.id) === 'AgentHubSessionHistoryItem');
  equal(historyRows.map(target => target.instance.variant.state), ['selected', 'default', 'default', 'default', 'default'], 'viewed history selection independent of unread');
  equal(historyRows.map(target => target.instance.componentProperties['dot#2995:3']?.value), [false, true, true, false, false], 'unread dots independent of selected');
  for (const variant of root('2995:22304').tree.children) {
    const dot = variant.children.find(child => child.name === 'dot');
    equal(dot.visible, false, `${variant.nodeId} standalone unread dot default hidden`);
    equal([style(dot).layout.width, style(dot).layout.height], [6, 6], `${variant.nodeId} unread dot dimensions`);
    equal(style(dot).visual.fills[0]?.hex, '#3B82F6', `${variant.nodeId} unread dot information color`);
  }
  const progress = actual.filter(target => familySources.get(target.instance.source.id) === 'AgentHubSessionProgressStep');
  equal(progress.map(target => target.instance.variant.status), ['done', 'active', 'pending', 'pending'], 'four actual progress statuses');
  equal(progress.map(target => target.instance.componentProperties['connector#2987:8']?.value), [true, true, true, false], 'last connector explicitly disabled');
  equal(progress.map(target => style(target).layout.height), [32, 32, 32, 20], 'last connector reflows step height');
  const dividers = walk(filled).filter(target => target.instance?.source?.id === '2019:118');
  equal(dividers.length, 4, 'four actual common Divider references including hidden last');
  for (const divider of dividers) equal([style(divider).layout.width, style(divider).layout.height], [17, 4], `${divider.nodeId} Divider frame includes horizontal padding`);
  equal(style(node('2987:22117')).visual.border.width, 4, 'active circle four pixel inside ring');
  equal(style(node('2987:22117')).visual.border.align, 'INSIDE', 'active circle ring alignment');
  equal(style(node('2987:22117')).visual.border.paints[0]?.hex, '#CCE0FF', 'active circle pale ring');
  equal(style(node('2987:22117')).visual.fills[0]?.hex, '#3B82F6', 'active circle fill');
  equal(style(node('2987:22109')).visual.border.width, 0.875, 'done direct check stroke is not Checkbox or native16 check');
  equal(style(node('2987:22126')).visual.fills[0]?.hex, '#EEEEEE', 'pending circle fill');
  equal(style(node('2987:22127')).text.fontSize, 12, 'pending separate index font');
  equal(style(node('2987:22127')).visual.fills[0]?.hex, '#8F8F8F', 'pending index color');

  const ghost = buttons.variants.find(variant => variant.nodeId === '2427:25108');
  const actualButtons = walk(filled).concat(walk(empty)).filter(target => target.instance?.source?.id === ghost.nodeId);
  equal(actualButtons.length, 13, 'thirteen actual ghost24 sources including hidden slots');
  for (const target of actualButtons) {
    const box = style(target), resized = target.nodeId === '2975:69422';
    equal(target.instance.variant, ghost.variant, `${target.nodeId} exact ghost24 variant`);
    equal([box.layout.width, box.layout.height], resized ? [16, 16] : [24, 24], `${target.nodeId} actual control frame override`);
    equal(box.visual.radius, ghost.visual.radius, `${target.nodeId} button radius`);
    equal(box.visual.fills, [], `${target.nodeId} ghost default transparent`);
    const glyph = target.children.find(child => child.type === 'INSTANCE');
    equal([style(glyph).layout.width, style(glyph).layout.height], [16, 16], `${target.nodeId} glyph stays16 after control resizing`);
    equal(glyph.position, resized ? { x: 0, y: 0 } : { x: 4, y: 4 }, `${target.nodeId} actual glyph position`);
  }
  for (const header of actual.filter(target => familySources.get(target.instance.source.id) === 'AgentHubSessionSectionHeader')) {
    const isEmpty = ['2975:68061', '2988:22821'].includes(header.nodeId);
    if (isEmpty) {
      equal(header.instance.componentProperties['toggle#2986:21']?.value, false, `${header.nodeId} empty toggle hidden`);
      equal(header.instance.componentProperties['count#2986:15']?.value, false, `${header.nodeId} empty count hidden`);
      equal(header.instance.componentProperties['action#2986:24']?.value, true, `${header.nodeId} empty plus remains available`);
    }
  }
  equal(walk(empty).filter(target => target.name === 'empty-text').length, 2, 'two actual empty descriptions');

  equal(assetManifest.assets.length, 17, 'seventeen byte-distinct supplied glyph exports');
  for (const asset of assetManifest.assets) {
    const start = issues.length, target = node(asset.sourceNodeId), bytes = fs.readFileSync(path.join(designRoot, asset.path));
    const svg = bytes.toString('utf8');
    equal(asset.method, 'figma-supplied-original-asset', `${asset.path} exact supplied export`);
    equal(bytes.length, asset.bytes, `${asset.path} bytes`);
    equal(createHash('sha256').update(bytes).digest('hex'), asset.sha256, `${asset.path} SHA256`);
    equal(target.type, asset.sourceKind, `${asset.path} actual export source kind`);
    if (asset.sourceKind === 'INSTANCE') {
      equal(target.instance?.source?.id, asset.actualSourceNodeId, `${asset.path} actual component identity`);
      equal([target.instance?.source?.width, target.instance?.source?.height], [asset.sourceWidth, asset.sourceHeight], `${asset.path} native source dimensions`);
    }
    equal([style(target).layout.width, style(target).layout.height], [asset.displayWidth, asset.displayHeight], `${asset.path} actual display dimensions`);
    equal(Number(/\bwidth="([\d.]+)"/.exec(svg)?.[1]), asset.width, `${asset.path} native SVG width`);
    equal(Number(/\bheight="([\d.]+)"/.exec(svg)?.[1]), asset.height, `${asset.path} native SVG height`);
    const viewBox = /\bviewBox="([^"]+)"/.exec(svg)?.[1].split(/\s+/).map(Number);
    equal(viewBox, [0, 0, asset.width, asset.height], `${asset.path} native viewBox`);
    const colors = [...new Set([...svg.matchAll(/(?:fill|stroke)="(#[0-9a-f]{6}|white|black)"/gi)].map(match => match[1].startsWith('#') ? match[1].toUpperCase() : match[1].toLowerCase()))].sort();
    equal(colors, [...asset.colors].sort(), `${asset.path} exact export paints`);
    const strokes = [...new Set((svg.match(/<[^!?][^>]*>/g) ?? []).filter(tag => /\bstroke="(?!none)/.test(tag))
      .map(tag => Number(/\bstroke-width="([\d.]+)"/.exec(tag)?.[1] ?? 1)))].sort((a, b) => a - b);
    equal(strokes, [...asset.strokeWidths].sort((a, b) => a - b), `${asset.path} exact export stroke widths`);
    check(!/<script\b|<foreignObject\b|(?:href|src)=["'](?:https?:|\/\/|data:)|\bon[a-z]+\s*=/i.test(svg), `${asset.path}: unexpected executable or remote SVG content`);
    if (asset.role === 'progress-pending-circle-20') check(!/<text\b/.test(svg), 'pending circle asset must not duplicate the separate index');
    assets.push({ role: asset.role, path: asset.path, status: status(start) });
  }
  equal(variables.variables.length, 43, 'variable alias closure count');
  equal(variables.collections.length, 3, 'variable collection count');
  return { schemaVersion: 1, solution: 'agent-hub', scope: 'Six Session source roots, nineteen variants and actual filled/empty compositions',
    runtimeVerified: false, allStatesVerified: false, panels, statePalettes, compositions, assets,
    limits: ['Filled and empty Light snapshots are not a loading/error/disabled/dark/mobile or runtime API state machine',
      'Panel root property definitions are unavailable; separately collected child property contracts remain valid',
      'Selected history means viewed run, unread dot is independent, and progress status is supplied product data',
      'Done/active/pending indicators are direct shapes and assets rather than Checkbox/Menu/Tree semantics',
      'History ghost24 source has an explicit16px control override while its glyph remains16; source and display dimensions differ',
      'Section expansion/actions, output/context interactions, live announcements, focus and source/export adoption require product verification'], issues };
}
