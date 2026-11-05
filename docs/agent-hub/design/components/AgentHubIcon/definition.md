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

2026-11-05에 확인해 추가한 조합은 `refresh-cw/24`(`4093:235219`)와
`chevron-up/16`(`3464:60457`)입니다. 다른 크기도 보드 metadata에 있지만 SVG를 확인하기 전에는
해당 조합이 배포됐다고 간주하지 않습니다. 공용 Icon에 새 컴포넌트를 중복 정의하지 않고
Agent Hub의 glyph 목록을 확장합니다.

source `3216:79474`의 표시 이름은 과거 `icon/skill/16`에서 `icon/skill/24`로 정정됐습니다.
기존 canonical은 원래 실제 24px였으므로 그대로 유지합니다. 이 이름 변경만으로 도형 변경을 주장하지 않습니다.
원본의 `seperate` 철자, 새 `setting`과 기존 `settings`의 관계는 glyph를 확인하기 전에는 자동으로 통합하지 않습니다.
