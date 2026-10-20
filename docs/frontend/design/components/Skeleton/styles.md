# Skeleton — 스타일과 토큰

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Skeleton 문서 인덱스](./README.md)

## 공용 스타일

| 속성              | 값                                              | 소유자   |
| ----------------- | ----------------------------------------------- | -------- |
| display           | `block`                                         | Skeleton |
| surface           | `var(--element-disabled)`                       | Skeleton |
| 기본 radius       | `4px`                                           | Skeleton |
| width / height    | 고정하지 않음                                   | 호출부   |
| shape radius 변형 | 실제 콘텐츠 모양에 맞게 호출부 class로 override | 호출부   |

`--element-disabled`는 전역 semantic token이므로 light/dark theme 전환을 그대로 따른다. 별도의
고정 hex 색이나 Skeleton 전용 theme selector를 추가하지 않는다.

## Geometry 예시

```ts
export const titleSkeleton = style({ width: "180px", height: "32px" });
export const chipSkeleton = style({
  width: "48px",
  height: "24px",
  borderRadius: "12px",
});
```

Skeleton root에 `width: 100%`나 고정 height를 두지 않는다. 그렇지 않으면 inline value,
Table row, Page Header처럼 서로 다른 layout에서 placeholder가 컨테이너 전체를 잘못 차지한다.
