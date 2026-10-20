# Next.js Route Handler와 요청 API

## `route.ts`

Web `Request`/`Response` API로 HTTP endpoint를 만든다.

```tsx
export async function GET(request: Request) {
  const url = new URL(request.url);
  const query = parseProjectQuery(url.searchParams);
  const result = await listProjects(query);
  return Response.json(result);
}
```

지원 method는 `GET`, `POST`, `PUT`, `PATCH`, `DELETE`, `HEAD`, `OPTIONS`다. `OPTIONS`를 정의하지 않으면 지원
method 기반 응답을 framework가 제공할 수 있다.

- 같은 segment의 `page.tsx`와 같은 URL을 동시에 소유하지 않는다.
- browser form/server component 내부 code가 같은 app의 Route Handler를 다시 HTTP 호출하지 않게 direct server
  function/data layer를 사용한다.
- public/external client, webhook, download/stream 또는 명시적 HTTP boundary에 적합하다.

## typed route context

```tsx
export async function GET(
  request: NextRequest,
  context: RouteContext<"/api/projects/[projectId]">,
) {
  const { projectId } = await context.params;
  const project = await getAuthorizedProject(request, projectId);
  return NextResponse.json(project);
}
```

`params`는 Promise다. `RouteContext` global helper는 type generation 후 사용할 수 있다. CI에서 `next typegen`
또는 build가 먼저 실행되는지 확인한다.

## `NextRequest`

Web Request를 확장해 `nextUrl`, cookies 등의 편의를 제공한다.

```tsx
export async function GET(request: NextRequest) {
  const cursor = request.nextUrl.searchParams.get("cursor");
  const session = request.cookies.get("session")?.value;
  // validate before use
}
```

request body는 stream이며 일반적으로 한 번 소비한다. signature verification이 필요하면 raw body를 먼저 읽고
그 bytes를 검증한 뒤 parse한다. body size, content type와 timeout 제한을 둔다.

## `NextResponse`

```tsx
const response = NextResponse.json({ ok: true }, { status: 201 });
response.cookies.set("preference", "compact", {
  httpOnly: true,
  sameSite: "lax",
  secure: true,
  path: "/",
});
return response;
```

redirect/rewrite는 Proxy와 Route Handler context에 맞게 사용한다. cookie flags와 domain/path/expiry를 security
policy로 관리한다. auth session cookie를 client-readable로 만들지 않는다.

## async `cookies()`

```tsx
import { cookies } from "next/headers";

export async function getLocale() {
  const store = await cookies();
  return normalizeLocale(store.get("locale")?.value);
}
```

Next.js 16에서는 await한다. read는 Server Component에서도 가능하지만 set/delete는 response cookie를 변경할 수
있는 Server Function/Route Handler 경계에서 수행한다. streaming이 시작된 뒤 header를 변경할 수 없다.

cookie 값은 외부 입력이다. signed/encrypted session verification과 rotation을 data access layer에서 수행한다.

## async `headers()`

```tsx
import { headers } from "next/headers";

const headerStore = await headers();
const requestId = normalizeRequestId(headerStore.get("x-request-id"));
```

read-only request headers다. forwarded host/proto/IP를 신뢰하기 전에 deployment proxy chain과 allowlist를
확인한다. authorization header/token을 Client Component prop이나 log에 전달하지 않는다.

## `draftMode()`

CMS preview 같은 draft session을 cookie로 제어한다. enable/disable은 Route Handler 등에서 수행하고 secret
preview token과 redirect path를 검증한다. draft content가 public shared cache에 섞이지 않게 한다. Next.js 16
async API signature를 따른다.

## `userAgent`

NextRequest/User-Agent를 parse하는 helper다. critical authorization이나 정확한 device identity로 사용하지 않는다.
responsive UI는 CSS를 우선한다. bot/device 분기 시 cache key explosion과 spoofing을 고려한다.

## streaming response

```tsx
export async function GET() {
  const stream = new ReadableStream({
    async start(controller) {
      controller.enqueue(new TextEncoder().encode("first\n"));
      controller.close();
    },
  });

  return new Response(stream, {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
```

client disconnect의 AbortSignal, backpressure, cleanup과 proxy buffering을 확인한다. 대형 file은 memory에 모두
올리지 않고 storage/CDN range/download 전략을 검토한다.

## webhook

필수 흐름:

1. method/content-type/body size 확인
2. raw body 기반 signature와 timestamp/replay 검증
3. idempotency/event id 중복 차단
4. 빠른 acknowledgment와 durable queue 필요성 판단
5. secret/PII redacted logging
6. retry-safe transaction

CORS는 browser access 정책이며 webhook/server authorization을 제공하지 않는다.

## CORS와 preflight

외부 browser client가 필요할 때만 명시적으로 허용한다.

```tsx
const corsHeaders = {
  "access-control-allow-origin": "https://console.aifrica.example",
  "access-control-allow-methods": "GET,POST,OPTIONS",
  "access-control-allow-headers": "content-type,authorization",
  vary: "origin",
};
```

credential을 허용하면서 wildcard origin을 사용하지 않는다. reflected origin은 allowlist 검증 후 반환한다.

## cache와 Route Handler

GET handler와 내부 fetch/cache behavior는 설치 버전/Cache Components 설정을 확인한다. request-specific header,
cookie와 authorization 결과를 shared cache하지 않는다. `revalidatePath`를 Route Handler에서 호출하면 다음 방문
revalidation으로 표시되는 timing 차이를 이해한다.

## 오류 응답

```ts
type ApiError = {
  code: "INVALID_INPUT" | "UNAUTHORIZED" | "FORBIDDEN" | "NOT_FOUND" | "CONFLICT";
  message: string;
  fieldErrors?: Record<string, string[]>;
};
```

- HTTP status와 domain code를 일관되게 매핑한다.
- stack, DB constraint, internal endpoint를 노출하지 않는다.
- correlation id는 비민감 값만 반환한다.
- 예상 밖 오류는 generic 500 response와 server log로 분리한다.
- client disconnect/abort를 server error로 과도하게 보고하지 않는다.

## Proxy와의 경계

Proxy는 redirect/rewrite/header/coarse optimistic check에 사용하고 Route Handler는 endpoint business boundary를
소유한다. Proxy가 통과시켰더라도 handler/data layer에서 authorization을 다시 수행한다.

## 검증

- 모든 method와 malformed input/content type을 test했는가?
- async params/cookies/headers를 올바르게 await했는가?
- auth/tenant/resource authorization이 handler 또는 DAL에서 수행되는가?
- cookie/CORS/cache header가 deployment proxy와 맞는가?
- webhook signature, replay와 idempotency가 검증되는가?
- stream abort/cleanup과 large payload limit이 있는가?
