# AgentHubChatHeader — 동작과 상태의 책임

이 헤더는 현재 위치와 action의 배치를 소유합니다. Figma의 네 Boolean은 노출값이며 실제 대화·실행·파일·메뉴 상태가 아닙니다.
제품이 해당 상태를 표시 여부로 연결할 수는 있지만, 그 매핑은 기존 제품의 기능 요구와 owner를 확인한 뒤 정합니다.

| 책임 | 제품에서 연결할 owner |
| --- | --- |
| 현재 항목·제목·경로 | 대화/탐색 데이터와 실제 현재 위치 |
| pause의 대상·결과 | 제어할 대화·실행·요청 ID, 권한·명령·중복 호출 방지·실패 복구 |
| file의 대상·결과 | 실제 파일/산출물 데이터와 열기·선택 등 채택한 명령 |
| more의 대상·결과 | 실제 추가 명령, popup 채택 시 open·focus·선택 owner |
| indicator | 제품이 채택한 표시 조건. 원본은 의미나 계산식을 제공하지 않음 |
| 가용 폭·배치 | 대화 영역과 shell의 레이아웃 owner |

pause 모양만으로 응답 중단·생성 취소·재개·예약 정지·스트리밍 제어 중 하나를 확정하지 않습니다.
file 모양만으로 다운로드·업로드·OutputViewer 열기를 연결하지 않습니다. more 모양도 실제 Menu의 존재·항목·삭제 권한을 확정하지 않습니다.
각 버튼의 label과 callback은 제품의 실제 동작에 맞춰 함께 제공합니다. 표시할 수 있어도 동작이 없는 버튼을 활성 상태로 두지 않습니다.

버튼은 native `type="button"`의 click 한 곳에서 명령을 한 번 통지합니다. wrapper·glyph·별도 keydown에 같은 callback을 중복 등록하지 않습니다.
실제 pending·disabled를 채택하면 기존 IconButton의 native 차단과 handler guard를 연결하고 헤더 안에 동일한 요청 상태를 복제하지 않습니다.
요청 결과로 대화·draft·첨부·선택을 언제 바꾸는지는 기존 제품 owner가 정하며 헤더가 자동 초기화하지 않습니다.

false인 action은 DOM·접근성 트리·Tab 순서에서 제거하고 gap4는 남은 버튼 사이에만 둡니다.
버튼이 모두 없으면 비어 있는 actions wrapper와 그에 따른 가짜 간격도 제거합니다. indicator=false는 장식 선만 제거하며 하단 기본 border1px는 유지합니다.
어느 Boolean도 전체 header의 disabled·실행 취소·현재 위치 변경을 뜻하지 않습니다.

현재 단일 항목은 비상호작용 텍스트로 표시하고 실제 현재 위치로 연결합니다. breadcrumb source의 slash variant라도 구분자 false이므로
기본 시안에 slash를 추가하지 않습니다. 상위 경로·자동 축약·메뉴가 필요하면 기존 Breadcrumb 계약과 제품 데이터를 함께 검증합니다.

기본 static indicator에 진행률·자동 motion·live region을 추가하지 않습니다. 생각 중 효과를 명시적으로 채택하면 [motion](./motion.md)의 제안 API·lifecycle을 적용합니다.
실제 phase·active request는 부모가 소유하며 terminal·대화/요청 교체에서 효과를 정리합니다. 헤더 전체의 sticky·스크롤 동기화 근거는 없습니다.
긴 제목·작은 화면·zoom에서 남은 action 접근을 유지하는 방법은 제품 정책으로 채택하며 고정48px에 중요한 정보를 잘라 숨기지 않습니다.
