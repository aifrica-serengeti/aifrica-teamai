# Icon Button — 정의와 구조

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Icon Button 문서 인덱스](./README.md)

## 2. 의존 컴포넌트

Icon Button 은 단독으로 존재하지 않고 공용 하위 컴포넌트와 조합된다. 재현자는 아래
컴포넌트를 먼저 확보한 뒤 조합해야 한다. 상세 절차는 루트 [foundation 문서](../../foundations.md) 의
"공용 컴포넌트 조합 규칙" 참조.

| 컴포넌트    | 가이드라인                                     | 구현 상태              | 용도                                                             |
| ----------- | ---------------------------------------------- | ---------------------- | ---------------------------------------------------------------- |
| **Icon**    | [`Icon/README.md`](../Icon/README.md) ✅       | 참조 계약 · 매핑 확인 필요 ✅ → **재사용** | 버튼 내부 아이콘 렌더. 사이즈/스트로크/semantic 색상 토큰 제공   |
| **Tooltip** | [`Tooltip/README.md`](../Tooltip/README.md) ✅ | 참조 계약 · 매핑 확인 필요 ✅ → **재사용** | hover/focus 시 보조 설명. Icon Button 이 직접 구현하지 않고 조합 |

> 두 컴포넌트 모두 가이드라인과 구현이 갖춰져 있으므로, Icon Button 은 이들을 **재사용**해
> 조합한다. Icon Button 내부에 아이콘 SVG 렌더링이나 Tooltip 마크업/상태/portalling 로직을
> **직접 구현하지 않는다.**
>
> **가이드라인은 있으나 구현이 없는 경우**: 해당 컴포넌트의 가이드라인을 보고 먼저 구현한 뒤
> Icon Button 을 조합한다. 예컨대 Tooltip 이 솔루션에 대응 구현이 없다면 `Tooltip/README.md` 스펙으로
> 공용 Tooltip 컴포넌트를 먼저 만든다.

Tooltip 조합의 상세 규칙(직접 구현 금지, 연동 절차, 조합 패턴, 접근성)은
아래 [§11 Tooltip 연동 규칙](#11-tooltip-연동-규칙-핵심) 참조.

## 3. 구조 (Anatomy)

```
Icon Button (button 요소)
└── Icon ── 공용 Icon 컴포넌트로 렌더 (lucide-react 기반)
     ├── size:   버튼 size 에 따른 기본값(t/m/xl) 또는 iconSize prop 으로 override
     └── color:  disabled 여부에 따라 --icon / --icon-disabled 자동 전환
```

1. **Icon** — 의미를 전달하는 시각 요소. 공용 `Icon` 컴포넌트로 렌더.
2. **Touch area** — 충분한 조작 영역을 보장하는 버튼 박스(20/24/32px).

> icon-only 버튼이므로 **`aria-label` 이 필수**다(접근성 섹션 참조).

---

## 4. 레이아웃 스펙

### Size 치수 (Figma 교차 검증)

| Size       | width | height | icon 기본 size |
| ---------- | ----- | ------ | -------------- |
| **Tiny**   | 20px  | 20px   | t (12px)       |
| **Medium** | 24px  | 24px   | m (16px)       |
| **XLarge** | 32px  | 32px   | xl (20px)      |

### 공통 레이아웃

| 항목          | 값                                        |
| ------------- | ----------------------------------------- |
| border-radius | **4px** (Figma `rounded-[4px]`)           |
| border 두께   | 1px (Outlined 한정. Ghost 는 transparent) |
| padding       | 0 (아이콘만 중앙 정렬, 별도 패딩 없음)    |
| 배치          | `inline-flex`, 가로/세로 중앙 정렬        |
| icon 정렬     | 버튼 중앙(flex center)                    |

### Icon size 유연성

터치 영역(버튼 size)은 고정하되 icon size 만 바꿀 수 있다. 예를 들어 XLarge(32px)
버튼 안에 xl(20px) 대신 2xl(24px) 이나 3xl(32px) 아이콘을 넣을 수 있다.
`iconSize` prop 으로 override 하고, 생략 시 size 에 따른 기본값이 자동 매핑된다.

> Icon 컴포넌트의 사이즈 토큰(t=12, s=14, m=16, l=18, xl=20, 2xl=24, 3xl=32, 4xl=36)을
> 그대로 사용한다. 상세는 Icon 가이드라인 참조.

---

## 11. Tooltip 연동 규칙 (핵심)

> **Icon Button 은 Tooltip 을 직접 구현하거나 내장하지 않는다.** Tooltip 은 별도의
> **공용 Tooltip 컴포넌트**로 관리하며, Icon Button 은 그 컴포넌트를 **조합(compose)** 해서
> 사용한다. 이유는 다음과 같다.

### 왜 Tooltip 을 Icon Button 이 직접 관리하지 않는가

1. **단일 진실 원천(SSOT)** — Tooltip 의 색상(inverse surface), 위치(4방향×3정렬), 화살표,
   애니메이션 스펙이 모든 컴포넌트에서 동일해야 한다. Icon Button, 일반 Button, Form 요소 등
   어디서 쓰이든 같은 Tooltip 이 나와야 한다.
2. **중복 구현 방지** — 각 컴포넌트가 Tooltip 을 따로 만들면 스펙이 어긋나고 유지보수가
   불가능해진다.
3. **선택적 조합** — Tooltip 이 필요 없는 Icon Button 도 많다(예: 툴바에서 인접 아이콘과 함께
   쓰일 때). Tooltip 을 내장하면 불필요한 의존성이 생긴다.

### 연동 절차

1. **공용 Tooltip 컴포넌트가 있으면** 그대로 사용한다.
2. **공용 Tooltip 컴포넌트가 없으면**, Tooltip 가이드라인(`Tooltip/README.md`)을 참조해
   **공용 Tooltip 컴포넌트를 먼저 만든 뒤** Icon Button 에서 조합한다.
   Icon Button 내부에 Tooltip 마크업/상태/portalling 로직을 직접 넣지 않는다.

### 조합 패턴

Tooltip 컴포넌트의 `children`(trigger) 자리에 Icon Button 을 전달한다.
TooltipTrigger 가 `asChild` 로 합성되므로 Icon Button 의 클래스·속성·이벤트가 그대로 보존된다.

```tsx
// Radix Tooltip 기반 공용 Tooltip 컴포넌트 사용 예
<TooltipProvider delayDuration={300}>
  <Tooltip type="icon" side="top" content="추가">
    <IconButton
      icon="plus"
      size="xlarge"
      variant="outlined"
      aria-label="추가"
    />
  </Tooltip>
</TooltipProvider>
```

### 주의사항

- **`aria-label` 은 Tooltip 유무와 무관하게 항상 제공한다.** Tooltip 의 `content` 는
  마우스 사용자용 보조 정보이고 스크린 리더는 `aria-label` 을 읽는다. 일반 영역에서는 둘을 같은
  텍스트로 맞추고 모두 유지한다. Page Header의 공용 동작은 Tooltip을 `새로고침`·`수정`·`삭제`처럼
  짧게 표시하되, `aria-label`에는 `클라우드 상세 새로고침`처럼 대상을 포함할 수 있다.
- Tooltip 이 보조 설명을 제공하는 `type="standard"` 인 경우에도 `aria-label` 은 별도로
  유지한다(둘의 역할이 다름).
- 여러 Icon Button 을 같은 영역에 둘 때는 하나의 `TooltipProvider` 로 감싸서
  `delayDuration` 등을 일관되게 관리한다.
- 하나의 Icon Button trigger를 Tooltip root 두 개로 감싸지 않는다. page와 Button wrapper 중 한 곳만
  owner가 되며 pending 중에도 Tooltip content와 `aria-label`의 동작명을 바꾸지 않는다.
- Page Header의 medium action은 `iconSize="l"`을 사용한다. Icon의 18px/1.25px rounded stroke를
  그대로 사용하고 상위 CSS에서 `svg`/`path` stroke width를 덮어쓰지 않는다.

---
