# AgentHubRuntimeSelectItem — 검증

문서와 exact export를 대조한 참조 계약입니다. 제품 구현·브라우저 동작 검증을 대신하지 않습니다.

- 40px 행·padding8·radius0·leading20·trailing16을 확인합니다.
- default/hovered/selected와 현재값·탐색값을 따로 검증합니다.
- 마우스와 방향키/Enter로 같은 런타임을 선택하며 중복 이벤트가 없는지 확인합니다.
- focus-visible·확대·긴 문자열·reduced-motion과 실제 API/export를 제품에서 검증한 뒤 로컬 매핑에 기록합니다.
- 새로운 state나 timing이 필요하면 원본 확인값과 제품 채택값을 구분합니다.
