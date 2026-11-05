# 2026-11-05 컴포넌트 보드 갱신

[Figma components 보드](https://www.figma.com/design/cUKHT2PdHjAKRXZlzulnO5/?node-id=3074-101330)를 기존 공용·Agent Hub 계약과 비교했습니다.
공용의 의미·접근성·상태 소유권은 유지하고 Hub에만 다른 시각과 새로운 조합을 이 namespace에 추가합니다.
문서 전용 갱신이며 실제 제품 컴포넌트를 설치하거나 구현 완료로 표시하지 않습니다.

## 기존 계약에서 달라진 부분

| 계약 | 현재 확인한 차이 | 적용 판단 |
| --- | --- | --- |
| [Button](./components/AgentHubButton/README.md) | primary24·ghost32 각4상태 추가,44→52종 | 기존 Hub Button의 지원 표·치수 보강 |
| [IconButton](./components/AgentHubIconButton/README.md) | 33종, active는 검정10% | 앞선 토큰 갱신을 유지, 과거 파란 active로 되돌리지 않음 |
| [FilterChip](./components/AgentHubFilterChip/README.md) | 현재 샘플 폭45/49/53, 과거 선 포함 폭과 차이 | 현재 외곽과 과거 native 플래그를 구분, 기존 안정된 선 공간 채택 유지 |
| [FilterChipGroup](./components/AgentHubFilterChipGroup/README.md) | hug 샘플344→334px, wrap/scroll 외곽 유지 | 과거 중첩 실측을 보존하고 현재 내부 배치는 미확인으로 구분 |
| [Scrollbar](./components/AgentHubScrollbar/README.md) | 가로180×11·thumb160×4 추가 | 같은 ScrollArea 엔진과4px 두께·11px gutter 재사용 |
| [SessionPanel](./components/AgentHubSessionPanel/README.md) | no-runtime320×78·환경 안내 추가 | empty/filled와 구분하는 새 표시 상태 |
| [Divider](./divider.md) | 세로17×168·선1px·좌우8px 추가 확인 | 공용과 동일, 전용 id·래퍼 추가 없음 |
| [Dialog](./components/AgentHubDialog/README.md) | 독립 dim은 검정50%, Finder section heading은20/24 | 기존 overlay·heading part에 연결, 독립 공개 id 추가 없음 |
| [Icon](./components/AgentHubIcon/README.md) | 보드 source266개, 신규/이름 변경 포함 | 확보한 exact SVG만 추가, 미확보 source는 별도 표시 |

## 추가한 Agent Hub 계약

| 계약 | 공용과의 관계·사용 범위 |
| --- | --- |
| [SegmentedControl](./components/AgentHubSegmentedControl/README.md) | 공용 단일 선택 재사용, 라벨28/r8·아이콘40×32/r6 확장 |
| [Spinner](./components/AgentHubSpinner/README.md) | 공용 로딩 의미 재사용, Tiny1.5px와5종 native SVG 보존 |
| [RuntimeSelectItem](./components/AgentHubRuntimeSelectItem/README.md) | 기존 Select option 확장,40px·icon20·selected check16 |
| [RuntimeSelect](./components/AgentHubRuntimeSelect/README.md) | 기존 Select 엔진 확장,40px 트리거와 최대4개 목록 설명 |
| [SNBRuntime](./components/AgentHubSNBRuntime/README.md) | 기존 SNB 하위 계약·선택기·세그먼트를 묶는 새 작업공간 조합 |
| [FileCard](./components/AgentHubFileCard/README.md) | 공용 Card 의미와 선택/메뉴를 연결하는 새 파일 선택 카드,21종 |
| [Thumbnail](./components/AgentHubThumbnail/README.md) | 새 비율 이미지 primitive, 기존 ThumbnailCard 전체와 구분 |
| [ActionBar](./components/AgentHubActionBar/README.md) | 공용 일괄 작업 의미 재사용, Hub inverse 표면·크기별 내부 action |
| [CodeLine](./components/AgentHubCodeLine/README.md) | 코드 표시·fold 시각을 다루는 새 part, 편집기 엔진과 구분 |
| [IndentGuide](./components/AgentHubIndentGuide/README.md) | 코드 들여쓰기 장식선용 새 primitive |
| [FileTab](./components/AgentHubFileTab/README.md) | 공용 탭 의미와 파일 표시를 연결하는 Hub 확장 |
| [FileHeader](./components/AgentHubFileHeader/README.md) | 파일 제목·탭·조작을 조합하는48px 헤더 |
| [FileTreeEntry](./components/AgentHubFileTreeEntry/README.md) | 공용 Tree 의미를 연결하는28px 행·24px 배경 |
| [FileTree](./components/AgentHubFileTree/README.md) | 기존 Tree 탐색 의미를 사용하는 파일 계층 조합 |
| [FileViewer](./components/AgentHubFileViewer/README.md) | 경로42px·CodeLine·복사/확대·스크롤을 묶는 새 코드 뷰어 조합 |

별도 FileHeader는48px, FileViewer 자체 경로는42px, 기존 OutputViewer 헤더는34px인 서로 다른 원본입니다. 한쪽 수치를 다른 쪽에 일괄 적용하지 않습니다.
SegmentButton·ActionBar Action/IconAction은 각 부모의 내부 part로 문서화하며 별도 registry id를 늘리지 않습니다.
보드의 row-title·progress-alert 글자, 전시용 제목·배경은 컴포넌트가 아닙니다.

## 근거와 확인 범위

- [전체 metadata와 대조 범위](./references/components-refresh-2026-11-05.json), [원본 XML](./references/components-refresh-2026-11-05.metadata.xml)
- [기존 컴포넌트 변경 관찰](./references/existing-components-refresh.figma.json)
- [런타임·세그먼트·Spinner 관찰](./references/runtime-controls-refresh.figma.json)
- [카드·ActionBar 관찰](./references/cards-actions-refresh.figma.json)
- [파일·코드 관찰](./references/file-code-refresh.figma.json)
- [exact 자산 목록](./references/components-refresh.assets.json), [아이콘 확인 원장](./references/icons-refresh-2026-11-05.json)

전체 보드의 이름·크기·variant 목록을 확보하고 변경 후보·신규 조합의 context와 자산을 상세 대조했습니다.
`metadata-inventory` 표시는 목록·치수 조사 범위이며 기존 모든 컴포넌트의 paint·binding까지 재검증했다는 뜻이 아닙니다.
전체 native property ID·variable binding·prototype timing은 이번 도구 응답에서 확인되지 않아 새 값을 만들지 않습니다.
이전에 사용자 요청으로 채택한 모션·focus·scroll 동작은 정적 Figma만으로 되돌리지 않습니다.

아이콘 개별 조회 중 Figma 일일 한도에 도달했습니다. 현재 보드266개 source와 과거 canonical source,
실제 exact SVG를 회수한 source를 구분합니다. 미확보 아이콘을 비슷한 도형으로 그리거나 기존 자산으로 추정 매핑하지 않습니다.
기존 실측 JSON과 기존 SVG는 보존하며 현재 관찰값을 날짜별 근거로 추가했습니다.

## 제품 적용 시 확인

호환되는 실제 source/export부터 찾고 이 계약과 다른 부분만 adapter로 연결합니다. 새 공개 구현을 반드시15개 만들라는 요구가 아닙니다.
각 state·치수·긴 문자열·focus/keyboard·중첩 버튼·scroll·reduced-motion을 제품에서 검증한 범위만 로컬 매핑에 기록합니다.
문서와 자산을 받았다는 이유만으로 공유 `draft`나 `unmapped`를 변경하지 않습니다.

## MCP 원문 재대조로 보강한 차이

- FileCard의 실제 사진형은 전체 영역에 object-fit:cover를 적용합니다. header-content는 교차축 중앙, details는 세로 주축 중앙, preview는 양축 중앙 정렬입니다. 사진이 없는 독립 Thumbnail의 미확인 fit 정책과 구분합니다.
- FilterChip의 선택 non-disabled glyph는 #3B82F6이고 라벨은 #1C1C1C입니다. 현재 반환된 상태별 SVG8개의 paint를 확인한 범위와 숨겨진 slot의 실제 배치 렌더 미검증을 구분하며, 모든 glyph를 라벨 currentColor로 합치지 않습니다.
- ActionBar의 일반 action16px SVG는 선1px이며 icon-action20px는1.25px입니다. 문맥 변수1.25를16px export에 덮지 않습니다. 조합 action2의 비활성 glyph #8F8F8F와 숨김 more의 크기별 paint는 독립 part의 기본값과 구분합니다.
- FileTreeEntry는 showChevron=false여도24px 정렬 슬롯을 유지합니다. glyph·실제 펼침 조작만 생략하며 리프의 빈 슬롯에 버튼이나 focus를 남기지 않습니다.
- FileViewer actions 외곽 radius8과 개별 버튼 radius4를 구분합니다.
- SNBRuntime 선택 후 채팅 Header의 양쪽8px·filter/plus20 두 개·label-only32px 행·section gap4를 기본 SNB와 다른 override로 연결합니다. 두 상태 모두 오른쪽 런타임 모드가 선택됩니다.

런타임 모드의 오른쪽 glyph는 MCP 스크린샷의 folder/code와 생성 코드의 chat 재사용이 서로 다릅니다. [시각 증거와 한계](./components/AgentHubSNBRuntime/styles.md)를 함께 확인하며 native 크기·source/binding을 추정 매핑하지 않습니다. 재조회도 Figma 일일 한도로 실패하여 이번 재대조는 앞서 확보한 MCP 원문과 exact 자산에 한정했습니다.
