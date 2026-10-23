# AgentHubSNBItem — 정의와 실제 조합

원본 `2611:62441`은 이름이 menu-item인 COMPONENT_SET입니다.
root의 실제 속성은 다음과 같습니다. title TEXT·URL·expanded·callback·disabled API는 없습니다.

| 속성 | 타입·기본값 | 실제 범위 |
| --- | --- | --- |
| `Show leading-icon#2611:0` | BOOLEAN·true | 1depth의 leading glyph visible |
| `Show trailing-icon#2611:3` | BOOLEAN·true | hover/pressed의 trailing FRAME visible |
| depth | VARIANT·1depth | 1depth /2depth |
| state | VARIANT·enabled | enabled/hovered/pressed/selected |

| state | 1depth 원본 | 2depth 원본 |
| --- | --- | --- |
| enabled | `2611:62440` | `2611:62439` |
| hovered | `2611:64577` | `2611:64587` |
| pressed | `2611:64599` | `2611:64609` |
| selected | `2611:64632` | `2611:64621` |

```text
비대화형 row root32
├─ leading-icon-label: 1depth의 선택적 glyph16 + 제목
├─ 2depth의 장식 connector
└─ hovered/pressed의 absolute gradient surface + 더보기20
```

2depth에는 leading subtree가 없고 enabled/selected에는 trailing subtree가 없습니다.
Boolean 기본값true를 해당 subtree가 전 상태·전 depth에 존재한다는 뜻으로 사용하지 않습니다.
제목 ‘chat-title’은 TEXT layer의 샘플이며 root TEXT property나 특정 대화 API의 고정값이 아닙니다.

1depth glyph는 실제 source `3018:24833`(원본 이름 icon/forder/16)입니다.
hovered 두 depth와2depth pressed의 more는 ghost/default/20 `2909:49139`, 내부 more16 source `2751:16967`을 재사용합니다.
**1depth pressed의 more 제어와 glyph wrapper는 FRAME**이며 같은 외형이어도 실제 IconButton INSTANCE 재사용으로 기록하지 않습니다.
state hovered/pressed에서도 실제 nested IconButton source state는 default입니다.

Panel은 제목·glyph swap·leading/trailing Boolean과 paint를 추가 override합니다.
예를 들어 pinned 항목 `2611:62907`은 source가 hovered `2611:64577`·state도 hovered지만 fill은 selected alias135이고
내부 more INSTANCE는 visible=false입니다. gradient FRAME은 남아 있습니다. 이를 selected 원본 재사용이나 subtree 부재로 기록하지 않습니다.
실제 leaf/current·펼침·항목 action 의미는 Panel/제품이 정하며 이 혼합 시각만으로 의미를 확정하지 않습니다.
Panel에서 사용할 때는 [실제 Panel 조합](../AgentHubSNBPanel/definition.md)을 다시 확인해 이 override와 숨김을 보존합니다.


## 현재 채택: 긴 제목 viewport

제목 원문 한 개를 비상호작용 viewport 안에 두고 [공용 긴 제목 표시](../../title-overflow.md)를 조합합니다.
상위 native 주 동작이 hover·focus·활성화를 소유하며 제목에 버튼이나 Tab 정지점을 추가하지 않습니다.
선택·expanded·업무 요청·파일/예약 데이터는 기존 owner에 남습니다.
