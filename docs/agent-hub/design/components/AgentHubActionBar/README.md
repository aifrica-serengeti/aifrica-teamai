# AgentHubActionBar

목록·테이블에서 항목을 선택했을 때 선택 개수와 일괄 작업을 보여 주는 Agent Hub 확장입니다.
공용 `ActionBar`의 선택·실행·접근성 계약을 유지하고 inverse 색상·40/48px 높이·내부 조작 치수만 구체화합니다.
[확장 적용 조건](../../README.md)을 따릅니다. 실제 제품 source/export는 `unmapped`, 공유 채택 상태는 `draft`입니다.

2026-11-05에 Figma [action-bar](https://www.figma.com/design/cUKHT2PdHjAKRXZlzulnO5/?node-id=3610-24772)의
size48/40 두 variant, 내부 action의8개 variant, icon-action의4개 variant를 확인했습니다.
내부 두 종류는 부모 안에서 쓰는 compound part이며 별도 공개 registry ID를 늘리지 않습니다.
공용을 켠 UI 작업에서 `DOCS_ROOT/frontend/design/components/ActionBar/README.md`를 함께 읽습니다.

- [정의·슬롯과 공용 차이](./definition.md)
- [외곽 치수·변수·그림자](./styles.md)
- [내부 action·icon-action의12개 조합](./parts.md)
- [동작과 상태 소유권](./behavior.md)
- [접근성](./accessibility.md)
- [검증](./verification.md)
- [구현 연결](./implementation.md)
- [실측](../../references/cards-actions-refresh.figma.json) · [자산](../../references/components-refresh.assets.json)

Figma 설명의 hug/fill960은 배치 의도이며 별도 width variant가 관찰된 것은 아닙니다.
설명의 ‘state5종’과 달리 실제 내부 matrix는 enabled/hovered/pressed/disabled 네 상태뿐입니다.
제품 구현이나 다섯 번째 focus variant를 확인했다고 해석하지 않습니다.
