# Menu

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

> 최종 갱신: 2026-07-23

이 문서는 **의존 문서와 함께** Menu 컴포넌트를 상세 상태·시각 계약을 구현하기 위한
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

메뉴(Menu)는 사용자가 상호작용할 때 옵션을 나타내어 명령을 제공하는 요소다. 주로
작업 수행, 설정 변경, 탐색, 특정 액션을 제공하는 데 사용한다. 옵션을 선택해야 하는
경우에는 드롭다운(Dropdown)이나 셀렉트(Select)를 사용하는 것이 더 적합하다.

**3 사이즈 × 6 상태:**

- **사이즈**: Small(item 높이 28px) · Medium(item 높이 32px) · Large(item 높이 36px)
- **상태**: Enabled · Hovered · Pressed · Selected · Focused · Disabled

**기술 기반**: Radix UI `DropdownMenu`를 기반으로, 스펙으로 완전 커스텀한다.
shadcn 기본 Tailwind 클래스는 모두 제거하고 vanilla-extract로 직접 렌더한다.

---

