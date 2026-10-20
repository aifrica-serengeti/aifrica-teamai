# CMP frontend 확장 계약

공용 frontend를 확장하는 아래 절차는 inheritCommon을 켜고 frontend-common 묶음을 선택한 경우에 적용한다.
공용을 끈 제품은 공용 문서·registry·스킬을 요구하지 않고 현재 제품의 자체 지침을 사용한다.
선택·해제 방법은 DOCS_ROOT/common/frontend-bundle.md를 따른다.

이 문서는 frontend·UI 작업의 확장·채택 계약이다. backend 작업에 적용하지 않는다.
[공통 해석 계약](../common/resolution.md)을 따르고 frontend 작업일 때
`DOCS_ROOT/frontend/contracts/frontend-extension.schema.json`을 읽는다.
[frontend.json](./frontend.json)은 CMP에서 확인한 공유 patch를 저장하며 현재 `draft`다.

[CMP 추가 계약](./frontend-contract.md)에서 기술·아키텍처·타입·API/메뉴 경계·페이지 연결·검증을 읽는다.
공용 스킬은 `frontend-common` 역할이 소유하고 CMP 프로젝트는 이 추가 계약을 제공한다.

기존 `serengeti-cmp`에서 추출한 공통 기준을 적용할 수 있지만, 원본의 JDC 테마·shell·메뉴·업무 흐름은 CMP 전체의 기본값이 아니다.

## 공통으로 유지할 기준

- 컴포넌트의 의미·native semantics·공개 API와 상태별 피드백을 유지한다.
- keyboard 조작, 이름과 label 연결, focus 표시·이동·복원, reduced motion, 색 외 상태 표현을 유지한다.
- List의 query/filter/pagination/selection은 page가 소유한다. loading·empty·error·refresh를 구분한다.
- Create의 draft·validation·submit과 서버 오류·재시도·중복 제출 방지·이탈 보호는 page가 소유한다.
- Detail의 원본·편집 draft를 분리하고 저장·취소·권한·not-found·파괴적 동작과 unsaved changes를 다룬다.
- 하위 table/field/dialog에 API·라우팅·상위 page 상태를 숨기지 않는다.

공통 기준의 숫자·중립색·font 예시는 추출 baseline이다. 회사가 모든 솔루션에 채택한 값으로 해석하지 않는다.
CMP의 primary, header/navigation, page 폭·여백·page size는 실제 구현과 요구를 확인해 선택한다.
Frontend 작업일 때 `DOCS_ROOT/frontend/design/contract-levels.md`와
`DOCS_ROOT/frontend/design/patterns/README.md`에서 계약 경계와 List·Create·Detail 패턴을 읽는다.

## 실제 제품에 연결하는 순서

1. TeamAI의 현재 프로젝트 또는 로컬 `.aifrica/frontend.json`의 `solution`이 `cmp`인지 확인한다.
   선택이 다르거나 여러 솔루션이 선택돼 있으면 다른 설정을 조용히 합치지 않는다.
2. 제품의 package/config, token 선언, architecture 문서, component registry, 실제 source·public export를 읽는다.
3. `paths.architecture`, `paths.componentRegistry`, `paths.designTokens`에 **존재를 확인한 제품 상대경로**를 넣는다.
   미확인 경로는 현재처럼 `null`로 둔다.
4. 공통 registry id에 맞춰 `components`를 매핑한다. source와 export를 확인했을 때만
   `status: implemented`로 기록한다. 빈 map 또는 `unmapped`는 제품에 구현이 없다는 뜻이 아니다.
5. `tokens`의 brand/color/typography/border/spacing/radius/elevation/motion에 확인한 의미 token을 넣는다.
   palette 이름과 brand primary를 구분하고 light/dark 및 hover/focus/error/disabled 상태를 함께 검증한다.
6. `pagePatterns.list/create/detail`에 확인한 maxWidth, pageSize·options, layout, sections,
   navigationPolicy를 추가한다. 공통 page 상태·접근성 계약을 그대로 적용한다.
7. 제품 검사 명령과 해당 UI 상태를 검증한 뒤 채택 범위에 맞춰 `status: active`로 바꾼다.

전체 CMP에 공통인 변경만 이 namespace에 기록한다. 특정 고객·배포·개별 저장소에서만 필요한 값은
명시 선택 profile 또는 제품의 `.aifrica/frontend.json`이 소유한다. 검증하지 않은 업무 데이터,
필드·메뉴·route·테마 값과 `serengeti-cmp`의 source 경로를 편의상 기본값으로 넣지 않는다.

## Override를 추가하는 방법

공유 patch와 제품 로컬 patch는 같은 schema를 사용한다. 제품에서 로컬 채택 파일을 만들 때는 최소한
다음 식별자를 사용하고, 실제로 확인한 key만 추가한다.

```json
{
  "schemaVersion": 1,
  "solution": "cmp",
  "status": "draft"
}
```

- 객체는 key별 재귀 병합한다. 누락된 key는 상위 계약을 상속하며 허용된 경로의 `null`은 미매핑이다.
- 배열은 전체 교체한다. `documentOverrides`, `exceptions`, pageSizeOptions·sections의 일부만
  추가하려는 경우에도 최종 목록 전체를 작성한다.
- 문서로 정책을 보충하려면 제품 소유의 Markdown 파일을 먼저 작성한 뒤 그 **제품 상대경로**를
  `documentOverrides`에 추가한다. 어떤 공통 항목을 어떤 근거로 변경하는지 제목·적용 범위·검증을 적는다.
- 의미·행동 계약에 차이가 필요하면 `exceptions`에 `contract`, `reason`, `scope`를 기록한다.
  `owner`, `reviewAfter`를 추가해 후속 검토를 추적할 수 있다. 테마 차이만으로 접근성 기준을 제거하지 않는다.
- 오타 key와 소비 저장소 밖의 경로는 허용하지 않는다. schema 통과는 실제 구현과 동작이 맞다는 증거가 아니다.

합성 순서는 **공통 의미 계약 → CMP 확장 → 명시 선택 profile → 제품 로컬 채택 설정**이다.
이는 Aifrica 문서·검증 도구가 정의한 계약이며 TeamAI가 JSON이나 CSS를 자동 적용하는 기능이 아니다.
공통 스킬과 같은 이름의 스킬을 프로젝트 namespace에 복제해 덮어쓰지 않는다.

## Profile 선택

현재 고객별 profile은 제공하지 않는다. 원본 고객 자료는 추출·비교 근거이며 별도로 배포하지 않는다.
공용 사용은 `frontend-common` + `cmp`를 선택한다. frontend 기본 역할을 유지하면 frontend-common을 추가한다.

새 profile은 `profiles/<profile-id>/README.md`에 대상·근거·공통 대비 차이·확인 범위를 기록하고,
실제 검증한 `status: active`의 `frontend.json`을 함께 제공한다. `--profile` 또는 제품의
`.aifrica/frontend.json`에서 명시적으로 선택한다. 폴더 존재, 솔루션 선택 또는 유사한 화면만으로 profile을 추정하지 않는다.

## 검증과 배포

공용 저장소에서 의존성을 설치한 후 `npm run verify`와
`npm run resolve -- --solution cmp`로 구조와 공유 patch의 합성 결과를 확인한다.
실제 로컬 채택은 `npm run resolve -- --local /absolute/path/to/product/.aifrica/frontend.json`으로
확인하며 선언한 제품 경로·문서·source의 존재를 검사한다. 제품 자체의 lint/typecheck/test/build 및
필요한 화면 상태·keyboard 검증은 해당 제품에서 실행한다.

TeamAI 배포는 `docs/cmp/`를 `.teamai/docs/cmp/`에 보존한다. 이 문서의
`../common`, `../frontend` 상대 참조도 같은 namespace 관계를 사용한다.
프로젝트 규칙을 받는 backend 작업에 frontend 테마·컴포넌트·페이지 패턴을 강제로 적용하지 않는다.
