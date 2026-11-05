# AgentHubFileTreeEntry — 정의와 공용 비교

[문서 인덱스](./README.md) · [Figma 관찰 기록](../../references/file-code-refresh.figma.json)

원본 이름은 `file-tree-entry-guide`, set `3713:24469`입니다.
**Level1~6 × State default/hover/pressed/selected =24개** variant를 확인했습니다.
전체 variant ID·샘플 크기는 [관찰 기록](../../references/file-code-refresh.figma.json)에 보존합니다.

생성 참조는 label, level, state, showChevron, chevronIcon, contentIcon을 제공합니다.
이것은 native component-property ID·INSTANCE_SWAP/SLOT binding까지 확인한 기록이 아닙니다.

```text
FileTreeEntry28
├─ 장식 row-bg24: 위아래2px
├─ indent: (Level-1)개의 guide-slot20, 선 x12
├─ 항상 유지하는 chevron 정렬 slot24 / 선택적 glyph16·toggle
└─ content FILL: pl4 + icon16 + gap8 + label
```

Level은1부터 시작하는 표시 깊이입니다. 접힘/펼침은 selected와 별도이며 showChevron Boolean은 화살표 표시 여부입니다.
hover variant에서 down glyph가 사용된 샘플만으로 마우스가 닿으면 자동 펼침을 수행하지 않습니다.
행의 label을 식별자로 쓰지 않고 안정적인 nodeId를 사용합니다. Figma에는 checkbox·trailing menu·disabled variant가 없으며 자동 추가하지 않습니다.



showChevron은 내부16px glyph의 노출값이며24px 정렬 slot 전체의 표시 여부가 아닙니다. 리프도 빈24px slot을 유지해 같은 깊이의 폴더와 content 시작선을 맞춥니다. 빈 slot은 장식 wrapper로 두고 버튼·Tab stop·펼침 동작을 만들지 않습니다.
