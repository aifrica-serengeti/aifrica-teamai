# Agent Hub Flyout 확장 검증

검증일: 2026-10-21. file `cUKHT2PdHjAKRXZlzulnO5`의 shell3010:23522,
header3005:23089, footer3005:23094, item3005:23146을 Figma MCP screenshot·design context와
읽기 전용 Plugin API로 확인했다. 사용자는 내부를 새 Figma 모양으로 구성하고 기존 Menu 모션을 같게 사용할 것을 요청했다.

- [Flyout](../docs/agent-hub/design/components/AgentHubFlyout/README.md)
- [Header](../docs/agent-hub/design/components/AgentHubFlyoutHeader/README.md)
- [Footer](../docs/agent-hub/design/components/AgentHubFlyoutFooter/README.md)
- [Item](../docs/agent-hub/design/components/AgentHubFlyoutItem/README.md)
- [Menu 모션 채택](../docs/agent-hub/design/components/AgentHubFlyout/motion.md)

## 원본·실제 조합·한계

| 항목 | 확인한 내용 |
| --- | --- |
| shell |280×398/max398,white/#DDD1 INSIDE/r12/py4/Mid,cliptrue/overflowNONE |
| Header |원본280×54 p8/gap2/title-count gap6, 실제278×54와 title/count/meta 문자열 override |
| Footer |원본280×29/pb4/no-fill, 실제278×33/pb8/white/absolute y365 |
| items |실제16개 default source 인스턴스 중11표시·5숨김, divider9+11×28=317 |
| viewport |items y59..376과 footer y365..398가11px 겹침, 실행 scroll 증거 없음 |
| matrix |item4 + folder2 + folder-open2 + child2 =10종, kind4×state4 전체16종 아님 |
| 행 |28px·font12/16/400, itempx8·folderL8R16·childL56R16 |
| 상태 |hoverF8,itempressed검정10%,selectedEBF3FF; selected label1C 유지 |

[실측](../docs/agent-hub/design/references/flyout.figma.json)은 full hidden child를 포함한231nodes,
45개 interned styles·47instances·node modes·모든 source/property/override를 보존한다.
직접 변수15개에서 alias closure25개·collection5개를 기록했다. 숨김5행 file glyph는 외부 semantic alias를
사용하지만 현재 Light 색757575와 선1.25는 같다. 결과 색과 실제 alias identity를 구분했다.

shell의 componentPropertyDefinitions getter가 read-only operation 오류를 반환해 전체 정의는 수집하지 못했다.
null/read status를 유지하며 빈{} 또는 속성 부재로 해석하지 않는다. 생성 context의footer 기본true와 실제 자식의
visible binding footer#3010:0은 별도 관찰로 기록했다. footerfalse의 별도 렌더는 미제공이다.
이 한계는 동작 권한 승인 요청이나 미완료 제품 구현을 숨긴 것이 아니라 원본 metadata 범위의 제한이다.

[자산](../docs/agent-hub/design/references/flyout.assets.json)은 기존 source geometry3개와 공급16px SVG3개다.
file-text는 source20지만 actual/export16이며 vector·SVG 모두 선1.25/#757575다.
16/20의.8은 크기 비율일 뿐 선 값이 아니다. chevron right/down은 native16·선1·1C다.
44px FileIcon 타일·일반 native16 file-text·임시 URL·새로 그린 path로 대체하지 않았다.

## 모션 채택과 의미

[모션 기록](../docs/agent-hub/design/references/flyout.motion.json)은 Figma measured=false/runtimeVerified=false인
사용자 요청 채택 계약이다. 공용 Menu 문서와 실제 읽기 전용 Menu.css.ts·Menu.tsx를 독립 에이전트가 대조했다.
열림/닫힘 모두150ms/ease/both,4방향6px+opacity,side없음bottom과 같은 규칙을 보존했다.
closed pointer-events:none은 실제 Menu source의 근거이며 문서 예시에도 이미 있다고 과장하지 않았다.
실제 Menu의 직접 createPortal과 문서 Radix Portal 예시 차이, Presence 종료 유지·transform wrapper 분리를 안내했다.

원본 Menu/전역에는 reduce override가 없다. Flyout은 명시적 animation:none 접근성 fallback을 채택했다.
일반 side별 animation-name과 같은 specificity로 media rule을 뒤에 두어 확실히 무효화하도록 교정했다.
animationend만으로 정리하거나 close즉시 부모가 제거하지 않으며 reduce에서도 종료·focus 복귀가 완료되도록 안내한다.
Dialog200ms scale·별도색상transition200ms·새scale/spring/stagger/delay를 Menu모션으로 합치지 않았다.

내부는 새 Header/Footer/Item 조합이며 Menu role·첫focus·min140·large행·max296를 자동 상속하지 않는다.
flat action/listbox·Tree/disclosure 의미는 실제 제품 데이터에 맞춘 한 adapter가 소유하고,
파일 선택·folder expanded·popup open·비동기/권한/요청은 각각 단일 owner에 연결한다.
Tree 전이 dependency 때문에 common Menu가 catalog에 포함되는 사실은 의미 강제와 구분해 테스트했다.
Footer 공간·끝 행/focus 노출, 긴 문구·미제공 상태·모션/Presence 실행은 제품 채택 검증으로 남긴다.

신규4개 계약으로 Agent Hub31개·공용 포함82개다. 공용 스킬7개·공용해제·다른 솔루션 격리·
source/export unmapped·공유 frontend patch draft를 유지한다. Serengeti 원본·Figma 파일·제품 코드·사용자 홈은 수정하지 않았다.

## 최종 검증

- 독립 raw 재귀 대조에서231nodes·45styles·47instances·변수25개/collection5개와 모든 child 좌표·치수·
  edge 선·font·paint/cap/join·alias·node mode·instance props/source가 일치했다. root getter의 미수집 상태도 보존됐다.
- Item7·Header/Footer14문서는 별도 에이전트가 작성했고 부모8문서는 두 에이전트가 교차 검토했다.
  reduce selector specificity·callback 중복으로 읽히는 문구·미확인 검색 표현을 교정했다.
  Tree→Menu 전이 의존과 직접 Menu 역할 채택을 구분하도록 first-use 검사와 설명도 바로잡았다.
- flyout-composition.json은 source/실제 footer override·부분10matrix·16행의11/5표시·외부 alias 차이·
  assets6개(3,813bytes)·명시적 Menu motion 채택을 대조해 issues0이다.
  실제 실행과 Figma 모션 측정은 모두false이며8개 CSS keyframe 및 같은 specificity의 reduce override를 별도로 확인했다.
- 임시 fixture에서 footer override 유실·pressed opacity 변경·native glyph source 대체·선.8 오해·숨김 노출·
  side 방향 반전·closed guard 유실·Figma measured 과장을 검출했다. 임시 fixture는 제거했다.
- npm run verify 통과: 링크3036개, 공용51+솔루션35개 계약·의존성, 스킬7개·역할/솔루션9조합·schema3개·namespace 격리.
  npm test는39/39 통과했다. Agent Hub loader82·off0, CMP55·PaaS51이며 다른 솔루션에 신규4ID가 섞이지 않는다.
- 실제 teamai-cli@0.27.0의 격리한 제품 배포에서 문서·자산1071개가 원본 snapshot과 byte 단위로 일치하고
  Codex·Claude 각각 공용 스킬7개·hook을 받았다. 해제 후 회사·Agent Hub525개를 유지하며 공용 문서·스킬·hook을 제외했다.
  양쪽 도구의 기존 제품 전용 스킬은 보존했고 실제 제품·홈에는 설치하지 않았다.
- git diff --check 통과, 읽기 전용 serengeti-cmp 작업 트리는clean이다. 이 변경은 커밋·push하지 않았다.
