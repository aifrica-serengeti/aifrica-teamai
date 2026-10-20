# Dialog

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

이 문서는 **의존 문서와 함께** Dialog 컴포넌트를 상세 상태·시각 계약을 구현하기 위한
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

다이얼로그(Dialog)는 사용자의 주의를 즉각적으로 끌어야 하는 중요한 정보나 액션을
화면 중앙에 표시하는 모달이다. 주로 확인/알림, 폼 입력, 설정 변경 등에 사용한다.

**4 사이즈 + 확인 프로필:**

- **Small** — 400px 너비, auto 높이. 단순 알림·짧은 정보와 확인용 shell.
- **Medium** — 580px 너비, 최대 640px 높이. 폼·설정.
- **Large** — 720px 너비, 최대 640px 높이. 복잡한 폼·목록.
- **X-Large** — 920px 너비, 최대 760px 높이. 표·탐색 결과처럼 넓은 본문을
  담는 workflow dialog.
- **Confirmation profile** — 새로운 size나 별도 너비가 아니라 Small의 **400px** geometry를 사용하는
  의사결정 확인창이다. 생성·저장·수락·승인·거절·취소·삭제·동기화처럼 action 실행 직전의
  짧은 확인에 `size="small" profile="confirmation"`으로 공통 적용한다. Confirmation은 의미 있는
  description을 필수로 전달하며, 빈 문자열이나 빈 DOM wrapper는 공용 안전 설명으로 대체한다.

**기술 기반**: Radix UI `Dialog`를 기반으로 한 centered modal. 스펙
(navy 톤 8px 드롭섀도우, 4 size + confirmation semantic profile,
Header/Subheader/Body/Footer 분리, 스크롤
위치별 border + fade)으로 커스텀한다.

`DialogContent`의 `profile`은 `default | confirmation`이며 기본값은 `default`다. `closeLabel`은 닫기 Icon Button의 접근성 문구를 locale별로 주입하는 선택 prop이다.
생략하면 기존 기본값 `다이얼로그 닫기`를 사용한다.

`scrollFadeTone`은 스크롤 경계를 나타내는 상·하단 fade의 농도를 `default` 또는 `subtle`로 선택한다.
기본값은 기존 시인성을 유지하는 `default`이며, 어두운 코드 뷰어처럼 fade 대비가 과도한 본문에는
`subtle`을 사용한다.

> **Open panel(Sheet)과의 차이**: Open panel 은 화면 가장자리에서 슬라이드
> (slide 애니메이션, side prop), Dialog 는 화면 중앙에서 fade+scale. 위치·크기가
> 고정(side prop 없음). Dialog 는 항상 modal(scrim 필수).

---

## 공용 알림과의 상호작용

앱 공용 Notification viewport의 닫기·action 클릭은 Dialog 바깥 클릭 닫기에서 제외한다. 알림과 입력 중인 Dialog를 함께 유지한다.

모달이 열려 있어도 공용 알림 스택의 휠·터치 스크롤은 허용하며 배경 잠금은 유지한다.
