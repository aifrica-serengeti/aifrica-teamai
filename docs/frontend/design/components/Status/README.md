# Status

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

이 문서는 **의존 문서와 함께** Status 컴포넌트를 상세 상태·시각 계약을 구현하기 위한
완전한 스펙이다. 이 디렉터리와 의존 문서로 계약을 확인하고 솔루션 mapping·자산을 추가해야 한다.

> **재현 주의**: 모든 아이콘은 Figma 원본 SVG 자산을 직접 fetch 한 path 데이터를
> 그대로 사용한다. 스크린샷이나 자동 생성 코드만 보고 형태/좌표를 추측하면 안 된다
> (정렬 어긋남, 색상 오류, 점선 겹침 등이 발생). 특히 점선 원의 `stroke-dasharray`
> 값은 둘레로 정확히 나누어 떨어지도록 보정해야 한다.

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

특정 요소의 상태에 대한 빠른 시각적 인식을 직관적으로 전달하기 위한 요소. 시스템이나
객체의 현재 상태(Error / Success / In progress 등)를 State icon + Label 조합으로 표현한다.
주로 테이블 행, 카드, 목록 항목 등에서 **읽기 전용(Read-only)** 으로 사용된다.

**매트릭스:** 9개 상태(Error / Warning / Success / Normal / In progress / Incomplete /
Not started / Pending / Info). 별도의 variant 매트릭스는 없으며, State icon 은
20×20 고정, Label 은 Body2(14px) 고정이다. `showLabel={false}` 로 아이콘만
단독 표시할 수 있다.

**기술 기반:** 네이티브 `<span>` 요소를 기반으로 vanilla-extract `.css.ts` 로
스펙을 직접 렌더한다. shadcn/Radix primitive 없이 순수 인라인 SVG + CSS 로 렌더한다.
단, **In progress** 상태의 spinner 애니메이션은 공용 **Spinner** 컴포넌트에 위임한다.

### 상태 역할 (사용 가이드)

| 상태            | 용도      | 설명                                                   |
| --------------- | --------- | ------------------------------------------------------ |
| **Error**       | 문제 발생 | 시스템에 문제가 발생했음. ex) 오류·인증 실패·배포 실패 |
| **Warning**     | 주의 필요 | 주의가 필요하거나 잠재적 문제 경고                     |
| **Success**     | 완료      | 작업이 성공적으로 완료됨. ex) 업로드 완료·배포 성공    |
| **Normal**      | 정상      | 이상 없이 정상 동작 중                                 |
| **In progress** | 진행 중   | 작업이 진행 중임. 회전하는 spinner                     |
| **Incomplete**  | 부분 완료 | 부분적으로 완료됨(좌측 절반 채움)                      |
| **Not started** | 미시작    | 아직 시작하지 않음(빈 점선 원)                         |
| **Pending**     | 대기      | 시스템 응답이나 외부 처리 대기                         |
| **Info**        | 정보      | 참고용 정보성 상태                                     |

---

