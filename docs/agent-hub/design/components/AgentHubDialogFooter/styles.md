# AgentHubDialogFooter — 배치·색상과 공용 비교

[실측](../../references/dialog-footer.figma.json)의 Light 단일 샘플입니다. 실제 폭은 Dialog가 공급하며580px를 모든 화면에 고정하지 않습니다.

| 영역 | 실제 값 |
| --- | --- |
| root | 580×88px·폭 FIXED/높이 HUG·HORIZONTAL·NO_WRAP |
| 정렬 | primary MAX(우측) / counter MIN(위쪽)·gap8 |
| padding | 네 면24px |
| root 표면 | fill/stroke/effect 없음·radius0·opacity1·clipping false·overflow NONE |
| root border layout | true지만 strokes가 비어 실제 선 없음 |
| cancel | root 안 x378/y24·81×40px·폭 HUG/높이 FIXED |
| confirm | root 안 x467/y24·89×40px·폭 HUG/높이 FIXED |

버튼 묶음은81+8+89=178px이고 오른쪽24px를 남깁니다. x378 =580−24−178입니다.
높이88 =24+40+24입니다. root의 `strokeWeight=1` metadata만 보고 border2px를 높이·내부 좌표에 더하지 않습니다.
root 자체의 배경은 없으며 Dialog 표면이 뒤에 보입니다. 별도 top 선·shadow·radius8을 footer 전체에 추가하지 않습니다.
Body 스크롤 경계의 선/fade는 Dialog Body 소유이며 footer의 고정 top 선과 다릅니다.

| 버튼 | cancel | confirm |
| --- | --- | --- |
| 실제 variant | tertiary40 enabled | primary40 enabled |
| radius | 8px | 8px |
| padding·내부 gap | 좌우16/상하4px·gap4 | 좌우16/상하4px·gap4 |
| 기본 배경 | #FFFFFF | #3B82F6 |
| 실제 선 | 1px INSIDE #DDDDDD | 없음 |
| label | ‘cancel’·49×24px | ‘confirm’·57×24px |
| label 색 | #1C1C1C | #FFFFFF |
| 글꼴 | Pretendard SemiBold16/24·600·자간0 | 동일 |
| 선의 layout 포함 | false | false·실제 strokes 없음 |

두 Button은 opacity1·clipping true이고 효과가 없습니다. label에는 실제 strokes가 없습니다.
두 label은 버튼 안 x16/y8이며 WIDTH_AND_HEIGHT·truncation DISABLED·maxLines null입니다.
40px는 실제 고정 버튼 높이입니다. line-height24+상하 padding8=32라는 이유로 버튼을32px로 줄이지 않습니다.
실제 중앙 정렬에서 글자는 y8에 놓입니다. 버튼 폭81/89px는 label49/57+좌우 padding32의 샘플 결과입니다.
긴 문구와 번역을81/89px에 잘라 맞추거나 label을 공용14/20으로 축소하지 않습니다.

cancel의 inside 선은 layout에 포함되지 않습니다. 실제 CSS border로 label 시작점이나 폭을1/2px씩 밀지 말고,
기존 [AgentHubButton](../AgentHubButton/styles.md)의 선 adapter를 재사용하거나 별도 inside 선 레이어로 표현합니다.
confirm과 root에는 실제 strokes가 없으므로 저장된 weight만으로 transparent/visible border 공간을 추가하지 않습니다.

## 공용 footer와 다른 점

공용을 켠 UI 작업에서만 `DOCS_ROOT/frontend/design/components/Dialog/definition.md`와
`DOCS_ROOT/frontend/design/components/Button/definition.md`를 비교합니다.

| 항목 | 공용 Dialog footer | 이 원본 |
| --- | --- | --- |
| 배치 | 우측 정렬·gap8·padding24 | 동일 |
| 버튼 높이 | medium32px | 40px |
| 버튼 radius | 4px | 8px |
| label | 14/20px·600 | 16/24px·600 |
| 버튼 한 행의 footer 높이 | 24+32+24=80px 계산 | 24+40+24=88px 실측 |
| 시각 연결 | 공용 Button token | 실제 AgentHubButton tertiary40/primary40 |

label·그림자·radius·전체 Dialog 폭을 같은 크기 이름으로 일괄 상속하지 않습니다.
부모 Dialog의 border·shell 색·header·scrollbar까지 변경된 시안으로 확대하지 않습니다.
모든 실제 binding은 [변수 기록](../../references/dialog-footer.variables.figma.json)에 보존합니다.
숨김 plus20의 paint·선1.25px는 출처 metadata이며 이 footer의 보이는 아이콘 규격이나 새 자산 요구가 아닙니다.
hover/pressed·disabled·focus·loading·negative·dark·취소 숨김 조합·긴 문구·반응형은 별도 채택·검증 범위입니다.
