# SNB v2 — 스타일과 토큰

> **미채택 JDC 관찰 profile**: 원본 shell의 상세 근거를 보존한 자료입니다. CMP 전체 또는 PaaS·Agent Hub의 기본 규칙이 아닙니다.
> 공통 문서에 대한 참조는 공통 계약을 사용하며, 여기의 색·자산·치수·export 존재 주장은 관찰 시점의 원본에만 해당합니다.


[← SNB v2 문서 인덱스](README.md)

## 6. 색상 스펙

### Light mode

| 요소/상태 | 실제 표시값 | token |
| --- | --- | --- |
| Shell | #ebf3ff | --surface-primary-subtle |
| 기본 text/icon | #555555 | --text-subtle |
| active leaf text | #1c1c1c | --text |
| active-descendant parent | #1c1c1c, background 없음 | --text |
| Section title | #757575 | --text-subtler |
| Disabled | #aaaaaa | --text-disabled |
| Item hover | color-mix(#ebf3ff 60%, #cce0ff), 약 #dfebff | --snb-v2-item-hover |
| Pressed / selected leaf | #cce0ff | --snb-v2-item-pressed / --snb-v2-item-selected |
| Selected hover | color-mix(#cce0ff 60%, #99c2ff), 약 #b8d4ff | --snb-v2-item-selected-hover |
| Selected pressed | #99c2ff | --snb-v2-item-selected-pressed |
| Active indicator / focus | #0066ff | --element-primary / --border-primary |
| Scroll / section divider | #c3d0e3 | --snb-v2-divider |
| Collapsed popup surface / border | #ffffff / #dddddd | --surface / --border-default |
| Footer avatar / text | #3235ec / #ffffff | --avatar-solid-indigo / --text-static |

### Dark mode

| 요소/상태 | 실제 표시값 | token |
| --- | --- | --- |
| Shell | #00255c | --surface-primary-subtle |
| 기본 text/icon | #aaaaaa | --text-subtle |
| active leaf text | #dddddd | --text |
| Section title / disabled | #8f8f8f / #555555 | --text-subtler / --text-disabled |
| Pressed / selected leaf | #003585 | --snb-v2-item-pressed / --snb-v2-item-selected |
| Hover | color-mix(#00255c 60%, #003585) | --snb-v2-item-hover |
| Selected hover / pressed | color-mix(#003585 60%, #0045ad) / #0045ad | --snb-v2-item-selected-hover / --snb-v2-item-selected-pressed |
| Divider | #0045ad | --snb-v2-divider |
| Primary / focus | #3384ff | --element-primary / --border-primary |
| Popup surface / border | #1c1c1c / #555555 | --surface / --border-default |

## 9. 디자인 토큰 정의

~~~css
:root {
  --font-sans: 'Pretendard', system-ui, -apple-system, sans-serif;
  --color-blue-50: #ebf3ff;
  --color-blue-100: #cce0ff;
  --color-blue-200: #99c2ff;
  --color-blue-400: #3384ff;
  --color-blue-500: #0066ff;
  --color-blue-700: #0045ad;
  --color-blue-800: #003585;
  --color-blue-900: #00255c;
  --color-gray-300: #dddddd;
  --color-gray-400: #aaaaaa;
  --color-gray-500: #8f8f8f;
  --color-gray-600: #757575;
  --color-gray-700: #555555;
  --color-gray-900: #1c1c1c;
  --color-white: #ffffff;
  --color-indigo-600: #3235ec;

  --surface: var(--color-white);
  --surface-primary-subtle: var(--color-blue-50);
  --text: var(--color-gray-900);
  --text-subtle: var(--color-gray-700);
  --text-subtler: var(--color-gray-600);
  --text-disabled: var(--color-gray-400);
  --text-static: var(--color-white);
  --border-default: var(--color-gray-300);
  --border-primary: var(--color-blue-500);
  --element-primary: var(--color-blue-500);
  --avatar-solid-indigo: var(--color-indigo-600);

  --color-snb-v2-divider: #c3d0e3;
  --snb-v2-divider: var(--color-snb-v2-divider);
  --snb-v2-item-selected: var(--color-blue-100);
  --snb-v2-item-hover: color-mix(in srgb, var(--color-blue-50) 60%, var(--color-blue-100));
  --snb-v2-item-pressed: var(--color-blue-100);
  --snb-v2-item-selected-hover: color-mix(in srgb, var(--color-blue-100) 60%, var(--color-blue-200));
  --snb-v2-item-selected-pressed: var(--color-blue-200);
}

.dark {
  --surface: var(--color-gray-900);
  --surface-primary-subtle: var(--color-blue-900);
  --text: var(--color-gray-300);
  --text-subtle: var(--color-gray-400);
  --text-subtler: var(--color-gray-500);
  --text-disabled: var(--color-gray-700);
  --border-default: var(--color-gray-700);
  --border-primary: var(--color-blue-400);
  --element-primary: var(--color-blue-400);

  --snb-v2-item-selected: var(--color-blue-800);
  --snb-v2-item-hover: color-mix(in srgb, var(--color-blue-900) 60%, var(--color-blue-800));
  --snb-v2-item-pressed: var(--color-blue-800);
  --snb-v2-item-selected-hover: color-mix(in srgb, var(--color-blue-800) 60%, var(--color-blue-700));
  --snb-v2-item-selected-pressed: var(--color-blue-700);
  --snb-v2-divider: var(--color-blue-700);
}
~~~


## 보조 메뉴 trigger 조합

utility trigger slot은 기존 item/collapsedTarget 크기와 스타일을 유지한다. Portal panel의 폭·높이·충돌 회피는 소비자 책임이며 sidebar geometry를 바꾸지 않는다.


## 계정 메뉴 슬롯

계정 메뉴 슬롯은 기존 footer 크기·배경·아바타 32px와 IconButton hit area를 유지한다. 접힌 아바타 button에는 기존 collapsedTarget focus-visible 스타일을 사용한다. 팝오버는 Menu의 토큰·애니메이션·portal을 사용한다.
