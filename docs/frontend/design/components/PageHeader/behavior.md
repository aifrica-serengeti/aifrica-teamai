# Page Header — 상태와 동작

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

제목 옆 액션의 visible·disabled·pending 상태에서도 내부 간격은 4px로 유지한다.
액션 묶음이 Fragment 또는 별도 표현 컴포넌트여도 같은 정렬을 사용한다.

[← Page Header 문서 인덱스](./README.md)

## 8. 상태와 동작

| 대상                 | 상태             | 규칙                                                                                                                        |
| -------------------- | ---------------- | --------------------------------------------------------------------------------------------------------------------------- |
| Title                | normal           | 1줄, 100~400px. 남은 폭이 있으면 내용 폭만 사용                                                                             |
| Title                | truncated        | `scrollWidth > clientWidth`일 때만 ellipsis 및 full-title Tooltip 활성화                                                    |
| back                 | visible          | `showBackButton=true`일 때만. tooltip “뒤로 가기”                                                                           |
| title action         | visible          | slot으로 전달. refresh/favorite/edit/delete 등은 action마다 하나의 Tooltip 필수                                             |
| title action         | activated        | Tooltip은 500ms 뒤 열고 실행 시 닫음. `suppressTooltipOnFocusReturn` 액션만 overlay 종료 후 focus 복원까지 닫힌 상태를 유지 |
| title action         | pending          | button disabled + aria-busy. accessible label/Tooltip의 동작명은 유지하고 진행 문구로 교체하지 않음                         |
| Detail / Description | absent           | 해당 노드와 세로 높이를 모두 제거                                                                                           |
| Description          | present          | 4px spacer 자동 생성. 별도 `spacer` prop 제공 금지                                                                          |
| Detail / Description | long             | `white-space: normal; overflow-wrap: anywhere`; ellipsis 금지                                                               |
| loading              | `isLoading=true` | 전달된 title/Chip/Detail/Description을 각각 같은 line-height skeleton으로 대체. Header 높이는 normal과 동일                 |
| action area          | fits             | title row 우측에 유지. viewport 자체가 아니라 slot의 실제 필요 폭을 기준으로 판단                                           |
| action area          | does not fit     | Description 아래 독립 행. overflow로 버튼이 title action을 침범하지 않음                                                    |
| Tabs                 | provided         | controlled 또는 uncontrolled Tab API 그대로 사용                                                                            |
| divider              | `borderBottom`   | 기본은 표시하지 않고 페이지가 명시적으로 요청한 경우에만 하단 구분선을 표시                                                 |

---

명시적 refresh의 request/minimum duration은 page가 소유한다. List/Detail profile은 최소 600ms 동안
refresh disabled 상태와 icon `.8s linear infinite` 회전을 유지하며 reduced-motion에서는 회전만 제거한다.
Page Header는 spinner state를 별도로 만들거나 action slot을 unmount하지 않는다.

Action 영역은 Grid의 남은 폭 전체로 늘어나지 않도록 일반 상태에서 `justify-self: end`,
아래 행에서는 `justify-self: start`로 정렬한다. 화면 폭이 다시 넓어질 때 확장된 행 너비를
버튼의 필요 폭으로 오인하지 않아야 한다.
