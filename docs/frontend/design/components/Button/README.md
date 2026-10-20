# Button

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

이 문서는 **의존 문서와 함께** Button 컴포넌트를 상세 상태·시각 계약을 구현하기 위한
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

이벤트나 작업을 트리거하는 컴포넌트. 사용자가 버튼을 보면 다음에 무슨 일이 일어날지 알 수 있어야 한다.

**매트릭스:** 4 variant(Primary/Secondary/Tertiary/Negative) × 4 size(Tiny/Small/Medium/Large)
× 5 state(Enabled/Hovered/Pressed/Disabled/Focused).

**기술 기반:** 네이티브 `<button>` 요소를 기반으로 vanilla-extract `.css.ts` 로 스펙을
직접 렌더한다. `radix-ui` 의 `Slot.Root` 를 써서 `asChild` 합성을 지원한다(링크/다른 요소로 렌더).

### 의존성 컴포넌트

Button 이 단독으로 동작하지 않고 의존하는 컴포넌트. 재현 시 아래 컴포넌트가
선행되어야 한다.

| 의존성                | 역할                                                                                                                                      | 재현에 필요한 부분                                                                         |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| **[Icon](../Icon/README.md)** | 버튼 내부 Leading/Trailing 아이콘 렌더. Figma System icon 스펙(size 토큰 t~4xl, 사이즈별 stroke-width 1.25~2px, round endcap/join)을 강제 | `Icon` 컴포넌트 + `iconMap`(System icon 이름 → lucide 매핑) + `iconTokens`(size/색상 토큰) |

> Icon 컴포넌트 없이 Button 을 재현하려면, 아이콘 자리에 Icon 스펙을 만족하는 svg 컴포넌트를
> 직접 구현해야 한다(사이즈별 stroke-width 미적용 시 Figma 와 시각적 차이 발생).

### Variant 역할 (사용 가이드)

| Variant       | 용도                                                     | 강조      |
| ------------- | -------------------------------------------------------- | --------- |
| **Primary**   | 페이지/영역의 가장 중요한 행동(CTA). **한 영역에 1개만** | 가장 강   |
| **Secondary** | Primary 를 보조하는 행동                                 | 중        |
| **Tertiary**  | 부가적인 행동. 강조 최소                                 | 약        |
| **Negative**  | 파괴적/위험 작업(삭제 등)                                | 강 (위험) |

> **Primary button(call to action)은 한 페이지/UI 영역에 1개만** 사용한다. 여러 주 버튼이 있으면
> 사용자가 우선순위를 혼란스러워한다.

---

