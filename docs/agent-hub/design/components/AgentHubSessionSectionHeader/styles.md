# AgentHubSessionSectionHeader — 스타일

| 항목 | 확인한 값 |
| --- | --- |
| root | 294×24px 샘플, 폭 FIXED·높이 HUG |
| root 배치 | horizontal·space-between·교차축 중앙·padding0·gap0 |
| 표면 | fill·border·shadow 없음, radius0·opacity1 |
| heading wrapper | 가로 HUG·중앙 정렬·좌우 padding4px·gap0 |
| title-group | 가로 HUG·gap8px·높이20px |
| title | Pretendard SemiBold14/20·600·#1C1C1C |
| count | Pretendard Regular14/20·400·#1C1C1C |
| toggle/action | 24×24px·radius4·padding0·glyph16 중앙 |
| toggle glyph | 선1px·round·#757575 |
| plus glyph | 선1px·round·#1C1C1C |

title/count는 자간0, truncation DISABLED·maxLines 없음입니다. 기본 count는 숨겨져 있으며 title-group 현재 폭25px,
heading57px는 제목25 + toggle24 + 좌우 padding8의 결과입니다. count를 켜면 실제 문자열과 gap8로 HUG 폭이 바뀝니다.
294px·제목25px·저장된 count9px를 모든 제품 문구의 고정 폭으로 사용하지 않습니다.

접기 버튼은 배경·외곽선이 없는 ghost/default입니다. chevron의 #757575는 실제 인스턴스 paint이고,
공용 ghost 기본 아이콘 #1C1C1C로 일괄 바꾸지 않습니다. action plus는 #1C1C1C입니다.
glyph root에 저장된 소수 strokeWeight보다 실제 Vector의1px 선을 기준으로 연결합니다.

heading/title-group에 원본 clipping이 있으나 긴 제목·큰 count·번역을 읽지 못하게 잘라내는 정책을 뜻하지 않습니다.
toggle=false이면 버튼과 빈 slot을 없애고 남은 title/action 높이에 맞춰 HUG 흐름을 검증합니다.
현재 empty 패널도 action24가 있어 전체 Header24px를 유지합니다.
Header 전용 hover/focus/disabled·접기 모션은 측정하지 않았습니다. 필요한 컨트롤 상태는 실제 IconButton 계약과 제품에서 검증합니다.

## 사용자 채택: 간격과 회전

[이번 요청](../../motion.md)은 title-group↔toggle24 박스의 gap을0에서2px로 변경합니다. title/count gap8·heading px4·glyph16과 버튼24는 유지합니다.
24px 버튼 안 glyph의 inset4까지 포함한 글자↔glyph 시작 간격은6px입니다. 기록 Header의 기존 gap2/actual16 박스는 별도이며 다시2px를 더하지 않습니다.
원본 down SVG의 path를 중심(8,8)에서−90° 회전하면 right 원본과 정확히 일치합니다. glyph의 transform만0↔−90deg,200ms ease로 연결합니다.
버튼 hitbox·hover 배경·focus ring·별도 + action은 회전하지 않습니다.200ms는 공용 CardAccordion에서 명시적으로 채택한 값이며 Figma 모션 실측이 아닙니다.
