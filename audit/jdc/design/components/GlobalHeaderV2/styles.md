# Global Header v2 — 스타일과 토큰

> **미채택 JDC 관찰 profile**: 원본 shell의 상세 근거를 보존한 자료입니다. CMP 전체 또는 PaaS·Agent Hub의 기본 규칙이 아닙니다.
> 공통 문서에 대한 참조는 공통 계약을 사용하며, 여기의 색·자산·치수·export 존재 주장은 관찰 시점의 원본에만 해당합니다.


[← Global Header v2 문서 인덱스](README.md)

## 5. 색상 스펙 — 라이트 모드

| 요소/상태 | 실제 값 | Token |
| --- | --- | --- |
| Header shell | `#ffffff` | `--surface-shell` |
| Header 하단선 | `#dddddd` | `--border-default` |
| Sidebar icon | `#1c1c1c` | `--icon` |
| Ghost hover | `rgba(0,0,0,0.05)` | `--icon-btn-hover-bg` |
| Ghost pressed | `rgba(0,0,0,0.10)` | `--icon-btn-pressed-bg` |
| Icon Button focus outline | `#0066ff` | `--icon-btn-focus-border` |
| Divider line | `#dddddd` | `--border-default` |
| Breadcrumb current item | `#1c1c1c` | `--breadcrumb-active` |
| Breadcrumb ancestor | `#757575` | `--breadcrumb-default` |
| Breadcrumb separator | `#8f8f8f` | `--breadcrumb-border` |

## 6. 색상 스펙 — 다크 모드

상위에 `.dark`를 적용하면 v1과 동일한 shell 색상으로 전환된다.

| 요소/상태 | 실제 값 | Token |
| --- | --- | --- |
| Header shell | `#282828` | `--surface-shell` |
| Header 하단선 / Divider | `#555555` | `--border-default` |
| Sidebar icon | `#dddddd` | `--icon` |
| Ghost hover | `rgba(255,255,255,0.05)` | `--icon-btn-hover-bg` |
| Ghost pressed | `rgba(255,255,255,0.10)` | `--icon-btn-pressed-bg` |
| Icon Button focus outline | `#0066ff` | `--icon-btn-focus-border` |
| Breadcrumb current item | `#dddddd` | `--breadcrumb-active` |
| Breadcrumb ancestor | `#8f8f8f` | `--breadcrumb-default` |
| Breadcrumb separator | `#8f8f8f` | `--breadcrumb-border` |

## 10. 디자인 토큰 정의 (CSS 변수)

아래는 Header 자체와 직접 의존성을 재현하는 최소 토큰이다. Icon Button, Divider, Breadcrumb의
전체 토큰·상태는 각각의 가이드라인을 따른다.

```css
:root {
  --font-sans: 'Pretendard', system-ui, -apple-system, sans-serif;
  --surface-shell: #ffffff;
  --surface-primary-subtle: #ebf3ff;
  --border-default: #dddddd;
  --icon: #1c1c1c;

  --icon-btn-hover-bg: rgba(0, 0, 0, 0.05);
  --icon-btn-pressed-bg: rgba(0, 0, 0, 0.10);
  --icon-btn-focus-border: #0066ff;

  --breadcrumb-default: #757575;
  --breadcrumb-active: #1c1c1c;
  --breadcrumb-hovered: #555555;
  --breadcrumb-pressed: #333333;
  --breadcrumb-border: #8f8f8f;
  --breadcrumb-focus-border: #0066ff;
}

.dark {
  --surface-shell: #282828;
  --surface-primary-subtle: #00255c;
  --border-default: #555555;
  --icon: #dddddd;

  --icon-btn-hover-bg: rgba(255, 255, 255, 0.05);
  --icon-btn-pressed-bg: rgba(255, 255, 255, 0.10);
  --icon-btn-focus-border: #0066ff;

  --breadcrumb-default: #8f8f8f;
  --breadcrumb-active: #dddddd;
  --breadcrumb-hovered: #757575;
  --breadcrumb-pressed: #555555;
  --breadcrumb-border: #8f8f8f;
  --breadcrumb-focus-border: #3384ff;
}
```

