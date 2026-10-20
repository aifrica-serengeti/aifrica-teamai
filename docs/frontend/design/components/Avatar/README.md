# Avatar

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

이 문서는 **의존 문서와 함께** Avatar 컴포넌트를 상세 상태·시각 계약을 구현하기 위한
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

사용자를 시각적으로 식별하기 위한 원형 아바다. 사용자의 이니셜을 컨테이너 중앙에
표시하며, 이미지가 있으면 이미지를 우선 렌더하고 로드 실패 시 이니셜(fallback)로
대체한다. 사용자가 시스템 내에서 쉽게 인식될 수 있도록 돕는다.

**매트릭스:** 8 size(16~48px) × 7 color(indigo/primary/green/cyan/purple/fuchsia/gray)
× 2 variant(solid/subtle) × 2 state(enabled/disabled).

**기술 기반:** Radix `@radix-ui/react-avatar`(또는 `radix-ui` 통합 패키지의 `Avatar`).
원형 컨테이너 + 이미지/이니셜 fallback 구조를 `Avatar.Root / Avatar.Image / Avatar.Fallback`
3개 서브컴포넌트로 노출한다. 스펙은 CSS 직접 렌더(vanilla-extract `.css.ts`)로
적용한다.

> **왜 CSS 직접 렌더인가** — Figma 가 enabled/disabled/solid/subtle/size/색상 조합마다
> 별도의 SVG(원 배경)를 내보낸다. 이 SVG 들을 상태별로 교체하면 박스 크기가 미세하게
> 달라져 이니셜이 치우친다(Radio 컴포넌트에서 겪은 동일한 문제). 따라서 단일 원 박스를
> CSS 로 고정하고 `data-*` 속성으로 색상만 전환하는 방식을 쓴다.

### Color 역할 (사용 가이드)

| Color                | 용도                                                     |
| -------------------- | -------------------------------------------------------- |
| **indigo**(기본)     | 기본 아바타. Figma 원본이 모든 size에서 `#3235ec`를 사용 |
| **primary**          | 브랜드 강조(blue). indigo 와 시각적으로 가장 가까운 대안 |
| **green / cyan**     | 상태/카테고리 구분 보조                                  |
| **purple / fuchsia** | 특수 태그/칩 계열 사용자 구분                            |
| **gray**             | 중립. 비활성 사용자/시스템 계정                          |

> 여러 아바타가 같은 영역에 배치될 때, 사용자 간 구분을 위해 **서로 다른 색상**을
> 적용한다(Figma design guidelines "Color" 섹션). 기본은 indigo.

---

