# AgentHubFlyout 동작과 상태 소유권

이 원본은 정적 컨텍스트 목록입니다. 메뉴 모션 채택은 목록의 명령·선택·폴더 펼침을 구현한 증거가 아닙니다.

| 상태 | 소유권 |
| --- | --- |
| open·닫힘 이유·호출 지점 |실제 popup/Presence owner 한 곳 |
| 표시 항목·순서·제목·개수·안내 |제품 데이터 adapter |
| 현재 파일 선택 |호출자, label/index 대신 실제 id 사용 |
| 폴더별 펼침 ID |폴더 조립을 채택한 호출자, optional disclosure adapter |
| focus target·탐색 |현재 flat/disclosure 목록 adapter 한 곳 |
| 비동기 로딩·권한·실행·실패 |제품 요청/명령 owner |

파일 선택 후 미리보기·다운로드·대화 첨부 중 무엇을 실행할지는 제품이 정합니다.
selected 그림만으로 원본 파일 API·다운로드·다중 선택·즉시 닫힘을 만들어내지 않습니다.
기존 draft·첨부·프로젝트·에이전트나 Tree 확장 상태를 자동 초기화하지 않습니다.

평면 목록은 펼침 API 없이 계속 사용할 수 있습니다. 후속 사용자 요청으로 채택한 폴더 조립에서는
`children`이 있는 entry를 폴더로 취급하고 선택과 펼침을 분리합니다. 빈 배열도 폴더이며 파일 명령으로 바꾸지 않습니다.
부모의 `disclosure.expandedIds`와 `onExpandedChange`로 펼침을 제어하고, 내부 state로 이를 복제하지 않습니다.
폴더 데이터가 있으면 disclosure를 함께 제공하는 것이 소비 API 계약입니다. 누락된 owner는 내부 state로 대신하지 않고 폴더 조작을 비활성화합니다.
폴더 버튼은 한 번의 native click으로 펼침 의도만 전달하고 파일 선택 callback을 함께 실행하지 않습니다.
button 안에 다른 button을 넣지 않습니다. 폴더 데이터가 없다면 disclosure를 제공할 필요가 없습니다.

패널 자체의 열림·닫힘은 Menu150ms 모션이고, 자식 목록은 [폴더 모션](./motion.md#폴더-펼침접힘-채택)의
높이250ms와 chevron200ms입니다. 닫는 자식은 즉시 inert/aria-hidden으로 제외하며 내부 focus를 폴더 버튼으로 복귀시킵니다.
빠른 재토글·닫는 중 재열기·unmount·동작 줄이기 변경에서 이전 완료 처리를 취소합니다.

컴포넌트 갤러리는 정적인 folder/folder-open 두 모습만 나열하지 않고 실제 펼침·접힘 예제를 제공합니다.
popup의 ‘분석 자료’는 `entries.children`과 부모 `disclosure`를 연결하고, 바로 보이는 하위 컴포넌트의 ‘파일 모음’도
부모 expanded·controlsId·buttonRef와 같은 AnimatedDisclosure helper를 연결합니다.
두 예제 모두 폴더는 펼침만 요청하고 파일은 선택만 요청합니다. 예제의 label·ID·파일 수를 제품 기본 데이터로 복사하지 않습니다.

child meta Boolean과 문자열은 표시 값입니다. '방금 생성'의 기한·live update·권한·링크 동작을 추정하지 않습니다.
Header count는 TEXT이므로 그려진 숫자나 실제 문자열count를 데이터 개수와 자동 합치지 않습니다.
제품 adapter가 실제 항목 수·총 수·로드된 수 중 의미를 정하고 설명을 일치시킵니다.

닫힐 때 즉시 노드를 제거하지 말고 [모션/Presence](./motion.md)를 연결합니다.
Escape·바깥 클릭·선택 후 닫힘과 focus 복귀는 실제 popup 의미에 맞춰 결정합니다.
이동한 focus가 숨긴 행·footer 밑에 남지 않게 실제 결과 변화에 맞춰 보정합니다.
body의 기존 ScrollArea가 overflow·thumb·resize·drag를 소유하고 부모는 공개 handle로 항목 노출을 요청합니다.
방향키에서는 `focus({preventScroll:true})` 후 `ensureVisible(element)` 같은 검증한 API를 사용해 고정 Header/Footer나
바깥 페이지를 함께 스크롤하지 않습니다.

장식 shell은 runtime에서 overflow:clip을 채택해 외부 scrollIntoView 호출로 shell 자체가1px 이동하지 않게 합니다.
content의 단일 ScrollArea viewport만 scrollable입니다. Header의 구분선은 이 viewport 밖에 두어 스크롤해도 사라지지 않습니다.
radius12·Footer y365/33은 보존하고, 채택한 Header63/body297 배치는 [스타일](./styles.md)에 따릅니다.
