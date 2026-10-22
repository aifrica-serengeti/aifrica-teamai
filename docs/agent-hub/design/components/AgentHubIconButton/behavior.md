# AgentHubIconButton — 상태와 동작

공용 IconButton의 native button·Enter/Space 활성화·실제 disabled 차단을 유지합니다.
hovered는 hover, pressed는 누르는 순간의 active 상태입니다. Figma의 별도 `active`를 CSS `:active`와
같은 뜻으로 매핑하지 않습니다. 요청 성공·로딩 상태로도 임의 해석하지 않습니다.

`active`의 실제 의미는 소비 제품이 정합니다. toggle 선택을 의미하면 호출부가 상태를 소유하고
`aria-pressed`를 연결합니다. 팝업 열림이면 `aria-expanded`·연결 대상 등 실제 컨트롤 의미를 따릅니다.
Figma 색상만으로 두 의미 중 하나를 결정하지 않습니다. active+hover/pressed의 합성 표현은 이 노드에 없습니다.

disabled일 때 클릭·키보드 동작과 hover/pressed 스타일이 다시 활성화되지 않도록 합니다.
요청 중 상태·중복 실행 방지·권한은 호출부가 소유하고, loading spinner나 모션은 추가 디자인 없이 만들지 않습니다.
Tooltip과 접근성 이름은 호출 동작에 맞춰 안정적으로 유지합니다.

색상 전환을 사용하면 공용의 background/border 0.2s ease 기준을 따르고 `transition: all`을 쓰지 않습니다.

2026-10-21 [모션 채택 계약](../../motion.md)은 background-color·border-color·color를200ms ease로 연결합니다.
active의 의미나 크기·glyph를 바꾸지 않고 눌림 scale·회전·loading 모션을 새로 만들지 않습니다.
reduced-motion에서는 전환만 즉시 완료하며 native focus·키보드·disabled 차단은 유지합니다.
