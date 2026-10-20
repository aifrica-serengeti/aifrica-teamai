# Skeleton — 정의와 구조

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Skeleton 문서 인덱스](./README.md)

## 의존 컴포넌트

없음. Skeleton은 native `div`와 semantic color token만 사용하는 primitive다.

## 구조

```text
div[data-slot="skeleton"]
└── consumer className / native div props
```

## 공개 API

```tsx
export type SkeletonProps = React.ComponentProps<"div">;

export function Skeleton({ className, ...props }: SkeletonProps): JSX.Element;
```

| 계약           | 규칙                                                         |
| -------------- | ------------------------------------------------------------ |
| root           | native `div`                                                 |
| slot           | `data-slot="skeleton"`                                       |
| `className`    | 공용 surface class와 호출부 geometry class를 조합            |
| native props   | `aria-*`, `data-*`, `role`, `style`을 root에 전달            |
| width / height | 기본값 없음. 실제 콘텐츠를 아는 호출부가 지정                |
| loading state  | Skeleton이 소유하지 않음. parent page/query/component가 소유 |

```tsx
<div aria-busy={isLoading || undefined}>
  {isLoading ? (
    <Skeleton className={styles.titleSkeleton} aria-hidden="true" />
  ) : (
    <h2>{title}</h2>
  )}
</div>
```

Skeleton 안에 임시 텍스트, 가짜 ID, Spinner를 넣지 않는다. 여러 행이 필요하면 실제 콘텐츠
anatomy와 같은 wrapper를 만들고 Skeleton을 필요한 수만큼 조합한다.
