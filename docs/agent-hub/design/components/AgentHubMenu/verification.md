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

문서 수신·asset 보존·정적 검사만으로 implemented·실행 일치·다크 모드 지원을 선언하지 않습니다.
