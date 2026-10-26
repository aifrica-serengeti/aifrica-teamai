# AgentHubScheduleCard — 검증

- [실측](../../references/card.figma.json)의 실제 state5×status2=10종과 기본 default/active를 비교합니다.
  title/meta/예약 API를 실제 Figma TEXT/API property로 기록하지 않습니다.
- root324×118·radius24·p16/gap16·border 포함1px·opacity1·clipping false와 내부290px를 대조합니다.
- header290×44/info68×44/세로 gap4, title16/24·600, meta12/16·400과 구분자 gap4·HUG 샘플 폭을 확인합니다.
- footer290×24·space-between, run-status p8/4/gap4/r4와 toggle FRAME24/r4를 확인합니다.
  FRAME을 실제 IconButton 인스턴스로 기록하거나24px 원본을 축소한 것으로 처리하지 않습니다.
- active label 실제‘label’/delay, paused‘일시 중지됨’/pause와 독립 toggle의 pause/circle-play를 대조합니다.
- native16→status14의 실제 Vector 선0.875px와 toggle16 선1px·paint를 [자산 기록](../../references/card.assets.json)에 맞춥니다.
- default/selected/disabled shadow 없음과 hovered/pressed Mid, selected1px blue/EBF3FF를 확인합니다.
  Thumbnail의 Overflow·공용 선택 inset1px·전체 자식 opacity0.4를 복사하지 않습니다.
- disabled의 title/meta/separator/status label/두 glyph #AAA와 active #EEE/paused #F4 표면 유지·opacity1을 확인합니다.
- 실제 native 단일 callback·중복 요청 차단·status 제어·실패 복구·권한·disabled 차단을 제품에서 검증합니다.
  조회/선택과 status 변경은 서로 실행되지 않고 button이 중첩되지 않는지 확인합니다.
- 전체 상태 문구·각 button 이름·Tab/Enter/Space·focus-visible·상태 변경/제거 후 focus·좁은 폭·큰 글자·번역을 검사합니다.
  selected+hover·toggle 독립 상태·loading/error·dark·모션은 별도 채택한 기대값으로 검증합니다.
- [구현 안내](./implementation.md)와 제품 lint/typecheck/test/build·실제 render/API 결과를 확인한 뒤 source/public export만 로컬에 매핑합니다.
  검증 전 `unmapped`/`draft`를 유지하고 원본 serengeti를 수정하지 않습니다.

[조합 대조](../../references/card-composition.json)의 정적 match는 실제 예약 실행·중지/재개가 동작한다는 증거가 아닙니다.

- [공용 색상 모션](../../cards.md#공용-색상-모션-계승)의 root/텍스트에200ms ease와 property별 transition이 연결되는지 확인합니다.
  hover/pressed/disabled 진입·해제 뒤 시각값과 입력 차단을 검사하고, reduced motion에서 transition:none인지 확인합니다.
  원본 미제공 상태의 paint를 실측값으로 기록하지 않으며 전체 opacity0.4·SVG crossfade·geometry 전환을 새로 추가하지 않습니다.

## 제품 채택 완료·전체 카드·더보기 검증

- completed는 제품 확장으로 분리하고 원본10종·자산 목록을 세 번째 status로 늘리지 않습니다.
  active/paused/completed의 제목16/24·메타12/16·padding16·radius24·footer24 공간이 같고 완료 전용 ghost 제목 배치가 없는지 비교합니다.
- 완료 문구는 읽을 수 있는 일반 텍스트이며 pause/play·누락 자산 요청·빈 Tab stop이 없는지 확인합니다.
  완료 상태와 disabled를 구분하고 완료 카드의 주 명령이 동작하는지 확인합니다.
- trailing action24×24의 top/right가 카드 콘텐츠 padding16에 맞고 제목과8px 간격이 있는지 실제 render로 측정합니다.
  긴 제목·좁은 폭에서 버튼과 겹치지 않고 hover/focus/메뉴 열림/터치에서 조작 가능한지 확인합니다.
- 제목뿐 아니라 카드 여백·메타·읽기용 상태·footer 빈 공간에서 주 명령이 정확히 한 번 실행되는지 실제 hit test로 확인합니다.
  root의 중복 handler·추가 Tab stop·중첩 button이 없는지 검사합니다.
- 더보기는 메뉴만 열고 지금 실행·편집·공유·삭제·중지/재개는 해당 명령만 실행하는지 검증합니다.
  메뉴 portal 선택과 native Enter/Space도 주 명령을 동반 호출하지 않아야 합니다.
- disabled에서 주 명령·중지/재개·제품 trailing action 입력을 모두 차단하는지 확인합니다.
  CSS pseudo-element hit area와 padding 배치는 jsdom만으로 보증하지 않고 실제 브라우저에서도 검사합니다.
- 하단 조작이 실제 `AgentHubIconButton size=24`를 재사용하고 원본 pause/play·disabled SVG16px를 유지하는지 확인합니다.
  자체 raw FRAME button·표면 CSS로 공용 hover 검정5%·pressed10%·focus-visible을 누락하지 않아야 합니다.
- 상단 더보기의 opacity150ms와 background-color·border-color·color200ms가 함께 남는지 실제 computed style로 확인합니다.
  하단 버튼도 같은200ms 색상 전환을 유지하고 동작 줄이기에서 두 버튼의 노출·색상 transition이 해제되는지 검사합니다.
  이 hover/pressed·모션은 제품이 채택한 공용 버튼 계약이며 원본 FRAME의 새로운 Figma 실측값으로 기록하지 않습니다.
