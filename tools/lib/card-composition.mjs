import { createHash } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

const walk = node => [node, ...(node.children ?? []).flatMap(walk)];

export function inspectCardComposition(designRoot) {
  const read = name => JSON.parse(fs.readFileSync(path.join(designRoot, 'references', name), 'utf8'));
  const snapshot = read('card.figma.json'), variables = read('card.variables.figma.json');
  const manifest = read('card.assets.json'), elevation = read('elevation.figma.json');
  const buttons = read('button.figma.json'), iconButtons = read('icon-button.figma.json');
  const issues = [], families = [], nested = [], assets = [];
  const equal = (actual, expected, label) => {
    const same = typeof actual === 'number' && typeof expected === 'number'
      ? Math.abs(actual - expected) < 0.0001 : JSON.stringify(actual) === JSON.stringify(expected);
    if (!same) issues.push(`${label}: ${JSON.stringify(actual)} != ${JSON.stringify(expected)}`);
  };
  const check = (condition, label) => { if (!condition) issues.push(label); };
  const status = start => issues.length === start ? 'match' : 'mismatch';
  const all = snapshot.roots.flatMap(root => walk(root.tree));
  const node = id => {
    const found = all.find(target => target.nodeId === id);
    if (!found) throw new Error(`Missing measured card node ${id}`);
    return found;
  };
  const root = id => snapshot.roots.find(target => target.tree.nodeId === id);
  const style = target => snapshot.styles[target.styleRef];
  const size = target => [style(target).layout.width, style(target).layout.height];
  const color = target => style(target).visual.fills[0]?.hex;
  const descendants = (target, name) => walk(target).filter(child => child.name === name);
  const effect = name => elevation.effectStyles.find(target => target.name === name);
  equal(snapshot.implementation, { status: 'unmapped', source: null, export: null }, 'consumer source/export remains unmapped');
  equal(all.length, 477, 'five complete card trees including hidden descendants');
  equal(all.filter(target => target.instance).length, 51, 'actual nested instance count');
  equal(all.filter(target => target.visible === false).length, 4, 'only four explicitly hidden FileItem nodes');
  equal(snapshot.roots.length, 5, 'five distinct card families');
  const specs = [
    ['3128:25559', 'AgentHubFileItem', 1, 512, 68, 12],
    ['2427:25252', 'AgentHubDataCard', 3, 120, 120, 12],
    ['3100:114430', 'AgentHubThumbnailCard', 5, 324, 343.50001525878906, 24],
    ['3100:171', 'AgentHubScheduleCard', 10, 324, 118, 24],
    ['3095:143', 'AgentHubItemCard', 6, 324, 146, 24],
  ];
  for (const [id, componentId, count, width, height, radius] of specs) {
    const start = issues.length, owner = root(id), variants = owner.tree.type === 'COMPONENT' ? [owner.tree] : owner.tree.children;
    equal(owner.componentId, componentId, `${id} distinct component registry identity`);
    equal(variants.length, count, `${componentId} supplied layout count`);
    for (const variant of variants) {
      const box = style(variant), state = variant.variant?.state ?? 'default';
      equal(box.layout.width, width, `${variant.nodeId} measured width`);
      equal(box.layout.height, height, `${variant.nodeId} measured height`);
      equal(box.visual.radius, radius, `${variant.nodeId} measured radius`);
      equal(box.visual.opacity, 1, `${variant.nodeId} does not disable through global opacity`);
      equal(box.layout.overflowDirection, 'NONE', `${variant.nodeId} no measured scroll runtime`);
      equal(box.visual.border.width, 1, `${variant.nodeId} border width reserves stable geometry`);
      equal(box.visual.border.align, 'INSIDE', `${variant.nodeId} inside border`);
      equal(box.layout.strokesIncludedInLayout, componentId !== 'AgentHubFileItem', `${variant.nodeId} border layout contract`);
      const expectedFill = state === 'hovered' ? '#F8F8F8' : state === 'pressed' ? '#F4F4F4'
        : ['selected', 'accent'].includes(state) ? '#EBF3FF' : '#FFFFFF';
      equal(color(variant), expectedFill, `${variant.nodeId} ${state} background`);
      equal(box.visual.border.paints[0]?.hex, state === 'accent' ? '#FFFFFF' : state === 'selected' ? '#3B82F6' : '#DDDDDD', `${variant.nodeId} ${state} border paint`);
      equal(box.visual.border.paints[0]?.opacity, state === 'accent' ? 0 : 1, `${variant.nodeId} accent keeps transparent border space`);
      let shadow = componentId === 'AgentHubDataCard' ? 'Raised' : componentId === 'AgentHubThumbnailCard' ? 'Overflow' : null;
      if (['hovered', 'pressed'].includes(state) && componentId !== 'AgentHubDataCard') shadow = 'Mid';
      equal(box.visual.effects, shadow ? effect(shadow).effects : [], `${variant.nodeId} ordered ${shadow ?? 'no'} shadow`);
      if (shadow) equal(variant.effectStyleId, effect(shadow).id, `${variant.nodeId} actual effect style identity`);
      else check(!variant.effectStyleId, `${variant.nodeId}: unexpected effect style identity`);
      if (componentId !== 'AgentHubFileItem' && componentId !== 'AgentHubDataCard') {
        for (const text of walk(variant).filter(target => target.type === 'TEXT')) {
          const expected = state === 'disabled' ? '#AAAAAA' : text.name === 'title' ? '#1C1C1C'
            : text.name === 'description' ? '#555555' : text.name === 'label' && variant.variant?.status === 'active' ? '#1C1C1C' : '#757575';
          equal(color(text), expected, `${text.nodeId} state-specific text paint`);
        }
      }
    }
    families.push({ componentId, rootNodeId: id, suppliedLayouts: count, width, height, radius, status: status(start) });
  }

  const fileStart = issues.length, file = root('3128:25559'), fileRoot = file.tree;
  equal(file.propertyDefinitions['size#3128:4'], { type: 'BOOLEAN', defaultValue: false }, 'file size optional default');
  equal(file.propertyDefinitions['button#3128:5'], { type: 'BOOLEAN', defaultValue: true }, 'file action default');
  equal(style(fileRoot).layout.padding, { left: 12, right: 16, top: 12, bottom: 12 }, 'file row padding');
  equal(style(fileRoot).layout.gap, 12, 'file row gap');
  equal(style(fileRoot).visual.effects, [], 'file row no shadow');
  const tile = node('3128:25560'), sheet = node('I3128:25560;3128:25495');
  equal(tile.instance.source.id, '3128:25501', 'actual spreadsheet file-icon source');
  equal(size(tile), [44, 44], 'file tile actual44');
  equal(style(tile).layout.clipsContent, true, 'file icon clips shifted sheet');
  equal(size(sheet), [44, 44], 'sheet retains full44 frame');
  equal(sheet.position, { x: 8, y: 8 }, 'sheet local offset is not zeroed');
  equal(style(sheet).visual.fills[0]?.type, 'GRADIENT_LINEAR', 'file sheet gradient survives');
  equal(style(sheet).visual.fills[0]?.gradientStops?.length, 2, 'file sheet gradient stop count');
  const meta = node('3128:25549'), fileSize = node('3128:25550'), sizeDivider = node('3128:25551'), divider = node('3128:25553');
  equal(style(meta).layout.gap, -4, 'file meta measured negative gap');
  for (const target of [fileSize, sizeDivider]) {
    equal(target.visible, false, `${target.nodeId} size branch hidden`);
    equal(target.componentPropertyReferences?.visible, 'size#3128:4', `${target.nodeId} size Boolean owner`);
  }
  equal(divider.instance.source.id, '2874:45712', 'file divider actual source is distinct from other Divider references');
  equal(size(divider), [17, 8], 'file divider geometry includes horizontal insets');
  for (const [id, prop] of [['3128:25548', 'title#3128:0'], ['3128:25552', 'file-type#3128:1'], ['3128:25554', 'extension#3128:2'], ['3128:25550', 'file-size#3128:3']]) {
    equal(node(id).componentPropertyReferences?.characters, prop, `${id} text property binding`);
  }
  const fileButton = node('3074:100371'), tertiary = buttons.variants.find(variant => variant.nodeId === '3109:144');
  equal(fileButton.instance.source.id, tertiary.nodeId, 'file actual tertiary28 Button source');
  equal(size(fileButton), [85, 28], 'file action label override width');
  for (const key of ['height', 'padding', 'gap']) equal(style(fileButton).layout[key], tertiary.layout[key], `file existing Button ${key}`);
  equal(style(fileButton).visual.radius, tertiary.visual.radius, 'file existing Button radius');
  equal(style(fileButton).layout.strokesIncludedInLayout, false, 'file action border does not add two pixels');
  equal(fileButton.componentPropertyReferences ?? {}, {}, 'file action has no observed visibility binding despite Boolean definition');
  equal(node('I3074:100371;3109:152').visible, false, 'file leading glyph hidden');
  equal(node('I3074:100371;3110:958').visible, false, 'file keycap group hidden');
  const trailing = node('I3074:100371;3109:155');
  equal(trailing.instance.source.id, '2372:37015', 'file actual trailing chevron source');
  equal(size(trailing), [16, 16], 'file trailing native16 geometry');
  nested.push({ componentId: 'AgentHubFileItem', sourceNodeIds: ['3128:25501', '2874:45712', '3109:144', '2372:37015'], status: status(fileStart) });

  const dataStart = issues.length, data = root('2427:25252');
  equal(data.propertyDefinitions.state.variantOptions, ['enabled', 'hovered', 'pressed'], 'DataCard has only three measured states');
  for (const variant of data.tree.children) {
    equal(style(variant).layout.padding, { left: 12, right: 12, top: 12, bottom: 12 }, `${variant.nodeId} DataCard padding`);
    const texts = walk(variant).filter(target => target.type === 'TEXT'), chip = walk(variant).find(target => target.instance);
    equal(chip.instance.source.id, '2079:12042', `${chip.nodeId} actual common Pill source, not AgentTypeChip`);
    equal(chip.instance.variant, { Style: 'Pill', Size: 'Small', State: 'Enabled', 'Leading icon': 'False', 'Trailing icon button': 'False' }, `${chip.nodeId} common Pill variant`);
    equal(size(chip), [44, 20], `${chip.nodeId} text-driven Pill width override`);
    equal(chip.position, { x: 13, y: 87 }, `${chip.nodeId} border-aware lower inset`);
    equal(style(chip).visual.radius, 10, `${chip.nodeId} common Pill geometry`);
    for (const [name, sizeValue, line, weight, paint] of [['title', 14, 20, 400, '#1C1C1C'], ['description', 10, 12, 400, '#757575']]) {
      const target = texts.find(text => text.name === name);
      equal([style(target).text.fontSize, style(target).text.lineHeight.value, style(target).text.fontWeight], [sizeValue, line, weight], `${target.nodeId} DataCard type ramp`);
      equal(color(target), paint, `${target.nodeId} DataCard text paint`);
    }
    equal(texts.find(target => target.nodeId.startsWith('I')).text, 'Type', `${variant.nodeId} generic Pill label`);
  }
  nested.push({ componentId: 'AgentHubDataCard', sourceNodeIds: ['2079:12042'], status: status(dataStart) });

  const thumbnailStart = issues.length, thumbnail = root('3100:114430');
  for (const variant of thumbnail.tree.children) {
    const image = descendants(variant, 'thumbnail')[0], content = descendants(variant, 'content')[0], dot = descendants(variant, 'dot')[0];
    equal(style(variant).layout.clipsContent, true, `${variant.nodeId} thumbnail surface clips`);
    equal(size(image), [322, 241.50001525878906], `${image.nodeId} measured4:3 placeholder`);
    equal(image.position, { x: 1, y: 1 }, `${image.nodeId} thumbnail border inset`);
    equal(image.type, 'FRAME', `${image.nodeId} placeholder is not an image renderer`);
    equal(color(image), '#F4F4F4', `${image.nodeId} placeholder fill`);
    equal(size(content), [322, 100], `${content.nodeId} thumbnail content block`);
    equal(content.position, { x: 1, y: 242.50001525878906 }, `${content.nodeId} fractional measured position`);
    equal(style(content).layout.padding, { left: 16, right: 16, top: 16, bottom: 16 }, `${content.nodeId} content padding`);
    equal(size(dot), [8, 8], `${dot.nodeId} dot size`);
    equal(color(dot), variant.variant.state === 'disabled' ? '#AAAAAA' : '#3B82F6', `${dot.nodeId} dot state paint`);
    for (const [target, property] of [[image, 'thumbnail#3100:3'], [dot, 'dot#3100:4'], [descendants(variant, 'description')[0], 'description#3100:5']]) {
      equal(target.componentPropertyReferences?.visible, property, `${target.nodeId} optional branch binding`);
      equal(target.visible, true, `${target.nodeId} supplied branch visible`);
    }
  }
  nested.push({ componentId: 'AgentHubThumbnailCard', actualNestedInstances: 0, suppliedOptionalOffLayouts: 0, status: status(thumbnailStart) });

  const scheduleStart = issues.length, schedule = root('3100:171');
  equal(schedule.propertyDefinitions.status.variantOptions, ['active', 'paused'], 'Schedule status axis remains independent of interaction state');
  for (const variant of schedule.tree.children) {
    const paused = variant.variant.status === 'paused', disabled = variant.variant.state === 'disabled';
    const badge = descendants(variant, 'run-status')[0], toggle = descendants(variant, 'toggle-button')[0];
    equal(size(badge), [paused ? 89 : 60, 24], `${badge.nodeId} status label-driven width`);
    equal(size(badge.children[0]), [14, 14], `${badge.nodeId} badge glyph resized14`);
    equal(badge.children[0].instance.source.id, paused ? '2751:14602' : '2312:46700', `${badge.nodeId} actual status glyph source`);
    equal(badge.children[1].text, paused ? '일시 중지됨' : 'label', `${badge.nodeId} literal sample is not a live scheduler`);
    equal(toggle.type, 'FRAME', `${toggle.nodeId} toggle is not an IconButton instance`);
    check(!toggle.instance, `${toggle.nodeId}: invented IconButton source mapping`);
    equal(size(toggle), [24, 24], `${toggle.nodeId} toggle frame24`);
    const glyph = toggle.children[0];
    equal(size(glyph), [16, 16], `${glyph.nodeId} toggle glyph16 differs from badge14`);
    equal(glyph.position, { x: 4, y: 4 }, `${glyph.nodeId} toggle glyph inset`);
    equal(glyph.instance.source.id, paused ? '2751:16870' : '2751:14602', `${glyph.nodeId} actual pause/play source`);
    for (const vector of walk(glyph).filter(target => style(target).visual.border.paints.length)) {
      equal(style(vector).visual.border.paints[0].hex, disabled ? '#AAAAAA' : '#757575', `${vector.nodeId} toggle disabled paint`);
    }
  }
  nested.push({ componentId: 'AgentHubScheduleCard', suppliedStateStatusPairs: 10, toggleKind: 'FRAME', toggleGlyphSize: 16, statusGlyphSize: 14, status: status(scheduleStart) });

  const itemStart = issues.length, item = root('3095:143');
  for (const variant of item.tree.children) {
    const state = variant.variant.state, disabled = state === 'disabled', more = descendants(variant, 'more')[0];
    const expectedSource = disabled ? '2909:49136' : '2909:49139', baseline = iconButtons.variants.find(target => target.nodeId === expectedSource);
    equal(more.instance.source.id, expectedSource, `${more.nodeId} actual ghost20 source`);
    equal(more.instance.variant, baseline.variant, `${more.nodeId} nested state is not inherited hover/pressed`);
    equal(size(more), [20, 20], `${more.nodeId} actual control is20, not24`);
    equal(style(more).visual.radius, baseline.visual.radius, `${more.nodeId} existing ghost20 radius`);
    const moreGlyph = more.children[0];
    equal(moreGlyph.instance.source.id, '3018:24913', `${moreGlyph.nodeId} more source24`);
    equal(size(moreGlyph), [16, 16], `${moreGlyph.nodeId} source24 is resized16`);
    equal(moreGlyph.position, { x: 2, y: 2 }, `${moreGlyph.nodeId} more glyph inset`);
    const pins = descendants(variant, 'pin-button');
    equal(pins.length, ['hovered', 'pressed'].includes(state) ? 1 : 0, `${variant.nodeId} pin exists only in measured hover/press layouts`);
    for (const pin of pins) {
      equal(pin.type, 'FRAME', `${pin.nodeId} pin control is a FRAME`);
      equal(pin.componentPropertyReferences?.visible, 'pin#3095:7', `${pin.nodeId} pin property binding`);
      equal(pin.children[0].instance.source.id, '2308:44294', `${pin.nodeId} actual pin glyph source`);
    }
    const chat = descendants(variant, 'chat-button')[0];
    equal(chat.type, 'FRAME', `${chat.nodeId} chat control is a FRAME`);
    equal(size(chat), [24, 24], `${chat.nodeId} chat frame24`);
    equal(chat.children[0].instance.source.id, '2320:15942', `${chat.nodeId} actual chat glyph source`);
    equal(size(chat.children[0]), [16, 16], `${chat.nodeId} chat glyph16`);
    const logos = walk(variant).filter(target => style(target).visual.fills.some(paint => paint.type === 'IMAGE'));
    equal(logos.length, 2, `${variant.nodeId} two dynamic tool-image samples`);
    equal(logos.map(target => style(target).visual.fills[0].imageHash), ['449621c003b3a3bb7e8f972a03ace0484928f8f9', 'a6e6efe5773829825b4cce3abd9922cdfe849eb2'], `${variant.nodeId} original image identities`);
    for (const logo of logos) equal(style(logo).visual.fills[0].filters.saturation, disabled ? -1 : 0, `${logo.nodeId} disabled saturation is not global opacity`);
    for (const [name, property] of [['dot', 'dot#3095:4'], ['description', 'description#3095:5'], ['tools', 'tools#3095:6']]) {
      equal(descendants(variant, name)[0].componentPropertyReferences?.visible, property, `${variant.nodeId} ${name} visibility owner`);
    }
  }
  nested.push({ componentId: 'AgentHubItemCard', actualMoreControlSize: 20, actualMoreGlyphSize: 16, suppliedPinLayouts: 2, status: status(itemStart) });

  equal(snapshot.transforms.length, 6, 'six nonidentity pin transforms');
  for (const transform of snapshot.transforms) {
    equal(transform.rotation, -45, `${transform.nodeId} original pin rotation`);
    const transformed = all.find(target => target.nodeId === transform.nodeId);
    check(Boolean(transformed), `${transform.nodeId}: transform points to a missing pin node`);
    if (!transformed) continue;
    const position = transformed.position;
    equal(transform.relativeTransform, [[0.7071067690849304, -0.7071067690849304, position.x], [0.7071067690849304, 0.7071067690849304, position.y]], `${transform.nodeId} pin transform matrix`);
  }
  const sourceTile = snapshot.sourceEvidence.fileIconSource;
  equal(sourceTile.nodeId, tile.instance.source.id, 'whole file tile source evidence identity');
  equal(walk(sourceTile).length, 7, 'whole file tile source evidence contains all layers');
  for (const [index, original] of walk(sourceTile).entries()) {
    const actual = walk(tile)[index];
    equal(style(original).visual, style(actual).visual, `${original.nodeId} whole tile source/instance visual`);
    equal(style(original).bindings, style(actual).bindings, `${original.nodeId} whole tile source/instance bindings`);
    for (const [key, value] of Object.entries(style(original).layout)) equal(value, style(actual).layout[key], `${original.nodeId} whole tile source/instance ${key}`);
    if (index > 0) equal(original.position, actual.position, `${original.nodeId} whole tile child placement`);
  }
  for (const owner of snapshot.roots) {
    for (const group of owner.prototypeReactionGroups) equal(group.reactions, [], `${owner.componentId} no measured prototype behavior`);
  }
  equal(manifest.assets.length, 22, 'complete asset evidence entries');
  equal(manifest.assets.filter(asset => asset.referenceOnly).map(asset => asset.role), ['file-spreadsheet-glyph-24', 'pin-fragment-reference'], 'partial fragments remain reference only');
  equal(manifest.exceptions.length, 2, 'both rejected disabled placeholder records remain separate');
  for (const exception of manifest.exceptions) {
    const target = node(exception.sourceNodeId), paint = style(target).visual.fills[0];
    equal(exception.status, 'rejected-runtime-placeholder', `${exception.sourceNodeId} placeholder is not a usable logo`);
    equal([exception.providedWidth, exception.providedHeight, exception.providedBytes], [32, 32, 159], `${exception.sourceNodeId} rejected original dimensions`);
    equal(exception.actualImageHash, paint.imageHash, `${exception.sourceNodeId} actual image identity`);
    equal(exception.actualSaturation, paint.filters.saturation, `${exception.sourceNodeId} actual disabled filter`);
    check(exception.providedSha1 !== exception.actualImageHash, `${exception.sourceNodeId}: placeholder must not impersonate the original image`);
    check(manifest.assets.some(asset => asset.path === exception.replacementPath && asset.dynamicSample), `${exception.sourceNodeId}: missing verified original image replacement`);
  }
  for (const asset of manifest.assets) {
    const start = issues.length, bytes = fs.readFileSync(path.join(designRoot, asset.path));
    const target = all.find(target => target.nodeId === asset.sourceNodeId);
    check(Boolean(target), `${asset.path}: asset points to a missing measured node`);
    if (!target) { assets.push({ role: asset.role, path: asset.path, status: status(start) }); continue; }
    equal(target.type, asset.sourceKind, `${asset.path} actual export kind`);
    equal(size(target), [asset.displayWidth, asset.displayHeight], `${asset.path} measured display frame`);
    if (target.type === 'INSTANCE') equal(target.instance.source.id, asset.actualSourceNodeId, `${asset.path} actual source identity`);
    equal(bytes.length, asset.bytes, `${asset.path} bytes`);
    equal(createHash('sha256').update(bytes).digest('hex'), asset.sha256, `${asset.path} SHA256`);
    check(bytes.length > 0, `${asset.path}: empty asset`);
    if (asset.path.endsWith('.png')) {
      equal(bytes.subarray(0, 8).toString('hex'), '89504e470d0a1a0a', `${asset.path} PNG signature`);
      equal([bytes.readUInt32BE(16), bytes.readUInt32BE(20)], [asset.width, asset.height], `${asset.path} PNG native dimensions`);
      const sha1 = createHash('sha1').update(bytes).digest('hex');
      equal(sha1, asset.imageHash, `${asset.path} PNG matches Figma image identity`);
      equal(sha1, style(target).visual.fills[0].imageHash, `${asset.path} PNG matches actual source paint`);
      equal(asset.dynamicSample, true, `${asset.path} image remains replaceable data`);
    } else {
      const svg = bytes.toString('utf8');
      equal(Number(/\bwidth="([\d.]+)"/.exec(svg)?.[1]), asset.width, `${asset.path} SVG native width`);
      equal(Number(/\bheight="([\d.]+)"/.exec(svg)?.[1]), asset.height, `${asset.path} SVG native height`);
      equal(/\bviewBox="([^"]+)"/.exec(svg)?.[1].split(/\s+/).map(Number), [0, 0, asset.width, asset.height], `${asset.path} SVG native viewBox`);
      if (asset.colors) equal([...new Set([...svg.matchAll(/(?:fill|stroke)="([^"]+)"/g)].map(match => /^#/.test(match[1]) ? match[1].toUpperCase() : match[1]).filter(value => value !== 'none'))].sort(), [...asset.colors].sort(), `${asset.path} native paint`);
      const strokes = [...new Set((svg.match(/<[^!?][^>]*>/g) ?? []).filter(tag => /\bstroke="(?!none)/.test(tag))
        .map(tag => Number(/\bstroke-width="([\d.]+)"/.exec(tag)?.[1] ?? 1)))].sort((a, b) => a - b);
      equal(strokes, [...asset.strokeWidths].sort((a, b) => a - b), `${asset.path} native stroke widths`);
      check(!/<script\b|<foreignObject\b|(?:href|src)=["'](?:https?:|\/\/|data:)|\bon[a-z]+\s*=/i.test(svg), `${asset.path}: unexpected executable or remote SVG content`);
    }
    assets.push({ role: asset.role, path: asset.path, status: status(start) });
  }
  equal(variables.variables.length, 46, 'complete variable closure');
  equal(variables.collections.length, 4, 'all variable collections including external Divider aliases');
  return { schemaVersion: 1, solution: 'agent-hub', scope: 'Five distinct card families, 25 supplied layouts and actual nested overrides',
    runtimeVerified: false, allStatesVerified: false, families, nested, assets,
    limits: ['25 static layouts do not establish focus/keyboard/disabled guards, selection ownership or responsive/long-content behavior',
      'The common Card dependency is an adoption contract, not an observed common Card instance in these Figma trees',
      'DataCard has three supplied states; the other card state axes and optional branches must not expand that evidence',
      'File download/dropdown, Schedule pause/resume and Item pin/chat/more require explicit consuming-product callbacks and verified source/export mappings',
      'FileItem defines button=true, but its supplied Button has no visible property reference; connecting a show-action API is a proposed consuming-product contract',
      'Tool logos are replaceable image content; ThumbnailCard contains a plain placeholder FRAME rather than an implemented image renderer'], issues };
}
