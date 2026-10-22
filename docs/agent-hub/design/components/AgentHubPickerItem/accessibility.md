# AgentHubPickerItem — 접근성

- 부모가 실제 선택 패턴을 정합니다. 모델이 단순 표시일 때만 전체 행을 하나의 listbox option으로 사용할 수 있습니다.
  이 경우 stable option ID·`aria-selected`·선택 통지·방향키/처음/끝 탐색·focus/스크롤 정책은 부모 listbox가 일관되게 소유합니다.
- 모델이 독립 조작이면 option 안에 button을 넣지 않습니다. 비상호작용 행 안에 항목 선택 button과 모델 button을 형제로 배치하고,
  검색·여러 control을 수용하는 Picker dialog 구성을 우선 검토합니다. button 안에 button·Link를 중첩하지 않습니다.
- native button은 type=button·Tab·Enter/Space·실제 disabled와 실행 guard를 유지합니다.
  모델 조작과 행 선택의 callback을 한 번의 입력에 중복 실행하지 않습니다.
- title과 유형을 읽을 수 있게 연결하고 필요한 meta·모델 정보는 실제 문맥에 맞춰 설명합니다.
  유형 Chip은 정보 표시이며 별도 Tab 정지점이나 선택 control이 아닙니다.
- 모델 logo가 텍스트와 같은 식별 의미이면 빈 alt로 장식 처리합니다. chevron도 장식으로 숨기며 별도 접근성 이름·Tab/click을 주지 않습니다.
  독립 모델 button의 이름은 ‘모델 선택’과 현재 모델을 구분할 수 있게 제품 locale에서 제공합니다.
- 모델 팝업이 있으면 실제 역할·열림 상태·연결 ID와 닫힘 후 focus 복귀를 popup owner에 연결합니다.
  FRAME 이름만 보고 `aria-haspopup=menu`나 모델 목록의 keyboard 패턴을 고정하지 않습니다.
- description=false일 때는 읽기 트리에도 설명과 여백을 남기지 않습니다. 표시를 켠 경우 안정적인 ID와 읽기 순서를 연결하고,
  숨김 원본의 고정 좌표·높이로 텍스트가 겹치지 않게 새 배치를 검증합니다.
- Figma에 focus 상태가 없어도 각 실제 조작의 focus-visible을 유지합니다. 공용을 켰다면
  Menu의 inset2px ring·hover 우선 정책을 [main action의 행 wrapper](./styles.md#main-action의-focus-소유권)에 연결합니다.
  내부 button의 중복 outline만 제거하고 모델 버튼의 독립 focus는 보존합니다. clipping·스크롤 경계에 ring이 가려지지 않게 합니다.
- 긴 제목·meta·모델명·번역·확대·좁은 폭에서 전체 정보와 조작에 접근할 수 있어야 합니다.
  36px 시각 행만으로 타깃 크기·대비·완전한 keyboard 지원을 검증했다고 선언하지 않습니다.
- 행마다 별도 live region을 만들지 않습니다. 검색·선택·모델 변경 안내가 필요하면 부모의 한 owner가 실제 변경을 알립니다.
