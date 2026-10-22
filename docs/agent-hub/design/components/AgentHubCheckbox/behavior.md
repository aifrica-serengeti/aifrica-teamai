# AgentHubCheckbox — 선택과 상태 소유권

공용 Checkbox의 false / true / indeterminate 모델과 controlled/uncontrolled 계약을 유지합니다.
checked와 defaultChecked를 동시에 다른 상태의 소유자로 두지 않으며 controlled 값은 호출자가 갱신합니다.
한 번의 label click·Space가 선택 통지를 두 번 발생시키지 않게 기존 native/primitive 이벤트를 사용합니다.
Figma type은 선택 상태, state는 enabled/disabled이므로 checked와 disabled를 같은 Boolean으로 처리하지 않습니다.

indeterminate는 일부 하위 항목이 선택된 집계 상태입니다. 공용의 mixed 조작→전체 선택 기준을 유지하고,
Table/Tree/페이지가 실제 집계 대상과0/전체/일부 판정을 소유합니다. Figma에 세 모양이 있다는 이유로
사용자가 세 상태를 순서대로 순환하는 독립3값 토글을 만들지 않습니다.

disabled는 현재 checked/mixed 표시를 유지하면서 실제 pointer·keyboard·변경 통지를 차단합니다.
read-only도 값 변경을 차단하되 공용의 enabled 시각·default cursor 계약을 유지합니다.
이번 노드에 read-only가 없다는 이유로 disabled 색상으로 대체하지 않습니다.
참조 코드만으로 read-only 입력 차단·색상 분리나 uncontrolled 초기 mixed 표시가 확인됐다고 판단하지 않습니다.

공용의 label 연결·form name/value·required/invalid 피드백과 group 값 소유권을 유지합니다.
Box·Mark의 SVG는 해당 primitive의 indicator이며 별도 선택 상태·click handler를 갖지 않습니다.
SVG state별 교체나 스타일 변경이 native input을 재생성해 focus·값·form 참여를 잃게 하지 않습니다.

이 Figma에는 박스 hover/pressed나 새 모션이 없습니다. 공용 Checkbox도 박스의 별도 hover/pressed 색을 정의하지 않으며,
enabled 라벨·도움말 hover 기준은 기존 공용을 유지합니다. read-only/disabled에 hover 피드백을 적용하지 않습니다.
error/loading·API 호출·선택 결과에 따른 업무 동작은 기존 호출자/페이지가 소유합니다.

## 2026-10-21 채택 모션

이번 사용자 요청으로 [모션 채택 계약](../../motion.md)의 Mark 진입160ms ease-out·퇴장120ms ease-in을 추가합니다.
Mark의 원본 좌표·크기를 고정하고 opacity0↔1만 전환합니다. Box·hit area·label도 scale하지 않습니다.
이전 scale0.8↔1은 진입 끝에서 체크의 왼쪽 윤곽이 이동해 보이는 문제 때문에 폐기했습니다.
정렬용 translate·left/top·width/height·transform-origin을 상태별로 변경하거나 fade 종료 때 정렬 방식을 교체하지 않습니다.
Box의 배경·border-color와 라벨 색상은 기존 공용200ms ease를 유지합니다.
공용의 기존 Mark는 즉시 표시/숨김이며 이 진입·퇴장 수치는 Figma 실측이나 원본 복원이 아닌 새 채택값입니다.

원본 Mark를 분리한 제공 자산의 path·native 크기·1px round stroke를 보존합니다. 전체 Box+Mark SVG를
통째로 확대하거나 별도 체크 glyph를 그리지 않습니다. native input과 Box는 상태 변경 동안 계속 유지합니다.
장식 Mark를 계속 마운트해 opacity만 전환하면 별도 timer가 필요하지 않습니다.
퇴장 뒤 DOM을 제거하는 구현을 선택하면 취소·unmount·reduced-motion에서 미완료 listener/timer를 정리합니다.
빠른 true/false/mixed 전환에서는 마지막 controlled 값이 우선하며 종료 callback으로 값을 되돌리거나 변경 통지를 보내지 않습니다.
reduced motion에서는 Mark·Box 모두 즉시 최종 상태를 표시하고 선택 의미·Tab·focus·form 참여를 유지합니다.
