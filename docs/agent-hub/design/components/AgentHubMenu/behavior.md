# AgentHubMenu 동작

공용 채택 시 `DOCS_ROOT/frontend/design/components/Menu/behavior.md`의 명령 메뉴 동작을 유지합니다.
이 확장은 표현 차이와 item 조립을 소유하며 제품의 업무 명령·권한·요청 수명은 호출자가 소유합니다.

## 한 번의 선택과 상태

trigger/open 상태는 제품의 기존 Menu root 또는 popup primitive 한 곳에 연결합니다.
명령은 검증된 primitive의 onSelect 한 경로에서 실행하고 onClick/keydown에 같은 callback을 중복 등록하지 않습니다.
disabled는 실제 선택·pointer·keyboard 실행을 차단해야 하며 색만 바꾸지 않습니다.
destructive도 disabled가 우선합니다. 빨간 메뉴를 선택했다고 무조건 삭제하거나 확인창을 새로 만드는 것은 제품 동작으로 정합니다.

현재 pressed는 순간 상호작용이며 selected·checked·요청 진행 중을 의미하지 않습니다.
check Boolean은 glyph 표시입니다. persistent selection 또는 체크·라디오 메뉴로 채택한다면
실제 값 owner와 menuitemcheckbox/menuitemradio 의미·키보드·공지·닫힘 정책을 별도로 연결합니다.
단순히 공용 selected flag나 check 그림만 추가해 구현됐다고 판단하지 않습니다.

## 제목·구분선·하위 메뉴

section header와 divider는 실행 명령이 아닙니다. focus 순서와 선택 이벤트에서 제외합니다.
제목은 실제 group을 설명하고 항목 label은 실행 target의 이름을 제공합니다.
서로 인접한 항목에서 divider를 중복 렌더하거나 header를 불필요한 menuitem으로 만들지 않습니다.

chevron은 Figma 설명상 서브메뉴 표현입니다. 켜서 사용하는 제품은 실제 SubTrigger/SubContent와 연결합니다.
화살표만 보고 존재하지 않는 명령·route·하위 목록을 생성하지 않습니다.
서브메뉴는 같은 MenuItem 표현을 연결하고 제품 primitive의 open·focus·collision·부모 복귀를 검증합니다.

value 문구는 현재 숨김 표시 예시이며 자동 단축키 등록이나 실행 대상 값이 아닙니다.
아이콘은 별도의 클릭 target으로 만들지 않고 해당 명령의 장식으로 연결합니다.
현재 true 조합·실행·서브메뉴·스크롤 상태는 정적 원본에서 검증되지 않았습니다.
