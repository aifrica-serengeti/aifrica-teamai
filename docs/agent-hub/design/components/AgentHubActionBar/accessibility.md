# AgentHubActionBar — 접근성

공용 ActionBar의 native button·focus·disabled·구분선 계약을 유지합니다.
이번 Figma 자료는 ARIA/keyboard 구현 증거가 아니며 아래는 제품 구현 의무입니다.

| 항목 | 의무 |
| --- | --- |
| 묶음 | 일괄 작업의 목적을 식별 가능한 group/toolbar로 전달. toolbar role을 택하면 해당 keyboard pattern도 함께 구현 |
| action | native button type=button·읽을 수 있는 label·Tab 이동·Enter/Space 한 번 실행 |
| more | 고유 aria-label과 실제 메뉴의 expanded/haspopup/controls 연결 |
| close | `선택 해제`처럼 실제 명령의 이름. 단순 `닫기`와 의미 혼동 금지 |
| disabled | native disabled와 필요 시 aria-disabled, pointer/keyboard 실행 차단 |
| divider | role=separator·aria-orientation=vertical, focus 대상 아님 |
| glyph | 텍스트/aria-label과 중복이면 장식으로 숨김 |
| focus | 공용 focus-visible 계약 유지. outline을 root clip이나 인접 part가 자르지 않음 |

공용 focus는1px gap을 둔1px accent outline입니다. 해당 Agent Hub 토큰과 inverse 배경의 대비를 제품에서
검증합니다. 원본에 focus variant가 없다는 이유로 outline을 제거하지 않습니다.
선택 상태와 action의 hover/pressed/focus는 독립적인 의미입니다.

일반 action은28/32px, icon-action은32px의 시각 크기입니다. 터치 목표 영역·인접 조작 간격·확대 시 오작동을
별도 검증하고 같은 위치의 숨은 hit-area를 서로 겹치지 않습니다.
선택 개수를 적절하게 알리되 매 hover마다 aria-live를 갱신하거나 focus를 bar로 이동하지 않습니다.
좁은 폭과 큰 글자에서 메뉴·선택 해제 접근 경로를 유지합니다.
