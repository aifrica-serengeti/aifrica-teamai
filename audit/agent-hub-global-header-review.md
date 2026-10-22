# Agent Hub Global Header 독립 검증

검증일: 2026-10-21. 수집한 raw·meta·혼합 글꼴·변수 JSON4개를 정규화 자료와 읽기 전용으로 대조했다.
이 검토에서는 이 감사만 작성했다. 제품·공용 문서·Figma·Git은 변경하지 않았다.

[실측](../docs/agent-hub/design/references/global-header.figma.json)의 단일 COMPONENT `2611:62099`와
전체23노드·23스타일·실제 INSTANCE3개를 원본과 비교했다. 정규화 전후1,068개 비교 항목에서 불일치는0이다.
좌표·자식 순서·layout/sizing·padding/gap·constraints·clip/overflow·각 모서리·각 변 선 메타데이터·실제 paint·
텍스트·instance source/props·variable mode·reaction·transform을 확인했다.4개 TEXT의 세로 정렬도 meta 원본과 일치한다.

[변수](../docs/agent-hub/design/references/global-header.variables.figma.json)는21개 변수·4개 컬렉션의
값·mode·alias를 원본과 동일하게 보존한다. 직접 참조12개에서 alias21개로 닫히며 누락·불필요한 변수는 없다.
숨김 Divider의 외부 컬렉션에 Dark 값이 존재하는 사실을 보이는 Header의 Dark variant나 검증 결과로 확대하지 않았다.

| 확인 대상 | 확인 결과 |
| --- | --- |
| root |774×43·px16·SPACE_BETWEEN/CENTER·gap8·r0·F6F7F9·clip=true |
| 실제 선 | bottomWeight1이어도 strokes가 비어 있어 하단선 없음 |
| 서비스 로고 | FRAME138×21.70786476135254, clip=false·TEXT154×19·오른쪽181.91015625 |
| 혼합 글꼴 | `Cheetah `0..8 Poppins600·`Agent Hub`8..17 Poppins400·15.50561809539795/18.606740951538086 |
| 바로가기 | FRAME136×24·r4·px8/py4/gap4·white·inside1px DDD·Pretendard12/16/600 |
| 알림 | FRAME32×32·r6·무배경/무테두리, bell20×20·1.25px round stroke1C1C1C |
| 숨김 | 직접 subtree3개, 유효한 숨김 노드7개·INSTANCE3개 모두 숨김 조상 아래 |
| 상태 범위 | root props{}·variant=null·23개 reaction 모두[]·transform은 항등행렬과 평행 이동 |

로고 TEXT는138px wrapper 밖으로43.91015625px 넘는다. source box 사이428px와 실제 글자 넘침을 구분했다.
Poppins의 혼합 font weight를 단일 fontWeight로 덮거나 로고를138px에 축소·말줄임하지 않도록 문서화했다.
심볼은0066FF와 white이며 기존 제품 primary3B82F6나 메인180px BrandMark를 대신 쓰지 않는다.

실제 source는 숨김 Divider2019:118·Breadcrumb2019:121·내부 BreadcrumbItem2019:3679에만 있다.
보이는 서비스 로고·바로가기·알림·glyph는 FRAME/TEXT/VECTOR이며 기존 AH Button·IconButton·TextButton의
실제 인스턴스나 전체 상태 재사용이라고 기록하지 않았다. 숨김 chip도 INSTANCE가 아닌 FRAME이다.
숨김 자식의 local visible=true를 유효한 노출로 바꾸거나 DOM·접근성·Tab·gap에 포함하지 않는다.

[자산 manifest](../docs/agent-hub/design/assets/global-header/manifest.json)의 SVG3개·19,096 bytes는
각 SHA256·파일 크기가 내려받은 원본과 일치한다. XML의 native 치수/viewBox·paint·stroke와 실행/원격 참조 부재를 확인했다.
서비스 심볼 native21.7079 square와 source21.70786476135254 square, 바로가기 native16.002×16과 source/display16×16을
구분해 보존했다. 바로가기 vector x=-0.001953125를 자산에서 고치지 않았다. bell source와 SVG는20×20이다.
서비스 심볼 SVG는 심볼만 포함하며 sibling TEXT와 바로가기 label을 통째로 이미지화하지 않는다.

[계약7문서](../docs/agent-hub/design/components/AgentHubGlobalHeader/README.md)를 교차 검토했다.
실측·source identity·숨김 범위·native 자산 크기와 display slot·제품 API/CSS 제안이 일치한다.
native anchor와 button을 실제 동작에 따라 선택하고 알림 이름·focus·popup 의미를 채택한 제품에서 검증하도록 분리했다.
계정·tenant·검색·SNB collapse·임의 href·새 창·unread·CMP geometry를 가져오지 않는다.
공용 의미·접근성 참조는 공용을 채택한 작업에서만 적용한다. 소비 제품 source/export는 unmapped, 공유 설정은 draft다.
7문서의 로컬 탐색 링크20개·코드 fence·일본어 혼입 검사를 통과했고 추가 발견 사항은0건이다.

통합 검증 담당자가 실행한 `npm run verify`는 로컬 링크·공용51개+솔루션57개 계약·스킬7개·
역할/솔루션9조합·schema3개와 namespace 검증을 통과했다. `npm test`는52/52, `git diff --check`도 통과했으며
읽기 전용 CMP 작업 트리는 clean이다.

격리한 실제 CLI의 결과 JSON도 읽어 확인했다. 공용 채택 시1,329개 파일 전달과 Codex·Claude의 공용 스킬 각7개,
frontend 문서·공용 hook 포함을 확인했다. 공용 해제 시783개 파일이 유지되고 두 도구의 공용 스킬은 각0개,
frontend 문서·공용 hook은 제외된다. 두 경우 모두 제품 소유 스킬이 보존됐다.
통합 검증 담당자는 전달 파일의 바이트 일치도 확인했다. 결과 출력은 임시 실행 근거로 확인했으며 재사용 문서 경로로 등록하지 않았다.

이 결과는 수집 근거·문서·정적 자산과 계약 전달 검증이다. 실제 제품 동작·픽셀 일치·전체 상태·Dark·반응형·sticky·
글꼴 로드·focus clipping·popup·라우팅 실행은 검증하지 않았다.
소비 저장소 구현·제품 원본 변경·실사용 홈 설치·commit/push는 수행하지 않았다.
