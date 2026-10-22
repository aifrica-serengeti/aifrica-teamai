# AgentHubSwitch — 검증

Figma Light mode 4종의 variant 속성·치수·색상·border·thumb 위치·그림자를 확인했습니다.
실제 Agent Hub 앱의 source/export·브라우저 동작은 아직 미검증입니다.

- `size=22` 한 크기에서 checked true/false와 enabled/disabled가 독립인 4종인지 확인합니다.
- track 40×22px 고정, radius 9999px의 pill 모양, thumb 18px 원형을 확인합니다.
  동일 모양인 공용 medium의 11px radius를 사용했다는 이유만으로 새 구현을 만들지 않습니다.
- 외형 기준 thumb y=2px, Off x=2px, On x=20px이며 이동거리 18px인지 확인합니다.
  CSS border와 Figma padding을 중복 적용해 3px 간격이 되거나 상태 전환 때 위치가 흔들리지 않는지 비교합니다.
- On enabled track만 `#3B82F6`인지 확인합니다. Off enabled는 `#8F8F8F`, disabled track은 On/Off 모두 `#EEEEEE`입니다.
- enabled thumb는 On/Off 모두 `#FFFFFF`, On disabled는 `#FFFFFF`, Off disabled는 `#8F8F8F`인지 확인합니다.
- 보이는 1px inside `#AAAAAA` track border는 Off disabled에만 있는지 확인합니다.
  `strokes: []`인 노드에 남은 0.7px strokeWeight를 외곽선으로 만들지 않습니다.
- 4종 thumb의 navy Raised 이중 그림자를 보존하고 track에는 그림자가 없는지 확인합니다.
- native switch 의미·라벨 연결·aria-checked·Tab·Space·Enter·중복 toggle 방지·실제 disabled 차단을 확인합니다.
- read-only·invalid를 지원하면 의미와 우선순위를 공용 계약대로 검증합니다. 미확인 Figma 스타일을 확인된 값으로 기록하지 않습니다.
- focus-visible의 1px outline·1px offset, 실제 배경 대비·hit area·라벨 클릭·zoom·clipping을 검사합니다.
- 모션을 적용했다면 속성별 전환과 실제 reduced-motion 대응을 확인합니다. dark·focus·loading 등 새 시각 값은 근거와 함께 정합니다.
- 검증한 source/public export만 제품의 로컬 mapping에 기록합니다. Figma JSON·SVG 전달이나 이 문서 존재를 구현 완료의 증거로 취급하지 않습니다.
