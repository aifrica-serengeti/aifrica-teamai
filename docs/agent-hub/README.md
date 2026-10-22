# Agent Hub 솔루션 확장

공용 frontend를 확장하는 아래 절차는 inheritCommon을 켜고 frontend-common 묶음을 선택한 경우에 적용한다.
공용을 끈 제품은 공용 문서·registry·스킬을 요구하지 않고 현재 제품의 자체 지침을 사용한다.
선택·해제 방법은 DOCS_ROOT/common/frontend-bundle.md를 따른다.

이 namespace는 Agent Hub의 공통 기준 추가·변경 사항을 담는다. 현재 [frontend.json](./frontend.json)은
`status: draft`이며 테마·실제 source·페이지 구성을 채택한 상태가 아니다. 빈 map과 `null`은 미확인을 뜻한다.
이 문서의 frontend 확장·채택 절차는 frontend·UI 작업에만 적용한다. backend 작업은
회사 공통 규약과 제품의 backend 계약을 따르며 아래 frontend 문서와 설정을 읽을 의무가 없다.

Agent Hub의 [디자인 컴포넌트·자산 확장](./design/README.md)은 Figma에서 확인했고,
전용 계약과 원본 자산을 추가했다. 전체 테마·페이지·실제 구현 경로·업무 정책은 아직 미확인이다.
제품 이름만으로 화면·도메인·라우팅 구조를 추정하지 않는다.
경로 탐색은 [Breadcrumb](./design/components/AgentHubBreadcrumb/README.md)과
[전용 구분자](./design/components/AgentHubBreadcrumbSeparator/README.md)에서 공용 대비 글꼴·색상·간격을 확인한다.
현재 페이지 의미·hover/focus·축약 동작은 공용 계약을 유지하며 실제 제품에서 검증한다.
채팅 입력은 [ChatComposer](./design/components/AgentHubChatComposer/README.md)와
[구현 연결 안내](./design/components/AgentHubChatComposer/implementation.md)에서 확인한다.
기존 조합이 있으면 재사용하고, 없으면 확인한 계약으로 솔루션 컴포넌트를 개발한다. 실제 source/export는 제품에서 검증한다.
사용자 메시지는 [UserMessage](./design/components/AgentHubUserMessage/README.md)와
[구현 연결 안내](./design/components/AgentHubUserMessage/implementation.md)에서 chat·agent·schedule 3종을 확인한다.
`AgentHubMessage` 별칭도 이 사용자 표시만 가리키며 assistant·대화 전체·Markdown 렌더러를 포함하지 않는다.
응답 중단 후 재시도·편집 안내는 [ProgressAlert](./design/components/AgentHubProgressAlert/README.md)와
[구현 연결 안내](./design/components/AgentHubProgressAlert/implementation.md)를 확인한다. 진행률 표시나 toast로 해석하지 않는다.
예시 프롬프트 선택은 [MessageExample](./design/components/AgentHubMessageExample/README.md)과
[구현 연결 안내](./design/components/AgentHubMessageExample/implementation.md)를 확인한다.
발송된 UserMessage와 구분하며 선택 결과가 입력 채우기·즉시 전송·이동 중 무엇인지는 제품에서 명시한다.
에이전트 선택 패널은 [Picker](./design/components/AgentHubPicker/README.md),
[Item](./design/components/AgentHubPickerItem/README.md), [Footer](./design/components/AgentHubPickerFooter/README.md)를 함께 확인한다.
두 화면의 정적 조립과 실제 검색·선택·스크롤·focus 구현을 구분하고 모델 목록·선택 결과는 제품에서 연결한다.
일반 메뉴는 [Menu Item](./design/components/AgentHubMenuItem/README.md)과 [Menu](./design/components/AgentHubMenu/README.md)에서 확인한다.
공용 Menu의 의미·키보드·focus 계약을 유지하면서 전용 radius·행 여백·destructive 색상을 연결한다. Picker와 같은 패널로 취급하지 않는다.

파일·폴더 컨텍스트 패널은 [Flyout](./design/components/AgentHubFlyout/README.md)과
[구현 안내](./design/components/AgentHubFlyout/implementation.md)를 확인합니다. 내부는 새 조합이며
[Menu와 같은 모션](./design/components/AgentHubFlyout/motion.md)만 채택합니다. Menu의 role·행·폭은 자동 상속하지 않습니다.

예약·기록·진행·출력·컨텍스트를 모아 보여 주는 [Session 패널](./design/components/AgentHubSessionPanel/README.md)은
Agent Hub 전용 신규 계약입니다. [구현 안내](./design/components/AgentHubSessionPanel/implementation.md)에서
패널과5개 하위 요소, empty/filled·선택/읽지않음·각 접기 상태를 연결합니다.

산출물 미리보기는 [OutputViewer](./design/components/AgentHubOutputViewer/README.md)와
[구현 안내](./design/components/AgentHubOutputViewer/implementation.md)를 확인합니다.
제목·형식·확대/닫기·본문 슬롯의 전용 패널이며 실제 파일 조회와 renderer는 제품에서 연결합니다.

카드를 구현할 때는 [Card 유형 선택](./design/cards.md)에서 파일 행·데이터·썸네일·예약·항목 카드 중 역할에 맞는 가이드를 고릅니다.
각 유형의 시각·구성·실제 하위 원본과 공용 Card의 의미·접근성 참고를 구분합니다.

스크롤 영역은 [Scrollbar](./design/components/AgentHubScrollbar/README.md)에서 공용과 같은 두께·radius, 달라진 불투명 색상과 로컬 gutter를 확인합니다.
실제 overflow·동적 thumb·keyboard는 제품에서 연결하고 정적160px 길이를 고정하지 않습니다.

Dialog 하단 액션은 [DialogFooter](./design/components/AgentHubDialogFooter/README.md)에서 공용32px 대신 AgentHubButton40을 조합하는 기준을 확인합니다.
패딩24px·간격8px은 유지하고 기존 footer 슬롯에 여백을 중복하지 않습니다.

전용 탐색은 [SNB 시작하기](./design/snb.md)에서 레일·패널과 하위 컴포넌트의 구조를 확인합니다.
CMP SNB를 가져오지 않고 실제 전용 원본·자산·상태를 연결하며 제품 router와 데이터 owner를 따로 검증합니다.

전역 헤더는 [Global Header 시작하기](./design/global-header.md)에서 로고·플랫폼 바로가기·알림과 제품 동작 연결 방법을 확인합니다.

대화 상단은 [Chat Header 시작하기](./design/chat-header.md)에서 경로·일시정지·파일·더보기와 표시 옵션을 확인합니다.

Dialog는 [시작 안내](./design/dialog.md)에서 공용과의 차이와 편집·탐색 두 구성을 확인합니다.

생각 중 표시는 [진행 효과와 상태 행](./design/chat-progress.md)에서 실측과 motion 제안값을 구분해 확인합니다.

## 읽는 순서

[Divider 비교](./design/divider.md)에서 공용과 같은 가로 Light 시안을 확인할 수 있습니다.
1px 선·#DDD·위아래8px 여백은 공용을 재사용하고 전용 컴포넌트를 중복 등록하지 않습니다.

1. [회사 공통 해석 계약](../common/resolution.md)에서 문서 root와 솔루션 선택을 확인한다.
2. Frontend·UI 작업일 때 `DOCS_ROOT/frontend/README.md`와 작업별 공용 스킬을 선택한다.
3. [Agent Hub 확장 작성·적용](./extension.md)과 [확장 데이터](./frontend.json)를 읽는다.
4. 컴포넌트·아이콘·로고 작업이면 [Agent Hub 디자인 확장](./design/README.md)에서 필요한 계약과 자산을 찾는다.
5. 현재 제품 저장소의 실제 코드와 로컬 `.aifrica/frontend.json`을 비교한다.

TeamAI의 `frontend-common` 역할과 `agent-hub` 프로젝트는 서로 다른 선택이다. 공용 역할은 frontend 스킬을,
프로젝트는 이 솔루션 문서를 배정한다. `frontend` 기본 역할만으로는 공용을 받지 않는다. 제품에 배포할 때도 namespace는
`.teamai/docs/agent-hub/`로 유지하며 공통 frontend 문서를 덮어쓰지 않는다.
이 프로젝트를 선택한 backend 역할도 솔루션 리소스를 받으므로 frontend 계약은 frontend 작업에서 적용한다.

## 실서비스 도입 시 채울 항목

| 항목 | 확인할 근거 |
| --- | --- |
| 테마·타이포그래피·border 등 token mapping | 실제 token 선언, light/dark 값, 대비와 상태 구별 |
| 컴포넌트 mapping | 공통 registry id, 제품 source, public export, 호출자와 지원 API |
| List·Create·Detail 구성 | 실제 route·화면 요구, 권한, API, 상태 소유권, 반응형 정책 |
| 아키텍처·문서 경로 | 현재 소비 저장소의 실제 파일과 모듈 경계 |
| 제품 한정 변경 | 이유·영향 범위·검증 근거와 `exceptions` |

경로는 모두 소비 제품 저장소 상대경로다. 이 공용 문서 저장소나 원본 `serengeti-cmp`의 경로를
실서비스 구현 위치로 간주하지 않는다. List·Create·Detail의 공통 상태·접근성 기준은
`DOCS_ROOT/frontend/design/patterns/README.md`에서 유지하며 frontend 작업일 때 읽는다.

고객·배포별 차이가 생기면 검증한 차이만 `profiles/<profile-id>/`에 추가한다. 현재 등록된 Agent Hub profile은 없다.
