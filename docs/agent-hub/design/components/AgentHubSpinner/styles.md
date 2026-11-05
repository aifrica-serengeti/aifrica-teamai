# AgentHubSpinner — 치수와 표면

| size | box | SVG stroke-width | 원본 |
| --- | --- | --- | --- |
| Tiny | 16px | 1.5px | 3801:98461 |
| Small | 20px | 2px | 3801:98452 |
| Medium | 24px | 2px | 3801:98449 |
| Large | 36px | 3px | 3801:98458 |
| X-Large | 48px | 4px | 3801:98455 |

크기별 원형·gradient·paint는 [exact SVG 목록](../../references/components-refresh.assets.json)에 보관합니다. 공용의48px 단일 geometry를 덮어쓰지 않으며 브랜드 색상으로 일괄 치환하지 않습니다. 해당 문서와 다른 점은 확인한 Tiny1.5px 및 개별 export 사용입니다.

5종 export의 배경 원 stroke는 #BFD8FF, 앞쪽 stroke/gradient는 #0066FF입니다. 이 값은 원본 paint이며 현재 토큰 이름과 동일하다고 추정하지 않습니다. 각 SVG의 선·stop-opacity·좌표를 보존하고 전역 currentColor로 덮지 않습니다.
