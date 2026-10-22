# AgentHubFileIcon — 스타일

타일 frame은 44×44px, radius 6px, 내부 테두리는 1px `#EEEEEE`
(`color/border/default-subtle`)입니다. 안쪽 sheet는 44×44이며 x/y가 각각 8px 이동한 상태로
바깥 타일에 clip됩니다. 배경 그라데이션은 흰색에서 `#E9E9E9`입니다.
glyph를 타일 정중앙에 다시 배치하거나 sheet를 36px로 줄이면 원본 구성이 달라집니다.

| type | 바깥 accent | 안쪽 glyph |
| --- | --- | --- |
| spreadsheet | #079455 | 24px, 선 1.5px, #079455 |
| presentation | #C82C21 | 24px, 선 1.5px, #C82C21 |
| document | #1B54C6 | 24px, 선 1.5px, #155EEF |
| pdf | #D92D20 | 24px, 채움 도형, #D92D20 |
| code | #8A8A8A | 24px, 선 1.5px, #412E2E |
| archive | #F4A822 | 22px, 선 1.375px, #412E2E |

위 값은 Figma에서 관찰한 이 자산의 색이며 제품 전체 semantic palette는 아닙니다.
전체 SVG가 이 구성을 이미 포함하므로 복사한 CSS로 다시 조립할 필요가 없습니다.
일반 Icon의 stroke/currentColor 정책을 적용하거나 공용 PrivateIcon의 44px 크기만으로 대체하지 않습니다.
다크 모드용 별도 자산은 확인하지 않았습니다. 원본을 유지하고 제품 surface에서 대비를 검증합니다.
