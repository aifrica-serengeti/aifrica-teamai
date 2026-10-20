# Segmented Control — 정의와 구조

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Segmented Control 문서 인덱스](./README.md)

## 2. 의존 컴포넌트

이 컴포넌트는 두 개의 공용 컴포넌트를 조합하여 사용한다. 재현 시 이 컴포넌트들을 먼저 확보해야 한다.

| 의존 컴포넌트 | 용도                                                      | 가이드라인      | 비고                                                                                                               |
| ------------- | --------------------------------------------------------- | --------------- | ------------------------------------------------------------------------------------------------------------------ |
| **Icon**      | item 내 아이콘(Icon / Icon+Label 형), 그룹 info 아이콘    | 별도 가이드라인 | Figma System icon 스펙(사이즈별 스트로크, semantic 색상 토큰). `name` prop 으로 Figma snake_case 아이콘 이름 전달. |
| **Tooltip**   | info 아이콘 hover 시 추가 설명, Icon 형 옵션의 hover 라벨 | 별도 가이드라인 | Radix Tooltip 기반. `content` prop 으로 텍스트 전달.                                                               |

> Icon 은 텍스트 색상을 상속(`color: 'inherit'`)하도록 호출한다 — selected/unselected/disabled
> 상태가 item 의 `color` 로 자동 전파된다.

---

## 3. 구조 (Anatomy)

```
Segmented Control
├── Group Label 행 (optional)
│   ├── Label (14px SemiBold)
│   └── Info icon (optional) ── hover 시 Tooltip
├── Item list (컨테이너)
│   ├── Item (Segmented control-item)
│   │   ├── Icon (optional, Icon / Icon+Label 형)
│   │   ├── Label (optional, Label / Icon+Label 형)
│   │   │   ├── ghost (숨김 — 항상 SemiBold, 너비 고정용)
│   │   │   └── real (보이는 텍스트 — 굵기는 상태별 전환)
│   │   └── Divider (optional) ── 우측 1px 구분선, 마지막 item 제외
│   ├── Item ...
│   └── Item (마지막 — Divider 없음)
└── Help text (optional, 12px)
```

---

## 4. 형태 (Type)

| 형태             | 설명                                                                   | 최대 옵션 수 | 아이콘 | 라벨 |
| ---------------- | ---------------------------------------------------------------------- | ------------ | ------ | ---- |
| **Label**        | 텍스트만. 짧고 명확한 텍스트로 구분 가능할 때                          | 5개          | ✗      | ✓    |
| **Icon**         | 아이콘만(정사각형 item). 공간 제한적일 때                              | 6개          | ✓      | ✗    |
| **Icon + Label** | 아이콘 + 텍스트. 아이콘만으로 부족하거나 텍스트만으로 직관성 떨어질 때 | 5개          | ✓      | ✓    |

---

## 5. 레이아웃 스펙

모든 수치는 px 단위.

### Item list (컨테이너)

| 항목          | 값                                       | 비고                                            |
| ------------- | ---------------------------------------- | ----------------------------------------------- |
| 배경          | `#f4f4f4` (`--surface-default-subtler`)  | 회색. selected item 의 흰 배경이 그 위에 올라감 |
| 테두리        | `1px solid #dddddd` (`--border-default`) | —                                               |
| 모서리        | `4px` (`border-radius`)                  | —                                               |
| padding       | **0**                                    | 아이템이 컨테이너를 꽉 채움. 여백 없음          |
| overflow      | `hidden`                                 | 둥근 모서리 밖으로 아이템이 나가지 않게         |
| 아이템 간 gap | 0                                        | divider 로 구분                                 |

### 개별 Item — 사이즈별 치수

| 사이즈     | 높이 | 패딩 (py px) | Icon 형 크기(정사각형) | Icon 픽셀 |
| ---------- | ---- | ------------ | ---------------------- | --------- |
| **Small**  | 28px | 4px 8px      | 28×28                  | 18px      |
| **Medium** | 32px | 6px 10px     | 32×32                  | 20px      |
| **Large**  | 36px | 8px 12px     | 36×36                  | 20px      |

> Icon 형은 패딩 없이 정사각형(small 28×28, medium 32×32, large 36×36). Label / Icon+Label 형은
> 위 표의 패딩 적용.

### Item 내부 간격

| 위치                          | 값  |
| ----------------------------- | --- |
| Icon ↔ Label (gap)            | 4px |
| Group Label ↔ Item list       | 4px |
| Item list ↔ Help text         | 4px |
| Group Label ↔ Info icon (gap) | 2px |

### Divider (항목 구분선)

| 항목      | 값                                                                                          | 비고              |
| --------- | ------------------------------------------------------------------------------------------- | ----------------- |
| 두께      | 1px                                                                                         | —                 |
| 높이      | 12px                                                                                        | item 패딩 영역 내 |
| 색상      | `#dddddd` (`--border-default`)                                                              | —                 |
| 위치      | 각 item 우측(`right: -1px`), 마지막 item 제외                                               | —                 |
| 숨김 조건 | selected(`data-state="on"`) item 옆, disabled item 옆, 직전 형제가 focus-visible 인 item 옆 | —                 |

### 너비 모드

| 모드                  | 설명                                                              | 사용 시기            |
| --------------------- | ----------------------------------------------------------------- | -------------------- |
| **Auto-width** (기본) | 각 item 이 고정 패딩 + 텍스트 길이에 따라 자동 너비               | 일반적               |
| **Full-width**        | 컨테이너가 부모 너비를 채우고 각 item 이 균등 분할(`flex: 1 1 0`) | 옵션 2~3개로 적을 때 |

---

