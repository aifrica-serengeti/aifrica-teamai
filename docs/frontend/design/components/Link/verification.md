# Link — 검증과 재현

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Link 문서 인덱스](./README.md)

## 13. 검증 체크리스트

새 프로젝트에서 재현 후 아래 항목을 확인한다.

### 빌드/구조

- [ ] `<a>` 요소 기반 (또는 `asChild` 시 합성된 요소)
- [ ] `asChild` + `Slot.Slottable` 로 children 이 올바르게 슬롯됨
- [ ] `disabled` prop 이 `aria-disabled` 로 렌더됨 (`<a>` 는 표준 disabled 없음)

### 색상 (라이트)

- [ ] Enabled 텍스트 색이 `var(--accent-500)` (accent-500)
- [ ] Hovered 가 `var(--accent-600)` (accent-600) 로 진해짐
- [ ] Pressed 가 `var(--accent-700)` (accent-700) 로 더 진해짐
- [ ] Disabled 가 `#8f8f8f` (gray-500) 회색
- [ ] trailing 아이콘이 텍스트와 동일 색상 (color: inherit)

### 색상 (다크)

- [ ] Enabled 가 `var(--accent-400)` (accent-400, 더 밝음 — 라이트와 역방향)
- [ ] Hovered 가 `var(--accent-500)`, Pressed 가 `var(--accent-600)`
- [ ] Disabled 가 `#555555` (gray-700 — 라이트 gray-500 보다 어두움)

### 밑줄 (핵심)

- [ ] Enabled/Hovered/Pressed/Focused 에 밑줄 표시
- [ ] **Disabled 에 밑줄 없음** (textDecorationLine: none)
- [ ] 밑줄 두께가 from-font (폰트 기본)

### Focus

- [ ] Focus outline 이 **1px** 두께 (2px 아님)
- [ ] Focus outline gap 이 **1px** (outline-offset)
- [ ] 링크보다 outline 이 위아래 각 2px 더 큼 (총 4px 확장)
- [ ] Focus 색상이 `--link-default` (라이트 `var(--accent-500)`, 다크 `var(--accent-400)`)
- [ ] Button/Radio/Checkbox focus 와 동일한 1px + 1px 패턴

### 레이아웃

- [ ] font-weight 가 항상 400 (Regular) — Button(600)과 다름
- [ ] 3 사이즈 font/line 이 정확 (12/16, 14/20, 16/24)
- [ ] 라벨↔아이콘 gap 이 4px
- [ ] 아이콘 크기가 size 별로 자동 스케일 (small/medium 16, large 18px)
- [ ] 아이콘이 Icon 컴포넌트로 위임됨 (lucide 직접 import 아님)

### Inline link 크기 매칭

- [ ] Inline link size 가 주변 문단 텍스트 font-size 와 일치
- [ ] 본문 16px(Body1) → `large`, 14px(Body2) → `medium`, 12px(Body3) → `small`
- [ ] Inline link 에 trailing 아이콘 없음

### 동작

- [ ] Hover/Pressed/disabled 색상 전환이 0.2s ease 로 부드럽게
- [ ] Disabled 시 커서가 `not-allowed`, 호버/프레스 효과 없음, `pointer-events: none`
- [ ] `transition: all` 을 쓰지 않음 (color 속성만)
- [ ] 외부 링크(`target="_blank"`)에 `rel="noreferrer"` 포함

## 14. 새 프로젝트 재현 잠금 계약

이 계약은 Link을 다른 프로젝트에서 새로 구현할 때에도 동일한 결과를 유지하기 위한 필수 조건이다.

- **전달 묶음**: [foundation 문서](../../foundations.md), reproduction.md, 이 문서의 의존 컴포넌트 closure와 명시된 SVG/폰트 자산을 함께 확보한 뒤 구현한다.
- **소유권**: 이 컴포넌트가 문서의 geometry, visual state, focus와 interaction을 단일하게 소유한다. 부모는 공개 props를 선택하고 문서의 배치 제약 안에서만 사용한다.
- **변형 금지**: 유사한 framework primitive, icon asset, default token으로 대체하거나 문서에 없는 responsive 변형을 추가하지 않는다.
- **검증 기준**: 이 문서의 기존 검증 체크리스트에 더해 reproduction.md의 공통 상태 matrix를 수행한다. 기준 viewport에서 폰트 로드, token mode, focus/keyboard, 긴 콘텐츠와 명시된 light/dark 상태를 함께 확인한다.
