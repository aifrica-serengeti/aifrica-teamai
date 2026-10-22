# Flyout 모션 — 기존 Menu 규칙 채택

사용자 요청에 따라 Menu의 열림/닫힘 규칙을 Flyout surface에 동일하게 적용합니다.
Figma 내부 layout의 측정과 구분되는 **채택 계약**입니다. Figma motion 실측이나 실행 검증 결과가 아닙니다.
공용을 켜고 이 확장을 채택한 UI 작업에 적용하며 공용을 끈 제품에 강제하지 않습니다.

## 근거와 값

공용 채택 시 `DOCS_ROOT/frontend/design/components/Menu/behavior.md`와 `implementation/css.md`를 읽습니다.
저자 조사에서는 읽기 전용 serengeti-cmp의 `src/core/components/layout/menu/Menu.css.ts`를 대조했습니다.
파일 경로·해시는 [모션 기록](../../references/flyout.motion.json)에 남겼으며 이 경로를 Agent Hub 구현 위치로 사용하지 않습니다.
이 문서는 로컬 snapshot이고 공식 API 최신화나 consuming repository 구현 증거가 아닙니다.

| 항목 | 채택 값 |
| --- | --- |
| 열림·닫힘 |각150ms, ease, fill-mode both |
| 거리·불투명도 |6px 이동 + opacity0↔1 |
| top |open Y+6→0, close0→Y+6 |
| bottom |open Y-6→0, close0→Y-6 |
| left |open X+6→0, close0→X+6 |
| right |open X-6→0, close0→X-6 |
| side 미제공 |bottom과 동일 |
| 닫힘 guard |pointer-events:none |
| transform origin |실제 positioning adapter의 origin |

닫힘 pointer guard는 공용 문서 예시만이 아니라 **실제 Menu source**에서 확인한 근거입니다.
색상·선·shadow transition200ms는 이 open/close150ms와 별개입니다.
scale·spring·stagger·delay를 새로 추가하거나 Dialog의200ms scale 모션으로 바꾸지 않습니다.

## CSS 연결 예시

아래 클래스명은 제품에 연결할 제안입니다. 기존 자동 생성 class 문자열을 복사하지 않습니다.
`--flyout-transform-origin`에는 실제 popup adapter의 origin을 매핑합니다.
Menu primitive를 쓰지 않는 구현에 Menu 전용 CSS 변수가 자동으로 생긴다고 가정하지 않습니다.

```css
.agent-hub-flyout-motion {
  animation-duration: 150ms;
  animation-timing-function: ease;
  animation-fill-mode: both;
  transform-origin: var(--flyout-transform-origin);
}
.agent-hub-flyout-motion[data-state="closed"] { pointer-events: none; }
.agent-hub-flyout-motion[data-state="open"][data-side="top"] { animation-name: flyout-in-up; }
.agent-hub-flyout-motion[data-state="closed"][data-side="top"] { animation-name: flyout-out-up; }
@keyframes flyout-in-up {
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes flyout-out-up {
  from { opacity: 1; transform: translateY(0); }
  to { opacity: 0; transform: translateY(6px); }
}
.agent-hub-flyout-motion[data-state="open"][data-side="bottom"] { animation-name: flyout-in-down; }
.agent-hub-flyout-motion[data-state="closed"][data-side="bottom"] { animation-name: flyout-out-down; }
@keyframes flyout-in-down {
  from { opacity: 0; transform: translateY(-6px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes flyout-out-down {
  from { opacity: 1; transform: translateY(0); }
  to { opacity: 0; transform: translateY(-6px); }
}
.agent-hub-flyout-motion[data-state="open"][data-side="left"] { animation-name: flyout-in-left; }
.agent-hub-flyout-motion[data-state="closed"][data-side="left"] { animation-name: flyout-out-left; }
@keyframes flyout-in-left {
  from { opacity: 0; transform: translateX(6px); }
  to { opacity: 1; transform: translateX(0); }
}
@keyframes flyout-out-left {
  from { opacity: 1; transform: translateX(0); }
  to { opacity: 0; transform: translateX(6px); }
}
.agent-hub-flyout-motion[data-state="open"][data-side="right"] { animation-name: flyout-in-right; }
.agent-hub-flyout-motion[data-state="closed"][data-side="right"] { animation-name: flyout-out-right; }
@keyframes flyout-in-right {
  from { opacity: 0; transform: translateX(-6px); }
  to { opacity: 1; transform: translateX(0); }
}
@keyframes flyout-out-right {
  from { opacity: 1; transform: translateX(0); }
  to { opacity: 0; transform: translateX(-6px); }
}
.agent-hub-flyout-motion[data-state="open"]:not([data-side]) { animation-name: flyout-in-down; }
.agent-hub-flyout-motion[data-state="closed"]:not([data-side]) { animation-name: flyout-out-down; }
@media (prefers-reduced-motion: reduce) {
  .agent-hub-flyout-motion[data-state][data-side],
  .agent-hub-flyout-motion[data-state]:not([data-side]) { animation: none; }
}
```

기본8 keyframes·방향·기간은 Menu와 같습니다. reduce의 animation:none은 명시적으로 추가한 접근성 fallback입니다.
기존 Menu 자체와 전역 스타일에 reduce override가 있다고 확인한 것은 아닙니다.
따라서 '전역에서 자동 처리됨'이라고 생략하지 않고 실제 adapter에서도 확인합니다.

## Presence·위치·focus

위치를 계산하는 wrapper가 transform을 쓴다면 애니메이션 surface를 분리해 transform 충돌을 피합니다.
실제 배치 결과의 data-side를 사용하고 collision으로 방향이 바뀌면 새 방향과 origin을 연결합니다.
Header/Item/Footer 각각에 같은 애니메이션을 걸지 않고 surface 하나를 움직입니다.

실제 Menu source는 createPortal로 Content를 document.body에 연결하고 Content Presence가 exit를 유지하도록 설계돼 있습니다.
공용 문서의 Radix Portal 예시와 이 source 구현을 같은 것으로 기록하지 않습니다.
Flyout은 제품이 이미 사용하는 popup/Presence owner를 재사용해 닫힘 상태가 적용된 뒤 exit가 끝나도록 유지합니다.
부모의 `open && content` 조기 제거, 무조건150ms timeout 또는 animationend 한 경로에만 정리를 의존하지 않습니다.

reduced motion·도중 재열기·닫힘 취소에서도 노드 정리와 focus 복귀가 완료돼야 합니다.
closed surface는 pointer뿐 아니라 실제 keyboard/명령 target도 비활성화하며 숨긴 상태에 focus를 남기지 않습니다.
Menu와 같은 모션만 채택하는 것이며 portal·z-index·role=menu·첫 item focus 정책은 제품 popup 의미에 맞춥니다.
이150ms는 폴더 본문이나 행 hover에 복제하지 않습니다. 행 배경은 [Item](../AgentHubFlyoutItem/styles.md)의200ms 계약을 따릅니다.

제품에서4방향과 side 미제공, collision, exit 유지, 닫힘 도중 재열기, reduce, transform 충돌, focus 복귀를 검증하고 결과를 기록합니다.

## 폴더 펼침·접힘 채택

후속 사용자 요청으로 평면 목록에 더해 선택적인 폴더 disclosure를 채택했습니다. 이 동작과 수치는 Figma 실측이 아닙니다.
공용을 사용하면 Session/SNB와 같은 AnimatedDisclosure helper에서 Accordion 본문 **250ms ease**와 glyph **200ms ease**를 계승합니다.
부모가 expandedIds를 소유하고 folder 버튼은 한 번의 의도만 전달합니다. 선택 값이나 popup open을 대신 바꾸지 않습니다.

- 자식 목록의 측정 높이만 전환합니다. leading gap이 있다면 본문 안에 두어 함께 접고, row28px·label·파일 glyph는 움직이지 않습니다.
- 원본 down chevron 하나를 펼침0°↔접힘−90°로 회전합니다. source SVG를 매번 교체하거나 버튼·focus ring을 회전하지 않습니다.
- 닫는 본문은 즉시 inert/aria-hidden으로 제외합니다. focus가 자식 안에 있으면 폴더 버튼으로 돌려준 뒤 종료 시 본문을 제거합니다.
- 빠른 재토글·닫는 중 재열기·패널 닫힘·unmount·동작 줄이기 변경에서 이전 완료 처리를 취소합니다.
- reduced-motion에서는 회전·높이를 즉시 완료합니다. animationend/transitionend가 발생하지 않아도 정리와 focus 복귀를 완료합니다.

Tree 패턴을 자동 채택하지 않습니다. 이번 목록은 native 버튼·aria-expanded/controls와 중첩 ul을 사용하며,
실제 Tree가 필요하면 별도 focus manager와 전체 키보드 계약을 검증합니다.
