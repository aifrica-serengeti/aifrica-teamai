# Global Header v1 — 상태와 동작

공용 묶음 적용 조건: inheritCommon: true를 채택하고 frontend-common 역할을 선택한 UI 작업에만
아래 계약을 적용한다. 공용을 끈 경우 제품 자체 지침을 따르며 공용 문서·스킬·primitive를 요구하지 않는다.

> CMP 확장 계약: 상태·공개 API·접근성을 원본에서 분리했다. 색은 역할 token으로 연결하고 브랜드·메뉴·계정 데이터는 현재 제품에서 제공한다. 치수는 해당 shell 세대를 채택할 때의 참조 baseline이며 제품에서 변경하면 근거와 검증을 기록한다. 과거 구현됨 표기는 현재 제품 구현의 증거가 아니다.

[← Global Header v1 문서 인덱스](README.md)

## 7. 상태와 동작

| 대상 | 상태 | 동작 / 시각 변화 |
| --- | --- | --- |
| Search | controlled | `searchValue`와 `onSearchChange(value)`로 제어. `onClear`는 빈 문자열을 먼저 전달한 뒤 callback 호출 |
| Notification | unread | `hasUnreadNotifications=true`일 때만 dot 표시 |
| 전역 Icon Button | hover/pressed/focus | 공용 Icon Button ghost 상태를 그대로 사용 |
| Account trigger | hover | `--surface-hover` 배경 |
| Account trigger | pressed | `--surface-pressed` 배경 |
| Account trigger | open | `data-state="open"`; pressed 배경을 유지하고 chevron을 180° 회전 |
| Account trigger | focus-visible | 1px primary outline + 1px offset |
| Account menu | open/close | Trigger 클릭, Enter/Space로 open. ESC·바깥 클릭·MenuItem 선택으로 close (공용 Menu/Radix) |
| Logout | select | `onLogoutClick?.()` 호출 |
| Chatbot | select | `onChatbotClick?.()` 호출 |

`onAccountClick`은 메뉴가 **열릴 때만** 호출한다. 닫힐 때는 호출하지 않는다.

---

## 9. 모션

다크/라이트 전환은 각 색상 관련 요소에만 **0.2s ease**를 적용한다.

```css
/* Header */
transition: background-color 0.2s ease, border-color 0.2s ease;

/* Account trigger */
transition: background-color 0.2s ease, color 0.2s ease;

/* 계정 텍스트/chevron/email */
transition: color 0.2s ease;
```

- `transition: all`은 금지한다.
- 열린 계정 메뉴의 chevron은 `transform: rotate(180deg)`로 아래 방향을 위 방향으로 바꾼다.
  레이아웃 애니메이션은 넣지 않는다.
- Menu의 open/close fade+slide(0.15s)는 공용 Menu가 담당한다.
- `prefers-reduced-motion: reduce`에서는 전역 motion 정책에 따라 transition/animation을 제거한다.

---

