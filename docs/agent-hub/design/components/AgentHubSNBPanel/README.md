# AgentHubSNBPanel

새 채팅 action과 고정됨·프로젝트·채팅 목록을 배치하는 Agent Hub의288px 전용 패널입니다.
[상위 적용 조건](../../README.md)을 따릅니다. 기존 호환 목록·Button·header·행 구현을 먼저 확인해 연결하고 새 래퍼나 CMP SNB 복제를 강제하지 않습니다.

직접 의존 계약은 [AgentHubSNBSectionHeader](../AgentHubSNBSectionHeader/README.md), [AgentHubSNBItem](../AgentHubSNBItem/README.md),
[AgentHubButton](../AgentHubButton/README.md), `Divider`, [AgentHubScrollbar](../AgentHubScrollbar/README.md), `Scrollbar`입니다.
실제 Figma 재사용은 header·행·primary40 Button·Horizontal Divider입니다. Scrollbar 인스턴스는 원본에 없으며,
현재 구현은 목록에 AgentHubScrollbar의 공용 엔진·Agent Hub skin과 hover/focus/drag 노출을 연결합니다.
공용을 켠 UI 작업에서만 `DOCS_ROOT/frontend/design/components/Divider/README.md`와 `DOCS_ROOT/frontend/design/components/Scrollbar/README.md`를 함께 읽습니다.
실제 제품 source/export는 `unmapped`, 공유 설정은 `draft`입니다.

- [구성과 실제 하위 원본](./definition.md)
- [치수·paint·잘림](./styles.md)
- [동작과 상태 소유권](./behavior.md)
- [접근성](./accessibility.md)
- [제품 API와 배치 recipe](./implementation.md)
- [검증](./verification.md)
- [실측](../../references/snb.figma.json) · [변수](../../references/snb.variables.figma.json) · [자산](../../references/snb.assets.json)

2026-10-21에 Figma [snb `2611:63754`](https://www.figma.com/design/cUKHT2PdHjAKRXZlzulnO5/?node-id=2611-63754)의 Light 단일 COMPONENT와 실제 override를 확인했습니다.
전체 제품 SNB와 rail 조합은 [별도 계약](../AgentHubSNB/README.md)을 따릅니다. 보드 전시 간격·모서리·폭은 앱 shell 규격이 아닙니다.

현재 채택 동작은 [상태·모션·스크롤 계약](../../motion.md)을 함께 읽습니다. 정적 Figma 관찰과 계승 동작을 구분합니다.

2026-10-23에 화면 인스턴스 [SNB `3016:108416`](https://www.figma.com/design/cUKHT2PdHjAKRXZlzulnO5/?node-id=3016-108416)의
288×1033·list y113·하단 fade53px를 다시 확인했습니다. 현재 구현에서는 공용 ScrollArea의 실제 측정으로
상하 경계 흐림을 각각 제어하고, 하단24px 여백을 스크롤 콘텐츠 끝에 둡니다.
하단 표현은 원본 대조, 상단 반전 표현과 표시 조건은 이번 사용자 채택입니다. 원본 JSON·공개 props·의존성은 유지합니다.
추가 사용자 보완으로 SNB만 gutter27px·행↔thumb 간격21px·패널 오른쪽 경계↔thumb 끝3px·track 하단27px를 사용합니다.
공용 엔진의 추가 끝 여백24px를 표시와 drag에 함께 적용하며, 콘텐츠·끝 여백24px·다른 소비자의 기본 gutter11px는 유지합니다.
