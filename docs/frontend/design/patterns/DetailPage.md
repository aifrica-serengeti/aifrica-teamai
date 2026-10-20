# Detail Page

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

> Design System: Aifrica Design System  
> 적용 범위: 단일 리소스 조회·수정, 연결 정보, 동적 속성, 계층 리소스 운영  
> 최종 갱신: 2026-08-25

이 문서는 하나의 리소스를 조회하고, 필요할 때 안전하게 수정·저장·취소하는 상세 화면의 독립 재현
명세다. 새 환경에서 이 문서만으로 동일한 정보 구조, header/scroll 경계, 탭, 편집 draft, 확인 대화상자,
민감 값, 동적 속성, 계층 리소스 운영 UX를 구현할 수 있어야 한다. 특정 메뉴, URL, DTO, 기존 화면이나
구현 경로를 전제로 하지 않는다.

---

## 공통 적용 경계

아래 상세 anatomy·상태·검증은 참조 계약이다. **공통 필수**는 page의 상태 소유권, query/draft 분리,
오류·권한·중복 실행·focus·unsaved changes·단일 scroll/overlay owner다. **선택 profile**은 콘텐츠 폭·inset·
breakpoint·Card 열 수·기본 page size·header action 배치·확인창 크기·모션 시간·도메인 field 구성이다.
이 선택값은 [계약 수준](../contract-levels.md)의 솔루션 입력으로 결정하며 관찰값을 자동 상속하지 않는다.
예제의 식별자·DTO·API 경로·문구는 역할 예시이며 고정된 실제 서비스 계약이 아니다.
`profile`은 솔루션 page/layout adapter이고 실행 모듈이 아니다.

## 1. 목적과 적용 범위

Detail Page는 아래 상태 전이를 명확히 다룬다.

```text
route 검증 → 최초 조회 → 읽기 → 명시적 편집 draft → 저장 확인 → 저장 또는 취소
```

다음에 적용한다.

- 사용자·서비스·리소스처럼 단일 객체의 정보와 상태를 조회·수정하는 화면
- endpoint, credential, category option처럼 연결 정보를 다루는 화면
- 기본 정보/속성/운영처럼 한 객체의 정보를 탭으로 분리하는 화면
- 리전/존, 조직/하위 조직처럼 부모와 자식 리소스를 한 화면에서 관리하는 화면

다음에는 적용하지 않는다.

- query, filter, pagination이 중심인 다건 목록
- 최초 생성 값만 입력하는 생성 화면
- 여러 리소스를 한꺼번에 수정하는 일괄 작업
- 삭제·권한 박탈처럼 별도의 위험 확인 문구가 필요한 파괴적 작업

상세 본문·탭·연결 자원에 배치하는 표는 `Table size="small"`을 명시한다. 상세에서 여는 Dialog의
표도 같은 크기를 사용한다. [화면별 Table 크기](../page-policies.md#화면별-table-크기)를 따른다.

### 1.1 고정 원칙

1. API 원본과 편집 draft는 절대 같은 객체를 공유하지 않는다.
2. page만 route, query, draft, validation, mutation, confirmation, navigation을 소유한다.
3. 표현 컴포넌트는 값과 callback만 받고 API·route·domain store를 직접 소유하지 않는다.
4. 최초 loading과 기존 값을 유지하는 refresh를 같은 빈 화면으로 만들지 않는다.
5. header는 스크롤 영역 밖에 두고, 본문만 하나의 전용 scroll viewport에서 움직인다.
6. raw `true`/`false`, 내부 key, 미번역 key, secret 원문을 사용자 화면에 노출하지 않는다.
7. raw hex, 임의 spacing, 임의 z-index 대신 semantic token과 공용 primitive를 사용한다.
8. 이 문서에서 말하는 Button, Icon Button, Dialog, Tab, Tree, Switch, Tooltip, scroll viewport는 특정
   package·source path·import가 아닌 semantic role이다. 기존 시스템 primitive가 있으면 재사용하고,
   없으면 같은 native semantic·키보드·focus·상태 계약을 만족하는 가장 작은 구현으로 대체한다.
9. 의미 있는 상세 정보 card는 단일 card 여부나 field 수와 관계없이 보이는 제목과 한 문장 설명을 항상 가진다.

### 1.2 독립 재현과 의존성 경계

이 패턴은 특정 메뉴, DTO, router, component library, 외부 package에 의존하지 않는 재현 명세다.

1. page는 route id, query, draft, mutation, navigation adapter와 사용자용 view model을 소유한다.
   표현 card, field, dialog, tree, link는 primitive 이름이나 domain API를 알지 않고 값·상태·callback만 받는다.
2. 문서의 component-style 이름은 역할을 설명하는 약칭이다. 구현은 기존 Design System component, native
   element, 또는 같은 접근성 계약의 local primitive 중 현재 환경에 이미 있는 수단을 선택한다.
3. 특정 리소스, 분류, URL template, translation key, API error class, source import 경로를 pattern의
   전제 조건으로 넣지 않는다. domain boundary에서 사람이 읽을 label, safe error, navigation intent로 변환한다.
4. page 전용 보조 UI는 page 가까이에 두고, 같은 의미·상태·접근성 계약이 실제로 반복 검증되기 전에는
   다른 menu나 전역 계층으로 승격하지 않는다.

---

## 2. 화면 anatomy

```text
Detail page (부모 높이 전체 사용, document body scroll 금지)
├─ Fixed header area
│  └─ Page Header
│     ├─ leading: back icon button · optional thumbnail
│     ├─ title: h1 · optional status chip · title icon actions (refresh · edit · delete)
│     ├─ optional metadata · description
│     ├─ edit action group: 취소 · 저장
│     └─ optional navigation-only tabs
└─ Content viewport (유일한 vertical scroll owner)
   └─ Scroll content
      └─ Detail area
         ├─ loading / error / not-found state card
         ├─ read or edit Detail Section (visible title + description + body)
         ├─ optional hierarchical operations panel
         └─ refresh overlay

Edit confirmation dialog (portal)
Leave confirmation dialog (portal)
Destructive confirmation dialog (portal, 별도 tone)
```

### 2.1 탭의 책임

탭은 한 리소스의 정보량을 나누는 navigation-only control이다.

- `activeTab`은 page가 controlled state로 소유한다.
- 탭은 header 마지막 전폭 행에 둔다. 별도 card 또는 중첩 tab으로 감싸지 않는다.
- 탭 전환은 route·draft·query owner를 바꾸지 않는다.
- validation 오류가 있는 field의 탭으로 이동시킬 수 있어야 한다.
- refresh는 활성 탭과 draft를 조용히 초기화하지 않는다.
- 하위 리소스가 있는 탭에서도 “부모 정보/자식 정보” 같은 두 번째 선택 control을 추가하지 않는다.
  tree에서 선택한 항목의 정보가 우측 panel에 바로 나타나야 한다.

### 2.2 일반적인 탭 구성

| 탭        | 목적                                   | 읽기 상태                             | 편집 상태                                  |
| --------- | -------------------------------------- | ------------------------------------- | ------------------------------------------ |
| 기본 정보 | 이름, 상태, 소유자, 연결 정보, 설명    | semantic detail field                 | 같은 위치에서 input/textarea/switch로 전환 |
| 속성      | category/type별 option                 | label + description + formatted value | metadata에 맞는 control로 전환             |
| 운영      | 부모/자식 리소스, 연결 대상, 하위 구성 | tree 선택과 상세 정보                 | 등록·탐색·위치 지정 workflow               |

도메인에 해당 정보가 없으면 해당 탭을 만들지 않는다.

### 2.3 연결 리소스 이동

상세 값이 다른 리소스로 이동할 수 있는 관계를 표현할 때도 route와 권한 판단은 page에 남긴다.

1. page는 대상 id를 검증하고 URL 또는 navigation callback을 만든다. 표현 컴포넌트가 URL template을
   조합하거나 다른 domain의 route를 import하지 않는다.
2. 대상 id가 비어 있거나 sentinel/unknown 값이거나 접근 권한이 확정되지 않았으면 plain detail value를
   보여 준다. 빈 id나 내부 sentinel을 link href에 넣지 않는다.
3. 관계 이동이 현재 detail을 이탈시키면 back/list 이동과 같은 unsaved-change guard를 거친다. 새 탭 열기
   같은 browser 기본 동작을 지원한다면 검증된 href를 유지하고, 현재 탭 이동만 page callback으로 제어한다.
4. 관계 label은 resource의 사용자용 이름이며, id를 숨은 accessible name이나 Tooltip에 불필요하게
   노출하지 않는다.

---

## 3. geometry와 scroll boundary

Detail Page는 application shell의 높이를 모두 사용한다. document body, card, tab, content에 중복
`overflow: auto`를 두지 않는다. 실제 scroll owner는 본문 viewport 하나다.

### 3.1 고정 치수

| 영역                   | Desktop                                               | 좁은 화면                              | 목적                                                               |
| ---------------------- | ----------------------------------------------------- | -------------------------------------- | ------------------------------------------------------------------ |
| page                   | 부모 가로·세로 100%, `overflow: hidden`               | 동일                                   | window scroll과 분리                                               |
| header content band    | 최대 var(--layout-band-max), 가운데 정렬                              | 전체 폭                                | 24px 내부 여백을 포함해 var(--layout-content-max) 본문과 정렬                         |
| scroll content band    | 최대 var(--layout-band-max), 가운데 정렬                              | 전체 폭                                | scrollbar는 content band가 아니라 viewport 끝에 위치               |
| scroll content padding | `24px 24px 32px`                                      | `24px 16px 24px` (`solution narrow breakpoint`)            | header/tab과 첫 card 사이 24px                                     |
| information card       | header `20px 24px`, body 24px, border 1px, radius 8px | header/body 20px (`solution compact breakpoint`)            | visible title·description·divider, `--border-default`, `--surface` |
| information grid       | 2열, gap `24px 48px`, padding 24px                    | 1열, gap 20px, padding 20px (`solution compact breakpoint`) | 읽기·편집 위치 유지                                                |
| master-detail          | 280px + 나머지, gap 16px                              | 1열 (`≤799px`)                         | tree와 선택 정보 병렬 배치                                         |

`var(--layout-band-max)`은 좌우 24px padding까지 포함한 외곽 band다. 실제 card·field가 놓이는 가용 폭은 var(--layout-content-max)이다.
header와 scroll content가 서로 다른 max-width를 사용하면 제목과 card의 좌측선이 어긋난다.

### 3.2 필수 shell

```tsx
<main className="detail-page">
  <div className="detail-container">
    <div
      className="detail-header-area"
      data-scrolled={hasScrolled || undefined}
    >
      <div className="detail-header-content">
        <PageHeader {...headerProps} />
      </div>
    </div>

    <div className="detail-content-viewport">
      <ScrollArea
        className="detail-scroll-area"
        type="auto"
        thumbWidth={6}
        contentClassName="detail-scroll-content"
        onScrollMetricsChange={updateScrolledState}
      >
        <div className="detail-area">{content}</div>
      </ScrollArea>
    </div>
  </div>
</main>
```

중요한 점은 ScrollArea가 viewport의 가로·세로 전체를 차지하고, `max-width`, `margin: auto`, `padding`은
그 내부 content만 소유한다는 것이다. scrollbar를 max-width content에 붙이면 우측 여백 안에 보이므로 금지한다.

### 3.3 최소 CSS 계약

```css
.detail-page {
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
  background: var(--surface-shell);
}

.detail-container {
  display: flex;
  width: 100%;
  height: 100%;
  min-height: 0;
  flex-direction: column;
}

.detail-header-area { flex: 0 0 auto; width: 100%; }
.detail-content-viewport { position: relative; flex: 1 1 0; min-height: 0; }
.detail-scroll-area { width: 100%; height: 100%; }

.detail-scroll-content {
  box-sizing: border-box;
  width: 100%;
  max-width: var(--layout-band-max);
  min-height: 100%;
  margin: 0 auto;
  padding: 24px 24px 32px;
}
```

모든 flex 조상에 `min-height: 0`을 둔다. 하나라도 빠지면 본문이 viewport보다 커져 scroll이 사라지거나
header 영역까지 침범한다.

### 3.4 scroll 시 header border

본문 `scrollTop === 0`에서는 header와 content 사이 border가 보이지 않는다. 1px 이상 스크롤하면
header 바로 아래에 `1px solid var(--border-default)` 선이 나타난다.

- border element를 조건부로 mount/unmount하지 않는다.
- header에 항상 transparent pseudo element 또는 transparent border를 유지한다.
- `border-color .2s ease`만 transition해 0px 부근 깜빡임을 막는다.
- 탭이 있으면 active indicator보다 border가 아래에 놓이지 않게 한다. 탭은 더 높은 stacking context,
  header의 전체 폭 baseline은 뒤쪽에 둔다.
- 탭이 없으면 header root가 동일 border를 표시한다.

```ts
headerAfter: {
  position: absolute;
  bottom: 0;
  left: "50%";
  width: "100vw";
  border-bottom: "1px solid transparent";
  transform: "translateX(-50%)";
  transition: "border-color .2s ease";
}
```

### 3.5 탭 아래 콘텐츠 clipping 방지

탭이 있는 header의 불필요한 bottom padding은 viewport 시작점을 아래로 밀어, scroll한 첫 콘텐츠가
탭 바로 아래에서 잘려 보이게 한다. 다음을 지킨다.

1. header는 title부터 tabs까지 한 번에 포함한다.
2. tabs가 있는 header의 bottom padding은 `0`이다.
3. scroll viewport는 header의 실제 높이 바로 다음에서 시작한다.
4. 첫 콘텐츠 24px 간격은 header가 아니라 scroll content의 top padding이 소유한다.
5. scrollTop이 커질 때 첫 카드가 탭 아래로 자연스럽게 통과해야 하며, 고정 빈 공간이 남아서는 안 된다.

---

## 4. Page Header 명세

### 4.1 구성과 순서

```text
leading      : back icon button → optional resource thumbnail
title row    : h1 → optional status chip → optional refresh → edit → delete icon actions
supporting   : optional immutable metadata → optional description
right action : edit mode의 취소·저장 button group
bottom       : optional navigation-only tabs
```

| 요소               | 규칙                                                                                                                                                                                                        |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 뒤로가기           | ghost Icon Button, accessible label “뒤로 가기”. browser history가 아니라 명시적인 목록 route로 이동한다.                                                                                                   |
| thumbnail          | 리소스/category/type을 구분하는 실제 아이콘이 있을 때 title 앞에 둔다. 임의의 배경 card로 감싸지 않는다.                                                                                                      |
| uploaded thumbnail | 업로드 이미지가 있는 리소스는 PageHeader `thumbnail` slot의 40px 안에서 원본 비율을 유지한다. 현재 조회 버전을 사용하며 이미지 없음·조회/디코딩 실패 시 공용 기본 Icon을 표시한다.                          |
| title              | `h1`, 24px/32px semibold, 한 줄 ellipsis. 실제로 잘렸을 때만 full title Tooltip 제공.                                                                                                                       |
| status chip        | title 옆에 한 번만, medium size. card 안에서 같은 상태를 색·문구를 달리해 중복하지 않는다.                                                                                                                  |
| title actions      | 읽기 상태에서 refresh → edit → delete 순서로 인접 배치한다. 모두 medium Icon Button(24px), visible Tooltip, accessible label 필수이며 Tooltip은 대상명 없이 `새로고침`, `수정`, `삭제`를 사용한다.          |
| metadata           | 생성/수정 시각 등 immutable 보조 정보. 12px/16px, title 다음 줄.                                                                                                                                            |
| description        | 업무 목적을 설명하는 14px/20px 문장. ellipsis하지 않고 필요한 만큼 wrap.                                                                                                                                    |
| edit group         | 편집 중에만 우측 `취소` tertiary + `저장` primary. 둘 다 medium(32px).                                                                                                                                      |
| destructive action | 삭제 trigger는 edit 바로 다음의 ghost medium Icon Button(24px, trash, danger icon tone)이다. Tooltip은 `삭제`, accessible label은 필요하면 `{대상} 삭제`를 사용하며 저장/취소 Button group에는 섞지 않는다. |
| tabs               | action 아래가 아니라 header 마지막 전폭 행. navigation-only Tab.                                                                                                                                            |

### 4.2 header 상태

| 상태              | back                           | refresh             | edit     | delete icon             | button group                | tabs                    |
| ----------------- | ------------------------------ | ------------------- | -------- | ----------------------- | --------------------------- | ----------------------- |
| 최초 loading      | disabled 또는 안전한 목록 이동 | disabled            | disabled | 없음                    | 없음                        | disabled                |
| 읽기 ready        | 가능                           | 가능                | 가능     | 권한·상태가 허용할 때만 | 없음                        | 가능                    |
| refresh 중        | 가능                           | spinning + disabled | disabled | disabled                | 없음                        | 가능                    |
| 삭제 사전 확인 중 | disabled                       | disabled            | disabled | busy + disabled         | 없음                        | disabled                |
| 편집 중           | discard guard 적용             | disabled            | 숨김     | 숨김                    | 취소·저장                   | 필요할 때만 유지        |
| 저장 중           | disabled                       | disabled            | 숨김     | 숨김                    | 모두 disabled, 저장 중 문구 | disabled 또는 전환 방지 |

refresh icon은 refresh 중 `.8s linear infinite`로 회전한다. `prefers-reduced-motion: reduce`에서는
회전을 제거한다. 사용자가 요청한 refresh는 API가 더 빨리 끝나도 목록과 동일하게 최소 600ms 동안
`refreshing`을 유지해 회전 feedback을 인지할 수 있게 한다. 최초 loading에는 이 지연을 적용하지 않는다.
refresh 때문에 edit Button을 unmount했다가 다시 mount하지 말고 disabled 상태로 유지한다.
삭제 가능 여부를 확인하는 짧은 요청도 mutation-like busy state다. 이 동안에는 refresh, edit, back, tab
전환처럼 대상·mode를 바꿀 수 있는 action을 함께 막고, 결과가 현재 resource identity에만 적용되게 한다.

title action의 Icon은 공용 Icon `l`(18px)의 1.25px stroke, `stroke-linecap/linejoin: round`를 그대로
사용한다. 굵어 보이게 하려고 Page Header 또는 page CSS에서 `svg`, `path`의 stroke width를 다시
덮어쓰지 않는다. 같은 trigger를 Icon Button 자체 Tooltip과 page Tooltip으로 두 번 감싸지 않으며,
busy 동안 Tooltip 문구를 `… 가능 여부 확인 중`처럼 바꾸지 않는다. Tooltip은 idle/pending 모두
`삭제`, `수정`, `새로고침`처럼 짧고 안정된 한 문구다. accessible label은 페이지 맥락을 보완하기 위해
대상명을 포함할 수 있지만 상태에 따라 바꾸지 않는다.

title action 간격은 Page Header가 4px로 소유한다. 페이지에서 액션을 다시 묶는 경우
`gap: inherit`를 사용하고, 별도의 2px·8px 간격을 지정하지 않는다.

### 4.3 loading skeleton height

loading skeleton은 text를 지우면서 header 높이를 줄여서는 안 된다.

| skeleton    | width 예시 | height | margin            |
| ----------- | ---------- | ------ | ----------------- |
| title       | 180px      | 32px   | 없음              |
| status chip | 48px       | 24px   | title row gap 8px |
| metadata    | 72px       | 16px   | title 아래 2px    |
| description | 260px      | 20px   | metadata 아래 4px |

loading 중에도 최종 title 문자열은 accessible name으로 유지하고 header에는 `aria-busy="true"`를 둔다.
skeleton 자체는 `aria-hidden="true"`다.

---

## 5. page-owned 상태 모델

상태는 page 또는 page 전용 hook/store가 단일 소유한다.

구현에서 query·draft·field error·active tab·mutation·confirmation처럼 이름 있는 detail workflow 타입은
detail page의 `type/{resource}.{purpose}.t.ts`에 둔다. create 등 다른 page kind와 같은 의미로 공유하는
draft만 menu `shared/type`으로 올린다. API DTO·domain model은 domain adapter가 계속 소유하고,
컴포넌트 공개 Props는 해당 `.tsx`에 둔다.

```ts
type QueryState<T> =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "ready"; data: T; refreshing: boolean };

type ConfirmationIntent = "save" | "cancel" | undefined;

type DetailPageState<TResource, TDraft, TFieldErrors> = {
  resource?: TResource;
  draft?: TDraft;
  activeTab: string;
  fieldErrors: TFieldErrors;
  submitError?: string;
  confirmationIntent: ConfirmationIntent;
  leavePageOpen: boolean;
  saving: boolean;
  checkingDelete: boolean;
  deleting: boolean;
};
```

| 상태                          | owner           | 규칙                                                                 |
| ----------------------------- | --------------- | -------------------------------------------------------------------- |
| route identifier              | page            | 요청 전 format/length/allowed character를 검증한다.                  |
| original resource             | page query/hook | API response 그대로 두고 draft로 mutate하지 않는다.                  |
| refresh                       | page query/hook | 기존 data가 있으면 overlay만 올린다.                                 |
| active tab                    | page            | URL 정책이 있으면 URL과 동기화, 아니면 local state.                  |
| draft                         | page            | `beginEdit`에서 original 깊은 복사로만 만든다.                       |
| field/server validation       | page            | field 변경 시 해당 field error와 submit error를 해제한다.            |
| confirmation                  | page            | Dialog는 draft, route, API를 모르고 callback만 호출한다.             |
| selected child                | page            | Tree가 아닌 page가 `selectedNodeId` 또는 parent/child id를 소유한다. |
| category discovery/map picker | page            | Dialog는 controlled open/data/callback만 받는다.                     |

### 5.1 resource identity와 보조 조회 수명

route identifier는 단순 요청 인자가 아니라 detail state의 identity다. 직접 주소 입력, 관계 link, browser
back/forward를 포함해 id가 바뀌면 이전 resource에서 시작한 비동기 결과가 새 resource에 적용되어서는 안 된다.

```ts
type SupportingQuery<T> =
  | { status: "idle" }
  | { status: "loading"; resourceId: string }
  | { status: "ready"; resourceId: string; data: T }
  | { status: "error"; resourceId: string; message: string };
```

1. route boundary는 decode·빈 값·형식·길이를 검증하고, invalid id면 API 요청 없이 error state를 표시한다.
2. id 변경 시 main query와 모든 보조 query를 abort하거나 generation/identity로 stale result를 무시한다.
   이전 resource의 draft, field error, confirmation, delete preflight, Toast, tree selection, category dialog와
   pending registration은 새 resource에 이어지지 않는다.
3. draft가 dirty일 때의 id 변경은 일반 route 이탈과 같은 guard를 먼저 거친다. guard를 통과한 뒤에는
   key remount 또는 page의 명시적 reset 중 하나로 state reset 정책을 구현한다. Effect로 이전 props를
   복사해 reset하지 않는다.
4. category metadata, parent resource, dependent group list처럼 주 조회를 보완하는 data는 `resourceId`에
   묶인 독립 query state로 소유한다. 주 resource의 읽기 상태를 덮어쓰거나 이전 id의 보조 data를 새
   화면에 잠시 보이지 않는다.
5. 보조 data가 실패해도 안전한 기존 읽기 값은 유지한다. 해당 data가 꼭 필요한 저장·선택·관계 이동만
   disabled하고 이유와 retry를 제공한다. 보조 data가 필요한 presentation component가 API를 직접 호출하지 않는다.

### 5.2 draft와 dirty

`dirty`는 input event가 있었다는 뜻이 아니라 정규화 전 original과 draft가 실제로 다른가다.

```ts
const editing = draft !== undefined;
const dirty = Boolean(resource && draft && !isSameDraft(resource, draft));
const hasUnsavedChanges = dirty || hasPendingChildRegistration;
```

- 배열 순서, nullable/empty string, boolean의 비교 정책을 도메인별로 명시한다.
- 저장 직전 trim·빈 값 제거 같은 payload 정규화는 가능하지만, dirty 비교를 위해 draft를 몰래 변형하지 않는다.
- 저장 성공 response만 original에 반영한다.
- 취소·명시적 discard·저장 성공·원본과 동일한 draft가 된 경우 guard를 해제한다.

### 5.3 상태 전이

```text
LOADING ── success ──► READING ── begin edit ──► EDITING
   │                       │                         │
   └── error ──► ERROR     │                         ├── validation fail ──► EDITING
                           │                         ├── save confirm ──► SAVING ── success ──► READING
                           │                         │                         └── failure ──► EDITING
                           │                         └── cancel/leave confirm ──► READING or LIST
                           └── refresh ──► READING + overlay
```

`SAVING`과 `DELETING`에서는 같은 작업의 중복 요청, refresh, edit 진입, dismiss, route 이동을 막는다.

---

## 6. 조회·오류·refresh

| 상태            | content                                 | header action      | screen reader        |
| --------------- | --------------------------------------- | ------------------ | -------------------- |
| invalid route   | 오류 state card, API 요청 없음          | 목록 이동만        | `role="alert"`       |
| initial loading | 최소 높이 280px 중앙 Spinner state card | disabled           | `role="status"`      |
| load error      | 오류 설명 + retry                       | retry만            | `role="alert"`       |
| not found       | 존재하지 않는 대상 안내 + 목록 이동     | edit/delete 없음   | `role="alert"`       |
| forbidden       | 권한 없음 안내, 민감 data 미표시        | 허용된 이동만      | `role="alert"`       |
| ready           | 정상 card/tabs                          | 권한과 상태에 맞게 | 정상 landmark        |
| refresh         | 기존 ready content + overlay            | refresh disabled   | polite loading label |

refresh 규칙:

1. 최초 loading에서만 state card를 보인다.
2. 기존 resource가 있을 때 refresh는 같은 content 위의 Refresh Content Overlay로 표현한다.
3. overlay는 `position: relative`인 detail area 안에만 배치한다.
4. refresh 중 edit·delete·새 등록 같은 충돌 action을 disabled한다.
5. 명시적 refresh는 최소 600ms feedback을 보이고, 최초 loading에는 인위적인 지연을 추가하지 않는다.
6. refresh failure는 기존 value를 제거하지 않고 non-blocking error와 retry를 제공한다.
7. 최초 loading은 decorative 빈 shell만으로 처리하지 않는다. state card 또는 동등한 content state가
   Spinner와 대상이 포함된 `role="status"` 문구를 함께 제공한다. 기존 content가 없는 최초 loading에는
   revalidation overlay를 재사용하지 않는다.
8. refresh는 사용자의 scroll 위치와 focus를 강제로 바꾸지 않는다. refresh 결과로 현재 탭·선택한 child가
   더는 유효하지 않을 때만 page가 안전한 fallback을 선택하고 그 이유를 안내한다.

---

## 7. 읽기 정보 card

### 7.1 semantic markup

읽기 정보는 공용 Detail Section 또는 동등한 `<section>` 조합 안에 보이는 heading·description과 `<dl>`을 둔다.

```tsx
<DetailSection
  title="기본 정보"
  description="리소스의 소유자와 현재 설정을 확인합니다."
>
  <dl className="detail-grid">
    <div className="detail-item">
      <dt>소유자</dt>
      <dd>administrator</dd>
    </div>
    <div className="detail-item">
      <dt>설명</dt>
      <dd className="wrap">긴 설명 또는 URL</dd>
    </div>
  </dl>
</DetailSection>
```

### 7.1.1 visible header 계약

1. title은 page `h1` 다음의 실제 `h2`이고 description은 title 아래 보이는 한 문장이다.
2. root는 `aria-labelledby`와 `aria-describedby`로 두 문구에 연결한다. `aria-label`만 제공해 보이는 header를 생략하지 않는다.
3. 단일 정보 card, field가 하나뿐인 card, 읽기 전용 card에도 같은 계약을 적용한다.
4. read/edit/internal loading 전환에서 header와 divider를 유지하고 body만 바꾼다.
5. 최초 route loading, invalid/not-found/forbidden/error state card, confirmation, 목록 item, 장식 metric tile에는 정보 card 계약을 강제하지 않는다.

| 요소           | typography                   | 규칙                                            |
| -------------- | ---------------------------- | ----------------------------------------------- |
| term (`dt`)    | 12px/16px, `--text-subtle`   | 고정 label                                      |
| description    | 12px/16px, `--text-subtler`  | 속성 보조 설명, label 아래 4px                  |
| value (`dd`)   | 14px/20px semibold, `--text` | label 아래 4px                                  |
| short value    | 한 줄 ellipsis               | 이름, 날짜, 짧은 ID                             |
| wrapping value | `overflow-wrap: anywhere`    | URL, URI, 오류, 긴 목록, token mask             |
| wide field     | grid column 전체             | 설명, 긴 endpoint, multiline 값                 |
| empty value    | `-`                          | 빈 문자열/null/undefined를 공백으로 남기지 않음 |

### 7.2 상태·boolean·날짜

- 상태는 text만 쓰지 말고 Status/Chip의 semantic tone + label을 사용한다.
- API `true`/`false`는 “사용/미사용”, “공유/개별”, “활성/비활성”처럼 field 의미에 맞는 label로 변환한다.
- raw boolean을 read-only Switch만으로 전달하지 않는다.
- 날짜·숫자는 locale formatter를 통과한다. raw ISO 또는 숫자 ID를 그대로 보여 주지 않는다.
- backend error message, stack, secret, request header는 사용자 UI에 표시하지 않는다.

### 7.3 민감 값과 copy

| 값                            | 읽기 표시                 | copy                    | edit                                  |
| ----------------------------- | ------------------------- | ----------------------- | ------------------------------------- |
| Access Key·짧은 credential    | 앞 4자 + `***`            | 허용 가능               | 일반 Input                            |
| Secret Key                    | 값 유무와 상관없이 `****` | 기본 금지               | 빈 Textarea가 기존 값 유지 의미       |
| 인증서·base64 data·client key | 앞부분 + `***` + 끝부분   | 제품 정책상 필요할 때만 | multiline Textarea 또는 secure upload |
| endpoint URL                  | wrap + copy               | 허용                    | URL Input                             |
| 일반 ID                       | ellipsis                  | 업무상 필요할 때만      | read-only 또는 policy에 따름          |

copy action 규칙:

1. icon button accessible label은 `{label} 복사`, Tooltip도 같은 문구다.
2. 성공 후 icon은 check으로 약 1.6초 바뀐다.
3. 성공/실패는 보이지 않는 `role="status" aria-live="polite"`로 전달한다.
4. Clipboard API를 사용할 수 없거나 실패해도 raw value fallback을 노출하지 않는다.
5. mask는 display만 바꾸고, copy는 page가 안전하게 보관한 원문을 사용한다.
6. secret/certificate/private key를 Tooltip, aria-label, Toast, DOM attribute, log에 원문으로 넣지 않는다.

### 7.4 연결 값의 navigation view model

연결된 resource를 표시하는 field는 raw domain object나 route template 대신 page가 만든 최소 view model을
받는다. 예: 사용자용 `label`, 검증된 선택적 `href`, 현재 탭 이동용 선택적 `onNavigate`다.

- `href`가 없으면 Link처럼 보이는 control을 렌더하지 않는다.
- `onNavigate`가 있으면 page가 dirty guard, permission, transition을 먼저 처리한다.
- `href`와 `onNavigate`를 함께 제공할 때에는 modifier-click/new-tab 같은 browser 기대를 깨지 않도록
  현재 탭의 일반 click만 제어한다.
- 관계 resource의 내부 id는 오류를 구분하거나 이름이 없을 때도 기본 display fallback으로 사용하지 않는다.

---

## 8. 편집 card와 field

### 8.1 layout shift 금지

읽기와 편집은 같은 title·description header, 같은 card와 같은 grid cell을 공유한다. 편집 진입 시 card, label, value column의 위치가
바뀌면 안 된다. immutable value는 disabled가 아니라 `readOnly` Input 또는 DetailItem으로 표시해
사용자가 읽고 복사할 수 있게 한다.

### 8.2 field 선택

| 데이터 성격         | edit control                                | 읽기 표현             | 보조 규칙                                     |
| ------------------- | ------------------------------------------- | --------------------- | --------------------------------------------- |
| 짧은 필수 문자열    | Input                                       | short detail value    | label, required mark, max length, field error |
| URL                 | URL Input                                   | wrapping value + copy | 형식 오류는 field 아래                        |
| 설명·secret·긴 설정 | Textarea                                    | wrapping value/mask   | counter는 length limit이 있을 때만            |
| boolean             | large Switch 또는 2-value Segmented Control | 사람 친화 label       | string boolean은 adapter에서 parse/serialize  |
| immutable           | readOnly Input 또는 DetailItem              | short/detail value    | disabled 사용 금지                            |
| enum                | Select/Segmented Control                    | mapped label          | raw enum은 label mapping                      |
| list/array          | 반복 입력 control                           | semantic list         | add/remove/validation은 page 소유             |

### 8.3 Select·combobox layout과 option content

detail grid 안의 select/combobox는 다른 field와 같은 cell 폭을 사용한다. trigger와 option viewport에는
`width: 100%`, `min-width: 0`의 동등한 intrinsic sizing을 적용해 좁은 grid cell과 긴 번역에서 더 작은
고정 폭으로 수축하지 않게 한다.

1. 선택된 값은 trigger 안에 사람이 읽을 수 있는 localized label로 표시한다. placeholder는 선택된 값을
   대신하지 않는다.
2. option viewport는 기본적으로 최대 6개 항목 높이까지만 보이고, 그보다 많으면 option 영역만 scroll한다.
   전체 page scroll을 option list의 대체 수단으로 쓰지 않는다.
3. option label, description, empty/loading/error 문구와 accessible name은 모두 번역한다. API enum/key를
   option·trigger·Tooltip에 그대로 노출하지 않는다.
4. disabled/unavailable option은 선택 불가 이유를 label 또는 보조 설명으로 전달한다. 현재 저장된 값이
   더 이상 선택지에 없을 때는 값 자체를 숨기지 말고 safe fallback과 저장 차단 정책을 page가 결정한다.

### 8.4 Switch layout

switch field는 label과 같은 수평 행에 단독 배치하지 않는다. 일반 field와 같은 column rhythm을 사용한다.

```text
공유 설정
[ large switch ]
```

- label은 14px/20px semibold, switch 위 4px gap
- switch는 large size(48×26px track)를 사용하고 최소 32px control row에서 수직 중앙 정렬해 medium Input/Button rhythm을 유지한다.
- required boolean도 label 옆 required mark를 사용한다.
- `"false"` string을 Switch에 직접 전달하지 않는다. parse → boolean → serialize 경계를 둔다.

### 8.5 선택 모듈: 민감 값 편집

- 읽기 상태: 항상 `****`. 실제 값 부재 여부도 상세 화면에서 구분해 노출하지 않는다.
- 편집 상태: 빈 Textarea를 기본값으로 둔다. 기존 secret을 value/placeholder로 채우지 않는다.
- help text: “새 Secret Key를 입력한 경우에만 변경됩니다.”처럼 빈 값의 의미를 명확히 한다.
- 저장 payload: 빈 값은 omit/undefined로 정규화해 기존 값을 유지한다. 명시적 삭제가 필요하면 별도 clear intent를 둔다.

### 8.6 validation

```text
field change → 해당 field error 해제 → submit error 해제
save click → client validation → 오류 tab 이동 또는 save confirmation
confirm save → 재검증 → request 1회
failure → draft와 field error 유지, dialog만 닫기
```

- field error는 해당 control의 label/help와 연결한다.
- server validation은 가능한 field로 매핑하고, field를 특정할 수 없는 API 오류는 공용 `NotificationToast`로 알린다. 재시도는 tab/card 안에 유지한다.
- 첫 오류 tab으로 이동하되 draft는 초기화하지 않는다.
- saving 중 동일 submit/cancel/refresh/destructive action을 막는다.

---

## 9. 선택 모듈: metadata 기반 동적 속성

공급사나 resource type에 따라 달라지는 속성은 hard-coded 영문 API key를 UI로 노출하지 않는다. metadata
또는 domain presentation mapping은 최소한 다음 정보를 제공해야 한다.

```ts
type PropertyDefinition = {
  name: string; // API key, UI에 직접 표시하지 않음
  label: string;
  description?: string;
  type?: "string" | "boolean" | "secret" | "multiline" | "enum";
  required?: boolean;
  choices?: readonly { value: string; label: string }[];
  sensitive?: boolean;
};
```

### 9.1 label·description 해석 순서

1. category metadata의 localized label/description
2. domain presentation mapping의 localized label/description
3. 사람이 읽을 수 있는 safe fallback label
4. API key 자체는 최후 fallback으로도 사용자 화면에 노출하지 않는다. 매핑 누락은 개발/관찰 경로에서 해결한다.

description은 label 아래 12px/16px muted text로 표시하고, value/control은 그 다음에 둔다. 빈 description은
공간을 만들지 않는다.

`label`, `description`, enum `choices`의 label과 선택된 option 표현은 같은 locale source에서 해석한다.
번역을 찾지 못했을 때는 사람이 읽을 수 있는 safe fallback을 사용하고, i18n key나 category internal name을
UI·Tooltip·accessible name으로 노출하지 않는다.

### 9.2 속성 control

| metadata                         | 읽기                         | 편집                                          |
| -------------------------------- | ---------------------------- | --------------------------------------------- |
| boolean 또는 boolean-like choice | 의미 있는 on/off label       | Switch 또는 stretch 2-value Segmented Control |
| secret/sensitive                 | mask                         | Textarea 또는 승인된 security control         |
| multiline                        | wrap                         | Textarea                                      |
| enum choices                     | mapped label                 | Select 또는 Segmented Control                 |
| plain string                     | wrap/ellipsis                | Input                                         |
| metadata 없음                    | stored value와 safe fallback | metadata retry 전 저장 차단                   |

metadata fetch 상태:

| 상태                         | 화면                                                       |
| ---------------------------- | ---------------------------------------------------------- |
| loading + stored option 없음 | 속성 정보를 불러오는 state card                            |
| error + stored option 없음   | 오류 state card + retry                                    |
| error + stored option 있음   | stored option은 read 가능, warning + retry, 새 저장은 차단 |
| ready + option 없음          | “추가 속성이 없습니다.” empty card                         |
| ready                        | 2열 properties grid, 좁은 화면 1열                         |

---

## 10. 선택 모듈: 계층 리소스 운영 탭

리전/존, 조직/하위 조직, cluster/node처럼 계층 data가 있으면 한 선택만 활성화되는 master-detail
구조를 쓴다.

### 10.1 선택 모델

```ts
type SelectedNode =
  | { kind: "parent"; parentId: string }
  | { kind: "child"; parentId: string; childId: string }
  | undefined;
```

tree node마다 selected state를 따로 저장하지 않는다. `SelectedNode`에서 단 하나의 `selectedNodeId`를 파생한다.

```text
selected child  → child만 selected
selected parent → parent만 selected
child selection → parent id도 갱신하지만 parent selected style은 미적용
```

이 규칙으로 parent/child가 동시에 선택 배경을 갖는 이중 선택 버그를 막는다. parent와 child에는 의미가
다른 icon을 사용한다. 예: parent는 globe/folder, child는 resource/subgroup.

### 10.2 read layout

```text
운영 탭
├─ 좌측 card: tree + 등록 action
└─ 우측 card: 선택한 parent 또는 child의 information grid
```

- 좌측 heading: title 16px/24px, description 12px/16px, tree 아래 action은 16px margin-top.
- 우측 card는 선택한 항목의 정보만 표시한다.
- 아무것도 선택되지 않았으면 “왼쪽에서 항목을 선택하면 상세 정보를 확인할 수 있습니다.” empty 안내.
- viewport `≤799px`에서는 tree 위, information card 아래의 1열 layout.

### 10.3 edit registration

편집 중에만 tree 아래에 등록 action을 노출한다.

- parent 등록: secondary Button, leading plus, full width
- 선택 parent가 있을 때만 child 등록: tertiary Button, leading plus, full width

등록 form은 우측 card를 교체한다. 등록 중 tree selection은 disabled해 대상이 바뀌지 않게 한다.

```text
등록 form header
├─ 좌측: “리전 등록”/“존 등록” + 짧은 설명
└─ 우측: category select, map location 같은 보조 action

2열 field grid (mobile 1열)
└─ footer: 취소 tertiary · 등록 primary
```

보조 action을 input grid 빈 cell이나 footer에 두지 않는다. form header 우측에 두어 입력과 탐색을 분리한다.
폭이 좁아져 가로 배치가 불가능하면 header 아래 좌측으로 wrap한다.

### 10.4 선택 모듈: 외부 탐색과 위치 선택

1. page가 dialog open, loading/ready/error items, selected item을 소유한다.
2. category dialog는 loading 시 polite spinner, error 시 alert + retry, ready 시 semantic list button을 보여 준다.
3. item 선택은 native id/name 등 필요한 field만 채우며 사용자가 입력한 name/description을 덮어쓰지 않는다.
4. map dialog는 map click 좌표와 수동 latitude/longitude input을 모두 지원한다.
5. zoom은 map geometry만 변경한다. marker count bubble은 screen-size overlay로 유지해 map을 가리지 않는다.
6. 적용 전까지 registration draft를 바꾸지 않고, 적용을 눌렀을 때만 좌표를 반영한다.
7. dialog close는 pending selection만 버리고 original/draft 전체를 초기화하지 않는다.

---

## 11. save, cancel, leave confirmation

### 11.1 공통 확인 대화상자

저장 확인, 수정 취소, 목록 이탈은 같은 controlled Edit Confirmation Dialog를 사용한다. page가 intent를
설정하고 Dialog는 confirm/open-change callback만 호출한다.

| 항목                  | 규격                                                     |
| --------------------- | -------------------------------------------------------- |
| shell                 | small Dialog shell 위 scoped width 400px                 |
| description           | 최대 2줄, `white-space: pre-line`, 의미 단위 `\n`만 허용 |
| footer                | 좌측 tertiary safe action, 우측 primary 결과 action      |
| button size           | 모두 medium(32px)                                        |
| initial focus         | 현재 intent의 안전 action                                |
| close/Escape/backdrop | confirmation intent만 닫고 draft 보존                    |
| dismiss 후 focus      | 원 취소/저장/back trigger로 복원                         |

| intent     | title 예시                            | description 예시                                                       | safe action | confirm    |
| ---------- | ------------------------------------- | ---------------------------------------------------------------------- | ----------- | ---------- |
| save       | “변경 내용을 저장할까요?”             | “변경한 내용이 저장되어 바로 반영됩니다.”                              | `돌아가기`  | `저장하기` |
| cancel     | “수정을 취소할까요?”                  | “변경한 내용은 저장되지 않고\n마지막 저장 상태로 돌아갑니다.”          | `계속하기`  | `나가기`   |
| leave list | “수정 내용을 저장하지 않고 나갈까요?” | “저장하지 않은 변경 사항은 모두 초기화되며\n이전 화면으로 이동합니다.” | `계속하기`  | `나가기`   |

safe action은 저장 확인에서 `돌아가기`, 수정 취소·목록 이탈에서 `계속하기`를 사용한다. `계속 편집`,
`확인`, `예`처럼 모호한 문구를 쓰지 않는다. 목록 이탈에도 별도 Dialog를 만들지 않고 공용 400px
Small confirmation 계약을 재사용한다.

### 11.2 저장 흐름

```text
Save click
  → draft 존재/dirty 확인
  → client validation
  → 오류면 해당 tab 이동 + field error
  → 성공이면 save confirmation open
  → “저장하기” confirm
  → 재검증
  → saving=true, request 1회
  → success: original replace, draft clear
  → failure: draft 유지, error 표시, dialog close
```

Save Button은 `!dirty`, `saving`, 하위 등록 pending, metadata unavailable 중 하나면 disabled다.

### 11.3 cancel과 목록 이탈

```text
Header cancel / Header back / 내부 목록 route 이동
  → editing && hasUnsavedChanges ? leave confirmation : move
```

- Header cancel confirm: draft와 pending child registration을 초기화하고 reading으로 복귀.
- Header back/list navigation confirm: explicit list route 이동.
- browser refresh/tab close: platform `beforeunload` 기본 guard 사용. custom message를 가정하지 않음.
- submitting 중 dialog confirmation이나 navigation은 실제 이동을 실행하지 않음.
- save failure 후에는 draft와 guard를 유지.

### 11.4 destructive action

삭제, 연결 해제, 권한 박탈은 Edit Confirmation Dialog를 쓰지 않는다.

- Header의 삭제 trigger는 `titleAction`에서 edit 바로 다음에 ghost medium Icon Button으로 두고 `trash`
  icon과 semantic danger icon tone을 사용한다. 저장/취소 Button group이나 우측 끝 `trailingElement`로 분리하지 않는다.
- 삭제 Icon Button에는 `{대상} 삭제` accessible label과 `삭제` Tooltip을 제공한다. 삭제 가능 여부를
  먼저 확인하는 동안에는 disabled와 `aria-busy`를 적용하되 두 문구를 각각 유지한다.
- 한 삭제 trigger에는 Tooltip root를 하나만 둔다. pending label 변경이나 중첩 Tooltip 때문에 닫히기 전
  content 폭이 늘어나는 동작을 만들지 않는다.
- negative primary action의 별도 Dialog를 사용한다.
- Dialog는 상세 confirmation과 같은 400px small shell을 사용한다. 공용 Dialog의
  `max-width: calc(100vw - 32px)`는 유지해 좁은 viewport에서 좌우 16px 여백을 보장한다.
- title에는 구체적 동사, description에는 대상·영향·복구 불가 여부를 넣는다.
- safe action은 `취소`, confirm은 `삭제`처럼 결과 동사를 쓴다.
- Dialog의 최종 confirm은 icon-only로 바꾸지 않고 `삭제` 문구가 보이는 negative Button으로 유지한다.
- pending 동안 dismiss와 duplicate submit을 막는다.
- 사전 확인 요청도 abort/generation guard를 가진다. id·권한·편집 mode가 바뀌었거나 page가 unmount된 뒤
  도착한 성공 응답은 Dialog를 열거나 다음 mutation을 시작하지 않는다.
- 삭제 가능 여부 확인이나 최종 삭제 요청이 실패하면 본문 inline error를 추가하지 않고 우측 상단
  Notification Container의 `error` Toast로 알린다. Toast는 오류 `role="alert"`, 개별 닫기,
  기본 5초 자동 닫기를 유지하며 비어 있는 Container 영역은 page interaction을 가로막지 않는다.
- 성공 시 stale detail을 남기지 않고 목록 또는 적절한 후속 route로 이동한다.

---

## 12. motion

상세 화면은 route-level fade transition을 사용한다.

```text
enter: opacity 0 → 1, 0.2s ease
exit : opacity 1 → 0, 0.2s ease
```

- page route 전체에만 적용한다. card, field, tab에 독립 fade를 반복하지 않는다.
- transition은 click/focus를 가로채지 않는다.
- `prefers-reduced-motion: reduce`에서는 page fade, refresh spin, dialog animation을 제거하거나 즉시 완료한다.

---

## 13. 접근성과 responsive

### 13.1 semantic·focus

- root는 `<main>` 하나, header는 `<header>`, card는 목적을 드러내는 `section aria-label`, 정보는 `<dl>`.
- icon-only Button에 Tooltip과 정확한 accessible label 모두 제공.
- `aria-busy`는 loading/refresh/save/child registration의 실제 busy state와 동기화.
- error는 `role="alert"`, initial loading은 `role="status"`, copy feedback은 polite status.
- confirmation open은 intent별 tertiary safe action에 focus, dismiss는 원 trigger에 focus 복원.
- validation failure는 논리적인 첫 error tab/field로 focus 이동.
- category/map dialog는 focus trap과 close 후 trigger focus 복원을 유지.
- Tree는 공용 Tree의 arrow/enter/space keyboard model을 변경하지 않는다.
- 연결 resource link는 검증된 목적지가 있을 때만 interactive이며, 관계 이동도 현재 page의 dirty guard와
  permission policy를 우회하지 않는다.

### 13.2 responsive·긴 문자열

- `solution narrow breakpoint`: shell horizontal padding 16px.
- `≤799px`: operations master-detail 1열.
- `solution compact breakpoint`: detail/properties grid 1열, padding 20px, registration header action은 제목 아래 wrap.
- title만 ellipsis 가능. description, URL, metadata description은 wrap.
- 한글, 긴 영문, URL, base64 mask, 200% zoom에서 horizontal viewport overflow가 없어야 한다.
- focus outline을 제거하지 않고, Tab active indicator와 scroll border가 겹치지 않게 한다.

---

## 14. 구현 의사 코드

```tsx
function ResourceDetailPage({ resourceId }: { resourceId: string }) {
  const { query, refresh, replace } = useResourceDetail(resourceId);
  const [activeTab, setActiveTab] = useState("basic");
  const [draft, setDraft] = useState<ResourceDraft>();
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [confirmation, setConfirmation] = useState<"save" | "cancel">();
  const [leaveOpen, setLeaveOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const resource = query.status === "ready" ? query.data : undefined;
  const refreshing = query.status === "ready" && query.refreshing;
  const editing = draft !== undefined;
  const dirty = Boolean(resource && draft && !isSameDraft(resource, draft));

  function beginEdit() {
    if (!resource || saving || refreshing) return;
    setDraft(toDraft(resource));
    setFieldErrors({});
  }

  function updateDraft<K extends keyof ResourceDraft>(
    key: K,
    value: ResourceDraft[K],
  ) {
    setDraft((current) => current && { ...current, [key]: value });
    setFieldErrors((current) => ({ ...current, [key]: undefined }));
  }

  function requestSave() {
    if (!resource || !draft || saving) return;
    const nextErrors = validateDraft(draft);
    setFieldErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    setConfirmation("save");
  }

  async function confirmEdit() {
    const action = confirmation;
    setConfirmation(undefined);
    if (action === "cancel") {
      setDraft(undefined);
      setFieldErrors({});
      return;
    }
    if (!resource || !draft || saving) return;
    setSaving(true);
    try {
      const saved = await saveResource(toPayload(draft));
      replace(saved);
      setDraft(undefined);
    } catch (error) {
      setFieldErrors(toFieldErrors(error));
    } finally {
      setSaving(false);
    }
  }

  function requestBack() {
    if (saving) return;
    if (editing && dirty) {
      setLeaveOpen(true);
      return;
    }
    navigateToList();
  }

  return (
    <DetailShell
      header={
        <PageHeader
          title={resource ? `${resource.name} 상세 정보` : "상세 정보"}
          isLoading={query.status === "loading"}
          onBackClick={requestBack}
          tabValue={activeTab}
          onTabValueChange={setActiveTab}
          titleAction={
            !editing ? (
              <>
                <ReadActions refresh={refresh} onEdit={beginEdit} />
                {resource ? (
                  <PageHeaderIconAction
                    icon="trash"
                    label={`${resource.name} 삭제`}
                    tooltip="삭제"
                    variant="ghost"
                    size="medium"
                    iconSize="l"
                    onClick={requestDelete}
                  />
                ) : null}
              </>
            ) : undefined
          }
          buttonGroup={
            editing ? (
              <EditActions
                dirty={dirty}
                saving={saving}
                onSave={requestSave}
                onCancel={() => setConfirmation("cancel")}
              />
            ) : undefined
          }
        />
      }
    >
      {query.status === "loading" ? <LoadingStateCard /> : null}
      {query.status === "error" ? (
        <ContentState
          kind="error"
          title="리소스 정보를 불러오지 못했습니다."
          description={query.message}
          action={{ label: "다시 시도", onClick: refresh }}
        />
      ) : null}
      {resource ? (
        <DetailTabContent
          resource={resource}
          draft={draft}
          onDraftChange={updateDraft}
        />
      ) : null}
      <RefreshContentOverlay visible={refreshing && Boolean(resource)} />

      <EditConfirmationDialog
        action={confirmation}
        saveTitle="변경 내용을 저장할까요?"
        saveDescription="변경한 내용이 저장되어 바로 반영됩니다."
        cancelTitle="수정을 취소할까요?"
        cancelDescription={
          "변경한 내용은 저장되지 않고\n마지막 저장 상태로 돌아갑니다."
        }
        onOpenChange={(open) => !open && !saving && setConfirmation(undefined)}
        onConfirm={() => void confirmEdit()}
      />
    </DetailShell>
  );
}
```

의사 코드는 page가 모든 state를 소유하고 header/card/dialog/field가 controlled props만 받는 핵심을
보여 준다. 실제 resource model, permission, error adapter, payload normalizer만 도메인에 맞게 추가한다.

---

## 15. 금지 패턴

- header와 content에 각각 scrollbar를 두는 구조
- scrollbar를 최대 너비 content의 우측 여백에 배치하는 구조
- scroll 여부에 따라 border element를 mount/unmount해 깜빡이게 하는 방식
- tabs 아래 header padding 때문에 scroll content가 잘리는 구조
- refresh 시 기존 card를 제거하고 initial loading으로 되돌리는 방식
- original response를 Input `onChange`에서 직접 mutate하는 방식
- cancel/back/list navigation에 서로 다른 discard 문구·폭·동작을 쓰는 방식
- 목록 이탈에 공용 Confirmation이 아닌 별도 Dialog를 조합하는 방식
- safe action을 `계속 편집`, `확인`, `예`처럼 모호하게 쓰는 방식
- secret/인증서/긴 key를 raw text, Tooltip, aria-label, log에 노출하는 방식
- boolean API 값을 raw `true`/`false`로 표시하는 방식
- 미번역 API option key를 label/description으로 노출하는 방식
- 현재 resource id가 바뀌었는데 이전 draft, delete preflight, Toast, 보조 query 결과를 유지하는 방식
- 보조 query가 실패했다고 주 resource의 ready content를 error로 덮어쓰는 방식
- presentation component 안에서 다른 resource의 href를 조합하거나 API를 직접 호출하는 방식
- 최초 loading을 `aria-hidden` placeholder나 revalidation overlay만으로 표현하는 방식
- detail grid 안의 Select trigger를 고정 폭으로 두거나, 6개를 초과한 option을 page까지 끝없이 늘이는 방식
- parent/child에 동시에 selected background를 주는 tree 구현
- 선택과 무관한 parent/child segmented control을 추가하는 구조
- category/map action을 입력 grid 빈 cell 또는 form footer에 섞는 구조
- 공용 Button/Icon Button/Dialog/Tree/Scroll Area가 있는데 page-local SVG, focus trap, portal을 다시 만드는 방식
- 단일 card 또는 field 수가 적다는 이유로 정보 card의 보이는 title·description·divider를 생략하는 방식
- Header의 삭제 trigger를 edit와 떨어진 `trailingElement`나 문구가 보이는 negative Button으로 두는 방식
- 삭제 Icon Button을 Tooltip·accessible label 없는 icon-only control로 만드는 방식
- 삭제 preflight/mutation 오류를 상세 본문 폭의 inline alert로 표시하는 방식
- raw hex, 임의 z-index, `transition: all`, focus outline 제거

---

## 16. 완료 전 검증 matrix

### 기능

- [ ] invalid identifier는 API 요청 없이 error card를 표시한다.
- [ ] initial loading은 header height를 유지하고 state card에는 loading status가 있다.
- [ ] refresh는 existing content를 유지하고 overlay와 spinning refresh icon만 보이며, 명시적 refresh는 최소 600ms 유지된다.
- [ ] ready/error/not-found/forbidden/retry가 구분된다.
- [ ] route id 변경 시 이전 query와 보조 query가 취소 또는 stale 처리되고, draft·confirmation·selection·Toast가 새 resource로 이어지지 않는다.
- [ ] 보조 query 오류는 안전한 읽기 content를 유지하며, 필요한 action만 disabled하고 retry를 제공한다.
- [ ] read → edit → cancel은 original을 바꾸지 않는다.
- [ ] save validation failure는 field error와 해당 tab을 정확히 표시한다.
- [ ] save failure 뒤 draft와 navigation guard가 유지된다.
- [ ] save success만 original을 교체하고 draft를 지운다.
- [ ] Header cancel, Header back, internal list navigation이 같은 unsaved-change guard를 사용한다.
- [ ] destructive flow는 별도 negative confirmation을 쓴다.
- [ ] Header의 삭제 Icon Button은 edit 바로 다음에 있으며 Dialog의 최종 삭제는 negative text Button이다.
- [ ] Header icon은 공용 Icon의 18px/1.25px rounded stroke를 사용하고 page CSS가 SVG stroke를 override하지 않는다.
- [ ] title action마다 Tooltip이 하나뿐이고 pending 전환에도 label/content 폭이 바뀌지 않는다.
- [ ] destructive confirmation은 400px Small이고, 삭제 실패는 우측 상단 error Toast로 표시되어 5초 후 닫힌다.
- [ ] 삭제 사전 확인 중에는 대상·mode를 바꿀 수 있는 header action과 tab 이동이 disabled이며, stale 결과가 Dialog를 열지 않는다.

### 시각·반응형

- [ ] header title, scroll content, card의 좌측선이 같은 content column에 맞는다.
- [ ] scrollbar는 page content viewport의 오른쪽 끝에서 6px 폭으로 보인다.
- [ ] scrollTop 0에서는 header border가 없고, 1px 이상에서 `--border-default` 1px로 나타난다.
- [ ] header border transition에 깜빡임이 없다.
- [ ] tab baseline은 header 전체 폭으로 이어지고 active indicator를 가리지 않는다.
- [ ] scroll content가 tabs 아래에서 잘리지 않고 자연스럽게 통과한다.
- [ ] header와 첫 업무 영역 간격이 24px이다.
- [ ] 모든 의미 있는 정보 card에 보이는 title·한 문장 description·divider가 있고 section semantics와 연결된다.
- [ ] information/properties grid는 desktop 2열, ≤SOLVED_COMPACT_BREAKPOINT 1열이며 긴 값이 overflow하지 않는다.
- [ ] grid 안의 Select/combobox는 cell 전체 폭을 쓰며, option은 최대 6개 높이 이후 자체 scroll된다.
- [ ] operations layout은 ≤799px 1열이다.
- [ ] registration header action은 desktop 우측, 좁은 폭에서는 제목 아래로 wrap한다.

### 접근성·민감 값

- [ ] 모든 icon-only action에는 label과 Tooltip이 있다.
- [ ] confirmation은 intent별 tertiary safe action에 focus하고 dismiss 후 trigger로 돌아간다.
- [ ] copy success/failure가 screen reader에 전달되고 icon이 check으로 잠시 바뀐다.
- [ ] secret/certificate/긴 key가 raw DOM text, Tooltip, aria-label, log에 노출되지 않는다.
- [ ] boolean 읽기·편집 모두 raw `true`/`false`를 보이지 않는다.
- [ ] selected option, option description, loading/empty/error, Tooltip과 accessible name에 미번역 key가 노출되지 않는다.
- [ ] 관계 resource는 검증된 id가 있을 때만 link이며, dirty guard를 우회해 직접 이동하지 않는다.
- [ ] tree에서 하나의 node만 selected style을 가지며 keyboard selection도 같다.
- [ ] 200% zoom, 긴 한글/영문/URL에서 horizontal viewport overflow가 없다.
- [ ] reduced motion에서 page fade, refresh spin, dialog animation이 제거 또는 완화된다.

### 자동 검증

- [ ] route/draft compare/payload normalizer/boolean parser/mask formatter unit test
- [ ] route id 변경, abort/stale response, 보조 query의 id binding과 failure fallback unit/integration test
- [ ] save/cancel/leave confirmation, disabled, retry, tab error 이동 interaction test
- [ ] delete preflight action lock, 관계 resource link guard, Select의 selected label/option scroll interaction test
- [ ] tree parent/child 단일 selection test
- [ ] category discovery/map picker loading/error/ready/apply/cancel test
- [ ] typecheck, lint, 전체 test, build, 문서 구조 검증 실행

---

## 17. 재현 잠금 계약

| 영역                 | 잠금 규칙                                                                                                                     |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| geometry             | header fixed, 본문 viewport 하나만 scroll, track은 viewport 우측, content는 내부 max-width band                               |
| header               | back·thumbnail·title·medium chip·refresh → edit → delete icon actions·edit button group·tabs 순서와 skeleton height 유지      |
| tabs                 | header 마지막 행, 전폭 baseline, navigation-only. 첫 콘텐츠 24px은 scroll content가 소유                                      |
| state                | original/draft/dirty/query/mutation/confirmation/selected node는 page single owner                                            |
| independence         | 특정 DTO·URL template·package·source path 없이 semantic role과 controlled boundary만 잠근다                                   |
| resource lifecycle   | id 변경 시 query·보조 query stale 결과를 폐기하고 draft·dialog·Toast·selection을 새 resource로 넘기지 않는다                  |
| refresh              | existing data를 지우지 않고 overlay. refresh action은 disabled + spin, 명시적 refresh feedback은 최소 600ms 유지              |
| edit                 | read/edit가 같은 visible header와 grid cell. immutable은 readOnly, secret은 textarea + mask                                   |
| information card     | 단일/복수 여부와 관계없이 title·한 문장 description·divider·24/20px body inset 유지. 상태 surface는 예외                      |
| select               | grid cell full width, selected/localized label, 최대 6 option viewport + 내부 scroll                                          |
| confirmation         | save/cancel/leave는 400px controlled confirmation, safe action은 save `돌아가기`·cancel/leave `계속하기`, confirm은 결과 동사 |
| destructive feedback | 400px negative confirmation, 실패는 우측 상단 error Toast + 개별 닫기 + 기본 5초 자동 닫기                                    |
| sensitive            | display mask와 raw copy value 분리, secret 원문은 표시하지 않음                                                               |
| properties           | metadata label/description/type 우선, raw API key/boolean 노출 금지                                                           |
| operations           | tree 단일 selection, 우측 선택 정보, edit 중 header action이 있는 registration form                                           |
| accessibility        | native semantics, focus restore, live status, keyboard, reduced motion 유지                                                   |

이 계약과 다른 요구가 생기면 화면별 임시 CSS override보다 먼저 state·geometry·component 책임을 검토한다.
변경이 의도된 새 표준이라면 이 문서와 구현을 함께 갱신한다.
