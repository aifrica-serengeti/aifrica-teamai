# Action bar

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

이 문서는 **의존 문서와 함께** Action bar 컴포넌트를 상세 상태·시각 계약을 구현하기 위한
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

선택된 항목에 대한 **컨텍스트 액션**을 제공하는 컴포넌트. 리스트/테이블에서 항목을
선택했을 때 **화면 중앙 하단**에 리스트 콘텐츠 위로 오버레이되어 나타나, "N개 선택됨" 정보와 함께
즉시 실행 가능한 액션 버튼(시작/정지/종료/삭제 등)을 노출한다. 흐름(flow)을
차지하지 않아 선택 여부에 따라 레이아웃이 밀리지 않는다.

**핵심 컨셉: "inverse surface"** — 일반 surface 와 **반전**되는 역역할.

| | 라이트 모드 | 다크 모드 |
| --- | --- | --- |
| 배경 | 검정 `#1c1c1c` (surface 의 역) | 흰색 `#ffffff` |
| 글씨/아이콘 | 흰색 `#ffffff` | 검정 `#1c1c1c` |

> 일반 컴포넌트가 "라이트: 흰 배경 + 검정 글씨"라면, Action bar는 그 반대다.
> 다크 모드에서도 마찬가지로 반전된다. 이 원칙이 색상 매핑의 출발점이다.

**기술 기반**: 순수 React + vanilla-extract. compound 컴포넌트 패턴으로 조립한다
(`ActionBar.Leading` / `.Actions` / `.Group` / `.Action` / `.IconButton` / `.Divider`).
Radix UI `Slot.Root` 로 `asChild` polymorphic 렌더링을 지원한다.

---

