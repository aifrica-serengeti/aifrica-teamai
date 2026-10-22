# Agent Hub Elevation

Agent Hub의 여섯 elevation 레벨과 공용 대비 차이입니다. [디자인 확장 적용 조건](../README.md)을 따르며,
공용을 켠 UI 작업에서는 `DOCS_ROOT/frontend/design/foundations/Elevation.md`와 함께 읽습니다.
새 컴포넌트가 아닌 foundation 확장이므로 component registry의 id나 공용 스킬 개수를 늘리지 않습니다.

2026-10-20에 Figma [Component elevation](https://www.figma.com/design/cUKHT2PdHjAKRXZlzulnO5/?node-id=3261-59766)의
샘플6개·EffectStyle4개를 확인했습니다. [실측 JSON](../references/elevation.figma.json),
[표면 변수](../references/elevation.variables.figma.json), [기존 컴포넌트 대조 결과](../references/elevation-component-comparison.json)를
함께 제공합니다. 실제 제품 token source·dark·렌더링은 아직 미검증이며 공유 채택 설정은 계속 `draft`입니다.

## 공용과 달라진 값

아래 수치는 `x y blur spread / alpha` 순서이며 단위는px입니다. 공용 foundation의 일반 토큰은 검정 `#000000`,
Agent Hub의 네 shadow 레벨은 navy `#091E42`입니다. 둘 다 같은 이름을 사용해도 값은 다릅니다.

| 레벨 | 공용 일반 elevation | Agent Hub 확인값 |
| --- | --- | --- |
| Sunken | inset 0 1 3 0 / 4% | **그림자 없음**, 샘플 배경 #F8F8F8 |
| Default | 없음 | 없음, 샘플 배경 #FFFFFF |
| Raised | 0 1 2 0 / 4% | 0 0 1 0 / 31% + 0 1 1 0 / 10% |
| Mid | 0 2 6 0 / 4% | 0 0 1 0 / 31% + 0 4 6 0 / 15% |
| Overlay | 0 8 24 0 / 8% | 0 0 1 0 / 31% + 0 8 12 0 / 15% |
| Overflow | 0 12 32 0 / 12% | 0 0 1 0 / 12% + 0 0 8 0 / 16% |

Agent Hub는4개 레벨 모두 두 겹 DROP_SHADOW·spread0이며, Figma effect 배열 순서도 실측 JSON에 보존했습니다.
Overflow를 이름만 보고 가장 큰 아래 방향 그림자로 바꾸지 않습니다. 원본 Overflow는 y0의 퍼지는 그림자입니다.
Default/Sunken은 효과 배열이 비어 있고 EffectStyle 연결도 없습니다. Sunken에 공용 inset을 자동 추가하지 않습니다.

## 복사해서 연결할 수 있는 CSS 값

다음 이름은 제품의 Agent Hub theme 범위에서 사용할 수 있는 **참조 이름**입니다. 실제 Figma 변수명이나
이미 존재하는 제품 token export가 아닙니다. 제품의 기존 semantic/component token에 연결하고 공용 전체에 덮어쓰지 않습니다.

```css
.agent-hub-theme {
  --agent-hub-elevation-sunken: none;
  --agent-hub-surface-sunken: #f8f8f8;
  --agent-hub-elevation-default: none;
  --agent-hub-elevation-raised:
    0 0 1px 0 rgba(9, 30, 66, 0.31),
    0 1px 1px 0 rgba(9, 30, 66, 0.1);
  --agent-hub-elevation-mid:
    0 0 1px 0 rgba(9, 30, 66, 0.31),
    0 4px 6px 0 rgba(9, 30, 66, 0.15);
  --agent-hub-elevation-overlay:
    0 0 1px 0 rgba(9, 30, 66, 0.31),
    0 8px 12px 0 rgba(9, 30, 66, 0.15);
  --agent-hub-elevation-overflow:
    0 0 1px 0 rgba(9, 30, 66, 0.12),
    0 0 8px 0 rgba(9, 30, 66, 0.16);
}
```

표면의 background와 shadow는 별도 역할입니다. Sunken 배경을 shadow 값에 넣거나 Default의 모든 제품 배경을 white로
고정하지 않습니다. 제품에서 실제 token 선언을 확인한 후 로컬 `.aifrica/frontend.json`의 `tokens.elevation`·`paths.designTokens`
등에 채택 매핑을 기록합니다. 이 문서를 받았다는 이유만으로 공유 설정의 빈 map을 제품 구현 완료로 바꾸지 않습니다.

## 샘플과 레벨 계약을 구분하기

샘플6개는56×56px·radius8·1px INSIDE #DDDDDD이며, Default/Sunken에도 예시 테두리가 있습니다.
이는 표의 비교용 surface입니다. 이 수치를 Button·Calendar·Checkbox 등 모든 컴포넌트의 geometry·border로 적용하지 않습니다.

Mid 샘플 `3261:59804`의 전체 opacity는0.9입니다. EffectStyle 자체의 alpha는0.31/0.15이며 두 값은 별개입니다.
모든 Mid 컴포넌트·자식 텍스트를 opacity0.9로 만들거나 alpha에0.9를 미리 곱해 token으로 저장하지 않습니다.
다른 표면·dark·미제공 상태는 추가 근거를 확인합니다. 보드의 배경이나 alpha 기반이라는 공용 설명이 dark 검증을 대신하지 않습니다.

## Figma 표의 권장 용도

| 레벨 | 표에 적힌 대상 |
| --- | --- |
| Overflow | 콘텐츠가 가용 영역을 초과할 때 Table/Dialog의 sticky header |
| Overlay | Dialog |
| Mid | Action Bar, Drop Down, Menu, Toast Notification, Select, Date Picker, Card hover, Open Panel |
| Raised | Slider handle, Inline Notification |
| Default | Button·Card·Checkbox·Chip·Input·Search·Switch·Table·Tooltip 등 기본 surface |
| Sunken | Sunken background |

이 표는 적용 역할을 안내하며 모든 제품 컴포넌트의 구현 매핑을 확인한 목록은 아닙니다.
예를 들어 Table 기본 surface와 sticky header, Switch track과 thumb, Card 기본과 hover는 다른 역할입니다.
Default 행에 Switch가 있다고 thumb의 Raised를 제거하거나 Tooltip의 검증된 개별 스타일을 자동 삭제하지 않습니다.

## 기존 컴포넌트와 연결하기

| 이미 확인한 계약 | 대조 결과 | 적용 기준 |
| --- | --- | --- |
| [AgentHubCalendar](../components/AgentHubCalendar/styles.md) | root 효과2개가 Mid와 배열·값까지 같음 | 기존 shadow 유지. Calendar opacity1에 샘플 opacity0.9를 상속하지 않음 |
| [AgentHubSwitch](../components/AgentHubSwitch/styles.md) | thumb4종의 효과2개가 Raised와 같음 | thumb shadow 유지, track은 shadow 없음 |

공용 Elevation 문서 하단의 Menu/Calendar 전용 Mid·Switch thumb Raised도 이미 navy 두 겹을 사용합니다.
따라서 **공용 일반 foundation 토큰과의 차이**와 **컴포넌트 전용 효과의 일치**를 구분합니다.
같은 이름이라는 이유로 `--menu-shadow`, `--cal-shadow`, thumb 전용 토큰을 일반 검정 shadow로 치환하지 않습니다.

공용 Calendar 컴포넌트 CSS는 첫 halo를 `0 0 0 1px`(blur0/spread1), 공용 foundation의 전용 표와 이번 Agent Hub는
`0 0 1px 0`(blur1/spread0)로 기록합니다. 이 차이는 기존 AgentHubCalendar에서 이미 명시한 기준을 유지합니다.
원본 effect의 색상·offset·blur·spread·alpha·배열과 실제 소비 제품 스타일을 대조한 뒤 연결합니다.

컴포넌트가 외곽 popup과 내부 surface를 조합하면 그림자 소유자를 하나로 둡니다. 공용 DatePicker처럼 바깥 popup이
shadow를 소유하고 내부 Calendar shadow만 끄는 규칙을 유지하며 독립 Calendar까지 전역으로 끄지 않습니다.
focus/selected/error를 나타내는 inset shadow는 elevation과 별개이므로 새 box-shadow를 지정하며 지우지 않습니다.
z-index·portal·sticky 기준·scrim·focus trap/복원·Escape 동작도 shadow 레벨 이름으로 바꾸지 않습니다.

## 적용 후 확인

- 샘플6개와 EffectStyle4개의 값·배열이 같고 Default/Sunken에 새 shadow가 생기지 않았는지 대조합니다.
- Mid의 레이어 opacity와 effect alpha, 샘플 geometry/border와 실제 컴포넌트 규격을 구분합니다.
- 기존 Calendar root·Switch thumb의 실측을 유지하고, 표의 다른 대상은 실제 source/callsite·theme token을 조사해 매핑합니다.
- border/그림자 중복, clipping·scroll·focus 표시·sticky/portal의 계층과 실제 배경 대비를 확인합니다.
- Light에서 확인한 값을 dark 검증으로 확대하지 않고 제품 자체의 lint/test/build와 필요한 화면 비교를 수행합니다.

공용 원본의 `npm run verify`·`npm test`는 문서 탐색·선택 범위와 기존 컴포넌트 effect의 참조 정합성을 검사합니다.
실제 제품의 시각·동작 통과를 의미하지 않습니다.
