# Card — 스타일과 토큰

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Card 문서 인덱스](./README.md)

## 5. 색상 스펙 — 라이트 모드

### 루트 컨테이너

| 상태         | 배경                            | 테두리                                                               | 그림자(box-shadow)         | 비고                                          |
| ------------ | ------------------------------- | -------------------------------------------------------------------- | -------------------------- | --------------------------------------------- |
| **Enabled**  | `#ffffff` (`--surface`)         | `1px solid #dddddd` (`--border-default`)                             | 없음                       | 기본                                          |
| **Hovered**  | `#f8f8f8` (`--surface-hover`)   | `1px solid #dddddd`                                                  | `--card-shadow` (navy Mid) | 배경 + 그림자                                 |
| **Pressed**  | `#f4f4f4` (`--surface-pressed`) | `1px solid #dddddd`                                                  | `--card-shadow`            | 배경 + 그림자                                 |
| **Selected** | `#ffffff` (`--surface`)         | `1px solid var(--accent-500)` (`--border-focused`) + `inset 0 0 0 1px var(--accent-500)` | 없음                       | 2px accent 효과 (border 1px + inset shadow 1px) |
| **Disabled** | `#ffffff`                       | `1px solid #dddddd`                                                  | 없음                       | 자식 요소 `opacity: 0.4`                      |
| **Focused**  | `#ffffff`                       | `1px solid #dddddd` (회색 유지)                                      | 없음                       | 별도 focus outline (아래 참조)                |

> **Selected 2px 구현 핵심**: `border-width`를 2px로 바꾸면 콘텐츠가 1px 밀린다.
> 따라서 border는 1px로 고정하고 `box-shadow: inset 0 0 0 1px var(--border-focused)`로
> 두 번째 픽셀을 그린다. box-shadow는 레이아웃에 영향을 주지 않는다.

### Focus outline (Focused 상태)

| 항목           | 값                                                |
| -------------- | ------------------------------------------------- |
| 위치           | `position: absolute; inset: -3px` (카드 바깥 3px) |
| 테두리         | `1px solid var(--accent-500)` (`--border-focused`)          |
| border-radius  | 10px                                              |
| pointer-events | none                                              |
| z-index        | 1                                                 |
| 렌더 방식      | 별도 `<span>` 요소 (카드 자체 border는 회색 유지) |

> **Selected vs Focused 구분 (핵심)**:
>
> - **Selected**: 카드 테두리 자체가 2px accent (border 1px + inset shadow 1px). 테두리와 콘텐츠 사이 간격 없음.
> - **Focused**: 카드 테두리는 회색 1px 유지, 그 바깥 3px 떨어진 곳에 1px focus accent 링(outline).

### 텍스트

| 요소            | 색상      | 토큰                                        |
| --------------- | --------- | ------------------------------------------- |
| Title           | `#1c1c1c` | `--text`                                    |
| Description     | `#555555` | `--text-subtle`                             |
| Sub Description | `#757575` | `--text-subtler`                            |
| Detail text     | `#757575` | `--text-subtler`                            |
| Detail dot (•)  | `#757575` | `--text-subtler`                            |
| Summary label   | `#555555` | `--text-subtle`                             |
| Summary value   | `#1c1c1c` | `--text`                                    |
| Creator "by"    | `#757575` | `--text-subtler`                            |
| Creator name    | `#1c1c1c` | `--text`                                    |
| Disabled 텍스트 | `#aaaaaa` | `--text-disabled` (자식 opacity 0.4로 처리) |

### Chip 색상 (재사용 컴포넌트)

| 칩             | 배경                                   | 텍스트                                 | shape                |
| -------------- | -------------------------------------- | -------------------------------------- | -------------------- |
| "new" 배지     | `var(--accent-50)` (`--element-primary-subtle`) | `var(--accent-500)` (`--text-primary`)           | pill (radius 10px)   |
| Chip01 (blue)  | `var(--accent-50)`                              | `var(--accent-500)`                              | rounded (radius 4px) |
| Chip02 (green) | `#e9fbf2` (`--surface-success-subtle`) | `#05a85a` (`--text-green` → green-600) | rounded              |

### 그림자 (Hovered/Pressed only)

```
--card-shadow: 0 4px 6px 0 rgba(9, 30, 66, 0.15), 0 0 1px 0 rgba(9, 30, 66, 0.31);
```

navy 톤 `#091E42` 알파 기반 2단 드롭섀도우. Menu/Calendar의 `--menu-shadow`와 동일 패턴.
라이트/다크 공통 (알파 기반이므로 배경에 자동 적응).

---

## 6. 색상 스펙 — 다크 모드

`.dark` 클래스 적용 시 semantic 토큰이 자동 전환. 컴포넌트 코드 수정 불필요.

### 루트 컨테이너 (다크)

| 상태         | 배경                            | 테두리                                                               | 비고                              |
| ------------ | ------------------------------- | -------------------------------------------------------------------- | --------------------------------- |
| **Enabled**  | `#1c1c1c` (`--surface`)         | `1px solid #555555` (`--border-default`)                             |                                   |
| **Hovered**  | `#333333` (`--surface-hover`)   | `1px solid #555555`                                                  |                                   |
| **Pressed**  | `#555555` (`--surface-pressed`) | `1px solid #555555`                                                  |                                   |
| **Selected** | `#1c1c1c`                       | `1px solid var(--accent-400)` (`--border-focused`) + `inset 0 0 0 1px var(--accent-400)` | 더 밝은 accent                      |
| **Disabled** | `#1c1c1c`                       | `1px solid #555555`                                                  | 자식 opacity 0.4                  |
| **Focused**  | `#1c1c1c`                       | `1px solid #555555` (회색 유지)                                      | focus outline `1px solid var(--accent-400)` |

### 텍스트 (다크)

| 요소            | 색상      | 토큰             |
| --------------- | --------- | ---------------- |
| Title           | `#dddddd` | `--text`         |
| Description     | `#aaaaaa` | `--text-subtle`  |
| Sub Description | `#8f8f8f` | `--text-subtler` |
| Detail text     | `#8f8f8f` | `--text-subtler` |
| Creator name    | `#dddddd` | `--text`         |

### Chip 색상 (다크)

| 칩             | 배경                                | 텍스트                       |
| -------------- | ----------------------------------- | ---------------------------- |
| "new" 배지     | `rgba(51,132,255,0.12)` (color-mix) | `var(--accent-400)` (`--text-primary`) |
| Chip01 (blue)  | `rgba(51,132,255,0.12)`             | `var(--accent-400)`                    |
| Chip02 (green) | `rgba(6,206,110,0.12)`              | `#06ce6e`                    |

> 그림자(`--card-shadow`)는 navy 알파 기반이라 라이트/다크 공통.

---

## 8. 타이포그래피

Pretendard 폰트. size에 따라 타이포그래피 스타일이 다르다.

### Size별 타이포그래피

| 요소                | Small                           | Medium                          | Large                           |
| ------------------- | ------------------------------- | ------------------------------- | ------------------------------- |
| **Title**           | Title2 (14px/20px SemiBold 600) | Title2 (14px/20px SemiBold 600) | Title1 (16px/24px SemiBold 600) |
| **Description**     | Body3 (12px/16px Regular 400)   | Body2 (14px/20px Regular 400)   | Body2 (14px/20px Regular 400)   |
| **Sub Description** | Body3 (12px/16px Regular 400)   | Body3 (12px/16px Regular 400)   | Body3 (12px/16px Regular 400)   |
| **Detail text**     | —                               | Body3 (12px/16px Regular 400)   | Body3 (12px/16px Regular 400)   |
| **Chip text**       | Title3 (12px/16px SemiBold 600) | Title3 (12px/16px SemiBold 600) | Title3 (12px/16px SemiBold 600) |
| **Creator**         | —                               | Body3 (12px/16px Regular 400)   | —                               |
| **Summary label**   | —                               | —                               | Body3 (12px/16px Regular 400)   |
| **Summary value**   | —                               | —                               | Body2 (14px/20px Regular 400)   |

> 자간(letter-spacing)은 모두 0.

---

## 11. 디자인 토큰 정의 (CSS 변수)

### `:root` (라이트)

```css
:root {
  /* Card 전용 그림자 — navy 톤 Mid (Figma "Mid" effect).
   * --menu-shadow 와 동일 패턴. 라이트/다크 공통. */
  --card-shadow:
    0 4px 6px 0 rgba(9, 30, 66, 0.15), 0 0 1px 0 rgba(9, 30, 66, 0.31);

  /* Card 가 참조하는 semantic 토큰 (공통) */
  --surface: #ffffff;
  --surface-hover: #f8f8f8; /* gray-50 */
  --surface-pressed: #f4f4f4; /* gray-100 */
  --surface-subtle: #f8f8f8; /* gray-50 */
  --border-default: #dddddd; /* gray-300 */
  --border-focused: var(--accent-500); /* accent-500 */
  --text: #1c1c1c; /* gray-900 */
  --text-subtle: #555555; /* gray-700 */
  --text-subtler: #757575; /* gray-600 */
  --text-disabled: #aaaaaa; /* gray-400 */
  --text-primary: var(--accent-500); /* accent-500 */
  --element-primary-subtle: var(--accent-50); /* accent-50 */
  --surface-success-subtle: #e9fbf2; /* green-50 */
}
```

### `.dark` (다크)

```css
.dark {
  --surface: #1c1c1c; /* gray-900 */
  --surface-hover: #333333; /* gray-800 */
  --surface-pressed: #555555; /* gray-700 */
  --surface-subtle: #333333; /* gray-800 */
  --border-default: #555555; /* gray-700 */
  --border-focused: var(--accent-400); /* accent-400 (더 밝은 accent) */
  --text: #dddddd; /* gray-200 */
  --text-subtle: #aaaaaa; /* gray-400 */
  --text-subtler: #8f8f8f; /* gray-500 */
  --text-disabled: #757575; /* gray-600 */
  --text-primary: var(--accent-400); /* accent-400 */
  --element-primary-subtle: color-mix(in srgb, var(--accent-400) 12%, transparent);
  --surface-success-subtle: color-mix(in srgb, #06ce6e 12%, transparent);
  /* --card-shadow 는 navy 알파 기반이라 재정의 불필요 */
}
```

---
