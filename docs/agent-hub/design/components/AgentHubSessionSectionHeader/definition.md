# AgentHubSessionSectionHeader — 정의

원본 `2986:22139`는 `session/section-header` COMPONENT_SET입니다.

| Figma 속성 | 타입 / 기본값 | 의미 |
| --- | --- | --- |
| `title#2986:12` | TEXT / 출력 | 섹션 이름 |
| `count#2986:15` | BOOLEAN / false | count 표시 |
| `count#2986:18` | TEXT / 5 | 표시할 개수 문자열 |
| `toggle#2986:21` | BOOLEAN / true | 접기 버튼 표시 |
| `action#2986:24` | BOOLEAN / false | 보조 버튼 표시 |
| `collapsed` | VARIANT / false | false·true 두 원본 |

count 표시 Boolean과 count 문자열은 별개입니다. 숨긴5를 실제 총 개수·기본 결과 수로 사용하지 않습니다.
collapsed도 제품의 Boolean에 명시적으로 매핑하며 문자열 이름을 그대로 HTML 상태로 흘려보내지 않습니다.

| 실제 구성 | toggle | count 표시 / 문자열 | action |
| --- | --- | --- | --- |
| standalone false/true | true | false / 5 | false |
| filled 예약 | true | false / 0 | false |
| filled 진행 상황 | true | false / 0 | false |
| filled 출력 | true | true / 5 | true |
| filled 컨텍스트 | true | false / 5 | true |
| empty 출력·컨텍스트 | false | false / 0 | true |

부모의 실제 Header는 모두 펼침 원본 `2986:22115`를 재사용합니다. 독립 collapsed=true 원본은 `2986:22127`입니다.
원본 설명만으로 출력의 action을 숨기거나 empty 섹션에 toggle을 추가하지 않습니다.

toggle/action은 모두 `2427:25108`의 ghost/default/24 원본입니다.
펼침 glyph는 chevron-down16 `2372:37015`, 접힘 glyph는 chevron-right16 `2842:38917`, action은 plus16 `2365:15015`입니다.
접힘 자식의 이름 `icon/plus/24`와 생성 코드의 같은 이름은 실제 chevron-right source와 다릅니다.
이 이름 때문에 plus24를 가져오지 않습니다. 제목·toggle·action은 하나의 큰 클릭 영역이 아닌 구분된 형제 구조로 연결합니다.
