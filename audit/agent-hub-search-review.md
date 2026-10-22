# Agent Hub Search 확장 검증

검증일: 2026-10-20. Figma file `cUKHT2PdHjAKRXZlzulnO5`, Search `2304:19748`을
get_design_context 렌더링과 읽기 전용 Plugin API로 확인했다.
결과는 [Search 확장](../docs/agent-hub/design/components/AgentHubSearch/README.md)의 참조 계약이다.

## 공용 대비 확인한 차이

| 항목 | Agent Hub 확인값 |
| --- | --- |
| 크기 | 48/32px·radius8/6, px12/8. 공용은28/32/36/40px·radius4 |
| 입력 | 48은font16/24·search20/선1.25·gap8, 32는font14/20·search16/선1·gap4. 공용은font14/20·search16/선2 |
| clear | 20px원·radius9999·p2·검정5%배경·x16/선1/#1C1C1C. 공용16px원·#555배경·whiteX9.6/선2.5와 다름 |
| 필터 강조 | 24/20px frame·radius4·filter16/선1, #EBF3FF배경·#3B82F6 glyph. 공용 Search에 없는 내부 조합 |
| 상태색 | enabled white/#DDD·focus/typing2pxinside#3B82F6. disabled #F8F8F8·placeholder/leading#757575(공용placeholder#AAA) |
| 내부 구조 | clear/filter 바깥은 FRAME, 독립 IconButton instance가 아님. 실제 instance는search/x/filter glyph만 |

실제12variant는 두 size 각각 filtered=false의4state·filtered=true의enabled/focused다.
Boolean filter는 unfiltered8frame의visible을 제어하며 기본false다. filtered=true4frame은 보이고 그 Boolean 참조가 없다.
숨겨진 부모 아래 자식visible=true·저장 trailing 폭·hidden배경을 실제 노출된 상태로 간주하지 않는다.

## 검증 결과

- [실측 기록](../docs/agent-hub/design/references/README.md)에12종·148노드·26glyph instance·8visibility 참조,
  스타일46개·변수34개/collection3개와 alias/mode를 보존했다. root canvas 나열 위치만 제외하고 자식 상대 좌표를 유지했다.
- 독립 서브 에이전트가 raw와 정규화 전체를 재귀 대조해 치수·좌표·paint/alpha·binding·radius·border·effects·text·instance·
  자식 순서/개수·변수 closure에서 누락·불일치를 찾지 못했다. Search6문서와 registry의 핵심 계약도 검토했다.
  typing을 Boolean처럼 표현한 문구는 enum 시각 상태로 고쳤고 read-only의 focus/ring 경계를 공용 Input과 맞췄다.
- 기존 manifest에 정확한 glyph source4개가 있고 새 자산은 필요하지 않았다. 자동 검사로 모든 Search instance의 source·
  로컬 파일·native 크기·glyph 선이 기존 자산과 일치함을 확인했다. 조작 wrapper가 독립 IconButton과 일치한다고 표시하지 않았다.
- 공용 스킬7개 구조를 유지하고 선택 솔루션 registry에 `AgentHubSearch`를 추가했다. loader는Agent Hub63/off0·CMP55/off0·PaaS51/off0이며
  다른 솔루션에 Search 추가 계약이 섞이지 않는다. source/export는unmapped, 공유 frontend 설정은draft다.
- `npm run verify`, `npm test`17개와 `git diff --check`가 통과했다. 필수6문서·공용/솔루션 의존성·역할 격리·schema도 확인했다.
- 최종 공유 문서를 실제 TeamAI CLI0.27.0의 격리 init/pull로 확인했다. 활성 문서864파일의byte hash가 원본과 같고
  Codex·Claude 공용스킬 각7개·공용hook이 전달됐다. 공용 해제 후 각0개·공용hook 제외·회사/솔루션문서318파일 유지와
  제품 소유 스킬 보존을 확인했다. 실제 사용자 홈·원격 저장소는 변경하지 않았다.
- 원본 `project.serengeti-cmp` 작업 트리는clean이며 제품 코드·Figma를 수정하지 않았다.

검색 적용·Enter/IME·debounce·필터 API는 제품/페이지가 소유한다. native 입력·controlled/uncontrolled clear·read-only 차단·
label·focus/keyboard를 유지하며 디자인용 caret은 native caret으로 구현한다. 공용 Input의 상태/border 로직을 복제하지 않는다.
filtered+typing/disabled·filled/unfocused·read-only/invalid·dark·clear/filter hover/pressed/focus-visible의 새 시각 값과
실제 앱 렌더링·검색 동작·접근성 통과는 별도 제품 검증 대상이다. TeamAI 자료 전달을 실행 구현 완료로 표시하지 않는다.
