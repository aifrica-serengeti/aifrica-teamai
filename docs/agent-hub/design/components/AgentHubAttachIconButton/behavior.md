# AgentHubAttachIconButton — 상태와 동작

공용 IconButton의 native button·Enter/Space 활성화·실제 disabled 차단 계약을 유지합니다.
기본 HTML type은 `button`입니다. 첨부 버튼이 폼 안에 있다는 이유로 전송 버튼이 되지 않게 합니다.
hovered/pressed는 hover/누르는 동안의 표현이며 disabled에서는 해당 스타일과 이벤트를 차단합니다.

첨부 동작은 제품이 소유합니다. `onClick`이 파일 선택기를 여는지 메뉴를 여는지 이 Figma 노드만으로 결정하지 않습니다.
파일 선택·허용 형식·용량·개수·취소·권한·비동기 처리·중복 요청 방지는 기존 제품 상태와 연결합니다.
선택기 열기나 업로드 성공을 버튼 내부의 임의 상태로 숨기지 않습니다.

`state5`의 의미는 확인하지 못했습니다. 제품에서 채택하기 전 실제 의미·진입/해제 조건·disabled와의 우선순위를
문서로 남기고, 확인한 상태 owner의 값을 표시합니다. selected·menu open·active로 자동 해석하거나
클릭마다 `state5`를 토글하지 않습니다. 의미가 매핑되지 않았다면 제품 기본 동작에 자동 사용하지 않습니다.

loading 모양·전환 모션은 미정입니다. 비동기 중에도 동작명과 라벨을 안정적으로 유지하고 중복 실행을 차단합니다.
색상 전환이 필요하면 공용의 색상 속성별 transition 기준을 따르며 `transition: all`은 사용하지 않습니다.
Tooltip은 별도 공용 컴포넌트와 조합하고 버튼 안에 자체 Tooltip 상태나 portal을 만들지 않습니다.
검증한 기존 구현을 재사용할 수 있으며 실제 source/public export만 제품의 로컬 mapping에 기록합니다.

2026-10-21 [모션 채택 계약](../../motion.md)은 background-color·border-color·color의200ms ease만 채택합니다.
plus·전송 화살표를 회전하거나 버튼 전체를 scale하지 않으며 state5의 제품 의미를 새로 정하지 않습니다.
reduced-motion에서는 색상 전환을 즉시 완료하고 focus·native 활성화·disabled 차단을 유지합니다.
