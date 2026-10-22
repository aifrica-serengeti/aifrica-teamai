# Agent Hub Pill·Filter Chip·Group 확장 검증

검증일: 2026-10-20. Figma file `cUKHT2PdHjAKRXZlzulnO5`의 `2427:25194`, `3092:25329`, `3099:25232`를
get_design_context 렌더링과 읽기 전용 Plugin API로 확인했다. 결과는 [Agent Hub 디자인 확장](../docs/agent-hub/design/README.md)의
세 참조 계약이며 실행 앱 구현은 아니다.

## 공용과 비교한 결과

| 계약 | 확인한 차이와 경계 |
| --- | --- |
| Pill Chip | 공용20/24 대신28px·px12·14/20/600·radius9999·실제1pxinside#DDD. maxW200·HUG50은 구분 |
| Pill 상태 | hover#F8F8F8·pressed#F4F4F4, enabled와selected는 같은white/#1C1C1C. disalbed는 원본 오타·white/#AAA |
| Pill 구조 | 텍스트만 있음. Show icon=true 기본값은 자식/참조가 없어 지원 아이콘 근거가 아님. 용도·선택 API 미확정 |
| Filter Chip | 정보 표시용 공용Chip과 별도의 선택 계약. 높이28/32/36·px10/12/14·gap4/4/6·14/20/600 |
| Filter 상태 | 선택 enabled/hover/pressed는#EBF3FF/#CCE0FF/#99C2FF·라벨#1C1C1C·실제border없음. 선택disabled는#F4F4F4/#AAA/border1 |
| Filter 선/폭 | strokesIncludedInLayout=true. 미선택/disabled47/51/55px 대 선택45/49/53px로 내용 기반 폭2px차이. Pill의선제외layout과구분 |
| Filter slot | leading/trailing/count 모두 기본false. 저장count는Inter600·10/16,11/18,12/20, 높이/minW16/18/20·px5·radius9999 |
| Filter 정의 | 실제24종에는focused없음·size기본sm. description의focused·md기본과 구분하며 실제focus의무는유지 |
| Group | gap8·hug/wrap/scroll3종, wrap줄간격8. md/enabled6개·첫선택·라벨‘전체’는샘플 |
| Group scroll/fade | 실제overflowDirection NONE·clips true. 우측absolute48px fade·white alpha0→1은정적참조이며 실제scroll은제품에서연결 |

기존 AgentHubAgentTypeChip의 업무유형4종·고정폭·색상과 새 계약을 합치지 않았다.
`AgentHubChip` 별칭은 기존 유형계약에 유지하고 새 id `AgentHubPillChip`, `AgentHubFilterChip`, `AgentHubFilterChipGroup`을 등록했다.
공용 Chip 본체의 정보 표시 API를 변경하지 않으며 필터 선택은 새 계약의 native 조작·호출자 소유권으로 연결한다.

## 검증 결과

- [실측 기록](../docs/agent-hub/design/references/README.md)에32variants·194nodes·60styles·66instances와 변수34개/collection2개를 보존했다.
  Pill5/10/5/0, Filter24/144/47/48, Group3/40/8/18이며 root canvas 나열 좌표만 제외했다.
- 독립 서브 에이전트가 raw와 전체geometry·자식좌표·wrap/overflow/constraints·strokesIncludedInLayout·paint/gradient·alpha·font·
  count font·property 참조·instance 원본·변수closure를 재귀 대조해 불일치/누락을 찾지 못했다. cap/join도 normalized border에 보존했다.
- Filter의 직접 숨김72개와 숨긴 count의 자식까지 포함한 실효숨김96개를 구분했다. 숨김slot의 저장값을 켠 조합의 렌더검증으로 표시하지 않았다.
- [group 조합 결과](../docs/agent-hub/design/references/filter-chip-composition.json)는18개 모두 독립 Filter Chip 원본의
  variant·치수·padding/gap·border·색상·글꼴·라벨좌표와 숨김override가 일치했다. 실제앱/전체상태 검증값은false다.
- 기본filter/16·chevron-down/16은 기존로컬자산으로 닫혀 있다. 자동검사는원본ID·파일·native frame크기를 확인하며
  숨긴glyph의 실제켜진색상이나표시위치를검증했다고표시하지않는다. 별도그림자산이나스킬복제를추가하지않았다.
- 세컴포넌트의필수18문서와탐색경로·registry·기존별칭을확인했다. loader는Agent Hub66/off0·CMP55/off0·PaaS51/off0이며
  선택하지않은솔루션에새id가섞이지않는다. source/export는unmapped·공유설정은draft다.
- `npm run verify`, `npm test`18개와 `git diff --check`가통과했다. 역할/솔루션9조합·schema3개·공용스킬7개구조를유지했다.
- 실제TeamAI CLI0.27.0을격리환경에서init/pull했다. 활성화문서887파일byte hash가원본과같고Codex·Claude공용스킬각7개·공용hook이전달됐다.
  공용해제후각0개·공용hook제외·회사/솔루션문서341파일유지·제품소유스킬보존을확인했다. 실제사용자홈·원격저장소는변경하지않았다.
- 원본 `project.serengeti-cmp` 작업트리는clean이며 제품코드·Figma를수정하지않았다.

실제선택·필터조회·single/multi·제거·popup·focus·keyboard·스크롤·대비와slot활성조합·dark의검증은소비제품이소유한다.
Figma설명과실제정의차이를기록하고없는focusedvariant·선택표현을실측값으로추가하지않았다.
