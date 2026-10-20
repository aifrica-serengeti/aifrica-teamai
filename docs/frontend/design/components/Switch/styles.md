# Switch — 스타일과 토큰

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Switch 문서 인덱스](./README.md)

## 5. 색상 스펙 — 라이트 모드

### Track 색상

| 상태           | Background                              | Border                                           |
| -------------- | --------------------------------------- | ------------------------------------------------ |
| On · Enabled   | `var(--accent-500)` (`--element-primary`)         | transparent                                      |
| On · Disabled  | `#eeeeee` (`--element-disabled`)        | transparent                                      |
| Off · Enabled  | `#8f8f8f` (`--element-disabled-strong`) | transparent                                      |
| Off · Disabled | `#eeeeee` (`--element-disabled`)        | `1px solid #aaaaaa` (`--border-disabled-subtle`) |
| On · Invalid   | `#e81919` (`--border-danger`)           | transparent                                      |

### Thumb 색상

| 상태           | Background                                |
| -------------- | ----------------------------------------- |
| On · Enabled   | `#ffffff` (`--element-on-primary`)        |
| On · Disabled  | `#ffffff` (`--element-on-disabled`)       |
| Off · Enabled  | `#ffffff` (`--element-on-primary`)        |
| Off · Disabled | `#8f8f8f` (`--element-on-disabled-radio`) |

> **핵심 규칙**: On/Off enabled thumb는 모두 `#ffffff`. On/Off disabled thumb는 **다르다** —
> On disabled는 `#ffffff`, Off disabled는 `#8f8f8f`.
> Off enabled thumb에 `--element-default`를 쓰면 **안 된다** — 다크 모드에서 반투명 검정이 되므로.
> 반드시 솔루션에 매핑된 `--element-on-primary`를 사용.

### Thumb 그림자 (모든 상태 공통)

Figma "Raised" 이펙트(dual-layer, navy 톤):

```css
box-shadow:
  0 0 1px 0 rgba(9, 30, 66, 0.31),
  0 1px 1px 0 rgba(9, 30, 66, 0.1);
```

- 1번째 레이어: thumb 테두리에 얇은 navy halo (`#091E424F`).
- 2번째 레이어: 아래로 1px 떨어지는 미세한 drop (`#091E421A`).

### Focus

Track 주변에 1px gap 떨어져서 1px primary border (pill radius 유지):

```css
outline: 1px solid var(--accent-500); /* --element-primary */
outline-offset: 1px;
```

---

## 6. 색상 스펙 — 다크 모드

`.dark` 클래스 적용 시. **semantic 토큰 단위로 전환** — 컴포넌트 코드 수정 없이 토큰만 재매핑.

### Track 색상

| 상태           | Background                                       | Border                                           |
| -------------- | ------------------------------------------------ | ------------------------------------------------ |
| On · Enabled   | `var(--accent-400)` (`--element-primary`, accent-400)        | transparent                                      |
| On · Disabled  | `#ffffff1a` (`--element-disabled`, 흰 10%)       | transparent                                      |
| Off · Enabled  | `#ffffff14` (`--element-disabled-strong`, 흰 8%) | transparent                                      |
| Off · Disabled | `#ffffff1a` (`--element-disabled`)               | `1px solid #333333` (`--border-disabled-subtle`) |
| On · Invalid   | `#e81919` (`--border-danger`)                    | transparent                                      |

### Thumb 색상

| 상태           | Background                                          |
| -------------- | --------------------------------------------------- |
| On · Enabled   | `#ffffff` (`--element-on-primary`)                  |
| On · Disabled  | `#555555` (`--element-on-disabled`, gray-700)       |
| Off · Enabled  | `#ffffff` (`--element-on-primary`)                  |
| Off · Disabled | `#555555` (`--element-on-disabled-radio`, gray-700) |

> **다크 모드 핵심 차이점**:
>
> - Off enabled track이 **반투명 흰색**(`#ffffff14`)으로 전환 — 라이트의 불투명 회색(`#8f8f8f`)과 완전히 다름.
> - Disabled thumb(On/Off)가 **동일한 `#555555`** — 라이트에서는 On `#ffffff` / Off `#8f8f8f`로 다르지만, 다크에서는 둘 다 `#555555`.
> - primary가 더 밝은 accent-400(`var(--accent-400)`)으로 전환.

---

## 8. 타이포그래피

폰트 패밀리: **Pretendard** (`var(--font-sans)`).

| 요소     | Size | Size(small) | Weight        | Line-height        |
| -------- | ---- | ----------- | ------------- | ------------------ |
| label    | 14px | 12px        | 400 (Regular) | 20px / 16px(small) |
| helpText | 12px | 10px        | 400 (Regular) | 16px / 12px(small) |

- label 색상: `#1c1c1c` (`--text`, 라이트) / `#dddddd` (`--text`, 다크).
- label disabled: `#8f8f8f` (`--text-disabled-bold`).
- helpText 색상: `#757575` (`--text-subtler`).

---

## 11. 디자인 토큰 정의 (CSS 변수)

### `:root` (라이트)

```css
:root {
  /* Element — Switch 관련 */
  --element-default: #ffffff; /* 미사용(thumb는 on-primary 사용). 참고용 */
  --element-primary: var(--accent-500); /* On enabled track (accent-500) */
  --element-on-primary: var(--solution-on-primary); /* On/Off enabled thumb */
  --element-disabled: #eeeeee; /* On/Off disabled track (gray-200) */
  --element-on-disabled: #ffffff; /* On disabled thumb (Switch 전용) */
  --element-disabled-strong: #8f8f8f; /* Off enabled track (gray-500) */
  --element-on-disabled-radio: #8f8f8f; /* Off disabled thumb (gray-500) */

  /* Border */
  --border-disabled-subtle: #aaaaaa; /* Off disabled border (gray-400) */
  --border-danger: #e81919; /* On invalid track (red-600) */

  /* Elevation — Switch thumb 전용 dual-layer */
  --elevation-switch-thumb:
    0 0 1px 0 rgba(9, 30, 66, 0.31), 0 1px 1px 0 rgba(9, 30, 66, 0.1);

  /* Text (라벨/도움말) */
  --text: #1c1c1c;
  --text-subtler: #757575;
  --text-disabled-bold: #8f8f8f;
}
```

### `.dark` (다크)

```css
.dark {
  /* Element — 다크 전환 */
  --element-primary: var(--accent-400); /* accent-400 */
  --element-on-primary: var(--solution-on-primary);
  --element-disabled: color-mix(
    in srgb,
    #ffffff 10%,
    transparent
  ); /* #ffffff1a */
  --element-on-disabled: #555555; /* gray-700 */
  --element-disabled-strong: color-mix(
    in srgb,
    #ffffff 8%,
    transparent
  ); /* #ffffff14 */
  --element-on-disabled-radio: #555555; /* gray-700 */

  /* Border */
  --border-disabled-subtle: #333333; /* gray-800 */
  --border-danger: #e81919; /* red-500 다크 */

  /* Text */
  --text: #dddddd;
  --text-subtler: #757575;
  --text-disabled-bold: #8f8f8f;

  /* Elevation — 라이트와 동일(navy dual-layer) */
  --elevation-switch-thumb:
    0 0 1px 0 rgba(9, 30, 66, 0.31), 0 1px 1px 0 rgba(9, 30, 66, 0.1);
}
```

> **다크 전환 핵심**: `--element-default`는 다크에서 반투명 검정(`rgba(0,0,0,0.2)`)이 되므로
> thumb에 절대 사용하지 말 것. thumb는 항상 솔루션에 매핑된 `--element-on-primary` 사용.

---

