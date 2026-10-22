# Agent Hub 가이드·스킬·React fixture 보강 검증

2026-10-21 승인 계획을 기준으로 공용 원본과 `test/agent-hub-component-test`를 함께 보강했습니다.
`serengeti-cmp`는 읽기 전용 비교 근거로 사용했습니다. 실제 Agent Hub 제품 배포나 공용51종 전체 API 완료를 뜻하지 않습니다.

## 채택 경계

- [현재 상태·모션·스크롤 계약](../docs/agent-hub/design/motion.md)은 Figma 실측, 공용 계승, 사용자 채택 변경, 신규 모션 제안을 구분합니다.
- 기존 raw Figma JSON과 전체 Box+Mark 자산은 보존했습니다. Checkbox Mark-only6종을 원본에서 별도 export하고 출처·배치·SHA256을 기록했습니다.
- 기존 design-system/workflow 스킬과 Agent Hub 규칙의 탐색 절차를 보강했습니다. 전용 스킬을 복제하지 않았습니다.
- 공용을 채택한 소비 앱은 solution/local export→common registry의 의미·별칭·직접 의존성→공용 첫 구현→solution 조합 순서를 따릅니다.
- 공용 behavior32종과 Spinner 접근성의 전역 reduced-motion 가정을 소비 앱 실물 확인·scoped 대체 처리로 교정했습니다.
- 폼 adapter3종으로 Agent Hub 계약은56→59종입니다. 실제 제품 registry는 unmapped/draft를 유지합니다.

## 구현과 확인

| 영역 | 확인한 결과 | 근거 |
| --- | --- | --- |
| Search32/48 | 내부 outline/shadow 없음, 외곽 focus 단일 소유, clear 복귀·별도 focus·read-only 유지 | [primitive QA](../test/agent-hub-component-test/evidence/primitives-interaction.json) |
| Secondary / Filter | 각 크기 pressed icon/currentColor 검정 유지, 선택 전후 폭·이웃 좌표 변화0 | [primitive QA](../test/agent-hub-component-test/evidence/primitives-interaction.json) |
| Checkbox / Breadcrumb | Mark160/120ms·native input 유지·빠른 mixed 잔상 없음, underline200ms·현재 항목 비상호작용 | [primitive QA](../test/agent-hub-component-test/evidence/primitives-interaction.json) |
| Calendar / Card | 같은 날짜 원 DOM의200ms 색상 전환, Card5종 상태 전환·AH disabled 시각 유지 | [collections QA](../test/agent-hub-component-test/evidence/collections-scroll-motion.json) |
| Picker / Flyout | 목록/content만 scroll, 추천 y21/69/89/109·Footer416, Flyout280×398·Header y5/h54·Footer y365/h33·평면14행 | [collections QA](../test/agent-hub-component-test/evidence/collections-scroll-motion.json) |
| ScrollArea | Picker/Flyout/Session/Viewer wheel·실제 thumb drag·resize/복원, 고정 영역 유지·native 중복 없음 | [엔진 회귀](../test/agent-hub-component-test/evidence/scroll-engine-interaction.json) |
| Flyout shell | 외부 scrollIntoView에도 shell scrollTop0·Header5·Footer365, content만 이동 | [최종 clip 채택](../test/agent-hub-component-test/evidence/flyout-clip-final.json) |
| Composer / Thinking / halo | 내부 focus 제거·외곽/버튼 분리, 글자20% 밝은 띠 LTR·고정 중심 halo, 실제 중간 프레임 확인 | [모션 QA](../test/agent-hub-component-test/evidence/conversation-motion.json) |
| Session / Viewer | 기본 HUG934/154 보존, 제한560 내부 scroll·회전·250ms disclosure·닫힘 inert, Viewer header34 고정 | [disclosure](../test/agent-hub-component-test/evidence/conversation-disclosure.json), [Viewer](../test/agent-hub-component-test/evidence/viewer-scroll.json) |
| Header / SNB / Dialog |200ms 상태/CSS glyph crossfade, 프로젝트 자식3행/닫힌 폴더, Dialog100ms 중간 opacity/scale와 exit 후 focus 복귀 | [shell QA](../test/agent-hub-component-test/evidence/shell-motion-geometry.json), [수명 회귀](../test/agent-hub-component-test/evidence/dialog-lifecycle.json) |
| Dialog 폼 | input40/r8·textarea140=103+37·빈도card50/실제ghost24·label gap2, required/error/read-only/disabled | [최종 geometry](../test/agent-hub-component-test/evidence/final-dialog-adoption.json), [상태](../test/agent-hub-component-test/evidence/forms-state.json) |
| 폼 공개 API | 지정id, 외부 invalid·설명 병합, options 축소/빈 목록, popup 내부 Escape가 Dialog를 닫지 않음 | [별도 에이전트 재검증](../test/agent-hub-component-test/evidence/forms-api-review.json) |
| 감소·강제 색상·인쇄 | 정상 모드의 shimmer/halo를 먼저 확인한 뒤 각 모드에서 반복 animation:none·display:none | [독립 모드 검사](../test/agent-hub-component-test/evidence/motion-media-final.json) |

스크롤 엔진은 native viewport 한 곳과 실제 metrics/ResizeObserver를 사용합니다. Agent Hub skin은4px/11px/inset3/r9999/#DDD이고
source보다 줄어드는 행 너비는 runtime gutter 채택으로 문서화했습니다. Flyout source content의 Footer 겹침은 정적 측정으로 남기고 실제 viewport만 줄였습니다.
신규 Mark160/120·shimmer1800·halo1600은 Figma 측정값으로 표시하지 않았습니다.

## 전달과 처음 사용

실제 TeamAI CLI0.27.0으로 현재 작업본의 격리 Git snapshot을 init/pull/doctor했습니다.
문서·자산1,399개 byte 일치, Codex/Claude 공용 스킬 각7종과 실제 선택 config를 확인했습니다.
[전달 증거](../test/agent-hub-component-test/evidence/teamai-delivery.json), [공용 on/off](../test/agent-hub-component-test/evidence/teamai-optout.json).

공용 off에서는 frontend 문서·공용 hook이 없고 두 도구의 공용 스킬이0종입니다. 기존 로컬 스킬은 유지됩니다.
독립 에이전트에게 입력 요소 목록 없이 ‘Agent Hub 예약 Dialog 구현’을 요청한 읽기 전용 시나리오에서도
공용 control과 직접 의존성 탐색→폼 adapter→선택 recipe 조합으로 이어졌습니다.
발견한 의존 링크 누락·문서 책임 혼합·Select 방향키 출처·recipe 범위·modal 엔진 경계를 수정한 최종본에서 차단 모순은 없었습니다.
[첫 사용 검증](../test/agent-hub-component-test/evidence/skill-first-use.json).

## 완료 범위

React fixture의 실제 source/export59개와 원본 자산330개를 검사했습니다. `component-registry.json`의 commonAdapters4종은
Input/textarea native control·단일 Select·ScrollArea의 부분 구현 범위를 기록합니다. Select 검색/다중 선택은 공개하지 않습니다.
대표 geometry·상호작용·중간 모션을 검증했으며 전체 미제공 상태/dark/mobile pixel matrix나 실제 예약 API·배포를 검증한 것은 아닙니다.

최종 검사: 원본 `npm run verify`·`npm test`(56개), fixture `verify:contracts`·`typecheck`·`test`·`format:check`·`build`.
