# AgentHubSwitch — 상태와 동작

공용 Switch의 이진 값·controlled/uncontrolled API·상태 소유권을 유지합니다.
`checked`와 `defaultChecked`의 사용 방식, `onCheckedChange`에 해당하는 변경 통지는 소비 제품의 기존 컴포넌트와 연결합니다.
부모가 소유한 값을 시각 상태용 내부 값으로 복제하거나 toggle 한 번에 변경 통지를 두 번 보내지 않습니다.

Figma `checked=true/false`는 On/Off 값이고 `state=enabled/disabled`는 조작 가능 여부입니다.
값이 false라는 이유로 disabled로 처리하거나 disabled 전환 때 checked를 초기화하지 않습니다.
디자인 문맥에서 생성된 boolean 예제보다 원본 component set의 이 속성 구분과 4종 matrix를 기준으로 매핑합니다.

enabled에서는 포인터와 키보드로 값을 전환하고, disabled에서는 실제 입력·변경 이벤트를 차단합니다.
색상만 회색으로 만들고 click·키보드 조작을 남기지 않습니다. 비동기 저장·권한·실패 복구는 제품의 상태 owner가 관리합니다.
설정 변경이 즉시 적용되는지 별도 제출을 기다리는지는 실제 제품의 field 계약을 확인합니다.

read-only·invalid·focus·loading의 시각 변형은 이번 Figma 노드에 없습니다.
제품에서 해당 상태를 지원하면 공용의 의미를 유지합니다. read-only는 변경을 막되 enabled 시각을 유지하는 별도 상태이며,
단순히 disabled 색상으로 치환하지 않습니다. 실제 disabled와 validation이 겹칠 때는 disabled가 우선합니다.
미확인 시각 값은 근거와 함께 제품에 매핑하고, 없는 Figma variant를 검증 완료로 표시하지 않습니다.

모션은 이 노드에서 확인하지 않았습니다. 공용 전환 기준을 채택하면 track의 색상 속성과 thumb의 transform·색상만
0.2s ease로 전환하고 `transition: all`은 사용하지 않습니다. 제품의 reduced-motion 처리가 실제 적용되는지도 확인합니다.
track·thumb를 실제 요소로 렌더하며 상태별 SVG 교체로 키보드·접근성·전환을 대신하지 않습니다.

2026-10-21 [모션 채택 계약](../../motion.md)은 위 공용200ms ease를 제품 전환 기준으로 채택합니다.
thumb의 최종 이동거리는18px이며 spring·overshoot·scale을 추가하지 않습니다.
reduced-motion에서는 transform·색상 전환을 즉시 완료하고 checked·controlled 소유권과 조작 결과는 그대로 유지합니다.
