# AgentHubScrollbar — 실제 스크롤과 표시 상태

원본은 정적 thumb 하나이며 현재 위치·전체 콘텐츠 길이·끝 도달·자동 스크롤을 나타내는 동작 계약이 아닙니다.
실제 스크롤 컨테이너가 `scrollTop`/`scrollLeft`, viewport/content 크기, native overflow와 스크롤 이벤트를 소유합니다.
thumb는 그 측정값의 시각적 표현으로 연결하고 독립된 가짜 스크롤 상태를 만들지 않습니다.

공용을 켠 UI 작업에서는 `DOCS_ROOT/frontend/design/components/Scrollbar/behavior.md`의 관련 계약을 유지합니다.

- 기존 `type`은 hover(기본)·always·scroll·auto이고, scroll/auto는 스크롤 종료800ms 뒤 표시 조건을 해제합니다.
  이 기능은 공용/CMP baseline이며 Agent Hub Figma에서 네 가지 표시 화면을 확인했다는 뜻이 아닙니다.
- 기존 방향은 vertical·horizontal·both이며 실제 viewport의 허용 축과 thumb 렌더 축을 맞춥니다.
  Agent Hub의 단일 세로 샘플로 가로/양방향 시각까지 검증됐다고 선언하지 않습니다.
- 콘텐츠가 viewport를 넘지 않으면 불필요한 thumb를 만들지 않습니다. 샘플160px를 계속 표시하거나 내용과 무관하게 고정하지 않습니다.
- thumb는 native viewport의 형제인 overlay로 배치해 내용과 함께 이동하거나 사라지지 않게 합니다.
  드래그는 같은 viewport를 한 경로에서 갱신하고 Pointer capture의 종료·취소·정리를 유지합니다.
- resize·콘텐츠 증가·폰트나 이미지 로드 뒤 측정을 갱신하고 thumb 길이와 위치를 함께 계산합니다.
  긴 콘텐츠에서는 기본 최소24px를 검토하되 실제 track가24px보다 짧으면 track 밖으로 늘리지 않습니다.

`verticalThumbOffset`을 채택했다면 상단 고정 영역만큼 수직 track의 시작점을 옮기며 실제 콘텐츠 위치를 임의로 이동시키지 않습니다.
`onScrollMetricsChange`를 사용하는 부모는 공개 콜백으로 실제 수직 측정값을 받습니다. wrapper 자식 순서를 조회해 상태를 추측하지 않습니다.
명시적 위치 변경은 기존 `ScrollAreaHandle.scrollTo()` 또는 검증한 동등한 공개 API로 연결합니다.
render·파생 상태가 바뀔 때마다 읽던 위치를 초기화하지 않습니다.

`stickToEnd`는 공용 기본값 false입니다. 채택할 때만 콘텐츠 증가 직전 최하단에 있던 사용자의 최하단 위치를 유지하며,
과거 내용을 읽는 사용자를 새 메시지·새 결과가 왔다는 이유로 아래로 강제 이동시키지 않습니다.
이 컴포넌트는 메시지 전송·선택·읽음·파일 조회·Menu 열림·Picker 필터 상태를 소유하지 않습니다.

공용의200ms opacity/background 전환은 기능 비교 baseline입니다. 이 원본의 모션으로 기록하지 않습니다.
실제 채택한 reduced-motion 처리를 제품에서 확인하며 숨김 opacity만으로 viewport 기능이나 키보드 접근을 제거하지 않습니다.
기존 Menu·Picker·Flyout의 원본 source·gutter·viewport 보정은 각 계약을 유지하고 이 시각 확장을 자동 전파하지 않습니다.
