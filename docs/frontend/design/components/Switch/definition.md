# Switch — 정의와 구조

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Switch 문서 인덱스](./README.md)

## 2. 의존 컴포넌트

의존 컴포넌트 없음. Switch는 Radix Switch primitive와 디자인 토큰만으로 구성된다.

| 의존 | 가이드라인 | 구현 |
| ---- | ---------- | ---- |
| 없음 | —          | —    |

> Radix UI(`radix-ui` umbrella 패키지)가 필요하다. 별도 `@radix-ui/react-switch` 패키지가 아닌 umbrella 패키지의 `Switch` export(`Switch.Root`, `Switch.Thumb`)를 사용한다.

---

## 3. 구조 (Anatomy)

```
Switch (Root)
├── Track — 알약형 배경. 상태에 따라 색상 전환. data-size/data-state/data-disabled 제어.
└── Thumb — 원형 손잡이. 절대위치. checked 시 translateX 로 이동.
```

래퍼(SwitchItem)를 덧씌우면 라벨/도움말을 조합할 수 있다:

```
SwitchItem
├── label (item 행 — switch + label 가로 정렬)
│   ├── switchWrap (8px 히트 영역 패딩)
│   │   └── Switch
│   └── label text
└── helpText (하단 도움말)
```

Create/Detail form의 boolean field는 옆으로 붙는 `SwitchItem` 예시가 아니라 다른 field와 같은
세로 rhythm을 사용한다.

```text
field label (14px/20px semibold)
4px
control row (min-height 32px, align-items center)
└─ Switch size="large" (48×26)
4px
help/error (있을 때)
```

이 page profile에서 label을 switch 오른쪽의 regular text로 바꾸거나 한 행 양끝에 배치하지 않는다.
Switch primitive는 track/thumb를, page field wrapper는 label/help/error와 column geometry를 소유한다.

---

## 4. 레이아웃 스펙

### Track (알약형)

| Size   | Width × Height | Border-radius | Border                            |
| ------ | -------------- | ------------- | --------------------------------- |
| Small  | 32 × 18 px     | 9px           | 1px (항상 자리 차지, 색상만 전환) |
| Medium | 40 × 22 px     | 11px          | 1px                               |
| Large  | 48 × 26 px     | 13px          | 1px                               |

- `box-sizing: border-box`. Border는 **모든 상태에서 1px 자리를 차지**(투명/실색 전환).
  - 이유: disabled에서만 border를 추가하면 enabled↔disabled 전환 시 외형 크기가 변해
    thumb가 흔들린다. Radio/Checkbox와 동일한 패턴.
- Border-radius = height / 2 (완전한 알약 형태).

### Thumb (원형)

| Size   | 지름  | 위치(top/left) | 이동거리(checked) |
| ------ | ----- | -------------- | ----------------- |
| Small  | 14 px | 1px            | 14px              |
| Medium | 18 px | 1px            | 18px              |
| Large  | 22 px | 1px            | 22px              |

- 절대위치 `position: absolute; top: 1px; left: 1px`.
- **위치 계산 (핵심)**: Track이 border-box(1px border)이므로, 절대위치 기준은 padding box(border 내부)이다.
  Border(1px) + top/left(1px) = 외형에서 **2px gap**. Figma padding 2px와 일치.
  - 공식: `top/left = (content - thumb) / 2 = (24 - 22) / 2 = 1px` (Large 기준, 모든 사이즈 동일).
- Checked 시 `translateX(thumb 지름)` 으로 이동. Off → 0, On → thumb 지름.
- 그림자: Figma "Raised" 이펙트(dual-layer) 적용 — 자세한 값은 §5/§9 참조.

### SwitchItem 레이아웃 (라벨 조합)

| 요소            | 스펙                                               |
| --------------- | -------------------------------------------------- |
| item 행 gap     | 8px (switch ↔ label)                               |
| switchWrap 패딩 | 8px (히트 영역 확보)                               |
| label 폰트      | Small 12px/16px · Medium/Large 14px/20px (Regular) |
| helpText 폰트   | Small 10px/12px · Medium/Large 12px/16px           |

`SwitchItem`은 compact setting list용이다. Create/Detail form에서는 위의 vertical field profile이
우선하며 large Switch를 사용한다.

---
