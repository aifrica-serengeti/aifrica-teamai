# Search — 정의와 구조

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Search 문서 인덱스](./README.md)

## 2. 의존 컴포넌트

Search 의 입력 영역(container, border, surface, 상태 전환)은 공용 **Input** 컴포넌트를 사용한다.
재현자는 아래 컴포넌트를 먼저 확보한 뒤 조합해야 한다. 상세 절차는 루트 [foundation 문서](../../foundations.md) 의
"공용 컴포넌트 조합 규칙" 참조.

| 컴포넌트  | 가이드라인                  | 구현 상태              | 용도                                                                                                |
| --------- | --------------------------- | ---------------------- | --------------------------------------------------------------------------------------------------- |
| **Input** | [`Input/README.md`](../Input/README.md) ✅ | 참조 계약 · 매핑 확인 필요 ✅ → **재사용** | Container(`<input>`) 의 외형·상태·토큰. Search 는 Input 을 감싸 leading icon · close button 을 추가 |

> Search 는 Input 의 마크업/상태/border 로직을 **직접 재구현하지 않고** 공용 Input 을 재사용한다.
> Input 이 담당하는 부분: container 높이(size 별), 가로 패딩 기본 12px, radius 4px,
> focus/disabled/invalid/read-only 상태 전환, form semantic 토큰 참조.
>
> Search 가 담당하는 추가 부분: leading search icon(좌측 절대배치) · close button(원형 + X,
> 우측 절대배치) · 값 유무에 따른 close button 토글 · 입력 패딩 재계산.
>
> **Input 이 구현되어 있지 않은 경우**: `Input/README.md` 스펙으로 먼저 공용 Input 컴포넌트를
> 만든 뒤, 그것을 조합해 Search 를 구성한다.

> **Close button 은 공용 Icon Button 을 사용하지 않는다.** Search 의 close button 은
> 회색 원형 배경(`--icon-subtle`) + 흰 X(`--icon-inverse`) 형태로, Input trailing 의
> tiny transparent Icon Button 과 시각적으로 다른 Search 전용 디자인이다. Search 컴포넌트
> 내부에서 직접 렌더한다.

---

## 3. 구조 (Anatomy)

```
Search Field
├── Label 행  ── Label (선택사항)
├── Search input
│   ├── Input wrap (relative) ── leading icon · close button 절대배치 기준
│   │   ├── Leading search icon (absolute, 좌측) ── 돋보기, 검색 기능 표시
│   │   ├── <input> Container ── 공용 Input 컴포넌트
│   │   │   ├── Placeholder / Search text
│   │   └── Close button (absolute, 우측) ── 원형 배경 + X. 값이 있을 때만 표시
└── Help text (optional, 12px)
```

### 구성 요소

| #   | 요소                   | 필수      | 설명                                                        |
| --- | ---------------------- | --------- | ----------------------------------------------------------- |
| 1   | **Label**              | 기본 필수 | Search 에 요구되는 정보 종류 표시. 14px SemiBold            |
| 2   | **Search icon**        | 필수      | 돋보기 아이콘. 검색 기능임을 나타냄. 좌측 절대배치          |
| 3   | Help text (optional)   | 선택      | 해당 데이터 용도 이해를 돕는 추가 정보. 한 줄 권장          |
| 4   | **Container**          | 필수      | 사용자가 입력하는 영역. 공용 Input 컴포넌트                 |
| 5   | Placeholder (optional) | 선택      | 임시 텍스트. 접근성 한계로 기본 표시 아님. "검색" 권장      |
| 6   | **Search text**        | —         | 사용자가 입력한 텍스트                                      |
| 7   | **Close button**       | 조건부    | 값 입력 후 나타남. 원형 배경 + 흰 X. 클릭 시 입력 내용 지움 |

---

## 4. 레이아웃 스펙

모든 수치는 px 단위. Container 외형(size·패딩·radius·상태)은 Input 스펙(`Input/README.md` §4)을
그대로 따른다. 여기서는 Search 가 추가하는 부분만 기술.

### Container — Search 추가 패딩

Search 는 leading icon 과 close button 공간을 확보하기 위해 Input 의 기본 좌우 패딩(12px)을
덮어쓴다.

| 항목                     | 값                     | 비고                                    |
| ------------------------ | ---------------------- | --------------------------------------- |
| 좌측 패딩                | `12 + iconSize + 4` px | icon offset 12px + icon 너비 + 간격 4px |
| 우측 패딩(close 있을 때) | `8 + closeSize + 4` px | close offset 8px + 원형 지름 + 간격 4px |
| 우측 패딩(close 없을 때) | 12px (Input 기본)      | 값이 비어 있을 때                       |

### Size 치수 (Input 과 동일 + Search 추가)

| Size              | Container height | Search icon | Close button 원형 지름 | X 아이콘           |
| ----------------- | ---------------- | ----------- | ---------------------- | ------------------ |
| **Small**         | 28px             | 16px        | 16px                   | 9.6px (원형의 60%) |
| **Medium (기본)** | 32px             | 16px        | 16px                   | 9.6px              |
| **Large**         | 36px             | 16px        | 16px                   | 9.6px              |
| **X-Large**       | 40px             | 16px        | 16px                   | 9.6px              |

> Search icon · Close button 원형 지름 · X 아이콘 크기는 모든 size 에서 **16px**(원형) /
> **9.6px**(X, 원형의 60%)로 고정. `strokeWidth: 2.5` 로 선명하게.

### 간격

| 위치                                 | 값                                    |
| ------------------------------------ | ------------------------------------- |
| Label 행 ↔ Container                 | 4px (세로)                            |
| Container ↔ Help text                | 4px (세로)                            |
| Search icon 좌측 offset              | 12px (Container 좌측 padding 과 정렬) |
| Close button 우측 offset             | 8px                                   |
| Search icon / Close button 세로 정렬 | Container 세로 중앙                   |

> **정렬 불변의 원칙**(Input 스펙 상속): focus 시 border 가 1px → 2px 로 변하면
> `box-sizing: border-box` 때문에 콘텐츠가 1px 밀린다. 따라서 **border 는 1px 고정**하고,
> 두 번째 1px 은 같은 색의 `box-shadow: inset 0 0 0 1px` 로 그린다. Search 의 leading icon /
> close button 절대배치도 이 원칙 덕에 focus 시 흔들리지 않는다.

---

