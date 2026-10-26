# AgentHubScheduleCard — 정의

원본 `3100:171`은 `schedule-card` COMPONENT_SET입니다.

| 실제 속성 | 타입 / 기본값 | 범위 |
| --- | --- | --- |
| `state` | VARIANT / default | default·hovered·pressed·selected·disabled |
| `status` | VARIANT / active | active·paused |

title/meta/status 문구·예약 ID·callback은 실제 노출 TEXT/API 속성이 아닙니다.
제품에서 동적으로 연결하는 API는 별도 제안으로 구분합니다.

| state | active 원본 | paused 원본 |
| --- | --- | --- |
| default | `3100:22` | `3100:23` |
| hovered | `3100:47` | `3100:111` |
| pressed | `3100:61` | `3100:125` |
| selected | `3100:75` | `3100:139` |
| disabled | `3100:89` | `3100:153` |

```text
비대화형 Card 표면
├─ header: info HUG
│  ├─ title
│  └─ meta-row: meta + ‘·’ + meta
└─ footer: space-between
   ├─ run-status FRAME: glyph14 + label
   └─ toggle-button FRAME24: glyph16
```

active의 run-status 문구는 실제 ‘label’이며 “실행 중”이라는 고정 문구가 아닙니다.
paused 샘플은 ‘일시 중지됨’입니다. status=active가 현재 작업 실행 중이라는 서버 의미인지,
예약이 활성 상태라는 의미인지는 제품 데이터와 명령 계약에서 확인합니다.
state의 selected/disabled와 status의 active/paused는 독립입니다. paused도 enabled/선택/비활성 어느 시각 상태와든 조합됩니다.

| 위치 | active 실제 source | paused 실제 source |
| --- | --- | --- |
| run-status | delay16 `2312:46700`을14px로 표시 | pause16 `2751:14602`를14px로 표시 |
| toggle-button glyph | pause16 `2751:14602` | circle-play16 `2751:16870` |

toggle-button은 모든10종에서 FRAME입니다. Card·Button·IconButton 인스턴스가 아니라 glyph만 실제 INSTANCE로 연결돼 있습니다.
제품에서 명령을 제공하면 이 FRAME의 시각에 native button 의미를 연결하며 원본 재사용의 종류를 바꾸어 기록하지 않습니다.
독립 run-status는 읽기용 표시이고 클릭 가능한 Chip·자동 live region으로 확인된 원본이 아닙니다.

## 제품 채택 완료 상태와 독립 action

아래는 예약 페이지에서 채택한 호환 확장입니다. 위 원본 속성 표·10개 조합·자산 기록을 늘려 해석하지 않습니다.

| 제품 입력 | 의미와 경계 |
| --- | --- |
| `status="completed"` | 완료한 예약의 읽기용 상태. 제목·메타·footer는 같은 카드 구조를 쓰며 중지/재개 button은 출력하지 않음 |
| `trailingAction?: ReactNode` | header 끝의 독립 조작 slot. 더보기24px button 등을 제목의 native button과 형제로 조합 |
| `onActivate`의 카드 전체 hit area | 제목의 native button 한 개가 카드 여백·읽기용 상태 영역까지 담당. root를 button으로 바꾸거나 두 번째 활성화 handler를 추가하지 않음 |

완료 상태가 disabled를 뜻하지 않습니다. 제품이 조회·편집을 허용하면 완료 카드도 같은 주 명령으로 열립니다.
`onRequestStatusChange`의 다음 상태는 기존 `active | paused`로 유지하며 completed를 재개로 자동 해석하지 않습니다.
별도의 ‘지금 실행’은 trailing action의 메뉴에서 제품 owner가 실행하는 명령입니다.
