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
