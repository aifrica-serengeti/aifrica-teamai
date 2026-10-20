# Pagination — 정의와 구조

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Pagination 문서 인덱스](./README.md)

## 2. 의존 컴포넌트

이 컴포넌트를 구현/재현하기 위해 필요한 공용 하위 컴포넌트. **Pagination은 이 들을
직접 만들지 않고 재사용한다.** 재현자는 이 목록의 컴포넌트를 먼저 확보한 뒤 조합해야 한다.

| 컴포넌트                                                                        | 가이드라인                | 구현 여부 | 담당 파트                    | 사용 설정                                                                        |
| ------------------------------------------------------------------------------- | ------------------------- | --------- | ---------------------------- | -------------------------------------------------------------------------------- |
| **Icon Button**                                                                 | `IconButton/README.md` ✅ | 참조 계약 · 매핑 확인 필요    | 네비게이션 버튼 4종(« ‹ › ») | `size="medium"`(24px 터치영역) + `iconSize="2xl"`(24px icon) + `variant="ghost"` |
| **Input**                                                                       | `Input/README.md` ✅      | 참조 계약 · 매핑 확인 필요    | 페이지 번호 입력             | `size="medium"`(32px 높이), `variant="default"`, label 생략, width 44px override |
| **Dropdown**                                                                    | `Dropdown/README.md` ✅   | 참조 계약 · 매핑 확인 필요    | 페이지당 항목 수 선택        | `size="medium"`(32px), label 생략, width 59px override                           |
| **System icon** `chevrons_left`/`chevron_left`/`chevron_right`/`chevrons_right` | `Icon/README.md` ✅       | 참조 계약 · 매핑 확인 필요    | 네비게이션 화살표            | Icon Button 내부에서 2xl(24px)로 렌더                                            |

### 의존 컴포넌트 매핑 원칙 (왜 Select가 아닌 Dropdown인가)

Figma 분석 결과 각 파트는 서로 다른 토큰 그룹을 사용한다. 이 토큰이 어느 기존 컴포넌트와
일치하는지 교차 검증하여 매핑했다:

| Pagination 파트          | Figma 토큰                                      | 일치하는 컴포넌트 | 근거                                 |
| ------------------------ | ----------------------------------------------- | ----------------- | ------------------------------------ |
| 페이지 번호 input        | `color/form/default/*`(form 토큰)               | **Input**         | Input이 정확히 form 토큰 사용        |
| 페이지당 항목수 selector | `color/button/tertiary-*`(tertiary button 토큰) | **Dropdown**      | Dropdown이 tertiary button 토큰 사용 |
| 네비게이션 버튼          | Icon Button 전용 토큰                           | **Icon Button**   | 24px 히트영역 + ghost variant 일치   |

> **Select를 쓰지 않는 이유:** Select는 Radix Popover 기반 combobox로 form이 아닌 별도
> 구조/토큰을 사용한다. Figma의 페이지당 항목수 selector는 tertiary button 토큰이므로
> **Dropdown이 시각·토큰 양쪽 모두 정확히 일치**한다. 디자인 정확도 우선.

---

## 3. 구조 (Anatomy)

```
Pagination (nav[aria-label="페이지네이션"], flex row, gap 16px)
├── 결과 카운트 ── "총 N건 중 a-b건". N은 primary 강조색 SemiBold
├── 이전 nav (navGroup)
│   ├── Icon Button « (chevrons_left, ghost)  ── 처음 페이지로
│   └── Icon Button ‹ (chevron_left, ghost)   ── 이전 페이지로
├── 페이지 입력 영역 (pageInputArea, gap 8px)
│   ├── Input (44px, 숫자만, Enter/blur 확정) ── 현재 페이지 번호
│   └── 총페이지 ("/ N") ── "/" gray-700, N gray-900
├── 다음 nav (navGroup)
│   ├── Icon Button › (chevron_right, ghost)  ── 다음 페이지로
│   └── Icon Button » (chevrons_right, ghost) ── 마지막 페이지로
└── 페이지당 항목수 (pageSizeWrap, 59px)
    └── Dropdown (medium) ── 페이지당 표시할 항목 수 선택
```

- 전체 가로 정렬, 파트 간 gap **16px** (Figma auto-layout `gap-[16px]`).
- 네비게이션 버튼 2개는 `navGroup` 안에서 여백 없이 인접 (Figma: Icon Buttons 컨테이너 gap 없음).
- `flex-wrap: wrap` — 좁은 화면에서는 다음 행으로 자동 줄바꿈.
- **`mode="simple"` 변형** — 이전(‹)/다음(›) 버튼과 그 사이의 현재 페이지 번호
  (`N / 총페이지`, Body3)만 남기고 결과 카운트·처음(«)/마지막(»)·페이지 input·페이지당
  항목수 Dropdown을 숨긴다. 340px 이하의 좁은 사이드 패널 등 공간이 부족한 목록에서
  쓴다. controlled API(`page`/`total`/`onPageChange`)는 동일하다.
- **`showPageSize?: boolean`** — 기본 `true`. `false`이면 항목 수 Dropdown과 wrapper만 생략한다.
  `pageSize`·페이지 탐색·카운트는 유지한다. 고정 항목 수는 부모가 API 조회에도 같은 값으로 적용한다.
  `mode="simple"`에서는 이 값에 관계없이 항목 수 Dropdown이 표시되지 않는다.

---

## 4. 레이아웃 스펙

### 공통 치수 (Figma 교차 검증)

| 항목                     | 값                                                     |
| ------------------------ | ------------------------------------------------------ |
| 컨테이너 gap             | **16px** (파트 간)                                     |
| 페이지 입력 영역 gap     | **8px** (input ↔ "/ N")                                |
| 결과 카운트 타이포그래피 | **Body3** — Pretendard Regular 12px / line-height 16px |
| 총페이지 타이포그래피    | **Body3** — 12px / 16px                                |
| 결과 카운트 강조(N)      | **12px / 16px / SemiBold(600)**                        |

### 각 파트 치수

| 파트                     | 폭                | 높이          | 비고                                    |
| ------------------------ | ----------------- | ------------- | --------------------------------------- |
| 네비게이션 Icon Button   | **24px** 터치영역 | 24px          | 내부 icon 2xl = 24px (박스를 가득 채움) |
| 페이지 번호 Input        | **44px**          | 32px (medium) | padding-x 8px, 텍스트 가운데 정렬       |
| 총페이지 "/ N"           | auto              | —             | "/"와 N 사이 4px                        |
| 페이지당 항목수 Dropdown | **59px**          | 32px (medium) | Figma tertiary field 치수               |

> 폭 44px / 59px은 Figma 원본 픽셀값 그대로. 의존 컴포넌트가 `width: 100%` 이므로
> 부모 wrapper에 고정 폭을 주어 제어한다.

### 결과 카운트 공개 API

| prop            | 역할                                                                                                                 |
| --------------- | -------------------------------------------------------------------------------------------------------------------- |
| `rangeTemplate` | `{total}`, `{start}`, `{end}` 토큰의 언어별 순서를 지정한다. `{total}`은 공용 강조색과 SemiBold를 유지한다.          |
| `locale`        | 템플릿 숫자를 `Intl.NumberFormat`으로 표시할 BCP 47 locale이다.                                                      |
| `formatRange`   | 템플릿으로 표현할 수 없는 ReactNode 조합을 위한 escape hatch다. 사용 시 결과 markup과 강조 표현은 호출부가 소유한다. |

일반적인 다국어 카운트는 `formatRange` 대신 `rangeTemplate`과 `locale`을 사용한다.

---
