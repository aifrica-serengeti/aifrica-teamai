# Tree — 상태와 동작

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Tree 문서 인덱스](./README.md)

## 8. 상태와 동작

| 상태      | 시각 규칙                                                     | 동작                                        |
| --------- | ------------------------------------------------------------- | ------------------------------------------- |
| Enabled   | `transparent` 배경 + 기본 text                                | 행 클릭으로 `onSelect` 호출                 |
| Hovered   | 부모 surface 위 action hover overlay                          | disabled/selected 행에는 적용하지 않음      |
| Pressed   | 부모 surface 위 action pressed overlay                        | disabled/selected 행에는 적용하지 않음      |
| Selected  | primary-subtle 배경 + 좌측 2px primary 막대                   | `showLeafActions`이면 trailing more menu 표시 |
| Focused   | 1px primary outline, offset 1px                               | focus-visible일 때만                        |
| Disabled  | `transparent` 배경 + disabled text/icon, cursor `not-allowed` | row 선택, chevron, checkbox 모두 비활성     |
| Expanded  | triangle 아래 방향, children grid 1fr                         | `aria-expanded=true`                        |
| Collapsed | triangle 오른쪽 방향, children grid 0fr                       | 애니메이션 종료 후 hidden subtree unmount   |

### 이벤트 우선순위

- 행 click: `onSelect()`
- chevron click: `stopPropagation()` 후 `onExpandedChange(!expanded)`
- checkbox click: `stopPropagation()` 후 `onCheckedChange()`
- trailing more click: `stopPropagation()`; 행 선택을 다시 실행하지 않음

### trailing 메뉴

`TreeItem`은 `showLeafActions && selected && !disabled`일 때만 trailing menu를 자동으로 렌더한다.
정보 탐색처럼 추가 action이 없는 Tree는 `showLeafActions={false}`를 전달해 선택과 메뉴를 분리한다.
`TreeParent`는 자동 menu를 렌더하지 않으며, 필요하면 primitive API의 `children`으로 custom trailing을
주입한다. trailing wrapper에는 `margin-left: 4px`을 둔다.

## 10. 애니메이션

| 대상               | 속성                                      | 값                           |
| ------------------ | ----------------------------------------- | ---------------------------- |
| children accordion | `grid-template-rows`, `opacity`           | `0.2s ease`                  |
| triangle           | `transform`                               | `0.2s ease`                  |
| row                | `background-color`, `color`, `box-shadow` | `0.2s ease`                  |
| connector/marker   | `border-color` 또는 `background-color`    | `0.2s ease`                  |
| SVG 일반 path      | `opacity`                                 | `0.12s ease`                 |
| SVG closing path   | `opacity`                                 | `0.2s ease`                  |
| SVG opening path   | 80ms 뒤 visible 상태로 전환               | base opacity transition 사용 |

규칙:

- `transition: all`은 금지한다. layout transition과 connector 계산이 충돌해 흔들림을 만든다.
- 색상 전환은 각 요소의 색상 속성에만 `0.2s ease`로 지정한다.
- closing path는 row가 수축하는 동안 fade out한 뒤 제거한다.
- opening path는 children이 아래 행과 겹치지 않도록 80ms 지연 후 나타난다.

## 12. 대용량 Tree 성능 규칙

1,001개 데이터(루트 1 + 폴더 10 + 파일 990) 기준으로 검증한 규칙이다.

1. **접힌 subtree의 행을 영구 유지하지 않는다.** 처음 펼쳐진 그룹과 닫힘 애니메이션 중인
   그룹만 mount한다.
2. group의 `grid-template-rows` transition이 끝나면 `mountedChildGroups`에서 id를 제거해
   descendant DOM과 connector 측정을 해제한다.
3. 다시 열 때는 `onExpandedChange(true)`에서 먼저 해당 id를 mount set에 추가한 뒤
   controlled expanded state를 바꾼다. 따라서 첫 열림도 animation을 유지한다.
4. `connectorLayoutRevision`은 expanded/collapsed 이벤트에서만 증가한다. selected/checked
   변경은 connector 좌표에 영향을 주지 않으므로 SVG path를 재측정하지 않는다.
5. accordion transition 중에만 rAF로 connector y좌표를 갱신한다. 정지 상태에서는 root
   `ResizeObserver`만 사용한다.

검증 결과:

| 상태                              | 실제 렌더 행 수 |
| --------------------------------- | --------------: |
| large tree 초기(루트만 expanded)  |              11 |
| Folder 01 한 개 expanded          |             110 |
| Folder 01 collapse animation 종료 |              11 |

이 방식은 virtualization이 아니다. 사용자가 990개 파일을 동시에 모두 열면 그 행은 모두 렌더된다.
그 규모에서도 추가 개선이 필요하면 Tree의 API/DOM 구조를 바꾸지 말고, 별도의 windowing adapter를
도입해 visible row만 렌더하는 다음 단계로 확장한다.
