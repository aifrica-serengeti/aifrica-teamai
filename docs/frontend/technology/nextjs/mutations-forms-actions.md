# Next.js Mutation·Server Functions·Form

## Server Function 경계

`'use server'`는 function/file이 server에서 실행된다는 의미다. 입력이 안전하거나 호출자가 권한을 가졌다는
뜻이 아니다. export된 Server Function은 client에서 호출 가능한 mutation endpoint처럼 취급한다.

```tsx
"use server";

export async function updateProject(input: unknown): Promise<UpdateResult> {
  const actor = await requireActor();
  const parsed = updateProjectSchema.safeParse(input);
  if (!parsed.success) return toValidationResult(parsed.error);

  await assertCanEditProject(actor, parsed.data.projectId);
  const project = await projectRepository.update(parsed.data);
  updateTag(`project:${project.id}`);
  return { status: "success", projectId: project.id };
}
```

필수 server 검사:

- authentication
- resource/action authorization
- runtime schema validation
- tenant ownership
- CSRF/origin framework policy 확인
- rate limit/abuse/idempotency
- audit와 민감 정보 redaction

## file-level과 inline `'use server'`

file top-level directive를 사용하면 모든 export function이 Server Function이다. Client Component에서 import할
action은 dedicated server file에 둔다. Server Component 내부 inline function은 해당 component scope 값을
capture할 수 있지만 signature/authorization을 숨기지 않는다.

module에 server-only helper/object까지 무분별하게 export하지 않는다. action public surface를 좁게 유지한다.

## FormData parsing

```ts
function parseCreateProject(formData: FormData) {
  return createProjectSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    visibility: formData.get("visibility"),
  });
}
```

`FormData.get()`은 `FormDataEntryValue | null`이며 file일 수 있다. string assertion만 하지 않는다. checkbox
누락, multi-value `getAll`, empty string, locale number/date와 file size/type을 명시적으로 처리한다.

## React `useActionState` 조합

```tsx
"use client";

type CreateState =
  | { status: "idle" }
  | { status: "invalid"; fieldErrors: Record<string, string[]>; message: string }
  | { status: "success"; projectId: string };

export function ProjectCreateForm() {
  const [state, action, pending] = useActionState(createProject, { status: "idle" });

  return (
    <form action={action}>
      <ProjectFields errors={state.status === "invalid" ? state.fieldErrors : {}} />
      <SubmitButton pending={pending} />
    </form>
  );
}
```

Server Action signature는 `(previousState, formData) => nextState`다. 기존 `(formData) => result` action을
그대로 연결하면 첫 인자 위치가 달라진다.

expected validation/conflict는 serializable union으로 반환한다. unexpected infrastructure/programming 오류는
server log와 error boundary로 보낸다. 사용자에게 stack/SQL/token을 반환하지 않는다.

## `useFormStatus`

부모 form 자손 submit button에서 pending/data/method/action을 읽는다. 같은 component가 만드는 form을 추적할
수 없으므로 button을 분리한다. 자세한 Hook 계약은 React DOM 지식 팩을 따른다.

## optimistic mutation

```tsx
const [optimisticRows, removeOptimistic] = useOptimistic(
  rows,
  (current, id: string) => current.map((row) =>
    row.id === id ? { ...row, pendingDelete: true } : row,
  ),
);

function remove(id: string) {
  startTransition(async () => {
    removeOptimistic(id);
    const result = await deleteProject(id);
    if (result.status === "error") showError(result.message);
  });
}
```

- 삭제는 항목을 즉시 완전히 제거하기보다 pending 상태로 표시하는 편이 복구에 유리할 수 있다.
- permission/conflict 가능성이 높으면 낙관 반영을 제한한다.
- server authoritative ordering/id를 최종 기준으로 사용한다.
- Action 완료 뒤 cache invalidation 결과와 optimistic state가 수렴해야 한다.

## `redirect`와 `permanentRedirect`

```tsx
import { redirect } from "next/navigation";

export async function createProject(previous: CreateState, formData: FormData) {
  const result = await persistProject(formData);
  updateTag("projects");
  redirect(`/projects/${result.id}`);
}
```

`redirect()`는 제어 흐름을 종료하는 throw 성격이다. broad try/catch 안에서 호출해 삼키지 않는다. revalidation과
transaction을 redirect 전에 끝낸다.

- Server Action에서는 기본적으로 push 성격/303 response가 적용될 수 있다.
- 일반 render/handler context에서는 replace/307 semantics를 확인한다.
- permanent redirect는 308 의미가 진짜 영구 URL 이전일 때만 사용한다.
- user-provided destination은 open redirect allowlist를 통과한다.

## 중복 실행과 idempotency

button disabled는 UX일 뿐 network retry/double click/malicious caller를 막지 못한다.

- create/payment/provision 작업은 idempotency key 또는 server uniqueness를 설계한다.
- action result를 browser refresh/back에서 다시 적용하지 않는다.
- pending 동안 취소 가능한지, 이미 commit됐는지 구분한다.
- retryable infrastructure error와 validation error를 분리한다.
- transaction boundary와 invalidation 순서를 명시한다.

## `after()`

```tsx
import { after } from "next/server";

export async function createProjectAction(input: unknown) {
  const project = await createProject(input);
  after(() => writeAuditProjection(project.id));
  return project;
}
```

response 이후 실행해도 사용자 결과에 영향을 주지 않는 logging/analytics/secondary task에 사용한다.

사용하지 않을 작업:

- 핵심 DB commit
- authorization
- 사용자가 즉시 읽을 data update
- 유일한 audit record
- 보장된 delivery가 필요한 job

deployment lifetime, retry와 failure observability를 확인한다. durable queue가 필요한 업무를 in-process after로
대체하지 않는다.

## error/field state

- field error는 해당 input의 `aria-describedby`와 연결한다.
- form-level error와 global toast를 구분한다.
- 실패 시 입력/draft를 보존한다.
- 첫 invalid field 또는 error summary로 focus를 이동한다.
- success 후 redirect/reset/stay 정책을 명시한다.
- unsaved changes guard와 server pending navigation을 함께 처리한다.

## Server Function 반환 최소화

DB entity 전체, secret field, internal enum과 stack을 반환하지 않는다.

```ts
type CreateResult =
  | { status: "success"; projectId: string }
  | { status: "invalid"; fieldErrors: Record<string, string[]>; message: string }
  | { status: "conflict"; message: string };
```

Client가 필요한 최소 result만 직렬화한다. 오류 code와 사용자 message/log context를 분리한다.

## 검증

- action을 직접 호출해도 auth/authorization/validation이 수행되는가?
- malformed FormData, duplicate submit과 stale version conflict가 처리되는가?
- pending/error/success 상태와 focus가 접근 가능한가?
- transaction commit 뒤 정확한 tag/path만 invalidation되는가?
- redirect가 catch에 삼켜지지 않는가?
- optimistic failure와 server normalization 후 UI가 수렴하는가?
- after task 실패가 관측되며 핵심 업무를 잃지 않는가?
