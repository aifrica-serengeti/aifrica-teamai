# AgentHubSwitch — 스타일

## 크기와 모양

| 항목 | 확인한 값 | 공용 Switch medium과 비교 |
| --- | --- | --- |
| track frame | 40×22px, 가로·세로 고정 | 동일 |
| track radius | 9999px | 공용 11px와 이 frame에서 같은 알약 모양 |
| Figma padding | 상하좌우 2px | thumb의 외곽 간격 2px와 동일 |
| thumb | 18×18px ellipse | 동일한 원형 |
| Off thumb 위치 | track 기준 x=2px, y=2px | 동일 |
| On thumb 위치 | track 기준 x=20px, y=2px | 이동거리 18px로 동일 |
| track 그림자 | 없음 | 동일 |
| 전체 opacity | 모든 상태 1 | disabled도 전체 투명도로 바꾸지 않음 |

원본의 가로 auto layout 정렬은 Off에서 시작, On에서 끝입니다. `itemSpacing: 10`은 자식이 하나인 이 노드의
thumb 위치에 추가 간격을 만들지 않습니다. thumb는 ellipse이므로 원본의 `cornerRadius: 0`을 CSS 사각형으로 해석하지 않습니다.

Figma의 inside stroke와 padding을 CSS border·padding으로 그대로 중복 적용하면 thumb 간격이 달라질 수 있습니다.
공용처럼 border-box에 1px border 자리를 모든 상태에서 예약하고 thumb를 내부 기준 `top/left: 1px`에 놓으면,
외형 기준 2px 간격과 checked 이동거리 18px를 유지할 수 있습니다. 다른 방식도 최종 치수·위치가 같다면 사용할 수 있습니다.
disabled로 바뀔 때 border 추가 때문에 track 크기나 thumb 위치가 흔들리지 않게 합니다.

## Light mode 상태색

| checked | state | node | track | thumb | 보이는 track border |
| --- | --- | --- | --- | --- | --- |
| true | enabled | `3145:17059` | `#3B82F6` | `#FFFFFF` | 없음 |
| true | disabled | `3145:17060` | `#EEEEEE` | `#FFFFFF` | 없음 |
| false | disabled | `3145:17061` | `#EEEEEE` | `#8F8F8F` | 1px inside `#AAAAAA` |
| false | enabled | `3145:17062` | `#8F8F8F` | `#FFFFFF` | 없음 |

공용 medium의 Light 중립색·disabled 조합과 같습니다. On enabled의 공용 `accent-500`에 Agent Hub 참조 색상
`#3B82F6`을 연결하는 차이를 이 확장에서 소유합니다. disabled On/Off의 thumb 색상이 서로 다르므로 한 색으로 합치지 않습니다.

보이는 border는 Off disabled 한 곳뿐입니다. 나머지 track과 모든 thumb는 `strokes: []`입니다.
그 노드에 남은 `strokeWeight: 0.7`만 보고 0.7px 외곽선을 추가하지 않습니다.

## Thumb 그림자

모든 4종의 thumb에 공용과 같은 Raised 그림자가 있습니다.

```css
box-shadow:
  0 0 1px 0 rgba(9, 30, 66, 0.31),
  0 1px 1px 0 rgba(9, 30, 66, 0.1);
```

일반 검정 그림자로 치환하지 않습니다.
[Agent Hub Elevation](../../foundations/Elevation.md)의 Raised effect와 일치하지만 Default 용도 표를 근거로 thumb shadow를 지우지 않습니다.
focus 시각은 이 노드에 없으므로 공용의 semantic 1px outline·1px offset을 유지하고 실제 surface 대비와 부모의 clipping을 확인합니다.
원본의 `clipsContent: true`를 이유로 focus까지 잘라내지 않습니다.
dark·hover·pressed·read-only·invalid·loading의 새 색상은 이 노드에서 확인하지 않았습니다.
