# Chip

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

이 문서는 **의존 문서와 함께** Chip 컴포넌트를 상세 상태·시각 계약을 구현하기 위한
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

칩(Chip)은 키워드, 카테고리와 같은 정보를 사용자에게 표시하는 데 사용되는 요소로,
정보를 식별하고 분류하는 데 도움을 준다. 특정 요소의 상태에 대한 정보를 표시해야 할
경우, 상태(Status)를 사용하는 것이 더 적합하다.

**매트릭스:** 9색(default + gray/green/blue/cyan/indigo/purple/fuchsia/navy)
× 3 variant(filled / subtle / outlined) × 2 shape(pill / rounded)
× 2 size(small / medium) × 2 state(enabled / disabled).
leading icon 및 trailing close 버튼은 optional.

**기술 기반:** 네이티브 `<span>` 요소를 기반으로 vanilla-extract `.css.ts` 로
스펙을 직접 렌더한다. shadcn/Radix primitive 없이 순수 CSS 로 렌더한다
(Chip 은 shadcn primitive 가 없고, data-\* 속성 셀렉터로 모든 변형을 제어한다).

### Variant 역할 (사용 가이드)

| Variant      | 용도          | 설명                                                |
| ------------ | ------------- | --------------------------------------------------- |
| **filled**   | 강조 카테고리 | 진한 배경 + 흰 글자. 가장 눈에 띄는 표현            |
| **subtle**   | 일반 카테고리 | pastel 배경 + 동색 글자. 범용적 기본값              |
| **outlined** | 보조 카테고리 | 투명 배경 + 동색 테두리 + 동색 글자. 배경 없이 구분 |

### Shape 역할 (사용 가이드)

| Shape       | 용도                  | radius                                    |
| ----------- | --------------------- | ----------------------------------------- |
| **pill**    | 타이틀 우측 보조 표시 | small 10px / medium 12px (완전 둥근 형태) |
| **rounded** | 단독 카테고리 표시    | 4px                                       |

> Pill 스타일은 주로 타이틀 우측에 배치되어 타이틀의 의미를 보완할 때 사용하며,
> Rounded 스타일은 단독으로 사용되어 자체적으로 카테고리나 속성을 나타낼 때 사용한다.
> 이는 일반적인 가이드라인일 뿐이며, 디자인 맥락에 따라 유연하게 선택할 수 있다.

### 사용 가이드 (Figma 가이드라인 node 9883:91438)

> Chip 은 인지적 부담을 줄이기 위해 **절제하여 사용**해야 한다.
> Chip 은 작은 요소들이 반복적으로 나열되고 다양한 색상이 함께 사용되기 때문에,
> 시각적으로 복잡하게 느껴질 수 있다. 정보의 우선순위와 맥락을 고려한 절제된 사용이 필요하다.

---

