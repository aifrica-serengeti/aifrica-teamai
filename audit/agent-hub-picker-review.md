# Agent Hub Picker 확장 검증

검증일: 2026-10-21. Figma file `cUKHT2PdHjAKRXZlzulnO5`의
`2627:61977`, `2627:62004`, `3016:104794`, `2978:58104`를
get_design_context 스크린샷과 읽기 전용 Plugin API로 확인했다.
공용51개·기존 Agent Hub22개에 이 복합 Picker 계약은 없어 세 계약을 추가했다.

- [Picker](../docs/agent-hub/design/components/AgentHubPicker/README.md): 두 완성 FRAME 조립과 제품 연결·신규 개발.
- [PickerItem](../docs/agent-hub/design/components/AgentHubPickerItem/README.md): agent/chat × enabled/hovered 네 구성.
- [PickerFooter](../docs/agent-hub/design/components/AgentHubPickerFooter/README.md): 키보드 힌트·선택적인 탐색 조작.

## 실측과 원본 재사용

| 항목 | 확인한 내용 |
| --- | --- |
| Shell | white/#DDD1 INSIDE/r24/Mid 두 겹, 추천776×455·검색532×536 샘플 |
| Item | 샘플758×36·r6·px8/py6·leading gap8·title14/20/600·hover#F8F8F8 |
| Footer | 샘플768×39·top1#EEE·#F8F8F8·px12/py10+contentpx4·keycap18·Divider17×14 |
| 추천 조립 | chat1+assistant5 실제 Item 인스턴스, workflow3/runtime1은 Chip을 넣은 r8 FRAME |
| 검색 조립 | Search32 focused·filter=true override, 14행은32px navigation 원본/FRAME |
| 실제 시각 차이 | 추천 구획 띠F4/EEE semantic, 검색 F2/E3 raw; source hovered인 검색 행도 fills=[] |
| 레이아웃 한계 | clips=true/overflowDirection=NONE, footer absolute39·추천 body17px 겹침·검색 마지막 섹션 shell 밖 |

[실측](../docs/agent-hub/design/references/picker.figma.json)은 네 roots·309nodes·120개 deduplicated styles와
73instances, 실제 per-edge stroke·gradient·image paint·node variable modes·원본 source를 보존한다.
직접 변수30개에서 alias closure51개·collection6개를 기록했다. 모든 변수 모드의 보존은 전체 모드 검증을 뜻하지 않는다.

실제 Search는 size32/focused/filtered=false source3142:116457이며 filter Boolean만true로 재정의됐다.
표시 여부와 필터 적용 강조를 분리했다. 기존 AgentHubSearch 계약을 조합하며 독립 IconButton 원본이 아닌
Search 내부 action/filter FRAME을 버튼 source 재사용으로 기록하지 않았다.
navigation-item의 source enum만으로 instance paint를 복원하지 않는다.
대안 chat trailing gradient 두 개는 부모 opacity0으로 보이지 않는다. 투명한 보조 조작을 focus 대상으로 남기지 않는다.

추천 Footer에는 링크 branch가 있고 검색 Footer에는 branch 자체가 없다.
원본 Boolean이 존재하거나 visible=false branch를 실측했다고 기록하지 않았다. showLink는 제품 제안 API다.
Footer hint는 presentational kbd·설명이며 전역 listener나 별도 입력 상태를 소유하지 않는다.

## 자산과 구현 의미

[자산 기록](../docs/agent-hub/design/references/picker.assets.json)에 기존 정확한 source16px glyph5개와
제공 파일7개를 연결했다. 새 파일은 모델 sample PNG와 model/footer chevron·viewport 밖 folder·opacity0 대안 more·실제 회색 filter/more SVG다.
기존 filter/more16은 같은 source의 도형이지만 기본색#1C1C1C라서, 실제#757575용 제공 파일을 effectiveAssetPath로 구분했다.
PNG200×200 원본의 SHA-1은 Figma imageHash `0b5fbd3f1bca7be7331d9daab6d31284a768bfc4`와 일치하고
표시 slot은20×20이다. 모델 데이터 슬롯을 Agent Hub 고정 브랜드나 Qwen 전용 정책으로 만들지 않았다.
SVG는 native16×16이며 supplied 원본을 수정·재그림·경로 추출하지 않았다. 임시 asset URL을 runtime 참조로 저장하지 않았다.

공용 Select/Dropdown/Menu는 의미·레이아웃·키보드 지원 범위가 다르다.
모델·filter·more가 포함된 복합 panel을 단일 button/listbox option으로 감싸지 않도록 native sibling controls를 안내했다.
dialog/modal/listbox를 Figma FRAME의 의미로 확정하지 않고 제품이 선택한 한 focus 모델로 연결한다.
선택·query·모델·권한·draft/IME·agent/project·전송의 소유권을 분리하고 자동 송신·초기화·route를 발명하지 않았다.

정적인 clipping/scrollbar 그림을 실행 스크롤 증거로 취급하지 않는다.
제품 구현은39px Footer 공간과 실제 scroll viewport를 확보하고 마지막 항목·focus outline을 노출하도록 안내했다.
샘플 폭·구획 제목·목록 개수·명령은 제품 고정 계약이 아니다. 제품 source/export는 모두unmapped,
공유 frontend patch는draft, 공용 스킬7개와 공용 선택/해제 경계를 유지한다.

원본 `project.serengeti-cmp`와 Figma 파일은 수정하지 않았으며 제품 source를 생성하거나 홈 스킬로 설치하지 않았다.

## 최종 검증

- 독립 에이전트가309개 노드 전체를 raw와 재귀 대조했다. 루트 canvas x/y만 제외하고 자식 좌표·텍스트·속성 참조,
  실제 인스턴스 source/variant/properties, 모든 node mode,120개 style의 layout·edge별 선·gradient/image paint·
  변수 alias·text/effects가 일치했다.73instances·변수51개·collection6개도 일치했다.
- PickerItem·Footer는 각각 다른 에이전트가 작성했고 부모7문서는 두 에이전트가 독립 교차 검토했다.
  실제 구현과 제안 API, 동작 owner·중첩 target·IME·focus·clipping의 경계에 추가 기술 불일치는 없었다.
- [조합 대조](../docs/agent-hub/design/references/picker-composition.json)는 실제 Item6·r8 FRAME4·32px navigation14·
  Search·Footer2·Mid shell2·ghost20 IconButton4 및 자산12개를 비교했고 issues는0이다.
  `runtimeVerified`와 `allStatesVerified`는false다. 자산 합계25,189bytes의 치수·해시·실제 색상도 확인했다.
- 잘못된 Item36 원본 연결·r8 유실·필터 표시 해제·투명 gradient 노출·footer의 전체 edge border 변경을 검출했다.
  PNG checksum까지 함께 바꾼 치수 변조도 검출했으며 임시 fixture는 제거했다.
- `npm run verify` 통과: 링크2837개, 공용51+솔루션29개 계약·의존성, 스킬7개,
  역할/솔루션9조합, schema3개와 namespace 격리를 확인했다. `npm test`는33/33 통과했다.
- 격리한 임시 제품에서 실제 `teamai-cli@0.27.0` 배포를 검증했다. 공용 채택 시 문서·자산1008개가 원본과
  byte 단위로 일치했고 Codex·Claude 각각 스킬7개와 공용 hook을 받았다.
  해제 후 회사·Agent Hub 문서·자산462개를 유지하고 공용 frontend 문서·스킬·hook은 제외했다.
  양쪽 도구의 제품 전용 스킬은 보존했다. 실제 홈이나 제품 저장소에는 설치하지 않았다.
- loader의 Agent Hub catalog는76개(공용51+추가25), 공용 해제0개이며 CMP55·PaaS51에 새 Picker id가 섞이지 않는다.
  `git diff --check`와 읽기 전용 원본 상태 검사도 통과했다. 이 변경은 커밋·push하지 않았다.
