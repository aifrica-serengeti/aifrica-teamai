# AgentHubScrollbar — 접근성

4px thumb와11px gutter는 시각 비교치입니다. 작은 도형 하나가 보인다는 사실만으로 스크롤 조작과 접근성이 완성됐다고 판단하지 않습니다.
공용을 켠 UI 작업에서만 `DOCS_ROOT/frontend/design/components/Scrollbar/accessibility.md`의 관련 의미를 함께 적용합니다.

- 실제 native overflow viewport를 유지해 휠·트랙패드·터치와 콘텐츠의 키보드 탐색이 작동하게 합니다.
  focus 가능한 콘텐츠가 없는 경우도 제품에서 검증해 키보드로 해당 영역에 도달하고 방향키/PageUp/PageDown/Home/End로 읽을 수 있는 경로를 제공합니다.
- viewport의 focus·이름·역할은 실제 콘텐츠와 제품 패턴에 맞춥니다. 정적 Figma root에 역할을 붙였다는 이유로 실제 viewport를 대체하지 않습니다.
  Tab을 가두거나 모든 중첩 스크롤 영역에 불필요한 focus 정지를 추가하지 않습니다.
- 실제 interactive thumb에 `role="scrollbar"`를 채택하면 방향·대상 viewport·현재 값과 범위·이름·키보드 조작을 함께 연결하고 검증합니다.
  장식 thumb라면 실제 스크롤 가능한 viewport가 조작을 제공해야 합니다. role만 추가한 비기능 도형을 접근 가능한 control로 선언하지 않습니다.
- 비교한 CMP source에는 thumb의 role/orientation과 Pointer drag가 있지만, thumb의 범위/대상 속성·자체 keydown·tabIndex는 없습니다.
  내부 viewport에도 명시적 tabIndex가 없습니다. 문서 예시나 이 source가 새 소비 제품의 접근성 검증을 대신하지 않습니다.
- 표시 중·숨김·drag·focus에서 실제 내용과 마지막 항목에 접근할 수 있어야 합니다.
  투명 thumb가 의도하지 않게 콘텐츠 조작을 가로막는지, 시각 gutter와 실제 hit area가 일치하는지도 확인합니다.
- 4px 시각 두께를 조작 가능한 영역의 충분성으로 간주하지 않습니다. 필요한 hit area·간격·입력 수단과 대비는 제품에서 검증하며,
  확대된 hit area를 새 Figma 실측 치수라고 기록하지 않습니다.
- #DDD를 전경/배경 대비와 무관한 접근성 승인값으로 취급하지 않습니다. 실제 콘텐츠 위 overlay·확대·고대비 환경에서 확인합니다.
  보조 조작을 hover만으로 유일하게 드러내거나 필수 내용을 색상만으로 전달하지 않습니다.
- focus-visible을 잘라내거나 숨기지 않습니다. imperative 스크롤은 focus를 자동 탈취하지 않고,
  위치 이동과 복귀·공지 정책은 호출한 페이지/팝업 owner가 관리합니다.
- reduced-motion에서 노출·스크롤 기능은 유지하고 채택한 불필요한 전환을 줄입니다.
  공용 문서의 전역 reduced-motion 설명만으로 실제 소비 제품에 해당 처리가 설치됐다고 가정하지 않습니다.

drag·키보드·터치·스크린리더·큰 글자·긴 콘텐츠·중첩 viewport는 실제 제품에서 확인합니다.
정적 Light 샘플 하나는 이 입력 수단이나 dark/focus 상태의 검증 결과가 아닙니다.
