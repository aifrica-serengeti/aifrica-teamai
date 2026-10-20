# Global Header v1 — 스타일과 토큰

> **미채택 JDC 관찰 profile**: 원본 shell의 상세 근거를 보존한 자료입니다. CMP 전체 또는 PaaS·Agent Hub의 기본 규칙이 아닙니다.
> 공통 문서에 대한 참조는 공통 계약을 사용하며, 여기의 색·자산·치수·export 존재 주장은 관찰 시점의 원본에만 해당합니다.


[← Global Header v1 문서 인덱스](README.md)

## 5. 색상 스펙 — 라이트 모드

모든 색상은 semantic token으로 참조한다. 아래 hex/rgba는 token의 실제 값이다.

### Shell 및 trigger

| 요소/상태 | 실제 값 | Token |
| --- | --- | --- |
| Header 배경 | `#ffffff` | `--surface-shell` |
| Header 하단선 | `#dddddd` | `--border-default` |
| 기본 텍스트 / account 이름 | `#1c1c1c` | `--text` |
| 기본 아이콘 | `#1c1c1c` | `--icon` |
| Account hover | `#f8f8f8` | `--surface-hover` |
| Account pressed / menu open | `#f4f4f4` | `--surface-pressed` |
| Account focus outline | 1px `#0066ff`, offset 1px | `--border-primary` |

### Search 및 전역 action

| 요소/상태 | 실제 값 | Token / 공용 컴포넌트 |
| --- | --- | --- |
| Search surface | `#ffffff` | `--form-surface-active` (Search large) |
| Search border | 1px `#dddddd` | `--form-border-default` |
| Search placeholder | `#8f8f8f` | `--form-placeholder-active` |
| Icon Button hover overlay | `rgba(0,0,0,0.05)` | `--icon-btn-hover-bg` |
| Icon Button pressed overlay | `rgba(0,0,0,0.10)` | `--icon-btn-pressed-bg` |
| Icon Button focus outline | 1px `#0066ff`, offset 1px | `--icon-btn-focus-border` |
| unread dot | `#d00a0a` | `--element-point` |

### Account menu

| 요소 | 실제 값 | Token |
| --- | --- | --- |
| Menu 배경 | `#ffffff` | `--menu-surface` |
| Menu 테두리 | 1px `#dddddd` | `--border-default` |
| Menu 그림자 | `0 4px 6px 0 rgba(9,30,66,.15), 0 0 1px 0 rgba(9,30,66,.31)` | `--menu-shadow` |
| 프로필 이름 / item 텍스트 | `#1c1c1c` | `--text` |
| email | `#757575` | `--text-subtler` |
| role Chip 배경 / 글자 | `#eeeeee` / `#1c1c1c` | `--chip-subtle-gray` / `--chip-text-gray` |
| Avatar indigo solid | `#3235ec` / 글자 `#ffffff` | `--avatar-solid-indigo` / `--avatar-on-fill` |
| Menu item hover / pressed | `#f8f8f8` / `#f4f4f4` | `--menu-item-hovered` / `--menu-item-pressed` |

---

## 6. 색상 스펙 — 다크 모드

`.dark`가 상위 요소에 적용되면 동일한 컴포넌트 코드가 아래 값으로 전환된다.

| 요소/상태 | 실제 값 | Token |
| --- | --- | --- |
| Header 배경 | `#282828` | `--surface-shell` |
| Header 하단선 / Search border / Menu border | `#555555` | `--border-default`, `--form-border-default` |
| 기본 텍스트 / account 이름 / icon | `#dddddd` | `--text`, `--icon` |
| email / Search placeholder | `#8f8f8f` | `--text-subtler`, `--form-placeholder-active` |
| Search surface | `rgba(255,255,255,0.08)` (`#ffffff14`) | `--form-surface-active` |
| Account hover | `#333333` | `--surface-hover` |
| Account pressed / menu open | `#555555` | `--surface-pressed` |
| Focus outline | `#3384ff` | `--border-primary` |
| Icon Button hover / pressed overlay | `rgba(255,255,255,.05)` / `rgba(255,255,255,.10)` | `--icon-btn-hover-bg` / `--icon-btn-pressed-bg` |
| unread dot | `#e81919` | `--element-point` |
| Menu background | `#333333` | `--menu-surface` |
| Menu hover / pressed | `#444444` / `#3c3c3c` | `--menu-item-hovered` / `--menu-item-pressed` |
| role Chip background / text | `#333333` / `#dddddd` | `--chip-subtle-gray` / `--chip-text-gray` |
| Avatar indigo solid | `#3235ec` / 글자 `#ffffff` (라이트와 동일) | `--avatar-solid-indigo` / `--avatar-on-fill` |

Menu 그림자(`--menu-shadow`)는 navy alpha 기반이라 라이트/다크 모두 동일하다.

---

## 8. 타이포그래피

폰트는 Pretendard (`--font-sans`)다.

| 위치 | 크기 / 행간 / 굵기 |
| --- | --- |
| Breadcrumb | 14px / 20px / 400 (공용 Breadcrumb Body2) |
| Search | 공용 Search large 스펙 (입력 본문 14px / 20px) |
| Account 이름 | 14px / 20px / 400 |
| Menu profile 이름 | 14px / 20px / 400 |
| Menu email | 12px / 16px / 400 |
| Role Chip | 12px / 16px / 600 (공용 Chip small) |
| Menu item | 14px / 20px / 400 (공용 Menu large) |

---

## 11. 디자인 토큰 정의 (CSS 변수)

새 프로젝트에서 아래 토큰을 전역 CSS에 정의한다. 의존 컴포넌트의 전체 토큰은 각각의
가이드라인을 따른다.

```css
:root {
  --font-sans: 'Pretendard', system-ui, sans-serif;

  --text: #1c1c1c;
  --text-subtler: #757575;
  --text-disabled: #aaaaaa;
  --icon: #1c1c1c;

  --surface-shell: #ffffff;
  --surface-hover: #f8f8f8;
  --surface-pressed: #f4f4f4;
  --border-default: #dddddd;
  --border-primary: #0066ff;

  --form-text: #1c1c1c;
  --form-surface-active: #ffffff;
  --form-border-default: #dddddd;
  --form-placeholder-active: #8f8f8f;

  --icon-btn-hover-bg: rgba(0, 0, 0, 0.05);
  --icon-btn-pressed-bg: rgba(0, 0, 0, 0.10);
  --icon-btn-focus-border: #0066ff;

  --element-point: #d00a0a;
  --element-on-point: #ffffff;

  --avatar-solid-indigo: #3235ec;
  --avatar-on-fill: #ffffff;
  --chip-subtle-gray: #eeeeee;
  --chip-text-gray: #1c1c1c;

  --menu-surface: #ffffff;
  --menu-item-hovered: #f8f8f8;
  --menu-item-pressed: #f4f4f4;
  --menu-shadow: 0 4px 6px 0 rgba(9, 30, 66, 0.15),
    0 0 1px 0 rgba(9, 30, 66, 0.31);
}

.dark {
  --text: #dddddd;
  --text-subtler: #8f8f8f;
  --text-disabled: #757575;
  --icon: #dddddd;

  --surface-shell: #282828;
  --surface-hover: #333333;
  --surface-pressed: #555555;
  --border-default: #555555;
  --border-primary: #3384ff;

  --form-text: #dddddd;
  --form-surface-active: rgba(255, 255, 255, 0.08);
  --form-border-default: #555555;
  --form-placeholder-active: #8f8f8f;

  --icon-btn-hover-bg: rgba(255, 255, 255, 0.05);
  --icon-btn-pressed-bg: rgba(255, 255, 255, 0.10);
  --icon-btn-focus-border: #3384ff;

  --element-point: #e81919;
  --element-on-point: #ffffff;

  --avatar-solid-indigo: #3235ec;
  --avatar-on-fill: #ffffff;
  --chip-subtle-gray: #333333;
  --chip-text-gray: #dddddd;

  --menu-surface: #333333;
  --menu-item-hovered: #444444;
  --menu-item-pressed: #3c3c3c;
  --menu-shadow: 0 4px 6px 0 rgba(9, 30, 66, 0.15),
    0 0 1px 0 rgba(9, 30, 66, 0.31);
}
```

---

