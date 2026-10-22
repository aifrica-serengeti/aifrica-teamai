# AgentHubNavIcon — 원본과 지원 범위

`2611:62007`은 이름이 `icon`인 COMPONENT_SET입니다. 실제 속성은 `icon` VARIANT 하나이며 기본값은 home입니다.

| icon | 실제 COMPONENT |
| --- | --- |
| home | `2611:62006` |
| book | `2611:62005` |
| clock | `2611:62004` |
| search | `2611:71783` |

각28×28px COMPONENT에는28px 빈 Vector와 실제 채움 Vector가 있습니다. 다른 Icon 인스턴스를 조합한 구조는 아닙니다.
이름은 glyph 식별자이며 home route·자료 API·예약 실행·검색 popup을 정의하지 않습니다.
이 set에는 state·size·색상 prop·TEXT·SLOT·prototype 동작이 없습니다. 제품의 tone/자산 선택 API는 별도 제안입니다.

단독4종은 #757575입니다. standalone NavItem의 selected clock과 Rail의 selected home에서 #3B82F6 override를 확인했습니다.
blue 자산을 확보했더라도 book/search까지 포함한 모든 selected·hover 조립 화면을 측정한 것으로 확대하지 않습니다.
원본 geometry·제공 자산·색상 adapter·실제 상태 조합은 각각 구분합니다.

컴포넌트 set의 보라색 외곽선·radius5·전시 간격은 라이브러리 장식입니다. 앱 아이콘 배경이나 선으로 렌더하지 않습니다.
