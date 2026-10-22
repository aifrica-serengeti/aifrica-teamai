# AgentHubPickerItem — 정의와 하위 원본

원본 `2627:61977`은 `picker/item` COMPONENT_SET입니다. `kind`는 agent/chat, `state`는 enabled/hovered이며
기본값은 agent·enabled입니다. 상태 이름을 선택 완료·요청 성공·모델 로딩 상태로 바꾸지 않습니다.

| 속성 | 기본값과 연결 |
| --- | --- |
| `title#2627:2` | ‘회의록 작성 도우미’, 두 kind 모두 title에 연결 |
| `meta#2627:7` | ‘전체 공개’, agent의 우측 문구 |
| `model#2627:12` | ‘Qwen 3.8’, chat의 모델 문구 |
| `description#2627:17` | ‘description’, 숨김 설명 텍스트 |
| `show-description#2627:22` | false, 네 description 노드의 visible에 연결 |

chat 원본의 title도 ‘회의록 작성 도우미’입니다. 이 샘플을 제품의 일반 채팅 제목으로 고정하거나,
kind가 chat이라는 이유만으로 title property 연결을 무시하지 않습니다.

```text
Picker 항목 행
├─ leading-info: 유형 Chip + title, gap8
│  └─ description 노드는 존재하지만 현재 숨김
└─ agent: meta
   chat: model-selector FRAME
         ├─ 모델 이미지20
         ├─ 모델 label
         └─ chevron FRAME16
```

## 실제 원본과 자산

| 구성 | 확인한 원본·관계 |
| --- | --- |
| agent enabled/hovered | `2627:61936` / `2627:61946` |
| chat enabled/hovered | `2627:61960` / `2627:61974` |
| agent 유형 Chip 두 개 | `3016:102467` assistant 원본을 실제 재사용 |
| chat 유형 Chip 두 개 | `3016:102480` common-chat 원본을 실제 재사용 |
| 모델 선택 묶음 | 일반 FRAME이며 Select·Dropdown·Button 인스턴스가 아님 |
| 모델 chevron | FRAME+Vector이며 독립 System icon 인스턴스가 아님 |

유형 Chip은 [기존 계약](../AgentHubAgentTypeChip/README.md)을 연결합니다. 다른 agent 유형의 Chip을 행에 조합하는 경우는
기존 유형 계약을 읽고 제품에서 추가 검증합니다. 이 네 구성에서 workflow/runtime 행까지 측정한 것은 아닙니다.

chat의 원본 이미지와 chevron은 [자산 기록](../../references/picker.assets.json)에 따라 연결합니다.
[Qwen 샘플 PNG](../../assets/picker/model-logo-qwen-sample.png)는20px 모델 slot의 참조 이미지이며 실제 모델 목록·기본 모델을 결정하지 않습니다.
[chevron 전용 SVG](../../assets/picker/model-chevron-down-16.svg)는 FRAME의 도형·여백을 보존합니다.
이 파일 연결을 Figma AgentHubIcon 인스턴스 재사용으로 기록하지 않습니다.

## 행 의미는 부모와 연결합니다

단순 항목 선택과 모델 선택이 서로 다른 명령이면 한 option/button 안에 모델 button을 넣지 않습니다.
이 경우 비상호작용 행 안의 형제 조작으로 나누고, 검색·여러 조작을 수용하는 Picker dialog 구성을 우선 검토합니다.
모델 묶음이 정보 표시일 때만 listbox option 안의 비상호작용 콘텐츠로 사용할 수 있습니다.
