# AgentHubFileHeader — 동작과 상태 소유권

[문서 인덱스](./README.md) · [Figma 관찰 기록](../../references/file-code-refresh.figma.json)

파일 목록·현재 파일·트리 보임·확대 상태·pause 요청은 모두 상위 파일 패널/제품 owner가 관리합니다.
Header는 controlled 값을 받아 선택·닫기·트리 표시 변경·확대·종료 요청을 각각 전달합니다.
FileTab의 선택/닫기를 따르고 root 전체에 click handler를 덧붙여 중복 실행하지 않습니다.

overflow 판정은 현재 폭·실제 탭과 액션 폭을 측정한 결과로 연결합니다.
초기 마운트·resize·폰트 로드·탭 label/목록 변경 시 갱신하고 샘플480px만 breakpoint로 고정하지 않습니다.
가려진 탭은 overflow 목록과 방향키 탐색으로 접근할 수 있어야 하며 선택한 파일을 보이게 합니다.
Figma의 오른쪽 정렬은 보이는 위치 예시이고 모든 상태에서 끝으로 강제 스크롤하는 제품 정책은 아닙니다.

메뉴가 있으면 기존 공용 Menu/AH 메뉴 엔진의 focus 이동·Escape·바깥 클릭·trigger 복귀를 유지합니다.
메뉴 content를 새 명령 데이터 없이 임의 생성하지 않습니다. 토글은 실제 보임 상태를 aria-expanded/controls 등에 연결합니다.
모션은 버튼의 기존 상태 전환을 재사용하며 정적 샘플만으로 새 패널 확대 타이밍·drag/resize 기능을 추가하지 않습니다.
