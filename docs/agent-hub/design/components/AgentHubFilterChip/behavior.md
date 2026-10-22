# AgentHubFilterChip — 선택과 동작

필터 조건 값·selected·count는 호출자/페이지가 소유합니다. Chip은 의도를 한 번 전달하고 결과를 표현합니다.
필터 API·결과 조회·pagination 초기화·loading/error·URL 저장을 내부에 숨기지 않습니다.
selected는 지속되는 적용 상태이며 hovered/pressed는 순간 상호작용입니다. disabled에서도 현재 선택 의미를 지우지 않습니다.

제품의 기존 호환 가능한 조작 primitive나 native button을 사용합니다. 단일/다중 선택 모델은
[group 계약](../AgentHubFilterChipGroup/behavior.md) 또는 호출자가 명시하며, 단순 toggle은 선택 변경을 한 번 통지합니다.
동일한 포인터 조작을 keydown과 click에서 중복 처리하지 않습니다. disabled는 native 의미·실제 입력·변경 통지를 함께 차단합니다.
Figma state 문자열을 API 성공이나 요청 중 상태로 대신하지 않습니다.

leading icon과 count는 장식/정보 표시이며 별도 버튼이나 tab stop을 만들지 않습니다.
count의 ‘3’은 예시이고 실제 필터 항목 수·검색 결과 수 중 무엇을 뜻하는지 호출자가 정합니다.
0의 노출 정책도 호출자가 명시하며 Boolean count를 값이 truthy인지로 암묵 변환하지 않습니다.

trailing chevron이 드롭다운을 뜻하면 실제 팝업 소유자의 열림/닫힘·focus 계약에 연결합니다.
x로 바꾼 제거형은 적용 필터 해제 의미를 명확히 하고 단순 선택 변경과 구분합니다.
전체 Chip이 같은 명령을 실행하면 glyph는 장식으로 두고 조작 주체를 하나만 만듭니다.
선택과 제거가 독립 명령이면 비상호작용 group 안의 형제 조작으로 나누거나 제품의 검증된 구조를 사용합니다.
button 안에 제거용 button을 중첩하거나 클릭 전파 차단만으로 이 문제를 해결하지 않습니다.

설명에 있는 focused를 이유로 미제공 variant를 존재한다고 가정하지 않습니다. keyboard focus를 유지하는 실제 스타일을
제품에서 확인하며 hover/pressed·border 복원으로 선택 의미를 잃지 않게 합니다. read-only/loading의 새 상태는 제공되지 않았습니다.
조건 목록·라벨·count·순서가 바뀌면 stable id와 기존 상태 소유권을 유지하고 예시 ‘전체’를 모든 필터의 업무 규칙으로 고정하지 않습니다.

2026-10-21 채택 구현은 [선 공간 예약](./styles.md)으로 selected 변경 시 폭을 유지합니다.
배경·border-color·color만200ms ease로 전환하며 width·padding·scale을 추가하지 않습니다.
count 배지는 별도 버튼이 아닌 정보용 영역으로 유지하며, 자체 배경색·글자색에도 각각200ms ease를 적용합니다.
선택을 빠르게 반복해도 현재 표시 색에서 새 상태로 전환하며, 이전 색으로 지연 복귀하지 않아야 합니다.
[모션 채택 계약](../../motion.md)의 reduced-motion 즉시 완료와 disabled 우선순위를 유지합니다.
