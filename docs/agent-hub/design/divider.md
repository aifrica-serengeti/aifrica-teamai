# Agent Hub Divider 재사용 확인

확인한 가로 Divider는 공용과 시각 차이가 없습니다. 기존 Divider를 재사용하며 새 `AgentHubDivider`·스킬·필수 래퍼를 추가하지 않습니다.
[상위 적용 조건](./README.md)에 따라 공용을 켠 UI 작업에서만 `DOCS_ROOT/frontend/design/components/Divider/README.md`와 관련 문서를 함께 읽습니다.
`inheritCommon: false`이면 이 비교로 공용 계약이나 컴포넌트를 강제하지 않습니다.

## 어떤 원본을 확인했나요?

요청한 [Component 보드 `3074:101330`](https://www.figma.com/design/cUKHT2PdHjAKRXZlzulnO5/?node-id=3074-101330)는 FRAME입니다.
그 안의 실제 [divider COMPONENT `3155:20478`](https://www.figma.com/design/cUKHT2PdHjAKRXZlzulnO5/?node-id=3155-20478)와
자식 line RECTANGLE `3155:20477`을2026-10-21 Light mode에서 확인했습니다.
보드 전체를 Divider 하나로 매핑하거나 보드의 다른 컴포넌트를 함께 포함하지 않습니다.

| 비교 항목 | 공용 가로 Divider | 확인한 Agent Hub 원본 |
| --- | --- | --- |
| 선 두께 | 1px | 1px·동일 |
| 선 색상 | `--border-default`·Light #DDDDDD | `color/border/default` → `gray/300`·#DDDDDD·동일 |
| 선 위아래 여백 | 각각8px | 각각8px·동일 |
| 전체 높이 | 8+1+8=17px | 17px·동일 |
| 선 길이 | 부모 가로폭을 채움 | line 폭 FILL·샘플168px |
| wrapper 표면 | 투명·별도 선/그림자 없음 | fill/stroke/effect 없음·radius0·opacity1 |

원본 root는168×17px·폭 FIXED/높이 HUG·세로 Auto layout·좌우 padding0입니다.
line은 root 안 x0/y8·168×1px·가로 FILL/세로 FIXED·AUTO 배치이며 불투명 SOLID #DDD입니다.
168px는 비교 샘플 폭입니다. 실제 사용처에서는 기존 Divider의 부모 폭 채우기 계약을 유지하고 전역 고정 폭으로 쓰지 않습니다.
저장된 gap10은 자식이 하나라 실제 간격을 만들지 않습니다. 높이에10px를 더하거나 별도 여백으로 복사하지 않습니다.

root와 line에 `strokeWeight=1` metadata가 있어도 strokes는 비어 있습니다.
보이는 선은 RECTANGLE의1px fill이므로 border를 추가해2px로 만들지 않습니다. 두 노드에 효과는 없고 root clipping은 false·overflowDirection은 NONE입니다.
색상 binding은 `VariableID:3081:106` → `VariableID:3077:20`입니다.
[실측](./references/divider.figma.json)과 [변수 기록](./references/divider.variables.figma.json)에 원본을 보존합니다.
props는 비어 있고 variant는 null·reactions는 비어 있으며 INSTANCE·TEXT·SLOT은 없습니다.
가로 Light 한 샘플로 dark·세로 방향·모션·실제 제품 구현까지 확인했다고 기록하지 않습니다.

## 기존 조합은 그대로 연결해 주세요

공용을 채택한 제품에서는 방향·장식/의미 구분·비상호작용·접근성 계약을 유지하고 기존 호환 구현에 연결합니다.
장식 구분선에 클릭·Tab·선택 상태를 추가하지 않습니다. 섹션 경계를 전달하려면 실제 문맥에 맞는 separator·heading/label을 사용합니다.
여백8px는 Divider에 포함되므로 부모에서 같은 여백을 중복 적용하지 않습니다.

이 확인은 기존 Agent Hub의 nested source를 새 원본으로 교체하라는 뜻이 아닙니다.
Composer·UserMessage의17×12px, PickerFooter의17×14px, SessionProgressStep의17×4px는 실제 `2019:118` 인스턴스의 override입니다.
FileItem의17×8px Divider는 다른 source `2874:45712`이며 숨김 size-divider VECTOR도 별도입니다.
Menu·Flyout의 구획선 FRAME, Breadcrumb의 문자/화살표와 OutputViewer의 점을 이 가로 Divider로 일괄 바꾸지 않습니다.

공용 구현 예시는 `className`을 wrapper에 적용하지만, 읽기 전용으로 확인한 CMP의 실제
`src/core/components/common/divider/Divider.tsx`는 내부 Radix 선에 적용합니다. wrapper 크기/여백을 조절할 때 실제 adapter 대상을 확인합니다.
공용 문서의 전역 reduced-motion 해제 설명도 실제 CMP Divider/global 스타일에서는 확인되지 않았으므로 제품에서 검증합니다.
이 source 차이를 새 Agent Hub 시각 차이나 기존 구현 수정 완료로 기록하지 않습니다.

실제 consuming repository의 source/public export와 방향·크기·장식/의미·token·모션을 확인한 뒤 로컬 mapping에 기록합니다.
그 전에는 `unmapped`와 공유 설정의 `draft`를 유지합니다. 비교용 문서나 CMP의 export 존재가 Agent Hub 구현 증거는 아닙니다.
