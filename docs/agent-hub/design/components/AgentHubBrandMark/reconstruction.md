# AgentHubBrandMark — 분리 SVG 복원 기록

## 출처와 현재 사용

원본은 Figma 노드 `2611:74300`의180×180px 표시와 투명 PNG2048×2048입니다.
PNG의 SHA-1은 `9ad483e40603da8c651c65af6fb5bace9c698cdd`입니다.
추가로 제공된 `image 14533.svg`도 같은 PNG를 포함한 SVG wrapper이며 개별 path/ellipse 레이어는 없습니다.
분리 원본이 없는 상황에서 사용자가 이 이미지를 기준으로 독립 SVG를 재구성하도록 요청했습니다.

[복원 SVG](../../assets/brand/agent-hub-mark-layered.svg)는 원본 PNG를 참고한 **파생 비교 자료**입니다.
Figma 벡터 원본·원본 레이어의 정확한 복구·픽셀 단위 동일 결과가 아닙니다.
사용자 요청으로 브랜드 마크 애니메이션은 제외했으며, 현재 컴포넌트는 원본 PNG만 정적으로 표시합니다.
복원 SVG를 기본 이미지·대체 원본·실행 모션 자산으로 연결하지 않습니다.
원본 PNG와 [원본 manifest](../../asset-manifest.json), 파생 SVG와 [복원 manifest](../../references/brand-mark.reconstruction.json)의
byte/hash와 출처는 그대로 보존합니다.

## 보존한 레이어 자료

아래 좌표와 색·투명도는 원본을 참고해 채택했던 복원값이며 Figma 실측이 아닙니다.

| 아래→위 적층 | 기준 ellipse | 기본 기울기 | 표현 |
| --- | --- | --- | --- |
| 보라 | cx100/cy99, rx76/ry40 | −60° | 보라 linear gradient, 끝부분 투명 mask |
| 초록 | cx100/cy99, rx76/ry40 | +60° | 청록·초록 linear gradient |
| 파랑 | cx100/cy97, rx76/ry40 | 0° | 파랑·청록 linear gradient |

전체 viewBox는200×200입니다. 공통 radial mask는 밝고 투명하게 사라지는 영역을 표현합니다.
각 `g[data-brand-layer]`에 ellipse·gradient·mask를 벡터로 작성했으며 PNG를 base64로 잘라 넣은 파일이 아닙니다.

겹침 아래의 윤곽, 색·투명도 분포, mask 곡선과 정확한 적층은 원본에서 추정했습니다.
manifest에 남은 보조 tint·shade도 보류된 표현 시안의 추정 색상이며 현재 PNG에 적용하는 token이 아닙니다.
이 자료는 재구성의 비교 근거이며 브랜드 소유자의 벡터 승인이나 실제 Agent Hub 제품 배포를 의미하지 않습니다.
