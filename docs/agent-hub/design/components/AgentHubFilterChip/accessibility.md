# AgentHubFilterChip — 접근성

공용 Chip의 정보 표시용 span에 click만 추가하지 않습니다. 실제 선택·팝업·제거 의미에 맞는 조작 primitive를 사용합니다.

- 단순 토글은 native button·`type="button"`·접근성 이름·`aria-pressed`와 Tab·Enter/Space를 연결합니다.
  단일 radio 모델을 채택한 group은 radio/checked와 그 keyboard 모델을 일관되게 사용합니다. 두 의미를 중복 부여하지 않습니다.
- 선택은 색 외에 실제 상태 속성으로도 전달합니다. selected+disabled에서도 적용 상태가 남아 있음을 표현하고
  실제 변경을 차단합니다. 포인터 스타일만으로 비활성화하지 않습니다.
- 긴 라벨을 시각적으로 말줄임해도 전체 이름을 읽을 수 있어야 합니다. 원본 ‘전체’와 count ‘3’을 접근성 이름에 고정하지 않습니다.
- leading/trailing glyph는 소유 조작이 제공하는 이름과 중복 읽히지 않게 장식 처리합니다.
  count는 의미를 설명하고 중복 낭독·불필요한 tab stop을 만들지 않습니다. 숨긴 slot은 접근성 트리에서도 노출하지 않습니다.
- 드롭다운은 실제 열림 상태의 expanded/controls와 focus 이동·닫기·복원을 연결합니다.
  제거는 해당 조건을 알 수 있는 이름을 제공하고, 그룹에서 제거 후 적절한 다음 위치로 focus를 옮깁니다.
  선택과 제거 button을 중첩하지 않습니다.
- Figma에 focused variant가 없어도 keyboard focus-visible을 제거하지 않습니다. 실제 조작 primitive의
  semantic outline·offset을 채택하고 border·선택 배경·그룹 clipping에 가려지지 않는지 확인합니다.
  이 값은 Figma에서 실측한 focus 값으로 표시하지 않습니다.
- 모든 크기에서 실제 배경 대비·타깃 크기·인접 간격·확대·긴 번역을 제품에서 확인합니다.
  작은 count의 흰색/#3B82F6 등 조합을 원본값이라는 이유로 대비 통과로 간주하지 않습니다.

이번 확인은 정적 Light mode24종과 숨겨진 slot 기록에 한정됩니다. 실제 입력·보조 기술·focus·대비 통과는 제품에서 검증합니다.
