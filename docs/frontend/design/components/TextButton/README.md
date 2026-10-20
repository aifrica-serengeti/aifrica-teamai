# Text Button

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

이 문서는 **의존 문서와 함께** Text Button 컴포넌트를 상세 상태·시각 계약을 구현하기 위한
완전한 스펙이다. 이 디렉터리와 의존 문서로 계약을 확인하고 솔루션 mapping·자산을 추가해야 한다.

---

> 문서 분할 안내: 기존 가이드의 “이 파일” 표현은 이제 이 디렉터리의 문서 묶음 전체를 뜻한다.
> 원문 내용은 삭제하지 않고 목적별 문서로 나눴다.

## 문서 탐색

- [구현 인덱스](./implementation/README.md)
- [정의와 구조](./definition.md)
- [스타일과 토큰](./styles.md)
- [상태와 동작](./behavior.md)
- [접근성](./accessibility.md)
- [검증과 재현](./verification.md)
- [CSS와 스타일 구현](./implementation/css.md)
- [TypeScript와 React 구현](./implementation/typescript.md)
- [사용 예제](./implementation/examples.md)

## 1. 개요

최소한의 시각적 강조로 액션을 수행하는 요소. 중요도가 낮은 보조 액션에 사용한다.
테두리가 없고 배경이 투명해 UI 내 시각적 간섭을 최소화한다.

> Text button 은 특정 액션을 실행하는 역할(화면 이동 없이 인터페이스 상태 변경)을 수행한다.
> 다른 페이지나 외부 URL 로 이동하는 탐색은 [Link](../Link/README.md) 를 사용한다.

**매트릭스:** 4 size(Tiny/Small/Medium/Large) × 5 state(Enabled/Hovered/Pressed/Disabled/Focused).
variant 는 없다(단일 스타일).

**기술 기반:** 네이티브 `<button>` 요소를 기반으로 vanilla-extract `.css.ts` 로 스펙을
직접 렌더한다. `radix-ui` 의 `Slot.Root` 를 써서 `asChild` 합성을 지원한다(링크/다른 요소로 렌더).

### 사용 가이드 (Figma 가이드 11641:28995 기반)

- **보조 작업에 적합** — 다른 Button 스타일(Primary/Secondary/Tertiary)에 비해 클릭 유도가 약하므로,
  Button 이 나란히 배치된 맥락이나 상호작용 가능성이 이미 명확한 상황에서 사용.
- **Page header / Card 의 보조 액션** — 시각적 강조가 필요 없는 보조 액션에 활용.
- **Label text 는 항상 한 줄** — 말줄임/줄바꿈 금지. 정보가 잘리면 의미 전달이 불완전해짐.
- **밑줄 금지** — Link 와 혼동됨.
- **Icon 은 의미를 명확히 전달하는 것만** — 장식적/모호한 Icon 금지.
- **Icon 2개 사용 지양** — Leading + Trailing 동시 사용은 시각적 복잡도를 높임.

---

