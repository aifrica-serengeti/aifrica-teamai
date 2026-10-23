# AgentHubSessionContextItem — 접근성

- 기본 단일 action은 native button type=button·Tab·Enter/Space와 하나의 활성화 경로를 유지합니다.
  실제 역할이 값 선택이라면 부모가 선택한 listbox 등 패턴을 검증하고 option 안에 button을 중첩하지 않습니다.
- label과 전체 value를 읽을 수 있게 연결하고 count가 무엇의 개수인지 제품 문맥으로 설명합니다.
  시각적 value ellipsis나66px label-group clipping으로 접근성 이름까지 줄이지 않습니다.
- count는 별도 button·Badge 조작·자동 live region이 아닙니다. 실제 집계 안내가 필요하면 부모의 한 owner가 관리합니다.
- 텍스트와 같은 그룹을 표현하는 icon은 장식으로 숨깁니다. SVG·label·count에 별도 Tab·click을 주지 않습니다.
- selected만으로 `aria-pressed`·aria-expanded를 자동 부여하지 않습니다. 실제 현재 값/항목과 채택한 선택 패턴에 맞춰 상태를 연결합니다.
- 이 원본만 보고 aria-haspopup=menu·dialog를 붙이지 않습니다. 제품이 실제 팝업을 채택한 뒤 trigger 관계·열림·닫힘·focus 복귀를 검증합니다.
- focus-visible은 원본에 없어도 필수입니다. 공용을 켠 UI 작업에서만
  `DOCS_ROOT/frontend/design/components/Button/accessibility.md`를 연결하고 부모 scroll·clip 경계에 표시가 가려지지 않게 합니다.
- 추가 disabled는 native 속성과 handler guard를 함께 연결하며 pointer 차단만으로 keyboard 활성화를 남기지 않습니다.
- 긴 그룹명·value·count·번역·확대·좁은 폭에서 전체 정보와 조작이 유지되는지 검사합니다.
  32px 행과 Light 색상만으로 타깃 크기·대비·완전한 keyboard 지원을 검증했다고 선언하지 않습니다.

## 현재 채택: 대표 value 이동

전체 value 원문은 기존 native control의 접근성 이름에 한 번 남깁니다. 이동을 위해 별도 Tab 정지점·live region·복제 텍스트를 추가하지 않습니다.
value와 상위 행의 title 기반 기본 툴팁을 제거하고 원문 접근을 툴팁에 의존하지 않습니다. 기존 host의 keyboard focus는 hover와 같은 표시를 제공합니다.
disabled에서는 이동을 시작하지 않습니다. reduced-motion·forced-colors·print에서는 이동과 mask를 제거하고 정적인 시작 표시와 원문 이름을 유지합니다.
icon·label·count·focus 표시와 단일 활성화 의미를 보존하며 [공유 대안과 취소 계약](../../title-overflow.md)을 따릅니다.
