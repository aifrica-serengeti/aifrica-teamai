# Agent Hub OutputViewer 확장 독립 검증

검증일: 2026-10-21. Figma `3015:24221`의 수집된 원본과 정규화 자료를 읽기 전용으로 대조했다.
제품 구현과 Figma를 수정하지 않았으며 실제 소비 제품의 source/export는 `unmapped`다.

## 실제 제공 범위

[실측](../docs/agent-hub/design/references/output-viewer.figma.json)은 variant set이 아닌 단일 component다.
전체19개 노드·14개 중복 제거 style·4개 instance를 보존한다.
실제 속성6개는 title/type TEXT2개, show type/expand/close Boolean3개(default true), native content SLOT1개다.
type은 표시 문자열이며 파일 형식 enum이나 renderer API가 아니다. SLOT에는 자식이 없는 한 샘플만 제공됐다.

[변수](../docs/agent-hub/design/references/output-viewer.variables.figma.json)는 직접 참조9개에서
alias closure15개·collection3개를 보존하며 누락이나 불필요한 변수가 없다.
모든 노드의 mode·속성 참조·instance source/variant/props도 원본과 일치한다.

## 조립과 수치

| 범위 | 실제 관찰 |
| --- | --- |
| root | 540×977 고정 샘플, radius0, 실제 fills/strokes 없음, 기존 Mid 효과 |
| header | 540×34 HUG, #F6F7F9, padding 좌우16/상8/하4, #DDDDDD 1px INSIDE 모든 edge |
| header corner | 위쪽16/16, 아래쪽0/0 |
| content | native SLOT 540×943 FILL, white, 좌우8/상하16, gap24, clipping true/overflow NONE |
| content corner·edge | 위쪽0/0·아래쪽16/16, top0·left/right/bottom1 |
| title/type | Pretendard SemiBold14/20·600·#1C1C1C |
| type separator | 3px 원·#AAAAAA, show type Boolean으로 type 글자와 함께 표시 |
| actions | absolute52×24·gap4·x483/y5, ghost/default/24 버튼2개 |

root의 저장된 strokeWeight1만 보고 외곽선을 추가하지 않는다. header와 content가 서로 다른 corner와
edge를 소유하므로 root 전체 radius16·border1로 합치거나 content top 선을 더하면 원본과 달라진다.
header 높이34는 border 포함 `1+8+20+4+1`이며 absolute 버튼24가 높이를 늘리지 않는다.
title-area x17/y9·폭506·오른쪽 padding44는 현재 두 버튼을 위한 샘플 배치다.
False Boolean 조합·긴 제목·좁은 화면에서 필요한 공간과 줄임 정책은 별도 제품 검증 대상이다.

두 버튼은 실제 `2427:25108`의 ghost/default/24 원본을 사용하고 내부 glyph는16px·x4/y4다.
generated node 이름 `icon/plus/24`와 달리 실제 원본은 maximize `3015:24201`, x `2311:46284`이며,
각각 VECTOR4개/2개·선1·round cap/join·#1C1C1C를 사용한다.
glyph 이름이나 모양은 fullscreen·모달·브라우저 닫기·파일 이동 동작이 구현됐다는 증거가 아니다.

## 정규화와 자산

원본19개 노드를 재귀 대조했다. 루트 canvas x/y만 제외하고 모든 자식 위치·치수·layout/wrap/constraints·
overflow/clipping·edge별 선·서로 다른 네 corner·cap/join·font·paint/effect·binding alias와 mode가 일치한다.
uniform radius만 저장하던 방식 대신 `visual.cornerRadii`가 혼합 corner를 손실 없이 보존한다.
SLOT type와 `slotContentId: content#3015:5`도 FRAME으로 바꾸지 않고 유지한다.

[자산](../docs/agent-hub/design/references/output-viewer.assets.json)은 제공된 원본 SVG3개다.
separator3px·maximize16px·close16px의 합계1,271 bytes를 SHA-256·native 크기·viewBox·색·선으로 확인했다.
전체 화면 이미지를 UI로 사용하거나 plus24 자산으로 바꾸지 않는다.
separator는 장식으로 표시할 수 있으며 unread badge나 disabled 상태로 해석하지 않는다.

## 검증과 한계

[조합 대조](../docs/agent-hub/design/references/output-viewer-composition.json)는 issues0이며
`runtimeVerified`와 `allStatesVerified`는 false다. `node --test tools/output-viewer-composition.test.mjs`의
세 테스트가 통과했다. 임시 fixture에서 전체 radius16 치환·content top 선 추가·SLOT→FRAME·
show type 참조 유실·plus glyph 오매핑을 검출했다. 선언한 해시까지 바꾼24px viewBox도 검출했고 fixture는 제거했다.

본문 renderer·파일 로딩·확대/복원·닫기·상태 소유권·focus/키보드·false Boolean 조합·협소 화면 및
미제공 loading/error/disabled/dark는 소비 제품에서 채택하고 검증한다. 비어 있는 SLOT 수신이나 정적 조합 match로
Markdown/PDF/이미지/HTML 렌더 또는 해당 동작의 구현 완료를 선언하지 않는다.

통합 담당의 `npm run verify`는 로컬 링크3,253개·공용51개+솔루션42개 계약·스킬7개·역할/솔루션9조합·
schema3개를 통과했고 `npm test`는45/45 통과했다. `git diff --check`도 통과했으며 읽기 전용 원본 작업 트리는 clean이다.

격리한 임시 제품의 실제 TeamAI CLI 전달도 통과했다. 공용 채택 시 문서·자산1,148개 파일이 전달됐고
Codex·Claude는 각각 공용 스킬7개를 받았다. 공용 해제 후 회사·Agent Hub 파일602개를 유지하며,
두 도구의 공용 스킬은 각각0개, frontend 공용 문서·hook도 제외됐다. 기존 제품 전용 스킬은 보존됐다.

추가 읽기 전용 프로토타입 검사에서 확대·닫기를 포함한 ReactionMixin 지원18개 노드의 reactions는 모두 빈 목록이었다.
실제 content SLOT에는 해당 member가 없다. 이 결과는 실측 JSON의 prototypeReactions에 보존했으며,
버튼 그림만으로 브라우저 fullscreen·이동 목적지·닫힘 동작·전환 애니메이션이 구현됐다고 확대하지 않는다.
