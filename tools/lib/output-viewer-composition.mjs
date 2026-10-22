import { createHash } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

const walk = node => [node, ...(node.children ?? []).flatMap(walk)];

export function inspectOutputViewerComposition(designRoot) {
  const read = name => JSON.parse(fs.readFileSync(path.join(designRoot, 'references', name), 'utf8'));
  const viewer = read('output-viewer.figma.json'), variables = read('output-viewer.variables.figma.json');
  const assetManifest = read('output-viewer.assets.json'), elevation = read('elevation.figma.json');
  const iconButtons = read('icon-button.figma.json');
  const issues = [], controls = [], assets = [];
  const equal = (actual, expected, label) => {
    const same = typeof actual === 'number' && typeof expected === 'number'
      ? Math.abs(actual - expected) < 0.0001 : JSON.stringify(actual) === JSON.stringify(expected);
    if (!same) issues.push(`${label}: ${JSON.stringify(actual)} != ${JSON.stringify(expected)}`);
  };
  const check = (condition, label) => { if (!condition) issues.push(label); };
  const status = start => issues.length === start ? 'match' : 'mismatch';
  const source = viewer.roots[0], root = source.tree, all = walk(root);
  const node = id => {
    const found = all.find(target => target.nodeId === id);
    if (!found) throw new Error(`Missing measured OutputViewer node ${id}`);
    return found;
  };
  const style = target => viewer.styles[target.styleRef];
  equal(viewer.implementation, { status: 'unmapped', source: null, export: null }, 'consumer source/export remains unmapped');
  equal(all.length, 19, 'single sample full node count');
  equal(Object.keys(source.propertyDefinitions).length, 6, 'six measured properties');
  equal(source.propertyDefinitions['content#3015:5'], { type: 'SLOT', description: null, preferredValues: [] }, 'native SLOT rather than text or preselected renderer');
  for (const [name, value] of [['title#3015:0', 'title'], ['type#3015:1', 'file-format']]) {
    equal(source.propertyDefinitions[name], { type: 'TEXT', defaultValue: value }, `${name} text property`);
  }
  for (const property of ['show type#3015:2', 'show expand#3015:3', 'show close#3015:4']) {
    equal(source.propertyDefinitions[property], { type: 'BOOLEAN', defaultValue: true }, `${property} measured default`);
    const targets = all.filter(target => target.componentPropertyReferences?.visible === property);
    equal(targets.length, property === 'show type#3015:2' ? 2 : 1, `${property} exact visibility targets`);
    for (const target of targets) equal(target.visible, true, `${target.nodeId} supplied all-visible state`);
  }
  const shellStart = issues.length, box = style(root), mid = elevation.effectStyles.find(effect => effect.name === 'Mid');
  equal(root.type, 'COMPONENT', 'single root component, no variant set');
  equal([box.layout.width, box.layout.height], [540, 977], 'fixed shell sample');
  equal(box.visual.radius, 0, 'root radius does not replace child mixed corners');
  equal(box.visual.fills, [], 'root has no rendered fill');
  equal(box.visual.border.paints, [], 'root has no rendered border despite stored strokeWeight');
  equal(box.layout.clipsContent, false, 'root does not clip compound surface');
  equal(root.effectStyleId, mid?.id, 'actual Mid effect identity');
  equal(box.visual.effects, mid?.effects, 'ordered Mid effects');
  const header = node('3015:24203'), content = node('3015:24236');
  equal(root.children.map(target => target.nodeId), [header.nodeId, content.nodeId], 'header plus empty content SLOT');
  equal([style(header).layout.width, style(header).layout.height], [540, 34], 'header measured size');
  equal(style(header).layout.padding, { left: 16, right: 16, top: 8, bottom: 4 }, 'header padding');
  equal(style(header).layout.strokesIncludedInLayout, true, 'header border reserves layout');
  equal(style(header).visual.fills[0]?.hex, '#F6F7F9', 'header blue-gray fill');
  equal(style(header).visual.cornerRadii, { topLeftRadius: 16, topRightRadius: 16, bottomLeftRadius: 0, bottomRightRadius: 0 }, 'header asymmetric corners');
  equal([style(header).visual.border.top, style(header).visual.border.bottom, style(header).visual.border.left, style(header).visual.border.right], [1, 1, 1, 1], 'header has all four border edges');
  equal(style(header).visual.border.paints[0]?.hex, '#DDDDDD', 'header border color');
  equal(content.type, 'SLOT', 'content remains native SLOT');
  equal(content.componentPropertyReferences?.slotContentId, 'content#3015:5', 'native slot property binding');
  equal(content.children?.length ?? 0, 0, 'supplied content is empty, no renderer evidence');
  equal(content.position, { x: 0, y: 34 }, 'content follows header');
  equal([style(content).layout.width, style(content).layout.height], [540, 943], 'content sample size');
  equal(style(content).layout.layoutSizingVertical, 'FILL', 'content fills resized panel');
  equal(style(content).layout.padding, { left: 8, right: 8, top: 16, bottom: 16 }, 'content padding');
  equal(style(content).layout.gap, 24, 'content layout gap');
  equal(style(content).layout.strokesIncludedInLayout, true, 'content edges reserve layout');
  equal(style(content).layout.clipsContent, true, 'recorded content clipping');
  equal(style(content).layout.overflowDirection, 'NONE', 'content scroll runtime not measured');
  equal(style(content).visual.fills[0]?.hex, '#FFFFFF', 'content white surface');
  equal(style(content).visual.cornerRadii, { topLeftRadius: 0, topRightRadius: 0, bottomLeftRadius: 16, bottomRightRadius: 16 }, 'content asymmetric corners');
  equal([style(content).visual.border.top, style(content).visual.border.bottom, style(content).visual.border.left, style(content).visual.border.right], [0, 1, 1, 1], 'content omits top border to avoid double seam');
  equal(style(content).visual.border.width, null, 'mixed edge width is not a uniform border');
  equal(style(header).layout.height + style(content).layout.height, box.layout.height, 'header and content occupy the measured height');
  const shell = { nodeId: root.nodeId, width: box.layout.width, height: box.layout.height,
    headerHeight: 34, contentHeight: 943, contentType: 'SLOT', rendererVerified: false, status: status(shellStart) };

  const title = node('3015:24206'), type = node('3015:24208'), dot = node('3015:24207');
  for (const [target, property] of [[title, 'title#3015:0'], [type, 'type#3015:1']]) {
    equal(target.componentPropertyReferences?.characters, property, `${target.nodeId} text binding`);
    equal(target.text, source.propertyDefinitions[property].defaultValue, `${target.nodeId} literal sample`);
    equal(style(target).text.fontSize, 14, `${target.nodeId} font size`);
    equal(style(target).text.fontWeight, 600, `${target.nodeId} font weight`);
    equal(style(target).text.lineHeight, { unit: 'PIXELS', value: 20 }, `${target.nodeId} line height`);
    equal(style(target).visual.fills[0]?.hex, '#1C1C1C', `${target.nodeId} text color`);
  }
  equal([style(dot).layout.width, style(dot).layout.height], [3, 3], 'decorative type separator size');
  equal(style(dot).visual.fills[0]?.hex, '#AAAAAA', 'decorative separator color is not an unread/disabled state');
  equal(dot.position.x, style(title).layout.width + 4, 'separator follows title gap');
  equal(type.position.x, dot.position.x + 3 + 4, 'type follows separator gap');
  const titleArea = node('3015:24204'), actions = node('3015:24209');
  equal(titleArea.position, { x: 17, y: 9 }, 'title area border-aware inset');
  equal(style(titleArea).layout.padding.right, 44, 'sample reserves title space for absolute actions');
  equal(style(actions).layout.layoutPositioning, 'ABSOLUTE', 'actions do not increase header auto-layout height');
  equal(actions.position, { x: 483, y: 5 }, 'actual actions position');
  equal([style(actions).layout.width, style(actions).layout.height, style(actions).layout.gap], [52, 24, 4], 'two control row geometry');
  const ghost = iconButtons.variants.find(variant => variant.nodeId === '2427:25108');
  for (const [id, glyphSource, visibility, vectors] of [['3015:24222', '3015:24201', 'show expand#3015:3', 4],
    ['3015:24226', '2311:46284', 'show close#3015:4', 2]]) {
    const start = issues.length, button = node(id), buttonBox = style(button), glyph = button.children[0];
    equal(button.instance?.source?.id, ghost.nodeId, `${id} exact ghost24 source`);
    equal(button.instance?.variant, ghost.variant, `${id} ghost default variant`);
    for (const field of ['width', 'height', 'padding', 'layoutMode']) equal(buttonBox.layout[field], ghost.layout[field], `${id} existing button ${field}`);
    equal(buttonBox.visual.radius, ghost.visual.radius, `${id} existing button radius`);
    equal(buttonBox.visual.fills, [], `${id} ghost default fill`);
    equal(buttonBox.visual.border.paints, [], `${id} no rendered button border`);
    equal(buttonBox.layout.strokesIncludedInLayout, false, `${id} stored inside stroke does not add layout`);
    equal(button.componentPropertyReferences?.visible, visibility, `${id} visibility owner`);
    equal(glyph.instance?.source?.id, glyphSource, `${id} actual glyph source overrides generated plus name`);
    equal([style(glyph).layout.width, style(glyph).layout.height], [16, 16], `${id} native16 glyph`);
    equal(glyph.position, { x: 4, y: 4 }, `${id} glyph inset`);
    equal(glyph.children.length, vectors, `${id} complete actual vector geometry`);
    for (const vector of glyph.children) {
      const border = style(vector).visual.border;
      equal(border.width, 1, `${vector.nodeId} stroke width`);
      equal(border.paints[0]?.hex, '#1C1C1C', `${vector.nodeId} glyph color`);
      equal(border.cap, 'ROUND', `${vector.nodeId} cap`);
      equal(border.join, 'ROUND', `${vector.nodeId} join`);
    }
    controls.push({ nodeId: id, sourceNodeId: ghost.nodeId, glyphSourceNodeId: glyphSource, visibilityProperty: visibility, status: status(start) });
  }
  equal(assetManifest.assets.length, 3, 'three exact supplied native assets');
  for (const asset of assetManifest.assets) {
    const start = issues.length, target = node(asset.sourceNodeId), bytes = fs.readFileSync(path.join(designRoot, asset.path)), svg = bytes.toString('utf8');
    equal(asset.method, 'figma-supplied-original-asset', `${asset.path} supplied original`);
    equal(bytes.length, asset.bytes, `${asset.path} bytes`);
    equal(createHash('sha256').update(bytes).digest('hex'), asset.sha256, `${asset.path} SHA256`);
    equal(target.type, asset.sourceKind, `${asset.path} actual export kind`);
    if (target.type === 'INSTANCE') equal(target.instance.source.id, asset.actualSourceNodeId, `${asset.path} component source identity`);
    equal([style(target).layout.width, style(target).layout.height], [asset.displayWidth, asset.displayHeight], `${asset.path} actual frame`);
    equal(Number(/\bwidth="([\d.]+)"/.exec(svg)?.[1]), asset.width, `${asset.path} SVG width`);
    equal(Number(/\bheight="([\d.]+)"/.exec(svg)?.[1]), asset.height, `${asset.path} SVG height`);
    equal(/\bviewBox="([^"]+)"/.exec(svg)?.[1].split(/\s+/).map(Number), [0, 0, asset.width, asset.height], `${asset.path} viewBox`);
    const colors = [...new Set([...svg.matchAll(/(?:fill|stroke)="(#[0-9a-f]{6})"/gi)].map(match => match[1].toUpperCase()))].sort();
    equal(colors, [...asset.colors].sort(), `${asset.path} exact asset paint`);
    const strokes = [...new Set((svg.match(/<[^!?][^>]*>/g) ?? []).filter(tag => /\bstroke="(?!none)/.test(tag))
      .map(tag => Number(/\bstroke-width="([\d.]+)"/.exec(tag)?.[1] ?? 1)))].sort((a, b) => a - b);
    equal(strokes, [...asset.strokeWidths].sort((a, b) => a - b), `${asset.path} exact asset stroke`);
    check(!/<script\b|<foreignObject\b|(?:href|src)=["'](?:https?:|\/\/|data:)|\bon[a-z]+\s*=/i.test(svg), `${asset.path}: unexpected executable or remote SVG content`);
    assets.push({ role: asset.role, path: asset.path, status: status(start) });
  }
  equal(variables.variables.length, 15, 'variable closure size');
  equal(variables.collections.length, 3, 'variable collection count');
  return { schemaVersion: 1, solution: 'agent-hub', scope: 'One empty OutputViewer sample with native SLOT, asymmetric edges/corners and actual ghost24 glyph swaps',
    runtimeVerified: false, allStatesVerified: false, shell, controls, assets,
    limits: ['All three visibility Booleans are true in the supplied sample; false combinations and narrow/long-content reflow are not measured',
      'The content is an empty native SLOT, not evidence of a Markdown/PDF/image/HTML renderer or data-loading implementation',
      'Expand/close glyph source identities do not establish fullscreen, modal, route or dismissal behavior',
      'Header/content own separate borders and corners; root carries Mid shadow without fill or rendered border',
      'Focus/keyboard/disabled/loading/error/dark/mobile and consuming source/export behavior require product verification'], issues };
}
