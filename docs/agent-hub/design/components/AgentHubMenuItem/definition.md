# AgentHubMenuItem — 정의와 표시 속성

원본 `3135:16031`은 `menu/item` COMPONENT_SET입니다. `type`은 default/destructive,
`state`는 enabled/hovered/pressed/disabled이며 기본값은 default·enabled입니다.
제품의 HTML type이나 실행 결과와 혼동하지 않도록 기존 API의 intent/variant에 명시적으로 연결합니다.

```text
항목 묶음 root
├─ 선택적 section-header: 현재 숨김
├─ content: 실제 명령 항목
│  ├─ 선택적 leading icon: 현재 숨김
│  ├─ label: 표시
│  ├─ 선택적 value: 현재 숨김
│  ├─ 선택적 check: 현재 숨김
│  └─ 선택적 chevron: 현재 숨김
└─ 선택적 divider: 현재 숨김
```

| Figma 속성 | 확인한 의미 |
| --- | --- |
| `label#3146:27` | TEXT, 기본 ‘label’, 보이는 label에 연결 |
| `section label#3146:9` | TEXT, 기본 ‘section-title’, 숨김 header 안의 label에 연결 |
| `icon#3135:0` | Boolean, leading icon 표시 |
| `value#3135:9` | Boolean, 보조 value 표시 |
| `check#3135:18` | Boolean, check glyph 표시 |
| `chevron#3135:27` | Boolean, chevron 표시 |
| `section header#3146:0` | Boolean, header 표시 |
| `divider#3146:18` | Boolean, divider 표시 |
| `icon-swap#3135:36` | INSTANCE_SWAP, 기본 edit/16 `3018:24803` |

여섯 표시 Boolean은 모두 기본 false이고 standalone 여덟 구성에서도 해당 노드는 숨겨져 있습니다.
숨긴 인스턴스의 자식 Vector가 visible=true여도 실제로 보이는 아이콘은 아닙니다.
켜지지 않은 slot의 저장 좌표·폭·gap을 빈 공간이나 접근성 요소로 복원하지 않습니다.

`value`는 문자열 값이 아닌 **표시 Boolean**입니다. 숨김 텍스트의 ‘value’는 고정 샘플이며 별도 TEXT property가 없습니다.
제품이 보조 문구를 받는 `valueText` API는 구현 제안으로 구분합니다. check도 glyph 표시이며 그 자체가 Checkbox·Button·토글은 아닙니다.

## 실제 아이콘 원본

leading edit는 `3018:24803`, check는 `3074:98929`, chevron-right는 `2842:38917`의16px 원본을 참조합니다.
[자산 기록](../../references/menu.assets.json)과 [기존 manifest](../../asset-manifest.json)의 정확한 자산을 연결합니다.
화살표·체크 모양만으로 실제 submenu·선택 값·route를 만들지 않습니다.

icon-swap에는 preferred component key62개가 기록돼 있습니다. 이 목록은62개 도형의 크기·상태색·모든 조합을 검증했다는 뜻이 아닙니다.
이번 여덟 구성의 실제 기본 원본은 edit/16이며, 다른 swap을 제품에서 채택할 때 원본·자산·paint를 따로 확인합니다.
