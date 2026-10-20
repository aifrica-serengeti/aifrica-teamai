# Next.js 렌더링과 Server/Client 경계

## Server Component 기본값

App Router의 component는 기본적으로 Server Component다. server data/secret에 가깝고 browser interaction이
필요 없는 UI를 server에 둔다.

Server에 적합한 책임:

- database/API fetch와 authorization 가까운 read
- secret/credential이 필요한 integration
- 큰 비상호작용 library와 markdown/content transformation
- metadata와 route shell
- client에 전달할 최소 view model 생성

Client에 필요한 책임:

- event handler
- `useState`, `useReducer`, Effect와 browser-only Hook
- DOM/browser API와 third-party widget
- client Context provider
- immediate local interaction

## `'use client'`

```tsx
"use client";

import { useState } from "react";

export function ProjectTabs() {
  const [tab, setTab] = useState("overview");
  return <Tabs value={tab} onValueChange={setTab} />;
}
```

directive는 모든 client file에 붙이는 표식이 아니라 server가 직접 import하는 client entry boundary다. 그
파일의 import graph와 렌더 subtree에 필요한 client JavaScript가 포함된다.

- page 전체를 편의상 client로 만들지 않는다.
- type-only import도 bundler/transform 결과를 확인한다.
- server-only module을 client graph에서 import하지 않는다.
- Client Component가 Server Component를 module import할 수는 없지만 server가 만든 `children`/slot을 client
  wrapper에 전달하는 composition은 가능하다.

## serializable props

Server에서 Client Component로 전달하는 값은 RSC serializer가 지원해야 한다.

피해야 할 값:

- database connection/ORM entity method
- class instance와 prototype behavior
- 일반 function/callback
- secret/token
- 거대한 raw response

Server Function reference는 framework가 특별히 직렬화하는 계약이며 일반 function prop과 다르다. Date, Map,
Set 등의 지원은 설치된 React/Next 문서를 확인하고 public boundary에는 명시적 view model을 선호한다.

## server-only와 client-only

server module에서 `server-only` marker를 사용해 client import를 build error로 만들 수 있다. browser-only module은
client 경계를 명확히 한다. marker가 authorization을 수행하거나 secret을 자동 삭제하는 것은 아니다.

```ts
import "server-only";

export function getDatabaseUrl() {
  const value = process.env.DATABASE_URL;
  if (!value) throw new Error("DATABASE_URL이 필요합니다.");
  return value;
}
```

## rendering 시점

각 subtree를 다음으로 분류한다.

- build/prerender 가능한 static shell
- cache된 shared content
- request 정보가 필요한 dynamic content
- browser interaction 뒤의 client state

request API 사용, `connection()`, Cache Components와 Suspense boundary가 prerender 결과에 미치는 영향을 설치
버전 기준으로 확인한다. “Server Component = 요청마다 실행” 또는 “fetch = 자동 cache” 같은 과거 기억을 쓰지
않는다.

## streaming과 Suspense

```tsx
export default function Page() {
  return (
    <ProjectShell>
      <Suspense fallback={<ProjectSummarySkeleton />}>
        <ProjectSummary />
      </Suspense>
      <Suspense fallback={<AuditSkeleton />}>
        <AuditLog />
      </Suspense>
    </ProjectShell>
  );
}
```

독립적으로 느린 subtree를 streaming boundary로 나눈다.

- heading와 page purpose는 가능한 shell에 둔다.
- 작은 boundary 남발로 loading flash와 server work를 늘리지 않는다.
- fallback geometry와 accessible status를 설계한다.
- 오류 owner는 `error.tsx` 또는 더 가까운 Error Boundary다.
- request data를 읽는 uncached subtree는 Cache Components 환경에서 Suspense 요구가 생길 수 있다.

## async Server Component

```tsx
async function ProjectSummary({ projectId }: { projectId: string }) {
  const project = await getProject(projectId);
  return <Summary project={toProjectSummary(project)} />;
}
```

독립 요청은 순차 await하지 않는다.

```tsx
const projectPromise = getProject(projectId);
const permissionPromise = getPermission(projectId);
const [project, permission] = await Promise.all([projectPromise, permissionPromise]);
```

하지만 두 번째 요청이 첫 결과를 필요로 하면 dependency 순서를 유지한다. database transaction과 rate limit도
무시하지 않는다.

## preload pattern

React cache/data layer와 결합해 route 위쪽에서 Promise를 일찍 시작할 수 있다.

```ts
export const preloadProject = (id: string) => {
  void getProject(id);
};
```

실제 memoization/dedupe가 없는 함수에 preload를 호출하면 중복 request가 될 수 있다. framework fetch와 React
cache 계약을 확인한다.

## `connection()`

```tsx
import { connection } from "next/server";

export default async function Page() {
  await connection();
  return <p>요청 시각: {new Date().toISOString()}</p>;
}
```

incoming request가 있어야 평가할 값을 명시하며 아래 subtree를 build-time prerender에서 제외한다. cache가
이해되지 않는다는 이유로 route 전체를 dynamic하게 만드는 escape hatch로 사용하지 않는다.

## hydration 경계

Client Component의 첫 render는 server output과 일치해야 한다.

- localStorage/media query를 render 중 바로 읽어 다른 HTML을 만들지 않는다.
- locale/timezone이 server와 client에서 다를 수 있음을 고려한다.
- invalid HTML nesting을 피한다.
- random id 대신 React `useId` 또는 server-provided id를 사용한다.
- hydration warning을 `suppressHydrationWarning`으로 광범위하게 숨기지 않는다.

## Provider 배치

provider는 실제 client subtree에 가능한 깊게 둔다. root layout 전체를 Client Component로 만들 필요가 없다.

```tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
```

server-fetched page data를 전역 client provider에 복제하지 않는다. query cache hydration이 필요하면 library의
공식 boundary와 serialization을 사용한다.

## runtime 선택

Next.js 16 `proxy`는 Node.js runtime이다. route/page의 Node/Edge 지원과 dependency 호환성은 설치 version을
확인한다. native Node module, filesystem, database driver는 Edge에서 동작하지 않을 수 있다. runtime을 낮은
latency라는 이유만으로 바꾸지 말고 region, connection, cold start와 library 지원을 측정한다.

## 점검표

- client boundary가 interaction island의 가장 낮은 entry인가?
- server-only secret/module이 client graph에 없는가?
- props가 최소·직렬화 가능 view model인가?
- independent data fetch가 불필요하게 waterfall되지 않는가?
- Suspense boundary가 사용자에게 의미 있는 reveal 단위인가?
- hydration 첫 render가 server output과 같은가?
- runtime 선택이 dependency/deployment와 맞는가?
