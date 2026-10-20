# Content State 정의

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

## 의존 컴포넌트

| 컴포넌트                      | 역할                                                  |
| ----------------------------- | ----------------------------------------------------- |
| [Icon](../Icon/README.md)     | error·forbidden·not-found 의미를 시각적으로 보조한다. |
| [Button](../Button/README.md) | 재시도 같은 단일 복구 행동을 제공한다.                |

## 구조

```text
section[data-slot="content-state"][data-kind]
├── Icon
├── copy
│   ├── h1 또는 h2 title
│   └── p description
└── Button action (선택)
```

`kind`는 `empty | filtered | error | forbidden | not-found`, `presentation`은
`surface | embedded`, `layout`은 `detail | list | none`, `density`는 `regular | compact`다.
`description`을 생략하면 `kind`와 `locale`에 맞는 공용 복구 안내 문구를 표시한다. 페이지가 더
구체적인 설명을 전달하면 해당 문구를 우선 사용한다. `action`은 label, onClick, disabled,
ariaBusy와 Button size·variant를 받는다. 기본 상세 action은
medium secondary다. 부모가 Table body처럼 자체 높이를 소유하면 `layout="none"`을 사용한다.
`headingLevel`은 route 본문 전체를 대체할 때만 1을 사용하고 기본은 2다.
