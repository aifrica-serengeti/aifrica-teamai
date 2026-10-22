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
visibility의 opacity가0이어도 native wheel·touch·keyboard·focus 노출 기능은 유지하며 gutter11px 공간은 고정합니다.
reduced-motion에서는 노출 전환을 즉시 완료합니다. 목록 확장·resize 후 측정과 drag의 종료·취소·unmount 정리를 같은 엔진이 소유합니다.
