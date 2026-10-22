# AgentHubPicker 구조

## 두 조립을 구별하기

| 조립 | 확인한 자식 | 실제 원본 관계 |
| --- | --- | --- |
| agent-recommendations | 일반 채팅 한 행, 8px 구획 띠, 추천 제목, 에이전트9행, 스크롤바 그림, footer | PickerItem6개·AgentTypeChip4개가 든 직접 FRAME4행·section-header·Scrollbar·Footer |
| project-chat-search | Search32, 8px 구획 띠, '고정됨'6행 두 묶음, 마지막2행, footer | Search·navigation menu-item 원본/직접 FRAME·IconButton·section-header·Footer |

추천 목록의 assistant5행과 상단 chat1행은 실제 PickerItem 인스턴스입니다.
workflow3행·runtime1행은 유형 Chip 원본을 넣은 직접 FRAME이며 radius8입니다.
이 네 행도 화면상 picker 항목이지만 기본 PickerItem의 radius6을 덮어씌우지 않습니다.

두 번째 목록의 14행은 높이32px입니다. 실제 navigation-item source는
`2611:62440`(enabled), `2611:64577`(hovered)이고 직접 FRAME도 섞여 있습니다.
이름만 보고 공용 Menu나 PickerItem36 원본을 재사용한 것으로 기록하지 않습니다.
중복된 '고정됨' 제목·예시 문구·행 개수는 예시 데이터이며 제품 정보 구조나 필수 데이터가 아닙니다.

## 실제 재사용과 조립 차이

- Search는 `3142:116457`의 size32/focused/filtered=false 원본입니다.
  실제 인스턴스에서는 `filter=true`로 재정의하여 필터 액션이 보입니다.
  `filtered=false`는 적용된 필터 강조와 관련된 별도 상태입니다.
- menu-item 내부 보조 IconButton은 `2909:49139`의 ghost/default/20 원본을 사용합니다.
  일부 trailing은 opacity0이므로 실제 노출·focus 대상으로 취급하지 않습니다.
  chat의 대안 more FRAME 두 개는 gradient를 포함하지만 부모 opacity0이어서 보이는 fade가 아닙니다.
- footer는 두 조립 모두 `2627:62004`를 재사용합니다.
  추천 조립에는 '에이전트 찾기' branch가 있고 검색 조립에는 branch 자체가 없습니다.
  이를 원본 Boolean 속성이 있는 것으로 표현하지 않습니다.
- section-header는 `2627:6199`입니다. 공용 Menu header와 달리 높이 HUG16·왼쪽8px·12/16 Bold700입니다.
- 추천 조립의 Scrollbar source는 `2019:3708`입니다. 그려진 thumb만으로 동작하는 스크롤을 증명하지 않습니다.

## 공용 대비 경계

공용 Select는 폼 value 선택, Dropdown은 field와 Menu 조합, Menu는 명령 메뉴입니다.
이 picker에는 서로 다른 목적의 기본 선택·모델 선택·검색·필터·more·footer 탐색이 있습니다.
공용의 value/label 분리, native 버튼, focus·레이블 계약을 참고하면서 새 조립에 맞게 연결합니다.
공용 Menu의 radius4·행 padding16·첫 menuitem 강제 focus를 통째로 상속하지 않습니다.
Select 참조 코드의 키보드 지원 범위도 이 새 컴포넌트의 구현 증거가 아닙니다.

체크박스, 다중 선택, 전체 선택, 확인/취소 버튼, 제출·송신 API, trigger·닫힌 화면은 제공되지 않았습니다.
추가할 때는 제품 요구와 의미·상태·추가 검증을 로컬 채택 문서에 기록하세요.
