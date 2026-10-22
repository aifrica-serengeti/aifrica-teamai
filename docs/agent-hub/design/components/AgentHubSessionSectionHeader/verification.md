# AgentHubSessionSectionHeader — 검증

- collapsed false/true 두 원본과 실제 TEXT/Boolean 속성을 대조합니다. count 표시와 count 문자열을 구분합니다.
- 294×24·heading px4·title-group gap8·font14/20의 title600/count400·#1C1C1C를 확인합니다.
- toggle/action의 원본 `2427:25108` ghost/default24·radius4·glyph16을 확인합니다.
- down `2372:37015`/right `2842:38917`의 선1·#757575, plus `2365:15015`의 선1·#1C1C1C를 비교합니다.
  접힘 glyph를 잘못된 이름/생성 코드의 plus24로 바꾸지 않습니다.
- filled 예약/진행 상황/출력/컨텍스트와 empty 출력/컨텍스트의 count·toggle·action 실제 override를 비교합니다.
- showToggle/count/action false branch의 DOM·glyph·Tab target·빈 gap이 제거되는지 확인합니다.
- heading 의미·toggle expanded/controls·각 버튼 이름·단일 callback·focus-visible·disabled를 실제 제품에서 확인합니다.
- 접기 후 focus 복귀·본문 표시·보조 명령과 toggle 분리·문구/개수 갱신 owner를 검증합니다.
- 긴 제목·큰 count·번역·좁은 폭·zoom에서 읽기와 컨트롤 배치를 확인합니다. 새 모션/상태 시각은 별도 채택합니다.
- [구현 안내](./implementation.md)와 제품 검사 후 검증한 source/public export만 로컬 mapping에 기록합니다.

정적 원본·자산·조합 match는 실제 접기·추가 명령·서버 동작의 완료를 뜻하지 않습니다.

## 채택 변경 검증

- [사용자 채택](../../motion.md)의 title-group↔24px 박스 gap2와 title/count gap8을 따로 측정합니다.
- 회전 시작/중간/종료에도 버튼 박스·focus ring이 고정이고 최종 down/right가 기존16px 자산과 같은지 확인합니다.
-200ms 회전·250ms 본문과 빠른 연속 toggle, + action 분리, reduced-motion 즉시 전환을 검증합니다.
