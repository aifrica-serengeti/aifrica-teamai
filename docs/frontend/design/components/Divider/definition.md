# Divider — 정의와 구조

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Divider 문서 인덱스](./README.md)

## 1. 의존 컴포넌트

의존 공용 컴포넌트 없음. shadcn Separator primitive는 외부 기반이며 이 문서가 wrapper의
방향, 여백, 색상 계약을 소유한다.

## 2. 구조 (Anatomy)

```
Divider
└── Wrapper (8px 패딩 포함)
    └── Separator 선 (1px)
        ├── Horizontal: 가로선, 양옆 100% / 위아래 8px 여백
        └── Vertical:   세로선, 위아래 100% / 양옆 8px 여백
```

---

## 3. 레이웃 스펙

모든 수치는 px 단위.

| 항목         | Horizontal                       | Vertical                        |
| ------------ | -------------------------------- | ------------------------------- |
| 선 두께      | 1px (`h-px`)                     | 1px (`w-px`)                    |
| 선 길이      | 100% (컨테이너 가로폭)           | 100% (컨테이너 세로폭)          |
| 선 주위 여백 | 위아래 **8px** (`padding-block`) | 양옆 **8px** (`padding-inline`) |
| 래퍼 배치    | flex column, stretch             | flex row, center                |

> **여백 불변의 원칙**: 8px 패딩은 Divider 컴포넌트의 일부다. Separator 선만 단독으로
> 쓰면 주변 콘텐츠에 딱 붙어버리므로, 반드시 래퍼로 감싸 패딩을 포함해야 한다.

---

## 6. 방향 (Orientation)

| 방향                  | 용도                                           | 여백 방향  |
| --------------------- | ---------------------------------------------- | ---------- |
| **Horizontal** (기본) | 콘텐츠를 위/아래로 분리                        | 위아래 8px |
| **Vertical**          | 콘텐츠를 좌/우로 분리 (예: 툴바, 카드 내 컬럼) | 양옆 8px   |

- Horizontal: 래퍼 `display: flex; flex-direction: column; align-items: stretch`,
  `width: 100%`, `padding-block: 8px`.
- Vertical: 래퍼 `display: flex; flex-direction: row; align-items: stretch`,
  `height: 100%`, `padding-inline: 8px`.
- Vertical 사용 시 부모 컨테이너가 명시적인 높이를 가져야 선이 늘어난다.

---
