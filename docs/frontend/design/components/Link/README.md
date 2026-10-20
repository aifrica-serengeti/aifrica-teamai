# Link

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

이 문서는 **의존 문서와 함께** Link 컴포넌트를 상세 상태·시각 계약을 구현하기 위한
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

사용자가 다른 위치로 이동할 수 있도록 돕는 텍스트 링크 컴포넌트. Link는 문단 내에
포함되거나(Inline link) 단독 텍스트로(Standalone link) 표시될 수 있다.

**매트릭스:** 3 size(Small/Medium/Large) × 5 state(Enabled/Hovered/Pressed/Disabled/Focused)
× 2 type(Inline/Standalone).

**기술 기반:** 네이티브 `<a>` 요소를 기반으로 vanilla-extract `.css.ts` 로 스펙을
직접 렌더한다. `radix-ui` 의 `Slot.Root` 를 써서 `asChild` 합성을 지원한다
(react-router-dom `<Link>` 또는 다른 요소로 렌더).

### Type 역할 (사용 가이드)

| Type                | 용도                                                            | 아이콘                      |
| ------------------- | --------------------------------------------------------------- | --------------------------- |
| **Inline link**     | 문장이나 단락 **안에서** 사용. 주변 텍스트와 Blue 색상으로 구분 | **사용 불가**               |
| **Standalone link** | 콘텐츠 뒤 **의존 문서와 함께** 사용. 문장/단락 안에 넣지 않음           | 선택적 trailing 아이콘 허용 |

> **Inline link 는 절대 아이콘과 함께 사용하지 않는다.** Inline link 는 Blue 색상 자체로
> 상호작용 가능함을 전달하므로 아이콘이 불필요하다. 아이콘이 필요하면 Standalone link 를 쓴다.

### Size 매칭 규칙 (핵심)

**Link 의 size 는 주변 텍스트의 글자 크기와 일치해야 한다.** 크기를 맞추지 않으면
폰트 크기 불일치로 UI 가 어색해진다.

| 주변 텍스트 스타일 | font-size | Link size  |
| ------------------ | --------- | ---------- |
| Body3              | 12px      | **Small**  |
| Body2              | 14px      | **Medium** |
| Body1              | 16px      | **Large**  |

- **Inline link**: 포함된 문장의 글자 크기에 맞춘다. 예 — 본문이 Body1(16px)이면 `size="large"`.
- **Standalone link**: 페이지의 기본 본문 텍스트 크기에 맞춘다 (보통 Body1 → `large`).

---

