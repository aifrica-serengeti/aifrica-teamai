# AgentHubFlyoutItem — 선택·확장과 상태 소유권

행은 제품 데이터의 ID·label·count·meta를 보여 주고 선택 또는 확장 의도를 한 경로로 전달합니다.
파일 선택 값은 부모 owner가 관리합니다. 원본 folder-open은 정적 시각입니다.
후속 사용자 요청으로 채택한 폴더 recipe에서는 부모의 optional disclosure가 펼침 상태를 소유하고 행은 그 값을 표시합니다.
평면 목록에서는 이 owner가 필요 없으며 standalone 참조를 표시만 한다면 상호작용을 추가하지 않습니다.
‘파일 이름.docx’·‘7’·‘방금 생성’을 실제 파일·개수·생성 상태의 기본 데이터로 고정하지 않습니다.

## 파일과 폴더의 명령을 구분합니다

- item/child의 활성화가 선택 변경·파일 열기·첨부 확정 중 무엇인지는 [부모 Flyout](../AgentHubFlyout/behavior.md)과 제품이 결정합니다.
  이 원본만 보고 파일을 열거나 메시지를 자동 전송하지 않습니다.
- 실제 entry에 `children`이 있으면 빈 배열도 폴더입니다. 부모의 disclosure를 제공하고 한 번의 폴더 활성화가 expanded 변경만 요청하게 합니다.
  disclosure가 누락되거나 disabled면 폴더 조작을 차단하며 파일 선택으로 대신 실행하지 않습니다.
  부모 값에서 folder/folder-open을 파생하고 native 버튼의 expanded·controls와 실제 하위 목록을 연결합니다.
- 폴더 선택과 확장을 별도 조작으로 제공할 경우에는 실제 데이터·keyboard·focus 구조를 먼저 정합니다.
  button 안에 chevron button을 넣거나 treeitem 안에 임의의 두 번째 Tab 조작을 추가하지 않습니다.

어떤 조작을 제공하든 native click·keydown·부모 wrapper에 같은 callback을 중복 연결하지 않습니다.
flat 목록의 native button은 type=button·Enter/Space를 사용하고, tree 패턴은 부모 focus manager의 한 활성화 경로를 사용합니다.
disabled를 추가하면 실제 변경·확장·요청을 guard하고 hover/active도 차단합니다. 비활성 시각 값은 이 원본에서 확인한 값이 아닙니다.

## 시각 상태와 제품 상태를 구분합니다

hovered/pressed는 포인터 상태이며 지속 선택이나 요청 성공이 아닙니다. selected는 item에만 실측되어 있습니다.
채택한 폴더 recipe의 child selected는 기존 item의 `#EBF3FF`와 `aria-pressed`를 재사용합니다. 폴더 selected/pressed와
비활성·로딩을 자동 생성하거나 child selected를 Figma 지원 조합으로 기록하지 않습니다.
실제 폴더 로딩·오류·빈 결과·권한·다중 선택·선택 확정은 제품과 부모가 소유합니다.

meta Boolean false이면 문구·gap·접근성 설명도 생략합니다. true에서는 제품이 제공한 문구를 읽을 수 있게 연결합니다.
‘방금 생성’이라는 문구와 파랑만으로 live region·성공 토스트·링크를 만들지 않습니다.
count는 실제 집계 정책과 별개인 표시 문구이며 권한·데이터 로딩 여부를 대신 판정하지 않습니다.

## 부모 모션과 하위 확장을 분리합니다

기존 Menu와 같은 Flyout 열림·닫힘 모션은 [부모의 모션 계약](../AgentHubFlyout/motion.md)을 따릅니다.
행마다 별도150ms presence를 만들거나 패널 모션을 자식 확장에 그대로 복제하지 않습니다.
원본은 정적 folder/folder-open 두 모습이며 자식 확장 애니메이션·삭제·unmount 시점은 측정하지 않았습니다.
채택 runtime은 Session/SNB와 같은 AnimatedDisclosure helper의 높이250ms ease와 down glyph 회전200ms ease를 사용합니다.
open0°↔closed−90°로 glyph만 움직이며 버튼 hit area·focus ring·행 높이는 유지합니다.
닫는 자식은 즉시 inert/aria-hidden으로 제외하고 내부 focus를 폴더 버튼으로 복귀시킨 뒤 종료 시 제거합니다.
빠른 재토글·재열기·unmount·reduce 변경에서 이전 완료 처리를 취소합니다. 이 모션을 Figma 실측으로 주장하지 않습니다.
실제 Tree를 별도 채택하면 그 선택·전체 keyboard·수명 관리 계약도 검증합니다.
