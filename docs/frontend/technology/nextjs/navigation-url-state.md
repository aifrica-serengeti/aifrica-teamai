# Next.js Navigation과 URL 상태

## `<Link>`

```tsx
import Link from "next/link";

<Link href={`/projects/${project.id}`}>프로젝트 상세</Link>
```

실제 URL 이동에는 Link를 사용하고 현재 화면 action에는 Button을 사용한다. Link는 client navigation과
prefetch를 제공할 수 있다.

- 의미 있는 link text를 제공한다.
- 새 창이면 사용자에게 알리고 security/referrer 정책을 확인한다.
- object href/query를 만들 때 외부 입력을 그대로 넣지 않는다.
- active 상태는 pathname/segment와 semantic `aria-current="page"`를 함께 사용한다.
- disabled Link를 CSS/pointer-events로 흉내 내지 않는다. 노출하지 않거나 이유를 설명하는 다른 UI를 선택한다.

## prefetch

production에서 viewport/hover 등의 조건으로 route를 prefetch할 수 있다. dynamic route와 Cache Components는
static shell 또는 `loading` boundary 범위만 prefetch될 수 있다.

- 대형 목록의 모든 row link를 공격적으로 prefetch하지 않는다.
- 권한 있는 private data가 prefetch response/cache에 섞이지 않는지 확인한다.
- custom prefetch는 network/save-data/visibility와 cache invalidation을 고려한다.
- development behavior만 보고 production prefetch를 판단하지 않는다.

## `useRouter`

Client Component의 imperative navigation에 사용한다.

```tsx
"use client";

const router = useRouter();

function closeAfterSave(projectId: string) {
  router.replace(`/projects/${projectId}`);
}
```

주요 method:

- `push(href, options?)`
- `replace(href, options?)`
- `refresh()`
- `back()` / `forward()`
- `prefetch(href, options?)`

server render/action에서 가능한 redirect는 `redirect()`를 우선한다. `router.push`에 검증되지 않은 URL을
전달하면 `javascript:` 같은 injection 위험이 있으므로 application-owned relative path builder를 사용한다.

`refresh()`는 client router cache를 갱신하고 Server Component payload를 merge하지만 browser local state/scroll
보존과 data cache freshness는 별개다. mutation owner의 tag/path invalidation을 먼저 설계한다.

## `usePathname`

```tsx
const pathname = usePathname();
const active = pathname === href || pathname.startsWith(`${href}/`);
```

Client Component Hook이다. rewrite/proxy로 server HTML의 URL과 browser URL이 다르면 hydration mismatch를
피하도록 stable fallback을 설계한다. string prefix만으로 `/project`와 `/projects`를 혼동하지 않는다.

## `useSearchParams`

read-only `URLSearchParams` view를 반환한다.

```tsx
const searchParams = useSearchParams();
const query = searchParams.get("q") ?? "";
```

- update하려면 새 `URLSearchParams(searchParams.toString())`를 만들고 router/Link/Form으로 navigate한다.
- static prerender route에서 이 Hook을 사용하는 Client subtree는 Suspense boundary가 필요할 수 있다.
- Server Page는 `searchParams` prop을 await해 server data owner를 유지하는 편이 적합할 수 있다.
- array/multi-value, empty와 missing을 domain parser에서 구분한다.

## URL update helper

```tsx
function setQuery(nextQuery: string) {
  const next = new URLSearchParams(searchParams.toString());
  if (nextQuery) next.set("q", nextQuery);
  else next.delete("q");
  next.delete("page");
  router.replace(`${pathname}?${next.toString()}`, { scroll: false });
}
```

자신이 소유하지 않은 parameter를 보존한다. filter 변경 시 pagination reset처럼 연관 owner 정책을 명시한다.
typing마다 navigation할지 debounce/submit할지 accessibility와 server load를 고려한다.

## `<Form>` from `next/form`

GET search/navigation form은 string action으로 client navigation과 prefetch를 사용할 수 있다.

```tsx
import Form from "next/form";

<Form action="/projects">
  <label htmlFor="q">검색</label>
  <input id="q" name="q" />
  <button type="submit">검색</button>
</Form>
```

function action을 전달하면 React form/Server Action semantics를 따른다. native form과 다른 지원 prop/behavior가
있으므로 설치 package reference를 확인한다. upload, custom method, external action에는 native form/Route Handler가
더 맞을 수 있다.

## `useParams`

Client Component에서 현재 dynamic params를 읽는다.

```tsx
const { projectId } = useParams<{ projectId: string }>();
```

type generic은 runtime validation이 아니다. page/server owner가 이미 검증해 primitive prop으로 전달할 수 있으면
그 방식이 더 명확하다. catch-all param은 string array일 수 있다.

## selected layout segment Hooks

`useSelectedLayoutSegment(parallelRoutesKey?)`와 `useSelectedLayoutSegments(parallelRoutesKey?)`는 calling layout
아래 active segment를 읽는다. navigation tab/breadcrumb가 route tree를 표현할 때 사용한다.

- route group이 반환 segment에 미치는 영향을 확인한다.
- URL parsing을 대체하는 generic business state로 사용하지 않는다.
- page 전체 active logic을 여러 component에 복제하지 않는다.

## `useLinkStatus`

Link 자손에서 pending navigation 상태를 표시하는 최신 Hook이다. 설치된 Next minor와 Link integration을 확인한다.

```tsx
function LinkLabel({ children }: { children: React.ReactNode }) {
  const { pending } = useLinkStatus();
  return <span aria-busy={pending}>{children}</span>;
}
```

pending 중 link text를 제거하지 않고 상태를 보조적으로 전달한다. 모든 link에 spinner를 붙여 visual noise를
만들지 않는다.

## back/forward와 unsaved changes

browser history 차단은 platform 제약이 있으므로 다음을 구분한다.

- same-app link/button navigation
- browser back/forward
- tab close/reload
- form submission 중 navigation

`beforeunload`는 필요한 dirty state에만 등록하고 generic custom message가 표시된다고 가정하지 않는다. 저장된
상태에서는 즉시 해제한다. route modal close에 `router.back()`만 쓰면 history가 없는 direct entry에서 다른
site로 갈 수 있으므로 safe fallback path를 둔다.

## focus와 scroll

- route navigation 후 page heading/main focus 정책을 design system과 맞춘다.
- hash target과 sticky header offset을 확인한다.
- `scroll: false`는 사용자가 맥락을 유지해야 할 filter update 등에 제한한다.
- modal/intercepting route close 후 trigger focus를 복구한다.
- pending navigation에서 현재 control을 갑자기 제거하지 않는다.

## 검증

- Link/Button semantic이 올바른가?
- URL이 filter/sort/page/view state를 복원 가능한가?
- 다른 owner의 search param을 보존하는가?
- back/forward와 direct reload 결과가 같은가?
- prefetch가 private/high-cardinality data를 과도하게 요청하지 않는가?
- navigation pending, focus와 scroll이 keyboard 사용자에게 자연스러운가?
