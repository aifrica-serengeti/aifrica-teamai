# AgentHubRuntimeSelect — 치수와 표면

| 항목 | 확인 값 |
| --- | --- |
| 트리거 외곽 | 238×40px 샘플, border1px #DDD, radius8, blue-gray #F6F7F9, Raised |
| 트리거 행 | padding8, 내부 radius7, icon20, gap8, chevron16 |
| 트리거 label | Pretendard600·16/24px·#1C1C1C |
| 팝업 | top43px·left/right -1px, border1 #DDD, radius8, py4, blue-gray, Mid |
| 구분선 | 좌우 wrapper8px, 선 위아래4px, 선1px #DDD |

40px는 metadata 외곽 높이입니다. 생성 코드의 내부 height40과 border를 중복 더해42px로 만들지 않습니다. top43은 원본 좌표이며 실제 포털은 트리거 아래 간격과 충돌 회피를 기존 엔진으로 계산합니다. 공용 Divider의 기본8px 여백을 중복 적용하지 않습니다.

트리거40px는 확보한 board metadata 외곽에 맞춘 재현 기준입니다. 내부40px와 외곽 border의 native stroke layout 관계는 미수집이므로 생성 코드만으로 그 차이를 설명했다고 기록하지 않습니다.
