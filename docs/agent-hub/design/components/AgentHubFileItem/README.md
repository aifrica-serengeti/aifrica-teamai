# AgentHubFileItem

파일 타일·파일명·형식·확장자와 다운로드 버튼을 조합한 출력 파일 행입니다.
[상위 적용 조건](../../README.md)과 [Card 선택 안내](../../cards.md)를 따릅니다.
기존 제품의 호환 행을 먼저 찾고, 없으면 [구현 안내](./implementation.md)에 따라 가까운 범위에 새 export를 만들 수 있습니다.

직접 의존 계약은 [AgentHubFileIcon](../AgentHubFileIcon/README.md), [AgentHubButton](../AgentHubButton/README.md),
`Divider`, [AgentHubIcon](../AgentHubIcon/README.md)입니다.
실제 파일 타일·버튼·Vertical Divider 원본을 확인했으며 공용 Card 인스턴스를 재사용한 것은 아닙니다.
공용을 켠 UI 작업에서만 `DOCS_ROOT/frontend/design/components/Divider/README.md`를 함께 적용합니다.
제품 source/export는 `unmapped`, 공유 채택 설정은 `draft`입니다.

- [정의와 속성·하위 원본](./definition.md)
- [치수·배치·선·색상](./styles.md)
- [다운로드와 상태 소유권](./behavior.md)
- [접근성](./accessibility.md)
- [검증](./verification.md)
- [새 구현·기존 구현 연결](./implementation.md)
- [Figma 실측](../../references/card.figma.json), [변수](../../references/card.variables.figma.json), [자산](../../references/card.assets.json)
- [조합 대조](../../references/card-composition.json)

2026-10-21에 Figma [file-item](https://www.figma.com/design/cUKHT2PdHjAKRXZlzulnO5/?node-id=3128-25559)의 단일 COMPONENT를 확인했습니다.
size=false·다운로드 버튼 표시·spreadsheet 타일의 정적 조합이며 메뉴 항목·다운로드 API·숨김 조합·다른 파일 형식의 완성 배치는 별도 검증 범위입니다.
