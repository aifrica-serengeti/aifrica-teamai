# Agent Hub Dialog 사용하기

Agent Hub의 예약 작업 편집과 에이전트 찾기를 구현할 때 읽는 안내입니다.
`frontend-common`과 `agent-hub`를 함께 선택하고 공용을 채택한 frontend 작업에서 적용합니다.
`inheritCommon: false`이면 이 catalog와 공용 문서를 자동 적용하지 않습니다.

| 비교 항목 | 공용 Dialog | Agent Hub 시안 |
| --- | --- | --- |
| 표면 | white·radius8·1px #DDD | #F6F7F9·radius16, 편집은 선 없음·찾기는1px #EEE |
| 제목 |20/24·600 |24/32·600 |
| 크기 |400/580/720/920의 크기 계약 | 편집580×554, 찾기1296×800의 두 조합 샘플 |
| 닫기 |32px host·20px glyph | legacy32px/r4 host·24px glyph |
| Footer | p24·gap8, medium32 버튼 | 편집은 p24·gap8과 기존 AHButton40·radius8·16/24, 찾기는 footer 없음 |
| 본문 | 공용 body 슬롯·scroll/fade | 편집 폼 또는192px rail·Search·3열 ItemCard 목록 |
| 유지할 동작 | modal·focus trap·제목 연결·Escape/바깥 클릭 정책·focus 복귀 | 같은 의미를 제품 primitive에 연결 |

Overlay 그림자 두 겹은 공용과 같습니다. 두 시안에는 scrim이나 전환 동작이 제공되지 않았으므로
스크린샷에 없다는 이유로 modal 차단·키보드·스크롤 잠금을 제거하지 않습니다.

1. [AgentHubDialog](./components/AgentHubDialog/README.md)에서 shell과 공용 비교를 읽습니다.
2. 사용할 본문에 따라 [예약 작업 편집](./components/AgentHubDialog/scheduled-task-recipe.md) 또는
   [에이전트 찾기](./components/AgentHubDialog/agent-finder-recipe.md)를 선택합니다.
3. [구현 연결](./components/AgentHubDialog/implementation.md)에서 기존 Dialog API와 padding·크기·close adapter를 확인합니다.
4. [검증](./components/AgentHubDialog/verification.md)으로 실측과 접근성·실제 동작을 확인한 뒤 제품 mapping에 source/export를 기록합니다.

두 root는 Figma `FRAME`입니다. 이름이 `Dialog / 리소스 디렉터리`인 첫 시안도 실제 내용은 예약 작업 편집입니다.
두 화면을 `size` variant 두 개나 `agent-finder` public export가 이미 있는 것으로 해석하지 않습니다.
기존 [DialogFooter](./components/AgentHubDialogFooter/README.md), [Button](./components/AgentHubButton/README.md),
[Search](./components/AgentHubSearch/README.md), [ItemCard](./components/AgentHubItemCard/README.md),
[Scrollbar](./components/AgentHubScrollbar/README.md)는 실제 하위 source와 조합 역할을 구분해 연결합니다.
Finder rail은 SNBItem 원본이 아니며 legacy close/편집 scrollbar도 기존 AH 기본형으로 일괄 교체하지 않습니다.

[실측](./references/dialog.figma.json), [변수](./references/dialog.variables.figma.json),
[자산](./references/dialog.assets.json)에 원본과 예외를 남깁니다. 제품 구현은 아직 `unmapped`이며
실제 CSS·상호작용·dark·작은 화면의 일치 여부는 제품에서 검증합니다.
