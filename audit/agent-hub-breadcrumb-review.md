# Agent Hub Breadcrumb 확장 검증

검증일: 2026-10-20. Figma file `cUKHT2PdHjAKRXZlzulnO5`의 Breadcrumb `2427:25430`과
BreadcrumbSeparator `2427:25423`을 렌더링·get_design_context·읽기 전용 Plugin API로 확인했다.
결과는 [Breadcrumb](../docs/agent-hub/design/components/AgentHubBreadcrumb/README.md)와
[Separator](../docs/agent-hub/design/components/AgentHubBreadcrumbSeparator/README.md)의 솔루션 참조 계약이다.
공용 Breadcrumb를 변경하거나 같은 이름의 솔루션 스킬을 만들지 않았다.

## 공용 대비 차이

| 항목 | Agent Hub 확인값 |
| --- | --- |
| 글꼴 | 공용14/20 대신 Pretendard Regular16/24px·400·자간0 |
| 경로 색 | 상위·현재 모두 #1C1C1C. 공용 상위 기본 #757575와 다르며 현재 위치 의미는 유지 |
| 구분자 | #757575, slash·en dash·arrow. 공용은14/20px slash·#8F8F8F |
| 간격 | root/Item gap0, Separator 좌우 padding8. 공용 gap을 중복하지 않음 |
| 크기 | slash22×24, dash24×24, arrow약21.5575×24. arrow 내부 도형약5.5575×9·x8/y7.5 |
| 배경·선·그림자 | 보이는 root·Item·Separator에 없음·radius0. 보라색 set 테두리·radius5는 편집기 장식 |

Breadcrumb 전체는 slash/arrow 두 구성뿐이며 dash는 독립 Separator에만 있다. Item10개의 원본은 `2372:36927`이고,
각 마지막 Item의 separator Boolean은false다. slash4개는 중복 원본 `2372:36931`, arrow4개는 `2427:25428`에 연결된다.
원본 slash의 외부 semantic 변수와 실제 인스턴스의 로컬 override를 분리해 기록했다.

## 증거와 검증

- [실측](../docs/agent-hub/design/references/breadcrumb.figma.json)에 두 구성과 원본 Item/slash,
  [Separator 실측](../docs/agent-hub/design/references/breadcrumb-separator.figma.json)에 세 유형을 보존했다.
  독립 재귀 대조에서 총50노드·26styles·19instances의 치수·좌표·폰트·paint/alias·visibility·props·source 연결이 일치했다.
  직접 변수3개에서 alias closure7개·collection4개를 보존했다. 외부 원본의 Dark alias는 Agent Hub dark 검증이 아니다.
- 자동 생성 코드는 arrow Breadcrumb를 slash 텍스트로 반환했다. 렌더링과 Plugin API는 실제 arrow를 확인했으므로
  정확한 원본 SVG와 실측을 우선했다. 일반 Icon·TextButton·IconButton 인스턴스라고 기록하지 않았다.
- arrow는332byte 원본 full-frame SVG다. [자산 기록](../docs/agent-hub/design/references/breadcrumb.assets.json)의
  native21.5575×24·SHA-256이 일치한다. 자산 내부 padding을 외부 wrapper에서 다시 더하지 않는다.
- [조합 대조](../docs/agent-hub/design/references/breadcrumb-composition.json)는8개 구분자의 source·variant·geometry·
  glyph·표시 token을 독립 Separator와 비교해 모두match다. 임시 복사본의 arrow source를 slash로 바꾸면 오류가 검출된다.
  이 결과는 Figma 정적 조합이며 `runtimeVerified`와 `allStatesVerified`는false다.
- 공용 nav·상위 Link·현재 비상호작용/aria-current·hover/pressed 밑줄·focus·root/current 축약 보존·Menu 접근 계약을 유지한다.
  실제 라벨·폰트·구분자/overflow 폭으로 측정하며 기존 공용의 고정 측정 상수를 복사하지 않는다.
  Agent Hub 상태색·dark·overflow 버튼/메뉴 시각·실제 router/브라우저 렌더링은 미검증이다.
- 새 registry id2개로 Agent Hub 추가18·전체69종이다. CMP55·PaaS51과 솔루션 격리를 유지하고 공용off는catalog0이다.
  공유 `frontend.json`은draft, 제품 source/export는unmapped이며 token map을 추정해 채우지 않았다.
- `npm run verify`, `npm test`22개와 `git diff --check`가 통과했다. 공용스킬7개·역할/솔루션9조합·schema3개를 유지한다.
- 실제 TeamAI CLI0.27.0의 격리 init/pull에서 회사/공용/Agent Hub 문서·자산930파일이 원본과 byte hash까지 일치했다.
  Codex·Claude 공용스킬 각7개·공용hook을 확인했다. 공용 해제 후 각0개·공용hook 제외·회사/솔루션384파일 유지와
  제품 소유 스킬 보존을 확인했다. 실제 사용자 홈·원격 게시·제품 코드는 변경하지 않았다.
- `project.serengeti-cmp` 작업 트리는clean, HEAD `43648689aa3efef214118a69dde5eafdac30a338`을 유지했다.

문서·자산 전달은 실행 컴포넌트의 구현·시각·동작 일치 증명이 아니다. 소비 저장소의 실제 source/public export와
라우팅·축약·키보드·확대·긴 콘텐츠를 검증한 뒤 로컬 채택 설정을 기록한다.
