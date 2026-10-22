# Agent Hub Dialog 독립 검증

검증일: 2026-10-21. 요청 원본은 Figma FRAME `3192:27853`과 `3163:22376`이다.
공용 Dialog 문서, 읽기 전용 CMP의 실제 `Dialog.tsx`·`Dialog.css.ts`, 수집 raw와 최종 문서·registry·자산을 비교했다.
독립 검토자는 이 감사만 작성했으며 Figma·공용·제품·Git을 변경하지 않았다.

## 판정과 검증 범위

문서 확장 관점에서 추가 차단 사항은 없다. 두 시안을 공용 Dialog의 새 size variant나 이미 구현된 공개 export로
기록하지 않고, 공용 modal 의미를 유지하는 Agent Hub 전용 조합으로 분리했다.
[시작 안내](../docs/agent-hub/design/dialog.md)와 [9문서](../docs/agent-hub/design/components/AgentHubDialog/README.md)는
실측·제품 API 제안·runtime 검증 범위를 구분한다. 실제 source/export는 `unmapped`/null, 공유 채택 설정은 `draft`다.

raw 732개 노드와 [정규화 기록](../docs/agent-hub/design/references/dialog.figma.json)의 732개 노드를 대조했다.
width/height/min/max, sizing, layout, clipping/overflow, strokesIncludedInLayout, 자식 좌표, 모서리별 radius,
font·line-height·maxHeight·truncation·문구, visibility, node별 variable mode와 실제 instance source 131개가 일치하며 불일치는 0이다.
Finder 15개 카드는 숨김 자식을 포함한 29개 노드 template과 개별 실측 delta로 재구성했고 하위 instance source도 각각 확인했다.
219개 style과 전체 node mode·reaction·transform을 보존한다. 모든 reaction은 비어 있으므로 실제 동작이나 motion의 증거가 아니다.
[변수 기록](../docs/agent-hub/design/references/dialog.variables.figma.json)의 직접 49개 변수는 80개·6개 collection으로 닫히며 미해결 alias는 없다.

## 공용 대비 시각 차이

- 두 root는 radius16·Light `#F6F7F9`·제목24/32·600이며 공용 radius8·white·제목20/24와 다르다.
  예약 편집의 `color/surface/blue-gray`와 Finder의 `color/bg/blue-gray` alias는 같은 hex여도 합치지 않았다.
  Overlay 두 그림자는 공용과 일치한다. 원본 밖 scrim을 생략하거나 새 효과를 더하지 않는다.
- 예약 편집은 580×554 = header72 + body394 + footer88이며 root/header의 실제 strokes는 비어 있다.
  저장된 strokeWeight/binding만으로 보이지 않는 선을 만들지 않는다.
- Finder는 1296×800 = header68 + body732이다. root의 #EEE1과 header bottom #DDD1은 layout에 포함되지 않아
  x0·전체 폭을 유지한다. 내부 폭을 줄이는 보통 CSS border와 구분한다.
- 두 header는 실제 `2324:30419`를 사용한다. 선택 Boolean false는 BACK만 숨기고 CLOSE는 유지한다.
  CLOSE는 legacy `2611:59907`의32/r4 host와 x24 `2199:23685`이며 기존 AHIconButton32/r6/glyph20과 다르다.

예약 폼의 이름64, 지침164, 빈도74, 고급20과 y0/88/276/374, 내부 폭532와 gap24를 확인했다.
지침 area140/r8, toolbar37과 top1 layout 포함, ghost28의12/16·600 및 실제 glyph16이 기록돼 있다.
빈도 card50은 padding24 + row24 + 선2이며 내부 시작13을 보존한다.
footer는 실제 FRAME이며 기존 AgentHubDialogFooter instance라고 기록하지 않았다.
취소는 tertiary40 enabled source3025:25006·폭60, 저장은 primary40 disabled source3074:97439·폭88이다.
disabled를 dirty·validation·pending으로 추정하지 않으며 숨김 count/info/resize/시간 행/body fade를 렌더하지 않는다.
편집 scrollbar는 legacy2019:3708·thumb r8, Finder는3155:20473·r9999로 구분한다.

Finder의 rail192와 content1104, 직접 FRAME 행168×32/r6를 SNB나 Menu source로 바꾸지 않았다.
Search는 실제1064 FIXED·오른쪽16이고 결과 행1056·오른쪽24와 다르다.
3열·5행 카드15개는 실제3095:20 default·344×166이며 설명310×40/maxHeight40/HEIGHT/ENDING/maxLines null이다.
기존 ItemCard의 styles·implementation에도 누락됐던 maxHeight40을 보완하고 overflow:hidden만으로 말줄임이 완성되지 않음을 명시했다.
fade는1137×48/x−19/y684의 GRADIENT_LINEAR이며 #F6F7F9 alpha0→1,69.230771%에서 opaque다.
PNG export와 원본 IMAGE paint를 혼동하지 않고,914px 결과의 clipping을 실제 scroll 구현으로 취급하지 않는다.

## 실제 API·접근성과 구현 연결

CMP의 실제 Dialog는 Radix Root alias와 내부 조립 Content다. 공용 예제의 Header/Body/Footer export나
closeOnEscape/closeOnOutsideClick을 실제 API로 복사하지 않는다. 기존 footer p24·Body padding·경계선/fade의 owner를
확인하고 중복 padding·header·닫기·viewport·modal 엔진을 만들지 않는 adapter 경계를 명시했다.
size/profile selector를 전역 수정하지 않고 Finder1296을 공용 xlarge920에 덮어쓰지 않는다.

독립 리뷰에서 CSS 두 곳을 발견해 통합 담당자가 수정했다. Content의 position:relative를 제거하고 기존 primitive의
fixed·top/left·translate·z-index·전환 transform 보존을 명시했으며, close에 border-box를 추가해 padding4를 포함한32px를 유지한다.
최종 문서에서 반영을 재확인했다.

modal 이름·focus trap·복귀·scroll lock·dismiss 정책, native label/required/disabled·IME, submit 한 경로,
카드 주 동작과 보조 동작의 비중첩, 마지막 내용까지 scroll 접근·zoom·reduced motion 검증을 요구한다.
Search focused나 저장 disabled의 정적 외형을 실제 autofocus·업무 상태로 해석하지 않는다.
200ms/ease fade+scale.96은 채택할 공용 동작이며 Figma 측정값이 아니다. 원본에 없는 전역 reduced-motion reset도 있다고 주장하지 않는다.

## 자산과 선택 범위

[자산 기록](../docs/agent-hub/design/references/dialog.assets.json)의21개 파일을 직접 읽어 byte 수·SHA256·SVG native width/height/viewBox·PNG 치수를 확인했고 불일치는 없다.
runtime20개와 gradient reference-only PNG1개를 구분한다. 최종 중복 대조에서 rotate-cw-clock16도 기존 원본으로 연결했다. 기존19개 파일을 재사용하고 필요한 up16 SVG1개와 참조 PNG1개만 추가했다.
전체 pin16·실제 delay20·서로 다른 chat paint·dynamic Qwen/도구 ImagePaint와 숨김 조상 판정이 기록돼 있다.
외부 임시 URL이나 전체 Dialog·카드·라벨 이미지를 실행 UI로 사용하지 않는다.

AgentHubDialog의 dependency는 Dialog·Textarea·Divider·AgentHubDialogFooter·AgentHubButton·AgentHubSearch·AgentHubItemCard·AgentHubScrollbar다.
공용을 켠 Agent Hub catalog는55개 확장과 공용51개를 합성한다. first-use 검사는 필요한 closure를 missing으로 남기며 구현 완료를 주장하지 않는다.
CMP/PaaS에는 Agent Hub ID를 추가하지 않고, 공용 off에는 extendsCommon catalog를 제외한다.
시작 안내·상위 navigation·extension·rules와 first-use의 단독 선택/다른 조합 비포함/CMP·PaaS/off 격리 검사를 대조했다.
공용 문서는 적용 조건이 있는 `DOCS_ROOT/frontend/...` 경로로 안내하며 개인 홈 설치·자동 제품 변경을 요구하지 않는다.
검토 당시 읽기 전용 serengeti-cmp 작업 트리는 clean이었다.

## 통합 확인 결과

최종 중복 제거와 문서 보완 뒤 통합 담당자가 다음을 실행했다.

- `npm run verify`: PASS. 로컬 링크3821개, 공용51 + 솔루션59개 계약·의존 그래프, 스킬7개, 역할/솔루션9조합, 스키마3개, namespace 격리.
- `npm test`: 54/54 PASS. Dialog 자산의 실제 source·paint·native bounds·숨김 분기·전체 pin·gradient/legacy adapter 검사를 포함한다.
- 격리된 실제 TeamAI CLI: 공용 on에서 Codex·Claude 각각 공용 스킬7개와 문서/자산1355파일이 snapshot과 byte 단위 일치.
  frontend 문서와 공용 hook이 존재한다. off에서는 공용 스킬0개·frontend 문서/hook 없음, 독립 namespace809파일이 byte 단위 일치한다.
  두 모드 모두 기존 로컬 제품 스킬을 보존했다. 결과는 임시 fixture `aifrica-agent-hub-dialog-delivery-d2emln_z/results.json`에 기록했다.
- `git diff --check`: PASS. `serengeti-cmp` HEAD는 `43648689aa3efef214118a69dde5eafdac30a338`, 작업 트리는 clean이다.
  제품 저장소·Figma canvas·개인 홈 스킬 설치·원격 게시 변경은 없다.

이 감사의 판정은 문서·계약·정적 자산 검증이다. 실제 소비 제품의 CSS 렌더·픽셀 일치·예약/검색 API·focus·scroll·동작·dark·반응형이
완성됐다는 뜻은 아니며 실제 source/public export mapping은 그 저장소 검증 후 기록한다.
