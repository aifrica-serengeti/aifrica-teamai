# AgentHubItemCard — 검증

1. [실측](../../references/card.figma.json)의 ItemCard6종과 Boolean4개 기본true를 확인합니다.
   실제 TEXT props가 없다는 점과 제품 문자열 API 제안을 구분합니다.
2. root324×146/r24/p16/gap16/border layout 포함·content290/72·footer24를 대조합니다.
   높이146은 샘플 HUG 결과이고 description의 maxLines는 null입니다.
3. hover#F8/press#F4+Mid, selected#EBF3FF+blue1, accent#EBF3FF+투명white1의 공간 유지,
   기본/selected/disabled/accent 그림자 없음을 확인합니다. 공용 Card의 r8·inset1 선택·opacity.4를 섞지 않습니다.
4. more6개가 실제 ghost20이고 glyph만 native24→16/inset2인지 확인합니다.
   pin/chat의24px FRAME·glyph16/inset4와 실제 source 재사용 범위를 구분합니다.
5. pin subtree는 hovered/pressed에만 존재하고 다른4종에는 없습니다. pin Boolean을 모든 상태에 노출하는 근거로 쓰지 않습니다.
6. [자산](../../references/card.assets.json)의 완성16px pin을 사용하고 fragment를16으로 늘리거나 회전을 중복하지 않습니다.
   more/chat/dot의 disabled paint도 정확한 파일로 연결합니다.
7. 실제 로고 PNG의 SHA1과 IMAGE hash가 맞는지, disabled saturation−1이 유지되는지 확인합니다.
   거절된 동일32px placeholder를 두 실제 도구 로고로 쓰지 않고 원본 데이터+필터 adapter를 제품에서 검증합니다.
8. [조합 대조](../../references/card-composition.json)는 source/geometry/paint/asset의 정적 검사입니다.
   실제 메뉴·고정 저장·대화/선택·keyboard·focus·touch·긴 제목·실패·dark 검증을 대신하지 않습니다.
9. main/more/pin/chat을 각각 한 번 활성화하고 sibling action이 카드 열기를 중복 실행하지 않는지 확인합니다.
   포인터 hover 없이 pin을 사용할 수 있는지, disabled가 모든 명령을 차단하는지 확인합니다.
10. [구현 연결](./implementation.md)과 제품 lint/typecheck/test/build·실제 render 검증 뒤 source/public export를 로컬 mapping에 기록합니다.
    확인 전 `unmapped`/`draft`를 유지하고 원본 serengeti를 수정하지 않습니다.

- [공용 색상 모션](../../cards.md#공용-색상-모션-계승)의 root/텍스트에200ms ease와 property별 transition이 연결되는지 확인합니다.
  hover/pressed/disabled 진입·해제 뒤 시각값과 입력 차단을 검사하고, reduced motion에서 transition:none인지 확인합니다.
  원본 미제공 상태의 paint·전체 opacity0.4·SVG crossfade·geometry 전환을 새로 추가하지 않습니다.
