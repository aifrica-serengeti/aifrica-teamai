# 컴포넌트 탐색·재사용·생성 절차

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

이 문서는 AI와 개발자가 UI를 구현하기 전에 기존 컴포넌트를 확인하고, 중복 없이 확장하거나
새 컴포넌트를 만드는 판단 절차다. 컴포넌트 이름만 검색하지 않고 의미, 별칭, 실제 export까지
확인한다.

## 작업 모드 선택

| 모드 | 사용 시점 | source/export 확인 |
| --- | --- | --- |
| 기존 제품 유지보수 | 이미 공용 구현이 있는 제품을 수정·확장 | 필수 |
| 문서 전용 재현 | 새 환경에서 docs bundle만으로 처음 구현 | 금지. 문서 공개 계약으로 새 export를 정의 |

문서 전용 재현은 [문서 전용 UI 재현 계약](./docs-only-build.md)을 먼저 적용한다. 아래의 실제 구현
탐색 절차는 기존 제품 유지보수 모드에만 해당한다.

## 기존 제품 유지보수의 작업 전 필수 탐색

1. [컴포넌트 레지스트리](./component-registry.json)에서 이름과 `aliases`를 검색한다.
   선택 솔루션의 `design/component-registry.json`이 있으면 함께 검색한다. dependency closure는 두 registry의
   합집합에서 찾고 각 문서는 자신을 선언한 registry 기준으로 해석한다.
2. [컴포넌트 카탈로그](./components/index.md)에서 역할과 조합 규칙을 확인한다.
3. 대상 솔루션에서 레지스트리의 `implementation.source`와 `implementation.export`를 확인하고,
   값이 없거나 오래되었다면 `rg`로 컴포넌트명, alias, 유사한 ARIA role과 UI 문구를 검색한다.
4. 후보 컴포넌트의 `README.md`, `definition.md`, `behavior.md`, `accessibility.md`를 읽고
   필요한 상태와 공개 API가 있는지 확인한다.
5. 상위 컴포넌트라면 레지스트리의 `dependencies`를 따라 leaf까지 확인한다.

문서에 있다는 이유만으로 코드가 솔루션에서 구현을 확인했다고 단정하지 않는다. 반대로 코드 검색만으로
의미가 같다고 판단하지 않는다. 문서 계약과 실제 export가 모두 확인되어야 재사용 가능하다.

## 네 가지 결정

| 결정 | 선택 조건 | 작업 결과 |
| --- | --- | --- |
| 재사용 | 의미, 상태, 접근성 계약이 같고 필요한 API가 이미 있음 | 기존 컴포넌트를 그대로 import한다. |
| 확장 | 의미는 같고 크기·톤·상태 하나만 부족함 | 기존 컴포넌트에 호환 가능한 variant나 slot을 추가한다. |
| 조합 | 둘 이상의 기존 컴포넌트로 책임을 침범하지 않고 만들 수 있음 | page 또는 가까운 shared 계층에서 조합한다. |
| 신규 생성 | 독립적인 의미·API·접근성 계약이 있고 기존 조합으로 표현 불가 | 가장 좁은 소유 범위에 먼저 만들고 검증 후 공용 승격을 검토한다. |

### 확장과 신규 생성 구분

- 모양만 다르고 사용자 목적과 semantic role이 같으면 새 이름을 만들기보다 variant를 검토한다.
- API 옵션이 특정 메뉴의 DTO, route, 권한명을 알아야 한다면 공용 variant가 아니라 page 조합이다.
- 기존 컴포넌트에 조건문을 계속 추가해야 하거나 키보드 모델이 달라지면 별도 컴포넌트를 검토한다.
- raw SVG, focus ring, portal, loading animation을 상위 컴포넌트에 복제하는 것은 신규 생성이 아니라
  의존성 누락이다.

## 소유 위치 결정

아래는 **역할 기준**이다. 괄호 안 이름은 소비 프로젝트가 자유롭게 정한다. 특정 repository path는
공개 계약이 아니다.

| 사용 범위 | 기본 역할 |
| --- | --- |
| 한 page에서만 사용 | page-local presentation module |
| 같은 menu의 둘 이상 page에서 사용 | feature-local shared UI module |
| 서로 다른 domain/menu에서 같은 계약으로 사용 | public common component module |
| application shell 전반에서 사용 | public layout component module |
| 낮은 수준 디자인 primitive | public primitive module |

두 번째 사용처가 생겼다는 사실만으로 전역 공용으로 올리지 않는다. 두 사용처의 의미·상태·API가
같을 때 가까운 shared 계층으로 승격하고, 서로 다른 domain에서 반복 검증된 후에만 public common
component 계층으로 올린다.

## 페이지 작업 연결

컴포넌트 결정을 마친 뒤 route가 List, Create, Detail 중 하나라면
[페이지 패턴](./patterns/README.md)을 적용한다. page가 query, draft, validation, submit, confirmation을
소유하고 Table, field, Dialog 같은 하위 컴포넌트에는 API·route·page state를 숨기지 않는다.

## 신규 공용 컴포넌트 체크리스트

- [ ] 유지보수 모드면 레지스트리와 실제 코드, 문서 전용 모드면 registry id/alias/docs에서 동일 의미의 후보를 검색했다.
- [ ] 재사용·확장·조합으로 해결할 수 없는 이유를 작업 기록이나 PR에 남겼다.
- [ ] 가장 좁은 소유 위치에서 먼저 검증했다.
- [ ] 공개 API, 상태, 키보드, ARIA, light/dark, responsive 계약이 확정되었다.
- [ ] [작성 가이드](./authoring.md)의 6개 필수 문서와 필요한 구현 문서를 작성했다.
- [ ] 레지스트리에 문서·직접 의존성을 등록했고, 기존 제품에 실제 구현을 연결한 경우에만 source/export metadata를 갱신했다.
- [ ] 카탈로그에 진입점과 한 줄 설명을 추가했다.
- [ ] [UI 완료 기준](./quality.md)과 자동 검증을 통과했다.

## 판단 기록 형식

AI 작업 결과와 PR에는 아래 내용을 짧게 남긴다.

```text
UI 분류: List | Create | Detail | Component | Other
검색 후보: Button, SplitButton, {실제 코드 경로}
결정: reuse | extend | compose | create
이유: 기존 API가 요구 상태를 충족 / 접근성 모델이 달라 신규 계약 필요 등
의존성: Icon → IconButton → 대상 컴포넌트
검증: guidelines, typecheck, lint, test, build 중 실행한 항목
```

문서 전용 재현의 `검색 후보`에는 실제 코드 경로 대신 component id와 docs entry를 기록한다.
