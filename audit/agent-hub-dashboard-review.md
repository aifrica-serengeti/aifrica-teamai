# Agent Hub 프롬프트 홈 대시보드 가이드 대조 리뷰

검토일: 2026-10-21. 대상은 Figma [01. B type-프롬프트 홈](https://www.figma.com/design/cUKHT2PdHjAKRXZlzulnO5/?node-id=3016-104410)입니다.

기존 컴포넌트의 색상·radius·하위 원본은 대부분 이 화면과 맞습니다. 다만 **컴포넌트 가이드만으로 이 홈 화면의 전체 모습을 재현할 수는 없습니다.**
홈 전용 배치·Hero·배경 자산·표시 옵션을 조합하는 화면 명세가 추가로 필요합니다.
컴포넌트 문서 자체에서 발견한 보완점은 ItemCard 설명의 최대 높이40px 누락입니다.

이 작업은 리뷰와 목록 추출입니다. 기존 공용·Agent Hub 컴포넌트 가이드·registry·제품 코드·Figma는 수정하지 않았습니다.
결과와 근거는 이 감사 문서 및 [추출 목록 JSON](./agent-hub-dashboard-components.json)에 기록했습니다.

## 1. 사용된 컴포넌트

최초 API 노출 트리388개 레이어에서 인스턴스99개·고유 COMPONENT source43개를 추출했습니다.
기존 Agent Hub 계약16종과 공용 Divider에 대응합니다. 같은 인스턴스 안의 하위 인스턴스도 포함한 수입니다.
숨김 instance 자식은 기본 조회에서 생략될 수 있어 이 수를 전체 숨김 노드 수나 실제 DOM 수로 사용하지 않습니다.
Composer·메뉴·카드는 숨김 자식과 source를 별도로 확장해 확인했습니다.

| 가이드 계약 | 인스턴스 수 | 실제 적용과 판정 |
| --- | ---: | --- |
| [GlobalHeader](../docs/agent-hub/design/components/AgentHubGlobalHeader/README.md) |1 | source2611:62099·높이43 유지, 화면 폭1920 적용 |
| [NavRail](../docs/agent-hub/design/components/AgentHubNavRail/README.md) / [NavItem](../docs/agent-hub/design/components/AgentHubNavItem/README.md) / [NavIcon](../docs/agent-hub/design/components/AgentHubNavIcon/README.md) |1 /4 /4 | 레일68·항목52·glyph28, 선택 home 포함 |
| [SNBPanel](../docs/agent-hub/design/components/AgentHubSNBPanel/README.md) |1 |288×1033·우측 선·패딩·fade 유지, 일부 화면 override 있음 |
| [SNBSectionHeader](../docs/agent-hub/design/components/AgentHubSNBSectionHeader/README.md) / [SNBItem](../docs/agent-hub/design/components/AgentHubSNBItem/README.md) |3 /25 | 고정·프로젝트·채팅. 일반 MenuItem과 별도 원본 |
| [Button](../docs/agent-hub/design/components/AgentHubButton/README.md) |2 | 새 채팅 primary40, 에이전트 찾기 ghost28 |
| [IconButton](../docs/agent-hub/design/components/AgentHubIconButton/README.md) / [Icon](../docs/agent-hub/design/components/AgentHubIcon/README.md) |7 /30 | 설정·섹션 조작·카드 more와 정확한 glyph source |
| [BrandMark](../docs/agent-hub/design/components/AgentHubBrandMark/README.md) |1 | 동일2048px PNG를92px로 표시 |
| [ItemCard](../docs/agent-hub/design/components/AgentHubItemCard/README.md) |3 | accent source3074:91985·248×146·r24·p16 |
| [ChatComposer](../docs/agent-hub/design/components/AgentHubChatComposer/README.md) / [AttachIconButton](../docs/agent-hub/design/components/AgentHubAttachIconButton/README.md) |1 /2 | enabled768×58, 바깥 프로젝트 선택 포함90px |
| [Menu](../docs/agent-hub/design/components/AgentHubMenu/README.md) / [MenuItem](../docs/agent-hub/design/components/AgentHubMenuItem/README.md) |2 /11 | 메인7행·서브4행 표시, 숨김 행은 별도 확인 |
| [공용 Divider](../docs/frontend/design/components/Divider/README.md) |1 | SNB 새 채팅 아래 가로형 source2022:2·1px/상하8px |

계정 avatar, 헤더의 바로가기·알림, 카드 chat 조작은 해당 상위 계약이 소유한 FRAME입니다.
별도 Avatar/Button/IconButton 실제 인스턴스로 중복 집계하지 않았습니다.
방금 작성한 ChatHeader, Calendar, Picker, Session, OutputViewer 등은 이 홈 화면에 없어 이번 화면으로 검증하지 않았습니다.

## 2. 컴포넌트 가이드에서 보완할 부분

**[P2] ItemCard 설명의 maxHeight40을 사람용 가이드와 구현 예시에 명시해야 합니다.**

[현재 스타일 가이드](../docs/agent-hub/design/components/AgentHubItemCard/styles.md)는 description을 HUG·maxLines=null로 설명하고,
[구현 예시](../docs/agent-hub/design/components/AgentHubItemCard/implementation.md)의 CSS에도 최대 높이 정책이 없습니다.
그런데 기존 [card 실측](../docs/agent-hub/design/references/card.figma.json)의 원본3074:91999와 이번 카드3개의 설명 모두
`maxHeight=40`, `textAutoResize=HEIGHT`, `textTruncation=ENDING`, `maxLines=null`입니다.

현재 짧은 설명은20px라 샘플에 시각 오류가 나타나지 않습니다. 긴 설명을 무제한 HUG로 구현하면 원본의40px 상한을 놓칩니다.
40px 상한과 전체 내용 접근 방식을 명시해야 하며, 이를 임의3줄 clamp나 모든 카드의 고정 높이146px로 바꾸면 안 됩니다.
실측 JSON은 이미 정확하므로 원본·공용 Card·palette 변경은 필요하지 않습니다.

## 3. 홈 화면 조합으로 따로 기록할 부분

아래 차이는 공용 컴포넌트의 기본값을 바꾸기보다 홈 화면 조합 명세로 연결하는 것이 맞습니다.

| 범위 | 이번 화면의 값·구성 | 필요한 기록 |
| --- | --- | --- |
| 전체 shell |1920×1080. Header43·Rail68, 본문 x68/y43·1848×1033·r16·white. 우측/하단4px 여유 | 화면 shell의 배치와 `0 -2px 24px -4px #DEE4EF` 그림자. 전역 Elevation 기본값으로 확장하지 않음 |
| Hero | 메인 내부 x452/y138·648×284.40px/600·자간−2% 제목, rolling-name·caret·ALPHA mask3개, 보조문구16/24 | 페이지 전용 구성과 실제 콘텐츠·마스크·장식. 이름만 보고 rolling 속도·자동 재생을 정하지 않음 |
| Hero 로고 주변 |90px wrapper 안92px PNG(x−1.5/y−1), 별도82px 흰 ellipse·opacity.82·blur35.4 | BrandMark PNG와 주변 glow의 별도 소유권 |
| 즐겨찾기 영역 | x392/y574·776×186, 헤더28·gap12,3열·gap16·각248×146 | 제목16/24·별 glyph16·찾기 ghost28 및 카드 데이터·dot=false 조합 |
| Composer 배치 | x392/y462·768×58, 프로젝트 선택까지90px footprint | Hero·카드 영역과의 간격. 본체58px만 보고 아래 요소를 겹치게 배치하지 않음 |
| SNB 채팅 헤더 | section/header FIXED→FILL, header256→255·보조 그룹 x196→195 | 이 화면에서 채택한 가변 폭 |
| SNB 필터 | source2909:49139/default→2909:49137/pressed | 정적 메뉴 열린 샘플의 source 상태와 실제 open/pressed 상태 소유권 구분 |
| SNB 마지막2행 | leading Boolean true→false, label x24→0 | 이 화면의 행 데이터와 아이콘 표시값. 기본 SNBItem의 아이콘을 전역 제거하지 않음 |
| 메인·서브 메뉴 |184×243/7행 및155×122/4행, main 첫 header 행56px·divider 포함 행37px | 행 순서·선택값·header/divider/check/value/chevron 옵션 |
| 서브메뉴 배치 | 부모341×304, 서브 x186/y182·메인 우측2px·최근 활동 행과 y 일치 | 실제 trigger·키보드·Escape·focus 복귀·충돌 배치. 화면 좌표를 모든 popup 기본값으로 고정하지 않음 |
| 하단 안내 | 메인 내부 x550/y1001·465×20·font14/20·#757575 | 화면 문구와 가용 높이·반응형 배치 |

SNB의 변경은 현재 직접 source와도 대조했습니다. 현재 source의 채팅 section은255px/FIXED, header는256px/FIXED이며 필터default·마지막2행 leading=true이므로,
과거 실측이 낡아서 생긴 차이가 아니라 이 화면의 실제 instance override입니다. 기존 선택 가능한 상태·Boolean으로 수용할 수 있습니다.

메뉴는 각 source의11개 행을 모두 유지하며 메인4개·서브7개 행을 숨겼습니다. 삭제된 행으로 기록하면 안 됩니다.
기존 optional slot·HUG value 계약으로 표현 가능하므로 새 Menu id나 전역 기본값 교체는 필요하지 않습니다.
`check` 표시를 그대로 체크박스 API로 해석하지 않고 유형·기간별 실제 단일선택 owner를 정해야 합니다.

SNB 목록이 패널을44px 넘고 하단 패딩까지 합치면68px 용량이 부족한 상태는 기존 원본과 같습니다.
이 잘림·fade가 작동하는 스크롤을 보장하지는 않으므로 실제 제품에서는 마지막 행과 키보드 focus 접근을 별도로 검증해야 합니다.

## 4. 자산 매핑 보완

- **Hero 배경:**1254×1254 원본 imageHash `b8fb59046019a4222e020fead716012afa50d5c2`가 현재 로컬 자산에 없습니다.
  세 IMAGE 레이어는 같은 원본의3사용처입니다. saturation−1, exposure 약.26/.22/.21, 셋째 CROP transform,
  각 opacity.67·부모 opacity.5·COLOR_BURN·회전/white fade를 함께 기록해야 합니다.
  공급된 가공 PNG를 사용할지 원본에 adapter를 적용할지 구분해 filter를 두 번 적용하지 않습니다.
- **즐겨찾기 별:**FRAME3016:104454 안 VECTOR3016:104455의16px 장식입니다.
  기존 star/favorite 자산이나 정확한 대체 자산의 연결은 확인되지 않았습니다. ItemCard pin으로 대체하지 말고 정확한 whole16 SVG를 연결해야 합니다.
- **재사용 가능:**BrandMark PNG와 카드 도구 로고2종은 기존 imageHash와 일치합니다.
  ‘에이전트 찾기’ chevron의 실제 source는24px3018:24739를16px로 재정의한 것입니다.
  기존 [native16 SVG](../docs/agent-hub/design/assets/icons/chevron-right/16.svg)는 실제 override의 경로·색·선·cap/join과 정확히 일치하므로 재사용할 수 있습니다.
  source가 같은2842:38917이라고 바꾸어 기록하거나 native24 SVG의 root 치수를 임의 변경하지 않습니다.

Hero와 별 자산은 이번 리뷰에서 새로 내려받거나 공용 아이콘 목록에 추가하지 않았습니다.

## 5. 오류로 판정하지 않은 차이

- **로고180→92:**[BrandMark 스타일](../docs/agent-hub/design/components/AgentHubBrandMark/styles.md)이 비율을 보존한 축소를 이미 허용합니다.
- **카드324→248:**[ItemCard 스타일](../docs/agent-hub/design/components/AgentHubItemCard/styles.md)이324를 fixture로 두고 부모 공급 폭을 허용합니다.
  내부290→214·more x270→194와 내용·dot 숨김에 따른 변화는 이 폭·데이터에서 파생됩니다. accent의 투명1px 선 공간도 유지됩니다.
- **Global Header774→1920:** 원본 폭은 샘플이며 높이43·색·로고·action 규격은 유지됩니다.
- **Composer CSS y61 / Figma y62:** 직접 source와 화면 instance 모두 x9/y62·height28입니다.
  생성 CSS left8/top61은1px 테두리 안쪽 containing block의 좌표입니다. 실제 footprint는90px로 기존 가이드와 같습니다.
- **회색 전송 버튼:** hovered 원본·arrow swap은 기존 Composer와 같습니다. 회색만 보고 disabled·입력 없음 정책을 확정할 수 없습니다.

Shell은194개 제공 노드의10,604개 필드를 대조했습니다. 차이48개는 mode metadata28개·화면 배치4개·SNB의 세 override 주제에 속한16개 필드입니다.
48개 UI 오류가 있다는 뜻이 아닙니다. 현재 source와의 재확인에서도 설명되지 않는 source 변경은 발견하지 않았습니다.
Composer16개 노드의537개 style/좌표 항목은 일치했습니다.
메뉴 panel의 폭·높이 제외82개 항목도 일치했고, 표시 MenuItem11개의5,170개 항목 중4개만
가이드가 허용한 value TEXT의 FIXED→HUG / NONE→WIDTH_AND_HEIGHT 변경입니다.
카드87개 노드는 예상된 폭·내용·표시 override 외 paint·border·radius·padding·font·effect 차이가 없습니다.

## 6. 재현 범위와 후속 적용 순서

먼저 ItemCard의40px 상한 누락을 보완하고, Agent Hub 프롬프트 홈 조합 문서에 위 배치·옵션·자산 매핑을 추가하면 됩니다.
이 과정에서 공용 Component와 각 솔루션의 기본값을 대시보드 좌표로 덮어쓰지 않습니다.

이번 확인은 Figma와 가이드의 비교입니다. 최초 노출 트리388개 노드의 prototype reactions는 비어 있었습니다.
실제 제품 source/export, 요청·라우팅·메뉴 선택·팝업·포커스·스크롤·반응형·Hero 애니메이션과 브라우저 픽셀 일치는 검증하지 않았습니다.
가이드의 기존 `unmapped`/공유 설정 `draft`를 유지하며 TeamAI 수신만으로 화면 구현이 완료된다고 판단하지 않습니다.

저장소 검증: `npm run verify` 통과(로컬 링크3,760개), `npm test`53/53 통과, `git diff --check` 통과.
이 검사는 문서·계약·배포 범위의 무결성 확인이며 실제 브라우저 화면의 시각 일치를 보증하지 않습니다.
