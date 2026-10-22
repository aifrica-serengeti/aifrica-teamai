# AgentHubFlyoutHeader — 동작과 데이터

Header는 제목·count·설명을 표시하며 독립 실행·선택·키 이벤트를 소유하지 않습니다.
열림·닫힘·focus·목록·비동기 요청과 데이터 집계는 [Flyout](../AgentHubFlyout/behavior.md) 및 제품 owner에 연결합니다.

제목과 meta는 제품의 실제 범위를 설명해야 합니다. 기본 “첨부파일”·설명이나 인스턴스의 `title`·`meta`를 실제 데이터로 고정하지 않습니다.
count는 제품이 제공한 표시 문자열을 사용하고 전체·현재 페이지·검색 결과 중 무엇을 나타내는지 같은 owner가 결정합니다.
Footer나 목록을 따로 조회해 count를 이중 관리하지 않습니다.

count 변경마다 live region·toast·focus 이동을 자동 추가하지 않습니다. 알림이 필요한 실제 사용 흐름은 제품이 정합니다.
Header 자체에 click handler·fold toggle·정렬·복사·필터 명령을 추가하지 않습니다.
긴 설명과 count 형식 변경은 HUG 높이·가용 폭을 다시 계산하고 부모의 viewport 배치와 함께 확인합니다.
shell이 `withDivider:true`를 전달하면 아래 구분선도 Header의 고정 장식이 됩니다. 이 선은 body scroll offset을 따르지 않습니다.
standalone 기본false는 유지하며 Header에 폴더 펼침이나 별도 입력 상태를 추가하지 않습니다.

이 부품의 TEXT 속성은 확인했지만 상위 Flyout의 전체 property getter는 읽기 제한이 있었습니다.
확인된 조합을 상위의 전체 공개 API·지원 상태 목록으로 취급하지 않습니다.
