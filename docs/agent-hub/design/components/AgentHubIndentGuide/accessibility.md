# AgentHubIndentGuide — 접근성

[문서 인덱스](./README.md) · [Figma 관찰 기록](../../references/file-code-refresh.figma.json)

슬롯과 선에 `aria-hidden="true"`를 적용하고 tabIndex·button·separator role을 부여하지 않습니다.
코드와 가이드 사이에 텍스트로 공백·구분 기호를 삽입해 복사 결과나 스크린 리더의 코드 읽기를 바꾸지 않습니다.
active의 문서상 의미가 실제 편집기에서 필요하면 편집기 cursor/selection 접근성으로 전달하며 장식선을 별도로 읽게 하지 않습니다.
고대비 환경에서도 코드 텍스트와 편집기 포커스가 남아야 합니다.
