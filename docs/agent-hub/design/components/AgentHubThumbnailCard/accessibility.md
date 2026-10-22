# AgentHubThumbnailCard — 접근성

- 표시 전용 카드는 일반 목록/내용 구조를 사용합니다. 활성화가 있다면 제품이 선택한 native button 또는 link 한 개에 연결합니다.
  Figma의 selected 모양만으로 복합 listbox·radio·pressed 역할을 만들지 않습니다.
- button이면 이름·type=button·native Enter/Space·focus-visible을 연결합니다. link이면 실제 목적지를 제공합니다.
  카드 host 안에 추가 button·link를 중첩하지 않습니다. 이 원본에 없는 dot/이미지 action을 만들지 않습니다.
- disabled는 실제 host와 명령 실행을 함께 차단합니다. aria-disabled를 사용하는 패턴은 pointer/keyboard 실행 guard도 연결합니다.
- 카드 이름은 전체 title로 제공합니다. 제목 한 줄·설명 최대3줄 생략 후에도 전체 정보에 접근할 수 있게 하고
  Tooltip이나 hover만이 유일한 접근 방법이 되지 않게 합니다.
- 원본 placeholder는 장식입니다. 제품 이미지가 정보를 전달한다면 적절한 alt를 제공하고 제목과 중복되는 장식 이미지는 빈 alt를 사용합니다.
  이미지 추가·자르기 정책은 실제 콘텐츠와 함께 검증합니다.
- dot SVG는 장식으로 숨깁니다. 제품이 dot에 상태 의미를 부여했다면 읽을 수 있는 설명을 별도로 제공하며 색으로만 전달하지 않습니다.
  dot의 blue/#AAA를 선택·온라인·읽음으로 자동 읽지 않습니다.
- thumbnail/description/dot=false에서는 해당 읽기 요소와 빈 gap도 제거합니다. 숨김 자식이 focus target으로 남지 않게 합니다.
- root clipping과 focus 표시가 충돌하지 않게 wrapper/outline adapter를 검증합니다. radius24 윤곽에 맞는 실제 focus를 제공하고
  공용 radius10의 고정 focus span을 그대로 이식하지 않습니다. Viewer/페이지 전환을 열었다면 복귀 대상도 제품 owner가 관리합니다.

공용을 켠 UI 작업에서는 `DOCS_ROOT/frontend/design/components/Card/accessibility.md`의 관련 의미를 함께 적용합니다.
새 focus 시각·긴 문구·큰 글자·좁은 폭·대비·모션/reduced-motion은 제품에서 검증하며 이5개 정적 원본의 측정값으로 표시하지 않습니다.
