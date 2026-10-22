# AgentHubThumbnailCard — 검증

- [실측](../../references/card.figma.json)의5 state와 표시 Boolean3개 기본true를 확인합니다. title/meta/이미지 API를 원본 속성으로 기록하지 않습니다.
- root324×343.5·radius24·border 포함1px·opacity1·clipping true를 대조합니다.
- 실제 thumbnail322×241.5/4:3·x1/y1과 아래1px #EEE의 layout 미포함을 확인합니다.
  생성 코드의324/243을 실제 내부 크기로 복사하거나 높이에 선1px를 중복 추가하지 않습니다.
- content322×100/p16/gap4, title-row290×24/gap8, title274+dot8의 공간과 dot 원본을 확인합니다.
- title16/24·600·1줄, meta12/16·400·1줄, description14/20·400·maxLines3와 실제 한 줄 샘플을 구분합니다.
- default/selected/disabled Overflow와 hovered/pressed Mid의 두 효과·순서를 비교합니다.
  selected의1px blue/EBF3FF에 inset1px를 추가하지 않습니다.
- disabled title/meta/description/dot #AAA와 thumbnail/선/그림자 유지·전체 opacity1을 확인합니다.
- [자산 기록](../../references/card.assets.json)의 dot enabled/disabled SVG를 사용하고 CSS 원을 중복 그리지 않습니다.
  회색 thumbnail을 다운로드된 실제 이미지로 취급하지 않습니다.
- false branch의 노드·gap·읽기 요소 제거, 제품 이미지 alt·선택/탐색 의미·native 단일 callback·disabled 실행 차단을 확인합니다.
- 긴 제목/최대3줄 설명·가변 폭·동적 이미지·focus clipping·zoom에서 읽기와 HUG 높이를 검증합니다.
  전체 Boolean 교차·selected+hover·dark·추가 상태·모션은 별도 채택한 근거로 검사합니다.
- [구현 안내](./implementation.md)와 제품 lint/typecheck/test/build·실제 render/keyboard 검증 후 source/public export만 로컬에 매핑합니다.
  `unmapped`/`draft`를 임의로 구현 완료로 바꾸거나 원본 serengeti를 수정하지 않습니다.

[조합 대조](../../references/card-composition.json)는 정적 원본·paint·geometry·자산 검사이며 제품의 선택·조회·이미지 동작 검증을 대신하지 않습니다.

- [공용 색상 모션](../../cards.md#공용-색상-모션-계승)의 root/텍스트에200ms ease와 property별 transition이 연결되는지 확인합니다.
  hover/pressed/disabled 진입·해제 뒤 시각값과 입력 차단을 검사하고, reduced motion에서 transition:none인지 확인합니다.
  원본 미제공 상태의 paint·전체 opacity0.4·SVG crossfade·geometry 전환을 새로 추가하지 않습니다.
