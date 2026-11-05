# AgentHubFileTree — 스타일과 실측

[문서 인덱스](./README.md) · [Figma 관찰 기록](../../references/file-code-refresh.figma.json)

| 항목 | 관찰·채택 계약 |
| --- | --- |
| 샘플 | 400×991px, 실제 폭·높이는 제품 shell이 공급 |
| root | color/surface/blue-gray #F6F7F9, 왼쪽+아래 border1px #DDD |
| 패딩·그룹 간격 | p8px, Search/tree gap8px |
| Search | 높이32px·radius/control-md6px·px8px·border1px #DDD·surface white |
| 검색 glyph/글자 | glyph16, text14/20 Pretendard Regular400 |
| placeholder | color/form/default/placeholder/active #8F8F8F |
| 행 묶음 | 세로 gap0·남은 폭FILL, FileTreeEntry28px |
| 원본 clipping | panel과행묶음의 overflow clip은 정적 표현. 실제 scroll 구현 증거가 아님 |

검색을 공용48px Input로 직접 대체하지 않고 AgentHubSearch의32px adapter를 적용합니다.
root의 왼쪽·아래 border와 이웃 FileViewer/FileHeader가 소유한 경계를 확인하여1px 선이2px로 중복되지 않게 조합합니다.

실제 목록은 min-height:0/FILL인 한 viewport에서 스크롤합니다. Search를 고정하고 행이 viewport 안에서만 이동하도록 연결할 수 있습니다.
이 스크롤 구조는 제품 재현 계약이며 정적 panel 높이991px를 강제하는 API가 아닙니다.
