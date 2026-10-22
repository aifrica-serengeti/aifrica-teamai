# Agent Hub Divider 공용 재사용 독립 검증

검증일: 2026-10-21. 수집한 원본·변수·정규화 자료와 공용 문서 및 읽기 전용 CMP source를 비교했다.
이 감사는 Figma·공용 문서·제품 source·Git을 변경하지 않았다.

[비교 문서](../docs/agent-hub/design/divider.md)의 결론은 적절하다. 제공된 horizontal Light 시안은
공용과 시각 차이가 확인되지 않아 새 AgentHubDivider·스킬·override·계약을 추가하지 않는다.
요청3074:101330은 FRAME 보드이며 실제 대상은 하위 COMPONENT3155:20478과 line RECTANGLE3155:20477이다.

| 근거 | 확인한 값 |
| --- | --- |
| root | 168×17, FIXED/HUG, 세로 auto layout, 좌우0·위아래8px |
| line | x0/y8, 168×1, 가로 FILL/세로 FIXED, opaque #DDD |
| 표면·선·효과 | root fill 없음, 두 노드 실제 stroke/effect 없음, radius0·opacity1 |
| 구성 | 2노드·2스타일·0인스턴스, props{}, variantProperties null, reactions[] |
| 변수 | 직접 alias1개→전체 변수2개·컬렉션2개, color/border/default→gray/300 |

[실측](../docs/agent-hub/design/references/divider.figma.json)과 [변수](../docs/agent-hub/design/references/divider.variables.figma.json)를
원본과101항목 대조해 불일치0을 확인했다. child 좌표·치수·layout·선/corner·paint alpha·binding·
속성·두 노드 mode/reaction/transform과 전체 변수 값이 일치한다. 높이17=8+1+8이며 자식 하나의 저장 gap10은
추가 간격을 만들지 않는다. 168px는 샘플 폭이고 strokeWeight1만 보고 선을 중복 추가하지 않는다.

공용 horizontal의1px/#DDD/py8/전체17px와 같다. 세로·dark·240ms 전환·장식/의미·실제 source/export는
이번 시안의 검증 범위가 아니다. snapshot의 runtime/allStates/dark/vertical/motion 검증값은 모두 false다.

공용 예시와 달리 실제 CMP Divider.tsx의 className과 나머지 props는 inner Radix Separator에 전달된다.
로컬 설치 Radix1.1.15는 decorative에서 role="none", 의미 분리에서 role="separator"이며
aria-orientation은 vertical에서만 명시한다. 공용 문서의 ‘role 없음’을 정확한 DOM 출력으로 반복하지 않았다.
실제 Divider/global CSS에는 공용 문서가 설명한 전역 reduced-motion 해제가 확인되지 않아 제품 검증 대상으로 남겼다.

catalog loader로 Agent Hub44개·공용 포함95개·공용 off0개를 확인했다.
새 AgentHubDivider id는0개이고 공용 Divider는1개다. 공용 registry·스킬·first-use 계약은 이번 작업에서 변경하지 않았다.
솔루션/디자인/reference index와 조건부 연결을 확인했으며 공용 off 제품에 공용 문서·구현을 강제하지 않는다.
다른 source인2019:118·2874:45712와 기존 메뉴·glyph·dot을 일괄 교체하지 않고 source/export는 unmapped로 유지한다.
새 자산·검사 helper·테스트는 추가하지 않았다. 새 비교 문서에 추가 핵심 오류는 없다.

감사 문서까지 포함한 최종 `npm run verify`는 로컬 링크3,440개·공용51개+솔루션48개 계약·스킬7개·
역할/솔루션9조합·schema3개를 통과했고 `npm test`는50/50 통과했다.
`git diff --check`도 통과했으며 읽기 전용 CMP 원본 작업 트리는 clean이다.

격리한 실제 TeamAI CLI 전달에서 공용 채택 시1,222개 파일의 바이트 일치와 Codex·Claude 각각 공용 스킬7개·hook을 확인했다.
공용 해제 후 회사·Agent Hub 파일676개가 유지되고 공용 스킬은 각0개, frontend 공용 문서·shared hook은 제외됐다.
기존 제품 전용 스킬도 보존됐다. 이 결과는 파일 전달·공용 선택 검증이며 제품 Divider의 runtime 검증과 구분한다.
격리 CLI 기록은 `/private/var/folders/z9/556rb8p56sn7kfzn2x3rqh840000gn/T/aifrica-agent-hub-divider-delivery-2bt2butl/results.json`이다.
