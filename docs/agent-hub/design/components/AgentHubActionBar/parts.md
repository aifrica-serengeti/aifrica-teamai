# AgentHubActionBar — 내부 compound parts

아래 두 set은 부모의 action 슬롯을 구성하는 부품입니다. 독립 공개 컴포넌트/registry를 늘리지 않습니다.
공용 ActionBar와 같은 응집 범위를 유지합니다. 원본 설명의 ‘state5종’과 달리 실제 matrix는4상태입니다.
이번에 없는 focus를 다섯 번째 native variant로 채우지 않습니다.

## action: 2크기 × 4상태

Figma [action-bar/action](https://www.figma.com/design/cUKHT2PdHjAKRXZlzulnO5/?node-id=3621-24690)에서8개를 확인했습니다.

| size | enabled | hovered | pressed | disabled |
| --- | --- | --- | --- | --- |
| 32 | 3621:24657 | 3621:24658 | 3621:24662 | 3621:24670 |
| 28 | 3621:24646 | 3621:24674 | 3621:24678 | 3621:24686 |

| geometry | size32 | size28 |
| --- | --- | --- |
| 높이 | 32px | 28px |
| 좌우 padding | 16px | 8px |
| 생성 context 세로 padding | 4px | 6px |
| radius | 6px (`radius/control-md`) | 4px (`radius/control-sm`) |
| leading glyph | 16×16px, SVG stroke1px | 16×16px, SVG stroke1px |
| glyph↔label gap | 4px | 4px |
| label | Pretendard600 14/20 | Pretendard600 12/16 |
| 샘플 Label 폭 | 88px | 67px |

88/67px는 HUG 문자열 결과이며 버튼의 고정 폭이 아닙니다.
size32의 metadata 높이32px와 생성 context의 padding4 + line-height20px 합28px에는 차이가 있습니다.
구현에서는 관찰된 높이32px와 중앙 정렬을 유지하고 생성 padding만 복사해28px로 축소하지 않습니다.
size28은6+16+6=28px입니다. 표시 glyph를 양쪽 모두16px로 유지합니다.

| state | 배경 | label | glyph |
| --- | --- | --- | --- |
| enabled | transparent | #FFFFFF | #FFFFFF |
| hovered | #333333 | #FFFFFF | #FFFFFF |
| pressed | #333333 | #FFFFFF | #FFFFFF |
| disabled | transparent | #8F8F8F | #AAAAAA |

hover/pressed는 각각 `color/action/default-inverse-hovered`와 `color/action/default-inverse-pressed`이며
이번 해결값이 같습니다. 공용의 alpha8%/20% recipe로 두 값을 다르게 만들지 않습니다.
disabled는 부모 opacity가 아니라 text/glyph에 다른 값을 적용합니다.
반환된16px SVG의 실제 stroke는1px입니다. 해당 path의 `stroke-width`가 생략되어 SVG 기본값1을 사용합니다. 문맥 변수 `var(--icon-stroke-16/20)=1.25`를 이 export의 실선 두께로 대입하지 않습니다. 일반16px 아이콘과 두께가 같아도 도형·색·원본이 같다는 뜻은 아니므로 자산을 임의 교체하지 않습니다.

## icon-action: 1크기 × 4상태

Figma [action-bar/icon-action](https://www.figma.com/design/cUKHT2PdHjAKRXZlzulnO5/?node-id=3621-24737)에서4개를 확인했습니다.

| enabled | hovered | pressed | disabled |
| --- | --- | --- | --- |
| 3621:24720 | 3621:24721 | 3621:24725 | 3621:24733 |

모두32×32px·radius6·원본 glyph20×20px입니다. 작은40px bar 안에서도32px를 유지합니다.
배경은 enabled/disabled transparent, hovered/pressed #333333입니다.
glyph는 enabled/hovered/pressed white, disabled #AAAAAA이며 label은 없습니다.
해결 변수에는 `var(--icon-stroke-24)=1.25`가 나타납니다. 표시 슬롯20px와 token 이름24를 구분하고
원본 SVG를 보존합니다. 임의20px 일반 아이콘으로 다시 그리지 않습니다.

more와 close는 이 부품의 서로 다른 의미입니다. glyph 모양만 바꾸는 공통 wrapper를 쓸 수 있으나
각각 다른 접근 가능한 이름·메뉴 속성·focus 복귀·실행을 연결합니다.
원본 자산의 슬롯별 경로는 [실측 JSON](../../references/cards-actions-refresh.figma.json)의 `actionBar.assetSlots`,
바이트 검증은 [자산 대조](../../references/components-refresh.assets.json)를 확인합니다.

## 조합 인스턴스의 paint 예외

독립 part의 상태 표와 실제 bar 안에서 재정의된 glyph를 구분합니다. 이 값은 원본 관찰이며 자동으로 기본 팔레트를 바꾸라는 제품 채택이 아닙니다.

| 실제 slot | 원본 노드 | exact SVG 관찰 | 기본 part와의 차이 |
| --- | --- | --- | --- |
| size48 action2 disabled | 3610:24436 | 16px·stroke1px·#8F8F8F | 독립 disabled glyph #AAAAAA와 다름 |
| size40 action2 disabled | 3610:24507 | 16px·stroke1px·#8F8F8F | 같은 override |
| size48 more | 3610:24438 | 20px·stroke1.25px·모든 fill #1C1C1C, 앞 두 path stroke white·마지막 stroke #1C1C1C | 기본 white 단색과 다름, more=false라 기본 예시에서는 숨김 |
| size40 more | 3610:24511 | 20px·stroke1.25px·모든 fill/stroke white | size48과 같은 paint라고 가정하지 않음, more=false |

size48 more의 혼합 paint를 모든 더보기 버튼에 일반화하거나 흰색으로 정규화하지 않습니다. exact 파일은 보존하고 제품에서 다른 paint를 채택한다면 원본과 변경 의도를 별도로 기록합니다. 숨긴 more는 자산이 존재한다는 이유만으로 표시하지 않습니다.
