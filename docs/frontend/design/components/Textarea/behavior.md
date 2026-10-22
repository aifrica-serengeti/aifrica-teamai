# Textarea — 상태와 동작

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Textarea 문서 인덱스](./README.md)

## 7. 상태

7가지 상태. 상호작용에 따라 시각 변화. Figma 가이드라인 node 7608:3288 (States 섹션).

| 상태          | 동작                         | 시각 변화                                                                                |
| ------------- | ---------------------------- | ---------------------------------------------------------------------------------------- |
| **Enabled**   | 값 입력 가능한 기본 상태     | border `#ddd`, surface `#fff`(default) / `#f8f8f8`(create)                               |
| **Focused**   | 포커스 받아 입력 대기        | border 2px(1px+inset) `var(--accent-500)`. default 는 surface `#fff`, **create 는 `#f8f8f8` 유지** |
| **Typing**    | 키보드 입력 중               | Focused 와 동일(커서 표시)                                                               |
| **Filled**    | 값 입력 완료                 | Enabled 와 동일(값 채워짐)                                                               |
| **Invalid**   | 유효성 검사 실패             | border 2px(1px+inset) `#e81919`, Error text 표시                                         |
| **Disabled**  | 모든 상호작용 차단           | surface `#f8f8f8`, text/placeholder 회색, `cursor: not-allowed`, resize 차단             |
| **Read-only** | 수정 불가, 값 표시·복사 가능 | surface `#f8f8f8`, text 는 **enabled 색 유지**, focus 링 없음, resize 차단               |

### 구현 주의점

1. **Create focus 배경 유지**: Create variant 는 focus 시에도 `--form-surface-inactive`
   (#f8f8f8) 를 유지한다. Default variant 만 focus 시 `--form-surface-active`(#fff)로 전환.
   focus 셀렉터를 `[data-variant="default"]:focus` 와 `[data-variant="create"]:focus` 로 분리.
2. **Read-only ≠ Disabled**: Read-only 는 값을 보여주되 수정만 막는다. 시각은 surface 만
   inactive 로, 텍스트 색상은 enabled 와 동일하게 유지. resize 도 차단.
3. **Read-only focus 억제**: Tab 으로 focus 는 이동해야(스크린 리더 값 읽기) 하지만,
   시각적 focus 링은 표시하지 않는다. `:focus:not([data-readonly]):not(:disabled)` 셀렉터.
4. **Disabled 최우선**: disabled + invalid 가 겹치면 disabled 가 시각적으로 이긴다. invalid
   표현에 `:not(:disabled)` 추가.
5. **Focus 밀림 방지**: border-width 변화가 아닌 inset box-shadow 로 2px 표현.
6. **height 명시**: `<textarea>` 에 `rows={3}` + CSS `height: 84px` 로 고정하지 않으면
   브라우저가 기본 height(~44px)를 주입해 레이아웃이 틀어진다.

---

## 9. 애니메이션

색상 전환은 **개별 컴포넌트 요소 레벨**에서 `transition: '<색상속성> 0.2s ease'`.
전역 `*` 셀렉터 사용 금지. `transition: all` 금지. 0.2s 통일.

```css
/* Container — border/bg/shadow 색상만 보간 */
transition:
  background-color 0.2s ease,
  border-color 0.2s ease,
  box-shadow 0.2s ease,
  color 0.2s ease;

/* Placeholder / Label / Help text / Counter — 색상만 */
transition: color 0.2s ease;
```

> 다크/라이트 모드 전환 시에도 각 요소의 transition 이 보간되어 깜빡임 없이 부드럽게 전환.
> reduced-motion은 소비 앱의 실제 스타일에서 적용 여부를 확인한다. 전역 규칙이 있다고 가정하지 않는다.
> `@media (prefers-reduced-motion: reduce)`가 해당 요소에 적용되지 않으면 컴포넌트 범위의 전환·애니메이션을 즉시 완료하는 규칙을 둔다.
> 전환을 생략해도 값·focus·표시 여부와 종료·정리 책임은 유지한다.

---

