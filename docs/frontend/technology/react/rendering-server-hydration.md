# React 렌더링·서버·Hydration

## framework 우선 원칙

일반 Aifrica application은 framework가 root, SSR, streaming, RSC와 static generation을 소유한다. 이 문서의
low-level API는 custom renderer/framework adapter를 만들거나 hydration 문제를 진단할 때 사용한다. Next.js
안에서 `react-dom/server`를 직접 호출해 framework render pipeline을 우회하지 않는다.

## `createRoot`

```tsx
import { createRoot } from "react-dom/client";

const container = document.getElementById("root");
if (!container) throw new Error("#root가 없습니다.");

const root = createRoot(container, {
  onUncaughtError: reportUncaughtError,
  onCaughtError: reportCaughtError,
  onRecoverableError: reportRecoverableError,
});

root.render(<App />);
```

- React가 생성하지 않은 기존 HTML에 createRoot를 호출하면 container content가 교체될 수 있다.
- app 전체에서 root를 render마다 다시 만들지 않는다.
- 여러 root가 있으면 `identifierPrefix`를 구분하고 server/client 설정을 맞춘다.
- 외부 코드가 container를 제거하기 전 `root.unmount()`로 subscription과 Effect를 정리한다.

## `hydrateRoot`

```tsx
import { hydrateRoot } from "react-dom/client";

hydrateRoot(document, <App assetMap={window.assetMap} />, {
  identifierPrefix: "aifrica-",
  onRecoverableError: reportRecoverableError,
});
```

server HTML과 첫 client render가 같아야 한다. mismatch를 React가 모두 안전하게 patch한다고 가정하지 않는다.

주요 mismatch 원인:

- render에서 `Date.now()`, random, locale/timezone 차이
- `typeof window` branch가 다른 markup 생성
- browser extension/edge transform이 HTML 변경
- 잘못된 HTML nesting
- server/client data snapshot 차이
- CSS-in-JS id/order와 `useId` prefix 차이

정말 의도된 단일 text mismatch에만 `suppressHydrationWarning`을 한 단계 escape hatch로 사용한다. subtree 전체
오류를 숨기는 용도가 아니다.

## server rendering 선택

| 환경/목적 | API |
| --- | --- |
| Web Streams SSR | `renderToReadableStream` |
| Node.js Streams SSR | `renderToPipeableStream` |
| Web Streams static generation | `prerender` |
| Node.js static generation | `prerenderToNodeStream` |
| partial prerender resume | `resume`, `resumeToPipeableStream`, `resumeAndPrerender*` |
| legacy non-streaming | `renderToString`, `renderToStaticMarkup` |

SSR streaming은 fallback shell을 먼저 보낼 수 있고 static prerender는 기본적으로 Suspense data가 준비될 때까지
기다린다. non-streaming legacy API는 Suspense 기능이 제한된다.

## `renderToPipeableStream`

```tsx
import { renderToPipeableStream } from "react-dom/server";

function handleRequest(request: Request, response: NodeResponse) {
  let didError = false;
  const { pipe, abort } = renderToPipeableStream(<App url={request.url} />, {
    bootstrapScripts: ["/client.js"],
    onShellReady() {
      response.statusCode = didError ? 500 : 200;
      response.setHeader("content-type", "text/html");
      pipe(response);
    },
    onShellError(error) {
      response.statusCode = 500;
      response.end("<!doctype html><p>화면을 만들지 못했습니다.</p>");
    },
    onError(error) {
      didError = true;
      logServerRenderError(error);
    },
  });

  setTimeout(abort, 10_000);
}
```

- shell을 보내기 전에는 status를 바꿀 수 있지만 streaming 시작 후 HTTP status 변경이 제한된다.
- bot/static 요구, timeout과 abort fallback 정책을 둔다.
- bootstrap script, asset map과 CSP nonce를 request별로 안전하게 전달한다.
- server 오류를 사용자 HTML에 그대로 출력하지 않는다.

## `renderToReadableStream`

Web Streams 환경에서 사용한다.

```tsx
const stream = await renderToReadableStream(<App />, {
  bootstrapScripts: ["/client.js"],
  signal: request.signal,
  onError: logServerRenderError,
});

return new Response(stream, {
  headers: { "content-type": "text/html; charset=utf-8" },
});
```

환경이 Node.js 중심이면 전용 Node stream API가 더 적합할 수 있다. `allReady`를 기다리면 streaming 이점이
사라질 수 있지만 crawler/static response 요구에는 필요할 수 있다.

## static `prerender`

```tsx
import { prerender } from "react-dom/static";

const { prelude, postponed } = await prerender(<App />, {
  bootstrapScripts: ["/client.js"],
  signal: controller.signal,
});

return new Response(prelude, {
  headers: { "content-type": "text/html; charset=utf-8" },
});
```

`prerender`는 Web Stream을 반환하며 Suspense data를 기다린 정적 HTML 생성에 적합하다. Node stream 환경은
`prerenderToNodeStream`을 사용한다. abort 시 `postponed` state가 있으면 request-time `resume` 계열로 이어지는
partial prerender architecture를 만들 수 있다.

`postponed`는 opaque하고 직렬화 가능한 React 내부 결과다. 구조를 읽거나 수정하지 않는다. build와 runtime의
React version/asset contract가 일치해야 한다.

## legacy string API

`renderToString`은 stream이 없는 환경의 fallback이며 suspend가 해결될 때까지 기다리는 현대 SSR API가 아니다.
`renderToStaticMarkup` 결과는 hydration할 수 없는 non-interactive HTML에 사용한다. 새 framework를 이 API로
설계하지 않는다.

## RSC `cache`

```tsx
import { cache } from "react";

export const getProject = cache(async (projectId: string) => {
  return projectRepository.findById(projectId);
});
```

- React Server Components에서 같은 memoized function과 argument에 대한 작업을 render/request 범위에서 공유한다.
- component 안에서 `cache(fn)`을 만들지 않고 module scope identity를 공유한다.
- object argument는 reference identity가 달라지면 다른 entry다. primitive id를 선호한다.
- 오류 결과도 같은 render에서 memoize될 수 있다.
- cross-request persistent data cache와 동일하지 않다.

## RSC `cacheSignal` — React 19.2

```tsx
import { cache, cacheSignal } from "react";

const getReport = cache(async (id: string) => {
  const response = await fetch(`/internal/reports/${id}`, {
    signal: cacheSignal() ?? undefined,
  });
  if (!response.ok) throw new Error("보고서를 불러오지 못했습니다.");
  return response.json() as Promise<Report>;
});
```

server render/cache lifetime이 끝나면 작업을 abort할 수 있다. client request cancel API가 아니며 RSC 밖에서는
`null`일 수 있다. downstream API가 AbortSignal을 실제로 전달/처리하는지 확인한다.

## Server/Client 직렬화 경계

- client에 secret, database handle, class instance와 function을 일반 prop으로 보내지 않는다.
- framework가 허용한 Server Function reference와 일반 function prop을 구분한다.
- Date/Map/Set 등 지원 범위는 framework/RSC serializer version을 확인한다.
- DB row 전체가 아니라 필요한 view model만 보낸다.
- client component module graph에 server-only import가 들어가지 않게 한다.

## hydration-safe browser state

localStorage/theme/media query처럼 server가 모르는 값은 다음 중 하나를 선택한다.

- cookie/header로 server snapshot을 제공한다.
- server와 첫 client render가 같은 fallback을 만들고 Effect 후 갱신한다.
- framework가 제공하는 no-SSR/client-only boundary를 최소 subtree에 사용한다.

화면 전체를 client-only로 바꾸어 mismatch를 숨기지 않는다. theme flash, focus와 layout shift를 검증한다.

## 검증

- server HTML과 첫 client render가 결정적으로 같은가?
- shell/data 오류와 HTTP status owner가 명확한가?
- streaming 중 CSP, asset URL과 bootstrap data가 안전한가?
- request abort가 fetch/render까지 전달되는가?
- static output에 request별 nonce/개인 정보가 들어가지 않는가?
- RSC cache와 framework persistent cache를 구분했는가?
- hydration warning을 억제하지 않고 원인을 수정했는가?
