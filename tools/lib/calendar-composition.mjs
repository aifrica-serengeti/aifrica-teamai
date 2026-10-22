import fs from 'node:fs';
import path from 'node:path';

const load = file => JSON.parse(fs.readFileSync(file, 'utf8'));
const flatten = node => [node, ...(node.children || []).flatMap(flatten)];
const numericEqual = (a, b) => typeof a === 'number' && typeof b === 'number' ? Math.abs(a - b) < 0.00001 : a === b;
const paintValues = paints => (paints || []).map(({ hex, opacity }) => ({ hex, opacity }));

// Compare independently measured composition/primitive snapshots. This does not inspect a consuming app.
export function inspectCalendarComposition(designRoot) {
  const referenceRoot = path.join(designRoot, 'references');
  const calendar = load(path.join(referenceRoot, 'calendar.figma.json'));
  const buttons = load(path.join(referenceRoot, 'button.figma.json'));
  const iconButtons = load(path.join(referenceRoot, 'icon-button.figma.json'));
  const manifest = load(path.join(designRoot, 'asset-manifest.json'));
  const nodes = flatten(calendar.root);
  const byId = new Map(nodes.map(node => [node.nodeId, node]));
  const style = node => calendar.styles[node.styleRef];
  const issues = [];
  const rows = [];
  const equal = (actual, expected, label) => {
    const matches = typeof expected === 'object' && expected !== null
      ? JSON.stringify(actual) === JSON.stringify(expected) : numericEqual(actual, expected);
    if (!matches) issues.push(`${label}: ${JSON.stringify(actual)} != ${JSON.stringify(expected)}`);
  };
  const controls = [
    { id: '3149:117355', component: 'AgentHubButton', source: '3073:390', type: 'tertiary', size: '32', state: 'enabled', role: 'cancel' },
    { id: '3149:117363', component: 'AgentHubButton', source: '3073:366', type: 'primary', size: '32', state: 'enabled', role: 'confirm' },
    { id: '3149:117331', component: 'AgentHubIconButton', source: '2427:25108', type: 'ghost', size: '24', state: 'default', role: 'month-toggle', glyphSource: '2372:37015', glyphPath: 'assets/icons/chevron-down/16.svg' },
    { id: '3149:117336', component: 'AgentHubIconButton', source: '2427:25106', type: 'ghost', size: '32', state: 'default', role: 'previous', glyphSource: '3017:75811', glyphPath: 'assets/icons/chevron-left/20.svg' },
    { id: '3149:117340', component: 'AgentHubIconButton', source: '2427:25106', type: 'ghost', size: '32', state: 'default', role: 'next', glyphSource: '3018:24737', glyphPath: 'assets/icons/chevron-right/20.svg' },
  ];
  for (const item of controls) {
    const before = issues.length;
    const node = byId.get(item.id);
    if (!node) { issues.push(`Missing calendar control ${item.id}`); continue; }
    const measured = style(node);
    const reference = (item.component === 'AgentHubButton' ? buttons : iconButtons).variants.find(variant =>
      variant.variant.type === item.type && variant.variant.size === item.size && variant.variant.state === item.state);
    if (!reference) { issues.push(`Missing primitive variant for ${item.role}`); continue; }
    equal(node.instance?.source?.id, item.source, `${item.role} source`);
    equal(reference.nodeId, item.source, `${item.role} reference identity`);
    for (const key of ['type', 'size', 'state']) equal(node.instance?.variant?.[key], item[key], `${item.role} variant.${key}`);
    for (const key of ['height', 'padding']) equal(measured.layout[key], reference.layout[key], `${item.role} layout.${key}`);
    // Older single-icon snapshots omit itemSpacing; only compare recorded primitive evidence.
    if (reference.layout.gap !== undefined) equal(measured.layout.gap, reference.layout.gap, `${item.role} layout.gap`);
    else equal(measured.layout.gap, 0, `${item.role} single-icon gap`);
    equal(measured.visual.radius, reference.visual.radius, `${item.role} radius`);
    equal(measured.visual.opacity, reference.visual.opacity, `${item.role} opacity`);
    equal(paintValues(measured.visual.fills), paintValues(reference.visual.fills), `${item.role} fills`);
    equal(paintValues(measured.visual.border.paints), paintValues(reference.visual.border.paints), `${item.role} border paints`);
    if (reference.visual.border.paints.length) {
      equal(measured.visual.border.width, reference.visual.border.width, `${item.role} border width`);
      equal(measured.visual.border.align, reference.visual.border.align, `${item.role} border alignment`);
    }
    const descendants = flatten(node).slice(1).filter(child => child.visible);
    if (item.component === 'AgentHubButton') {
      const label = descendants.find(child => child.type === 'TEXT');
      if (!label) issues.push(`${item.role}: no visible label`);
      else {
        const labelStyle = style(label);
        for (const key of ['fontSize', 'fontWeight', 'lineHeight', 'letterSpacing']) equal(labelStyle.text[key], reference.text[key], `${item.role} label.${key}`);
        equal(labelStyle.text.fontName, reference.text.font, `${item.role} font`);
        equal(paintValues(labelStyle.visual.fills), paintValues(reference.text.fills), `${item.role} label color`);
      }
      for (const key of ['leading-icon#3025:10', 'trailing-icon#3025:20']) equal(node.instance.componentProperties[key]?.value, false, `${item.role} ${key}`);
      equal(descendants.filter(child => child.type === 'INSTANCE').length, 0, `${item.role} visible icon/keycap slots`);
    } else {
      equal(measured.layout.width, reference.layout.width, `${item.role} width`);
      const glyph = descendants.find(child => child.type === 'INSTANCE');
      if (!glyph) issues.push(`${item.role}: no visible icon`);
      else {
        equal(glyph.instance?.source?.id, item.glyphSource, `${item.role} exact chevron source`);
        const baseline = reference.icons[0];
        for (const key of ['width', 'height']) equal(style(glyph).layout[key], baseline.layout[key], `${item.role} glyph.${key}`);
        for (const vector of flatten(glyph).filter(child => child.type === 'VECTOR')) {
          const current = style(vector);
          equal(current.stroke.width, baseline.glyphs[0].strokeWidth, `${item.role} glyph stroke`);
          equal(paintValues(current.visual.border.paints), paintValues(baseline.glyphs[0].paints.strokes), `${item.role} glyph color`);
        }
        const asset = manifest.icons.find(asset => asset.sources.some(source => source.nodeId === glyph.instance?.source?.id));
        if (!asset || !fs.existsSync(path.join(designRoot, asset.path))) issues.push(`${item.role}: missing exact local glyph asset`);
        equal(asset?.path, item.glyphPath, `${item.role} exact chevron asset`);
      }
    }
    rows.push({ role: item.role, nodeId: item.id, component: item.component, sourceNodeId: item.source,
      variant: { type: item.type, size: item.size, state: item.state },
      ...(item.glyphSource ? { glyphSourceNodeId: item.glyphSource, glyphAsset: item.glyphPath } : {}),
      status: issues.length === before ? 'match' : 'mismatch' });
  }
  return { schemaVersion: 1, solution: 'agent-hub', scope: 'Figma instance composition against standalone primitive snapshots',
    runtimeVerified: false, allStatesVerified: false, controls: rows,
    intentionalOverrides: ['footer label text and content-based width', 'footer leading/trailing icons disabled; no keycap child at size32', 'header glyph swaps to exact chevrons'],
    comparisonLimits: ['standalone IconButton snapshots omit itemSpacing; calendar single-icon gap is independently checked as 0'],
    calendarLocal: { nodeId: '3149:117326', name: 'month-select', note: '28px header composition; not standalone tiny AgentHubTextButton; use one interactive owner' }, issues };
}
