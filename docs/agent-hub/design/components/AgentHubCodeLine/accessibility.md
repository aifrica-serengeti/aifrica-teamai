# AgentHubCodeLine — 접근성

[문서 인덱스](./README.md) · [Figma 관찰 기록](../../references/file-code-refresh.figma.json)

읽기 전용은 이름 있는 코드 영역 안에서 문서 텍스트를 읽고 선택·복사할 수 있게 합니다.
행 번호와 들여쓰기 선은 코드의 원문에 포함시키지 않으며 장식 번호의 반복 읽기를 줄입니다.
실제 접기 명령이 없으면 fold glyph는 aria-hidden·비포커스로 두고, 있으면 버튼에 펼침/접기 이름과 실제 expanded 상태를 연결합니다.

current는 키보드 focus를 대신하지 않습니다. 실제 편집기의 focus-visible·caret·selection 표시를 유지하고,
읽기 전용 모든 줄에 tabIndex=0을 부여하지 않습니다. 키보드 사용자는 Viewer의 실제 스크롤 영역에 접근할 수 있어야 합니다.
편집기 사용 시 엔진이 제공하는 레이블·오류 알림·IME·보조기술 동작을 보존합니다.
