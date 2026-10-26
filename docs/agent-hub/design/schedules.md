# 예약 작업 페이지 조합

이 문서는 예약 작업 목록의 도구 모음·테이블·상태 표시를 기존 컴포넌트로 연결하는 화면 recipe입니다.
공용을 채택한 Agent Hub 작업에서 [상위 적용 조건](./README.md),
[FilterChip](./components/AgentHubFilterChip/README.md),
[Menu](./components/AgentHubMenu/README.md),
[IconButton](./components/AgentHubIconButton/README.md)와
`DOCS_ROOT/frontend/design/components/Chip/README.md`,
`DOCS_ROOT/frontend/design/components/Table/README.md`,
`DOCS_ROOT/frontend/design/components/Status/README.md`의 의미·접근성 계약을 함께 읽습니다.
새 Agent Hub 컴포넌트 id나 공용 Chip·Table·Status 전체 구현을 선언하는 문서가 아닙니다.

## 페이지와 도메인의 소유권

목록 query·편집 draft·질문 선택·mutation은 예약 페이지가, 고정 목업·약30ms 조회/변경·다음 실행 예측은 도메인이 소유합니다.
목록의 초기 조건은 page data에 두어 toolbar가 조회 Hook을 참조하지 않게 합니다. 질문 선택지 생성과 직접 입력 해석은
페이지의 순수 lib로, 요청 잠금·늦은 결과 차단·초안 수명은 전용 Hook으로 분리합니다.
폼 초안·저장 요청·저장 모델은 필드가 같아도 변경 이유가 다르므로 단순 alias나 DTO 상속으로 합치지 않습니다.
편집 초안의 생성·검증과 Calendar가 공유하는 날짜 변환은 page lib가 소유하며, 조회·편집 Hook이 markup 내부 helper를
알지 않게 합니다. mutation이 이전 조회를 무효화할 때에는 그 조회의 loading 수명도 함께 끝냅니다. 더 나중에 시작한
재조회는 자신의 세대에서만 원본·오류·loading을 갱신하고, 이전 조회나 실패한 mutation이 그 상태를 덮지 않게 합니다.
예약 Dialog를 재열면 첫 commit부터 최신 원본·초기 저장 상태를 표시합니다. 입력 중 원본 갱신은 초안을 덮지 않으며,
닫힘 모션에는 마지막 초안·저장 표시를 보존합니다. 열림·닫힘이 commit될 때 이전 저장 세대를 정리해 늦은 성공·실패가
다음 편집 수명에 상태나 닫기 동작을 전달하지 않게 합니다.

`cheetah-agent/agent-hub`에서 확인한 퍼블리싱 구현은 요청의 `chatId`를 실행 대상으로, 저장 모델의 `chatId`를 등록 대화로 구분하고
저장 모델의 `sourceChatId`에 실행 대상을 유지합니다. 내부 대화 명령 옵션은 서비스가 소유하며 공개 요청 DTO에 넣지 않습니다.
이는 실제 소스를 확인한 제품 구현 매핑이며 공용 UI가 예약 API나 페이지 상태를 소유한다는 뜻이 아닙니다.

목록과 후속 질문의 표현은 페이지 내부 조합이 필요한 값·명령만 받아 표시합니다. 템플릿 전체의 단축키 중재와
focus root는 질문 카드로 좁히지 않습니다. Session의 퇴장 DOM이 제거되어도 펼침 선택은 템플릿 수명에 남기고,
다른 템플릿으로 바뀔 때 초기화합니다. 클립보드 요청은 예약 저장·이동 명령과 별도 수명으로 관리합니다.
현재 제품의 닫기·경로 변경은 진행 중 복사를 무효화하고, 새 Dialog 선택은 안내도 지우며 재시도는 안내만 초기화합니다.

## 근거와 역할 구분

기준 화면은 Figma [예약된 작업 필터 적용 `2978:57085`](https://www.figma.com/design/cUKHT2PdHjAKRXZlzulnO5/?node-id=2978-57085)입니다.
날짜 프리셋의 `filter-chip-group`과 현재 적용 조건의 `Chip`은 서로 다른 인스턴스입니다.
제품 API·제거 동작·focus 수명과 아래 부분 구현 범위는 Figma 정적 화면과 구분합니다.

| 요소 | 역할 | 조합 |
| --- | --- | --- |
| 전체·오늘·내일·이번 주 | 날짜 조건을 선택하는 조작 | 기존 `AgentHubFilterChip` md32와 Group의 선택 계약 |
| 활성·어시스턴트·일반 채팅 | 이미 적용한 조건을 읽는 정보와 독립 해제 버튼 | 공용 Chip 의미를 따르는 neutral28 부분 recipe |
| 필터 아이콘 | 조건 Menu 열기 | 기존 IconButton32·Menu |
| 초기화 | 적용 조건 일괄 해제 | 기존 Button28 |
| 정렬 기준·선택값 | 정렬 Menu 열기 | 하나의 native trigger·기존 Menu |
| 카드·리스트 | 보기 모드 선택 | 기존 IconButton32 두 개 |

선택형 FilterChip에 X glyph를 붙여 정보 표시용 Chip과 같은 역할로 바꾸거나, PillChip의14/20 글꼴을
적용 Chip에 복사하지 않습니다. 기존 FilterChip·PillChip의 공개 API와 기본 치수는 유지합니다.

## 적용 조건 Chip

| 항목 | 화면 값 |
| --- | --- |
| 컨테이너 | 높이28px·최대 폭240px·radius50px·box-sizing border-box |
| 표면·선 | #F4F4F4·1px #DDDDDD |
| 패딩 | 왼쪽10px·오른쪽6px |
| label | Pretendard SemiBold12/16·600·#1C1C1C·한 줄·길면 생략 |
| 내부 간격 | label과 해제 button 사이 추가 gap0 |
| 독립 조작 |20×20px IconButton·14px glyph 슬롯 |

이28px 높이·radius50은 이 화면의 Chip 인스턴스 recipe입니다. 공용 Chip 기본 small20/medium24를
전역으로 바꾸지 않습니다. 화면 원본의 System icon은 circle-alert 형태의 임시 glyph입니다.
X14px와 ‘조건 해제’ 명령은 제품이 채택한 동작이며 원본이 실제 제거 API를 제공했다는 근거로 쓰지 않습니다.

소비 제품은 `AppliedFilterChip`처럼 좁은 정보 표시용 adapter로 이 recipe를 구현할 수 있습니다.
root는 일반 span이고 label 클릭에는 선택·토글 동작이 없습니다. 이 부분 adapter는 `onRemove`와 `removeLabel`을
필수로 받아 기존 IconButton20을 독립 button으로 조합합니다. 이름에는 ‘활성 필터 해제’처럼 대상과 목적을 공급합니다.
해제는 native click 한 경로에서만 요청하며 Enter/Space용 handler를 중복 추가하지 않습니다.

`disabled`는 실제 해제 버튼에 전달해 클릭·키보드를 차단하고 정보 span에도 비활성 의미를 제공합니다.
root 자체에 button 역할·tabIndex·selected 상태를 만들지 않습니다. 생략된 label의 전체 텍스트는 접근 가능한
정보로 남기며 hover Tooltip을 유일한 설명 수단으로 쓰지 않습니다. 해제 후 focus 대상은 목록 owner가 정합니다.
예약 페이지는 해제 버튼이 unmount되기 전에 필터 Menu trigger로 focus를 돌린 뒤 조건을 갱신합니다.
색상 전환은 [공용 모션](./motion.md)의200ms ease를 계승하고 동작 줄이기에서는 해제합니다.

이 부분 adapter가 보장하는 것은 neutral28·정보 label·독립 제거·disabled 범위입니다.
공용 Chip의9색×3variant×2shape×2size 전체 matrix·leading icon·다른 테마 API를 지원한다고 기록하지 않습니다.
실제 source/export를 확인한 소비 제품의 `commonAdapters`에 `contract: Chip`, `status: partial-contract`와
지원 범위를 기록합니다. 전체 Chip을 `implemented`로 승격하거나 공유 registry의 `unmapped`를 바꾸지 않습니다.

## 정렬과 도구 모음 간격

정렬은 높이32px·radius6px·좌우 padding12px의 단일 trigger입니다. 내부 label과 값 사이 gap은4px입니다.
‘정렬 기준’은 Regular16/24·400·#757575, 선택값은 SemiBold16/24·600·#1C1C1C를 사용합니다.
화면 원본에 chevron이 없으므로 별도 장식 chevron을 추가하지 않습니다. 아이콘 유무와 무관하게
`aria-haspopup`·실제 Menu 열림 상태·목적 이름과 keyboard/focus 계약은 유지합니다.

- 날짜 FilterChip 사이 간격은8px입니다.
- 필터 아이콘과 적용 Chip 묶음 사이는8px, 적용 Chip끼리는4px입니다.
- 오른쪽 검색·구분선·정렬·구분선·보기 모드 그룹 바깥 gap은0입니다. 보기 모드 두 버튼 사이는4px입니다.
- 세로 구분선은 높이32px·선1px #DDD이고 좌우8px를 포함한17px 슬롯을 소유합니다.
  부모 gap으로 같은 여백을 다시 더하지 않습니다. 이 값은 해당 화면 인스턴스의 세로 override이며
  [가로 Divider 비교](./divider.md)의 원본 확인 범위를 바꾸지 않습니다.

좁은 폭의 줄바꿈·검색 확장·Menu collision은 제품 layout owner가 관리합니다. 겹침을 해결하려고
날짜 프리셋·정렬 label·적용 Chip의 글자 크기를 한 규격으로 축소하지 않습니다.

## 카드의 독립 아이콘 버튼

[예약 카드](./components/AgentHubScheduleCard/README.md)의 하단 중지/재개는 기존 IconButton24에 원본 pause/play·disabled SVG를
연결합니다. 공용 버튼이 hover 검정5%·pressed10%·focus-visible·색상200ms를 소유하고 카드 전용 CSS는 위치·hit layer만 담당합니다.
상단 더보기의 기존 opacity150ms는 공용 background-color·border-color·color200ms와 함께 선언해 노출 전환이 색상 전환을
덮지 않게 합니다. 동작 줄이기에서는 모두 해제합니다. 이는 제품 조합·모션 채택이며 Figma의 원래 toggle FRAME 기록은 유지합니다.

## 테이블 정렬과 행 명령

리스트 화면의 배치는 Figma [예약 작업 List `2978:56137`](https://www.figma.com/design/cUKHT2PdHjAKRXZlzulnO5/?node-id=2978-56137)와
[List 가이드 `2978:59542`](https://www.figma.com/design/cUKHT2PdHjAKRXZlzulnO5/?node-id=2978-59542)를 함께 비교합니다.
실제 정렬·행 전체 편집·색상 전환은 아래 제품 채택과 공용 의미 계약을 연결합니다.

`table`·`thead`·`tbody`·`th scope="col"`·`td`와 읽을 수 있는 표 제목을 유지합니다.
이름·다음 실행·최근 실행 세 열만 내부 native button으로 정렬을 요청합니다. 상태 열과 작업 명령 열은
일반 `th`이며 정렬 button·정렬 glyph·`aria-sort`를 추가하지 않습니다. 실제 데이터 순서는 페이지 query owner가 갱신합니다.

정렬 가능한 세 제목은16px 아이콘 슬롯을 항상 예약하되 미정렬 기본 상태에서는 아이콘의 `opacity:0`을 유지합니다.
hover·keyboard focus에서 회색 방향 미리보기를 보이고 정렬 중이면 실제 방향을 표시합니다.
가이드의 enabled glyph는 내부 opacity0이므로 SVG가 존재한다는 이유로 기본 아이콘을 항상 노출하지 않습니다.
해당 `th`의 `aria-sort`는 `ascending | descending`, 나머지는 `none`과 일치시킵니다.
아이콘은 장식이므로 별도 Tab stop이나 중복 접근성 이름을 만들지 않습니다.
아이콘의 opacity·color·방향 transform은 공용의200ms ease로 전환하고 동작 줄이기에서는 생략합니다.
각 열은 기본 방향→반대 방향→해제로 순환합니다. 이름·다음 실행의 기본은 오름차순, 최근 실행은 내림차순이며
해제하면 페이지 기본 순서로 돌아갑니다. 다른 열을 선택하면 이전 열의 정렬을 교체합니다.

소비 제품의 `SortableTableHeader`처럼 공용 Table header의 좁은 부분 구현을 재사용할 수 있습니다.
`label`·`sortDirection`과 정렬 요청 callback·disabled·native th 속성을 연결하며 조회 결과·데이터 순서·행 선택 상태는
header 안에 두지 않습니다. callback이 없거나 disabled이면 실제 button 입력을 차단합니다.
실제 source/export를 확인한 뒤 `commonAdapters`에 `contract: Table`,
`status: partial-contract`와 header 범위를 기록합니다. 이 header만으로 전체 Table의 row/data/selection API·
페이지네이션·loading/empty·scroll owner까지 구현했다고 선언하지 않습니다.

행의 주 명령은 예약 편집 Dialog를 여는 native button 한 개로 제공합니다. 제목 button의 hit area를
행 여백·날짜·읽기용 상태 영역까지 확장하되 `tr`에 button 역할·Tab stop·동일 click/keydown handler를 더하지 않습니다.
더보기와 중지/재개는 주 명령 button 바깥의 형제 control이며 자체 hit layer에서 각 명령만 실행합니다.
Menu portal의 항목을 선택해도 행 편집이 겸발하지 않아야 합니다. 제목에 별도 ghost hover 배경을 더하지 않고
행 전체가 hover 표면을 공유합니다. 주 명령의 목적 이름과 유형·주기 설명을 연결해 보이는 메타 문맥도 보존합니다.

행 hover의 background-color·글자 color·필요한 선/그림자만 [공용 색상 모션](./motion.md)의200ms ease로 전환합니다.
`transition: all`·행 높이/폭 애니메이션을 추가하지 않습니다. 동작 줄이기에서는 전환을 해제하되
hover 최종 표면·focus-visible·disabled 입력 차단은 유지합니다. header를 body 행처럼 hover 처리하거나
각 셀마다 focus 테두리를 반복하지 않고 현재 행의 주 명령을 연속된 외곽으로 식별하게 합니다.

## 상태 열의 공용 Status 연결

예약 상태는 독립 선택 Chip이나 임의의 check/pause 아이콘 조합 대신 공용 `Status`의 읽기용 의미를 재사용합니다.
예약 업무 상태와 공용 시각 상태의 대응은 페이지 adapter가 정하고, 공용 Status가 예약 API나 중지/재개 명령을 소유하지 않습니다.
표시 label은 실제 예약 상태를 설명하며 Status 자체에 클릭·Tab stop·행별 토글 의미를 추가하지 않습니다.
도형은 공용 Status 문서의 검증된20px geometry와 의미 색상을 사용하고 label은 Regular14/20·gap4를 유지합니다.
직접적인 상태 제어는 별도 중지/재개 button이 담당합니다.

일부 시각 상태만 필요한 제품은 `commonAdapters`의 `contract: Status`, `status: partial-contract`로
확인한 source/export·지원 상태·접근성 범위를 기록합니다. 공용9상태 전체나 Spinner를 사용하는 `inProgress`까지
구현했다고 주장하지 않습니다. 실제 구현 전에 원본 SVG/path·색·크기를 대조하며 generic check glyph로 대체하지 않습니다.
label과 장식 glyph를 중복 읽지 않게 하고 상태 문구·공용 role 의미를 유지합니다.
정적 목록 상태와 실제 상태 변경 알림은 제품에서 검증하며 전체 Status 매핑을 `implemented`로 승격하지 않습니다.

현재 부분 Status가 지원하는 static 상태는 `normal | pending | success`입니다. 예약 페이지는 active→normal,
paused→pending, completed→success와 실제 예약 label을 전달합니다. normal은 primary 실선 원·체크와 투명 fill,
pending은 neutral 원·흰 세 점, success는 green 원·흰 체크를 공용 geometry로 표시합니다.
`showLabel=false`에서도 접근 가능한 이름과 `role=status`는 유지하고 glyph는 장식으로 숨깁니다.
`error | warning | inProgress | incomplete | notStarted | info`와 Spinner·제품 전체 dark 승인은 이 지원 범위에 포함하지 않습니다.

## 예약 Dialog 고급 옵션 펼침

‘고급’은 native button의 `aria-expanded`·`aria-controls`와 기존 공개 `AnimatedDisclosure`를 조합합니다.
높이의 열림·닫힘은 공용 기본250ms ease, chevron 회전은 같은250ms ease를 이 화면에 채택합니다.
이는 제품 채택 모션이며 Figma 정적 시안에서 실측한 animation 값이 아닙니다. 공용 Disclosure API·코드는 변경하지 않습니다.

닫힘 모션 중 본문 DOM은 남아 있어도 `aria-hidden`·`inert`로 즉시 조작을 막고, 빠르게 재열면 현재 높이에서
새 목표 높이로 이어집니다. 펼침 상태만 가까운 표시 owner가 관리하고 새 채팅·알림 switch 값은 부모 편집 초안에
보존합니다. 같은 Dialog에 다시 진입하거나 다른 예약을 편집하면 고급은 접힌 상태로 시작합니다.
본문 안에 있던 focus를 접기 trigger로 돌리는 책임은 공용 Disclosure에 맡기되 부모 Dialog가 닫힐 때는
이 trigger로 focus를 되돌리지 않아 Dialog의 기존 복귀 대상을 가로채지 않습니다. 동작 줄이기에서는 높이·회전을 즉시 완료합니다.

## 소비 제품에서 확인할 항목

- 날짜 선택 버튼32px와 적용 조건 Chip28px를 실제 render에서 구분하고, 적용 Chip의 표면·선·padding·12/16 글꼴을 대조합니다.
- 정렬 label400과 값600의16/24 글꼴,32px 높이, chevron 부재와 각17px 구분선 슬롯을 측정합니다.
- label 본체는 정보를 읽고 독립 X button만 해당 조건을 해제하는지, 날짜 toggle·정렬·초기화와 중복 실행되지 않는지 확인합니다.
- Tab·Enter/Space·focus-visible·disabled 차단·해제 후 focus·긴 label·좁은 화면·동작 줄이기를 확인합니다.
- partial adapter source/public export와 지원 범위를 로컬 registry에 기록하고 기존 FilterChip·PillChip 회귀를 검사합니다.
  공유 snapshot·자산·원본 API를 이 화면의 제품 채택값으로 덮어쓰지 않습니다.
- 카드의 상단 더보기·하단 중지/재개를 각각 hover·press·focus하고 공용 표면과200ms 색상 전환을 확인합니다.
  더보기 opacity150ms가 함께 유지되는지, 동작 줄이기에서는 노출·색상 전환이 모두 해제되는지 검사합니다.
- 정렬 세 열의16px 슬롯 예약·미정렬 기본 숨김·hover/focus 회색 미리보기·활성 방향·`aria-sort`·세 단계 순환과 상태 열의 비정렬 의미를 함께 검사합니다.
- 행 여백·날짜·상태 클릭과 Enter/Space는 편집만 열고 더보기·중지/재개·Menu 항목은 해당 작업만 실행하는지 확인합니다.
  native table 의미·주 명령의 단일 Tab 진입·메타 설명·행 외곽 focus와 제목의 중복 hover 부재를 검증합니다.
- 행 hover의200ms ease와 동작 줄이기 해제, 실제 Status source 재사용·지원 상태·색상/도형·읽기용 label을 대조합니다.
  stretched hit area와 행 전체 색상 배치는 실제 브라우저에서도 확인합니다.
- 고급 옵션의250ms 높이·chevron 전환과 빠른 닫힘/재열기를 검사하고 퇴장 중 본문의 Tab·입력 차단을 확인합니다.
  접기 전후 switch 초안 보존, Dialog 재진입·대상 변경 시 접힘, 내부 focus 복귀와 부모 Dialog 닫힘의 focus 비간섭도 검증합니다.
  동작 줄이기에서는 같은 최종 상태가 즉시 적용되어야 합니다.


## 예약 페이지 전체 조합 점검

페이지 전용 조합이 공용 상태 효과를 덮어쓰지 않도록 목록·작성·템플릿·연결된 채팅을 함께 검사합니다.
다음은 Figma의 정적 인스턴스와 구분되는 제품 채택 계약입니다.

| 영역 | 재사용·상태 책임 |
| --- | --- |
| 표 보조 아이콘 | 기존 IconButton24; opacity200ms와 background-color·border-color·color200ms를 함께 유지 |
| 필터 초기화 | 제거되는 버튼 대신 살아 있는 필터 trigger로 focus를 돌린 후 query 갱신 |
| 카드 Menu | 요청 중 실행·편집·공유·삭제 명령 모두 disabled; Menu 자체의 탐색·Escape·진입 focus 재사용 |
| 결과 읽지 않음 | 장식 dot와 화면 낭독용 문구를 분리; 빈 i의 aria-label에 의미를 의존하지 않음 |
| 빈 목록 재추천 | 원본 ghost28·12/16·600 Button 재사용; 별도24px/14px 버튼을 복제하지 않음 |
| 날짜·고급 trigger | 공개 TextButton과 ref·expanded·controls 관계; hover/pressed와200ms 색상은 공용 소유 |
| 프로젝트 선택 | 빈도와 같은 좁은 ScheduleEditorSelect 조합으로 MenuItem·Menu surface·Scrollbar 재사용 |
| 템플릿 질문 접기 | 기존 AnimatedDisclosure250ms; 닫힘 중 inert·aria-hidden과 focus 복귀 유지 |
| 템플릿 Session 패널 | 기존 presence 수명으로 열림·닫힘 모두 유지; width250ms·opacity150ms와 reduced-motion 처리 |
| 예약 완료 안내 | 기존 ProgressAlert의20px icon·14/20/600 문구·28px action 재사용; 필요한 단일 편집 명령만 전달 |

`ScheduleEditorSelect`처럼 페이지 안에서 재사용되는 조합의 CSS는 해당 조합이 직접 import합니다.
Dialog 전체 CSS가 먼저 로드되어야만 템플릿에서 정상 표시되는 암묵적 전역 의존을 만들지 않습니다.
프로젝트 선택 이후 사라지는 Select trigger에 focus를 남기지 않고 Composer로 복귀합니다.
템플릿 선택 행은 Figma hover #F8F8F8·pressed #F4F4F4를 Button의200ms 색상 전환으로 연결합니다.
선택한 행의 파란 면·번호 배지는 제품 채택이며 원본의 정적 hover 상태와 구분합니다.
Session을 Escape로 닫아도 별도의 예약 질문을 함께 건너뛰지 않습니다.
이는 도메인 상태·API를 공용 control 내부로 옮기는 변경이 아닙니다.

### 편집·삭제·검증과 focus

저장·삭제가 취소 불가능한 동안 Dialog `dismissDisabled`와 Footer `cancelDisabled`를 같은 pending에 연결합니다.
확인 버튼 `disabled`는 별개로 유지해 변경 없음/초기 폼의 취소를 막지 않습니다.
X·뒤로가기·Escape·backdrop·Footer 취소가 같은 잠금 정책을 따르고 실제 native disabled를 제공해야 합니다.
해당 optional 입력은 제품 호환 확장이며 Figma root의 원래 속성으로 기록하지 않습니다.

폼이 실제 변경된 뒤 유효하지 않다면 사용자가 저장을 시도해 오류를 확인할 수 있어야 합니다.
첫 오류로 focus하고 `aria-invalid`·`aria-describedby`로 관련 입력/시간/요일/월 필드와 오류를 연결합니다.
변경하지 않은 초기/기존 초안의 확인 정책은 유지하며 validation을 위해 저장 mutation을 먼저 실행하지 않습니다.
미저장 확인의 ‘계속 편집’은 이전 실제 입력 위치로 돌아가고 요청 실패에서는 초안을 보존합니다.

삭제 후에는 실제 Dialog의 close 완료를 기준으로 현재 보이는 목록 순서에서 인접 작업의 주 trigger로 focus를 돌립니다.
마지막 작업이면 빈 목록의 생성 CTA로 돌아갑니다. 임의 모션 timer로 복귀하거나
실패·route 이동 뒤 이미 다른 곳에 있는 사용자 focus를 가로채지 않습니다.

### 추가 검증 경로

카드·표·필터·빈 상태·새 예약·기존 예약·템플릿 두 단계·완료 후 연결된 채팅을 모두 방문합니다.
각 독립 action의 hover/pressed/focus와 disabled, Menu의 외부 trigger ↑/↓ 진입·초기 Escape·Tab,
Dialog 첫 열림/닫힘·고급·질문·패널의 양방향 전환과 reduced-motion을 확인합니다.
공용 컴포넌트 기본값·기존 두 action ProgressAlert·IconButton32 glyph20도 함께 회귀 검사합니다.
실제 코드와 export를 확인한 뒤 제품 registry/local mapping에 채택 범위만 기록하며 공유 snapshot·원본 자산은 보존합니다.


## 예약 후속 질문의 완료 요약

템플릿 대화의 page header는 `chat-header` 인스턴스3464:60700을 기준으로 공용 `AgentHubChatHeader`를 그대로 조합합니다.
높이48px·좌우16px 여백·제목16/24 Regular·하단1px #DDD 선을 유지하고, 제목 앞에 별도 뒤로가기 버튼이나 추가 들여쓰기를 두지 않습니다.
모바일에서도 같은 기본 여백을 사용합니다. 예약 목록으로 돌아가는 동작은 페이지 owner가 왼쪽 NavRail의 ‘예약 작업’ 재선택에 연결합니다.
우측 버튼은 실제 동작 콜백이 있는 공용24px IconButton만 표시하며4px 간격을 유지합니다.

Figma [예약 완료3464:56852](https://www.figma.com/design/cUKHT2PdHjAKRXZlzulnO5/?node-id=3464-56852)의
`detail` FRAME3464:56932를 기준으로 실행 방식·일정을 하나의 읽기용 카드로 조합합니다.
선택한 답을 별도 사용자 말풍선으로 만들지 않고 질문 ‘어떤 방식으로 실행할까요?’·‘언제 실행할까요?’와 각각 연결합니다.
도입 안내→요약 카드→완료 설명→기존 ProgressAlert의 간격은16px이며, 최초 사용자 요청과 추가 지침은 실제 사용자 발화로 유지합니다.

원본 카드의 폭776px은 대화 가용 폭 안에서100%로 조정합니다. 표면 흰색·외곽1px #DDD·radius12·padding12px16px,
label과 값의 Pretendard Regular14/20·간격4px를 사용합니다. 두 행 사이의 원본 h0 Vector는 #EEE1px 장식 선이며
양쪽12px 간격을 갖되 layout 높이를 더하지 않습니다. 기본 두 행 높이는138px이고 긴 답변은 줄바꿈해 높이를 늘립니다.

공용 `DetailField`의 읽기용 `DetailItem`을 좁은 부분 adapter로 재사용합니다. 부모 `dl` 안에서 한 field의 `dt/dd`를 묶고
빈 값 대체·0/false 보존·기본 생략 또는 명시적 wrap의 의미를 유지합니다. 이 카드의14/20·Regular 두 글꼴은
제품 recipe override이며 공용12/16 label·14/20 semibold value baseline을 전역 변경하지 않습니다.
실제 source/export를 확인한 제품 `commonAdapters`에 `contract: DetailField`, `status: partial-contract`로만 기록합니다.
이 읽기 부분이 children/text presentation·입력·편집·validation 또는 전체 DetailField family를 지원한다고 선언하지 않습니다.

요약은 저장 성공 후 현재 예약이 존재할 때만 표시합니다. 선택 초안·직접 입력 원문·다음 실행 시각을 새 상태로 복사하지 않고
저장된 frequency/date/time/weekday/month 필드를 기존 일정 formatter에 연결합니다. 일회는 ‘한 번 실행’과 저장 날짜·시간,
반복은 ‘반복 실행’과 실제 주기, 편집 후 수동이면 ‘수동 실행’·‘직접 실행할 때’를 표시합니다.
재시도·질문 닫기/재개는 기존 초안을 유지하고 실패·대기에는 완료 요약을 노출하지 않습니다.
예약 편집 이후 같은 원본에서 요약·완료 안내·Session을 갱신하며 삭제된 예약을 오래된 반환값으로 되살리지 않습니다.

최초 요약 카드의150ms opacity0→1·아래6px→원위치 전환은 공용 popup 모션에서 채택한 제품 동작이며 Figma 실측 모션이 아닙니다.
동작 줄이기에서는 즉시 표시하고 불필요한 Tab stop·button 역할을 추가하지 않습니다.
반복/일회/수동·직접 입력 정규화·실패 후 재선택·재시도·삭제·좁은 화면과 실제 DOM의 두 dt/dd를 검증합니다.


## 카드·목록 보기 전환

예약된 작업의 카드·표 renderer는 같은 단일 surface 안에서150ms ease fade-out→내용 교체→150ms ease fade-in으로 전환합니다.
이는 사용자 요청으로 채택한 제품 모션이며 Figma 정적 화면에서 측정한 값이 아닙니다. 최근 결과·제목·Toolbar·바깥 Scrollbar는
재마운트하지 않고 opacity0에서만 렌더러를 바꿉니다. 임의 높이 고정이나 빈 여백을 추가하지 않으며 내용이 짧아진 경우
실제 스크롤 범위를 넘는 위치는 viewport의 자연스러운 끝으로 제한됩니다.

페이지 query의 view는 즉시 갱신해 보기 버튼의 active/aria-pressed와 일치시킵니다. 가까운 DOM owner는 퇴장 중인 renderedView만
보존하고 목록·검색·필터·정렬 값을 복제하지 않습니다. query/view 또는 모션 선호가 바뀔 때만 전환하며 데이터 재조회·정렬·검색
갱신을 같은 보기의 반복 fade로 연결하지 않습니다. 처음 나타난 목록은 별도 전환 없이 표시합니다.

보기 trigger는 포인터뿐 아니라 AT/가상 click에서도 실제 focus를 먼저 받은 뒤 query를 바꿉니다. 사라질 목록 내부 focus의
대체 복귀를 처리한 다음 전환 surface를 inert·aria-hidden으로 차단하며 진입이 끝나면 해제합니다. body portal의 카드/행 Menu는
각 소유자가 퇴장 명령에서 닫고 메뉴 명령도 차단합니다. 실제 mutation pending과 표시 전환을 같은 상태로 합치지 않습니다.

빠른 원복·역전은 현재 계산된 opacity를 이어받아 진행합니다. 이전 animation의 완료 callback·취소는 새 보기나 unmount된 화면을
덮어쓰지 않아야 합니다. 동작 줄이기의 런타임 변경과 animation 미지원에서는 최신 선택을 즉시 표시하고 투명도·inert·aria-hidden을
모두 복원합니다. 공용 open/close presence를 카드/표 업무 상태의 새 owner로 만들지 않습니다.

퇴장 전 이전 renderer 유지·opacity0에서 교체·진입 후 입력 복구, 빠른 원복/연속 선택의 마지막 view, 완료 후 focus·portal 메뉴 닫힘,
필터/정렬·실제 Scrollbar DOM 유지, 전환 중 empty/route/template unmount와 늦은 완료 무효화를 검증합니다.
