# Number Input — 정의와 구조

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Number Input 문서 인덱스](./README.md)

## 2. 의존 컴포넌트

Number Input 의 증감(stepper) 버튼은 공용 **Icon Button** 을 사용한다.
재현자는 아래 컴포넌트를 먼저 확보한 뒤 조합해야 한다. 상세 절차는 루트 [foundation 문서](../../foundations.md) 의
"공용 컴포넌트 조합 규칙" 참조.

| 컴포넌트        | 가이드라인                                           | 구현 상태              | 용도                                                                                                                                                                                                                                                  |
| --------------- | ---------------------------------------------------- | ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Icon Button** | [`IconButton/README.md`](../IconButton/README.md) ✅ | 참조 계약 · 매핑 확인 필요 ✅ → **재사용** | Trailing 의 − / + 증감 버튼. **ghost variant**. size 매핑: `small → tiny(20px)`, `medium/large/xlarge → medium(24px)`. iconSize **명시 전달**: `small → s(14px)`, 나머지 `→ m(16px)` — IconButton tiny 기본값 `t`(12px)가 Figma 와 맞지 않아 override |

> Number Input 은 Icon Button 의 마크업/상태/hover 로직을 **직접 구현하지 않고** 공용 컴포넌트를 재사용한다.
> Icon Button 이 담당하는 부분: 버튼 터치 영역(20/24px), hover/pressed/focus/disabled 상태, icon 색상 전환.
>
> Number Input 이 담당하는 추가 부분: container 외형(border/surface/상태), label 행(optional/required/info),
> input 요소(type=number, 브라우저 spinner 제거), 증감 로직(step/min/max, ↑/↓ 키), help/error text.
>
> **Icon Button 이 구현되어 있지 않은 경우**: `IconButton/README.md` 스펙으로 먼저 공용 Icon Button 컴포넌트를
> 만든 뒤, 그것을 조합해 Number Input 의 증감 버튼을 구성한다. 증감 버튼은 `icon="minus"` / `icon="plus"`,
> `variant="ghost"` 로 렌더한다.

---

## 3. 구조 (Anatomy)

```
field (세로 flex, gap 4px)
├─ labelRow (가로 flex, gap 2px, align center)
│   ├─ Label                  — "Label" (14px SemiBold)
│   ├─ (선택사항)             — 12px Regular (optional 일 때)
│   ├─ *                      — 14px Regular (required 일 때)
│   └─ info icon              — 14px (infoIcon 일 때)
├─ container (가로 flex, align center, justify between)
│   ├─ input[type=number]     — 값 입력 (flex 1, 투명 배경)
│   ├─ suffix                 — 선택적 단위 텍스트, aria-describedby 연결
│   └─ trailing (가로 flex)
│       ├─ Icon Button (−)    — 공용 IconButton, ghost, tiny/medium
│       └─ Icon Button (+)    — 공용 IconButton, ghost, tiny/medium
└─ helpText                   — 12px Regular (invalid 시 error 색)
```

### 제어 값 계약

- 일반 숫자 제어는 `value?: number`와 `onValueChange?: (value: number) => void`를 사용한다.
- 빈 문자열을 포함한 페이지 draft는 `textValue: string`과 `onTextValueChange`를 함께 사용한다. 이 경우에도
  숫자로 해석 가능한 직접 입력과 증감 동작은 `onValueChange`로 알린다.
- `textValue`를 제공한 수명에서는 `undefined`로 바꾸지 않는다. controlled/uncontrolled 전환을 피한다.
- 사용자 입력의 `e`/`E` 지수 표기 차단은 공용 컴포넌트의 입력 경계가 소유한다. 새로운 public prop이나
  페이지별 draft를 추가하지 않으며 외부 제어값의 정규화·최종 범위 검증은 기존 소유자를 유지한다.
- 거부한 삽입은 전체 취소한다. `1e3`을 `13`으로 문자 제거하거나 `1000`으로 자동 변환하지 않는다.
- `suffix?: string`은 숫자 값 및 callback과 분리된 정적 단위다. 생략하면 기존 외형이 유지된다.
  input과 증감 버튼 사이에서 줄바꿈 없이 표시하며 인터랙션을 넣지 않는다.
- 도움말용 Icon과 Tooltip도 공용 구현을 재사용한다. 대상 솔루션에서 확인할 공개 export는
  `대상 솔루션의 public UI mapping`의 `NumberInput`이다.

---

## 4. 레이아웃 스펙

### Size 별 Container 높이

| Size          | Container 높이 | Icon Button 영역   | Icon 사이즈    |
| ------------- | -------------- | ------------------ | -------------- |
| Small         | 28px           | 20×20px (`tiny`)   | **14px** (`s`) |
| Medium (기본) | 32px           | 24×24px (`medium`) | **16px** (`m`) |
| Large         | 36px           | 24×24px (`medium`) | **16px** (`m`) |
| X-Large       | 40px           | 24×24px (`medium`) | **16px** (`m`) |

> **주의**: Small 일 때 IconButton 의 기본 icon 사이즈는 `t`(12px)이지만, Figma NumberInput 스펙은 **14px**(`s`)다.
> 따라서 NumberInput 은 IconButton 에 `iconSize` prop 을 **명시적으로 전달**해야 한다(small→`s`, 나머지→`m`).
> IconButton 영역 자체는 tiny(20px)/medium(24px) 기본값이 Figma 와 일치하므로 `size` prop 으로 처리.

### Container 패딩/형태

| 속성          | 값                                                      | 비고                      |
| ------------- | ------------------------------------------------------- | ------------------------- |
| 좌측 패딩     | 12px                                                    | 값 텍스트 시작점          |
| 우측 패딩     | 4px (small 6px)                                         | trailing 버튼과의 간격    |
| Border radius | 4px                                                     |                           |
| 내부 정렬     | `align-items: center`, `justify-content: space-between` | input 좌측, trailing 우측 |

### field / labelRow / 간격

| 요소                      | gap                 | 비고                                 |
| ------------------------- | ------------------- | ------------------------------------ |
| field (세로)              | 4px                 | labelRow ↔ container ↔ helpText      |
| labelRow (가로)           | 2px                 | label ↔ (선택사항) ↔ \* ↔ info icon  |
| **trailing 증감 버튼 간** | **0 (모든 사이즈)** | −/+ 버튼끼리 서로 **붙어 있어야 함** |

> **증감 버튼 간격 (핵심)**: − 와 + 버튼은 모든 사이즈에서 서로 **붙어 있어야** 한다(gap 없음).
> trailing 컨테이너는 `gap` 없이 두 IconButton 을 나란히 배치한다.

### 정렬 불변의 원칙

- Icon Button 의 크기(20/24px)는 size 에 따라 고정. **상태(hover/pressed)에 따라 크기가 변하지 않는다.**
- Container 높이도 size 고정값. focus/invalid 시 border-width 가 변하지 않도록 **1px border + 1px inset box-shadow** 기법 사용(밀림 방지).

---
