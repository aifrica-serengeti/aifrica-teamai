# AgentHubFileViewer — 접근성

[문서 인덱스](./README.md) · [Figma 관찰 기록](../../references/file-code-refresh.figma.json)

이름 있는 region과 선택/복사 가능한 코드 텍스트를 제공합니다. 파일 경로·파일명으로 어떤 코드를 보는지 식별할 수 있어야 합니다.
줄 번호·guide·장식 scroll-corner는 코드 원문이나 스크린 리더 낭독에 섞지 않습니다.
색만으로 문법 의미를 전달하지 않고 코드 텍스트를 그대로 유지합니다.

복사/확대는 실제 native button과 동작별 이름을 제공하고 glyph는 빈 alt/aria-hidden으로 둡니다.
복사 성공/실패 알림은 필요한 짧은 상태 전달로 한정하며 tooltip은 focus/hover가 끝나면 사라집니다.
실제 disabled와 Enter/Space 차단·활성화는 공용 IconButton 계약을 유지합니다.

코드 viewport는 키보드로 진입·스크롤할 수 있고 긴 한 줄의 끝·마지막 줄까지 접근할 수 있어야 합니다.
원본 clipping을 보조기술 접근 차단으로 복제하지 않습니다.
확대/복원/닫기 시 이전 유효 trigger로 돌아갈 focus owner를 제품 패널에 하나만 둡니다.
읽기 전용 코드에 행마다 tabIndex=0을 부여하지 않으며 편집기가 필요하면 별도 검증된 engine 접근성을 연결합니다.
