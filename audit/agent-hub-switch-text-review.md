# Agent Hub Switch·TextButton 확장 검증

검증일: 2026-10-20. 대상은 Figma file `cUKHT2PdHjAKRXZlzulnO5`의 Switch `3145:17067`,
TextButton `2427:25177`이다. get_design_context의 렌더링과 읽기 전용 Plugin API로
geometry·paint·변수·glyph·visible/hidden·thumb 그림자를 확인했다.

## 공용 대비 확인

| 항목 | 같은 점과 연결할 차이 |
| --- | --- |
| Switch | 공용 medium의40×22 track·18 thumb·외곽gap2·travel18·중립/disabled색·Raised shadow와 같음 |
| Switch On | enabled track에#3B82F6을 솔루션 범위로 매핑. 공용/전체 테마 accent를 변경하지 않음 |
| Switch radius | 원본 radius/full9999와 공용11은 이 frame에서 같은 pill. 표현 차이만으로 새 구현을 만들지 않음 |
| Switch border | Off disabled에만 실제1pxinside#AAA. CSS border+padding2 중복으로thumb좌표가 바뀌지 않게 기록 |
| Switch state | checked true/false와 enabled/disabled는 독립. 생성된 boolean-state/SVG prototype을 실제 구현으로 취급하지 않음 |
| TextButton | 공용 tiny의h24/r4/p4/gap2/font12·16·600·상태색과 같음 |
| TextButton glyph | 보이는 trailing은16px/선1. 공용tiny14px/선1.25와 다름. source2199:23721의 기존 로컬SVG 재사용 |
| TextButton 숨김 | 14px System icon은4상태모두visible=false. leading기능·레이아웃·새자산의존성으로 해석하지 않음 |

## 검증 결과

- [실측 기록](../docs/agent-hub/design/references/README.md)에 Switch4조합·TextButton4상태와 변수26개를 보존했다.
  root geometry·radius·paint·thumb위치·visible/hidden과23개 색상 binding의 alias가 원본과 일치했다.
- 독립 서브 에이전트가32개 node의 위치·치수·radius·색상·effects·text·glyph와 변수26개/collection3개를
  raw 응답과 재귀 비교해 불일치를 찾지 못했다. 12개 문서의 미확인 범위와 구현 표기도 대조했다.
- [추가 catalog](../docs/agent-hub/design/component-registry.json)는 고유id `AgentHubSwitch`, `AgentHubTextButton`을 사용한다.
  공용51+Agent Hub9=60이며 source/export는`unmapped`, 제품 채택 설정은`draft`다.
- 실제 loader에서 AgentHub60/off0·CMP55/off0·PaaS51/off0 및 다른 솔루션으로의 신규id 유입 없음을 확인했다.
- `npm run verify`, `npm test`15개, `git diff --check`가 통과했다.
- 실제 TeamAI CLI0.27.0의 격리 init/pull에서 문서840파일 byte hash 일치, Codex·Claude 공용스킬 각7개를 확인했다.
  공용 해제 후 각0개·공용hook 제외·회사/솔루션문서294파일 유지·제품 자체스킬 보존을 확인했다.
- 원본`project.serengeti-cmp` 작업 트리는 clean이며 실제 사용자 홈 설정·제품 코드·Figma를 수정하지 않았다.

공용 native semantics·이름·checked owner·keyboard·focus·disabled/read-only 의미는 유지한다.
미제공 dark/focus/loading/invalid의 시각 값과 실제 앱의 렌더링·동작·접근성 통과는 별도 제품 검증 대상이다.
현재 로컬 자료의 임시 Git snapshot으로 배포를 검사했으며 원격 게시나 제품 구현 완료를 뜻하지 않는다.
