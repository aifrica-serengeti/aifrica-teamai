# 컴포넌트 실측 기록

[디자인 확장](../README.md)의 적용 조건을 따릅니다. 아래 파일은 Figma에서 읽은 참조 값이며
실제 제품의 구현·전역 테마·검증 완료 설정을 뜻하지 않습니다. TeamAI로 받은 뒤에는 Figma 재접속 없이 읽을 수 있습니다.

| 파일 | 내용 |
| --- | --- |
| [agent-type-chip.figma.json](./agent-type-chip.figma.json) | agent-types 4종, 라벨·HUG/고정 폭·색상·radius·글꼴 |
| [button.figma.json](./button.figma.json) | Button 44종, type/size/state별 실제 치수·fill·border·글꼴·아이콘·keycap |
| [variables.figma.json](./variables.figma.json) | 위 값에 연결된 66개 변수의 이름·ID·alias·mode 값 |
| [icon-button.figma.json](./icon-button.figma.json) | 일반 IconButton 33종의 radius·alpha·border·glyph 크기/선·상태 |
| [icon-button-attach.figma.json](./icon-button-attach.figma.json) | 원형 첨부 IconButton 5종과 의미 미정의 state5 |
| [icon-buttons.variables.figma.json](./icon-buttons.variables.figma.json) | 두 IconButton 묶음에 연결된 33개 변수의 이름·ID·alias·mode 값 |
| [switch.figma.json](./switch.figma.json) | Switch 4종, track·thumb 좌표/크기·border·Raised shadow·checked/state 분리 |
| [text-button.figma.json](./text-button.figma.json) | TextButton 4종, label·보이는16px trailing·숨겨진14px leading·상태색 |
| [switch-text.variables.figma.json](./switch-text.variables.figma.json) | Switch·TextButton에 연결된 26개 변수의 이름·ID·alias·mode 값 |
| [calendar.figma.json](./calendar.figma.json) | 일자 패널 136노드, 레이아웃·색상·shadow·버튼 원본 연결 |
| [calendar-date.figma.json](./calendar-date.figma.json) | 날짜 셀 4종, 내부 좌표·selection·오늘 점·글꼴 |
| [calendar.variables.figma.json](./calendar.variables.figma.json) | 위 캘린더에 연결된 29개 변수의 이름·ID·alias·mode 값 |
| [calendar-composition.json](./calendar-composition.json) | 패널 안 Button2개·IconButton3개를 독립 실측 기록과 비교한 결과 |
| [search.figma.json](./search.figma.json) | Search12종, 높이48/32·radius8/6·상태색·clear/filter·visibility 참조 |
| [search.variables.figma.json](./search.variables.figma.json) | Search에 연결된34개 변수의 이름·ID·alias·mode 값 |
| [pill-chip.figma.json](./pill-chip.figma.json) | 기본 pill5상태·실제 border·selected와 enabled 시각 일치 |
| [filter-chip.figma.json](./filter-chip.figma.json) | 선택형24종·28/32/36px·선택/상태색·숨김 icon/count 참조 |
| [filter-chip-group.figma.json](./filter-chip-group.figma.json) | hug/wrap/scroll3종·nested 원본·우측 gradient/visibility |
| [chips.variables.figma.json](./chips.variables.figma.json) | 세 Chip에 연결된34개 변수·2collection의 alias/mode |
| [filter-chip-composition.json](./filter-chip-composition.json) | group 내부18개 인스턴스와 독립 Filter Chip 실측의 대조 결과 |
| [checkbox.figma.json](./checkbox.figma.json) | type3×size3×state2의18종·Box/Mark 좌표·선·radius·정확한 vectorPaths |
| [checkbox.variables.figma.json](./checkbox.variables.figma.json) | Checkbox에 연결된14개 변수·2collection의 alias/mode |
| [checkbox.assets.json](./checkbox.assets.json) | 제공된Box+Mark 전체SVG12개·native크기·Figma노드·SHA-256 |
| [elevation.figma.json](./elevation.figma.json) | foundation6레벨·EffectStyle4개·ordered shadow·샘플 opacity·용도 원문 |
| [elevation.variables.figma.json](./elevation.variables.figma.json) | 표면에 연결된 외부 primitive변수3개·collection1개. shadow에는 변수 binding 없음 |
| [elevation-component-comparison.json](./elevation-component-comparison.json) | EffectStyle 일치와 기존 Calendar1개·Switch thumb4개의 shadow 대조 |
| [breadcrumb.figma.json](./breadcrumb.figma.json) | slash/arrow 2종·font16/24·400·label 색·root gap0·중첩 원본 |
| [breadcrumb-separator.figma.json](./breadcrumb-separator.figma.json) | slash/en dash/arrow 3종·좌우8·#757575·실제 vector geometry |
| [breadcrumb.variables.figma.json](./breadcrumb.variables.figma.json) | Breadcrumb에 연결된 변수7개·collection4개와 외부 원본/로컬 override 구분 |
| [breadcrumb.assets.json](./breadcrumb.assets.json) | separator padding을 포함한21.5575×24px arrow SVG1개·Figma노드·SHA-256 |
| [breadcrumb-composition.json](./breadcrumb-composition.json) | 두 Breadcrumb 내부 separator8개와 독립 원본의 치수·paint·token·원본 연결 대조 |
| [chat-composer.figma.json](./chat-composer.figma.json) | enabled/focused/typing/agent-selected 4종·58px surface·외부 project frame·실제 instance override |
| [chat-composer.variables.figma.json](./chat-composer.variables.figma.json) | Composer에 연결된 변수27개·collection3개와 alias/mode |
| [chat-composer.assets.json](./chat-composer.assets.json) | 기존 plus/arrow24 자산 재사용과16px 재정의 folder 전용SVG·실제 source/해시 |
| [chat-composer-composition.json](./chat-composer-composition.json) | action8개·Overflow4개·project selector4개·workflow 시각 참조1개 대조 |
| [message-user.figma.json](./message-user.figma.json) | 사용자 chat/agent/schedule 3종·버블 geometry·일반 Chip/Divider·예약 상태·숨김 arrow |
| [message-user.variables.figma.json](./message-user.variables.figma.json) | UserMessage에 연결된 변수18개·collection3개와 실제 mode/alias |
| [message-user.assets.json](./message-user.assets.json) | native20 원본을12px·선0.75px로 재정의한 schedule 전용SVG1개·source/해시 |
| [message-user-composition.json](./message-user-composition.json) | 버블3개·Chip/Divider2개·숨김 arrow3개·본문 binding3개·schedule FRAME/glyph 대조 |
| [progress-alert.figma.json](./progress-alert.figma.json) | 응답 중단 단일 COMPONENT·props 없음·640×46·border/layout·실제 버튼 원본 |
| [progress-alert.variables.figma.json](./progress-alert.variables.figma.json) | ProgressAlert에 연결된 변수16개·collection3개와 실제 mode/alias |
| [progress-alert.assets.json](./progress-alert.assets.json) | 기존 circle-alert20 원본SVG1개 재사용·실제 source/해시 |
| [progress-alert-composition.json](./progress-alert-composition.json) | tertiary28 버튼2개·circle-alert20·root와 버튼의 border/layout 차이 대조 |
| [message-example.figma.json](./message-example.figma.json) | enabled/hovered/pressed 3종·HUG121×44·radius12·icon visible Boolean·실제 glyph 원본 |
| [message-example.variables.figma.json](./message-example.variables.figma.json) | MessageExample에 연결된 변수12개·collection3개와 실제 mode/alias |
| [message-example.assets.json](./message-example.assets.json) | 기존 arrow-right20 원본SVG1개 재사용·실제 source/해시 |
| [message-example-composition.json](./message-example-composition.json) | 예시3종의 geometry·상태색·glyph 원본·visible Boolean 대조 |
| [picker.figma.json](./picker.figma.json) | Item4종·Footer 원본·두 FRAME recipe·실제 원본/visibility/행/선/clip 구조 |
| [picker.variables.figma.json](./picker.variables.figma.json) | Picker에 연결된 변수51개·collection6개와 실제 mode/alias·raw 값 구분 |
| [picker.assets.json](./picker.assets.json) | 제공 원본7개와 기존 exact-source16px glyph5개·재정의 paint·동적 모델 logo sample·표시 범위 |
| [picker-composition.json](./picker-composition.json) | 실제 item/footer/검색/아이콘/유형 Chip 원본과 FRAME 조립·override 대조 |
| [menu.figma.json](./menu.figma.json) | Item8종과 단일 패널·실제 Item11개·숨김 slot/Scrollbar·선/spacing/표면 |
| [menu.variables.figma.json](./menu.variables.figma.json) | Menu에 연결된 변수28개·collection5개와 실제 mode/alias |
| [menu.assets.json](./menu.assets.json) | library source geometry3개와 상태별 paint SVG8개·표시 범위·출처/해시 |
| [menu-composition.json](./menu-composition.json) | 패널 내부 Item11개와 독립 원본·기본 slot Boolean·표면/치수 대조 |
| [flyout.figma.json](./flyout.figma.json) | shell/header/footer/item10종·실제16행 중11표시·원본/override·footer 겹침 |
| [flyout.variables.figma.json](./flyout.variables.figma.json) | 변수25개·collection5개·actual node mode/alias |
| [flyout.assets.json](./flyout.assets.json) | 기존 source3개·제공16px SVG3개·source20/display16/선1.25 구분 |
| [flyout.motion.json](./flyout.motion.json) | 사용자 요청으로 채택한 Menu150ms/ease/both·4방향6px·close/presence·reduced-motion |
| [flyout-composition.json](./flyout-composition.json) | 실제 하위 원본·header/footer override·부분 matrix·자산·모션 채택 대조 |
| [session.figma.json](./session.figma.json) | 6원본19종·실제 panel 조합·404레이어·원본과 override |
| [session.variables.figma.json](./session.variables.figma.json) | 변수43개·collection3개·실제 node mode와 alias |
| [session.assets.json](./session.assets.json) | 제공 SVG17개·glyph/진행 원형/읽지않음 dot·표시 크기/선/해시 |
| [session-composition.json](./session-composition.json) | 실제6계약 조합·부모 재정의·상태·자산의 정적 대조 |
| [output-viewer.figma.json](./output-viewer.figma.json) | 단일COMPONENT·19레이어·6속성·native SLOT·모서리/각 변의 선·actual icon source |
| [output-viewer.variables.figma.json](./output-viewer.variables.figma.json) | 변수15개·collection3개·전체 alias/node modes |
| [output-viewer.assets.json](./output-viewer.assets.json) | 제공 dot3/maximize16/x16 SVG3개·actual source·native 치수·해시 |
| [output-viewer-composition.json](./output-viewer-composition.json) | header/SLOT geometry·혼합 corner/edge·Boolean bindings·exact IconButton/자산 대조 |
| [card.figma.json](./card.figma.json) | 파일/데이터/썸네일/예약/항목5종·25샘플·477레이어·source/props·회전/이미지 필터 |
| [card.variables.figma.json](./card.variables.figma.json) | 변수46개·collection4개·실제 mode/alias |
| [card.assets.json](./card.assets.json) | 22자산 기록·원본 PNG/회전 포함 pin·전체 파일 타일 재사용·placeholder 예외 |
| [card-composition.json](./card-composition.json) | 상태표·geometry·border 포함/미포함·실제 재사용·자산/필터 대조 |
| [scrollbar.figma.json](./scrollbar.figma.json) | 세로 원본·2레이어·실제 geometry/paint·속성/반응·mode |
| [scrollbar.variables.figma.json](./scrollbar.variables.figma.json) | color/scroll/default와 radius/full의 변수4개·alias closure |
| [scrollbar-comparison.json](./scrollbar-comparison.json) | 공용 대비 색상·gutter·같은 두께/radius·실행 검증 경계 |
| [divider.figma.json](./divider.figma.json) | 보드 안 실제 Divider2레이어·공용과 같은 가로 Light 시각·추가 계약 없음 |
| [divider.variables.figma.json](./divider.variables.figma.json) | color/border/default→gray/300 #DDD의 변수2개·Light alias |
| [dialog-footer.figma.json](./dialog-footer.figma.json) | footer17레이어·실제Button40 재사용·cancel Boolean·공용 대비 차이·숨김 자산 근거 |
| [dialog-footer.variables.figma.json](./dialog-footer.variables.figma.json) | 변수13개·collection3개·색상/radius8/숨김 icon20 mode의 alias |
| [snb.figma.json](./snb.figma.json) | 원본6개·329레이어·보드 recipe·실제 source/props/override·gradient/mode |
| [snb.variables.figma.json](./snb.variables.figma.json) | 변수52개·collection3개·실제 Light/아이콘 size mode와 alias |
| [snb.assets.json](./snb.assets.json) | 원본 SVG31개·glyph slot54개·실제 표시42개·gradient6개·출처/크기/paint/해시 |
| [global-header.figma.json](./global-header.figma.json) | 23레이어·숨김3영역·혼합 Poppins·실제 FRAME·모드/반응/변환 |
| [global-header.variables.figma.json](./global-header.variables.figma.json) | 변수21개·collection4개·색상/radius 별칭과 숨김 원본의 별도 모드 |
| [Global Header 자산](../assets/global-header/manifest.json) | 원본 SVG3개·FRAME 출처·native/표시 크기·paint·SHA |
| [chat-header.figma.json](./chat-header.figma.json) | 19레이어·실제 Breadcrumb/IconButton·4개 표시 Boolean·gradient/blur/모드 |
| [chat-header.variables.figma.json](./chat-header.variables.figma.json) | 직접6개→변수10개·collection3개·아이콘16 모드와 전체 별칭 |
| [chat-header.assets.json](./chat-header.assets.json) | pause/file/more16의 정확한 기존 자산3개·실제 swap source·원본/재사용 hash 구분 |
| [dialog.figma.json](./dialog.figma.json) | 두 FRAME recipe·732레이어·131실제 instance·legacy close/scrollbar·표면/폭/카드/gradient 대조 |
| [dialog.variables.figma.json](./dialog.variables.figma.json) | 직접49→변수80개·collection6개·숨김 분기와 전체 alias closure |
| [dialog.assets.json](./dialog.assets.json) | 실제 glyph·동적 모델/도구 이미지 재사용·legacy source와 gradient raster 예외 |
| [chat-progress.figma.json](./chat-progress.figma.json) | Header15·ThinkingStatus4 노드·source2노드·실측 gradient·표시값·작성된 motion 의도 |
| [chat-progress.variables.figma.json](./chat-progress.variables.figma.json) | 직접6→변수10개·모드 연결5개 collection·전체 alias |
| [chat-progress.assets.json](./chat-progress.assets.json) | 기존 BrandMark32와 file/more16 자산3개·새 자산0 |
| [chat-progress.motion.proposal.json](./chat-progress.motion.proposal.json) | 실측과 분리한1800ms/linear/LTR/loop·clamp/reduce·경과표시 구현 제안 |

먼저 컴포넌트의 styles 문서를 읽고, 필요한 `variant`나 `nodeId`만 조회하세요.
같은 색이어도 token이 다른 경우가 있어 hex와 token 이름을 함께 기록했습니다.
`border.width: 1`이어도 `border.paints: []`이면 그려지는 선은 없습니다.
원본 width·label·keycap 개수는 예시 값이므로 실제 제품의 고정 상수나 명령으로 쓰지 않습니다.

일반 컴포넌트 색상은 Semantic collection의 **Light mode**에서 확인했습니다.
Elevation 표면 변수는 외부 Primitive collection의 **Mode 1**이며 밝은 샘플 표면만 관찰했습니다.
icon collection의 native/16/20/24는
아이콘 크기 mode이며 다크 모드가 아닙니다. JSON의 propertyDefinitions는 Figma 속성 정의이지 앱 props가 아닙니다.
특히 Button의 type은 HTML button type과 구분합니다.
IconButton의 pressed는 누르는 순간이며 별도 active와 자동으로 합치지 않습니다.
첨부 버튼의 state5는 파란 시각 표현만 확인됐고 선택·열림 등 의미는 제품 mapping 전까지 미정입니다.
Switch의 checked와 enabled/disabled는 독립 값입니다. ellipse thumb의 radius 속성0은 사각형을 뜻하지 않습니다.
자식의 position은 부모 내부 좌표이며 Figma component set의 배치를 제품 화면 좌표로 사용하지 않습니다.
TextButton의 `visible: false` leading instance는 실제 배치·지원 slot에 포함하지 않습니다.
Calendar·Search·세 Chip·Checkbox·Breadcrumb·ChatComposer·UserMessage·ProgressAlert·MessageExample 실측 파일은 노드마다 `styleRef`를 두며 같은 파일의 `styles[styleRef]`에서 스타일을 읽습니다.
단일 구성은 `root`, 유형별 구성은 `variants`에 있습니다. 자식 position은 부모 기준이며 root canvas 좌표는 제외했습니다.
Picker의4개 원본·recipe와 Menu의2개 원본은 `roots[].tree`에서 읽고 모든 노드의 `styleRef`는 같은 파일의 `styles`에서 찾습니다.
재사용 인스턴스의 `instance.source`는 Figma 원본 연결이며 실제 앱 source 경로가 아닙니다.
조합 결과의 match는 기록된 기본/enabled Figma 구성 비교이며 실제 앱·전체 상태 검증을 뜻하지 않습니다.
Search의 `bindings`는 수치·paint의 변수 연결을 포함합니다. `componentPropertyReferences.visible`은 표시 Boolean 참조이며,
자식 `visible: true`도 부모가 숨겨져 있으면 실제 노출이 아닙니다. filtered=true의 typing/disabled 조합은 제공되지 않았습니다.
Pill Chip의 `disalbed`는 원본 오타, `Show icon`은 실제 자식/참조가 없는 속성입니다.
Filter Chip 설명의 focused·md 기본과 실제 정의(focused 없음·sm 기본)를 구분합니다. count/아이콘은 기본 숨김이며
count-label만 visible=true여도 실제 노출이 아닙니다. group의 scroll은 clipping만 있고 실제 overflowDirection은 NONE입니다.
우측 fade의 gradient는 paint 데이터로 기록했으며 별도 이미지 자산이 아닙니다.
Checkbox의 state는 enabled/disabled enum이며 type의 선택 값과 독립입니다. Mark geometry는 stroke 전 path bounds여서
mixed height0에도 선이 보입니다. SVG12개는 Box+Mark 전체이고 unchecked6종은 포함하지 않습니다.
enabled/disabled 흰 마크는 각각 on-primary/on-disabled의 별도 semantic token입니다.
Elevation은 `levels`와 `effectStyles`에 기록하며 component registry id가 없습니다. effectStyleId는 Figma style 연결이지
제품 CSS token 이름이 아닙니다. `cssShadow`는 원본 순서의 파생 CSS이고, Mid 샘플 opacity0.9를 effect alpha에 합치지 않았습니다.
Breadcrumb에는 slash/arrow만 있고 en dash는 독립 separator에만 있습니다. 모든 label이 같은 색이어도
현재 페이지는 링크로 바꾸지 않습니다. arrow SVG는 좌우8px을 포함한 전체 separator이므로 padding을 다시 더하지 않습니다.
생성 코드의 arrow/slash 불일치는 실제 instance·vector·원본 자산을 기준으로 구분합니다.
ChatComposer는 공용에 별도 계약이 없는 신규 조합입니다. plus는 attach default 원본, send는 hovered 원본의 arrow swap과
상태별 override를 기록했으며 실제 pointer hover나 전역 state5로 해석하지 않습니다.
project는 Chip instance가 아닌 FRAME이고 원본20px folder를16px로 재정의했습니다. selected 안의 일반 Chip도
AgentTypeChip 원본이 아니며 공용 Chip의 purple override입니다. surface 밖 project가 y90까지 확장되므로 clipping과 배치 범위를 구분합니다.
UserMessage는 사용자 입력 표시만 포함합니다. agent의 일반 Chip/purple override는 업무유형 Chip 원본이 아니며
“에이전트” 라벨만으로 workflow 유형을 결정하지 않습니다. schedule의 안쪽 버블은 chat과 시각이 같아도 INSTANCE가 아닌 FRAME입니다.
12px clock은 native20 원본의 실제 재정의이며 숨겨진 arrow3개는 기능·클릭 대상·지원 자산으로 취급하지 않습니다.
원본의 한 줄44px/clipping을 긴 메시지 삭제 정책으로 사용하지 않고 제품에서 줄바꿈·높이 정책을 검증합니다.
ProgressAlert는 응답 중단 안내 단일 샘플이며 `properties: {}`입니다. 이름에서 진행률·spinner·취소·닫기·toast를 추정하지 않습니다.
root는 border를 layout에 포함하고 내부 tertiary28 버튼은 포함하지 않습니다. 버튼의 inside 1px 선 때문에 콘텐츠 크기를2px 늘리지 않습니다.
재시도·프롬프트 편집은 실제 요청과 draft owner에 연결하며 Notification 대체나 `role="alert"`를 자동 적용하지 않습니다.
MessageExample에는 Button·UserMessage·Card 원본 instance가 없습니다. Button 의존은 native action 의미를 참고하는 계약이며
AgentHubButton의 색·font600·radius를 상속하거나 Figma 원본 재사용을 주장하지 않습니다.
pressed는 순간 상태입니다. 선택 결과가 draft 채우기·즉시 전송·route 이동 중 무엇인지는 제품의 `onActivate`에 명시합니다.
icon Boolean은 실제 visible에 연결되지만 icon=false의 별도 렌더는 없습니다. glyph를 숨기면 빈 slot과 gap도 남기지 않습니다.
root TEXT 속성이 없으므로 제안 label API를 실제 Figma binding이나 기존 제품 props로 취급하지 않습니다.
Picker Item은36px/radius6이고 workflow/runtime FRAME 행은 radius8입니다. 검색 화면의32px menu 행도 별도 원본이므로
모두 같은 PickerItem으로 정규화하지 않습니다. 모델 logo·이름은 동적 데이터 slot이며 Qwen 이미지는 제공된 샘플입니다.
검색의 filter 표시 Boolean=true와 filtered=false는 서로 다른 값입니다. 실제 색이 지워진 source-hovered 행을 보이는 hover로 취급하지 않습니다.
Footer의 찾기 subtree 부재는 visible=false 노드나 root Boolean의 증거가 아닙니다. 패널의 clip/Scrollbar 그림과
`overflowDirection: NONE`은 실제 스크롤 구현이 아니며39px footer 공간과 끝 항목·focus 가시성을 제품에서 확보합니다.
일반 목록의 option/button에 모델·필터·더보기 버튼을 중첩하지 않고 제품의 composite panel 의미와 키보드 소유권을 먼저 정합니다.
Menu는 Picker의32px navigation 행·radius24 패널과 별개입니다. Item body28px의 L16/R12, 패널 radius12,
숨김 header의 line16+pt8+pb4=28px와 divider의 선1+py4=9px를 공용 추출 baseline과 구분합니다.
header·body·divider를 모두 켠65px는 파생 계산이며 실제 all-on 렌더가 아닙니다. header 글자12/16·600·#1C1C1C와 divider #DDDDDD는 disabled에서도 유지됩니다.
icon/value/check/chevron/header/divider와 패널 Scrollbar는 기본 false입니다. 숨겨진 원본의 치수나 파일이 있다는 이유로 노출하지 않습니다.
default의 label/edit/check는 #1C1C1C, destructive는 이3개만 #D00A0A이며 value/chevron은 두 유형 모두 #757575입니다.
disabled의 본문5종은 #AAAAAA입니다. 전체 opacity를 낮춰 header·divider까지 바꾸지 않습니다.
패널은 default/enabled Item11개를 조합한318px 샘플이며 공용296px 최대 높이를 그대로 적용한 것으로 간주하지 않습니다.
`overflowDirection: NONE`·clip·Scrollbar 그림은 실제 스크롤 구현 증거가 아니며 제품에서 viewport·키보드·focus 가시성을 검증합니다.
패널 shadow는 기존 Mid와 효과 값이 같지만 effectStyleId는 다릅니다. 동일한 수치와 원본 identity를 구분합니다.

공용 대비 차이와 미확인 범위는 [유형 Chip](../components/AgentHubAgentTypeChip/README.md),
[Button](../components/AgentHubButton/README.md), [일반 IconButton](../components/AgentHubIconButton/README.md),
[첨부 IconButton](../components/AgentHubAttachIconButton/README.md), [Switch](../components/AgentHubSwitch/README.md),
[TextButton](../components/AgentHubTextButton/README.md), [Calendar](../components/AgentHubCalendar/README.md),
[날짜 셀](../components/AgentHubCalendarDate/README.md), [Search](../components/AgentHubSearch/README.md),
[Pill Chip](../components/AgentHubPillChip/README.md), [Filter Chip](../components/AgentHubFilterChip/README.md),
[Filter Chip Group](../components/AgentHubFilterChipGroup/README.md), [Checkbox](../components/AgentHubCheckbox/README.md),
[Breadcrumb](../components/AgentHubBreadcrumb/README.md), [구분자](../components/AgentHubBreadcrumbSeparator/README.md),
[ChatComposer](../components/AgentHubChatComposer/README.md), [UserMessage](../components/AgentHubUserMessage/README.md),
[ProgressAlert](../components/AgentHubProgressAlert/README.md), [MessageExample](../components/AgentHubMessageExample/README.md),
[Picker Item](../components/AgentHubPickerItem/README.md), [Footer](../components/AgentHubPickerFooter/README.md),
[Picker 패널](../components/AgentHubPicker/README.md), [Menu Item](../components/AgentHubMenuItem/README.md),
[Menu 패널](../components/AgentHubMenu/README.md)에 있습니다.
Foundation의 차이와 token 연결 기준은 [Elevation](../foundations/Elevation.md)을 확인합니다.
실제 source/export는 제품에서 확인한 뒤 매핑합니다.


Flyout의 내부는 새 계약이며 Menu에서 채택한 것은 열림/닫힘 모션입니다.
Figma의 정적인 측정과 사용자 요청에 따른 모션 채택은 별도 기록입니다. `roots[].tree`/`styles`를 대조하고
shell의 propertyDefinitions null은 read-only getter 제한으로 미수집됐다는 뜻이며 빈 정의를 뜻하지 않습니다.
footer=true는 생성 context와 실제 visible binding으로 확인한 범위입니다. 실제16행 중5행은 숨김이며
10종 부분 matrix를 kind4×state4 전체 지원으로 확대하지 않습니다. footer의 단독29px와 실제33px override,
목록과11px 겹침 및 overflowDirection=NONE을 실행 scroll 검증과 구분합니다.
파일 glyph는 native20 source를16px로 재정의했지만 실제 선은1.25px입니다.16/20의 .8을 선으로 바꾸지 않습니다.
Flyout의 [모션](../components/AgentHubFlyout/motion.md)과 [구현 연결](../components/AgentHubFlyout/implementation.md)을 함께 읽습니다.


Session은 공용에 없는 전용 Panel/Item/ProgressStep/ContextItem/SectionHeader/HistoryItem6계약입니다.
Panel320px·r16·empty154/filled934는 세로 HUG 샘플이며19종을 완전 교차 상태·dark·실제 실행으로 확대하지 않습니다.
Panel의 propertyDefinitions null은 getter 미수집이고, 나머지5set의 전체 정의와 실제 props/visible bindings는 보존합니다.
Header의 collapsed glyph는 생성 코드의 plus24 이름과 달리 실제 chevron-right16 source입니다.
history toggle은24px source를16px frame으로 재정의했지만 glyph16은 그대로입니다. Divider source도 실제17×4와 내부1×4선을 구분합니다.
같은#EBF3FF라도 HistoryItem selected의 standalone element/primary-subtle과 actual action/default-selected는 다른 token입니다.
현재 실행 선택·unread·각 섹션 접기·기록 접기·진행 status·출력/컨텍스트 action을 별도 owner로 연결합니다.
[Session 구현](../components/AgentHubSessionPanel/implementation.md)과 하위 문서를 함께 읽습니다. Menu·Tree·Checkbox·Stepper·메시지의 동작/모션을 자동 상속하지 않습니다.


OutputViewer는 단일 COMPONENT의 all-visible Light 샘플이며 별도 variant set이 아니다.
title/type TEXT와 show type/expand/close Boolean, native content SLOT의6속성을 구분한다.
root는 radius0·무fill/무stroke·Mid이며 header top16/content bottom16이 외곽 모양을 만든다.
Header34px는20px 글자+pt8+pb4+상하선2의 결과다. absolute24px actions로 header를38px로 늘리지 않는다.
content는 실제 SLOT이고 top 선0·나머지선1·FILL·빈 children이다. slot을 FRAME이나 PDF/Markdown 구현으로 바꾸어 기록하지 않는다.
show type은 점과형식을 함께 숨기며 show expand/close는 노출값이지 실제 expanded/open 값이 아니다.
생성된 plus24 이름 대신 maximize16/x16 원본을 사용하고 제품의 실제 닫기·확대·조회·renderer·scroll은
[구현 안내](../components/AgentHubOutputViewer/implementation.md)에서 따로 연결·검증한다.


Card는5종의 서로 다른 구성이다. [유형 선택](../cards.md)에서 공용과 비교한 뒤 필요한 계약을 읽는다.
실제 공용 Card 인스턴스 재사용은 없고 DataCard의 PillSmall Chip과 FileItem의 파일 타일/tertiary28/Divider,
ItemCard의 ghost20 more 등 실제 하위 source만 재사용으로 기록한다. Schedule toggle/pin/chat FRAME을 같은 IconButton 원본으로 취급하지 않는다.
FileItem의 button Boolean은 정의되지만 visible 연결은 확인되지 않았다. meta의 gap−4는 CSS gap 음수로 옮기지 않는다.
Thumbnail의 내부322×241.5와 원본 IMAGE paint 부재, selected 선1px, Item accent의 투명1px 공간과 disabled 개별 paint를 보존한다.
pin의 비identity transform6개와 read-only whole16px export를 함께 보며 부분 SVG를16으로 강제하거나 회전을 중복하지 않는다.
disabled 도구 PNG 두 개는 원본 imageHash와 다른 동일 placeholder다. 예외 근거를 남기고 정확한 데이터 PNG+원본 saturation−1에 맞춘 제품 adapter를 연결한다.
정적25샘플을 dark/focus/Booleanfalse/실제 명령·다운로드·메뉴·고정 저장의 검증으로 확대하지 않는다.


Scrollbar3155:20473은11×180 영역과4×160 thumb의 정적 샘플이다. 불투명#DDD와 로컬 gutter11px가 공용과 다르다.
두께4/r9999/시작3px는 같고, 샘플의 오른쪽4·아래17px는 runtime endpoint inset이 아니다.
root에는 fill/stroke/effect가 없으며 배경 그림이나 저장된 strokeWeight1을 선으로 추가하지 않는다.
기존Menu/Picker의 Scroll bar2019:3708과 source가 달라 일괄 교체하지 않는다.
hover/dark/가로형/실제scroll·drag·focus는 이 단일 시안에서 확인하지 않았으며 제품 native overflow에 별도로 연결한다.

[Divider 비교](../divider.md)는 요청 보드3074:101330 안의 실제3155:20478을 확인한 기록이다.
1px·#DDD·위아래8px·전체17px는 공용과 같아 새 solution id나 override를 등록하지 않는다.
168px는 샘플 폭이며 gap10은 자식 하나 사이에 실제 간격을 만들지 않는다.
세로/dark/모션이나 기존2019:118·2874:45712 인스턴스의 일괄 교체 근거로 확대하지 않는다.


Dialog footer는 공용의 사방24px 패딩·8px 간격·우측 정렬을 유지하고 기존 AgentHubButton의 tertiary40/primary40을 조합한다.
공용 footer의 medium32/radius4/font14/20은 이 계약에서만40/radius8/font16/24로 연결한다.
580×88은 샘플이며 버튼40과 상하24px로 높이88px가 계산된다. cancel81/confirm89는 라벨과 좌우16px 패딩의 HUG 결과다.
네 plus20은 모두 부모 visible=false이고, keycap Boolean=true여도 실제40px subtree가 없다. 기본 화면에 아이콘·단축키를 추가하지 않는다.
footer 자체의 무fill/stroke/effect와 취소 버튼만의 inside1px 선을 구분하고 기존 footer host의24px 패딩을 중복하지 않는다.
cancel=true/enabled 화면을 닫힘·submit·pending·dark·전체 Dialog의 시각/동작 검증으로 확대하지 않는다.


SNB는 [시작 안내](../snb.md)에서7계약을 확인합니다. 일반 MenuItem·CMP SNB와 다른 원본이며 전시 보드는 제품 shell이 아닙니다.
329개 원본 레이어·18개 variant·rail/panel2조합을 기록하고 glyph4×state4의 전체 조합으로 확대하지 않습니다.
selected rail은#CCE0FF이고 목록 pressed/selected는 같은#F4라도 다른 alias를 유지합니다.
고정 행2611:62907의 hovered source·selected fill·#F8 gradient·숨김 more를 독립 override로 읽습니다.
패널 content255와 row256·list가 아래44px 잘리는 상태·footer fade303×53은 원본 근거이며 실제 viewport를 별도로 연결합니다.
하단 fade 변환은 정규 좌표 t=.46696034*y+.53303963으로 표시 bounds에서 white alpha.53304→1입니다.
생성 코드의 양수 from114.15%를 그대로 복사하지 않고 원본 transform과 등가 adapter의 구분을 확인합니다.
실제 source/export·라우팅·펼침·명령·검색·load/error/empty·모바일·dark·키보드 실행은 미검증입니다.


Global Header는 [시작 안내](../global-header.md)와7문서를 함께 읽습니다. 43px 단일 Light 원본이며 root props는 비어 있습니다.
root의 bottomWeight1은 stroke paint가 없어 선을 그리지 않습니다. 숨김 Divider/Breadcrumb/Chip도 기본 화면에 렌더하지 않습니다.
로고138px 박스와 실제181.91015625px 글자 끝을 구분하고 shortcut SVG 원본16.002px와 표시 slot16px를 구분합니다.
보이는 바로가기·알림은 FRAME이므로 기존 AgentHubButton/IconButton의 source 재사용이나 전체 상태 확인을 주장하지 않습니다.
원본 반응23개는 모두 비어 있으며 실제 href·알림 패널·계정·검색·responsive·focus 동작은 제품에서 연결하고 검증합니다.


Chat Header는 [시작 안내](../chat-header.md)에서 기본7문서와 별도 [motion](../components/AgentHubChatHeader/motion.md)을 읽습니다.
실제 Breadcrumb2427:25431과 ghost/default24 IconButton2427:25108을 재사용하며 layer name plus/24 대신 실제 pause/file/more16 source를 따릅니다.
root48px에는 실제 bottom1 선이 포함되어24px 자식의 y는11.5px입니다. indicator325×1은 y47에서 선 위에 겹치며 추가 행이나 진행률이 아닙니다.
BACKGROUND_BLUR 원본radius11.5와 생성 context의 CSSblur5.75를 구분하고 불투명 white를 유지합니다. 실제 CSS 등가는 아직 미검증입니다.
네 Boolean은 visible binding이고 기본 COMPONENT는 단일 all-true Light입니다. 추가 [생각 중 예시](../chat-progress.md)의 pause=false와 motion 의도는 별도 연결하며, 그 밖의 조합·명령·메뉴·focus·반응형은 제품에서 검증합니다.


Dialog는 [시작 안내](../dialog.md)에서 공용 modal 의미와 두 FRAME recipe의 차이를 확인합니다.
radius16/blue-gray/24·32 제목은 새 shell 계약이고 Overlay 그림자는 공용과 같습니다.
편집은580×554/실제 선 없음/버튼40 footer, 탐색은1296×800/EEE1/rail192/3열 ItemCard이며 root variant API는 없습니다.
Legacy close32/r4/glyph24·편집 scrollbar2019:3708은 기존 AH 기본형으로 일괄 교체하지 않습니다.
Search1064와 목록1056, 카드344×166와 description maxHeight40, 실제 gradient fade를 각각 보존합니다.
기존 CMP DialogContent가 header/body/footer를 내부 조립하는 API와 p24 host를 확인해 중복 wrapper·padding을 피합니다.
원본 overflow NONE와 정적 thumb는 동작 구현이 아니므로 native viewport·focus·폼 저장·검색·카드 명령을 제품에서 연결하고 검증합니다.


[생각 중 진행 표시](../chat-progress.md)는 원본의 정적 paint·작성된 흐름 의도와 구현 제안값을 나눠 읽습니다.
Header timing/easing/direction/loop는 motion 데이터에서 측정되지 않았습니다. 기본 static을 유지하고 thinking을 명시적으로 선택합니다.
ThinkingStatus는 새 FRAME 조합이며 기존 BrandMark의 정적 PNG를32px로 사용합니다.4초·경과 갱신 주기는 실제 timer 증거가 아닙니다.
