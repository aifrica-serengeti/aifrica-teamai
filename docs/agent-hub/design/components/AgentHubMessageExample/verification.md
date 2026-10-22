# AgentHubMessageExample — 검증

2026-10-21의 Figma enabled·hovered·pressed 세 구성 기준입니다.
[조합 대조](../../references/message-example-composition.json)는 실제 원본·수치·자산의 일치를 확인하며 제품 action 검증이 아닙니다.

- COMPONENT_SET `2320:28612`의 state3종·Boolean `icon#2367:11` 기본 true를 확인합니다.
  root에 label TEXT property가 없으며 `message`는 샘플임을 구분합니다.
- 각 root의 HUG121×44px·padding12/20·r12·gap4·주축MAX·세로CENTER·NO_WRAP·clipping false,
  실제 strokes/effects 없음이 같은지 비교합니다.
- enabled #EBF3FF·hovered #CCE0FF·pressed #99C2FF와 세 semantic 변수 연결을 확인합니다.
  label14/20px·400·#1C1C1C·자간0, 샘플57×20px·x20/y12를 확인합니다.
- arrow-right20 원본 `2199:23690`, 세 인스턴스20×20px·x81/y12·선1.25px·round·#1C1C1C를 비교합니다.
  [기존 SVG](../../assets/icons/arrow-right/20.svg)를 재사용하며 새 자산은 추가하지 않습니다.
- 세 아이콘의 visible 참조가 같은 Boolean에 연결되는지 확인합니다. 아이콘 false의 별도 실측은 없으며,
  제품에서 glyph·wrapper·남는 간격이 제거되고 라벨 HUG 폭으로 계산되는지 검사합니다. 계산상97px를 고정하지 않습니다.
- 실제 Figma Button·Card·UserMessage 인스턴스 재사용을 주장하지 않습니다. AgentHubButton secondary의
  기본색·font600·높이·radius나 UserMessage의 typography/padding을 섞지 않습니다.
- native type=button·단일 host·Tab/Enter/Space·callback 한 번·장식 숨김·focus1px/offset1px를 제품에서 확인합니다.
  pressed를 selected/송신 완료로 바꾸거나 내부 화살표를 별도 버튼으로 만들지 않습니다.
- ID·표시 label과 prompt payload를 구분하고, 대체/추가/실행 중 제품이 채택한 한 명령에만 연결됐는지 확인합니다.
  기존 draft·IME·첨부·agent/project 보존과 요청 중복 차단은 해당 제품 owner에서 검사합니다.
- 긴 문구·긴 토큰·번역·확대·좁은 폭에서 제품이 채택한 줄바꿈·높이 증가를 확인합니다.
  단일 줄44px나 샘플 폭121px를 강제해 내용을 자르지 않습니다.
- focus·disabled·loading·dark·mobile 시각은 미제공입니다. 추가 채택 상태는 근거와 실제 검증 범위를 별도로 기록합니다.
- [구현 안내](./implementation.md)에 따라 실제 source/public export를 로컬 mapping에 기록합니다.
  문서·SVG 수신만으로 `implemented`를 선언하지 않습니다.

## 예시 주입 reveal 검증

- 예시 선택 직후 draft와 textarea.value는 전체 prompt이며, 좌→우 soft reveal만400ms 동안 동작해야 합니다.
- 같은 예시·다른 예시를 빠르게 다시 선택했을 때 이전 mask·문구가 남지 않고 최신 prompt만 표시되는지 확인합니다.
- reveal 중 직접 입력·IME·selection에서 효과가 즉시 취소되고 자동 submit·추가 callback이 없어야 합니다.
- 감소 모션·강제 색상·인쇄·미지원에서는 [정적 대안](../AgentHubChatComposer/external-text-motion.md)을 확인합니다.
