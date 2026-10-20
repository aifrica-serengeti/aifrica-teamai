# Elevation

> **미채택 JDC 관찰 자료**: 아래 색·치수·도메인·경로는 원본 관찰 시점의 근거입니다. 솔루션 공통 기본값으로 적용하지 않습니다.

> 원본 Figma: Aifrica Design System / `RP8QTyB9n2ZpgfCgmuXgsz` · node `6715:821`

엘레베이션(Elevation)은 UI 디자인에서 그림자와 빛을 사용해 객체와 배경 표면 간의 시각적 거리감을
나타내는 개념이다. 이를 통해 사용자에게 시각적인 힌트를 제공하고, 요소들의 계층 구조를 명확히 하며,
콘텐츠의 중요도를 효과적으로 전달할 수 있다.

## 원칙

- **토큰으로만 사용** — 색상과 동일하게 `box-shadow` 도 토큰 변수로만 지정한다.
  컴포넌트에서 임의의 shadow 픽셀값을 직접 하드코딩하지 않는다.
- **제한된 레벨** — Aifrica Design System은 신중한 설계를 위해 5단계(+특수 1)로 elevation을 제한한다.
  필요할 때만 한 단계씩 올리며, 과도한 elevation 중첩을 피한다.

## 레벨 체계 (5단계 + 특수)

| 레벨               | 토큰                   | box-shadow                    | 용도                                                 |
| ------------------ | ---------------------- | ----------------------------- | ---------------------------------------------------- |
| **Sunken**         | `--elevation-sunken`   | `inset 0 1px 3px 0 alpha(4%)` | 가장 낮음. Backdrop/Well 역할. Default 위에서만 사용 |
| **Default**        | `--elevation-default`  | `none`                        | 기준 평면. 평평한 UI 표면                            |
| **Raised**         | `--elevation-raised`   | `0 1px 2px 0 alpha(4%)`       | 카드·시트 등 미세 부상                               |
| **Mid**            | `--elevation-mid`      | `0 2px 6px 0 alpha(4%)`       | 드롭다운·팝오버 기본                                 |
| **Overlay**        | `--elevation-overlay`  | `0 8px 24px 0 alpha(8%)`      | 모달·다이얼로그                                      |
| **Overflow**(특수) | `--elevation-overflow` | `0 12px 32px 0 alpha(12%)`    | sticky/floating 등 최대 강도                         |

> 그림자용 검정 알파: `--shadow-alpha-1`(4%), `--shadow-alpha-2`(8%), `--shadow-alpha-3`(12%).
> Figma 의 `alpha/50`, `alpha/80` 변수에서 유래.

## 사용 가이드

- **Sunken** 은 Default elevation 위에서만. Raised/Overlay 위에는 적용 금지.
- UI 영역 구분이 목적이면 Sunken 대신 White Background 나 Divider 를 우선.
- 기본 상태는 0 ~ Mid, 상호작용(hover/open) 상태에서 Overlay/Overflow 로 올림.

## 참조 방법

| 환경                  | 사용법                                                                                        |
| --------------------- | --------------------------------------------------------------------------------------------- |
| **일반 CSS**          | `box-shadow: var(--elevation-mid)`                                                            |
| **vanilla-extract**   | `vars.elevation.raised` (`import { vars } from '...'`)                                        |
| **Tailwind 유틸리티** | `shadow-sunken`, `shadow-raised`, `shadow-mid`, `shadow-overlay`, `shadow-overflow`           |
| **shadcn 기본**       | `shadow-sm` → raised, `shadow` → mid, `shadow-lg` → overlay, `shadow-xl` → overflow 로 재매핑 |

## CSS 변수 정의 — 복사 가능한 코드

```css
:root {
  /* 그림자용 검정 알파 */
  --shadow-alpha-1: rgba(0, 0, 0, 0.04);
  --shadow-alpha-2: rgba(0, 0, 0, 0.08);
  --shadow-alpha-3: rgba(0, 0, 0, 0.12);

  /* Elevation 6단계 */
  --elevation-sunken: inset 0 1px 3px 0 var(--shadow-alpha-1);
  --elevation-default: none;
  --elevation-raised: 0 1px 2px 0 var(--shadow-alpha-1);
  --elevation-mid: 0 2px 6px 0 var(--shadow-alpha-1);
  --elevation-overlay: 0 8px 24px 0 var(--shadow-alpha-2);
  --elevation-overflow: 0 12px 32px 0 var(--shadow-alpha-3);

  /* Tailwind shadow 유틸리티 매핑 */
  --shadow-sunken: var(--elevation-sunken);
  --shadow-raised: var(--elevation-raised);
  --shadow-mid: var(--elevation-mid);
  --shadow-overlay: var(--elevation-overlay);
  --shadow-overflow: var(--elevation-overflow);
  --shadow-sm: var(--elevation-raised);
  --shadow: var(--elevation-mid);
  --shadow-lg: var(--elevation-overlay);
  --shadow-xl: var(--elevation-overflow);
}
```

> Elevation 은 라이트/다크 공통(알파 기반이므로 배경에 자동 적응). 별도 `.dark` 정의 불필요.

## 컴포넌트별 전용 그림자

일부 Figma 컴포넌트는 elevation 체계의 검정 알pha 대신 **navy `#091E42` 톤 2단 드롭섀도우**를
사용합니다. 이는 Figma 의 "Mid" effect 정의가 컴포넌트마다 다르기 때문이며, elevation
토큰(`--elevation-mid`)과는 별개의 컴포넌트 전용 토큰으로 정의합니다. Tab overflow 버튼처럼
방향성이 의미를 갖는 그림자도 시작·끝 전용 토큰으로 분리합니다.

| 토큰                          | 효과 값                                                        | 사용 컴포넌트      |
| ----------------------------- | -------------------------------------------------------------- | ------------------ |
| `--menu-shadow`               | `0 4px 6px 0 rgba(9,30,66,0.15), 0 0 1px 0 rgba(9,30,66,0.31)` | Menu               |
| `--cal-shadow`                | `0 4px 6px 0 rgba(9,30,66,0.15), 0 0 1px 0 rgba(9,30,66,0.31)` | Calendar           |
| `--elevation-switch-thumb`    | `0 1px 1px 0 rgba(9,30,66,0.1), 0 0 1px 0 rgba(9,30,66,0.31)`  | Switch thumb       |
| `--tab-overflow-shadow-start` | `linear-gradient(to right, rgba(0,0,0,.05), transparent)`      | Tab 시작 이동 버튼 |
| `--tab-overflow-shadow-end`   | `linear-gradient(to right, transparent, rgba(0,0,0,.05))`      | Tab 끝 이동 버튼   |

> 모든 전용 그림자는 알파 기반이므로 라이트/다크에서 같은 토큰을 사용한다. Tab overflow 토큰은
> 상하 번짐을 차단하기 위해 `box-shadow` 대신 가장자리 의사 요소의 수평 그라데이션으로 사용하고,
> 의사 요소 상·하단은 세로 마스크로 투명하게 페이드한다.
> vanilla-extract에서는 등록된 theme contract 또는 표의 CSS custom property를 참조한다.

---
