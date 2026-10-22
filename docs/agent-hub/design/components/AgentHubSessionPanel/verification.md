# AgentHubSessionPanel — 검증

## 정적 원본 대조

1. [실측](../../references/session.figma.json)의6 roots·19 variant·404 nodes를 확인합니다.
   source/actual overrides·숨김 자식·property bindings·node mode를 함께 읽고 컴포넌트 이름만으로 구현을 추측하지 않습니다.
2. empty320×154/filled320×934, radius16/px12/py16/gap24/border1·내용폭294를 대조합니다.
   height는 샘플 HUG 결과이며 set의718×974 canvas를 실제 surface로 쓰지 않습니다.
3. filled의 예약276/진행148/출력208/컨텍스트196과 빈 두 섹션48px를 확인합니다.
   history white286×204·rows278×32, context left4+white290×168·rows282×32를 구분합니다.
4. SectionHeader와 Item/ProgressStep/ContextItem/HistoryItem이 실제 source를 재사용하는지,
   header24px와 history toggle의 source24/actual16/glyph16 override를 확인합니다.
5. 진행 done/active/pending3/pending4·마지막 connector=false와 출력 glyph5개·context label ‘볼륨’을 보존합니다.
   실제 selected history1·unread2와 standalone Boolean 기본 false를 구분합니다.
6. [자산](../../references/session.assets.json)의17 SVG가 로컬에서 열리고 크기·해시·색·stroke가 맞는지 확인합니다.
   pending circle에는 번호가 없으므로 제품 텍스트를 별도로 배치합니다.

[조합 대조](../../references/session-composition.json)는 snapshot의 source/geometry/paint와 전용 자산의 정적 일치 검사입니다.
제품 render·키보드·요청 실행·실제 접근성 테스트를 대신하지 않습니다.

## 소비 저장소에서 확인할 시나리오

- 실제 source/public export와 token/asset adapter를 찾고, 없으면 [새 구현](./implementation.md)을 연결합니다.
- empty·filled를 각각 렌더해 같은 폭·폰트·시안 데이터로 비교하고 border/Mid·기록과 컨텍스트 inset을 점검합니다.
- 각 section과 history를 독립적으로 접고 펼칩니다. + action 한 번에 추가 intent만 한 번 발생하는지 확인합니다.
- 현재 실행 선택과 unread를 각각 변경하고 progress 상태와 대화 draft/전송이 함께 바뀌지 않는지 확인합니다.
  읽음 정책·실제 업무 요청·중복 방지는 제품 계약의 기대값으로 검증합니다.
- keyboard/보조기술에서 heading·expanded·현재 실행·unread·진행 상태와 전체 파일명을 확인합니다.
  작은 toggle의 focus/hit area와 접힌 자식 focus 제외도 확인합니다.
- 가용 높이가 작은 shell·긴 파일명·큰 count·동적 항목 수에서 마지막 자료와 focus가 보이는지 확인합니다.
  시안에 없는 반응형·loading/error/disabled/dark/부분 빈 상태는 제품 확장으로 따로 검증합니다.
- consuming repository의 lint/typecheck/test/build를 실행하고 실제 검증 결과와 source/export만 로컬 매핑에 기록합니다.
  공유 `frontend.json`을 임의로 implemented로 바꾸거나 serengeti 원본을 수정하지 않습니다.

## 채택 동작 검증

- [모션 채택](../../motion.md)의250ms height/200ms glyph와 title-toggle gap2를 확인하고 기록 gap2를 중복 적용하지 않습니다.
- 제한 없는 filled934/empty154, 제한560px의 내부 scroll, 가로294/history278/context282px를 각각 측정합니다.
- bounded track의 위·아래 경계가 패널 외곽에서 각각16px인지 확인합니다.560px 패널의 viewport534px·track528px와 shell py12/content py4를 확인하고 첫·마지막 행의 정적 위치가 기존 py16 배치와 같은지 대조합니다.
- 스크롤 맨 위·중간·맨 아래에서 thumb가 radius16 곡면과 겹치지 않는지 확인합니다. drag 끝점에서 실제 scrollTop이0/최대값에 도달하는지, resize·접기 이후에도 같은 inset과 비율을 유지하는지 확인합니다.
- 끝 항목·키보드 focus·wheel/drag/resize·동적 추가에 따른 thumb 재측정과 외부 페이지 위치 보존을 확인합니다.
- 접기 중 inert/aria-hidden·trigger focus 복귀·최종 unmount, 빠른 재토글·본문 높이 변경·reduced-motion 즉시 완료를 확인합니다.
- 원본 참조 JSON은 정적 실측으로 보존하고 이번 채택값·제품 실행 결과를 따로 기록합니다.
