# Agent Hub 디자인 확장

`frontend-common` 묶음과 `agent-hub` 프로젝트를 함께 선택한 UI 작업에서 사용하는 확장입니다.
`inheritCommon: false`이면 이 catalog와 공용 절차를 자동 적용하지 않고 제품 자체 지침을 따릅니다.

Agent Hub 원본에서 확인한56종과 공용 폼 adapter3종, Elevation foundation의 공용 대비 차이를 정리했습니다.
기존 제품에 호환되는 컴포넌트가 있으면 그 구현에 연결하면 됩니다. 별도 래퍼 생성을 강제하지 않습니다.

| 추가 계약 | 공용과 다른 점 | 제공 자료 |
| --- | --- | --- |
| [AgentHubIcon](./components/AgentHubIcon/README.md) | 16/20/24px별 실제 도형과 선 두께, Agent Hub용 이름 | SVG 206개, Figma 컴포넌트 208개 |
| [AgentHubFileIcon](./components/AgentHubFileIcon/README.md) | 파일 유형 6종의 색상·그라데이션·테두리를 포함한 44px 타일 | SVG 6개 |
| [AgentHubBrandMark](./components/AgentHubBrandMark/README.md) | 메인 화면용 다색 마크, 180px 표시 기준·선택적 독립 wave | 기본 투명 PNG 원본 2048×2048·사용자 승인 복원 SVG |
| [AgentHubAgentTypeChip](./components/AgentHubAgentTypeChip/README.md) | 에이전트 유형 4종의 색상·폭, 공용과 다른 글자색 | 4개 variant의 실측 기록 |
| [AgentHubButton](./components/AgentHubButton/README.md) | 크기별 radius 8/6/4px, secondary 채움·ghost·keycap | 44개 variant의 상태별 실측 기록 |
| [AgentHubIconButton](./components/AgentHubIconButton/README.md) | 32px radius6, 20px 버튼의 16px glyph, primary·active | 33개 variant의 상태별 실측 기록 |
| [AgentHubAttachIconButton](./components/AgentHubAttachIconButton/README.md) | 32px 원형, radius9999, 24px glyph, 의미 미정 state5 | 5개 variant의 상태별 실측 기록 |
| [AgentHubSwitch](./components/AgentHubSwitch/README.md) | 공용 medium geometry 유지, On #3B82F6·radius/full·테두리/패딩 매핑 | On/Off × enabled/disabled 4종 |
| [AgentHubTextButton](./components/AgentHubTextButton/README.md) | 공용 tiny의 높이·색상 유지, trailing 아이콘16px·선1px | 4개 상태와 숨김 leading 구분 |
| [AgentHubCalendar](./components/AgentHubCalendar/README.md) | 패널 radius12·shadow, 기존 Agent Hub 버튼 재사용·월 헤더 조합 | 일자 패널·재사용 컨트롤 5개 대조 |
| [AgentHubCalendarDate](./components/AgentHubCalendarDate/README.md) | 공용 날짜 셀 geometry 유지, 오늘·선택 primary #3B82F6 | 기본·오늘·선택·빈 자리 4종 |
| [AgentHubSearch](./components/AgentHubSearch/README.md) | 높이48/32·radius8/6·내부 clear20·필터 표시 조합 | 12개 variant와 filter 숨김 참조 |
| [AgentHubPillChip](./components/AgentHubPillChip/README.md) | 높이28·font14/20·px12·실제 border, selected와 enabled 같은 시각 | 5상태·원본 disalbed 오타 구분 |
| [AgentHubFilterChip](./components/AgentHubFilterChip/README.md) | 선택형28/32/36·상태색·선 유무·선택적 아이콘/count | 24종·숨김 slot 참조 |
| [AgentHubFilterChipGroup](./components/AgentHubFilterChipGroup/README.md) | gap8·hug/wrap/scroll·우측 fade 조합 | 3배치·중첩18개 원본 대조 |
| [AgentHubCheckbox](./components/AgentHubCheckbox/README.md) | 시각12/16/20·radius3/4/5·1px 마크·선택enabled 선 없음 | 18종·Box+Mark 원본 SVG12개 |
| [AgentHubBreadcrumb](./components/AgentHubBreadcrumb/README.md) | font16/24·400, 모든 label #1C1C1C, root gap0·separator 좌우8 | slash/arrow 2종·원본 item/구분자 대조 |
| [AgentHubBreadcrumbSeparator](./components/AgentHubBreadcrumbSeparator/README.md) | #757575의 slash·en dash·arrow, 구분자가 간격 소유 | 3종·패딩 포함 arrow SVG1개 |
| [AgentHubChatComposer](./components/AgentHubChatComposer/README.md) | 58px 원형 입력 surface·Overflow shadow·첨부/전송·에이전트/프로젝트 조합 | 4개 상태·재사용/override 대조·전용 folder SVG1개 |
| [AgentHubUserMessage](./components/AgentHubUserMessage/README.md) | 사용자 버블 radius12·#F4F4F4·font16/24·agent/schedule 조합 | chat/agent/schedule 3종·12px schedule 전용SVG1개 |
| [AgentHubProgressAlert](./components/AgentHubProgressAlert/README.md) | 응답 중단 안내 radius8·#F4F4F4·1px border와 재시도/편집 버튼 | 단일 샘플·tertiary28 버튼2개·기존 circle-alert20 재사용 |
| [AgentHubMessageExample](./components/AgentHubMessageExample/README.md) | 예시 선택 action·높이44/radius12·blue3상태·font14/20·400 | 3종·icon Boolean·기존 arrow-right20 재사용 |
| [AgentHubPickerItem](./components/AgentHubPickerItem/README.md) | agent/chat 행36px·radius6·모델 데이터 slot·설명 Boolean | 4종·실제 원본과 FRAME 변형 구분 |
| [AgentHubPickerFooter](./components/AgentHubPickerFooter/README.md) | top 선·높이39·키 안내·선택적 찾기 동작 | 단독 원본과 두 footer 조합·링크 subtree 부재 구분 |
| [AgentHubPicker](./components/AgentHubPicker/README.md) | radius24 패널·Mid·실제36px/32px 행·검색/모델/키보드 조합 | 두 FRAME recipe·원본 대조·clipping 한계 |
| [AgentHubMenuItem](./components/AgentHubMenuItem/README.md) | body28px·L16/R12·destructive #D00A0A·숨김 header/divider 치수 | default/destructive × 4상태·optional slot 기본 false |
| [AgentHubMenu](./components/AgentHubMenu/README.md) | 패널 radius12·11행318px 샘플·기존 Mid 표면 유지 | 단일 COMPONENT·실제 Item11개·Scrollbar 기본 false |
| [AgentHubFlyoutHeader](./components/AgentHubFlyoutHeader/README.md) | title/count/meta·p8·54px 샘플 | 실제 Header 원본과 문자열 override |
| [AgentHubFlyoutFooter](./components/AgentHubFlyoutFooter/README.md) | 안내문·top1·단독29/실제33px 차이 | 원본과 pb8/white/absolute override |
| [AgentHubFlyoutItem](./components/AgentHubFlyoutItem/README.md) | 파일/폴더/child28px·12/16·들여쓰기·pressed/selected | 부분 matrix10종·정확한16px glyph |
| [AgentHubFlyout](./components/AgentHubFlyout/README.md) | 새 내부 조합·r12·최대398 샘플·footer/viewport | 실제16행 중11표시·Menu와 같은150ms 모션 채택 |

| [AgentHubSessionItem](./components/AgentHubSessionItem/README.md) | 예약/출력36px·white28 icon box·4상태 | title/meta·20px source→16px glyph |
| [AgentHubSessionProgressStep](./components/AgentHubSessionProgressStep/README.md) | done/active/pending·20px indicator·마지막connector 숨김 | 정적 원형3종·Divider 실제17×4 |
| [AgentHubSessionContextItem](./components/AgentHubSessionContextItem/README.md) | 32px·12/16·고정label66·value/count | 4상태·실제5유형의 override |
| [AgentHubSessionSectionHeader](./components/AgentHubSessionSectionHeader/README.md) | title/count·독립toggle/+·24px | collapsed2종·정확한 chevron source |
| [AgentHubSessionHistoryItem](./components/AgentHubSessionHistoryItem/README.md) | 실행 기록32px·px8/py6·선택/unread 분리 | 4상태·6px dot·실제 alias override |
| [AgentHubSessionPanel](./components/AgentHubSessionPanel/README.md) | 전용320px/r16 패널·예약/기록/진행/자료 조합 | empty/filled·6원본19종·신규 개발 recipe |

| [AgentHubOutputViewer](./components/AgentHubOutputViewer/README.md) | 신규 산출물 패널·34px header·상하16px corner·확대/닫기·본문 SLOT | 540×977 샘플·6속성·exact glyph·동작 연결 recipe |

| [AgentHubFileItem](./components/AgentHubFileItem/README.md) | 가로 파일 행512×68/r12·44px 파일 타일·다운로드 | 실제 tertiary28·size Boolean·meta 음수 간격·button 미바인딩 구분 |
| [AgentHubDataCard](./components/AgentHubDataCard/README.md) | 120px 정사각/r12/Raised·공용 PillSmall Chip20 | 3상태·실제 Chip source42→44폭·TEXT API 제안 |
| [AgentHubThumbnailCard](./components/AgentHubThumbnailCard/README.md) | 324px/r24·내부4:3·Overflow/Mid·selected1px | 5상태·3Boolean·실제 image paint 없는 placeholder |
| [AgentHubScheduleCard](./components/AgentHubScheduleCard/README.md) | 324×118/r24·예약 상태와 선택 분리·pause/play | 10조합·status14/control16·직접 FRAME24 |
| [AgentHubItemCard](./components/AgentHubItemCard/README.md) | 324×146/r24·도구 로고/더보기/고정/대화 | 6상태·accent 투명선·실제 more20·pin 전체16 export·로고 예외 |

| [AgentHubScrollbar](./components/AgentHubScrollbar/README.md) | 두께4/r9999 유지·불투명 #DDD·로컬 gutter11px | 세로 정적1종·native scroll/동적 thumb와 구분 |

| [AgentHubDialogFooter](./components/AgentHubDialogFooter/README.md) | 기존 AgentHubButton40·radius8·font16/24 조합 | p24/gap8 유지·cancel Boolean·기존 footer 슬롯의 패딩 중복 방지 |

| [AgentHubNavIcon](./components/AgentHubNavIcon/README.md) | 전용28px 채움 glyph4종·실제 선택 blue | 일반16/20/24 아이콘 확대와 구분 |
| [AgentHubNavItem](./components/AgentHubNavItem/README.md) | 52px/r8·clock4상태·검정 overlay와 선택 blue | glyph/state 전체 조합 미측정 구분 |
| [AgentHubNavRail](./components/AgentHubNavRail/README.md) | 68px 레일·상단4목적지·설정32·계정28 | 전용 glyph·실제 settings20·FRAME avatar |
| [AgentHubSNBSectionHeader](./components/AgentHubSNBSectionHeader/README.md) | 20px·font12/16·hover 보조 조작 | enabled/hovered2종·toggle FRAME/ghost20 구분 |
| [AgentHubSNBItem](./components/AgentHubSNBItem/README.md) | 32px/r6·1/2단계·들여쓰기·more gradient | 8상태·pressed/selected 같은 색의 다른 의미 |
| [AgentHubSNBPanel](./components/AgentHubSNBPanel/README.md) | 288px·새 채팅·고정/프로젝트/채팅·상하 경계 fade | 255/256폭·특수 선택 override·실제 viewport·끝24px 보완 |
| [AgentHubSNB](./components/AgentHubSNB/README.md) | 전용 레일과 패널의 신규 제품 조합 | CMP와 분리한 route/intent/expanded owner·구현 recipe |

| [AgentHubGlobalHeader](./components/AgentHubGlobalHeader/README.md) | 신규43px 전역 헤더·blue-gray·혼합 Poppins 로고·바로가기24/알림32 | 숨김3영역·실제 FRAME·정확한 SVG3개·제품 동작 연결 |

| [AgentHubChatHeader](./components/AgentHubChatHeader/README.md) | 48px 채팅 헤더·Breadcrumb·ghost24·기본 정적/선택적 생각 중 진행 표시 | 실제 하위 원본 재사용·표시 Boolean4개·border/blur와 제품 동작 구분 |

| [AgentHubDialog](./components/AgentHubDialog/README.md) | radius16·blue-gray·24/32 제목·580px 편집/1296px 탐색 조합 | 공용 modal 의미·기존 하위 원본·legacy close/scrollbar 구분·2개 FRAME recipe |

| [AgentHubThinkingStatus](./components/AgentHubThinkingStatus/README.md) | BrandMark32·gap8·5stop 정적 텍스트·경과시간 조합 | FRAME 실측·controlled 시간·접근성 대안·Header motion 제안과 분리 |

[컴포넌트 registry](./component-registry.json)는 공용 51종에 위 59종을 추가합니다.
공용 id를 덮어쓰지 않으며 CMP·PaaS에는 이 자산이나 계약을 추가하지 않습니다.
실제 제품의 source/export는 아직 확인하지 않았으므로 모두 `unmapped`입니다.
기존 `AgentHubChip` 별칭은 에이전트 유형4종을 가리킵니다. 새 Pill·Filter Chip과 구분해 선택하세요.
`AgentHubMessage`는 사용자 메시지 계약의 검색 별칭이며 assistant 응답이나 대화 전체를 뜻하지 않습니다.

[Card 유형 선택](./cards.md)에서5종의 역할과 공용 대비 차이를 먼저 확인합니다.
Card 자체의 시각을 덮어쓰지 않고 실제 인스턴스 재사용과 의미·접근성 참고를 구분합니다.

[SNB 시작하기](./snb.md)에서 전체 조합과6개 하위 계약의 읽는 순서를 확인합니다.
SNB 보드의 전시용 frame/제목/40px 공백은 제품 shell에 복사하지 않습니다.
[긴 제목 표시](./title-overflow.md)는 SNB1·2depth, Session 예약·출력 제목과 컨텍스트 대표 value의 끝 흐림·hover/focus 이동을 연결합니다.
원본의 HUG·ENDING 기록과 신규 모션 제안값을 구분하고 가까운 공용 텍스트 helper 한 곳을 재사용합니다.

[Global Header 시작하기](./global-header.md)에서 전용 헤더의 구조와 제품 연결 범위를 확인합니다.
페이지 제목용 PageHeader나 CMP GlobalHeaderV1/V2의 기능·치수를 자동 상속하지 않습니다.

[Chat Header 시작하기](./chat-header.md)에서 대화 상단 경로·일시정지·파일·더보기 조합을 확인합니다.
Figma 원본 이름은 chat-header이며 차트 renderer·차트 toolbar나 전역 Global Header와 구분합니다.

[Dialog 시작하기](./dialog.md)에서 공용 Dialog와의 차이, 예약 편집 폼과 에이전트 찾기의 두 구성을 확인합니다.

[생각 중 진행 표시](./chat-progress.md)에서 Header 흐름과 ThinkingStatus의 실측·제안값을 구분해 연결합니다.

## 공용을 그대로 사용하는 컴포넌트

[Divider 비교](./divider.md)에서 확인한 가로 Light 시안은 공용의1px 선·#DDD·위아래8px 여백과 같습니다.
공용을 켠 UI 작업에서는 기존 `Divider`를 재사용합니다. 새 AgentHubDivider 계약이나 전용 스킬은 추가하지 않습니다.
세로형·dark·모션은 이 시안의 확인 범위에 포함되지 않습니다.

## Foundation 확장

[Elevation](./foundations/Elevation.md)은6레벨의 그림자·Sunken 표면과 공용 대비 차이를 설명합니다.
Raised/Mid/Overlay/Overflow는 navy 두 겹 그림자이며, 기존 Calendar·Switch thumb와의 일치도 확인했습니다.
컴포넌트 registry와 별도로 읽는 기준이며 새 컴포넌트 id나 공용 스킬을 추가하지 않습니다.

## 적용하기

1. 공용 디자인 시스템 스킬 `aifrica-design-system`에서 이 문서와 필요한 foundation·컴포넌트 문서를 읽습니다.
2. 아이콘·로고는 [자산 사용 안내](./assets.md), 나머지 컴포넌트는 [실측 기록 안내](./references/README.md)를 확인합니다.
   manifest에는 자산의 이름·크기·노드 ID·해시가 있고, 실측 기록에는 variant별 색상·치수·token이 있습니다.
3. 현재 제품의 컴포넌트·asset import 방식을 확인하고 필요한 파일을 제품이 관리하는 자산 경로에 연결합니다.
   ChatComposer는 [구현 연결 안내](./components/AgentHubChatComposer/implementation.md)에서 기존 조합의 재사용 가능 여부를 확인합니다.
   사용자 메시지는 [UserMessage 구현 연결](./components/AgentHubUserMessage/implementation.md)을 확인합니다.
   응답 중단 안내는 [ProgressAlert 구현 연결](./components/AgentHubProgressAlert/implementation.md)을 확인합니다.
   예시 프롬프트 선택은 [MessageExample 구현 연결](./components/AgentHubMessageExample/implementation.md)을 확인합니다.
   Picker는 [패널 구현 연결](./components/AgentHubPicker/implementation.md)에서 검색·행·footer·제품 상태를 조합합니다.
   일반 메뉴는 [Menu 구현 연결](./components/AgentHubMenu/implementation.md)에서 공용의 키보드·focus 의미와 전용 시각 값을 연결합니다.
   Flyout은 [신규 구현 연결](./components/AgentHubFlyout/implementation.md)과 [Menu 모션 채택](./components/AgentHubFlyout/motion.md)을 함께 확인합니다.
   Session은 [전용 패널 구현](./components/AgentHubSessionPanel/implementation.md)에서5개 하위 원본과 기록/섹션 상태를 조합합니다.
   산출물 뷰어는 [OutputViewer 구현](./components/AgentHubOutputViewer/implementation.md)에서 제목/형식·확대/닫기·native 본문 슬롯과 제품 renderer를 연결합니다.
   Card5종은 [유형 선택](./cards.md) 뒤 각 implementation에서 실제 하위 원본·상태 owner·동적 이미지를 연결합니다.
   Scrollbar는 [구현 연결](./components/AgentHubScrollbar/implementation.md)에서 공용 스크롤 엔진과 전용 paint·gutter를 연결합니다.
   Dialog footer는 [구현 연결](./components/AgentHubDialogFooter/implementation.md)에서 기존 footer 슬롯에40px 버튼을 연결하고 패딩 중복을 확인합니다.
   전용 SNB는 [전체 구현](./components/AgentHubSNB/implementation.md)과 하위6계약에서 실제 source·자산·상태·viewport를 연결합니다.
   전역 헤더는 [신규 구현 연결](./components/AgentHubGlobalHeader/implementation.md)에서 로고·바로가기·알림과 shell을 연결합니다.
   채팅 헤더는 [신규 구현 연결](./components/AgentHubChatHeader/implementation.md)에서 기존 Breadcrumb·아이콘 버튼과 제품 상태를 연결합니다.
   Dialog는 [구현 연결](./components/AgentHubDialog/implementation.md)에서 modal primitive·전용 shell·폼/탐색 body를 연결합니다.
   호환 구현이 없으면 솔루션 컴포넌트와 public export를 새로 개발할 수 있습니다. 문서 수신 자체가 코드 생성을 뜻하지 않습니다.
4. 제품 `.aifrica/frontend.json`의 `components`에 실제 source와 public export를 기록합니다.
   문서·이미지를 받았다는 이유만으로 `implemented`로 바꾸지 않습니다.

TeamAI는 이 폴더를 `.teamai/docs/agent-hub/design/`로 전달합니다. 자산이 제품의 `src`나 `public`에
자동 설치되거나 화면이 자동 변경되지는 않습니다. 적용할 때 Figma MCP에 다시 연결할 필요는 없습니다.

## 확인한 범위

2026-10-20~2026-10-21에 아래 원본·조립 화면59개 노드와 Elevation 보드의 구조·스타일 및 해당 원본 자산을 Figma MCP로 확인했습니다.
컴포넌트 계약은59종이며, Picker는 item·footer 원본과 두 화면 recipe의4개 노드를3개 계약으로 연결합니다.
Divider는 공용과 일치하는 비교 자료로 기록하며 추가 계약 수에는 포함하지 않습니다.
SNB는 실제 원본6개와 전체 보드의 제품 조합 recipe를7개 계약으로 연결합니다.
생각 중 예시의 Header 인스턴스와 상태 FRAME은 같은 화면에서 추출했으며, Header를 확장하고 ThinkingStatus 한 계약을 추가합니다.

- [일반 아이콘 모음](https://www.figma.com/design/cUKHT2PdHjAKRXZlzulnO5/?node-id=3074-101401)
- [파일 아이콘 6종](https://www.figma.com/design/cUKHT2PdHjAKRXZlzulnO5/?node-id=3128-25538)
- [메인 마크](https://www.figma.com/design/cUKHT2PdHjAKRXZlzulnO5/?node-id=2611-74300)
- [에이전트 유형 Chip](https://www.figma.com/design/cUKHT2PdHjAKRXZlzulnO5/?node-id=3016-102468)
- [Button](https://www.figma.com/design/cUKHT2PdHjAKRXZlzulnO5/?node-id=3025-25029)
- [일반 IconButton](https://www.figma.com/design/cUKHT2PdHjAKRXZlzulnO5/?node-id=2427-25105)
- [원형 첨부 IconButton](https://www.figma.com/design/cUKHT2PdHjAKRXZlzulnO5/?node-id=3104-27)
- [Switch](https://www.figma.com/design/cUKHT2PdHjAKRXZlzulnO5/?node-id=3145-17067)
- [Text Button](https://www.figma.com/design/cUKHT2PdHjAKRXZlzulnO5/?node-id=2427-25177)
- [Calendar 패널](https://www.figma.com/design/cUKHT2PdHjAKRXZlzulnO5/?node-id=3149-117371)
- [Calendar 날짜 셀](https://www.figma.com/design/cUKHT2PdHjAKRXZlzulnO5/?node-id=3149-19150)
- [Search](https://www.figma.com/design/cUKHT2PdHjAKRXZlzulnO5/?node-id=2304-19748)
- [Pill Chip](https://www.figma.com/design/cUKHT2PdHjAKRXZlzulnO5/?node-id=2427-25194)
- [Filter Chip](https://www.figma.com/design/cUKHT2PdHjAKRXZlzulnO5/?node-id=3092-25329)
- [Filter Chip Group](https://www.figma.com/design/cUKHT2PdHjAKRXZlzulnO5/?node-id=3099-25232)
- [Checkbox-icon](https://www.figma.com/design/cUKHT2PdHjAKRXZlzulnO5/?node-id=3074-98892)
- [Breadcrumb](https://www.figma.com/design/cUKHT2PdHjAKRXZlzulnO5/?node-id=2427-25430)
- [Breadcrumb separator](https://www.figma.com/design/cUKHT2PdHjAKRXZlzulnO5/?node-id=2427-25423)
- [Chat Composer](https://www.figma.com/design/cUKHT2PdHjAKRXZlzulnO5/?node-id=2611-69436)
- [사용자 메시지](https://www.figma.com/design/cUKHT2PdHjAKRXZlzulnO5/?node-id=2972-20901)
- [응답 중단 안내](https://www.figma.com/design/cUKHT2PdHjAKRXZlzulnO5/?node-id=3016-102212)
- [예시 프롬프트 선택](https://www.figma.com/design/cUKHT2PdHjAKRXZlzulnO5/?node-id=2320-28612)
- [Picker Item](https://www.figma.com/design/cUKHT2PdHjAKRXZlzulnO5/?node-id=2627-61977)
- [Picker Footer](https://www.figma.com/design/cUKHT2PdHjAKRXZlzulnO5/?node-id=2627-62004)
- [에이전트 Picker 화면](https://www.figma.com/design/cUKHT2PdHjAKRXZlzulnO5/?node-id=3016-104794)
- [검색 Picker 화면](https://www.figma.com/design/cUKHT2PdHjAKRXZlzulnO5/?node-id=2978-58104)
- [Menu Item](https://www.figma.com/design/cUKHT2PdHjAKRXZlzulnO5/?node-id=3135-16031)
- [Menu 패널](https://www.figma.com/design/cUKHT2PdHjAKRXZlzulnO5/?node-id=3135-16036)
- [Flyout](https://www.figma.com/design/cUKHT2PdHjAKRXZlzulnO5/?node-id=3010-23522)
- [Flyout Header](https://www.figma.com/design/cUKHT2PdHjAKRXZlzulnO5/?node-id=3005-23089)
- [Flyout Footer](https://www.figma.com/design/cUKHT2PdHjAKRXZlzulnO5/?node-id=3005-23094)
- [Flyout Item](https://www.figma.com/design/cUKHT2PdHjAKRXZlzulnO5/?node-id=3005-23146)
- [Session Panel](https://www.figma.com/design/cUKHT2PdHjAKRXZlzulnO5/?node-id=2975-69460)
- [Session Item](https://www.figma.com/design/cUKHT2PdHjAKRXZlzulnO5/?node-id=2986-22114)
- [Session Progress Step](https://www.figma.com/design/cUKHT2PdHjAKRXZlzulnO5/?node-id=2987-22132)
- [Session Context Item](https://www.figma.com/design/cUKHT2PdHjAKRXZlzulnO5/?node-id=2987-22151)
- [Session Section Header](https://www.figma.com/design/cUKHT2PdHjAKRXZlzulnO5/?node-id=2986-22139)
- [Session History Item](https://www.figma.com/design/cUKHT2PdHjAKRXZlzulnO5/?node-id=2995-22304)
- [Output Viewer](https://www.figma.com/design/cUKHT2PdHjAKRXZlzulnO5/?node-id=3015-24221)
- [File Item](https://www.figma.com/design/cUKHT2PdHjAKRXZlzulnO5/?node-id=3128-25559)
- [Data Card](https://www.figma.com/design/cUKHT2PdHjAKRXZlzulnO5/?node-id=2427-25252)
- [Thumbnail Card](https://www.figma.com/design/cUKHT2PdHjAKRXZlzulnO5/?node-id=3100-114430)
- [Schedule Card](https://www.figma.com/design/cUKHT2PdHjAKRXZlzulnO5/?node-id=3100-171)
- [Item Card](https://www.figma.com/design/cUKHT2PdHjAKRXZlzulnO5/?node-id=3095-143)
- [Scrollbar](https://www.figma.com/design/cUKHT2PdHjAKRXZlzulnO5/?node-id=3155-20473)
- [Divider](https://www.figma.com/design/cUKHT2PdHjAKRXZlzulnO5/?node-id=3155-20478)
- [Dialog footer](https://www.figma.com/design/cUKHT2PdHjAKRXZlzulnO5/?node-id=3151-20373)
- [SNB 보드/제품 조합](https://www.figma.com/design/cUKHT2PdHjAKRXZlzulnO5/?node-id=3074-101398)
- [SNB 전용28px 아이콘](https://www.figma.com/design/cUKHT2PdHjAKRXZlzulnO5/?node-id=2611-62007)
- [SNB 레일 항목](https://www.figma.com/design/cUKHT2PdHjAKRXZlzulnO5/?node-id=2611-62032)
- [SNB 기본 탐색 레일](https://www.figma.com/design/cUKHT2PdHjAKRXZlzulnO5/?node-id=2611-62055)
- [SNB 섹션 헤더](https://www.figma.com/design/cUKHT2PdHjAKRXZlzulnO5/?node-id=2611-62413)
- [SNB 콘텐츠 행](https://www.figma.com/design/cUKHT2PdHjAKRXZlzulnO5/?node-id=2611-62441)
- [SNB 콘텐츠 패널](https://www.figma.com/design/cUKHT2PdHjAKRXZlzulnO5/?node-id=2611-63754)
- [Global Header](https://www.figma.com/design/cUKHT2PdHjAKRXZlzulnO5/?node-id=2611-62099)
- [Chat Header](https://www.figma.com/design/cUKHT2PdHjAKRXZlzulnO5/?node-id=2967-34438)
- [Dialog 예약 편집](https://www.figma.com/design/cUKHT2PdHjAKRXZlzulnO5/?node-id=3192-27853)
- [Dialog 에이전트 찾기](https://www.figma.com/design/cUKHT2PdHjAKRXZlzulnO5/?node-id=3163-22376)
- [생각 중 진행 예시](https://www.figma.com/design/cUKHT2PdHjAKRXZlzulnO5/?node-id=3016-118094)
- [Component elevation](https://www.figma.com/design/cUKHT2PdHjAKRXZlzulnO5/?node-id=3261-59766)

이는 위 자료의 참조 계약입니다. Agent Hub 전체 테마·타이포그래피·페이지·다크 모드나
실제 앱의 시각·동작 일치까지 확인한 것은 아닙니다. 제품 채택 설정은 계속 `draft`로 둡니다.
Figma 파일 제목의 ‘치타’는 출처 이름이며 별도 역할·프로젝트·고객 profile을 만들지 않습니다.

## 2026-10-21 상태·폼 보강

[현재 채택 계약](./motion.md)은 Figma 실측, 공용 계승 동작, 사용자 변경, 신규 모션 제안을 구분합니다.
[AgentHubInput](./components/AgentHubInput/README.md)·[AgentHubTextarea](./components/AgentHubTextarea/README.md)·
[AgentHubSelect](./components/AgentHubSelect/README.md)는 공용 입력 계약을 사용하는 얇은 adapter3종입니다.
기존56종에 추가해59종이며 실제 제품 구현은 계속 unmapped입니다.
