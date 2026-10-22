# Agent Hub Scrollbar 확장 독립 검증

검증일: 2026-10-21. Figma `3155:20473`에서 수집한 raw·추가 node metadata·변수 자료와
[정규화 실측](../docs/agent-hub/design/references/scrollbar.figma.json)을 읽기 전용으로 대조했다.
제품 구현·Figma·Git을 변경하지 않았으며 실제 소비 제품 source/export는 `unmapped`다.

## 제공된 원본과 수치

이 원본은 단일 COMPONENT와 RECTANGLE 자식 하나다. 노드 2개·스타일 2개·인스턴스 0개이며
component property 정의는 빈 객체, variantProperties는 null이다.
두 노드 모두 visible=true이며 reactions는 빈 목록이다. hover/hidden/orientation variant set이나 실제 scroll container는 없다.

| 영역 | 관찰한 원본 |
| --- | --- |
| root | 11×180px FIXED/FIXED, radius0·opacity1 |
| root layout | HORIZONTAL, gap0, padding L0/R1/T1/B0, constraints MAX/MIN |
| root 표면 | fills/strokes/effects 모두 빈 목록, clipping false, overflow NONE |
| thumb | RECTANGLE, x3/y3·4×160px, ABSOLUTE, FIXED/FIXED |
| thumb constraints | 가로 MIN / 세로 SCALE |
| thumb 모서리 | radius9999, 네 corner 모두9999 |
| thumb paint | SOLID #DDDDDD·paint opacity1·layer opacity1 |
| thumb 선·효과 | 실제 strokes/effects 없음 |

root와 thumb의 저장된 strokeWeight1은 stroke paint가 없어 보이지 않는다.
스크린샷의 뒤 배경을 root fill로 추가하거나 wrapper의 선·면·padding을 이 막대의 표면으로 가져오지 않는다.
thumb는 absolute이므로 root의 paddingTop1/right1이 x3/y3 배치를 만든다고 설명하지 않는다.
root canvas transform은 출처 좌표이며 제품 화면의 위치가 아니다.

11−3−4=4px와 180−3−160=17px는 현재 샘플의 오른쪽/아래 잔여 공간이다.
이를 runtime 양끝 inset4/17 또는 양끝 대칭3px로 기록하지 않는다.
160px는 정적 샘플 길이이고 MIN/SCALE 제약만으로 콘텐츠 비율·스크롤 이동·드래그 구현을 확인할 수 없다.
제품 viewport를11px로 축소하거나 콘텐츠와 관계없이160px thumb를 고정하지 않는다.

## 변수와 정규화 대조

[변수 자료](../docs/agent-hub/design/references/scrollbar.variables.figma.json)는 직접 alias2개에서 끝까지
추적한 변수4개·컬렉션2개를 보존한다. `color/scroll/default`는 `gray/300`으로,
semantic `radius/full`은 별도 primitive `radius/full`로 연결된다.
두 radius 이름이 같아도 ID가 다르므로 alias 단계를 합치지 않는다. primitive 결과는 #DDD/alpha1과9999다.

원본과 정규화 사이101항목을 비교해 불일치0을 확인했다. child 위치·치수·layout/sizing/constraints·
clipping/overflow·선의 edge/cap/join·네 corner·paint alpha·빈 효과·binding alias·속성·전체 변수 값이 일치한다.
별도로 수집한 두 노드의 explicit/resolved modes·reactions·rotation/relativeTransform도 일치한다.
기록된 모드는 Light뿐이며 dark나 다른 mode의 지원을 추정하지 않는다.
이미지나 벡터 경로가 없는 CSS primitive이므로 SVG/PNG 자산을 새로 만들 필요가 없다.

## 공용 기준과 비교

공용 Scrollbar 문서와 읽기 전용 CMP ScrollArea 원본도 독립적으로 교차 확인했다.
공용은 native overflow와 직접 계산한 sibling overlay thumb를 사용하며 Radix 기반이라는 증거는 없다.
공용 문서·원본은 추출 참조 기준이고 새 Agent Hub 제품의 구현 증거가 아니다.

| 항목 | 공용 추출 기준 | 새 Agent Hub 원본 |
| --- | --- | --- |
| thumb 두께 | 기본4px | 4px |
| radius | 9999px | 9999px |
| 시작 간격 | nominal inset3px(두께×0.75) | 샘플 x3/y3 |
| Light 기본 paint | #555 alpha .30 | 불투명 #DDD |
| Light hover | #555 alpha .55 | 제공된 시안 없음 |
| 교차축 폭 | nominal 3+4+3=10px | local frame11px |
| 주축 길이 | 콘텐츠 비율·최소24px, 작은 트랙에는 clamp | 160px 샘플만 확인 |

공용의10px도 콘텐츠 폭을 예약하는 CSS scrollbar-gutter가 아니라 nominal overlay geometry다.
새11px frame을 콘텐츠 예약 폭으로 확정하거나 공용10px에 맞춰 축소하지 않는다.
기본색·alpha 차이는 명시적 Agent Hub 확장이다. #DDD가 공용 문서의 Figma 참고값으로도 등장한다는 이유로
공용 runtime alpha .30/.55와 같은 값이라고 기록하지 않는다.

공용이 채택된 제품에서는 native scroll·동적 측정·리사이즈·양끝 트랙 계산·sibling overlay와
중첩 스크롤 영역별 표시 owner를 유지한다. `scrollTo`는 실제 container로 위임하고 임의로 focus를 이동하지 않는다.
이 유지 의무를 이 Figma 샘플에서 이미 실행 검증된 동작으로 표현하지 않는다.

공용 원본에는 role=scrollbar/aria-orientation과 Pointer Capture 기반 드래그가 있으나
viewport/thumb의 명시 tabIndex·scrollbar key handler·focus CSS·aria-controls/value range는 확인되지 않았다.
문서의 native keyboard 설명만으로 consuming 제품의 키보드·focus·전체 ARIA 검증 완료를 선언하지 않는다.
원본에 Corner primitive도 없다. 제품이 다른 primitive를 채택했다면 그 제품의 viewport·focus·양축 corner 계약을 별도로 조사한다.

공용에서 overflow가 없으면 thumb를 렌더하지 않지만 노출 조건 밖의 thumb는 opacity0이며 pointerEvents:auto다.
이를 DOM 제거·접근성 트리 제거·입력 차단과 같은 의미로 설명하지 않는다. 실제 hidden 정책과 조작 가능한 viewport는 제품에서 검증한다.
기존 Menu/Picker의 Scroll bar source `2019:3708`도 이 새 source와 다르므로 일괄 교체하지 않는다.
공용 계약은 frontend-common을 채택한 UI 작업에서만 적용하며 opt-out 제품에 공용 문서·구현을 강제하지 않는다.

## 정적 검사와 남은 범위

[대조 결과](../docs/agent-hub/design/references/scrollbar-comparison.json)의 issues는0이며
`runtimeVerified`·`allStatesVerified`·contentRatioVerified·runtimeFixedLengthAdopted는 모두 false다.
`node --test tools/scrollbar-comparison.test.mjs`는2/2 통과했다.

임시 fixture에서 공용 alpha .30 치환, thumb 폭/radius 변경, root의 유령 배경/선,
11→10px 축소, 샘플160px 길이·ABSOLUTE 변경, 미제공 hover variant와
동명이지만 다른 primitive radius ID 치환을 실제로 검출했다. 임시 fixture는 제거했다.

hover·pressed·hidden·horizontal·dark·추가 상태, native wheel/keyboard·Pointer Capture/drag·
동적 비율/리사이즈·focus/ARIA·중첩 소유권·콘텐츠 예약·실제 제품 source/export는 소비 제품에서 검증한다.
11×180의 막대 그림과 정적 match만으로 작동하는 ScrollArea를 배포했다고 선언하지 않는다.

전체 저장소 `npm run verify`는3426개 로컬 링크, 공용51종+솔루션48종,7개 스킬,
9개 역할/솔루션 조합,3개 schema와 namespace 격리를 통과했다. `npm test`는50/50 통과했다.
Agent Hub catalog는44종+공용51종=95종이며 CMP55/PaaS51과 분리된다.
`AgentHubScrollbar` 단독 선택은 공용 `Scrollbar`만 의존하고 기존Menu/Picker/Flyout/Session/OutputViewer/Card에 자동 전파되지 않는다.

임시 Git fixture와 실제 TeamAI CLI로 Codex·Claude 전달을 실행했다. 공용 on에서는1219개 문서·자산 파일이
원본과 바이트 단위로 일치했고 두 도구에 각각 공용 스킬7개·공용 hook이 전달됐다.
공용 off에서는 회사+Agent Hub673개 파일만 유지되고 두 도구의 공용 스킬은0개, frontend 문서와 공용 hook도 제거됐다.
기존 제품 소유 local skill은 양쪽에서 보존됐다. 실사용 홈이나 제품 저장소에 설치한 결과가 아니라 격리 fixture 검증이다.
실행 기록은 `/private/var/folders/z9/556rb8p56sn7kfzn2x3rqh840000gn/T/aifrica-agent-hub-scrollbar-delivery-j6skslzn/results.json`이다.

독립 문서 검토에서 발견한 세로 part의 교차축 x3 누락도 수정했다. recipe는 inline-start3/endauto와
기존 반대 inset 정리, LTR 샘플/RTL 별도 정책을 명시하며 실제 주축 위치·길이는 기능 adapter가 공급한다.
`git diff --check`도 통과했다. 읽기 전용 serengeti-cmp 작업 트리는 깨끗하며 commit/push는 실행하지 않았다.
