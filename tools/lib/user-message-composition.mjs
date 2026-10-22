import fs from 'node:fs';
import path from 'node:path';

// Inspect recorded Figma composition; no transcript or delivery runtime is implied.
export function inspectUserMessageComposition(designRoot) {
  const read = name => JSON.parse(fs.readFileSync(path.join(designRoot, 'references', name), 'utf8'));
  const message = read('message-user.figma.json');
  const composer = read('chat-composer.figma.json');
  const assets = read('message-user.assets.json');
  const issues = [], bubbles = [], reuse = [], hidden = [], textBindings = [];
  const equal = (actual, expected, label) => {
    const same = typeof actual === 'number' && typeof expected === 'number'
      ? Math.abs(actual - expected) < 0.0001 : JSON.stringify(actual) === JSON.stringify(expected);
    if (!same) issues.push(`${label}: ${JSON.stringify(actual)} != ${JSON.stringify(expected)}`);
  };
  const flatten = node => [node, ...(node.children || []).flatMap(flatten)];
  const chat = message.variants.find(node => node.variant.kind === 'chat');
  const agent = message.variants.find(node => node.variant.kind === 'agent');
  const scheduled = message.variants.find(node => node.variant.kind === 'schedule');
  if (!chat || !agent || !scheduled) return { issues: ['Missing one of the three measured user-message kinds'] };
  const inner = scheduled.children.find(node => node.name === 'message/user');
  if (!inner) return { issues: ['Missing scheduled inner bubble'] };
  const reference = message.styles[chat.styleRef];
  for (const [kind, node] of [['chat', chat], ['agent', agent], ['schedule', inner]]) {
    const start = issues.length, actual = message.styles[node.styleRef];
    for (const field of ['height', 'padding', 'gap', 'clipsContent', 'layoutMode', 'layoutSizingHorizontal', 'layoutSizingVertical']) {
      equal(actual.layout[field], reference.layout[field], `${kind} measured bubble ${field}`);
    }
    equal(actual.visual, reference.visual, `${kind} bubble visual`);
    const label = flatten(node).find(child => child.type === 'TEXT' && child.name === 'message');
    if (!label) issues.push(`${kind}: missing body text`);
    else {
      equal(label.componentPropertyReferences?.characters, 'message#2972:0', `${kind} body property`);
      equal(label.text, message.propertyDefinitions['message#2972:0'].defaultValue, `${kind} sample body`);
      const style = message.styles[label.styleRef];
      equal(style.text.fontSize, 16, `${kind} body font`);
      equal(style.text.lineHeight, { unit: 'PIXELS', value: 24 }, `${kind} body line height`);
      equal(style.visual.fills[0]?.hex, '#1C1C1C', `${kind} body color`);
      textBindings.push({ kind, nodeId: label.nodeId, property: label.componentPropertyReferences.characters });
    }
    bubbles.push({ kind, nodeId: node.nodeId, type: node.type, sourceReuse: false,
      status: issues.length === start ? 'match' : 'mismatch' });
    const storedArrow = node.children.find(child => child.type === 'INSTANCE' && child.visible === false);
    if (!storedArrow) issues.push(`${kind}: missing stored hidden-arrow record`);
    else {
      equal(storedArrow.instance?.source?.id, '2199:23721', `${kind} hidden-arrow original source`);
      hidden.push({ kind, nodeId: storedArrow.nodeId, rendered: false, sourceNodeId: storedArrow.instance.source.id });
    }
  }
  equal(inner.type, 'FRAME', 'scheduled inner bubble is a frame');
  equal(inner.instance, undefined, 'scheduled inner bubble is not a chat instance');
  const scheduleStart = issues.length;
  const outer = message.styles[scheduled.styleRef];
  equal(outer.visual.fills, [], 'schedule outer surface');
  equal(outer.visual.radius, 0, 'schedule outer radius');
  equal(outer.layout.gap, 8, 'schedule status gap');
  equal(outer.layout.counterAxisAlignItems, 'MAX', 'schedule right alignment');
  const status = scheduled.children.find(node => node.name === 'schedule-status');
  if (!status) issues.push('Missing schedule status row');
  else {
    const row = message.styles[status.styleRef];
    equal(row.layout.height + outer.layout.gap + message.styles[inner.styleRef].layout.height, outer.layout.height, 'schedule measured total height');
    equal(status.position.x + row.layout.width, outer.layout.width, 'schedule status right edge');
    const text = status.children.find(node => node.type === 'TEXT');
    equal(text?.componentPropertyReferences?.characters, 'schedule-status#3103:2', 'schedule status property');
    const icon = status.children.find(node => node.type === 'INSTANCE');
    const asset = assets.assets[0];
    equal(icon?.instance?.source?.id, asset.sourceNodeId, 'schedule exact source identity');
    if (icon) {
      equal(icon.instance.source.width, asset.sourceWidth, 'schedule native source width');
      const box = message.styles[icon.styleRef].layout;
      equal(box.width, asset.width, 'schedule effective width');
      equal(box.height, asset.height, 'schedule effective height');
      for (const vector of icon.children || []) {
        const stroke = message.styles[vector.styleRef].visual.border;
        equal(stroke.width, asset.strokeWidth, `${vector.nodeId} actual stroke`);
        equal(stroke.paints[0]?.hex, asset.color, `${vector.nodeId} actual color`);
      }
    }
  }
  const scheduleStatus = issues.length === scheduleStart ? 'match' : 'mismatch';
  const composerNodes = composer.variants.flatMap(flatten);
  for (const [sourceId, role] of [['2079:11964', 'Chip'], ['2019:118', 'Divider']]) {
    const start = issues.length;
    const actual = flatten(agent).find(node => node.instance?.source?.id === sourceId && node.visible);
    const prior = composerNodes.find(node => node.instance?.source?.id === sourceId && node.visible);
    if (!actual || !prior) { issues.push(`Missing common ${role} instance`); continue; }
    equal(actual.instance.variant, prior.instance.variant, `${role} common source variant`);
    const a = message.styles[actual.styleRef], b = composer.styles[prior.styleRef];
    equal(a.visual, b.visual, `${role} actual visual`);
    for (const key of ['height', 'maxWidth', 'padding', 'gap']) equal(a.layout[key], b.layout[key], `${role} layout ${key}`);
    if (role === 'Chip') {
      const label = actual.children.find(node => node.type === 'TEXT');
      const priorLabel = prior.children.find(node => node.type === 'TEXT');
      const first = message.styles[label.styleRef], second = composer.styles[priorLabel.styleRef];
      equal(first.text, second.text, 'common Chip typography');
      equal(first.visual, second.visual, 'common Chip label visual');
      equal(a.layout.width - first.layout.width, b.layout.width - second.layout.width, 'common Chip content-dependent width overhead');
    } else {
      equal(a.layout.width, b.layout.width, 'Divider total width including padding');
      const line = actual.children[0], previousLine = prior.children[0];
      equal(message.styles[line.styleRef].visual, composer.styles[previousLine.styleRef].visual, 'Divider line visual');
    }
    reuse.push({ role, nodeId: actual.nodeId, sourceNodeId: sourceId, comparedWith: prior.nodeId,
      referenceComponent: 'AgentHubChatComposer', status: issues.length === start ? 'match' : 'mismatch' });
  }
  const name = flatten(agent).find(node => node.componentPropertyReferences?.characters === 'agent-name#2972:3');
  if (!name) issues.push('Missing agent-name text binding');
  return { schemaVersion: 1, solution: 'agent-hub', scope: 'User-message samples and actual common leaf reuse',
    runtimeVerified: false, allStatesVerified: false, bubbles, reuse, hidden, textBindings,
    schedule: { nodeId: scheduled.nodeId, status: scheduleStatus,
      innerBubbleType: inner.type, innerBubbleSourceReuse: false },
    limits: ['User message only; no assistant/Markdown/delivery or scheduled execution runtime',
      'Shared Chip has a generic agent label; matching purple colors do not identify a workflow agent type',
      'Stored hidden arrows are not rendered controls; scheduled inner bubble is a matching frame, not a chat instance',
      'One-line fixed44px clipping is measured evidence, not approval to discard long user content'], issues };
}
