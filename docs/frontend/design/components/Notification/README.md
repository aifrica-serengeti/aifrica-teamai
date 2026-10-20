# Notification

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

> 최종 갱신: 2026-09-09

이 문서는 Notification과 Notification Container를 동일하게 재현하기 위한 완전한 스펙이다.
색상은 모두 CSS 토큰으로 정의하며, 구현 컴포넌트 안에 hex 값을 직접 쓰지 않는다.

> 문서 분할 안내: 기존 가이드의 “이 파일” 표현은 이제 이 디렉터리의 문서 묶음 전체를 뜻한다.
> 원문 내용은 삭제하지 않고 목적별 문서로 나눴다.

## 문서 탐색

- [구현 인덱스](./implementation/README.md)
- [정의와 구조](./definition.md)
- [스타일과 토큰](./styles.md)
- [상태와 동작](./behavior.md)
- [접근성](./accessibility.md)
- [검증과 재현](./verification.md)
- [TypeScript와 React 구현](./implementation/typescript.md)
- [사용 예제](./implementation/examples.md)
- [CSS와 스타일 구현](./implementation/css.md)

## 1. 개요

Notification은 사용자에게 정보·성공·경고·오류·로딩 상태를 알린다. 다음 5개 타입과 5개
상태를 지원한다.

public 계약은 단일 알림 `Notification`, stack·scroll·clear를 소유하는 `NotificationContainer`,
앱 공용 스택 `NotificationProvider`, 일시적 API 성공·실패용 `NotificationToast`, 기존 keyed 알림을 연결하는
`NotificationToastGroup`으로 제공한다. 페이지 query·draft·재시도는 페이지가 소유한다.

| 구분  | 값                                                                                              |
| ----- | ----------------------------------------------------------------------------------------------- |
| Type  | `inline`, `inlineLineBreak`, `toast`, `actionable`, `linkable`                                  |
| State | `info`, `success`, `warning`, `error`, `loading`                                                |
| 기술  | React + vanilla-extract. Radix/shadcn으로 새 primitive를 만들지 않고 기존 공용 컴포넌트를 조합. |

제목은 기본적으로 한 줄 말줄임이며, 전체 제목이 업무상 필수인 좁은 영역에서는
`titleOverflow="wrap"`을 명시해 높이가 자연스럽게 늘어나는 줄바꿈을 선택할 수 있다.

- **Inline**: 한 줄 안내. 선택적 제목·Link를 한 행에 표시한다.
- **Inline-line break**: 360px 안에서 제목/본문을 두 줄 흐름으로 표시하고 Link는 본문 끝에 둔다.
- **Toast**: 떠 있는 알림. 기본 5초 뒤 자기 자신만 퇴장한다.
- **Actionable**: Toast 레이아웃에 tertiary Button을 추가한다.
- **Linkable**: Toast 레이아웃에 독립 Link를 추가한다.
- **Notification Container**: Toast를 최신 순으로 세로 적재하고, hover ScrollArea·scroll fade·전체 닫기를 제공한다.
- **NotificationProvider**: 앱 루트에서 하나만 조립한다. 페이지와 Dialog의 알림을 viewport 우상단 한 스택에 모은다.
- **NotificationToast**: 일시적인 처리 결과가 있을 때 선언한다. 기본 5초·개별/전체 닫기를 제공하며 소스가 사라지면 알림도 제거한다. 검증·지속 상태와 구분하는 기준은 [페이지 정책](../../page-policies.md)을 따른다.
- **NotificationToastGroup**: 기존 keyed Notification의 action/link/close를 보존하며 공용 스택으로 전달한다.
- [API 오류 전환 범위와 유지한 안내](../../api-error-notifications.md)를 참고한다.

### 공용 스택의 스크롤과 복구

앱 공용 스택은 최신 항목을 위에 추가하므로 `NotificationContainer stickToEnd={false}`로 하단 자동 추적을 끈다. 독립 Container의 기본값은 `true`로 유지한다. 모달이 열려 있어도 알림 안에서 휠·터치로 내용을 읽을 수 있다.

Actionable은 기존 기본값(자동 닫기 없음)을 유지하며, `autoClose`를 명시하면 Toast와 같은 5초 수명으로 표시할 수 있다.
