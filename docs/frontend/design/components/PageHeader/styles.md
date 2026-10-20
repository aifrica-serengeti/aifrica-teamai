# Page Header — 스타일과 토큰

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

제목 옆 액션 간격은 Header의 `page-header-title-actions` 슬롯이 4px로 소유한다.
페이지 내부 액션 묶음은 `gap: inherit`를 사용한다. 버튼 크기·위험 색상·disabled 색상은
공용 Icon Button과 semantic token을 사용하고, SVG 크기나 stroke를 CSS로 덮어쓰지 않는다.

[← Page Header 문서 인덱스](./README.md)

## 6. 색상 스펙 — 라이트 모드

아래 값은 Figma light node `9026:178355`의 변수 정의다. Button/Tab의 세부 상태는 각 공용
컴포넌트 가이드라인이 소유하며, Page Header는 해당 컴포넌트를 override하지 않는다.

| 요소                                         | 실제 값                                          | Page Header token / 의존성                           |
| -------------------------------------------- | ------------------------------------------------ | ---------------------------------------------------- |
| Header shell                                 | `#ffffff`                                        | `--surface-shell`                                    |
| 기본 Title / 기본 icon / tertiary·text label | `#1c1c1c`                                        | `--page-header-text`                                 |
| Detail text                                  | `#757575`                                        | `--text-subtler`                                     |
| Description / inactive Tab label             | `#555555`                                        | `--text-subtle`                                      |
| Title Chip surface                           | `#eeeeee`                                        | `--page-header-title-chip-surface`                   |
| Title Chip text                              | `#1c1c1c`                                        | `--page-header-text`                                 |
| Tab active label / indicator                 | `var(--accent-500)`                                        | `--page-header-tab-active-text` / `--border-primary` |
| Tab base line                                | `#dddddd`                                        | `--page-header-tab-border`                           |
| Selected Tab count Chip                      | surface `var(--accent-50)`, text `var(--accent-500)`                | public Tab + Chip                                    |
| Primary Button fill (Figma default)          | `var(--accent-600)`                                        | public Button state token                            |
| Tertiary Button                              | fill `#ffffff`, border `#dddddd`, text `#1c1c1c` | public Button                                        |

---

## 7. 색상 스펙 — 다크 모드

`.dark` 상위 클래스가 적용되면 Figma dark node `11479:54331`과 아래처럼 일치해야 한다.

| 요소                                             | 실제 값                                                                      | Page Header token / 의존성         |
| ------------------------------------------------ | ---------------------------------------------------------------------------- | ---------------------------------- |
| Header shell                                     | `#282828`                                                                    | `--surface-shell`                  |
| 기본 Title / 실제 Icon SVG / tertiary·text label | `#dddddd`                                                                    | `--page-header-text`               |
| Detail text                                      | `#8f8f8f`                                                                    | `--text-subtler`                   |
| Description / inactive Tab label                 | `#aaaaaa`                                                                    | `--text-subtle`                    |
| Title Chip surface                               | `#444444`                                                                    | `--page-header-title-chip-surface` |
| Title Chip text                                  | `#dddddd`                                                                    | `--page-header-text`               |
| Primary Button fill                              | `var(--accent-400)`                                                                    | public Button `primary`            |
| Tertiary Button                                  | fill `rgba(255,255,255,.08)` (`#ffffff14`), border `#555555`, text `#dddddd` | public Button `tertiary`           |
| Tab active label                                 | `var(--accent-200)`                                                                    | `--page-header-tab-active-text`    |
| Tab active indicator                             | `var(--accent-400)`                                                                    | `--border-primary`                 |
| Tab base line                                    | `#333333`                                                                    | `--page-header-tab-border`         |
| Selected Tab count Chip                          | surface `var(--accent-800)`, text `var(--accent-200)`                                            | public Tab + Chip                  |

`PageHeader.root`은 `--text`, `--icon`, `--btn-on-tertiary`, `--text-btn-label`을
`--page-header-text`로 국소 재정의한다. 따라서 다른 화면의 공용 Button·Icon·Tab 색상은
바꾸지 않는다.

---

## 9. 타이포그래피와 전환

| 위치                     | 폰트                                                            |
| ------------------------ | --------------------------------------------------------------- |
| Title                    | Pretendard SemiBold, 24px / 32px (`Headline2`)                  |
| Detail text              | Pretendard Regular, 12px / 16px (`Body3`)                       |
| Description              | Pretendard Regular, 14px / 20px (`Body2`)                       |
| Title Chip               | Pretendard SemiBold, 12px / 16px (`Title3`), medium 24px height |
| Tab label / Button label | 각 공용 Tab/Button의 14px / 20px 스펙                           |

Header root, title, detail, description은 색상 관련 속성에만
`0.2s ease` transition을 사용한다. `transition: all`이나 전역 `*` transition은 사용하지 않는다.

### Loading skeleton

loading placeholder의 surface와 pulse는 공용 Skeleton을 사용한다. Title/Chip/Detail/Description은
각각 `32px / 24px / 16px / 20px` height를 사용하며, normal text flow와 같은 `2px`, `4px` 위 여백을
가진다. 이 값은 normal Header로 전환할 때 content가 아래로 밀리는 layout shift를 막기 위한 geometry
계약이다. Chip 자리의 pill radius와 각 width·height만 Page Header가 소유한다.

---

## 11. 디자인 토큰 정의

아래는 Page Header가 직접 소유하는 최소 CSS 변수다. 공용 Button, Chip, Tab의 전체 토큰은
각 의존 컴포넌트 가이드라인을 그대로 사용한다.

```css
:root {
  --surface-shell: #ffffff;
  --text-subtle: #555555;
  --text-subtler: #757575;
  --border-primary: var(--accent-500);
  --tab-count-selected-surface: var(--accent-50);
  --tab-count-selected-text: var(--accent-500);

  --page-header-text: #1c1c1c;
  --page-header-title-chip-surface: #eeeeee;
  --page-header-tab-active-text: var(--accent-500);
  --page-header-tab-border: #dddddd;
}

.dark {
  --surface-shell: #282828;
  --text-subtle: #aaaaaa;
  --text-subtler: #8f8f8f;
  --border-primary: var(--accent-400);
  --tab-count-selected-surface: var(--accent-800);
  --tab-count-selected-text: var(--accent-200);

  --page-header-text: #dddddd;
  --page-header-title-chip-surface: #444444;
  --page-header-tab-active-text: var(--accent-200);
  --page-header-tab-border: #333333;
}
```

---
