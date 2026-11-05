# AgentHubFileCard — 접근성

공용 Card의 실행·선택 의미를 유지합니다. 사진형도 비사진형과 동일하게 파일을 식별할 수 있어야 합니다.
아래는 구현 의무이며 Figma에서 읽어 낸 ARIA 속성이 아닙니다.

| 상황 | 의무 |
| --- | --- |
| 단일 실행 | 실제 이동은 link, 명령은 button을 사용하고 접근 가능한 이름에 파일명을 포함 |
| 다중 선택 | native checkbox와 파일별 이름을 사용. 선택 상태는 checked로 전달 |
| 더보기 | native button과 `파일명 더보기`처럼 구분되는 이름. 팝업 속성은 실제 메뉴와 연결 |
| 복수 조작 | wrapper 안에 형제 control 배치. button 안의 button/checkbox 중첩 금지 |
| 키보드 | Tab으로 각 조작 접근, native Enter/Space 한 번 실행. focus-visible 표시 유지 |
| 숨겨진 조작 | opacity0 상태의 보이지 않는 버튼만 Tab에 남기지 않음. focus 진입 시 도구 노출 |
| 파일 glyph | 파일명/유형 텍스트와 중복이면 장식으로 숨김. glyph만으로 유형을 전하지 않음 |
| 사진 | 파일명과 동일 정보를 반복하는 장식 alt는 비우고, 실제 사진 설명이 필요하면 제품이 alt 공급 |

selected 링은 checkbox의 checked 상태나 focus 링을 대신하지 않습니다. focus와 selected를 각각 식별하고
선택 링이 parent clip에 잘리는지 검사합니다. disabled가 필요하면 실행/선택/메뉴 각각의 실제 권한과 disabled 상태를
연결하고 전체 opacity만 낮추어 비활성을 흉내 내지 않습니다. 이번 Figma에는 disabled 시각 샘플이 없습니다.

한 줄 생략은 시각 표시입니다. 전체 파일명을 접근 가능한 이름과 실제 상세 경로에서 읽을 수 있게 합니다.
커스텀 Tooltip을 의무로 추가하지 않습니다. 큰 글자·고대비·확대·좁은 grid에서 파일명과 조작 영역이 겹치지 않아야 합니다.
