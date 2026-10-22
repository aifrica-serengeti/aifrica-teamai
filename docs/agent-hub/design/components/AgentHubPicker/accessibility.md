# AgentHubPicker 접근성

## 실제 조작에 맞는 역할

기본 권고는 이름이 있는 composite panel 안에 제목별 group과 독립된 native 버튼·검색 input·링크를 두는 방식입니다.
제품이 dialog로 여는 경우 trigger의 `aria-haspopup="dialog"`, `aria-expanded`, 실제 `aria-controls`를 연결하고
panel 이름을 제공합니다. 모달로 채택한 경우에만 `aria-modal="true"`와 focus containment·배경 비활성화를 적용합니다.
Figma의 FRAME 자체가 modal 또는 dialog라는 증거는 아닙니다.

단순 값 선택만 남기고 행 안의 독립 조작이 없는 제품에 한해 combobox/listbox adapter를 검토할 수 있습니다.
이 경우 한 focus 모델과 `aria-activedescendant` 또는 roving focus, 실제 option id, 선택 값의 `aria-selected`를 일관되게 연결합니다.
모델·more 버튼을 option 자식에 넣거나 단순히 복합 목록 전체를 `role="menu"`로 바꾸지 않습니다.
현재 스냅샷에는 persistent selection 표시나 다중 선택 의미가 없습니다.

## Focus와 키보드

- 버튼의 native Enter/Space, 링크의 native Enter, input의 편집·IME를 유지합니다.
- ↑/↓ 힌트를 표시한다면 해당 목록에서 활성 target 이동을 실제 구현합니다. disabled/숨김 target은 제외하고
  검색 input의 caret 이동이나 다른 widget의 방향키를 전역 listener로 빼앗지 않습니다.
- Tab/Shift+Tab으로 검색·행 main action·모델·필터·보조 메뉴·footer 링크에 접근할 수 있어야 합니다.
  로빙 패턴을 채택하면 진입/이탈과 보조 target 경로를 명확히 하고 서로 다른 focus 모델을 섞지 않습니다.
- focus-visible를 유지합니다. 공용 채택 시 Menu의 inset2px ring·hover 우선 정책을 [Picker 스타일](./styles.md#공용-menu에서-계승하는-focus)에 연결합니다.
  추천·검색 행의 내부 main button outline은 행 wrapper가 ring을 대신 소유할 때만 제거합니다. focus 전체를 없애지 않습니다.
  model·more·filter의 독립 focus는 유지하며 `DOCS_ROOT/frontend/design/components/Menu/accessibility.md`와 대비 가능한 제품 focus token을 확인합니다.
- 스크롤 viewport는 현재 focus 행과 하위 메뉴 trigger를 footer 위로 노출합니다.
  opacity0만 적용한 보조 버튼은 보이지 않는 focus target으로 남기지 않습니다.
- 닫힘 후 호출 지점으로 focus를 복귀하고 nested panel은 부모를 먼저 닫지 않게 처리합니다.

## 이름과 설명

행의 실제 title을 접근성 이름으로 사용하고 유형·설명·공개 범위는 필요한 보충 설명으로 연결합니다.
장식 Chip·아이콘·모델 로고는 같은 정보를 중복 낭독하지 않게 합니다.
모델을 바꾸는 버튼은 '모델 선택, Qwen 3.8'처럼 실제 현재 값과 목적을 함께 알립니다.
검색 input은 placeholder와 별도의 이름, filter/more glyph-only 버튼은 목적에 맞는 이름을 가집니다.

키보드 힌트는 `kbd`·텍스트로 제공하며 클릭 가능한 버튼처럼 만들지 않습니다.
↑/↓·↵ 문자만 읽게 하지 말고 이동·선택 안내를 함께 유지합니다.
추천 제목과 반복 그룹은 실제 고유 id로 연결하고, 줄임표로 감춘 전체 title도 접근성 이름에서 보존합니다.

정적 스냅샷에는 보조 기술·키보드·모바일 검증이 없습니다. 실제 제품의 채택 패턴으로 검증하세요.
