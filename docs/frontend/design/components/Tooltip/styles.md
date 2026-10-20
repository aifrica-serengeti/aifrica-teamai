# Tooltip — 스타일과 토큰

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Tooltip 문서 인덱스](./README.md)

## 4. 색상 스펙 — 라이트 모드

> inverse 토큰: 일반 surface와 반전. 라이트에서는 검정 배경 + 흰 글씨.

| 요소           | 색상 | hex 값    | 토큰                               |
| -------------- | ---- | --------- | ---------------------------------- |
| Content 배경   | 검정 | `#1c1c1c` | `--surface-inverse`                |
| Content 텍스트 | 흰색 | `#ffffff` | `--text-inverse`                   |
| 화살표 fill    | 검정 | `#1c1c1c` | `--surface-inverse` (currentColor) |

**핵심 규칙:**

- 툴팁은 inverse 색상 체계를 사용. 배경은 검정, 텍스트는 흰색.
- 화살표는 content 배경과 동일한 색(`currentColor` → `--surface-inverse`).
- 투명도/그림자 없음. 단색 솔리드.

---

## 5. 색상 스펙 — 다크 모드

> `.dark` 클래스 적용 시. inverse가 반전되어 흰 배경 + 검정 글씨가 됨.

| 요소           | 색상 | hex 값    | 토큰                               |
| -------------- | ---- | --------- | ---------------------------------- |
| Content 배경   | 흰색 | `#ffffff` | `--surface-inverse`                |
| Content 텍스트 | 검정 | `#1c1c1c` | `--text-inverse`                   |
| 화살표 fill    | 흰색 | `#ffffff` | `--surface-inverse` (currentColor) |

**다크 모드 전환 원리:**

- 컴포넌트 코드는 변경 없이 `--surface-inverse`/`--text-inverse` 토큰만 참조.
- `.dark`에서 이 토큰들이 자동으로 반전 값으로 재매핑됨.
- 라이트: `--surface-inverse: #1c1c1c` → 다크: `--surface-inverse: #ffffff`
- 라이트: `--text-inverse: #ffffff` → 다크: `--text-inverse: #1c1c1c`

---

## 7. 타이포그래피

Pretendard Regular (Body2 스타일). Icon/Standard 공통.

| 속성           | 값                           |
| -------------- | ---------------------------- |
| font-family    | `Pretendard` (`--font-sans`) |
| size           | `14px`                       |
| weight         | `400` (Regular)              |
| line-height    | `20px`                       |
| letter-spacing | `0`                          |
| text-align     | `center`                     |

---

## 10. 디자인 토큰 정의 (CSS 변수)

새 프로젝트에서 아래 변수를 정의하면 컴포넌트가 동작한다.

```css
:root {
  /* Inverse — 툴팁/액션바 등 반전 표면. 라이트: 검정 배경/흰 글씨. */
  --surface-inverse: #1c1c1c;
  --text-inverse: #ffffff;

  /* 폰트 */
  --font-sans: "Pretendard", system-ui, -apple-system, sans-serif;
}

.dark {
  /* Inverse 다크 — 흰 배경/검정 글씨로 반전. */
  --surface-inverse: #ffffff;
  --text-inverse: #1c1c1c;
}
```

> raw palette 참고: `--surface-inverse` 라이트값은 `--color-gray-900` (`#1c1c1c`), 다크값은 `--color-white` (`#ffffff`).

---

