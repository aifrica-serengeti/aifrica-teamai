# Agent Hub Chip·Button 확장 검증

검증일: 2026-10-20. 기존 [아이콘 확장](./agent-hub-design-review.md)에 이어
[에이전트 유형 Chip](../docs/agent-hub/design/components/AgentHubAgentTypeChip/README.md)과
[Button](../docs/agent-hub/design/components/AgentHubButton/README.md)을 추가했다.
Figma는 읽기만 수행했으며 원본 제품과 실제 사용자 홈 설정을 수정하지 않았다.

## 확인한 근거

- Figma file `cUKHT2PdHjAKRXZlzulnO5`, Latest design 페이지.
- Chip node `3016:102468`: agent-types 4종. Button node `3025:25029`: 44종.
- get_design_context의 렌더링·코드와 Plugin API의 실제 geometry·paint·binding·typography를 대조했다.
- [실측 기록](../docs/agent-hub/design/references/README.md)에 48개 variant와 변수 66개의 alias/mode를 보존했다.
  Semantic에는 Light mode만 확인됐고 icon collection의 크기 mode를 다크로 해석하지 않았다.
- 별도 서브 에이전트가 324개 node, paint/token 바인딩 400개를 raw 응답과 대조했다.
  ghost alpha의 정상 반올림 외에 불일치가 없었다.

## 공용 대비 차이

| 대상 | 관찰과 적용 경계 |
| --- | --- |
| 유형 Chip | h20/radius4/px8/font12·16·600은 공용 small rounded와 같음. assistant 글자 #3B82F6, common-chat 글자 #1E232E는 공용 blue/default와 다름 |
| 유형별 폭 | assistant/workflow HUG, runtime/common-chat 고정68. 공용의 모든 Chip에 폭을 강제하지 않음 |
| Button radius | 공용4 고정 → Agent Hub 40px=8, 32px=6, 28/24px=4 |
| Button secondary | 공용 흰 배경·accent outline → Agent Hub 파란 채움·중립 글자·실제 외곽선 없음 |
| 크기별 요소 | 32px 아이콘16, ghost28 font12/16·600, ghost24 font14/20·400·padding4/2·gap4 |
| 상태·keycap | 44종만 지원 범위로 기록. keycap은28/ghost24에 존재하며 Figma Esc3개 예시는 실제 명령 등록이 아님 |
| 원본 예외 | secondary40pressed는 글자#1C1C1C·아이콘#FFF. 같은 상태의 다른 크기로 확대하거나 임의 통일하지 않음 |

같은 `Chip`/`Button` id를 덮어쓰지 않고 `AgentHubAgentTypeChip`/`AgentHubButton`을 등록했다.
기존 호환 구현을 재사용할 수 있으며 source/export는 `unmapped`, 제품 채택 설정은 `draft`다.
공용의 native semantics·focus·keyboard·disabled 의무는 유지한다. 미확인 dark/focus/loading 시각 값과
실제 제품의 시각·동작·접근성 통과를 확인했다고 주장하지 않는다.

## 검증 결과

- `npm run verify`: 로컬 링크, 필수 문서6개, 공용51+솔루션9개 계약, 스킬7개, 역할/솔루션9조합, schema3개 통과.
- `npm test`: 15개 통과. 새 두 계약의 dependency closure·다른 솔루션 격리·공용 해제 동작 포함.
- raw 응답과 JSON 48개 variant의 source ID·geometry·paint·radius와 변수 alias 400개 일치.
- 독립 catalog loader: Agent Hub 공용on56/off0, CMP55·PaaS51에 Agent Hub 신규 계약 없음.
- 실제 TeamAI CLI0.27.0의 격리 init/pull: Codex·Claude 공용 스킬 각7개, 문서810파일 byte hash 일치.
  공용 해제 후 각0개·공용 hook 제외·솔루션/회사 문서264파일 유지·제품 자체 스킬 보존.
- `git diff --check` 통과. 읽기 전용 `project.serengeti-cmp` 작업 트리는 clean이다.

위 CLI 검증은 현재 로컬 자료의 임시 Git snapshot을 사용했다. 원격 게시나 실제 Agent Hub 앱 적용을 뜻하지 않는다.
