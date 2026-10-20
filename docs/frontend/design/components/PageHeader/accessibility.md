# Page Header — 접근성

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

`page-header-title-actions`는 배치용 묶음이며 별도 tab stop이나 `toolbar` 역할을 추가하지 않는다.
Tab 순서는 전달된 refresh → edit → delete 순서를 유지하고, 각 버튼의 Tooltip·accessible name을 보존한다.

[← Page Header 문서 인덱스](./README.md)

## 10. 접근성

- semantic `<header>`와 optional `<nav aria-label="페이지 탭">`를 사용한다.
- loading Header는 `aria-busy="true"`를 사용한다. Skeleton은 `aria-hidden`인 장식 요소이므로
  page content의 별도 loading status와 중복으로 읽지 않는다.
- back Icon Button은 `aria-label="이전 페이지로 이동"`, tooltip은 “뒤로 가기”다.
- title action Icon Button은 각각 동작을 설명하는 `aria-label`과 Tooltip 하나를 가져야 한다.
  busy 동안 accessible name을 진행 상태로 바꾸지 않고 `aria-busy`와 page live status를 함께 사용한다.
- 반복되는 icon-only action은 `PageHeaderIconAction`으로 조립한다. `label`은 대상 맥락을 포함할 수 있고,
  `tooltip`은 화면에 표시할 짧은 동작명을 사용한다.
- Title Tooltip은 잘린 경우에만 열어 불필요한 중복 안내를 피한다.
- Tab의 방향키 이동·선택 상태·focus 관리는 공용 Radix Tab에 위임한다.
- 모든 Icon Button/Button의 focus-visible ring은 하위 공용 컴포넌트 규격을 그대로 쓴다.

---
