# AgentHubPillChip — 검증

Figma Light mode 다섯 variant의 치수·글꼴·색상·테두리·자식 구조를 확인했습니다.
실제 Agent Hub 앱의 source/export·렌더링·동작은 아직 미검증입니다.

- enabled·hovered·pressed·selected·`disalbed` 다섯 원본 이름과 오타를 구분합니다.
  `disalbed`를 disabled 의미로 채택했는지 제품 매핑에서 확인하고 오타를 공개 API에 전파하지 않습니다.
- 높이28px·radius9999·px12/py4·max-width200px·HUG 폭인지 확인합니다.
  sample50px를 고정하거나 기존 AgentTypeChip의68px 고정 폭·업무 색상을 적용하지 않습니다.
- 라벨은 Pretendard SemiBold14/20px·600·자간0·왼쪽 정렬, 원본 x12/y4입니다.
  실제 border 때문에 외곽 치수나 텍스트 공간이 늘거나 줄지 않는지 확인합니다.
- 모든 상태에 실제1px INSIDE #DDDDDD border가 있고 shadow가 없는지 확인합니다.
  공용 Chip disabled의 투명 border·#EEEEEE 배경을 그대로 상속하지 않습니다.
- enabled·selected는 흰 배경·#1C1C1C 글자, hovered는#F8F8F8, pressed는#F4F4F4 배경인지 확인합니다.
  `disalbed`는 흰 배경·#AAAAAA 글자·동일 border이며 전체 opacity로 대체하지 않습니다.
- 각 variant의 자식은 TEXT 하나뿐입니다. 참조되지 않는 `Show icon` Boolean·gap3px를 근거로
  아이콘·제거 버튼·추가 여백을 만들지 않습니다.
- 긴 라벨·번역·200% 확대에서 한 줄 말줄임과 전체 이름 전달, 인접 요소의 간격을 확인합니다.
- 실제 용도를 먼저 확인합니다. 정보 표시에는 불필요한 선택·focus를 만들지 않고,
  조작형을 채택했다면 native 의미·키보드·focus-visible·중복 이벤트 방지·실제 disabled 차단을 검증합니다.
- 선택 기능이 있으면 enabled와 같은 시각만으로 상태가 충분히 식별되는지 확인하고 필요한 조정 근거를 남깁니다.
- dark·focus-visible·로딩·아이콘·제거·다른 크기와 실제 선택 동작을 이번 다섯 variant에서 검증한 것으로 기록하지 않습니다.
- 실제 제품의 source/public export를 확인한 후에만 로컬 mapping에 구현 상태를 기록합니다.
  문서·Figma 실측 전달만으로 `implemented`로 바꾸지 않습니다.
