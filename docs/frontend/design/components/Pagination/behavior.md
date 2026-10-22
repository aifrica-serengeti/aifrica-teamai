# Pagination — 상태와 동작

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Pagination 문서 인덱스](./README.md)

## 7. 상태

Pagination 자체의 상태. 각 의존 컴포넌트(Input/Dropdown/Icon Button)의 내부 상태는
해당 컴포넌트 가이드라인 참조.

### 네비게이션 버튼 disabled (자동 계산)

| 버튼                  | disabled 조건                           |
| --------------------- | --------------------------------------- |
| « (처음) / ‹ (이전)   | `page <= 1` 또는 `total === 0`          |
| › (다음) / » (마지막) | `page >= totalPages` 또는 `total === 0` |

- disabled 버튼은 Icon Button의 disabled 스펙(`--icon-disabled` 색상, `cursor: not-allowed`)을 따른다.

### 전체 disabled (로딩 등)

| 항목            | 동작                                                           |
| --------------- | -------------------------------------------------------------- |
| `disabled` prop | 모든 Icon Button · Input · Dropdown 비활성. 상호작용 전면 차단 |

### 페이지 번호 입력 동작 (핵심 로직)

| 이벤트            | 동작                                                                                                                       |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------- |
| 입력 중           | **숫자(0-9)만 허용** — 정규식 `/[^\d]/g`로 그 외 문자(문자·기호·공백) 필터링. `inputMode="numeric"`으로 모바일 숫자 키패드 |
| Enter 키          | 입력값 확정 — clamp(1~totalPages) 후 `onPageChange` 호출                                                                   |
| blur(포커스 상실) | 입력값 확정 — clamp 후 `onPageChange` 호출                                                                                 |
| 범위 밖 값        | 자동 clamp. `0`→`1`, `totalPages+1`→`totalPages`                                                                           |

> 입력 중에는 콜백을 호출하지 않는다(타이핑 방해 방지). **Enter 또는 blur** 시점에만 확정.
> 무효 입력(빈 값·NaN)은 이전 페이지로 원복.

### 페이지당 항목수 변경

`showPageSize={false}`이면 항목 수를 변경하는 control을 렌더하지 않으며, 마운트·숨김 전환 시
`onPageSizeChange`를 호출하거나 페이지를 초기화하지 않는다. 전달받은 `pageSize`로 범위를 계속 계산한다.

| 이벤트             | 동작                                                                |
| ------------------ | ------------------------------------------------------------------- |
| Dropdown 옵션 선택 | `onPageSizeChange` 호출 + **페이지를 1로 리셋** (`onPageChange(1)`) |

> 페이지당 항목수가 바뀌면 기존 페이지 번호가 유효하지 않을 수 있으므로 첫 페이지로
> 리셋하는 것이 표준 동작이다.

`showPageSize`의 기본값은 `true`다. `false`이면 항목 수 선택만 숨기며 전달된 `pageSize`로
총페이지와 결과 범위를 계속 계산한다. 숨김 전환 자체는 페이지를 바꾸거나
`onPageSizeChange`를 호출하지 않는다. 페이지 크기와 조회 조건은 부모가 계속 소유한다.

### 다국어 결과 카운트

- `rangeTemplate`은 `{total}`, `{start}`, `{end}` 토큰을 언어 문법에 맞는 순서로 배치한다.
- 숫자는 `locale`의 `Intl.NumberFormat`으로 표시한다.
- `{total}`만 공용 `--pg-count-primary` 강조 토큰을 적용한다.
- `formatRange`가 전달되면 템플릿보다 우선하며 호출부가 전체 ReactNode 표현을 소유한다.

---

## 9. 애니메이션

### 색상 전환 (다크/라이트 모드)

```css
transition: color 0.2s ease;
```

- 결과 카운트 본문·강조·"/"·총페이지 각 요소에 개별 적용.
- 색상 속성만 지정. **절대 `transition: all`을 쓰지 않는다.**
- 다크/라이트 전환 시 깜빡임 없이 부드럽게 보간.
- 전역 `*` 셀렉터는 성능 저하/부작용으로 금지(개별 요소에만 transition).

> Input/Dropdown/Icon Button 각자의 transition은 해당 컴포넌트 스펙 참조.
> reduced-motion은 소비 앱의 실제 스타일에서 적용 여부를 확인한다. 전역 규칙이 있다고 가정하지 않는다.
> `@media (prefers-reduced-motion: reduce)`가 해당 요소에 적용되지 않으면 컴포넌트 범위의 전환·애니메이션을 즉시 완료하는 규칙을 둔다.
> 전환을 생략해도 값·focus·표시 여부와 종료·정리 책임은 유지한다.

---
