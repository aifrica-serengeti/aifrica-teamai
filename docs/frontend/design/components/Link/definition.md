# Link — 정의와 구조

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Link 문서 인덱스](./README.md)

## 2. 의존 컴포넌트

이 컴포넌트를 구현/재현하기 위해 필요한 공용 하위 컴포넌트.

| 컴포넌트 | 가이드라인   | 구현 여부 | 비고                                                                                                |
| -------- | ------------ | --------- | --------------------------------------------------------------------------------------------------- |
| **Icon** | `Icon/README.md` ✅ | 참조 계약 · 매핑 확인 필요    | Standalone link 의 trailing 아이콘. Figma System icon 스펙(node 6896:4224). Inline link 에는 미사용 |

재현자는 Icon 컴포넌트를 먼저 확보한 뒤 Link 를 조합해야 한다. Link 가 Icon svg 를 직접
렌더하지 않는다. 상세 절차는 [컴포넌트 카탈로그](../index.md)의 "공용 컴포넌트 조합 규칙" 참조.

---

## 3. 구조 (Anatomy)

```
Link (a 요소)
├── Label text              ── Pretendard Regular, 밑줄
└── (optional) Trailing Icon ── Icon 컴포넌트로 위임 (Standalone 전용)
```

- Container: `inline-flex` 가로/세로 중앙 정렬. 배경/테두리 없음(텍스트 요소).
- 라벨과 trailing 아이콘은 4px gap 으로 수평 배치.
- Trailing icon 은 Standalone link 에서만 optional. Inline link 는 라벨만.

### Icon 처리 (중요)

Link 내부 trailing 아이콘은 별도 **Icon 컴포넌트**(Figma System icon 스펙)로 위임한다.
Link 가 아이콘 svg 를 직접 렌더하지 않는다.

- `trailingIcon` prop 으로 React 노드(보통 `<Icon name="external_link" />`)를 전달.
- Icon size 는 link size 에 따라 **자동 매핑** (아래 표 참조). 개별 override 도 가능.
- **Icon 색상은 Link 텍스트 색을 상속(`color: 'inherit'`)해야 한다.** Icon 컴포넌트 기본은
  semantic `--icon` 토큰이라 currentColor 상속이 아니므로, Link 의 hover/pressed/disabled
  상태 색상 전환에 아이콘이 자동 대응하려면 반드시 `style={{ color: 'inherit' }}` 로 덮어쓴다.

**Link size → Icon size 자동 매핑:**

| Link size | icon 픽셀 (Figma) | Icon 토큰 |
| --------- | ----------------- | --------- |
| small     | 16px              | `m`       |
| medium    | 16px              | `m`       |
| large     | 18px              | `l`       |

> Icon 컴포넌트의 size 토큰 체계: t(12) / s(14) / m(16) / l(18) / xl(20) / 2xl(24) / 3xl(32) / 4xl(36).

---

## 4. 레이아웃 스펙

### Size 치수 (Figma 교차 검증)

| Size       | font / line | icon size (자동 매핑) | 타이포그래피 |
| ---------- | ----------- | --------------------- | ------------ |
| **Small**  | 12px / 16px | 16px (Icon `m`)       | Body3        |
| **Medium** | 14px / 20px | 16px (Icon `m`)       | Body2        |
| **Large**  | 16px / 24px | 18px (Icon `l`)       | Body1        |

### 공통 레이아웃

| 항목              | 값                                                               |
| ----------------- | ---------------------------------------------------------------- |
| gap (라벨↔아이콘) | **4px** (Figma auto-layout `gap-[4px]`)                          |
| font-weight       | 400 (Regular)                                                    |
| white-space       | `nowrap`                                                         |
| 기본 배치         | `inline-flex`, 가로/세로 중앙 정렬                               |
| 밑줄              | `underline` (Enabled/Hovered/Pressed/Focused), `none` (Disabled) |
| 밑줄 두께         | `from-font` (폰트 기본 굵기 따라감)                              |
| 배경/테두리       | 없음 (텍스트 요소)                                               |

---

