# Action bar — 스타일과 토큰

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Action bar 문서 인덱스](./README.md)

## 4. 색상 스펙 — 라이트 모드

배경이 **검정 `#1c1c1c`** 이므로, hover/pressed 는 **흰색 알파 오버레이**로
표현한다. 알파가 올라갈수록 검정 배경 위에 흰색이 겹쳐 **밝아진다**.

### Action / Icon button 상태

| 상태 | 배경 (background) | 글씨/아이콘 (color) | 커서 |
| --- | --- | --- | --- |
| Enabled | 투명 `transparent` | `#ffffff` (`--text-inverse`) | `pointer` |
| Hovered | `rgba(255,255,255,0.08)` | `#ffffff` | `pointer` |
| Pressed | `rgba(255,255,255,0.2)` | `#ffffff` | `pointer` |
| Active | `rgba(255,255,255,0.2)` (Pressed 와 동일) | `#ffffff` | `pointer` |
| Focused | 투명 | `#ffffff` + outline | `pointer` |
| Disabled | 투명 | `#8f8f8f` (`--text-disabled-bold`) | `not-allowed` |

> **Active** 상태는 Icon button 전용이며, 시각적으로는 Pressed 와 동일하다
> (선택/활성 상태를 나타낼 때 사용).

### Divider

| 요소 | 색상 |
| --- | --- |
| 선 | `#555555` (`--border-inverse`, `--color-gray-700`) |

### Count text

| 요소 | 색상 | 폰트 |
| --- | --- | --- |
| "N개 선택됨" | `#ffffff` (`--text-inverse`) | Pretendard SemiBold 14px/20px |

### Focus (Focus-visible)

| 상태 | 스펙 |
| --- | --- |
| Focus | **1px `var(--accent-500)` outline**, border 바깥 **1px gap**(offset) |

```css
outline: 1px solid var(--border-primary); /* var(--accent-500) */
outline-offset: 1px;
```

> 32px 버튼 + 1px gap + 1px outline = 시각적 **36px outline** (Figma `h-[36px]`).
> outline 은 border-radius 를 자동 따라간다.

---

## 5. 색상 스펙 — 다크 모드

다크 모드는 `:root` 또는 컨테이너에 `.dark` 클래스 적용 시 전환.
배경이 **흰색 `#ffffff`** 으로 반전되므로, hover/pressed 는 **검정 알파 오버레이**로
표현한다. 알파가 올라갈수록 흰 배경 위에 검정이 겹쳐 **어두워진다**.

### Action / Icon button 상태 (Dark)

| 상태 | 배경 (background) | 글씨/아이콘 (color) | 커서 |
| --- | --- | --- | --- |
| Enabled | 투명 `transparent` | `#1c1c1c` (`--text-inverse`) | `pointer` |
| Hovered | `rgba(0,0,0,0.08)` | `#1c1c1c` | `pointer` |
| Pressed | `rgba(0,0,0,0.2)` | `#1c1c1c` | `pointer` |
| Active | `rgba(0,0,0,0.2)` | `#1c1c1c` | `pointer` |
| Focused | 투명 | `#1c1c1c` + outline | `pointer` |
| Disabled | 투명 | `#757575` (`--text-disabled-bold`) | `not-allowed` |

### Divider (Dark)

| 요소 | 색상 |
| --- | --- |
| 선 | `#555555` (라이트와 동일) |

### Focus (Dark)

| 상태 | 스펙 |
| --- | --- |
| Focus | **1px `var(--accent-400)` outline** (accent-400, 다크에서 더 밝음), 1px offset |

### 라이트 ↔ 다크 대칭 표 (알파 오버레이)

| 상태 | 라이트 (검정 배경 위) | 다크 (흰 배경 위) |
| --- | --- | --- |
| Hovered | 흰색 8% → 미세하게 밝아짐 | 검정 8% → 미세하게 어두워짐 |
| Pressed | 흰색 20% → 뚜렷하게 밝아짐 | 검정 20% → 뚜렷하게 어두워짐 |

> **핵심 규칙**: 라이트/다크가 동일한 알파 비율(8% / 20%)로 대칭된다.
> 이 덕분에 hover < pressed 로 점진적인 강도 차이가 양 모드에서 일관되게 나타난다.
> Figma 라이트 원본은 hover/pressed 모두 `#333333` 솔리드로 동일했으나,
> 시각적 구분을 위해 다크의 알파 오버레이 패턴을 대칭 적용했다.

---

## 6. Elevation (그림자)

Action bar 는 **Mid elevation** 을 사용한다. 컴포넌트가 inverse surface 이므로
배경에서 부상해 보이게 한다. 라이트/다크 공통 동일 스펙.

| 레벨 | 값 |
| --- | --- |
| Mid | `0 0 0 1px rgba(9, 30, 66, 0.31), 0 4px 6px 0 rgba(9, 30, 66, 0.15)` |

출처 — Figma "Mid" effect (2단 그림자):
- `DROP_SHADOW color:#091E424F offset:(0,0) radius:1` → 1px 스프레드 링
- `DROP_SHADOW color:#091E4226 offset:(0,4) radius:6` → 4px 오프셋 드롭

---

## 7. 타이포그래피

폰트 패밀리: **Pretendard**

| 역할 | 크기 | 행간 | 굵기 | 색상(라이트/다크) |
| --- | --- | --- | --- | --- |
| Action 텍스트 | 14px | 20px | 600 (SemiBold) | `#ffffff` / `#1c1c1c` |
| Count text | 14px | 20px | 600 (SemiBold) | `#ffffff` / `#1c1c1c` |
| Disabled Action | 14px | 20px | 600 (SemiBold) | `#8f8f8f` / `#757575` |

---

## 10. 디자인 토큰 정의 (CSS 변수)

새 프로젝트에서 아래 변수를 `:root` 와 `.dark` 에 정의한다. 컴포넌트는 이 변수만 참조한다.

### `:root` (라이트)

```css
:root {
  /* Inverse — Action bar 용 역역할 토큰 */
  --surface-inverse: #1c1c1c;          /* 검정 배경 */
  --text-inverse: #ffffff;             /* 흰 글씨 */
  --icon-inverse: #ffffff;             /* 흰 아이콘 */
  --border-inverse: #555555;           /* 구분선 — 라이트/다크 공통 */
  /* hover/pressed: 흰 알파 오버레이 (검정 배경 위에 겹쳐 밝아짐) */
  --action-inverse-hover: rgba(255, 255, 255, 0.08);
  --action-inverse-pressed: rgba(255, 255, 255, 0.2);

  /* 공통 (Action bar 도 참조) */
  --border-primary: var(--accent-500);           /* focus outline */
  --text-disabled-bold: #8f8f8f;       /* disabled 글씨 */
  --icon-disabled: #aaaaaa;            /* disabled 아이콘 */
  --font-sans: 'Pretendard', system-ui, sans-serif;
}
```

### `.dark` (다크)

```css
.dark {
  /* Inverse 다크 — 반전되어 흰 배경 + 검정 글씨 */
  --surface-inverse: #ffffff;
  --text-inverse: #1c1c1c;
  --icon-inverse: #1c1c1c;
  --border-inverse: #555555;           /* 라이트와 동일 */
  /* hover/pressed: 검정 알파 오버레이 (흰 배경 위에 겹쳐 어두워짐) */
  --action-inverse-hover: rgba(0, 0, 0, 0.08);
  --action-inverse-pressed: rgba(0, 0, 0, 0.2);

  /* 공통 다크 */
  --border-primary: var(--accent-400);           /* accent-400, 더 밝음 */
  --text-disabled-bold: #757575;
  --icon-disabled: #555555;
}
```

> Inverse 토큰을 별도로 두는 이유: Action bar 는 일반 surface 와 **반전**되므로,
> `--surface` / `--text` 를 그대로 쓰면 안 된다. `.dark` 에서 inverse 토큰만 재매핑하면
> 컴포넌트 코드 수정 없이 자동 전환된다.

---

