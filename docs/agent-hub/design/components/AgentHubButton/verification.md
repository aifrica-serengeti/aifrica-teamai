# AgentHubButton — 검증

Figma의 44개 variant와 토큰 alias·원본 렌더링을 확인했습니다.
실제 Agent Hub 앱의 source/export·브라우저·상호작용은 아직 미검증입니다.

- 지원 표의 44개 조합만 참조하고, 미제공 24px primary나 40px ghost를 확인된 규격으로 만들지 않습니다.
- 40/32/28px radius 8/6/4와 ghost 24px radius 4, 크기별 font·icon·padding·gap을 확인합니다.
- primary·secondary·tertiary의 4상태와 ghost의 투명/5%/10% overlay를 밝은 배경과 다른 surface에서 비교합니다.
- tertiary만 1px 외곽선을 갖는지, secondary가 공용의 outline 스타일로 돌아가지 않는지 확인합니다.
- Figma 기록의 secondary·40·pressed 흰 아이콘과 [2026-10-21 채택 변경](./styles.md)의 currentColor를 구분합니다.
  채택 구현은40/32/28px 모두 pressed에서 라벨과 아이콘이 같은 색인지 확인하고 keycap의 별도 disabled 색상은 유지합니다.
- 긴 label·아이콘 없음/한쪽/양쪽·단축키 개수 변경·zoom에서 높이와 콘텐츠가 유지되는지 봅니다.
- keyboard·focus-visible·disabled·폼 type·실제 단축키 충돌·중복 요청을 검증합니다.
- dark/focus/loading의 미확인 시각 값은 제품에서 결정하고 근거를 남깁니다.
- 검증한 source/export만 로컬 구현 mapping에 기록합니다. snapshot이나 문서 배포는 구현 완료의 증거가 아닙니다.
- 색상 전환200ms ease·reduced-motion의 즉시 완료와 rapid hover/press 중 최종 색상을 확인합니다.
