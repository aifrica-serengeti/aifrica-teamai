# AgentHubItemCard — 정의와 지원 상태

item-card `3095:143`은6개 state를 가진 COMPONENT_SET입니다.
에이전트/항목의 요약과 관련 조작을 배치하는 전용 구성으로, 공용 Card의 전체 slots·new Chip·Summary·Footer API를 자동 지원하지 않습니다.

| state | 원본 | 의미 경계 |
| --- | --- | --- |
| default | `3095:20` | 기본 시각 |
| hovered | `3095:21` | 순간 hover, pin subtree 포함 |
| pressed | `3095:47` | 순간 누름, pin subtree 포함 |
| selected | `3095:73` | 선택 시각, 실제 선택 owner는 제품 |
| disabled | `3095:99` | 자식별 비활성 paint·로고 saturation, 실제 입력 차단은 제품 |
| accent | `3074:91985` | 파란 배경·투명 선의 강조, selected/focus와 구분 |

## 실제 속성

| 속성 | 타입·기본값 | 연결 범위 |
| --- | --- | --- |
| `dot#3095:4` | BOOLEAN true | 제목 옆8px dot |
| `description#3095:5` | BOOLEAN true | 설명 TEXT visible |
| `tools#3095:6` | BOOLEAN true | 도구 로고 묶음 visible |
| `pin#3095:7` | BOOLEAN true | hovered/pressed에 실제 존재하는 pin-button visible |
| state | VARIANT default | 위6개 시각 상태 |

title/meta/description의 실제 TEXT property 정의는 없습니다. 내용은 현재 TEXT layer의 샘플이고,
제품에서 받는 문자열 API는 [구현 안내](./implementation.md)의 제안입니다.
pin Boolean이 true여도 default/selected/disabled/accent에는 pin subtree 자체가 없습니다.
이 부재를 visible=false 노드나 모든 상태의 고정 토글 지원으로 기록하지 않습니다.
각 Boolean false 조합의 별도 렌더·focus/선택 교차 상태는 제공되지 않았습니다.

```text
root324×146·r24·p16·gap16
├─ content: gap8·폭290
│  ├─ header: 높이44·상대 위치 기준
│  │  ├─ info: title-row(title + dot) + gap4 + meta
│  │  └─ absolute more20: right0/top0
│  └─ 표시할 때 description (샘플높이20)
└─ footer: SPACE_BETWEEN·높이24
   ├─ 표시할 때 tools: 24px 타일2개·gap7
   └─ actions: hovered/pressed에서 pin24 + chat24·gap4
```

더보기는 ghost/default/20 source `2909:49139`이고 disabled만 ghost/disabled/20 source `2909:49136`입니다.
내부 more glyph는 source24 `3018:24913`을16으로 재정의했습니다. control 자체는20px입니다.
chat/pin은 native16 glyph source를 담은 FRAME24이고 실제 IconButton24 인스턴스가 아닙니다.
고정 아이콘의 회전과 clipping은 [자산 기록](../../references/card.assets.json)의 완성16px export에 보존했습니다.

도구 이미지는 실제 IMAGE paint를 쓰는 데이터 슬롯입니다. 현재 두 로고가 보이지만 고정된 회사 브랜드 목록·허용 도구 두 개로 일반화하지 않습니다.
모든 수집 prototype reaction 그룹은 비어 있습니다. 버튼 이름·glyph에서 실제 메뉴 항목·route·고정 저장·대화 전송을 추정하지 않습니다.
