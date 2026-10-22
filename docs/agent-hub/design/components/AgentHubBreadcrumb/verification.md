# AgentHubBreadcrumb — 검증

Figma slash·arrow 두 구성의 Item10개와 보이는 Separator8개, 치수·글꼴·변수 override를 확인했습니다.
실제 Agent Hub 앱의 source/export·렌더링·라우팅·축약은 미검증입니다.
[조합 대조 기록](../../references/breadcrumb-composition.json)은 내부 구분자8개의 독립 Separator 규격 일치를 기록하며,
실제 메뉴·라우팅·전체 상태의 동작 검증을 뜻하지 않습니다.

- 두 구성의 Item·현재 라벨이16/24px·400·자간0·#1C1C1C인지 확인합니다. 공용 상위 경로 기본 #757575가 섞이지 않아야 합니다.
- root·Item gap0, 실제 bg·border·shadow 없음·radius0인지 확인합니다. component set의 보라색 테두리·radius5를 화면 스타일로 옮기지 않습니다.
- Item 원본 `2372:36927`의 표시 Boolean은 각 앞 네 개true·마지막false이며 현재 위치 뒤 구분자가 없는지 확인합니다.
- slash는 원본 `2372:36931`의 로컬 semantic override와 요청한 Separator slash를 구분해 기록합니다.
  arrow는 `2427:25428`과 정확한 로컬 SVG를 대조합니다. 생성 코드의 잘못된 slash 치환을 그대로 사용하지 않습니다.
- 구분자의 좌우8px 간격을 한 번만 적용합니다. full-frame SVG 위에 padding이나 공용 gap을 중복 추가하지 않습니다.
- 샘플 폭315/313.22998046875px·다섯 라벨을 고정 정책으로 쓰지 않고 실제 라벨·글꼴·구분자 폭에 맞춰 측정합니다.
- 공용의 현재 위치 비상호작용·aria-current, 상위 경로 Link·Tab·Enter·hover/pressed 밑줄·focus outline을 유지하는지 확인합니다.
- 축약을 채택했다면 root/current 보존, 중간 항목 Menu·원래 순서·이동 adapter·Escape·focus 복원과 리사이즈를 실제 제품에서 검증합니다.
- 폰트 로드 전후·긴 번역·좁은 폭·200% 확대에서 현재 위치와 focus가 가려지지 않는지 확인합니다.
- 이 Breadcrumb set에 없는 dash·overflow 버튼 시각·dark·hover/pressed/focus variant를 검증 완료로 표시하지 않습니다.
- 실제 source/public export를 확인한 뒤 제품 로컬 mapping을 채웁니다. 이 문서·Figma 실측만으로 `implemented`로 바꾸지 않습니다.
- hover·pressed·release에서 underline 자체는 유지되고 text-decoration-color만 transparent↔currentColor로200ms ease 전환하는지 검사합니다.
  현재 위치에는 밑줄이 없고 reduced-motion에서는 즉시 최종 색상을 표시해야 합니다. 이 동작은 공용 계약의 복원이며 새 Figma 측정값이 아닙니다.
