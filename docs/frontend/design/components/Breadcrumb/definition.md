# Breadcrumb — 정의와 구조

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Breadcrumb 문서 인덱스](./README.md)

## 2. 의존 컴포넌트

이 컴포넌트를 구현/재현하기 위해 필요한 공용 하위 컴포넌트.

| 컴포넌트                          | 가이드라인         | 구현 여부 | 비고                                                                                   |
| --------------------------------- | ------------------ | --------- | -------------------------------------------------------------------------------------- |
| **Icon Button**                   | `IconButton/README.md` ✅ | 참조 계약 · 매핑 확인 필요    | 축약 `...` 트리거. `size="tiny"`(20×20) + `variant="outlined"`. Figma node 7865:106116 |
| **Menu**                          | `Menu/README.md` ✅       | 참조 계약 · 매핑 확인 필요    | 축약된 중간 항목을 노출하는 드롭다운. `size="small"`. Radix DropdownMenu 기반          |
| **System icon** `more_horizontal` | `Icon/README.md` ✅       | 참조 계약 · 매핑 확인 필요    | `...` 점 3개 아이콘. Icon Button 내부에서 12px 로 렌더                                 |

재현자는 Icon Button(및 그 내부 Icon)과 Menu 를 먼저 확보한 뒤 Breadcrumb 를 조합해야 한다.
Breadcrumb 이 `...` 버튼과 메뉴를 직접 만들지 않는다. 상세 절차는 루트 [foundation 문서](../../foundations.md) 의
"공용 컴포넌트 조합 규칙" 참조.

---

## 3. 구조 (Anatomy)

```
Breadcrumb (nav[aria-label="Breadcrumb"])
├── Item (상위 depth) ── <a> 또는 Slot 합성. default 색상, hover/pressed 밑줄
├── Separator "/"     ── 장식(aria-hidden). border 색상 고정
├── ... (좁아지면)    ── Icon Button(tiny/outlined) + System icon(more_horizontal)
│   └── 클릭 시 Menu(small) 가 열리고 축약된 Item 들이 순서대로 노출
├── Item ...
└── Item (현재 페이지) ── <span aria-current="page">. active 색상, 비상호작용
```

- Container: `flex` 가로/세로 중앙 정렬, gap 8px.
- Item 들과 Separator 가 교대로 배치된다.
- 마지막 Item 이 현재 페이지(`current`). 링크가 아니라 텍스트.
- 축약 시 루트(첫) 다음에 `...` (Icon Button + Menu) 가 오고, 끝쪽 항목들이 이어진다.

---

## 4. 레이아웃 스펙

### 공통 치수 (Figma 교차 검증)

| 항목                 | 값                                                     |
| -------------------- | ------------------------------------------------------ |
| 타이포그래피         | **Body2** — Pretendard Regular 14px / line-height 20px |
| font-weight          | 400 (Regular)                                          |
| gap (Item↔Separator) | **8px** (Figma auto-layout `gap-[8px]`)                |
| Separator            | `/` 문자 (14px)                                        |
| white-space          | `nowrap` (한 줄 유지)                                  |
| flex-wrap            | `nowrap` (축약 모드) / `wrap` (compound 모드)          |

### 축약 `...` 버튼 (Icon Button tiny)

| 항목          | 값                                                                                                            |
| ------------- | ------------------------------------------------------------------------------------------------------------- |
| 터치 영역     | **20×20px**                                                                                                   |
| border-radius | 4px                                                                                                           |
| 테두리        | 1px, 색상은 Icon Button `--icon-btn-outlined-border` (라이트 `rgba(0,0,0,0.1)`, 다크 `rgba(255,255,255,0.1)`) |
| 내부 icon     | `more_horizontal` System icon **12px**                                                                        |
| hover/pressed | 반투명 오버레이 배경 (Icon Button 패턴)                                                                       |

### 축약 메뉴 (Menu small)

| 항목  | 값                                       |
| ----- | ---------------------------------------- |
| size  | **small**                                |
| align | `start` (트리거 기준 좌측 정렬)          |
| 내용  | 축약된 중간 Item 들을 원래 순서대로 나열 |

---

