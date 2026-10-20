# Breadcrumb

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

이 문서는 **의존 문서와 함께** Breadcrumb 컴포넌트를 상세 상태·시각 계약을 구현하기 위한
완전한 스펙이다. 이 파일만 있어도 색상·레이아웃·상태·축약 로직·코드를 모두 복원할 수 있다.

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

사용자의 현재 위치를 경로(depth)로 보여주는 내비게이션 컴포넌트. 상위 depth 는 클릭
가능한 링크, 현재 페이지(마지막 depth)는 비상호작용 텍스트다. 컨테이너 너비가 좁아지면
중간 depth 를 자동으로 `...` 으로 축약하고, 축약된 항목은 `...` 버튼의 드롭다운 메뉴로
접근할 수 있다(접근성 복구).

**두 가지 사용 모드:**

| 모드                              | 사용법                                                          | 자동 축약               |
| --------------------------------- | --------------------------------------------------------------- | ----------------------- |
| **자동 축약 (items prop)** — 권장 | `items={[{label, href/current}]}` 배열 전달                     | O (ResizeObserver 기반) |
| **수동 compound**                 | `<Breadcrumb.Item>` / `.Separator` / `.Overflow` 자식 직접 배치 | X                       |

**기술 기반:** vanilla-extract `.css.ts` 로 스펙을 직접 렌더. `radix-ui` 의
`Slot.Root` 로 `asChild` 합성을 지원(react-router-dom `<Link>` 등으로 렌더). 축약 `...`
버튼은 **IconButton** + **Menu** 컴포넌트에 의존한다.

---

