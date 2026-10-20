# Global Header v1 — 접근성

> **미채택 JDC 관찰 profile**: 원본 shell의 상세 근거를 보존한 자료입니다. CMP 전체 또는 PaaS·Agent Hub의 기본 규칙이 아닙니다.
> 공통 문서에 대한 참조는 공통 계약을 사용하며, 여기의 색·자산·치수·export 존재 주장은 관찰 시점의 원본에만 해당합니다.


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

