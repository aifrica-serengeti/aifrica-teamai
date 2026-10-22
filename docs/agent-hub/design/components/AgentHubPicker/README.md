# AgentHubPicker

Agent Hub에서 채팅·에이전트 또는 프로젝트·채팅을 찾고 선택하는 조합 컴포넌트입니다.
공용을 채택하고 `frontend-common` 역할을 선택한 frontend 작업에서 이 확장을 적용합니다.
공용을 끈 제품은 이 catalog나 공용 문서를 요구하지 않습니다.

공용 Select·Dropdown·Menu와는 용도와 조합 방식이 다릅니다. 검색·모델 선택·행의 보조 조작이 함께 들어가므로
기존 제품 구현을 조사한 뒤 재사용 가능한 부분을 조합하고, 호환 구현이 없으면 새 export를 개발하세요.
현재 source/export는 `unmapped`이며 이 문서는 실제 제품 코드나 동작 검증 결과가 아닙니다.

## 확인한 구성

| 출처 | 역할 |
| --- | --- |
| [2627:61977](https://www.figma.com/design/cUKHT2PdHjAKRXZlzulnO5/?node-id=2627-61977) | agent/chat × enabled/hovered의 PickerItem 네 구성 |
| [2627:62004](https://www.figma.com/design/cUKHT2PdHjAKRXZlzulnO5/?node-id=2627-62004) | 키보드 힌트·탐색 링크가 있는 PickerFooter |
| [3016:104794](https://www.figma.com/design/cUKHT2PdHjAKRXZlzulnO5/?node-id=3016-104794) | 일반 채팅과 추천 에이전트 조합 |
| [2978:58104](https://www.figma.com/design/cUKHT2PdHjAKRXZlzulnO5/?node-id=2978-58104) | 검색·프로젝트/채팅 목록 조합 |

완성본 둘은 `FRAME`입니다. 완성 Picker의 variant enum이나 공개 API가 정의된 것은 아닙니다.
이 문서의 `agent-recommendations`·`project-chat-search`는 조립을 구별하기 위한 이름입니다.

## 문서

- [구조와 공용 대비 차이](./definition.md)
- [크기·색상·글꼴·조립별 override](./styles.md)
- [검색·선택·열림과 제품 동작](./behavior.md)
- [키보드·focus·조작 의미](./accessibility.md)
- [제품 검증 항목](./verification.md)
- [신규 구현과 연결 순서](./implementation.md)

실제 구성은 [PickerItem](../AgentHubPickerItem/README.md), [PickerFooter](../AgentHubPickerFooter/README.md),
[Search](../AgentHubSearch/README.md), [유형 Chip](../AgentHubAgentTypeChip/README.md),
[IconButton](../AgentHubIconButton/README.md), [Icon](../AgentHubIcon/README.md)을 비교합니다.
공용을 켠 경우 `DOCS_ROOT/frontend/design/components/Scrollbar/README.md`와
`DOCS_ROOT/frontend/design/components/Button/README.md`의 의미 계약도 확인합니다.
행 소스·직접 FRAME·시각 override를 구분하며 제품 mapping을 자동 생성하지 않습니다.

[실측](../../references/picker.figma.json) · [변수](../../references/picker.variables.figma.json) ·
[자산](../../references/picker.assets.json) · [조합 대조](../../references/picker-composition.json)
