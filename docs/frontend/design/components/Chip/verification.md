# Chip — 검증과 재현

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Chip 문서 인덱스](./README.md)

## 13. 검증 체크리스트

새 프로젝트에서 재현 후 아래 항목을 확인한다.

### 의존성

- [ ] 공용 **Icon** 컴포넌트가 구현되어 있음 (Figma System icon 스펙)
- [ ] 공용 **IconButton** 컴포넌트가 `xxs`(16px) size 와 `iconColor="inherit"` prop 을 지원함

### 색상 (라이트)

- [ ] filled green 배경이 `#05a85a` (green-600), 글자가 `#ffffff`
- [ ] filled gray 배경이 `#1c1c1c`, 글자가 `#ffffff` (반전)
- [ ] filled default 배경이 `#eeeeee` (gray-subtle), 글자가 `#1c1c1c`
- [ ] subtle green 배경이 `#e9fbf2` (green-50), 글자가 `#05a85a` (green-600)
- [ ] outlined green 테두리가 `#05a85a`, 글자가 `#05a85a`, 배경이 `#ffffff`
- [ ] outlined default 테두리가 `#1c1c1c` (--border-bolder)
- [ ] navy subtle 배경이 `#dde2f1` (navy-300), 글자가 `#1e232e` (navy-900)
- [ ] navy outlined 테두리가 `#9ba1af` (navy-500), 글자가 `#1e232e` (navy-900)
- [ ] 모든 색상을 `--chip-*` 토큰으로 참조 (hex 하드코딩 아님)

### 색상 (다크)

- [ ] filled gray 배경이 `#dddddd` (라이트 `#1c1c1c`에서 반전), 글자가 `#1c1c1c`
- [ ] filled green 배경이 `#25e086` (green-500, 더 밝음)
- [ ] subtle green 배경이 `#035930` (진한 톤), 글자가 `#06ce6e` (더 밝음)
- [ ] subtle navy 배경이 `#3f4450`, 글자가 `#dde2f1` (라이트에서 반전)
- [ ] outlined 배경이 `rgba(0,0,0,0.2)` (반투명)
- [ ] 다크 전환이 깜빡임 없이 0.2s ease 로 부드럽게

### 레이아웃

- [ ] Small height 가 **20px**, max-width 가 **200px**
- [ ] Medium height 가 **24px**, max-width 가 **240px**
- [ ] padding-inline 이 **8px** (icon/button 없을 때)
- [ ] Pill radius 가 small **10px** / medium **12px**
- [ ] Rounded radius 가 **4px**
- [ ] border 가 **1px** (outlined만 색상, 그 외 transparent)

### Icon / Button

- [ ] Leading icon 이 small에서 **14px**, medium에서 **16px**
- [ ] Trailing button 이 small에서 **16px** (IconButton xxs), medium에서 **20px** (IconButton tiny)
- [ ] Leading icon 색상이 Chip 글자색과 동일 (currentColor 상속)
- [ ] Trailing close icon 색상이 Chip 글자색과 동일 (iconColor="inherit" 체인)
- [ ] gap 이 icon 있을 때 4px, button 있을 때 small 3px / medium 2px

### 타이포그래피

- [ ] 폰트가 **Pretendard SemiBold(600)**
- [ ] font-size 가 **12px**, line-height 가 **16px** (모든 size 공통)

### 상태

- [ ] Disabled 시 모든 variant/color 가 공통 (`#eeeeee` 배경 + `#aaaaaa` 글자)
- [ ] Disabled 시 trailing button 이 클릭 불가(pointer-events: none)
- [ ] Disabled 시 `aria-disabled="true"` 설정

### 접근성

- [ ] trailing button 에 `aria-label` 이 있음 (기본 "제거")
- [ ] disabled trailing button 이 `tabIndex={-1}` 로 포커스 제외
- [ ] leading icon 이 `aria-hidden="true"` (장식용)
- [ ] trailing button 포커스 링이 표시됨

### 애니메이션

- [ ] `transition: all` 을 쓰지 않음 (색상 속성만: background-color, color, border-color)
- [ ] transition 지속시간이 0.2s 로 통일

## 14. 새 프로젝트 재현 잠금 계약

이 계약은 Chip을 다른 프로젝트에서 새로 구현할 때에도 동일한 결과를 유지하기 위한 필수 조건이다.

- **전달 묶음**: [foundation 문서](../../foundations.md), reproduction.md, 이 문서의 의존 컴포넌트 closure와 명시된 SVG/폰트 자산을 함께 확보한 뒤 구현한다.
- **소유권**: 이 컴포넌트가 문서의 geometry, visual state, focus와 interaction을 단일하게 소유한다. 부모는 공개 props를 선택하고 문서의 배치 제약 안에서만 사용한다.
- **변형 금지**: 유사한 framework primitive, icon asset, default token으로 대체하거나 문서에 없는 responsive 변형을 추가하지 않는다.
- **검증 기준**: 이 문서의 기존 검증 체크리스트에 더해 reproduction.md의 공통 상태 matrix를 수행한다. 기준 viewport에서 폰트 로드, token mode, focus/keyboard, 긴 콘텐츠와 명시된 light/dark 상태를 함께 확인한다.
