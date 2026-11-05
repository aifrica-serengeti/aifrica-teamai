# AgentHubThumbnail

이미지 영역의 비율을 정하는 Agent Hub 전용 표시 primitive입니다.
제목·메타·선택 상태가 있는 [ThumbnailCard](../AgentHubThumbnailCard/README.md)와 별개로,
4:3·1:1·16:9 세 이미지 비율만 소유합니다. [확장 적용 조건](../../README.md)을 따릅니다.
실제 제품 source/export는 `unmapped`, 공유 채택 상태는 `draft`입니다.

2026-11-05에 Figma [thumbnail](https://www.figma.com/design/cUKHT2PdHjAKRXZlzulnO5/?node-id=3475-22919)의
세 variant를 확인했습니다. 샘플은 폭322px의 회색 placeholder이며 이미지 paint나 실행 기능이 확인된 것은 아닙니다.
공용 Card·다른 솔루션 이미지 컴포넌트의 border·그림자·button 의미를 자동 상속하지 않습니다.

- [정의](./definition.md)
- [비율과 시각 값](./styles.md)
- [동작·데이터 소유권](./behavior.md)
- [접근성](./accessibility.md)
- [검증](./verification.md)
- [구현 연결](./implementation.md)
- [실측](../../references/cards-actions-refresh.figma.json)
