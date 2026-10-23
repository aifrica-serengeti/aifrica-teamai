# AgentHubScrollbar

공용 Scrollbar의 실제 native 스크롤·측정·드래그 계약을 참고하면서 Agent Hub의 불투명 회색 thumb와11px gutter를 연결하는 확장입니다.
적용 조건은 [상위 안내](../../README.md)를 따릅니다. 호환되는 기존 ScrollArea의 token·part adapter를 우선 재사용하며 새 래퍼나 별도 스크롤 엔진을 강제하지 않습니다.

직접 의존 계약은 `Scrollbar`입니다. 공용을 켠 UI 작업에서만 `DOCS_ROOT/frontend/design/components/Scrollbar/README.md`를 함께 읽습니다.
원본에는 다른 컴포넌트 INSTANCE가 없습니다. 이 의존은 실제 Figma ScrollArea 재사용이나 검증된 제품 export를 뜻하지 않습니다.
실제 제품 source/export는 아직 `unmapped`이며 공유 설정은 `draft`입니다.

- [정의와 원본 범위](./definition.md)
- [치수·색상과 공용 대비 차이](./styles.md)
- [스크롤과 표시 상태의 책임](./behavior.md)
- [접근성과 실제 조작](./accessibility.md)
- [기존 구현 연결과 새 구현 절차](./implementation.md)
- [검증](./verification.md)
- [Figma 실측](../../references/scrollbar.figma.json)
- [변수와 alias](../../references/scrollbar.variables.figma.json)
- [공용·제품 source 비교](../../references/scrollbar-comparison.json)

2026-10-21에 Figma [scroll-bar](https://www.figma.com/design/cUKHT2PdHjAKRXZlzulnO5/?node-id=3155-20473)의 Light 단일 샘플을 확인했습니다.
11×180px 안의4×160px thumb는 정적 도형입니다. 실제 스크롤 범위·노출 시점·hover/pressed/focus·dark·가로 방향을 측정한 것은 아닙니다.
기존 Menu·Picker·Flyout의 scrollbar source나 제품 구현을 이 원본으로 일괄 교체하지 않습니다.


2026-10-23 사용자 채택으로 SNB는 별도27px gutter·추가 수직 track 끝 여백24px를 사용합니다.
엔진의 선택적 `verticalTrackPaddingEnd` 기본0과 표시·drag 계산의 일치는 [구현 안내](./implementation.md)를 따릅니다.
원본11px 측정이나 다른 사용처의 기본값은 변경하지 않습니다.
