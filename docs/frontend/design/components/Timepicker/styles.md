# Timepicker — 스타일과 토큰

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Timepicker 문서 인덱스](./README.md)

## 10. 색상, typography, token

### Light

| 역할                               | 값                     | token                                         |
| ---------------------------------- | ---------------------- | --------------------------------------------- |
| enabled field                      | #ffffff                | `--form-surface-active`                       |
| create / disabled / readOnly field | #f8f8f8                | `--form-surface-inactive`                     |
| default border                     | #dddddd                | `--form-border-default`                       |
| focus                              | var(--accent-500)                | `--form-border-active`                        |
| invalid                            | #e81919                | `--form-border-invalid`                       |
| text / placeholder                 | #1c1c1c / #8f8f8f      | `--form-text` / `--form-placeholder-active`   |
| disabled text / icon               | #aaaaaa                | `--text-disabled` / `--icon-disabled`         |
| dialog / divider                   | #ffffff / #dddddd      | `--surface` / `--border-default`              |
| hover / pressed                    | #f8f8f8 / #f4f4f4      | `--surface-hover` / `--surface-pressed`       |
| selected option                    | var(--accent-50) + var(--accent-500) text | `--surface-primary-subtle` / `--text-primary` |
| help / error                       | #555555 / #d00a0a      | `--text-subtle` / `--text-error`              |

### Dark

| 역할                          | 값                             | token                                            |
| ----------------------------- | ------------------------------ | ------------------------------------------------ |
| field                         | rgba(255,255,255,.08)          | `--form-surface-active`                          |
| border                        | #555555                        | `--form-border-default`                          |
| focus / invalid               | var(--accent-400) / #f52424              | `--form-border-active` / `--form-border-invalid` |
| text / placeholder / disabled | #dddddd / #8f8f8f / #757575    | form/text tokens                                 |
| dialog                        | #1c1c1c                        | `--surface`                                      |
| hover / pressed               | #333333 / #555555              | surface tokens                                   |
| selected                      | blue 400 at 12% + var(--accent-400) text | `--surface-primary-subtle` / `--text-primary`    |

Typography: field value/placeholder는 400 14px/20px, option은 400 16px/24px, help/error는 400 12px/16px다. Footer의 typography와 hover/focus는 공용 medium Button/TextButton 정의를 그대로 따른다.

새 환경은 최소한 다음 Timepicker token을 제공해야 한다.

```css
:root {
  --font-sans: "Pretendard", system-ui, sans-serif;
  --text-body1: 400 16px/24px var(--font-sans);
  --text-body2: 400 14px/20px var(--font-sans);
  --text: #1c1c1c;
  --text-subtle: #555555;
  --text-disabled: #aaaaaa;
  --text-primary: var(--accent-500);
  --text-error: #d00a0a;
  --icon: #1c1c1c;
  --icon-disabled: #aaaaaa;
  --surface: #ffffff;
  --surface-hover: #f8f8f8;
  --surface-pressed: #f4f4f4;
  --surface-primary-subtle: var(--accent-50);
  --border-default: #dddddd;
  --border-primary: var(--accent-500);
  --border-inverse: #555555;
  --form-text: #1c1c1c;
  --form-surface-active: #ffffff;
  --form-surface-inactive: #f8f8f8;
  --form-border-default: #dddddd;
  --form-border-active: var(--accent-500);
  --form-border-invalid: #e81919;
  --form-placeholder-active: #8f8f8f;
  --cal-shadow: 0 4px 6px rgba(9, 30, 66, 0.15), 0 0 1px rgba(9, 30, 66, 0.31);
}
```

```css
.dark {
  --text: #dddddd;
  --text-subtle: #aaaaaa;
  --text-disabled: #757575;
  --text-primary: var(--accent-400);
  --text-error: #fec3c3;
  --icon: #dddddd;
  --icon-disabled: #555555;
  --surface: #1c1c1c;
  --surface-hover: #333333;
  --surface-pressed: #555555;
  --surface-primary-subtle: color-mix(in srgb, var(--accent-400) 12%, transparent);
  --border-default: #555555;
  --border-primary: var(--accent-400);
  --border-inverse: #555555;
  --form-text: #dddddd;
  --form-surface-active: rgba(255, 255, 255, 0.08);
  --form-surface-inactive: rgba(255, 255, 255, 0.08);
  --form-border-default: #555555;
  --form-border-active: var(--accent-400);
  --form-border-invalid: #f52424;
  --form-placeholder-active: #8f8f8f;
}
```

