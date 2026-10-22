# Divider — 상태와 동작

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Divider 문서 인덱스](./README.md)

## 8. 애니메이션

### 다크/라이트 모드 전환

Divider 선 색상(`--border-default`)이 다크 모드 전환 시 부드럽게 보간되도록, **래퍼와
자식 선 모두**에 배경색 transition을 건다.

```css
/* 래퍼 */
transition: background-color 240ms ease;

/* 자식 선(Separator) */
transition: background-color 240ms ease;
```

> **핵심**: 색상 전환은 **개별 컴포넌트 요소 레벨**에서 적용. 전역 `*` 셀렉터 사용 금지,
> `transition: all` 금지. 지속시간은 240ms로 통일.
>
> reduced-motion은 소비 앱의 실제 스타일에서 적용 여부를 확인한다. 전역 규칙이 있다고 가정하지 않는다.
> `@media (prefers-reduced-motion: reduce)`가 해당 요소에 적용되지 않으면 컴포넌트 범위의 전환·애니메이션을 즉시 완료하는 규칙을 둔다.
> 전환을 생략해도 값·focus·표시 여부와 종료·정리 책임은 유지한다.

---

