# AgentHubChatHeader — 정의와 실제 source

`2967:34438`은 이름이 `chat-header`인 단일 COMPONENT입니다. variantProperties는 `null`이며 native SLOT이나 root TEXT 속성은 없습니다.
수집한19개 노드의 reactions는 모두 비어 있습니다. 실제 대화 제어·route·파일 조회·메뉴 API가 들어 있는 실행 컴포넌트는 아닙니다.

```text
chat-header:640×48
├─ Breadcrumb INSTANCE:현재 항목 하나,88×24 샘플
├─ active-indicator RECTANGLE:325×1, 하단 절대 배치
└─ actions FRAME:80×24, gap4
   ├─ pause IconButton24 + 실제 pause16
   ├─ file IconButton24 + 실제 file16
   └─ more IconButton24 + 실제 more16
```

| 실제 root 속성 | 타입·기본값·연결 |
| --- | --- |
| `active-indicator#3016:0` | BOOLEAN·true, indicator `3016:79726`의 visible |
| `pause#3018:0` | BOOLEAN·true, 버튼 `3016:79808`의 visible |
| `file#3018:1` | BOOLEAN·true, 버튼 `3016:79809`의 visible |
| `more#3018:2` | BOOLEAN·true, 버튼 `3016:79810`의 visible |

네 값은 **표시 여부**입니다. 실행 중·중단됨·파일 있음·메뉴 열림·selected·진행률을 뜻하지 않습니다.
기본 COMPONENT 실측은 모두 true인 하나입니다. 추가 [진행 예시](../../references/chat-progress.figma.json)는 active-indicator/file/more=true·pause=false인 실제 인스턴스입니다.
16개 조합은 Boolean으로 계산할 수 있는 경우의 수이며16개 완성 시안을 검증한 결과가 아닙니다.

| 실제 인스턴스 | source·표시 |
| --- | --- |
| Breadcrumb `2916:58929` | `2427:25431`, separator=slash. 원본315×24 → 현재88×24 |
| BreadcrumbItem `I2916:58929;2427:25436` | `2372:36927`, separator Boolean=false. TEXT ‘breadcrumb’ 한 개 |
| pause/file/more 버튼3개 | 모두 `2427:25108`, type=ghost·state=default·size=24 |
| pause glyph | `2751:14602`, icon/pause/16 |
| file glyph | `2916:58366`, icon/file/16 |
| more glyph | `2751:16967`, icon/more/16 |

총8개 INSTANCE는 Breadcrumb2개·버튼3개·glyph3개입니다. glyph 인스턴스에 남은 `icon/plus/24` 이름은 실제 source·크기를 반영하지 않습니다.
plus로 바꾸거나24px glyph를 넣지 않습니다. 세 버튼은 icon collection의16 모드를 명시하며 실제 Vector 선은1px입니다.

TEXT 노드 이름이 BreadcrumbLink여도 실제 href가 있다는 뜻은 아닙니다. 현재 항목은 제품의 현재 위치 데이터로 연결하고
단일 샘플에서 상위 경로·이동 목적지를 만들지 않습니다. ‘breadcrumb’·88px는 제품 제목·고정 폭이 아닙니다.
하단 indicator는 RECTANGLE이며 진행률 bar·스크롤 위치·loading spinner·badge·live status가 아닙니다.
원본에는 메뉴 내용·파일 패널·대화 renderer·계정·tenant·차트·export 기능이 없습니다.


진행 예시의 주석은 thinking 중 하단 gradient 흐름을 요구하지만 root에 새 motion variant·실제 요청 API가 생긴 것은 아닙니다.
`indicatorMode`와 `indicatorSessionKey`는 [motion 문서](./motion.md)의 제품 API 제안이며, 기존 네 Boolean은 표시 역할을 유지합니다.
