# Detail Section — 스타일과 토큰

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

## Geometry

- root: 너비는 부모가 소유, `min-width: 0`, `1px solid var(--border-default)`, radius 8px, `var(--surface)`
- header: desktop `20px 24px`, `≤699px` 20px, action과 copy 사이 16px, 하단 1px divider
- body: desktop 24px, `≤699px` 20px
- title: 16px/24px, semibold, `var(--text)`
- title accessory: title 바로 뒤 8px, 내부 요약 항목 간 6px, 여러 줄에서는 title과 함께 wrap
- description: title 아래 4px, 13px/20px, `var(--text-subtle)`

title과 description은 긴 번역에서 wrap하며 title accessory와 header action도 겹치지 않고 줄바꿈할 수 있다. 색상과 경계는 semantic token을 사용하므로 light/dark theme에서 같은 의미를 유지한다.

`bodyPadding="none"`은 table row나 기존 복합 workflow가 동일한 24/20px inset을 직접 소유할 때만 사용한다. 단순 정보 grid의 padding을 없애는 용도가 아니다.
