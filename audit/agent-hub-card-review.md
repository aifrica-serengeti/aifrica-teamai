# Agent Hub Card 5종 확장 독립 검증

검증일: 2026-10-21. 수집한 Figma 원본과 정규화 자료를 읽기 전용으로 대조했다.
Figma와 소비 제품을 수정하지 않았으며 실제 구현 source/export는 모두 `unmapped`다.

## 검증한 범위

[실측 자료](../docs/agent-hub/design/references/card.figma.json)는 서로 다른 카드 5종을 포함한다.
본문 477개 노드·51개 실제 인스턴스·렌더 조합 25개를 보존한다. 별도로 파일 타일 원본 7개 노드와
pin의 비항등 transform 6개를 보존한다. 본문과 별도 원본을 합친 중복 제거 스타일은 136개다.

| 종류 | Figma root | 제공 조합 | 기본 실측 |
| --- | --- | --- | --- |
| FileItem | 3128:25559 | 단일 component 1개 | 512×68, radius 12 |
| DataCard | 2427:25252 | enabled/hovered/pressed 3개 | 120×120, radius 12 |
| ThumbnailCard | 3100:114430 | default/hovered/pressed/selected/disabled 5개 | 324×343.500015, radius 24 |
| ScheduleCard | 3100:171 | state 5개 × active/paused 2개 = 10개 | 324×118, radius 24 |
| ItemCard | 3095:143 | state 5개 + accent = 6개 | 324×146, radius 24 |

다섯 root의 property 정의 수집은 모두 성공했다. 실제 인스턴스의 source·variant·모든 componentProperties,
노출 인스턴스 여부·속성 참조·숨김 자식·모든 노드의 명시/해결 mode도 원본과 일치한다.
수집한 prototype reaction 그룹은 모두 빈 목록이다. 그림이나 source 이름은 다운로드·메뉴·예약 제어·채팅의
이벤트, 라우팅 또는 서버 동작이 구현됐다는 증거가 아니다.

[변수 자료](../docs/agent-hub/design/references/card.variables.figma.json)는 직접 참조 31개에서 alias를 끝까지
추적한 변수 46개와 컬렉션 4개를 보존한다. 외부 Divider alias를 포함한 전체 모드 값을 비교했으며
누락이나 불필요한 변수가 없다. 외부 alias에 다른 mode가 있다는 사실을 Agent Hub 다크 모드 검증으로 해석하지 않는다.

## 조립에서 유지할 차이

FileItem의 바깥 1px INSIDE 선은 `strokesIncludedInLayout=false`다. 512×68에 선 두께를 더해
내용 폭과 높이를 늘리지 않는다. padding은 왼쪽 12/오른쪽 16/상하 12, gap은 12다.
44px spreadsheet 타일은 실제 source `3128:25501`이며, 내부 44px sheet가 x8/y8로 이동하고
44px 부모가 clip한다. 이를 가운데 24px glyph 하나로 대체하면 원본의 면·gradient·border·clip이 사라진다.
별도로 수집한 원본 타일의 전체 7개 레이어와 실제 인스턴스의 시각·공통 geometry가 일치한다.

FileItem meta의 gap은 -4다. 파일 크기와 크기 separator는 `size=false`에 연결된 실제 숨김 노드다.
형식과 확장자 사이 divider는 source `2874:45712`, 실제 17×8이며 다른 Divider source와 동일하다고 기록하지 않는다.
다운로드 Button은 실제 tertiary/enabled/28 source `3109:144`, label override로 85×28이다.
숨김 leading/keycap과 보이는 native16 chevron을 구분하며 버튼의 선도 레이아웃에 2px를 더하지 않는다.
`button#3128:5=true` 속성 정의는 있으나 실제 버튼의 visible 속성 참조는 비어 있다.
제품에서 show-action API를 연결하는 절차를 원본 바인딩이 이미 확인된 사실로 표현하지 않는다.

DataCard의 실제 인스턴스는 공용 Pill source `2079:12042`다. 작은 흰색 Pill이 44×20·radius 10이고
라벨은 일반 문자열 `Type`이다. AgentTypeChip 또는 Agent Hub PillChip으로 source를 바꿔 기록하지 않는다.
제목은 14/20 Regular 400, 설명은 10/12 Regular 400이며, 세 상태 모두 Raised 효과다.
제공되지 않은 selected/disabled 상태를 다른 카드의 상태에서 가져와 실측으로 선언하지 않는다.

ThumbnailCard의 thumbnail은 실제 이미지가 아닌 #F4F4F4 FRAME placeholder다.
내부 322×241.500015 면과 322×100 내용이 1px 외곽선 안에 놓인다.
default/selected/disabled는 Overflow, hovered/pressed는 Mid다. 모든 상태의 전체 opacity는 1이며
비활성 표현은 제목·meta·설명·dot의 #AAAAAA 색으로 적용된다. optional false 조합은 제공되지 않았다.

ScheduleCard에서 status와 interaction state는 독립 축이다. 왼쪽 상태 배지는 active 60×24,
paused 89×24이고 source16 glyph를 실제 14px로 줄인다. 오른쪽 toggle은 24px FRAME이며
내부 glyph는 16px·inset 4다. active의 delay와 paused의 pause 배지, 오른쪽 pause/play source를 각각 보존한다.
일반 toggle 선색은 #757575, disabled는 #AAAAAA다. FRAME을 실제 IconButton 인스턴스로 기록하거나
배지의 14px와 제어 glyph의 16px를 서로 바꾸지 않는다.

ItemCard의 more는 실제 ghost/default 또는 ghost/disabled **20px** 버튼이다.
source가 icon/more/24인 glyph만 실제 16px·inset 2로 축소한다. pin과 chat 제어는 24px FRAME이며
pin은 hovered/pressed 두 조합에만 실제 존재한다. pin Boolean 기본값이 true라고 다른 상태에 노드를 만들지 않는다.
accent는 #EBF3FF 면과 opacity 0의 흰색 1px border를 가지므로 선이 보이지 않아도 레이아웃 공간은 유지한다.

이 다섯 트리에 공용 Card 인스턴스는 없다. 공용 Card 의존성은 제품이 채택하는 구조·상태·접근성 계약의 근거이며,
관측된 Figma instance 재사용 관계와 구분한다. 중첩 제어가 있는 카드를 단일 native button으로 감싸지 않고
카드의 선택/이동과 more·pin·chat·pause/resume의 이벤트 및 focus 소유권을 제품에서 정한다.

## 자산 원본과 예외

[자산 목록](../docs/agent-hub/design/references/card.assets.json)의 22개 항목을 native 크기·SHA-256·bytes와
SVG viewBox/색/선/안전성으로 확인했다. 새 파일은 21개·209,417 bytes이며 기존 spreadsheet44 파일
1,208 bytes를 합친 참조 파일의 전체 합계는 210,625 bytes다.
제공 asset 원본 20개는 별도로 내려받은 원본의 SHA-256과 모두 일치했고 전체 pin은 직접 export한 문자열과 일치한다.

file glyph24와 pin fragment는 `referenceOnly=true`다. fragment의 10.3333×14.3323 viewBox를 강제로
16px로 늘리지 않는다. 실제 pin 인스턴스의 전체 16px를 읽기 전용으로 export한 파일은 별도로 있으며
-45도 transform이 이미 반영돼 있으므로 CSS 회전을 다시 적용하지 않는다.

일반 tool PNG 두 개는 800×636 및 960×960 원본이며 SHA1이 각각 Figma imageHash와 정확히 일치한다.
실제 배치는 16.5×13.1175 및 15×15로, 동적 tool 데이터의 예시다. 특정 브랜드나 URL을 공통 계약으로 고정하지 않는다.
비활성 IMAGE는 같은 imageHash를 유지하면서 saturation=-1이다. 그러나 context가 제공한 두 disabled PNG는
서로 동일한 32×32·159 bytes placeholder이고 두 원본 imageHash와 일치하지 않는다. 이를 실제 로고로 배포하지 않고
거절 기록 2개와 해시·치수·대체 원본 경로를 남겼다. 제품 adapter는 검증한 원본 이미지에 grayscale(1)을 적용한다.

## 검사와 남은 검증

원본과 정규화 사이 22,059개 항목을 재귀 비교해 불일치 0을 확인했다. root canvas 위치만 제외했으며,
자식 위치·치수·layout/wrap/constraints·border 포함 여부·edge·corner·clipping/overflow·텍스트·
gradient/IMAGE 필터/변환·paint/effect·변수 binding·인스턴스·mode와 별도 transform을 비교했다.

[조합 검사](../docs/agent-hub/design/references/card-composition.json)의 issues는 0이다.
`node --test tools/card-composition.test.mjs`는 3/3 통과했다. 격리 fixture에서 다음 오류를 실제로 검출하고 fixture를 제거했다.

- FileItem border의 레이아웃 포함 여부 변경과 size Boolean 참조 유실.
- DataCard의 잘못된 Chip source 치환.
- Item more 제어를 24px로 변경, hovered pin 누락, disabled saturation 유실.
- Schedule toggle glyph를 배지와 같은 14px로 바꾸는 오류.
- 대체 파일의 SHA-256까지 맞춘 잘못된 SVG viewBox.

`runtimeVerified`와 `allStatesVerified`는 false다. 샘플 색·상태가 맞아도 focus/키보드·disabled 이벤트 차단·
selected 소유권·레이아웃 변경/긴 내용·반응형·loading/error/dark·서버/파일 동작과 실제 source/export는
소비 제품에서 따로 검증한다. 이 감사는 원본 제품 변경이나 스킬 설치·커밋·원격 게시를 수행하지 않았다.

통합 담당의 `npm run verify`는 로컬 링크 3,401개·공용 51개+솔루션 47개 계약·스킬 7개·
역할/솔루션 9조합·schema 3개를 통과했고 `npm test`는 48/48 통과했다.
`git diff --check`도 통과했으며 읽기 전용 CMP 원본 작업 트리는 clean이다.

격리한 임시 제품의 실제 TeamAI CLI 결과도 확인했다. 공용 채택 시 문서·자산 1,209개 파일과
Codex·Claude 각각 공용 스킬 7개가 전달됐다. 공용 해제 후 회사·Agent Hub 파일 663개를 유지하며
공용 스킬은 두 도구 모두 0개이고 frontend 공용 문서·hook은 제외됐다. 기존 제품 전용 스킬은 보존됐다.
이 결과는 TeamAI의 파일 전달·공용 채택/해제 검증이며 소비 제품의 Card UI 동작 검증과 구분한다.
