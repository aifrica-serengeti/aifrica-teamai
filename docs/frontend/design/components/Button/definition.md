# Button — 정의와 구조

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Button 문서 인덱스](./README.md)

## 1. 의존 컴포넌트

| 컴포넌트 | 사용 조건 | 역할 |
| --- | --- | --- |
| [Icon](../Icon/README.md) | `leadingIcon` 또는 `trailingIcon` 사용 시 | System icon의 이름, 크기, stroke, 색상 상속 |

아이콘이 없는 Button도 허용되지만, icon variant를 위해 raw SVG나 `lucide-react`를 Button 안에서
직접 사용하지 않는다.

## 2. 구조 (Anatomy)

```
Button (button 요소)
├── (optional) Leading Icon ── Icon 컴포넌트로 위임
├── Label text              ── Pretendard SemiBold
└── (optional) Trailing Icon
```

- Container: 둥근 사각형(`border-radius: 4px`), `inline-flex` 가로/세로 중앙 정렬.
- 아이콘과 라벨은 size 별 gap 으로 수평 배치.
- Leading/Trailing icon 은 모두 optional. 라벨만 / 아이콘만 / 모두 조합 가능.

### Icon 처리 (중요)

Button 내부 아이콘은 별도 **Icon 컴포넌트**(Figma System icon 스펙)로 위임한다.
Button 이 아이콘 svg 를 직접 렌더하지 않는다.

- `leadingIcon`/`trailingIcon` prop 으로 **Figma System icon 이름**(snake_case 문자열)을 전달.
- Icon size 는 button size 에 따라 **자동 매핑** (아래 표 참조). 개별 override 도 가능.
- Icon 컴포넌트가 Figma 스펙의 stroke-width(1.25~1.5px), round endcap/join 을 적용한다.
- lucide-react 를 Button 에서 직접 import 하지 않는다 — stroke 굵기가 스펙과 어긋난다.

**Icon 색상 = 버튼 텍스트 색상 상속 (핵심):**

Icon 컴포넌트는 기본적으로 자체 색상 토큰(`var(--icon)` 등)을 적용한다. 하지만 Button 안에서는
아이콘이 **버튼의 텍스트 색상(`color` 속성)을 상속**해야 variant 마다 일관된 색을 갖는다.
Button 이 `style={{ color: 'inherit' }}` 를 Icon 에 전달한다.

> **안전한 상속 패턴 (중요):** Icon 컴포넌트는 내부에서 `style={{ color: resolveIconColor(color), ...style }}`
> 처럼 소비자가 넘긴 `style` 을 뒤에 병합한다. 따라서 Button 이 넘긴 `color: 'inherit'` 가
> **항상** Icon 내부 색상을 덮어쓴다(참고: Text Button 도 동일한 패턴).

| Variant   | 버튼 텍스트 색상         | 아이콘 색상 (상속) |
| --------- | ------------------------ | ------------------ |
| Primary   | `#ffffff` (on-primary)   | `#ffffff`          |
| Secondary | `var(--accent-500)` (on-secondary) | `var(--accent-500)`          |
| Tertiary  | `#1c1c1c` (on-tertiary)  | `#1c1c1c`          |
| Negative  | `#ffffff` (on-negative)  | `#ffffff`          |
| Disabled  | on-\*-disabled 토큰      | 동일하게 상속      |

> Button 의 hover/pressed/disabled state 에서 텍스트 색상이 변하면 아이콘도 자동으로 같이 변한다.

**Button size → Icon size 자동 매핑:**

| Button size | icon 픽셀 (Figma) | Icon 토큰 |
| ----------- | ----------------- | --------- |
| tiny        | 14px              | `s`       |
| small       | 16px              | `m`       |
| medium      | 18px              | `l`       |
| large       | 20px              | `xl`      |

> Icon 컴포넌트의 size 토큰 체계: t(12) / s(14) / m(16) / l(18) / xl(20) / 2xl(24) / 3xl(32) / 4xl(36).

---

## 3. 레이아웃 스펙

### Size 치수 (Figma 교차 검증)

| Size       | height | padding-x | gap | font / line          | icon size (자동 매핑) |
| ---------- | ------ | --------- | --- | -------------------- | --------------------- |
| **Tiny**   | 24px   | 8px       | 2px | 12px / 16px (Title3) | 14px (Icon `s`)       |
| **Small**  | 28px   | 8px       | 4px | 14px / 20px (Title2) | 16px (Icon `m`)       |
| **Medium** | 32px   | 16px      | 4px | 14px / 20px (Title2) | 18px (Icon `l`)       |
| **Large**  | 40px   | 16px      | 4px | 16px / 24px (Title1) | 20px (Icon `xl`)      |

### 공통 레이아웃

| 항목          | 값                                                               |
| ------------- | ---------------------------------------------------------------- |
| border-radius | **4px** (Figma `rounded-[4px]`)                                  |
| border 두께   | 1px (Secondary/Tertiary 외곽선; Primary/Negative 는 transparent) |
| font-weight   | 600 (SemiBold)                                                   |
| white-space   | `nowrap` (라벨 줄바꿈 방지)                                      |
| 기본 배치     | `inline-flex`, 가로/세로 중앙 정렬                               |

### Full-width

`width: 100%` 로 부모 폭을 채운다. 바깥 여백(margin)은 제외한 모든 너비를 차지.
사이즈(height/padding/font)는 auto-width 와 동일.

---

## asChild host 계약

`asChild`는 단일 React element의 host에 Button 표현을 연결한다. Icon과 label은 Slottable로 함께 조립한다. Native button·anchor의 disabled 의미가 다르므로 [구현 계약](./implementation/typescript.md)의 guard·aria·focus·href 정책을 함께 적용한다. Custom child는 host props·ref를 전달해야 한다.
