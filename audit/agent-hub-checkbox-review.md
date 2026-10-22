# Agent Hub Checkbox 확장 검증

검증일: 2026-10-20. Figma file `cUKHT2PdHjAKRXZlzulnO5`의 `3074:98892`를 get_design_context 렌더링과
읽기 전용 Plugin API로 확인했다. [AgentHubCheckbox](../docs/agent-hub/design/components/AgentHubCheckbox/README.md)는
공용 Checkbox 위에 연결하는 시각 참조 계약이며 실제 앱 구현은 아니다.

## 공용 대비 차이

| 항목 | 확인한 비교 |
| --- | --- |
| 크기 | 공용 small12/medium16 유지, large20 추가. Figma는 시각 박스만 제공 |
| radius | 공용2px에서 small3/medium4/large5px로 변경 |
| 선택 enabled | #3B82F6 채움·흰 마크. 공용 primary border와 달리 실제 Box stroke 없음 |
| 중립·disabled | unchecked white/#1C1C1C, disabled #EEE와 #AAA/#DDD 선·흰 마크는 공용과 같음 |
| 마크 토큰 | enabled on-primary, disabled on-disabled. 현재 모두 white여도 alias를 합치지 않음 |
| 체크 도형 | native1px CENTER·round cap/join, path bounds6×4.125/8×5.5/10×6.875px |
| mixed 도형 | 공용의 채운6×1.5/8×2px 사각형 대신 길이6/8/10px·1px round stroke |
| 단위 | 공용 Lucide frame9/12px·strokeWidth3은 SVG 좌표계 값. CSS3px와 직접 비교하지 않음 |
| 구조 | root/Box/Mark, instance0. 일반 AgentHubIcon이 아니며 label·hit area·group·native input은 없음 |

실제 정의는 type3 × size3 × state2 =18종이다. state는 enabled/disabled enum이며 생성 prototype의 Boolean과 구분했다.
공용의 값 모델·Tab/Space·form·mixed 집계·라벨과 small/medium hit area를 유지한다.
large의 라벨·hit area와 미제공 focus·invalid·read-only·dark 시각은 제품에서 확인한다.

## 검증 결과

- [실측 기록](../docs/agent-hub/design/references/README.md)에18variants·48nodes(18root+18Box+12Mark)·29styles·12vectorPaths를 보존했다.
  root canvas 나열 좌표만 제외하고 자식 상대 좌표·stroke cap/join·clip·원본 경로를 유지했다.
- 독립 서브 에이전트가 raw와 정규화를 재귀 대조해 geometry·paint·binding·alias·variant·vectorPaths에서 불일치를 찾지 못했다.
  직접 바인딩8개에서 변수14개·collection2개까지 alias closure가 완전하다.
- Figma가 제공한 Box+Mark 전체 SVG12개를 원본 그대로 다운로드했다. 총6,856 bytes이며 native12/16/20px frame·viewBox,
  SHA-256·박스/마크 색상·경로·round stroke·clipping이 원본과 일치한다. unchecked6종은 별도 SVG 목록에 포함하지 않았다.
- 자동 검사는 [자산 manifest](../docs/agent-hub/design/references/checkbox.assets.json)와 snapshot의 상태/노드 집합,
  파일 크기·해시·native 치수·로컬 참조 무결성을 검사한다. 임시 다운로드 URL은 공유 자료에 남기지 않았다.
- 필수6문서·공용 Checkbox 의존성·탐색 경로를 등록했다. loader는 Agent Hub67/off0·CMP55/off0·PaaS51/off0이며
  새 id가 다른 솔루션에 섞이지 않는다. source/export는unmapped·공유 설정은draft·공용 스킬은7개를 유지한다.
- `npm run verify`, `npm test`19개와 `git diff --check`가 통과했다. 공용51+솔루션20계약, 역할/솔루션9조합·schema3개를 확인했다.
- 최종 공유 자료로 실제 TeamAI CLI0.27.0을 격리 init/pull했다. 활성 문서/자산908파일의 byte hash가 원본과 같고
  Codex·Claude 공용스킬 각7개·공용hook이 전달됐다. 공용 해제 후 각0개·공용hook 제외·회사/솔루션362파일 유지와
  제품 소유 스킬 보존을 확인했다. 실제 사용자 홈·원격 저장소는 변경하지 않았다.
- 원본 `project.serengeti-cmp` 작업 트리는clean이며 제품 코드·Figma를 수정하지 않았다.

서브 에이전트 문서 검토에서 disabled Mark의 on-disabled alias를 명확히 했고, input의 접근성/focus와 form 제출 요구를 분리했다.
native 입력·실제 focus·mixed 집계·readonly 차단·초기 mixed·form·대비 통과는 소비 제품의 검증 대상이다.
장식 SVG만으로 Checkbox 의미를 만들거나 전체 SVG 위에 Box·Mark를 중복하지 않는다.
