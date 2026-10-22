# AgentHubIcon — 정의

메뉴·버튼·툴바·콘텐츠에 사용하는 단색 아이콘입니다. 파일의 색상 타일과 메인 마크는 별도 계약입니다.
제품에 필요한 입력은 다음과 같습니다. 이 입력 이름은 권장 adapter 계약이며 Figma prop이나 확인된 앱 API가 아닙니다.

| 입력 | 계약 |
| --- | --- |
| name | manifest `icons[].name`. 예: agent, chat, dataset, folder, skill |
| size | manifest에 실제 존재하는 16, 20, 24 중 하나. 명시 선택 |
| color | 제품의 semantic icon color. 원본 기본색은 styles 문서 참조 |
| label | 단독으로 정보를 전달할 때 의미 이름. 장식이면 접근성 트리에서 제외 |

`name + size`로 정확히 한 파일을 찾습니다. 지원 조합은 manifest가 기준이며 임의 문자열로 asset 경로를 만들지 않습니다.
공용 Icon 이름에 맞추려면 명시적인 이름 adapter를 두고 Agent Hub 원본 식별자를 잃지 않게 합니다.
직접 공용 컴포넌트 의존성은 없습니다. API·route·클릭 이벤트는 호출부가 소유합니다.
