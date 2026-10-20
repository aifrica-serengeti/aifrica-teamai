# 컴포넌트 가이드 작성 규칙

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

이 문서는 Figma 디자인에서 React로 변환된 뒤 **검증을 통과한** 컴포넌트별
디자인 가이드라인을 컴포넌트 단위 디렉터리로 보관하는 규칙을 정의한다.

새 프로젝트에서 기존 UI를 재현할 때는 이 파일보다 먼저
[문서 전용 UI 재현 계약](./docs-only-build.md)과 [reproduction.md](./reproduction.md)를 읽는다. 이 프로토콜은 모든
컴포넌트에 공통인 실행 환경, 의존성 closure, asset 전달, 화면 셸 조립, 상태 소유권과
시각 검증 기준을 고정한다.

## 적용 모드

이 문서의 완전한 재현 템플릿은 **외부 재현 모드**를 위한 것이다. 새 프로젝트에 문서만
전달해 구현해야 할 때에는 아래의 토큰 CSS와 구현 코드까지 포함한다.

소비 솔루션의 **유지보수 모드**에서는 실행 코드가 최종 기준이다. 이미 존재하는
`솔루션 token adapter`의 전역 토큰이나 공용 컴포넌트의 전체 CSS/TSX를 새 문서에 다시 복제하지
않는다. 대신 관련 foundation, 구현 파일, 변경된 상태·기하·접근성·검증 기준을 링크하고,
외부 재현에 필요한 경우에만 완전한 스냅샷을 추가한다.

새 공용 컴포넌트를 작성하기 전에는 [컴포넌트 작업 절차](./component-workflow.md)를 먼저 수행한다.
문서 작성은 신규 생성 결정 이후 단계이며, 기존 컴포넌트를 검색하지 않은 채 문서 디렉터리부터
만들지 않는다. 문서와 실제 구현 연결은 [컴포넌트 레지스트리](./component-registry.json)에 등록한다.

## 컴포넌트와 페이지 패턴을 구분한다

- 독립 API와 시각·상호작용 계약을 가지며 여러 화면에서 재사용되는 UI는
  `components/{Component}/`에 둔다.
- list·create·detail처럼 route 단위의 shell geometry, 조회·draft·submit 상태 소유권,
  공용 컴포넌트 연결을 설명하는 문서는 `patterns/{PageKind}Page.md`에 둔다.
- page pattern을 컴포넌트 카탈로그에 넣지 않고, 공용 컴포넌트가 특정 메뉴의 API나 route를
  알게 만들지 않는다.
- 페이지 패턴을 새로 추가하거나 갱신할 때는 `patterns/README.md`의 계약 형식과 인덱스도 함께
  확인한다. 패턴 속 공용 UI가 아직 카탈로그에 없다면 컴포넌트 문서를 먼저 작성한다.

## 디렉터리와 파일 규칙

- 가이드라인 코드는 원래 playground 경로나 프로젝트 전용 alias에 의존하지 않는다. portable
  import 구조는 [reproduction.md](./reproduction.md)의 @design,
  @components, @primitives mapping 또는 동등한 상대 경로를 쓴다.

- 디렉터리명은 컴포넌트명의 PascalCase를 사용한다.
  - 예: `Table/`, `DatePicker/`, `ProductCard/`
- 하나의 컴포넌트 = 하나의 디렉터리다. 여러 변형이 같은 컴포넌트의 일부라면 같은
  디렉터리의 해당 주제 문서에 섹션으로 나눈다.
- 컴포넌트 진입점은 항상 `{Component}/README.md`다.
- 파일이 추가되면 [components/index.md](./components/index.md)에 진입점 링크를 한 줄로 추가한다.
- 공용 API를 추가·변경·폐기하면 레지스트리의 aliases, source, export, dependencies, status를 함께 갱신한다.
- 기존 내용을 옮길 때는 원문을 먼저 섹션·코드 블록 단위로 대조한다. 새 구조에 대응되는
  목적 문서가 없다는 이유로 내용을 버리지 않고, 가장 가까운 문서나
  `implementation/reference.md`에 보존한다.

### 표준 구조

```text
components/{Component}/
├── README.md                 # 개요와 이 컴포넌트의 문서 탐색
├── definition.md             # 의존성, anatomy, layout, 공개 API
├── styles.md                 # 색상, 타이포그래피, 토큰, 시각 규칙
├── behavior.md               # 상태, 상호작용, 애니메이션
├── accessibility.md          # 키보드, ARIA, focus, hit area
├── verification.md           # 체크리스트, 재현 잠금, 검증 matrix
└── implementation/           # 실제 구현 코드가 있을 때만 생성
    ├── README.md             # 구현 전제와 구현 문서 탐색
    ├── css.md                # CSS, CSS-in-TS, 스타일 구현
    ├── typescript.md         # TypeScript, TSX, React 구현
    ├── examples.md           # 사용 예제와 조합 예제
    └── reference.md          # 위 언어 파일로 안전하게 나눌 수 없는 혼합 자료
```

모든 컴포넌트는 위의 최상위 6개 목적 문서를 가진다. `implementation/` 아래 파일은 실제
내용이 있을 때만 만든다. 빈 CSS·TypeScript 문서를 만드는 것은 탐색 비용만 늘리므로 금지한다.
CSS가 동작 설명과 강하게 결합되어 분리하면 의미가 끊기는 경우에는 `behavior.md`에 함께 두고,
동일 내용을 `implementation/css.md`에 중복 복사하지 않는다.

### 작업별 최소 읽기 범위

| 작업 | 먼저 읽을 문서 | 필요할 때 추가로 읽을 문서 |
| --- | --- | --- |
| 컴포넌트 역할·의존성 파악 | `README.md`, `definition.md` | `components/index.md` |
| 색상·간격·토큰 수정 | `styles.md` | `implementation/css.md`, foundation |
| React API·렌더링 수정 | `definition.md`, `implementation/typescript.md` | `examples.md` |
| 상태·키보드 동작 수정 | `behavior.md`, `accessibility.md` | TypeScript 구현 |
| 외부 프로젝트 재현·검수 | 위 문서 전체와 `verification.md` | `reproduction.md` |

## 언제 파일을 추가하는가

아래 조건을 모두 만족할 때 작성한다.

1. Figma MCP 로 디자인을 가져와 React 컴포넌트로 변환 완료
2. component `verification.md`의 state matrix를 독립 test harness에서 시각/동작 검증 완료
3. 디자인 토큰, 상태, 접근성 요구사항이 확정됨

검증 전 단계의 컴포넌트는 이 디렉토리에 두지 않는다.

## 가이드라인 작성 원칙 (핵심)

**외부 재현 모드의 컴포넌트 문서 묶음은 의존 문서·솔루션 mapping과 함께 컴포넌트를 100% 재현할 수 있어야 한다.**
새 프로젝트에서 foundation 문서와 컴포넌트 가이드라인만 전달받았을 때, 이 묶음만 보고
동일한 UI/UX 및 규칙을 완전히 같게 만들 수 있어야 한다.

따라서:

- **재현 잠금 정보를 명시**한다. 상위 shell/portal/scroll container와 조합될 경우에는
  (1) width·height·radius·clip의 소유자, (2) controlled state의 단일 소유자,
  (3) 명시적 breakpoint 외 자동 변형 금지, (4) exact SVG asset을 적는다.
- **검증 viewport와 state matrix를 명시**한다. 기본 상태만이 아니라 hover/focus/disabled,
  overlay, 긴 콘텐츠, light/dark와 필요한 responsive 상태을 기준 캡처로 확인한다.
- **색상값을 토큰 이름만 적지 말고 실제 hex/rgba 값도 함께 명시**한다.
  - ❌ 나쁜 예: "테두리는 `--border-bolder` 사용"
  - ✅ 좋은 예: "테두리 `1px solid #1c1c1c` (`--border-bolder`)"
- **플레이그라운드 파일 경로에 의존하지 않는다.** `소비 프로젝트의 playground 경로` 같은
  경로는 이 문서를 다른 곳에서 읽을 때 무의미하다. 파일 구조는 일반적인 위치만 안내.
- **다크 모드가 있으면 라이트/다크 양쪽 스펙을 모두 명시**한다.
- **실제 구현 코드(CSS, TSX)를 포함**한다. 복사-붙여넣기로 재현 가능한 수준.
- **토큰 정의 CSS(`:root`/`.dark` 블록)를 포함**한다. 새 프로젝트에서 변수를 그대로 정의할 수 있게.
- **검증 체크리스트를 포함**한다. 재현 후 확인해야 할 핵심 항목을 나열.
- **의존 컴포넌트를 명시**한다. 컴포넌트가 다른 공용 컴포넌트와 조합되는 경우, 그 목록을
  "의존 컴포넌트" 섹션에 명시한다. 이를 통해 재현자는 어느 컴포넌트를 먼저 만들어야 하는지
  알 수 있다. 상세 절차는 [components/index.md](./components/index.md)의
  "공용 컴포넌트 조합 규칙" 섹션을 참조.

## 외부 재현용 문서 묶음 작성 템플릿

새 가이드라인 디렉터리는 아래 분배를 따른다. 기존 단일 문서의 14개 항목은 삭제하지 않고
아래 목적 문서로 이동한다. 각 섹션은 해당 사항이 있을 때만 채운다. 상세 예시는
[`Radio/`](./components/Radio/README.md)를 참고한다.

```md
# {ComponentName}/README.md

이 문서는 의존 문서·솔루션 mapping과 함께 컴포넌트를 상세 상태·시각 계약을 구현하기 위한 완전한 스펙이다.

---

## 1. 개요

컴포넌트의 용도와 기술 기반(shadcn/Radix 커스텀 등).

# {ComponentName}/definition.md

## 2. 의존 컴포넌트

이 컴포넌트를 구현/재현하기 위해 필요한 공용 하위 컴포넌트 목록. 각 항목에 대해
(1) 가이드라인 존재 여부, (2) 구현 여부를 표로 명시.
재현자는 이 목록의 컴포넌트를 먼저 확보한 뒤 조합해야 한다.
의존이 없으면 "의존 컴포넌트 없음"으로 명시.
상세 절차는 [components/index.md](./components/index.md)의 "공용 컴포넌트 조합 규칙" 참조.

## 3. 구조 (Anatomy)

ASCII 트리 또는 다이어그램으로 컴포넌트 계층 구조.

## 4. 레이아웃 스펙

모든 수치(px). 간격/크기/정렬 규칙. 정렬 불변의 원칙 등 핵심 규칙 명시.

# {ComponentName}/styles.md

## 5. 색상 스펙 — 라이트 모드

상태×요소 테이블. 모든 색에 hex 값 명시. 핵심 규칙(예: "checked는 채워진 원")을 글로 풀어 설명.

## 6. 색상 스펙 — 다크 모드 (있을 경우)

라이트와 동일한 테이블 구조. .dark 클래스 적용 시 전환되는 값 명시.

## 8. 타이포그래피

폰트 패밀리, 크기/행간/굵기 표.

## 11. 디자인 토큰 정의 (CSS 변수)

:root 와 .dark 의 CSS 변수 정의를 그대로 복사 가능한 코드 블록으로.

# {ComponentName}/behavior.md

## 7. 상태

상태별 동작 + 시각 변화. read-only/disabled 분리 같은 구현 주의점 명시.

## 9. 애니메이션 (있을 경우)

상호작용(선택/hover 등)과 **다크/라이트 모드 전환** 시 transition 값과 지속시간.
핵심: 색상 전환은 **개별 컴포넌트 요소 레벨**에서 `transition: '<색상속성> 0.2s ease'` 로 적용.
전역 `*` 셀렉터 사용 금지. `transition: all` 금지. 컴포넌트 내 0.2s 통일.

# {ComponentName}/accessibility.md

## 10. 접근성

키보드, ARIA, 포커스, 히트 영역 등.

# {ComponentName}/implementation/README.md

필요한 패키지, primitive, 선행 컴포넌트와 CSS·TypeScript·예제 문서의 읽기 순서.

# {ComponentName}/implementation/css.md

복사-붙여넣기로 재현 가능한 실제 CSS 또는 CSS-in-TypeScript 코드.

# {ComponentName}/implementation/typescript.md

## 12. 구현 코드

복사-붙여넣기로 재현 가능한 실제 TypeScript·TSX 코드. 의존성(radix-ui 등) 명시.

# {ComponentName}/implementation/examples.md

단독 사용, variant, controlled state, 의존 컴포넌트 조합 예제.

# {ComponentName}/implementation/reference.md

언어별로 안전하게 분리할 수 없는 혼합 구현 자료. 해당 자료가 있을 때만 생성.

# {ComponentName}/verification.md

## 13. 검증 체크리스트

재현 후 확인할 항목 목록. 픽셀 단위 색상/두께/정렬 점검 포함.

## 14. 재현 잠금 계약

상위 조합에서 이 컴포넌트가 소유하는 geometry/state/asset, 허용된 반응형 변형, 기준
viewport·상태 matrix를 적는다. 공통 형식은 reproduction.md를 따른다.
```

## 인덱스

각 컴포넌트의 `README.md`는 [components/index.md](./components/index.md)의 목록에서
링크된다. 디자인 문서 전체 진입점은 [README.md](./README.md)이며,
foundation·카탈로그·재현 프로토콜의 역할을 분리해 안내한다.
