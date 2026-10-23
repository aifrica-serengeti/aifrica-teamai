# AgentHubSNBPanel — 구성과 실제 source

`2611:63754`는 이름이 `snb`인 단일 COMPONENT입니다. root props는 비어 있고 variant·TEXT·native SLOT·route/API가 노출되지 않았습니다.
하위 propertySets는 각 실제 인스턴스의 상태·표시값이며 제품 공개 props가 아닙니다. 수집한 reactions도 비어 있습니다.

```text
288px 패널
├─ top: 새 채팅 primary40 + 가로 Divider
├─ list: 섹션 사이 gap32
│  ├─ 고정됨: header20 + 행5개
│  ├─ 프로젝트: header20 + 행8개 + 더보기20
│  └─ 채팅: header20 + 행12개
└─ 원본 하단 fade: 절대 배치된 장식 RECTANGLE
```

| 구성 | 실제 인스턴스·source |
| --- | --- |
| 새 채팅 | `3074:54645` → primary40/enabled `3025:24940` |
| 가로 Divider | `2611:62133` → `2022:2`, 원본344×17 → 실제239×17 |
| 고정됨/프로젝트 header | `2666:10209`, `2666:10312` → enabled `2611:62411` |
| 채팅 header | `2611:63686` → hovered `2611:62412`, 실제 collapse/보조 조작 포함 |
| 일반1depth 행 | `2611:62440` source의 인스턴스 |
| 프로젝트의2depth 행3개 | `2611:62784`, `2611:62785`, `2611:63761` → `2611:62439` |
| 고정됨의 특수 행 | `2611:62907` → hovered `2611:64577`, 배경·보조 표시 override |
| 프로젝트 더보기 | `2611:62788` FRAME + `2611:62789` TEXT, 실제 Button/TextButton 인스턴스 아님 |

Divider는 앞서 확인한 독립 가로 원본 `3155:20478`과 source identity가 다릅니다.
선1px·위아래8px라는 공용 의미를 참고해도 실제 source `2022:2`를 같은 원본으로 바꾸어 기록하지 않습니다.

고정됨의 특수 행은 source enum이 hovered지만 실제 root fill이 selected alias `3081:135`의 #F4F4F4로 재정의돼 있습니다.
trailing FRAME의 #F8F8F8 gradient는 보이며, 그 안 more IconButton은 visible=false입니다.
이를 일반 selected source 재사용이라고 기록하거나 숨김 more를 복원하지 않습니다.

프로젝트의 들여쓴3행은 원본에서 평면 순서로 표시됩니다. 실제 부모 ID·expanded 모델·트리 토글 정책은 제공되지 않았습니다.
채팅12행의 앞10개는 leading 숨김, 마지막2개는 folder glyph 표시입니다. 레이어 이름만으로 항목의 업무 타입을 새로 확정하지 않습니다.
원본의 잘린 목록과 fade는 실제 스크롤·페이지네이션·검색·loading 상태 구현의 증거가 아닙니다.

## 현재 채택 구조: 양방향 스크롤 경계

```text
고정 top: 새 채팅·Divider
└─ 남은 높이의 상대 배치 목록 영역
   ├─ AgentHubScrollbar → native viewport 하나 → 섹션 목록 + 끝 여백24px
   ├─ 상단 fade53px: 위에 숨은 내용이 있을 때
   └─ 하단 fade53px: 아래에 숨은 내용이 있을 때
```

fade는 viewport 밖의 고정 장식이며 스크롤 콘텐츠·sticky 행·새 footer가 아닙니다.
SNBPanel이 공용 엔진의 측정 결과에서 장식 표시만 파생하고, scroll 위치·크기·관측 수명은 엔진이 소유합니다.
현재 선택·섹션 펼침·도메인 데이터의 부모 소유권과 기존 공개 입력은 변경하지 않습니다.
SNB 조합만 엔진의 추가 track 끝 여백24px와 gutter27px를 사용합니다. native viewport 끝 여백과 track 끝 위치는 다른 책임이며,
내용·행 폭을 줄이거나 별도 scrollbar를 만드는 대신 같은 엔진의 표시·drag 계산에 연결합니다.
