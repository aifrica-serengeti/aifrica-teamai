# SNB v2 — 접근성

공용 묶음 적용 조건: inheritCommon: true를 채택하고 frontend-common 역할을 선택한 UI 작업에만
아래 계약을 적용한다. 공용을 끈 경우 제품 자체 지침을 따르며 공용 문서·스킬·primitive를 요구하지 않는다.

> CMP 확장 계약: 상태·공개 API·접근성을 원본에서 분리했다. 색은 역할 token으로 연결하고 브랜드·메뉴·계정 데이터는 현재 제품에서 제공한다. 치수는 해당 shell 세대를 채택할 때의 참조 baseline이며 제품에서 변경하면 근거와 검증을 기록한다. 과거 구현됨 표기는 현재 제품 구현의 증거가 아니다.

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
