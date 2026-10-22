# Agent Hub Dialog Footer 독립 검증

검증일: 2026-10-21. 수집한 원본·변수·정규화 자료와 기존 AgentHubButton, 공용 Dialog 문서 및
읽기 전용 CMP source를 비교했다. Figma·공용 문서·제품 source·Git을 변경하지 않았다.

[실측](../docs/agent-hub/design/references/dialog-footer.figma.json)의 단일 COMPONENT3151:20373은
17노드·10스타일·6인스턴스를 보존한다. 원본770항목을 대조해 불일치0을 확인했다.
위치·geometry·paint·모든 corner·폰트·숨김 참조·instance source/props·mode/reaction/transform이 일치한다.
[변수](../docs/agent-hub/design/references/dialog-footer.variables.figma.json)는 직접 alias8개에서
전체 변수13개·컬렉션3개를 보존하며 값·mode·alias closure에 누락이나 불필요한 변수가 없다.

| 영역 | 확인한 실제 값 |
| --- | --- |
| root | 580×88, FIXED/HUG, HORIZONTAL·MAX/MIN·NO_WRAP, 네 면24px·gap8 |
| root 시각 | fill/stroke/effect 없음, radius0·opacity1·clipping false |
| cancel | x378/y24·81×40, 실제 tertiary/enabled/40 source3025:25006 |
| confirm | x467/y24·89×40, 실제 primary/enabled/40 source3025:24940 |
| 공통 버튼 geometry | radius8, px16/py4, label16/24·600·x16/y8, border layout=false |
| 색상 | cancel white/#1C/inside1DDD, confirm #3B82F6/white·실제 선 없음 |

기존 AgentHubButton snapshot과 width/label override를 제외한52개 geometry/paint/font 항목도 모두 일치한다.
버튼을 복제한 별도 primary/tertiary 정의가 아닌 기존40px 계약의 조합이다.
공용 Dialog의 p24/gap8/우측 정렬은 유지하고 medium32/r4/font14/20 대신40/r8/font16/24를 적용한다.
한 행 높이는 공용80px 계산과 달리88px 실측이며580px는 전체 Dialog의 필수 폭이 아니다.
저장된 root strokeWeight1에 실제 stroke paint가 없어 높이90이나 시작점26을 만들지 않는다.

공개 속성은 cancel#3151:0 Boolean=true 하나이며 cancel 인스턴스 visible에만 연결된다.
취소 표시를 open·dismiss 허용·요청 취소·pending과 같은 값으로 취급하지 않는다.
label·callback·disabled·form 제출 API는 제품 제안이고, confirm 클릭이 성공이나 자동 닫힘을 뜻하지 않는다.
모든17노드의 reactions는 비어 있다.

6인스턴스 중4개는 hidden plus20이며 자식 Vector.visible=true도 숨김 조상 아래에서는 표시되지 않는다.
keycap Boolean=true와 실제40px keycap subtree 부재를 구분했다. visible/new asset은 모두0이며
아이콘 공간·Esc 힌트·전역 단축키를 추가하지 않는다.

읽기 전용 CMP는 DialogContent의 footer?:ReactNode를 이미 p24/gap8의 내부 footer에 렌더한다.
공용 예시의 독립 DialogFooter export와 같다고 가정하지 않고 action만 전달하거나 기존 host를 adapter로 연결한다.
새 padded footer 중첩·form 중첩·button onClick과 form onSubmit의 중복 요청을 막는 문서 경계가 적절하다.
모달·포털·초기 focus·trap·Escape/외부 닫기·복귀는 실제 Dialog owner와 공개 API가 소유한다.

[7개 문서](../docs/agent-hub/design/components/AgentHubDialogFooter/README.md)와 registry/index 연결도 확인했다.
직접 의존은 Dialog+AgentHubButton이며 loader 결과는 Agent Hub45개·공용 포함96개·공용 off0개다.
공용 계약은 채택한 UI 작업에만 적용하고 source/export는 unmapped, 공유 patch는 draft를 유지한다.
추가 핵심 오류는 없으며 기존 다른 footer 계약을 일괄 교체하지 않는다.

cancel=false·hover/pressed/disabled/loading/negative/dark·긴 문구·반응형·form/요청/닫힘·전체 Dialog는
이번 Light 단일 샘플의 확인 범위가 아니다. runtimeVerified와 allStatesVerified는 false다.
새 검사 helper·테스트 파일·보이는 자산은 추가하지 않았다.

전체 `npm run verify`는 로컬 링크3,469개·공용51개+솔루션49개 계약·스킬7개·역할/솔루션9조합·schema3개와
namespace 격리를 통과했다. `npm test`는50/50 통과했고 `git diff --check`와 읽기 전용 CMP 작업 트리 clean도 확인했다.
기존 first-use 검사에서 새 footer의 직접/전이 의존성·다른 조합에 자동 추가되지 않음·CMP/PaaS 격리·공용 off 제외를 확인했다.

격리한 실제 TeamAI CLI로 공용 채택 시1,231개 문서·자산 파일의 바이트 일치와 Codex·Claude 각각 공용 스킬7개·hook을 확인했다.
공용 해제 후 회사·Agent Hub 파일685개가 유지되고 공용 스킬은 각0개, frontend 문서와 공용 hook은 제외됐다.
기존 제품 소유 스킬은 보존됐다. 이 결과는 파일 전달 검증이며 제품의 실제 footer 동작·시각 검증과 구분한다.
CLI 기록은 `/private/var/folders/z9/556rb8p56sn7kfzn2x3rqh840000gn/T/aifrica-agent-hub-dialog-footer-delivery-ep1ldzdr/results.json`이다.
원본 제품 변경이나 commit/push는 실행하지 않았다.
