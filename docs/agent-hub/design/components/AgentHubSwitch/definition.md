# AgentHubSwitch — 정의와 지원 범위

Figma `switch`는 40×22px track 안에 18×18px 원형 thumb를 둔 이진 설정 컨트롤입니다.
확인한 variant 속성은 `size: 22`, `checked: true/false`, `state: enabled/disabled`입니다.
`checked`는 값, `state`는 조작 가능 여부이며 서로 독립입니다. On disabled와 Off disabled가 모두 있습니다.

구조는 switch 의미를 가진 root(track)와 장식용 thumb입니다. 라벨·도움말·오류 문구는 이 노드에 없습니다.
제품에서 연결할 때 공용 Switch의 라벨과 field wrapper 소유권을 유지하고, track 안에 문구나 아이콘을 임의로 추가하지 않습니다.
Create/Detail의 label·help·error와 행 배치는 해당 field wrapper가 소유합니다.

공용 medium도 40×22px track·18px thumb·외곽 간격 2px·이동거리 18px입니다.
중립색·disabled 색상·thumb 그림자도 같습니다. Agent Hub에서는 On enabled track을 `#3B82F6`으로 확인했으며,
공용의 의미 토큰에 이 값을 솔루션 범위로 연결합니다. 이를 공용 primary나 Agent Hub 전체 테마의 확정값으로 넓히지 않습니다.

원본 radius 9999px와 공용 medium radius 11px는 이 40×22px frame에서 모두 완전한 알약 모양입니다.
토큰 표현의 차이를 기록하되 radius 때문에 동일한 기존 구현을 새로 만들 필요는 없습니다.
원본의 `size=22`는 높이를 나타내는 디자인 값이며 width 22px나 공용 small/large까지 확인했다는 뜻이 아닙니다.

직접 의존 계약은 `Switch`입니다. React·Vue·Radix 등 실제 구현 기술과 source/public export는 소비 저장소에서 확인합니다.
Figma variant나 상태별 SVG는 시각 비교 근거이며, 네 장의 이미지를 교체하는 방식으로 switch를 구현하지 않습니다.
