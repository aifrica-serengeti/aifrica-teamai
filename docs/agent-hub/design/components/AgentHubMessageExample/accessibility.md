# AgentHubMessageExample — 접근성

- 전체 예시를 하나의 native button으로 구현합니다. Tab으로 이동하고 Enter/Space로 한 번 활성화하며,
  내부에 별도 Button·Link를 중첩하거나 화살표에 추가 focus/click을 주지 않습니다.
- 보이는 문구가 접근성 이름에 포함되어야 합니다. 문구가 실제 수행할 행동을 이해할 수 있게 제품 데이터·locale을 연결합니다.
  필요하면 제품이 추가 설명을 연결하되, 아이콘 이름이나 전체 prompt payload를 label에 중복 낭독하지 않습니다.
- 화살표는 같은 동작을 보조하는 장식입니다. SVG는 `aria-hidden`·`focusable=false`, 외부 `img`는 `alt=""`로 처리합니다.
  `showIcon=false`이면 장식 노드도 제거하며 빈 슬롯을 접근성 트리에 남기지 않습니다.
- `pressed`는 순간 상호작용입니다. 선택 위젯·토글·`aria-pressed`·`aria-selected`로 바꾸지 않습니다.
  예시 목록을 별도 근거 없이 listbox·roving tab·새 방향키 탐색 위젯으로 만들지 않습니다.
- Figma에 focus 상태가 없어도 `:focus-visible`을 유지합니다. 공용을 켰다면
  `DOCS_ROOT/frontend/design/components/Button/accessibility.md`의1px outline·1px offset 의무를 적용하고,
  실제 색상·대비는 제품 semantic token에서 검증합니다. 부모 clipping으로 focus를 가리지 않습니다.
- disabled를 채택하면 실제 native disabled와 callback guard로 포인터·키보드 실행을 차단합니다.
  비활성 색상만 바꾸거나 `aria-disabled`만 붙여 동작을 남기지 않습니다. 해당 시각은 원본 세 상태의 검증 범위 밖입니다.
- 단순 예시 항목마다 live region을 추가하지 않습니다. 선택 후 draft나 요청 상태 안내가 필요하면 제품의 한 owner가 처리하고
  기존 입력기·대화 영역·알림과 같은 변화를 중복 낭독하지 않습니다.
- 선택 뒤 focus를 유지할지 입력기로 옮길지는 실제 명령의 의미에 맞춰 제품이 정합니다. 화살표 모양만으로 화면 이동·focus 이동을 확정하지 않습니다.
- 긴 문구·좁은 화면·확대 환경에서도 문구와 조작이 잘리지 않아야 합니다.44px 단일 줄 샘플만으로 전체 반응형·타깃 크기·대비 통과를 보증하지 않습니다.
