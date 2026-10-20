# Tooltip

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

이 문서는 의존 문서·솔루션 mapping과 함께 컴포넌트를 상세 상태·시각 계약을 구현하기 위한 완전한 스펙이다.

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

툴팁은 트리거 요소에 hover/focus 시 짧은 보충 정보를 표시하는 컴포넌트다.

- **기술 기반**: Radix UI Tooltip(`radix-ui` 통합 패키지)을 shadcn 구조로 래핑한 뒤 스펙으로 커스텀.
- **특징**: inverse 색상(라이트: 검정 배경/흰 글씨, 다크: 흰 배경/검정 글씨), 2가지 타입(Icon/Standard), 12가지 위치 조합(4방향 × 3정렬), 방향별 fade+slide 애니메이션.
- **화살표**: Radix Arrow가 아닌 Figma 원본 SVG 삼각형을 인라인으로 렌더. 회전 대신 방향별 별도 path를 사용하여 레이아웃-시각 불일치를 방지한다.

**Radix를 사용하는 이유**: 툴팁은 12가지 position×align 조합 + viewport collision detection + Portal 렌더링이 필요하므로 Radix의 위치 계산·충돌 회피 기능을 활용한다. 색상·패딩·화살표·애니메이션은 커스텀한다.

---

