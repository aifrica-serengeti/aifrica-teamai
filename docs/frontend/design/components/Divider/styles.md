# Divider — 스타일과 토큰

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Divider 문서 인덱스](./README.md)

## 4. 색상 스펙 — 라이트 모드

모든 색상값을 그대로 사용한다. 토큰 변수명(`--border-default`)은 토큰 체계를
따르며, 괄호 안의 hex 값이 실제 색이다.

| 요소      | 색상                                     |
| --------- | ---------------------------------------- |
| 선 (fill) | `#dddddd` (`--border-default`, gray-300) |
| 래퍼 배경 | transparent (부모 `--surface` 비춤)      |

> Divider는 단일 색상 컴포넌트다. 선 색상만 `--border-default` 토큰을 참조한다.
> 배경/텍스트 등 다른 색상은 가지지 않는다.

---

## 5. 색상 스펙 — 다크 모드

다크 모드는 `:root` 또는 컨테이너에 `.dark` 클래스 적용 시 전환. semantic 토큰을
참조하므로 컴포넌트 코드 수정 없이 자동 전환된다.

| 요소      | 색상                                     |
| --------- | ---------------------------------------- |
| 선 (fill) | `#555555` (`--border-default`, gray-700) |
| 래퍼 배경 | transparent (부모 `--surface` 비춤)      |

> 라이트 `#dddddd` → 다크 `#555555`. 더 밝은 배경 위에서 보이도록 테두리 색이 진해진다.

---

## 7. 타이포그래피

해당 없음. Divider는 비문자 컴포넌트로 텍스트를 포함하지 않는다.

---

## 10. 디자인 토큰 정의 (CSS 변수)

새 프로젝트에서 아래 변수를 `:root`와 `.dark`에 정의한다. 컴포넌트는 이 변수만 참조한다.

### `:root` (라이트)

```css
:root {
  /* Border — Divider 선 색상 */
  --border-default: #dddddd; /* gray-300 */

  /* Surface — 부모 배경 (래퍼는 transparent, 부모가 비춤) */
  --surface: #ffffff;

  /* Font (페이지 컨텍스트용) */
  --font-sans: "Pretendard", system-ui, sans-serif;
}
```

### `.dark` (다크)

```css
.dark {
  /* Border — Divider 선 색상 */
  --border-default: #555555; /* gray-700 */

  /* Surface — 부모 배경 */
  --surface: #1c1c1c; /* gray-900 */
}
```

---

