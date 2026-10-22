# Agent Hub Progress Alert 확장 검증

검증일: 2026-10-21. Figma file `cUKHT2PdHjAKRXZlzulnO5`의 `progress-alert` COMPONENT `3016:102212`를
get_design_context 렌더링과 읽기 전용 Plugin API로 확인했다.
공용51개·기존 Agent Hub20개에 같은 의미의 전용 계약이 없어
[AgentHubProgressAlert](../docs/agent-hub/design/components/AgentHubProgressAlert/README.md)를 추가했다.
이름으로 진행률 기능을 추론하지 않고 응답 중단 안내·다시시도·프롬프트 편집의 단일 시안 범위로 한정했다.

## 실측과 재사용

| 항목 | 확인한 내용 |
| --- | --- |
| 원본 | standalone COMPONENT, root properties={}·description 비어 있음·state enum 없음 |
| 외곽 | 640×46px·radius8·#F4F4F4·1px INSIDE #DDD·shadow 없음·clipping=false |
| 외곽 배치 | px12/py8·SPACE_BETWEEN·CENTER·gap12. border가 layout에 포함되어 실제 내용 x13·버튼 y9 |
| 안내 | icon20+gap4+제목14/20·600·#1C1C1C. 그룹153×20px·제목129px는 샘플 |
| 동작 | tertiary·28·enabled 버튼2개, 원본3109:144, 내부 label만 표시 |
| 버튼 geometry | radius4·white·1px INSIDE #DDD·px8/py4. label49/76 + padding16 = 폭65/92, 높이28 |
| 아이콘 | 기존 circle-alert/20 원본2898:23788·native20·1.25px round 선·#1C1C1C |

root의 `strokesIncludedInLayout`은true, 버튼은false다. 실제 CSS border를 버튼에 다시 더해 폭67/94·높이30으로 만들지 않는다.
반대로 root의 border 포함을 없애46px를44px로 줄이지 않는다. 양끝 정렬의 남는 공간·샘플 폭640·버튼 라벨 폭을 고정 제품 정책으로 쓰지 않는다.

## 증거와 의미 경계

- [실측](../docs/agent-hub/design/references/progress-alert.figma.json)과 변수 기록은12nodes·12styles·3instances·mode4records를 보존했다.
  독립 재귀 대조에서 좌표·layout·border 포함 여부·paint/alias·폰트·노 shadow·실제 source·props·label 참조가 일치했다.
  직접 변수10개에서 alias closure16개·collection3개를 보존했다. icon collection의 mode는 크기이며 Dark mode가 아니다.
- 두 버튼의 leading-icon·trailing-icon·keycap Boolean은false이며 자식은 label 한 개뿐이다.
  get_design_context에 포함된 기본 버튼 helper의 아이콘·keycap·Esc 표시는 실제 렌더링 자산이나 단축키가 아니다.
- [기존 자산 연결](../docs/agent-hub/design/references/progress-alert.assets.json)은 main manifest의 같은 원본·path·SHA-256을 사용한다.
  circle-alert SVG640bytes·native20·선1.25·도형·색상을 확인했으며 새 SVG는 추가하지 않았다.
- [조합 대조](../docs/agent-hub/design/references/progress-alert-composition.json)는 Button2개와 Icon1개를 독립 참조와 비교해 모두match다.
  root 높이46=button28+padding16+border2와 버튼의 label-only 폭을 검사했다. `runtimeVerified`·`allStatesVerified`는false다.
- 독립 에이전트가 임시 snapshot에서 retry leading-icon Boolean만true로 바꾸면 slot 계약 불일치를 검출했다.
  버튼 layout border를true로 바꾼 검사도 오류를 검출했다. 임시 파일 삭제 후 원본4개 파일의 SHA-256이 유지됐다.
- [신규 구현 안내](../docs/agent-hub/design/components/AgentHubProgressAlert/implementation.md)에 기존 구현 조사→조합/신규 export,
  제안 API·DOM/CSS와 inside border 보조 예시·제품 연결·검증 순서를 제공했다. 전체7문서는 한국어로 확인했다.
  root의 title/상태 API가 Figma에 이미 있는 것으로 기록하지 않았고 새 서버 요청·전역 알림 시스템을 만들지 않았다.
- retry/edit의 대상 response/request·재진입 차단·늦은 응답·draft 보존·편집 focus는 제품 owner가 소유한다.
  native type=button·단일 callback·독립 disabled를 유지하고 안내 등장만으로 focus를 이동하지 않는다.
- Notification의 Toast 스택/자동 닫기·Status enum·Spinner 회전·AsyncContentState timer/overlay를 자동 상속하지 않는다.
  실제 문맥이 live 안내 owner·urgency를 정하며 이름 alert만으로 role=alert·progressbar·취소·dismiss를 강제하지 않는다.
- 신규 직접 dependencies는 AgentHubButton·AgentHubIcon이다. Agent Hub21·공용 포함72종이며 CMP55·PaaS51·공용off catalog0 격리를 유지한다.
  공용스킬은7개 그대로이고 source/export는unmapped·공유 frontend patch는draft다.
- `project.serengeti-cmp` 작업 트리는clean, HEAD `43648689aa3efef214118a69dde5eafdac30a338`을 유지했다. 제품과 Figma 문서를 수정하지 않았다.

## 최종 검사

- `npm run verify`는2698개 로컬 링크·공용51+솔루션25 계약·dependency graph·스킬7개·역할/솔루션9조합·schema3개·namespace 격리를 통과했다.
  `npm test`28개와 `git diff --check`도 통과했다. 독립 리뷰에서7문서의 실측/제안 API·native 동작·focus/live·border 계산 경계를 확인했다.
- 실제 TeamAI CLI0.27.0의 격리 init/pull에서 회사/공용/Agent Hub 문서·자산965파일이 원본 byte hash와 일치했다.
  Codex·Claude 공용스킬 각7개·공용hook을 확인했다. 공용 해제 후 각0개·공용hook 제외·회사/솔루션419파일 유지와
  기존 제품 소유 스킬 보존을 확인했다. 실제 사용자 홈·원격 게시·제품 source는 변경하지 않았다.

이 계약은 중단 안내의 한 정적 Light 구성과 재사용 근거다. 실제 재시도 성공·프롬프트 편집·추가 loading/disabled·
응답 stream·대비/키보드/live 안내·긴 문구/좁은 화면·dark는 소비 제품에서 검증한다. 문서·자산 전달을 실행 컴포넌트 구현 완료로 기록하지 않는다.
