# List Content State 정의

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

## 1. 의존 컴포넌트

| 컴포넌트                                   | 역할                                         |
| ------------------------------------------ | -------------------------------------------- |
| [Content State](../ContentState/README.md) | icon·copy·action의 공용 상태 표현을 제공한다 |

Table의 빈 상태는 공용 `Table.emptyState` API가 이 컴포넌트의 embedded presentation을 조합한다.

## 2. 구조

```
section[data-slot="list-content-state"][data-kind][data-density]
├── Icon
├── copy
│   ├── h2 title
│   └── p description (optional)
└── Button action (optional)
```

## 3. Props

| prop           | 타입                                       | 기본값    | 설명                                               |
| -------------- | ------------------------------------------ | --------- | -------------------------------------------------- |
| `kind`         | `empty \| filtered \| error`               | `empty`   | 상태 의미와 기본 icon, live role을 정한다          |
| `presentation` | `surface \| embedded`                      | `surface` | 외곽 frame을 직접 소유하거나 부모 frame에 삽입한다 |
| `density`      | `regular \| compact`                       | `regular` | Card·Medium Table 또는 Small Table의 시각 밀도다   |
| `title`        | `ReactNode`                                | 필수      | 상태를 한 문장으로 요약한다                        |
| `description`  | `ReactNode`                                | 없음      | 다음 행동이나 비어 있는 이유를 설명한다            |
| `icon`         | `IconName \| false`                        | 상태별    | 도메인 icon으로 바꾸거나 숨긴다                    |
| `action`       | `{ label, onClick, disabled?, ariaBusy? }` | 없음      | 조건 초기화 또는 실제 재시도만 제공한다            |

페이지는 Table 내부에 직접 중첩하지 않고 `Table.emptyState`에 같은 kind, icon, title, description,
action을 전달한다. Table이 `embedded` 조합과 size에 따른 density 선택을 소유한다.

Card와 Table 보기를 함께 제공하는 목록은 `createListErrorState`로 최초 오류 설정을 한 번 만들고,
Card의 `ListContentState`와 Table의 `emptyState`에 같은 객체를 전달한다. 재시도 중에는 helper의
`retrying`으로 Button의 disabled와 `aria-busy`를 함께 설정한다.
