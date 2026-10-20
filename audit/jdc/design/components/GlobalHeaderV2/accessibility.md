# Global Header v2 — 접근성

> **미채택 JDC 관찰 profile**: 원본 shell의 상세 근거를 보존한 자료입니다. CMP 전체 또는 PaaS·Agent Hub의 기본 규칙이 아닙니다.
> 공통 문서에 대한 참조는 공통 계약을 사용하며, 여기의 색·자산·치수·export 존재 주장은 관찰 시점의 원본에만 해당합니다.


[← Global Header v2 문서 인덱스](README.md)

## 9. 접근성

- Header landmark는 `<header>`다.
- Sidebar toggle은 의미 있는 `aria-label`을 항상 가진다.
- `snbId`가 제공되면 toggle의 `aria-controls`가 실제 SNB landmark의 `id`와 일치해야 한다.
- toggle의 `aria-expanded`는 SNB의 **현재** 상태를 반영한다.
- 실제 SNB v2는 `<aside aria-label="Side navigation">` landmark로 Header와 형제 관계를 갖는다.
- 공용 Icon Button은 Tab, Enter, Space, focus-visible outline을 제공한다.
- Breadcrumb은 공용 `<nav aria-label="Breadcrumb">`와 현재 위치의 `aria-current="page"`를 사용한다.
- Divider는 장식 요소이며 별도 키보드 초점을 받지 않는다.

