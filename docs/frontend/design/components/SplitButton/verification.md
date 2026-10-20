# Split Button — 검증과 재현

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Split Button 문서 인덱스](./README.md)

## 13. 검증 체크리스트

새 프로젝트에서 재현 후 아래 항목을 확인한다.

### 구조 / 레이아웃

- [ ] Primary action(아이콘-only 정사각) + 분할선 + Secondary action(아이콘+라벨+chevron) 3요소
- [ ] 분할선이 **별도 DOM 요소가 아님** — 두 action 의 border 가 `margin-right: -1px` 로 겹쳐 1px 선 생성
- [ ] Primary radius `4px 0 0 4px`(좌측만), Secondary radius `0 4px 4px 0`(우측만)
- [ ] Tiny: 전체 높이 **24px**, Primary **24×24px**, Secondary px **8**, gap **2**, icon **14px**(s)
- [ ] Small: 전체 높이 **28px**, Primary **28×28px**, Secondary px **8**, gap **4**, icon **16px**(m)
- [ ] Medium: 전체 높이 **32px**, Primary **32×32px**, Secondary px **12**, gap **4**, icon **16px**(m)
- [ ] Large: 전체 높이 **40px**, Primary **40×40px**, Secondary px **16**, gap **4**, icon **20px**(xl)
- [ ] 두 action 모두 `box-sizing: border-box`를 사용해 1px 상하 border가 전체 높이에 추가되지 않음
- [ ] font-weight **400 (Regular)** — Button(600)과 다름
- [ ] 아이콘 svg 가 `flex-shrink: 0` (chevron/아이콘 잘림 없음)

### 색상 — 라이트

- [ ] Enabled fill `#ffffff`, 텍스트 `#1c1c1c`, 테두리 `#dddddd`
- [ ] Hovered fill `#f8f8f8`, Pressed/Active fill `#f4f4f4`
- [ ] Disabled 텍스트 `#aaaaaa`, fill `#ffffff`
- [ ] 분할선 색상 `#dddddd` (테두리와 동일)

### 색상 — 다크

- [ ] Enabled fill `rgba(255,255,255,0.08)`, 텍스트 `#dddddd`, 테두리 `#555555`
- [ ] Hovered fill `rgba(255,255,255,0.15)`, Pressed/Active fill `rgba(255,255,255,0.20)`
- [ ] Disabled 텍스트 `#555555`
- [ ] 분할선 색상 `#555555`

### 상태 독립성 (핵심)

- [ ] Primary action hover 시 Secondary action 배경 변화 없음 (역도 동일)
- [ ] Secondary action 의 메뉴가 열려도(Active) Primary action 은 기본 색상 유지
- [ ] Secondary action Active(메뉴 열림) 시 pressed 색상(`#f4f4f4`/다크 반투명 흰 20%) 유지

### Focus (가장 중요 — 구현 난점)

- [ ] Primary action focus 시 **우측 outline 이 잘리지 않음** (z-index 로 형제 위에 표시)
- [ ] Secondary action focus 시 **좌측 outline 이 잘리지 않음**
- [ ] outline `1px solid var(--accent-500)`, gap **1px** (outline-offset)
- [ ] outline 이 action border-box 바깥에 여백을 두고 그려짐
- [ ] 다크 모드에서도 focus 색 `var(--accent-500)` 동일 (전환 없음)
- [ ] 마우스 클릭 시 focus outline 숨김(`:focus-visible` 만)

### Chevron 회전

- [ ] 메뉴 열림 시 chevron 이 0° → **180°** 회전 (down arrow → up arrow)
- [ ] 회전 애니메이션 **0.15s ease**
- [ ] 메뉴 닫힘 시 180° → 0° 로 되돌아감

### 접근성

- [ ] Primary action 에 `aria-label` 있음 (아이콘-only 이므로 필수)
- [ ] Tab 키로 Primary → Secondary 순서로 focus 이동
- [ ] Secondary action Enter/Space 로 메뉴 토글
- [ ] 메뉴 열림 후 방향키(↑↓) 로 item 탐색, Enter 로 선택
- [ ] ESC 로 메뉴 닫기, 닫힘 시 Secondary action 으로 포커스 복원
- [ ] Disabled 시 양쪽 action 모두 포커스 불가

### 다크 모드

- [ ] `.dark` 클래스 토글 시 모든 색상이 자동 전환 (semantic 토큰)
- [ ] 전환 시 깜빡임 없이 부드럽게 (색상 transition **0.2s ease**)
- [ ] `transition: all` 사용 안 함 (색상 속성만)

### 의존 컴포넌트

- [ ] Secondary action 클릭 시 **공용 Menu 컴포넌트**(Radix DropdownMenu)가 펼쳐짐
- [ ] Menu 의 item 높이가 SplitButton size 와 매핑됨(tiny/small→small, medium→medium, large→large)
- [ ] `menuScrollable=false`인 짧은 메뉴는 항목 아래에 불필요한 빈 공간이 없음
- [ ] `menuScrollable=true`인 긴 메뉴는 최대 296px에서 공용 ScrollArea로 스크롤됨
- [ ] 아이콘이 **공용 Icon 컴포넌트**로 렌더(사이즈별 stroke-width 적용)
- [ ] Icon 색상이 부모 action 의 `color` 를 상속(`color: inherit`)
- [ ] Disabled 시 아이콘 색상도 회색으로 자동 전환

## 14. 새 프로젝트 재현 잠금 계약

이 계약은 SplitButton을 다른 프로젝트에서 새로 구현할 때에도 동일한 결과를 유지하기 위한 필수 조건이다.

- **전달 묶음**: [foundation 문서](../../foundations.md), reproduction.md, 이 문서의 의존 컴포넌트 closure와 명시된 SVG/폰트 자산을 함께 확보한 뒤 구현한다.
- **소유권**: 이 컴포넌트가 문서의 geometry, visual state, focus와 interaction을 단일하게 소유한다. 부모는 공개 props를 선택하고 문서의 배치 제약 안에서만 사용한다.
- **변형 금지**: 유사한 framework primitive, icon asset, default token으로 대체하거나 문서에 없는 responsive 변형을 추가하지 않는다.
- **검증 기준**: 이 문서의 기존 검증 체크리스트에 더해 reproduction.md의 공통 상태 matrix를 수행한다. 기준 viewport에서 폰트 로드, token mode, focus/keyboard, 긴 콘텐츠와 명시된 light/dark 상태를 함께 확인한다.
