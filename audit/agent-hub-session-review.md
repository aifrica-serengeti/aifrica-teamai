# Agent Hub Session 확장 독립 검증

검증일: 2026-10-21. 수집된 Figma 원본과 정규화 스냅샷을 읽기 전용으로 비교했다.
제품 구현이나 Figma를 수정하지 않았으며, 실제 소비 제품의 source/export는 `unmapped`로 유지한다.

## 확인한 범위

| 계약 | Figma 원본 | 실제 variant 수 |
| --- | --- | --- |
| SessionPanel | `2975:69460` | filled·empty 2 |
| SessionItem | `2986:22114` | default·hovered·pressed·selected 4 |
| SessionProgressStep | `2987:22132` | done·active·pending 3 |
| SessionContextItem | `2987:22151` | default·hovered·pressed·selected 4 |
| SessionSectionHeader | `2986:22139` | collapsed false·true 2 |
| SessionHistoryItem | `2995:22304` | default·hovered·pressed·selected 4 |

합계는 19종이다. [실측](../docs/agent-hub/design/references/session.figma.json)은
404개 노드·122개 중복 제거 style·86개 instance와 숨김 노드30개를 보존한다.
[변수](../docs/agent-hub/design/references/session.variables.figma.json)는 직접 참조27개에서
alias closure43개·collection3개를 포함하며 누락이나 불필요한 변수가 없다.

Panel의 property getter는 읽기 전용 오류로 수집할 수 없었다. `propertyDefinitions: null`과
실제 오류 설명은 미확인 범위이며, 빈 속성 집합이나 모든 속성의 부재를 뜻하지 않는다.
다른 다섯 component set의 속성 정의와 실제 instance 속성은 별도로 정상 수집됐다.

## 조합에서 보존할 차이

Panel 두 샘플은 폭320·radius16·좌우 padding12·상하16·섹션 gap24,
배경 #F6F7F9·실제 1px INSIDE #EEEEEE·기존 Mid 효과를 사용한다.
border가 layout에 포함되어 실제 내부 폭은294, 시작 위치는 x13/y17이다.
filled934와 empty154는 HUG 샘플 높이이며 제품의 고정 높이나 viewport 규격이 아니다.

filled에는 예약·진행 상황·출력·컨텍스트가 있다. 두 샘플 전체 조합은 SectionHeader6개(filled4·empty2),
SessionItem6개, ContextItem5개, HistoryItem5개, ProgressStep4개다.
예약의 meta는 켜져 있고 출력5행의 meta는 꺼져 있다. 파일 이름·공개 값·예시 개수·반복 주기와
아이콘 교체는 실제 instance 속성으로 보존하지만 제품 기본 데이터나 실행 API를 정하지 않는다.

- 예약 history는 white286×204·radius8의 직접 FRAME 조합이다. 실행5행 중 selected1개와
  unread dot=true2개는 별개다. 선택은 현재 보는 실행이며 성공·완료·다중 선택을 의미하지 않는다.
- 실제 selected history `2975:69424`는 `color/action/default-selected`를 사용한다.
  standalone selected의 `color/element/primary-subtle`과 #EBF3FF 값은 같지만 alias identity는 다르다.
- 진행 단계는 done/active/pending/pending이다. 마지막 단계만 connector=false이며,
  connector와 track·label의 reflow로 높이가32에서20으로 줄어든다.
- connector는 공용 Divider `2019:118`의 실제17×4 instance다. 안쪽 선은 x8의1×4이며
  frame 전체를1px 폭으로 바꾸거나 standalone 원본 높이165를 강제하지 않는다.
- done은20px 원과 직접 VECTOR 체크(선.875)다. active는 #3B82F6와4px INSIDE #CCE0FF,
  pending은 #EEEEEE 원과 별도12/16px·#8F8F8F index다. Checkbox 인스턴스나 실행 수명 모델이 아니다.
- Header의 toggle/action은 실제 ghost/default/24 source `2427:25108`을 사용한다.
  history toggle `2975:69422`만 control frame16·내부 glyph16·x0/y0인 명시적 override다.
  원본24를 유지하거나 glyph까지10.67로 축소하면 해당 조립과 다르다.
- empty에는 출력·컨텍스트의 Header와 안내문 두 개가 있다. toggle/count는 숨겨지지만
  action plus는 보인다. 빈 상태라는 이유로 추가 조작까지 제거하지 않는다.

Item·ContextItem·HistoryItem은 radius6이며 hovered는 검정 alpha.05,
pressed는 검정 alpha.1, selected는 #EBF3FF다. 순간 pressed·현재 선택·읽지 않음·진행 상태를 합치지 않는다.
Menu·Tree·Checkbox 역할이나 목록 전체의 단일 선택 semantics도 모양만으로 자동 부여하지 않는다.

## 자산과 정규화 대조

[자산 기록](../docs/agent-hub/design/references/session.assets.json)은 제공된27개 asset constant를
byte 단위로 구분되는17개 SVG로 연결한다. 같은 book-open geometry라도 source group 이름 때문에
서로 다른 원본 bytes를 가진 두 파일을 보존했다. 전체 자산은13,354 bytes다.

파일 계열은 native20 source를16 frame으로 표시하면서 실제 선1.25를 유지한다.
Header와 context의 native16 계열은 선1이며 chevron #757575와 plus #1C1C1C를 구분한다.
done 전체 표시 자산에는 흰 체크가 포함되고 pending 원에는 index 글자가 포함되지 않는다.
완성 원·체크·ring을 자산과 DOM으로 중복 그리거나 원본20 파일의 CSS 축소로 선을 다시 계산하지 않는다.

원본과 정규화의 전체 노드를 재귀 비교했다. 루트의 canvas x/y만 제외하고 모든 자식 위치·치수,
layout/wrap/constraints/overflow/clipping·edge별 선/cap/join·paint·타이포그래피·effect·binding alias,
instance source/variant/전체 속성·preferredValues·노드 mode가 일치한다.
propertyRef/modeGroups의 중복 표현은 실제 instance properties와 node-level modes에 동등하게 보존된다.
모든 자산의 bytes·SHA-256·native SVG 크기·viewBox·상태색·실제 stroke도 확인했다.

## 조합 검사와 미확인 범위

[session-composition.json](../docs/agent-hub/design/references/session-composition.json)은
issues0이며 `runtimeVerified`와 `allStatesVerified`는 false다.
`node --test tools/session-composition.test.mjs`의 세 테스트가 통과했다.
임시 fixture에서 border 공간 유실·마지막 connector 노출·동일색 semantic token 오매핑·history control 확대·
empty toggle 노출을 검출했다. 선언한 해시까지 바꾼 파일 아이콘의 선 축소도 검출했으며 fixture는 제거했다.

실제 섹션 열기/닫기·추가·예약 선택·출력 열기·컨텍스트 조작·읽음 처리·진행 갱신은 제품 owner가 연결한다.
focus·접근성 이름·키보드·중복 실행·live 안내·긴 내용·협소 화면 및 미제공 loading/error/disabled/dark는
소비 제품에서 채택한 계약으로 검증해야 한다. 정적 샘플·자산 수신·조합 match는 앱 runtime 검증이 아니다.

통합 담당의 전체 저장소 검증도 완료됐다.

- `npm run verify` 통과: 로컬 링크3,202개와 공용51개·솔루션41개 계약을 확인했다.
- `npm test`는42/42 통과했다.
- 격리한 임시 제품의 실제 TeamAI CLI 전달에서 공용 채택 시1,134개 파일을 확인했고,
  Codex·Claude가 각각 공용 스킬7개를 받았다. 공용 해제 후 회사·선택 솔루션 파일588개를 유지하며
  두 도구의 공용 스킬은 각각0개, frontend 문서·공용 hook도 제외됐다. 기존 제품 전용 스킬은 보존됐다.
- 읽기 전용 serengeti-cmp 작업 트리는 clean이다.
