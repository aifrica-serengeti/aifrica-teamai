# Agent Hub ChatHeader 독립 검증

검증일: 2026-10-21. 수집한 Figma raw·추가 mode/reaction·변수 자료를 읽기 전용으로 확인했다.
실제 원본 `2967:34438`의 이름은 `chat-header`이며 채팅 경로와 pause/file/more 조작을 담는다.
이 검토는 이 감사만 작성하며 Figma·공용·제품·Git을 변경하지 않는다.

원본은 단일 COMPONENT, 전체19노드·14스타일·8인스턴스다. 직접 alias6개가 변수10개·컬렉션3개로 닫힌다.
원본과 [정규화](../docs/agent-hub/design/references/chat-header.figma.json)의842항목 대조에서 불일치0을 확인했다.
모든 자식 좌표·layout·constraints·wrap/overflow·border edge/cap/join·corner·paint/gradient·effect·text·alias·
실제 source/props·mode·reaction·transform과 [변수](../docs/agent-hub/design/references/chat-header.variables.figma.json)의 전체 값을 보존한다.
TEXT의 가로 CENTER와 별도 meta 원본의 세로 CENTER도 정규화에 일치한다.
19노드의 reactions는 모두 비어 있다. root의 네 Boolean은 active-indicator/pause/file/more의 visible에 연결되며
진행률·pause/resume·실행 수명·route 상태를 뜻하지 않는다. 추가 상태나 실제 runtime의 증거가 아니다.

640×48·px16·gap4·SPACE_BETWEEN/CENTER, 불투명 white·radius0·아래쪽만1px #DDD를 확인했다.
선 포함 layout의 내부 높이는47px이므로24px 자식의 y11.5와 일치한다. actions는80×24이고24px 조작3개 사이 간격은4px이다.
raw BACKGROUND_BLUR radius11.5는 생성 CSS blur5.75px와 구분해 기록하고 opaque white를 임의 반투명으로 바꾸지 않는다.
active-indicator는 x0/y47·325×1의 장식 RECTANGLE이며 identity gradientTransform·4개 원본 stop을 보존한다.
이 선의 폭이나 이름에서 진행 백분율·spinner·animation·live region을 추정하지 않는다.

Breadcrumb source `2427:25431`과 item `2372:36927`, IconButton source `2427:25108`의 ghost/default24는
기존 Agent Hub 계약과 일치한다. 이 조합의 Breadcrumb는88×24·단일 label·separator=false이며 기본3항목 폭315px를 복제하지 않는다.
세 glyph는 실제 pause `2751:14602`·file `2916:58366`·more `2751:16967`의16px 도형이다.
stale `icon/plus/24` 레이어 이름으로 치환하지 않고 실제1px·#1C1C1C·round 선과4px inset을 따른다.
세 action의 icon collection 명시 mode는16(`3021:1`)이며 같은 값1을 갖는 native mode와 구분한다.
[자산](../docs/agent-hub/design/references/chat-header.assets.json)은 기존 exact-source SVG3개·2,563bytes를 재사용한다.
파일 hash·native 치수/viewBox·실제 source/control variant·glyph 좌표와 실행/원격 참조 부재를 독립 확인했다.
제공 SVG와 기존 파일의 byte가 다르다는 사실을 보존하고 byte 동일성을 주장하지 않는다.

[7문서](../docs/agent-hub/design/components/AgentHubChatHeader/README.md)와 시작 안내·상위 연결을 교차 검토했다.
실측과 제품 API/DOM/CSS 제안, 현재 위치와 표시 Boolean, 장식 indicator와 실제 상태 owner를 구분한다.
native button 한 callback·이름·focus/disabled·조건부 popup·숨김 시 DOM/Tab/gap 제거·긴 제목과 좁은 폭 보완을 명시한다.
자산 notes의 indicator type은 RECTANGLE로 정정됐으며 추가 핵심 오류와 일본어 혼입은 없다.

직접 의존성은 AgentHubBreadcrumb·AgentHubIconButton이며 구현은 unmapped/null이다.
실제 catalog loader는 병행 GlobalHeader를 포함해105개(공용51+Agent Hub54)를 합성하고 공용 off는0개다.
단독 first-use는 하위 계약을 탐색하지만 구현을 missing·visualParityVerified=false로 남긴다.
SNB·GlobalHeader·Session·OutputViewer를 해당 조합에 자동 추가하지 않는다.
독립 검토자는 이 감사만 작성했다. 자산 담당자는 기존 회귀 테스트에 정확한 glyph 재사용 검사를 추가했다.

통합 담당자가 실행한 `npm run verify`는 로컬 링크3,736개·공용51+솔루션58개 계약·스킬7개·
역할/솔루션9조합·schema3개·namespace 분리를 통과했다. `npm test`는53/53, `git diff --check`도 통과했다.
읽기 전용 CMP 작업 트리는 clean이며 소비 제품·개인 홈 설치·원격 게시를 수행하지 않았다.

격리된 실제 TeamAI CLI로 공용 채택 시1,340개 문서·자산 파일의 바이트 일치와 Codex·Claude 공용 스킬 각7개,
frontend 문서·공용 hook 포함을 확인했다. 해제 시794개 파일이 유지되고 공용 스킬은 각0개,
frontend 문서·공용 hook은 제외되며 두 경우 모두 제품 소유 스킬을 보존했다.
이는 전달·계약·정적 자산 검증이다. 실제 제품 명령·라우팅·popup·키보드·픽셀 일치·blur 변환·반응형·dark와
나머지 Boolean 조합의 렌더를 검증한 결과는 아니며 소비 source/export는 계속 unmapped다.
