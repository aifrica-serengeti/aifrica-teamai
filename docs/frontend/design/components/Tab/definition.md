# Tab — 정의와 구조

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Tab 문서 인덱스](./README.md)

## 2. 의존 컴포넌트

이 컴포넌트를 구현/재현하기 위해 필요한 공용 하위 컴포넌트 목록.

| 컴포넌트 | 가이드라인 | 구현 여부 | 역할                                                                                                             |
| -------- | ---------- | --------- | ---------------------------------------------------------------------------------------------------------------- |
| **Chip** | ✅ 있음    | ✅ 참조 계약 · 매핑 확인 필요 | 항목 수(count) 표시. `color="default"`, `variant="subtle"`, `size="small"`. selected 시 Tab 전용 accent로 자동 전환 |
| **Icon** | —          | ✅ 참조 계약 · 매핑 확인 필요 | (optional) 선행 아이콘. `size="m"`(16px), 색상은 트리거 텍스트 색 상속                                           |

> 재현자는 Chip, Icon 을 먼저 확보한 뒤 조합해야 한다.
> 둘 다 Aifrica Design System 토큰 체계를 따르므로 다크 모드는 자동 전환된다.

---

## 3. 구조 (Anatomy)

### 공개 API

아래 표는 제공된 [일반·controlled 구현 예제](./implementation/typescript.md)의 API다.
동적 제거의 `onRemove`·`removeLabel`은 아래 anatomy와 [제거 행동 계약](./behavior.md#동적-탭-제거-remove-action)에
남긴 의도된 확장이다. 제공된 예제의 `TabItem` 타입과 markup에는 없으며, closable Tab을 채택하려면
소비 제품에서 별도 adapter를 구현·검증해야 한다. 제공 범위는 [구현 인덱스](./implementation/README.md)를 따른다.

| Prop | 타입 | 기본값 / 연결 |
| --- | --- | --- |
| `tabs` | `TabItem[]` | value·label·선택적 icon/count/disabled/content |
| `value` / `defaultValue` | `string` | controlled / uncontrolled 선택값 |
| `onValueChange` | `(value: string) => void` | 선택 결과를 page owner에 전달 |
| `disabled` | `boolean` | false; 개별 disabled와 OR로 적용 |
| `showContent` | `boolean` | true; false면 trigger만 렌더하며 page가 패널을 소유 |
| `aria-label` | `string` | `TabsList`의 접근성 이름 |
| `fullWidth` | `boolean` | false; trigger의 균등 폭 여부 |
| `className` | `string` | Root의 추가 class |

PageHeader는 `tabValue`, `defaultTabValue`, `onTabValueChange`, `tabsDisabled`, `tabsAriaLabel`을
각각 `value`, `defaultValue`, `onValueChange`, `disabled`, `aria-label`에 연결하고 `showContent=false`로
조립한다. 별도 `compact` prop은 이 참조 API에 없다.

`showContent=false`는 예제 내부 panel 렌더링만 끈다. trigger의 `aria-controls`와 page가 별도로
렌더하는 `tabpanel`의 id, panel의 `aria-labelledby`를 자동으로 연결하는 adapter는 제공하지 않는다.
이 조합은 소비 제품의 실제 Radix 버전·DOM에서 연결과 focus/keyboard를 검증한 뒤 채택한다.

```
Tabs (Root)
├── TabsList ── 트리거 컨테이너. 하단 1px 회색선(#dddddd)이 전체 폭에 깔림.
│   └── TabsTrigger (Tab-item) ── 개별 탭. 높이 44px.
│       ├── (optional) Icon ── 선행 아이콘(m=16px). 텍스트 색 상속.
│       ├── Label ── 탭 텍스트(14px, Regular/SemiBold 상태별 전환)
│       ├── (optional) Chip ── 항목 수 카운터. 20px 높이, subtle variant.
│       └── (optional) Remove button ── 동적 탭 제거(18px, close icon, type="button")
└── TabsContent ── 패널 본문. 활성 탭의 콘텐츠 표시.
```

---

## 4. 레이아웃 스펙

모든 수치는 px 단위.

### Tab-item (TabsTrigger)

| 항목          | 값        | 비고                                           |
| ------------- | --------- | ---------------------------------------------- |
| 최소 폭       | 120px     | 단일 아이템 기준. 텍스트가 길면 자동 확장      |
| 높이          | 44px      | 상태 불문 고정                                 |
| 좌우 패딩     | 16px      | `padding: 0 16px`                              |
| 아이템 간 gap | 0         | 인접 트리거가 바로 붙음                        |
| 정렬          | 가로 중앙 | `justify-content: center; align-items: center` |
| 라벨 줄바꿈   | 금지      | `white-space: nowrap`                          |

### TabsList

| 항목       | 값                                                                                         |
| ---------- | ------------------------------------------------------------------------------------------ |
| 방향(기본) | 가로(`flex-direction: row`)                                                                |
| 하단선     | 1px `#dddddd` (`--border-default`) — 전체 폭                                               |
| 패딩       | 0                                                                                          |
| 너비       | `100%` (부모 폭)                                                                           |
| 가로 넘침  | `overflow-x: auto`(스크롤바 숨김) + 좌우 화살표 버튼 — 한 줄에 담기지 않으면 화살표로 넘김 |

### 아이템 개수별 폭

| Count | 총 폭 |
| ----- | ----- |
| 2     | 240px |
| 3     | 360px |
| 4     | 480px |
| 5     | 600px |
| 6     | 720px |

> 총 폭이 부모 폭을 초과하면 행 양 끝의 좌우 화살표 버튼으로 가로 넘김을 제공한다.
> 화살표는 해당 방향으로 넘칠 때만 표시되고 가로 스크롤바는 숨긴다
> (`scrollbar-width: none` + `::-webkit-scrollbar { display: none }`).
> 탭을 바꾸면 활성 탭이 자동으로 시야에 들어오도록 스크롤된다.
> fullWidth 모드 시 각 트리거가 균등 분할(`flex: 1 1 0`).

오버플로우 이동 버튼은 24px 너비로 TabsList 양 끝에 overlay한다. 하단과 안쪽 경계는
`1px --border-default`, 모서리는 `0px`로 두어 TabsList 하단선과 직각으로 만난다. 버튼은
DOM을 유지한 채 `data-visible`로 opacity·visibility·pointer-events를 전환하여 스크롤 경계에서
mount/unmount 깜빡임이 생기지 않게 한다. 시작 버튼은 오른쪽, 끝 버튼은 왼쪽 방향으로 약한
그림자를 표시한다.

### 트리거 내부 간격

| 위치         | 값                  |
| ------------ | ------------------- |
| Icon ↔ Label | 4px (gap 내부 처리) |
| Label ↔ Chip | 6px (gap 내부 처리) |

> **정렬 불변의 원칙**: 모든 상태(selected/unselected/hover/pressed/disabled)에서
> 트리거 높이는 44px 로 고정한다. 하단 인디케이터와 hover/pressed 하단선은
> `border-bottom` 이 아닌 **`box-shadow inset`** 으로 렌더한다.
> `border-bottom` 을 쓰면 1px↔2px 전환 시 height 가 흔들린다(레이아웃 점핑).

---

## 5.5. 선행 아이콘 (Leading icon)

각 탭 라벨 앞에(optional) 아이콘을 배치할 수 있다. 공용 **Icon** 컴포넌트
(`size="m"` = 16px)를 사용하며, Figma 원본 Tab 노드에는 아이콘이 없으므로
**Aifrica Design System의 Icon 스펙을 그대로 따른다.**

> **주의**: Figma 원본 Tab(node 7872:224718)은 텍스트 전용이다. 아이콘 variant 는
> Segmented Control 의 icon 패턴을 참고해 구현했으며, Figma 에 아이콘 variant 가
> 추가되면 해당 스펙에 맞게 조정한다.

### 치수

| 항목             | 값        | 비고                                                         |
| ---------------- | --------- | ------------------------------------------------------------ |
| 아이콘 크기      | 16px      | Icon size `m`. 24px 그리드 + round cap/join                  |
| 스트로크 굵기    | 1.25px    | Icon size m 의 표준 스트로크                                 |
| Icon ↔ Label gap | 4px       | `triggerContent` 의 gap(6px)과 별개, Icon 컴포넌트 자체 간격 |
| Label ↔ Chip gap | 6px       | `triggerContent` gap                                         |
| 정렬             | 세로 중앙 | `align-items: center`                                        |

### 배치 순서

라벨 영역 내 요소는 항상 다음 순서를 따른다:

```
[Icon] [Label] [Chip]
```

세 요소 모두 optional 이지만, 순서는 고정. Icon 만 있거나 Chip 만 있을 수도 있고
세 가지가 모두 함께 있을 수도 있다.

### 색상 (라이트)

아이콘 색상은 `color: inherit` 로 **트리거 텍스트 색을 상속**한다.
별도 색상 토큰을 지정하지 않는다 — 트리거의 `color` 가 자동으로 전달된다.

| 상태       | 아이콘 색                     | 비고          |
| ---------- | ----------------------------- | ------------- |
| Selected   | `var(--accent-500)` (`--text-primary`)  | 텍스트와 동일 |
| Unselected | `#555555` (`--text-subtle`)   | 텍스트와 동일 |
| Disabled   | `#aaaaaa` (`--text-disabled`) | 텍스트와 동일 |

### 색상 (다크)

| 상태       | 아이콘 색                     |
| ---------- | ----------------------------- |
| Selected   | `var(--accent-400)` (`--text-primary`)  |
| Unselected | `#aaaaaa` (`--text-subtle`)   |
| Disabled   | `#757575` (`--text-disabled`) |

### 구현 핵심

```tsx
{
  tab.icon && (
    <Icon
      name={tab.icon}
      size="m"
      // 핵심: color: inherit 로 트리거 텍스트 색을 상속.
      // selected/unselected/disabled 상태가 trigger 의 color 로 자동 전환.
      style={{ color: "inherit" }}
      className={triggerIcon}
      aria-hidden="true"
    />
  );
}
```

- `style={{ color: 'inherit' }}` — Icon 의 기본 색상(`--icon`)을 덮어쓰고
  부모 트리거의 색상을 따라감. 이것이 핵심 메커니즘.
- `aria-hidden="true"` — 아이콘은 장식용. 라벨 텍스트가 의미를 전달.
- `flexShrink: 0` — 긴 라벨에 의해 아이콘이 깎이지 않도록.

---
