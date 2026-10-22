# AgentHubThinkingStatus — 접근성

상태는 읽을 수 있는 텍스트로 전달합니다. 다색 로고·gradient·Header motion만으로 처리 중임을 알리지 않습니다.
BrandMark는 옆의 상태 문구와 의미가 겹치므로 alt=""·aria-hidden으로 장식 처리하며 Tab·button 역할을 만들지 않습니다.

## 상태 안내는 한 곳에서 관리합니다

제품의 기존 transcript 또는 semantic status 영역 중 **한 owner**가 생각 중 진입·종료·실패 등 필요한 변화를 안내합니다.
비긴급 상태에는 role=status/polite 같은 제품 접근성 정책을 채택할 수 있지만, 원본 FRAME이 해당 ARIA를 제공했다는 뜻은 아닙니다.
ThinkingStatus·Header·transcript·Notification에 같은 문구를 반복 등록하지 않습니다.

초가 바뀔 때마다 전체 ‘생각하는 중 · N초’를 live region에서 다시 읽지 않습니다.
시각 시간은 별도 비-live 표현으로 갱신하고, 읽기 가능한 고정 상태 라벨은 유지합니다.
경과시간을 AT에 제공해야 하는 제품은 사용자가 필요할 때 확인할 수 있는 비-live 경로를 정하며 시간 정보를 영구히 숨긴 채 충족했다고 간주하지 않습니다.
request ID는 상태 연결용이며 임의의 내부 식별자를 그대로 낭독하지 않습니다.

처리 상태가 바뀌어도 입력 focus·현재 읽는 메시지·scroll 위치를 탈취하지 않습니다.
완료·중단·실패의 후속 알림과 focus 정책은 제품 owner가 관리하고 이 정적 상태 행 안에서 새 오류 UI를 생성하지 않습니다.

## 균일한 글자와 읽기 대안을 연결합니다

기본/static/reduced의 글자는 `#000`/opacity0.69로 균일하게 표시하고 고정5-stop gradient를 남기지 않습니다.
원본 gradient는 비교 자료로만 보존합니다. 흰 띠는 지원 환경의 shimmer 장식층에서만 움직이며 대비 충족을 보증하지 않습니다.
실제 surface에서 대비를 검사하고 읽기 모드에는 `#1C1C1C`/opacity1, forced-colors에는 `CanvasText`/opacity1,
print에는 `#1C1C1C`/opacity1을 제공합니다. text clipping 미지원 환경도 균일한 기본 글자를 유지합니다.

감소 동작에서는 로고와 상태 문구가 정적으로 남습니다. 시간 표시가 사라져야 한다거나 별도 텍스트 shimmer가 허용된다는 의미가 아닙니다.
이미지가 실패해도32px 공간을 유지하고 문구만으로 상태를 이해할 수 있게 합니다.
긴 번역·큰 초 값·200% zoom·좁은 폭에서도 이름과 상태 문구가 잘리지 않는지 확인합니다.

## 채택한 글자 모션의 접근성

[흰 띠 모션](../../motion.md)은 시각층에만 적용합니다. 기본 상태 라벨과 시간 확인 경로를 중복 복제하지 않습니다.
`motion="static"` 또는 읽기 모드로 반복 효과를 멈출 수 있게 연결하고, reduced-motion·forced-colors·print에서는 장식층과 animation을 함께 제거합니다.
흰 띠가 멈춘 프레임이나 고정 gradient를 남기는 방식으로 대신하지 않습니다. 로고·글자 위치와 문구는 유지합니다.
상태 진입/종료의 기존 한 semantic owner와 비-live 경과 문구는 유지하며 초 변경을 반복 낭독하지 않습니다.
