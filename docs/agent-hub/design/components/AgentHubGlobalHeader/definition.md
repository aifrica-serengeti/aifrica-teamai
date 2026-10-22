# AgentHubGlobalHeader — 정의와 실제 구성

`2611:62099`는 이름이 `Global Header`인 단일 COMPONENT입니다. root component properties는 `{}`이고
variant는 `null`입니다. 표시 Boolean·href·callback·SLOT·계정·tenant API는 없습니다. 수집한23개 노드의 reactions는 모두 비어 있습니다.

```text
Global Header:774×43
├─ service-logo FRAME:138×21.70786476135254
│  ├─ symbol-cheetah FRAME:21.70786476135254 square
│  └─ service-name TEXT:Cheetah Agent Hub
├─ Divider INSTANCE:숨김
├─ Breadcrumb INSTANCE:숨김
├─ chip FRAME:숨김
└─ header-actions FRAME:176×32
   ├─ button/cheetah-shortcut FRAME:136×24
   │  ├─ symbol-cheetah FRAME:16×16
   │  └─ label TEXT:치타 플랫폼 바로가기
   └─ icon-button/notification FRAME:32×32
      └─ icon/bell FRAME:20×20
```

보이는 로고·바로가기·알림·bell은 모두 직접 FRAME/TEXT/VECTOR입니다. 이름에 button·icon-button이 있어도
기존 AgentHubButton·AgentHubIconButton의 실제 source 재사용으로 기록하지 않습니다.
심볼의 원형 파랑은 `blue/500`의 `#0066FF`이며 제품 primary `#3B82F6`로 바꾸지 않습니다.

| 숨김 노드 | 실제 source·상태 |
| --- | --- |
| Divider `2611:62084` | `2019:118` Vertical, 실제17×12·내부1×12 선. 원본 source 높이165와 instance 높이를 구분 |
| Breadcrumb `2611:62085` | `2019:121` separator=slash, 실제98×24. 내부 BreadcrumbItem `2019:3679`의 separator Boolean은 false |
| chip `2611:62086` | INSTANCE가 아닌 FRAME85×28, 숨김 ‘워크플로우’ TEXT 포함 |

숨김 부모 안의 자식이 `visible=true`여도 유효한 화면 표시는 아닙니다. 기본 DOM·접근성 트리·Tab 순서·layout gap에
이 세 묶음을 추가하지 않습니다. 이전 Breadcrumb 확장과 source가 같다고 추정하거나 chip을 AgentTypeChip으로 바꾸지 않습니다.

서비스 로고의 링크 여부와 목적지, 바로가기의 실제 이동/명령, 알림이 여는 대상과 unread·badge는 제품이 정합니다.
이름이 header라는 이유로 페이지 제목·h1·날짜·Tab·SNB 접기·계정·tenant·검색을 추가하지 않습니다.
hover·pressed·focus·disabled·loading·dark·협소 폭·sticky·scroll 동작은 이 단일 원본에서 확인되지 않았습니다.
