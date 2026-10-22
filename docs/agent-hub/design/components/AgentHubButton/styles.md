# AgentHubButton — 크기와 색상

아래 값은 [44종 실측 기록](../../references/button.figma.json)의 Light mode 기준입니다.
제품의 Button 전용 token/variant adapter에 연결하고 공용 Button이나 blue·accent palette 전체를 수정하지 않습니다.

## 크기와 border radius

패딩은 좌우 / 상하, 글자는 font-size / line-height입니다. 글꼴은 Pretendard이며 자간은 0입니다.

| type·size | radius | 패딩 | gap | 글자 | weight | 아이콘 box·선 |
| --- | --- | --- | --- | --- | --- | --- |
| primary·secondary·tertiary 40 | 8px (`radius/control-lg`) | 16 / 4px | 4px | 16 / 24px | 600 | 20px · 1.25px |
| primary·secondary·tertiary 32 | 6px (`radius/control-md`) | 16 / 4px | 4px | 14 / 20px | 600 | 16px · 1px |
| primary·secondary·tertiary 28 | 4px (`radius/control-sm`) | 8 / 4px | 4px | 14 / 20px | 600 | 16px · 1px |
| ghost 28 | 4px (`radius/control-sm`) | 8 / 6px | 4px | 12 / 16px | 600 | 16px · 1px |
| ghost 24 | 4px (`radius/control-sm`) | 4 / 2px | 4px | 14 / 20px | 400 | 16px · 1px |

공용은 모든 크기 radius 4px, Medium 아이콘 18px, Tiny 아이콘 14px·gap 2px입니다.
Agent Hub의 32px 아이콘은 16px이며 ghost 24px의 글자·간격은 공용 Tiny와 다릅니다.
높이·패딩·아이콘·글꼴을 크기 이름 하나로 일괄 상속하지 않습니다.

## 버튼 배경

| type | enabled | hovered | pressed | disabled | 외곽선 |
| --- | --- | --- | --- | --- | --- |
| primary | #3B82F6 | #0066FF | #0056D6 | #99C2FF | 없음 |
| secondary | #CCE0FF | #99C2FF | #66A3FF | #FFFFFF | 없음 |
| tertiary | #FFFFFF | #F8F8F8 | #F4F4F4 | #FFFFFF | 모든 상태 1px #DDDDDD, inside |
| ghost | 투명 | 검정 5% | 검정 10% | 투명 | 없음 |

ghost의 hover/pressed는 `rgba(0, 0, 0, 0.05/0.10)` 오버레이입니다.
Figma의 회색 부모 surface에 합성된 결과를 고정 hex로 만들지 않습니다.
배경 변수 이름은 `color/button/<type>-fill`, `-hovered`, `-pressed`, `-disabled`이고,
ghost의 두 오버레이는 `color/button/opacity-hovered`, `opacity-pressed`입니다.
전체 alias 연결은 [변수 기록](../../references/variables.figma.json)을 확인합니다.

## 글자와 아이콘 색상

| type | enabled / hovered / pressed 글자 | disabled 글자 |
| --- | --- | --- |
| primary | #FFFFFF | #FFFFFF |
| secondary | #1C1C1C | #99C2FF |
| tertiary | #1C1C1C | #AAAAAA |
| ghost | #1C1C1C | #AAAAAA |

대부분 아이콘도 글자와 같은 색입니다. 다만 노드 `3025:24995`의 **secondary·40·pressed**는
글자 #1C1C1C, 두 아이콘 #FFFFFF로 서로 다릅니다. 원본 관찰을 기록한 것으로, 이를 임의로
`currentColor`로 통일하거나 모든 secondary pressed 크기로 확장하지 않습니다.
이 값은 Figma 관찰 기록으로 보존합니다. 아래의 채택 변경을 적용한 제품의 기대값과 구분합니다.
28px primary 활성 아이콘은 같은 흰색이어도 글자와 다른 semantic token에 연결돼 있으므로 정확한 바인딩은 실측 기록을 봅니다.

공용 secondary는 흰 배경·accent 글자/외곽선인 반면, Agent Hub secondary는 파란 배경·중립 글자·무테두리입니다.
tertiary의 중립 배경·선·글자 값은 공용 라이트 baseline과 같습니다.
`strokeWeight: 1`만 보고 무테두리 type에 실제 border를 추가하지 않습니다. `strokes: []` 여부도 확인합니다.

## Keycap

원본 예시는 18px 높이, radius 4px, 내부 1px 선, 좌우 패딩 4px, Pretendard Regular 12/16px입니다.
그룹 간격은 2px이며, `Esc` 3개의 예시 폭은 각각 30px·그룹 94px입니다.
이는 라벨과 개수가 바뀌어도 30/94px를 고정하라는 뜻이 아닙니다. 배경 fill은 없습니다.

| 버튼 type | keycap border | 활성 글자 | disabled 글자 |
| --- | --- | --- | --- |
| primary | #B9D5FF | #DAE9FF | #DAE9FF |
| secondary | #99C2FF | #3B82F6 | #3B82F6 |
| tertiary·ghost | #DDDDDD | #757575 | #AAAAAA |

disabled에서도 primary·secondary keycap 색상이 그대로인 것은 원본 관찰입니다.
버튼 전체 opacity로 disabled를 만들면 이 값이 바뀝니다. 실제 비활성 동작은 별도로 차단합니다.
focus·loading·dark 색상은 이 노드에 없습니다. 공용의 focus 표시 의무를 유지하고 제품에서 명시적으로 검증합니다.

## 2026-10-21 채택 변경: secondary 아이콘 색상

사용자 요청으로 secondary 40px의 pressed 아이콘도 라벨과 같은 `currentColor`를 사용합니다.
기본·hover·pressed의 라벨과 아이콘은 모두 #1C1C1C이며 disabled는 #99C2FF입니다.
32/28px의 기존 색상과 일치시키는 변경이고, 원본 `3025:24995`의 흰 아이콘이 잘못 추출됐다는 뜻이 아닙니다.
새 구현은 크기별 흰색 강제 selector를 만들지 않고, 기존 구현의 해당 예외를 제거합니다.
색상 전환·reduced motion은 [모션 채택 계약](../../motion.md)을 적용합니다.
