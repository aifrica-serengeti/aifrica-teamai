# AgentHubMessageExample — 크기와 색상

[세 상태 실측](../../references/message-example.figma.json)의 Light mode 기준입니다.
[변수 기록](../../references/message-example.variables.figma.json)의 semantic alias를 제품 전용 token에 연결합니다.
공용 Button·AgentHubButton·palette 전체를 이 시안의 값으로 바꾸지 않습니다.

## 공통 geometry

| 항목 | 실측 |
| --- | --- |
| 크기 | 가로·세로 HUG, `message`+아이콘 샘플121×44px |
| padding | 좌우20px·상하12px |
| radius | 12px, `radius/surface-sm` |
| 배치 | 가로·주축 MAX·세로 CENTER·gap4px·NO_WRAP |
| 실제 border·shadow | 없음·없음 |
| clipping | root `clipsContent: false` |
| 문구 | Pretendard Regular14/20px·400·자간0·#1C1C1C |
| 문구 위치·샘플 크기 | x20·y12, 57×20px |
| 아이콘 위치·크기 | x81·y12, 20×20px |
| 아이콘 선·색 | 1.25px·round cap/join·#1C1C1C, native20 원본 |

샘플 폭은 좌우 padding40 + label57 + gap4 + icon20 =121px이며 높이는 padding24 + line-height20 =44px입니다.
라벨·locale이 달라져도121px를 고정하지 않습니다. root는 HUG이며 글자에는 말줄임·줄 수 제한이 없습니다.
저장된 `strokeWeight: 1`만 보고 실제 `strokes: []`인 외곽에 border를 추가하지 않습니다.

## 상태별 surface

| 상태 | 배경 | semantic 변수 |
| --- | --- | --- |
| enabled | #EBF3FF | `color/action/primary-subtle` |
| hovered | #CCE0FF | `color/action/primary-subtle-hovered` |
| pressed | #99C2FF | `color/action/primary-subtle-pressed` |

세 상태에서 문구와 아이콘은 #1C1C1C이고 geometry는 같습니다.
pressed는 누르는 순간의 표현이며 지속 선택·`aria-pressed`·송신 완료 색상이 아닙니다.
AgentHubButton secondary의 기본색 #CCE0FF는 여기서는 hovered에 해당하므로 같은 variant로 자동 매핑하지 않습니다.

## 선택적 아이콘과 긴 문구

`showIcon=false`에서는 glyph·wrapper를 제거하고 label의 HUG 폭과 padding으로 계산합니다.
같은57px 라벨이면 계산상97px지만 이는 별도 Figma 렌더 실측값이나 고정 상수가 아닙니다.
한 자식만 남은 flex에 gap을 흉내 낸 margin을 추가하지 않습니다.

한 줄44px·NO_WRAP은 원본 샘플입니다. 실제 긴 문구·좁은 폭의 줄바꿈·높이 증가·긴 토큰 처리는
제품이 별도로 채택하고 검증합니다. 원본에 없는 ellipsis·44px 고정 clipping으로 내용을 숨기지 않습니다.

이 컴포넌트의 focus·disabled·loading·dark·mobile 시각 값은 제공되지 않았습니다.
focus 의무는 유지하고 실제 색상은 제품의 공용/semantic token에 연결합니다. Figma에서 focus 색상을 측정했다고 기록하지 않습니다.

UserMessage와 radius12·한 줄44px가 같더라도 배경은 #F4F4F4가 아니며,
본문도16/24px·padding16/10px가 아닙니다. 두 컴포넌트의 typography·padding·상호작용을 섞지 않습니다.
