# Next.js 로컬 적용 기준

> 마지막 공식 확인: 2026-08-12  
> 스냅샷 기준: Next.js 16.3 App Router · npm latest 관찰 `16.3.0`  
> 일반 작업: 이 문서와 [Next.js 상세 지식 팩](./nextjs/README.md)을 사용하며 최신성 확인을 위한 인터넷 검색 금지

## 버전과 적용 범위

이 문서는 최신 관찰 기준을 로컬에 요약한다. 작업 전 `package.json`, lockfile, `next.config.*`, route
구조와 배포 runtime을 확인한다. Pages Router 프로젝트를 App Router 규칙으로 즉시 바꾸거나 설치 버전에
없는 API를 사용하지 않는다.

이 파일은 version gate와 Aifrica 적용 결정을 제공하는 상위 guide다. directives·components·file
conventions·functions·security·testing의 상세 지식은 [Next.js 16.3 상세 지식 팩](./nextjs/README.md)에서
작업 종류에 맞는 파일을 선택해 읽는다. 실제 Next.js 16.2 계열 이후 package에
`node_modules/next/dist/docs/`가 있으면 설치 exact version의 signature는 그 bundled docs를 먼저 따른다.

Next.js 16 기준 주요 호환성 메모:

- Node.js 최소 `20.9.0`
- TypeScript 최소 `5.1.0`
- 기본 browser baseline: Chrome/Edge 111+, Firefox 111+, Safari 16.4+
- `next dev`와 `next build`의 기본 bundler는 Turbopack
- request-time `params`, `searchParams`, `cookies`, `headers`, `draftMode`의 동기 접근 제거
- `middleware` convention은 `proxy`로 이름이 변경·deprecated 되었으며 Node.js runtime을 사용
- `next lint` 제거; ESLint 또는 Biome CLI를 별도 script로 실행

이는 migration 참고 정보이며 현재 프로젝트를 자동 업그레이드하는 명령이 아니다.

## 최신 지식 주입: Next.js 16.x

AI는 App Router 작업에서 아래 API를 후보로 알고, 설치된 minor와 `next.config.*` 설정을 확인한 뒤
사용한다.

| API·규칙 | 용도 | 필수 조건·주의 |
| --- | --- | --- |
| async `params` / `searchParams` | 동적 route와 URL query 읽기 | Next.js 16에서 반드시 await |
| async `cookies()` / `headers()` / `draftMode()` | request-time 정보 읽기 | 호출한 route는 request-time 성격을 가짐 |
| `"use cache"` | function/component 결과 cache | `cacheComponents: true` |
| `cacheLife()` | stale/revalidate/expire 명시 | cached scope 안에서 사용 |
| `cacheTag()` | cache entry에 invalidation tag 부여 | tag cardinality와 user isolation 주의 |
| `updateTag()` | mutation 직후 read-your-writes | Server Action 전용 |
| `revalidateTag(tag, profile)` | stale-while-revalidate | 약간의 stale 허용 content |
| `refresh()` | Server Action에서 client router 새로고침 | broad refresh보다 targeted tag 우선 |
| `connection()` | build-time prerender를 끊고 request-time render | 실제 request 의존성이 있을 때 |
| `after()` | response 이후 logging/side task | deployment lifetime·실패 관측 필요 |
| `proxy.ts` | redirect/rewrite/header 등 request 전처리 | Node.js runtime, 최종 인가 대체 금지 |
| generated route types | `PageProps`, `LayoutProps`, `RouteContext` | `next typegen`/build로 생성 |

### async route props

Next.js 16의 page `params`와 `searchParams`는 Promise다.

```tsx
type Props = PageProps<"/projects/[projectId]">;

export default async function ProjectDetailPage({ params, searchParams }: Props) {
  const { projectId } = await params;
  const query = await searchParams;
  const tab = typeof query.tab === "string" ? query.tab : "overview";
  const project = await getProject(projectId);

  return <ProjectDetail project={project} activeTab={tab} />;
}
```

generated global helper를 쓰지 않는 프로젝트에서는 Promise shape를 직접 선언한다.

```tsx
interface PageProps {
  params: Promise<{ projectId: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}
```

- `params.projectId`처럼 동기 접근하지 않는다.
- query를 domain value로 사용하기 전에 string/string[]/undefined를 validation·normalization한다.
- Client Component가 Promise prop을 받는 특별한 구조가 아니라면 server page에서 await하고 좁은 value만
  전달한다.

Request API도 await한다.

```tsx
import { cookies, headers } from "next/headers";

export async function getRequestContext() {
  const cookieStore = await cookies();
  const headerStore = await headers();
  return {
    locale: cookieStore.get("locale")?.value ?? "ko",
    requestId: headerStore.get("x-request-id"),
  };
}
```

### Cache Components와 `"use cache"`

먼저 설정이 켜졌는지 확인한다.

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
};

export default nextConfig;
```

Cache owner를 독립 함수로 만들고 lifetime과 tag를 함께 보이게 한다.

```tsx
import { cacheLife, cacheTag } from "next/cache";

export async function getProject(projectId: string) {
  "use cache";
  cacheTag(`project:${projectId}`);
  cacheLife({
    stale: 60,
    revalidate: 300,
    expire: 3600,
  });

  return projectRepository.findById(projectId);
}
```

`cacheLife`의 의미:

- `stale`: client router가 server 확인 없이 cached result를 사용할 수 있는 시간
- `revalidate`: 이 시간이 지나면 cached result를 먼저 주고 background 갱신을 시작하는 기준
- `expire`: 오래 사용되지 않은 entry가 다음 요청에서 fresh result를 기다려야 하는 최대 기준

`expire`는 `revalidate`보다 길어야 한다. 숫자는 초 단위다. 프로젝트 preset을 정의했다면
`cacheLife("minutes")`처럼 이름을 쓸 수 있지만, product freshness가 중요한 데이터는 inline 의미를
문서로 드러낸다.

- user/tenant/permission별 결과가 같은 cache entry에 섞이지 않게 key argument와 tag를 설계한다.
- cookie/header 같은 request data를 cached scope 안에서 직접 읽지 않는다. 필요한 primitive를 검증해
  argument로 전달하고 private data caching 정책을 별도로 확인한다.
- missing result도 cache될 수 있으므로 “곧 생길 수 있는 데이터”는 짧은 lifetime을 선택한다.
- cache tag에 secret과 개인 정보를 넣지 않는다.

### `updateTag`와 `revalidateTag` 선택

사용자가 수정 직후 자신의 변경을 즉시 봐야 하면 Server Action에서 `updateTag`를 사용한다.

```tsx
"use server";

import { updateTag } from "next/cache";

export async function updateProject(projectId: string, input: UpdateProjectInput) {
  const actor = await requireUser();
  await assertCanEditProject(actor, projectId);
  const validated = updateProjectSchema.parse(input);
  await projectRepository.update(projectId, validated);
  updateTag(`project:${projectId}`);
  return { ok: true } as const;
}
```

여러 사용자가 보는 catalogue/content처럼 stale result를 잠시 보여도 되면 stale-while-revalidate를 사용한다.

```tsx
"use server";

import { revalidateTag } from "next/cache";

export async function publishArticle(articleId: string) {
  await articleRepository.publish(articleId);
  revalidateTag(`article:${articleId}`, "max");
}
```

선택 규칙:

- `updateTag`: Server Action 전용, 현재 mutation의 read-your-writes
- `revalidateTag(tag, "max")`: stale content를 즉시 반환하고 background refresh 허용
- `refresh()`: 특정 data tag가 아니라 현재 client router tree의 uncached data를 다시 읽어야 할 때
- `revalidatePath()`: route path 단위 invalidation이 진짜 ownership일 때

저장할 때마다 `refresh()`와 여러 revalidation을 모두 호출하지 않는다. data owner와 사용자 일관성 요구에
맞는 최소 invalidation을 선택한다.

### Server Action의 validation·권한·typed result

```tsx
"use server";

type CreateState =
  | { status: "idle" }
  | { status: "error"; fieldErrors?: Record<string, string>; message: string }
  | { status: "success"; projectId: string };

export async function createProject(
  _previous: CreateState,
  formData: FormData,
): Promise<CreateState> {
  const user = await requireUser();
  await assertCanCreateProject(user);

  const result = createProjectSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
  });

  if (!result.success) {
    return { status: "error", fieldErrors: flattenErrors(result.error), message: "입력을 확인하세요." };
  }

  const project = await projectRepository.create(result.data);
  return { status: "success", projectId: project.id };
}
```

- `"use server"`는 이 함수가 신뢰 가능한 입력을 받는다는 뜻이 아니다.
- authentication, resource authorization, schema validation, rate/idempotency 정책을 server에서 수행한다.
- 예상 가능한 field/form 오류는 serializable union으로 반환하고 예상하지 못한 오류는 error boundary와
  server logging으로 보낸다.
- Server Action reference를 client에 전달할 수 있어도 secret data와 server object는 전달하지 않는다.

### `connection()`으로 request-time render 명시

random, current time 또는 외부 request 시점 값처럼 build-time prerender와 분리해야 하지만 cookies/headers
같은 다른 dynamic API가 없는 경우 사용한다.

```tsx
import { connection } from "next/server";

export default async function RequestTimePage() {
  await connection();
  const generatedAt = new Date().toISOString();
  return <time dateTime={generatedAt}>{generatedAt}</time>;
}
```

단순히 cache가 이해되지 않는다는 이유로 넣지 않는다. static 가능 content를 의도 없이 dynamic하게 만들 수
있다.

### `after()`의 response 이후 작업

```tsx
import { after } from "next/server";

export async function POST(request: Request) {
  const result = await handleWebhook(request);
  after(async () => {
    await auditDelivery(result.deliveryId);
  });
  return Response.json({ ok: true });
}
```

- 사용자 응답에 필수인 DB write, transaction, authorization을 `after`로 미루지 않는다.
- deployment가 제공하는 실행 lifetime과 retry 보장을 확인한다.
- 실패를 관측할 log/queue가 있어야 하며 process memory에만 중요한 작업을 맡기지 않는다.

### `proxy.ts`

```ts
import { NextResponse, type NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  if (request.nextUrl.pathname === "/legacy") {
    return NextResponse.redirect(new URL("/projects", request.url));
  }
  return NextResponse.next();
}

export const config = { matcher: ["/legacy"] };
```

Next.js 16에서 `middleware` 이름은 deprecated되어 `proxy`로 이동했다. `proxy`는 Node.js runtime이며 Edge
runtime을 가정하지 않는다. coarse route check를 하더라도 실제 data mutation/read 권한은 server owner에서
다시 검사한다.

## App Router 파일 책임

- `layout`: segment 사이에서 유지되는 공통 UI와 provider 조립
- `page`: route의 실제 화면과 server data 조립
- `loading`: route segment가 suspend될 때 즉시 보일 fallback
- `error`: 해당 segment의 예상하지 못한 render/data 오류 경계; Client Component
- `not-found`: 리소스를 찾지 못한 상태
- `route`: HTTP endpoint; UI page와 같은 segment에서 충돌하지 않게 설계
- `template`: navigation마다 새 instance가 필요한 경우에만 사용
- `default`: parallel route가 직접 매치되지 않을 때의 fallback
- `proxy`: request 이전의 network/routing 경계; 일반 business logic 저장소가 아님

route group, parallel/intercepting route는 URL과 modal/navigation 요구가 분명할 때만 사용한다. 디렉터리
트릭으로 단순 page state를 해결하지 않는다.

## Server Component와 Client Component

Server Component를 기본으로 선택한다.

Server에 두기 좋은 책임:

- database/API에 가까운 data fetching
- secret을 사용하는 server integration
- 큰 비상호작용 dependency와 content transformation
- metadata와 초기 route shell
- client에 필요한 최소 serializable model 생성

Client Component가 필요한 책임:

- click/input 등 event handler
- `useState`, `useReducer`, lifecycle Hook
- browser API, DOM measurement, local storage
- client-only third-party widget
- 사용자 interaction을 위한 context provider

`"use client"`는 파일 하나의 표시가 아니라 그 파일 아래 import graph의 client boundary다. page 전체를
편의상 client로 만들지 말고 interaction island의 가장 낮은 entry에 둔다. server-only module과 secret이
client graph에 포함되지 않게 확인한다.

## 데이터 읽기

- 데이터는 필요한 route 또는 가장 가까운 server owner에서 읽는다.
- 동일 요청 중 중복 fetch가 dedupe되는지와 외부 SDK 호출이 별도 memoization을 요구하는지 구분한다.
- 순차 fetch가 진짜 의존 관계인지 확인하고 독립 요청은 병렬화한다.
- 느린 subtree는 Suspense boundary로 분리하되 layout shift, heading, focus와 오류 위치를 고려한다.
- browser에서 다시 가져와야 하는 이유가 없다면 초기 server data를 client Effect로 중복 fetch하지 않는다.
- DB entity를 그대로 client로 보내지 말고 필요한 field만 serializable view model로 전달한다.

## Cache와 revalidation

Next.js cache 기본값은 version과 설정에 따라 달라질 수 있으므로 기억만으로 결정하지 않는다. 현재
설치 버전과 `cacheComponents` 사용 여부를 확인하고 다음 질문에 답한다.

1. 데이터가 request마다 달라야 하는가, 사용자별인가, 공개 공유 가능한가?
2. 시간 기반 freshness가 필요한가, mutation 직후 즉시 일관성이 필요한가?
3. route 단위인가, data/tag 단위인가?
4. stale UI를 허용하는가, 사용자는 저장 직후 무엇을 기대하는가?

- Cache Components는 설정을 명시적으로 켠 프로젝트에서만 해당 모델을 적용한다.
- `cacheLife`, `cacheTag`, `updateTag`, `revalidateTag`, `refresh`는 설치 버전과 실제 cache owner를 확인한다.
- 사용자별·권한별 응답이 공유 cache key에 섞이지 않게 한다.
- mutation 후 무조건 전체 route refresh를 사용하지 말고 필요한 invalidation 범위를 선택한다.
- cache는 권한 검사의 대체물이 아니다.

## Mutation, Server Action과 Route Handler

- Server Action은 UI mutation에 가깝고 server-only 실행이 필요한 흐름에 사용한다.
- Route Handler는 외부 client, webhook, 명시적 HTTP API가 필요한 경계에 사용한다.
- 두 경계 모두 authentication, authorization, input validation, CSRF/origin 요구, rate limit과 audit을
  server에서 다시 적용한다.
- action argument와 `FormData`를 신뢰하지 않고 runtime validation한다.
- pending, duplicate submit, field/form error, optimistic rollback과 성공 후 cache 반영을 UI에 모델링한다.
- 예상 가능한 validation error와 예상하지 못한 server exception을 구분한다.
- redirect와 revalidation의 실행 순서를 명확히 하고 실패 응답을 잃지 않는다.

## Request-time API

Next.js 16에서는 다음 값의 동기 접근을 사용하지 않는다.

- page의 `params`, `searchParams`
- layout, page, route, metadata/image convention의 `params`
- `cookies()`, `headers()`, `draftMode()`

현재 프로젝트가 이전 major면 해당 버전 signature를 따른다. migration할 때는 type generation과 공식
codemod 결과를 검토하고 generated `PageProps`, `LayoutProps`, `RouteContext` 사용 가능 여부를 확인한다.

## Loading, error와 not-found

- route 최초 전환 fallback은 `loading`, page 내부의 기존 content 재조회는 page refresh state가 맡는다.
- `error` boundary는 사용자가 복구할 retry와 안전한 navigation을 제공한다.
- 예상 가능한 API 실패를 모두 throw해 전역 오류 화면으로 보내지 않는다.
- 존재하지 않는 resource는 not-found, 권한 없음은 forbidden/authorization 정책으로 구분한다.
- root/global 오류에서 html/body와 핵심 navigation 복구 가능성을 확인한다.
- fallback은 실제 content 구조와 비슷하게 만들되 skeleton이 가짜 정보를 전달하지 않게 한다.

## Metadata, image, font와 script

- route metadata는 static 또는 server data에 맞는 generation 방식을 사용한다.
- title, description, canonical, robots, social image의 ownership을 layout/page 사이에서 중복하지 않는다.
- framework의 Image를 사용할 때 실제 width/height 또는 responsive `sizes`를 제공하고 CLS와 remote source
  allowlist를 확인한다.
- Next.js 16에서 local image query string은 명시적 local pattern이 필요할 수 있고 image quality allowlist와
  cache TTL 기본값이 바뀌었으므로 migration 시 설정을 검토한다.
- font loader로 필요한 weight/subset만 제공하고 fallback과 preload 비용을 확인한다.
- third-party script는 strategy, consent, CSP와 failure 영향이 명확할 때 추가한다.

## Navigation과 URL 상태

- Link는 실제 navigation에, Button은 현재 화면 action에 사용한다.
- filter/sort/page처럼 공유·복원 가능한 상태는 URL ownership을 우선 검토한다.
- search parameter 갱신 시 다른 owner의 parameter를 의도 없이 제거하지 않는다.
- navigation pending, scroll restoration, focus 이동과 unsaved changes를 함께 설계한다.
- redirect target과 callback URL은 open redirect가 되지 않도록 allowlist/normalization한다.

## Proxy와 runtime

- `proxy.ts`는 redirect, rewrite, header, coarse access routing 같은 request 전처리에 제한한다.
- database business logic, 느린 외부 호출, page-specific mutation을 proxy에 두지 않는다.
- client에서 메뉴를 숨기는 것과 proxy에서 route를 막는 것만으로 최종 인가를 대체하지 않는다.
- Edge/Node runtime 지원은 설치 버전과 dependency compatibility를 확인한다. Next.js 16의 `proxy`는 Node.js
  runtime이며 Edge 전환을 가정하지 않는다.

## 성능과 관측

- Server/Client boundary, request waterfall, cache hit/miss, response size와 Core Web Vitals를 관찰한다.
- route 전체 client 전환, 큰 provider, barrel import와 무거운 third-party library를 경계한다.
- streaming boundary를 너무 잘게 나눠 loading flash와 request 수를 늘리지 않는다.
- `next build`의 과거 bundle metric만으로 판단하지 말고 실제 route transfer와 사용자 지표를 측정한다.
- image/font/script 최적화는 시각 회귀와 browser test를 포함한다.

## 보안 기준

- secret은 server-only environment와 module에 둔다. `NEXT_PUBLIC_` 값은 공개 정보로 취급한다.
- Client Component, serialized props, source map, error, log에 secret·token·개인 정보를 포함하지 않는다.
- 인증된 사용자라는 사실과 특정 resource action 권한을 분리해 server에서 검사한다.
- Server Action, Route Handler, proxy의 trust boundary를 각각 검토한다.
- CSP, cookie flags, redirect, upload, image remote pattern과 cache isolation을 deployment 환경까지 확인한다.

## Next.js 16 migration 체크

- [ ] Node.js, TypeScript, React와 browser baseline 충족
- [ ] async request API로 전환
- [ ] custom webpack과 기본 Turbopack 충돌 확인
- [ ] `next lint` script를 ESLint/Biome CLI로 전환
- [ ] middleware/proxy runtime과 naming 검토
- [ ] Cache Components/PPR 설정을 자동으로 가정하지 않음
- [ ] image local pattern, qualities, TTL 검토
- [ ] removed runtime config/AMP/legacy option 확인
- [ ] codemod diff, typecheck, lint, test, build와 배포 smoke test

## 일반 구현 체크리스트

- [ ] 실제 Next.js/React/Node 설정을 확인했다.
- [ ] Server/Client boundary가 최소 범위다.
- [ ] data/cache/mutation owner와 freshness가 명확하다.
- [ ] loading/error/not-found/forbidden 책임이 중복되지 않는다.
- [ ] server trust boundary에서 auth·validation을 수행한다.
- [ ] metadata/image/font/navigation을 framework 계약에 맞게 사용한다.
- [ ] route test, typecheck, lint, build를 실행했다.

## 공식 source 기록

- [App Router getting started](https://nextjs.org/docs/app/getting-started)
- [Installation and requirements](https://nextjs.org/docs/app/getting-started/installation)
- [Next.js 16 upgrade guide](https://nextjs.org/docs/app/guides/upgrading/version-16)
- [Next.js releases and security](https://nextjs.org/blog)

이 링크는 스냅샷의 출처다. 일반 작업 중 다시 열지 않으며 사용자가 업데이트를 요청한 경우에만
`$aifrica-frontend-docs`로 확인한다.
