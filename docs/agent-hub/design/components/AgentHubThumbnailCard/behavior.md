# AgentHubThumbnailCard — 동작과 데이터

목록 데이터·ID·title/meta/description·thumbnail 데이터·dot 의미·선택·disabled는 제품 owner가 제공합니다.
Figma state를 요청 단계 enum으로 저장하거나 카드 안에서 독립 선택·파일 조회·이미지 API를 만들지 않습니다.
실제 활성화가 있다면 한 host의 click에서 의도를 한 번 전달하고 native Enter/Space와 keydown에서 중복 실행하지 않습니다.

선택과 탐색은 제품이 채택한 패턴에 명시적으로 연결합니다. selected 시각만으로 checkbox/radio·aria-pressed·클릭 자동 토글을 결정하지 않습니다.
단순 정보 카드라면 불필요한 button·Tab target을 만들지 않습니다. 탐색/명령을 제공하는 경우에는 해당 native host를 사용합니다.
이 원본에는 독립 메뉴·닫기·footer 버튼이 없으므로 dot·thumbnail을 별도의 action으로 추가하지 않습니다.

thumbnail/description/dot Boolean은 실제 표시 branch를 제어합니다. false이면 노드·해당 gap·불필요한 읽기 요소를 함께 제거합니다.
description=false는 빈 설명 한 줄을 남기는 상태가 아니고 thumbnail=false는 회색 이미지 높이를 예약하는 상태가 아닙니다.
meta를 숨기는 Boolean은 원본에 없습니다. 제품에서 별도 optional meta를 채택하면 추가 확장으로 검증합니다.

기본 thumbnail은 이미지가 없는 회색 placeholder입니다. 실제 이미지 데이터가 주어지면 그 출처·alt·자르기·로딩/실패 표시를 제품이 결정합니다.
회색 placeholder를 네트워크 로딩 또는 오류 상태로 자동 해석하지 않습니다. 현재 샘플로 특정 대표 이미지나 이미지 renderer를 배포하지 않습니다.
dot을 읽지 않음·새 항목·실행 상태로 사용할지는 제품이 정하고 필요한 읽기용 설명을 제공합니다.
dot을 클릭해 상태를 변경하거나 카드 선택과 함께 자동 제거하지 않습니다.

disabled는 실제 활성화·선택 변경을 차단해야 합니다. #AAA 시각만 바꾸고 handler를 남기지 않습니다.
전체 opacity를 낮추지 않으며 선택+hover/pressed 우선순위·추가 요청 상태·모션은 제품에서 명시적으로 채택합니다.
가변 폭과 설명 길이에 따라 높이가 바뀌는 HUG 흐름을 보존하고 샘플343.5px에 내용을 잘라 맞추지 않습니다.


## 공용 색상 모션

공용을 채택한 경우 [Card 모션 적용](../../cards.md#공용-색상-모션-계승)과 [공용 모션](../../motion.md)을 따릅니다.
root의 background-color·border-color·box-shadow·color와 해당 텍스트 color는200ms ease로 전환합니다.
이 값은 공용 계승 계약이며 Figma 정적 시안의 motion 실측값이 아닙니다. 원본에 없는 상태·표면은 새로 만들지 않습니다.
disabled 입력은 즉시 차단하고 이 계약의 paint·opacity·정확한 SVG를 유지합니다. reduced motion에서는 전환을 해제합니다.
