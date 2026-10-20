# 첫 사용자 재검증과 수정

검증일: 2026-10-20. 파일·링크 검사를 넘어 실제 TeamAI 배포와 문서 예제의 실행 계약을 재검증했다.
원본 제품과 사용자 AI 도구 설정은 수정하지 않았다. 실제 CLI의 쓰기는 독립 임시 HOME·제품·Git에 격리했다.

## 결과 판단

| 범위 | 결과 | 증거와 한계 |
| --- | --- | --- |
| 역할·솔루션 분리 | 통과 | [실제 npm CLI 6조합](./cold-start-cli.md)의 init/pull/SessionStart 및 전달 bytes 확인 |
| JDC 자동 유입 방지 | 통과 | PaaS·Agent Hub에는 CMP/JDC 자료 없음, backend에는 frontend 공용 skill 없음 |
| 첫 제품 문서 탐색 | 통과 | 저자 원본과 실제 배포 mirror, dependency closure 및 상대링크 검사 |
| 문서 예제 일부의 실행 | 수정 후 통과 | Button 실제 React/Radix DOM 24조합, Header/Tab 타입·구조·callback probe, CSS token 순서 검사 |
| 빈 제품의 기존 화면 자동 재현 | 제공 범위 아님 | 기본 extension은 draft/빈 mapping이며 실행 component/font/브랜드/제품 backend가 배포되지 않음 |
| 전체 51종의 동일 시각·상호작용 | 미검증 | 실제 제품 통합·전체 browser matrix·동일 조건 render 비교 필요 |

공통 계약을 읽고 적용할 수 있는 것과 제품 전체가 동일하게 실행·렌더되는 것을 구분한다.
이번 일부 예제 검증을 전체 UI의 실행 보증으로 확대하지 않는다.

## 발견하고 수정한 문제

| 문제 | 수정 |
| --- | --- |
| Button asChild에 여러 sibling을 직접 넣어 Slot 런타임 오류 | Slottable로 단일 child 계약을 연결하고 native/button-child/anchor-child 및 disabled를 정합화 |
| asChild가 disabled를 버리고 자식 action을 실행 | host의 disabled/aria-disabled/tab order/href와 activation guard를 정의. custom child는 props/ref 전달 책임 명시 |
| List의 storage fallback은 table, 문서의 solution fallback은 profile | 저장 선호 손상/미설정 모두 profile 정책으로 통일 |
| List 새로고침 IconButton에 미지원 label prop | 실제 aria-label로 연결 |
| Create Switch의 화면 라벨과 accessible name 미연결 | aria-labelledby로 연결 |
| Header의 controlled Tab 값·callback·disabled·접근성 이름 누락 | Header→Tab→TabsList/Trigger 전달. showContent=false API와 내부 panel 생략 정합화 |
| Header action API와 Tooltip 복원 억제 예제 불일치 | wrapper의 label→aria-label과 Tooltip 상태·focus 복원/새 pointer interaction 연결 |
| Header의 특정 breakpoint 고정 | 솔루션 narrowQuery/geometry adapter 입력으로 분리 |
| Tab/Header가 categorical blue Chip 전역 token을 accent로 덮어씀 | Tab count 전용 token으로 분리. purple accent·light/dark·역순 CSS 입력에서도 일반 blue Chip 보존 |
| Table focus outline이 미정의 token 사용 | 로컬 table focus token을 공통 border-primary에 매핑 |
| Detail의 최소 예제가 TS와 CSS를 혼합 | 유효 CSS로 바꾸고 markup class와 연결, CSS parser 검사 |
| InputField·closable Tab 부분 예제를 완전 구현으로 오인 가능 | 공개 계약은 보존하고 예제 제공/미제공 adapter·Props/helper 범위와 실제 검증 조건을 명시 |
| Finder의 .DS_Store를 미선언 docs namespace로 오판 | 실제 배포에서 제외되는 hidden metadata는 검사 대상에서 제외 |

## 새 첫 도입 경로

[첫 적용 가이드](../docs/frontend/first-use.md)를 추가하고 7개 skill의 문서 탐색 절차에 연결했다.
[배포 가능한 진단 스크립트](../docs/frontend/contracts/check-first-use.mjs)는 Node 표준 라이브러리만
사용하며 저자 저장소/npm dependencies 없이 mirror에서 실행한다. 빈 제품의 누락 입력을 보고하고,
입력 파일이 모두 있어도 runtimeParityVerified/visualParityVerified를 true로 만들지 않는다.

`mappingInputsPresent`는 선언된 파일·매핑의 존재만 확인한다. 이 도구가 schema 전체, export의
의미, 실제 렌더를 검증한다고 설명하지 않는다. macOS 임시 경로의 symlink에서도 CLI가 실행되는지
실제 child process로 검사했다.

## 실행 검증과 재현 방법

- `npm run verify`: 문서 링크·registry·필수 문서·공용 skill·6배포조합·확장 schema 검사 통과.
- `npm test`: 기존 5개 + 첫 도입/mirror 실행 2개 + categorical token 회귀 1개, 총 8개 통과.
- 스킬 7종의 skill-creator quick_validate 통과.
- 실제 CLI 사례 및 자산 snapshot은 [별도 보고](./cold-start-cli.md)에 기록한다.

[Button 예제 검증 도구](../tools/verify-button-reference.cjs)는 문서 코드를 직접 추출해 실행한다.
기존 dependency fixture를 읽기 전용으로 지정한다. 도구는 OS 임시 디렉터리에만 출력한다.

```bash
node tools/verify-button-reference.cjs --target-root . --deps-root /absolute/path/to/dependency-fixture
node tools/verify-header-tab-reference.mjs
```

Button 검증에서 사용한 버전은 TypeScript 5.9.3, React/ReactDOM 19.2.8, Radix react-slot 1.3.3,
jsdom 30.0.1, vanilla-extract/css 1.21.2다. aggregate radix-ui import는 동일 Slot API의 개별
package adapter로 연결했다. Icon과 CSS class는 역할 fixture이며 CSS 예제 자체는 별도 strict
typecheck와 vanilla-extract rule 수집으로 검사했다. 24개 host/icon/disabled DOM 조합이 통과했다.
jsdom은 실제 navigation·픽셀·font·layout·browser focus 전체를 대신 검증하지 않는다.

[Header/Tab 도구](../tools/verify-header-tab-reference.mjs)는 PATH의 TypeScript CLI와 최소
React/native/primitive 역할 fixture로 문서 예제를 타입검사하고 controlled/uncontrolled 전달,
panel 소유권·accessible name·Tooltip callback을 검사한다. 실제 Radix browser 테스트는 아니다.
`showContent=false`의 외부 tabpanel 관계와 closable adapter는 제품 runtime에서 별도 검증한다.

## 원본과 게시 상태

이번 재검증 시작 시 원본 HEAD는 `3f1da2942839cabf5a5ef56fd1f30d68fde7f4d4`, working tree는 clean이었다.
종료 확인에서도 같은 HEAD와 clean 상태였다.
원본의 코드·문서·Git 상태를 변경하는 명령은 실행하지 않았다. 런타임 검증에 필요한 설치 dependency만
읽었으며 fixture는 임시 디렉터리에 생성했다.

현재 production URL의 ref가 게시되지 않은 사실은 CLI 보고서에 기록했다. 임시 자산 snapshot의
실제 배포 통과는 원격 게시 완료나 Codex 앱의 자동 SessionStart 실행까지 확인했다는 뜻이 아니다.
