import { createHash } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

const walk = node => [node, ...(node.children ?? []).flatMap(walk)];
const without = (object, names) => Object.fromEntries(Object.entries(object).filter(([key]) => !names.includes(key)));
const slots = { icon: 'icon#3135:0', value: 'value#3135:9', check: 'check#3135:18',
  chevron: 'chevron#3135:27', 'section-header': 'section header#3146:0', divider: 'divider#3146:18' };

export function inspectMenuComposition(designRoot) {
  const read = name => JSON.parse(fs.readFileSync(path.join(designRoot, 'references', name), 'utf8'));
  const menu = read('menu.figma.json'), variables = read('menu.variables.figma.json');
  const assetManifest = read('menu.assets.json'), elevation = read('elevation.figma.json');
  const mainManifest = JSON.parse(fs.readFileSync(path.join(designRoot, 'asset-manifest.json'), 'utf8'));
  const issues = [], variants = [], rows = [], assets = [];
  const equal = (actual, expected, label) => {
    const same = typeof actual === 'number' && typeof expected === 'number'
      ? Math.abs(actual - expected) < 0.0001 : JSON.stringify(actual) === JSON.stringify(expected);
    if (!same) issues.push(`${label}: ${JSON.stringify(actual)} != ${JSON.stringify(expected)}`);
  };
  const check = (condition, label) => { if (!condition) issues.push(label); };
  const status = start => issues.length === start ? 'match' : 'mismatch';
  const all = menu.roots.flatMap(root => walk(root.tree));
  const byId = new Map(all.map(node => [node.nodeId, node]));
  const node = id => {
    const found = byId.get(id);
    if (!found) throw new Error(`Missing measured Menu node ${id}`);
    return found;
  };
  const style = target => menu.styles[target.styleRef];
  const itemSet = menu.roots.find(root => root.tree.nodeId === '3135:16031');
  const panelRoot = menu.roots.find(root => root.tree.nodeId === '3135:16036');
  const panel = panelRoot.tree, box = style(panel);
  function resolveVariable(id, modes, seen = new Set()) {
    if (seen.has(id)) throw new Error(`Menu variable alias cycle ${id}`);
    seen.add(id);
    const variable = variables.variables.find(value => value.id === id);
    if (!variable) throw new Error(`Missing Menu variable ${id}`);
    const collection = variables.collections.find(value => value.id === variable.variableCollectionId);
    if (!collection) throw new Error(`Missing Menu collection ${variable.variableCollectionId}`);
    const mode = modes[collection.id] ?? collection.defaultModeId;
    const value = variable.valuesByMode[mode];
    if (value === undefined) throw new Error(`Missing Menu mode ${mode} for ${id}`);
    return value?.type === 'VARIABLE_ALIAS' ? resolveVariable(value.id, modes, seen) : value;
  }
  for (const target of all) for (const paint of [...style(target).visual.fills, ...style(target).visual.border.paints]) {
    if (!paint.token) continue;
    const variable = variables.variables.find(candidate => candidate.id === paint.token.id);
    const value = resolveVariable(paint.token.id, target.resolvedVariableModes);
    equal(paint.token.name, variable.name, `${target.nodeId} paint token identity`);
    if (value && ['r', 'g', 'b'].every(channel => typeof value[channel] === 'number')) {
      const hex = `#${['r', 'g', 'b'].map(channel => Math.round(value[channel] * 255).toString(16).padStart(2, '0')).join('').toUpperCase()}`;
      equal(paint.hex, hex, `${target.nodeId} resolved semantic paint`);
    }
  }
  equal(menu.implementation, { status: 'unmapped', source: null, export: null }, 'consumer implementation remains unmapped');
  equal(itemSet.tree.children.length, 8, 'eight supplied item variants');
  equal(itemSet.propertyDefinitions.type.variantOptions, ['default', 'destructive'], 'item types');
  equal(itemSet.propertyDefinitions.state.variantOptions, ['enabled', 'hovered', 'pressed', 'disabled'], 'supplied item states');
  for (const property of Object.values(slots)) equal(itemSet.propertyDefinitions[property], { type: 'BOOLEAN', defaultValue: false }, `${property} default hidden`);
  equal(itemSet.propertyDefinitions['icon-swap#3135:36'].defaultValue, '3018:24803', 'default edit glyph swap');

  for (const item of itemSet.tree.children) {
    const start = issues.length, state = item.variant.state, destructive = item.variant.type === 'destructive';
    const content = item.children.find(child => child.name === 'content');
    const surface = style(content), label = content.children.find(child => child.name === 'label');
    const color = state === 'disabled' ? '#AAAAAA' : destructive ? '#D00A0A' : '#1C1C1C';
    equal([style(item).layout.width, style(item).layout.height], [160, 28], `${item.nodeId} item sample frame`);
    equal(style(item).layout.layoutSizingVertical, 'HUG', `${item.nodeId} item natural height`);
    equal(surface.layout.padding, { left: 16, right: 12, top: 4, bottom: 4 }, `${item.nodeId} content padding`);
    equal(surface.layout.gap, 8, `${item.nodeId} content gap`);
    equal(surface.visual.radius, 0, `${item.nodeId} square content`);
    equal(surface.visual.border.paints, [], `${item.nodeId} no content border`);
    equal(surface.visual.effects, [], `${item.nodeId} no content shadow`);
    equal(surface.visual.fills.map(fill => fill.hex), state === 'hovered' ? ['#F8F8F8'] : state === 'pressed' ? ['#F4F4F4'] : [], `${item.nodeId} content state background`);
    equal(style(label).text.fontSize, 14, `${item.nodeId} label size`);
    equal(style(label).text.fontWeight, 400, `${item.nodeId} label weight`);
    equal(style(label).text.lineHeight, { unit: 'PIXELS', value: 20 }, `${item.nodeId} label line height`);
    equal(style(label).visual.fills[0]?.hex, color, `${item.nodeId} label state color`);
    for (const [name, property] of Object.entries(slots)) {
      const target = walk(item).find(child => child.name === name);
      equal(target?.visible, false, `${item.nodeId} ${name} hidden sample`);
      equal(target?.componentPropertyReferences?.visible, property, `${item.nodeId} ${name} visibility property`);
    }
    const header = item.children.find(child => child.name === 'section-header');
    const headerLabel = header.children.find(child => child.type === 'TEXT');
    equal(style(header).layout.height, 28, `${item.nodeId} hidden header height`);
    equal(style(header).layout.padding, { left: 16, right: 12, top: 8, bottom: 4 }, `${item.nodeId} hidden header padding`);
    equal(style(headerLabel).text.fontWeight, 600, `${item.nodeId} hidden header weight`);
    equal(style(headerLabel).visual.fills[0]?.hex, '#1C1C1C', `${item.nodeId} header does not inherit disabled/destructive color`);
    const divider = item.children.find(child => child.name === 'divider');
    equal(style(divider).layout.height, 9, `${item.nodeId} hidden divider includes padding`);
    equal(style(divider).layout.padding, { left: 0, right: 0, top: 4, bottom: 4 }, `${item.nodeId} divider padding`);
    equal(style(divider.children[0]).layout.height, 1, `${item.nodeId} divider line height`);
    equal(style(divider.children[0]).visual.fills[0]?.hex, '#DDDDDD', `${item.nodeId} divider line color`);
    for (const [name, sourceId] of [['icon', '3018:24803'], ['check', '3074:98929'], ['chevron', '2842:38917']]) {
      const glyph = content.children.find(child => child.name === name);
      equal(glyph?.instance?.source?.id, sourceId, `${item.nodeId} ${name} exact source`);
      equal([style(glyph).layout.width, style(glyph).layout.height], [16, 16], `${item.nodeId} ${name} native frame`);
      for (const vector of walk(glyph).filter(child => child.type === 'VECTOR')) {
        const border = style(vector).visual.border;
        equal(border.width, 1, `${vector.nodeId} glyph stroke is not wrapper stroke`);
        equal(border.cap, 'ROUND', `${vector.nodeId} cap`);
        equal(border.join, 'ROUND', `${vector.nodeId} join`);
        equal(border.paints[0]?.hex, name === 'chevron' && state !== 'disabled' ? '#757575' : color, `${vector.nodeId} state paint`);
      }
    }
    const value = content.children.find(child => child.name === 'value');
    equal(style(value).visual.fills[0]?.hex, state === 'disabled' ? '#AAAAAA' : '#757575', `${item.nodeId} value retains separate palette`);
    variants.push({ nodeId: item.nodeId, variant: item.variant, contentBackground: surface.visual.fills[0]?.hex ?? null,
      labelColor: color, hiddenSlots: Object.keys(slots), status: status(start) });
  }

  // Hidden descendants are included. Only FILL widths and the instance's horizontal sizing adapt to the panel.
  function compareTree(actual, source, inheritedDelta, properties, root = false) {
    const label = `${actual.nodeId} against ${source.nodeId}`, a = style(actual), b = style(source);
    const delta = root || b.layout.layoutSizingHorizontal === 'FILL' ? inheritedDelta : 0;
    equal(actual.type, root ? 'INSTANCE' : source.type, `${label} kind`);
    equal(actual.visible, source.visible, `${label} visibility`);
    equal(a.layout.width, b.layout.width + delta, `${label} adaptive width`);
    equal(without(a.layout, root ? ['width', 'layoutSizingHorizontal'] : ['width']),
      without(b.layout, root ? ['width', 'layoutSizingHorizontal'] : ['width']), `${label} remaining geometry`);
    equal(a.visual, b.visual, `${label} visual`);
    equal(a.bindings, b.bindings, `${label} token bindings`);
    equal(a.text, b.text, `${label} typography`);
    equal(actual.componentPropertyReferences ?? {}, source.componentPropertyReferences ?? {}, `${label} property references`);
    if (!root) {
      equal(actual.position, source.position, `${label} child position`);
      equal(actual.instance, source.instance, `${label} exact hidden source`);
    }
    if (source.text !== undefined) {
      const property = source.componentPropertyReferences?.characters;
      equal(actual.text, properties[property]?.value ?? source.text, `${label} bound text`);
    }
    equal(actual.children?.length ?? 0, source.children?.length ?? 0, `${label} full child count including hidden`);
    for (const child of source.children ?? []) {
      const actualChild = actual.children?.find(candidate => candidate.nodeId.endsWith(`;${child.nodeId.replace(/^I/, '')}`));
      if (actualChild) compareTree(actualChild, child, delta, properties);
      else issues.push(`${label}: missing hidden or visible source child ${child.nodeId}`);
    }
  }
  const actualRows = panel.children.filter(child => child.type === 'INSTANCE');
  equal(actualRows.length, 11, 'eleven actual enabled rows');
  for (const [index, row] of actualRows.entries()) {
    const start = issues.length, source = node('3135:15951');
    equal(row.instance?.source?.id, source.nodeId, `${row.nodeId} enabled default source`);
    equal(row.instance?.variant, { type: 'default', state: 'enabled' }, `${row.nodeId} actual variant`);
    equal(style(row).layout.layoutSizingHorizontal, 'FILL', `${row.nodeId} adaptive instance sizing`);
    equal(row.position, { x: 1, y: 5 + index * 28 }, `${row.nodeId} panel stack position`);
    for (const property of Object.values(slots)) equal(row.instance?.componentProperties?.[property]?.value, false, `${row.nodeId} ${property} actual hidden property`);
    compareTree(row, source, -2, row.instance.componentProperties, true);
    rows.push({ nodeId: row.nodeId, sourceNodeId: source.nodeId, width: style(row).layout.width,
      height: style(row).layout.height, hiddenSlots: Object.keys(slots), status: status(start) });
  }

  const panelStart = issues.length;
  equal(panel.type, 'COMPONENT', 'panel is a single component sample');
  equal(panelRoot.propertyDefinitions, { 'Scroll bar#3200:0': { type: 'BOOLEAN', defaultValue: false } }, 'only panel scrollbar Boolean is provided');
  equal([box.layout.width, box.layout.height], [160, 318], 'panel sample size');
  equal(box.layout.layoutSizingVertical, 'HUG', 'panel natural height');
  equal(box.layout.padding, { left: 0, right: 0, top: 4, bottom: 4 }, 'panel padding');
  equal(box.layout.strokesIncludedInLayout, true, 'panel border reserves layout');
  equal(box.visual.border.width, 1, 'panel border width');
  equal(box.visual.border.paints[0]?.hex, '#DDDDDD', 'panel border color');
  equal(box.visual.fills[0]?.hex, '#FFFFFF', 'panel white surface');
  equal(box.visual.radius, 12, 'panel radius');
  equal(box.bindings.topLeftRadius?.name, 'radius/surface-sm', 'panel semantic radius token');
  equal(resolveVariable(box.bindings.topLeftRadius.id, panel.resolvedVariableModes), box.visual.radius, 'panel resolved semantic radius');
  equal(box.layout.height, actualRows.length * 28 + box.layout.padding.top + box.layout.padding.bottom + 2 * box.visual.border.width, 'panel content-based height');
  equal(box.layout.clipsContent, true, 'panel recorded clipping');
  equal(box.layout.overflowDirection, 'NONE', 'panel has no measured scroll runtime');
  const mid = elevation.effectStyles.find(effect => effect.name === 'Mid');
  equal(panel.effectStyleId, 'S:a15de5d74923403292f59da1f6d689b596ade000,', 'panel actual distinct effect style ID');
  check(panel.effectStyleId !== mid?.id, 'Menu effect identity must not be reported as the existing Mid identity');
  equal(box.visual.effects, mid?.effects, 'panel ordered effects equal existing Mid values');
  const scroll = node('3192:35200');
  equal(scroll.type, 'FRAME', 'scroll drawing is not a Scrollbar instance');
  equal(scroll.visible, false, 'scroll drawing hidden');
  equal(scroll.componentPropertyReferences?.visible, 'Scroll bar#3200:0', 'scroll drawing visibility property');
  equal(style(scroll).layout.layoutPositioning, 'ABSOLUTE', 'hidden scrollbar absolute layout');
  equal([style(scroll).layout.width, style(scroll).layout.height], [11, 318], 'hidden scrollbar drawing size');
  const panelResult = { nodeId: panel.nodeId, width: box.layout.width, height: box.layout.height, radius: box.visual.radius,
    rowCount: actualRows.length, actualEffectStyleId: panel.effectStyleId, effectValuesMatch: mid?.name,
    effectIdentityMatches: false, scrollbarVisible: false, status: status(panelStart) };

  // The manifest identifies both geometry references and exact supplied hidden-state paints.
  equal(assetManifest.assets.length, 11, 'three geometry references and eight supplied state paints');
  for (const asset of assetManifest.assets) {
    const start = issues.length, bytes = fs.readFileSync(path.join(designRoot, asset.path)), svg = bytes.toString('utf8');
    equal(bytes.length, asset.bytes, `${asset.path} bytes`);
    equal(createHash('sha256').update(bytes).digest('hex'), asset.sha256, `${asset.path} SHA256`);
    check(svg.includes('width="16"') && svg.includes('height="16"') && svg.includes('viewBox="0 0 16 16"'), `${asset.path}: native16 SVG dimensions`);
    check(/<path\b/.test(svg), `${asset.path}: SVG must contain actual glyph paths`);
    check(!/<script\b|<foreignObject\b|(?:href|src)=["'](?:https?:|\/\/|data:)|\bon[a-z]+\s*=/i.test(svg), `${asset.path}: unexpected executable or remote SVG content`);
    if (asset.method === 'existing-exact-source-geometry') {
      const sources = asset.sourceNodeIds ?? [asset.sourceNodeId];
      const existing = mainManifest.icons.find(icon => icon.sources.some(source => sources.includes(source.nodeId)));
      check(Boolean(existing), `${asset.path}: exact source missing from main manifest`);
      if (existing) { equal(asset.path, existing.path, `${asset.path} reused path`); equal(asset.sha256, existing.sha256, `${asset.path} reused hash`); }
      equal(asset.instanceNodeIds.length, 19, `${asset.path} eight variants plus eleven menu copies`);
      for (const id of asset.instanceNodeIds) {
        const target = node(id);
        equal(target.visible, false, `${id} existing geometry remains hidden`);
        equal(target.instance?.source?.id, asset.sourceNodeId, `${id} existing geometry source`);
        equal([style(target).layout.width, style(target).layout.height], [16, 16], `${id} native geometry`);
      }
    } else {
      equal(asset.method, 'figma-supplied-original-asset', `${asset.path} original provided method`);
      const target = node(asset.sourceNodeId);
      equal(target.type, asset.sourceKind, `${asset.path} export source kind`);
      equal(target.instance?.source?.id, asset.actualSourceNodeId, `${asset.path} main component identity`);
      equal(target.visible, asset.visibilityInSuppliedSnapshot, `${asset.path} measured optional-slot visibility`);
      equal(asset.visibilityInSuppliedSnapshot, false, `${asset.path} supplied glyph is not a visible default`);
      equal([style(target).layout.width, style(target).layout.height], [asset.displayWidth, asset.displayHeight], `${asset.path} native display frame`);
      const svgColors = [...svg.matchAll(/(?:fill|stroke)="(#[0-9a-f]{6})"/gi)].map(match => match[1].toUpperCase());
      check(svgColors.length > 0 && svgColors.every(color => color === asset.color), `${asset.path}: exact supplied state-paint color mismatch`);
      for (const vector of walk(target).filter(child => child.type === 'VECTOR')) {
        equal(style(vector).visual.border.width, asset.strokeWidth, `${asset.path} actual stroke width`);
        equal(style(vector).visual.border.paints[0]?.hex, asset.color, `${asset.path} actual state paint`);
      }
    }
    assets.push({ path: asset.path, method: asset.method, status: status(start) });
  }
  equal(assetManifest.assets.filter(asset => asset.method === 'figma-supplied-original-asset').length, 8, 'eight original optional-slot state-paint SVGs');
  equal(variables.variables.length, 28, 'variable closure size');
  equal(variables.collections.length, 5, 'variable collection count');
  return { schemaVersion: 1, solution: 'agent-hub', scope: 'Eight MenuItem states, full hidden descendants and eleven actual enabled Menu rows',
    runtimeVerified: false, allStatesVerified: false, variants, rows, panel: panelResult, assets,
    limits: ['Eight Light item variants and one all-optional-slots-off panel only; true slot combinations have not been measured',
      'Hidden state glyph paints and source swaps are evidence rather than visible default controls',
      'Panel shadow values match Mid while its actual EffectStyle identity is distinct',
      'Scrollbar is a hidden absolute FRAME; clipping/NONE overflow does not establish functioning scrolling',
      'Persistent selected, keyboard focus, dark/mobile, trigger/open/close/submenu and consuming command behavior remain unverified'], issues };
}
