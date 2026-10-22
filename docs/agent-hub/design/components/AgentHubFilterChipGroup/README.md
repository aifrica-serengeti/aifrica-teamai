# AgentHubFilterChipGroup

선택 가능한 [AgentHubFilterChip](../AgentHubFilterChip/README.md)을 묶는 Agent Hub의 필터 그룹입니다.
칩 간격과 hug·wrap·scroll 배치를 소유하며 필터 값과 데이터 조회는 페이지가 소유합니다.
적용 조건은 [상위 안내](../../README.md)를 따릅니다. 호환되는 기존 그룹 구현을 재사용할 수 있습니다.

직접 의존 계약은 `AgentHubFilterChip`입니다. 공용 Chip의 정보 표시 의미를 그룹에 복사하지 않습니다.
토글 의미·키보드·이름·선택 상태는 FilterChip 확장과 함께 확인합니다.
실제 제품의 source/export는 아직 `unmapped`이며 제품 채택 설정은 `draft`로 유지합니다.

- [정의·지원 범위·중첩 원본](./definition.md)
- [geometry·간격·fade](./styles.md)
- [선택·스크롤·상태 소유권](./behavior.md)
- [접근성](./accessibility.md)
- [검증](./verification.md)
- [3종 Figma 실측 기록](../../references/filter-chip-group.figma.json)
- [중첩18개 조합 대조](../../references/filter-chip-composition.json)

2026-10-20에 Figma [filter-chip-group](https://www.figma.com/design/cUKHT2PdHjAKRXZlzulnO5/?node-id=3099-25232)
3종을 확인했습니다. Figma description의 사용 의도와 실제 overflow·fade 노드를 구분해 기록했습니다.
정적 디자인 참조이며 실제 제품의 선택 동작·스크롤·전체 테마를 검증한 것은 아닙니다.
