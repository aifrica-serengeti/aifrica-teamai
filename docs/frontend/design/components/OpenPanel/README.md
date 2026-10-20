# Open panel

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

이 문서는 **의존 문서와 함께** Open panel 컴포넌트를 상세 상태·시각 계약을 구현하기 위한
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

오픈 패널(Open panel)은 화면 가장자리에서 슬라이드하여 나오는 패널이다. 상세 정보, 보조
작업, 필터 등 메인 화면을 벗어나지 않고 보조 콘텐츠를 보여줄 때 사용한다.

**2 타입 × 4 위치 = 8 variant:**

- **Overlay** — 메인 페이지 콘텐츠의 일부를 덮는 패널. scrim(반투명 검정) 위에 슬라이드.
  패널 내부 콘텐츠에 사용자의 주의를 집중시키는 데 효과적.
- **Inline** — 메인 페이지 콘텐츠와 나란히 배치. 패널이 열릴 때 메인 콘텐츠가 함께
  밀려난다. 메인 콘텐츠와 패널 콘텐츠를 동시에 확인하고 상호 작용하는 것이 유용할 때 사용.
- **위치**: Top(높이 386px) · Right(너비 424px) · Bottom(높이 386px) · Left(너비 424px).

**기술 기반**: Radix UI `Dialog`를 기반으로 한 side sheet. 스펙(위치별 치수,
방향별 슬라이드 애니메이션, 캡슐 리사이즈 핸들)으로 커스텀한다.

---

