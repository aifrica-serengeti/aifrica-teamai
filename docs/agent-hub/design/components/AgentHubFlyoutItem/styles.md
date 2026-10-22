# AgentHubFlyoutItem — 크기와 색상

[실측](../../references/flyout.figma.json) 중 standalone item set의 Light mode 기준입니다.
[변수](../../references/flyout.variables.figma.json)의 역할별 alias를 연결하며 제품 전체의 테마를 바꾸지 않습니다.

## 행과 정렬

| 항목 | 실측 |
| --- | --- |
| standalone 행 | 폭280px·높이28px, 가로/세로 FIXED |
| 배치 | 가로 MIN·세로 CENTER, gap8px |
| item padding | 왼쪽8px·오른쪽8px·상하0 |
| folder·folder-open padding | 왼쪽8px·오른쪽16px·상하0 |
| child padding | 왼쪽56px·오른쪽16px·상하0 |
| radius | 모든 행0 |
| 실제 border·shadow | 모든 행 없음 |
| clipping | 행 false, icon 인스턴스 true |
| label | Pretendard Regular12/16px·400·자간0·#1C1C1C |
| label 폭·넘침 | FILL, ENDING·maxLines1 |

16px 콘텐츠를28px 행에서 중앙 정렬하므로 자식의 y는6px입니다. 이를 원본 padding-top/bottom6px로 기록하지 않습니다.
행에 저장된 `strokeWeight: 1`·`strokesIncludedInLayout: true`와 실제 `strokes: []`를 구분하고 선을 추가하지 않습니다.
280px는 standalone 비교 폭이며 실제 부모가 제공하는 폭에 연결합니다.

| 종류 | 280px 샘플 안의 좌표와 폭 |
| --- | --- |
| item | icon x8·16px, label x32·240px |
| folder·folder-open | chevron x8·16px, icon x32·16px, label x56·193px, count x257·7px |
| child | label x56·155px, meta x219·45px |

label의 FILL과 count/meta의 HUG로 우측 정보를 배치합니다. count ‘7’의7px·meta ‘방금 생성’의45px를 모든 데이터에 고정하지 않습니다.
공용 Tree의32/40px 높이·r4·24px connector slot·14/20px label·selected 왼쪽 막대를 가져오지 않습니다.
AgentHubMenuItem의28px 높이만 같다는 이유로 label14/20px·좌16/우12 padding을 상속하지 않습니다.

## 상태별 paint

| 실제 조합 | 배경 | label | file-text | count / meta |
| --- | --- | --- | --- | --- |
| 모든 kind·default | 투명, fills 없음 | #1C1C1C | 해당 종류에서 #757575 | folder count #757575 / child meta #3B82F6 |
| 모든 kind·hovered | #F8F8F8 | #1C1C1C | 해당 종류에서 #757575 | 위와 같음 |
| item·pressed | rgba(0, 0, 0, 0.1) | #1C1C1C | #757575 | 해당 없음 |
| item·selected | #EBF3FF | #1C1C1C | #757575 | 해당 없음 |

hover는 `color/action/default-hovered`, pressed는 `color/action/opacity-pressed`, selected는
`color/action/default-selected`에 연결됩니다. pressed는 부모 surface 위의 검정10% overlay이며 #F4F4F4로 치환하지 않습니다.
AgentHubMenuItem의 pressed #F4F4F4와 다릅니다. selected에서도 label을 파랗게 바꾸거나 왼쪽 선택 막대를 추가하지 않습니다.
selected와 hover/pressed가 겹치는 우선순위는 별도 완성 시안이 없으므로 제품에서 명시합니다.
후속 폴더 recipe의 child selected는 기존 item의 `#EBF3FF`를 재사용하는 채택값입니다. `aria-pressed`를 함께 연결하고
label·meta·glyph와 원본 child L56은 유지합니다. 두 단계보다 깊은 폴더는 depth당24px 들여쓰기를 추가하는 runtime 배치이며 실측으로 표시하지 않습니다.

count와 meta도12/16px·400·자간0입니다. count는 `color/text/default-subtler`, meta는 `color/text/primary`입니다.
meta의 파랑은 상태 문구의 표시색이며 클릭 가능한 링크라는 뜻은 아닙니다.

## 정확한 아이콘 연결

[자산 기록](../../references/flyout.assets.json)의 [file-text16](../../assets/flyout/file-text-16.svg),
[오른쪽 chevron16](../../assets/flyout/chevron-right-16.svg), [아래쪽 chevron16](../../assets/flyout/chevron-down-16.svg)을 사용합니다.
file-text는 native20 원본에서 표시 box16으로 바뀐 실제 인스턴스이며 정확한 도형·여백·paint를 보존합니다.
PluginAPI에는 내부5개 Vector의 strokeWeight1.25px·round cap/join·#757575가 저장되어 있으며,
제공된 SVG도16×16 viewBox에 선1.25px를 보존합니다.
root의 저장 strokeWeight나20→16 비율만으로 실제 내보내기 선을 다시 계산하지 않습니다.
chevron은 native16·Vector 선1px·round·#1C1C1C이며 오른쪽은4×8px·x6/y4, 아래쪽은8×4px·x4/y6입니다.

focus·disabled·loading·folder/child의 pressed/selected·meta=false·dark·mobile의 추가 시각 값은 미검증입니다.
긴 label·큰 count·긴 meta·좁은 폭에서 정보와 focus가 가려지지 않도록 제품에서 배치 정책을 채택해 검사합니다.

## 배경 전환 채택

[공용에서 계승한 모션](../../motion.md)에 따라 행 배경에 `background-color 200ms ease`를 직접 적용합니다.
hover 진입·이탈의 투명↔`#F8F8F8`과 기존 item pressed/selected 색을 보간하며 기존 선택 우선순위를 유지합니다.
기본 recipe는 selected 배경을 hover/pressed보다 우선하며, 이 교차 상태 우선순위는 제품 채택값입니다.
disabled는 button뿐 아니라 정적 div에도 상태 속성을 연결해 hover를 차단합니다. reduced-motion에서는 전환을 해제합니다.
28px 행·padding·아이콘·클릭 영역은 움직이지 않습니다. 이 시간은 Figma 모션 실측값이 아닌 공용 계승값이며
부모 Flyout의 열림·닫힘150ms와는 별개입니다. 선택적 폴더 본문 높이250ms와 chevron200ms는
[후속 채택 모션](../AgentHubFlyout/motion.md#폴더-펼침접힘-채택)을 따릅니다. 같은 down glyph만 회전하며 행28px과 hit area는 고정합니다.

## 공용 Menu의 행 focus 계승

키보드 focus는 실제 native 행 button 안쪽의2px ring으로 표시합니다. 기본 outline을 동시에 그리지 않습니다.
같은 행 hover에서는 공용 Menu처럼 ring을 숨기고 기존 hovered/selected 배경 정책을 유지합니다.
focus만으로 배경을 hover 색으로 바꾸지 않으며, `box-shadow`와 글자색도200ms ease로 전환합니다.
disabled는 실제 입력과 hover/ring을 차단하고 reduced-motion에서는 즉시 전환합니다.
forced-colors에서는 shadow 대신 시스템 Highlight 색의2px 내부 outline을 사용합니다.
이 정책은 공용 Menu 스타일(`DOCS_ROOT/frontend/design/components/Menu/styles.md`, 공용 묶음 선택 시)의 계승이며 Figma focus 실측이 아닙니다.
