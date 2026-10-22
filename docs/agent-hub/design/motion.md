# Agent Hub 상태·모션·스크롤 채택 계약

이 문서는 2026-10-21 사용자 승인에 따라 테스트 앱과 신규 구현에서 적용할 계약입니다.
과거 `references/*.figma.json`의 실측값을 덮어쓰지 않습니다. 공용 사용은 `inheritCommon:true`와
실제 `frontend-common` 역할 선택이 일치할 때만 활성화합니다. 공용을 끄면 솔루션 자체 엔진으로 이 계약의
접근성·상태를 연결하며 공용 문서나 스킬 설치를 요구하지 않습니다.

## 근거를 구분합니다

| 분류 | 적용 방식 |
| --- | --- |
| Figma 실측 | 각 컴포넌트의 references JSON, 원본 SVG, 크기·색·배치. 정적 상태만으로 타이밍을 추정하지 않습니다. |
| 공용 계승 | 색·선·그림자·밑줄 200ms ease, popup 150ms ease, 본문 높이 250ms ease, glyph 회전 200ms ease, Dialog 200ms ease opacity/scale .96↔1. |
| 이번 채택 변경 | Select 방향키/Home/End 단일 탐색 강화·AgentHubMenu 표현 조합, Textarea toolbar를 포함한 연속 외곽선, Secondary pressed 아이콘 currentColor, Filter Chip 1px 공간 예약, Search focus 단일 소유·Composer 입력 추가 focus 테두리 생략, Session/SNB title-toggle gap2, SNB glyph 단일 mask 색상 전환·더보기 투명20px 예약·hover 스크롤, Flyout 고정 Header 구분선·선택적 폴더 disclosure·내부 scroll viewport. |
| 신규 제안 | Checkbox Mark 160/120ms, ThinkingStatus shimmer1800ms, ProgressStep halo1600ms. Figma 실측이 아닙니다. |

공용 Accordion의 250ms와 회전200ms를 계승하되 측정 높이·Presence helper는 이번 구현 adapter입니다.
기존 Dialog modal 엔진의 focus trap·Escape·trigger 복귀를 유지하고 시각 효과 종료까지 닫힘을 지연합니다.

## 상태 전환과 신규 모션

| 효과 | 값 | 근거와 경계 |
| --- | --- | --- |
| background / border / shadow / text / underline | 200ms ease | 공용 계승. `transition:all`로 크기나 layout을 흔들지 않습니다. disabled 기능 차단은 즉시입니다. |
| PickerItem / MenuItem / FlyoutItem 행 배경 | background-color 200ms ease | 위 색상 전환의 적용 대상입니다. 실제 배경을 그리는 행 wrapper/content에 직접 지정해 hover 진입·이탈을 모두 보간합니다. 자식 버튼이나 부모 popup의 transition만으로 대신하지 않습니다. 기존 상태색·선택 우선순위·행 크기는 유지하고 disabled에서는 hover를 차단합니다. |
| SNB rail glyph | color 200ms ease | 원본 neutral28px SVG의 alpha mask 한 층에 currentColor를 연결합니다. #757575↔#3B82F6를 보간하며 도형 불투명도·geometry·mask URL은 고정합니다. 이전 두 레이어 opacity 교차 채택을 대체합니다. |
| Menu / Flyout / 단일 Select popup | 150ms ease | 공용 계승. 닫힌 동안 inert, 재열기 때 이전 종료를 취소합니다. |
| Accordion 본문 높이 | 250ms ease | 공용 timing 계승. leading gap도 본문 내부에 두어 함께 접습니다. |
| disclosure glyph | 200ms ease, open0°↔closed−90° | down glyph만 회전합니다. hit area/focus ring은 고정합니다. |
| Dialog | 200ms ease, opacity0↔1, scale.96↔1 | 기존 modal을 유지합니다. fixture native는 exit 후 close, Radix는 기존 presence/unmount에 연결합니다. 재열기는 이전 종료를 취소합니다. |
| Checkbox Mark | enter160ms ease-out / exit120ms ease-in, opacity0↔1만 전환 | 신규 제안. scale을 제거해 원본 Mark의 좌표·크기·왼쪽 윤곽을 모든 프레임에서 고정합니다. native input·박스도 고정합니다. |
| ThinkingStatus | 1800ms linear, 폭28%·중심 간격50%인 두 띠의 주기적 패턴 좌→우 반복 | 이번 사용자 채택 + 구현 제안값. 균일한 #000/opacity.69 글자 위 장식층만 이동하고 고정5-stop 배경은 남기지 않습니다. static/shimmer 모드·부모 경과시간·logo·HUG는 유지합니다. |
| active ProgressStep halo | 1600ms ease-out, scale1→1.08→1.6, opacity0→.6→0 (0/22/100%) | 이번 사용자 채택 + 모션 제안값. 원본20px 이미지·박스에서 파란 중심12px만 clip으로 노출하고 정적 #CCE0FF stroke는 숨깁니다. 하늘색은20px/border4px 파동층에서만 표현하며 label·connector는 고정합니다. reduced/forced-colors/print도 clip은 유지하고 파동층만 제거합니다. 이전 전체 active SVG+추가 halo 채택을 대체하며 원본 자산·측정 JSON은 보존합니다. |
| 외부 메시지 텍스트 reveal | 400ms ease-out, 좌→우 시각 mask | 신규 제안. 예시·AI 주입 및 메시지 append의 새 부분만 표시합니다. 실제 문자열은 즉시 완전 반영하고 직접 타이핑·IME·reduced-motion에서는 mask를 제거합니다. 글자 단위 timer로 값이나 접근성 텍스트를 지연하지 않습니다. |

Picker·Menu·Flyout의 focus는 행 한 곳이 소유합니다. 공용 Menu처럼 키보드 focus에는 배경을 유지한 inset2px ring을 적용하고, hover 중에는 ring을 숨겨 배경 전환만 보입니다. 내부 버튼의 기본 outline을 중복하지 않으며 독립 모델/필터/더보기 버튼은 각자 focus를 유지합니다. active·selected·hover·disabled를 한 상태로 합치지 않습니다.
전역 focus CSS가 나중에 로드돼도 이 소유권을 유지합니다. Select에서 선택 index·포인터 hover를 키보드 active 표시로 사용하지 않으며,
포인터로 연 직후와 hover 이탈에는 ring을 남기지 않습니다. 키보드 open·방향키 탐색에서만 내부 ring과 가상 focus를 연결합니다.

SVG 파일의 `src` 교체는 색상 보간이 아닙니다. source glyph를 보존해야 하면 neutral/selected 자산을
겹친 장식 레이어로 두고 opacity만 전환할 수 있습니다. 상태 레이어는 접근성 이름을 중복하지 않습니다.
SNB는 동일 geometry를 확인한 원본 alpha mask 한 층의 currentColor를 보간하는 현재 채택을 사용합니다.
외부 SVG img의 부모 color만 바꾸거나 두 레이어의 opacity를 동시에 내려 중간 프레임에서 도형을 반투명하게 만들지 않습니다.

`prefers-reduced-motion` 변경을 실제 소비 앱에서 확인합니다. 전역 CSS 존재를 가정하지 않습니다.
없으면 각 컴포넌트/helper가 처리합니다. 감소 모드에서 반복 효과를 끄고 색·상태를 즉시 표시하며
닫힘 완료를 즉시 실행합니다. forced-colors·읽기/print 모드의 반복 효과도 정적으로 표시합니다.
정적 장식 대안이 상태 텍스트·현재 선택·aria 의미를 제거하지 않습니다. ThinkingStatus는 고정 gradient 대신 균일한 글자를 사용합니다.

BrandMark는 사용자 요청으로 애니메이션을 제외하고 [정적 원본 PNG](./components/AgentHubBrandMark/implementation.md)만 표시합니다.
원본·복원 비교 자산의 출처와 hash는 보존하지만 복원 SVG를 실행 모션 자산으로 연결하지 않습니다.
ThinkingStatus의32px 마크도 정적이며 글자 shimmer와 분리합니다.

ThinkingStatus의 [현재 채택](./components/AgentHubThinkingStatus/styles.md)은 이전의 고정5-stop 배경과 단일 흰 띠 recipe를 대체합니다.
문구 폭의50% 타일을 repeat-x로 반복하고 투명0/22%→흰색50%→투명78/100% gradient를 사용합니다.
띠 폭28%·중심 간격50%·맑은 간격22%이며 position0%→100%는 한 타일0.5W를 이동하므로 루프가 매끄럽게 이어집니다.
양끝에 잘린 조각이 이어질 수 있습니다. static/reduced에는 #000/opacity.69, 읽기/print에는 #1C1C1C/opacity1,
forced-colors에는 CanvasText/opacity1을 사용하고 장식층과 반복을 함께 제거합니다. 위 수치·방향은 Figma 실측으로 기록하지 않습니다.

## Focus와 조합 소유권

Search는 입력 surface 한 곳만 입력 focus를 표시합니다. Composer는 후속 사용자 요청에 따라 내부 textarea와
바깥 pill 모두 입력의 추가 focus 테두리·ring을 생략합니다. 이전 외곽2px ring 채택을 대체하며 기본1px 선·두 shadow·caret는 유지합니다.
내부 input/textarea의 중복 outline/box-shadow는 **scoped selector로만** 제거합니다. clear/filter/attach/send/project는 독립 focus-visible을 유지합니다.
전체 앱 input outline을 끄거나 `outline:none`만 적용하지 않습니다. Search32/48, clear 후 input 복귀,
IME Enter 보호, read-only 복사와 disabled 차단을 확인합니다. Composer 한정 예외를 공용 Input/Textarea·Search로 확대하지 않습니다.

예약 Dialog의 AgentHubTextarea는 toolbar를 포함한140px/r8 표면의 장식층 한 곳에 기본1px·입력 focus2px 경계를 표시합니다.
불투명한 toolbar 뒤에 부모 inset shadow가 가려져 좌우·하단 선이 끊기지 않아야 합니다.
내부 textarea 사각형 ring은 제거하고 toolbar 버튼의 독립 focus·위 #EEE1px divider·본문103/toolbar37은 유지합니다.
AgentHubSelect는 공용 단일 선택 엔진에 기존 AgentHubMenu/MenuItem의 패널·행 표현을 조합합니다.
명령 menu로 의미를 바꾸지 않고 listbox/option·현재 값·keyboard를 유지하며 popup150ms fade/slide6px,
행 배경200ms와 제품 채택16px check를 연결합니다. 짧은 빈도 목록은 overflow가 없으면 viewport 오른쪽11px gutter를 제거하고, 실제 overflow가 생겼을 때만 thumb와 gutter를 연결합니다. 빈도 popup·selected palette의 Figma 실측으로 기록하지 않습니다.

전용 계약이 없다는 이유로 임시 input/select/textarea/scroll을 상위 컴포넌트에 작성하지 않습니다.
공용을 사용한다면 registry 이름·별칭·의미와 직접 의존성을 찾아 실제 export를 확인하고,
없으면 공용 계약으로 재사용 가능한 control부터 구현합니다. 얇은 solution adapter가 크기·색만 합성합니다.

## Scroll owner는 하나입니다

공용 ScrollArea의 실제 native viewport 한 곳이 wheel·touch·keyboard를 소유합니다. 가짜 thumb만 움직이지 않습니다.
Agent Hub skin은 thumb4px / gutter11px / inset3px / radius9999 / 불투명 #DDD이며 min-thumb24px은 runtime 사용성 값입니다.
thumb 위치·길이는 실제 scrollTop/Height/clientHeight 비율로 측정하고 ResizeObserver와 scroll 이벤트를 정리합니다.
가로축도 같은 엔진에서 계산하며 native scrollbar와 별도 thumb를 중복 노출하지 않습니다.

- 추천 Picker: chat/model·strip·추천 제목·Footer39 고정, 추천 목록만 scroll. body gap12, 제목↔목록4, 행간0.
- 검색 Picker: Search와 Footer 고정, 결과만 scroll. 추천형과 다른 row32/36 구성을 보존합니다.
- Flyout: Header 내용54 p8 뒤 고정 seam9(4+선1#DDD+4)를 Header가 소유합니다. standalone withDivider:false는54, shell true는63으로 y5..68, body y68..365/297, Footer y365..398/33을 유지합니다. content에 divider를 중복하지 않고 body만 scroll합니다. standalone Footer29는 별도입니다. 폴더는 optional parent disclosure로 본문250ms·glyph200ms를 계승하며 평면 목록에는 owner가 필요 없습니다.
- Session: optional height/maxHeight가 있을 때만 내부 viewport를 제한하고 HUG 기본 배치를 유지합니다. 제한 모드에서 shell py12+content py4로 기존 총여백을 보존하며 track 시작·끝을 외곽16px 안쪽의 직선 구간에 맞춥니다. 내부 viewport 높이는 shell의 padding24+border2를 제외하고 기존 엔진 inset3px·thumb 측정/drag 수식은 유지합니다.
- OutputViewer: 기존 body viewport를 교체하며 header34는 고정, 넓은 산출물은 both축을 지원합니다.
- SNB: top action·Divider는 고정하고 목록만 AgentHubScrollbar/공용 엔진으로 이동합니다. native thin scrollbar를 추가하지 않습니다.
  visibility hover로 패널 hover·viewport focus-within·drag에서200ms opacity로 노출하고 coarse pointer에서는 상시 표시합니다.
  gutter11px 공간을 항상 예약하며 reduce에서는 즉시 반영합니다. 기존 다른 소비자의 기본 always는 유지합니다.
- Agent Finder Dialog: 바깥 body는 비스크롤 layout, header·rail은 고정입니다. 오른쪽 Search와 결과 콘텐츠만 함께 AgentHubScrollbar의 실제 viewport에서 이동합니다.
  안쪽 content의 native overflow를 남기고 바깥 Dialog만 skin으로 감싸지 않습니다. 마지막 카드까지 같은 엔진으로 접근하며 thumb4/gutter11/inset3/r9999/#DDD를 연결합니다.

ScrollArea handle은 scrollTo/ensureVisible, 실제 metrics callback과 viewport/content class/style 연결만 노출합니다.
선택적 visibility always|hover는 위 SNB 노출을 위한 채택 API입니다. baseline의 scroll/auto를 포함한 전체 공용 API 완료를 의미하지 않습니다.
부모가 선택·query·expanded·경과시간·요청을 계속 소유합니다. focus된 마지막 행이 footer 아래 숨지 않게 노출합니다.

## 외부 문자열 주입과 메시지 append

[공통 reveal recipe](./components/AgentHubChatComposer/external-text-motion.md)를 Composer와 메시지 본문에 조합합니다. 부모가 외부 주입 revision과 완전한 원문을 소유하고, 단어·글자 단위 timer로 실제 value를 늘리지 않습니다. 이미 읽은 prefix는 다시 가리지 않으며 직접 입력·IME·빠른 교체·unmount·동작 줄이기 변경은 이전 완료 처리를 취소합니다. 이400ms 시각 효과를 처리 진행률이나 API 완료 신호로 사용하지 않습니다.

## 생명주기와 완료 검사

Presence/disclosure/popup은 빠른 재토글·닫는 중 재열기·unmount·reduce 변경 때 이전 timer/rAF/observer의 완료를 취소합니다.
닫는 본문은 즉시 inert/aria-hidden으로 Tab 진입을 막고, 내부에 focus가 있으면 trigger로 옮깁니다.
높이 종료 후 제거하고 열린 상태는 auto/overflow-visible로 focus outline과 halo를 자르지 않습니다.

중간 프레임과 최종 상태를 함께 검사합니다. 정적 스크린샷만으로 motion 완료를 주장하지 않습니다.
Filter Chip 동일 slot/label의 폭과 이웃좌표, Secondary 크기별 pressed icon, checkbox 빠른 전환,
Picker/Flyout/Session/Viewer의 wheel·keyboard·drag·resize·끝행/focus 가시성을 확인합니다.
TeamAI CLI 재수신·문서/자산 byte 일치·공용 활성/비활성 및 실제 source/export 연결 뒤 fixture mapping을 기록합니다.
이 가이드와 fixture 검증은 실제 Agent Hub 제품 배포 또는 전체 공용 API 구현 완료의 증거가 아닙니다.
