# AgentHubIndentGuide — 스타일과 실측

[문서 인덱스](./README.md) · [Figma 관찰 기록](../../references/file-code-refresh.figma.json)

| 항목 | 관찰·채택 계약 |
| --- | --- |
| 슬롯 | 폭16.8px × 높이20px. border-box·수축 금지 |
| 선 | 왼쪽0, 위0, 아래0, 폭1px |
| default | color/code/guide = #EEEEEE |
| active | color/border/default = #DDDDDD |

16.8px를 임의의16px·20px로 반올림하지 않습니다. 가이드는 부모 CodeLine의20px 줄 높이에 맞춥니다.
픽셀 스냅은 가용 배율에서 확인하고 font-size나 선 두께를 통째로 확대해 보정하지 않습니다.
색상 이름은 생성 참조에 출력된 변수 경로이며 native variable ID·collection/mode 확인을 대신하지 않습니다.
