# Spinner

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

이 문서는 **의존 문서와 함께** Spinner 컴포넌트를 상세 상태·시각 계약을 구현하기 위한
완전한 스펙이다. 이 파일만 있어도 색상·레이아웃·애니메이션·코드를 모두 복원할 수 있다.

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

사용자의 작업 진행 상태를 시각적으로 전달하기 위해 사용되는 로딩 스피너. 예상 대기
시간이 1초 이상일 경우 표시하며, 페이지 전환이나 데이터 로딩 등 일정 시간 동안 대기해야
함을 사용자에게 안내한다.

**매트릭스:** 단일 variant. 5 size(Tiny / Small / Medium / Large / X-Large). 상태
분기 없음(항상 회전). 단독 표시 또는 메시지와 조합.

**기술 기반:** 원본 Figma SVG(circle + path + linearGradient)를 React 인라인 SVG로
그대로 렌더한다. shadcn/Radix primitive 없이 순수 SVG + vanilla-extract `.css.ts` 로
구현한다(Spinner 는 벡터 도형이므로 primitive 가 불필요).

> **왜 CSS 가 아닌 인라인 SVG 인가** — Spinner 는 270° 호(arc)에 수직 선형
> 그라데이션(top 불투명 → bottom 투명)과 둥근 끝(`stroke-linecap: round`)을 가지는
> 정밀 벡터 형태다. `conic-gradient` + `mask` 등의 CSS 만으로는 이 그라데이션 분포와
> 둥근 끝을 정확히 재현할 수 없다. 따라서 Figma 원본 SVG 를 인라인으로 렌더하고
> 회전·크기·색상만 CSS 로 제어한다.

> **다크 모드 대비 (핵심 규칙)** — Track(배경) 과 Indicator(회전 아크) 는 항상 서로
> 다른 음영이어야 한다. 다크 모드에서 Track 은 Indicator 보다 2단계 옅은 blue
> (Track `accent-200` / Indicator `accent-400`)를 사용한다. 같은 색으로 두면 동일한 accent
> 원으로 보이는 버그가 발생한다.

---

