# AgentHubSNBItem — 이동·펼침·더보기의 책임

Panel/화면 owner가 항목 ID·제목·계층·route/current·expanded·action·권한과 실제 데이터를 소유합니다.
Item은 표시와 한 활성화 의도를 연결하며 대화/route/선택·요청 상태를 내부에 복제하지 않습니다.
원본 이름 menu-item, depth2, connector만으로 Menu/Tree/listbox의 화살표키·roving·선택 패턴을 도입하지 않습니다.

실제 목적지로 이동하는 leaf는 유효한 native link를 사용합니다. 현재 페이지일 때만 aria-current를 연결합니다.
실제 명령은 native button, 하위 목록의 펼침은 명시적 expanded/controls를 가진 disclosure로 연결합니다.
색상 selected와 눌린 순간 pressed를 aria-pressed·aria-selected·expanded·route 값으로 자동 변환하지 않습니다.

main link/button과 more button은 형제 host로 구성합니다. 항목 전체를 button/link로 감싸고 그 안에 more를 중첩하지 않습니다.
한 활성화는 한 native click/submit 또는 실제 navigation 경로를 사용하고 root·glyph·별도 Enter/Space handler에서 재실행하지 않습니다.
more가 row 이동·펼침·대화 요청을 연쇄 실행하지 않게 합니다. 실제 메뉴를 채택했을 때만 그 popup의 명령·focus 복귀를 연결합니다.

leading Boolean은1depth의 실제 glyph에만 적용합니다. false이면 glyph·내부 gap8을 함께 제거합니다.
2depth에는 leading subtree가 없으므로 true여도 glyph를 만들어 넣지 않습니다.
trailing Boolean은 hover/pressed에 실제 있는 surface를 제어하며 false이면 gradient·control·Tab target을 함께 제거합니다.
선택 상태가 된다고 숨김 more를 자동 복원하지 않습니다.

원본의 hover/pressed 전용 more는 포인터만으로 제공하는 기능 계약이 아닙니다.
기능을 채택한 제품은 focus-within·상시 노출·별도 명령 메뉴 등 keyboard/touch 경로를 확장으로 정해 검증합니다.
focus 중 제어가 사라지지 않게 하고 시각 gradient가 본문 클릭이나 다른 조작을 가로막지 않게 합니다.

selected·hover·focus·disabled가 겹칠 때의 우선순위는 제품에서 정합니다. standalone8종과 Panel의 실제 혼합 override를
완전한 상태 matrix로 확대하지 않습니다. pending·실패·제거·새 요청·읽음·자동 선택/스크롤은 실제 명령 owner가 담당합니다.

## 프로젝트 disclosure 채택

[Figma 프로젝트](https://www.figma.com/design/cUKHT2PdHjAKRXZlzulnO5/?node-id=2611-62777)의256px/행32·depth2 left36·connector x18을 유지합니다.
제품이 자식 데이터와expanded를 소유하며 Session과 같은 측정height helper(250ms ease)를 사용합니다.
기본 닫힘은 공용 Icon의 closed Folder16 규격, 열림은 원본 snb/folder-16.svg입니다. source를 서로 같은 Figma자산으로 기록하지 않습니다.
원본 down glyph만0↔−90°/200ms 회전하고 leading gap도 함께 접습니다. focus 내부에서 닫으면 trigger로복귀하고 즉시inert처리합니다.
행·레일·보조 버튼은200ms 색상전환을 계승하고 disabled 기능차단은즉시입니다.

## 현재 채택: more의 투명한 예약 공간

일반 runtime 행은 원본36px gradient 대신 투명한20px wrapper를 사용합니다. 더보기 기능이 있으면 main의 오른쪽20px를
노출 상태와 관계없이 예약합니다. 버튼은 사용자 요청에 따라 row 끝에서2px 안쪽(`right:2px`)에 배치하고,
자체 hover/pressed에서만 #EEE/#DDD를200ms로 표시합니다. 이2px는 원본 right0을 대체하는 runtime 채택값입니다.
selected·행 hover만으로 버튼 주변에 별도 F8 면을 남기지 않습니다. 원본 특수 pinned override는 실측 기록으로 구분합니다.
main과 more의 형제 native host·한 callback·focus-within/touch 접근 경로를 유지하고 more 클릭이 프로젝트 펼침을 함께 실행하지 않게 합니다.


## 현재 채택: 긴 제목 hover/focus 이동

실측 폭이 넘칠 때만 오른쪽 끝을 흐리게 하고, 기존 native 주 동작의 hover·focus에서 글자만 이동해 숨은 끝을 보여줍니다.
대기100ms·속도36px/s linear·이탈 복귀200ms ease·흐림24px는 신규 제안값입니다. 원본 prototype 동작 실측이 아닙니다.
짧거나 긴 overflow 모두 같은 속도로 이동합니다. 최소 시간 없이 현재 위치부터 남은 거리로 이동 시간을 계산하고, 재진입 때도 같은 계산을 적용합니다. 남은 거리가0이면 즉시 끝 상태를 유지합니다.
끝에서는 오른쪽 흐림을 해제하고 머무르며 반복 재생하지 않습니다. 빠른 이탈/재진입·제목 변경·resize·설정 변경은 이전 완료를 취소합니다.
[긴 제목 채택 계약](../../title-overflow.md)의 단일 helper를 재사용하고 disabled에서 자동 이동하지 않습니다.
