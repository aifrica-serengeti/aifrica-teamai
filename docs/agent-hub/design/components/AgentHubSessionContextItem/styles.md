# AgentHubSessionContextItem — 크기와 색상

[실측](../../references/session.figma.json)의 Light mode 기준이며 실제 부모가 폭을 공급합니다.

| 항목 | 확인한 값 |
| --- | --- |
| standalone / 실제 Panel | 282×32px 샘플, standalone 폭 FIXED·실제 폭 FILL·높이 HUG |
| root | 가로 MIN·세로 CENTER, 좌우4px·상하8px·gap4px |
| radius / clipping | 6px, `radius/item` / false |
| 실제 border·shadow | 없음·없음 |
| content | x4/y8·262×16px 샘플·FILL/HUG·gap8px·clipping true |
| label-group | 66×16px·폭 FIXED·gap4px·clipping true |
| icon | 16×16px, label-group x0/y0 |
| label | x20/y0, Pretendard SemiBold12/16px·600·#757575·HUG |
| value | content 안 x74/y0·188px 샘플·Regular12/16px·400·#1C1C1C·FILL |
| count | root x270/y8·8px 샘플·Regular12/16px·400·#757575·HUG |

텍스트는 모두 자간0입니다. value만 ENDING/maxLines1이며 label/count는 truncation DISABLED·maxLines 없음입니다.
66px label-group 안의 icon16+gap4+‘지식’21px가41px를 사용하며 나머지는 해당 고정 컬럼의 공간입니다.
value 앞 gap8과 count 앞 root gap4를 하나의 gap으로 합치지 않습니다.
16px 콘텐츠+상하8px로32px가 됩니다. 저장된 strokeWeight1만 보고 실제 없는 선을 추가하지 않습니다.

| state | root 배경 | label·count / value / icon |
| --- | --- | --- |
| default | 투명, fills 없음 | #757575 / #1C1C1C / #757575 |
| hovered | rgba(0,0,0,0.05) | 동일 |
| pressed | rgba(0,0,0,0.1) | 동일 |
| selected | #EBF3FF | 동일 |

hover/pressed는 `color/action/opacity-hovered`·`opacity-pressed`, selected는 `color/action/default-selected`입니다.
alpha를 불투명 F8/F4로 바꾸지 않습니다. 선택에서도 value를 파랗게 바꾸거나 border·Tree 선택 막대를 추가하지 않습니다.
label/count는 `color/text/default-subtler`, value는 `color/text/default`, icon은 `color/icon/default-subtler`에 연결합니다.

## 아이콘과 가변 문자열

[자산 기록](../../references/session.assets.json)의 정확한16px 자산을 사용합니다.
file-text와 folder는 native20 source·표시16·선1.25px·#757575, book-open/wrench/scroll-text는 native16·선1px·#757575입니다.
모두 round cap/join을 보존하며 glyph 자체에 버튼 배경·추가 padding을 붙이지 않습니다.
기본 book-open과 실제 Panel의 book-open은 같은 source·시각이지만 내보내기 group ID가 달라 원본 파일을 각각 보존했습니다.
이를 다른 도형·추가 역할로 해석하지 않습니다.
[기본 book-open16](../../assets/session/book-open-16.svg)과 [Panel book-open16](../../assets/session/context-book-open-16.svg)을
각 출처의 참조 자산으로 확인할 수 있습니다.

282px·value188px·count8px는 현재 샘플입니다. 실제 큰 count와 긴 label/value·번역에서는 전체 정보·고정 컬럼·ellipsis 정책을 제품에서 검증합니다.
66px clipping metadata를 임의의 긴 그룹명을 삭제하는 정책으로 쓰지 않습니다.
focus·disabled·loading·dark·mobile·선택과 hover/pressed의 교차 시각은 미검증입니다.

## 현재 채택: 대표 value 끝 흐림과 이동

위 원본 value ENDING/maxLines1은 보존하고, 제품 표시는 [사용자 채택](../../title-overflow.md)으로 대체합니다.
value viewport만 flex1/min-width0·한 줄·overflow clip으로 두고 `…`를 추가하거나 원문을 자르지 않습니다.
실제 넘침에서만 오른쪽24px mask를 적용하며 이동 중 양끝, 끝에서는 왼쪽만 흐립니다.
icon16·label-group66px·content gap8·root gap4·count와32px 행은 고정합니다. mask·transform은 value 글자에만 적용하고 행 배경·focus ring을 자르지 않습니다.
