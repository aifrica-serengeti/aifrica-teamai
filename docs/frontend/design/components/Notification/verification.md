# Notification — 검증과 재현

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Notification 문서 인덱스](./README.md)

## 0. 재현 시작 전: 반드시 지킬 잠금 규칙

새 프로젝트에서 다음 순서로 구현한다. 하나라도 생략하면, 넓이가 부모에 늘어나거나
Toast가 일반 Alert/Card처럼 보이는 결과가 나온다.

1. 먼저 [Status](../Status/README.md), [Link](../Link/README.md), [Icon Button](../IconButton/README.md),
   [Button](../Button/README.md), [Scrollbar & ScrollArea](../Scrollbar/README.md)의 기존 구현을 연결한다.
   Notification 안에서 이 다섯 컴포넌트를 다시 만들지 않는다.
2. 이 문서의 [10. 디자인 토큰 정의](./styles.md#10-디자인-토큰-정의)를 전역 토큰에 넣고 light/dark를
   먼저 전환 가능하게 한다. local CSS에 hex를 복사하지 않는다.
3. [11. 복사 기준 구현](./implementation/README.md#11-구현-기준-코드)의 `Notification`과
   `NotificationContainer` 구조를 그대로 옮긴다. **React key는 Toast ID**여야 한다.
4. [12. 픽셀 규칙 CSS](./implementation/css.md#12-픽셀-규칙-css)의 selector와 값을 그대로 적용한다. 스타일 도구가
   vanilla-extract가 아니면 같은 selector/class와 선언으로 변환한다.
5. 마지막에 [16. 시각 회귀 체크](#16-시각-회귀-체크)의 항목을 light/dark, 좁은/긴 메시지,
   Toast 추가·자동 닫기·전체 닫기로 확인한다.

### 이 컴포넌트가 절대로 하지 않는 것

| 금지                                              | 이유 / 올바른 방식                                                                                       |
| ------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| root 또는 parent에 `width: 100%` 지정             | Inline은 **535px**, 나머지는 **360px** 고정 폭이다. 부모의 넓이와 무관하게 유지한다.                     |
| 각 알림을 별도 `Card`, `Alert`, `Dialog`로 감싸기 | border, padding, radius, shadow가 중복되어 Figma와 달라진다. `article`이 surface의 유일한 root다.        |
| Link 옆에 `<Icon />`을 별도로 렌더                | Linkable은 `<Link type="standalone" external />`만 사용한다. Link가 간격/색/상태를 소유한다.             |
| Status SVG/Spinner를 Notification 안에 복제       | `Status state="…" showLabel={false}`만 사용한다. loading은 `inProgress`로 매핑한다.                      |
| CSS `transition: all` 또는 즉시 배열 제거         | 종료 motion과 layout motion이 깨진다. 지정한 animation/색상 transition만 사용하고 exit 완료 후 제거한다. |
| Container에서 자체 scrollbar 구현                 | `ScrollArea type="hover"`를 사용한다. thumb, drag, resize 계산을 중복하면 기존 ScrollArea와 달라진다.    |

---

## 14. 실패 패턴과 즉시 수정

아래 결과가 보이면 기능 문제가 아니라 이 문서의 구조/스타일 계약을 위반한 것이다.

| 보이는 문제                                               | 흔한 원인                                                      | 고칠 위치                                                                                                     |
| --------------------------------------------------------- | -------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| Inline이 페이지 폭 전체로 늘어남                          | root 또는 wrapper에 `width:100%`, grid column stretch를 적용   | Notification root에 `535px` / `360px` width와 min-width를 적용하고, parent는 `align-items:flex-start`로 둔다. |
| 모든 종류가 파란 긴 Alert bar처럼 보임                    | `type` branch 없이 한 markup/surface를 재사용                  | `inline`, `inlineLineBreak`, floating branch를 JSX에서 분리하고 type별 surface CSS를 적용한다.                |
| Toast가 360px보다 넓거나 Container에 딱 붙음              | Container padding 16px 누락                                    | Container `392px`, ScrollArea content `padding:16px`, item `justify-content:flex-end`를 동시에 적용한다.      |
| Linkable 외부 아이콘이 뜨거나 간격이 넓음                 | 일반 Icon을 `<Link>` 옆에 삽입                                 | 일반 Icon을 삭제하고 Link 하나에 `type="standalone" external`만 전달한다.                                     |
| 닫으면 아래 Toast가 순간이동                              | `onClose`에서 즉시 삭제하거나 FLIP 없음                        | exit animation end에서 해당 ID를 삭제하고 wrapper `offsetTop` FLIP 200ms를 적용한다.                          |
| 새 Toast가 맨 아래에 생김                                 | `setToasts([...current, item])`                                | `setToasts(current => [item, ...current])`로 바꾼다.                                                          |
| Toast가 모두 동시에 5초 뒤 사라짐 / 전혀 안 닫힘          | 배열 하나에 timer 하나를 두었거나 effect가 rerender마다 재시작 | 각 Notification instance의 mount-time ref + timeout 하나를 사용하고, `key`를 ID로 둔다.                       |
| clear를 누르면 close button은 남거나 항목이 즉시 사라짐   | clear control 표시가 child count와 분리 / 배열 즉시 비움       | `hasNotifications`일 때만 button을 렌더하고 모든 child exit 완료 후 `onClear`에서 배열을 비운다.              |
| 스크롤 끝 fade가 잘못 나오거나 Scroll할 때 Toast가 움직임 | `getBoundingClientRect()`로 FLIP 계산                          | Scroll state는 ScrollArea callback, FLIP y 값은 `offsetTop`만 사용한다.                                       |
| 다크 floating Toast가 검거나 밝은 회색                    | `--surface`를 floating background로 사용                       | `--notification-floating-surface: #333333`, clear: `#282828`을 사용한다.                                      |

## 15. 검증 체크리스트

- [ ] Light에서 Inline 5개 state가 각각 535px 폭, 40px content height(Inline)와 2px accent로 보인다.
- [ ] Light에서 Inline-line break 5개 state는 360px 폭·최소 62px이며 title/body가 세로로 놓인다.
- [ ] 기본 제목은 한 줄 ellipsis이며 `titleOverflow="wrap"` 제목은 모든 type에서 좁은 폭·200% 확대에도 전체가 여러 줄로 보인다.
- [ ] Inline의 wrapped title은 최소 40px을 유지하면서 내용 높이만큼 surface가 늘어나고 root에 잘리지 않는다.
- [ ] Toast/Actionable/Linkable은 360px 폭, `surface + 1px subtle border + floating shadow`다. Inline subtle surface를 재사용하지 않는다.
- [ ] Linkable은 `type="standalone" external` Link component 한 개만 사용하며 별도 Icon DOM이 없다.
- [ ] close를 누르면 exit 200ms가 끝난 뒤 해당 ID 하나만 제거된다. 닫히는 동안 close는 disabled다.
- [ ] 실시간 Toast 두 개를 1초 간격으로 추가하면, 각각 생성 시점 + 5초에 독립적으로 닫힌다. 앞의 타이머가 뒤의 타이머를 초기화하지 않는다.
- [ ] 새 Toast는 기존 목록 **위**에 들어오며 `translateX(24px)`에서 진입한다.
- [ ] 삭제되는 Toast 아래 항목은 200ms `translateY` FLIP으로 위로 이동한다. scroll만 해도 FLIP이 실행되지 않는다.
- [ ] Container는 정확히 392×500px, inner padding 16px, item gap 12px이다. 항목이 하나도 없으면 우상단 clear도 없다.
- [ ] 앱 Provider의 Toast mount wrapper가 viewport `top:0; right:0; z-index:60`이고 wrapper 여백은 pointer event를 받지 않음
- [ ] Notification surface의 close/link/action만 pointer event를 받으며 뒤 page interaction이 투명 Container에 막히지 않음
- [ ] overflow일 때만 Container hover로 ScrollArea thumb가 보인다. top/middle/bottom에서 fade가 각각 아래/양쪽/위에만 보인다.
- [ ] 다크에서 floating surface는 `#333333`, clear surface는 `#282828`, error inline surface는 `#730303`이다.
- [ ] Error는 `role="alert"`, 나머지는 `role="status"`; close/clear에는 accessible name이 있다.

## 16. 시각 회귀 체크

다음 matrix를 캡처하여 이 문서의 고정 geometry와 비교한다. 이미지 한 장만 보고 Inline을 full-width로
만들지 않도록, 폭이 보이는 배경 또는 ruler를 함께 캡처한다.

| 장면                    | 준비                                      | 반드시 보일 결과                                                                                      |
| ----------------------- | ----------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| Inline info + link      | `type="inline"`, title/message/link/close | 535px surface 안에 2px blue accent, Status 20px, 한 줄 text, 우측 absolute close.                     |
| Inline-line break error | 2줄 이상 message + link                   | 360px, red subtle surface, title/body 세로, Link는 본문 문장 끝.                                      |
| Wrapped title warning   | 긴 title + `titleOverflow="wrap"`         | 제목 전체가 여러 줄로 보이고 surface 높이가 자연스럽게 늘어나며 본문·아이콘과 겹치지 않는다.          |
| Actionable warning      | title/message/action                      | 흰 floating surface, 16px padding, tertiary button이 본문에서 정확히 8px 아래.                        |
| Linkable info           | title/message/link                        | Link가 8px 아래, Link 내부의 trailing external-link icon.                                             |
| Toast live insert       | 10개 정적 + 새 1개 추가                   | 새 알림이 목록 최상단에서 오른쪽 24px 바깥→제자리로 들어온다.                                         |
| Toast auto-close        | 1초 간격으로 2개 live 추가                | 각 item별 생성 + 5000ms 후 별도 exit. 남은 item은 천천히 재배치.                                      |
| Container scroll        | 높이를 넘길 만큼 message/Toast 추가       | hover때만 thumb, top=bottom fade, middle=top+bottom, bottom=top fade.                                 |
| Clear                   | 2개 이상 있는 Container                   | close button 클릭 직후에도 items가 200ms 보이고, 모두 exit된 뒤 clear button과 items가 함께 사라진다. |
| Dark                    | document root에 `.dark`                   | Inline subtle colors와 `#333333` floating / `#282828` clear를 모두 확인.                              |

## 17. 새 프로젝트 전달 계약

다른 환경에 이 Notification을 전달할 때는 이 문서만 던지고 generic Alert로 대체하지 않는다.
다음 내용을 하나의 작업 단위로 전달한다.

- [foundation 문서](../../foundations.md)의 토큰/타이포그래피와 이 문서의 [10. 디자인 토큰 정의](./styles.md#10-디자인-토큰-정의).
- 이 문서의 의존 컴포넌트 5개와 최소 public API. 의존성이 준비되지 않았다면 adapter를 먼저 만든다.
- [11. 복사 기준 구현](./implementation/README.md#11-구현-기준-코드)의 ID key, per-instance timer, exit callback, `offsetTop` FLIP을 포함한 상태 로직.
- [12. 픽셀 규칙 CSS](./implementation/css.md#12-픽셀-규칙-css)의 fixed width와 Container padding. 반응형으로 임의 변환하지 않는다.
- [16. 시각 회귀 체크](#16-시각-회귀-체크)를 수행한 light/dark 결과. 코드 컴파일만으로 구현 완료로 판단하지 않는다.

Actionable의 기본 지속 표시와 명시적 autoClose의 5초 종료를 각각 검증한다. reduced-motion에서도 onClose가 실행되고 부모가 알림을 제거하는지 확인한다.

## 공용 스택 회귀 검증

- [ ] 서로 다른 페이지 영역/다이얼로그의 오류가 Container 하나에 표시되고 인라인 오류가 중복되지 않는다.
- [ ] StrictMode·일반 재렌더·콜백 변경에서 중복과 5초 타이머 초기화가 없다.
- [ ] 개별 닫기 후 같은 오류는 숨겨지고, 오류 해제 후 재발생 또는 새 내용은 다시 표시된다.
- [ ] 전체 닫기 도중 새 오류가 생기거나 이전 소스가 제거되어도 새 오류가 사라지거나 clear가 멈추지 않는다.
- [ ] 페이지 이동 시 이전 알림이 제거되고 그룹 onClear/onClose/action/link가 계약대로 실행된다.
- [ ] Dialog 입력 포커스와 내용은 유지된다. 재시도는 Dialog 안에 있고 Alt+Shift+N은 알림만 닫는다.
- [ ] 320px viewport·긴 메시지·light/dark·overflow scroll·투명 영역 클릭 통과를 확인한다.

자동 검증: `NotificationProvider.test.tsx`, application/project/user 목록과 project 등록/network 상세 회귀 테스트.
전환의 유지/변경 기준은 [API 오류 알림 조사](../../api-error-notifications.md)를 따른다.

### 공용 스택의 스크롤과 복구

- [ ] 150px 알림 3개가 쌓인 뒤 4·5번째를 추가해도 처음 상단에 있던 viewport가 하단으로 점프하지 않는다.
- [ ] 모달을 연 채 넘치는 알림을 휠·터치로 스크롤할 수 있고, 배경 휠은 차단되며 입력/포커스가 유지된다.
- [ ] 같은 동기화 실패를 반복하면 각각 5초 수명을 가지며, 빈 카드 목록에서도 알림이 표시된다.
- [ ] 호스트 작업 실패 후 복귀한 버튼에서 재시도할 수 있고, 여러 재조회 버튼은 알림 종료 뒤에도 대상을 구분할 수 있다.
