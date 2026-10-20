# Text Button — 검증과 재현

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Text Button 문서 인덱스](./README.md)

## 13. 검증 체크리스트

새 프로젝트에서 재현 후 아래 항목을 확인한다.

### 빌드/구조

- [ ] `type="button"` 이 기본값(폼 제출 방지)
- [ ] `asChild` 시 `type` 이 전달되지 않음(Slot 합성 시 의미 없음)
- [ ] 테두리(border)가 없음 — Tertiary Button 과 다른 점

### 색상 (라이트)

- [ ] Enabled 배경이 **투명** (`transparent`, 흰색 `#ffffff` 아님)
- [ ] Enabled 텍스트가 `#1c1c1c` (gray-900)
- [ ] Hovered 배경이 `#f8f8f8` (gray-50)
- [ ] Pressed 배경이 `#f4f4f4` (gray-100, hover 보다 약간 진함)
- [ ] Disabled 텍스트/아이콘이 `#aaaaaa` (gray-400) 로 전환. 배경은 투명 유지
- [ ] Hover/Pressed 에서 텍스트 색상은 변하지 않음 (`#1c1c1c` 고정)

### 색상 (다크)

- [ ] Enabled 텍스트가 `#dddddd` (gray-200)
- [ ] Hovered 배경이 **반투명 흰색** `rgba(255,255,255,0.15)` (회색 음영 아님)
- [ ] Pressed 배경이 `rgba(255,255,255,0.20)`
- [ ] Disabled 텍스트/아이콘이 `#555555` (gray-700)
- [ ] Focus 색상이 `var(--accent-400)` (accent-400, 라이트 `var(--accent-500)` 와 다름)

### Focus (핵심)

- [ ] Focus outline 이 **1px** 두께 (2px 아님)
- [ ] Focus outline gap 이 **1px** (outline-offset)
- [ ] 버튼보다 outline 이 위아래 각 2px 더 큼 (총 4px 확장)
- [ ] Button/Radio/Checkbox focus 와 동일한 1px + 1px 패턴

### 레이아웃

- [ ] border-radius 가 4px (6px 아님)
- [ ] 4 사이즈 height 가 정확 (24/28/32/40px)
- [ ] Tiny/Small padding 이 `4px` (상하좌우 동일)
- [ ] Medium/Large padding 이 `4px 8px` (좌우 8px, 상하 4px)
- [ ] gap 이 Tiny 2px, 나머지 4px
- [ ] font-weight 가 항상 600 (SemiBold)
- [ ] 아이콘 크기가 size 별로 자동 스케일 (tiny 14 / small 16 / medium 18 / large 20px)
- [ ] 아이콘이 Icon 컴포넌트로 위임됨 (lucide 직접 import 아님)
- [ ] 아이콘 stroke-width 가 Figma 스펙(1.25px) — lucide 기본(2px)보다 얇음
- [ ] 아이콘 색상이 **버튼 텍스트 색상과 동일** (Enabled `#1c1c1c` / Disabled `#aaaaaa`)
- [ ] disabled 시 아이콘 색상이 텍스트와 함께 disabled 토큰으로 자동 전환 (inherit)

### 동작

- [ ] Hover/Pressed/disabled 색상 전환이 0.2s ease 로 부드럽게
- [ ] transition 에 `border-color` 가 없음 (테두리가 없으므로 — Button 과의 차이)
- [ ] `transition: all` 을 쓰지 않음 (색상 속성만)
- [ ] Disabled 시 커서가 `not-allowed`, 호버/프레스 효과 없음
- [ ] 밑줄(text-decoration)이 없음 — Link 와 구분

## 14. 새 프로젝트 재현 잠금 계약

이 계약은 TextButton을 다른 프로젝트에서 새로 구현할 때에도 동일한 결과를 유지하기 위한 필수 조건이다.

- **전달 묶음**: [foundation 문서](../../foundations.md), reproduction.md, 이 문서의 의존 컴포넌트 closure와 명시된 SVG/폰트 자산을 함께 확보한 뒤 구현한다.
- **소유권**: 이 컴포넌트가 문서의 geometry, visual state, focus와 interaction을 단일하게 소유한다. 부모는 공개 props를 선택하고 문서의 배치 제약 안에서만 사용한다.
- **변형 금지**: 유사한 framework primitive, icon asset, default token으로 대체하거나 문서에 없는 responsive 변형을 추가하지 않는다.
- **검증 기준**: 이 문서의 기존 검증 체크리스트에 더해 reproduction.md의 공통 상태 matrix를 수행한다. 기준 viewport에서 폰트 로드, token mode, focus/keyboard, 긴 콘텐츠와 명시된 light/dark 상태를 함께 확인한다.
