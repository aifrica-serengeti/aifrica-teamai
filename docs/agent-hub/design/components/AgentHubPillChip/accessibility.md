# AgentHubPillChip — 접근성

용도와 시각 상태를 구분합니다. Figma의 hovered·pressed·selected만으로 상호작용 역할을 결정하지 않습니다.

- 정보 표시라면 공용 Chip처럼 텍스트 `span`으로 읽히게 하고 불필요한 button 역할·tab stop·선택 속성을 추가하지 않습니다.
- 실제 액션이라면 목적을 알 수 있는 이름을 가진 native button 등 제품의 기존 조작 primitive를 사용하고
  Tab·Enter/Space와 focus-visible을 확인합니다. CSS hover·pressed 색상만으로 키보드 조작을 대신하지 않습니다.
- 실제 선택 기능을 채택하면 그 모델에 맞는 의미와 상태를 노출합니다. toggle일 때의 `aria-pressed`와
  선택 목록의 selected/checked 의미를 임의로 섞지 않습니다. 선택 상태의 소유자는 기존 제품 계약을 따릅니다.
- selected와 enabled가 같은 외형이므로 색·모양만으로 선택 여부가 전달된다고 보증하지 않습니다.
  실제 사용 문맥에서 상태를 식별할 방법을 확인하고 필요한 디자인·설명 조정을 기록합니다.
- disabled로 채택한 `disalbed`는 실제 primitive의 입력 차단과 비활성 의미를 함께 연결합니다.
  `aria-disabled`나 회색 글자만 추가한 채 활성화 이벤트를 남기지 않습니다.
- 최대폭 안에서 라벨이 말줄임돼도 전체 이름은 접근성 트리에 남깁니다. sample `text`를 실제 이름으로 고정하거나
  tooltip만으로 전체 정보를 제공하지 않습니다.
- 원본에는 focus-visible 규격이 없습니다. 조작형으로 채택할 때는 기존 제품·공용의 해당 primitive focus 계약을 유지하고
  pill 외곽·부모 clipping·인접 요소에서 표시가 잘리지 않는지 검증합니다.
- 아이콘·제거 버튼은 이번 구조에 없습니다. 참조되지 않는 `Show icon` 속성에서 숨김 조작·추가 tab stop을 만들지 않습니다.

28px 시각 높이·원본 색상만으로 타깃 크기·대비·키보드·보조 기술 통과를 보증하지 않습니다.
실제 배경·긴 라벨·번역·확대와 제품에서 채택한 동작을 함께 확인합니다.
