# AgentHubSessionProgressStep

세션 진행 단계의 완료·현재·대기 상태를 표시하는 전용 조합입니다. [상위 적용 조건](../../README.md)을 따릅니다.
[SessionPanel](../AgentHubSessionPanel/README.md)이 실제 단계·순서·진행 상태를 소유하고 이 부품은 표시를 담당합니다.
기존 구현이 없으면 [구현 안내](./implementation.md)에 따라 소비 제품에 새 export를 만들 수 있습니다.

직접 의존 계약은 `Divider`입니다. 실제 Vertical Divider를 짧게 연결한 원본이며 일반 Icon·Stepper·애니메이션 Spinner 재사용이 아닙니다.
공용을 켠 UI 작업에서만 `DOCS_ROOT/frontend/design/components/Divider/README.md`의 관련 계약을 읽습니다.
실제 제품 source/export는 `unmapped`, 공유 채택 설정은 `draft`입니다.

- [정의와 실제 단계](./definition.md)
- [치수·상태색·연결선](./styles.md)
- [진행 데이터와 동작](./behavior.md)
- [접근성](./accessibility.md)
- [검증](./verification.md)
- [기존 구현·신규 구현 연결](./implementation.md)
- [실측](../../references/session.figma.json) · [변수](../../references/session.variables.figma.json) · [자산](../../references/session.assets.json) · [조합 대조](../../references/session-composition.json)

2026-10-21에 Figma [session/progress-step](https://www.figma.com/design/cUKHT2PdHjAKRXZlzulnO5/?node-id=2987-22132)의
done/active/pending과 부모의 실제 네 단계·마지막 connector=false 구성을 확인했습니다. active 표시는 정적 원본입니다.

[현재 사용자 채택](./styles.md#사용자-채택-고정-중심과-halo)은 원본20px 자산·박스를 유지하면서 파란 중심12px만 노출하고 하늘색은 움직이는 halo로만 표현합니다.
이 계약은 원본의 정적 하늘색 테두리를 남긴 채 파동을 추가하던 이전 채택을 대체합니다.
1600ms/ease-out/scale1→1.08→1.6/opacity0→.6→0은 제안값이며 Figma에서 측정한 애니메이션이 아닙니다.
