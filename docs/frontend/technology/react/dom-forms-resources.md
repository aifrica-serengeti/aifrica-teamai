# React DOM·Form·Resource API

## React DOM 경계

`react-dom`은 browser DOM 전용 기능이다. React Native나 server-only module에서 사용하지 않는다. Next.js
같은 framework가 metadata, script, style과 resource loading을 소유하면 framework API를 먼저 사용한다.

## 기본 DOM prop

- React는 대부분의 HTML attribute를 camelCase prop으로 받지만 `aria-*`, `data-*`는 원래 표기를 쓴다.
- `className`, `htmlFor`처럼 JavaScript 예약/DOM property 차이가 있는 이름을 사용한다.
- boolean attribute와 string attribute를 혼동하지 않는다.
- inline `style`은 CSS property object이며 일반 CSS 문자열이 아니다.
- `dangerouslySetInnerHTML`은 검증된 sanitizer와 trust policy가 있을 때만 사용한다.

```tsx
function Status({ invalid }: { invalid: boolean }) {
  return (
    <div
      className="status"
      aria-invalid={invalid || undefined}
      data-state={invalid ? "invalid" : "valid"}
    />
  );
}
```

## controlled `<input>`

```tsx
function NameField({ value, onChange, error }: Props) {
  const errorId = useId();
  return (
    <div>
      <label htmlFor="project-name">프로젝트명</label>
      <input
        id="project-name"
        name="name"
        value={value}
        onChange={(event) => onChange(event.currentTarget.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
      />
      {error && <p id={errorId}>{error}</p>}
    </div>
  );
}
```

- `value`를 주면 `onChange`에서 동기적으로 다음 값을 반영한다.
- text input value는 수명 중 string을 유지한다. `undefined`/`null`로 controlled mode를 해제하지 않는다.
- checkbox/radio는 `checked`와 `defaultChecked`를 사용한다.
- number input의 DOM value도 string이며 빈 값, locale, 범위 정책을 adapter에서 처리한다.
- file input은 보안상 uncontrolled이며 `value`를 programmatically 설정하지 않는다.

## `<select>`와 `<textarea>`

React에서는 `selected` attribute를 option마다 조작하기보다 select의 `value/defaultValue`를 사용한다.

```tsx
<select value={role} onChange={(event) => setRole(event.currentTarget.value as Role)}>
  <option value="viewer">조회</option>
  <option value="editor">편집</option>
</select>
```

multi-select는 string 배열 value를 사용한다. `<textarea>`의 content child가 아니라 `value/defaultValue`를
사용한다. public component에서는 DOM string과 domain union을 validation 없이 assertion으로 연결하지 않는다.

## Form Action — React 19

`<form action={function}>`은 function을 제출 Action으로 호출한다. `<button formAction={function}>`으로 같은
form 안의 action을 분기할 수 있다.

```tsx
async function saveProject(formData: FormData) {
  "use server";
  const input = parseProjectForm(formData);
  await projectRepository.save(input);
}

function ProjectForm() {
  return (
    <form action={saveProject}>
      <input name="name" required />
      <button type="submit">저장</button>
      <button type="submit" formAction={saveDraft}>임시 저장</button>
    </form>
  );
}
```

- function Action이 성공하면 uncontrolled field가 reset될 수 있다.
- controlled field는 React state owner의 성공 정책에 따라 reset한다.
- client validation은 server authentication/authorization/schema validation을 대체하지 않는다.
- Action argument와 return은 framework server boundary에서 직렬화 조건을 확인한다.
- progressive enhancement와 hydration 전 제출 요구를 framework 문서와 함께 확인한다.

## `useFormStatus`

React DOM 19 Hook이며 가장 가까운 부모 form의 마지막 제출 상태를 읽는다.

```tsx
import { useFormStatus } from "react-dom";

function SubmitButton() {
  const { pending, data, method, action } = useFormStatus();
  const label = data?.get("name");
  return (
    <button type="submit" disabled={pending}>
      {pending ? `${String(label ?? "항목")} 저장 중…` : "저장"}
    </button>
  );
}
```

- Hook을 호출한 component는 추적할 form의 자손이어야 한다.
- 같은 component가 반환하는 form은 위쪽이 아니므로 추적하지 못한다. SubmitButton을 분리한다.
- nested form은 HTML상 유효하지 않다.
- `data`의 비밀번호/token을 UI나 log에 노출하지 않는다.
- 여러 submitter의 `formAction`을 사용할 때 `action`/`method`로 필요한 구분만 한다.

## form 오류와 focus

예상 가능한 결과를 discriminated union으로 반환하고 field와 programmatically 연결한다.

```tsx
type FormState = {
  message?: string;
  fieldErrors?: Partial<Record<"name" | "description", string>>;
};
```

제출 실패 시 입력을 보존하고 첫 오류 또는 오류 summary로 focus를 이동한다. live region은 실제로 새로
생긴 결과만 공지한다. 모든 keystroke validation을 assertive alert로 읽지 않는다.

## `createPortal`

```tsx
import { createPortal } from "react-dom";

function ModalLayer({ children }: { children: React.ReactNode }) {
  const root = document.getElementById("overlay-root");
  return root ? createPortal(children, root) : null;
}
```

Portal은 DOM 위치만 바꾸고 React tree의 Context와 event propagation은 그대로 유지한다. 따라서 portal
내 click이 React tree의 ancestor handler로 bubble할 수 있다.

- modal semantics, focus containment, Escape, background inert, focus restore를 portal이 자동 제공하지 않는다.
- SSR에서 target DOM이 없을 수 있으므로 client lifecycle을 설계한다.
- 다른 document/iframe target은 style, event와 lifecycle을 별도 검토한다.

## `flushSync`

```tsx
import { flushSync } from "react-dom";

function addAndScroll(item: Item) {
  flushSync(() => setItems((items) => [...items, item]));
  listRef.current?.lastElementChild?.scrollIntoView();
}
```

React update를 즉시 DOM에 반영해야 하는 browser/third-party integration의 최후 수단이다.

- 성능을 크게 해칠 수 있다.
- pending Suspense fallback이 다시 보일 수 있다.
- callback 밖 pending update/Effect까지 flush될 수 있다.
- 일반 event 순서 문제를 해결하려고 남용하지 않는다.

## metadata와 resource element — React 19

React는 component 안의 `<title>`, `<meta>`, `<link>`를 document head에 배치하는 기능을 지원한다.

```tsx
function ProjectPage({ project }: { project: Project }) {
  return (
    <>
      <title>{project.name} · Aifrica</title>
      <meta name="description" content={project.summary} />
      <main>{/* content */}</main>
    </>
  );
}
```

framework metadata API가 있으면 중복 head owner를 만들지 않는다. dynamic metadata escaping, canonical,
robots와 locale은 framework/SEO 정책을 따른다.

stylesheet `<link precedence="...">`와 async script/resource rendering은 React가 loading order와 Suspense를
관리할 수 있지만 framework bundler가 이미 처리하는 asset을 중복 등록하지 않는다.

## resource preload/preinit API

`react-dom`은 다음 힌트를 제공한다.

| API | 목적 |
| --- | --- |
| `prefetchDNS(href)` | origin DNS lookup 준비 |
| `preconnect(href, options?)` | origin connection 준비 |
| `preload(href, options)` | font/style/image/script 등 resource fetch |
| `preloadModule(href, options?)` | ESM module fetch |
| `preinit(href, options)` | stylesheet 삽입 또는 classic script fetch/evaluate |
| `preinitModule(href, options?)` | ESM module fetch/evaluate |

```tsx
import { preconnect, preload } from "react-dom";

preconnect("https://cdn.example.com");
preload("https://cdn.example.com/aifrica.woff2", {
  as: "font",
  crossOrigin: "anonymous",
});
```

- 너무 많은 preload는 bandwidth priority를 악화시킨다.
- 실제로 곧 필요한 critical resource에만 사용한다.
- font의 `crossOrigin`, image의 `imageSrcSet/imageSizes`, script integrity/CSP를 맞춘다.
- framework font/image/script preload owner가 있으면 framework API를 우선한다.

## 제거된 React DOM API

React 19에서는 새 코드에서 다음 legacy API를 사용하지 않는다.

- `ReactDOM.render` → `createRoot`
- `ReactDOM.hydrate` → `hydrateRoot`
- `unmountComponentAtNode` → `root.unmount()`
- `findDOMNode` → 직접 ref
- `renderToNodeStream`/`renderToStaticNodeStream` → 현재 streaming/static API

## 검증

- input mode가 수명 중 바뀌지 않는가?
- form 실패 시 값, 오류 연결과 focus가 보존되는가?
- Action의 server trust boundary가 실제로 검증되는가?
- portal의 keyboard, focus restore와 background interaction이 완전한가?
- preload가 중복되거나 사용되지 않은 resource를 경쟁시키지 않는가?
- metadata owner가 React와 framework 사이에 하나로 정해졌는가?
