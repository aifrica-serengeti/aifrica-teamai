# Agent Hub Elevation 확장 검증

검증일: 2026-10-20. Figma file `cUKHT2PdHjAKRXZlzulnO5`의 Elevation 보드 `3261:59766`을
get_design_context 렌더링과 읽기 전용 Plugin API로 확인했다.
결과는 [Agent Hub Elevation](../docs/agent-hub/design/foundations/Elevation.md)의 foundation 참조 계약이다.
컴포넌트 registry id나 별도 솔루션 스킬을 추가하지 않았다.

## 공용과 비교한 차이

| 항목 | Agent Hub 확인값과 공용 대비 |
| --- | --- |
| 레벨 | Sunken/Default/Raised/Mid/Overlay/Overflow 이름은 유지 |
| 네 shadow 레벨 | 공용 검정 single shadow 대신 #091E42 두 겹 DROP_SHADOW·spread0 |
| Raised | 0/0/blur1/.31 + 0/1/blur1/.10 |
| Mid | 0/0/blur1/.31 + 0/4/blur6/.15 |
| Overlay | 0/0/blur1/.31 + 0/8/blur12/.15 |
| Overflow | 0/0/blur1/.12 + 0/0/blur8/.16. 공용의 아래 방향 큰 shadow와 다름 |
| Default/Sunken | effects 없음·EffectStyle 연결 없음. Sunken은 #F8F8F8 배경이며 공용 inset shadow를 추가하지 않음 |
| 샘플 | 모두56×56/r8/border1 inside#DDD. Mid node opacity.9는 예시 레이어 값이며 effect alpha와 분리 |

공용 foundation 하단의 Calendar/Menu 전용 Mid·Switch thumb Raised는 이미 같은 navy 계열의 값을 사용한다.
일반 foundation과의 차이, 컴포넌트 전용 효과의 일치를 구분했다. 공용 Calendar CSS의 halo blur0/spread1과
이번 실측 blur1/spread0의 차이는 기존 AgentHubCalendar 계약을 유지한다.
같은 이름을 근거로 기존 component token·inset 상태 표시·z-index/portal/focus를 덮어쓰지 않는다.

## 검증 결과

- [실측 기록](../docs/agent-hub/design/references/elevation.figma.json)에 샘플6개·EffectStyle4개·각2층 effect의 배열과
  표면·border·opacity·권장 용도 원문을 보존했다. 표면 변수3개/collection1개는 외부 primitive Mode1이며 shadow의 변수 binding은 없다.
- 독립 서브 에이전트가 raw와 정규화의 좌표·크기·radius·paint/alias·opacity·effect 속성/배열·파생 CSS·usage 원문을
  재귀 대조해 누락·불일치를 찾지 못했다. dark의 별도 실측이나 실제 제품 token source는 확인하지 않았다.
- [기존 컴포넌트 대조](../docs/agent-hub/design/references/elevation-component-comparison.json)는 Calendar root1개와
  Switch thumb4개가 각각 Mid/Raised와 일치했다. 컴포넌트 opacity는 모두1이며 Mid sample.9를 상속하지 않는다.
  EffectStyle/샘플 대조6개도 일치하고, runtimeVerified는false다.
- 검증 helper는 non-null EffectStyle id가 누락되면 오류로 처리한다. Default/Sunken의 null 연결만 effects 없음으로 인정한다.
  독립 에이전트가 임시 snapshot의 Default style id를 잘못 바꾼 검사에서 누락 오류가 발생하고 기존 컴포넌트5개는 그대로 일치함을 확인했다.
  검사 후 원본 해시는 유지됐다. 최종 문서의 색상 모드 설명도 Elevation의 외부 Primitive Mode1을 별도로 명시했다.
- 디자인 시스템 스킬이 선택 솔루션의 foundation 진입점도 읽도록 연결했다. 공용 해제 시 조기 전환 규칙과
  native semantics·focus·상태 소유권을 유지한다. 실제 제품 tokens patch는 비어 있으며 공유 설정은draft다.
- `npm run verify`, `npm test`20개·스킬 frontmatter validator·`git diff --check`가 통과했다.
  기존 공용51+솔루션20 컴포넌트·스킬7개·역할/솔루션9조합·schema3개는 그대로다.
- loader는 Agent Hub67/off0·CMP55/off0·PaaS51/off0이다. Elevation을 가짜 컴포넌트로 등록하거나 다른 솔루션에 연결하지 않았다.
- 실제 TeamAI CLI0.27.0의 격리 init/pull에서 문서/자산912파일의 byte hash가 원본과 일치했고,
  Codex·Claude 공용스킬 각7개·공용hook을 확인했다. 공용 해제 후 각0개·공용hook 제외·회사/솔루션366파일 유지와
  제품 소유 스킬 보존을 확인했다. 실제 사용자 홈·원격 저장소는 변경하지 않았다.
- 원본 `project.serengeti-cmp` 작업 트리는clean이며 제품 코드·Figma를 수정하지 않았다.

CSS 이름은 복사용 참조이며 제품 구현이 존재한다는 뜻이 아니다. 사용처 표는 실제 컴포넌트 inventory가 아니며
Default surface 안의 thumb Raised·sticky header Overflow·hover Mid를 구분한다. 표면/부모/자식의 shadow 소유권,
focus·스크롤·clipping·실제 배경 대비와 dark는 consuming repository에서 검증한다.
