# CardAccordion

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

이 문서는 **의존 문서와 함께** Card Accordion 컴포넌트를 상세 상태·시각 계약을 구현하기 위한
완전한 스펙이다. 이 파일만 있어도 색상·레이아웃·상태·애니메이션·코드를 모두 복원할 수 있다.

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
- [기타 구현 참조](./implementation/reference.md)

## 1. 개요

Card Accordion(카드 아코디언)은 Card 형태의 컴포넌트로 사용자가 콘텐츠 섹션의 표시를
조절할 수 있도록 도와준다. Header의 제목 Trigger를 클릭하면 Panel(본문)이 펼쳐지거나 접히며,
제목을 보충하는 개수·상태 Chip은 `titleMeta`로 제목 바로 옆에 표시하고, 우측 Actions는 Trigger와 분리된 독립 조작 영역이다.

**2 Structural × 5 Interactive = 10 variant:**

- **Structural states**: Expanded(펼침) · Collapsed(접힘)
- **Interactive states**: Enabled · Hovered · Pressed · Focused · Disabled

**기술 기반**: Radix UI `Accordion`(`type="single"` + `collapsible`)을 기반으로,
스펙(카드 border 8px radius, header 56px, CSS keyframes 애니메이션,
focus ring, 전용 다크 팔레트)으로 완전 커스텀한다. shadcn 기본 Tailwind 클래스는
모두 제거하고 vanilla-extract `*.css.ts`로 직접 렌더한다.

---
