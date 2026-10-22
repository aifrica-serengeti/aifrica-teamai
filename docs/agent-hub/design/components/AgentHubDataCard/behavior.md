# AgentHubDataCard — 활성화와 상태 소유권

데이터 ID·제목·설명·유형 라벨·권한·목록은 제품 owner가 제공합니다.
‘volume’ 문구만으로 볼륨 연결·파일 열기·데이터 조회·API를 확정하지 않습니다.

hovered는 포인터 hover, pressed는 누르는 동안의 시각입니다.
지속 선택·체크·요청 성공·aria-pressed 토글로 변환하지 않습니다. selected variant는 없습니다.
실제 클릭이 상세 보기·단일 선택·다른 동작 중 무엇인지는 제품이 명시합니다.
표시 전용이면 별도 action/Tab을 만들지 않고, 단일 action을 채택했다면 native host 하나에 연결합니다.

단일 action은 native button type=button의 click에서 한 번 통지하고 Enter/Space를 별도 keydown으로 재실행하지 않습니다.
title·description·Chip·wrapper에 같은 callback을 중복 등록하지 않습니다.
Chip은 정보 표시이며 별도 button·유형 필터·삭제 토글을 만들지 않습니다.

추가 메뉴·링크·Checkbox가 필요하면 카드 전체 button 안에 중첩하지 않습니다.
독립 조작을 수용하는 비대화형 표면과 형제 host로 설계하고 지원 상태·접근성·시각을 추가 검증합니다.

disabled/loading은 세 원본에 없습니다. 제품이 추가하면 실제 활성화를 guard하고 권한·중복 요청·실패는 해당 owner에 연결합니다.
색만 바꾸거나 내부 fetch/선택 상태를 이중 저장하지 않습니다. 활성화가 기존 대화·draft·첨부·선택을 임의 초기화하지 않게 합니다.
자동 열기·다운로드·전송·파일 실행·새 live region을 이 표시 카드에 숨기지 않습니다.


## 공용 색상 모션

공용을 채택한 경우 [Card 모션 적용](../../cards.md#공용-색상-모션-계승)과 [공용 모션](../../motion.md)을 따릅니다.
root의 background-color·border-color·box-shadow·color와 해당 텍스트 color는200ms ease로 전환합니다.
이 값은 공용 계승 계약이며 Figma 정적 시안의 motion 실측값이 아닙니다. 원본에 없는 상태·표면은 새로 만들지 않습니다.
disabled 입력은 즉시 차단하고 이 계약의 paint·opacity·정확한 SVG를 유지합니다. reduced motion에서는 전환을 해제합니다.
