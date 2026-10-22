import fs from 'node:fs';
import path from 'node:path';

// Compare the measured nested separators with their standalone Figma variants.
export function inspectBreadcrumbComposition(designRoot) {
  const read = name => JSON.parse(fs.readFileSync(path.join(designRoot, 'references', name), 'utf8'));
  const breadcrumb = read('breadcrumb.figma.json');
  const separator = read('breadcrumb-separator.figma.json');
  const issues = [];
  const instances = [];
  const equal = (actual, expected, label) => {
    const same = typeof actual === 'number' && typeof expected === 'number'
      ? Math.abs(actual - expected) < 0.0001 : JSON.stringify(actual) === JSON.stringify(expected);
    if (!same) issues.push(`${label}: ${JSON.stringify(actual)} != ${JSON.stringify(expected)}`);
  };
  for (const variant of breadcrumb.variants) {
    const kind = variant.variant.separator;
    const items = (variant.children || []).filter(node => node.visible);
    equal(items.length, 5, `${kind} measured sample items`);
    equal(breadcrumb.styles[variant.styleRef].layout.gap, 0, `${kind} root gap`);
    for (const [index, item] of items.entries()) {
      equal(item.instance?.source?.id, '2372:36927', `${item.nodeId} Item source`);
      const last = index === items.length - 1;
      equal(item.instance?.componentProperties?.['.separator?#1673:0']?.value, !last, `${item.nodeId} trailing separator`);
      const label = item.children?.find(node => node.type === 'TEXT' && node.visible);
      const nested = item.children?.filter(node => node.type === 'INSTANCE' && node.visible) || [];
      equal(nested.length, last ? 0 : 1, `${item.nodeId} visible separator count`);
      if (!label) { issues.push(`${item.nodeId}: missing label`); continue; }
      const textStyle = breadcrumb.styles[label.styleRef];
      equal(textStyle.text.fontSize, 16, `${label.nodeId} font size`);
      equal(textStyle.text.lineHeight, { unit: 'PIXELS', value: 24 }, `${label.nodeId} line height`);
      equal(textStyle.visual.fills[0]?.hex, '#1C1C1C', `${label.nodeId} path/current color`);
      for (const node of nested) {
        const start = issues.length;
        const sourceId = kind === 'slash' ? '2372:36931' : '2427:25428';
        const primitive = separator.variants.find(candidate => candidate.variant['.type'] === kind);
        if (!primitive) { issues.push(`Missing standalone ${kind}`); continue; }
        equal(node.instance?.source?.id, sourceId, `${node.nodeId} actual source`);
        equal(node.instance?.variant, { '.type': kind }, `${node.nodeId} instance variant`);
        const actual = breadcrumb.styles[node.styleRef];
        const reference = separator.styles[primitive.styleRef];
        for (const field of ['width', 'height', 'padding', 'gap', 'layoutMode', 'primaryAxisAlignItems', 'counterAxisAlignItems']) {
          equal(actual.layout[field], reference.layout[field], `${node.nodeId} ${field}`);
        }
        equal(actual.visual, reference.visual, `${node.nodeId} container visual`);
        const glyph = node.children?.filter(child => child.visible) || [];
        const referenceGlyphs = primitive.children?.filter(child => child.visible) || [];
        equal(glyph.length, 1, `${node.nodeId} visible glyph count`);
        equal(referenceGlyphs.length, 1, `${primitive.nodeId} standalone glyph count`);
        if (glyph.length === 1 && referenceGlyphs.length === 1) {
          const child = glyph[0], referenceChild = referenceGlyphs[0];
          const a = breadcrumb.styles[child.styleRef], b = separator.styles[referenceChild.styleRef];
          equal(child.type, referenceChild.type, `${child.nodeId} glyph type`);
          equal(child.text, referenceChild.text, `${child.nodeId} glyph text`);
          equal(child.position, referenceChild.position, `${child.nodeId} glyph position`);
          equal(a.text, b.text, `${child.nodeId} typography`);
          equal(a.visual, b.visual, `${child.nodeId} glyph paint`);
          equal(a.bindings, b.bindings, `${child.nodeId} displayed token binding`);
          for (const dimension of ['width', 'height']) equal(a.layout[dimension], b.layout[dimension], `${child.nodeId} glyph ${dimension}`);
        }
        equal(breadcrumb.styles[item.styleRef].layout.width, textStyle.layout.width + actual.layout.width, `${item.nodeId} label + separator width`);
        instances.push({ breadcrumbVariant: kind, nodeId: node.nodeId, sourceNodeId: sourceId,
          standaloneNodeId: primitive.nodeId, status: issues.length === start ? 'match' : 'mismatch' });
      }
    }
  }
  return { schemaVersion: 1, solution: 'agent-hub', scope: 'Figma Breadcrumb instances against standalone separator snapshots',
    runtimeVerified: false, allStatesVerified: false,
    limits: ['Two five-label samples; dash exists on the separator only',
      'Original slash source differs from the copied standalone source; displayed Light token overrides match',
      'No TextButton/IconButton reuse, hover/pressed/focus/dark, overflow menu or browser navigation is verified'],
    instances, issues };
}
