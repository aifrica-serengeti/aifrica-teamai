# AgentHubMenu 검증

[실측](../../references/menu.figma.json), [변수](../../references/menu.variables.figma.json),
[자산](../../references/menu.assets.json), [조합 대조](../../references/menu-composition.json)를 비교합니다.
같은 source/geometry를 보존했다는 정적 결과는 소비 앱 실행·전체 상태 검증이 아닙니다.

| 대상 | 기대 결과 |
| --- | --- |
| 패널 | white/#DDD1 INSIDE/r12/py4·border 포함, 기존 Mid와 효과 값 동일·style ID 차이 유지 |
| 조립 | default/enabled 실제 원본3135:15951의11행,160→158 FILL, x1/y5+28n |
| 크기 | 11×28+padding8+border2=318 샘플, 제품 전역 max나 행 수로 고정하지 않기 |
| 각 row | header/divider/icon/value/check/chevron false, 저장된 숨김 자식까지 source·속성 참조 보존 |
| 스크롤 | hidden FRAME·Booleanfalse·overflowNONE과 실행 viewport 구분 |
| 상태 | default/destructive×4구성, 일부 요소만 빨강·disabled 우선, header/line 전체 opacity 금지 |

소비 제품에서는 다음을 확인합니다.

1. 실제 Menu source·public export·primitive와 API를 비교하고 style adapter 또는 새 solution export로 연결합니다.
2. optional slot을 켜고 header·divider·glyph·value 조합에서 폭·높이·ellipsis·focus·그룹 의미를 검증합니다.
   all-on 계산값을 시각 검증 결과로 쓰지 않습니다.
3. hover/pressed/disabled·키보드 focus·서브메뉴·선택된 항목이 기존 의미를 유지하는지 확인합니다.
   미제공 상태 palette는 제품에서 채택하고 근거를 남깁니다.
4. 한 Enter/선택에 명령이 한 번만 실행되는지, disabled와 hidden target이 실행되지 않는지 확인합니다.
5. ↑/↓·Home/End·Enter·Escape·서브메뉴 이동·닫힘 후 trigger 복귀를 검사합니다.
   checked 채택 시 role·상태 owner와 반복 선택 정책도 확인합니다.
6. 협소 viewport·긴 라벨·옵션이 많은 메뉴에서 collision·실제 스크롤·마지막 focus 항목·표시 자산을 확인합니다.
7. lint/typecheck/test/build와 시각·키보드 검증 결과, 실제 source/export를 제품 로컬 mapping에 기록합니다.

제품이 optional `icon` adapter를 채택하면 다음 회귀를 추가로 확인합니다.

| 입력·상태 | 기대 결과 |
| --- | --- |
| 실행·편집·공유·삭제 | play·edit·link·trash16px가 각각 출력되고 label·명령 한 번 실행을 유지 |
| `icon` + `showIcon=true` 또는 false | 명시 glyph 한 개만 출력, edit 중복 없음 |
| `icon` 없음·`showIcon=true` | 기존 default/destructive/disabled edit16 자산·paint 유지 |
| `icon` 없음·`showIcon` 생략 또는 false | leading glyph·빈 슬롯·추가 gap 없음, label 필수 유지 |
| 기존 자산 경로 입력 | 소비 제품의 자산 해석 경계·16px 출력·상태별 paint 확인 |
| check·value·실제 submenu 조합 | 기존 check/보조 문구/chevron 출력·role·선택 owner·focus·키보드 이동 유지 |
| 접근성·motion | glyph는 aria-hidden·img alt 빈 값, label의 전체 접근성 이름·기존 focus·배경 전환·popup motion 유지 |

Figma 예약 메뉴2978:59542/2978:62200의 glyph 구분과 제품이 채택한 문자열 adapter를 구분해 근거를 기록합니다.
기존 menu 자산 목록·실측 snapshot은 보존하고 실제 source/export·지원 범위·테스트 결과는 해당 제품 로컬 mapping에서 확인합니다.

optional `checked` 채택 시 true/false 각각의 `menuitemcheckbox`·`aria-checked`와 생략 시 기존 `menuitem`·속성 부재를 비교합니다.
`checked=true/showCheck=false`와 `checked=false/showCheck=true`도 비교해 실제 의미와 장식 표시가 독립적인지 확인합니다.
호출자의 선택·해제 갱신과 한 번 실행·disabled 차단·닫힘 및 양방향 pointer/keyboard focus 이동을 검증합니다.
`role="option"`은 `checked` 전달 여부와 무관하게 기존 option·`aria-selected`를 유지하고 `aria-checked`를 출력하지 않아야 합니다.

문서 수신·asset 보존·정적 검사만으로 implemented·실행 일치·다크 모드 지원을 선언하지 않습니다.

## 2026-10-26 예약 페이지 점검 보강

내장·외부 trigger의 ↓첫/↑마지막 활성 항목, disabled 건너뜀, 첫 RAF 전 Escape·Tab,
상위 Dialog 보존·trigger 복귀·다음 control focus 비간섭과 명령 한 번 실행을 검증합니다.
외부 anchor 교체·unmount 때 listener와 이전 진입 예약도 정리되어야 합니다.
