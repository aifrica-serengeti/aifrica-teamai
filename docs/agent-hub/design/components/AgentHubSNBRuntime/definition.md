# AgentHubSNBRuntime — 정의와 범위

미선택 원본4004:27119와 선택 원본4004:27231을 확인했습니다. 부모 component set의 연결 안내만으로 구현을 추정하지 않고 두 child context를 기준으로 기록했습니다.

헤더는 제목 ‘런타임’, 설명 ‘전용 작업공간에서 파일을 다루며 작업합니다.’와 아이콘형 SegmentedControl, 그 아래의 가로 Divider입니다. 헤더 다음에 RuntimeSelect와 새 채팅 버튼을 둡니다. 미선택은 ‘런타임을 선택해주세요.’를 표시하고 대화 목록을 만들지 않습니다. 새 채팅32px 버튼은 미선택·선택 모두 표시합니다. 선택 후에는 채팅 섹션과 기존 SNBItem 대화 목록을 추가합니다.

```text
SNBRuntime
├─ header: gap16
│  ├─ title-group: px8, gap8
│  │  ├─ title-row: 제목 + 아이콘 SegmentedControl
│  │  └─ 설명
│  └─ divider-wrapper: px8 → Divider: py8 + 선1px
├─ select-wrapper: px8 → RuntimeSelect: 내용 폭 채움
├─ 새 채팅32px: 두 상태 공통
└─ 채팅 섹션: 런타임 선택 후 표시
   ├─ Header20: 양쪽px8·제목/접기·filter/plus20 두 개
   └─ gap4 → label-only32px 대화 행 목록
```

Divider는 기존 공용 계약의 선1px·#DDD·위아래8px 여백을 재사용합니다. 별도 AgentHubDivider를 추가하지 않으며, 이 중첩 조합을 독립 Divider 원본의 source identity와 같은 것으로 기록하지 않습니다.

기존 SNBPanel의 에이전트/프로젝트 조합을 제거하는 대체물이 아니라 별도 작업공간 구성입니다.

헤더의 모드 선택과 런타임 선택은 독립입니다. standalone 아이콘 그룹은 첫 segment 선택 예시지만 이 SNB의 두 상태에서는 두 번째 런타임 segment가 선택돼 있습니다. `state=false/true`를 모드 선택값으로 사용하거나 공용 기본 예시의 첫 chat 선택을 그대로 적용하지 않습니다.

선택 후 채팅 섹션은 기존 Header/Item을 아래 조합으로 재사용합니다. Header의 일반3개 보조 action 중 direct는 표시하지 않고 filter·plus만 둡니다. 대화 행은 leading glyph를 숨긴 label-only 구성입니다. 별도 행 도형을 복제하거나 기본 folder glyph를 되살리지 않습니다.
