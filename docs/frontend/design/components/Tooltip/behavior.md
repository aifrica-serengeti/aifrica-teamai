# Tooltip — 상태와 동작

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Tooltip 문서 인덱스](./README.md)

## 8. 애니메이션

### 8.0 trigger 단일 소유와 content 안정성

- 한 interactive trigger에는 Tooltip root를 하나만 연결한다. Icon Button wrapper와 page action에서
  같은 trigger를 이중으로 감싸지 않는다.
- Tooltip content는 open 중 action의 pending/disabled 전환으로 더 긴 문구로 교체하지 않는다.
  예를 들어 Page Header의 삭제 preflight 중에도 `삭제`를 유지하고 진행 상태는 `aria-busy`와 live
  status가 전달한다. 대상 맥락은 `클라우드 삭제`와 같은 `aria-label`로 제공할 수 있다.
- trigger가 disabled여서 직접 pointer/focus event를 받지 못하면 의미 없는 wrapper를 중첩하지 않는다.
  필요 시 하나의 non-interactive `span`을 `TooltipTrigger asChild`로 사용하되 Tooltip owner는 여전히 하나다.
- trigger identity와 content node를 안정적으로 유지한다. click 직후 새 Tooltip root로 remount하면
  퇴장 직전에 폭이 늘거나 두 surface가 겹칠 수 있다.

### 8.1 진입/이탈 (fade + slide)

| 상태 | data-state                      | 지속         | 효과                              |
| ---- | ------------------------------- | ------------ | --------------------------------- |
| 등장 | `delayed-open` / `instant-open` | `0.15s ease` | fade-in + 방향별 slide-in (6px)   |
| 퇴장 | `closed`                        | `0.15s ease` | fade-out + 역방향 slide-out (6px) |

**방향별 slide:**

- `top`: 아래→위로 슬라이드 업 (등장), 위→아래 (퇴장)
- `bottom`: 위→아래로 슬라이드 다운 (등장), 아래→위 (퇴장)
- `left`: 오른쪽→왼쪽 (등장), 왼쪽→오른쪽 (퇴장)
- `right`: 왼쪽→오른쪽 (등장), 오른쪽→왼쪽 (퇴장)

> `animation-fill-mode: both`로 등장 전/퇴장 후에도 상태 유지.

### 8.2 다크/라이트 전환

| 요소           | transition                       | 지속 |
| -------------- | -------------------------------- | ---- |
| Content 배경   | `background-color 0.2s ease`     | 0.2s |
| Content 텍스트 | `color 0.2s ease`                | 0.2s |
| 화살표         | `color 0.2s ease` (currentColor) | 0.2s |

**규칙:**

- 색상 속성만 transition (`background-color`, `color`). `transition: all` 금지.
- 컴포넌트 내 모든 요소 0.2s로 통일.
- reduced-motion은 소비 앱의 실제 스타일에서 적용 여부를 확인한다. 전역 규칙이 있다고 가정하지 않는다.
  `@media (prefers-reduced-motion: reduce)`가 해당 요소에 적용되지 않으면 컴포넌트 범위의 전환·애니메이션을 즉시 완료하는 규칙을 둔다.
  전환을 생략해도 값·focus·표시 여부와 종료·정리 책임은 유지한다.

---
