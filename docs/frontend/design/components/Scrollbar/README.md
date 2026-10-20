# Scrollbar & ScrollArea

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

이 문서는 **의존 문서와 함께** ScrollArea 컴포넌트를 상세 상태·시각 계약을 구현하기 위한
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
- [기타 구현 참조](./implementation/reference.md)

## 1. 개요

스크롤 가능한 영역에 **overlay 스크롤바**를 제공하는 컴포넌트. naive-ui의
`n-scrollbar`처럼 스크롤바가 컨텐츠 패딩 영역을 차지하지 않고 컨텐츠 위에 얇게
떠 있는(lol 리브) 형태다.

**기술 기반**: Radix UI를 사용하지 않는다. 네이티브 스크롤바를 완전히 숨기고
실제 DOM thumb 요소를 직접 렌더하여 JS로 위치를 계산하는 순수 구현이다. 이유는 두 가지.

1. CSS 의사 요소(`::-webkit-scrollbar-thumb`)는 **transition을 지원하지 않아** hover 시
   thumb가 "툭" 튀어나온다. 부드러운 페이드 인/아웃을 위해 실제 DOM thumb가 필요하다.
2. Radix ScrollArea는 안정성/디버깅 불확실성이 컸다(thumb가 DOM에 렌더되지 않는 문제).
   크로스브라우저 예측 가능성을 위해 순수 구현을 선택했다.

**핵심 특징**:

- **Overlay 배치** — 패딩 영역 차지 안 함, 컨텐츠 위에 떠 있음.
- **반투명 thumb** — 뒤 컨텐츠가 은은하게 비치는 alpha 색상(naive-ui 스타일).
- **부드러운 opacity 페이드** — hover/scroll 시 0.2s로 서서히 나타남/사라짐.
- **4가지 노출 타이밍** — `always` / `hover` / `scroll` / `auto`.
- **3가지 방향** — `vertical` / `horizontal` / `both`.
- **가변 굵기** — `thumbWidth` prop으로 4(기본) · 6 · 8 등 커스텀.
- **sticky header 공존** — `verticalThumbOffset`으로 수직 thumb의 시작 지점을 고정 헤더 아래로 예약.
- **측정 콜백** — `onScrollMetricsChange`로 실제 scroll container의 수직 위치·크기를
  부모 compound component에 전달.
- **명시적 위치 제어** — `ref`의 `scrollTo(options)`으로 초기화·탭 전환 같은 사용자 action 뒤
  실제 scroll container의 위치를 이동.
- **최하단 유지** — `stickToEnd`는 사용자가 수직 최하단에 있을 때만 콘텐츠 증가 뒤 최하단을 유지.

---
