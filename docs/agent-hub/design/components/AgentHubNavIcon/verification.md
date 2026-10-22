# AgentHubNavIcon — 검증

- set `2611:62007`의 icon enum4종·기본 home와 각 실제 COMPONENT ID를 [실측](../../references/snb.figma.json)에 맞춰 확인합니다.
- 전체28px frame·실제 채움 path·소수 좌표·#757575·opacity1·실제 stroke/effect 부재를 대조합니다.
  strokeWeight metadata를 새 선으로 그리거나 라이브러리 보라색 외곽선을 배포하지 않습니다.
- [자산 manifest](../../references/snb.assets.json)의 geometry·크기·paint·해시·원본과 제품 경로를 연결합니다.
  일반16/20/24px glyph 확대나 임시 URL로 대체하지 않습니다.
- 원본 neutral4종, standalone selected clock와 Rail selected home, 제품 색상 adapter의 제공 범위를 구분합니다.
  전체 glyph×4state·dark·disabled·모션을 검증했다고 확대하지 않습니다.
- glyph는 장식이며 host의 이름/current/expanded·focus·단일 callback을 대신하지 않는지 확인합니다.
- 기존 자산/export 검색·제품 render/입력 검사 후 실제 source/export만 로컬에 기록하고 `unmapped`/`draft`를 임의로 완료 처리하지 않습니다.
- 현재 채택은 하나의 neutral 원본 alpha mask에 `color 200ms ease`를 적용합니다. 네 glyph 모두 선택 진입·이탈의 중간 색을 확인하고
  mask URL·28px box·도형 불투명도가 바뀌지 않는지 확인합니다. 배경 모션만 확인하거나 `src` 교체를 색상 보간으로 간주하지 않습니다.
- 빠른 재선택·reduced-motion 변경·forced-colors에서 현재 상태를 읽을 수 있고 중복 glyph/접근성 이름·이전 상태 잔상이 없는지 확인합니다.
