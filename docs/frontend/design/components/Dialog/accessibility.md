# Dialog — 접근성

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Dialog 문서 인덱스](./README.md)

## 11. 접근성

| 항목 | 스펙 |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --- |
| 역할 | Radix Dialog 기반 — `role="dialog"`, `aria-modal="true"` 자동 설정 |
| 포커스 트랩 | 다이얼로그 열림 시 포커스가 내부로 이동, Tab/Shift+Tab 순환이 내부에 갇힘 |
| 포커스 복원 | 다이얼로그 닫힘 시 trigger 요소로 포커스 복원 |
| **ESC 키 닫기** | `closeOnEscape` prop(기본 `true`). Radix `onEscapeKeyDown` 으로 처리. 다이얼로그가 열려 있을 때 `Escape` 키를 누르면 즉시 닫힘. `closeOnEscape={false}` 로 비활성화 가능 |
| **Scrim 클릭 닫기** | `closeOnOutsideClick` prop(기본 `true`). Radix `onInteractOutside` 로 처리. `closeOnOutsideClick={false}` 로 비활성화 가능 |
| 닫기 버튼 | `closeLabel`이 있으면 해당 locale의 `aria-label`, 생략 시 `다이얼로그 닫기` (Icon Button). 항상 활성 |
| 스크롤 영역 | Tab 순환이 스크롤 영역 내 포커스 가능 요소들 사이에서 유지됨 | |

`scrollFadeTone`은 장식적인 경계 농도만 바꾸며 스크롤 위치, 키보드 조작, border 또는 접근성 트리에는
영향을 주지 않는다.

## Confirmation profile

- 열릴 때 focus는 `돌아가기`, `취소`처럼 action을 실행하지 않는 안전한 footer Button에 둔다.
- 결과 Button은 `확인`만 쓰지 않고 `생성하기`, `승인`, `거절`, `삭제`, `동기화`처럼 실행 결과가 드러나는
  동사를 사용한다.
- primary/negative 색상만으로 결과의 위험도를 전달하지 않고 title과 Button text에 같은 action을 적는다.
- description은 항상 실제 텍스트를 가지며 Radix의 `aria-describedby` 연결로 작업 대상과 영향을 읽는다.
  빈 값은 공용 안전 설명으로 대체하지만 caller는 도메인에 맞는 구체적인 문구를 우선 제공한다.
- Small과 confirmation의 400px은 desktop 기준이며 좁은 viewport와 200% zoom에서는
  `max-width: calc(100vw - 32px)`로 줄어들어
  좌우 16px 여백과 focus ring을 보존해야 한다.

---

## 공용 알림과의 상호작용

토스트가 생기거나 닫혀도 Dialog focus trap과 작성 중 입력을 유지한다. 공용 알림은 앱의 live region에서 알리고, Dialog 내부 재시도 Button과 Alt+Shift+N 전체 알림 닫기를 제공한다.

공용 스택이 넘쳐도 모달을 닫지 않고 휠·터치로 오류 내용을 읽을 수 있다. 알림 스크롤은 작성 중인 입력과 focus trap을 변경하지 않는다.
