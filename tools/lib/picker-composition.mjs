import { createHash } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

const walk = node => [node, ...(node.children ?? []).flatMap(walk)];
const paints = rows => rows.map(({ hex, opacity, token }) => ({ hex, opacity, token }));
const fields = (object, names) => Object.fromEntries(names.map(name => [name, object[name]]));
const layoutFields = ['height', 'padding', 'gap', 'layoutMode', 'layoutSizingVertical',
  'primaryAxisAlignItems', 'counterAxisAlignItems', 'clipsContent', 'strokesIncludedInLayout'];

export function inspectPickerComposition(designRoot) {
  const read = name => JSON.parse(fs.readFileSync(path.join(designRoot, 'references', name), 'utf8'));
  const picker = read('picker.figma.json'), search = read('search.figma.json');
  const variables = read('picker.variables.figma.json');
  const elevation = read('elevation.figma.json'), iconButton = read('icon-button.figma.json');
  const assetManifest = read('picker.assets.json');
  const mainManifest = JSON.parse(fs.readFileSync(path.join(designRoot, 'asset-manifest.json'), 'utf8'));
  const issues = [], items = [], customRows = [], navigationRows = [], footers = [], shells = [], buttons = [], assets = [];
  const equal = (actual, expected, label) => {
    const same = typeof actual === 'number' && typeof expected === 'number'
      ? Math.abs(actual - expected) < 0.0001 : JSON.stringify(actual) === JSON.stringify(expected);
    if (!same) issues.push(`${label}: ${JSON.stringify(actual)} != ${JSON.stringify(expected)}`);
  };
  const check = (condition, label) => { if (!condition) issues.push(label); };
  const all = picker.roots.flatMap(root => walk(root.tree));
  const byId = new Map(all.map(node => [node.nodeId, node]));
  const node = id => {
    const found = byId.get(id);
    if (!found) throw new Error(`Missing measured Picker node ${id}`);
    return found;
  };
  const style = target => picker.styles[target.styleRef];
  const status = start => issues.length === start ? 'match' : 'mismatch';
  function resolveVariable(id, modes, seen = new Set()) {
    if (seen.has(id)) throw new Error(`Picker variable alias cycle ${id}`);
    seen.add(id);
    const variable = variables.variables.find(value => value.id === id);
    if (!variable) throw new Error(`Missing Picker variable ${id}`);
    const collection = variables.collections.find(value => value.id === variable.variableCollectionId);
    if (!collection) throw new Error(`Missing Picker collection ${variable.variableCollectionId}`);
    const mode = modes[collection.id] ?? collection.defaultModeId;
    const value = variable.valuesByMode[mode];
    if (value === undefined) throw new Error(`Missing Picker variable mode ${mode} for ${id}`);
    return value?.type === 'VARIABLE_ALIAS' ? resolveVariable(value.id, modes, seen) : value;
  }
  for (const target of all) {
    for (const paint of [...style(target).visual.fills, ...style(target).visual.border.paints]) {
      if (!paint.token) continue;
      const value = resolveVariable(paint.token.id, target.resolvedVariableModes);
      const variable = variables.variables.find(candidate => candidate.id === paint.token.id);
      equal(paint.token.name, variable.name, `${target.nodeId} semantic token identity`);
      if (value && ['r', 'g', 'b'].every(channel => typeof value[channel] === 'number')) {
        const hex = `#${['r', 'g', 'b'].map(channel => Math.round(value[channel] * 255).toString(16).padStart(2, '0')).join('').toUpperCase()}`;
        equal(paint.hex, hex, `${target.nodeId} resolved paint`);
      }
    }
  }
  equal(picker.implementation, { status: 'unmapped', source: null, export: null }, 'consumer implementation remains unmapped');
  equal(picker.roots.length, 4, 'measured root count');
  const itemSet = picker.roots.find(root => root.role === 'item-variant-set');
  equal(itemSet.propertyDefinitions['show-description#2627:22'], { type: 'BOOLEAN', defaultValue: false }, 'description default');
  equal(itemSet.tree.children.map(child => child.variant), [
    { kind: 'agent', state: 'enabled' }, { kind: 'agent', state: 'hovered' },
    { kind: 'chat', state: 'enabled' }, { kind: 'chat', state: 'hovered' },
  ], 'four supplied item variants');
  for (const variant of itemSet.tree.children) {
    equal(style(variant).layout.height, 36, `${variant.nodeId} item height`);
    equal(style(variant).visual.radius, 6, `${variant.nodeId} item radius`);
    equal(style(variant).visual.border.paints, [], `${variant.nodeId} no rendered border`);
    equal(style(variant).visual.effects, [], `${variant.nodeId} no shadow`);
    equal(style(variant).visual.fills.map(fill => fill.hex), variant.variant.state === 'hovered' ? ['#F8F8F8'] : [], `${variant.nodeId} surface`);
    const description = walk(variant).find(child => child.name === 'description');
    equal(description?.visible, false, `${variant.nodeId} hidden description`);
    equal(description?.componentPropertyReferences?.visible, 'show-description#2627:22', `${variant.nodeId} hidden property binding`);
  }

  // Only the six actual instances establish reuse. Width, horizontal FILL and bound text are instance overrides.
  function compareItemTree(actual, source, properties, widthDelta, isRoot = false) {
    const label = `${actual.nodeId} against ${source.nodeId}`;
    equal(actual.type, isRoot ? 'INSTANCE' : source.type, `${label} kind`);
    equal(actual.visible, source.visible, `${label} visibility`);
    equal(fields(style(actual).layout, layoutFields), fields(style(source).layout, layoutFields), `${label} geometry`);
    equal(style(actual).visual, style(source).visual, `${label} visual`);
    equal(style(actual).bindings, style(source).bindings, `${label} bindings`);
    equal(style(actual).text, style(source).text, `${label} typography`);
    equal(actual.componentPropertyReferences ?? {}, source.componentPropertyReferences ?? {}, `${label} property references`);
    if (actual.type === 'TEXT') {
      const property = source.componentPropertyReferences?.characters;
      equal(actual.text, property && properties[property] ? properties[property].value : source.text, `${label} text override`);
    }
    if (!isRoot) {
      equal(actual.position.y, source.position.y, `${label} vertical position`);
      const trailing = ['meta', 'model-selector'].includes(source.name);
      equal(actual.position.x, source.position.x + (trailing ? widthDelta : 0), `${label} horizontal position`);
    }
    const expected = (source.children ?? []).filter(child => child.visible);
    const visible = (actual.children ?? []).filter(child => child.visible);
    equal(visible.length, expected.length, `${label} visible child count`);
    for (const child of expected) {
      const match = visible.find(candidate => candidate.nodeId.endsWith(`;${child.nodeId.replace(/^I/, '')}`));
      if (match) compareItemTree(match, child, properties, widthDelta);
      else issues.push(`${label}: missing source child ${child.nodeId}`);
    }
  }
  const agent = node('3016:104794'), project = node('2978:58104');
  const actualItems = walk(agent).filter(child => child.instance?.source?.id === '2627:61936' || child.instance?.source?.id === '2627:61960');
  equal(actualItems.length, 6, 'six actual PickerItem instances');
  for (const actual of actualItems) {
    const start = issues.length, source = node(actual.instance.source.id);
    equal(actual.instance.variant, source.variant, `${actual.nodeId} source variant`);
    equal(style(actual).layout.layoutSizingHorizontal, 'FILL', `${actual.nodeId} width adapts to recipe`);
    compareItemTree(actual, source, actual.instance.componentProperties, style(actual).layout.width - style(source).layout.width, true);
    items.push({ nodeId: actual.nodeId, sourceNodeId: source.nodeId, kind: source.variant.kind, status: status(start) });
  }
  for (const [id, chipSource] of [['3016:104807', '3016:102466'], ['3016:104813', '3016:102466'],
    ['3016:104819', '3016:102466'], ['3016:104825', '3016:102465']]) {
    const start = issues.length, row = node(id), box = style(row);
    equal(row.type, 'FRAME', `${id} custom row is a FRAME`);
    equal(row.instance, undefined, `${id} not a PickerItem instance`);
    equal(box.layout.height, 36, `${id} custom row height`);
    equal(box.layout.padding, { left: 8, right: 8, top: 6, bottom: 6 }, `${id} row padding`);
    equal(box.visual.radius, 8, `${id} explicit radius8 override`);
    equal(box.visual.border.paints, [], `${id} no rendered border`);
    equal(box.visual.fills.map(fill => fill.hex), id === '3016:104807' ? ['#F8F8F8'] : [], `${id} observed surface`);
    const chip = walk(row).find(child => child.instance);
    equal(chip?.instance.source.id, chipSource, `${id} exact AgentTypeChip source`);
    equal(walk(row).find(child => child.name === 'description')?.visible, false, `${id} description remains hidden`);
    customRows.push({ nodeId: id, type: row.type, radius: box.visual.radius, chipSourceNodeId: chipSource, status: status(start) });
  }

  const searchStart = issues.length, actualSearch = node('3079:114040');
  const originalSearch = search.variants.find(variant => variant.nodeId === '3142:116457');
  equal(actualSearch.instance?.source?.id, originalSearch?.nodeId, 'Search exact source');
  equal(actualSearch.instance?.variant, { size: '32', state: 'focused', filtered: 'false' }, 'Search exact variant');
  equal(actualSearch.instance?.componentProperties?.['filter#3124:0']?.value, true, 'Search explicitly enables filter Boolean');
  const originalSearchStyle = search.styles[originalSearch.styleRef], searchBox = style(actualSearch);
  for (const key of ['width', 'height', 'padding', 'gap', 'layoutMode', 'primaryAxisAlignItems', 'counterAxisAlignItems']) {
    equal(searchBox.layout[key], originalSearchStyle.layout[key], `Search ${key}`);
  }
  for (const key of ['radius', 'opacity', 'effects']) equal(searchBox.visual[key], originalSearchStyle.visual[key], `Search ${key}`);
  equal(paints(searchBox.visual.fills), paints(originalSearchStyle.visual.fills), 'Search active surface');
  equal(paints(searchBox.visual.border.paints), paints(originalSearchStyle.visual.border.paints), 'Search active border');
  equal(searchBox.visual.border.width, originalSearchStyle.visual.border.width, 'Search border width');
  equal(searchBox.layout.strokesIncludedInLayout, false, 'Search inside stroke does not move content');
  const filter = walk(actualSearch).find(child => child.name === 'action/filter');
  equal(filter?.visible, true, 'Search filter actual visibility override');
  equal(filter?.componentPropertyReferences?.visible, 'filter#3124:0', 'Search filter visibility binding');
  equal(style(filter).visual.fills[0]?.hex, '#000000', 'unfiltered visible filter surface');
  equal(style(filter).visual.fills[0]?.opacity, 0.05, 'unfiltered visible filter surface opacity');
  const filterVectors = walk(filter).filter(child => child.type === 'VECTOR');
  equal(filterVectors.length, 4, 'filter four native vectors');
  for (const vector of filterVectors) {
    equal(style(vector).visual.border.width, 1, `${vector.nodeId} native16 stroke`);
    equal(style(vector).visual.border.paints[0]?.hex, '#757575', `${vector.nodeId} observed unfiltered glyph color`);
  }
  const searchResult = { nodeId: actualSearch.nodeId, sourceNodeId: originalSearch.nodeId,
    variant: actualSearch.instance.variant, filterVisibleOverride: true, status: status(searchStart) };

  const menus = walk(project).filter(child => child.name === 'menu-item');
  equal(menus.length, 14, 'fourteen distinct navigation rows');
  equal(menus.filter(child => child.type === 'INSTANCE').length, 11, 'eleven actual navigation instances');
  for (const row of menus) {
    const start = issues.length, box = style(row);
    if (row.type === 'INSTANCE') check(['2611:62440', '2611:64577'].includes(row.instance?.source?.id), `${row.nodeId}: navigation source must not be PickerItem36`);
    else equal(row.type, 'FRAME', `${row.nodeId} direct navigation FRAME`);
    equal(box.layout.height, 32, `${row.nodeId} navigation height`);
    equal(box.layout.padding, { left: 8, right: 8, top: 6, bottom: 6 }, `${row.nodeId} navigation padding`);
    equal(box.layout.gap, 12, `${row.nodeId} navigation gap`);
    equal(box.visual.radius, 6, `${row.nodeId} navigation radius`);
    equal(box.visual.fills, [], `${row.nodeId} actual transparent row override`);
    equal(box.visual.border.paints, [], `${row.nodeId} no row border`);
    const label = walk(row).find(child => child.type === 'TEXT');
    equal(style(label).text.fontSize, 14, `${row.nodeId} label font size`);
    equal(style(label).text.fontWeight, 400, `${row.nodeId} label weight`);
    equal(style(label).text.lineHeight, { unit: 'PIXELS', value: 20 }, `${row.nodeId} label line height`);
    navigationRows.push({ nodeId: row.nodeId, type: row.type, sourceNodeId: row.instance?.source?.id ?? null, height: box.layout.height, status: status(start) });
  }
  for (const id of ['2978:58131', '2978:58150']) {
    const target = node(id), box = style(target), gradient = box.visual.fills[0];
    equal(box.visual.opacity, 0, `${id} gradient branch remains opacity-zero`);
    equal([box.layout.width, box.layout.height], [36, 20], `${id} recorded fade box`);
    equal(box.layout.layoutPositioning, 'ABSOLUTE', `${id} recorded absolute fade`);
    equal(gradient?.type, 'GRADIENT_LINEAR', `${id} gradient paint`);
    equal(gradient?.gradientStops?.map(stop => stop.hex), ['#F8F8F8', '#F8F8F8', '#F8F8F8'], `${id} gradient colors`);
    equal(gradient?.gradientStops?.map(stop => stop.opacity), [1, 0.7400000095367432, 0], `${id} gradient alpha stops`);
    equal(gradient?.gradientStops?.[1]?.position, 0.2589285671710968, `${id} intermediate stop`);
    equal(gradient?.gradientTransform, [[-4.307692527770996, 2.637700831814886e-16, 1],
      [-3.093594716334358e-14, -0.5494505167007446, 0.7747251391410828]], `${id} recorded gradient transform`);
  }

  const originalFooter = node('2627:62004');
  for (const [root, id, linkPresent, y] of [[agent, '3016:104832', true, 416], [project, '2978:58170', false, 497]]) {
    const start = issues.length, footer = node(id), box = style(footer), original = style(originalFooter);
    equal(footer.instance?.source?.id, originalFooter.nodeId, `${id} exact footer source`);
    equal(fields(box.layout, layoutFields), fields(original.layout, layoutFields), `${id} footer geometry`);
    equal(box.visual, original.visual, `${id} footer per-edge border and paint`);
    equal([box.visual.border.top, box.visual.border.bottom, box.visual.border.left, box.visual.border.right], [1, 0, 0, 0], `${id} only top edge`);
    equal(box.visual.border.width, null, `${id} mixed edge width is not an all-edge border`);
    equal(box.layout.height, 39, `${id} footer natural height`);
    equal(box.layout.layoutPositioning, 'ABSOLUTE', `${id} bottom absolute footer`);
    equal(footer.position, { x: 0, y }, `${id} footer measured position`);
    equal(footer.position.y + box.layout.height, style(root).layout.height, `${id} footer reaches shell bottom`);
    const links = walk(footer).filter(child => child.name === 'footer-link');
    equal(links.length, linkPresent ? 1 : 0, `${id} discovery branch presence`);
    if (linkPresent) {
      equal(links[0].type, 'FRAME', `${id} discovery is not a Link instance`);
      equal(walk(links[0]).find(child => child.type === 'TEXT')?.text, '에이전트 찾기', `${id} discovery label`);
    }
    footers.push({ nodeId: id, sourceNodeId: originalFooter.nodeId, height: box.layout.height,
      position: footer.position, discoveryBranchPresent: linkPresent, status: status(start) });
  }
  const mid = elevation.effectStyles.find(effect => effect.name === 'Mid');
  for (const [root, width, height] of [[agent, 776, 455], [project, 532, 536]]) {
    const start = issues.length, box = style(root);
    equal(root.type, 'FRAME', `${root.nodeId} recipe is a FRAME`);
    equal([box.layout.width, box.layout.height], [width, height], `${root.nodeId} fixed sample size`);
    equal(box.layout.clipsContent, true, `${root.nodeId} recorded clipping`);
    equal(box.layout.overflowDirection, 'NONE', `${root.nodeId} no measured runtime scrolling`);
    equal(box.visual.radius, 24, `${root.nodeId} shell radius`);
    equal(root.effectStyleId, mid?.id, `${root.nodeId} exact Mid effect style`);
    equal(box.visual.effects, mid?.effects, `${root.nodeId} effects match existing foundation`);
    equal(box.visual.opacity, 1, `${root.nodeId} shell opacity is not Mid sample opacity`);
    shells.push({ nodeId: root.nodeId, width, height, footerReservationRequired: 39, observedOverflowDirection: 'NONE', status: status(start) });
  }
  const ghost = iconButton.variants.find(variant => variant.nodeId === '2909:49139');
  const actualButtons = walk(project).filter(child => child.instance?.source?.id === ghost?.nodeId);
  equal(actualButtons.length, 4, 'four actual ghost20 button instances');
  for (const target of actualButtons) {
    const start = issues.length, box = style(target);
    equal(target.instance.variant, ghost.variant, `${target.nodeId} ghost20 default variant`);
    for (const key of ['width', 'height', 'padding', 'layoutMode']) equal(box.layout[key], ghost.layout[key], `${target.nodeId} ${key}`);
    equal(box.visual.radius, ghost.visual.radius, `${target.nodeId} radius`);
    equal(paints(box.visual.fills), paints(ghost.visual.fills), `${target.nodeId} default surface`);
    equal(paints(box.visual.border.paints), paints(ghost.visual.border.paints), `${target.nodeId} default border`);
    const glyph = target.children.find(child => child.type === 'INSTANCE');
    equal(glyph?.instance?.source?.id, '2751:16967', `${target.nodeId} actual more glyph swap`);
    buttons.push({ nodeId: target.nodeId, sourceNodeId: ghost.nodeId, glyphSourceNodeId: glyph?.instance?.source?.id, status: status(start) });
  }

  equal(assetManifest.assets.length, 12, 'five reused plus seven supplied assets');
  for (const asset of assetManifest.assets) {
    const start = issues.length, bytes = fs.readFileSync(path.join(designRoot, asset.path));
    equal(bytes.length, asset.bytes, `${asset.path} bytes`);
    equal(createHash('sha256').update(bytes).digest('hex'), asset.sha256, `${asset.path} SHA256`);
    if (asset.method === 'reuse-existing-exact-source') {
      const existing = mainManifest.icons.find(icon => icon.sources.some(source => asset.sourceNodeIds.includes(source.nodeId)));
      check(Boolean(existing), `${asset.path}: missing exact source in main manifest`);
      if (existing) { equal(asset.path, existing.path, `${asset.role} existing path`); equal(asset.sha256, existing.sha256, `${asset.role} existing hash`); }
      for (const id of asset.instanceNodeIds) {
        const actual = node(id);
        check(asset.sourceNodeIds.includes(actual.instance?.source?.id), `${id}: asset source identity mismatch`);
        equal([style(actual).layout.width, style(actual).layout.height], [asset.width, asset.height], `${id} native asset frame`);
      }
      if (['existing-filter', 'existing-more'].includes(asset.role)) {
        const exactPaint = assetManifest.assets.find(candidate => candidate.path === asset.effectiveAssetPath);
        check(Boolean(exactPaint), `${asset.path}: missing effective instance-paint asset`);
        if (exactPaint) {
          check(asset.sourceNodeIds.includes(exactPaint.actualSourceNodeId), `${asset.role}: effective asset keeps exact main-component identity`);
          equal(exactPaint.color, '#757575', `${asset.role} actual subtler paint`);
          for (const id of asset.instanceNodeIds) for (const glyph of walk(node(id)).filter(child => child.type === 'VECTOR')) {
            equal(style(glyph).visual.border.width, exactPaint.strokeWidth, `${glyph.nodeId} effective native stroke`);
            equal(style(glyph).visual.border.paints[0]?.hex, exactPaint.color, `${glyph.nodeId} effective instance paint`);
          }
        }
      }
    } else {
      equal(asset.method, 'figma-supplied-original-asset', `${asset.path} supplied original method`);
      const actual = node(asset.sourceNodeId);
      equal(actual.type, asset.sourceKind, `${asset.path} FRAME/image source is not a component identity`);
      equal([style(actual).layout.width, style(actual).layout.height], [asset.displayWidth, asset.displayHeight], `${asset.path} displayed frame`);
      if (asset.sourceKind === 'INSTANCE') equal(actual.instance?.source?.id, asset.actualSourceNodeId, `${asset.path} exact component source of exported instance`);
    }
    if (asset.format === 'png') {
      equal(bytes.subarray(0, 8).toString('hex'), '89504e470d0a1a0a', `${asset.path} PNG signature`);
      if (bytes.length >= 24) equal([bytes.readUInt32BE(16), bytes.readUInt32BE(20)], [asset.width, asset.height], `${asset.path} native PNG dimensions`);
      equal(createHash('sha1').update(bytes).digest('hex'), asset.sha1, `${asset.path} original PNG SHA1`);
      equal(asset.sha1, asset.figmaImageHash, `${asset.path} PNG matches Figma IMAGE hash`);
      equal(style(node(asset.sourceNodeId)).visual.fills[0]?.imageHash, '0b5fbd3f1bca7be7331d9daab6d31284a768bfc4', 'model sample IMAGE hash');
    } else {
      const svg = bytes.toString('utf8');
      check(svg.includes(`width="${asset.width}"`) && svg.includes(`height="${asset.height}"`) &&
        svg.includes(`viewBox="0 0 ${asset.width} ${asset.height}"`), `${asset.path}: native SVG dimensions mismatch`);
      check(/<path\b/.test(svg), `${asset.path}: SVG must contain actual glyph paths`);
      check(!/<script\b|<foreignObject\b|(?:href|src)=["'](?:https?:|\/\/|data:)|\bon[a-z]+\s*=/i.test(svg), `${asset.path}: unexpected executable or remote SVG content`);
      if (asset.color) {
        const colors = [...svg.matchAll(/(?:fill|stroke)="(#[0-9a-f]{6})"/gi)].map(match => match[1].toUpperCase());
        check(colors.length > 0 && colors.every(color => color === asset.color), `${asset.path}: actual instance SVG paint mismatch`);
      }
    }
    assets.push({ role: asset.role, path: asset.path, method: asset.method, width: asset.width, height: asset.height, status: status(start) });
  }
  equal(assets.filter(asset => asset.method === 'figma-supplied-original-asset').length, 7, 'seven supplied image/glyph/instance-paint assets');
  return { schemaVersion: 1, solution: 'agent-hub', scope: 'Picker standalone contracts, two static compositions, actual source reuse and local assets',
    runtimeVerified: false, allStatesVerified: false, items, customRows, search: searchResult, navigationRows, footers, shells, buttons, assets,
    limits: ['Four item variants plus one footer and two FRAME recipes; no complete Picker state/API set is supplied',
      'Width and bound label overrides are allowed; workflow/runtime radius8 frames and navigation32 rows are not PickerItem instances',
      'Search filtered=false explicitly enables the filter Boolean; opacity-zero gradients are retained evidence rather than visible controls',
      'Footer links differ by actual subtree presence; fixed clipped samples do not establish working scrolling or keyboard behavior',
      'Modal/listbox semantics, model/filter/more actions, selection callbacks, focus, disabled/loading/error/dark/mobile remain product verification work'], issues };
}
