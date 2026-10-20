# Tree — 검증과 재현

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Tree 문서 인덱스](./README.md)

## 15. 검증 체크리스트

### 구조·레이아웃

- [ ] Default/Small 32px, Default/Medium 40px, Symbol/Small 32px를 모두 확인했다.
- [ ] default depth indent는 24px, symbol depth indent는 28px이다.
- [ ] parent chevron slot과 leaf connector slot은 모두 24×24px이다.
- [ ] row content의 flex gap이 0px이며 connector가 중간에서 끊기지 않는다.
- [ ] leaf marker는 5×5px **원형**이고 triangle과 같은 icon semantic 색이다. 최상위 리프를 포함한 모든 리프에 표시된다.
- [ ] checkbox 있음/없음, icon 있음/없음의 세 가지 margin 규칙을 확인했다.
- [ ] `showLeafActions`일 때 selected trailing IconButton의 margin-left가 4px이다.
- [ ] `showLeafActions={false}`면 selected leaf에도 더 보기 버튼·메뉴가 없다.

### 상태·접근성

- [ ] disabled row는 click, chevron, checkbox로 상태를 변경할 수 없다.
- [ ] chevron/checkbox/more click은 row selection을 중복 실행하지 않는다.
- [ ] parent는 `aria-expanded`, 모든 행은 올바른 `aria-level`을 갖는다.
- [ ] enabled/disabled 행은 light/dark 모두 `transparent`이며, hover 전에는 별도 surface가 보이지 않는다.
- [ ] hover/pressed 배경은 부모 surface 위의 alpha overlay이며, `--action-default`를 기본 배경으로 쓰지 않는다.
- [ ] selected 행은 light `var(--accent-50)` / dark `var(--accent-900)` 배경과 2px primary 좌측 막대를 가진다.
- [ ] focus-visible outline은 1px primary + 1px offset이다.

### connector·animation

- [ ] 한 부모의 여러 자식 branch가 끊기지 않고 같은 SVG 좌표계에서 연결된다.
- [ ] ㄴ elbow의 곡률은 6px이고 line width는 1px이다.
- [ ] selected 행에서도 SVG overlay가 row보다 위(`z-index: 3`)에 있어 connector가 끊기거나 배경에 가려지지 않는다.
- [ ] 닫을 때 connector가 아래 노드 위로 오래 남거나 겹치지 않는다.
- [ ] 열 때 connector가 80ms 지연 후 fade-in하며 튀어나오지 않는다.
- [ ] light/dark 전환에서 connector, marker, text, background가 0.2초로 자연스럽게 전환된다.

### 대용량

- [ ] 1,001-node 예시의 초기 렌더 행 수는 11이다.
- [ ] 폴더 하나를 열면 해당 99개 리프만 추가되어 110행이다.
- [ ] 폴더를 닫고 0.2초 transition이 끝나면 11행으로 복귀한다.
- [ ] selected/checked만 바꿀 때 connector 측정 effect가 재시작하지 않는다.

## 17. 새 프로젝트 재현 잠금 계약

이 계약은 Tree을 다른 프로젝트에서 새로 구현할 때에도 동일한 결과를 유지하기 위한 필수 조건이다.

- **전달 묶음**: [foundation 문서](../../foundations.md), reproduction.md, 이 문서의 의존 컴포넌트 closure와 명시된 SVG/폰트 자산을 함께 확보한 뒤 구현한다.
- **소유권**: 이 컴포넌트가 navigation semantics, focus/keyboard, selection 및 overflow 규칙을 소유한다. 부모는 공개 controlled API로 값만 전달하고 내부 markup/CSS를 재구현하지 않는다.
- **변형 금지**: 문서에 없는 depth 축약, route 이동, selected indicator 또는 responsive 변형을 추가하지 않는다.
- **검증 기준**: 이 문서의 기존 검증 체크리스트에 더해 reproduction.md의 공통 상태 matrix를 수행한다. 기준 viewport에서 폰트 로드, token mode, focus/keyboard, 긴 콘텐츠와 명시된 light/dark 상태를 함께 확인한다.
