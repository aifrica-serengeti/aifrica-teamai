# AgentHubSessionContextItem

Session Panel에서 컨텍스트 그룹·대표 값·개수 문구를 보여 주는 행입니다.
[상위 적용 조건](../../README.md)을 따르고 실제 목록·선택·활성화 결과는 [Session Panel](../AgentHubSessionPanel/README.md)과 제품이 소유합니다.
기존 행을 먼저 확인하고, 없으면 [구현 안내](./implementation.md)에 따라 가까운 범위에 새 export를 만들 수 있습니다.

직접 의존 계약은 `Button`, [AgentHubIcon](../AgentHubIcon/README.md)입니다.
Button은 단일 활성화·keyboard·focus 의미를 채택하는 기준이며 실제 Figma Button 인스턴스가 아닙니다.
아이콘은 확인한 실제 source와 정확한 자산을 연결합니다. 공용을 켠 UI 작업에서만
`DOCS_ROOT/frontend/design/components/Button/README.md`도 적용합니다.
제품 source/export는 `unmapped`, 공유 채택 설정은 `draft`입니다.

- [정의와 컨텍스트 원본](./definition.md)
- [크기·색상·배치](./styles.md)
- [동작과 상태 소유권](./behavior.md)
- [접근성](./accessibility.md)
- [검증](./verification.md)
- [새 구현·기존 구현 연결](./implementation.md)
- [Figma 실측](../../references/session.figma.json), [변수](../../references/session.variables.figma.json), [자산](../../references/session.assets.json)
- [조합 대조](../../references/session-composition.json)

2026-10-21에 Figma [session/context-item](https://www.figma.com/design/cUKHT2PdHjAKRXZlzulnO5/?node-id=2987-22151)의
default/hovered/pressed/selected 네 상태와 실제 Panel의 다섯 그룹을 확인했습니다.
이 행이 Flyout을 여는 trigger이거나 실제 연결·해제·권한 API까지 구현된 것으로 판단하지 않습니다.

2026-10-23 사용자 요청으로 긴 대표 value는 말줄임표 대신 끝 흐림과 hover/focus 이동을 사용합니다.
[긴 제목 채택 계약](../../title-overflow.md)의 공용 helper·신규 제안값·접근성·취소 수명을 따릅니다.
icon·고정66px label-group·count와 단일 활성화 경로를 유지하며 원본 ENDING/maxLines1 실측·공개 props·공유 unmapped/draft 상태를 바꾸지 않습니다.
