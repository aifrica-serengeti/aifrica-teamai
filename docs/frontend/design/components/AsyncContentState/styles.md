# Async Content State 스타일

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

## 3. DetailLoadingState

상세 페이지의 최초 조회는 공통 state card를 사용한다.

| 항목    | 값                                      |
| ------- | --------------------------------------- |
| 높이    | `min-height: 280px`                     |
| 정렬    | 수직·수평 중앙 정렬                     |
| 간격    | medium Spinner와 안내 문구 사이 `16px`  |
| 문구    | body2 `14px/20px`, `font-weight: 400`   |
| surface | 기본 surface, 기본 border, radius `8px` |
| padding | `24px`                                  |

페이지별 CSS로 Spinner 크기나 문구 굵기, gap을 덮어쓰지 않는다.

## 4. RefreshContentOverlay

### 4.1 parent contract

Overlay의 parent는 반드시 `position: relative`이고 기존 content를 이미 렌더해야 한다.

```tsx
<main className={styles.contentArea}>
  <ResourceCard resource={resource} />
  <RefreshContentOverlay
    visible={refreshing && (resource !== null || error !== null)}
    label="리소스 정보를 불러오는 중입니다."
  />
</main>
```

`visible`에 최초 loading만 전달하지 않는다. 첫 loading은 content가 없으므로 card/table 자체의 state로
처리한다. Overlay는 원본 error가 있는 재시도에도 사용할 수 있다.

### 4.2 geometry·color·interaction

| 항목           | 값                                                                |
| -------------- | ----------------------------------------------------------------- |
| 위치           | `position: absolute; inset: 0; z-index: 4`                        |
| content        | 중앙 정렬, padding 16px, Spinner + text gap 8px                   |
| text           | `--text-subtle`: light `#555555`, dark `#aaaaaa`; body2 14px/20px |
| surface        | `color-mix(in srgb, var(--surface) 88%, transparent)`             |
| pointer events | `none`                                                            |
| show           | opacity 0→1, 160ms ease                                           |
| hide           | 240ms ease-out after minimum visible duration                     |

`pointer-events: none`은 overlay가 content scroll/selection을 가로막지 않는다는 뜻이다. 따라서
저장, edit, destructive action처럼 재조회 중 허용하면 안 되는 control은 parent에서 disabled해야 한다.
Overlay를 interaction lock으로 오해하지 않는다.

### 4.3 minimum-visible lifecycle

`useMinimumVisibleAttribute(visible, "data-visible")`은 React state 대신 DOM attribute를 제어한다.

1. `visible=true`: `data-visible="true"`, fading attribute 제거, 노출 시작 시간을 기록한다.
2. `visible=false`: 이미 보인 시간이 400ms보다 짧으면 남은 시간만큼 기다린다.
3. 이후 `data-visible-fading="true"`를 붙여 240ms fade-out을 시작한다.
4. fade가 끝나면 두 attribute를 제거한다.
5. fade 중 다시 visible이면 fading을 즉시 취소하고 opacity 1로 되돌린다.

이 contract는 너무 빠른 response에서 loading indicator가 보이지 않는 문제와 React batching으로 fade
transition이 생략되는 문제를 함께 막는다. `prefers-reduced-motion: reduce`에서는 transition이 없다.
