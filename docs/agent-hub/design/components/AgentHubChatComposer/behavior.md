# AgentHubChatComposer — 상태와 제품 연결

Figma의 네 state를 앱의 배타적인 상태 enum으로 복사하지 않습니다. 편집 값·실제 focus·선택 에이전트·선택 프로젝트·
요청 진행 여부·송신 가능 조건은 독립적인 값입니다. 에이전트를 선택하면서 입력·focus·요청 진행이 함께 발생할 수 있습니다.
실측되지 않은 조합의 시각 값을 임의로 검증 완료로 표시하지 않습니다.

입력은 native textarea의 값·선택·복사·붙여넣기·IME 동작을 유지합니다. controlled라면 부모의 value와 변경 통지를 연결하고
기존 uncontrolled 구현이면 그 값 소유권을 유지합니다. 입력값을 Figma의 typing 문구나 별도 내부 draft와 이중으로 관리하지 않습니다.

전송 실행은 하나의 경로로 모읍니다. 버튼과 form submit·키보드 처리에 같은 송신 callback을 중복 연결하지 않습니다.
실제 전송 가능 조건·pending 중 편집·첨부 허용·중복 요청 차단은 제품 adapter가 정합니다.
파란 버튼이나 빈 placeholder 샘플만으로 빈 요청 허용 여부를 결정하지 않습니다.

제품은 Enter·Shift+Enter·조합 중 Enter·modifier 키의 정책을 명시해야 합니다. IME 확정 중에는 단축키 송신을 막고
한글 조합을 보존합니다. 기본 native 개행과 전송 단축키를 조용히 바꾸지 않습니다.
다중 줄을 지원한다면 최대 높이·스크롤·resize·버튼 정렬을 별도로 정하고58px 고정 clipping으로 입력을 숨기지 않습니다.

첨부는 실제 파일 선택기·메뉴 등 제품 동작에 연결합니다. 허용 형식·크기·개수·취소·업로드·파일 미리보기는 이번 Figma가 정의하지 않습니다.
프로젝트 선택의 팝업·route·선택·해제 API도 제품 소유입니다. 없는 서버 API나 업로드 성공 상태를 컴포넌트 안에 만들지 않습니다.

요청 실패·응답 stream·중단·재시도·전송 후 draft 초기화 시점은 제품 상태 owner가 정합니다.
송신 click만으로 입력·첨부·선택을 무조건 비우지 않고, 실패 후 작성 내용을 어떻게 보존할지 기존 정책을 확인합니다.
disabled/read-only를 제공한다면 입력 변경과 해당 조작을 실제 정책에 맞게 차단합니다. 그 시각 값은 이번 네 샘플에 없습니다.

[공용 control adapter 채택](../../motion.md)은 입력의 value·ref·selection·IME·composition·readOnly/disabled를 그대로 전달합니다.
focus owner를 container로 연결하더라도 입력 의미·단일 form submit·canSubmit/requestBusy·부모의 단축키 정책은 바꾸지 않습니다.
후속 채택은 입력과 pill의 추가 focus 테두리를 생략하는 시각 계약입니다. native focus·caret·선택·Tab 동작과
첨부·전송·프로젝트 버튼의 독립 focus 표시는 그대로 유지합니다.

예시·AI가 외부에서 채운 value에는 [공용 외부 텍스트 reveal](./external-text-motion.md)을 연결합니다.
외부 주입 식별자로만 재생하며 native value 전체를 즉시 반영합니다. 직접 타이핑·IME·선택에서는 효과를 취소하고,
별도 글자 타이머·중복 입력·추가 focus border를 만들지 않습니다.
