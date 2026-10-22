# AgentHubButton — 정의와 지원 범위

Figma에는 `type`, `size`, `state` variant와 label·leading-icon·trailing-icon·keycap 속성이 있습니다.
제품에서는 `type`이라는 디자인 속성을 HTML의 `type="button|submit|reset"`과 혼동하지 않도록
`variant` 등 기존 공개 API에 매핑합니다. 아래는 Figma의 지원 범위이며 검증된 앱 API 선언은 아닙니다.

| Figma type | 확인한 size | 확인한 state |
| --- | --- | --- |
| primary | 40, 32, 28 | enabled, hovered, pressed, disabled |
| secondary | 40, 32, 28 | enabled, hovered, pressed, disabled |
| tertiary | 40, 32, 28 | enabled, hovered, pressed, disabled |
| ghost | 28, 24 | enabled, hovered, pressed, disabled |

총 44개입니다. 네 속성 목록이 있다는 이유로 64개 조합을 지원한다고 해석하지 않습니다.
primary/secondary/tertiary 24px, ghost 32/40px, negative는 이 노드에서 확인하지 않았습니다.
추가로 필요하면 제품 요구와 해당 디자인을 확인해 별도 확장합니다.

구조는 native button 안의 leading icon·label·선택적인 keycaps·trailing icon입니다.
label은 한 줄, 폭은 콘텐츠와 slot에 따라 결정합니다. 원본 예시 폭 116/103/185/181/176px을
모든 버튼의 고정 폭으로 사용하지 않습니다. 높이는 styles 표의 실제 frame 값으로 유지합니다.

leading/trailing은 슬롯입니다. Figma 예시의 plus를 모든 동작의 아이콘으로 고정하지 않습니다.
기본 속성이 true여도 해당 슬롯이 실제 존재하는 variant를 확인합니다.
40/32px에는 keycaps 자식이 없고, 28px와 ghost 24px에는 keycap 예시 3개가 있습니다.
제품에서는 실제 표시할 단축키와 slot을 명시합니다. 직접 의존 계약은 `Button`, `AgentHubIcon`입니다.
