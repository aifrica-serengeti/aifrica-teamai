# AgentHubFlyout 검증

[실측](../../references/flyout.figma.json)·[변수](../../references/flyout.variables.figma.json)·
[자산](../../references/flyout.assets.json)·[모션 채택](../../references/flyout.motion.json)·
[조합 대조](../../references/flyout-composition.json)를 비교합니다.
정적 source/치수 match는 소비 제품 runtime 일치가 아닙니다.

| 확인 대상 | 기대 결과 |
| --- | --- |
| Shell |280×398/max398·white/#DDD1/r12/Mid·border 포함 |
| Header |정확 source·폭278와 title/count/meta override,54px 샘플 |
| Footer |정확 source·원본29/pb4/transparent 대비 실제33/pb8/white/y365..398 |
| Items |실제16개 중11표시·5숨김, default 원본 재사용·폭278 |
| Matrix |실제10종만, pressed검정10%/selectedblue·들여쓰기56 |
| Glyph |source20/display16/선1.25, exact native16 파일·chevron |
| 모션 |Menu 기준150ms/ease/both/6px·side·closed guard·Presence |
| 증거 경계 |root property getter 미수집을null로 보존, footerfalse·실행·전체matrix 미검증 |

소비 제품에서는 다음을 검증합니다.

1. 실제 popup/Tree/row 구현과 public export를 조사하고 재사용 또는 신규 export로 연결합니다.
2. title/count/meta·긴 label·번역·footer 유무·협소 viewport에서 크기·ellipsis·끝 행 접근을 확인합니다.
3. header/footer 높이를 실제 확보하고 리스트 scroll·최종 focus 행·outline이 잘리지 않는지 확인합니다.
   280×398 한 줄 비교에서 Header y5/내용54+고정 구분9=총63, body y68..365/297, Footer y365..398/33을 확인합니다.
   shell bottom4를 이중 예약해 Footer가5px 위로 당겨지지 않는지, 실제 header/footer p8과 standalone footer bottom4를 구분하는지 검사합니다.
   body만 기존 ScrollArea/AHScrollbar의4px thumb·11px gutter를 사용하고 native bar가 중복되지 않는지 확인합니다.
   Header의 선이 body 밖에 한 번만 있고 스크롤 시작·중간·끝에서 y63..64에 고정되는지 확인합니다.
   standalone Header는 withDivider:false/54px, shell은 true/63px이며 flex gap2를 구분선 앞에 중복하지 않아야 합니다.
4. 평면 recipe가 disclosure 없이 계속 동작하는지 확인합니다. 폴더를 제공하면 optional disclosure 계약을 함께 연결하고
   parent expandedIds를 내부 state로 복제하지 않습니다. 누락된 owner·disabled 폴더는 펼침/파일 선택을 모두 실행하지 않습니다.
   파일 선택 한 번에 한 callback만 발생하며 결과 변화·비동기·권한·disabled 때 focus를 보존하거나 적절히 복귀하는지 확인합니다.
5. 폴더 버튼의 native Enter/Space·aria-expanded·aria-controls와 중첩 ul을 검사합니다. children:[]도 폴더로 취급하고,
   폴더 클릭은 펼침만·파일 클릭은 선택만 실행합니다. 계층만으로 role=tree·중첩 버튼·중복 keydown을 추가하지 않습니다.
   선택과 expanded의 분리·close/focus 복귀를 검사합니다. 별도 Tree/listbox/dialog를 채택한다면 해당 의미 계약을 추가로 완성합니다.
   갤러리의 popup ‘분석 자료’와 바로 보이는 ‘파일 모음’을 각각 클릭·Enter/Space로 접고 펼쳐 실제 자식이 나타나는지 확인합니다.
   정적 folder-open 그림만 제공한 예제를 동작 구현의 증거로 사용하지 않습니다.
6. [motion](./motion.md)의4side·fallback·닫힘 도중 재열기·close 뒤 클릭 차단·reduce 및 exit 정리를 실행 검증합니다.
   위치 transform과 모션 transform이 충돌하지 않아야 합니다.
   폴더 높이250ms와 down glyph0°↔−90° 회전200ms의 중간 프레임을 별도로 확인합니다.
   닫기 시작 시 subtree의 Tab·읽기·pointer를 차단하고 내부 focus를 부모 폴더로 복귀시킵니다.
   빠른 반복·중첩 폴더·닫는 중 재열기·패널 닫힘·unmount·reduce 변경에서 잔상이나 늦은 제거가 없어야 합니다.
7. lint/typecheck/test/build·시각·모션·키보드 결과와 실제 source/export를 로컬 mapping에 기록합니다.

행 focus는 [Item의 공용 Menu 계승](../AgentHubFlyoutItem/styles.md#공용-menu의-행-focus-계승)을 함께 검사합니다.
키보드 focus에서 기본 outline 없이 inset2px ring 하나만 표시되고, 같은 행 hover에서는 ring이 숨겨져야 합니다.
선택 배경·28px 행 높이·Header/Footer·스크롤 위치는 움직이지 않으며 reduced-motion/forced-colors 대안도 확인합니다.

root 전체 propertyDefinitions는 read-only getter 오류 때문에 미수집됐습니다.
생성 context의 footertrue·실제 visible binding만 관찰했고, 속성이 없거나{}라고 확정하지 않습니다.
미제공 disabled/loading/error/dark와 folder/child pressed·selected는 채택 범위와 추가 근거를 별도로 남깁니다.
