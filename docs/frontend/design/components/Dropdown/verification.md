# Dropdown — 검증과 재현

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Dropdown 문서 인덱스](./README.md)

## 13. 검증 체크리스트

재현 후 아래 항목을 확인한다.

### 빌드

- [ ] `tsc --noEmit` 통과
- [ ] `vite build` 통과

### 필드 외형

- [ ] Enabled — border `1px #dddddd`, surface `#ffffff`, placeholder `#757575`
- [ ] Hovered — surface `#f8f8f8` (border 유지)
- [ ] Pressed — surface `#f4f4f4`
- [ ] Focused(메뉴 열림) — 외곽 outline 링 `1px var(--accent-500)`, icon 180° 회전
- [ ] Invalid — border `2px #d00a0a`(실제 2px), error text `#d00a0a`
- [ ] Invalid + Focused — outline 링 offset -4px(2px border 밖으로 튀어나옴)
- [ ] Disabled — surface `#ffffff`, text/placeholder/icon 모두 `#aaaaaa`, cursor not-allowed
- [ ] Disabled — 선택된 값이 있어도 텍스트 + 아이콘이 모두 `#aaaaaa`로 전환
- [ ] Read-only — surface `#f8f8f8`, text/icon `#1c1c1c`(enabled 색 유지)
- [ ] Selected — enabled 와 동일 필드, 선택값 표시

### 크기

- [ ] Small 28px / Medium 32px / Large 36px / X-Large 40px
- [ ] 좌측 패딩 12px, 우측 패딩 6px, radius 4px
- [ ] Focused line 높이 = field 높이 + 4px

### 너비 자동 조정

- [ ] 내부 텍스트가 길면 field 가 자동으로 넓어짐(`minWidth: fit-content`)
- [ ] 부모가 고정 너비일 때만 텍스트가 ellipsis 로 잘림
- [ ] Menu 너비가 field 너비에 맞춰짐

### 동작

- [ ] 필드 클릭 시 Menu 가 field 너비에 맞춰 펼쳐짐
- [ ] Menu item 이 길면 자동으로 넓어짐
- [ ] 옵션 선택 시 필드에 값 표시, Menu 닫힘
- [ ] Disabled — 메뉴가 열리지 않음
- [ ] Read-only — 메뉴가 열리지 않음
- [ ] Disabled — hover/pressed 효과 없음

### 다크 모드

- [ ] semantic 토큰 자동 전환 — surface 반투명 흰, border `#555555`, text `#dddddd`
- [ ] Focus 링 색상 `var(--accent-400)`(더 밝은 blue)
- [ ] Invalid border `#e81919`, error text `#fec3c3`
- [ ] 전환 시 깜빡임 없이 0.2s ease 로 보간

### 접근성

- [ ] Tab 으로 field 이동, Enter/Space 로 메뉴 열기
- [ ] ↑/↓ 로 옵션 탐색, Enter 로 선택, ESC 로 닫기
- [ ] `aria-haspopup="menu"`, `aria-invalid`, `aria-disabled`, `aria-readonly` 설정

## 14. 새 프로젝트 재현 잠금 계약

이 계약은 Dropdown을 다른 프로젝트에서 새로 구현할 때에도 동일한 결과를 유지하기 위한 필수 조건이다.

- **전달 묶음**: [foundation 문서](../../foundations.md), reproduction.md, 이 문서의 의존 컴포넌트 closure와 명시된 SVG/폰트 자산을 함께 확보한 뒤 구현한다.
- **소유권**: 이 컴포넌트가 portal surface, focus return, Escape와 keyboard interaction, open/close animation을 소유한다. 부모는 문서의 open callback/controlled API로만 연결한다.
- **변형 금지**: 임의 z-index, 다른 overlay primitive, browser 기본 popup, 문서에 없는 viewport 재배치는 사용하지 않는다.
- **검증 기준**: 이 문서의 기존 검증 체크리스트에 더해 reproduction.md의 공통 상태 matrix를 수행한다. 기준 viewport에서 폰트 로드, token mode, focus/keyboard, 긴 콘텐츠와 명시된 light/dark 상태를 함께 확인한다.
