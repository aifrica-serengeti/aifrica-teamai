import { createHash } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

const walk = node => [node, ...(node.children ?? []).flatMap(walk)];
const without = (object, names) => Object.fromEntries(Object.entries(object).filter(([key]) => !names.includes(key)));

export function inspectFlyoutComposition(designRoot) {
  const read = name => JSON.parse(fs.readFileSync(path.join(designRoot, 'references', name), 'utf8'));
  const flyout = read('flyout.figma.json'), variables = read('flyout.variables.figma.json');
  const assetManifest = read('flyout.assets.json'), elevation = read('elevation.figma.json');
  const motion = read('flyout.motion.json');
  const mainManifest = JSON.parse(fs.readFileSync(path.join(designRoot, 'asset-manifest.json'), 'utf8'));
  const issues = [], variants = [], rows = [], assets = [];
  const equal = (actual, expected, label) => {
    const same = typeof actual === 'number' && typeof expected === 'number'
      ? Math.abs(actual - expected) < 0.0001 : JSON.stringify(actual) === JSON.stringify(expected);
    if (!same) issues.push(`${label}: ${JSON.stringify(actual)} != ${JSON.stringify(expected)}`);
  };
  const check = (condition, label) => { if (!condition) issues.push(label); };
  const status = start => issues.length === start ? 'match' : 'mismatch';
  const all = flyout.roots.flatMap(root => walk(root.tree));
  const byId = new Map(all.map(node => [node.nodeId, node]));
  const node = id => {
    const found = byId.get(id);
    if (!found) throw new Error(`Missing measured Flyout node ${id}`);
    return found;
  };
  const style = target => flyout.styles[target.styleRef];
  const itemSet = flyout.roots.find(root => root.tree.nodeId === '3005:23146');
  const shellRoot = flyout.roots.find(root => root.tree.nodeId === '3010:23522');
  const shell = shellRoot.tree, shellBox = style(shell), body = node('2975:76708');
  const hiddenPaintAlias = 'VariableID:545055f1a41c27e2881d948e3d415b0605c481de/12469:161';
  function resolveVariable(id, modes, seen = new Set()) {
    if (seen.has(id)) throw new Error(`Flyout variable alias cycle ${id}`);
    seen.add(id);
    const variable = variables.variables.find(value => value.id === id);
    if (!variable) throw new Error(`Missing Flyout variable ${id}`);
    const collection = variables.collections.find(value => value.id === variable.variableCollectionId);
    if (!collection) throw new Error(`Missing Flyout collection ${variable.variableCollectionId}`);
    const mode = modes[collection.id] ?? collection.defaultModeId;
    const value = variable.valuesByMode[mode];
    if (value === undefined) throw new Error(`Missing Flyout variable mode ${mode} for ${id}`);
    return value?.type === 'VARIABLE_ALIAS' ? resolveVariable(value.id, modes, seen) : value;
  }
  for (const target of all) for (const paint of [...style(target).visual.fills, ...style(target).visual.border.paints]) {
    if (!paint.token) continue;
    const variable = variables.variables.find(candidate => candidate.id === paint.token.id);
    const value = resolveVariable(paint.token.id, target.resolvedVariableModes);
    equal(paint.token.name, variable.name, `${target.nodeId} token identity`);
    if (value && ['r', 'g', 'b'].every(channel => typeof value[channel] === 'number')) {
      const hex = `#${['r', 'g', 'b'].map(channel => Math.round(value[channel] * 255).toString(16).padStart(2, '0')).join('').toUpperCase()}`;
      equal(paint.hex, hex, `${target.nodeId} resolved paint`);
    }
  }
  function equivalentHiddenAlias(value) {
    if (Array.isArray(value)) return value.map(equivalentHiddenAlias);
    if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value)
      .map(([key, child]) => [key, key === 'id' && child === hiddenPaintAlias ? 'VariableID:3081:186' : equivalentHiddenAlias(child)]));
    return value;
  }
  equal(flyout.implementation, { status: 'unmapped', source: null, export: null }, 'consumer implementation remains unmapped');
  equal(shellRoot.propertyDefinitions, null, 'root property definitions are unavailable rather than empty');
  equal(shellRoot.propertyDefinitionsReadStatus, 'unavailable-read-only-getter', 'root property read limitation');
  equal(shellRoot.generatedContextObservation?.property, 'footer', 'narrower generated footer property observation');
  equal(shellRoot.generatedContextObservation?.defaultValue, true, 'generated-context footer default observation');
  equal(itemSet.tree.children.map(item => item.variant), [
    { kind: 'item', state: 'default' }, { kind: 'item', state: 'pressed' }, { kind: 'item', state: 'selected' }, { kind: 'item', state: 'hovered' },
    { kind: 'folder', state: 'default' }, { kind: 'folder', state: 'hovered' },
    { kind: 'folder-open', state: 'default' }, { kind: 'folder-open', state: 'hovered' },
    { kind: 'child', state: 'default' }, { kind: 'child', state: 'hovered' },
  ], 'ten supplied combinations rather than the full variant product');
  equal(itemSet.propertyDefinitions['meta#3005:31'], { type: 'BOOLEAN', defaultValue: true }, 'child meta default');
  equal(itemSet.propertyDefinitions['icon#3005:13'].defaultValue, '2762:73887', 'file-text20 actual source default');
  for (const item of itemSet.tree.children) {
    const start = issues.length, { kind, state } = item.variant, box = style(item);
    equal([box.layout.width, box.layout.height], [280, 28], `${item.nodeId} item sample`);
    equal(box.layout.padding, { left: kind === 'child' ? 56 : 8, right: kind === 'item' ? 8 : 16, top: 0, bottom: 0 }, `${item.nodeId} kind padding`);
    equal(box.layout.gap, 8, `${item.nodeId} gap`);
    equal(box.visual.radius, 0, `${item.nodeId} square row`);
    equal(box.visual.border.paints, [], `${item.nodeId} no row border`);
    equal(box.visual.effects, [], `${item.nodeId} no row shadow`);
    const expectedFill = state === 'hovered' ? '#F8F8F8' : state === 'pressed' ? '#000000' : state === 'selected' ? '#EBF3FF' : null;
    equal(box.visual.fills.map(fill => fill.hex), expectedFill ? [expectedFill] : [], `${item.nodeId} distinct state surface`);
    if (state === 'pressed') equal(box.visual.fills[0]?.opacity, 0.1, `${item.nodeId} pressed black alpha is not solid black or selected`);
    if (state === 'selected') equal(box.visual.fills[0]?.opacity, 1, `${item.nodeId} selected surface opacity`);
    const label = item.children.find(child => child.name === 'label');
    equal(style(label).text.fontSize, 12, `${item.nodeId} label size`);
    equal(style(label).text.fontWeight, 400, `${item.nodeId} label weight`);
    equal(style(label).text.lineHeight, { unit: 'PIXELS', value: 16 }, `${item.nodeId} label line height`);
    equal(style(label).visual.fills[0]?.hex, '#1C1C1C', `${item.nodeId} label remains neutral when selected`);
    equal(label.position, { x: kind === 'item' ? 32 : 56, y: 6 }, `${item.nodeId} label position`);
    const fileIcon = item.children.find(child => child.name === 'icon');
    if (kind === 'child') equal(fileIcon, undefined, `${item.nodeId} child has no phantom icon`);
    else {
      equal(fileIcon?.instance?.source?.id, '2762:73887', `${item.nodeId} exact file-text20 source`);
      equal([fileIcon.instance.source.width, fileIcon.instance.source.height], [20, 20], `${item.nodeId} native source size`);
      equal([style(fileIcon).layout.width, style(fileIcon).layout.height], [16, 16], `${item.nodeId} actual resized frame`);
      equal(fileIcon.componentPropertyReferences?.mainComponent, 'icon#3005:13', `${item.nodeId} source swap binding`);
      const vectors = walk(fileIcon).filter(child => child.type === 'VECTOR');
      equal(vectors.length, 5, `${item.nodeId} complete file-text glyph`);
      for (const vector of vectors) {
        const border = style(vector).visual.border;
        equal(border.width, 1.25, `${vector.nodeId} actual stroke survives resizing`);
        equal(border.paints[0]?.hex, '#757575', `${vector.nodeId} subtler file glyph paint`);
        equal(border.cap, 'ROUND', `${vector.nodeId} cap`);
        equal(border.join, 'ROUND', `${vector.nodeId} join`);
      }
    }
    const chevron = item.children.find(child => child.name === 'chevron');
    if (kind === 'folder' || kind === 'folder-open') {
      equal(chevron?.instance?.source?.id, kind === 'folder' ? '2842:38917' : '2372:37015', `${item.nodeId} expansion indicator source`);
      const count = item.children.find(child => child.name === 'count');
      equal(style(count).visual.fills[0]?.hex, '#757575', `${item.nodeId} folder count color`);
    } else equal(chevron, undefined, `${item.nodeId} no phantom expansion indicator`);
    const meta = item.children.find(child => child.name === 'meta');
    if (kind === 'child') {
      equal(meta?.visible, true, `${item.nodeId} child meta visible`);
      equal(meta?.componentPropertyReferences?.visible, 'meta#3005:31', `${item.nodeId} child-only visibility binding`);
      equal(style(meta).visual.fills[0]?.hex, '#3B82F6', `${item.nodeId} child meta primary color`);
    } else equal(meta, undefined, `${item.nodeId} meta property does not create an absent child`);
    variants.push({ nodeId: item.nodeId, variant: item.variant, background: expectedFill,
      backgroundOpacity: box.visual.fills[0]?.opacity ?? null, status: status(start) });
  }

  function compareItem(actual, source, properties, root = false, hiddenAliasOverride = false) {
    const label = `${actual.nodeId} against ${source.nodeId}`, a = style(actual), b = style(source);
    equal(actual.type, root ? 'INSTANCE' : source.type, `${label} kind`);
    if (!root) equal(actual.visible, source.visible, `${label} child visibility`);
    const adapts = root || b.layout.layoutSizingHorizontal === 'FILL';
    equal(a.layout.width, b.layout.width - (adapts ? 2 : 0), `${label} width adaptation`);
    equal(without(a.layout, root ? ['width', 'layoutSizingHorizontal'] : ['width']),
      without(b.layout, root ? ['width', 'layoutSizingHorizontal'] : ['width']), `${label} remaining geometry`);
    equal(hiddenAliasOverride ? equivalentHiddenAlias(a.visual) : a.visual, b.visual, `${label} visual`);
    equal(hiddenAliasOverride ? equivalentHiddenAlias(a.bindings) : a.bindings, b.bindings, `${label} bindings`);
    if (hiddenAliasOverride && actual.type === 'VECTOR') {
      equal(a.visual.border.paints[0]?.token?.id, hiddenPaintAlias, `${label} explicit hidden-row external alias override`);
    }
    equal(a.text, b.text, `${label} typography`);
    equal(actual.componentPropertyReferences ?? {}, source.componentPropertyReferences ?? {}, `${label} property references`);
    if (!root) { equal(actual.position, source.position, `${label} child position`); equal(actual.instance, source.instance, `${label} exact nested source`); }
    if (source.text !== undefined) equal(actual.text, properties[source.componentPropertyReferences?.characters]?.value ?? source.text, `${label} bound text override`);
    equal(actual.children?.length ?? 0, source.children?.length ?? 0, `${label} full child count`);
    for (const child of source.children ?? []) {
      const actualChild = actual.children?.find(candidate => candidate.nodeId.endsWith(`;${child.nodeId.replace(/^I/, '')}`));
      if (actualChild) compareItem(actualChild, child, properties, false, hiddenAliasOverride);
      else issues.push(`${label}: missing source child ${child.nodeId}`);
    }
  }
  const actualItems = body.children.filter(child => child.instance?.source?.id === '3005:23096');
  equal(actualItems.length, 16, 'sixteen actual item slots');
  equal(actualItems.filter(item => item.visible).length, 11, 'eleven visible item slots');
  equal(actualItems.filter(item => !item.visible).length, 5, 'five hidden item slots');
  for (const [index, item] of actualItems.entries()) {
    const start = issues.length;
    equal(item.instance.variant, { kind: 'item', state: 'default' }, `${item.nodeId} actual default variant`);
    equal(item.visible, index < 11, `${item.nodeId} measured slot visibility`);
    equal(style(item).layout.layoutSizingHorizontal, index < 11 ? 'FILL' : 'FIXED', `${item.nodeId} visible/hidden width mode`);
    equal(item.position, { x: 0, y: index < 11 ? 9 + index * 28 : 317 }, `${item.nodeId} actual slot position`);
    compareItem(item, node('3005:23096'), item.instance.componentProperties, true, !item.visible);
    rows.push({ nodeId: item.nodeId, sourceNodeId: item.instance.source.id, visible: item.visible,
      externalPaintAliasOverride: item.visible ? null : hiddenPaintAlias, status: status(start) });
  }

  const headerStart = issues.length, header = node('2975:76707'), originalHeader = node('3005:23089');
  equal(header.instance?.source?.id, originalHeader.nodeId, 'header exact source');
  equal(style(header).layout.height, 54, 'header height');
  equal(style(header).layout.padding, style(originalHeader).layout.padding, 'header padding reuse');
  equal(style(header).layout.gap, 2, 'header title/meta spacing');
  for (const child of walk(header).filter(child => child.type === 'TEXT')) {
    const source = walk(originalHeader).find(candidate => child.nodeId.endsWith(`;${candidate.nodeId}`));
    equal(style(child).text, style(source).text, `${child.nodeId} header typography`);
    equal(style(child).visual, style(source).visual, `${child.nodeId} header visual`);
    const property = child.componentPropertyReferences?.characters;
    equal(child.text, header.instance.componentProperties[property]?.value, `${child.nodeId} literal header override`);
  }
  const titleGroup = header.children.find(child => child.name === 'title-group');
  const title = titleGroup.children.find(child => child.name === 'title'), count = titleGroup.children.find(child => child.name === 'count');
  equal(count.position.x, style(title).layout.width + style(titleGroup).layout.gap, 'header count follows actual title HUG width');
  const headerResult = { nodeId: header.nodeId, sourceNodeId: originalHeader.nodeId,
    textOverrides: header.instance.componentProperties, status: status(headerStart) };

  const footerStart = issues.length, footer = node('3010:23520'), originalFooter = node('3005:23094');
  const footerBox = style(footer), originalFooterBox = style(originalFooter);
  equal(footer.instance?.source?.id, originalFooter.nodeId, 'footer exact source');
  equal(footer.componentPropertyReferences?.visible, 'footer#3010:0', 'actual footer visibility binding');
  equal(footer.visible, true, 'actual footer visible');
  equal(originalFooterBox.layout.padding, { left: 8, right: 8, top: 8, bottom: 4 }, 'standalone footer padding');
  equal(footerBox.layout.padding, { left: 8, right: 8, top: 8, bottom: 8 }, 'actual footer bottom padding override');
  equal(originalFooterBox.visual.fills, [], 'standalone footer transparent');
  equal(footerBox.visual.fills[0]?.hex, '#FFFFFF', 'actual footer white override');
  equal(originalFooterBox.layout.height, 29, 'standalone footer height');
  equal(footerBox.layout.height, 33, 'actual footer height override');
  equal(footerBox.visual.border, originalFooterBox.visual.border, 'footer top border preserved');
  equal([footerBox.visual.border.top, footerBox.visual.border.bottom, footerBox.visual.border.left, footerBox.visual.border.right], [1, 0, 0, 0], 'footer top-only border');
  equal(footerBox.layout.height, 1 + 8 + 16 + 8, 'actual footer natural height includes top border');
  equal(footer.position, { x: 1, y: 365 }, 'actual footer overlapping position');
  const footerLabel = footer.children.find(child => child.type === 'TEXT');
  equal(footerLabel.text, footer.instance.componentProperties['meta#3005:3']?.value, 'actual footer literal meta override');
  equal(style(footerLabel).text, style(originalFooter.children[0]).text, 'footer typography reuse');
  const footerResult = { nodeId: footer.nodeId, sourceNodeId: originalFooter.nodeId, standaloneHeight: 29,
    actualHeight: 33, standaloneBottomPadding: 4, actualBottomPadding: 8, status: status(footerStart) };

  const shellStart = issues.length, mid = elevation.effectStyles.find(effect => effect.name === 'Mid');
  equal([shellBox.layout.width, shellBox.layout.height], [280, 398], 'fixed shell sample');
  equal(shellBox.visual.radius, 12, 'shell radius');
  equal(shellBox.visual.border.width, 1, 'shell border width');
  equal(shellBox.layout.strokesIncludedInLayout, true, 'shell border reserves layout');
  equal(shellBox.visual.fills[0]?.hex, '#FFFFFF', 'shell white surface');
  equal(shell.effectStyleId, mid?.id, 'shell actual Mid identity');
  equal(shellBox.visual.effects, mid?.effects, 'shell ordered Mid effects');
  equal(shellBox.layout.clipsContent, true, 'shell recorded clipping');
  equal(style(body).layout.overflowDirection, 'NONE', 'body has no measured runtime scrolling');
  equal([body.position.y, style(body).layout.height], [59, 317], 'body measured extent');
  equal(body.position.y + style(body).layout.height - footer.position.y, 11, 'eleven pixel footer/content overlap is evidence rather than target layout');
  const scroll = node('2975:76722');
  equal(scroll.instance?.source?.id, '2019:3708', 'scroll drawing exact source');
  equal(scroll.visible, true, 'scroll drawing visible');
  equal([style(scroll).layout.width, style(scroll).layout.height], [11, 95], 'scroll drawing size');
  const shellResult = { nodeId: shell.nodeId, width: 280, height: 398, visibleRows: 11, hiddenRows: 5,
    observedContentFooterOverlap: 11, runtimeScrollVerified: false, status: status(shellStart) };

  equal(assetManifest.assets.length, 6, 'three geometry references plus three supplied exports');
  for (const asset of assetManifest.assets) {
    const start = issues.length, bytes = fs.readFileSync(path.join(designRoot, asset.path)), svg = bytes.toString('utf8');
    equal(bytes.length, asset.bytes, `${asset.path} bytes`);
    equal(createHash('sha256').update(bytes).digest('hex'), asset.sha256, `${asset.path} SHA256`);
    check(svg.includes(`width="${asset.width}"`) && svg.includes(`height="${asset.height}"`) &&
      svg.includes(`viewBox="0 0 ${asset.width} ${asset.height}"`), `${asset.path}: native SVG dimensions`);
    check(/<path\b/.test(svg), `${asset.path}: nonempty glyph paths`);
    check(!/<script\b|<foreignObject\b|(?:href|src)=["'](?:https?:|\/\/|data:)|\bon[a-z]+\s*=/i.test(svg), `${asset.path}: unexpected executable or remote SVG content`);
    if (asset.method === 'existing-exact-source-geometry') {
      const existing = mainManifest.icons.find(icon => icon.sources.some(source => source.nodeId === asset.sourceNodeId));
      check(Boolean(existing), `${asset.path}: exact source missing from main library`);
      if (existing) { equal(asset.path, existing.path, `${asset.path} existing path`); equal(asset.sha256, existing.sha256, `${asset.path} existing hash`); }
      for (const id of asset.instanceNodeIds) {
        const target = node(id);
        equal(target.instance?.source?.id, asset.sourceNodeId, `${id} actual geometry source`);
        equal([target.instance?.source?.width, target.instance?.source?.height], [asset.width, asset.height], `${id} native source dimensions`);
        equal([style(target).layout.width, style(target).layout.height], [16, 16], `${id} actual displayed glyph dimensions`);
      }
    } else {
      equal(asset.method, 'figma-supplied-original-asset', `${asset.path} supplied original export`);
      const target = node(asset.sourceNodeId);
      equal(target.type, asset.sourceKind, `${asset.path} actual export kind`);
      equal(target.instance?.source?.id, asset.actualSourceNodeId, `${asset.path} exact main component identity`);
      equal([target.instance?.source?.width, target.instance?.source?.height], [asset.sourceWidth, asset.sourceHeight], `${asset.path} source versus display size`);
      equal([style(target).layout.width, style(target).layout.height], [asset.displayWidth, asset.displayHeight], `${asset.path} actual displayed frame`);
      const colors = [...svg.matchAll(/(?:fill|stroke)="(#[0-9a-f]{6})"/gi)].map(match => match[1].toUpperCase());
      check(colors.length > 0 && colors.every(color => color === asset.color), `${asset.path}: exact supplied glyph paint mismatch`);
      for (const tag of svg.match(/<path\b[^>]*>/g) ?? []) {
        const width = /stroke-width="([\d.]+)"/.exec(tag);
        equal(width ? Number(width[1]) : 1, asset.strokeWidth, `${asset.path} actual SVG path stroke`);
      }
      for (const vector of walk(target).filter(child => child.type === 'VECTOR')) {
        equal(style(vector).visual.border.width, asset.strokeWidth, `${asset.path} recorded vector stroke`);
        equal(style(vector).visual.border.paints[0]?.hex, asset.color, `${asset.path} recorded vector paint`);
      }
    }
    assets.push({ path: asset.path, method: asset.method, status: status(start) });
  }
  const motionStart = issues.length;
  equal(motion.status, 'user-requested-adoption', 'motion adoption status');
  equal(motion.figmaMeasured, false, 'motion is not measured Figma animation');
  equal(motion.runtimeVerified, false, 'motion is not consuming runtime proof');
  equal(motion.source.baselineDocuments, ['DOCS_ROOT/frontend/design/components/Menu/behavior.md',
    'DOCS_ROOT/frontend/design/components/Menu/implementation/css.md'], 'motion existing document provenance');
  equal(motion.source.authoringSource?.kind, 'read-only-local-source-snapshot', 'closing guard local source provenance');
  check(/^[a-f0-9]{64}$/.test(motion.source.authoringSource?.sha256 ?? ''), 'motion source snapshot hash is required');
  check(motion.source.scope.includes('opt-out does not force'), 'motion adoption must not force common opt-out dependencies');
  equal([motion.durationMs, motion.easing, motion.fillMode, motion.distancePx], [150, 'ease', 'both', 6], 'motion timing and distance');
  equal(motion.sideFallback, 'bottom', 'motion side fallback');
  equal(Object.keys(motion.sides).sort(), ['bottom', 'left', 'right', 'top'], 'four placement sides');
  for (const [side, axis, offset] of [['top', 'Y', 6], ['bottom', 'Y', -6], ['left', 'X', 6], ['right', 'X', -6]]) {
    const frames = motion.sides[side], shifted = `translate${axis}(${offset}px)`, rest = `translate${axis}(0)`;
    equal(frames.axis, axis, `${side} motion axis`);
    equal(frames.offsetPx, offset, `${side} signed offset`);
    equal(frames.open, { from: { opacity: 0, transform: shifted }, to: { opacity: 1, transform: rest } }, `${side} opening fade/translation`);
    equal(frames.closed, { from: { opacity: 1, transform: rest }, to: { opacity: 0, transform: shifted } }, `${side} closing fade/translation`);
  }
  equal(motion.closedPointerEvents, 'none', 'closing surface pointer guard');
  equal(motion.reducedMotion.baselineMenuImplementsOverride, false, 'reduced motion is explicit adoption, not an existing Menu claim');
  equal(motion.reducedMotion.flyoutPolicy, 'animation: none', 'adopted reduced-motion fallback');
  equal(motion.transformOrigin.baselineVariable, '--radix-dropdown-menu-content-transform-origin', 'baseline positioning origin');
  equal(motion.transformOrigin.adoptedVariable, '--flyout-transform-origin', 'adapter-owned positioning origin');
  const motionResult = { status: status(motionStart), adoption: motion.status, figmaMeasured: false,
    runtimeVerified: false, durationMs: motion.durationMs, easing: motion.easing, fillMode: motion.fillMode,
    distancePx: motion.distancePx, sides: Object.keys(motion.sides), closedPointerEvents: motion.closedPointerEvents,
    reducedMotionIsExplicitAdoption: true };
  equal(variables.variables.length, 25, 'variable closure size');
  equal(variables.collections.length, 5, 'variable collection count');
  return { schemaVersion: 1, solution: 'agent-hub', scope: 'Flyout four source roots, ten supplied variants and actual header/items/footer composition',
    runtimeVerified: false, allStatesVerified: false, variants, rows, header: headerResult, footer: footerResult,
    shell: shellResult, assets, motion: motionResult,
    limits: ['Ten item variants do not cover the full kind/state product; folder/child pressed or selected are not supplied',
      'Root property getter is unavailable; visible footer binding and generated-context footer default are narrower evidence than complete root props',
      'Sixteen row instances include five hidden rows, and footer/content overlap requires a separately adopted runtime viewport',
      'File-text source is native20 resized to16 with actual1.25 stroke, not an interchangeable native16 icon',
      'Common Menu motion is a product adoption contract rather than measured Figma animation',
      'Open/close/focus/selection/expansion/disabled/loading/dark/mobile and consuming request behavior remain unverified'], issues };
}
