# AgentHubTextButton — 정의

짧은 동작 label과 오른쪽 아이콘을 함께 표시하는 24px 높이의 텍스트 버튼입니다.
Figma의 속성은 `state` 네 가지이며 다른 크기나 primary/negative 변형은 이 노드에 없습니다.
기존 제품 TextButton에 스타일과 아이콘 slot을 연결하고 새 래퍼 생성을 강제하지 않습니다.

보이는 구조는 button 안의 label과 `icon/arrow-right/16`입니다.
원본 glyph source는 node `2199:23721`이며 `AgentHubIcon`의 arrow-right/16 자산과 일치합니다.
직접 의존 계약은 `TextButton`, `AgentHubIcon`입니다. 예시 label `text`와 폭48px을 제품 상수로 고정하지 않습니다.

네 variant에는 14px `System icon` instance가 있지만 모두 `visible: false`입니다.
이 레거시 노드는 배치 공간을 차지하지 않으며, 이 디자인이 leading icon을 지원한다는 근거가 아닙니다.
제품에 보이는 plus를 추가하거나 해당 숨김 자산을 새 의존성으로 만들지 않습니다.

제품 API는 실제 label·action·disabled와 필요한 기존 slot에 맞춰 연결합니다.
Figma의 state 기본값 enabled나 정적 `text` 노드를 검증된 앱 props로 취급하지 않습니다.
공용 TextButton의 나머지 크기·slot을 이 노드의 확인된 지원 범위에 자동 추가하지 않습니다.
