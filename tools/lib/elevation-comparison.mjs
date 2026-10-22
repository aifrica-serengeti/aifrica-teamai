import fs from 'node:fs';
import path from 'node:path';

const read = file => JSON.parse(fs.readFileSync(file, 'utf8'));
const effects = items => items.map(effect => Object.fromEntries(
  ['type', 'visible', 'radius', 'offset', 'spread', 'blendMode', 'showShadowBehindNode', 'color'].map(key => [key, effect[key]]),
));

// Compatibility between independently captured design references, not browser or product verification.
export function inspectElevationCompatibility(designRoot) {
  const directory = path.join(designRoot, 'references');
  const elevation = read(path.join(directory, 'elevation.figma.json'));
  const calendar = read(path.join(directory, 'calendar.figma.json'));
  const switches = read(path.join(directory, 'switch.figma.json'));
  const levels = new Map(elevation.levels.map(level => [level.level, level]));
  const issues = [];
  const styleChecks = [];
  for (const level of elevation.levels) {
    const style = elevation.effectStyles.find(style => style.id === level.effectStyleId);
    const expected = style ? effects(style.effects) : [];
    const match = (!level.effectStyleId || Boolean(style)) && JSON.stringify(effects(level.effects)) === JSON.stringify(expected);
    if (level.effectStyleId && !style) issues.push(`${level.level}: missing referenced EffectStyle ${level.effectStyleId}`);
    if (!match) issues.push(`${level.level}: sample effects differ from referenced EffectStyle`);
    styleChecks.push({ level: level.level, effectStyleId: level.effectStyleId, status: match ? 'match' : 'mismatch' });
  }
  const comparisons = [];
  function compare(component, nodeId, visual, levelName, variant) {
    const level = levels.get(levelName);
    const match = JSON.stringify(effects(visual.effects)) === JSON.stringify(effects(level.effects));
    if (!match) issues.push(`${component} ${nodeId}: effects differ from ${levelName}`);
    comparisons.push({ component, nodeId, ...(variant ? { variant } : {}), level: levelName,
      status: match ? 'match' : 'mismatch', componentOpacity: visual.opacity, boardSampleOpacity: level.sample.visual.opacity });
  }
  compare('AgentHubCalendar', calendar.root.nodeId, calendar.styles[calendar.root.styleRef].visual, 'Mid');
  for (const variant of switches.variants) {
    const thumb = variant.children.find(node => node.name === 'thumb');
    if (!thumb) { issues.push(`${variant.nodeId}: missing Switch thumb`); continue; }
    compare('AgentHubSwitch thumb', thumb.nodeId, thumb.visual, 'Raised', variant.variant);
    if (variant.visual.effects.length) issues.push(`${variant.nodeId}: expected measured track with no shadow`);
  }
  return { schemaVersion: 1, solution: 'agent-hub', scope: 'Elevation samples/EffectStyles and independently captured component effects',
    runtimeVerified: false, styleChecks, comparisons,
    limits: ['Only Calendar root and four Switch thumbs compared; usage table is not an implemented component inventory',
      'Mid swatch opacity0.9 is not applied to Calendar opacity1; effect alpha and layer opacity are independent'], issues };
}
