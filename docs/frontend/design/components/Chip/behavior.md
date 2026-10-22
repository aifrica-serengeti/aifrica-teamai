# Chip — 상태와 동작

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Chip 문서 인덱스](./README.md)

## 7. 상태 (Behavior)

Chip 은 읽기 전용 요소로, **Enabled** 와 **Disabled** 두 가지 상태만 가진다.

| 상태         | 배경                            | 글자                 | 테두리      | 비고                    |
| ------------ | ------------------------------- | -------------------- | ----------- | ----------------------- |
| **Enabled**  | variant/color 에 따른 정상 색상 | 정상                 | 정상        | 기본                    |
| **Disabled** | `#eeeeee` (gray-200)            | `#aaaaaa` (gray-400) | transparent | 모든 variant/color 공통 |

### Disabled 구현 주의점

- disabled 색상은 **variant/color 와 무관하게 공통**(`--element-disabled` / `--text-disabled`).
- CSS 특이성: `&[data-disabled][data-variant][data-color]` (0-3-0)으로 variant+color
  셀렉터(0-2-0)보다 높여야 disabled 색상이 이긴다.
- `pointer-events: none` 으로 trailing button 클릭 차단.
- trailing IconButton 은 `disabled` prop + `tabIndex={-1}` 로 포커스 차단.
- `aria-disabled={true}` 로 스크린리더에 비활성 상태 전달.

---

## 9. 애니메이션

### 다크/라이트 모드 전환

배경·글자·테두리 색상 전환을 0.2초에 걸쳐 부드럽게 처리한다.

```css
/* Chip 루트 */
transition:
  background-color 0.2s ease,
  color 0.2s ease,
  border-color 0.2s ease;

/* Label */
transition: color 0.2s ease;
```

- **절대 `transition: all` 을 쓰지 않는다** — 색상 속성만 지정.
- 전역 `*` 셀렉터는 금지. 개별 요소에만 transition 적용.
- 0.2s 로 통일하여 요소마다 타이밍이 다르면 깜빡인다.

> reduced-motion은 소비 앱의 실제 스타일에서 적용 여부를 확인한다. 전역 규칙이 있다고 가정하지 않는다.
> `@media (prefers-reduced-motion: reduce)`가 해당 요소에 적용되지 않으면 컴포넌트 범위의 전환·애니메이션을 즉시 완료하는 규칙을 둔다.
> 전환을 생략해도 값·focus·표시 여부와 종료·정리 책임은 유지한다.

---

