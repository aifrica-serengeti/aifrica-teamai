# Next.js 보안·Authentication·Data Access

## 세 개념을 분리한다

- authentication: actor가 누구인지 확인
- session management: 요청 사이 actor 상태를 유지
- authorization: 특정 resource/action 권한을 확인

로그인했는지 확인하는 것과 project 42를 수정할 권한은 다르다. route/menu를 숨겼다는 사실은 authorization이
아니다.

## 권장 계층

```text
UI / Server Component / Server Action / Route Handler
                    ↓
       Data Access Layer (authorization)
                    ↓
    repository / external API / database
```

DAL은 secure session 검증과 resource-level authorization을 data source 가까이에서 수행한다. DTO/view model은
필요한 field만 상위로 반환한다.

```ts
import "server-only";

export const getProjectForViewer = cache(async (projectId: string) => {
  const session = await verifySession();
  const project = await projectRepository.findById(projectId);
  if (!project) return { status: "not-found" } as const;
  if (!canView(session.actor, project)) return { status: "forbidden" } as const;
  return { status: "ready", project: toProjectView(project) } as const;
});
```

React `cache`는 request 안 duplicate verification을 줄일 수 있지만 persistent authorization cache와 혼동하지
않는다. session revocation과 tenant switching을 고려한다.

## layout auth check 주의

layout은 partial rendering에서 navigation마다 다시 실행되지 않을 수 있다. layout redirect 하나에만 secure
check를 두지 않는다. DAL, page, Server Function/Route Handler가 실제 data/action 가까이에서 검사한다. Proxy는
coarse optimistic redirect에만 사용한다.

## Session cookie

일반 기준:

- `HttpOnly`
- production `Secure`
- 적절한 `SameSite`
- 좁은 `Path`/`Domain`
- expiry/rotation/revocation
- 충분한 entropy와 authenticated encryption/signature

cookie payload의 role만 믿고 민감한 action을 승인할지, database-backed session으로 다시 확인할지 risk에 따라
정한다. 로그와 Client Component prop에 session token을 노출하지 않는다.

## Server Action 보안

모든 exported action은 직접 호출될 수 있다고 가정한다.

```ts
export async function deleteProject(input: unknown) {
  const actor = await requireActor();
  const { projectId, expectedVersion } = deleteSchema.parse(input);
  await assertCanDeleteProject(actor, projectId);
  await projectRepository.delete({ projectId, expectedVersion });
  updateTag("projects");
}
```

- closure-captured id/role도 최신 authorization 대신 사용하지 않는다.
- hidden form field는 trusted data가 아니다.
- origin/host validation과 deployment proxy를 확인한다.
- expensive action에 rate limit과 idempotency를 둔다.
- serialization output에서 internal field를 제거한다.

## Route Handler 보안

- method/content-type/body size 제한
- authentication scheme와 token validation
- object-level authorization
- CORS와 CSRF 차이
- webhook signature/replay/idempotency
- upload filename/MIME/content scanning
- response cache와 private header

GET이 state를 변경하지 않게 한다. destructive action을 query link로 노출하지 않는다.

## environment variables

`NEXT_PUBLIC_` prefix는 browser bundle에 포함될 수 있는 공개 값이다. secret에는 사용하지 않는다.

- `.env*` source control 정책 확인
- build-time inline과 runtime env 차이
- undefined/malformed env의 startup validation
- secret rotation
- logs/source maps/error response 노출 점검
- client module import graph로 server env helper가 넘어가지 않게 함

## Data Transfer Object

```ts
type ProjectView = {
  id: string;
  name: string;
  capabilities: {
    canEdit: boolean;
    canDelete: boolean;
  };
};
```

DB row에서 password hash, internal note, tenant secret와 backend-only flags를 제거한다. Client에 role 전체를 주고
각 component가 authorization rule을 재구현하기보다 server가 필요한 capability를 계산할 수 있다. capability는
UI presentation용이며 mutation server check는 다시 수행한다.

## React taint API

React/Next가 experimental taint option을 제공하는 환경에서는 특정 object/value가 client로 직렬화되는 것을
막는 defense-in-depth로 사용할 수 있다. experimental gate와 framework config를 확인한다. taint는 DTO,
authorization, code review와 secret management의 대체물이 아니다. primitive를 다른 object에 복사하면 보호
범위가 달라질 수 있다.

## Content Security Policy

CSP는 XSS 피해를 줄이는 방어층이다.

검토 directive:

- `default-src`
- `script-src` nonce/hash/strict-dynamic 정책
- `style-src`
- `img-src`, `font-src`, `connect-src`
- `frame-ancestors`
- `object-src 'none'`
- report-only rollout/report endpoint

nonce 기반 CSP는 request마다 unique하며 static prerender/cache와 tradeoff가 있다. nonce를 shared cached HTML에
굽지 않는다. framework script/style integration과 hosting header를 함께 검증한다.

## URL과 redirect

- callback/return URL은 application-owned relative URL 또는 origin allowlist로 제한한다.
- `javascript:`, protocol-relative와 encoded bypass를 막는다.
- Proxy rewrite 후 host/proto 신뢰 범위를 확인한다.
- user-provided image/download URL도 protocol/origin을 validation한다.

## cache isolation

가장 위험한 오류는 authenticated/private response가 shared cache에 들어가는 것이다.

- cookies/headers를 cached shared scope에서 직접 읽지 않는다.
- tenant/user id를 cache key에서 누락하지 않는다.
- permission failure를 장기 public cache하지 않는다.
- draft/preview와 published cache를 분리한다.
- logout/role change 후 client router/cache stale data를 고려한다.
- tag에는 PII/secret을 넣지 않는다.

## Proxy

Proxy에서 가능한 일:

- locale/host routing
- legacy redirect/rewrite
- security header
- signed session의 빠른 optimistic route check

Proxy에 두지 않을 일:

- database 중심 resource authorization
- 느린 business workflow
- 유일한 security enforcement
- page-specific mutation

Next.js 16 Proxy는 Node.js runtime이다. `middleware` 이름/runtime 과거 지식을 적용하지 않는다.

## `unauthorized`/`forbidden`

현재 experimental `authInterrupts` gate를 확인한다. product의 stable error-state policy가 있으면 실험 기능으로
자동 교체하지 않는다. 401/403 UI는 복구 가능한 login/request-access/navigation을 제공하며 resource existence
정보를 과도하게 노출하지 않는다.

## logging과 오류

- token, cookie, authorization header, password, raw FormData를 기록하지 않는다.
- correlation id는 외부 입력을 정규화하거나 server가 생성한다.
- 같은 오류를 action, boundary, global handler에서 중복 보고하지 않는다.
- client message와 server diagnostic을 분리한다.
- multi-tenant log에 tenant context를 넣되 PII 최소화를 지킨다.

## 검증

- UI를 우회해 action/handler를 직접 호출해도 권한이 막히는가?
- 다른 tenant/resource id를 넣은 object-level authorization test가 있는가?
- session expiry/rotation/logout 후 stale data가 남지 않는가?
- private data가 RSC payload, source map, cache와 logs에 없는가?
- CSP/redirect/upload/webhook이 실제 deployment에서 test되는가?
- Proxy를 우회한 direct data access에서도 DAL이 검사하는가?
