import fs from 'node:fs';
import path from 'node:path';

const walk = node => [node, ...(node.children ?? []).flatMap(walk)];

// Static evidence comparison; a rectangle does not establish a working scroll container.
export function inspectScrollbarComparison(designRoot) {
  const read = name => JSON.parse(fs.readFileSync(path.join(designRoot, 'references', name), 'utf8'));
  const snapshot = read('scrollbar.figma.json'), variables = read('scrollbar.variables.figma.json');
  const issues = [];
  const equal = (actual, expected, label) => {
    if (JSON.stringify(actual) !== JSON.stringify(expected)) issues.push(`${label}: ${JSON.stringify(actual)} != ${JSON.stringify(expected)}`);
  };
  const source = snapshot.roots[0], root = source.tree, nodes = walk(root);
  const thumb = root.children?.find(node => node.nodeId === '3155:20472');
  if (!thumb) throw new Error('Missing measured Scrollbar thumb3155:20472');
  const shell = snapshot.styles[root.styleRef], bar = snapshot.styles[thumb.styleRef];
  equal(snapshot.componentId, 'AgentHubScrollbar', 'dedicated registry identity');
  equal(snapshot.implementation, { status: 'unmapped', source: null, export: null }, 'consumer source/export remains unmapped');
  equal(nodes.length, 2, 'one root and one rectangle, no invented viewport or controls');
  equal([root.nodeId, root.type, thumb.type], ['3155:20473', 'COMPONENT', 'RECTANGLE'], 'actual primitive types');
  equal(source.propertyDefinitions, {}, 'no exposed component properties');
  equal(source.variantProperties, null, 'no supplied state or orientation variants');
  for (const target of nodes) {
    equal(target.visible, true, `${target.nodeId} supplied visible state`);
    equal(target.instance ?? null, null, `${target.nodeId} no nested component instance`);
    equal(target.explicitVariableModes, {}, `${target.nodeId} no explicit mode override`);
    equal(target.resolvedVariableModes, { 'VariableCollectionId:3077:14': '3077:0', 'VariableCollectionId:3081:14': '3081:0' }, `${target.nodeId} supplied Light modes`);
  }
  equal([shell.layout.width, shell.layout.height], [11, 180], 'fixed comparison frame11x180');
  equal(shell.layout.layoutSizingHorizontal, 'FIXED', 'root measured horizontal sizing');
  equal(shell.layout.layoutSizingVertical, 'FIXED', 'root measured vertical sizing');
  equal(shell.layout.layoutMode, 'HORIZONTAL', 'root stored auto-layout axis');
  equal(shell.layout.padding, { left: 0, right: 1, top: 1, bottom: 0 }, 'stored root padding does not position absolute thumb');
  equal(shell.layout.gap, 0, 'stored root gap');
  equal(shell.layout.clipsContent, false, 'root clipping');
  equal(shell.layout.overflowDirection, 'NONE', 'no measured scroll runtime');
  equal(shell.layout.constraints, { horizontal: 'MAX', vertical: 'MIN' }, 'root constraints');
  equal(shell.layout.strokesIncludedInLayout, false, 'root stored border layout flag');
  equal(shell.visual.fills, [], 'root has no surface paint despite screenshot backdrop');
  equal(shell.visual.border.paints, [], 'root has no rendered stroke despite stored strokeWeight1');
  equal(shell.visual.effects, [], 'root has no shadow');
  equal(shell.visual.opacity, 1, 'root opacity');
  equal(shell.visual.radius, 0, 'root radius');
  equal(shell.visual.cornerRadii, { topLeftRadius: 0, topRightRadius: 0, bottomLeftRadius: 0, bottomRightRadius: 0 }, 'root four corners');
  equal(thumb.position, { x: 3, y: 3 }, 'thumb exact sample position');
  equal([bar.layout.width, bar.layout.height], [4, 160], 'thumb measured4x160 sample, not runtime length');
  equal(bar.layout.layoutPositioning, 'ABSOLUTE', 'thumb placement independent of parent padding');
  equal(bar.layout.layoutSizingHorizontal, 'FIXED', 'thumb stored horizontal sizing');
  equal(bar.layout.layoutSizingVertical, 'FIXED', 'thumb stored vertical sizing');
  equal(bar.layout.constraints, { horizontal: 'MIN', vertical: 'SCALE' }, 'thumb MIN/SCALE constraints do not prove scroll geometry');
  equal(bar.visual.radius, 9999, 'thumb full radius');
  equal(bar.visual.cornerRadii, { topLeftRadius: 9999, topRightRadius: 9999, bottomLeftRadius: 9999, bottomRightRadius: 9999 }, 'thumb four full corners');
  equal(bar.visual.border.paints, [], 'thumb has no rendered border');
  equal(bar.visual.effects, [], 'thumb has no shadow');
  equal(bar.visual.opacity, 1, 'thumb layer opacity remains1');
  equal(bar.visual.fills.length, 1, 'one opaque SOLID thumb paint');
  const paint = bar.visual.fills[0];
  equal([paint.type, paint.visible, paint.hex, paint.opacity], ['SOLID', true, '#DDDDDD', 1], 'actual thumb fill and alpha');
  equal(paint.token, { id: 'VariableID:3081:220', name: 'color/scroll/default' }, 'actual semantic scroll token');
  equal(paint.bindings.color, { type: 'VARIABLE_ALIAS', id: 'VariableID:3081:220', name: 'color/scroll/default' }, 'fill binding identity');
  for (const corner of ['topLeftRadius', 'topRightRadius', 'bottomLeftRadius', 'bottomRightRadius']) {
    equal(bar.bindings[corner], { type: 'VARIABLE_ALIAS', id: 'VariableID:3273:31', name: 'radius/full' }, `${corner} semantic radius binding`);
  }
  equal(bar.bindings.fills, [{ type: 'VARIABLE_ALIAS', id: 'VariableID:3081:220', name: 'color/scroll/default' }], 'node fill binding identity');
  equal(snapshot.prototypeReactions, [{ nodeId: root.nodeId, reactions: [] }, { nodeId: thumb.nodeId, reactions: [] }], 'neither node supplies prototype scroll behavior');
  equal(snapshot.transforms, [{ nodeId: root.nodeId, rotation: 0, relativeTransform: [[1, 0, 8145], [0, 1, 1586]] },
    { nodeId: thumb.nodeId, rotation: 0, relativeTransform: [[1, 0, 3], [0, 1, 3]] }], 'exact provenance transforms');
  const byId = new Map(variables.variables.map(variable => [variable.id, variable]));
  equal(variables.variables.length, 4, 'complete four-variable closure');
  equal(variables.collections.length, 2, 'both Light collections');
  equal(byId.get('VariableID:3081:220')?.valuesByMode, { '3081:0': { type: 'VARIABLE_ALIAS', id: 'VariableID:3077:20' } }, 'semantic scroll aliases gray300');
  equal(byId.get('VariableID:3273:31')?.valuesByMode, { '3081:0': { type: 'VARIABLE_ALIAS', id: 'VariableID:3273:21' } }, 'semantic full radius aliases distinct primitive identity');
  equal(byId.get('VariableID:3273:21')?.valuesByMode, { '3077:0': 9999 }, 'primitive full radius');
  const primitive = byId.get('VariableID:3077:20')?.valuesByMode['3077:0'];
  equal(primitive?.a, 1, 'primitive gray300 alpha remains opaque');
  equal(primitive ? [primitive.r, primitive.g, primitive.b].map(value => Math.round(value * 255)) : null, [221, 221, 221], 'primitive gray300 resolves actual fill');
  const rightRemainder = shell.layout.width - thumb.position.x - bar.layout.width;
  const bottomRemainder = shell.layout.height - thumb.position.y - bar.layout.height;
  equal([rightRemainder, bottomRemainder], [4, 17], 'sample remainder is not a symmetric runtime inset');
  return { schemaVersion: 1, solution: 'agent-hub', scope: 'Single visible vertical Light Scrollbar sample and documented common baseline',
    runtimeVerified: false, allStatesVerified: false, status: issues.length ? 'mismatch' : 'match',
    sample: { rootNodeId: root.nodeId, thumbNodeId: thumb.nodeId, rootWidth: shell.layout.width, rootHeight: shell.layout.height,
      thumbWidth: bar.layout.width, thumbHeight: bar.layout.height, thumbPosition: thumb.position,
      rightRemainder, bottomRemainder, contentRatioVerified: false, runtimeFixedLengthAdopted: false },
    commonComparison: { baselineKind: 'documented-reference-contract',
      shared: { thumbWidth: 4, radius: 9999, initialOffset: 3 },
      differences: [
        { property: 'Light default paint', common: 'rgba(85,85,85,0.30)', agentHub: '#DDDDDD opaque', status: 'intentional-extension' },
        { property: 'nominal cross-axis geometry', common: 10, agentHub: 11, commonCalculation: '3+4+3', status: 'intentional-extension' },
      ],
      commonHover: 'rgba(85,85,85,0.55)', agentHubHoverVerified: false, viewportReservationVerified: false },
    requiredAssetCount: 0,
    limits: ['The11x180 frame and4x160 rectangle are comparison geometry; do not hardcode a160px runtime thumb or shrink a product viewport to11px',
      'Right4/bottom17 are arithmetic sample remainders; x3/y3 and MIN/SCALE do not establish symmetric endpoints, scroll ratio or drag behavior',
      'The empty root paints are a track-reference property; do not import a wrapper surface/border/padding or infer a screenshot backdrop fill',
      'Common native overflow, dynamic geometry and sibling overlay ownership remain an adoption contract; source examples do not prove consuming-product keyboard/focus behavior',
      'Hover/hidden/horizontal/dark/loading/disabled, pointer capture/drag, wheel/keyboard, ARIA ranges, focus, resize and nested ownership require product verification',
      'No SVG/PNG asset is needed for this primitive rectangle, and different Scroll bar sources in existing recipes are not globally replaced'], issues };
}
