# Scrollbar & ScrollArea — 정의와 구조

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Scrollbar & ScrollArea 문서 인덱스](./README.md)

## 1. 의존 컴포넌트

의존 공용 컴포넌트 없음. ScrollArea는 native overflow와 자체 thumb geometry로 동작하며,
다른 공용 scrollbar나 browser-specific UI를 내부에 조합하지 않는다.

## 2. 구조 (Anatomy)

```
ScrollArea
└── wrapper (position: relative, 시각적 테두리/배경) ← data-type / data-orientation
    ├── scrollContainer (overflow: auto, 실제 스크롤 발생, `data-slot="scroll-container"`)
    │   └── content (패딩 16px)
    ├── thumbVertical   (absolute, wrapper 기준 — 스크롤 컨테이너 밖)
    └── thumbHorizontal (absolute, wrapper 기준 — 스크롤 컨테이너 밖)
```

> **구조적 핵심 (버그 방지)**: thumb를 `overflow: auto` 스크롤 컨테이너 **내부**에
> `position: absolute`로 두면 스크롤 시 thumb가 컨텐츠와 함께 딸려가 컨테이너 밖으로
> 나가 사라진다. thumb는 반드시 스크롤 컨테이너의 **형제**(wrapper의 직계 자식)로
> 빼야 한다. thumb의 위치 기준(offsetParent)은 wrapper가 된다.

> 부모가 스크롤 경계 상태를 표현해야 할 때는 DOM 구조를 추측하지 않고
> `onScrollMetricsChange` 콜백을 사용한다. 이 콜백은 초기 렌더, 스크롤, ResizeObserver
> 갱신마다 실제 scroll container의 수직 측정값을 전달한다.

> 사용자 action 뒤 위치를 명시적으로 이동해야 하면 `ref`의 `ScrollAreaHandle.scrollTo(options)`을
> 사용한다. 부모는 wrapper의 자식 순서나 `data-slot`을 조회하지 않으며, ScrollArea가 실제 native
> scroll container로 호출을 위임한다.

> `verticalThumbOffset`은 sticky header처럼 wrapper 상단의 고정 시각 영역을 사용하는 조합을
> 위한 선택 prop이다. 수직 thumb의 트랙 시작점만 아래로 옮기며, 실제 scroll container와
> 콘텐츠 위치는 이동시키지 않는다. 기본값은 `0`이다.

`stickToEnd`가 켜진 경우 ScrollArea는 이전 측정에서 사용자가 최하단이었고 콘텐츠 높이가 늘어난
경우에만 `scrollTop`을 새 최하단으로 이동한다. 중간을 읽는 사용자의 위치는 변경하지 않는다.

---

## 3. 레이아웃 스펙

모든 수치는 px 단위.

### 컨테이너 (wrapper)

| 항목          | 값                                   | 비고                               |
| ------------- | ------------------------------------ | ---------------------------------- |
| 크기          | 외부에서 지정(`height`/`width` 100%) | 부모가 고정 높이 필요              |
| 테두리        | 1px solid                            | `--border-default`                 |
| 모서리 둥글기 | 8px                                  | `border-radius`                    |
| overflow      | hidden                               | thumb가 wrapper 밖으로 나가지 않게 |
| 배경          | `--surface`                          |                                    |

### Thumb (스크롤 막대)

| 항목                    | 기본값                    | 비고                                   |
| ----------------------- | ------------------------- | -------------------------------------- |
| 두께(교차축)            | 4px                       | `thumbWidth` prop으로 가변(4·6·8 권장) |
| 길이(주축)              | 컨테이너 대비 콘텐츠 비율 | 최소 24px(가시성 보장)                 |
| 모서리 둥글기           | 9999px(완전 둥근 캡)      | `border-radius`                        |
| 컨테이너 내 여백(inset) | thumbWidth × 0.75         | Figma 비율(4px thumb : 3px inset) 반영 |
| z-index                 | 4                         | Tree·Table 내부 레이어보다 위에 떠 있도록 |

`verticalThumbOffset`을 지정하면 수직 thumb의 시작 inset에 해당 px 값이 추가된다. 하단 inset은
기존과 동일하게 유지하므로, 수직 thumb의 이동 트랙만 상단 고정 영역을 피해 짧아진다.

### Thumb 두께별 inset (자동 계산)

| thumbWidth | inset | 트랙 전체 두께(inset×2 + thumbWidth) |
| ---------- | ----- | ------------------------------------ |
| 4 (기본)   | 3px   | 10px                                 |
| 6          | 4.5px | 15px                                 |
| 8          | 6px   | 20px                                 |

> **양끝 대칭 원칙**: thumb 이동 범위(`maxOffset`)에서 양끝 inset(×2)을 모두 예약한다.
> 그렇지 않으면 맨 아래/오른쪽에서 thumb가 경계에 딱 붙어 위쪽과 비대칭이 된다.
> 공식: `maxOffset = clientSize − thumbSize − inset × 2`

---
