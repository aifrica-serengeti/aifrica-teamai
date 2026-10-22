# AgentHubSessionItem

Session Panel의 예약·출력 항목을 보여 주는 행입니다. [상위 적용 조건](../../README.md)을 따르며,
표시 데이터·선택·실행 결과는 [Session Panel](../AgentHubSessionPanel/README.md)과 제품 owner가 관리합니다.
호환되는 기존 행이 없으면 [구현 안내](./implementation.md)에 따라 소비 저장소에 새 export를 만들 수 있습니다.

직접 의존 계약은 `Button`, [AgentHubIcon](../AgentHubIcon/README.md)입니다.
Button은 단일 활성화·keyboard·focus 의미를 참고하는 기준이며 실제 Figma Button 인스턴스를 재사용한 것은 아닙니다.
아이콘은 확인한 하위 원본과 자산 adapter를 연결합니다. 공용을 켠 UI 작업에서만
`DOCS_ROOT/frontend/design/components/Button/README.md`를 함께 적용합니다.
실제 제품 source/export는 `unmapped`, 공유 채택 설정은 `draft`입니다.

- [정의와 표시 속성](./definition.md)
- [크기·색상·아이콘](./styles.md)
- [동작과 상태 소유권](./behavior.md)
- [접근성](./accessibility.md)
- [검증](./verification.md)
- [새 구현·기존 구현 연결](./implementation.md)
- [Figma 실측](../../references/session.figma.json), [변수](../../references/session.variables.figma.json), [자산](../../references/session.assets.json)
- [조합 대조](../../references/session-composition.json)

2026-10-21에 Figma [session/item](https://www.figma.com/design/cUKHT2PdHjAKRXZlzulnO5/?node-id=2986-22114)의
default/hovered/pressed/selected 네 상태와 실제 Panel의 예약·출력 인스턴스를 확인했습니다.
파일 열기·다운로드·예약 편집·요청·추가 상태의 앱 동작까지 검증한 것은 아닙니다.
