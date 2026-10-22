# AgentHubChatComposer — 크기와 색상

[실측](../../references/chat-composer.figma.json)과 [변수](../../references/chat-composer.variables.figma.json)의 Light mode 기준입니다.
아래 값은 Composer 범위에 연결하며 공용 Textarea·버튼·전역 테마를 변경하지 않습니다.

## Surface와 입력 행

| 항목 | 확인한 값 |
| --- | --- |
| surface | 네 샘플 모두768×58px, radius9999px |
| 높이 속성 | typing만 HUG, 나머지 FIXED58px |
| 배경 / 선 | #FFFFFF / 1px INSIDE #DDDDDD |
| padding | 좌8·우20·위아래12px, `strokesIncludedInLayout: true` |
| 실제 내부 행 | surface 기준 x9/y13, 738×32px |
| 행 배치 | 좌측 묶음과 전송 버튼을 양끝 정렬, gap8px |
| 첨부 ↔ 편집 영역 | gap4px |
| 입력·placeholder | Pretendard Regular16/24px·400·자간0 |
| 색상 | placeholder #757575, 입력 #1C1C1C |

일반 border-box의 실제 border1px과 위 padding을 함께 적용하면 이 내부 좌표·폭이 나옵니다.
border를 overlay로 옮긴다면 같은 최종 배치가 되도록 확인합니다. 원본은 clipping을 하지 않으며 아래 프로젝트 조작도 가리지 않습니다.
공용 Textarea의84px·rows3·radius4·padding12·별도 border를 안쪽에 그대로 중복 적용하지 않습니다.

네 구성은 같은 Overflow effect를 사용합니다. 색은 navy `#091E42`, 두 레이어는 원본 순서대로 아래와 같습니다.

```css
/* Composer 전용 토큰 정의 예시. 실제 제품의 토큰 이름에 매핑합니다. */
--agent-hub-chat-composer-shadow:
  0 0 1px 0 rgba(9, 30, 66, 0.12),
  0 0 8px 0 rgba(9, 30, 66, 0.16);
```

공용의 일반 검정 Overflow나 Calendar의 Mid로 치환하지 않습니다. focused에도 파란 border나 다른 shadow는 없습니다.
이는 정적 Figma 관찰입니다. 아래 후속 채택 계약에서는 입력 focus 테두리를 추가하지 않고,
첨부·전송·프로젝트 버튼의 독립 focus-visible을 유지합니다.

## 원형 버튼

양쪽 모두32px 원형·radius9999, glyph24px·선1.5px·중앙 정렬입니다. 실제 border·shadow는 없습니다.
첨부는 네 구성 모두 투명 배경·#1C1C1C plus입니다.

| Composer 샘플 | 전송 배경 | arrow-up/24 |
| --- | --- | --- |
| enabled / focused | rgba(0,0,0,.05) | #1C1C1C |
| typing / agent-selected | #3B82F6 | #FFFFFF |

이 표의 emphasis와 실제 disabled·송신 가능 여부는 별개입니다. 파란 배경을 Attach `state5`나 요청 성공으로 해석하지 않습니다.

## 에이전트와 프로젝트

agent-selected에서는 Chip 높이20px·px8·radius4·12/16px·600·#FAF5FF/#9333EA와 제목14/20px·600·#1C1C1C를 gap8px로 묶습니다.
제목 샘플108px·Chip68px·묶음184px는 내용에 따른 측정값입니다. 뒤 Divider는 외곽17×12px로 좌우8px·중앙1px #DDDDDD 선을 포함합니다.
선만1px로 취급해 이 여백을 없애거나 바깥 gap8px를 다시 추가하지 않습니다.

프로젝트 조작은 원본 surface 밖 absolute x9/y62, 샘플102×28px·radius9999·px8/py6·gap4, 실제 fill·border·shadow 없음입니다.
folder는16px·선1px·#555555, 라벨은12/16px·400·#555555입니다. 폭은 실제 라벨로 결정하며102px를 고정하지 않습니다.
가시 조작의 아래끝은 y90입니다. surface 높이58px만 레이아웃 공간으로 잡으면 다음 콘텐츠와 겹칩니다.
58px surface + gap4px + 28px 프로젝트 행의 normal flow wrapper가 재현 방법이며 그림자 번짐·좁은 폭은 별도로 검증합니다.

caret 사각형1×17px와 주변4px 간격은 디자인용입니다. native caret을 사용하고 추가 사각형·placeholder padding을 만들지 않습니다.
다중 줄·긴 에이전트 이름·mobile에서의 새 높이와 재배치는 이 샘플에서 확인되지 않았습니다.

## 후속 사용자 채택: 입력 focus 테두리 없음

[입력 focus 채택](../../motion.md)은 native textarea의 unstyled variant·container focus owner를 사용합니다.
안쪽84px/r4/p12/border와 사각 ring을 추가하지 않고 기존58px pill·두 Overflow shadow·glyph24/버튼32·아래 프로젝트 공간을 유지합니다.
마우스·키보드 입력 focus 모두 textarea와 바깥 pill에 별도 outline·ring·focus border를 추가하지 않습니다.
이는 이전의 바깥 pill2px/offset2 ring 채택을 대체하는 Composer 한정 계약입니다. 기본1px #DDDDDD 선과 두 shadow는 그대로 유지합니다.
공용 Textarea 전체나 Search에 적용하지 않으며, 첨부·전송·프로젝트 버튼 자체의 focus-visible은 남깁니다.
textarea의 label·ref·caret·선택·복사·Tab 진입·IME·읽기 전용 동작은 유지합니다.
