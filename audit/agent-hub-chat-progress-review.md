# Agent Hub 채팅 진행 예시와 컴포넌트 가이드 대조

검토일: 2026-10-21. 대상은 Figma [progress-case/01-생각만 할 때/진행 중](https://www.figma.com/design/cUKHT2PdHjAKRXZlzulnO5/?node-id=3016-118094)입니다.

후속 반영: 아래 두 P2는 이후 [Agent Hub 진행 표시 가이드](../docs/agent-hub/design/chat-progress.md)에 반영했습니다.
정적 기본값을 유지한 Header thinking motion과 ThinkingStatus 계약을 추가했고, 실측과1800ms 등 제안값을 분리했습니다.
이하 내용은 확장 전 비교 결과를 보존한 기록입니다.


기존 컴포넌트의 정적 외형은 이 예시와 맞습니다. 다만 **현재 가이드만으로 예시의 생각 중 상태와 헤더 진행 효과까지 재현할 수는 없습니다.**
헤더 진행 애니메이션과 assistant thinking 상태 행의 두 계약을 보완해야 합니다.
이 화면의 Composer는 enabled·placeholder 상태입니다. 입력 중 typing 효과나 응답 본문이 한 글자씩 생성되는 화면은 아닙니다.

이번 작업은 비교 리뷰입니다. 가이드·registry·스킬·제품 코드·Figma는 변경하지 않았고,
검토 결과와 재확인 가능한 원본 수치는 이 문서 및 [컴포넌트·대조 근거 JSON](./agent-hub-chat-progress-components.json)에 기록했습니다.

## 1. 보완이 필요한 두 부분

### [P2] ChatHeader의 정적 indicator 계약이 새 예시의 진행 효과를 포함하지 않습니다

원본의 빨간 설명3016:118113은 “AI가 사고하는 동안 Header 하단 라인을 따라 그라데이션 애니메이션이 흐르며” 처리 상태를 표현한다고 명시합니다.
현재 [ChatHeader behavior](../docs/agent-hub/design/components/AgentHubChatHeader/behavior.md)의30행과
[구현 예시](../docs/agent-hub/design/components/AgentHubChatHeader/implementation.md)의126행은 indicator를 정적으로 유지하고 애니메이션으로 바꾸지 않도록 안내합니다.
이 지침을 그대로 적용하면 예시의 하단선은 그려지지만 흐르는 효과는 생기지 않습니다.

기존 COMPONENT만 조사했을 때의 정적 기본값은 유지할 수 있습니다. 이번 예시에서 추가된 **thinking 상태의 화면 한정 motion 계약**을 연결해야 합니다.
표시 조건·상태 종료 시 정리·가변 헤더 폭에서의 이동 범위·reduced-motion 대체를 구분하고, 실제 처리 상태는 제품 owner 한 곳에서 공급해야 합니다.
325px를 진행률·퍼센트나 고정된 실제 실행 구간으로 해석하지 않습니다.

root3016:118094와 header3016:118101, status3016:118106을 각각 재귀 `get_motion_context`로 조회했지만 모두 `nodes:[]`였습니다.
노출된227개 레이어의 prototype reactions도 비어 있습니다. 이는 설명에 적힌 애니메이션 의도를 없애는 근거가 아닙니다.
반대로 속도·방향·duration·easing·반복/왕복·시작/종료 keyframe을 측정했다는 근거도 없으므로 임의의 정확한 수치로 문서화하면 안 됩니다.

### [P2] assistant의 생각 중 상태 행을 조립하는 계약이 없습니다

FRAME `status/in-progress`3016:118106은136×32이며 다음을 조합합니다.

- 기존 [BrandMark](../docs/agent-hub/design/components/AgentHubBrandMark/README.md)의32×32 인스턴스
- 가로 gap8px
- `생각하는 중 · 4초` 텍스트96×20, Pretendard Regular14/20·400·opacity.69
- identity transform의5개 stop 텍스트 gradient: 검정0%, #D7D7D7 25%, 검정46.964%, #D7D7D7 68.421%, 검정91.498%

[UserMessage](../docs/agent-hub/design/components/AgentHubUserMessage/README.md)는 사용자 발화용이며 assistant 상태를 포함하지 않습니다.
[ProgressAlert](../docs/agent-hub/design/components/AgentHubProgressAlert/definition.md)는 중단 안내와 재시도·편집 조합이므로 이 상태 행으로 사용할 수 없습니다.
MessageExample·Spinner·Session·OutputViewer 역시 이 원본의 실제 인스턴스가 아닙니다.

상태 행의 구조·스타일과 처리 상태/경과시간의 제품 owner, 완료·중단·실패 시 표시 전환, 읽을 수 있는 상태 안내를 별도 조합 계약으로 기록해야 합니다.
`4초`는 샘플 문구입니다.4초 timer·특정 update 주기·Spinner 회전이나 텍스트 shimmer 속도를 뜻하지 않습니다.
실제 응답 본문·Markdown·streaming과 자동 스크롤 규격은 이 한 장에 나타나지 않으므로 검증됐다고 확대하지 않습니다.

## 2. 기존 가이드와 일치한 컴포넌트

최초 API 노출 트리227개 레이어에서70개 인스턴스·35개 고유 source를 확인했습니다.
기존 Agent Hub 계약16종과 공용 Divider에 대응합니다. 숨김·클리핑·중첩 인스턴스를 포함한 source 집계이며 DOM/동시 가시 요소 수가 아닙니다.
API의 숨김 instance 자식 생략이 켜져 있어 모든 숨김 subtree를 수집했다는 뜻도 아닙니다.

| 계약 | 관찰 인스턴스 수 | 대조 결과 |
| --- | ---: | --- |
| [ChatHeader](../docs/agent-hub/design/components/AgentHubChatHeader/README.md) |1 | 높이48·하단1px #DDD·제목16/24·indicator325×1/4stop 유지. 폭1560·제목 대체·pause=false |
| [Breadcrumb](../docs/agent-hub/design/components/AgentHubBreadcrumb/README.md) |2 | root/item 실제 source 재사용. 단일 label·separator 없음 |
| [ChatComposer](../docs/agent-hub/design/components/AgentHubChatComposer/README.md) |1 | enabled source2611:69434, 폭776·높이58/r9999·Overflow 유지 |
| [AttachIconButton](../docs/agent-hub/design/components/AgentHubAttachIconButton/README.md) |2 | 첨부 default·전송 hovered 원본,32px 원형·glyph24·선1.5 유지 |
| [UserMessage](../docs/agent-hub/design/components/AgentHubUserMessage/README.md) |1 | kind=chat,281×44/r12·#F4F4F4·16/24. 문구와 HUG 폭 대체 |
| [BrandMark](../docs/agent-hub/design/components/AgentHubBrandMark/README.md) |1 | 같은2048×2048 PNG를32px로 비율 유지 축소 |
| [GlobalHeader](../docs/agent-hub/design/components/AgentHubGlobalHeader/README.md) |1 | 높이43·blue-gray·로고/바로가기/알림 규격 유지, 화면 폭1920 |
| [NavRail](../docs/agent-hub/design/components/AgentHubNavRail/README.md) / [NavItem](../docs/agent-hub/design/components/AgentHubNavItem/README.md) / [NavIcon](../docs/agent-hub/design/components/AgentHubNavIcon/README.md) |1 /4 /4 | 레일68·항목52·glyph28, home 선택 유지 |
| [SNBPanel](../docs/agent-hub/design/components/AgentHubSNBPanel/README.md) / [SectionHeader](../docs/agent-hub/design/components/AgentHubSNBSectionHeader/README.md) / [SNBItem](../docs/agent-hub/design/components/AgentHubSNBItem/README.md) |1 /3 /25 |288px 패널과 세 section. 일반 MenuItem과 별도 원본 |
| [Button](../docs/agent-hub/design/components/AgentHubButton/README.md) / [IconButton](../docs/agent-hub/design/components/AgentHubIconButton/README.md) / [Icon](../docs/agent-hub/design/components/AgentHubIcon/README.md) |1 /3 /18 | 새 채팅 primary40·header ghost24 두 개·설정 ghost32와 실제 glyph |
| [공용 Divider](../docs/frontend/design/components/Divider/README.md) |1 | SNB 가로형1px·#DDD·상하8px 유지 |

ChatHeader·Composer·UserMessage의33개 노드에서1,647개 필드를 대조했습니다.
차이19개는 폭9개·문구/prop4개·노출1개·노출/폭에 따른 재배치4개·부모 배치 layoutGrow1개로 설명됩니다.
paint·font·radius·effect·하위 source에서 설명되지 않는 차이는 없습니다.
UserMessage의 layoutGrow1→0은 현재 원본과도 재확인했으며 COMPONENT_SET 부모와 화면 FRAME 부모의 배치 차이입니다. 과거 snapshot 변경이나 시각 오류로 판정하지 않았습니다.

pause=false이면 남은 file/more 두 버튼과 gap4만으로 actions 폭52가 되는 것은 기존 표시 계약으로 표현할 수 있습니다.
미수집 pause 자식과 UserMessage 숨김 arrow를 실제 삭제나 수집된 visible=false로 단정하지 않습니다.
회색 전송 버튼을 loading/disabled 또는 stop 전환으로 해석하지 않습니다. 이번 예시는 입력 가능 조건과 요청 진행을 배타적인 상태로 만들 근거가 아닙니다.

## 3. 화면 조합에 기록할 배치와 예외

| 영역 | 이번 예시 | 적용 시 구분할 범위 |
| --- | --- | --- |
| shell |1920×1080, Header43·Rail68, chat-layout x68/y43·1848×1033·r16·white | 우측/하단4px 여유와 `0 -2px 24px -4px #DEE4EF`는 페이지 배치·그림자 |
| 채팅 영역 | SNB288 뒤1560×1033 | 컴포넌트 샘플640px를 전체 채팅 폭으로 고정하지 않음 |
| 메시지 묶음 | chat-content x392/y108·776×120 | 사용자 버블은 우측 정렬, assistant 상태는 왼쪽.44px 버블 뒤 상태 시작 y88로44px 사이 공간 |
| Composer | x392/y935·776×58 | 폭은 중앙 콘텐츠에서 공급. 프로젝트 선택 행까지 전체90px 공간 확보 |
| 진행 header |1560×48, indicator y47·325×1 | 기본 선 위 한 행에 겹침. CSS bottom−1과 raw y47을 다르게 해석하지 않음 |
| SNB 채팅 section |255px/FIXED, header256px/FIXED·enabled source2611:62411 | 홈 대시보드의 FILL255·hover/pressed 필터 조합을 이 화면에 이식하지 않음 |
| SNB 마지막 두 채팅 행 | leading Boolean=false | 아이콘 표시값의 화면 override. 기본 SNBItem의 아이콘을 전역 제거하지 않음 |

Shell177개 노드의8,469개 필드를 대조했습니다. 차이48개는 mode metadata32개·화면 배치4개·허용된 header 상태/라벨/leading override12개입니다.
현재 source와도 재확인했으며 설명되지 않는 시각 차이는 없습니다.48개 UI 오류를 뜻하지 않습니다.

SNB는 여전히 목록이 패널을44px 넘고 하단 padding까지 포함하면68px가 부족한 정적 원본입니다.
clipping·fade·overflow NONE은 작동하는 scroll의 증거가 아닙니다. 채팅 transcript의 스크롤·긴 메시지·마지막 focus 접근·자동 하단 고정은 제품에서 별도로 연결해야 합니다.

## 4. 자산과 개발 주석

thinking 로고는 IMAGE RECTANGLE 자체가 아니라 source2611:74302의 INSTANCE이며, 실제 IMAGE는 하위 `I3016:118107;2611:74300`에 있습니다.
imageHash `9ad483e40603da8c651c65af6fb5bace9c698cdd`는 기존 [BrandMark PNG](../docs/agent-hub/design/assets/brand/agent-hub-mark.png)와 같습니다.
원본 bytes1,508,137·2048×2048·RGBA8·PNG chunk 구조를 대조했고 GIF/APNG animation chunk는 없습니다. 새 PNG나 아이콘이 누락된 경우가 아닙니다.
로고 회전·영상·GIF·텍스트 shimmer는 이 정적 자산에서 추정하지 않습니다.

빨간 테두리3016:118112와 설명3016:118113은 Figma에서 visible=true인 개발 주석입니다.
제품 DOM에 빨간 박스·안내문을 렌더하지 않고, 애니메이션 의도를 판단하는 근거로만 보존합니다.
루트의 bg-gradation은 visible=false이며 그 안의 이미지가 local visible=true여도 기본 화면에 복원하지 않습니다.

## 5. 판정과 검증 범위

기존 재사용 컴포넌트의 정적 규격은 유지할 수 있습니다. 추가로 필요한 것은 thinking 중 헤더 motion, assistant 상태 행,
그리고 위 화면 배치를 연결하는 조합 명세입니다. 공용 테마·다른 솔루션·모든 ChatHeader의 기본 동작을 이 예시로 덮어쓰지 않습니다.
이번 리뷰에서는 가이드를 수정하지 않았으며 실제 제품의 source/export·API·시간 갱신·stream·focus·scroll·반응형·브라우저 픽셀 일치는 검증하지 않았습니다.
기존 `unmapped`/공유 설정 `draft`를 유지합니다.


저장소 검증: `npm run verify` PASS(로컬 링크3,845개·공용51 + 솔루션59개 계약), `npm test`54/54 PASS,
`git diff --check` PASS. 읽기 전용 `serengeti-cmp` 작업 트리는 clean입니다.
이 검사는 문서·자산·의존/배포 선택의 무결성 검사이며 실제 채팅 앱의 애니메이션·동작·픽셀 일치를 보증하지 않습니다.
