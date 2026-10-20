# Select — 구현 인덱스

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Select 문서 인덱스](../README.md)

## 구현 문서

- [CSS와 스타일 구현](./css.md)
- [TypeScript와 React 구현](./typescript.md)
- [사용 예제](./examples.md)

## 12. 구현 코드

참조 구현의 역할은 `대상 솔루션의 public UI mapping`와 같은 디렉터리의 CSS다.
칩 측정은 내부 `select-value-chips/SelectValueChips.tsx`/CSS가 소유하며 public barrel에 추가하지 않는다.
React 19 callback ref cleanup으로 ResizeObserver를 정리한다. 공개 진입점은 계속 core의 `Select`이며,
`showSelectAll`, `messages.remove`, `messages.noResults`는 선택적인 하위 호환 확장이다.
아래 두 계층 예제는 재현용 구조이며 실제 public API는 실행 구현과 위의 정의/동작 문서를 기준으로 한다.

이 예제는 구현의 출발점이며 의존성·API·전체 상태 검증 후 채택한다. Select 는 두 계층으로
구성된다:

1. **Primitive** (`select.tsx` + `select.css.ts`) — Radix Popover 기반 Select/SelectTrigger/SelectContent/SelectItem. 트리거, 드롭다운, 옵션의 시각을 담당.
2. **Markup** (`Select.tsx` + `Select.css.ts`) — Primitive 를 감싸 Label 행, Help text, field 레이아웃을 조립. 사용자가 직접 사용하는 컴포넌트.

**의존성:**

- `radix-ui` (Popover primitive)
- `@vanilla-extract/css` (스타일)
- `clsx` + `tailwind-merge` (또는 동등 `cn` 유틸)
- `lucide-react` (`ChevronDown`, `Check`, `X`, `Info` 아이콘)
- **Checkbox** 컴포넌트 ([`Checkbox/README.md`](../../Checkbox/README.md) 참조)
- **Chip** 컴포넌트 (chip 가이드라인 참조)
- **Spinner** 컴포넌트 ([`Spinner/README.md`](../../Spinner/README.md) 참조)
- **Status** 컴포넌트 ([`Status/README.md`](../../Status/README.md) 참조)
