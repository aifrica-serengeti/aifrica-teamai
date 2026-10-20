# Edit Confirmation Dialog 정의

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

## 1. 의존 컴포넌트

| 컴포넌트                      | 가이드라인 | 구현 상태              | 역할                                                  |
| ----------------------------- | ---------- | ---------------------- | ----------------------------------------------------- |
| [Dialog](../Dialog/README.md) | 있음       | 참조 계약 · 매핑 확인 필요                 | focus trap, portal, modal semantics, small size shell |
| [Button](../Button/README.md) | 있음       | 참조 계약 · 매핑 확인 필요                 | footer의 계속하기 / confirm action                    |
| `EditConfirmationDialog`      | 이 문서    | public compound export | save/cancel copy 선택과 Dialog 조립                   |

## 2. 상태와 anatomy

```
Parent Page state
└─ confirmationAction: undefined | "save" | "cancel"
   └─ EditConfirmationDialog
      ├─ Dialog (size="small", profile="confirmation", width 400px, open=true)
      │  ├─ Title
      │  ├─ Description (max 2 lines)
      │  └─ Footer
      │     ├─ tertiary safe action → 최초 focus, onOpenChange(false)
      │     └─ primary confirm → onConfirm()
      └─ action === undefined → render null
```

| `action`    | title/description source                                | primary label                      | confirm 결과                            |
| ----------- | ------------------------------------------------------- | ---------------------------------- | --------------------------------------- |
| `undefined` | 없음                                                    | 없음                               | component를 render하지 않음             |
| `save`      | `saveTitle` / `saveDescription` 또는 저장 기본 설명     | `confirmLabel` (기본 저장하기)     | parent의 저장 함수 실행                 |
| `cancel`    | `cancelTitle` / `cancelDescription` 또는 이탈 기본 설명 | `cancelConfirmLabel` (기본 나가기) | parent가 draft를 버리거나 목록으로 이동 |

tertiary safe action은 저장 intent에서 `돌아가기`, 수정 취소 또는 화면 이탈 intent에서 `계속하기`를
기본으로 사용한다. locale 또는 도메인 문구가 필요하면 `continueLabel`로 현재 action의 문구를
override한다.

`saveDescription`의 기본값은 `변경 내용을 확인한 후 저장해 주세요.`, `cancelDescription`의 기본값은
`저장하지 않은 변경 내용은 유지되지 않습니다.`다. 도메인 영향이 구체적이면 caller가 이를 override한다.

`returnFocusRef`를 전달하면 Dialog가 닫힌 뒤 해당 `HTMLElement`로 focus를 복원한다. 일반 dismiss는
원 trigger Button을 사용한다. 초기화처럼 confirm 결과가 page 위치와 작업 기준점을 바꾸면 parent가
다음 입력처럼 현재 viewport와 일치하는 focus target으로 ref를 갱신할 수 있다. controlled Dialog를
`DialogTrigger` 없이 여는 page는 이 ref를 전달한다.

## 5. 사용 범위

### 적합한 경우

- draft가 있는 상세 화면에서 저장 전 영향 확인
- draft를 폐기하는 수정 취소
- 등록 요청 전 resource 생성/초기 비밀번호 발급/권한 반영 같은 영향 확인

### 이 컴포넌트를 그대로 쓰지 않는 경우

- 삭제, 세션 강제 종료, 접근 권한 박탈처럼 destructive action: intent를 명시하는 별도
  destructive Dialog를 사용한다. button tone과 copy가 "저장"/"수정 취소"가 아니기 때문이다.
- 단순 navigation/정보 안내: confirmation 없이 이동하거나 일반 `Dialog`를 사용한다.
- 민감 값(success secret/password) 확인: 일반 success 선택 Dialog가 아니라 별도의 1회성 결과
  화면을 사용한다. `EditConfirmationDialog`는 mutation 전 confirmation만 소유한다.
