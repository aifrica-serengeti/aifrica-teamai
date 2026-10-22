# Agent Hub Calendar 확장 검증

검증일: 2026-10-20. Figma file `cUKHT2PdHjAKRXZlzulnO5`의 Calendar `3149:117371`,
날짜 셀 `3149:19150`을 get_design_context 렌더링과 읽기 전용 Plugin API로 확인했다.
이번 결과는 [Agent Hub Calendar](../docs/agent-hub/design/components/AgentHubCalendar/README.md)와
[날짜 셀](../docs/agent-hub/design/components/AgentHubCalendarDate/README.md)의 참조 계약이며 실행 앱 구현은 아니다.

## 공용과 비교한 결과

| 항목 | 확인한 값과 연결 기준 |
| --- | --- |
| 패널 | 공용 폭288·흰 배경·border1 #DDD·py4·gap4 유지, radius8→12 |
| shadow | 첫 그림자는 blur1/spread0이며 공용 CSS blur0/spread1과 다름. 둘째0/4/6/.15는 같음 |
| inside border | Figma child FILL 폭288·내부grid256 유지. CSS border로 content가2px 줄어드는 오류를 별도 명시 |
| 하단 | 원본 tertiary32/primary32 Button, px16/py4·radius6·14/20/600, 취소/선택 label-only·size32 keycap 없음 |
| 월 이동 | 원본 ghost32 IconButton·radius6·glyph20/선1.25, 기존 정확한 chevron SVG 재사용 |
| 월 헤더 | 공용처럼16/24 라벨·p2/4/2/12·radius4. 높이28의 내부 조합이며 독립 tiny TextButton과 구분 |
| 월 펼침 | 원본 ghost24 IconButton·glyph16/선1. 공용 triangle_down도 lucide ChevronDown 매핑이므로 이름만으로 도형 차이를 단정하지 않음 |
| 날짜 | 공용32px 선택 원·16/24 라벨·4px 오늘 점 유지. 오늘·선택 primary #3B82F6과 실제 상대 좌표 기록 |
| 범위 | default/today/selected/null4종과 일자 패널1개. null은 빈 자리. 샘플5주·높이362를 고정하지 않음 |

## 확인한 검증

- [실측 기록](../docs/agent-hub/design/references/README.md)에 panel136노드·43instance, 날짜12노드,
  스타일32개/7개와 변수29개·collection3개를 보존했다. root canvas/variant 나열 좌표는 제외하고 자식 상대 좌표는 유지했다.
- 독립 서브 에이전트가 raw와 모든 노드의 geometry·paint/alias·border·effects·text·instance source/variant/property·
  자식 순서/개수와 변수 closure를 재귀 대조했다. 값 누락·불일치를 찾지 못했다. 필수12문서와 registry도 재검토했다.
- [조합 결과](../docs/agent-hub/design/references/calendar-composition.json)는 Button2개·IconButton3개의
  원본ID·variant·기록된 치수/색상/radius/글꼴/border와 정확한 glyph source/asset을 독립 primitive snapshot과 대조해 모두 match다.
  이전 IconButton snapshot에 없는 gap은 현재 단일 glyph 조합의0px를 따로 검사하며 원본 대조값으로 추정하지 않는다.
- 자동 검사는 새 대조 결과와 저장 report의 일치도 확인한다. `npm test`16개와 `npm run verify`가 통과했다.
  verifier는 local link2418개·공용51+솔루션15계약·스킬7개·역할/솔루션9조합·schema3개를 확인했다.
- 새 id는 `AgentHubCalendar`, `AgentHubCalendarDate`다. loader는 Agent Hub62/off0·CMP55·PaaS51이며
  다른 솔루션에 새 id가 섞이지 않는다. source/export는 `unmapped`, 공유 채택 설정은 `draft`로 유지한다.
- 실제 TeamAI CLI0.27.0을 격리 환경에서 init/pull했다. 활성화 문서856파일의 byte hash가 원본과 일치하고
  Codex·Claude 공용스킬 각7개·공용hook을 확인했다. 공용 해제 후 각0개·공용hook 제외·회사/솔루션문서310파일 유지,
  제품 소유 스킬 보존을 확인했다. 실제 사용자 홈·원격 저장소는 변경하지 않았다.
- 변경한 design-system 스킬의 frontmatter 검사가 통과했고 문서 탐색 경로는 verify와 CLI mirror 대조로 확인했다.
- `git diff --check`가 통과하고 원본 `project.serengeti-cmp` 작업 트리는 clean이다.

월 헤더 조작 주체는 하나로 두고 공용의 상태 소유권·필요한4~6주·선택/확정/취소·focus·keyboard 의미를 유지한다.
이번 정적 day view 자료는 DatePicker 입력·월/연도·range·disabled·dark의 새 시각 계약이나 실제 앱의 렌더링·동작 통과를
증명하지 않는다. 원본 자산·컴포넌트는 consuming repository에서 재사용 가능성을 확인하고 실제 source/export를 로컬 매핑한다.
