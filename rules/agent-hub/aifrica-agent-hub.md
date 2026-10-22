# Agent Hub 솔루션 컨텍스트

먼저 inheritCommon과 실제 frontend-common 선택 여부를 확인한다. 아래 공용 frontend 문서·컴포넌트
참조는 공용을 켠 작업에서만 적용한다. 공용을 끄면 현재 제품의 자체 지침을 따르고 공용 문서의 존재를 요구하지 않는다.

현재 checkout이 TeamAI 프로젝트 `agent-hub` 또는 제품 로컬 설정으로 이 솔루션을 선택했는지 확인한다.
문서 root와 선택 충돌 처리 기준은 `common/resolution.md`를 따른다.
공용 원본의 `docs/agent-hub/`는 기본 TeamAI mirror에서 `.teamai/docs/agent-hub/`로 유지된다.

**Frontend·UI 작업일 때** `agent-hub/README.md`, `agent-hub/extension.md`, `agent-hub/frontend.json`을 읽고
공용을 켠 경우에만 `frontend/README.md`도 읽는다. 현재 제품 코드·로컬 채택 설정을 작업 모드에 맞게 비교한다.
프로젝트 namespace는 backend 역할에도 배포되므로 frontend 계약을 backend 작업에 적용하지 않는다.

공용 opt-in을 확인한 뒤 Agent Hub 전용 registry의 id/name/alias와 현재 제품의 local mapping을 먼저 찾는다.
유지보수는 실제 source/public export를 확인하고, 문서 전용 재현은 외부 제품 source를 요구하지 않는다.
호환 구현이 없거나 의존성이 필요하면 공용 registry의 id/alias·의미·direct dependency를 따라 확인한다.
계약만 있는 Input·Select·Textarea·ScrollArea 등은 재사용 컴포넌트로 먼저 구현·검증한 뒤 상위 UI를 조합한다.
정적 크기·색상 외에 motion·focus owner·scroll owner·disabled 차단·keyboard·reduced motion도 비교한다.
전역 CSS가 처리할 것이라고 가정하지 않고 실제 owner를 연결하며, AH geometry는 variant/adapter로 보존한다.
공용을 끈 제품에는 이 fallback이나 공통 registry를 강제하지 않는다.

공용을 켠 컴포넌트·아이콘·로고 UI 작업이면 `agent-hub/design/README.md`, 추가 `component-registry.json`과
해당 컴포넌트 문서를 읽는다. 원본 SVG·PNG는 같은 namespace의 assets에 있으며 `asset-manifest.json`에서
이름·실제 크기·Figma 출처로 찾는다. 일반 아이콘 16px 선은 1px, 파일 타일은 44px, 메인 마크는
180px 표시 기준이다. 공용 Icon의 규격으로 일괄 치환하지 않는다. 실제 제품 구현은 별도로 확인한다.
BrandMark는 사용자 요청에 따라 애니메이션을 제외하고 정적 원본 PNG만 표시한다. 공개 입력은 size·label·className·style이다.
모션·재생 제어 API나 회전·광택 장식층을 추가하지 않는다. ThinkingStatus의32px 마크도 정적이며 글자 shimmer와 분리한다.
`design/components/AgentHubBrandMark/reconstruction.md`와 `design/references/brand-mark.reconstruction.json`에서 출처·추정 범위를 확인한다.
원본 PNG와 사용자 SVG wrapper에는 분리 레이어가 없었다. 복원 SVG의 ellipse·gradient·mask와 가려진 영역은 추정값이며 Figma 벡터 원본·픽셀 단위 동일 복구로 기록하지 않는다.
원본 PNG·원본 manifest와 복원 SVG·provenance는 비교 자료로 보존한다. 복원 SVG를 현재 표시 자산이나 로드 실패 대안으로 사용하지 않는다.
원본 비율·투명도·예약 공간을 유지하고 의미 있는 label은 이미지 alt에서 한 번만 제공한다. 마크 자체를 녹음·마이크 입력이나 AI 진행률 API로 연결하지 않는다.
유형 Chip 4종과 Button 44종은 `design/references/`에 Figma 실측 값이 있다. Button은 공용과 다른
radius·secondary 채움·ghost·keycap 규격을 적용하고 공용 팔레트 전체를 변경하지 않는다.
미제공 variant·dark·focus 시각 값을 Figma에서 확인한 값으로 추정하지 않으며 공용의 접근성 의무는 유지한다.
아이콘 버튼 작업은 `AgentHubIconButton` 33종과 원형 `AgentHubAttachIconButton` 5종을 구분한다.
일반 32px radius는6, 첨부32px radius는9999이며 glyph 크기도20/24px로 다르다.
일반 active와 pressed를 합치거나 첨부의 의미 미정 state5를 선택·열림 상태로 자동 매핑하지 않는다.
Switch는 공용 medium과 같은 40×22px track·18px thumb를 유지하고 On 색상·radius/full·실제 border를 연결한다.
TextButton은 공용 tiny와 높이·색상은 같지만 보이는 trailing 아이콘 16px·선 1px를 사용한다.
숨겨진 leading을 지원 slot으로 해석하거나 Switch의 checked와 enabled/disabled를 같은 값으로 취급하지 않는다.
Calendar는 radius12와 실제 shadow를 사용하며 하단 Button32·월 이동 IconButton32는 기존 Agent Hub 계약에 연결한다.
월 헤더28px는 tiny TextButton과 구분하고 중첩 button 없이 조작 주체를 하나로 둔다.
날짜4유형의 null은 빈 자리이며 실제 disabled 날짜가 아니다. 필요한4~6주·상태 소유권·접근성은 공용을 유지한다.
일자 view의 정적 조합 확인을 DatePicker 입력·dark·range 시각 상태나 실제 앱 구현 검증으로 확대하지 않는다.
Search는48/32px·radius8/6·clear20px와 기존 Agent Hub search/x/filter 자산을 연결한다.
clear/filter frame을 독립 IconButton 원본으로 취급하지 않으며 filter 표시와 filtered 강조를 구분한다.
숨겨진 자식·없는 filtered+typing/disabled 조합을 노출된 상태로 추정하지 않고 값·검색 실행·필터 상태는 호출자가 소유한다.
Chip은 업무유형4종·Pill28px·선택형Filter28/32/36·Group을 구분한다. 기존 AgentHubChip 별칭은 업무유형 계약에 남는다.
Pill의 selected는 enabled와 같은 시각이며 disalbed는 원본 오타다. Show icon 속성만으로 아이콘을 추가하지 않는다.
Filter의 selected와 순간pressed는 별개이고 실제24종에는focused가 없다. 숨김 icon/count를 켠 조합은 별도 검증한다.
Group의hug/wrap/scroll과gap8·fade를 연결하되 실제 overflowDirection NONE을 브라우저 scroll 구현 완료로 해석하지 않는다.
선택·필터 조회는 페이지가 소유하고 native keyboard/focus·disabled 실차단·중첩button 방지를 함께 확인한다.
Checkbox는 시각12/16/20px·radius3/4/5·1px round 마크이며 checked/mixed enabled에는 실제 선이 없다.
마크는 일반 아이콘 인스턴스가 아니며 기존SVG12종은 Box+Mark 전체다. native checkbox/검증된primitive의 장식 indicator로만 연결한다.
Mark는 원본 좌표·크기를 고정한 opacity160/120ms만 전환한다. scale0.8→1은 체크의 왼쪽 윤곽이 밀려 보이는 문제로 폐기하고 transform/상태별 정렬 교체를 적용하지 않는다.
Mark 전용6종은 원본 node의 별도 export이며 `design/references/checkbox-marks.assets.json`의 native 크기·offset으로 배치한다.
`design/motion.md`의 채택 모션·secondary currentColor·Filter 선 공간 예약을 원본 Figma 관찰값과 구분한다.
type의 선택값과 state의 enabled/disabled를 구분하고 label·hit area·form·mixed·Tab/Space·focus 계약을 유지한다.
Breadcrumb은 font16/24·400, 현재 항목까지 label #1C1C1C, root gap0과 separator 좌우8을 적용한다.
Breadcrumb의slash/arrow와 독립 separator의slash/en dash/arrow를 구분한다. arrow SVG21.5575×24는 padding을 이미 포함한다.
일반 Icon/TextButton으로 치환하거나 padding을 중복 적용하지 않고 링크·비대화형 현재 페이지·hover underline·focus·축약 계약을 유지한다.
제공되지 않은 Hub hover/focus/disabled·메뉴 시각 값을 확인된 상태로 추정하지 않는다.
ChatComposer는 `AgentHubChatComposer`의 4상태와 implementation 안내를 읽고 기존 제품 조합을 우선 비교한다.
호환 구현이 없으면 솔루션 신규 컴포넌트/public export를 개발한다. Textarea는 native 의미를 재사용하고 84px/radius4/border를 중복 강제하지 않는다.
Composer 입력은 후속 채택에 따라 내부 textarea와 바깥 pill에 추가 focus border/ring을 만들지 않는다.
기본1px 선·두 shadow·caret는 유지하고 첨부·전송·프로젝트 버튼의 독립 focus-visible은 보존한다. 공용 Input/Textarea나 Search에는 확대하지 않는다.
768×58 surface의 radius/full·1px #DDD·Overflow shadow와 project FRAME의 y62/높이28, 샘플90px footprint를 연결한다.
send는 attach hovered 원본의 arrow24 swap·blue/white override이며 실제 hover나 전역 state5를 강제하지 않는다.
project는 Chip 원본이 아니며 16px로 재정의한 folder 전용 자산을 사용한다. selected의 일반 Chip/purple override와 Divider를 업무유형 Chip 원본으로 오인하지 않는다.
입력·프로젝트·에이전트·첨부·전송·IME·disabled·오류는 제품이 소유하며 미제공 상태를 구현 검증으로 추정하지 않는다.
사용자 메시지는 `AgentHubUserMessage`와 implementation 안내를 읽는다. `AgentHubMessage` 별칭은 사용자 표시만 가리킨다.
chat/agent/schedule 버블의 px16/py10·radius12·#F4F4F4·font16/24·border/shadow 없음을 연결한다.
agent의 일반 Chip/purple override와 Divider는 업무유형 Chip 원본이 아니며 “에이전트”가 workflow 분류를 뜻하지 않는다.
schedule은 투명 outer의 우측 정렬·gap8·샘플68px와 안쪽 FRAME을 구분하고 실제12px clock 전용 자산을 사용한다.
숨겨진 arrow3개를 노출하거나 한 줄44px clipping으로 긴 메시지를 버리지 않는다. 실제 높이·줄바꿈은 제품에서 검증한다.
기존 구현이 없으면 솔루션 컴포넌트를 개발하되 예시 props/renderer를 실제 코드로 간주하지 않는다. 복사·편집·assistant·Markdown·stream 상태는 미제공이다.
응답 중단 안내는 `AgentHubProgressAlert`의 단일 샘플과 implementation 안내를 읽는다. state variant는 제공되지 않았다.
640×46·radius8·#F4F4F4·1px #DDD와 tertiary28 enabled 버튼2개·기존 circle-alert20을 조합한다.
root의 border 포함 layout과 버튼의 border 제외 layout을 구분하고 inside 1px 선 때문에 버튼 콘텐츠를2px 늘리지 않는다.
재시도 context·중복 요청·편집 draft는 제품이 소유한다. 숨김 아이콘/keycap이나 진행률·spinner·취소·닫기·자동 숨김을 추가하지 않는다.
공용 Notification으로 대체하거나 `role="alert"`를 강제하지 않고 실제 안내 의미·공지 빈도·focus를 제품에서 검증한다.
예시 선택은 `AgentHubMessageExample`과 implementation 안내를 읽는다. 발송된 UserMessage와 별개인 action이며 기존 Button 원본 instance는 없다.
HUG121×44·radius12·px20/py12·font14/20·400과 blue3상태를 연결하고 AgentHubButton의 색·font600·radius를 덮어씌우지 않는다.
native action host 하나와 키보드/focus를 유지하고 선택 결과는 제품 `onActivate`에서 명시한다. 순간 pressed를 selected/aria-pressed로 해석하지 않는다.
icon Boolean에 따라 기존 arrow-right20을 표시하고 숨길 때는 빈 slot/gap도 제거한다. icon=false 별도 렌더·disabled/loading/dark는 미검증이다.
Picker 작업은 `AgentHubPickerItem`·`AgentHubPickerFooter`·`AgentHubPicker`와 implementation 안내를 함께 읽는다.
Item36px/radius6·유형 Chip FRAME의 radius8·검색 recipe32px menu 행을 구분하고 모델 logo/이름은 동적 데이터로 연결한다.
filter 표시 true는 filtered=false와 별개이며 찾기 link subtree 부재는 visible=false 노드나 Figma Boolean이 아니다.
Footer의 kbd는 안내이며 별도 전역 keydown을 등록하지 않는다. 검색·모델·필터·더보기·행 선택을 중첩 button/option 안에 넣지 않는다.
원본 clipping/Scrollbar와 overflowDirection NONE은 스크롤 구현이 아니다. 하단39px 공간과 마지막 항목·focus 가시성을 실제로 확보한다.
프레임 두 조립은 제품 API·modal/listbox 의미·선택 후 동작을 확정하지 않으므로 명시적 제품 채택과 runtime 검증 후 source/export를 매핑한다.
일반 메뉴는 `AgentHubMenuItem`·`AgentHubMenu`와 implementation 안내를 읽고 공용 Menu의 의미·키보드·focus 계약을 유지한다.
패널 radius12·body28px/L16/R12·destructive #D00A0A와 숨김 header28px·divider9px를 연결한다. Picker의32px 행·radius24와 구분한다.
optional icon/value/check/chevron/header/divider와 Scrollbar는 기본 false다. 숨겨진 slot이나 공급된 자산을 기본 화면에 노출하지 않는다.
11행318px 샘플을 최대 높이/스크롤 구현으로 취급하지 않고 viewport·항목 상태·focus·disabled·메뉴 명령을 실제 제품에서 검증한다.
Elevation 작업은 `agent-hub/design/foundations/Elevation.md`를 읽는다. 4개 shadow레벨은navy2겹이며 Sunken은배경표현·shadow없음이다.
Mid 샘플의opacity0.9를 전역상속하지 않고 Calendar Mid·Switch thumb Raised의 이미 확인한 값을 유지한다.
그림자 레벨로 z-index/portal/focus를 바꾸거나 inset상태표시·내부/외부surface의 shadow소유권을 덮어쓰지 않는다.

공유 frontend 설정은 현재 `draft`다. 미확인 테마·경로·도메인·페이지 구성을 추정하지 않는다.
List·Create·Detail의 공통 상태·접근성 계약을 유지하고 제품 차이는 명시적인 extension에 기록한다.
JDC 관찰 자료나 다른 솔루션 설정을 이 제품의 기본값으로 자동 상속하지 않는다.
고객 profile은 검증된 채택 파일과 제품의 명시적 선택이 있을 때만 적용한다.


Flyout 작업은 `agent-hub/design/components/AgentHubFlyout/`의 8문서와 하위 Header/Footer/Item을 읽는다.
내부는 새 Figma 조합이며 Menu에서 채택하는 것은150ms/ease/both·4방향6px fade/slide뿐이다.
`motion.md`에서 실제 side·origin·closed pointer guard·Presence·reduce fallback을 연결한다. Menu의 role/첫 focus/행/폭은 강제하지 않는다.
Item은10개 부분 matrix, 높이28/font12/16이며 item pressed rgba(0,0,0,.1)과 selected#EBF3FF를 구분한다.
파일 source20/display16/선1.25와 정확한 전용 glyph를 유지하며 icon 이름만 보고 폴더 그림으로 교체하지 않는다.
원본16행 중5숨김과 footer 단독29/실제33 override·목록11px겹침을 구분하고 실제 scroll/focus·확장/선택 owner를 검증한다.
후속 채택에서 shell의Header가 구분9px(4+선1#DDD+4)을 소유한다. standalone54는유지하고 shell은총63/y5..68·body297/y68..365·Footer33/y365..398로조립한다. bodydivider를제거하고 스크롤중에도 Header선이 고정되는지확인한다.
평면목록은 disclosure없이유지한다. children존재(빈배열포함)는폴더이며 optionaldisclosure의부모expandedIds/onExpandedChange를함께제공한다. 누락된owner·disabled폴더는조작을차단한다. 폴더는펼침만·파일은선택만한번실행한다.
폴더는nativebutton의aria-expanded/controls와중첩ul을사용하며 자동Tree역할을붙이지않는다. 공유AnimatedDisclosure로높이250ms·동일down-glyph0°↔−90°회전200ms를연결하고 닫는subtree는즉시inert/aria-hidden·내부focus를부모복귀한다. 재토글·재열기·unmount·reduce변경에서이전완료를취소한다.
childselected의#EBF3FF/aria-pressed와깊은계층의추가24px들여쓰기는runtime채택값이며 Figma실측으로표시하지않는다. 원본childL56·glyph·label은유지한다.
shell propertyDefinitions null은 getter 제한 미수집이며 없음을 뜻하지 않는다. 생성 context의footer=true와 실제 binding을 확인한 범위대로 읽는다.
Menu 자체의 reduce 지원이나 Figma motion 측정을 주장하지 않으며 실제 제품 source/export는 검증 후 매핑한다.


Session 작업은 `agent-hub/design/components/AgentHubSessionPanel/`의7문서와5개 Session 하위 계약을 읽는다.
공용에 없는 신규 전용 조합이며 실제 source/export를 조사해 재사용하거나 새로 개발하고 검증 후 로컬에 매핑한다.
6원본19종의 empty/filled·각4상태행·진행3상태·접힘2상태와 raw source/actual override를 구분한다.
Panel320/r16/px12/py16/gap24/#F6F7F9/#EEE1/Mid, history286/r8와context290/r8의 inset을 유지한다.
history toggle은 ghost24 source의actual16 frame/glyph16이며 native16 지원이나 전체scale을 가정하지 않는다.
현재실행 selected와unread·섹션/기록 expanded·진행status·추가/행action의 owner를 분리하고 한 입력에 callback을 한 번만 연결한다.
정확한 Session SVG17개를 사용하며 active 원형에 회전을 추가하거나 Tree/Menu/Stepper/Checkbox/메시지의 의미·모션을 자동 이식하지 않는다.
ProgressStep의 현재 채택은 원본20px 이미지·박스를 보존하고 active 이미지에만 중앙반지름6px clip을 적용해 파란중심12px을 노출한다.
원본에 포함된 정적하늘색stroke4는 숨기고 #CCE0FF는 별도1600ms 파동층에서만 표현한다. 이전 전체activeSVG+추가halo 채택을 대체하며 원본SVG/manifest/측정JSON은 수정하지 않는다.
reduce/forced-colors/print는 파동층만 제거하고 clip은 유지한다. done/pending·label·connector·부모status/접근성은 바꾸지 않으며 `AgentHubSessionProgressStep`의styles/implementation/verification을 따른다.
Panel 전체 정의 null은 getter 미수집이다. 정적 조합 검사와 실제 제품 렌더·keyboard·요청·scroll 검증을 구분한다.


OutputViewer 작업은 `agent-hub/design/components/AgentHubOutputViewer/`의7문서와 실측/자산/조합 대조를 읽는다.
신규 전용 패널이며 단일 COMPONENT의 title/type TEXT2·표시 Boolean3·native content SLOT1을 실제 속성으로 구분한다.
root540×977 무fill/무stroke/r0·Mid와 Header top16/content bottom16의 모서리, header34·content943 FILL을 보존한다.
root에 선을 중복 추가하거나 content top선0을1로 바꾸지 않는다. 생성 plus24 이름 대신 actual maximize16/x16 source를 연결한다.
형식 숨김은dot/type둘을 제거하고 확대/닫기 button은 각각 하나의 callback에 연결한다. 노출 Boolean을 expanded/open으로 사용하지 않는다.
제품의 파일ID/버전·조회·renderer·확대·닫기·focus·실제 scroll owner를 명시하고 Session의 선택/읽음/진행 상태와 분리한다.
원본에 없는 modal·스크림·Fullscreen API·드래그resize·탭·다운로드·편집·파일 해석기·요청상태를 구현된 기능으로 주장하지 않는다.
source/public export는 제품에서 조사·검증 후 로컬 mapping에 기록하며 공용 해제 시 이 catalog와 공용 절차를 강제하지 않는다.


Card 작업은 `agent-hub/design/cards.md`에서 유형을 고른 뒤 FileItem/DataCard/ThumbnailCard/ScheduleCard/ItemCard의7문서를 읽는다.
원본5종·25샘플을 같은Card API로 합치거나 공용 Card392/r8·선택 inset1·childrenopacity.4로 덮어쓰지 않는다.
실제source 재사용은 파일타일44/tertiary28/공용PillSmall Chip/ghost20 more 등이며 공용Card 자체의 인스턴스는 없다.
FileItemborderlayoutfalse·meta−4와미바인딩buttonBoolean,Thumbnail내부322/4:3·Overflow/Mid,Schedule14status/16control/24FRAME을 구분한다.
Itemmore20/glyph16·pin/chatFRAME24·accent투명1px공간·disabled개별paint/로고saturation−1·hover/pressed에만존재하는pin을 보존한다.
정확한whole pin16을 사용하고 fragment를늘리거나회전을중복하지 않는다. disabled32pxplaceholder는원본imageHash와달라 실제로고대체로쓰지 않는다.
카드mainaction·다운로드/메뉴·예약제어·고정·대화는제품owner에한callback씩연결하며 독립control을카드button안에중첩하지 않는다.
키보드/touch에서도pin등명령에접근하게 제품확장을검증한다. 원본25시안을실제앱/Booleanfalse/전체상태지원의증거로취급하지 않는다.
공용off에서는공용절차와extendsCommon catalog를강제하지않고 실제제품source/export검증후로컬mapping에기록한다.


Scrollbar 작업은 `agent-hub/design/components/AgentHubScrollbar/`의7문서와 실측 기록을 읽는다.
공용 두께4px·radius9999·시작3px를 유지하고 이 원본의 불투명#DDD·11px 로컬 gutter를 연결한다.
root의 실제fill/stroke/effect는 없고 thumb는absolute다. padding1이나 저장된strokeWeight1을 추가 선/위치로 해석하지 않는다.
180px 영역·160px 길이·오른쪽4/아래17px 잔여는 샘플이며 viewport 축소나 고정 thumb·끝점공식으로 만들지 않는다.
공용 native overflow·동적 비율/clamp·형제 overlay·중첩영역 독립성을 유지하고 hover/dark/가로형 시각은 별도 채택·검증한다.
기존Menu/Picker의 다른 Scroll bar source2019:3708을 이3155:20473으로 일괄 교체하지 않는다.
실제 제품의 wheel/touch/keyboard·drag·resize·focus/접근성을 검증한 뒤 source/export를 로컬에 매핑한다.
공용off에서는 이extendsCommon catalog와 공용 지침을 강제하지 않는다.


Dialog footer는 `agent-hub/design/components/AgentHubDialogFooter/`의7문서와 실측 기록을 읽는다.
공용의 사방24px 패딩·8px 간격·우측 정렬을 유지하고, 이 계약에서만 medium32 대신 기존 AgentHubButton의 tertiary40·primary40을 조합한다.
버튼의 radius8·글꼴16/24/600·primary #3B82F6/흰 글자·tertiary 흰 배경/1px #DDD inside 선은 기존 Button 계약을 재사용한다.
footer 자체에는 fill/stroke/effect가 없다. 높이88px는 버튼과 패딩의 합이며580px는 샘플 폭이다. 전체 Dialog나 공용 Button 기본값은 바꾸지 않는다.

cancel Boolean은 취소 버튼 노출만 제어한다. 닫힘·열림·pending 정책과 구분하고 숨김 아이콘이나 실제 자식이 없는 keycap을 표시하지 않는다.
기존 footer 슬롯이 패딩과 간격을 제공하면 액션만 채워 여백 중복을 피한다. 실제 공개 API·제출·취소·닫힘·focus는 제품 owner가 연결한다.
공용 Dialog의 의미와 접근성을 유지하고 cancel=false·async·negative·dark·좁은 폭 상태는 제품에서 별도로 검증한다.
공용을 끄면 이 추가 catalog와 공용 문서를 강제하지 않으며, 실제 구현을 검증하기 전 source/export는 unmapped로 둔다.


SNB는 `agent-hub/design/snb.md`에서 전체 조합과6개 하위 계약을 읽는다. CMP SNBV1/V2의 역할·geometry·API를 가져오지 않는다.
전용68px rail·52px 항목·28px 채움 glyph와288px panel·32px 행·20px section header를 원본 source에 연결한다.
원본 보드의1224×1264/radius100·SNB 제목·40px 공백은 전시용이며 실제 shell과 조합356px는 제품에서 명시한다.
route/current leaf·rail 선택·section/project 펼침·hover/pressed·더보기·새 채팅·검색·설정·계정 intent의 owner를 구분한다.
링크·action·disclosure·더보기는 native 의미와 형제 host를 유지하고 전체 목록에 Menu/Tree 역할을 자동 적용하지 않는다.
source hovered+selected fill의 pinned 행·실제256/255px 폭·현재 clip/NONE과 raw gradient를 보존하고 runtime adapter와 구분한다.
실제 viewport와 끝 항목/focus 접근·hover 외 명령 노출·접힌 subtree 제외를 구현하며 제공되지 않은 dark/mobile/접힘/요청 상태는 별도 검증한다.
정확한 SVG31개와54개 glyph slot은 `agent-hub/design/references/snb.assets.json`을 따르고 static source나 실제 paint를 임의 치환하지 않는다.
실제 제품 source/export는 검증 후 로컬에 기록한다. 공용 off에는 이 catalog와 공용 절차를 강제하지 않는다.

SNB의 현재 채택은 rail 원본28px alpha mask 한 층의 currentColor757575↔3B82F6/200ms와 host 배경200ms를 각각 연결한다.
SectionHeader title-toggle은 gap2이며 원본 gap0과 구분한다. 목록은 AgentHubScrollbar/공용 엔진 한 viewport를 사용하고 native thin을 중복하지 않는다.
SNB만 visibility hover를 선택해 패널 hover·focus-within·drag에서4px/#DDD/gutter11px thumb를 노출하며 coarse pointer에서는 상시 표시한다. 다른 소비자의 기본 always를 바꾸지 않는다.
일반 more는 row 끝에서 right2px 안쪽의 투명20px wrapper와 main의 상시20px 예약을 사용한다. 원본36px gradient/특수 pinned 기록은 보존하며 일반 프로젝트에 다른 색 면을 남기지 않는다. 버튼 자체 hover EEE/pressed DDD·200ms와 reduce 즉시 반영을 검증한다.


Global Header는 `agent-hub/design/global-header.md`와 `components/AgentHubGlobalHeader/`의7문서를 읽는다.
공용 PageHeader와 CMP GlobalHeaderV1/V2의 구조·API를 가져오지 않고 전용43px/px16/blue-gray#F6F7F9를 연결한다.
root에는 stroke paint나 shadow가 없다. bottomWeight1만 보고 선을 추가하지 않으며 숨김 Divider/Breadcrumb/Chip은 gap·focus·AT에서도 제외한다.
로고138px 박스·clipfalse와 실제 글자 끝181.91015625px를 구분하고 Poppins600/400·15.505618/18.606741을 보존한다.
바로가기FRAME136×24/r4·white/1px#DDD·Pretendard12/16, 알림FRAME32/r6·glyph20/선1.25를 기존 버튼 원본 instance로 간주하지 않는다.
전용 SVG3개의 FRAME 출처·native와 표시 크기 차이는 `agent-hub/design/assets/global-header/manifest.json`을 따른다.
전체 폭774는 샘플이다. 제품이 목적지·링크/명령·알림 열림·focus·shell 배치·협소폭 adapter를 소유하며 계정·검색·unread를 추정하지 않는다.
root props 없음과23개 빈 reactions는 단일 기본 시각 근거다. hover/dark/mobile나 실제 동작 검증으로 확대하지 않는다.
Button/Link/IconButton 의존성은 공용을 켠 작업의 의미·접근성 참고이며 실제 하위 source 재사용 주장이 아니다. 공용 off에는 이 catalog와 공용 문서를 강제하지 않는다.


Chat Header는 `agent-hub/design/chat-header.md`와 `components/AgentHubChatHeader/`의 기본7문서·별도motion을 읽는다.
실제 원본명 chat-header는 대화 상단이며 Chart/Table renderer·페이지 h1·전역 banner·CMP shell을 새로 만들 근거가 아니다.
48px border-box·좌우16px·white·bottom1px#DDD를 유지하고 border 포함47px 안의24px 자식 y11.5와 actions gap4를 연결한다.
Breadcrumb2427:25431/item2372:36927의 단일 label과 ghost/default24 IconButton2427:25108의 실제3개 instance를 기존 계약에 연결한다.
slot name plus/24는 실제glyph가 아니다. pause2751:14602/file2916:58366/more2751:16967의16px·선1px와 정확한 기존 자산을 사용한다.
active-indicator의 기본 static은325×1/x0y47·4stop이며 기존 하단선 위에 겹친다. 퍼센트·50%폭·미채택 자동 motion·progressbar로 바꾸지 않는다.
thinking을 명시적으로 채택한 경우에만 `agent-hub/design/components/AgentHubChatHeader/motion.md`의 제안 mode와 cleanup·reduce를 적용한다.
원본 BACKGROUND_BLURradius11.5와 생성 context의 CSS5.75는 구분하고 불투명 white를 임의 반투명으로 바꾸지 않는다.
active-indicator/pause/file/more4Boolean은 노출만 제어한다. false에서는 해당 target과 gap을 제거하고 실제진행·pause·popup 상태와 분리한다.
제품이 경로/current·실행ID/명령/권한·파일대상·메뉴내용/open·focus복귀·협소폭을 소유한다. 기본 COMPONENT 외의 미검증 조합·dark·실제동작은 별도로 검증한다.
실제 제품 source/export는 검증 후 매핑한다. 공용 off에는 이extendsCommon catalog나 공용 절차를 강제하지 않는다.


Dialog는 공용을 채택한 frontend UI에서만 `agent-hub/design/dialog.md`와 `components/AgentHubDialog/`를 읽는다.
공용 modal·focus·닫힘 의미를 유지하며 radius16/blue-gray/24·32 제목, 580px 편집 폼과1296px 에이전트 찾기의 두 FRAME recipe를 연결한다.
Legacy header close32/r4/glyph24와 편집 Scroll bar2019:3708을 기존 AHIconButton32/r6/glyph20·AHScrollbar/r9999로 일괄 교체하지 않는다.
실제 Button·Search·ItemCard·Finder Scrollbar source를 재사용하고 편집 footer는 FRAME 조합임을 구분한다. 기존 footer host의 p24는 중복하지 않는다.
탐색 rail192·실제 Search1064/목록1056·3열344×166·description 최대40과48px gradient를 보존하고 실제 scroll viewport를 연결한다.
현재 지침 Textarea는 toolbar까지 포함한140px/r8 외곽선을 자식 위에서 연속 표시하며 입력 focus와 toolbar 버튼 focus를 분리한다.
빈도는 공용 Select의 값·combobox/listbox 의미를 유지하고 기존 AgentHubMenu 패널·AgentHubMenuItem의28px content·선택 check·150ms 모션을 재사용한다.
Finder는 header·rail을 고정하고 오른쪽 Search·결과만 AgentHubScrollbar 한 viewport에서 스크롤한다. 내부 native scrollbar를 남기지 않는다.
두 정적 Light 시안은 새 Dialog variant API나 완전한 상태·responsive·동작 검증이 아니다. 실제 source/export 확인 전 unmapped/draft를 유지한다.
공용 off에는 이 extendsCommon catalog와 공용 절차를 자동 적용하지 않는다.


생각 중 화면은 공용을 켠 frontend 작업에서 `agent-hub/design/chat-progress.md`를 읽는다.
`AgentHubThinkingStatus`는 BrandMark32+gap8+정적5stop 텍스트의 새 FRAME 조합이며 ProgressAlert 중단 안내와 구분한다.
Header1800ms/linear/좌→우/infinite/지연0, 협소 폭 이동 규칙과 외부 elapsed1000ms 갱신은 Figma 실측이 아닌 제안값이다.
default static과 show=false 우선을 유지하고 thinking track만clip한다. request key/phase/elapsed는 같은 제품 owner가 공급하고 종료·교체 때 observer를 정리한다.
로고는 정적 PNG를 재사용한다. 상태 텍스트의 원본5stop은 비교 자료로 보존하고 현재 소비 recipe에는 고정 gradient를 남기지 않는다.
ThinkingStatus는 기본 shimmer/static을 제공한다. 균일한#000/opacity.69 위에서 폭28%·중심 간격50%인 두 띠의 주기적 패턴만1800mslinear로 흐르게 한다.
이는 사용자 채택·구현 제안이며 Figma 실측이 아니다. static/reduced는 균일한 기본 글자, 읽기/print는#1C1C1C/opacity1, forced는CanvasText/opacity1로 표시하고 띠를 제거한다.
Header의 default static은 별도로 유지한다. 초마다 live announce하지 않으며 source/export 미검증은unmapped/draft, 공용off에는이catalog를강제하지않는다.

## 최신 상호작용 보완

Picker 추천형·검색형, MenuItem·FlyoutItem은 실제 행 배경200ms ease hover와 행 한 곳의 inset2px 키보드 ring을 제공한다. 공용 Menu의 hover 우선으로 ring을 숨기고, 내부 주버튼의 이중 outline이나 focus만으로 hover 면을 만드는 처리를 제거한다. 독립 보조 버튼 focus·선택·disabled 의미는 유지한다.
빈도 Select의 짧은 option 목록은 세로 overflow=false이면 scrollbar11px 예약을 제거하고, 실제 overflow일 때만 gutter와 thumb를 제공한다. 행 자체 L16/R12는 원본 MenuItem 계약을 유지한다.
ProgressStep의 중심은 고정하고 halo는1600ms/ease-out에서 0% opacity0/scale1→22% .6/1.08→100% 0/1.6으로 연결한다. 루프 양 끝은 투명해 재시작 때 갑자기 원이 생기지 않는다.
예시·AI 외부 주입과 새 메시지 부분은400ms ease-out 좌→우의 시각 reveal을 채택한다. 원문·controlledvalue·접근성 텍스트는 즉시 완전 반영하고 직접 타이핑/IME는 효과를 취소한다. 상태·요청 owner를 timer에 옮기지 않고 reduced-motion/forced-colors/print에서는 즉시 원문을 표시한다. 모든 수치는 Figma 실측이 아닌 이번 채택·제안이다.
