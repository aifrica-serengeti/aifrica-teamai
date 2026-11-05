# AgentHubIcon — 스타일

| 실제 frame | 기본 선 두께 | 공용 Icon baseline과 비교 |
| --- | --- | --- |
| 16×16 | 1px | 공용은 시각 보정한 1.25px. Agent Hub에서는 1px 유지 |
| 20×20 | 1.25px | 동일 |
| 24×24 | 1.5px | 동일 |

공용의 12/14/18/32/36px 규격을 이 묶음에 자동 추가하지 않습니다.
SVG의 viewBox·path·stroke-width를 보존하고, 24px glyph 하나를 세 크기로 축소하는 방식으로 대체하지 않습니다.
대부분 round cap/join이지만 like/dislike의 일부 path는 miter join이고, more·pause·agent 등에는 fill 도형도 있습니다.
settings/24는 filled 아이콘입니다. 일괄 `fill="none"`이나 모든 join을 round로 덮어쓰면 원본이 달라집니다.

기본색은 `color/icon/default` = `#1C1C1C`, filled settings는
`color/icon/default-subtler` = `#757575`로 확인했습니다. 제품에서 semantic token에 연결하되
공용 토큰 이름·raw palette 전체·brand primary까지 이 세 노드에서 확인한 것으로 간주하지 않습니다.
모노크롬 SVG를 inline 또는 mask로 표시할 때 도형과 투명 영역을 보존하고, 필요한 상태색은 호출부의
semantic color로 연결합니다. 다크·hover·disabled 색상은 제품에서 별도로 확인합니다.

2026-11-05 신규 SVG에서 `refresh-cw/24`는 24×24 viewBox·1.5px stroke,
`chevron-up/16`은 16×16 viewBox·1px stroke·기본색 `#1C1C1C`를 각각 확인했습니다.
이 두 자산의 측정값을 아직 수집하지 않은 신규 glyph 전체에 확대 적용하지 않습니다.

기존 source 142개는 paint와 vector segment를 대조해 export precision 0.0003 이내의 동일 도형으로
확인했습니다. export wrapper·clip ID·닫힌 path의 시작점/방향 차이로 raw SHA가 달라도
canonical 자산을 교체하지 않습니다. 이 수치 대조는 브라우저 렌더링 검증과 별개입니다.
`pin/16`, `pin/20`, `pin/24`의 새 context는 회전 wrapper 안의 내부 vector만 반환하므로
그 조각을 사각형 glyph의 대체 자산으로 사용하지 않습니다. 기존 full-frame SVG를 유지하고
관찰용 child SVG·실제 크기·wrapper 근거는 갱신 원장에 별도로 보관했습니다.
