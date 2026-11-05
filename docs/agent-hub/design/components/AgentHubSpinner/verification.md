# AgentHubSpinner — 검증

문서와 exact export를 대조한 참조 계약입니다. 제품 구현·브라우저 동작 검증을 대신하지 않습니다.

- 5개 native SVG의 box·stroke·gradient·hash를 확인합니다.
- Tiny1.5px와 공용2px의 차이를 보존합니다.
- 요청 완료/실패 시 제거·중복 status 방지·reduced-motion에서 회전 정지와 로딩 의미 유지를 확인합니다.
- Spinner 자체가 focus 대상이 되지 않으며, 호스트 조작의 focus와 상태 안내·확대·실제 API/export를 제품에서 검증한 뒤 로컬 매핑에 기록합니다.
- 새로운 state나 timing이 필요하면 원본 확인값과 제품 채택값을 구분합니다.
