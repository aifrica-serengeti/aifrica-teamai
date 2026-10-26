# AgentHubScheduleCard

예약의 제목·메타·active/paused 표시와 독립 일시 중지/재개 조작을 배치하는 Agent Hub 카드입니다.
[상위 적용 조건](../../README.md)을 따르고, 호환되는 기존 카드/예약 제어를 먼저 조사합니다.
없으면 [구현 안내](./implementation.md)에 따라 소비 저장소에 새 export를 개발할 수 있습니다.
제품 source/export는 `unmapped`, 공유 채택 설정은 `draft`입니다.

직접 의존 계약은 `Card`, `Button`, [AgentHubIcon](../AgentHubIcon/README.md)입니다.
공용을 켠 UI 작업에서만 `DOCS_ROOT/frontend/design/components/Card/README.md`와 `DOCS_ROOT/frontend/design/components/Button/README.md`를 함께 읽습니다.
Card/Button은 의미를 연결하는 기준이며 실제 Figma 인스턴스 재사용을 뜻하지 않습니다.
toggle-button은 FRAME이고 내부 glyph만 INSTANCE입니다. AgentHubIconButton 원본을 재사용했다고 기록하지 않습니다.

- [정의와10개 조합](./definition.md)
- [크기·상태·glyph](./styles.md)
- [상태와 명령 owner](./behavior.md)
- [접근성](./accessibility.md)
- [검증](./verification.md)
- [새 구현·기존 구현 연결](./implementation.md)
- [실측](../../references/card.figma.json) · [변수](../../references/card.variables.figma.json) · [자산](../../references/card.assets.json) · [조합 대조](../../references/card-composition.json)

2026-10-21에 Figma [schedule-card](https://www.figma.com/design/cUKHT2PdHjAKRXZlzulnO5/?node-id=3100-171)의
5state×2status를 확인했습니다. 실제 예약 실행·중지/재개·선택·서버 상태까지 실행 검증한 결과는 아닙니다.

## 예약 페이지의 제품 채택 확장

제품이 완료된 일회 예약을 표시할 때는 `status="completed"`를 추가해 같은 제목·메타·footer 구조를 유지합니다.
선택적 `trailingAction`에는 더보기 등 독립 조작을 배치합니다. 이 둘은 제품 호환 확장이며 위 Figma 원본의
추가 VARIANT·INSTANCE_SWAP 속성이 아닙니다. [정의](./definition.md)와 [구현 연결](./implementation.md)에서 범위를 구분합니다.

조회·편집을 여는 주 명령은 제목뿐 아니라 카드 여백·상태 영역에서도 동작할 수 있습니다.
기존 native button의 hit area를 카드 표면까지 확장하고 더보기·중지/재개는 형제 조작으로 분리합니다.
공용 원본의 `unmapped`/`draft`는 유지하고 실제 source/export·지원 범위·실행 검증은 소비 제품의 로컬 mapping에 기록합니다.
