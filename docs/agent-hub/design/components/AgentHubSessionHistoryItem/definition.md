# AgentHubSessionHistoryItem — 정의와 실제 표시

원본 `2995:22304`는 `session/history-item` COMPONENT_SET이며 기본 state는 default입니다.
실행 기록 제목과 선택적으로 표시하는 작은 점으로 구성됩니다.

| 실제 Figma 속성 | 기본값과 연결 |
| --- | --- |
| `title#2995:0` | TEXT, ‘오늘 오후 3:00’, title characters |
| `dot#2995:3` | BOOLEAN, false, dot visible |
| state | default / hovered / pressed / selected |

원본 설명은 selected를 현재 보고 있는 실행, has-dot을 확인하지 않은 실행으로 설명합니다.
실제 속성 이름은 dot BOOLEAN이며 Figma에 read API·확인 시점·자동 읽음 정책이 있다는 뜻은 아닙니다.

```text
실행 기록 행
├─ title 평문
└─ dot=true일 때 ELLIPSE6
```

네 standalone dot 노드는 모두 존재하지만 visible=false입니다.
숨김 좌표나 다운로드 가능한 dot 자산을 이유로 기본 행에 점·빈 공간·focus target을 추가하지 않습니다.

## Panel에서 확인한 다섯 기록

| 실제 인스턴스 | 원본 state | title 샘플 | dot |
| --- | --- | --- | --- |
| `2975:69424` | selected `2995:22301` | 오늘 오후 3:00 | false |
| `2975:69425` | default `2995:22298` | 오늘 오후 2:00 | true |
| `2975:69426` | default `2995:22298` | 오늘 오후 1:00 | true |
| `2975:69427` | default `2995:22298` | 오늘 오후 12:00 | false |
| `2975:69428` | default `2995:22298` | 오늘 오전 11:00 | false |

기본 false와 실제 두 개의 true 조합을 분리합니다. selected+dot=true·hover/pressed+dot=true의 전체 조합까지 측정한 것은 아닙니다.
다섯 기록·시간 문구·순서는 제품의 보관 개수·서버 정렬·timezone·날짜 형식 계약이 아닙니다.
dot은 직접 그린 ELLIPSE이며 Icon·Status·Spinner·Checkbox 인스턴스가 아닙니다.
