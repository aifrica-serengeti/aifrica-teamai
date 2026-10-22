# AgentHubThinkingStatus — 크기·색상과 자산

[실측](../../references/chat-progress.figma.json)의 Light 단일 표본입니다.
CSS adapter·접근성 대안과 Figma에서 측정한 값을 구분하고 제품의 해당 component 범위에 연결합니다.

| 영역 | 확인한 값 |
| --- | --- |
| root |136×32 표본, HUG/HUG, 가로·gap8·세로 CENTER, padding0·radius0 |
| root paint | fill/stroke/effect 없음, opacity1·clipping false |
| 마크 |32×32, x0/y0, opacity1, 회전0·필터0·동일 비율 |
| 텍스트 | x40/y6,96×20 HUG 표본, Pretendard Regular14/20·400·자간0 |
| 텍스트 정렬 | LEFT/CENTER, WIDTH_AND_HEIGHT, truncation DISABLED·maxLines null |
| 텍스트 opacity | 원본0.6899999976158142, 표기0.69. root·이미지에 적용하지 않음 |
| 텍스트 paint | GRADIENT_LINEAR, paint opacity1, 모든 stop alpha1, identity transform |

136=마크32+gap8+문구96이며 고정 제품 폭이 아닙니다. 상태 라벨·경과시간·locale에 따라 HUG 폭을 계산합니다.
텍스트 한 줄20px를32px 마크 중앙에 맞추므로 y6입니다. 샘플96px나32px 높이로 긴 문구를 잘라내지 않습니다.
root에 저장된 strokeWeight1만 보고 border를 추가하지 않습니다. 실제 strokes는 비어 있습니다.

## 정적인 텍스트 gradient

| stop | 원본 위치 | 색상 |
| --- | --- | --- |
|1 |0 | 검정, alpha1 |
|2 |0.25 | 회색 RGB 각 채널0.8413461446762085, alpha1 |
|3 |0.46963563561439514 | 검정, alpha1 |
|4 |0.6842105388641357 | 같은 회색, alpha1 |
|5 |0.9149797558784485 | 검정, alpha1 |

회색은8bit 표기로 #D7D7D7입니다. 정확한 채널과 stop은 reference에 보존합니다.
마지막 검정 stop은 오른쪽 끝까지 이어집니다. identity gradientTransform `[[1,0,0],[0,1,0]]`의 수평 paint이며
속도·방향 전환·반복·shimmer를 정의하지 않습니다. 텍스트 opacity.69와 stop alpha1을 중복 곱하지 않습니다.
이 표와 원본 JSON은 비교 근거입니다. 현재 [구현 recipe](./implementation.md)는 아래 사용자 채택에 따라
고정된 밝은 얼룩을 만들던5-stop 배경을 적용하지 않습니다.

## 기존 PNG를 그대로 사용합니다

[AgentHubBrandMark](../AgentHubBrandMark/styles.md)의 [원본 PNG](../../assets/brand/agent-hub-mark.png)를 연결합니다.
imageHash/SHA1은 `9ad483e40603da8c651c65af6fb5bace9c698cdd`, 고유 크기는2048×2048,1,508,137bytes·RGBA8입니다.
32px 예약 공간과 object-fit:contain을 사용하고 crop·단색 mask·재색칠·filter·새 SVG로 바꾸지 않습니다.
이미지를 처리 상태 안에 배치해도 BrandMark 전체의 기본 의미와 동작을 loading/회전으로 변경하지 않습니다.

미지원 text clipping·강제 색상·대비가 부족한 실제 surface에서는 읽을 수 있는 단색 대안을 제품 adapter로 연결합니다.
원본 gradient 기록은 비교 자료로 보존하며, 아래 단색·모션 채택은 Figma의 새로운 상태를 측정한 결과가 아닙니다.
dark·mobile·긴 라벨·초가 늘어난 폭·줄바꿈은 별도 제품 검증 범위입니다.

## 사용자 채택: 균일한 기본 글자와 주기적인 두 흰 띠

고정된 흐림을 없애기 위해 기본 글자는 균일한 `#000`, 텍스트 전체 opacity는 한 번만0.69로 표시합니다.
이 채택은 기존의 ‘고정5-stop gradient 아래층 + 단일 흰 띠’ recipe를 대체합니다. root·로고에 opacity를 적용하지 않습니다.
`shimmer`에서만 같은 문구의 장식층에 흰 띠 두 개가 일정 간격으로 왼쪽→오른쪽 흐르는 주기적 패턴을 적용합니다.
로고32px·gap8·14/20px·글자 위치·HUG 폭과 부모의 경과시간 소유권은 유지합니다.

| 항목 | 현재 채택값 | 근거 |
| --- | --- | --- |
| 기본/static/reduced 글자 | `#000`, 텍스트 opacity0.69, 고정 gradient 없음 | 이번 사용자 채택 |
| 흰 띠 패턴 | 문구 폭의50%인 타일을 수평 반복, 타일당 흰 띠1개 | 두 띠를 일정 간격으로 흐르게 하는 이번 사용자 요청 |
| 띠 폭 / 중심 간격 / 맑은 간격 | 문구 폭의28% /50% /22% | 구현 제안값. 띠 폭은 투명 경계 사이 |
| gradient 타일 | 투명0%·22%, 흰색50%, 투명78%·100% | 구현 제안값. 퍼짐·blur filter 없음 |
| 이동 / 반복 | `background-position:0% 0 → 100% 0`,1800ms linear infinite | Figma 실측이 아닌 제안값 |

`background-size:50% 100%; background-repeat:repeat-x`를 사용합니다. 문구 폭이W이면 이미지 타일은0.5W이며,
position0%→100%의 실제 이동은 `(W−0.5W)×1 = 0.5W`입니다. 한 타일만큼 이동하므로 종료와 다음 시작의 패턴이 같고 점프가 없습니다.
타일의22%→78%가 흰 띠이므로 폭은 `0.56×0.5W=0.28W`입니다. 두 띠의 중심은0.5W 간격입니다.
경계에서 잘린 띠 조각이 반대편에 이어질 수 있으므로 모든 프레임에 온전한 봉우리 두 개가 보인다고 정의하지 않습니다.
글자·초·locale로 폭이 달라져도 비율을 유지하고, 고정96px 폭이나 별도 시간원·재시작용 key를 추가하지 않습니다.

`static`, 읽기 모드, forced-colors, reduced-motion, print와 text clipping 미지원 환경에는 장식층과 반복 효과를 함께 제거합니다.
static/reduced는 균일한 `#000`/opacity0.69, 읽기 모드는 `#1C1C1C`/opacity1,
forced-colors는 `CanvasText`/opacity1, print는 `#1C1C1C`/opacity1입니다. 고정된 밝은 구간을 대안으로 남기지 않습니다.
띠용 복제 문구는 `aria-hidden`인 시각 문구의 장식층 안에만 두어 중복 낭독하지 않습니다.

후속 사용자 요청으로 기존20% 띠를28%로 넓혔습니다. 중심 간격50%·1800ms·두 타일과 균일한 기본 글자는 유지합니다.
이는 후속 시각 채택값이며 원본 실측 gradient stops를 수정한 것이 아닙니다.
