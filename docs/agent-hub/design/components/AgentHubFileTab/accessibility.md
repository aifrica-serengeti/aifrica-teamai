# AgentHubFileTab — 접근성

[문서 인덱스](./README.md) · [Figma 관찰 기록](../../references/file-code-refresh.figma.json)

공용을 켜고 frontend-common을 함께 선택한 UI 작업에서만 `DOCS_ROOT/frontend/design/components/Tab/accessibility.md`를 읽고 tablist/tab/tabpanel 연결과 선택 상태를 유지합니다.
각 trigger에 aria-selected와 대응 panel ID를 연결하고 활성 trigger를 roving Tab 진입점으로 둡니다.
현재 제품의 Radix/동등 primitive가 제공하는 방향키와 focus를 사용하며 Figma의 div 구조를 그대로 접근성 구조로 복사하지 않습니다.

닫기는 별도 native button(type=button)이며 `{파일 이름} 탭 닫기`처럼 파일을 특정하는 이름을 제공합니다.
아이콘은 aria-hidden/빈 alt로 중복 읽기를 막습니다. 버튼은 tab trigger와 형제이며 중첩하지 않습니다.
24px hit area는 AH의 확인한 geometry로 유지하되 모바일 환경 확대 요구가 있으면 솔루션 별도 채택으로 기록합니다.
숨은 탭을 선택할 때 실제 panel과 aria-controls/labelledby가 일치하는지 검증하며 클리핑으로 focus 윤곽을 지우지 않습니다.
닫기 버튼이 제거되면서 focus가 body로 떨어지지 않게 탭 목록 owner가 유효 trigger/empty 대체 대상으로 복구합니다. 비활성 파일 닫기는 현재 선택을 유지하며, focus가 이미 다른 영역에 있으면 강제 이동하지 않습니다. 이 복구는 제품 구현 의무이며 Figma에서 확인한 동작이 아닙니다.
