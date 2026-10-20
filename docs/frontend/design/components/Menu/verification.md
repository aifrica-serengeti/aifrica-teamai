# Menu — 검증과 재현

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Menu 문서 인덱스](./README.md)

## 14. 검증 체크리스트

### 구조 / 레이아웃

- [ ] MenuContent 최소 너비 **140px**, `width: max-content`(자동 확장)
- [ ] 컨테이너 padding **4px 0**(상하만), radius **4px**
- [ ] trigger 와 메뉴 간격 **4px** (`sideOffset=4`)
- [ ] `scrollable=true` 시 공용 **ScrollArea**(`type="auto"`)로 감싸 max-height **296px**(Large 8개)
- [ ] `scrollable=false` 시 `maxHeight`/`overflow` 없이 전부 펼침
- [ ] `content` 기본에 `maxHeight`/`overflow` 없음 — `contentScrollable`/`contentNoScroll` 분리
- [ ] Small **28px** / Medium **32px** / Large **36px** 행 높이
- [ ] px **16px**(좌우), gap **8px**(요소 간)
- [ ] Section header **32px**, Title3 12px SemiBold
- [ ] Divider **1px**, `--border-default`, 위아래 **2px** 여백

### Item 레이아웃 (★두 줄 밀림/겹침 방지)

- [ ] Leading(icon/avatar/checkbox) + content(label) + trailing이 **한 행**
- [ ] `itemLeading`: `flex-shrink: 0`, gap 4px
- [ ] `itemContent`: `flex: 1 1 auto`, `min-width: 0`, `overflow: hidden`
- [ ] `itemTrailing`: `flex-shrink: 0`, `margin-left: auto` (absolute 아님)
- [ ] 긴 텍스트가 trailing을 밀어내지 않음(content ellipsis)
- [ ] 컨텐츠가 많아도 메뉴 너비가 자동으로 넓어짐

### 상태 셀렉터 (★버그 방지 핵심)

- [ ] `&:hover` — 배경 `--menu-item-hovered`, focus 링 **없음**
- [ ] `&[data-highlighted]:not(:hover)` — focus 링만, 배경 **유지**(hover 색 아님)
- [ ] `:not(:hover)`가 빠지면 hover 시 focus 링이 잔류함
- [ ] focus 링이 `outline`이 아닌 **inset box-shadow** (overflow:hidden에 잘리지 않음)
- [ ] `&[data-selected="true"]:hover` — selected 배경 유지(덮어쓰기 방지)
- [ ] `&&[data-selected="true"][data-disabled]` — disabled 우선(명시도 `&&`)
- [ ] Disabled: `boxShadow: none`으로 focus 링도 제거

### Selected check

- [ ] `selected` prop → `data-selected="true"`
- [ ] trailing 미지정 시 `<CheckIcon className={checkIcon}>` 자동(16px, `--text-primary`)
- [ ] trailing 지정 시 check 대신 trailing 표시

### Submenu (★2-depth 구조)

- [ ] `MenuSubTrigger`가 일반 `MenuItem`과 **동일한 스타일**(item + size 클래스)
- [ ] 우측 `ChevronRightIcon`(16px) 자동 렌더, 색상 `--text`(폰트와 동일, primary 아님)
- [ ] `MenuSubContent`가 `content` 클래스 사용 + `MenuContext.Provider`로 size 전파
- [ ] SubContent 기본 `size="small"`

### Menu Component Patterns (★패턴 구성)

- [ ] **Text only**: `<MenuItem>라벨</MenuItem>` — 단일 텍스트만 가능
- [ ] **Leading icon**: `leading={<Icon size="m" />}` — icon과 라벨이 같은 행
- [ ] **Trailing shortcut**: `trailing="Ctrl+N"` — 문자열 전달 시 자동 `--text-subtler` 색상
- [ ] **Selected check**: `selected` prop — 배경/텍스트 변경 + check 자동(16px, `--text-primary`)
- [ ] **Description**: `description="설명"` — Body3 12px, 라벨 아래
- [ ] **Leading avatar**: `leading={<Avatar size="20" />}` — 공용 Avatar 컴포넌트
- [ ] **Trailing badge**: `trailing={<Badge variant="counter" />}` — 공용 Badge 컴포넌트
- [ ] **Trailing chip**: `trailing={<Chip size="small" variant="subtle" />}` — 공용 Chip 컴포넌트
- [ ] **Trailing icon**: `trailing={<Icon name="external_link" color="subtle" />}` — 외부 링크
- [ ] **Leading checkbox**: `leading={<Checkbox />}` + `onSelect preventDefault` — 메뉴 유지
- [ ] **Trailing switch**: `trailing={<Switch size="small" />}` + `onSelect preventDefault` — 메뉴 유지
- [ ] **Icon+Text 혼용 금지**: 한 메뉴 내에서 아이콘 유무가 다른 item을 섞지 않음
- [ ] **Item 12개 이하 권장**: 초과 시 `scrollable=true`(기본)로 스크롤

### 색상

- [ ] 라이트: 컨테이너 배경 `#ffffff`, 테두리 `#dddddd`
- [ ] 다크: 컨테이너 배경 `#333333`, 테두리 `#555555`
- [ ] 그림자 navy 2단: `0 4px 6px rgba(9,30,66,0.15), 0 0 1px rgba(9,30,66,0.31)`
- [ ] Selected: 배경 `var(--accent-50)`(라) / `var(--accent-900)`(다), 텍스트 `var(--accent-500)` / `var(--accent-200)`
- [ ] Shortcut 색상 `#757575`(라) / `#8f8f8f`(다) — **검정 아님**
- [ ] Submenu chevron 색상이 폰트 색상과 동일(`--text`)

### 애니메이션

- [ ] 진입/퇴장 **0.15s** fade+slide
- [ ] 방향별(data-side) 진입 방향 상이
- [ ] 색상 전환 **0.2s** 개별 속성 (`transition: all` 아님)

### 접근성

- [ ] ↑↓ item 탐색, Enter 선택, ESC 닫기, 외부 클릭 닫기
- [ ] 닫힘 시 trigger로 포커스 복원
- [ ] 키보드 포커스 시 focus 링 표시

### ScrollArea (★공용 컴포넌트)

- [ ] **공용 ScrollArea** 컴포넌트 사용(native scrollbar 아님)
- [ ] `type="auto"`(hover+scroll 시 thumb 표시)
- [ ] `scrollAreaWrap`: ScrollArea 기본 스타일(border/radius/bg/padding) 초기화
- [ ] `globalStyle` thumb 제외: `.${scrollAreaWrap} > div:not([role])` (★필수 — thumb 왜곡 방지)
- [ ] thumb width **4px** (전체 너비로 왜곡되지 않음)

### 다크 모드

- [ ] `.dark` 토글 시 모든 색상 자동 전환
- [ ] 전환 시 0.2s 부드럽게
- [ ] 그림자는 navy 톤이라 공통

### 의존 컴포넌트

- [ ] Leading icon이 **Icon** 컴포넌트(`size="m"`, semantic 색상)
- [ ] Leading avatar가 **Avatar**(`size="20"`)
- [ ] Leading checkbox가 **Checkbox** + `onSelect preventDefault`
- [ ] Trailing switch가 **Switch**(`size="small"`) + `onSelect preventDefault`
- [ ] Trailing chip이 **Chip**(`size="small"`, `variant="subtle"`)
- [ ] Trailing badge가 **Badge**(`variant="counter"` / `variant="dot"`)
