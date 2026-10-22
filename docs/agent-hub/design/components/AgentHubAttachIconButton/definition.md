# AgentHubAttachIconButton — 정의와 지원 범위

Figma `icon-button/attach`는 `state` 속성을 가진 32×32px 원형 아이콘 버튼입니다.
확인한 상태는 `default`, `hovered`, `pressed`, `disabled`, `state5`의 5종입니다.
크기나 variant의 교차 조합은 제공하지 않으므로 다른 크기·outlined·primary 조합을 자동 생성하지 않습니다.

구조는 native button 안에 중앙 정렬한 24×24px `AgentHubIcon`입니다.
원본 아이콘은 `icon/plus/24`(node `2308:44299`)이며 1.5px round stroke를 사용합니다.
plus는 디자인의 예시입니다. 모든 동작의 아이콘을 plus로 고정하거나 새 SVG를 버튼 내부에 복제하지 않습니다.

공용 IconButton의 32px 기본 아이콘은 20px이고 radius는 4px입니다.
이 확장은 동일한 32px 버튼에 **24px 아이콘·완전 원형 radius**를 사용하며, 공용 기본값을 변경하지 않습니다.
직접 의존 계약은 `IconButton`, `AgentHubIcon`입니다.

`state5`는 원본의 이름을 그대로 기록한 미확정 상태입니다. 파란 배경을 근거로 selected·open·active·업로드 완료를
단정하지 않습니다. 이 표현이 필요한 제품에서는 실제 의미·진입/해제 조건·상태 소유자·접근성 속성을 먼저 매핑합니다.
Figma 상태 목록은 검증된 제품 API나 파일 업로드 구현을 뜻하지 않습니다.
