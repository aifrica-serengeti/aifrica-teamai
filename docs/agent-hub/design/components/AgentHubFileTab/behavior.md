# AgentHubFileTab — 동작과 상태 소유권

[문서 인덱스](./README.md) · [Figma 관찰 기록](../../references/file-code-refresh.figma.json)

탭 선택은 현재 파일 변경 요청, 닫기는 열린 목록에서 해당 파일 제거 요청입니다.
닫기 click·Enter·Space가 행/tab 선택까지 중복 호출되지 않도록 분리합니다.
기본 공용 Tab은 로빙 포커스와 ←→ 탐색을 제공하는 엔진에 연결하고 Home/End 등 실제 엔진 동작을 확인합니다.

활성 파일을 닫으면 같은 목록의 다음 유효 파일, 없으면 이전 유효 파일을 선택·focus 대상으로 삼는 정책을 제품 owner에 둡니다.
마지막 파일을 닫으면 FileHeader의 empty 표시와 이름 있는 대체 focus 대상으로 연결합니다.
비활성 파일을 닫을 때 현재 파일을 임의 변경하지 않습니다. 닫히는 탭이나 그 닫기 버튼에 focus가 있으면 현재 선택된 유효 trigger로 복구하고, 가려져 있으면 viewport 안에 드러냅니다. 선택된 trigger가 더는 유효하지 않으면 위의 인접 파일/empty 정책으로 연결합니다.
이 복구는 닫힘 commit에 맞춰 탭 목록/focus owner가 한 번 수행합니다. 제거되는 요소 밖에 focus가 있으면 파일 목록 갱신만으로 focus를 빼앗지 않습니다.
편집 내용이 있을 때 닫기 확인·저장 여부는 제품이 관리하며 문서 표시만으로 확인 Dialog를 자동 생성하지 않습니다.

탭 overflow로 가려진 현재 파일·focus가 된 trigger는 실제 viewport 안에서 보이게 합니다.
탭 순서·선택 상태를 DOM 위치나 파일명에서 역추정하지 않고 안정적인 ID와 controlled 상태를 사용합니다.
