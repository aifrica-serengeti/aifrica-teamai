# AgentHubIconButton — 정의

텍스트 대신 아이콘으로 동작을 보여주는 정사각형 버튼입니다. 이름이 있는 native button을 사용하고
아이콘은 장식으로 배치합니다. 원본의 plus는 예시이며 모든 동작의 아이콘을 plus로 고정하지 않습니다.
직접 의존 계약은 `IconButton`, `AgentHubIcon`입니다.

| Figma type | size | state | 개수 |
| --- | --- | --- | --- |
| ghost | 32, 24, 20 | default, hovered, pressed, disabled, active | 15 |
| outlined | 32, 24 | default, hovered, pressed, disabled, active | 10 |
| primary | 32, 24 | default, hovered, pressed, disabled | 8 |

총 33개 조합을 확인했습니다. outlined/primary 20px, primary active와 active+hover 조합은 제공되지 않았습니다.
속성 목록을 단순 곱한 45개 조합을 지원한다고 해석하지 않습니다.
Figma 기본값은 ghost·32·default입니다. 제품의 누락된 요구를 이 기본값으로 대체하지 않습니다.

권장 입력은 기존 API의 시각 variant, 크기, 아이콘 slot, 동작 이름, disabled와 실제 action입니다.
Figma의 `type`은 HTML button의 `type`과 구분하고, 기본 HTML type은 `button`으로 둡니다.
실측 기록의 속성은 Figma 정의이며 확인된 앱 API가 아닙니다.

컨테이너는 고정 정사각형이고 glyph를 가로·세로 중앙 정렬합니다.
tooltip이 필요하면 호출부가 기존 Tooltip을 조합합니다. API·라우팅·비동기 상태를 아이콘 버튼 안에 숨기지 않습니다.
