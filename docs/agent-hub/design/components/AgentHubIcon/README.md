# AgentHubIcon

Agent Hub 전용 system icon 자산 계약입니다. 공용 `Icon`의 의미·접근성 원칙을 이어받되
16px 선 두께와 이름·도형은 Agent Hub 원본을 사용합니다. 적용 조건은 [상위 안내](../../README.md)를 따릅니다.

2026-11-05 기준 canonical 묶음은 과거 source 208개를 보존하고 확인한 신규 source 2개를 더한
SVG 208개·이름 74종입니다. 최신 Figma archive의 source 수 266개와 배포 자산 수는 다릅니다.
새 `refresh-cw/24`, `chevron-up/16`은 Figma가 제공한 SVG 원본을 그대로 추가했습니다.
이는 실행 UI 라이브러리가 아니며, 기존 제품의 Icon 구현이 이 계약을 지원하면 그대로 재사용합니다.
직접 의존 공용 컴포넌트는 없습니다. 버튼·tooltip이 필요하면 호출부에서 조합합니다.

최신 보드 266개는 이름·크기를 전수 대조했습니다. 개별 context 144개와 다른 컴포넌트 context에서
복구한 source 3개를 포함해 SVG 147개를 확인했습니다. 나머지 119개는 이번 회차의 vector를
확인하지 못했습니다. 이 가운데 신규 58개는 이름만 보고 자산이나 stroke를 만들지 않았습니다.
전체 source ID·신규 후보·유지 근거·미확인 범위는 [아이콘 갱신 원장](../../references/icons-refresh-2026-11-05.json)에 있습니다.

- [정의와 입력](./definition.md)
- [크기·선·색상](./styles.md)
- [상태와 동작](./behavior.md)
- [접근성](./accessibility.md)
- [검증](./verification.md)
- [자산 찾기](../../assets.md), [manifest](../../asset-manifest.json)
