# 구현 연결과 재현 검증 절차

이 절차는 공통 참조 계약과 솔루션 profile을 함께 적용할 때 사용한다. 제품별 shell의 정확한 치수,
브랜드 자산, 메뉴 구조는 솔루션 확장에 속한다. 먼저 [계약 수준](./contract-levels.md)과
[문서 기반 구현](./docs-only-build.md)을 읽는다.

## 실행 환경

소비 프로젝트의 React·TypeScript·runtime·style 도구·primitive package 버전을 확인한다. 문서 예제의 API는
과거 source에서 추출한 참조이며 현재 package와의 호환성을 대신 검증하지 않는다. `@design`, `@components`,
`@primitives`, `@assets`는 문서의 역할 alias다. 대상 저장소의 공개 진입점으로 매핑하고 특정 `src` 구조를
새로 만들도록 요구하지 않는다.

- reset과 `box-sizing`을 확인하고, native control은 font를 상속한다.
- 실제 제공된 font·weight가 로드된 뒤 측정한다. fallback 시 glyph 폭·height가 달라질 수 있다.
- 전역 `transition: all`, 임의 transform scale, focus outline 제거를 사용하지 않는다.
- 기준 시각 캡처는 viewport·zoom·DPR·테마·locale·font·animation 상태를 기록한다. viewport 값은 profile 입력이다.

## 단일 소유권

| 대상 | 소유자 | 상위 조합의 책임 |
| --- | --- | --- |
| Button·Icon·Input | 해당 public component | 값·variant·slot 연결 |
| Menu·Tooltip·Dialog | 해당 overlay | open·trigger·focus 계약 연결 |
| ScrollArea | 해당 scroll component | 하나의 scroll boundary와 가용 높이 제공 |
| application navigation | shell parent | collapsed·active·expanded 상태와 Header/SNB 연결 |
| shell radius·clip·offset | shell 한 곳 | 자식에서 중복 border/radius 금지 |
| query·draft·validation·mutation·permission | page 또는 가까운 page hook | 표현 컴포넌트는 값·callback만 소비 |

shell의 expanded·collapsed·선택·branch 상태를 합치지 않는다. 반응형에서 자동으로 navigation 상태를
바꿀지는 솔루션 UX 정책으로 정하며, Header와 navigation이 서로 다른 state를 소유하지 않게 한다.
`min-width: 0; min-height: 0`과 scroll owner가 일치해야 한다. 제품의 특정 header 세대나 240/60 rail은
공통 전제가 아니다.

## dependency closure

registry의 direct dependency를 재귀로 계산하고 leaf부터 매핑한다. 예제 셀에서만 쓰이는 Avatar·Status·
Pagination을 Table 내부 의존성으로 끌어들이지 않는다. 실제 구현에 차이가 있으면 mapping과 문서의
의도·실행 근거를 비교한 뒤 수정한다. 문서가 구현 존재의 증거가 되지 않는다.

## 자산

제품 logo·navigation·vendor 자산은 솔루션의 허용 목록·라이선스·대체 텍스트·size·viewBox와 함께 제공한다.
공통 `Icon`과 `PrivateIcon`의 역할만 공유하며 이름 목록은 솔루션 asset map이 소유한다. 자산이 없으면
의미가 다른 emoji·다른 브랜드로 최종 대체하지 않는다. 일반 system icon fallback 허용 여부를 profile에
기록한다. 이 저장소는 font·SVG·이미지 binary를 번들하지 않는다.

## 검증 matrix

| 분류 | 필수 확인 |
| --- | --- |
| control | enabled·hover·pressed·focus-visible·disabled, 명시 variant, light/dark |
| input/select | empty·filled·invalid·readOnly·disabled, label·description·keyboard |
| overlay | keyboard open/close·Escape·focus trap/restore·portal·긴 content·scroll boundary |
| data display | loading·empty·error·selection·sort·overflow/sticky·background refresh |
| page | query/draft/validation/mutation/permission ownership, List/Create/Detail matrix |
| responsive | 실제 profile viewport, intrinsic overflow 경계, 긴 한글·영문·번역, 200% zoom |
| motion | reduced-motion, pending feedback, 취소·cleanup, 중복 overlay 없음 |

상태마다 focus 위치·accessible name·live announcement·가능 action·retry/복구를 적는다. 정적 screenshot만으로
keyboard·mutation 안전성을 통과로 표시하지 않는다. 현재 솔루션의 typecheck/lint/test/build 중 실제 존재하는
명령을 실행하고 미실행 항목을 구분한다.

공용 계약 변경은 [Evolution](./evolution.md), 문서·registry 동기화는 [Authoring](./authoring.md)을 따른다.
