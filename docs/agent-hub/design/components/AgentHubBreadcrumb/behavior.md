# AgentHubBreadcrumb — 상태와 축약

상위 경로는 기존 router 또는 href로 이동하고 현재 위치는 비상호작용 텍스트로 표시합니다.
샘플의 마지막 라벨이나 Figma Separator Boolean만으로 실제 route를 판정하지 않습니다.
호출자가 현재 경로와 항목 순서를 연결하고, 같은 색상이어도 현재 위치의 의미를 유지합니다.

공용을 채택한 제품에서는 상위 링크의 hover·pressed 밑줄과 keyboard focus 표시를 유지합니다.
밑줄은 text-decoration 색상 전환 등 기존 공용 방식으로 처리하며, Figma에 hover 샘플이 없다는 이유로 제거하지 않습니다.
Agent Hub의 새로운 상태색·밑줄 애니메이션을 이 정적 두 구성에서 검증했다고 기록하지 않습니다.

자동 축약을 채택하면 공용의 root·끝쪽 우선 보존, 최소 root와 현재 위치 유지, 중간 경로의 메뉴 노출을 유지합니다.
숨긴 항목은 원래 순서로 접근·이동할 수 있어야 합니다. 단순 CSS 잘림으로 경로를 접근 불가능하게 만들지 않습니다.
수동 compound 구성이라면 자동 축약이 제공된 것으로 간주하지 않고 기존 제품의 축약·메뉴 소유권을 확인합니다.

글꼴이16/24px로 바뀌고 구분자가 자체 여백을 소유하므로 공용 예제의14px 글꼴·구분자7px·gap8px 측정 상수를
그대로 재사용하지 않습니다. 실제 label·font 로드·Separator·채택한 overflow 버튼의 폭을 기준으로 기존 측정 로직을 연결합니다.
원본에는 overflow 버튼·메뉴 구성이 없으므로 기존 Agent Hub IconButton이 이 용도로 검증됐다고 단정하지 않습니다.

공용 예제의 축약 메뉴는 onSelect adapter가 이동을 연결합니다. 실제 제품에서 href·router·callback 중 무엇이 이동을
소유하는지 확인하고 한 번 선택에 중복 이동이 일어나지 않게 합니다. 폰트 로드·리사이즈·아주 좁은 폭에서의 동작도 제품에서 검증합니다.

밑줄 복원은 [모션 채택 계약](../../motion.md)의 기존 색상 전환입니다. 상위 링크에 underline을 항상 켜 두고
`text-decoration-color: transparent`에서 hover/pressed의 currentColor로200ms ease 전환합니다.
color도200ms ease로 연결하며 `text-decoration-line: none`과 underline을 바꾸는 즉시 전환을 사용하지 않습니다.
현재 위치는 계속 비상호작용 텍스트로 두고 underline·scale·slide를 추가하지 않습니다.
reduced-motion에서는 색상 전환을 즉시 완료합니다. 실제 host 규칙이 없다면 컴포넌트 범위에 fallback을 둡니다.
