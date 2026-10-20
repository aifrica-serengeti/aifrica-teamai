# Next.js 데이터·Cache Components·Revalidation

## 과거 기본값을 기억으로 적용하지 않는다

Next.js cache 모델은 major와 설정에 따라 달라졌다. 작업 전에 다음을 확인한다.

- 설치된 Next.js exact version
- `cacheComponents` 설정
- `fetch` option과 data library
- hosting/self-hosting cache handler
- static export 여부
- 사용자/tenant/permission isolation

## 데이터 읽기 질문

1. request마다 달라야 하는가?
2. 사용자별/tenant별/private data인가?
3. 모든 사용자에게 공유 가능한가?
4. 얼마 동안 stale content를 허용하는가?
5. mutation 직후 read-your-writes가 필요한가?
6. invalidation owner가 data tag인가 route path인가?

## Cache Components 활성화

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
};

export default nextConfig;
```

설정 변경은 rendering/cache architecture migration이므로 일반 page 작업에서 임의로 켜지 않는다.

## `'use cache'`

file, async component 또는 function의 결과를 cacheable하게 표시한다.

```tsx
import { cacheLife, cacheTag } from "next/cache";

export async function getProject(projectId: string) {
  "use cache";
  cacheTag(`project:${projectId}`);
  cacheLife({ stale: 60, revalidate: 300, expire: 3600 });
  return projectRepository.findById(projectId);
}
```

cache key에는 build id, function identity와 직렬화 가능한 argument/closure 값이 관여한다. JSX를 return할 수
있더라도 cache function argument의 serializer는 더 제한적일 수 있다.

- cookies/headers 같은 request API를 cached scope 안에서 직접 읽지 않는다.
- 필요한 primitive/shared dimension을 밖에서 검증해 argument로 전달한다.
- user-specific 결과가 shared cache entry에 섞이지 않게 한다.
- high-cardinality search/user id cache는 hit rate와 storage 비용을 악화시킨다.
- static export에서는 지원되지 않는 cache mode를 확인한다.

## `cacheLife`

```ts
cacheLife({
  stale: 30,
  revalidate: 300,
  expire: 3600,
});
```

| 값 | 의미 |
| --- | --- |
| `stale` | client router가 server 확인 없이 cached result를 사용할 수 있는 시간 |
| `revalidate` | stale result를 제공하면서 background refresh를 시작할 기준 |
| `expire` | 다음 요청이 fresh result를 기다려야 하는 최대 만료 기준 |

`expire`는 `revalidate`보다 길어야 한다. preset 이름을 사용할 수 있지만 product freshness가 중요한 data는
의도를 문서화한다. 단위와 defaults를 설치 package 문서에서 확인한다.

## `cacheTag`

```ts
cacheTag("projects", `project:${projectId}`);
```

한 cache entry에 여러 tag를 부여할 수 있다. tag naming은 public identifier만 사용하고 secret/PII를 넣지
않는다. tag 길이/개수 제한은 설치 버전 문서를 확인한다. tenant 분리가 필요하면 cache key와 data access
authorization을 함께 설계하고 tag만 security boundary로 믿지 않는다.

## `'use cache: private'`

request API를 직접 읽는 per-client cache가 필요한 제한된 경우의 directive다.

```tsx
async function getPersonalizedDashboard() {
  "use cache: private";
  const cookieStore = await cookies();
  const locale = cookieStore.get("locale")?.value ?? "ko";
  cacheLife({ stale: 30, revalidate: 60, expire: 300 });
  return dashboardRepository.getPersonalized(locale);
}
```

- `cacheComponents`와 설치 minor support를 확인한다.
- server-side shared cache가 아니라 client-private model이라는 차이를 이해한다.
- compliance/privacy 때문에 truly private scope가 필요하거나 request data를 argument로 refactor할 수 없을 때만
  검토한다.
- session/token 자체를 cache key나 output에 노출하지 않는다.
- platform/CDN/browser behavior를 배포 환경에서 검증한다.

일반적으로 cookie에서 language 같은 낮은 cardinality preference를 읽고 shared cached function argument로
전달하는 편이 재사용성이 좋다.

## `'use cache: remote'`

in-memory cache 대신 모든 server instance가 공유하는 remote handler에 저장한다.

```tsx
async function getLocalizedCatalogue(locale: string) {
  "use cache: remote";
  cacheTag(`catalogue:${locale}`);
  cacheLife({ revalidate: 300, expire: 3600 });
  return catalogueApi.read(locale);
}
```

적합한 경우:

- rate-limited upstream
- serverless instance 사이 공유가 필요한 expensive query
- remote lookup latency보다 origin 부하 회피 가치가 큼
- 적은 수의 재사용 가능한 cache key

피할 경우:

- 50ms 미만 local operation
- request마다 거의 unique한 key
- 초 단위로 자주 변하는 data
- 이미 data layer에 shared cache가 있음
- platform에 remote handler가 없거나 비용/latency를 모름

`cacheHandlers` 설정과 hosting support를 확인한다. remote/private nesting 규칙이 있으므로 설치 package 문서를
따른다. private와 remote scope를 임의 중첩하지 않는다.

## `fetch`

server `fetch`의 cache behavior를 과거 Next 버전 기억으로 추측하지 않는다. 호출부에서 의도를 명시하고 현재
Cache Components model과 조합을 확인한다.

```tsx
const response = await fetch("https://api.example.com/projects", {
  signal,
  cache: "no-store",
});
```

```tsx
const response = await fetch("https://api.example.com/catalogue", {
  next: { tags: ["catalogue"] },
});
```

- non-2xx는 자동 throw하지 않으므로 `response.ok`를 검사한다.
- timeout/abort와 error mapping owner를 둔다.
- internal server code에서 자기 Route Handler를 HTTP로 재호출해 불필요한 hop을 만들지 않는다.
- auth header/cookie가 있는 response의 공유 cache를 경계한다.

## `updateTag`

Server Action/Function에서 mutation 직후 해당 tag를 만료시켜 read-your-writes를 제공한다.

```tsx
"use server";

export async function renameProject(projectId: string, name: string) {
  const actor = await requireActor();
  await assertCanEdit(actor, projectId);
  await projectRepository.rename(projectId, validateName(name));
  updateTag(`project:${projectId}`);
  updateTag("projects");
}
```

현재 actor가 저장 직후 새 값을 반드시 봐야 하는 mutation에 적합하다. tag 폭발과 unrelated entry 만료를
피한다.

## `revalidateTag`

```tsx
revalidateTag("catalogue", "max");
```

`"max"` profile은 stale-while-revalidate 방식으로 stale content를 제공하고 background 갱신을 허용한다.
즉시 일관성이 필요한 user mutation에는 `updateTag`를 우선 검토한다. profile argument 없는 legacy behavior와
deprecated signature를 새 코드에 복제하지 않는다.

## `revalidatePath`

```ts
revalidatePath("/projects/[projectId]", "page");
revalidatePath("/projects", "layout");
revalidatePath("/projects/42");
```

- specific URL은 한 page를 대상으로 하고 type을 생략한다.
- dynamic pattern에는 `"page" | "layout"` type이 필요하다.
- layout invalidation은 nested layouts/pages까지 넓어질 수 있다.
- Server Function에서는 현재 보고 있는 affected path UI를 즉시 갱신할 수 있고, Route Handler에서는 다음 방문
  revalidation으로 표시하는 차이가 있다.
- path invalidation이 같은 tag를 쓰는 다른 page까지 자동 갱신한다고 가정하지 않는다.

## `refresh`

Server Action에서 client router의 uncached data를 새로 읽게 한다. targeted tag/path owner가 있으면 그것을
우선한다. 저장마다 `refresh + updateTag + revalidatePath`를 모두 호출하지 않는다.

## 선택표

| 요구 | 후보 |
| --- | --- |
| 공유 static/cacheable content | `'use cache'` |
| shared instance cache가 필요한 runtime content | `'use cache: remote'` |
| 직접 request API를 읽는 client-private cache | `'use cache: private'` |
| mutation 직후 즉시 새 data | `updateTag` |
| stale 허용 background refresh | `revalidateTag(tag, "max")` |
| route UI ownership 기반 invalidation | `revalidatePath` |
| 현재 router tree uncached data refresh | `refresh` |
| request마다 반드시 평가 | uncached read / `connection()` |

## cache stampede와 실패

- revalidation 중 concurrent request가 upstream을 압박하는지 확인한다.
- remote handler의 failure/timeout fallback을 정한다.
- stale-if-error 정책을 provider 보장 없이 가정하지 않는다.
- missing result와 permission result를 장시간 공유 cache하지 않는다.
- mutation transaction commit 전에 invalidation하지 않는다.
- cache 관측에 hit/miss, key cardinality, revalidation latency를 포함한다.

## 검증

- cache scope가 public/private/tenant 요구와 일치하는가?
- key cardinality와 tag 범위가 설명 가능한가?
- 저장 직후와 다른 사용자 조회의 freshness 기대가 각각 맞는가?
- auth 실패/404/오류가 부적절하게 cache되지 않는가?
- self-host/serverless에서 cache handler가 실제로 공유되는가?
- build, cold start, multi-instance와 invalidation integration test가 있는가?
