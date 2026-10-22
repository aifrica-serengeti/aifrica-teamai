# AgentHubButton — 상태와 동작

공용 Button의 native button·Enter/Space 활성화·실제 disabled 차단 계약을 유지합니다.
기본 HTML type은 `button`이고 폼 제출일 때만 `submit`을 명시합니다.
Figma hovered/pressed를 제품의 hover/active 상태에 연결하되 disabled일 때 활성 상태 스타일과 이벤트가 다시 적용되지 않게 합니다.

`state`는 디자인 검증용 표현이며 클릭·요청 성공 상태를 버튼 내부에 숨기는 API가 아닙니다.
비동기 처리·중복 제출 방지·권한은 호출부의 기존 상태 소유권을 유지합니다.
loading 모양과 전환 모션은 이 노드에서 정의하지 않았습니다.

keycap은 단축키를 표시하는 slot입니다. `Esc` 예시 3개는 실제 단축키 등록이나 해당 키로 클릭을
실행하라는 뜻이 아닙니다. 제품이 소유한 실제 명령·사용 범위와 일치하는 힌트만 표시합니다.
키 이벤트는 해당 command owner에서 등록·해제하고 텍스트 입력·dialog의 Escape 처리와 충돌하지 않게 합니다.

색상 전환을 적용하면 공용 Button의 색상 속성별 transition 기준을 유지하고 `transition: all`은 사용하지 않습니다.
원본 스타일을 실제 제품에 연결한 후에만 source/public export를 로컬 구현 mapping에 기록합니다.

2026-10-21 채택 변경에서는 secondary의 아이콘과 라벨을 같은 currentColor로 연결합니다.
배경·선·글자색은 각 속성별200ms ease로 전환하며 크기·padding·width를 애니메이션하지 않습니다.
[모션 채택 계약](../../motion.md)에 따라 reduced motion에서는 즉시 최종 상태를 표시합니다.
