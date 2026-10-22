# AgentHubPicker 동작과 상태 소유권

이 원본은 정적인 네 내부 variant와 두 조립입니다. 키보드 힌트의 ↑/↓·↵는 이동·선택을 안내하지만
네트워크 호출·선택 후 닫힘·자동 송신·focus 이동이 구현돼 있다는 뜻은 아닙니다.

채택한 runtime에서는 채팅·모델/Search·구획·추천 제목·footer를 고정하고 목록만 공용 ScrollArea로 스크롤합니다.
실제 overflow와 thumb의 위치·드래그·resize는 그 한 owner에 맡깁니다. 부모는 내부 viewport DOM을 찾지 않고
공개 `ensureVisible(element)` 같은 검증한 handle에 focus 대상 행을 전달합니다.
방향키 이동은 `focus({preventScroll:true})` 후 같은 목록의 항목 노출 API로 연결해 바깥 페이지나 고정 영역을 밀지 않습니다.
휠·키보드·드래그 뒤에도 채팅/모델·검색·제목·footer의 위치가 유지되는지 확인합니다.

## 상태를 나누기

| 상태 | 소유자와 경계 |
| --- | --- |
| open·trigger·닫힘 이유 | 제품의 한 owner, 부모와 내부에 중복 상태를 두지 않기 |
| query·IME 조합 | 실제 검색 input; 첫 조립에 검색창을 임의 추가하지 않기 |
| 서버 결과·loading/error/empty·취소 | 제품 data adapter; 이전 요청의 늦은 응답으로 최신 목록을 덮지 않기 |
| 현재 탐색 target | panel의 한 keyboard/focus owner; hover·확정 값과 구분 |
| 실제 선택 대상 id/type | 호출자; 화면 label이나 배열 index로 식별하지 않기 |
| 모델·필터·보조 메뉴 | 해당 제품 owner; 기본 행 선택과 별도 callback |
| chat draft·첨부·agent/project·전송 | 기존 제품 owner; picker 선택만으로 초기화·송신하지 않기 |

추천 행을 누를 때 선택한 agent를 연결할지, 채팅을 시작할지, 입력창으로 돌아갈지는 명시적인 제품 명령으로 연결합니다.
`onChoose({kind,id})` 같은 API는 구현 제안입니다. kind와 id는 실제 도메인에서 정하고 서버 권한도 별도로 검증합니다.
'전체 공개'·'그룹 공개'는 표시 meta이며 접근 권한을 자동 허용하는 플래그가 아닙니다.

## 한 번의 조작에 한 번의 명령

행 main action과 모델 선택·more·filter는 독립된 target입니다. 하나의 native button 안에 다른 button을 넣지 않습니다.
trailing 조작이 행 선택으로 bubble되어 두 명령을 실행하지 않게 DOM·이벤트 경계를 설계합니다.
native Enter/Space를 사용하는 버튼에 별도 keydown 실행을 더해 같은 callback이 두 번 호출되지 않게 합니다.
원본 hovered는 순간 시각입니다. selected·checked·`aria-pressed`·저장 완료로 해석하지 않습니다.

모델 선택을 독립 UI로 채택한다면 두 번째 popup의 open/focus/복귀 경계를 기록합니다.
소스 FRAME의 이름만으로 기존 모델 선택 Dropdown이 구현돼 있다고 주장하지 않습니다.
검색의 필터 버튼 표시와 필터 적용 상태는 별개이고 입력 query·선택 대상·popup open과도 별개입니다.

## 키보드와 결과 변화

검색 IME 조합 중에는 Enter를 행 선택으로 가로채지 않습니다.
검색 input 편집 키와 목록 탐색 키의 적용 범위를 정하고 현재 focus가 속한 영역만 처리합니다.
선택 가능한 결과가 바뀌면 사라진 target을 참조하지 않게 현재 id와 focus를 보정합니다.
오류·빈 목록에서 이전 결과를 선택할 수 없도록 하고 실제 결과 수를 필요에 따라 한 번 안내합니다.

Escape는 먼저 열린 하위 메뉴/모델 panel을 닫고 다음 단계에서 picker를 닫는 정책을 제품에서 검증합니다.
닫힘 후 복귀할 trigger 또는 composer target도 제품이 정합니다. 바깥 클릭·선택 후 닫힘·query 초기화는 자동 계약이 아닙니다.
footer의 힌트는 설명이며 별도 전역 keydown listener를 등록하지 않습니다.
