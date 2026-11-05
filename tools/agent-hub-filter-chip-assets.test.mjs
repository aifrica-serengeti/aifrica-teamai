import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { ROOT } from './lib/config.mjs';

const designRoot = path.join(ROOT, 'docs/agent-hub/design');
const observation = JSON.parse(fs.readFileSync(path.join(designRoot, 'references/existing-components-refresh.figma.json'), 'utf8'))
  .components.find(component => component.componentId === 'AgentHubFilterChip').observations.optionalGlyphPaint;

// 같은 label 색에 아이콘을 묶는 회귀를 막도록 조건별 반환 파일의 실제 stroke paint를 읽습니다.
test('FilterChip 선택 아이콘은 파랑, 라벨은 검정이며 네 조건의8개 원본 glyph paint를 보존한다', () => {
  assert.equal(observation.defaultVisible, false);
  assert.equal(observation.renderedSlotGeometryVerified, false);
  assert.equal(observation.nativeVariableBindingsCollected, false);
  const expected = [
    { selected: false, states: ['enabled'], glyphColor: '#757575', labelColor: '#757575' },
    { selected: false, states: ['hovered', 'pressed'], glyphColor: '#555555', labelColor: '#555555' },
    { selected: null, states: ['disabled'], glyphColor: '#AAAAAA', labelColor: '#AAAAAA' },
    { selected: true, states: ['enabled', 'hovered', 'pressed'], glyphColor: '#3B82F6', labelColor: '#1C1C1C' },
  ];
  assert.equal(observation.rows.length, expected.length);
  const files = new Set();
  for (let index = 0; index < expected.length; index++) {
    const { assets, ...condition } = observation.rows[index];
    assert.deepEqual(condition, expected[index]);
    assert.deepEqual(assets.map(asset => asset.slot), ['leading', 'trailing']);
    for (const asset of assets) {
      files.add(asset.path);
      const svg = fs.readFileSync(path.join(designRoot, asset.path), 'utf8');
      assert.match(svg, /viewBox="0 0 16 16"/);
      const painted = [...svg.matchAll(/<[^>]+\bstroke="(?!none)([^"]+)"[^>]*>/g)];
      assert(painted.length > 0, asset.path);
      for (const node of painted) {
        assert.equal(node[1].toUpperCase(), condition.glyphColor, asset.path);
        assert.equal(Number(node[0].match(/stroke-width="([^"]+)"/)?.[1] ?? 1), observation.exportStrokeWidth, asset.path);
      }
    }
  }
  assert.equal(files.size, 8);
});
