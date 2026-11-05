import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { ROOT } from './lib/config.mjs';

const designRoot = path.join(ROOT, 'docs/agent-hub/design');
const controls = JSON.parse(fs.readFileSync(path.join(designRoot, 'references/runtime-controls-refresh.figma.json'), 'utf8'));

// 응답 스크린샷은 재사용 아이콘 export가 아니라 생성 코드와의 불일치를 보여 주는 원본 증거입니다.
test('런타임 모드의 MCP 시각 증거를 보존하고 미확인 glyph 매핑을 확정하지 않는다', () => {
  const { modeSelection, screenshotEvidence } = controls.snbRuntime;
  assert.equal(screenshotEvidence.length, 2);
  assert.deepEqual(new Set(screenshotEvidence.map(item => item.nodeId)), new Set(['4004:27119', '4004:27231']));
  for (const image of screenshotEvidence) {
    assert.match(image.path, /^assets\/refresh-20261105\/snb-runtime-(?:unselected|selected)-reference\.png$/);
    const bytes = fs.readFileSync(path.join(designRoot, image.path));
    assert.equal(bytes.length, image.bytes);
    assert.equal(createHash('sha256').update(bytes).digest('hex'), image.sha256);
    assert.equal(bytes.subarray(0, 8).toString('hex'), '89504e470d0a1a0a');
    assert.deepEqual([bytes.readUInt32BE(16), bytes.readUInt32BE(20)], [image.width, image.height]);
    assert.deepEqual([image.width, image.height], [286, 1024], '응답 이미지 크기를 Figma288×1033 외곽과 혼동하지 않는다');
  }
  assert.equal(modeSelection.selectedSegment, 2);
  assert.equal(modeSelection.independentOfRuntimeValue, true);
  assert.equal(modeSelection.glyphEvidence.consistent, false);
  assert.equal(modeSelection.nativeGlyphSwapBindingCollected, false);
  for (const key of ['rightNativeSize', 'rightNativeSourceNodeId', 'rightNativeBinding']) assert.equal(modeSelection.glyphEvidence[key], null);
});
