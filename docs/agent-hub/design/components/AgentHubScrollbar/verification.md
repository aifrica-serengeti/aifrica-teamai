# AgentHubScrollbar — 검증

- SNB의 선택적 visibility hover는 hover/focus-within/drag·coarse pointer에서 노출되고 reduce에서는 즉시 반영되는지 확인합니다.
  기본 always를 사용하는 기존 Picker·Flyout·Session·Viewer의 표시를 바꾸지 않습니다. 두 모드 지원을 scroll/auto까지 완료한 것으로 기록하지 않습니다.

- [실측](../../references/scrollbar.figma.json)의 단일 COMPONENT `3155:20473`, child RECTANGLE `3155:20472`와 빈 props/variant/reactions를 확인합니다.
  INSTANCE·TEXT·SLOT·상태 enum·방향 enum이 제공됐다고 기록하지 않습니다.
- root11×180/FIXED·HORIZONTAL/gap0·padding left0/right1/top1/bottom0, radius0·opacity1·clipping false·overflow NONE을 대조합니다.
  fills/strokes/effects가 없으므로 선·배경·그림자를 추가하지 않습니다.
- thumb x3/y3·4×160/ABSOLUTE, radius9999·#DDD paint/node opacity1과 실제 stroke/effect 부재를 확인합니다.
  root padding을 절대 좌표에 중복 적용하지 않습니다.
- [변수 기록](../../references/scrollbar.variables.figma.json)의 color/scroll/default→gray/300 #DDD,
  radius/full→9999와 각 모서리 binding을 확인합니다. Light 외 상태를 유추하지 않습니다.
- 공용 기본 thumb4/r9999/inset3은 같고 교차축 비교 폭10px와 이 gutter11px는 다름을 확인합니다.
  오른쪽 잔여4px·아래17px를 endpoint 공식으로 사용하지 않습니다.
- 공용 실제 fill #555/30%와 달리 이 기본 paint는 #DDD/100%입니다.
  opacity를 다시30%로 낮추거나 전역 token·기존 Menu/Picker/Flyout을 일괄 교체하지 않습니다.
- 실제 viewport·thumb 길이/위치가 같은 native scroll owner를 따르는지 확인합니다.
  11px를 콘텐츠 viewport 폭으로,180/160px를 runtime 고정 높이로 쓰지 않습니다.
- 내용이 넘치지 않을 때 thumb가 없고, 짧은 track·긴 콘텐츠·크기 변화·폰트/이미지 로드 뒤 geometry가 유효한지 검사합니다.
  최소24px baseline을 실제 track보다 크게 강제하지 않습니다.
- thumb가 viewport의 형제로 배치되어 내용과 함께 이동하지 않고, 드래그의 Pointer capture·이동·종료·취소가 같은 viewport를 갱신하는지 확인합니다.
  휠·트랙패드·터치·중첩 스크롤·마지막 항목과 focus outline 접근도 검사합니다.
- 표시 timing과 방향을 채택했다면 hover/always/scroll/auto·800ms 해제·200ms 전환·허용 overflow 축을 실제 제품에서 확인합니다.
  이 기능과 hover/dark/focus/drag paint가 Figma에서 측정됐다고 기록하지 않습니다.
- 실제 keyboard 도달·방향키/PageUp/PageDown/Home/End·이름·focus·thumb 의미와 필요한 상태/대상 연결을 확인합니다.
  role/orientation만 있는 기존 예시를 완성된 접근성 검증으로 취급하지 않습니다.
- 공개 측정 callback·명시적 scrollTo·선택한 stickToEnd/상단 offset을 사용하는 경우, 읽던 위치·focus와 부모 owner의 계약이 유지되는지 검사합니다.
  새 콘텐츠·필터 변화마다 무조건 최하단/최상단으로 이동하지 않습니다.
- dark·focus·큰 글자·고대비·좁은 폭·긴 콘텐츠·reduced-motion·가로/양방향·추가 paint는 제품이 채택한 근거로 별도 검증합니다.
- [구현 안내](./implementation.md)와 제품 lint/typecheck/test/build·실제 render/input 검증 후 source/public export·token/part adapter만 로컬에 매핑합니다.
  그 전에는 `unmapped`/`draft`를 유지하며 serengeti 원본·공용 Scrollbar·기존 Menu·Picker를 수정하지 않습니다.

[공용·제품 비교](../../references/scrollbar-comparison.json)는 정적 문서·source·Figma 차이의 기록입니다.
실제 Agent Hub 스크롤·접근성·노출 상태·성능 검증이나 제품 구현 완료를 의미하지 않습니다.

채택 adapter는 공용 엔진과 단일 native viewport를 사용하는지, ref의 scrollTo/ensureVisible이 그 viewport만 조작하는지 확인합니다.
height/maxHeight 변경·가로/세로/both·내용 추가/삭제·반복 mount/unmount에서 observer·pointer capture·listener가 남지 않아야 합니다.
기본 fill과 hover fallback은 이 adapter에서만 #DDD로 유지하며 다른 사용처의 gutter·색상을 전역 변경하지 않습니다.
