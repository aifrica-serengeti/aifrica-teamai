# AgentHubIcon

Agent Hub 전용 system icon 자산 계약입니다. 공용 `Icon`의 의미·접근성 원칙을 이어받되
16px 선 두께와 이름·도형은 Agent Hub 원본을 사용합니다. 적용 조건은 [상위 안내](../../README.md)를 따릅니다.

Figma 컴포넌트 208개에서 동일한 upload 중복을 합쳐 SVG 206개를 제공합니다.
이는 실행 UI 라이브러리가 아니며, 기존 제품의 Icon 구현이 이 계약을 지원하면 그대로 재사용합니다.
직접 의존 공용 컴포넌트는 없습니다. 버튼·tooltip이 필요하면 호출부에서 조합합니다.

- [정의와 입력](./definition.md)
- [크기·선·색상](./styles.md)
- [상태와 동작](./behavior.md)
- [접근성](./accessibility.md)
- [검증](./verification.md)
- [자산 찾기](../../assets.md), [manifest](../../asset-manifest.json)
