# AgentHubIconButton — 검증

Figma 33개 variant의 geometry·색상·원본 glyph·변수 alias를 확인했습니다.
실제 제품 source/export·렌더링·상호작용은 아직 미검증입니다.

- 지원하는 33개 조합만 사용하고 primary active·20px outlined를 확인된 규격으로 추가하지 않습니다.
- 32px radius6, 24/20px radius4, 아이콘20/16/16px와 20px ghost 패딩2를 확인합니다.
- plus 예시의 20px 선1.25·16px 선1이 공용 보정으로 바뀌지 않았는지 확인합니다.
- outlined에만 inside 1px 검정10% 선이 있는지, alpha가 서로 다른 surface에서 합성되는지 확인합니다.
- primary 4상태와 #AAAAAA disabled glyph, ghost/outlined의 #EBF3FF active를 비교합니다.
- active와 pressed의 의미를 분리하고 실제 toggle/팝업 동작이 있을 때만 해당 상태를 연결합니다.
- label·Tab·Enter/Space·focus·disabled·Tooltip·zoom·타깃 크기와 호출부의 중복 실행 방지를 검증합니다.
- dark/focus/loading 시각 규격은 제품에서 별도로 확인하고 실제 source/export만 로컬 mapping에 기록합니다.
