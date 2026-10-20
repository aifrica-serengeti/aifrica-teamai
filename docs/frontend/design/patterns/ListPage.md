# List Page

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

> Design System: Aifrica Design System  
> 적용 화면: 검색·필터·페이지네이션을 가진 관리 목록  
> 최종 갱신: 2026-09-22

List Page는 **목록 조회 조건과 화면 상태를 page가 단일 소유**하고, 공용 `Table` 또는 공용
`Card`로 같은 결과를 표현하는 route 단위 화면 패턴이다. 이 문서만으로 새 메뉴의 목록 화면을
구성할 수 있어야 하며, 특정 기존 메뉴·DTO·컴포넌트 파일을 복사하거나 참조하는 것을 전제로 하지
않는다.

이 패턴의 기준 UI/UX는 다음과 같다.

- 저장된 보기 선호가 없는 첫 진입은 `profile.defaultViewMode`를 사용한다. 저장값이 없거나 지원 범위를 벗어나면 솔루션의 명시적 fallback policy를 적용한다.
- Header, toolbar, Table/Card의 왼쪽 시작선은 하나의 `var(--layout-content-max)` content column에 맞춘다.
- 넓은 폭에서는 검색·필터를 인라인으로, 부족해지면 **한 필터씩** Filter Popover로 옮긴다.
- Pagination, Filter trigger, Table/Card 보기 전환은 toolbar 오른쪽의 같은 action 묶음에 둔다.
- Table은 자신의 sticky header와 내부 scroll을, Card 보기는 page 폭 전체 ScrollArea와 우측 shell
  scrollbar를 소유한다.
- 행과 카드는 모두 상세 이동 가능한 interactive target이며, 키보드 동작은 공용 컴포넌트에
  위임한다.
- 최초 조회, 검색/필터 조회, 페이지 이동, 수동 새로고침을 구분한 loading overlay 문구를 제공한다.

이 문서는 `Table`, `Pagination`, `Dropdown`, `Card`의 내부 API를 다시 정의하지 않는다. 각
컴포넌트의 책임을 지키면서 Page에서 어떻게 조립할지를 고정한다.

---

## 공통 적용 경계

아래 상세 anatomy·상태·검증은 참조 계약이다. **공통 필수**는 page의 상태 소유권, query/draft 분리,
오류·권한·중복 실행·focus·unsaved changes·단일 scroll/overlay owner다. **선택 profile**은 콘텐츠 폭·inset·
breakpoint·Card 열 수·기본 page size·header action 배치·확인창 크기·모션 시간·도메인 field 구성이다.
이 선택값은 [계약 수준](../contract-levels.md)의 솔루션 입력으로 결정하며 관찰값을 자동 상속하지 않는다.
예제의 식별자·DTO·API 경로·문구는 역할 예시이며 고정된 실제 서비스 계약이 아니다.
`profile`은 솔루션 page/layout adapter이고 실행 모듈이 아니다.

## 1. 적용 범위와 선택 기준

| 변형                   | 사용 조건                                                      | 필수 구성                                |
| ---------------------- | -------------------------------------------------------------- | ---------------------------------------- |
| 단순 Table 목록        | 결과가 작고 검색·페이지 이동이 불필요함                        | `PageHeader → Table`                     |
| 조회 목록              | keyword 또는 하나 이상의 enum filter가 있음                    | `PageHeader → Filter toolbar → Table`    |
| 서버 페이지 목록       | API가 `content + totalElements` 또는 동등한 전체 건수를 반환함 | toolbar action의 `Pagination`            |
| Table/Card 전환 목록   | Table의 비교성과 Card의 빠른 식별성이 모두 의미 있음           | `Pagination + Filter + SegmentedControl` |
| 공유 가능한 query 목록 | 특정 조건이 deep link/새로고침에도 반드시 유지되어야 함        | 필요한 filter만 URL query로 소유         |

다음은 허용하지 않는다.

1. `Table` 또는 `CardGrid` 내부에서 API, route, keyword, pagination state를 소유하는 구조
2. Table footer에 두 번째 Pagination을 넣는 구조
3. viewport 폭만으로 filter를 줄바꿈하거나, 인라인 filter와 Popover filter에 서로 다른 local
   state를 두는 구조
4. 저장된 공용 보기 선호를 무시하고 메뉴마다 Card 또는 Table을 임의 기본값으로 두는 구조. 저장된
   선호가 없거나 손상되었을 때는 `profile.defaultViewMode`를 사용한다.
5. 기존 결과를 지운 뒤 재조회하는 구조. revalidation 중에는 마지막 성공 결과를 유지한다.

## 2. 선행 컴포넌트와 재사용 결정

새 화면을 만들기 전 아래 공용 컴포넌트의 문서와 dependency closure를 확인한다. 기존 제품
유지보수 모드에서만 실제 public export를 추가로 대조하며, 문서 전용 재현에서는 아래 역할의
public component를 문서 API로 한 번만 구현한다. 같은 의미의 컴포넌트를 menu 안에 다시 만들지 않는다.

| 컴포넌트                                                                 | List Page 안에서의 책임                                   | Page가 소유하는 것                                   |
| ------------------------------------------------------------------------ | --------------------------------------------------------- | ---------------------------------------------------- |
| [Page Header](../components/PageHeader/README.md)                        | 제목·설명·refresh action·create action 배치               | 제목 copy, refresh callback, 권한에 따른 action 노출 |
| [Search](../components/Search/README.md)                                 | controlled keyword 입력과 clear affordance                | keyword 값, debounce, page reset                     |
| [Dropdown](../components/Dropdown/README.md)                             | enum/select filter, option list scroll, open/close        | 선택값, option 데이터, API 값 변환                   |
| 입력용 Popover (설치된 Radix Popover primitive 또는 검증된 공용 wrapper) | 좁은 폭 검색 폼의 focus·position·portal                   | Popover 안에 넣을 필드와 reset callback              |
| [Pagination](../components/Pagination/README.md)                         | 범위 표기, page 이동, page size 선택                      | page, pageSize, total, loading disabled              |
| [Segmented Control](../components/SegmentedControl/README.md)            | Table/Card 아이콘 보기 전환                               | viewMode, view별 page size                           |
| [Table](../components/Table/README.md)                                   | native table semantics, sticky header, 내부 양방향 scroll | column 정의, current page data, row click            |
| [Card](../components/Card/README.md)                                     | interactive card의 semantics, focus ring, 상태별 surface  | card에 표시할 도메인 값, 상세 이동 callback          |
| [List Content State](../components/ListContentState/README.md)           | empty·filtered·최초 오류의 icon·copy·복구 action          | 상태 판별, 안전한 오류 문구, retry callback          |
| [Scrollbar & ScrollArea](../components/Scrollbar/README.md)              | Card view의 page-level vertical scroll                    | scroll 위치로부터 Header divider 표시 여부           |
| [Async Content State](../components/AsyncContentState/README.md)         | Spinner와 `RefreshContentOverlay` lifecycle               | query 상태, 문구, refresh 중 action disabled         |

**결정:** 이 패턴은 위 컴포넌트를 `compose`한다. `ResourceListToolbar`, `ResourceTable`,
`ResourceCard`, `ResourceCardGrid`는 route 전용 표현 조립이므로 처음에는 page `markup`에 둔다.
둘 이상의 같은 menu page에서 동일한 props·접근성·상태 계약이 검증될 때만 `shared/ui`로 올린다.

## 3. portable module 구조

파일 경로는 소비 프로젝트가 정한다. 아래는 source tree가 아니라 책임 경계이며, 어떤 framework나
directory convention을 사용해도 이 경계를 보존한다.

```text
domain adapter
├─ API service와 request/response DTO
├─ resource/status type
├─ API enum → localized label/tone mapping
└─ mock adapter (실제 test/story에서 필요할 때만)

route page module
├─ ResourceListPage                 # route/page state와 조립의 단일 owner
├─ useResourceList                  # query, abort, debounce, minimum loading duration
├─ type/                             # query state, view mode, filter/page workflow type
├─ immutable presentation data      # page size, columns, view option
└─ page-local presentation
   ├─ ResourceListToolbar
   ├─ ResourceTable
   ├─ ResourceCard
   └─ ResourceCardGrid

feature shared module               # list/detail 등 둘 이상 page가 같은 계약으로 쓸 때만
└─ formatter, private icon mapping, shared presentation
```

### 3.1 파일 배치 규칙

- `ResourceListPageProps`처럼 **컴포넌트 공개 Props interface만** 해당 `.tsx` 파일에 둔다.
- API 응답 interface와 도메인 status union·label/tone mapping은 domain adapter에 둔다.
- query state, view mode, filter display처럼 list workflow 수명과 함께 바뀌는 이름 있는 타입은
  route page의 `type/{resource}.{purpose}.t.ts`에 둔다. 다른 page kind가 같은 의미로 공유할 때만
  menu `shared/type`으로 올리며, 중앙화를 이유로 domain adapter에 두지 않는다.
- page와 markup의 화면 표현용 정적 값(기본 page size, page size options, columns, view options)은 가장
  가까운 `data/`에 둔다. API response나 mock을 `data/`에 넣지 않는다.
- card/table 모두에서 실제 공유하는 format 함수·private icon mapping만 feature shared module로 올린다.
- DTO, API URL 조합, 인증 정보는 page나 presentation에 넣지 않고 domain adapter/service가 소유한다.

## 4. 화면 anatomy와 고정 geometry

```text
Application content viewport
└─ ResourceListPage.page
   ├─ headerArea
   │  └─ PageHeader
   │     ├─ title + description
   │     └─ refresh IconButton (optional create Button group)
   └─ viewMode === "table"
      └─ tableViewport
         └─ tableContent (max-width: var(--layout-content-max))
            ├─ ResourceListToolbar
            └─ listArea
               ├─ ResourceTable
               └─ RefreshContentOverlay

   viewMode === "card"
   └─ cardContentViewport (full page width, relative)
      ├─ ScrollArea                         # shell right edge scrollbar owner
      │  └─ cardScrollContent (max-width: var(--layout-band-max); horizontal padding 24)
      │     └─ cardContent (effective max-width: var(--layout-content-max))
      │        ├─ ResourceListToolbar
      │        └─ listArea
      │           └─ ResourceCardGrid
      └─ RefreshContentOverlay
```

### 4.1 폭·여백·surface

| 영역                    | Desktop                             | `solution narrow breakpoint`                          | 소유자             |
| ----------------------- | ----------------------------------- | --------------------------------- | ------------------ |
| page shell              | `height: 100%; overflow: hidden`    | `height: auto; overflow: visible` | `ResourceListPage` |
| shell surface           | `var(--surface-shell)`              | 동일                              | `ResourceListPage` |
| header content          | `max-width: var(--layout-band-max)`                 | 동일                              | header wrapper     |
| 업무 content            | `max-width: var(--layout-content-max); margin: 0 auto` | 동일                              | table/card content |
| horizontal page padding | `0 24px 32px`                       | `0 16px 24px`                     | viewport/content   |
| Header → toolbar        | `24px`                              | `24px`                            | content wrapper    |
| toolbar → list          | `16px`                              | `16px`                            | `listArea`         |
| grid gap                | `16px`                              | `16px`                            | CardGrid           |

`PageHeader`는 자체 horizontal padding을 소유한다. 콘텐츠 시작선을 맞추기 위해 PageHeader 내부를
override하지 않는다. Header wrapper를 `var(--layout-band-max)`로 두고 Header의 24px padding을 포함시켜 실제 title
시작선이 `var(--layout-content-max)` 업무 content와 맞게 한다. 좁은 화면에서는 Header의 16px padding과 content의 16px
padding이 같은 시작선을 만든다.

기본 surface/border/text에는 raw hex를 쓰지 않고 아래 semantic token만 사용한다.

| 역할                        | token                                                                        |
| --------------------------- | ---------------------------------------------------------------------------- |
| page shell                  | `var(--surface-shell)`                                                       |
| Table/Card/empty surface    | `var(--surface)`                                                             |
| table header/subtle surface | `var(--surface-subtle)`                                                      |
| base border                 | `var(--border-default)`                                                      |
| 기본/보조 text              | `var(--text)`, `var(--text-subtle)`                                          |
| error notice                | `var(--surface-danger-subtle)`, `var(--border-danger)`, `var(--text-danger)` |

### 4.2 Header 규칙

```tsx
<PageHeader
  title="리소스"
  description="운영 중인 리소스를 검색하고 상태를 확인할 수 있습니다."
  showBackButton={false}
  borderBottom={false}
  titleAction={
    <Tooltip>
      <TooltipTrigger asChild>
        <span>
          <IconButton
            icon="refresh"
            iconSize="l"
            size="medium"
            variant="ghost"
            aria-label="리소스 목록 새로고침"
            disabled={refreshing}
            aria-busy={refreshing || undefined}
            onClick={refreshList}
          />
        </span>
      </TooltipTrigger>
      <TooltipContent>새로고침</TooltipContent>
    </Tooltip>
  }
/>
```

- 목록 Header는 back button을 숨긴다.
- refresh action은 공용 `IconButton size="medium"`의 **24×24px hit area**와 `iconSize="l"`의
  **18px icon**을 쓴다. 로딩 중에는 disabled와 `aria-busy`를 함께 제공하고, 아이콘만 `.8s linear`
  회전시킨다. `prefers-reduced-motion`에서는 회전시키지 않는다.
- Icon은 공용 `l` size의 1.25px rounded stroke를 그대로 사용한다. page CSS에서 SVG stroke width를
  덮어쓰지 않는다. refresh action에는 Tooltip root 하나만 두고 Tooltip 문구는 대상명 없이
  `새로고침`으로 유지한다. accessible label은 `리소스 목록 새로고침`처럼 대상을 포함할 수 있으며,
  진행 상태는 `aria-busy`와 overlay live label이 전달한다.
- 목록 전체 동기화·외부 자원 불러오기 액션은 `sync` Icon Button으로 refresh 오른쪽에 배치한다.
  기존 confirm/dialog와 pending·focus 복원 흐름은 유지한다. 선택한 행에만 적용되는 상태 동기화는
  선택 맥락이 사라지지 않도록 ActionBar에 둔다.
- create 권한이 있는 메뉴는 `buttonGroup`에
  `Button size="medium" leadingIcon="plus"`를 둔다. 생성·등록 문구와 공용 Plus 아이콘을 함께
  사용하되 아이콘은 장식 요소로 처리하여 accessible name에는 문구만 한 번 전달한다. 들여오기·업로드·
  동기화·미리보기처럼 의미가 다른 action에는 Plus를 적용하지 않고 각 action에 맞는 공용 아이콘을 쓴다.
  이런 비생성 action이 create 권한을 공유하면 `data-page-header-action`에 `import`, `upload`, `sync`,
  `preview`, `launch` 중 의미에 맞는 값을 명시한다. 버튼 문구나 번역 키로 action 의미를 추론하지 않는다.
  refresh와 create를 같은 custom button으로 합치지 않는다.
- Card view에서 content가 `scrollTop > 0`이면 Header wrapper의 bottom border를
  `var(--border-default)`로 켠다. Table view는 Table 자체 sticky header가 scroll feedback을 맡는다.

## 5. 상태 소유권과 query pipeline

### 5.1 page/query hook 책임 분리

| 상태                               | 단일 owner             | 변경 규칙                                             |
| ---------------------------------- | ---------------------- | ----------------------------------------------------- |
| keyword, select filter             | `ResourceListPage`     | 변경 즉시 `page = 1`, query hook에 전달               |
| filter reset                       | `ResourceListPage`     | 모든 filter 기본값과 `page = 1`을 같은 event에서 변경 |
| page, pageSize                     | `ResourceListPage`     | page는 1-based, size 변경 시 page 1                   |
| viewMode                           | 공용 보기 선호 hook    | profile 기본 보기, 전환 시 저장, page 1, view별 size 보존  |
| loading copy reason                | `ResourceListPage`     | initial/filter/page/manual refresh 원인으로 갱신      |
| rows, total, request status, abort | `useResourceList`      | 최신 요청만 반영, 성공 시 rows/total 함께 반영        |
| API 호출과 DTO 변환                | domain adapter/service | Page/presentation에 노출하지 않음                     |

권장 query state는 다음처럼 data 유무가 드러나는 discriminated union이다.

```ts
export type TResourceListQuery =
  | { status: "loading" }
  | { status: "error"; message: string }
  | {
      status: "ready";
      data: IResourceListResult;
      refreshing: boolean;
      refreshError?: string;
    };

export interface IResourceListResult {
  content: readonly IResourceListItem[];
  totalElements: number;
}
```

`loading`과 `ready + refreshing`을 같은 boolean으로만 저장하지 않는다. page에서 다음처럼 render
값을 파생한다.

```ts
const refreshing =
  query.status === "loading" || (query.status === "ready" && query.refreshing);
const rows = query.status === "ready" ? query.data.content : [];
const total = query.status === "ready" ? query.data.totalElements : 0;
```

### 5.2 탐색 상태와 보기 선호 수명

- keyword, filter, sort, page, pageSize처럼 목록 탐색에만 쓰는 상태는 목록 page/query hook이
  소유한다. 이를 범용 전역 store나 도메인 model로 올리지 않는다.
- 같은 메뉴의 목록에서 상세·생성·수정 화면으로 이동할 때 application shell은 React `Activity`로
  목록 subtree를 숨겨 보존한다. 목록으로 돌아오면 해당 subtree를 다시 표시하므로 탐색 상태가
  유지된다.
- 사이드바로 다른 메뉴를 선택하면 이전 메뉴의 보존 subtree를 폐기한다. 이후 이전 메뉴로 돌아오면
  keyword, filter, sort, page, pageSize는 각 목록의 초기값으로 시작한다.
- `table | card` 보기 방식만 `useListViewModePreference`가 브라우저 `localStorage`에 보존한다.
  application shell이 제공한 메뉴 ID를 scope로 사용하므로 같은 메뉴에서는 다음 방문에도 재사용하고,
  서로 다른 메뉴의 보기 방식은 독립적으로 유지한다. 저장소를 사용할 수 없거나 값이 손상되면
  해당 메뉴의 `profile.defaultViewMode`로 복구한다. profile 값도 지원하지 않으면 솔루션의 명시적 fallback policy를 적용한다.
- URL 공유·브라우저 새로고침에도 유지해야 하는 조건은 기존 route query 계약을 계속 사용한다.
  브라우저 보기 선호는 명시적인 URL `view` 값보다 우선하지 않는다.

### 5.3 request 안전성·debounce·minimum duration

1. keyword는 `profile.searchDebounceMs` debounce 후 검색한다. Select filter, page, pageSize, viewMode 전환은 즉시
   query를 바꾼다.
2. request마다 `AbortController`를 만들고 effect cleanup에서 abort한다. 취소된 응답이 최신 rows를
   덮어쓰면 안 된다.
3. 빠른 응답에서도 loading feedback이 인지되도록 최초 조회와 revalidation은 **최소 0.6초**를
   유지한다.
4. 마지막 성공 data가 있는 재조회에서는 rows/total을 비우지 않는다. 실패하면 기존 결과와
   `refreshError` notice를 함께 유지한다.
5. HTTP/raw error를 그대로 출력하지 않고 page/hook이 사용자가 이해할 복구 문장으로 변환한다.

### 5.3 loading 문구 정책

같은 spinner여도 요청 원인을 알려야 한다. `ResourceListPage`는 아래 label을 state로 소유하고
`RefreshContentOverlay`에 전달한다.

| 요청 원인                             | overlay label                          | trigger가 disabled되는가               |
| ------------------------------------- | -------------------------------------- | -------------------------------------- |
| 최초 진입                             | `리소스 목록을 불러오는 중입니다.`     | filter/pagination/view switch, refresh |
| keyword 입력·Select 선택·filter reset | `리소스 목록을 검색 중입니다.`         | query를 바꾸는 control                 |
| Pagination·page size·view mode 변경   | `리소스 목록을 불러오는 중입니다.`     | query를 바꾸는 control                 |
| Header refresh/retry                  | `리소스 목록을 새로고침하고 있습니다.` | refresh와 query control                |

예시는 다음과 같다.

```tsx
const [revalidationLabel, setRevalidationLabel] = useState(
  "리소스 목록을 새로고침하고 있습니다.",
);

function changeKeyword(value: string) {
  setRevalidationLabel("리소스 목록을 검색 중입니다.");
  setKeyword(value);
  setPage(1);
}

function refreshList() {
  setRevalidationLabel("리소스 목록을 새로고침하고 있습니다.");
  refresh();
}

const overlayLabel =
  query.status === "loading"
    ? "리소스 목록을 불러오는 중입니다."
    : revalidationLabel;
```

### 5.4 List Page overlay profile

이 List Page profile은 list viewport 안에서 공용 `RefreshContentOverlay`를 **최초 조회와
revalidation 모두에 하나만** 사용한다. Table body의 별도 Spinner와 page overlay를 동시에
mount하지 않는다.

- Table 최초 조회: column/header/frame은 유지하고 빈 `emptyContent`를 전달한 뒤, `listArea`의
  page overlay를 올린다.
- Card 최초 조회: `min-height: 360px`의 non-interactive placeholder로 안정된 영역을 확보한 뒤,
  page overlay를 올린다.
- revalidation: 마지막 성공 Table/Card는 유지하고 같은 overlay만 표시한다.
- `RefreshContentOverlay`의 parent는 반드시 `position: relative`여야 한다. overlay가 interaction을
  lock하지 않으므로 page는 새 request를 만드는 controls를 disabled한다.
- overlay는 `role="status"`, `aria-live="polite"`를 제공한다. spinner의 accessible name을 별도로
  중복하지 않는다.
- page는 요청을 시작한 event에서 loading copy reason을 갱신한다. 최초 조회가 끝나 숨기는 동안에는
  최초 조회 문구를 유지하고, fade-out 구간에서 다음 기본 문구인 `새로고침 중`으로 교체해 실제 두 번
  조회하는 것처럼 보이게 하지 않는다. Overlay가 이전 prop을 별도 state로 복제하게 하지 않는다.

## 6. toolbar와 Filter Popover

### 6.1 넓은 화면 layout

```text
[Search 288px] [Category 216px]                     [Pagination] [Filter?] [Table/Card]
```

- toolbar: `display: flex; align-items: flex-end; justify-content: space-between; gap: 16px`.
- left filters: `inline-flex; gap: 8px; flex-shrink: 0`.
- right actions: `inline-flex; margin-left: auto; gap: 8px; justify-content: flex-end; flex-shrink: 0`.
- Search는 `288px`, enum Select는 콘텐츠에 맞는 고정 폭(기준 `216px`)으로 시작한다. arbitrary
  `flex: 1`로 action 영역을 밀지 않는다.
- `Dropdown`에는 `maxVisibleOptions={5}`를 전달한다. option이 5개를 넘으면 공용 dropdown 내부
  ScrollArea가 목록만 scroll한다. Page는 native select scrollbar를 새로 만들지 않는다.

### 6.2 실제 폭 측정 기반 3단계 전환

filter가 다음 줄로 밀리기 전에 Popover로 옮긴다. viewport breakpoint만으로 판단하지 않고 hidden
measurement node의 intrinsic width를 `ResizeObserver`로 측정한다.

| `filterDisplay` | 인라인 왼쪽          | action 영역의 Filter button             |
| --------------- | -------------------- | --------------------------------------- |
| `inline`        | Search + 모든 Select | 없음                                    |
| `category`        | Search만             | Select filter가 들어 있는 `필터`        |
| `all`           | 없음                 | Search + 모든 Select가 들어 있는 `필터` |

```text
all filters + normal actions + gap 24px <= toolbar width  → inline
search only + actions including Filter button + gap 24px <= width → category
otherwise                                                     → all
```

측정 clone은 `left: -10000px`, `visibility: hidden`, `width: max-content`, `aria-hidden="true"`,
`pointer-events: none`으로 렌더한다. measurement에는 실제 인라인 filter, Search-only filter,
normal actions, Filter button을 포함한 actions를 모두 둔다. 보이는/숨긴 filter 어느 쪽도 별도의
keyword/category state를 만들지 않고, 같은 controlled props와 callbacks를 공유한다.

### 6.3 Filter Popover 세부 계약

검색·Dropdown·리셋처럼 폼 controls를 포함하는 패널은 입력용 **Popover**를 사용한다.
`Menu`는 명령용 `MenuItem`의 방향키 탐색과 Tab 차단을 소유하므로 일반 입력 폼을 넣지 않는다.
입력용 Popover의 실제 public export와 설치된 primitive를 소비 솔루션에서 확인한다.
페이지에서는 같은 primitive로 가까운 `markup`의 패널을 조합하며, 공용 Menu의 private CSS를
가져오거나 포커스·portal·위치 계산을 새로 구현하지 않는다.

```tsx
import * as Popover from "@radix-ui/react-popover";

<Popover.Root modal={false}>
  <Popover.Trigger asChild>
    <Button size="medium" variant="tertiary" leadingIcon="filter">
      필터
    </Button>
  </Popover.Trigger>
  <Popover.Portal>
    <Popover.Content
      aria-label="목록 필터"
      align="end"
      sideOffset={8}
      collisionPadding={12}
      className={styles.filterPopoverContent}
    >
      <div className={styles.filterPopoverFields}>
        <Search label="검색" value={keyword} onChange={onKeywordChange} />
        <Dropdown label="분류" value={category} onValueChange={onCategoryChange} />
      </div>
      <div className={styles.filterPopoverFooter}>
        <TextButton
          size="medium"
          leadingIcon="refresh"
          onClick={onFiltersReset}
        >
          리셋
        </TextButton>
      </div>
    </Popover.Content>
  </Popover.Portal>
</Popover.Root>;
```

열리면 첫 입력으로 초점이 이동하고 Tab·Shift+Tab으로 입력·clear·Dropdown·리셋을 탐색할 수 있어야 한다.
끝과 처음 사이 순환은 Popover의 FocusScope에 맡기며 Escape로 닫으면 trigger로 초점을 복원한다.
화면 너비 변화로 패널을 제거해도 검색 값은 페이지에 유지한다.

| 항목            | 규칙                                                                                    |
| --------------- | --------------------------------------------------------------------------------------- |
| trigger 위치    | Pagination 다음, 보기 전환 앞의 action 영역 오른쪽                                      |
| trigger variant | `Button size="medium" variant="tertiary"`                                               |
| Popover width   | `min(var(--layout-filter-popover-width), 100vw - var(--layout-popup-gutter))`                                                              |
| Popover padding | outer padding 0, field `12px 16px 4px`, footer `8px 16px 12px`                          |
| field width     | Popover 안에서는 Search와 Dropdown 모두 `width: 100%`; 인라인의 고정 폭을 유지하지 않음 |
| labels          | Popover에는 모든 노출 field의 보이는 label을 둠                                         |
| reset           | footer 우측 `TextButton`; reset 뒤 page 1 및 검색 loading label                         |
| layering        | Dropdown option menu가 Filter Popover보다 앞에 렌더되어야 함                            |

filter trigger가 보여도 inline field를 줄바꿈하거나, Toolbar 높이를 필드 이동으로 늘리지 않는다.

## 7. Pagination과 보기 전환

### 7.1 Pagination

Pagination은 right action 묶음의 첫 번째 요소다. Table/Card 아래에 중복하지 않는다.

| 규칙            | 계약                                                                          |
| --------------- | ----------------------------------------------------------------------------- |
| page 단위       | UI/API 모두 1-based                                                           |
| 결과 범위       | `total ? (page - 1) * pageSize + 1 : 0`부터 `min(page * pageSize, total)`까지 |
| filter 변경     | 모든 filter 변경 뒤 `page = 1`                                                |
| page size 변경  | size 저장과 `page = 1`을 같은 event에서 처리                                  |
| total 0         | `0-0건`, 총 page 1, navigation disabled                                       |
| loading         | `Pagination disabled`로 중복 request 차단                                     |
| table page size | `profile.tablePageSize`, `profile.tablePageSizeOptions`                                          |
| card page size  | `profile.cardPageSize`, `profile.cardPageSizeOptions`                                               |

Pagination의 page size Select는 숫자 내용 폭에 맞는 공용 width를 사용한다. Page가 arbitrary 넓은
select width를 덧씌우지 않는다.

### 7.2 Table/Card 전환

- 저장된 공용 보기 선호가 없거나 잘못된 경우 기본 state는 `viewMode = profile.defaultViewMode`다.
- 공용 `SegmentedControl size="medium" type="icon"`으로 `table`과 `card`를 제공한다.
- `aria-label="리소스 목록 보기 방식"`처럼 목적을 명확히 한다.
- 전환할 때 page는 1로 reset하지만, Table과 Card가 각각 마지막으로 선택한 pageSize는 보존한다.
- 전환한 `table | card` 값은 공용 보기 선호 hook에 현재 메뉴 ID scope로 저장한다. 같은 메뉴로
  돌아오면 복원하지만 다른 메뉴의 선택에는 영향을 주지 않는다. 차트·달력처럼 별도 의미를 가진
  보기 mode는 이 공용 선호에 포함하지 않는다.
- view mode 변경도 request를 발생시키므로 Pagination/SegmentedControl/filter control을 loading 동안
  disabled한다.

## 8. Table profile

### 8.1 조립

```tsx
<Table<IResourceListItem>
  ariaLabel="리소스 목록"
  columns={columns}
  data={rows}
  getRowKey={(row) => row.id}
  emptyContent="표시할 리소스가 없습니다."
  loading={false}
  size="medium"
  onRowClick={(row) =>
    navigateTo(`/resource/detail/${encodeURIComponent(row.id)}`)
  }
/>
```

List Page overlay profile에서는 Table 위에 page overlay 하나만 사용하므로, Table에 `loading`과
page overlay를 동시에 켜지 않는다. Table 자체의 loading state를 선택하는 화면은 이 profile의
overlay를 추가하지 않는다.

### 8.2 columns·cells

- column definition은 ResourceTable에 가장 가까운 immutable presentation data module에 둔다.
- `tableLayout: fixed` 기준으로 한 화면에서 가로 scroll 없이 보일 수 있는 폭을 합산한다. 이름,
  공급자, 위치, 갱신일, 상태처럼 의미가 다른 컬럼을 균등 분할하지 않는다.
- 기준 폭은 이름 `184px`, 공급자 `164px`, 위치 `208px`, 갱신일 `132px`, 상태 `112px`처럼 domain에
  맞춰 시작한다. 전체가 content 폭을 넘을 때만 Table의 가로 ScrollArea를 사용한다.
- 긴 단일 행 값은 `min-width: 0`, ellipsis, `white-space: nowrap`을 사용한다. URI/상세 설명처럼
  반드시 읽어야 하는 값은 Detail page에서 wrap한다.
- status는 API 문자열을 Table에서 해석하지 않는다. domain adapter의 status → label,
  tone mapping을 사용해 공용 `Status`를 렌더한다.
- status cell 내부는 `display: flex; align-items: center; min-height: 47px`로 medium row의 위아래
  중앙을 맞춘다.
- 분류/유형가 식별 가능한 도메인이라면 title 전에 공용 `PrivateIcon`을 둔다. icon에는 별도
  배경 컨테이너나 임의 padding을 더하지 않으며 fallback은 공용 `Icon`을 쓴다.

### 8.3 Table scroll과 border

- medium Table header는 40px, body row는 48px이다.
- 모든 `th`는 기본 상태에서도 `1px solid var(--border-default)` bottom divider를 유지한다.
- `thead`는 sticky이고, Table 내부 vertical scroll이 시작되면 공용 Table의 overlay shadow를
  사용한다. Page CSS에서 다른 shadow를 중복하지 않는다.
- 마지막 visible row도 bottom divider를 유지한다. 실제 vertical scroll 최하단일 때만 frame bottom
  border와 겹치지 않도록 공용 Table이 마지막 row divider를 제거한다.
- row detail 이동은 공용 Table의 `onRowClick`으로 연결한다. Table은 pointer cursor와 Enter/Space
  keyboard activation을 제공하므로 page가 `<tr>` click/focus 처리를 다시 작성하지 않는다.
- Desktop Table view는 Table frame이 남은 세로 높이를 차지하고 Table의 `ScrollArea`가 세로/가로
  scroll을 소유한다. page scrollbar를 Table header까지 겹치게 만들지 않는다.

## 9. Card profile

### 9.1 grid와 card anatomy

```text
ResourceCardGrid
├─ ResourceCard (interactive native button)
│  ├─ leading 선택적 식별 아이콘 (6xl; background wrapper 없음)
│  ├─ title + category description + 대표 날짜 sub description
│  ├─ right Status
│  ├─ ExtendedHeader
│  │  └─ taxonomy · location
│  └─ Summary
│     └─ domain label · value
└─ 다음 card …
```

```ts
// 소비 솔루션이 제공하는 layout adapter의 참조 alias
import { listCardGridColumns } from "@design/list-layout";

export const grid = style([
  listCardGridColumns,
  {
    display: "grid",
    width: "100%",
    gap: "16px",
  },
]);
```

- `솔루션의 List layout adapter`의 `listCardGridColumns`가 column 값의 단일 source다. route별 CardGrid는
  display, gap, list reset과 도메인 마크업을 계속 가까이 소유한다.
- var(--layout-content-max) 업무 content에서는 빈 track을 유지해 선택한 profile의 열수 기준으로 배치한다. 결과가 1건이면 첫 번째 열,
  2건이면 첫 번째·두 번째 열만 차지하며 남은 공간으로 card가 늘어나지 않는다. 각 card의 내용이 더 이상
  안전하게 줄지 못하면 2개, 1개로 자연스럽게 전환한다. fixed `repeat(2, ...)`를 사용하지 않는다.
- Card는 `Card size="large" interactive`를 재사용한다. `interactive`가 native button, cursor,
  keyboard, focus-visible ring을 소유한다.
- Card 내용에는 환경 설명 placeholder, 불필요한 body, 선택적 식별 아이콘 배경색/추가 좌우 여백을 넣지 않는다.
  리소스 identity, 상태, 위치와 갱신일만 compact하게 보여 준다.
- 선택적 식별 아이콘은 `Card.LeadingVisual size="large"` 안에 `PrivateIcon size="6xl"`을 두며 fallback만
  `Icon size="2xl"`로 둔다. icon image를 `public`에서 개별적으로 직접 읽지 않는다.
- 어플리케이션처럼 사용자가 등록한 리소스 이미지는 같은 leading slot의 44px 안에서 비율을 유지한다.
  인증 이미지 조회와 임시 URL 수명은 페이지 훅이 소유하며, 이미지 없음·조회/디코딩 실패는 공용 Icon으로 대체한다.
- card title/description/location은 긴 한글·영문에서 card 너비를 밀어내지 않게 ellipsis/wrap 규칙을
  공용 Card와 page markup에 맞춰 적용한다.
- 대표 생성일·갱신일처럼 카드마다 날짜가 하나라면 `Card.SubDescription`에 라벨과 함께 둔다.
  SubDescription은 한 줄만 사용하고 같은 카드에 ExtendedHeader를 추가하지 않는다. 위치·분류·유형 등
  나머지 메타데이터는 `Card.Summary` 행으로 이동한다.
  요청일·완료일처럼 여러 날짜가 각각 독립적인 업무 의미를 가지면 `Card.Summary` 행으로 유지한다.
- card 클릭은 table과 동일한 상세 route로 이동한다. interactive Card 안에 또 다른 button/link을
  무심코 중첩하지 않는다.

### 9.2 Card scroll owner

Card view는 `ScrollArea`를 page 폭 전체에 둔다. `cardScrollContent`만 `max-width: var(--layout-band-max)`와
desktop `24px` horizontal padding을 가져, 안쪽 업무 column이 `var(--layout-content-max)`로 정렬된다. 이렇게 하면
content의 좌우 여백 안이 아니라 shell 우측 끝에서 살짝 안쪽에 scrollbar thumb가 나타난다.

```tsx
<div className={styles.cardContentViewport}>
  <ScrollArea
    className={styles.cardScrollArea}
    contentClassName={styles.cardScrollContent}
    type="auto"
    thumbWidth={6}
    onScrollMetricsChange={({ scrollTop }) => setHasScrolled(scrollTop > 0)}
  >
    <div className={styles.cardContent}>{/* toolbar + card list */}</div>
  </ScrollArea>
  <RefreshContentOverlay visible={refreshing} label={overlayLabel} />
</div>
```

Card view의 overlay는 `cardContentViewport`에 둔다. toolbar와 grid가 같은 loading context에 속하므로
overlay를 Card 하나에만 좁게 붙이지 않는다.

## 10. 복사 가능한 page 조립 예시

아래는 도메인명에 의존하지 않는 page-level 예시다. API와 표현 markup은 별도 파일로 분리한다.

```tsx
export function ResourceListPage({ session }: ResourceListPageProps) {
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const [viewMode, setViewMode] = useListViewModePreference(profile.defaultViewMode);
  const [tablePageSize, setTablePageSize] = useState(profile.tablePageSize);
  const [cardPageSize, setCardPageSize] = useState(profile.cardPageSize);
  const [revalidationLabel, setRevalidationLabel] = useState(
    "리소스 목록을 새로고침하고 있습니다.",
  );

  const pageSize = viewMode === "table" ? tablePageSize : cardPageSize;
  const { query, refresh } = useResourceList(session, {
    keyword,
    category,
    page,
    pageSize,
  });
  const refreshing =
    query.status === "loading" ||
    (query.status === "ready" && query.refreshing);
  const rows = query.status === "ready" ? query.data.content : [];
  const total = query.status === "ready" ? query.data.totalElements : 0;
  const overlayLabel =
    query.status === "loading"
      ? "리소스 목록을 불러오는 중입니다."
      : revalidationLabel;

  function changeCategory(value: string) {
    setRevalidationLabel("리소스 목록을 검색 중입니다.");
    setCategory(value);
    setPage(1);
  }

  function changePageSize(value: number) {
    setRevalidationLabel("리소스 목록을 불러오는 중입니다.");
    if (viewMode === "table") setTablePageSize(value);
    else setCardPageSize(value);
    setPage(1);
  }

  function changeViewMode(value: TResourceListViewMode) {
    if (value === viewMode) return;
    setRevalidationLabel("리소스 목록을 불러오는 중입니다.");
    setViewMode(value);
    setPage(1);
  }

  function refreshList() {
    setRevalidationLabel("리소스 목록을 새로고침하고 있습니다.");
    refresh();
  }

  return (
    <main className={styles.page} aria-busy={refreshing}>
      <div className={styles.container}>
        <div className={styles.headerArea}>{/* PageHeader */}</div>
        {/* Table/Card viewport는 현재 viewMode에 맞게 한 가지만 렌더한다. */}
      </div>
    </main>
  );
}
```

이 예시의 변경 handler는 Effect가 아니라 사용자 event에서 page reset과 loading copy를 함께 처리한다.
`rows`, `total`, `refreshing`, `overlayLabel`은 현재 query/page state에서 render 중 파생한다.

## 11. 접근성·권한·오류

- toolbar root는 `role="search"`와 `aria-label="리소스 목록 필터"`를 가진다.
- 인라인 Search는 accessible name을, Popover Search/Dropdown은 보이는 label과 연결된 control name을
  가진다. placeholder만 label로 사용하지 않는다.
- refresh, Filter, view switch처럼 icon-only 또는 짧은 action은 목적을 설명하는 accessible name을
  제공한다. IconButton은 Tooltip도 함께 제공한다.
- loading 상태의 Pagination, SegmentedControl, 선택형 filter, header refresh는 disabled한다. Search는
  자동 재조회 중에도 enabled 상태와 같은 DOM identity를 유지해 입력 focus, caret, IME 조합을 보존한다.
  Search에는 `aria-busy`로 조회 중임을 전달하고, 완료 시 강제로 focus를 복원하지 않는다. 사용자가 다른
  control로 이동했다면 현재 focus를 그대로 유지한다. create action의 disabled 여부는 query loading이
  아니라 권한/업무 정책에 따라 결정한다. mutation·권한처럼 검색 조건 변경 자체를 막아야 하는 상태는
  query busy와 분리한 disabled 계약으로 전달한다.
- 초기 error는 `role="alert"`과 retry Button을 가진 state card로, filtered empty는 `role="status"`의
  별도 empty state로 표현한다. 둘을 같은 “데이터 없음”으로 합치지 않는다. Card 결과는 공용
  `ListContentState`, Table 결과는 헤더를 유지하는 `Table.emptyState`를 사용하며 같은 kind, icon, title,
  description, 복구 action을 전달한다. Card와 Medium Table은 regular(32px icon, 18/28px title,
  14/20px description), Small Table은 compact(24px icon, 14/20px title, 12/16px description)를 사용한다.
- 최초 error config는 `createListErrorState`로 만들고 Card와 Table에 같은 config를 전달한다. retry가
  진행 중이면 action을 disabled하고 `aria-busy="true"`를 함께 전달한다.
- refresh error는 기존 결과를 유지한 채 공용 toast로 한 번만 알린다. 같은 내용을 list 안의 inline
  notice로 중복 표시하지 않으며, raw server message, token, stack을 노출하지 않는다.
- 상세 이동 권한이 없는 row/card는 interactive prop을 주지 않거나, 제품 정책에 맞는 disabled 설명을
  제공한다. API가 최종 권한 검증을 한다.

## 12. 상태 matrix

| 상태              | Table                               | Card                                 | Header/toolbar                  | screen reader                 |
| ----------------- | ----------------------------------- | ------------------------------------ | ------------------------------- | ----------------------------- |
| initial loading   | 빈 frame + list overlay             | 360px placeholder + viewport overlay | Search enabled, action disabled | overlay status + domain label |
| filter searching  | 마지막 Table rows + overlay         | 마지막 grid + overlay                | Search focus/caret 유지         | `검색 중` label               |
| page/view loading | 마지막 결과 또는 빈 shell + overlay | 마지막 grid/placeholder + overlay    | Search enabled, action disabled | `불러오는 중` label           |
| manual refresh    | 마지막 결과 + overlay               | 마지막 grid + overlay                | refresh disabled·icon 회전      | `새로고침 중` label           |
| ready             | rows / `Table.emptyState`           | grid / `ListContentState`            | enabled                         | native table/card semantics   |
| filtered empty    | filtered `Table.emptyState`         | filtered `ListContentState`          | reset enabled                   | 조건 변경 안내                |
| initial error     | header를 유지한 `Table.emptyState`  | `ListContentState` retry surface     | retry/pending disabled          | `role="alert"`                |
| refresh error     | 기존 rows + 공용 toast              | 기존 cards + 공용 toast              | 기존 결과 유지                  | toast alert                   |

## 13. 구현·검증 체크리스트

### 13.1 구현 확인

- [ ] 기본 `viewMode`가 솔루션 profile과 일치하고 card page size가 솔루션 profile과 일치하는가?
- [ ] Header title, toolbar, Table/Card가 같은 var(--layout-content-max) 시작선에 맞는가?
- [ ] Table view에는 nested page vertical scrollbar가 없고, sticky `th`가 Table ScrollArea 안에서만
      움직이는가?
- [ ] Card view scrollbar thumb가 content 여백 안이 아니라 shell 우측에 있는가?
- [ ] Table `th` bottom divider와 scroll 시 header shadow가 공용 Table 그대로 보이는가?
- [ ] 마지막 Table row/frame border가 2px처럼 겹쳐 보이지 않는가?
- [ ] Card grid가 profile의 다열 → 단열로 content-safe하게 바뀌는가?
- [ ] Card 빈 결과의 외곽 frame이 최소 360px을 유지하면서 결과 viewport의 남은 세로 공간을 채우는가?
- [ ] Table/Card의 빈 결과 icon·title·description 크기와 문구가 동일한가?
- [ ] row/card hover가 공용 Table/Card 계약을 중복 override하지 않고 pointer·keyboard detail 이동을
      제공하는가?
- [ ] List filter Dropdown option list는 최대 5개를 보이고 공용 scrollbar로 나머지를 scroll하는가?
- [ ] Filter Popover의 field는 label과 100% width를 가지며 footer reset 위 여백과 좌우 16px padding을
      갖는가?
- [ ] toolbar 폭이 줄어들 때 `inline → category → all` 순서로 전환되고 filter는 다음 줄로 밀리지 않는가?
- [ ] inline/Popover filter가 같은 값과 reset callback을 공유하는가?
- [ ] 검색/선택에는 `검색 중`, 수동 refresh에는 `새로고침 중` overlay copy가 나오는가?
- [ ] 최초 loading 직후 fade-out에 `새로고침 중` 문구가 연속으로 나타나지 않는가?
- [ ] refresh Tooltip이 하나만 존재하고 pending 전환에도 문구/폭이 바뀌지 않으며 icon만 회전하는가?

### 13.2 최소 상태 검증

- [ ] 최초 loading, 0건, filtered empty, initial error/retry, refresh error, ready를 확인했다.
- [ ] initial error의 Table은 column header를 유지하고, Card는 같은 title·description·retry를 표시한다.
- [ ] retry pending 동안 action이 disabled되고 `aria-busy`가 전달되며 중복 요청이 발생하지 않는다.
- [ ] refresh error는 마지막 성공 결과를 유지하고 공용 toast 하나만 표시한다.
- [ ] keyword debounce 중 빠르게 값이 바뀌어도 오래된 response가 최신 rows를 덮지 않는다.
- [ ] 자동 검색 중 Search가 unmount/disabled되지 않고 focus, caret, IME 조합을 유지하며, 사용자가 다른
      control로 이동한 뒤에는 완료 시 focus를 빼앗지 않는다.
- [ ] filter, page size, view mode 변경은 항상 page 1로 이동한다.
- [ ] Table/Card가 각각의 마지막 page size를 기억한다.
- [ ] Pagination total/range가 같은 API response의 total을 기준으로 계산된다.
- [ ] 1440px, toolbar overflow 직전/직후 폭, `solution narrow breakpoint`, 긴 한글/영문, light/dark, 200% zoom,
      reduced motion을 확인했다.
- [ ] keyboard로 Search → Select/Filter → Pagination → view switch → row/card detail 이동을 수행할 수
      있다. 좁은 폭에서는 Filter를 Enter로 연 뒤 검색 입력에 초점이 오고 Tab·Shift+Tab으로 폼 탐색,
      Escape 닫기 및 trigger 초점 복원을 수행할 수 있다.

## 14. 재현 잠금 계약

- **Geometry owner:** `ResourceListPage`만 shell, content width, header wrapper, toolbar/list spacing,
  view별 viewport를 소유한다. Table/Card는 내부 visual·focus·scroll contract만 소유한다.
- **State owner:** query condition, page, pageSize, viewMode, loading copy는 page; network/abort/latest
  response는 page hook; DTO/API는 domain service가 소유한다.
- **Data owner:** static presentation option/column은 route presentation 가까이에, domain enum/status
  mapping과 mock adapter는 domain boundary에 둔다.
- **Responsive owner:** toolbar는 measured intrinsic width로 filter 노출을 결정하고, CardGrid는 `auto-fill`과
  `var(--layout-card-min)` minimum intrinsic column으로 var(--layout-content-max) 업무 content의 profile의 grid track을 보존한다. 둘 다 viewport magic
  number로 항목을 감추지 않는다.
- **Overlay owner:** List viewport에는 `RefreshContentOverlay` 하나만 둔다. query reason을 page가
  label로 변환하며, Table body spinner와 중복하지 않는다.
- **Acceptance baseline:** 선택한 default view, Card의 profile page size, 선택적 식별 아이콘, row/card detail navigation, toolbar
  3단계 전환, pagination presets, sticky Table header, shell-edge Card scroll, initial/filter/refresh overlay를
  모두 충족해야 동일한 List Page UI/UX로 본다.
