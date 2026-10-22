# Agent Hub User Message 확장 검증

검증일: 2026-10-21. Figma file `cUKHT2PdHjAKRXZlzulnO5`의 `message/user` set `2972:20901`을
get_design_context 렌더링과 읽기 전용 Plugin API로 확인했다.
공용51개·기존 Agent Hub19개에 같은 Message 계약이 없어
[AgentHubUserMessage](../docs/agent-hub/design/components/AgentHubUserMessage/README.md)를 추가했다.
`AgentHubMessage`는 이 사용자 메시지의 검색 별칭이며 assistant 응답·대화 전체의 구현을 뜻하지 않는다.

## 실측과 범위

| 항목 | 확인한 내용 |
| --- | --- |
| 종류 | chat·agent·schedule. 원본 설명에는 chat/agent만 있지만 실제 정의·자식·렌더링에는 schedule도 존재 |
| 버블 | 한 줄44px·좌우16/상하10·radius12·#F4F4F4·border/shadow 없음 |
| 본문 | Pretendard Regular16/24·400·#1C1C1C, 공백을 포함한 원문·message 속성 참조 보존 |
| agent | 일반 Chip의 purple override·라벨 ‘에이전트’·title14/20·Divider 외곽17×12 |
| schedule | 외곽 투명/radius0·우측 정렬·status16+gap8+bubble44=68px. 안쪽 버블은 FRAME |
| 예약 아이콘 | 원본20px `2053:5271`을 실제12px로 축소·선0.75·round·#555555 |
| 숨김 | arrow 인스턴스3개와 description1개는 저장된 원본이며 화면 기능으로 추가하지 않음 |

chat/schedule의211px·agent346px 폭과44px 높이는 한 줄 HUG 샘플이다. 원본 clipping=true를 근거로 실제 긴 메시지의
내용을 버리지 않는다. 줄바꿈·높이 증가·긴 메타정보·좁은 화면은 구현 제안과 추가 제품 검증으로 분리한다.
숨김 arrow는 이름24·원본16·저장 box19.2가 서로 다르며, 반환되지 않은 숨김 glyph 자식을 검사한 것으로 기록하지 않는다.

## 재사용·전달 근거

- [실측](../docs/agent-hub/design/references/message-user.figma.json)·변수 기록은3variants·23nodes·19styles·6instances와
  mode9records를 보존했다. 독립 재귀 대조에서 자식 좌표·layout·clip·paint/alias·visibility·props·source·텍스트 참조가 일치했다.
  직접 변수10개에서 alias closure18개·collection3개를 보존했다. icon modes는 크기이며 Dark mode가 아니다.
- agent의 Chip 원본은 `2079:11964`, Divider는 `2019:118`이다. 기존 Composer에서 실측한 같은 공용 leaf와
  색상·글꼴·padding·높이·원본 variant가 일치한다. Chip 폭과 라벨은 내용에 따라 다르며 보라색이 업무유형 workflow를 의미하지 않는다.
  Message나 Chip을 AgentHubAgentTypeChip 원본 재사용으로 바꾸어 기록하지 않았다.
- [조합 대조](../docs/agent-hub/design/references/message-user-composition.json)는 버블3개·공용 leaf2개·숨김 arrow3개·
  본문 속성 참조3개·예약 outer/inner·아이콘 geometry를 확인했다. 예약 안쪽은 chat과 시각이 같은 FRAME이며 INSTANCE 재사용이 아니다.
  `runtimeVerified`·`allStatesVerified`는false다.
- 독립 에이전트가 임시 snapshot에서 숨김 arrow를 노출하면 오류가 검출됐고, 예약 FRAME을 chat INSTANCE로 위장하면
  type/source 계약 오류2개가 검출됐다. 임시 파일 삭제 후 원본3refs의 SHA-256이 유지됐다.
- [자산 기록](../docs/agent-hub/design/references/message-user.assets.json)에 제공된12px 원본 SVG770bytes·SHA-256을 보존했다.
  native frame·두 도형·선0.75·round·#555가 일치한다. 기존20px 자산을 CSS로 강제 축소하거나 hidden arrow를 조작으로 추가하지 않는다.
- [신규 구현 안내](../docs/agent-hub/design/components/AgentHubUserMessage/implementation.md)는 기존 구현 조사→조합/신규 export,
  제안 데이터 API·plain text·DOM/CSS 배치와 내용 보존·접근성 검증을 연결한다. 실제 source/public export는 소비 제품에서 확인한다.
  Notification·AsyncContentState·ChatComposer를 같은 의미의 Message 구현으로 대체하지 않는다.
- 공개 dependency는 Chip·Divider·AgentHubIcon이다. Agent Hub20종·공용 포함71종이며 CMP55·PaaS51·공용off catalog0 격리를 유지한다.
  공용스킬은7개 그대로이고 제품 source/export는unmapped·공유 frontend patch는draft다. 공용 해제 시 이 상속 catalog도 자동 적용하지 않는다.
- `project.serengeti-cmp` 작업 트리는clean, HEAD `43648689aa3efef214118a69dde5eafdac30a338`을 유지했다. 제품과 Figma 문서를 수정하지 않았다.

## 최종 검사

- `npm run verify`는2653개 로컬 링크·공용51+솔루션24 계약·dependency graph·스킬7개·역할/솔루션9조합·schema3개와 namespace 격리를 통과했다.
  `npm test`26개와 `git diff --check`도 통과했다. 독립 리뷰에서 실측과 제안 API/줄바꿈 정책·발화자·예약 경로·live owner의 경계를 확인했다.
- 실제 TeamAI CLI0.27.0의 격리 init/pull에서 회사/공용/Agent Hub 문서·자산954파일이 원본 byte hash와 일치했다.
  Codex·Claude 공용스킬 각7개·공용hook을 확인했다. 공용 해제 후 각0개·공용hook 제외·회사/솔루션408파일 유지와
  기존 제품 소유 스킬 보존을 확인했다. 실제 사용자 홈·원격 게시·제품 source는 변경하지 않았다.

이 계약은 사용자 발화 표시의 세 정적 샘플에 한정된다. assistant/Markdown·송신 중/실패/성공·예약 실행 완료·편집/복사/피드백·
stream·대화 로그 알림/자동 스크롤·dark의 동작이나 시각을 보증하지 않는다. 예약 안내 문구는 예약 작업으로 보냈다는 표시이며
일반 배달 성공·예약 실행 성공으로 바꾸지 않는다. 문서·자산 전달을 실행 컴포넌트 구현 완료로 기록하지 않는다.
