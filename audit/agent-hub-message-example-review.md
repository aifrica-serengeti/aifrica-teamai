# Agent Hub Message Example 확장 검증

검증일: 2026-10-21. Figma file `cUKHT2PdHjAKRXZlzulnO5`의 `message/example` set `2320:28612`를
get_design_context 렌더링과 읽기 전용 Plugin API로 확인했다.
공용51개·기존 Agent Hub21개에 같은 예시 조작 계약이 없어
[AgentHubMessageExample](../docs/agent-hub/design/components/AgentHubMessageExample/README.md)를 추가했다.
기존 UserMessage의 발송된 사용자 발화·ChatComposer의 native 편집 입력과 의미를 구분했다.

## 실측과 의미 경계

| 항목 | 확인한 내용 |
| --- | --- |
| 구성 | enabled·hovered·pressed 세 variant, icon Boolean 기본true·가시성 연결 |
| geometry | 가로세로 HUG121×44px 샘플·radius12·px20/py12·gap4·border/shadow 없음·clipping=false |
| label | Pretendard Regular14/20px·400·#1C1C1C, 샘플 ‘message’57px |
| 배경 | enabled #EBF3FF·hovered #CCE0FF·pressed #99C2FF |
| 아이콘 | native arrow-right20 원본2199:23690·선1.25·round cap/join·#1C1C1C |
| 배치 | label x20/y12, glyph x81/y12, label57+gap4+glyph20+padding40=폭121 |

모든 예시는 icon=true다. icon=false는 Boolean과 visible 참조가 있지만 별도 렌더링을 실측하지 않았다.
구현에서는 glyph 자체를 조건부 제거하고 비어 있는 슬롯·gap을 남기지 않는다. label/화살표/패딩으로 계산한 샘플 폭을 고정하지 않는다.
pressed는 순간적인 조작 상태이며 selected·송신 완료·aria-pressed를 뜻하지 않는다.

## 증거와 재사용

- [실측](../docs/agent-hub/design/references/message-example.figma.json)과 변수 기록은3variants·15nodes·7styles·3instances·mode6records를 보존했다.
  독립 재귀 대조에서 치수·좌표·layout·clip·paint/alias·폰트·cap/join·source·visible 참조가 일치했다.
  직접 변수7개에서 alias closure12개·collection3개를 보존했다. icon modes는 크기이며 Dark mode가 아니다.
- 세 배경은 action/primary-subtle·primary-subtle-hovered·primary-subtle-pressed에 연결된다.
  AgentHubButton secondary의 default/hovered/pressed 색과 다르며, 글꼴도 Regular400으로 표준 버튼의600을 상속하지 않는다.
  root에는 TEXT property가 없고 제품의 label prop은 제안 API다.
- 실제 Button·Card·UserMessage 인스턴스는 없다. dependency Button은 native action·키보드·focus·disabled 의미의 참조 계약이며
  Figma 원본의 재사용을 뜻하지 않는다. 기존 제품이 정확한 variant/adapter를 지원하면 확장하고 없으면 좁은 새 export로 개발할 수 있다.
- [자산 기록](../docs/agent-hub/design/references/message-example.assets.json)은 main manifest의 같은 arrow20 source·path·SHA-256을 사용한다.
  SVG354bytes·native20·선1.25가 일치했으며 신규 SVG는 추가하지 않았다.
- [조합 대조](../docs/agent-hub/design/references/message-example-composition.json)는 세 상태의 배경을 원본 변수 alias로 다시 해석하고
  실제 hex와 비교했다. glyph source·native 크기·선·가시성 Boolean·내용 기반 폭/높이도 모두match다.
  Button 원본 재사용은false이고 `runtimeVerified`·`allStatesVerified`는false다.
- 독립 에이전트가 임시 snapshot에서 visible 속성 참조를 제거하면 오류를 검출했고, pressed hex만 잘못 바꾸면
  변수 해석 값과의 불일치를 검출했다. 임시 파일 삭제 후 원본4개 파일의 SHA-256이 유지됐다.
- [신규 구현 안내](../docs/agent-hub/design/components/AgentHubMessageExample/implementation.md)는 기존 구현 조사→adapter/신규 export,
  제안 API·한 native host·DOM/CSS와 조건부 glyph·제품 명령 연결·검증 순서를 제공한다.
  선택 후 draft 대체/추가·즉시 실행·URL 이동을 원본의 동작으로 확정하지 않는다. 실제 label과 prompt payload의 소유권을 분리한다.
- 공용 Button 의미와 실제 새 팔레트·Regular 글꼴·radius12를 함께 지키고, 기존 draft/IME/첨부/agent/project를 자동 초기화하지 않는다.
  키보드·focus·단일 callback을 유지하며 미제공 disabled·loading·dark·긴 문구·mobile는 제품 채택과 추가 검증으로 남긴다.
- 신규 직접 dependencies는 Button·AgentHubIcon이다. Agent Hub22·공용 포함73종이며 CMP55·PaaS51·공용off catalog0 격리를 유지한다.
  공용스킬7개·제품 source/export unmapped·공유 frontend patch draft를 유지했다.
- `project.serengeti-cmp` 작업 트리는clean, HEAD `43648689aa3efef214118a69dde5eafdac30a338`을 유지했다. 제품과 Figma 문서를 수정하지 않았다.

이 계약은 예시 문구 조작 UI의 정적 Light/icon-visible 세 구성이다. 실제 선택·송신·입력기 연결·보조 기술·반응형·
새 상태가 구현됐다는 뜻이 아니다. 소비 제품의 실제 source/public export와 검증 결과를 로컬 채택 설정에 기록한다.

## 최종 검증

- `npm run verify` 통과: 로컬 링크2740개, 공용51개·솔루션26개 계약과 의존성, 스킬7개,
  역할·솔루션9조합, 확장 schema3개, 문서 namespace 격리를 확인했다.
- `npm test` 30/30 통과. Message Example의 상태별 변수 해석·가시성 연결·내용 기반 geometry와
  정확한 기존 arrow-right 자산 대조를 포함한다.
- 독립 에이전트가 새7문서를 교차 검토했다. 실측과 제안 API, 제품 동작의 경계,
  아이콘 숨김·단일 실행·disabled·focus 계약에 추가 수정 사항은 없었다.
- 격리한 임시 제품에서 실제 `teamai-cli@0.27.0`으로 Codex·Claude 배포를 검증했다.
  공용 채택 시 문서·자산976개가 원본과 byte 단위로 일치하고 각 도구에 공용 스킬7개와 공용 hook이 전달됐다.
  해제 후에는 회사·Agent Hub 문서·자산430개만 유지되고 공용 문서·스킬·hook은 제외됐다.
  기존 제품 전용 스킬은 두 경우 모두 보존됐다. 실제 사용자 홈이나 제품 저장소에 설치하지 않았다.
- `git diff --check` 통과. `project.serengeti-cmp` 작업 트리는 계속 clean이며 이 변경은 커밋·push하지 않았다.
