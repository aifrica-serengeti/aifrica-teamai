# AgentHubPickerFooter — 정의와 조합

원본 `2627:62004`는 단일 COMPONENT이며 `properties: {}`입니다. state·showLink Boolean이나 root 텍스트 속성은 없습니다.
레이아웃은 키보드 안내와 선택적인 찾기 동작을 좌우로 배치합니다.

```text
Footer surface
└─ footer-content
   ├─ key-hints
   │  ├─ ↑ · ↓ keycaps + 이동
   │  ├─ 세로 Divider
   │  └─ ↵ keycap + 선택
   └─ optional action: 에이전트 찾기 + chevron-right16
```

| 대상 | node / source | 확인한 사실 |
| --- | --- | --- |
| standalone footer | `2627:62004` | 768×39px, 찾기 표시 |
| 첫 Picker footer | `3016:104832` → `2627:62004` | 776×39px, 찾기 표시, 부모 내부 y416 |
| 두 번째 Picker footer | `2978:58170` → `2627:62004` | 532×39px, 찾기 subtree 부재, 부모 내부 y497 |
| keycaps | `2627:61998`, `2627:62000`, `2627:62002` → `2627:6196` | label이 각각 ↑·↓·↵인 실제 keycap 인스턴스 |
| Divider | `2627:61988` → `2019:118` | Vertical 원본을 17×14px로 연결 |
| 찾기 동작 | FRAME `2627:61993` | 실제 Button/TextButton 인스턴스가 아님 |
| chevron | FRAME `2627:61995` | 16×16px 내부 vector, 일반 Icon 인스턴스가 아님 |

두 번째 footer에는 footer-content의 key-hints만 반환되며 footer-link subtree가 없습니다.
이를 `visible=false` 노드가 관찰된 것으로 기록하거나 Figma에 showLink Boolean이 있다고 해석하지 않습니다.
제품의 `showLink=false`는 이 부재 구성을 표현하기 위한 제안 API입니다.

하위의 keycap label 속성은 keycap 원본 소유입니다. Footer root에 같은 props가 이미 있다는 뜻은 아닙니다.
`Divider`는 실제 재사용, `Button`은 native 동작 의미, `AgentHubIcon`은 자산 연결 계약으로 구분합니다.
같은 모양이라는 이유로 Footer를 TextButton 변형이나 독립 전역 단축키 컴포넌트로 바꾸지 않습니다.
