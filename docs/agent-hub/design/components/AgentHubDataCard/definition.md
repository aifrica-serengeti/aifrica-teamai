# AgentHubDataCard — 정의와 Chip 원본

Figma `2427:25252`는 `data-item` COMPONENT_SET입니다.
실제 속성은 state=enabled/hovered/pressed 하나이며 기본값은 enabled입니다.
title·description·Chip 문구를 제어하는 root TEXT property는 없습니다.

```text
데이터 카드
├─ text-group
│  ├─ title: data-name
│  └─ description: volume
└─ Chip: Type
```

‘data-name’·‘volume’·‘Type’은 보이는 샘플 문자열입니다. 실제 기본 데이터·볼륨 종류 enum이나 제품 API의 고정값이 아닙니다.
제품이 title/description/typeLabel을 받는 [제안 API](./implementation.md)는 원본 TEXT 속성을 추출한 결과와 구분합니다.

## 실제 하위 재사용

세 상태의 Chip 인스턴스 `2427:25257`·`2427:25262`·`2427:25267`은 모두 source `2079:12042`를 사용합니다.
원본은 Style=Pill·Size=Small·State=Enabled·Leading icon=False·Trailing icon button=False이며 원본42×20px입니다.
현재 ‘Type’ 문자열을 담은 실제 인스턴스는44×20px입니다.

Chip은 데이터 유형을 설명하는 정보 표시입니다. 독립 선택·토글·삭제·메뉴 action이 아닙니다.
[AgentHubAgentTypeChip](../AgentHubAgentTypeChip/README.md)이나28px [AgentHubPillChip](../AgentHubPillChip/README.md)의 원본을 재사용한 것이 아니므로 대체하지 않습니다.
hovered/pressed 카드 안에서도 Chip source/state는 Enabled로 유지됩니다.

카드 자체는 Figma Card·Button·Link·Checkbox 인스턴스가 아닙니다. source의 reaction 목록도 비어 있습니다.
공용 Card 의존은 정보/상호작용 의미를 적용하는 기준이며 실제 Card source 재사용·동작 구현을 보증하지 않습니다.
공용 Card의 Header·Summary·footer·더보기·선택 선을 자동 추가하지 않습니다.
