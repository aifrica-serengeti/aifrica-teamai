# Private Icon — 스타일과 사이즈

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Private Icon](./README.md)

Private icon의 색상·형상은 Figma 원본 SVG/PNG에 포함되어 있다. 컴포넌트는 색상 토큰이나
filter를 적용하지 않으며, 원본 브랜드 색상을 바꾸지 않는다.

| size | px |
| --- | ---: |
| m | 16 |
| xl | 20 |
| 2xl | 24 |
| 3xl | 32 |
| 4xl | 36 |
| 5xl | 40 |
| 6xl | 44 |
| 7xl | 48 |

- root span과 img 모두 명시적인 width·height를 가진다.
- img는 width/height 100%와 object-fit contain으로 원본 비율을 보존한다.
- SVG와 PNG를 변환하거나, 배경색·filter·opacity를 임의로 덮어쓰지 않는다.
- 원본 crop이 반복 SVG pattern으로 export되어 경계 seam이 생기는 경우에는 원본 이미지의
  색상·비율·crop 좌표를 유지한 채 `clipPath`와 단일 `use`로 정규화한다.
- 다크 모드에서도 원본 브랜드 로고 자체는 변형하지 않는다. 대비가 부족한 배경에서는 호출부가
  surface를 조정한다.
