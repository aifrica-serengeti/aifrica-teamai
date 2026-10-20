# Badge — 스타일과 토큰

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Badge 문서 인덱스](./README.md)

## 5. 색상 스펙 — 라이트 모드

아래는 상태별 baseline 매핑이다. primary는 솔루션 accent scale로 연결하고 중립·status 값도 채택 여부를 기록한다. Badge 는 단일 point
색상만 사용하므로 variant·상태에 따른 색상 분기가 없다.

| 요소        | 색상                | 토큰                 |
| ----------- | ------------------- | -------------------- |
| 배경(fill)  | `#d00a0a` (red-700) | `--element-point`    |
| 숫자 텍스트 | `#ffffff`           | `--element-on-point` |

> **Figma 근거**: `get_variable_defs` 로 추출한 `color/element/point = #d00a0a`,
> `color/element/on-primary = #ffffff` (Figma 변수명은 on-primary 이지만 역할은 point 배경
> 위 텍스트). 원본 Figma code 의 `bg-[var(--color/element/point,#d00a0a)]` 와 일치.

---

## 6. 색상 스펙 — 다크 모드

다크 모드는 `:root` 또는 컨테이너에 `.dark` 클래스 적용 시 전환. Badge 가 참조하는
`--element-point` / `--element-on-point` 토큰만 재매핑하면 자동 전환된다.

| 요소        | 라이트              | 다크                         | 토큰                 |
| ----------- | ------------------- | ---------------------------- | -------------------- |
| 배경(fill)  | `#d00a0a` (red-700) | `#e81919` (red-600, 더 밝음) | `--element-point`    |
| 숫자 텍스트 | `#ffffff`           | `#ffffff`                    | `--element-on-point` |

> **Figma 근거**: 다크 node `10704:30302` 의 Badge instance(`10704:30111`)가
> `bg-[var(--color/element/point,#e81919)]` 으로 더 밝은 red-600 을 사용.
> 어두운 배경 위에서 대비를 유지하기 위해 point 색이 한 단계 밝아진다.

---

## 8. 타이포그래피

폰트 패밀리: **Pretendard**. 굵기 600 (SemiBold). Counter variant 에만 적용.

| 항목           | 값                           |
| -------------- | ---------------------------- |
| font-family    | `Pretendard` (`--font-sans`) |
| font-size      | **10px**                     |
| line-height    | **12px**                     |
| font-weight    | **600** (SemiBold)           |
| letter-spacing | 0                            |

> **Figma 근거**: Label1 텍스트 스타일(`--text-label1: 700 10px/12px`)과 유사하나,
> Badge 텍스트는 Figma 원본에서 Pretendard **SemiBold(600)** 를 사용한다
> (`font-['Pretendard:SemiBold']`). Bold(700)이 아님에 주의.

---

## 11. 디자인 토큰 정의 (CSS 변수)

새 프로젝트에서 아래 변수를 `:root`와 `.dark`에 정의한다. 컴포넌트는 이 변수만 참조한다.

### `:root` (라이트)

```css
:root {
  /* Point — Badge(Dot/Counter) 채움색. Figma color/element/point. */
  --element-point: #d00a0a; /* red-700 */
  --element-on-point: #ffffff; /* color/element/on-primary */

  /* Font */
  --font-sans: "Pretendard", system-ui, sans-serif;
}
```

### `.dark` (다크)

```css
.dark {
  /* Point — 다크에서 더 밝은 red. Figma Badge dark node 10704:30302. */
  --element-point: #e81919; /* red-600 */
  --element-on-point: #ffffff;
}
```

> Badge 는 이미 공용 semantic 토큰(`--element-*`) 체계에 통합되어 있다. 별도의
> `--badge-*` 접두사 토큰을 두지 않고, point 역할 토큰을 재사용한다.

---

