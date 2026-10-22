import fs from 'node:fs';
import path from 'node:path';

const read = file => JSON.parse(fs.readFileSync(file, 'utf8'));

// Check nested design instances against independently measured primitive variants, not product code.
export function inspectFilterChipComposition(designRoot) {
  const directory = path.join(designRoot, 'references');
  const group = read(path.join(directory, 'filter-chip-group.figma.json'));
  const chip = read(path.join(directory, 'filter-chip.figma.json'));
  const issues = [];
  const instances = [];
  const equal = (actual, expected, label) => {
    if (JSON.stringify(actual) !== JSON.stringify(expected)) issues.push(`${label}: ${JSON.stringify(actual)} != ${JSON.stringify(expected)}`);
  };
  for (const layout of group.variants) {
    const children = (layout.children || []).filter(node => node.type === 'INSTANCE' && node.visible);
    equal(children.length, 6, `${layout.variant.layout} measured sample count`);
    for (const [index, node] of children.entries()) {
      const start = issues.length;
      const selected = index === 0 ? 'true' : 'false';
      const sourceId = selected === 'true' ? '3092:25164' : '3092:25109';
      const variant = { size: 'md', selected, state: 'enabled' };
      const primitive = chip.variants.find(candidate => candidate.nodeId === sourceId);
      if (!primitive) { issues.push(`Missing primitive ${sourceId}`); continue; }
      const actualStyle = group.styles[node.styleRef];
      const referenceStyle = chip.styles[primitive.styleRef];
      equal(node.instance?.source?.id, sourceId, `${node.nodeId} source identity`);
      equal(node.instance?.variant, variant, `${node.nodeId} variant`);
      equal(primitive.variant, variant, `${node.nodeId} standalone variant`);
      for (const field of ['width', 'height', 'padding', 'gap', 'strokesIncludedInLayout']) {
        equal(actualStyle.layout[field], referenceStyle.layout[field], `${node.nodeId} ${field}`);
      }
      equal(actualStyle.visual, referenceStyle.visual, `${node.nodeId} visual`);
      for (const property of ['leading icon#3092:31', 'trailing icon#3092:155', 'count#3092:93']) {
        equal(node.instance?.componentProperties?.[property]?.value, false, `${node.nodeId} ${property}`);
      }
      const actualLabels = (node.children || []).filter(child => child.visible);
      equal(actualLabels.length, 1, `${node.nodeId} visible children`);
      const label = actualLabels.find(child => child.type === 'TEXT');
      const referenceLabel = primitive.children.find(child => child.type === 'TEXT' && child.name === 'label');
      if (!label || !referenceLabel) issues.push(`${node.nodeId} missing measured label`);
      else {
        const actual = group.styles[label.styleRef];
        const reference = chip.styles[referenceLabel.styleRef];
        equal(label.text, referenceLabel.text, `${node.nodeId} sample label`);
        equal(label.position, referenceLabel.position, `${node.nodeId} label position`);
        equal(actual.text, reference.text, `${node.nodeId} label font/ellipsis`);
        equal(actual.visual.fills, reference.visual.fills, `${node.nodeId} label paint`);
        for (const field of ['width', 'height']) equal(actual.layout[field], reference.layout[field], `${node.nodeId} label ${field}`);
      }
      instances.push({ layout: layout.variant.layout, nodeId: node.nodeId, sourceNodeId: sourceId, variant,
        status: issues.length === start ? 'match' : 'mismatch' });
    }
  }
  return { schemaVersion: 1, solution: 'agent-hub', scope: 'Figma group instances against standalone filter-chip snapshots',
    runtimeVerified: false, allStatesVerified: false,
    limits: ['Six label-only md/enabled chips per measured layout; first selected is a design sample',
      'Hidden icon/count slot geometry, focused/dark and browser selection/scroll behavior are not verified'],
    instances, issues };
}
