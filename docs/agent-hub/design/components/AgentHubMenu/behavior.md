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

제품이 `checked?: boolean`을 채택하면 호출자가 실제 선택 값을 소유하고 기존 `onSelect` 한 경로에서 갱신합니다.
해제 가능한 단일 상태 필터와 다중 유형 필터도 이 값으로 연결하며, 항목이 자체 값을 토글하거나 radio 의미를 추론하지 않습니다.
`checked`는 `showCheck`를 자동 변경하지 않고 기존 disabled·한 번 실행·닫힘·focus·motion 계약을 유지합니다.

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

제품이 채택한 `icon?: string`은 leading glyph 선택만 소유합니다. 명시한 `icon`이 있으면 `showIcon` 값과 무관하게
그 glyph를 표시하고, 없으면 `showIcon=true`일 때 기존 edit를 표시합니다. 두 옵션을 생략하면 leading glyph는 없습니다.
play·edit·link·trash를 지정해도 실제 실행·편집·공유·삭제 명령은 기존 label과 `onSelect`가 연결하며,
glyph가 권한·현재 선택·checked·submenu 유무·닫힘 정책을 결정하지 않습니다.
새 adapter는 기존 한 번의 명령 실행·disabled 차단·focus 이동·role·motion을 유지합니다.

## 2026-10-26 예약 페이지 점검 보강

내장 trigger와 외부 `anchorRef` 모두 ↓로 첫 활성 명령, ↑로 마지막 활성 명령에 진입합니다.
첫 행 focus의 예약 프레임 전 Escape도 메뉴만 닫고 anchor로 복귀하며 상위 Dialog를 닫지 않습니다.
같은 구간의 Tab은 메뉴 진입 예약을 취소하고 브라우저의 정상 이동을 보존합니다. menu 내부 Tab은 기존 roving 종료 정책을 따릅니다.
