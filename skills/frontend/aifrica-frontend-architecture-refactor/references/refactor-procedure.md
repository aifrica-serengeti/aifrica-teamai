# Aifrica UI Architecture Refactor

Refactor toward explicit ownership and one-way dependencies while preserving behavior. Do not depend on a
user-home skill, a machine-specific path, or unwritten conventions. Repository instructions, source, exports,
configuration, and executed checks are the evidence.

This skill specializes the architecture portion of `aifrica-frontend-workflow`. Apply both when a change also affects
rendered UI, public component contracts, accessibility, page patterns, or design documentation. Do not infer
permission to create Issues, push, open a PR, merge, or perform any other GitHub lifecycle operation.

## 1. Load the architecture contract

1. Locate the repository root and read the nearest applicable `AGENTS.md` completely.
2. Read these repository documents completely when present:
   - `docs/frontend/ai-prompt.md`
   - `docs/frontend/architecture.md`
   - `docs/frontend/technology/README.md`
   - `docs/frontend/technology/typescript.md`
   - `docs/frontend/import-style.md`
   Also read the selected solution's README, extension, and linked architecture contract before choosing locations.
   Common reference paths do not make the selected solution's declared type-module or naming rules optional.
3. Inspect the actual `package.json`, lockfile, `tsconfig*`, lint or formatter configuration, source tree, public
   exports, and relevant tests before proposing a move.
4. For UI-facing changes, also follow the canonical workflow at
   the host-discovered `aifrica-frontend-workflow` skill when the host cannot compose skills automatically.
5. Read design-system and page-pattern documents only when the refactor changes a public component contract or
   List/Create/Detail ownership.

Work locally and offline by default. The frontend documents are the repository's upstream snapshot, not
permission to upgrade TypeScript or dependencies. If source and documentation disagree, expose the mismatch and
resolve it from the user's goal and the repository's declared ownership rules. Do not treat adjacent legacy code
as a precedent merely because it compiles.

## 2. Define the refactor contract

Classify the task before editing:

- `type-placement`: move, split, merge, or rename DTOs, interfaces, unions, Props, drafts, or view models;
- `module-placement`: move services, hooks, stores, components, static data, helpers, or directories;
- `dependency-boundary`: remove reverse dependencies, private deep imports, cycles, or unstable barrels;
- `mixed`: more than one of the above.

State whether the change must be behavior-preserving or intentionally changes a public contract. Unless the user
explicitly requests a product or API change, preserve runtime behavior, routes, request payloads, response
handling, user-visible text, component semantics, and public exports.

Record the proposed move as `current path or symbol -> target owner -> reason` before changing files. If the
owner cannot be proven from callers and repository contracts, continue investigation instead of creating a new
`common`, `shared`, `types`, or `utils` dumping ground.

## 3. Build an ownership inventory

For every affected symbol or module:

1. Find its definition, all imports, re-exports, runtime consumers, type-only consumers, tests, and documentation.
2. Identify the real owner: application assembly, domain or API contract, route page, reusable UI, or domain-free
   infrastructure.
3. Identify its lifetime and change reason. Code that changes with a form or route belongs to the page even when
   its shape resembles an API model. Code that changes with a backend resource belongs to the domain even when a
   component consumes it.
4. Separate wire payload, validated domain model, form draft, page state, and render view model. Equal shapes do
   not prove equal responsibility.
5. Detect duplicate shapes, catch-all files, cross-menu private imports, deep imports that bypass a public
   boundary, runtime imports used only for types, and cycles hidden by barrels.
6. Capture a validation baseline before a broad move so new failures can be distinguished from existing ones.

Use repository search tools such as `rg` for symbol names, import paths, aliases, and semantic equivalents. Do
not rely on filenames alone.

## 4. Choose the top-level owner

Use the narrowest owner that matches the symbol's responsibility. Directory labels below are reference roles, not a mandate to restructure an adopting repository.

| Owner | Meaning | Must not contain |
| --- | --- | --- |
| `src/app` | bootstrap, providers, global layout, router, and top-level assembly | page-owned state or reusable domain contracts |
| `src/core` | domain-independent API infrastructure, global UI, hooks, config, i18n, utilities, and global stores | details of one menu, route, or backend resource |
| `src/domains` | backend requests, normalized response models, domain rules, limited domain values, adapters, services, and domain mocks | components, route assembly, or page convenience models |
| `src/pages` | route screens, query and draft ownership, page hooks or stores, page markup, and presentation composition | app bootstrap or backend transport infrastructure |
| `src/assets` | static files imported by source | runtime state or TypeScript contracts |
| `src/styles` | global styles, tokens, reset, and font declarations | component-specific state or domain rules |
| `public` | files served directly or replaced by deployment | source-imported implementation modules |

Do not promote code because it has two callers. Promote only when both callers use the same semantic contract and
the target owner is responsible for its future changes.

## 5. Place types by responsibility

Use this decision table before considering syntax or naming. Paths and Dto/I/T naming are reference defaults; apply the consuming repository’s verified architecture mapping first.

| Type responsibility | Default location | Placement rule |
| --- | --- | --- |
| Backend request payload | `src/domains/{group?}/{menu}/model/dto/{resource}.{action}.dto.ts` | Use `Dto{Resource}{Action}` and prefer `interface` according to repository naming. |
| Backend response or normalized domain model | `src/domains/{group?}/{menu}/model/interface/{resource}.i.ts` | Use `I{Resource}`; colocate strongly coupled substructures, split independent concepts. |
| Domain status, backend enum-like value, constrained union, or domain-wide mapping | `src/domains/{group?}/{menu}/model/type/{resource}.{purpose}.t.ts` | Use `T{Resource}{Purpose}`; keep exhaustive label, tone, i18n-key, or variant mappings with the domain type when they represent the same domain contract. |
| Cross-domain API envelope, pagination, or genuinely shared domain contract | `src/domains/common` at the matching model layer | Require verified cross-domain semantics; convenience reuse is insufficient. |
| Form draft, touched/errors, page query, route state, mutation state, page tab or view model | `src/pages/{group?}/{menu}/{page-kind}/type/{resource}.{purpose}.t.ts` | Keep named page workflow types in the page kind's `type/` directory. Do not place them in `domains` merely because they are interfaces or reused by page markup. |
| Same-menu state or presentation contract shared by multiple page kinds | `src/pages/{group?}/{menu}/shared/type/{resource}.{purpose}.t.ts` | Promote only after real list/create/detail reuse is verified. Keep runtime hooks, form adapters, and UI in their matching `shared` role instead of mixing them into `type/`. |
| Presentation contract shared by sibling menus in one work group | `src/pages/{group}/shared/type/{resource}.{purpose}.t.ts` | Keep domain contracts in the group domain; move only page representation and page-level query behavior here. |
| Component public Props | the component's `.tsx` file | Declare `{Component}Props` beside the component; do not create a separate Props file. |
| Component-private helper type | the component `.tsx` or a focused colocated helper | Keep it private unless another owner consumes the same semantic contract. |
| Domain-independent public UI type | the owning component module under `src/core/components` and its verified public export | Expose the smallest rendering and interaction contract, not a domain DTO. |
| External input from network, URL, storage, form, or third party | boundary adapter or validator owned by the receiving layer | Start as `unknown`, validate at runtime, then return the owned type. |

Do not use `Partial<Dto>` as a form model by default. Do not pass an entire API DTO into a reusable component.
Prefer discriminated unions for mutually exclusive states and exhaustive checks for new variants. Do not hide
placement or type errors with `any`, broad assertions, non-null assertions, `@ts-ignore`, or a TypeScript config
relaxation.

Use the consuming repository’s verified type-module convention; in the reference mapping, named page workflow types belong in a `type/` directory. Split those
types into focused `*.t.ts` files whose resource and purpose are clear; do not create catch-all `types.ts` or
`interfaces.ts` files. Component public Props stay in the component `.tsx`, and a small component-private helper
type may remain colocated. A named type that changes with the page query, draft, route, mutation, tab, or view mode
must not accumulate in a page component or hook merely because it currently has one consumer.

## 6. Place implementation modules by responsibility

- Put API functions in `domains/{group?}/{menu}/service`; use `core/api` for the shared HTTP client and common
  request or error handling.
- Put domain transformations and validation beside the domain model in an established focused module. Do not
  make a component or page own backend normalization.
- Put page-only UI under `{page-kind}/markup/{component-name}` and page-only stores under `{page-kind}/stores`.
- Put page-only hooks in the page's existing `hooks` boundary. Move hooks used across page kinds to menu
  `shared/hooks`; move sibling-menu page hooks to group `shared/hooks`.
- Put named page-only query, route, mutation, draft, tab, view-mode, and view-model types in
  `{page-kind}/type/{resource}.{purpose}.t.ts`. Move the same semantic page contract to menu or group
  `shared/type` only when its verified consumers cross page-kind or sibling-menu boundaries.
- Put component presentation constants in the component's `data/`; put page assembly data in the page's `data/`;
  promote to the closest `shared/data` only when the same presentation contract is verified.
- Put domain mock data in `domains/{group?}/{menu}/mock-data`, not in presentation `data/` or a new global mock
  folder.
- Keep component styles with the component. Keep only global tokens, reset, font declarations, and application
  styles in `src/styles`.
- Name focused files for the resource and purpose. Do not create generic `types.ts`, `interfaces.ts`, `utils.ts`,
  `helpers.ts`, or `common/` containers when a specific owner and purpose can be named.

Component directories are cohesive units. Do not flatten unrelated component `.tsx` and `.css.ts` files into
one parent directory. Reuse the repository's component-per-directory structure.

## 7. Enforce dependency direction

Apply these gates to both runtime and type-only imports:

- `app` may assemble `pages` and `core` and may consume domain contracts needed for assembly.
- `pages` may depend on `domains`, `core`, `assets`, and `styles`; it must not import `app`.
- `domains` may use domain-independent `core/api`, configuration, or utilities; it must not depend on `pages` or
  `core/components`.
- `core` must not depend on a specific page, menu, or domain implementation.
- One menu must not import another menu's private page module. Move a proven shared page contract to the nearest
  group or menu `shared` boundary, a domain contract to the owning group domain or `domains/common`, and a truly
  global domain-free contract to `core`.

Use an existing public entrypoint when it represents the intended boundary. Do not add a barrel only to shorten
imports. Inspect barrels for runtime cycles and accidental exposure of private implementation types. Preserve
side-effect import order and distinguish type-only dependencies with `import type` or `export type`.

## 8. Execute the smallest safe refactor

1. Split mixed responsibilities before moving a large file.
2. Move one coherent ownership slice at a time and update all imports, re-exports, tests, and documentation.
3. Keep compatibility exports only when a verified public consumer needs a staged migration; record their
   removal plan instead of leaving duplicate permanent definitions.
4. Convert at trust boundaries with explicit adapters. Do not make equal-looking DTO, domain, draft, and view
   types aliases merely to reduce lines.
5. Preserve unrelated user changes and avoid repository-wide formatting or import churn.
6. After each slice, search for stale paths, duplicate definitions, forbidden imports, newly orphaned files, and
   named page workflow types still accumulating in touched page components or hooks.
7. Organize changed TS, JS, TSX, and JSX imports by `docs/frontend/import-style.md` after ownership is correct.

Investigate undocumented API and package/deployment boundaries before moving code. Continue authorized behavior-preserving work; clarify only if a necessary decision remains unresolved or the scope would expand beyond the user request.

## 9. Verify

Use commands actually defined by the consuming repository. When editing the shared authoring repository, run `npm run verify`; adopting products do not need to contain the authoring tools.

1. Run the repository's actual documentation, registry, or agent-package checks when relevant and available,
   in the selected solution's declared order and conditions.
2. Run its actual typecheck and lint scripts for changed source and tooling.
3. Run focused tests covering the behavior and import boundaries affected by the move.
4. Run its actual build script when runtime module boundaries, routes, bundling, or public exports changed.

Also search for the old path and symbol names, review the complete diff, and confirm that request and response
shapes, runtime import evaluation, routes, and rendered behavior remain unchanged. Do not claim checks that did
not run. Record pre-existing failures separately from regressions introduced by the refactor.

## 10. Report evidence

Include a compact architecture record in the final response or PR:

```text
리팩터링 분류: type-placement | module-placement | dependency-boundary | mixed
계약: behavior-preserving | intentional public change
소유권 이동: current symbol/path -> target owner/path + reason
타입 경계: DTO / domain model / draft / page state / view model / Props
의존 방향: 제거한 역방향·순환·deep import와 남은 예외
호환성: public export, adapter, migration 여부
검증: 실제 실행한 명령과 결과
미실행·위험: 없으면 없음
```
