# AgentHubFileCard

파일 목록에서 파일 종류·이름·메타 정보·미리보기와 선택 상태를 보여 주는 정사각형 카드입니다.
[디자인 확장 적용 조건](../../README.md)을 따릅니다. 공유 계약이며 실제 제품의 source/export는 `unmapped`, 채택 상태는 `draft`입니다.

2026-11-05에 Figma [file-card](https://www.figma.com/design/cUKHT2PdHjAKRXZlzulnO5/?node-id=3624-24877)의
7개 유형 × 3개 상태, 총21개 variant를 확인했습니다. 기본 샘플은256×256px이며 `image`만 표면 전체가 사진입니다.
기존 [FileItem](../AgentHubFileItem/README.md)의 가로 출력 행이나
[ThumbnailCard](../AgentHubThumbnailCard/README.md)의 이미지·설명 카드에 이 geometry를 덮어쓰지 않습니다.

직접 의미 의존은 `Card`와 `AgentHubCheckbox`, `IconButton`입니다. 공용을 켠 경우
`DOCS_ROOT/frontend/design/components/Card/README.md`의 활성화·접근성·상태 소유권을 유지합니다.
이는 조합의 의미 재사용이며 해당 Figma가 실제 공용 Card 인스턴스라는 증거는 아닙니다.
Checkbox도20px 관찰 상태를 [AgentHubCheckbox](../AgentHubCheckbox/README.md)와 대조한 뒤 연결합니다.

- [정의와 범위](./definition.md)
- [치수·상태·선택 링](./styles.md)
- [동작과 상태 소유권](./behavior.md)
- [접근성](./accessibility.md)
- [검증](./verification.md)
- [구현 연결](./implementation.md)
- [이번 실측](../../references/cards-actions-refresh.figma.json) · [원본 자산 대조](../../references/components-refresh.assets.json)

이번 관찰은 Light의 enabled/hovered/selected뿐입니다. disabled·focus·선택+hover 교차 상태·실제 파일 조회나
뷰어 열기 동작을 확인한 결과는 아니며, 해당 제품의 source/export 확인 없이 구현 완료로 표시하지 않습니다.
