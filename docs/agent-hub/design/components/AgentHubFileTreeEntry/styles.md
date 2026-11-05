# AgentHubFileTreeEntry — 스타일과 실측

[문서 인덱스](./README.md) · [Figma 관찰 기록](../../references/file-code-refresh.figma.json)

| 항목 | 관찰·채택 계약 |
| --- | --- |
| 행 | 높이28px·px4·샘플 폭240px. 부모에서 gap0으로 쌓음 |
| row-bg | root 왼쪽0~오른쪽0·높이24px·세로중앙·위아래2px·radius4 |
| 들여쓰기 | (Level-1) ×20px guide-slot, 높이100% |
| 조상 선 | 각 slot 왼쪽12px·위0·아래0·폭1px, color/border/default-subtle #EEE |
| chevron | 항상 유지하는24×24 정렬 slot·opacity.8·선택적 glyph16 |
| content | flex1·min-width0·pl4·icon16/label gap8 |
| label | Pretendard Regular400 14/20 #1C1C1C, nowrap, overflow hidden/ellipsis |
| default | 투명 row-bg |
| hover | rgba(0,0,0,.05) row-bg |
| pressed | rgba(0,0,0,.1) row-bg |
| selected | color/action/default-selected #EBF3FF row-bg |

showChevron=false에서도 정렬 slot24px를 유지합니다. glyph가 없는 리프의 slot을 제거하면 아이콘·라벨이 폴더보다24px 당겨집니다. 슬롯의 존재와 실제 펼침 버튼의 존재는 구분합니다.

28px 행 사이에는 임의의2px gap을 다시 넣지 않습니다.2px 여유는 **24px 배경과28px 행의 내부 차이**이며,
부모 gap을 추가하면 조상 세로 guide가 끊깁니다. 들여쓰기 폭20px와 code용 guide16.8px도 섞지 않습니다.

기존 공용 Tree의 선택 왼쪽2px 막대·곡선 connector·5px 리프 marker를 AH 행에 중복 출력하지 않습니다.
선택/hover 합성은 공용의 selected 우선 규칙을 유지하고 원본에 없는 selected+hover 배경을 새로 추출값으로 주장하지 않습니다.
긴 label의 원본은 ellipsis이며 마키 이동·fade가 필요하면 별도 제품 채택으로 연결합니다.
