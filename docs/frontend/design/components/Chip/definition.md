# Chip — 정의와 구조

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Chip 문서 인덱스](./README.md)

## 2. 의존 컴포넌트

Chip 은 leading icon 과 trailing close 버튼에 공용 컴포넌트를 재사용한다.
재현자는 아래 컴포넌트를 먼저 확보한 뒤 조합해야 한다.

| 의존 컴포넌트  | 용도                                  | 가이드라인      | 필수 여부                             |
| -------------- | ------------------------------------- | --------------- | ------------------------------------- |
| **Icon**       | Leading icon 렌더 (Figma System icon) | 별도 가이드라인 | optional — `leadingIcon` prop 사용 시 |
| **IconButton** | Trailing close 버튼 (X)               | 별도 가이드라인 | optional — `onRemove` prop 사용 시    |

### Icon (공용)

Chip 의 leading icon 은 공용 Icon 컴포넌트로 렌더한다. Icon 컴포넌트는 Figma
System icon 스펙(24px 그리드, 사이즈별 stroke-width 자동 적용, semantic 색상 토큰)을
강제한다.

- **Chip size → Icon size 매핑:** small → `s`(14px), medium → `m`(16px)
- **색상 상속:** Icon 에 `style={{ color: 'currentColor' }}` 를 전달하여 Chip 글자색을
  상속받는다. Icon 컴포넌트는 내부적으로 `color` prop(기본 `--icon`)을 인라인 스타일로
  설정하지만, 소비자가 넘긴 `style.color` 가 우선한다(Icon.tsx 의 style 병합 순서).

### IconButton (공용) — xxs size 추가

Chip 의 trailing close 버튼은 공용 IconButton 컴포넌트로 렌더한다.
Chip 내부 icon button 은 일반 icon button 보다 **한 단계 작아야** 하므로,
IconButton 에 새 size `xxs`(16px)를 추가한다.

**IconButton size 체계 (Chip 작업으로 xxs 추가):**

| Size    | 칸 크기  | icon 기본 크기 | 용도                                                   |
| ------- | -------- | -------------- | ------------------------------------------------------ |
| **xxs** | **16px** | s(14px)        | **Chip trailing 버튼 (Chip small)** — 본 가이드로 추가 |
| tiny    | 20px     | t(12px)        | Chip trailing 버튼 (Chip medium)                       |
| medium  | 24px     | m(16px)        | 일반                                                   |
| xlarge  | 32px     | xl(20px)       | 일반                                                   |

**Chip size → IconButton size 매핑:**

- Chip small → IconButton `xxs`(16px, icon 14px)
- Chip medium → IconButton `tiny`(20px, icon 16px)

**색상 상속 (iconColor="inherit"):**

IconButton 은 내부적으로 Icon 에 `color="default"`(=`var(--icon)`)를 강제 설정한다.
Chip 내부에서는 close 아이콘이 Chip 글자색을 따라가야 하므로, IconButton 에
`iconColor="inherit"` prop을 전달하여 색상 제어를 끈다.

```tsx
// IconButton 에 iconColor prop 추가 (Chip 작업으로 도입)
export interface IconButtonProps extends React.ComponentProps<"button"> {
  // ...
  /**
   * icon 색상 override.
   * - 생략 시 disabled 여부에 따라 자동 매핑(enabled=default, disabled=disabled).
   * - 'inherit' 지정 시 버튼(또는 부모)의 color 를 상속.
   *   Chip 처럼 부모 글자색을 icon 이 따라가야 하는 컴포넌트에서 사용.
   */
  iconColor?: "inherit";
}
```

IconButton 내부 구현:

```tsx
const iconStyle = iconColor === 'inherit' ? { color: 'inherit' } as const : undefined
// ...
<Icon
  name={icon}
  size={resolvedIconSize}
  color={disabled ? 'disabled' : 'default'}
  style={iconStyle}  // 'inherit' 일 때 Icon 의 color prop 보다 우선
/>
```

---

## 3. 구조 (Anatomy)

```
Chip (span 요소)
├── Leading icon       ── (optional) 공용 Icon 컴포넌트. 색상 = Chip 글자색 상속
├── Label              ── 주요 텍스트. Pretendard SemiBold 12px
└── Trailing button    ── (optional) 공용 IconButton(close). 색상 = Chip 글자색 상속
```

(Figma 가이드라인 node 9883:91438 의 Anatomy 섹션 기준)

1. **Container** — Chip 의 전체 형태를 구성하는 기본 프레임. 콘텐츠를 감싸는 배경 역할.
2. **Leading icon** (optional) — Chip 시작 부분에 위치. 의미를 직관적으로 전달하거나
   구분을 돕는 역할.
3. **Label** — 주요 텍스트 정보. 12px 통일.
4. **Trailing icon button** (optional) — Chip 끝에 위치. 닫기 버튼이나 복사 버튼과
   같은 보조 기능 제공.

### 색상 상속 체인

```
Chip 루트 span (color = chip 글자색 토큰)
  ├─ Leading Icon  ← style={{ color: 'currentColor' }} (Chip 글자색 상속)
  └─ IconButton    ← chipIconButton 클래스 color: inherit + iconColor="inherit"
       └─ Icon     ← style={{ color: 'inherit' }} (IconButton 버튼 색상 상속)
            └─ svg ← currentColor
```

---

## 4. 레이아웃 스펙

### Size 치수 (Figma 교차 검증)

| Size       | height   | max-width | padding-inline | radius (pill) | radius (rounded) |
| ---------- | -------- | --------- | -------------- | ------------- | ---------------- |
| **small**  | **20px** | **200px** | **8px**        | **10px**      | **4px**          |
| **medium** | **24px** | **240px** | **8px**        | **12px**      | **4px**          |

> **Figma 근거:** 라이트 node `9882:82820` 의 Small/Medium variant instance 교차 검증.
> Small = `h-[20px] max-w-[200px] px-[8px] rounded-[10px]`,
> Medium = `h-[24px] max-w-[240px] px-[8px] rounded-[12px]`,
> Rounded = `rounded-[4px]` (size 무관).

### Icon 치수

| 요소                 | small                       | medium                       | 비고                           |
| -------------------- | --------------------------- | ---------------------------- | ------------------------------ |
| Leading icon         | **14px** (Icon size `s`)    | **16px** (Icon size `m`)     | 공용 Icon 컴포넌트             |
| Trailing icon button | **16px** (IconButton `xxs`) | **20px** (IconButton `tiny`) | 공용 IconButton 컴포넌트       |
| Trailing icon (내부) | **14px**                    | **16px**                     | IconButton 기본 icon size 매핑 |

### Gap (icon / button 있을 때)

| 조합                          | gap     | 우측 padding | 비고                               |
| ----------------------------- | ------- | ------------ | ---------------------------------- |
| Leading icon only             | **4px** | 8px (기본)   | icon ↔ text 간격                   |
| Trailing button only (small)  | **3px** | **7px**      | text ↔ button 간격, 우측 패딩 감소 |
| Trailing button only (medium) | **2px** | **6px**      | text ↔ button 간격, 우측 패딩 감소 |
| Both (small)                  | **3px** | **7px**      | leading 그룹 ↔ trailing 간격       |
| Both (medium)                 | **2px** | **6px**      | leading 그룹 ↔ trailing 간격       |

### 공통 레이아웃

| 항목        | 값                                                        |
| ----------- | --------------------------------------------------------- |
| 요소        | `<span>` (인라인)                                         |
| 배치 방식   | `inline-flex`, 가로·세로 중앙 정렬                        |
| border 두께 | **1px** (outlined variant만 색상 적용, 그 외 transparent) |
| white-space | `nowrap` (Label 줄바꿈 방지)                              |
| box-sizing  | `border-box`                                              |

---

