# Issue 작성과 등록

[← 작업 흐름](./README.md)

Issue는 독립적으로 검증하고 병합할 수 있는 결과 단위다. 구현을 시작하기 전에 목표와 완료
조건을 확정하고, 보통 1~2일 안에 끝낼 수 있는 크기로 나눈다.

## 1. Issue가 필요한 경우

- 사용자에게 보이는 기능 또는 동작 변경
- 버그 수정과 회귀 테스트 추가
- 공용 컴포넌트·토큰·아키텍처 변경
- 의존성·빌드·배포·개발 Workflow 변경
- 별도 검토가 필요한 문서·정책 변경

아직 결정되지 않은 아이디어를 바로 구현 Issue로 만들지 않는다. 결정 주체와 근거를 확인하고,
불확실한 내용은 질문이나 discovery task로 분리한다.

## 2. Issue 본문의 필수 요소

| 항목 | 질문 |
| --- | --- |
| 개발 목표 | 병합 후 무엇이 가능하거나 안전해지는가? |
| 배경·근거 | 왜 필요한가? 어떤 사용자·오류·요구에서 왔는가? |
| 작업 | 어떤 책임과 산출물을 변경하는가? |
| 완료 조건 | 제3자가 통과 여부를 예/아니오로 판단할 수 있는가? |
| 제외 범위 | 이번 Issue에서 의도적으로 하지 않는 것은 무엇인가? |
| 선행 조건 | API, 디자인, 다른 Issue 또는 정책 결정이 필요한가? |
| 검증 | lint·typecheck·test·build·시각 검증 중 무엇이 필요한가? |

“화면을 개선한다”, “코드를 정리한다”처럼 완료 여부를 판정할 수 없는 표현만 두지 않는다.
UI Issue에는 변경과 관련된 loading, empty, error, disabled, keyboard, light/dark, responsive
상태를 완료 조건에 포함한다.

## 3. Issue 계층과 Project

작은 저장소는 독립 Issue만으로 시작해도 된다. 큰 저장소에서 Epic을 사용한다면 다음을
권장한다.

- Epic은 결과 묶음, Sub-issue는 실제 실행 작업으로 구분한다.
- 계층은 `Epic → Sub-issue` 두 단계까지만 사용한다.
- bug·docs·chore는 필요하면 독립 Issue로 둔다.
- Type, Category, Priority는 제목이 아니라 label 또는 Project field로 관리한다.
- 일정은 Issue 제목이나 branch에 넣지 않고 Milestone·Iteration으로 관리한다.

GitHub Project는 선택 사항이다. 사용한다면 실시간 상태의 원본으로 사용하고 같은 상태를
Markdown에 복제하지 않는다.

## 4. GitHub CLI로 생성

먼저 [Issue 템플릿](./templates.md#issue-템플릿)을 임시 Markdown에 작성한 뒤 등록한다.

```bash
gh issue create \
  --title "[UI] 작업 결과를 나타내는 제목" \
  --body-file <issue-body-file>
```

Issue Form이 있는 저장소에서는 웹 UI 또는 Form이 요구하는 입력을 우선한다. `gh`가 없으면
GitHub 웹 UI에서 같은 본문으로 생성한다.

Project를 사용하는 경우 repository에 맞는 owner와 number를 확인한 뒤 생성된 Issue URL을
등록한다.

```bash
gh project item-add <project-number> \
  --owner <organization-or-user> \
  --url <issue-url>
```

Project scope 권한이 없으면 무리하게 인증 정보를 변경하지 말고 사용자에게 필요한 권한을
확인하도록 안내한다.

## 5. 중복과 선행 조건 확인

```bash
gh issue list --state open --search "<keyword>"
gh pr list --state open --search "<keyword>"
```

- 같은 결과를 목표로 하는 열린 Issue가 있는지 확인한다.
- 동일 코드 영역의 PR이 진행 중인지 확인한다.
- 선행 API·디자인·정책 Issue가 닫혔는지 확인한다.
- 닫힌 Issue를 새 작업처럼 다시 열거나 복제하지 않는다.
- 범위가 다르면 기존 Issue에 억지로 섞지 않고 새 Issue로 연결한다.

## 6. 착수 전 Gate

- [ ] Issue가 `OPEN`이다.
- [ ] 개발 목표와 완료 조건이 있다.
- [ ] 범위와 제외 범위가 충돌하지 않는다.
- [ ] 필요한 디자인·API·정책 결정이 완료되었다.
- [ ] 선행 Issue와 차단 조건이 해소되었다.
- [ ] 동일 영역의 다른 작업이 진행·리뷰 중인지 확인했다.
- [ ] 사용하는 경우 올바른 Project·Milestone·Iteration에 등록되어 있다.

Issue 기반 착수 요청이라면 누락된 완료 조건을 보완한다. 사용자가 이미 구현을 요청했고 이슈 생성이 필수가 아니라면 작업을 진행하고 필요 내용을 문서화한다.
