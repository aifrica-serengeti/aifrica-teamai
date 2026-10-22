# Agent Hub SNB 독립 검증

검증일: 2026-10-21. 수집한 raw·변수·추가 텍스트 정렬과 정규화 자료를 읽기 전용으로 대조했다.
이 작업은 지정한 SectionHeader/Item 문서14개와 이 감사만 작성하며 제품·공용·Figma·Git을 변경하지 않았다.

[실측](../docs/agent-hub/design/references/snb.figma.json)은6개 전체 트리329노드와 전시 보드의 shallow recipe1개,
중복 제거 스타일125개·실제 인스턴스94개를 보존한다. 전체 원본15,334항목 대조에서 불일치0을 확인했다.
노드·자식 좌표·layout/sizing/constraints·clipping/overflow·선/corner·gradient 변환/stop·텍스트와 alias·
instance source/props·mode·빈 reaction·비항등 transform8개가 일치한다.
본문 TEXT41개의 textAlignVertical도 별도 원본과 일치한다. 보드의42번째 제목 TEXT는 전체 트리로 가장하지 않고 presentation ref로 구분했다.

| 전체 원본 | 노드 | 로컬 스타일 | 인스턴스 |
| --- | --- | --- | --- |
| NavIcon | 13 | 7 | 0 |
| NavItem | 17 | 9 | 4 |
| NavRail | 25 | 17 | 10 |
| SectionHeader | 24 | 16 | 7 |
| SNBItem | 65 | 26 | 10 |
| SNBPanel | 185 | 78 | 63 |

[변수](../docs/agent-hub/design/references/snb.variables.figma.json)는 직접 alias30개에서 전체52개·컬렉션3개로
닫히며 모든 값·mode·alias 단계에 누락이나 불필요한 변수가 없다. 검증 범위는 제공된 Light 참조다.
실제 runtime과 모든 상태의 검증값은 false이며 소비 제품 source/export는 unmapped다.

[SectionHeader](../docs/agent-hub/design/components/AgentHubSNBSectionHeader/README.md)는20px·제목12/16·#656B74이다.
enabled에는 제목만, hovered에는 collapse FRAME20/glyph16과 실제 ghost/default20 보조3개가 존재한다.
접기·action subtree 부재를 숨김 노드로 기록하지 않고 state를 expanded/collapsed 값으로 해석하지 않았다.
실제 root TEXT/count/collapsed API도 없으며 SessionSectionHeader의24px/count 계약을 가져오지 않았다.

[SNBItem](../docs/agent-hub/design/components/AgentHubSNBItem/README.md)은2depth×4state, 높이32·radius6·제목14/20이다.
1depth L8·2depth L36과2depth의 leading 부재·약180도 connector 변환을 보존한다.
trailing은 hover/pressed에만 있고1depth pressed의 more는 FRAME, 나머지 관측 more3개는 실제 ghost20 인스턴스다.
pressed/selected의 #F4와 title의 #1C가 같아도 서로 다른 의미 alias를 유지했다.

Panel의2611:62907은 hovered source/state에 selected fill alias135를 덮은 실제 예외다.
F8 gradient는 visible이며 그 안 more INSTANCE는 hidden이다. selected source로 바꾸거나 subtree 부재로 기록하지 않았다.
Item 문서에서 Panel definition 재확인 링크와 이 override를 유지하는 절차를 명시했다.

trailing gradient의 raw 변환 t=1−4.30769x는 CSS to-left76.7857%/82.7969%/100%와 일치한다.
Panel 하단 fade는 t≈.46696034y+.53303963이므로 bounds 안 alpha는 top .53303963→bottom1이다.
제안 CSS의 white alpha.53304→1은 이 범위의 등가 보간이며 생성 context의 양수114.15%를 복사하지 않는다.
보드의 white/radius100·40px 간격·제목은 전시용이다. Panel 내부255px와 행256px, 끝44px 잘림은 실제 원본 차이로 기록하고
접근 가능한 viewport·긴 문구·마지막 행·focus 보정은 제품 확장으로 구분한다.

[자산](../docs/agent-hub/design/references/snb.assets.json)31개 SVG·40,669 bytes의 SHA256·native 치수/viewBox·
리터럴 paint·실행/원격 참조 부재를 독립 확인했다. Section 전용 #656B74 네 glyph와 folder/more/FRAME-more/chat의
정확한 파일 링크를 문서에 연결했다. 숨김 glyph와 장식 gradient를 새 명령·공개 상태·전체 화면 자산으로 사용하지 않는다.

두 문서 묶음은 native leaf/link의 실제 aria-current, disclosure의 expanded/controls와 형제 more를 구분한다.
Menu/Tree 역할·추정 handler·포인터 hover 전용 기능을 강제하지 않으며 keyboard/touch/focus 노출은 제품 제안으로 명시한다.
공용 참조는 채택한 UI 작업에만 적용하고 source/export는 실제 소비 저장소 검증 뒤 매핑한다.
전체7계약49문서와 시작 안내를 교차 검토했으며 실측·API 제안·조건부 공용 참조와 의존성이 일치하고 일본어 혼입은0이다.
Panel의 border-box288px/오른쪽 선1px에서 absolute containing block287px와 fade left−6/right−10의303px 계산도 확인했다.
runtime의 행 FILL 보정·세로 viewport·focus/fade 정책은 원본256px·clip/NONE과 구분한 제품 제안이다.

실제 catalog loader는 Agent Hub103개(공용51+확장52), CMP55개, PaaS51개를 합성하고 공용 off에서는 각각0개다.
새7개 ID의 직접 의존성과 unmapped를 확인했으며 다른 솔루션 계약이나 Menu/Tree 의미를 추가하지 않는다.
새 검사 helper·테스트 파일은 추가하지 않았다. 기존 자산 검사에 SNB source·paint·native 크기·실제 조상 노출을 대조하는1개 검사를 추가했고,
기존 first-use 검사에는7개 ID의 의존성·다른 조합 비침투·CMP/PaaS 격리·공용 off 제외를 반영했다.

전체 `npm run verify`는 로컬 링크3,654개·공용51개+솔루션56개 계약·스킬7개·역할/솔루션9조합·schema3개와
namespace 격리를 통과했다. `npm test`는51/51 통과했다. `git diff --check`도 통과했고 읽기 전용 CMP 작업 트리는 clean이다.
7계약49문서와 시작 안내의 코드 블록·한국어 검사도 통과했다.

격리한 실제 TeamAI CLI에서 공용 채택 시1,315개 문서·자산 파일이 원본과 바이트 단위로 일치했고
Codex·Claude 각각 공용 스킬7개와 공용 hook을 확인했다. 공용 해제 시 회사·Agent Hub 파일769개가 유지되고
두 도구의 공용 스킬은 각0개, frontend 문서와 공용 hook은 제외됐다. 기존 제품 소유 스킬은 보존됐다.
기록은 `/private/var/folders/z9/556rb8p56sn7kfzn2x3rqh840000gn/T/aifrica-agent-hub-snb-delivery-r4oxj54s/results.json`이다.
이는 정적 계약·파일 전달 검증이며 실제 제품 SNB의 라우팅·키보드·스크롤 실행이나 source/export 구현 완료를 뜻하지 않는다.
제품 저장소 변경·실사용 홈 설치·commit/push는 실행하지 않았다.
