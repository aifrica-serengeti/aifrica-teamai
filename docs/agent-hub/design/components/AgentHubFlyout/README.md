# AgentHubFlyout

현재 컨텍스트의 파일을 평면 목록 또는 선택적으로 펼칠 수 있는 폴더 목록으로 탐색하는 Agent Hub 전용 Flyout입니다.
평면 목록은 그대로 지원하며, 폴더 데이터가 있는 조립에서는 부모가 펼침 상태를 소유합니다.
내부는 새 Figma 조합입니다. 패널 열림·닫힘은 **기존 Menu의150ms 모션**을, 폴더 본문은 공용 Accordion의250ms 높이 전환을 채택합니다.
Menu의 role·첫 item focus·14px 행·폭·높이 정책을 자동 상속하지 않습니다.

공용을 채택하고 `frontend-common` 역할을 선택한 frontend 작업에서 적용합니다.
공용을 끈 제품에는 이 catalog·Menu 모션·공용 문서를 강제로 요구하지 않습니다.
실제 제품 source/export는 `unmapped`이며 문서 수신이 앱 구현을 뜻하지 않습니다.

## 구성과 문서

[Header](../AgentHubFlyoutHeader/README.md)·[Footer](../AgentHubFlyoutFooter/README.md)·
[Item](../AgentHubFlyoutItem/README.md)을 조합합니다.

- [정의와 원본 재사용](./definition.md)
- [크기·색상·배치](./styles.md)
- [파일 선택·열림 소유권](./behavior.md)
- [접근성·키보드](./accessibility.md)
- [검증 항목](./verification.md)
- [신규 개발·기존 구현 연결](./implementation.md)
- [Menu와 동일한 모션 연결](./motion.md)

## 출처와 확인 범위

2026-10-21에 [Flyout](https://www.figma.com/design/cUKHT2PdHjAKRXZlzulnO5/?node-id=3010-23522),
[Header](https://www.figma.com/design/cUKHT2PdHjAKRXZlzulnO5/?node-id=3005-23089),
[Footer](https://www.figma.com/design/cUKHT2PdHjAKRXZlzulnO5/?node-id=3005-23094),
[Item](https://www.figma.com/design/cUKHT2PdHjAKRXZlzulnO5/?node-id=3005-23146)을 확인했습니다.

[실측](../../references/flyout.figma.json) · [변수](../../references/flyout.variables.figma.json) ·
[자산](../../references/flyout.assets.json) · [모션 채택 기록](../../references/flyout.motion.json) ·
[조합 대조](../../references/flyout-composition.json)

원본 shell의 전체 propertyDefinitions getter는 읽기 전용 오류로 수집하지 못했습니다.
null은 속성이 없다는 뜻이 아닙니다. 생성 context의 footer 기본true와 실제 자식의 visible binding을 확인한 범위로 남겼습니다.
내부 layout·원본 source·실제 override는 수집했습니다. 모션은 Figma 실측이 아니라 기존 Menu 규칙을 채택한 별도 계약입니다.

Header 아래 구분선의 고정 소유권과 폴더 펼침·접힘은 후속 사용자 요청으로 채택한 runtime 계약입니다.
원본 shell의 평면 구성이나 `references` 측정 JSON을 실제 계층 동작의 증거로 바꾸지 않습니다.
