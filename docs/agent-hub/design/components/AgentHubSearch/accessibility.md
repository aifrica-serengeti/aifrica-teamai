# AgentHubSearch — 접근성

공용 Search·Input의 native 입력·label 연결·keyboard·focus 계약을 유지합니다.

- 실제 label과 id, 또는 제품에 맞는 숨김 label/접근성 이름을 연결합니다. placeholder나 돋보기만으로 이름을 대신하지 않습니다.
  도움말·오류를 지원하면 기존 `aria-describedby`·invalid 연결을 유지합니다.
- 공용의 text input·search inputMode 등 채택 API를 유지하고 native caret·선택·복사·IME를 지원합니다.
  caret 사각형이나 Figma 텍스트를 읽기 요소로 중복 렌더링하지 않습니다.
- search·x·filter glyph는 장식으로 숨기고 조작 이름은 소유 button에 제공합니다. Clear는 ‘검색어 지우기’처럼 목적을 표시합니다.
- 공용 Search clear의 Tab 제외(`tabIndex=-1`)·조작 후 input 복귀 계약을 유지합니다.
  제품이 별도 keyboard 노출 정책을 채택하면 이유·영향을 기록합니다. programmatic focus 시에도 focus 표시를 유지하고
  Enter/Space 조작이 중복 실행되지 않게 합니다. standalone IconButton의 Tab 계약을 자동 상속하지 않습니다.
- 필터는 새로운 실제 조작이므로 native button·`type="button"`·Tab·Enter/Space와 목적이 있는 이름을 제공합니다.
  적용 중인 필터는 색 외의 설명/상태로도 전달합니다. 실제 toggle일 때만 aria-pressed, 실제 팝업일 때만
  aria-expanded/controls를 소유 상태에 연결합니다. filtered 강조와 팝업 열림을 같은 값으로 쓰지 않습니다.
- 편집 가능한 enabled 입력 focus의 시각2px 경계를 유지합니다. read-only는 공용 Input처럼 focus·읽기가 가능하되
  focus ring을 표시하지 않는 계약을 따릅니다. clear는 공용 Search의2px outline·offset2px 의미를 보존합니다.
  필터의 keyboard focus도 실제 제품의 접근성 계약에 맞게 표시하며 clipping에 가려지지 않게 합니다.
- disabled/read-only에서 값 변경이 차단되는지 확인합니다. read-only를 disabled로 대체하거나 읽기·focus를 제거하지 않습니다.
- 20px clear와20/24px filter의 시각 치수만으로 타깃 크기·간격·대비 충족을 보증하지 않습니다.
  실제 배경·확대·긴 번역·keyboard 환경에서 입력과 조작 영역이 겹치지 않는지 확인합니다.

Figma의 Light mode12종은 실제 보조 기술·keyboard·대비 통과나 미제공 focus-visible 시각 상태의 검증 증거가 아닙니다.
