import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { ROOT } from './lib/config.mjs';

const designRoot = path.join(ROOT, 'docs/agent-hub/design');
const read = relative => fs.readFileSync(path.join(designRoot, relative), 'utf8');
const manifest = JSON.parse(read('references/components-refresh.assets.json'));
const controls = JSON.parse(read('references/runtime-controls-refresh.figma.json'));
const metadata = read('references/components-refresh-2026-11-05.metadata.xml');

// 원본 속성값을 읽어 수치·참조 관계를 비교하며 생성 코드의 표현을 재구현하지 않습니다.
const attributes = tag => Object.fromEntries(
  [...tag.matchAll(/([\w:-]+)\s*=\s*(["'])(.*?)\2/gs)].map(match => [match[1], match[3]]),
);
const tags = (xml, name) => [...xml.matchAll(new RegExp(`<${name}\\b[^>]*>`, 'g'))].map(match => attributes(match[0]));
const metadataNodes = new Map(
  [...metadata.matchAll(/<(?:frame|symbol)\b[^>]*>/g)]
    .map(match => attributes(match[0]))
    .map(node => [node.id, node]),
);
const metadataFamily = id => {
  const escaped = id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const content = metadata.match(new RegExp(`<frame\\b[^>]*id="${escaped}"[^>]*>([\\s\\S]*?)<\\/frame>`))?.[1];
  assert(content, `metadata family: ${id}`);
  return tags(content, 'symbol');
};
const numericBox = node => [Number(node.width), Number(node.height)];

function assertSafeSvg(svg, label) {
  assert.doesNotMatch(svg, /<!DOCTYPE\b|<!ENTITY\b|<script\b|<foreignObject\b|\bon[a-z]+\s*=|javascript\s*:|@import\b/i, label);
  const ids = [...svg.matchAll(/\bid\s*=\s*["']([^"']+)["']/g)].map(match => match[1]);
  assert.equal(new Set(ids).size, ids.length, `${label}: duplicate id`);
  const localIds = new Set(ids);
  for (const match of svg.matchAll(/url\(\s*(["']?)(.*?)\1\s*\)/g)) {
    const reference = match[2].trim();
    assert.match(reference, /^#[\w:.-]+$/, `${label}: external paint reference`);
    assert(localIds.has(reference.slice(1)), `${label}: unresolved ${reference}`);
  }
  for (const match of svg.matchAll(/\b(?:href|xlink:href|src)\s*=\s*["']([^"']*)["']/g)) {
    assert.match(match[1], /^#[\w:.-]+$/, `${label}: external resource`);
    assert(localIds.has(match[1].slice(1)), `${label}: unresolved ${match[1]}`);
  }
}

// Markdown 표를 구조화하여 문장 변경과 관계없이 계약 수치를 원본 관찰과 대조합니다.
function tableRows(markdown) {
  return markdown.split('\n')
    .filter(line => /^\s*\|/.test(line))
    .map(line => line.trim().slice(1, -1).split('|').map(cell => cell.trim().replace(/`/g, '')))
    .filter(cells => !cells.every(cell => /^:?-+:?$/.test(cell)));
}
function tableCell(rows, key, column = 1) {
  const row = rows.find(cells => cells[0] === key);
  assert(row && row[column] !== undefined, `missing table field: ${key}/${column}`);
  return row[column];
}
function dimensions(text) {
  const match = text.match(/(\d+(?:\.\d+)?)\s*×\s*(\d+(?:\.\d+)?)/);
  assert(match, `missing dimensions: ${text}`);
  return [Number(match[1]), Number(match[2])];
}
function metric(text, name) {
  const match = text.match(new RegExp(`${name}\\s*([\\d.]+)`));
  assert(match, `missing ${name}: ${text}`);
  return Number(match[1]);
}

test('컴포넌트 갱신 자산102개는 정확한 바이트·native 크기·안전한 내부 SVG 참조를 보존한다', () => {
  assert.equal(manifest.solution, 'agent-hub');
  assert.equal(manifest.assets.length, 102);
  assert.equal(new Set(manifest.assets.map(asset => asset.sourceAsset)).size, 102);
  assert.equal(manifest.assets.filter(asset => asset.format === 'svg').length, 100);
  assert.equal(manifest.assets.filter(asset => asset.format === 'png').length, 2);
  const byLocalPath = new Map();

  for (const asset of manifest.assets) {
    const label = `${asset.sourceAsset} -> ${asset.path}`;
    assert.match(asset.sourceAsset, /^[a-f\d]{40}\.(svg|png)$/i, label);
    assert.match(asset.path, /^assets\/[a-z\d/-]+\.(svg|png)$/, label);
    assert.equal(path.extname(asset.path).slice(1), asset.format, label);
    const resolved = path.resolve(designRoot, asset.path);
    assert(resolved.startsWith(`${designRoot}${path.sep}`), label);
    assert(asset.uses.length > 0, `${label}: source usage`);
    const bytes = fs.readFileSync(resolved);
    assert.equal(bytes.length, asset.bytes, label);
    assert.equal(createHash('sha256').update(bytes).digest('hex'), asset.sha256, label);
    assert(asset.nativeWidth > 0 && asset.nativeHeight > 0, label);

    // 중복 export는 동일 바이트일 때만 기존 경로를 공유할 수 있습니다.
    const identity = [asset.sha256, asset.bytes, asset.format, asset.nativeWidth, asset.nativeHeight, asset.viewBox];
    if (byLocalPath.has(asset.path)) assert.deepEqual(identity, byLocalPath.get(asset.path), label);
    else byLocalPath.set(asset.path, identity);

    if (asset.format === 'svg') {
      const svg = bytes.toString('utf8');
      const rootTag = svg.match(/<svg\b[^>]*>/)?.[0];
      assert(rootTag, label);
      assert.equal(rootTag, asset.rootTag, `${label}: original root attributes`);
      const root = attributes(rootTag);
      assert.deepEqual([Number(root.width), Number(root.height)], [asset.nativeWidth, asset.nativeHeight], label);
      const viewBox = root.viewBox.split(/\s+/).map(Number);
      assert.equal(viewBox.length, 4, label);
      assert(viewBox.every(Number.isFinite), label);
      assert.deepEqual(viewBox, asset.viewBox, label);
      assertSafeSvg(svg, label);
    } else {
      assert.equal(asset.rootTag, null, label);
      assert.equal(bytes.subarray(0, 8).toString('hex'), '89504e470d0a1a0a', label);
      assert.equal(bytes.readUInt32BE(8), 13, `${label}: IHDR length`);
      assert.equal(bytes.subarray(12, 16).toString('ascii'), 'IHDR', label);
      assert.deepEqual([bytes.readUInt32BE(16), bytes.readUInt32BE(20)], [asset.nativeWidth, asset.nativeHeight], label);
      assert.equal(bytes[26], 0, `${label}: PNG compression method`);
      assert.equal(bytes[27], 0, `${label}: PNG filter method`);
    }
  }
  assert.equal(byLocalPath.size, 96, '102개 원본 export 중 정확히 중복된6개만 로컬 파일을 공유한다');
});

test('SVG 안전성 검사는 외부 참조·실행 코드·빠진 gradient를 실제로 차단한다', () => {
  const valid = '<svg width="16" height="16"><defs><linearGradient id="paint"/></defs><path fill="url(#paint)"/></svg>';
  assert.doesNotThrow(() => assertSafeSvg(valid, 'valid'));
  const invalid = [
    valid.replace('id="paint"', 'id="different"'),
    valid.replace('url(#paint)', 'url(https://example.com/paint.svg)'),
    valid.replace('<path ', '<path onload="run()" '),
    valid.replace('<path ', '<script>run()</script><path '),
    valid.replace('<path ', '<image href="data:image/png;base64,x"/><path '),
  ];
  for (const svg of invalid) assert.throws(() => assertSafeSvg(svg, 'invalid'));
});

test('자산의 모든 capture 식별자는 배포된 원장에서 실제 Figma 조회 root로 연결된다', () => {
  const captures = new Set(manifest.assets.flatMap(asset => asset.uses.map(use => use.capture)));
  assert.equal(captures.size, 23);
  assert.deepEqual(new Set(Object.keys(manifest.captureSources)), captures);

  for (const capture of captures) {
    assert.match(capture, /^hub-figma-[a-z0-9-]+-20261105\.txt$/);
    const source = manifest.captureSources[capture];
    assert.equal(source.fileKey, manifest.source.fileKey, capture);
    assert(metadataNodes.has(source.rootNodeId), `${capture}: 조회 root가 원본 metadata에 존재해야 한다`);
    const url = new URL(source.url);
    assert.equal(url.protocol, 'https:', capture);
    assert.equal(url.hostname, 'www.figma.com', capture);
    assert.equal(url.pathname, `/design/${source.fileKey}/`, capture);
    assert.equal(url.searchParams.get('node-id'), source.rootNodeId.replace(':', '-'), capture);
  }
});

test('pin 내부 vector3개의 별도 관찰 파일은 원본 바이트를 유지하고 전체 canonical 아이콘을 대체하지 않는다', () => {
  const refresh = JSON.parse(read('references/icons-refresh-2026-11-05.json'));
  const canonical = JSON.parse(read('asset-manifest.json'));
  const observations = refresh.exportObservations.filter(observation => observation.observationAssetPath);
  assert.equal(observations.length, 3);
  assert.deepEqual(observations.map(observation => observation.sourceWidth), [16, 20, 24]);

  for (const observation of observations) {
    const label = observation.observationAssetPath;
    assert.equal(observation.comparison, 'child-export-wrapper-unresolved', label);
    assert.match(label, /^assets\/icons\/observations\/2026-11-05\/pin-(16|20|24)-child\.svg$/, label);
    assert.notEqual(label, observation.canonicalPath, label);
    const bytes = fs.readFileSync(path.join(designRoot, label));
    const svg = bytes.toString('utf8');
    assert.equal(bytes.length, observation.bytes, label);
    assert.equal(createHash('sha256').update(bytes).digest('hex'), observation.sha256, label);
    const root = attributes(svg.match(/<svg\b[^>]*>/)?.[0] ?? '');
    assert.deepEqual([Number(root.width), Number(root.height)], [observation.exportWidth, observation.exportHeight], label);
    assert.equal(root.viewBox, observation.viewBox, label);
    assertSafeSvg(svg, label);

    // 내부 vector의 비정사각 bounds를 전체 아이콘 크기로 늘려 canonical을 덮어쓰지 않습니다.
    const whole = canonical.icons.find(asset => asset.path === observation.canonicalPath);
    assert(whole, `${label}: 전체 아이콘 경로`);
    assert.equal(whole.sha256, observation.historicalSha256, label);
    const wholeBytes = fs.readFileSync(path.join(designRoot, whole.path));
    assert.equal(createHash('sha256').update(wholeBytes).digest('hex'), observation.historicalSha256, label);
    const wholeRoot = attributes(wholeBytes.toString('utf8').match(/<svg\b[^>]*>/)?.[0] ?? '');
    assert.deepEqual([Number(wholeRoot.width), Number(wholeRoot.height)], [observation.sourceWidth, observation.sourceHeight], label);
    assert.equal(wholeRoot.viewBox, `0 0 ${observation.sourceWidth} ${observation.sourceHeight}`, label);
    assert.notDeepEqual([observation.exportWidth, observation.exportHeight], [observation.sourceWidth, observation.sourceHeight], label);
  }
});

test('Spinner5종의 선 두께·원본 paint·gradient는 크기별 SVG와 문서가 일치한다', () => {
  const expectedSizes = [16, 20, 24, 36, 48];
  const expectedStrokes = [1.5, 2, 2, 3, 4];
  assert.deepEqual(controls.spinner.sizes, expectedSizes);
  assert.deepEqual(controls.spinner.strokeWidths, expectedStrokes);
  assert.equal(controls.spinner.nativeSvgPerSize, true);
  const exports = manifest.assets
    .filter(asset => asset.uses.some(use => use.capture === 'hub-figma-spinner-20261105.txt'))
    .sort((a, b) => a.nativeWidth - b.nativeWidth);
  assert.deepEqual(exports.map(asset => asset.nativeWidth), expectedSizes);
  assert.equal(new Set(exports.map(asset => asset.path)).size, expectedSizes.length);
  const rows = tableRows(read('components/AgentHubSpinner/styles.md')).slice(1);
  assert.equal(rows.length, expectedSizes.length);

  for (const [index, asset] of exports.entries()) {
    const svg = read(asset.path);
    const circle = tags(svg, 'circle');
    const track = tags(svg, 'path');
    assert.equal(circle.length, 1, asset.path);
    assert.equal(track.length, 1, asset.path);
    assert.equal(circle[0].stroke.toUpperCase(), '#BFD8FF', asset.path);
    assert.equal(Number(circle[0]['stroke-width']), expectedStrokes[index], asset.path);
    assert.equal(Number(track[0]['stroke-width']), expectedStrokes[index], asset.path);
    assert.match(track[0].stroke, /^url\(#[^)]+\)$/, asset.path);
    const gradient = tags(svg, 'linearGradient');
    assert.equal(gradient.length, 1, asset.path);
    assert.equal(track[0].stroke, `url(#${gradient[0].id})`, asset.path);
    const stops = tags(svg, 'stop');
    assert.deepEqual(stops.map(stop => stop['stop-color'].toUpperCase()), ['#0066FF', '#0066FF', '#0066FF'], asset.path);
    assert.deepEqual(stops.map(stop => Number(stop['stop-opacity'] ?? 1)), [1, 0.01, 0], asset.path);
    assert.deepEqual(stops.map(stop => Number(stop.offset ?? 0)), [0, 0.755208, 1], asset.path);
    const [, box, stroke, nodeId] = rows[index];
    assert.equal(Number.parseFloat(box), asset.nativeWidth, rows[index][0]);
    assert.equal(Number.parseFloat(stroke), expectedStrokes[index], rows[index][0]);
    assert.deepEqual(numericBox(metadataNodes.get(nodeId)), [asset.nativeWidth, asset.nativeHeight], nodeId);
  }
});

test('RuntimeSelect 관찰과 문서는40px 선택 행·독립 팝업·세 상태를 동일하게 보존한다', () => {
  const sourceItems = metadataFamily('4004:26884');
  const sourceTriggers = metadataFamily('4004:27014');
  assert.deepEqual(sourceItems.map(item => item.name.replace('state=', '')), controls.runtimeSelect.item.states);
  assert.deepEqual(sourceTriggers.map(item => item.name), ['open=false', 'open=true']);
  assert(sourceTriggers.every(item => numericBox(item).every((value, index) => value === controls.runtimeSelect.trigger[index])));
  assert(sourceItems.every(item => Number(item.height) === controls.runtimeSelect.item.height));

  const itemRows = tableRows(read('components/AgentHubRuntimeSelectItem/styles.md'));
  const triggerRows = tableRows(read('components/AgentHubRuntimeSelect/styles.md'));
  const row = tableCell(itemRows, '행');
  assert.equal(metric(row, '높이'), controls.runtimeSelect.item.height);
  assert.equal(metric(row, 'padding'), controls.runtimeSelect.item.padding);
  assert.equal(metric(row, 'radius'), controls.runtimeSelect.item.radius);
  const stateRow = itemRows.find(cells => cells[0].split('/').map(state => state.trim()).join(',') === controls.runtimeSelect.item.states.join(','));
  assert(stateRow, '표시 상태를 현재 선택과 hover/focus를 합친 별도 상태로 바꾸지 않는다');
  const lineHeight = tableCell(itemRows, 'label').match(/\d+\s*\/\s*(\d+)px/)?.[1];
  assert.equal(controls.runtimeSelect.item.height - 2 * controls.runtimeSelect.item.padding, Number(lineHeight));
  assert.deepEqual(dimensions(tableCell(triggerRows, '트리거 외곽')), controls.runtimeSelect.trigger);
  assert.equal(metric(tableCell(triggerRows, '팝업'), 'top'), controls.runtimeSelect.menuTop);
  assert.equal(controls.runtimeSelect.menuTop - controls.runtimeSelect.trigger[1], 3, '팝업 시작 좌표는 트리거 아래이며 trigger 높이에 합산하지 않는다');
  const describedMaximum = read('components/AgentHubRuntimeSelect/definition.md').match(/최대\s*(\d+)\s*개/)?.[1];
  assert.equal(Number(describedMaximum), controls.runtimeSelect.maxItemsFromDescription);
});

test('SegmentedControl 관찰과 문서는 group/item radius 및20px slot/18px glyph를 구분한다', () => {
  const labelGroup = metadataNodes.get('3592:22853');
  const iconGroup = metadataNodes.get('4028:27039');
  assert.deepEqual(numericBox(labelGroup), controls.segmented.label.groupSample);
  assert.deepEqual(numericBox(iconGroup), controls.segmented.icon.groupSample);
  assert(metadataFamily('3592:22852').every(node => Number(node.height) === controls.segmented.label.itemHeight));
  assert(metadataFamily('4028:27038').every(node => numericBox(node).every((value, index) => value === controls.segmented.icon.item[index])));
  assert.equal(controls.segmented.icon.groupSample[0], controls.segmented.icon.item[0] * 2);

  const rows = tableRows(read('components/AgentHubSegmentedControl/styles.md'));
  assert.deepEqual(dimensions(tableCell(rows, '그룹 샘플', 1)), controls.segmented.label.groupSample);
  assert.deepEqual(dimensions(tableCell(rows, '그룹 샘플', 2)), controls.segmented.icon.groupSample);
  assert.equal(metric(tableCell(rows, '그룹 샘플', 1), 'border'), controls.segmented.label.border);
  assert.equal(metric(tableCell(rows, '그룹 샘플', 1), 'radius'), controls.segmented.label.radius);
  assert.equal(metric(tableCell(rows, '그룹 샘플', 2), 'radius'), controls.segmented.icon.groupRadius);
  assert.equal(metric(tableCell(rows, '버튼', 1), '높이'), controls.segmented.label.itemHeight);
  assert.equal(metric(tableCell(rows, '버튼', 1), 'radius'), controls.segmented.label.radius);
  assert.deepEqual(dimensions(tableCell(rows, '버튼', 2)), controls.segmented.icon.item);
  assert.equal(metric(tableCell(rows, '버튼', 2), 'radius'), controls.segmented.icon.itemRadius);
  assert.equal(controls.segmented.icon.outerBorder, 0);

  const chatSlot = metadataNodes.get('4035:27058');
  assert.deepEqual(numericBox(chatSlot), [controls.segmented.icon.chatSlot, controls.segmented.icon.chatSlot]);
  const chatAsset = manifest.assets.find(asset => asset.sourceAsset === 'a496fa9a6d687388490f93d67d9354056dd1618e.svg');
  assert(chatAsset, '축소된 원본 chat glyph를 일반20px 아이콘으로 바꾸지 않는다');
  assert.deepEqual([chatAsset.nativeWidth, chatAsset.nativeHeight], [controls.segmented.icon.chatGlyph, controls.segmented.icon.chatGlyph]);
  assert(controls.segmented.icon.chatGlyph < controls.segmented.icon.chatSlot);
  const styles = read('components/AgentHubSegmentedControl/styles.md');
  const documentedSlot = styles.match(/(\d+(?:\.\d+)?)px\s*slot/)?.[1];
  const documentedGlyph = styles.match(/(\d+(?:\.\d+)?)px\s*glyph/)?.[1];
  assert.deepEqual([Number(documentedSlot), Number(documentedGlyph)], [controls.segmented.icon.chatSlot, controls.segmented.icon.chatGlyph]);
});
