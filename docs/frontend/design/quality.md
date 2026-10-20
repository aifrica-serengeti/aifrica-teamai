# UI Definition of Done

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

이 문서는 Aifrica 솔루션의 UI 작업이 완료되었다고 판단하는 공통 기준이다. 시각적으로 비슷한
기본 상태 하나가 아니라 공개된 상태, 상호작용, 접근성, 실제 프로젝트 검증까지 확인한다.

## 모든 UI 작업의 공통 완료 조건

- [ ] [컴포넌트 탐색 절차](./component-workflow.md)에 따라 유지보수 모드에서는 실제 export를,
  문서 전용 재현에서는 registry id/docs/dependency closure를 확인했다.
- [ ] foundation token을 사용하고 임의의 색상·간격·아이콘을 추가하지 않았다.
- [ ] light/dark, 기본·hover·pressed·focus·disabled 및 해당 컴포넌트가 지원하는 상태를 확인했다.
- [ ] mouse 없이 주요 기능을 수행할 수 있고 focus 순서와 focus 복원이 맞다.
- [ ] accessible name, label, role, 상태 ARIA, 오류 연결을 확인했다.
- [ ] 긴 한글·영문, 빈 값, 최대 길이, 좁은 viewport에서 잘림과 overflow를 확인했다.
- [ ] loading·empty·error·retry·refresh 중 작업 범위에 해당하는 상태를 확인했다.
- [ ] 실제 `package.json`에 정의된 typecheck, lint, test, build 명령을 실행했다.
- [ ] 공용 계약이 바뀌었다면 레지스트리, 카탈로그, 컴포넌트 문서를 함께 갱신했다.
- [ ] 실행하지 못한 검증과 남은 위험을 작업 결과와 PR에 적었다.

## 작업 종류별 필수 검증

| 작업 | 최소 검증 |
| --- | --- |
| token·스타일 | 기준 viewport의 light/dark와 상태별 시각 비교, contrast 확인 |
| primitive | unit/interaction test, keyboard, focus, ARIA, 상태 matrix |
| compound component | 직접 의존성 재사용, portal·controlled state, dependency closure 검증 |
| List page | 최초 loading, empty, 검색 결과 없음, error/retry, pagination/filter 복원 |
| Create page | field/form 오류, 중복 submit 차단, cancel/save 확인, 성공·민감 결과 처리 |
| Detail page | invalid route, not-found/forbidden, loading/refresh, original/draft, 저장 충돌 |
| layout·navigation | landmark, active route, focus 이동, 좁은 폭, overlay와 scroll boundary |
| docs-only shell/page | 현재 제품 source 없이 51 component closure, 선택한 솔루션 shell matrix, 세 page state matrix |

## 자동 테스트 기준

프로젝트에 이미 채택된 테스트 도구를 우선 사용하며, 문서가 특정 라이브러리를 강제하지 않는다.

1. 순수 변환·validation·state reducer는 unit test를 작성한다.
2. 클릭, 키보드, focus, dismiss, controlled callback은 interaction test로 검증한다.
3. 접근성 검사 도구가 구성되어 있으면 변경한 대표 상태에서 자동 검사를 통과시킨다.
4. visual regression 도구가 있으면 기본 상태만 찍지 않고 verification 문서의 state matrix를 사용한다.
5. route 단위 mutation과 권한·오류 흐름은 프로젝트의 e2e 범위에 포함한다.

자동 접근성 검사는 keyboard 흐름, 문구 의미, focus 복원을 대신하지 않는다. 자동 검사를 통과해도
컴포넌트의 `accessibility.md`에 적힌 수동 검증을 수행한다.

## 시각 검증 증거

- 재현 작업은 [재현 프로토콜](./reproduction.md)의 viewport, DPR, font, animation 조건을 따른다.
- 변경 전후 또는 디자인 기준과 구현 결과를 같은 viewport와 state로 비교한다.
- 차이가 의도된 변경이면 token/API/문서 중 기준이 된 위치를 기록한다.
- 임시 스크린샷 파일은 저장소의 장기 문서 원본으로 사용하지 않는다. 팀의 PR 첨부 또는 기존
  visual regression 저장 규칙을 따른다.

## 완료로 보지 않는 경우

- 유지보수 모드에서 카탈로그만 보고 실제 구현·export를 확인하지 않았다.
- 문서 전용 재현에서 현재 제품 source를 보거나 문서에 없는 값을 기존 화면에서 가져왔다.
- 기존 컴포넌트를 복사해 page 전용 이름으로 다시 만들었다.
- loading 또는 happy path만 구현하고 empty/error/disabled 상태를 생략했다.
- type 오류, lint 오류, 실패한 test를 작업과 무관하다고 근거 없이 제외했다.
- 문서와 코드의 차이를 발견했지만 어느 쪽이 기준인지 기록하지 않았다.
