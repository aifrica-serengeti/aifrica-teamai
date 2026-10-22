# AgentHubSessionProgressStep — 접근성

- 단계는 읽을 수 있는 label과 상태를 함께 제공합니다. 색상·check·원 모양만으로 완료/진행/대기를 전달하지 않습니다.
- 순서가 있는 단계 목록은 부모가 적절한 list/항목 구조로 연결합니다. 표시 단계 자체에 button·Tab 정지점을 만들지 않습니다.
- indicator와 connector는 장식으로 숨기고, 필요하면 “완료/진행 중/대기” 같은 읽을 수 있는 상태 설명을 한 번 제공합니다.
- active가 실제 현재 단계 의미로 채택된 경우에만 부모와 함께 `aria-current="step"`을 연결합니다.
  원형 그림만으로 숫자 progressbar·percentage·aria-valuenow를 만들지 않습니다.
- pending을 native disabled나 aria-disabled로 바꾸지 않습니다. 이 부품에는 활성화 target 자체가 없습니다.
- label이 말줄임돼도 전체 이름을 접근성 트리에 유지하고 실제 제품에서 전체 문구를 확인할 수 있게 합니다.
- 단계마다 자동 live region을 만들거나 active 원형에 독립 spinner 역할을 추가하지 않습니다.
  실제 작업 진행 공지는 갱신 빈도·사용자 작업에 맞춰 부모 한 곳에서 결정합니다.

순번이 여러 자리·번역·zoom·좁은 폭에서도 index와 label을 읽을 수 있어야 합니다.
원본 gray·blue·작은 글자만으로 대비와 보조 기술 통과를 보증하지 않으며 실제 surface에서 검증합니다.

[채택 halo](../../motion.md)는 장식이며 상태 이름을 추가로 낭독하지 않습니다. 기존 label+완료/진행 중/대기의 텍스트 설명을 유지합니다.
reduced-motion·forced-colors·print에서는 halo animation과 장식층을 제거하고 파란 중심만 남깁니다.
active 이미지의 중앙12px clip은 그대로 유지해 정적 하늘색 테두리가 되살아나지 않도록 합니다.
기존 label·상태 설명은 그대로 제공하며 원형 모양만으로 progressbar·Spinner role을 추가하지 않습니다.
