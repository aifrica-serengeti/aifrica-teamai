# AgentHubFilterChipGroup — 선택과 스크롤

그룹은 칩 배치를, 각 [FilterChip](../AgentHubFilterChip/behavior.md)은 단일 컨트롤의 활성화를 소유합니다.
실제 선택 값·필터 조건·URL·조회 요청·결과 갱신·초기화는 페이지가 소유합니다.
그룹 안에 별도의 선택 배열이나 API 상태를 만들어 페이지 값과 이중 관리하지 않습니다.

Figma description은 단일 선택에 기간·정렬과 “전체”, 다중 선택에 카테고리와 “전체” 없는 구성을 제안합니다.
실제 single/multi 선택 방식은 제품에서 명시합니다. 단일 선택의 재클릭·선택 해제 가능 여부·기본값,
다중 선택의 전체 해제·상한·disabled 항목 처리를 정하고 검증합니다.
예시의 첫 칩 selected나 여섯 개의 “전체”를 실제 조건으로 복사하지 않습니다.
“전체”가 필요하면 다른 조건과의 배타성을 페이지가 소유합니다.

칩을 추가·제거·재정렬할 때는 안정적인 제품 id를 사용하고 현재 선택과 focus의 이동 정책을 유지합니다.
count와 아이콘은 제품 데이터와 실제 명령을 연결합니다. 디자인에서 숨겨진 count `3`을 계산된 값처럼 표시하지 않습니다.
selected는 필터 적용 여부이며 pressed는 누르는 순간입니다. disabled·권한·비동기 중복 실행 차단은 실제 동작에도 적용합니다.

## layout별 동작

- hug는 칩 콘텐츠에 맞는 한 줄입니다. 좁은 화면에서 wrap이나 scroll로 바꿀지는 제품이 명시적으로 결정합니다.
- wrap은 가용 폭에 따라 줄바꿈하며 DOM의 읽기·Tab 순서를 시각 순서와 맞춥니다.
- scroll은 실제 제품에서 수평 overflow를 구현해야 합니다. Figma의 clipping만 복사해 잘린 칩에 접근할 수 없게 만들지 않습니다.
  마우스·터치·키보드로 모든 칩에 도달할 수 있어야 하며 focus된 칩을 보이도록 스크롤합니다.

fade는 추가 콘텐츠를 암시하는 장식입니다. 표시 여부는 실제 overflow·남은 방향·끝 도달 여부에 맞춰 제품에서 결정합니다.
원본 Boolean 기본값 true가 항상 fade를 켜 두라는 동작 계약은 아닙니다.
fade가 pointer·터치·휠을 가로채지 않게 하고, scroll 시 콘텐츠와 함께 떠내려가지 않도록 우측 viewport에 연결합니다.
끝 칩과 focus가 fade 뒤에 가려지지 않게 실제 가시 영역을 검증합니다.
새 스크롤 모션을 추가한다면 reduced motion과 반복 입력을 확인합니다. 모션 수치는 이 노드에서 정의하지 않았습니다.

2026-10-21 채택 구현에서는 scroll layout을 공용 스크롤 엔진에 연결하고 가로 방향·실제 viewport 측정값으로
fade를 판단합니다. 각 사용처에 ResizeObserver·drag·wheel·thumb 로직을 복사하지 않습니다.
focus된 Chip은 공개 `ensureVisible(element)` 같은 명시적 API로 같은 viewport 안에 노출하고
문서 전체를 `scrollIntoView`로 움직이거나 클릭할 때 scrollLeft를0으로 되돌리지 않습니다.
선택 상태가 달라져도 [Chip의 선 공간 예약](../AgentHubFilterChip/styles.md)으로 폭을 유지합니다.
이 엔진 연결과 [모션 채택 계약](../../motion.md)은 제품 구현 정책이며 정적 원본의 overflow NONE을 바꿔 해석하지 않습니다.
