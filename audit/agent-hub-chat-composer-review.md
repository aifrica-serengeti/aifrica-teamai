# Agent Hub Chat Composer 확장 검증

검증일: 2026-10-20. Figma file `cUKHT2PdHjAKRXZlzulnO5`의 `chat-composer` set `2611:69436`을
get_design_context 렌더링과 읽기 전용 Plugin API로 확인했다.
공용51개와 기존 Agent Hub18개에 독립 Composer 계약이 없어 가장 좁은 솔루션 범위의
[AgentHubChatComposer](../docs/agent-hub/design/components/AgentHubChatComposer/README.md)를 추가했다.
공용 스킬을 복제하지 않고 기존 디자인 시스템 스킬의 registry 탐색으로 연결했다.

## 확인한 구성

| 항목 | 실측과 계약 경계 |
| --- | --- |
| 상태 | enabled·focused·typing·agent-selected 네 정적 샘플. 실제 props/state 머신은 제품에서 분해 |
| 표면 | 768×58px·radius/full9999·white·1px INSIDE #DDD·strokesIncludedInLayout=true |
| 배치 | padding L8/R20/T12/B12, border 포함 row x9/y13·738×32. typing 세로 HUG·나머지 FIXED58 |
| 그림자 | 기존 Elevation Overflow와 같은 navy 두 겹: 0/0/blur1/.12 + 0/0/blur8/.16 |
| 입력 | Pretendard Regular16/24·400, placeholder #757575·value #1C1C1C. caret1×17은 디자인 장식 |
| 첨부·전송 | 32px 원형·24px glyph·1.5px round 선. 전송은 원본 hovered와 실제 contextual override를 구분 |
| 프로젝트 | 내부 FRAME102×28·원형·p8/6·gap4·label12/16/#555, ABSOLUTE x9/y62로 surface 밖 y90까지 확장 |
| 선택 에이전트 | common Chip rounded/small/enabled의 purple override·title14/20·Divider17×12·입력 조합. description은 숨김 |

focused에도 root의 파란 border 변화가 없다. 이 정적 시각을 근거로 native keyboard focus 표시를 제거하지 않는다.
프로젝트 선택 조작은 실제 layout footprint를 확보하고 입력·주변 콘텐츠와 겹치거나 clipping되지 않도록 한다.

## 재사용과 원본 연결

- leading plus4개는 `3104:20/default`다. send4개는 모두 `3104:21/hovered`를 재사용하며 glyph를 `2199:23680` arrow-up/24로 바꿨다.
  typing·agent-selected는 primary #3B82F6/white로 override된다. 해당 시각은 standalone state5와 같지만
  source identity를 state5로 바꾸거나 전역 state5에 전송 의미를 부여하지 않았다.
- selected Chip 원본은 `2079:11964`, Divider는 `2019:118`이다. Chip은 기존 workflow 유형과 시각이 일치하지만 그 원본의 재사용은 아니다.
  [조합 대조](../docs/agent-hub/design/references/chat-composer-composition.json)는 sourceReuse=false를 명시한다.
- folder는20px 원본 `2037:4537`의16px 인스턴스로 실제 stroke1·#555다. dedicated16px SVG를 보존해20px export를 CSS로 강제 축소하지 않는다.
  plus/up는 기존 exact-source24px 자산을 재사용하고 기록한 semantic 색상으로 연결한다.
- 공용 Textarea는 native 입력·label·controlled 값·IME·form 의미를 참고한다. 기존84px·radius4·독립 border/label 레이아웃을
  Composer 안에 중복 강제하지 않는다. Chip·Divider·첨부 버튼·아이콘을 조합하고 없는 Composer export는 소비 제품에서 새로 개발할 수 있다.

## 검증과 한계

- [실측](../docs/agent-hub/design/references/chat-composer.figma.json)·변수 기록은4variants·78nodes·33styles·22instances를 보존했다.
  독립 재귀 대조로 자식 좌표·visibility·폰트·paint/alias·effect 배열·props·source·mode26records 일치를 확인했다.
  직접 binding17개에서 alias closure27개·collection3개를 보존했다. icon modes는 크기이며 dark가 아니다.
- [자산 기록](../docs/agent-hub/design/references/chat-composer.assets.json)은3역할(기존2·신규1)의 native 크기·출처·SHA-256을 보존한다.
  전체1902bytes와 실제4개씩의 glyph callsite·geometry가 일치했다. 폴더의 원본 크기와 표시 크기를 분리했다.
- 조합 검사에서 circular action8개, Overflow4개, surface 밖 selector4개, workflow 시각참조1개가 일치했다.
  `runtimeVerified`·`allStatesVerified`는false다. 실제 업로드·송신·라우팅·검색·선택 팝업은 검증하지 않았다.
  독립 에이전트가 임시 snapshot의 typing send source를 state5로 바꾸거나 blue fill을 제거한 두 검사에서 각각 오류를 검출했다.
  임시 파일을 제거한 뒤 원본 snapshot5개의 SHA-256이 유지됐음을 확인했다.
- [구현 연결 안내](../docs/agent-hub/design/components/AgentHubChatComposer/implementation.md)에 기존 구현 조사→조합/신규 export,
  제안 API·상태 소유권·native DOM·box sizing·간격 재현과 제품 검증 순서를 제공했다.
  Enter/Shift+Enter·IME·여러 줄·높이 정책·첨부 제한·요청 중복·draft 초기화·stream/error는 제품 adapter의 명시 결정으로 남겼다.
  이 정적 샘플만으로 attachment preview·disabled/read-only·dark·좁은 화면의 새 시각을 확정하지 않았다.
- 신규 id1개로 Agent Hub19·공용 포함70종이다. 직접 dependencies는 Textarea·Chip·Divider·AgentHubAttachIconButton·AgentHubIcon이다.
  CMP55·PaaS51·공용off catalog0 격리를 유지하고 source/export는unmapped·공유patch는draft로 유지했다.
- `npm run verify`, `npm test`24개·`git diff --check`가 통과했다. 공용스킬7개·역할/솔루션9조합·schema3개를 유지한다.
- 실제 TeamAI CLI0.27.0 격리 init/pull에서 회사/공용/Agent Hub 문서·자산942파일이 원본 byte hash와 일치했다.
  Codex·Claude 공용스킬 각7개·공용hook을 확인했다. 공용 해제 후 각0개·공용hook 제외·회사/솔루션396파일 유지와
  제품 소유 스킬 보존을 확인했다. 실제 사용자 홈·원격 게시·제품 source는 변경하지 않았다.
- `project.serengeti-cmp`의 작업 트리는clean, HEAD `43648689aa3efef214118a69dde5eafdac30a338`을 유지했다. Figma 문서도 수정하지 않았다.

이 저장소의 결과는 새 Composer를 개발할 수 있는 참조 계약과 자산이다. 실제 제품 source/export·키보드·요청 흐름·반응형·
시각 일치를 확인한 뒤 제품 로컬 채택 설정에 연결하며, 정적 문서를 실행 컴포넌트 구현 완료로 기록하지 않는다.
