# Text Button — 정의와 구조

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Text Button 문서 인덱스](./README.md)

## 2. 의존 컴포넌트

Text Button 이 단독으로 동작하지 않고 의존하는 컴포넌트. 재현 시 아래 컴포넌트가
선행되어야 한다.

| 의존성                | 역할                                                                                                                                      | 재현에 필요한 부분                                                                         |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| **[Icon](../Icon/README.md)** | 버튼 내부 Leading/Trailing 아이콘 렌더. Figma System icon 스펙(size 토큰 t~4xl, 사이즈별 stroke-width 1.25~2px, round endcap/join)을 강제 | `Icon` 컴포넌트 + `iconMap`(System icon 이름 → lucide 매핑) + `iconTokens`(size/색상 토큰) |

> Icon 컴포넌트 없이 Text Button 을 재현하려면, 아이콘 자리에 Icon 스펙을 만족하는 svg 컴포넌트를
> 직접 구현해야 한다(사이즈별 stroke-width 미적용 시 Figma 와 시각적 차이 발생).

---

## 3. 구조 (Anatomy)

```
TextButton (button 요소)
├── (optional) Leading Icon ── Icon 컴포넌트로 위임
├── Label text              ── Pretendard SemiBold
└── (optional) Trailing Icon
```

- Container: 둥근 사각형(`border-radius: 4px`), `inline-flex` 가로/세로 중앙 정렬. **테두리 없음**.
- Enabled 배경은 **투명**. Hovered/Pressed 에서만 회색 오버레이 배경이 나타난다.
- 아이콘과 라벨은 size 별 gap 으로 수평 배치.
- Leading/Trailing icon 은 모두 optional. 라벨만 / 아이콘만 / 모두 조합 가능.

### Icon 처리 (중요)

Text Button 내부 아이콘은 별도 **Icon 컴포넌트**(Figma System icon 스펙)로 위임한다.
Text Button 이 아이콘 svg 를 직접 렌더하지 않는다.

- `leadingIcon`/`trailingIcon` prop 으로 **Figma System icon 이름**(snake_case 문자열)을 전달.
- Icon size 는 button size 에 따라 **자동 매핑** (아래 표 참조). 개별 override 도 가능.
- Icon 컴포넌트가 Figma 스펙의 stroke-width(1.25px), round endcap/join 을 적용한다.
- lucide-react 를 Text Button 에서 직접 import 하지 않는다 — stroke 굵기가 스펙과 어긋난다.

**Icon 색상 = 버튼 텍스트 색상 상속 (핵심):**

Icon 컴포넌트는 기본적으로 자체 색상 토큰(`var(--icon)` 등)을 적용한다. 하지만 Text Button 안에서는
아이콘이 **버튼의 텍스트 색상(`color` 속성)을 상속**해야 한다.
Text Button 이 `style={{ color: 'inherit' }}` 를 Icon 에 전달한다.

> **안전한 상속 패턴 (중요):** Icon 컴포넌트는 내부에서 `style={{ color: resolveIconColor(color), ...style }}`
> 처럼 소비자가 넘긴 `style` 을 뒤에 병합한다. 따라서 Text Button 이 넘긴 `color: 'inherit'` 가
> **항상** Icon 내부 색상을 덮어쓴다(참고: Button 도 동일한 패턴).

| 상태                            | 버튼 텍스트 색상 (라이트)  | 아이콘 색상 (상속) |
| ------------------------------- | -------------------------- | ------------------ |
| Enabled/Hovered/Pressed/Focused | `#1c1c1c` (label)          | `#1c1c1c`          |
| Disabled                        | `#aaaaaa` (label-disabled) | `#aaaaaa`          |

> Text Button 의 hover/pressed/disabled state 에서 텍스트 색상이 변하면 아이콘도 자동으로 같이 변한다.
> (hover/pressed 는 배경만 변하고 텍스트 색상은 label 고정이지만, disabled 에서 텍스트/아이콘이 함께 회색으로 전환.)

**Text Button size → Icon size 자동 매핑:**

| Text Button size | icon 픽셀 (Figma) | Icon 토큰 |
| ---------------- | ----------------- | --------- |
| tiny             | 14px              | `s`       |
| small            | 16px              | `m`       |
| medium           | 18px              | `l`       |
| large            | 20px              | `xl`      |

> Icon 컴포넌트의 size 토큰 체계: t(12) / s(14) / m(16) / l(18) / xl(20) / 2xl(24) / 3xl(32) / 4xl(36).

---

## 4. 레이아웃 스펙

### Size 치수 (Figma 교차 검증)

| Size       | height | padding   | gap | font / line          | icon size (자동 매핑) |
| ---------- | ------ | --------- | --- | -------------------- | --------------------- |
| **Tiny**   | 24px   | `4px`     | 2px | 12px / 16px (Title3) | 14px (Icon `s`)       |
| **Small**  | 28px   | `4px`     | 4px | 14px / 20px (Title2) | 16px (Icon `m`)       |
| **Medium** | 32px   | `4px 8px` | 4px | 14px / 20px (Title2) | 18px (Icon `l`)       |
| **Large**  | 40px   | `4px 8px` | 4px | 16px / 24px (Title1) | 20px (Icon `xl`)      |

> Tiny/Small 은 `padding: 4px`(상하좌우 동일), Medium/Large 는 `padding: 4px 8px`(좌우만 8px).
> Figma `p-[4px]`(Tiny/Small) / `px-[8px] py-[4px]`(Medium/Large) 값 그대로.

### 공통 레이아웃

| 항목                 | 값                                                                     |
| -------------------- | ---------------------------------------------------------------------- |
| border-radius        | **4px** (Figma `rounded-[4px]`)                                        |
| border               | **없음** (transparent 와 달리 아예 미설정 — Tertiary Button 과의 차이) |
| background (enabled) | **transparent** (투명)                                                 |
| font-weight          | 600 (SemiBold)                                                         |
| white-space          | `nowrap` (라벨 줄바꿈 방지)                                            |
| 기본 배치            | `inline-flex`, 가로/세로 중앙 정렬                                     |

---

