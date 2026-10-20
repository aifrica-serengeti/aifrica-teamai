# Breadcrumb — 검증과 재현

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Breadcrumb 문서 인덱스](./README.md)

## 15. 검증 체크리스트

새 프로젝트에서 재현 후 아래 항목을 확인한다.

### 빌드/구조

- [ ] `<nav aria-label="Breadcrumb">` 컨테이너
- [ ] 현재 페이지가 `<span aria-current="page">` 로 렌더 (링크 아님)
- [ ] `asChild` + `Slot.Slottable` 로 children 이 올바르게 슬롯됨
- [ ] 축약 `...` 버튼이 IconButton 컴포넌트(tiny/outlined)를 재사용 (직접 `<button>` 생성 아님)
- [ ] 축약 메뉴가 Menu 컴포넌트(small)를 재사용

### 색상 (라이트)

- [ ] 상위 depth(Enabled) 가 `#757575` (gray-600)
- [ ] Hovered 가 `#555555`, Pressed 가 `#333333`
- [ ] 현재 페이지(Selected) 가 `#1c1c1c` (gray-900)
- [ ] Separator 가 `#8f8f8f` (gray-500)
- [ ] Focus outline 이 `var(--accent-500)`

### 색상 (다크)

- [ ] 상위 depth(Enabled) 가 `#8f8f8f` (gray-500)
- [ ] Hovered 가 `#757575`, Pressed 가 `#555555`
- [ ] 현재 페이지 가 `#dddddd` (gray-200)
- [ ] Focus outline 이 `var(--accent-400)`

### 밑줄 (핵심)

- [ ] Enabled 상태에 밑줄 없음 (text-decoration-color: transparent)
- [ ] Hovered/Pressed 에 밑줄 표시 (currentColor)
- [ ] 밑줄이 깜빡임 없이 부드럽게 페이드인 (text-decoration-color transition)
- [ ] 현재 페이지(Selected)에 밑줄 없음
- [ ] `transition: all` 을 쓰지 않음 (color + text-decoration-color 만)

### Focus

- [ ] Focus outline 이 1px 두께
- [ ] outline gap 이 1px (outline-offset)
- [ ] 상위 depth 링크와 `...` 버튼 양쪽에 focus 표시
- [ ] Link/Button focus 와 동일한 1px + 1px 패턴

### 축약 로직 (items prop 모드)

- [ ] 너비 충분 시 모든 depth 표시
- [ ] 좁아지면 루트 + 끝쪽 보존, 중간부터 축약 (`1/.../4/5` 형태)
- [ ] 최소 루트 + 현재 2개까지만 표시 (`1/.../5`)
- [ ] 축약 시 current(마지막) 항목이 누락되지 않음
- [ ] `...` 버튼 클릭 시 small Menu 에 축약 항목이 순서대로 노출
- [ ] 너비가 좁아질수록 축약 메뉴 항목이 점진적으로 늘어남
- [ ] ResizeObserver 로 컨테이너 리사이즈에 반응

### 레이아웃

- [ ] font-size 14px / line-height 20px / weight 400 (Body2) — 단일 크기
- [ ] gap 이 8px
- [ ] 축약 모드에서 한 줄 유지 (nowrap, overflow hidden)
- [ ] 측정 레이어가 화면에 보이지 않음 (visibility hidden)

### 접근성

- [ ] Separator 가 aria-hidden
- [ ] 축약 `...` 버튼에 `aria-label` (축약 개수 포함)
- [ ] 축약된 항목이 Menu 를 통해 키보드 접근 가능
- [ ] Menu Item 선택 시 onSelect 콜백 호출

## 16. 새 프로젝트 재현 잠금 계약

이 계약은 Breadcrumb을 다른 프로젝트에서 새로 구현할 때에도 동일한 결과를 유지하기 위한 필수 조건이다.

- **전달 묶음**: [foundation 문서](../../foundations.md), reproduction.md, 이 문서의 의존 컴포넌트 closure와 명시된 SVG/폰트 자산을 함께 확보한 뒤 구현한다.
- **소유권**: 이 컴포넌트가 navigation semantics, focus/keyboard, selection 및 overflow 규칙을 소유한다. 부모는 공개 controlled API로 값만 전달하고 내부 markup/CSS를 재구현하지 않는다.
- **변형 금지**: 문서에 없는 depth 축약, route 이동, selected indicator 또는 responsive 변형을 추가하지 않는다.
- **검증 기준**: 이 문서의 기존 검증 체크리스트에 더해 reproduction.md의 공통 상태 matrix를 수행한다. 기준 viewport에서 폰트 로드, token mode, focus/keyboard, 긴 콘텐츠와 명시된 light/dark 상태를 함께 확인한다.
