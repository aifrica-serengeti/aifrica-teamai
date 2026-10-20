# Split Button

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

이 문서는 **의존 문서와 함께** Split Button 컴포넌트를 상세 상태·시각 계약을 구현하기 위한
완전한 스펙이다. 이 디렉터리와 의존 문서로 계약을 확인하고 솔루션 mapping·자산을 추가해야 한다.

---

> 문서 분할 안내: 기존 가이드의 “이 파일” 표현은 이제 이 디렉터리의 문서 묶음 전체를 뜻한다.
> 원문 내용은 삭제하지 않고 목적별 문서로 나눴다.

## 문서 탐색

- [구현 인덱스](./implementation/README.md)
- [정의와 구조](./definition.md)
- [스타일과 토큰](./styles.md)
- [상태와 동작](./behavior.md)
- [접근성](./accessibility.md)
- [검증과 재현](./verification.md)
- [CSS와 스타일 구현](./implementation/css.md)
- [TypeScript와 React 구현](./implementation/typescript.md)
- [사용 예제](./implementation/examples.md)

## 1. 개요

분할 버튼(Split Button)은 하나의 주 행동(Primary action)과 보조 행동들의 메뉴
(Secondary action)을 결합한 컴포넌트다. 주 행동 버튼은 가장 자주 쓰는 동작(예: 저장)을
직접 수행하고, 옆의 보조 버튼(chevron)을 누르면 관련 옵션들의 메뉴(예: 다른 이름으로
저장, 복제)가 펼쳐진다.

**매트릭스:** 4 size(Tiny / Small / Medium / Large) × 6 state
(Enabled / Hovered / Pressed / Active / Focused / Disabled).

**핵심 특징:**

- Tertiary Button 토큰(white fill, gray 테두리)을 공유한다. Split Button 고유 색상은 없다.
- Primary action(아이콘-only)과 Secondary action(아이콘 + 라벨 + chevron)이 **각각 독립적으로**
  hover/pressed/focus 된다 — 한쪽에 마우스를 올려도 다른 쪽은 변하지 않는다.
- Secondary action 은 클릭 시 공용 **Menu**(Radix DropdownMenu)를 토글한다.
- 짧은 메뉴는 `menuScrollable={false}`로 콘텐츠 높이만 사용하고, 긴 메뉴는 기본 스크롤 영역을 유지한다.

**기술 기반:** 네이티브 `<button>` 2개 + 공용 **Menu**(Radix `DropdownMenu`). vanilla-extract
`.css.ts` 로 스펙을 직접 렌더한다.

---
