# AgentHubIconButton

공용 IconButton의 동작·접근성을 유지하고 Agent Hub의 radius·아이콘 크기·primary·active 표현을
연결하는 확장입니다. 적용 조건은 [상위 안내](../../README.md)를 따릅니다.
기존 제품의 호환되는 IconButton을 재사용할 수 있으며 새 래퍼 생성을 강제하지 않습니다.

공용을 켠 UI 작업에서 `DOCS_ROOT/frontend/design/components/IconButton/README.md`도 함께 읽습니다.
직접 의존 계약은 `IconButton`, `AgentHubIcon`입니다. 실제 제품 source/export는 아직 `unmapped`입니다.

- [정의와 지원 조합](./definition.md)
- [크기·radius·색상](./styles.md)
- [상태와 동작](./behavior.md)
- [접근성](./accessibility.md)
- [검증](./verification.md)
- [33개 variant 실측](../../references/icon-button.figma.json), [변수와 alias](../../references/icon-buttons.variables.figma.json)

2026-10-20에 Figma [icon-button](https://www.figma.com/design/cUKHT2PdHjAKRXZlzulnO5/?node-id=2427-25105)을 확인했습니다.
32px 원형 첨부 버튼은 [AgentHubAttachIconButton](../AgentHubAttachIconButton/README.md)에서 관리합니다.

2026-11-05에 확인한 [토큰 변경표](../../references/tokens.figma.json)의 `3478:22791`은
ghost/outlined의 active 배경을 `color/button/opacity-active` → `alpha/100`으로 연결합니다.
현재 연결에는 [토큰 foundation](../../foundations/Tokens.md)을 적용하고, 이전33종 실측의
`#EBF3FF` active는 과거 근거로 보존합니다. primary나 미확인 size/variant 조합을 추가하는 변경은 아닙니다.

## 2026-10-26 예약 페이지 점검 보강

Dialog의 legacy glyph24를 보존하는 제품 조합은 optional `iconSize`를 사용할 수 있습니다.
Figma size matrix와 다른 호환 확장이며 기존 size별 기본 glyph·hit area는 유지합니다.
