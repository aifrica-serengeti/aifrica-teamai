# AgentHubMenu 정의와 공용 대비 차이

메뉴의 역할은 명령 실행과 하위 명령 탐색입니다. 폼 값 선택은 Select/Dropdown,
검색·모델·행 보조 조작을 함께 제공하는 복합 선택 UI는 Picker의 계약을 먼저 비교하세요.

## 공용에서 유지하는 것과 달라지는 것

| 항목 | 공용 Menu baseline | Agent Hub 확인 값 |
| --- | --- | --- |
| 패널 radius | 4px | 12px, radius/surface-sm |
| 패널 표면·선 | white·#DDD1 | 동일한 값, default-mid surface 의미 token |
| 그림자 | navy 두 겹 menu shadow | 기존 Mid와 같은 두 효과 값, 실제 effectStyleId는 다름 |
| padding | 상하4·좌우0 | 같음, border 포함 layout |
| 행 높이 | small28/medium32/large36, 기본large | content28·outer HUG, size property 없음 |
| 행 좌우 여백 | 16/16 | 16/12 |
| label | 14/20·400 | 같음, default1C/destructiveD00A0A/disabledAAA |
| header | 32·좌우16·12/16·600·#555 | 숨김 frame28·좌16/우12·상8/하4·#1C1C1C |
| divider | 선1 + 상하 margin2 | 숨김 frame9 = 상하 padding4 + 선1 |
| 스크롤 기본 | scrollable=true·max296 참조 | Scroll bar Boolean=false·별도 max-height 없음 |
| selected/focused | 공용의 시각·키보드 계약 | 해당 Figma variant 미제공, 기존 focus 의무는 유지 |

## 실제 트리

단일 COMPONENT `3135:16036`에는 `Scroll bar#3200:0` Boolean 하나만 있으며 기본false입니다.
행11개는 모두 `3135:15951`의 type=default/state=enabled 원본 인스턴스입니다.
원본 폭160이 패널 안 폭158/FILL로 조정되고 x1/y5부터28px 간격으로 놓입니다.
row 이름은 row-1/2/3/5…12지만 실제 자식은11개입니다. 빠진 이름을 보고 항목을 추가하지 않습니다.

각 item은 선택적 header → content → 선택적 divider의 세로 wrapper입니다.
실행 영역은 content 하나이며 제목·구분선을 같은 menuitem의 클릭·focus 영역으로 만들지 않습니다.
제품 renderer에서는 의미에 맞는 Group/Label/Item/Separator로 풀어 조립합니다.
각 row의 nested 속성이 노출된다는 Figma 설명은 제품 공개 API가 이미 구현됐다는 뜻이 아닙니다.

숨김 Scroll bar는 FRAME이며 공용 Scrollbar 인스턴스가 아닙니다.
공용 Scrollbar 의존은 제품의 실제 스크롤 viewport·thumb·focus 연결을 위한 계약입니다.
모든 현재 optional slot은 false이고 메뉴 화면에는 라벨만 보입니다.
[MenuItem](../AgentHubMenuItem/definition.md)의 Boolean 표시와 TEXT property를 구분해 연결합니다.

## 범위

메뉴 안의 header/divider 토글을 사용하는 구성이 새 원본의 기준입니다.
별도 legacy header/divider 행의 구현을 강제하거나 중복 separator를 만들지 않습니다.
아이콘 swap 목록, check 표시, chevron만으로 실제 권한·단축키 등록·checked 값·하위 메뉴 데이터가 정해지지 않습니다.
원본에는 trigger, 실제 명령, menu open/close 상태, 포털 위치·sideOffset·collision·다크 모드가 정의되지 않았습니다.

## 제품 채택 optional glyph adapter

예약 메뉴 [2978:59542](https://www.figma.com/design/cUKHT2PdHjAKRXZlzulnO5/?node-id=2978-59542)와
[2978:62200](https://www.figma.com/design/cUKHT2PdHjAKRXZlzulnO5/?node-id=2978-62200)의 실행·편집·공유·삭제를
구분하기 위해 제품이 `AgentHubMenuEntry.icon?: string`을 채택합니다. 각각 play·edit·link·trash의16px glyph를 연결합니다.
`showIcon` 하나로 모든 명령을 edit로 표시하던 조립을 호환 확장하는 범위이며, 기존 자산 목록·실측 snapshot을 바꾸지 않습니다.

이 `icon`은 제품의 glyph 선택 adapter입니다. MenuItem 원본의 `icon` Boolean, `icon-swap` INSTANCE_SWAP이나
Menu root의 `Scroll bar` Boolean이 문자열 공개 API를 제공했다는 뜻이 아닙니다. 값은 소비 제품에서 확인한
AgentHubIcon manifest 이름 또는 기존 자산 경로이고, label을 대신하거나 별도 동작을 만들지 않습니다.
명시한 `icon`을 우선하며 `icon`이 없고 `showIcon=true`이면 기존 edit glyph를 유지합니다.
둘 다 없으면 leading glyph·빈 슬롯·그 슬롯의 gap을 만들지 않습니다. 명령·선택·focus·메뉴 역할·motion 계약은 유지합니다.

제품이 채택한 `checked?: boolean`은 필터의 실제 선택 값을 전달하는 별도 의미 adapter입니다.
Figma의 check Boolean은 계속 glyph 표시만 뜻합니다. `checked`를 명시할 때만 체크 메뉴 의미를 연결하며,
생략한 기존 명령과 Select의 option 의미는 보존합니다. 상태 값은 제품이 소유하고 새 선택 palette는 추가하지 않습니다.
