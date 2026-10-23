# AgentHubSNBPanel — 동작과 상태 소유권

섹션·항목 ID·표시 순서·실제 데이터·route·현재 항목·권한·확장 상태·더보기·요청 수명은 제품이 관리합니다.
패널은 표시와 조작을 같은 owner에 연결하며 원본 문구에서 backend endpoint나 업무 모델을 만들지 않습니다.
고정됨·프로젝트·채팅이라는 샘플 섹션 이름과 행 수를 전체 제품의 영구 데이터로 고정하지 않습니다.

새 채팅은 한 native Button의 한 click 경로에서 제품에 의도를 전달합니다.
새 대화 생성·route 이동·기존 draft 보존/확인·초기화·첨부 처리·자동 전송 여부는 해당 제품 owner가 결정합니다.
버튼 이름만으로 현재 대화나 작성 중 입력을 즉시 삭제하지 않습니다.

행의 목적지가 있으면 실제 링크, 현재 화면 action이면 native button을 사용합니다.
행 선택·현재 페이지·section 확장·순간 hovered/pressed를 같은 상태로 합치지 않습니다.
특수 고정 행의 source=hovered와 #F4 override는 시각 기록이며 현재 route·선택 결과·hover 여부의 독립적인 증거가 아닙니다.

프로젝트2depth3행은 들여쓴 표시입니다. 실제 계층을 채택하려면 부모 ID·확장 owner·숨김 subtree·keyboard 의미를 제품이 명시해야 합니다.
들여쓰기만으로 Tree 역할이나 자동 접기/펼치기를 추가하지 않습니다.
채팅 header의 collapse·보조 action과 행의 more는 하위 계약을 따라 독립 host로 연결하며 row/header 전체의 callback을 함께 실행하지 않습니다.
특수 고정 행의 숨김 more는 렌더·Tab target으로 복원하지 않습니다.

더보기는 FRAME/TEXT 원본에 제품 동작을 연결하는 제안입니다. 실제 pagination·추가 fetch·전체 목록 이동 중 무엇인지는 제품이 정합니다.
한 host에서 한 번 호출하고 loading·권한·실패·중복 요청·결과 합치기와 focus 보존은 같은 owner가 관리합니다.
새 항목 추가나 section 변화만으로 읽던 위치를 항상 최상단/최하단으로 옮기지 않습니다.

원본은 clipping true·overflow NONE이고 실제 Scrollbar 인스턴스가 없습니다.
제품은 top action과 list viewport를 나눠 모든 행·더보기·focus에 접근할 수 있게 해야 합니다.
fade는 장식이며 실제 scroll boundary 상태를 대신하지 않습니다. 끝에 도달하거나 focus된 내용이 가려질 때는 제품의 조건부 표시 adapter를 검증합니다.
공용을 켠 경우 `DOCS_ROOT/frontend/design/components/Scrollbar/behavior.md`의 실제 측정·native scroll 의미를 참고합니다.
CMP 메뉴 API·ACL·SNB props·collapsed rail·모바일·전체 shell 테마를 이 원본에서 가져오지 않습니다.

## 프로젝트 disclosure 채택

[Figma 프로젝트](https://www.figma.com/design/cUKHT2PdHjAKRXZlzulnO5/?node-id=2611-62777)의256px/행32·depth2 left36·connector x18을 유지합니다.
제품이 자식 데이터와expanded를 소유하며 Session과 같은 측정height helper(250ms ease)를 사용합니다.
기본 닫힘은 공용 Icon의 closed Folder16 규격, 열림은 원본 snb/folder-16.svg입니다. source를 서로 같은 Figma자산으로 기록하지 않습니다.
원본 down glyph만0↔−90°/200ms 회전하고 leading gap도 함께 접습니다. focus 내부에서 닫으면 trigger로복귀하고 즉시inert처리합니다.
행·레일·보조 버튼은200ms 색상전환을 계승하고 disabled 기능차단은즉시입니다.

## 현재 채택: SNB 목록의 hover 스크롤바

원본에 없던 실제 viewport는 [AgentHubScrollbar](../AgentHubScrollbar/behavior.md)의 공용 엔진 한 곳을 사용합니다.
별도 `overflow:auto` 컨테이너나 native thin scrollbar를 더하지 않습니다. top의 새 채팅·Divider는 고정하고 목록만 스크롤합니다.
SNB는 `visibility:"hover"`를 선택하며 패널 hover·viewport focus-within·drag 중에 thumb를 노출하고 coarse pointer에서도 접근 가능하게 유지합니다.
visibility의 opacity가0이어도 native wheel·touch·keyboard·focus 노출 기능은 유지하며 gutter27px 공간은 고정합니다.
reduced-motion에서는 노출 전환을 즉시 완료합니다. 목록 확장·resize 후 측정과 drag의 종료·취소·unmount 정리를 같은 엔진이 소유합니다.

## 현재 채택: 상하 경계 흐림과 끝 여백

공용 엔진이 전달하는 `canScrollUp`·`canScrollDown`을 각각 사용합니다. 아직 측정하지 않았으면 둘 다 false로 시작합니다.
동등한 엔진에서는 overflow가1px보다 크고 `scrollTop > 0`일 때 상단,
`scrollTop + clientHeight < scrollHeight - 1`일 때 하단을 표시합니다. 별도 window scroll listener·ResizeObserver·thumb 엔진을 만들지 않습니다.

| 위치 | 상단 흐림 | 하단 흐림 |
| --- | --- | --- |
| overflow 없음·빈 목록 | 숨김 | 숨김 |
| 맨 위 | 숨김 | 아래 내용이 있으면 표시 |
| 중간 | 표시 | 표시 |
| 맨 아래 | 위 내용이 있으면 표시 | 숨김 |

흐림은 목록 영역에 고정하고 스크롤과 함께 이동시키지 않습니다. 새 채팅·Divider·레일·별도 제품 footer는 가리지 않습니다.
원본 하단24px 여백은 viewport 밖에 고정해 두지 않고 콘텐츠 끝에 한 번 둡니다.
따라서 중간에는 경계까지 목록이 이어지며, 끝에 도달하면 마지막 행 아래24px와 읽을 수 있는 전체 행이 나타납니다.
53px 흐림 높이를 끝 여백에 더하거나 하단 padding을 두 번 적용하지 않습니다.

wheel·touch·keyboard·thumb drag·크기 변경·섹션 접기/펼치기·목록 교체 후에도 같은 측정값으로 갱신합니다.
흐림의 유무가 viewport 높이·행 폭·읽던 위치·선택을 바꾸지 않게 합니다.
장식 opacity는 공용 색상 전환과 같은200ms ease를 채택하고, reduced-motion에서는 즉시 반영합니다.
목록 viewport 또는 내부 조작이 `:focus-visible`일 때는 양쪽 장식을 숨겨 글자와 focus ring을 드러냅니다.
forced-colors·print에서는 장식을 제거합니다. 이는 Figma에 없는 runtime 접근성·사용자 채택이며 prototype 동작 실측이 아닙니다.

수직 track의 추가 끝 여백24px는 콘텐츠 padding을 더하는 값이 아닙니다.
공용 엔진의 선택적 `verticalTrackPaddingEnd=24` 또는 검증한 동등 기능으로 표시와 drag 길이를 함께 줄입니다.
끝 thumb는 하단 빈24px 영역에 들어가지 않으면서 native viewport는 끝까지 이동하고 마지막 행 아래24px를 보여줍니다.
SNB의27px gutter는 항상 예약하며, 기존 행 폭을 보존한 채 행과 thumb 사이를21px 띄웁니다.
thumb 오른쪽 끝은 패널 외곽에서3px 안쪽이며, 목록 영역의 margin-right−16px와 track right2px를 함께 적용합니다.
