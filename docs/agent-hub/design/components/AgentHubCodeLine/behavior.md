# AgentHubCodeLine — 동작과 상태 소유권

[문서 인덱스](./README.md) · [Figma 관찰 기록](../../references/file-code-refresh.figma.json)

state=enabled는 일반 줄, current는 현재 줄 표시, empty는 초기 입력 안내입니다.
disabled·오류·loading을 enabled/current 이름에 억지로 매핑하지 않습니다.
fold의 Boolean은 **화살표 표시 여부**이며 expanded·collapsed 값이 아닙니다.

접기가 실제 기능인 경우 상위 편집기/문서 owner가 접기 범위와 접힌 줄을 관리하고 한 번의 명령을 받습니다.
장식 화살표를 표시만 하면서 조작 가능한 버튼처럼 노출하지 않습니다. 별도 접기 동작을 채택하면 명확한 버튼·접근성 이름을 연결합니다.

현재 줄 선택·문서 편집·IME·undo/redo·syntax parser는 정적 참조로 증명되지 않았습니다.
입력 가능한 편집기가 필요하면 기존 제품의 엔진을 연결하며 줄마다 contenteditable을 복제하지 않습니다.
empty의 정적 cursor를 별도 실제 caret·반복 애니메이션과 중복 렌더하지 않습니다.
