# AgentHubSwitch — 접근성

공용 Switch의 의미·이름·값·키보드·focus·입력 차단 계약을 시각 확장 후에도 유지합니다.

- switch 의미를 제공하는 기존 primitive를 재사용하고 `role="switch"`와 실제 값에 맞는 `aria-checked`를 노출합니다.
  thumb는 장식이므로 별도 역할·이름·tab stop을 만들지 않습니다.
- 이 Figma 노드에는 라벨이 없습니다. 제품의 명확한 설정 이름을 label 또는 동등한 접근 가능한 이름으로 연결합니다.
  화면의 On 색상이나 thumb 위치만으로 설정 이름과 값을 전달하지 않습니다.
- Tab으로 이동하고 Space·Enter로 토글하는 공용 키보드 계약을 실제 primitive와 제품에서 확인합니다.
  wrapper의 click 처리와 primitive의 키보드 처리가 겹쳐 한 번의 조작에 두 번 토글되지 않게 합니다.
- 실제 disabled에서 포인터·키보드·변경 통지를 차단하고 사용 불가 상태를 보조 기술에 전달합니다.
  `aria-disabled`나 회색 표현만 바꾸는 방식으로 동작을 남기지 않습니다.
- read-only를 지원하면 변경 불가와 disabled를 구분합니다. 공용의 enabled 시각 유지 요구와 실제 입력 차단이 함께 지켜지는지 검증합니다.
- focus variant가 없어도 표시를 제거하지 않습니다. 공용의 1px semantic outline·1px offset을 유지하고 pill 모양·실제 surface 대비·부모 overflow를 확인합니다.
- 40×22px 시각 frame만으로 타깃 크기 충족을 보증하지 않습니다. 라벨 클릭 영역·주변 간격·제품의 hit area·zoom을 함께 확인합니다.
- 도움말·오류가 있으면 field wrapper에서 연결하고 값·이름·설명을 중복 읽지 않도록 확인합니다.

색상과 shadow의 원본 기록은 실제 제품의 대비나 접근성 통과를 뜻하지 않습니다.
light·추가 채택한 dark mode·disabled·read-only와 키보드 흐름은 소비 제품의 실제 배경과 구현에서 검증합니다.
