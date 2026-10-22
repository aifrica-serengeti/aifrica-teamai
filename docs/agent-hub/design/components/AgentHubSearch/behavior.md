# AgentHubSearch — 상태와 동작

공용 Search·Input의 입력 값 소유권과 native 입력 동작을 유지합니다. `value`가 있으면 호출자가 갱신하고,
`defaultValue` 기반이면 기존 uncontrolled 입력 로직을 사용합니다. Figma의 typing 문자열·caret을 별도 상태로 복제하지 않습니다.
typing은 입력 중인 시각 샘플이며 실제 keydown·로딩·검색 성공을 뜻하지 않습니다.

Clear는 값이 있고 편집 가능한 경우에 노출하며 `type="button"`으로 입력만 지웁니다.
uncontrolled는 기존 내부/DOM 값을 비우고, controlled는 기존 `onClear` 등 호출자의 계약으로 값을 갱신합니다.
실제 제품이 제공하지 않은 합성 onChange를 추가하거나 한 번 지우기에 알림·검색을 두 번 발생시키지 않습니다.
지운 뒤 input으로 focus를 되돌립니다. disabled·read-only에서는 clear가 값을 변경하지 못해야 합니다.
Figma의 typing 시각 샘플만 보고 값이 있는 blur 상태의 clear를 제거하거나 입력값 유무를 상태 문자열로 대신하지 않습니다.
값이 있는 blur 상태의 새로운 시각 값은 제품의 채택 근거를 확인합니다.

필터 제공 여부와 적용 조건은 호출자가 소유합니다. `filtered` 시각 강조를 query가 비었는지·결과가 있는지·검색 중인지로
판단하지 않습니다. 필터 적용 상태·팝업 열림·입력 focus는 별도 상태입니다.
필터 조작은 native button으로 구현하고 실제 제품의 팝업·토글·조건 편집 API에 연결합니다.
이 노드만으로 팝업 내용·route·필터 초기화·검색 실행 방식을 만들지 않습니다.
비활성 입력 주변 조작도 실제 정책에 맞게 차단하고, 숨겨진 filter의 존재를 활성화 가능하다는 증거로 사용하지 않습니다.

검색어 적용·submit/Enter·IME composition·debounce·요청 취소·결과 loading/error/empty·페이지 초기화는 호출부/페이지의 책임입니다.
공용 Search에는 별도 onSearch·debounce 시간이 정의되지 않았으므로 새 기본값을 추정하지 않습니다.
제품에 검색 동작이 있으면 한글 조합 확정 Enter가 중복 submit되지 않는지 함께 확인합니다.
돋보기는 별도 클릭 검색 버튼으로 바꾸지 않습니다.

read-only는 읽기·복사·focus가 가능하고 disabled와 의미가 다릅니다. 스타일 미제공을 이유로 공용 Input의 의미를 제거하지 않습니다.
공용 참조 코드의 readOnly clear guard·clearLabel 전달이 실제 제품에서도 올바른지는 별도로 확인하며 예시를 구현 증거로 쓰지 않습니다.

## 입력과 포커스의 단일 소유권

호환되는 공용 Input이 없으면 공용 문서 계약으로 먼저 입력 primitive를 구현하고 Search가 조합합니다.
Search는 native 입력·ref·IME·값 제어를 그 primitive에 연결하며 높이·radius·아이콘·외곽선은 이 확장의 adapter가 소유합니다.
내부 입력은 container가 focus를 표시한다는 명시적 모드로 연결합니다. 전역 focus 규칙을 없애는 대신
Search 안의 `input:focus-visible`에만 중복 outline/box-shadow 제거를 한정해 가운데 직사각형이 생기지 않게 합니다.
편집 가능한 input이 focus일 때만 바깥2px 경계를 표시하고 clear/filter의 focus를 입력 focus와 합치지 않습니다.
read-only는 읽기·복사·Tab focus를 유지하면서 활성 경계를 표시하지 않으며 clear는 값을 바꾸지 못합니다.
Clear는 기본 Tab 순서에서 제외하고 pointer 또는 제품이 제공한 조작 뒤 입력으로 focus를 돌려줍니다.
필터는 독립 Tab 정지점과 실제 목적에 맞는 focus 표시를 유지합니다.
색상·외곽선 전환과 reduced motion은 [모션 채택 계약](../../motion.md)을 적용하며 native caret을 추가 도형으로 복제하지 않습니다.
