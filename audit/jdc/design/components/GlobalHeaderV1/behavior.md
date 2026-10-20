# Global Header v1 — 상태와 동작

> **미채택 JDC 관찰 profile**: 원본 shell의 상세 근거를 보존한 자료입니다. CMP 전체 또는 PaaS·Agent Hub의 기본 규칙이 아닙니다.
> 공통 문서에 대한 참조는 공통 계약을 사용하며, 여기의 색·자산·치수·export 존재 주장은 관찰 시점의 원본에만 해당합니다.


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

