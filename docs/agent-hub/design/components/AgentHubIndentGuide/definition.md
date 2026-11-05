# AgentHubIndentGuide — 정의와 공용 비교

[문서 인덱스](./README.md) · [Figma 관찰 기록](../../references/file-code-refresh.figma.json)

원본은 `3686:20585`의 두 variant입니다.

| 항목 | 관찰·채택 계약 |
| --- | --- |
| default | 3686:20581 |
| active | 3686:20583 |
| 생성 참조의 입력 | state: default / active |

Figma 설명의 active는 **커서가 있는 블록의 선**입니다. 선택 항목·마우스 hover·포커스 테두리를 뜻하지 않습니다.
줄의 상태와 가이드의 상태는 별개이므로 current 줄에 모든 조상 가이드를 무조건 진하게 만들지 않습니다.

```text
20px 높이 guide slot
└─ 왼쪽 x0의1px 세로 선: slot 전체 높이
```

생성 참조에는 state 문자열이 있으며 native component-property ID·visible/characters binding은 노출되지 않았습니다.
두 조합 외 disabled·hover·모션 variant는 확인하지 않았습니다.
