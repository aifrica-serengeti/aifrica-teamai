# AgentHubBrandMark

메인 화면에서 사용하는 Agent Hub 다색 마크입니다. 공용 system Icon이나 서드파티 PrivateIcon의
이름 목록에 넣지 않고 Agent Hub 자산으로 관리합니다. 적용 조건은 [상위 안내](../../README.md)를 따릅니다.
직접 공용 컴포넌트 의존성은 없습니다.

현재는 Figma에서 받은 **정적 원본 PNG만 표시**합니다. 사용자 요청에 따라 브랜드 마크 애니메이션은 제외했습니다.
ThinkingStatus의32px 마크도 같은 정적 원본을 사용합니다.

분리 SVG는 원본 PNG를 보고 재구성한 비교 자료입니다. Figma 벡터 원본이나 원래 레이어의 정확한 복구가 아니며
현재 컴포넌트의 표시 자산으로 대체하지 않습니다. 원본·파생 자산의 출처와 hash는 그대로 보존합니다.

- [정의와 원본 근거](./definition.md)
- [비율·크기·색상](./styles.md)
- [동작](./behavior.md)
- [접근성](./accessibility.md)
- [구현과 공개 입력](./implementation.md)
- [SVG 복원 범위와 레이어](./reconstruction.md)
- [검증](./verification.md)
- [원본 PNG](../../assets/brand/agent-hub-mark.png), [비교용 복원 SVG](../../assets/brand/agent-hub-mark-layered.svg)
- [파생 자산 기록](../../references/brand-mark.reconstruction.json), [자산 사용](../../assets.md)
