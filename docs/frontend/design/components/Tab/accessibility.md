# Tab — 접근성

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Tab 문서 인덱스](./README.md)

## 10. 접근성

| 항목          | 스펙                                                                                           |
| ------------- | ---------------------------------------------------------------------------------------------- |
| 키보드 탐색   | Radix 기반 — Tab으로 진입, ←→로 탭 이동                                                        |
| 포커스 표시   | `:focus-visible` 시 2px `var(--accent-500)` (dark: `var(--accent-400)`) 직사각형 outline, 내부 배치                |
| 역할          | `role="tab"` (trigger), `role="tablist"` (list), `role="tabpanel"` (content) — Radix 자동 설정 |
| aria-selected | 활성 trigger 에 `aria-selected="true"` — Radix 자동 설정                                       |
| aria-disabled | 비활성 trigger 에 설정                                                                         |
| Chip 접근성   | `aria-label="{count}개"` 로 스크린 리더에 항목 수 전달                                         |
| 히트 영역     | 44px 높이 × 120px 최소 폭                                                                      |

---

- 닫기 버튼은 `aria-label`(기본 `{label} 탭 닫기`)을 가지며 Enter·Space로도 닫기만 실행한다. 탭 선택과 닫기는 별개 동작으로 전달된다.
- 오버플로우 이동 버튼은 각각 `이전 탭 보기`, `다음 탭 보기` 이름을 사용한다. 숨김 상태에서는
  `disabled`와 `aria-hidden="true"`를 함께 적용한다. 키보드 사용자는 Radix의 ←→ 탐색으로 숨은 탭을
  선택하면 활성 탭이 자동으로 보이므로 이동 버튼은 roving tab stop에 포함하지 않는다.

닫기 버튼은 [별도 closable adapter의 계약](./implementation/README.md)이며 제공된 일반 예제에는 없다.
`showContent=false`인 Header 조합도 외부 `tabpanel` 연결을 자동 제공하지 않는다. 실제 Radix runtime의
`aria-controls`·panel id·`aria-labelledby` 연결과 keyboard/focus를 확인한 뒤 접근성 통과로 기록한다.
