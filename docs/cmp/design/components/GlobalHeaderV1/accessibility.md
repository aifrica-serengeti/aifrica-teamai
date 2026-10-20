# Global Header v1 — 접근성

공용 묶음 적용 조건: inheritCommon: true를 채택하고 frontend-common 역할을 선택한 UI 작업에만
아래 계약을 적용한다. 공용을 끈 경우 제품 자체 지침을 따르며 공용 문서·스킬·primitive를 요구하지 않는다.

> CMP 확장 계약: 상태·공개 API·접근성을 원본에서 분리했다. 색은 역할 token으로 연결하고 브랜드·메뉴·계정 데이터는 현재 제품에서 제공한다. 치수는 해당 shell 세대를 채택할 때의 참조 baseline이며 제품에서 변경하면 근거와 검증을 기록한다. 과거 구현됨 표기는 현재 제품 구현의 증거가 아니다.

[← Global Header v1 문서 인덱스](README.md)

## 10. 접근성

| 항목 | 요구사항 |
| --- | --- |
| Header landmark | 최상위 요소는 `<header>` |
| Breadcrumb | 공용 Breadcrumb의 `<nav aria-label="Breadcrumb">` 사용 |
| 전역 actions | `<nav aria-label="전역 작업">`로 그룹화 |
| Icon Button | 모두 의미 있는 `aria-label`: 알림 열기 / 도움말 열기 / 추가 메뉴 열기 |
| unread Badge | 공용 Badge의 `role="status"`, `aria-label="새 알림"` 사용 |
| Search | `aria-label="메뉴 검색"` |
| Account trigger | `aria-label="{name} 계정 메뉴 열기"`; Menu가 `aria-expanded`, menu 관계를 제공 |
| 계정 메뉴 | 공용 Menu의 `role="menu"`/`menuitem`, Arrow key·Enter·ESC 키보드 동작 사용 |
| 아이콘 | 텍스트가 이미 있는 menu leading Icon과 chevron은 `aria-hidden` |
| focus | Account trigger와 Icon Button 모두 focus-visible outline을 제공 |

---

