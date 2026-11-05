# AgentHubActionBar — 동작과 상태 소유권

공용 ActionBar의 선택/명령 계약을 유지합니다. 다음은 구현 의무와 원본 설명을 구분한 기준입니다.

| 구분 | 기준 |
| --- | --- |
| 원본 설명 | 선택한 항목의 일괄 작업, 선택 개수 숨기기, 주요 작업1~5, 더보기, 위험 명령 분리, close로 선택 해제 |
| 공용 의무 | 목록 owner의 선택을 받아 표시하고 명령은 한 번 실행, disabled 실행 차단, keyboard/focus 유지 |
| 제품 결정 | 정확한 명령·권한·selection0에서 숨김 정책·배치·overflow 메뉴·API/실패·파괴 작업 확인 |

선택 집합·권한·진행 요청·개수 문구는 목록 owner에서 받습니다.
count를 문자열에서 다시 parse하여 선택 ID 수를 만들거나 bar 내부에 별도 선택 목록을 복제하지 않습니다.
close는 동일 owner의 선택 해제를 요청하며 임의로 파일을 닫거나 목록 데이터를 삭제하지 않습니다.

주요 action과 icon-action은 native button으로 구성하고 onClick 한 곳에서 disabled guard 뒤 명령을 한 번 실행합니다.
포인터 hover/pressed는 스타일 상태이며 디자인 state 문자열을 업무 모델에 저장하지 않습니다.
disabled는 실행 차단과 실제 상태를 함께 전달합니다. 색만 비활성으로 바꾸지 않습니다.

more가 필요하면 실제 메뉴 목록과 연결합니다. action 슬롯을 숨기는 Boolean이 자동으로 더보기 메뉴에 명령을 옮기지는 않습니다.
작은 폭에서 어느 명령을 접을지, 표시 순서와 우선순위는 제품에서 정합니다.
메뉴의 focus/방향키/Escape/복귀는 공용 메뉴 계약을 유지합니다.

선택 수가 바뀌어도 현재 keyboard focus를 계속 빼앗지 않습니다. bar가 제거될 때에는 가장 가까운 유효한
목록 조작으로 focus를 돌리고 선택 해제 알림은 실제 필요에 맞게 전달합니다.
화면 fixed bottom·sticky 배치는 제품 shell이 결정하며 ActionBar가 전역 body scroll을 직접 변경하지 않습니다.

색상 모션은 공용 ActionBar의200ms ease를 각 action 배경·label·glyph·focus outline에 적용합니다.
전역 자식 selector나 transition all을 피하고 reduced motion에서 즉시 완료합니다.
원본에서 enter/exit timing은 관찰하지 않았으므로 새 모션을 Figma 확정값으로 기록하지 않습니다.
