# 컴포넌트 카탈로그와 조합 규칙

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

<!-- 새 컴포넌트는 아래 목록에 한 줄씩 추가한다. 경로: ./{Component}/README.md — 한 줄 설명 -->

## 빠른 분류

| 범주               | 컴포넌트                                                                                                                                                                                                                                                                   |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Actions            | Button, Icon Button, Text Button, Link, Split Button, Action Bar                                                                                                                                                                                                           |
| Form               | Input, Input List Field, Detail Field, Textarea, Number Input, Search, Select, Dropdown, Date Picker, Timepicker, Checkbox, Radio, Switch, Slider, Segmented Control                                                                                                       |
| Navigation         | Breadcrumb, Menu, Tab, Pagination, Stepper, Tree, Page Header                                                                                                                                                                              |
| Content & feedback | Icon, Private Icon, Avatar, Badge, Chip, Skeleton, Spinner, Status, Notification, Async Content State, Content State, List Content State, Tooltip, Divider, Card, Card Accordion, Detail Section, Table, Calendar, Dialog, Edit Confirmation Dialog, Open Panel, Scrollbar |

## 공용 컴포넌트 조합 규칙 (필수)

컴포넌트는 단독으로 존재하지 않고 서로 조합되어 만들어진다. 예를 들어 Card는 Chip,
Icon Button, Button, Link, Icon을 조합하고 Page Header는 여러 action과 navigation slot을 조합한다. 이때
**조합에 쓰이는 하위 컴포넌트를 각 컴포넌트가 따로 만들면 스펙이 어긋나고 중복이 폭발한다.**
아래 규칙은 단일 진실 원천(SSOT)을 유지하기 위한 필수 절차다.

### 규칙

0. **재현 프로토콜 적용** — 새 프로젝트 구현은
   [reproduction.md](../reproduction.md)의 실행 환경,
   dependency closure, 상태 소유권, 검증 gate를 먼저 적용한다. 이 규약은 아래 모든
   컴포넌트에 공통으로 적용된다.

1. **의존 컴포넌트 명시** — 컴포넌트 가이드라인은 반드시 **"의존 컴포넌트"** 섹션을 가진다.
   해당 컴포넌트를 구현/재현하는 데 필요한 하위 컴포넌트를 모두 나열한다
   (예: Icon Button → Icon, Tooltip). 없을 경우에도 "의존 컴포넌트 없음"으로 명시.

2. **가이드라인 존재 확인** — 각 의존 컴포넌트가 아래 "컴포넌트 목록"에 있는지 확인한다.
   - **있다** → 그 컴포넌트의 가이드라인 묶음(`{Component}/README.md`에서 시작)을 따라 구현한다.
   - **없다** → 의존 컴포넌트의 가이드라인부터 먼저 작성한다. 그 뒤에 조합 컴포넌트를 만든다.

3. **구현 확인** — 의존 컴포넌트의 가이드라인이 있더라도, 실제 코드가 구현되어 있는지 확인한다.
   - **솔루션에서 구현을 확인했다** → 재사용한다. 절대 다시 만들지 않는다.
   - **솔루션에 대응 구현이 없다** → 의존 컴포넌트의 가이드라인을 보고 먼저 구현한 뒤, 그것을 조합해
     현재 컴포넌트를 만든다.

4. **직접 구현 금지** — 의존 컴포넌트로 분류된 기능을 조합 컴포넌트 내부에 직접 구현하지 않는다.
   예: Icon Button 이 Tooltip 마크업/상태/portalling 로직을 직접 가지지 않는다.

### 예시 (Card)

```
Card
├── Chip        — 의존 컴포넌트. Chip/README.md 확인 → 참조 계약 · 매핑 확인 필요 → 재사용
├── IconButton  — 의존 컴포넌트. IconButton/README.md 확인 → 참조 계약 · 매핑 확인 필요 → 재사용
├── Button      — 의존 컴포넌트. Button/README.md 확인 → 참조 계약 · 매핑 확인 필요 → 재사용
├── Link        — 의존 컴포넌트. Link/README.md 확인 → 참조 계약 · 매핑 확인 필요 → 재사용
└── Icon        — 구현되지 않았다면 Icon 문서 묶음으로 먼저 구현 → 그 뒤 Card 조합
```

> 작성 원칙/템플릿(의존 컴포넌트 섹션 포함)은
> [작성 원칙과 템플릿](../authoring.md) 참고.

---

- [Radio & Radio Group](./Radio/README.md) — 단일 선택 컴포넌트. Radix 기반 `RadioGroupRoot`/`Radio` 저수준 조합과 label·옵션을 포함한 `RadioGroup` field, 32px hit area 안의 16px 원·상태별 색상·roving focus를 제공.
- [Divider](./Divider/README.md) — 콘텐츠 구분선. shadcn Separator 기반, 1px 선 + 방향별 8px 여백 래퍼. 라이트 `#dddddd`/다크 `#555555` 토큰 자동 전환 + 240ms 전환 애니메이션.
- [Checkbox & Checkbox Group](./Checkbox/README.md) — 다중 선택 컴포넌트. shadcn Checkbox 기반, Small(12px)/Medium(16px) 사각형·Indeterminate 상태·부모-자식 관계·1px offset focus border.
- [Switch](./Switch/README.md) — 이진 토글 컴포넌트. shadcn Switch(Radix) 기반, 알약 track + 원형 thumb. 3 size(Small 32×18/Medium 40×22/Large 48×26)·On/Off × Enabled/Disabled 상태별 색상 매핑·Figma Raised dual-layer navy 그림자·Create/Detail은 semibold label 아래 large Switch를 32px control row 중앙 배치.
- [Button](./Button/README.md) — 버튼 컴포넌트. 4 variant(Primary/Secondary/Tertiary/Negative) × 4 size(Tiny/Small/Medium/Large) × 5 state. radius 4px·Pretendard SemiBold·1px focus outline.
- [Input](./Input/README.md) — 한 줄 텍스트 입력. 2 style(Default/Create) × 4 size(S/M/L/XL) × 7 state. InputField는 브라우저 검증 말풍선을 공용 Error text로 대체하며 native 제출 차단을 유지한다. form semantic 토큰·inset shadow 2px focus 링(밀림 방지)·Trailing(counter/suffix/clear/password 토글/`trailingAction` 보조 액션)은 공용 Icon Button 재사용.
- [Input List Field](./InputListField/README.md) — URI·허용 출처 같은 반복 문자열 입력. controlled string array·최소 한 행 보존·추가/삭제·trim 후 payload 정규화·list 전체 validation을 Input/Button/Icon Button으로 조합.
- [Date Picker](./DatePicker/README.md) — 날짜 단일/범위 입력 설계(추출 참조 source는 Single). `selectionUnit="month"`로 월 선택 즉시 월 1일 확정·Popover 닫기. 솔루션 locale/calendar 정책으로 공휴일·일요일 강조 선택·빈 주 없는 popup·`YYYY.MM.DD` 고정 pattern·자동 실재 날짜 검증·아이콘 버튼 전용 Calendar Popover·Dialog 위 floating layer·닫기 후 trigger 포커스 복원·Menu 기준 150ms 모션/그림자·모션 감소 지원·확대 시 가용 높이 내 스크롤·Default/Create × 4 size × Invalid/Disabled/Read-only. 공용 Input · Icon Button · Calendar · ScrollArea 의존.
- [Timepicker](./Timepicker/README.md) — 시간 단일/범위 선택. 시·분·초 ScrollArea 메뉴·Range 2단계 확정·종료 시간 역전 자동 Invalid·clock Icon Button·Now TextButton·공용 Button/TextButton/Icon/ScrollArea 조합.
- [Search](./Search/README.md) — 검색어 입력. Leading search icon(돋보기) · Close button · 2 style(Default/Create) × 4 size(S/M/L/XL) × 5 state(Enabled/Focused/Typing/Filled/Disabled). Input 컴포넌트 기반.
- [Textarea](./Textarea/README.md) — 여러 줄 텍스트 입력. 2 style(Default/Create) × 7 state. form semantic 토큰 공유(Input 동일)·height 84px(rows=3)·resize vertical·inset shadow 2px focus 링·counter 는 label 행 우측 끝(Input trailing 과 다름)·Create focus 시 배경 #f8f8f8 유지.
- [Number Input](./NumberInput/README.md) — 모든 숫자 page field에서 일반 Input `type=number` 대신 쓰는 숫자 입력 + 증감 버튼. 2 style(Default/Create) × 4 size(S/M/L/XL) × 6 state·blank draft `textValue`·내부 단위 `suffix`·지수 표기 입력 차단·↑/↓·Shift+↑/↓(×10)·min/max clamp·공용 Icon Button 재사용.
- [Icon](./Icon/README.md) — 아이콘 컴포넌트. 사이즈 8단계(t/s/m/l/xl/2xl/3xl/4xl)·사이즈별 스트로크 굵기(1.25/1.5/2px)·semantic 색상 토큰. lucide-react 기반 System icon + 이름별 자동 색상 매핑 Status icon.
- [Private Icon](./PrivateIcon/README.md) — Figma 원본 SVG/PNG로 제공하는 클라우드·운영체제·기술 스택 로고. System Icon과 분리된 이름·사이즈·대체 텍스트 계약.
- [Scrollbar & ScrollArea](./Scrollbar/README.md) — 스크롤바 컴포넌트. overlay 배치(naive-ui 스타일)·반투명 thumb(alpha 30%)·노출 타이밍(hover/always/scroll/auto)·방향(vertical/horizontal/both)·가변 굵기(thumbWidth)·sticky header용 수직 thumb 시작 여백(verticalThumbOffset)·명시적 scrollTo handle. 순수 CSS+JS 구현(Radix 미사용).
- [Action bar](./ActionBar/README.md) — 컨텍스트 액션 바. inverse surface(라이트 검정/다크 흰)·compound 컴포넌트(Action/IconButton/Divider)·5상태(Enabled/Hovered/Pressed/Focused/Disabled)·알파 오버레이 hover/pressed·Mid elevation.
- [Tooltip](./Tooltip/README.md) — 툴팁 컴포넌트. Radix Tooltip 기반, inverse surface·2 type·12위치·Figma 삼각형 화살표·방향별 fade+slide. trigger당 owner 하나, pending 중 content/accessible action name 안정성 계약 포함.
- [Icon Button](./IconButton/README.md) — 아이콘 버튼. 2 variant × 3 size × 5 state. 공용 Icon 기반·반투명 hover/pressed·Tooltip은 외부 조합. Page Header medium action은 18px/1.25px rounded stroke를 override 없이 사용.
- [Avatar](./Avatar/README.md) — 사용자 식별 아바타. 8 size(16~48px) × 7 color × 2 variant(solid/subtle). Radix Avatar 기반·CSS 직접 렌더·semantic disabled 토큰(다크 자동 전환)·gray subtle 대비 규칙(다크에서도 어두운 글자 유지).
- [Badge](./Badge/README.md) — 알림 배지. 2 variant(Dot/Counter)·단일 point 색상(라이트 `#d00a0a`/다크 `#e81919`)·99+ 캡핑·count=0 렌더 생략·순수 CSS 렌더(shadcn/Radix 미사용)·호스트 우상단 겹치기 배치.
- [Link](./Link/README.md) — 텍스트 링크. 3 size(Small/Medium/Large) × 5 state × 2 type(Inline/Standalone). 공용 Icon 컴포넌트 기반 trailing 아이콘·상태별 밑줄(Disabled 제외)·주변 텍스트 크기 매칭 규칙.
- [Text Button](./TextButton/README.md) — 텍스트 버튼. 4 size(Tiny/Small/Medium/Large) × 5 state. 테두리 없는 보조 액션(투명 배경·hover/pressed 회색 오버레이). 공용 Icon 컴포넌트 기반 Leading/Trailing 아이콘(텍스트 색상 상속).
- [Chip](./Chip/README.md) — 키워드·카테고리 칩. 9색(default + gray/green/blue/cyan/indigo/purple/fuchsia/navy) × 3 variant(filled/subtle/outlined) × 2 shape(pill/rounded) × 2 size(small/medium). data-\* 속성 기반 CSS 직접 렌더·leading/trailing icon(선택)·navy 팔레트 추가·Enabled/Disabled 2상태·semantic 토큰 다크 자동 전환.
- [Skeleton](./Skeleton/README.md) — shadcn/ui 단일 div API의 공용 로딩 placeholder. semantic disabled surface·2초 pulse·reduced-motion 정지·소비자 소유 geometry와 접근성 계약.
- [Spinner](./Spinner/README.md) — 로딩 스피너. Track(배경 원 링) + Indicator(270° 그라데이션 아크) 2요소. 5 size(Tiny/Small/Medium/Large/X-Large). Figma 원본 SVG 인라인 렌더·수직 linearGradient·둥근 끝(linecap round)·시계 방향 무한 회전(1s)·semantic 토큰 다크 자동 전환.
- [Status](./Status/README.md) — 상태 표시. 9개 상태(Error/Warning/Success/Normal/In progress/Incomplete/Not started/Pending/Info). State icon(20px 인라인 SVG) + Label(Body2) 4px gap·읽기 전용. In progress 는 공용 Spinner(size="small")에 위임·`--status-*` semantic 토큰(라이트/다크) 다크 자동 전환.
- [Notification](./Notification/README.md) — 사용자 알림. Inline/Inline-line break/Toast/Actionable/Linkable × 5상태·Toast 개별 5초 자동 닫기·Container 392×500·앱 NotificationProvider/Toast/ToastGroup 공용 스택·Dialog 알림·모달 중 휠/터치 스크롤·재시도·viewport pointer handoff·공용 Status/Link/Icon Button/Button/ScrollArea 조합.
- [Segmented Control](./SegmentedControl/README.md) — 단일 선택 컨트롤. 3형태(Label · Icon · Icon+Label) × 3사이즈(S/M/L) × 5상태. shadcn ToggleGroup(Radix) 기반·회색 컨테이너(#f4f4f4) 위 흰 selected item·ghost 레이어로 폰트 굵기 전환 시 width 점핑 방지·inset box-shadow focus 링·공용 Icon · Tooltip 의존.
- [Tab](./Tab/README.md) — 하단선 기반 탭. 2~6개 아이템 × 6상태(Selected/Unselected/Hovered/Pressed/Focused/Disabled). shadcn Tabs(Radix) 기반·44px 고정 높이·box-shadow inset 하단 인디케이터(height 흔들림 방지)·2px outline focus·selected 시 primary 텍스트(var(--accent-500)) + Chip blue-subtle 자동 전환·공용 Icon · Chip 의존.
- [Slider](./Slider/README.md) — `marks`로 조절 단위와 표시 눈금을 분리할 수 있는 범위 값 설정 슬라이더. Default(단일)/Range(범위) 2타입·Track 4px `--border-default`·Fill/Handle 16×16 `--element-primary`·Steps(0/20/40/60/80/100)·Input(숫자만, blur 시 clamp)·Tooltip(Thumb 위, 공용 컴포넌트). Radix Slider 기반·공용 Input · Tooltip 의존. 보조 문구는 `helpTextPlacement`로 하단 또는 라벨 오른쪽에 배치한다.
- [Open panel](./OpenPanel/README.md) — 슬라이드 패널. 2 타입(Overlay · Inline) × 4 위치(Top · Right · Bottom · Left). Radix Dialog 기반 Sheet·Header(56px, 좌측 닫기 Icon Button + Title) + Body(24px padding)·방향별 slide 애니메이션(0.25s)·4×20px 캡슐 resize handle(테두리 안쪽 10px)·공용 Button · Icon Button · Icon 의존.
- [Menu](./Menu/README.md) — 옵션 메뉴. 3 사이즈(Small 28px / Medium 32px / Large 36px) × 6 상태(Enabled/Hovered/Pressed/Selected/Focused/Disabled). Radix DropdownMenu 기반·min-width 140px(컨텐츠 맞춤 자동 확장)·navy 톤 Mid 그림자·fade+slide open/close 애니메이션(0.15s)·Section header · Divider · Leading(Icon/Avatar/Checkbox) · Trailing(check/shortcut/Chip/Badge/Switch) · Submenu·공용 Icon · Avatar · Checkbox · Switch · Chip · Badge 의존.
- [Split Button](./SplitButton/README.md) — 분할 버튼. [Primary action(아이콘)] + [분할선] + [Secondary action ▾]. 4 size(Tiny/Small/Medium/Large) × 6 state. tertiary button 토큰 재사용·각 action 독립 hover/pressed·Active(메뉴 열림) 시 chevron 180° 회전·짧은 메뉴의 콘텐츠 높이 모드·focus z-index 처리·공용 Menu · Icon 의존.
- [Stepper](./Stepper/README.md) — 다단계 진행 표시. 2방향(Horizontal · Vertical) × 2사이즈(Small · Medium) × 라벨 유무 × 5상태(Completed · Active · Incomplete · Invalid · Disabled). 의존성 없는 순수 컴포넌트·icon 항상 20px·직접 인라인 SVG(체크/X)·라벨 클릭 step 이동(clickable)·Invalid는 빨강 원 + X.
- [Dropdown](./Dropdown/README.md) — 단일 옵션 선택. 4 사이즈(S/M/L/XL) × 8 상태(Enabled/Hovered/Pressed/Focused/Invalid/Disabled/Selected/Read-only). tertiary button 토큰 기반 field·외곽 outline focus 링(invalid 시 offset -4px)·실제 2px invalid border·Menu 너비를 trigger 에 맞춤·공용 Menu · Icon 의존.
- [Select](./Select/README.md) — 단일/다중 옵션 선택 combobox. Single/Multi × 2 style × 4 size × 6 state. searchable Single의 localized selected label을 실제 input value로 표시·보이는 label/help/error ID 연결과 label-less `ariaLabel`·`fullWidth` page grid 폭·Create/Detail 최대 6행 option ScrollArea·no-action empty disabled profile·실측 Multi +N 칩/개별·전체 해제/선택적 전체 선택과 비활성값 보존·입력창 leading Spinner/aria-busy와 loading/error/empty 지원.
- [Dialog](./Dialog/README.md) — 공용 토스트 클릭의 바깥 닫기 예외. 중앙 모달. 4 size(Small 400 / Medium 580×640 / Large 720×640 / X-Large 920×760)와 생성·저장·수락·승인·거절·취소·삭제·동기화 공통 confirmation profile, 필수 description·빈 안내 fallback. Header/Subheader/Body ScrollArea/Footer·scroll border와 default/subtle fade·focus/portal·공용 Icon Button/Button/Segmented Control/Input/ScrollArea 조합.
- [Edit Confirmation Dialog](./EditConfirmationDialog/README.md) — 저장/작성 취소를 확인하는 controlled small Dialog. 저장의 safe action은 `돌아가기`, 취소·이탈은 `계속하기`로 구분하며, action intent는 parent page가 단일 소유하고 trigger 또는 다음 작업 target으로 focus를 복원한다.
- [Card](./Card/README.md) — 콘텐츠 카드. 2 Type(Default/Thumbnail) × 3 Size(Small/Medium/Large) × 6 State(Enabled/Hovered/Pressed/Selected/Disabled/Focused). compound component 패턴·대표 날짜용 SubDescription·목록 정보용 Summary·Selected 2px accent(border 1px + inset shadow 밀림 방지)·Focused 바깥 3px outline 링·Hovered/Pressed에만 navy Mid 그림자·Thumbnail은 wrapper 전체에 상태 적용·공용 Chip · IconButton · Button · Link · Icon 의존.
- [Calendar](./Calendar/README.md) — 날짜 선택 캘린더. 3 view(Day/Month/Year) × 2 mode(Single/Range). Single 월 즉시 선택(`selectionUnit="month"`)·월/연도 4×3 grid·숫자와 단위 한 줄 표시·range hover preview·필요한 4~6주 날짜 grid(32px 원형 selection)·설치된 date-holidays 기반 공휴일/연휴 자동 계산과 수동 holidays·Disabled/Holiday/Sunday 강조·공용 Button · IconButton · TextButton 의존.
- [Card Accordion](./CardAccordion/README.md) — 제목 옆 비상호작용 meta와 독립 Actions를 제공하는 펼침/접힘 카드. 2 Structural(Expanded/Collapsed) × 5 Interactive(Enabled/Hovered/Pressed/Focused/Disabled). Radix Accordion 기반·CSS keyframes 애니메이션(0.25s)·전용 다크 팔레트(`#282828`)·Focus outline은 Header 영역만 감싸고 Expanded 시 하단 직각·공용 Button · IconButton · Icon 의존.
- [Breadcrumb](./Breadcrumb/README.md) — 경로 표시. depth(1~n) × 5 state(Enabled/Hovered/Pressed/Focused/Selected). 상위 depth 링크 + 현재 depth 텍스트 + "/" 구분자. 반응형 자동 축약(ResizeObserver 기반, 루트+끝쪽 보존)·축약 `...` 버튼 → small Menu 로 축약 항목 접근 복구·밑줄 페이드인(text-decoration-color transition)·2 모드(items 자동축약/compound)·공용 IconButton · Menu · System icon(more_horizontal) 의존.
- [Page Header](./PageHeader/README.md) — 페이지 제목·보조 정보·우측 action·하단 Tab 조합. Detail title action은 Header가 소유하는 4px 간격의 refresh→edit→delete 순서, action별 단일 Tooltip/안정된 label, List/Detail refresh 600ms 회전 profile을 page와 연결한다.
- [Async Content State](./AsyncContentState/README.md) — `DetailLoadingState`의 최초 loading과 `RefreshContentOverlay`의 기존 content 재조회를 분리하는 공용 상태 계약. Header refresh 600ms feedback과 overlay 400ms+240ms lifecycle을 분리하고 Table/page overlay 중복을 금지한다.
- [Content State](./ContentState/README.md) — 상세 오류·접근 제한·찾을 수 없음의 icon, 제목/설명 4px copy 묶음, 단일 복구 action을 공통화한다.
- [List Content State](./ListContentState/README.md) — 목록의 empty/filtered/최초 error와 retry 계약을 공유한다. Card와 Medium Table은 regular, Small Table은 compact density를 사용한다.
- [Detail Field](./DetailField/README.md) — 상세의 `dt/dd` 읽기 값과 label/Input 편집 값을 같은 grid 위치에서 전환하는 field family. empty/wrap/ellipsis·read-only·required/optional·field error 계약을 고정.
- [Detail Section](./DetailSection/README.md) — 상세 정보 card의 보이는 제목·선택적 제목 보조 정보·한 문장 설명·divider·본문 inset을 고정하고 두 문구를 section semantics에 자동 연결하는 공용 layout.
- [Pagination](./Pagination/README.md) — 페이지네이션. 결과 카운트(총 N건 중 a-b건) + nav(« ‹ › ») + 페이지 input(44px, Enter/blur 확정) + 페이지당 항목수 dropdown(59px). controlled API(page/total/pageSize/onPageChange/onPageSizeChange)와 총건수 강조를 보존하는 i18n `rangeTemplate`·`locale`, 고급 `formatRange` 포맷터, 공용 Icon Button · Input · Dropdown 재사용. `mode="simple"`은 현재 페이지 번호(N / 총페이지) + 이전/다음만 표시한다. `showPageSize={false}`는 다른 파트를 유지하면서 항목 수 Dropdown만 생략한다(기본값 true).
- [Table](./Table/README.md) — 데이터 기반 native Table. Small/Medium · Default/Checkbox/Radio selection · single/multiple tri-state sort · 작업 수 기반 small Button/Menu(`TableRowActions`, `renderRowAction`, `triggerMode="menu"`로 더보기 통일 가능) · Tooltip · Empty/Loading · ScrollArea sticky header를 공용 컴포넌트로 조합. 내장 선택 열과 `TableColumn.kind="selection"` 모두 다음 데이터 열의 중복 시작 여백을 제거해 control 앞뒤 간격을 맞추며, 클릭 가능한 행은 하나의 연속된 focus ring을 사용한다. Radio selection은 공용 `RadioGroupRoot`/`Radio`를 사용한다. Pagination은 내부 의존성이 아닌 부모 레벨의 독립 controlled 조합.
- [Tree](./Tree/README.md) — 계층형 데이터 표시. Default/Symbol × Small/Medium · checkbox/icon/trailing menu 선택 조합 · SVG connector · 0.2초 accordion · controlled renderNode API · 접힌 subtree lazy mount로 1,000개 수준 데이터 최적화. 공용 Icon · IconButton · Checkbox · Menu 의존.

## 카테고리

컴포넌트는 위의 빠른 분류 표로 탐색한다. 아래 분류 체계는 새 컴포넌트를 추가하거나
카탈로그를 재구성할 때 유지한다. 빈 카테고리는 과감히 지운다.

- Form & Input
- Data Display
- Feedback
- Navigation
- Layout

Slider는 `invalid`로, NumberInput은 native `aria-invalid`로 오류 문구 없이 입력 오류 상태를 표시할 수 있다.


## 솔루션 확장 경계

제품 navigation/global header/brand asset은 공통 registry에서 제외한다. PageHeader는 페이지 제목·action·tab의 참조 계약으로 유지하며 app shell과 분리한다. PrivateIcon의 자산 목록과 도메인명→아이콘 map은 소비 솔루션이 제공한다.
