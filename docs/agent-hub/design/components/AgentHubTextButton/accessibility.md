# AgentHubTextButton — 접근성

보이는 label로 동작을 알 수 있게 하고 arrow-right SVG는 장식으로 처리합니다.
SVG에 자체 tab stop·click handler·중복 접근성 이름을 두지 않습니다.
라벨을 제거한 아이콘 버튼은 이 노드의 지원 형태가 아니며 제품에서 명확한 이름과 해당 계약을 확인합니다.

native button의 Tab·Enter·Space와 실제 disabled를 유지합니다. Figma에 focused variant가 없어도
공용의 1px semantic focus outline·1px offset과 focus 이동 기준을 유지합니다.
부모 overflow나 스타일이 focus를 가리지 않는지 확인합니다.

24px 시각 높이만으로 타깃 크기나 접근성 통과를 보증하지 않습니다.
실제 surface에서 글자·아이콘·focus 대비, 주변 간격, zoom·번역·긴 label을 확인합니다.
필요한 조정은 제품의 명시적인 디자인 변경으로 기록하고 원본 값을 조용히 바꾸지 않습니다.

## 2026-10-26 예약 페이지 점검 보강

ref로 전달한 focus 대상은 실제 native button이어야 합니다. 펼침 상태·제어 대상·popup 관계를 호출자가 연결하고
disabled에서는 실행하지 않습니다. popup Escape는 상위 Dialog를 닫지 않고 trigger로 돌아와야 합니다.
