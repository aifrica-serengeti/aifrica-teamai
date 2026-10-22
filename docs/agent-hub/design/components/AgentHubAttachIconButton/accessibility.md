# AgentHubAttachIconButton — 접근성

공용 IconButton의 이름·키보드·focus·disabled 계약을 원형 시각 확장 후에도 유지합니다.

- native `<button type="button">`을 사용하고 Tab 이동·Enter/Space 활성화를 지원합니다.
- 아이콘만 있는 버튼이므로 실제 동작을 설명하는 `aria-label`이 필수입니다. 첨부 동작이면 “파일 첨부” 등 제품의 동작명으로 정합니다.
- 내부 SVG는 장식으로 처리하고 `aria-hidden="true"`를 적용합니다. SVG 자체에 tab stop이나 click handler를 두지 않습니다.
- 실제 `disabled`로 활성화를 차단합니다. 회색 표현이나 `aria-disabled`만으로 클릭 가능 상태를 남기지 않습니다.
- Figma에 focused variant가 없어도 공용의 1px outline·1px offset 기준을 유지합니다.
  원형 radius를 따르고 실제 surface의 semantic focus 색상·명확한 표시·부모 overflow를 확인합니다.
- Tooltip은 라벨을 대체하지 않습니다. 한 trigger에 하나만 조합하며 pending 중에도 Tooltip과 `aria-label`의 동작명을 유지합니다.
- `state5` 색상만 보고 `aria-pressed`, `aria-expanded`를 붙이지 않습니다. 실제 toggle·메뉴 열림 의미를 제품에서 확인한 경우에만 맞는 속성과 상태를 연결합니다.
- 32px 시각 frame만으로 타깃 크기나 대비 충족을 보증하지 않습니다. 실제 간격·zoom·surface와 사용 환경에서 검증합니다.

파일 선택기나 메뉴를 연결하는 경우 취소·닫힘 이후의 focus와 키보드 흐름도 제품 동작에 맞게 확인합니다.
파란 배경·흰 아이콘 및 disabled의 대비는 실제 배경에서 검사하고, 필요한 조정은 명시적인 디자인 변경으로 기록합니다.
