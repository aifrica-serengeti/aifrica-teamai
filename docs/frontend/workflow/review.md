# 코드 리뷰 판정과 수정 반복

[← 작업 흐름](./README.md)

리뷰의 목적은 코멘트 수를 0으로 만드는 것이 아니라 실제 결함과 불확실성을 제거하는 것이다.
사람과 자동 리뷰어의 지적은 코드·테스트·계약·Issue 범위와 대조한 뒤 판정한다.

## 1. 리뷰 채널 확인

GitHub의 리뷰 결과는 다음 위치에 있을 수 있다.

1. 정식 PR review의 요약 본문
2. 파일·라인에 연결된 inline comment
3. PR conversation의 issue comment

자동 리뷰어에 따라 수정 후 재평가가 정식 review가 아니라 conversation comment로 올 수 있다.
새 정식 review만 기다리지 말고 세 채널과 작성 시점을 함께 확인한다.

```bash
gh pr view <pr-number> --json headRefOid,reviews,comments
gh api repos/<owner>/<repo>/pulls/<pr-number>/comments
gh api repos/<owner>/<repo>/issues/<pr-number>/comments
```

repository에 자동 리뷰어가 없다면 사람 review와 required checks를 기준으로 같은 판정 절차를
적용한다.

## 2. 모든 지적의 판정

| 판정 | 적용 기준 | 처리 |
| --- | --- | --- |
| `수정 필요` | 실제 결함·회귀·보안·데이터·호환성·테스트 누락 | 코드와 테스트 수정 후 재검증 |
| `설명 필요` | 코드만으로 계약이나 의도가 불명확 | 필요한 코드·이름·주석·PR 설명 보완 |
| `오탐` | 전체 맥락에서 문제가 재현되지 않거나 계약과 맞지 않음 | 코드 유지, 적용되지 않는 구체적 이유 기록 |
| `보류` | 유효하지만 Issue 범위 밖이며 현재 완료 조건을 막지 않음 | 후속 Issue와 비차단 근거 기록 |

스타일 선호만으로 동작하는 코드를 바꾸지 않는다. 반대로 security, behavioral regression,
data consistency, error handling, compatibility, missing test는 우선해서 확인한다.

## 3. 수정 사이클

각 리뷰 지적마다 다음 순서를 지킨다.

1. 코멘트가 가리키는 줄뿐 아니라 호출자·상태 소유자·테스트·계약을 함께 읽는다.
2. 재현 조건과 영향 범위를 확인한다.
3. 네 가지 판정 중 하나를 선택한다.
4. `수정 필요`이면 최소 변경으로 결함을 고치고 가능한 회귀 테스트를 추가한다.
5. 관련 lint, typecheck, test, build와 UI 상태를 다시 검증한다.
6. 수정 commit을 push한다.
7. PR conversation에 지적 링크, 판정, 기술적 이유, commit SHA, 검증 결과를 남긴다.
8. 현재 HEAD를 대상으로 한 재평가를 기다리고 다시 판정한다.

코드만 push하고 어떤 지적을 해결했는지 남기지 않으면 리뷰 사이클이 끝난 것이 아니다.
`오탐`과 `보류`도 변경하지 않은 이유를 PR에 남겨야 한다.

## 4. 답변 예시

```md
### 리뷰 반영: <finding URL 또는 요약>

- 판정: `수정 필요`
- 확인: 빈 배열에서 첫 항목 접근 시 실제로 undefined 경로가 발생함
- 변경: empty guard와 회귀 테스트 추가
- 커밋: `<commit-sha>`
- 검증: `pnpm test`, `pnpm typecheck`, `pnpm build` 통과
```

오탐이라면 `변경: 없음`으로 쓰고 코드·타입·호출 계약상 문제가 성립하지 않는 이유를 적는다.
상세 형식은 [리뷰 답변 템플릿](./templates.md#리뷰-답변-템플릿)을 사용한다.

## 5. 현재 HEAD 기준 판정

- 오래된 commit을 대상으로 한 review를 현재 상태로 취급하지 않는다.
- inline comment의 line이 `null`이면 오래된 diff일 수 있다.
- fix push 뒤에는 formal review, inline, conversation을 다시 읽는다.
- 현재 HEAD를 명시적으로 재평가한 conversation 답변은 최신 신호로 볼 수 있지만, 그 내용도
  코드와 테스트로 검증한다.
- `CHANGES_REQUESTED` 또는 유효한 blocking comment가 남아 있으면 병합하지 않는다.

## 6. 리뷰가 오지 않을 때

리뷰가 없는데 통과한 것으로 간주하지 않는다. repository의 ruleset, CODEOWNERS, 자동 리뷰 App
설정을 확인한다. 특정 과거 저장소의 status check나 bot 이름을 추측해서 기다리지 않는다.

자동 리뷰는 사람 리뷰와 테스트를 대체하지 않는다. 권한·보안·데이터·접근성 변경은 적절한
담당자의 검토를 받는다.

## 7. 리뷰 완료 Gate

- [ ] formal review, inline, conversation을 모두 확인했다.
- [ ] 모든 지적에 판정이 있다.
- [ ] 유효한 차단 결함을 수정했다.
- [ ] 필요한 회귀 테스트를 추가했다.
- [ ] 현재 HEAD에서 관련 검증을 다시 실행했다.
- [ ] 각 지적의 처리 근거와 commit SHA가 PR에 남았다.
- [ ] 현재 HEAD에 유효한 blocking finding이 없다.
