# Icon Button — 검증과 재현

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Icon Button 문서 인덱스](./README.md)

## 14. 검증 체크리스트

새 프로젝트에서 재현 후 아래 항목을 확인한다.

### 빌드/구조

- [ ] `type="button"` 이 기본값(폼 제출 방지)
- [ ] icon 이 공용 `Icon` 컴포넌트로 렌더됨(별도 SVG 로직 없음)
- [ ] `data-variant`/`data-size` 속성이 부여됨

### 색상 (라이트)

- [ ] Outlined enabled 가 transparent 배경 + `rgba(0,0,0,0.1)` 테두리
- [ ] Ghost enabled 가 테두리·배경 모두 transparent
- [ ] Hover 배경이 `rgba(0,0,0,0.05)` (양 variant 공통)
- [ ] Pressed 배경이 `rgba(0,0,0,0.1)` (양 variant 공통)
- [ ] Disabled icon 색상이 `#aaaaaa` 로 전환(fill 은 transparent 유지)
- [ ] Outlined disabled 테두리가 enabled 와 동일(테두리 유지)

### 색상 (다크)

- [ ] Outlined 다크 테두리가 `rgba(255,255,255,0.1)`
- [ ] 다크 hover/pressed 배경이 흰색 기반 overlay(`rgba(255,255,255,0.05/0.1)`)
- [ ] 다크 icon 색상이 `#dddddd`, disabled 가 `#555555`

### Focus (핵심)

- [ ] Focus outline 이 **1px** 두께 (2px 아님)
- [ ] Focus outline gap 이 **1px** (outline-offset)
- [ ] Focus 색상이 라이트/다크 모두 `var(--accent-500)` (전환 없음)
- [ ] Button/Radio/Checkbox focus 와 동일한 1px + 1px 패턴

### 레이아웃

- [ ] border-radius 가 4px (6px 아님)
- [ ] 3 사이즈 터치 영역이 정확 (20/24/32px)
- [ ] padding 이 0 (아이콘만 중앙 정렬)
- [ ] icon 기본 size 매핑이 Tiny→t(12), Medium→m(16), XLarge→xl(20)
- [ ] iconSize prop 으로 icon size 를 override 할 수 있음

### 접근성

- [ ] **`aria-label` 이 필수**(icon-only 버튼)
- [ ] Tab 이동 + Enter/Space 활성화 동작
- [ ] Disabled 시 커서 `not-allowed`, 호버/프레스 효과 없음

### Tooltip 연동 (핵심)

- [ ] Icon Button 이 Tooltip 을 **직접 구현/내장하지 않음**
- [ ] 공용 Tooltip 컴포넌트의 `children` 자리에 IconButton 을 전달해 조합
- [ ] 공용 Tooltip 컴포넌트가 없으면 `Tooltip/README.md` 를 참조해 먼저 공용 컴포넌트를 구축
- [ ] Tooltip 유무와 무관하게 `aria-label` 이 항상 제공됨
- [ ] 한 trigger를 Tooltip 두 개로 감싸지 않고 pending 전환에도 Tooltip/aria-label 동작명이 안정적임
- [ ] Page Header medium action은 `iconSize="l"` 18px, 1.25px rounded stroke를 사용하며 parent가 SVG stroke를 override하지 않음

### 동작

- [ ] Hover/Pressed/disabled 색상 전환이 0.2s ease 로 부드럽게
- [ ] `transition: all` 을 쓰지 않음 (색상 속성만)
- [ ] 다크/라이트 모드 전환 시 icon 색상이 깜빡임 없이 부드럽게 전환

## 15. 새 프로젝트 재현 잠금 계약

이 계약은 IconButton을 다른 프로젝트에서 새로 구현할 때에도 동일한 결과를 유지하기 위한 필수 조건이다.

- **전달 묶음**: [foundation 문서](../../foundations.md), reproduction.md, 이 문서의 의존 컴포넌트 closure와 명시된 SVG/폰트 자산을 함께 확보한 뒤 구현한다.
- **소유권**: 이 컴포넌트가 문서의 geometry, visual state, focus와 interaction을 단일하게 소유한다. 부모는 공개 props를 선택하고 문서의 배치 제약 안에서만 사용한다.
- **변형 금지**: 유사한 framework primitive, icon asset, default token으로 대체하거나 문서에 없는 responsive 변형을 추가하지 않는다.
- **검증 기준**: 이 문서의 기존 검증 체크리스트에 더해 reproduction.md의 공통 상태 matrix를 수행한다. 기준 viewport에서 폰트 로드, token mode, focus/keyboard, 긴 콘텐츠와 명시된 light/dark 상태를 함께 확인한다.
