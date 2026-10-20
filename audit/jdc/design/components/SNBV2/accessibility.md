# SNB v2 — 접근성

> **미채택 JDC 관찰 profile**: 원본 shell의 상세 근거를 보존한 자료입니다. CMP 전체 또는 PaaS·Agent Hub의 기본 규칙이 아닙니다.
> 공통 문서에 대한 참조는 공통 계약을 사용하며, 여기의 색·자산·치수·export 존재 주장은 관찰 시점의 원본에만 해당합니다.


[← SNB v2 문서 인덱스](README.md)

## 8. 타이포그래피와 접근성

| 요소 | font |
| --- | --- |
| 1·2·3depth label | Pretendard, 14px / 20px / 500 |
| Section title | Pretendard, 12px / 16px / 400 |
| User name | Pretendard, 12px / 16px / 600 |
| User email / avatar initials | Pretendard, 12px / 16px / 400 |

모든 label은 한 줄 ellipsis다.

- Root는 aside landmark, navigation은 nav landmark를 사용한다.
- branch button은 expanded mode에서 aria-expanded를 갖는다. children group은 role=group, aria-hidden, inert를 open state와 동기화한다.
- leaf만 aria-current=page를 갖는다.
- Collapsed item은 aria-label을 갖는다. leaf에는 Tooltip, branch menu에는 accessible label을 준다.
- Native button disabled를 사용한다.
- Focus-visible은 primary 1px outline이다. root item은 offset 1px, nested item은 offset -1px을 사용한다.
- Menu와 Tooltip의 portal, Escape, focus management는 공용 implementation에 위임한다.


## 보조 메뉴 trigger 조합

custom utility trigger는 원래 button의 ref, disabled, label, event props를 보존해야 한다. 버튼을 다른 버튼 안에 넣지 않는다. 팝오버 소비자는 검증된 primitive로 aria-expanded/controls, Escape, 바깥 클릭, 닫힌 뒤 trigger focus 복귀를 제공한다. 기본 trigger를 그대로 반환한 collapsed leaf에는 기존 Tooltip을 유지한다.


## 계정 메뉴 슬롯

슬롯의 트리거는 accessible name을 가진 button이며 MenuTrigger asChild로 연결한다. 펼침·접힘 모두 키보드 진입, Escape 닫기, 닫힌 뒤 트리거 포커스 복귀를 제공한다. 다국어 이름은 userMenuLabel로 전달한다.
