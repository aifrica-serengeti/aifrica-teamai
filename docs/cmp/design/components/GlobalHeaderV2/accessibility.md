# Global Header v2 — 접근성

공용 묶음 적용 조건: inheritCommon: true를 채택하고 frontend-common 역할을 선택한 UI 작업에만
아래 계약을 적용한다. 공용을 끈 경우 제품 자체 지침을 따르며 공용 문서·스킬·primitive를 요구하지 않는다.

> CMP 확장 계약: 상태·공개 API·접근성을 원본에서 분리했다. 색은 역할 token으로 연결하고 브랜드·메뉴·계정 데이터는 현재 제품에서 제공한다. 치수는 해당 shell 세대를 채택할 때의 참조 baseline이며 제품에서 변경하면 근거와 검증을 기록한다. 과거 구현됨 표기는 현재 제품 구현의 증거가 아니다.

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

