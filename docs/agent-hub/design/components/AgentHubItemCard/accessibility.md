# AgentHubItemCard — 접근성

다음은 소비 제품의 구현 계약입니다. Figma에 이미 role·keyboard·focus가 구현돼 있다는 뜻은 아닙니다.

- 카드는 제목이 있는 article/적절한 목록 항목으로 구성합니다. main action과 more/pin/chat을 형제로 배치하고
  전체 root나 header를 다른 button으로 감싸지 않습니다.
- main action은 실제 의미에 맞는 button/link로 구현합니다. 선택만 바꾸는 경우에는 제품의 선택 패턴과 상태 설명을 연결합니다.
  일반 button에 listbox용 aria-selected를 임의로 붙이지 않습니다.
- more는 ‘항목 이름 더보기’, chat은 ‘항목 이름과 대화’, pin은 실제 제어에 맞는 ‘고정/고정 해제’ 이름을 제공합니다.
  glyph는 장식이고 layer/source 이름을 accessible name으로 사용하지 않습니다.
- pin을 toggle로 채택한 경우 실제 pinned 값에만 aria-pressed를 연결합니다. pin 표시 Boolean·카드 selected·accent를 해당 값으로 사용하지 않습니다.
- 포인터 hover 없이도 모든 채택한 조작에 접근할 수 있게 합니다. focus-within 노출이나 별도 명령을 제공하고
  focus가 이동하는 동안 control을 사라지게 하지 않습니다. touch에서 hover를 요구하지 않습니다.
- disabled이면 main/more/pin/chat host와 실행을 실제 차단합니다. root opacity1·회색 glyph·로고 grayscale만으로 차단을 대신하지 않습니다.
- dot에 의미가 있다면 그 의미를 읽을 수 있는 텍스트로 전달합니다. 단순 장식이라면 aria-hidden으로 숨기고
  색만으로 unread/상태를 전달하거나 Notification/Status 역할을 덧붙이지 않습니다.
- 도구 로고의 대체 텍스트는 제품의 도구 이름/설명을 기준으로 정합니다. 같은 이름이 이미 인접 텍스트로 제공된다면
  중복 읽기를 피합니다. 비대화형 로고를 각각 Tab target으로 만들지 않습니다.
- 제목·meta·설명과 긴 도구 목록은 전체 정보에 접근할 수 있어야 합니다. more와 긴 제목의 충돌,
  설명 확장·zoom·번역·좁은 폭에서 control과 focus가 가려지지 않는지 확인합니다.
- 실제 메뉴를 채택했다면 roving/방향키/Escape/trigger 복귀 등 전체 패턴을 연결합니다.
  그림만 있는 more에 aria-haspopup를 선언하고 동작을 생략하지 않습니다.
- focus-visible은 제품의 검증된 token을 사용하고 공용 focus 의무를 유지합니다.
  Figma의 selected 선1px을 focus 실측값으로 기록하거나 root clipping으로 focus를 자르지 않습니다.

실제 보기·대화·메뉴를 닫은 뒤의 focus 복귀와 새 모션의 reduced-motion은 제품 흐름에서 함께 검증합니다.
