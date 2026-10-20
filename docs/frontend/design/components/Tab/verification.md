# Tab — 검증과 재현

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Tab 문서 인덱스](./README.md)

## 13. 검증 체크리스트

새 프로젝트에서 재현 후 아래 항목을 확인한다.

아래는 채택 시 수행할 검증 목록이며 통과 기록이 아니다. 제공된 예제는 일반·controlled Tab과
`showContent=false` 렌더 분기까지다. closable adapter와 외부 page panel 연결은
[구현 범위](./implementation/README.md)에 따라 소비 제품에서 별도로 구현·검증한다.

### 레이아웃

- [ ] 트리거 높이가 모든 상태에서 44px 고정 (흔들림 없음)
- [ ] 단일 트리거 최소 폭 120px
- [ ] 아이템 개수별 총 폭이 2→240, 3→360, 4→480, 5→600, 6→720px
- [ ] TabsList 하단에 1px 회색선이 전체 폭에 깔림
- [ ] 오버플로우 이동 버튼의 모서리가 0px이고 안쪽 경계와 하단선이 직각으로 정확히 만남
- [ ] 시작/끝 버튼이 콘텐츠 방향으로 약한 그림자를 표시함
- [ ] 오버플로우 그림자가 상·하단에서 자연스럽게 투명해지고 버튼 위·아래로 번지지 않음

### 색상 (라이트)

- [ ] Selected 텍스트가 `var(--accent-500)` (accent 색, 검은색 아님)
- [ ] Selected 하단 인디케이터가 2px `var(--accent-500)`
- [ ] Unselected 텍스트가 `#555555` Regular
- [ ] Hover 시 하단선 `#aaaaaa` + 배경 `#f8f8f8`
- [ ] Pressed 시 하단선 `#8f8f8f` + 배경 `#f4f4f4`
- [ ] Disabled 텍스트가 `#aaaaaa`

### 색상 (다크)

- [ ] Selected 텍스트가 `var(--accent-400)` (accent-400, 더 밝음)
- [ ] Selected 하단 인디케이터가 2px `var(--accent-400)`
- [ ] Unselected 텍스트가 `#aaaaaa`
- [ ] Selected Chip 배경이 `var(--accent-800)` (진한 navy, pastel 아님)
- [ ] Selected Chip 텍스트가 `var(--accent-200)`
- [ ] Disabled Chip 배경이 `rgba(255,255,255,0.1)`

### Chip

- [ ] purple accent를 적용하고 Chip/Tab token 선언의 로드 순서를 바꿔도 일반 `Chip color="blue"`는 blue를 유지함
- [ ] selected Tab count만 `--tab-count-selected-surface` / `--tab-count-selected-text`의 accent를 사용함
- [ ] Unselected Chip이 gray-subtle (`#eeeeee` 라이트 / `#333333` 다크)
- [ ] Selected Chip이 Tab 전용 accent로 자동 전환
- [ ] count=0일 때 Chip이 표시되지 않음
- [ ] `--element-primary-subtle`이 아닌 `--tab-count-selected-surface` 사용 (다크 모드 검증)

### Icon

- [ ] 아이콘 크기가 16px (Icon size `m`)
- [ ] Icon ↔ Label 간격이 4px
- [ ] Selected 시 아이콘이 `var(--accent-500)` (텍스트와 동일, `color: inherit` 확인)
- [ ] Unselected 시 아이콘이 `#555555` (라이트) / `#aaaaaa` (다크)
- [ ] Disabled 시 아이콘이 `#aaaaaa` (라이트) / `#757575` (다크)
- [ ] 아이콘에 `aria-hidden="true"` 설정 (장식용)
- [ ] 긴 라벨에서 아이콘이 깎이지 않음 (`flexShrink: 0` 확인)
- [ ] Icon + Label + Chip 세 요소가 `[Icon] [Label] [Chip]` 순서로 배치

### Focus

- [ ] 키보드 Tab으로 모든 트리거(selected/unselected 무관)에 focus 가능
- [ ] Focus 시 2px `var(--accent-500)` 직사각형 outline (내부 배치)
- [ ] Focus outline이 selected 인디케이터와 충돌하지 않음

### 애니메이션

- [ ] 색상 전환이 0.2s ease로 부드럽게
- [ ] `transition: all` 미사용
- [ ] 다크/라이트 전환 시 깜빡임 없음
- [ ] 오버플로우 버튼이 DOM을 유지한 채 opacity·transform으로 0.2초간 등장·퇴장함
- [ ] reduced motion에서 전환 없이 즉시 표시·숨김 처리됨

### 접근성

- [ ] 전달한 `aria-label`이 실제 `tablist`의 접근성 이름으로 연결됨
- [ ] controlled value와 `onValueChange`가 같은 page state를 읽고 갱신함
- [ ] `showContent=false`에서 trigger는 유지되고 `TabsContent`는 렌더되지 않음
- [ ] 외부 panel adapter를 채택한 실제 Radix runtime에서 각 trigger의 `aria-controls`가 존재하는 page `tabpanel` id를 가리킴
- [ ] 외부 panel의 `aria-labelledby`가 실제 trigger id를 가리키며 중복 id가 없음
- [ ] 외부 panel의 활성 상태·keyboard 이동·focus 복구가 controlled page state와 일치함
- [ ] 그룹 disabled와 개별 disabled가 각각 trigger에 반영됨
- [ ] 키보드 ←→로 탭 이동 가능
- [ ] 활성 탭에 `aria-selected="true"`
- [ ] Chip에 `aria-label="{count}개"`

## 14. 새 프로젝트 재현 잠금 계약

이 계약은 Tab을 다른 프로젝트에서 새로 구현할 때에도 동일한 결과를 유지하기 위한 필수 조건이다.

- **전달 묶음**: [foundation 문서](../../foundations.md), reproduction.md, 이 문서의 의존 컴포넌트 closure와 명시된 SVG/폰트 자산을 함께 확보한 뒤 구현한다.
- **소유권**: 이 컴포넌트가 navigation semantics, focus/keyboard, selection 및 overflow 규칙을 소유한다. 부모는 공개 controlled API로 값만 전달하고 내부 markup/CSS를 재구현하지 않는다.
- **변형 금지**: 문서에 없는 depth 축약, route 이동, selected indicator 또는 responsive 변형을 추가하지 않는다.
- **검증 기준**: 이 문서의 기존 검증 체크리스트에 더해 reproduction.md의 공통 상태 matrix를 수행한다. 기준 viewport에서 폰트 로드, token mode, focus/keyboard, 긴 콘텐츠와 명시된 light/dark 상태를 함께 확인한다.

- [ ] closable adapter를 구현한 제품에서 `onRemove`가 있는 탭의 닫기 버튼이 클릭·Enter·Space에서 탭 전환 없이 `onRemove`만 호출하는지 확인한다. 일반 예제에는 이 adapter가 제공되지 않는다.
- [ ] closable adapter의 `removeLabel`·기본 이름, 활성 탭 제거 후 선택값과 focus 복구를 실제 runtime에서 확인한다.
