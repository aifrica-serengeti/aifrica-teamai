# AgentHubIconButton — 검증

Figma 33개 variant의 geometry·색상·원본 glyph·변수 alias를 확인했습니다.
실제 제품 source/export·렌더링·상호작용은 아직 미검증입니다.
active 배경의 현재 기준은2026-11-05에 확인한 [토큰 변경표](../../references/tokens.figma.json)의 `3478:22791`입니다.

- 지원하는 33개 조합만 사용하고 primary active·20px outlined를 확인된 규격으로 추가하지 않습니다.
- 32px radius6, 24/20px radius4, 아이콘20/16/16px와 20px ghost 패딩2를 확인합니다.
- plus 예시의 20px 선1.25·16px 선1이 공용 보정으로 바뀌지 않았는지 확인합니다.
- outlined에만 inside 1px 검정10% 선이 있는지, alpha가 서로 다른 surface에서 합성되는지 확인합니다.
- primary 4상태와 #AAAAAA disabled glyph, ghost/outlined의 `color/button/opacity-active` 검정10% active를 비교합니다.
- active의 resolved `#0000001A`와 `alpha/100` 연결을 [토큰 foundation](../../foundations/Tokens.md)에 대조하고, 과거 실측의 `#EBF3FF`를 현재 active에 재적용하지 않습니다.
- active와 pressed의 의미를 분리하고 실제 toggle/팝업 동작이 있을 때만 해당 상태를 연결합니다.
- label·Tab·Enter/Space·focus·disabled·Tooltip·zoom·타깃 크기와 호출부의 중복 실행 방지를 검증합니다.
- dark/focus/loading 시각 규격은 제품에서 별도로 확인하고 실제 source/export만 로컬 mapping에 기록합니다.

## 2026-10-26 예약 페이지 점검 보강

size32에서 생략한 glyph20과 명시한 glyph24를 함께 검사하고 기존24/20 hit area·glyph16 기본값을 보존합니다.
Dialog의32/r4/24 조합과 공용 hover/pressed·색상200ms·동작 줄이기·native disabled 회귀를 확인합니다.
