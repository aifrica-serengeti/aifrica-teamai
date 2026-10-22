# Agent Hub frontend 확장 계약

공용 frontend를 확장하는 아래 절차는 inheritCommon을 켜고 frontend-common 묶음을 선택한 경우에 적용한다.
공용을 끈 제품은 공용 문서·registry·스킬을 요구하지 않고 현재 제품의 자체 지침을 사용한다.
선택·해제 방법은 DOCS_ROOT/common/frontend-bundle.md를 따른다.

이 문서는 frontend·UI 작업의 확장·채택 계약이다. backend 작업에 적용하지 않는다.
[공통 해석 계약](../common/resolution.md)을 따르고 frontend 작업일 때
`DOCS_ROOT/frontend/contracts/frontend-extension.schema.json`을 읽는다.
[frontend.json](./frontend.json)은 Agent Hub에서 확인한 공유 patch를 저장하며 현재 `draft`다.

[디자인 확장](./design/README.md)에 Figma에서 확인한 아이콘·파일 타일·메인 마크와 원본 자산,
유형/Pill/Filter Chip·Filter Chip Group·Button·일반/첨부 IconButton·Switch·TextButton·Calendar·Search·Checkbox·Breadcrumb·ChatComposer·UserMessage·ProgressAlert·MessageExample·Picker·Menu·Flyout·Session·OutputViewer·Card5종·Scrollbar·DialogFooter·SNB·GlobalHeader·ChatHeader·Dialog·ThinkingStatus의 실측 기록을 둔다.
공용을 켠 UI 작업에서는 [추가 registry](./design/component-registry.json)를 공용 registry와 함께 탐색한다.
`AgentHubIcon`, `AgentHubFileIcon`, `AgentHubBrandMark`, `AgentHubAgentTypeChip`, `AgentHubButton`,
`AgentHubIconButton`, `AgentHubAttachIconButton`, `AgentHubSwitch`, `AgentHubTextButton`,
`AgentHubCalendar`, `AgentHubCalendarDate`, `AgentHubSearch`, `AgentHubPillChip`, `AgentHubFilterChip`, `AgentHubFilterChipGroup`, `AgentHubCheckbox`,
`AgentHubBreadcrumb`, `AgentHubBreadcrumbSeparator`, `AgentHubChatComposer`, `AgentHubUserMessage`, `AgentHubProgressAlert`, `AgentHubMessageExample`,
`AgentHubPickerItem`, `AgentHubPickerFooter`, `AgentHubPicker`, `AgentHubMenuItem`, `AgentHubMenu`,
`AgentHubFlyoutHeader`, `AgentHubFlyoutFooter`, `AgentHubFlyoutItem`, `AgentHubFlyout`,
`AgentHubSessionPanel`, `AgentHubSessionItem`, `AgentHubSessionProgressStep`, `AgentHubSessionContextItem`,
`AgentHubSessionSectionHeader`, `AgentHubSessionHistoryItem`, `AgentHubOutputViewer`,
`AgentHubFileItem`, `AgentHubDataCard`, `AgentHubThumbnailCard`, `AgentHubScheduleCard`, `AgentHubItemCard`, `AgentHubScrollbar`, `AgentHubDialogFooter`,
`AgentHubNavIcon`, `AgentHubNavItem`, `AgentHubNavRail`, `AgentHubSNBSectionHeader`, `AgentHubSNBItem`, `AgentHubSNBPanel`, `AgentHubSNB`, `AgentHubGlobalHeader`, `AgentHubChatHeader`, `AgentHubDialog`, `AgentHubThinkingStatus`는
별도 계약 id이며 기존 제품 구현에 연결할 수 있다. 공용의 의미·접근성·상태 소유권 계약은 유지한다.
전체 테마·다크 모드·실제 코드 경로·업무 정책은 아직 미확인이다. 제품 이름만으로 추정하지 않는다.
Calendar는 공용의 상태 소유권을 유지하며 radius12·shadow·날짜4유형과 Agent Hub 버튼 조합을 연결한다.
월 헤더는 독립 tiny TextButton과 구분하고 조작 주체를 하나로 둔다. 이번 일자 view를 DatePicker 입력이나
월/연도·범위의 새 시각 규격으로 확대하지 않는다.
Search는 공용 Search·Input을 확장해48/32px·radius8/6·clear20과 필터 표시를 연결한다.
filter 표시 Boolean과 filtered 강조·입력 focus를 구분하며 실제 검색 실행·debounce·필터 API는 제품에서 확인한다.
새 Chip3종은 기존 업무 유형4종과 별개다. Pill의 selected 시각은 enabled와 같고 원본 disalbed 오타는 실제 disabled에 명시 매핑한다.
Filter Chip의 선택 의미는 별도 계약으로 정의하고 공용 정보 표시 Chip의 API를 바꾸지 않는다.
Group은 gap8·세 배치를 조합하며 실제 scroll·focus와 선택 값·조회는 제품/페이지에서 연결한다.
Checkbox는12/16/20px·radius3/4/5·1px 마크와 enabled 선택 박스의 실제 border 없음을 연결한다.
Figma는 시각 박스만 제공하므로 label·hit area·mixed 집계·form·Tab/Space·focus와 disabled/read-only 차단은 공용을 유지한다.
Breadcrumb은 font16/24·400, 모든 label #1C1C1C, root gap0과 구분자 좌우8px을 연결한다.
현재 페이지는 같은 글자색이어도 비대화형으로 유지하며 링크 의미·hover underline·focus·축약 계약을 보존한다.
Breadcrumb의 slash/arrow 2종과 독립 separator의 slash/en dash/arrow 3종을 구분한다.
arrow 전체SVG에는 separator padding이 포함돼 있으므로 중복 여백이나 일반 Icon/TextButton을 추가하지 않는다.
Hub의 hover/focus/disabled 시각 값과 실제 라우팅·축약 메뉴는 정적 Figma 확인 범위 밖이다.
ChatComposer는 독립 공용 Composer 원본이 없는 신규 조합이다. 공용 Textarea의 native 의미·Chip·Divider와
Agent Hub 첨부 원형 버튼·아이콘을 조합하되 Textarea의84px·radius4·border를 입력 surface에 중복 강제하지 않는다.
768×58 surface의 radius/full·1px #DDDDDD·Overflow shadow와 placeholder #757575·value #1C1C1C를 연결한다.
프로젝트 FRAME은 y62부터28px 높이로 surface 밖에 있으므로 샘플의 전체90px footprint를 확보하고 실제 프로젝트 상태는 제품에서 소유한다.
전송의 hovered 원본과 arrow swap·typing/selected의 blue/white override는 실제 hover나 전역 state5 의미를 정하지 않는다.
기존 제품 Composer를 먼저 비교하고 없으면 [구현 연결 안내](./design/components/AgentHubChatComposer/implementation.md)에 따라
솔루션 구현과 public export를 개발한다. 실제 코드·동작을 검증하기 전에는 `unmapped`와 공유 patch의 `draft`를 유지한다.
UserMessage는 사용자 chat·agent·schedule 3종을 표시하며 assistant 응답이나 대화 전체를 정의하지 않는다.
버블은 px16/py10·radius12·#F4F4F4·font16/24·#1C1C1C이며 border·shadow가 없다.
agent의 일반 Chip/purple override와 Divider를 연결하되 업무유형 Chip 원본이나 workflow 분류로 해석하지 않는다.
schedule은 투명 outer 컨테이너의 우측 정렬·gap8과 상태16px+버블44px의 샘플 높이68px을 구분한다. 안쪽 버블은 FRAME이다.
native20 clock의 실제12px·선0.75px 전용 자산을 사용하고 숨김 arrow를 메시지 action으로 추가하지 않는다.
긴 메시지를 샘플44px clipping으로 버리지 않는다. 실제 줄바꿈·높이·표시 의미는 제품에서 검증하며,
호환 구현이 없으면 [구현 연결 안내](./design/components/AgentHubUserMessage/implementation.md)에 따라 솔루션 구현을 개발한다.
문서의 props·renderer 예시는 실제 제품 구현의 증거가 아니며 복사·편집·feedback·assistant·전송/stream 상태는 미제공이다.
ProgressAlert는 응답 중단 안내 단일 샘플이다. 640×46·radius8·#F4F4F4·1px #DDDDDD·px12/py8·gap12를 연결한다.
내부의 “다시시도”·“프롬프트 편집”은 기존 AgentHubButton tertiary28 enabled 원본2개이며 숨김 아이콘·keycap을 노출하지 않는다.
root는 border를 layout에 포함하지만 버튼의 inside 1px은 layout에 포함하지 않으므로 버튼 콘텐츠를2px 늘리지 않는다.
circle-alert20은 기존 Agent Hub 자산을 재사용한다. 재시도 요청의 context·중복 실행과 편집 draft는 제품이 소유한다.
진행률·spinner·취소·닫기·자동 숨김이나 공용 Notification 대체·`role="alert"`를 자동 추가하지 않는다.
호환 구현이 없으면 [구현 연결 안내](./design/components/AgentHubProgressAlert/implementation.md)에 따라 솔루션 구현을 개발하고
실제 코드·상호작용을 검증한 뒤 source/export를 매핑한다. 현재 공유 patch의 `draft`는 유지한다.
MessageExample은 예시 선택 action이며 UserMessage 표시와 분리한다. HUG121×44 샘플·radius12·px20/py12·gap4와
font14/20·400·#1C1C1C, 배경 #EBF3FF/#CCE0FF/#99C2FF를 enabled/hovered/pressed에 연결한다.
Button 의존은 native action 의미를 참고하는 계약이다. 실제 Button 원본 instance가 없으며 AgentHubButton의 시각 값을 상속하지 않는다.
활성화는 제품의 `onActivate`가 소유한다. pressed를 selected·전송 완료나 `aria-pressed`로 바꾸지 않고 action host 하나를 사용한다.
icon Boolean에 맞춰 기존 arrow-right20을 조건부 표시하며 icon=false에서는 glyph와 gap을 제거하고 별도 렌더 검증을 한다.
호환 구현이 없으면 [구현 연결 안내](./design/components/AgentHubMessageExample/implementation.md)에 따라 개발한다.
미제공 disabled/focus/loading/dark와 긴 라벨은 제품에서 검증하고 실제 source/export 확인 전에는 `unmapped`를 유지한다.
Picker는 Item4종·Footer 원본과 두 FRAME recipe를 연결한다. 공용 Select/Menu로 자동 대체하지 않는다.
Item36px/radius6과 유형 Chip을 가진 FRAME의 radius8, 검색 화면의32px menu 행을 구분한다.
모델 logo·이름은 동적 데이터이며 제공 Qwen logo sample을 모든 모델이나 Agent Hub 브랜드에 고정하지 않는다.
검색 filter 표시 true와 filtered=false를 구분하고 footer의 링크 subtree 부재를 root Boolean으로 기록하지 않는다.
부모 clipping·Scrollbar 그림을 실제 scroll 구현으로 취급하지 않고39px footer 공간과 끝 행·focus 가시성을 확보한다.
검색·모델·필터·선택·더보기·찾기 명령은 제품이 소유하며 중첩 button/option 없이 composite panel 의미를 명시적으로 채택한다.
기존 구현이 없으면 [Picker 구현 연결](./design/components/AgentHubPicker/implementation.md)에 따라 개발하고 실제 동작 후 source/export를 매핑한다.
Menu는 공용의 의미·키보드·focus·상태 계약을 유지하며 패널 radius12와 body28px의 L16/R12를 연결한다.
label14/20·400, hover #F8F8F8·pressed #F4F4F4는 유지하고 destructive는 #D00A0A로 구분한다.
숨김 header는28px·font12/16·600·#1C1C1C, divider는 선1+py4로9px이며 기본 false인 slot을 자동 표시하지 않는다.
destructive의 label/edit/check만 붉은색이고 value/chevron은 #757575다. disabled 본문5종은 #AAAAAA이며 header·divider까지 전체 opacity로 바꾸지 않는다.
흰색·1px #DDD·shadow 효과 값은 기존 Mid와 일치하지만 effectStyleId는 다르다.11행318px는 샘플이며 max-height·실제 scroll 정책은 제품에서 채택한다.
패널의 Scrollbar=false와 실제 overflow NONE을 구분하고 Picker의32px 행·radius24와 섞지 않는다.
호환 구현이 없으면 [Menu 구현 연결](./design/components/AgentHubMenu/implementation.md)에 따라 개발하고 실제 source/export를 검증한다.
[Elevation foundation](./design/foundations/Elevation.md)은6레벨을 별도로 확장한다. 일반 공용의 검정 단일 shadow와
Agent Hub의 navy 이중 shadow를 구분하고, 이미 일치하는 컴포넌트 전용 값은 유지한다.
샘플 geometry·Mid opacity0.9·용도 표를 모든 제품 컴포넌트의 구현값으로 강제하지 않는다.

## 공통으로 유지할 기준

- 컴포넌트의 의미·native semantics·공개 API와 상태별 피드백을 유지한다.
- keyboard 조작, 이름과 label 연결, focus 표시·이동·복원, reduced motion, 색 외 상태 표현을 유지한다.
- List의 query/filter/pagination/selection은 page가 소유한다. loading·empty·error·refresh를 구분한다.
- Create의 draft·validation·submit과 서버 오류·재시도·중복 제출 방지·이탈 보호는 page가 소유한다.
- Detail의 원본·편집 draft를 분리하고 저장·취소·권한·not-found·파괴적 동작과 unsaved changes를 다룬다.
- 하위 table/field/dialog에 API·라우팅·상위 page 상태를 숨기지 않는다.

공통 기준의 숫자·중립색·font 예시는 추출 baseline이다. 회사가 모든 솔루션에 채택한 값으로 해석하지 않는다.
Agent Hub의 primary, header/navigation, page 폭·여백·page size는 실제 구현과 요구를 확인해 선택한다.
Frontend 작업일 때 `DOCS_ROOT/frontend/design/contract-levels.md`와
`DOCS_ROOT/frontend/design/patterns/README.md`에서 계약 경계와 List·Create·Detail 패턴을 읽는다.

## 실제 제품에 연결하는 순서

1. TeamAI의 현재 프로젝트 또는 로컬 `.aifrica/frontend.json`의 `solution`이 `agent-hub`인지 확인한다.
   선택이 다르거나 여러 솔루션이 선택돼 있으면 다른 설정을 조용히 합치지 않는다.
2. 제품의 package/config, token 선언, architecture 문서, component registry, 실제 source·public export를 읽는다.
3. `paths.architecture`, `paths.componentRegistry`, `paths.designTokens`에 **존재를 확인한 제품 상대경로**를 넣는다.
   미확인 경로는 현재처럼 `null`로 둔다.
4. 공통과 Agent Hub 추가 registry id에 맞춰 `components`를 매핑한다. source와 export를 확인했을 때만
   `status: implemented`로 기록한다. 빈 map 또는 `unmapped`는 제품에 구현이 없다는 뜻이 아니다.
5. `tokens`의 brand/color/typography/border/spacing/radius/elevation/motion에 확인한 의미 token을 넣는다.
   palette 이름과 brand primary를 구분하고 light/dark 및 hover/focus/error/disabled 상태를 함께 검증한다.
6. `pagePatterns.list/create/detail`에 확인한 maxWidth, pageSize·options, layout, sections,
   navigationPolicy를 추가한다. 공통 page 상태·접근성 계약을 그대로 적용한다.
7. 제품 검사 명령과 해당 UI 상태를 검증한 뒤 채택 범위에 맞춰 `status: active`로 바꾼다.

전체 Agent Hub에 공통인 변경만 이 namespace에 기록한다. 특정 고객·배포·개별 저장소에서만 필요한 값은
명시 선택 profile 또는 제품의 `.aifrica/frontend.json`이 소유한다. 검증하지 않은 업무 데이터,
필드·메뉴·route·테마 값과 `serengeti-cmp`의 source 경로를 편의상 기본값으로 넣지 않는다.

## Override를 추가하는 방법

공유 patch와 제품 로컬 patch는 같은 schema를 사용한다. 제품에서 로컬 채택 파일을 만들 때는 최소한
다음 식별자를 사용하고, 실제로 확인한 key만 추가한다.

```json
{
  "schemaVersion": 1,
  "solution": "agent-hub",
  "status": "draft"
}
```

- 객체는 key별 재귀 병합한다. 누락된 key는 상위 계약을 상속하며 허용된 경로의 `null`은 미매핑이다.
- 배열은 전체 교체한다. `documentOverrides`, `exceptions`, pageSizeOptions·sections의 일부만
  추가하려는 경우에도 최종 목록 전체를 작성한다.
- 문서로 정책을 보충하려면 제품 소유의 Markdown 파일을 먼저 작성한 뒤 그 **제품 상대경로**를
  `documentOverrides`에 추가한다. 어떤 공통 항목을 어떤 근거로 변경하는지 제목·적용 범위·검증을 적는다.
- 의미·행동 계약에 차이가 필요하면 `exceptions`에 `contract`, `reason`, `scope`를 기록한다.
  `owner`, `reviewAfter`를 추가해 후속 검토를 추적할 수 있다. 테마 차이만으로 접근성 기준을 제거하지 않는다.
- 오타 key와 소비 저장소 밖의 경로는 허용하지 않는다. schema 통과는 실제 구현과 동작이 맞다는 증거가 아니다.

합성 순서는 **공통 의미 계약 → Agent Hub 확장 → 명시 선택 profile → 제품 로컬 채택 설정**이다.
이는 Aifrica 문서·검증 도구가 정의한 계약이며 TeamAI가 JSON이나 CSS를 자동 적용하는 기능이 아니다.
공통 스킬과 같은 이름의 스킬을 프로젝트 namespace에 복제해 덮어쓰지 않는다.

## Profile 선택

고객·배포별 차이가 생기면 검증한 차이만 `profiles/<profile-id>/`에 추가한다. 현재 등록된 Agent Hub profile은 없다.

새 profile은 `profiles/<profile-id>/README.md`에 대상·근거·공통 대비 차이·확인 범위를 기록하고,
검증한 `frontend.json`을 함께 제공한다. 제품의 `.aifrica/frontend.json`에
`profile`을 명시했을 때만 적용한다. 폴더 존재, 솔루션 선택 또는 유사한 화면만으로 profile을 추정하지 않는다.

## 검증과 배포

공용 저장소에서 의존성을 설치한 후 `npm run verify`와
`npm run resolve -- --solution agent-hub`로 구조와 공유 patch의 합성 결과를 확인한다.
실제 로컬 채택은 `npm run resolve -- --local /absolute/path/to/product/.aifrica/frontend.json`으로
확인하며 선언한 제품 경로·문서·source의 존재를 검사한다. 제품 자체의 lint/typecheck/test/build 및
필요한 화면 상태·keyboard 검증은 해당 제품에서 실행한다.

TeamAI 배포는 `docs/agent-hub/`를 `.teamai/docs/agent-hub/`에 보존한다. 이 문서의
`../common`, `../frontend` 상대 참조도 같은 namespace 관계를 사용한다.
프로젝트 규칙을 받는 backend 작업에 frontend 테마·컴포넌트·페이지 패턴을 강제로 적용하지 않는다.

Flyout은 Header·Footer·Item10종과 새 shell을 조합한다. font12/16·행28·item/folder/child 들여쓰기와
pressed 검정10%·selected #EBF3FF를 Menu 시각으로 바꾸지 않는다. 실제16행 중11개 표시와5개 숨김을 구분한다.
Footer는 원본29px와 실제pb8/white/absolute33px를 구분하고 실제 viewport로 끝 행·focus 노출을 보장한다.
사용자 요청으로 Menu의150ms/ease/both·4방향6px fade/slide만 채택하며 역할·첫 focus·폭·large 행·max296는 상속하지 않는다.
reduced-motion의 animation:none은 새 접근성 fallback이며 기존 Menu/전역에 이미 구현됐다고 주장하지 않는다.
실제 source/export·명령·확장/선택·모션/Presence 실행 검증은 소비 제품에서 기록한다.


Session은320px/r16/blue-gray/Mid 패널과5개 하위 원본의 신규 전용 계약이다.
empty154/filled934px는 HUG 샘플이며 실제 가용 높이의 scroll/focus를 별도로 검증한다.
현재 실행 selected·unread dot·각 섹션 접기·기록 접기·진행 상태·출력/컨텍스트 action의 owner를 분리한다.
Header ghost24 원본/기록 toggle actual16·glyph16과 Divider actual17×4를 구분하고,
hover 검정5%/pressed10%·selected#EBF3FF의 실제 alias와17개 정확한 SVG를 보존한다.
active 원형을 Spinner·단계 이동으로 바꾸거나 Menu/Tree/Checkbox·CardAccordion의 역할과 모션을 자동 채택하지 않는다.


OutputViewer는 title/type·표시 Boolean3개·native content SLOT을 가진 신규 전용 패널이다.
root 무fill/무stroke·Mid와 Header top16/content bottom16의 모서리, header34·content943의540×977 샘플을 보존한다.
Header 모든변1px #DDD와 content top0/LRbottom1px을 구분하고 실제 ghost24 안 maximize16/x16 자산을 사용한다.
show expand/close는 control 노출이고 실제 열림/확대 상태가 아니다. 제품 owner가 조회·대상ID·renderer·확대/닫기·focus 복귀·scroll을 연결한다.
빈 SLOT을 loading/error UI나 구현된 MD/PDF/HTML/편집·다운로드·Fullscreen API로 간주하지 않는다.


Card는FileItem512×68/r12·DataCard120square/r12·Thumbnail/Schedule/ItemCard324px/r24의5종을 각각 채택한다.
공용 Card의r8·2px 선택 표현·자식 opacity.4·slots전체를 일괄 이식하지 않고 상태 소유권/접근성을 유지한다.
FileItem의 border 미포함 layout·meta−4·선택적 size·미바인딩 button Boolean, Data의 실제 공용 PillSmall20 Chip을 구분한다.
Thumbnail의4:3은 실제 내부322px와241.5px이며 기본/selected/disabled Overflow·hover/pressed Mid를 보존한다.
Schedule의 업무 status active/paused는 선택/비활성과 분리하고14px 상태 glyph·16px control glyph·FRAME24를 연결한다.
Item more는 실제 ghost20, pin/chat은FRAME24이며 accent는 투명1px 선 공간을 유지한다. pin은hover/pressed에만 실제 존재한다.
원본 dot/선/로고필터·whole pin export를 사용하고 잘못된 disabled32px placeholder를 실제 데이터 로고로 배포하지 않는다.
제품이 다운로드/메뉴/선택/고정/대화/예약 명령과 keyboard·focus·false조합·동적 이미지를 연결한 뒤 실제 source/export를 매핑한다.


Scrollbar 작업은 `agent-hub/design/components/AgentHubScrollbar/`의7문서와 실측 기록을 읽는다.
공용 두께4px·radius9999·시작3px를 유지하고 이 원본의 불투명#DDD·11px 로컬 gutter를 연결한다.
root의 실제fill/stroke/effect는 없고 thumb는absolute다. padding1이나 저장된strokeWeight1을 추가 선/위치로 해석하지 않는다.
180px 영역·160px 길이·오른쪽4/아래17px 잔여는 샘플이며 viewport 축소나 고정 thumb·끝점공식으로 만들지 않는다.
공용 native overflow·동적 비율/clamp·형제 overlay·중첩영역 독립성을 유지하고 hover/dark/가로형 시각은 별도 채택·검증한다.
기존Menu/Picker의 다른 Scroll bar source2019:3708을 이3155:20473으로 일괄 교체하지 않는다.
실제 제품의 wheel/touch/keyboard·drag·resize·focus/접근성을 검증한 뒤 source/export를 로컬에 매핑한다.
공용off에서는 이extendsCommon catalog와 공용 지침을 강제하지 않는다.

Divider3155:20478은 요청 보드3074:101330의 하위 원본이며 가로 Light의1px/#DDD/위아래8px/전체17px가 공용과 같다.
공용을 켠 UI 작업에서는 `agent-hub/design/divider.md`의 비교 기록을 확인한 뒤 기존 `Divider`를 재사용한다.
새 AgentHubDivider·같은 이름의 스킬·색상 override를 추가하지 않으며168px 샘플 폭이나 자식 하나의 gap10을 고정하지 않는다.
세로형/dark/모션은 미확인이고 기존 Menu/Picker 등의 다른 Divider 원본과 크기를 일괄 교체하지 않는다.
공용을 끈 제품에는 이 재사용 안내나 공용 문서 존재를 강제하지 않는다.


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
두 정적 Light 시안은 새 Dialog variant API나 완전한 상태·responsive·동작 검증이 아니다. 실제 source/export 확인 전 unmapped/draft를 유지한다.
공용 off에는 이 extendsCommon catalog와 공용 절차를 자동 적용하지 않는다.


생각 중 화면은 공용을 켠 frontend 작업에서 `agent-hub/design/chat-progress.md`를 읽는다.
`AgentHubThinkingStatus`는 BrandMark32+gap8+정적5stop 텍스트의 새 FRAME 조합이며 ProgressAlert 중단 안내와 구분한다.
Header1800ms/linear/좌→우/infinite/지연0, 협소 폭 이동 규칙과 외부 elapsed1000ms 갱신은 Figma 실측이 아닌 제안값이다.
default static과 show=false 우선을 유지하고 thinking track만clip한다. request key/phase/elapsed는 같은 제품 owner가 공급하고 종료·교체 때 observer를 정리한다.
로고와 상태 텍스트는 정적이며 초마다 live announce하지 않는다. 기존 PNG를 재사용하고 source/export 미검증은unmapped/draft, 공용off에는이catalog를강제하지않는다.
