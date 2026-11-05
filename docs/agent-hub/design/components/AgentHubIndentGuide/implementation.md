# AgentHubIndentGuide — 제품 구현 연결

[문서 인덱스](./README.md) · [Figma 관찰 기록](../../references/file-code-refresh.figma.json)

이 계약은 장식 leaf의 **재현 recipe**입니다. 새 export가 이미 있다는 뜻이 아닙니다.
props는 `active: boolean`처럼 제품에 맞게 제안할 수 있고 Figma state를 그대로 공개 API로 강제하지 않습니다.

```css
.hub-indent-guide {
  position: relative;
  flex: 0 0 16.8px;
  width: 16.8px;
  height: 20px;
}
.hub-indent-guide::before {
  content: "";
  position: absolute;
  inset: 0 auto 0 0;
  width: 1px;
  background: var(--hub-code-guide, #eee);
}
.hub-indent-guide[data-active="true"]::before {
  background: var(--hub-border-default, #ddd);
}
```

부모는 실제 들여쓰기와 현재 블록 정보를 공급하고 leaf는 그 값을 다시 계산하지 않습니다.
SVG glyph·이미지 자산은 필요하지 않으며 CSS 선은 Figma의 실제 사각형 geometry에 대응합니다.
