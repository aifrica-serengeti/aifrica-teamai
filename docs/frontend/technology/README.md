# Aifrica 프론트엔드 기술 기준

React, Next.js, HTML, CSS, JavaScript, TypeScript를 Aifrica 솔루션에 적용하기 위한 로컬 지식
스냅샷이다. 일반 구현·리뷰·문서 작업은 작업 관련 파일과 솔루션 설정을 읽고 진행하며 최신성을 확인하기 위한 인터넷
검색을 하지 않는다. 각 문서에는 구현 판단, 금지 패턴, 상태·접근성·검증 기준까지 저장한다.

## 기본 실행 모드: 로컬 우선

1. [프론트엔드 전문가 작업 헌장](../ai-prompt.md)을 기본 작업 계약으로 적용한다.
2. 현재 솔루션의 `package.json`, lockfile, 설정과 실제 코드를 먼저 확인한다.
3. 작업에 관련된 기술의 상위 guide를 읽고, `knowledgeIndex`가 있으면 작업에 맞는 상세 지식 팩만 추가로 읽는다.
4. 설치된 버전에서 지원되는 API만 사용한다.
5. 공식 링크는 근거 추적용이며 평상시 다시 열지 않는다.

다음 중 하나일 때만 `$aifrica-frontend-docs`로 인터넷의 공식 source를 확인한다.

- 사용자가 `최신화`, `업데이트`, `공식 문서로 다시 검증`, `보안 공지 확인`을 명시적으로 요청했다.
- 마이그레이션을 계획하며 현재 버전의 breaking change와 runtime 요구사항 확인이 필요하다.
- 로컬 스냅샷에 없는 보안·호환성 사실이 작업의 안전성을 좌우하고 추측으로 진행할 수 없다.

일반 UI 구현 요청, 컴포넌트 검색, List/Create/Detail 페이지 제작은 업데이트 요청이 아니다.

## 이 스냅샷이 AI에 주입하는 지식

각 기술 문서는 두 종류의 정보를 함께 가진다.

1. **최신 지식 주입**: 학습 시점이 오래된 AI가 모를 수 있는 API·Hook·syntax의 signature, 최소 version,
   사용 예제, lifecycle/caveat와 fallback
2. **Aifrica 적용 기준**: 그 기능을 현재 architecture, component, state, accessibility와 validation에
   어떻게 적용할지 정하는 운영 규칙

작업 AI는 관련 기술 문서의 `최신 지식 주입` 섹션을 먼저 읽어 API capability list를 만든 뒤 적용 기준을
사용한다. React와 Next.js는 API 표면이 크므로 상위 guide만 읽고 끝내지 않는다. 각각의 상세 지식
인덱스에서 task signal에 맞는 1~3개 pack을 선택해 signature·lifecycle·failure·test 지식을 활성화한다.
최신 API를 무조건 쓰는 것이 아니라 현재 `package.json`과 runtime에서 사용 가능하고 기존 방식보다
정확성·단순성이 좋아질 때 선택한다.

| 기술 | 현재 로컬에 주입된 최신 지식 예시 |
| --- | --- |
| React | [상세 지식 팩](./react/README.md): 전체 stable Hook, Actions, DOM/Form, SSR/RSC, Compiler, lint/test |
| Next.js | [상세 지식 팩](./nextjs/README.md): directives, file conventions, functions, cache, security, production |
| HTML | Popover, Dialog/Invoker Commands, `inert`, `hidden="until-found"`, exclusive details |
| CSS | container query, nesting, `:has`, `@scope`, subgrid, modern color, anchor/view transition |
| JavaScript | ECMAScript 2026의 `Math.sumPrecise`, `Iterator.concat`, `Array.fromAsync`, binary/JSON API |
| TypeScript | TS7 native compiler/LSP, TS6/7 defaults, compatibility, recent type·module·build 기능 |

기계 판독 가능한 전체 topic 목록과 필수 지식 entry 형식은 [sources.json](./sources.json)에 있다. 검증기는
각 기술 문서에 최신 지식 섹션, 실행 예제와 topic registry가 남아 있는지 확인한다.

## 횡단 코드 작성 규칙

| 작업 | 문서 |
| --- | --- |
| TS·JS·TSX·JSX import를 기능별로 묶고 짧은 표시 길이부터 정렬·검증 | [Import 정돈 가이드](../import-style.md) |

이 규칙은 프레임워크 버전 지식이 아니라 모든 프론트엔드 코드에 적용하는 Aifrica 작성 계약이다.
저장소에 ESLint·Biome·Prettier·import sorter 설정이 있으면 그 설정을 우선하고, 없으면 문서의
Aifrica 기능 그룹·표시 길이 순서를 사용한다.

## 기술별 가이드

| 기술 | 현재 문서 기준 | Aifrica 적용 가이드 |
| --- | --- | --- |
| React | 19.2, npm `19.2.8` 확인 | [상위 가이드](./react.md) · [상세 지식](./react/README.md) |
| Next.js | 16.3 App Router, npm `16.3.0` 확인 | [상위 가이드](./nextjs.md) · [상세 지식](./nextjs/README.md) |
| HTML | WHATWG Living Standard | [HTML](./html.md) |
| CSS | CSS Snapshot 2026 | [CSS](./css.md) |
| JavaScript | ECMAScript 2026 + ECMAScript 2027 current draft preview | [JavaScript](./javascript.md) |
| TypeScript | 7.0, npm `7.0.2` 확인 | [TypeScript](./typescript.md) |

기준일과 source URL의 기계 판독 원본은 [sources.json](./sources.json)이다. 위 버전은 원본이 2026-08-12에
관찰했다고 기록한 값이며, 이번 이관에서 공식 source를 재검증하지 않았다. 이 값은 프로젝트가 자동으로 해당 버전을 채택한다는 뜻이 아니다.

## 지식베이스 깊이와 로딩 비용

React·Next.js의 공식 문서 전체를 매 작업 프롬프트에 넣으면 관련 없는 token이 판단을 방해하고 응답이
느려진다. 그래서 정보량을 줄이지 않고 다음 세 층으로 나눈다.

1. 상위 guide: version gate, 최신 변화, Aifrica 원칙
2. 상세 index: task signal을 knowledge pack에 mapping
3. knowledge pack: API signature, 상태/lifecycle, 예제, caveat, fallback, validation

AI는 index를 반드시 읽되 상세 pack은 관련 파일만 선택한다. 문서 갱신 시 요약 몇 줄만 늘리는 것이 아니라
해당 pack과 `sources.json`의 topic/pack metadata를 함께 갱신한다.

## 적용 우선순위

1. 현재 솔루션의 `package.json`, lockfile, browser/runtime 지원 범위를 확인한다.
2. 이 디렉터리의 마지막 확인 스냅샷과 차이를 확인한다.
3. 로컬 문서에 기록된 기능·breaking change·보안 주의를 검토한다.
4. migration과 호환성 검증 후 의도적으로 버전을 올린다.
5. 프로젝트 검증 명령과 [UI Definition of Done](../design/quality.md)을 통과한다.

`latest`는 참고 신호이지 자동 업그레이드 명령이 아니다. 특히 Next.js의 release/LTS/security track과
TypeScript의 도구 API 호환성은 단순한 버전 숫자보다 우선해서 확인한다.

## 관리

- [갱신 정책](./update-policy.md): 사용자 요청 기반 공식 source 업데이트 절차
- [프론트엔드 전문가 작업 헌장](../ai-prompt.md): 모든 UI 작업에 기본 적용할 역할·판단·검증 계약
- [공용 작업 가이드](../README.md): 문서 구조와 source registry 일관성 검사

일반 UI 작업에는 `$aifrica-frontend-workflow`를 사용한다. 사용자가 업데이트를 요청한 경우에만
`$aifrica-frontend-docs`를 사용한다. 타입·디렉터리·의존 경계를 감사하거나 리팩터링할 때는
`$aifrica-frontend-architecture-refactor`를 추가로 사용한다. 이 스킬들이 없어도 `AGENTS.md`와 `docs/`만으로
같은 절차를 수행할 수 있어야 한다.
