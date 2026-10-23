# AgentHubScrollbar — 치수·색상과 공용 비교

[실측](../../references/scrollbar.figma.json)의 Light 단일 샘플입니다. 실제 viewport·thumb 길이는 제품의 스크롤 측정값으로 정합니다.

| 영역 | 실제 값 |
| --- | --- |
| root | 11×180px·FIXED/FIXED·HORIZONTAL·gap0 |
| root padding | left0/right1/top1/bottom0 |
| root 표면 | fill/stroke/effect 없음·radius0·opacity1·clipping false |
| root 제약 | horizontal MAX / vertical MIN·overflowDirection NONE |
| thumb | root 안 x3/y3·4×160px·ABSOLUTE·FIXED/FIXED |
| thumb 제약 | horizontal MIN / vertical SCALE |
| thumb 모서리 | 네 모서리 모두9999px |
| thumb 표면 | SOLID #DDDDDD·paint opacity1·node opacity1·stroke/effect 없음 |

root/child에 `strokeWeight=1` metadata가 있어도 strokes가 비어 있으므로 실제1px 선을 추가하지 않습니다.
thumb는 절대 배치여서 root padding을 x3/y3에 다시 더하지 않습니다.
샘플의 오른쪽 잔여4px와 아래 잔여17px는 `11−3−4`, `180−3−160`의 결과입니다.
이 잔여 공간을 양끝 inset·끝 위치·콘텐츠 비율 공식으로 해석하지 않습니다.

| 실제 binding | alias와 해석 |
| --- | --- |
| `color/scroll/default` · `VariableID:3081:220` | `gray/300` · `VariableID:3077:20` → #DDDDDD |
| `radius/full` · `VariableID:3273:31` | `VariableID:3273:21` → 9999 |

변수의 전체 기록은 [alias 스냅샷](../../references/scrollbar.variables.figma.json)을 따릅니다.
dark 값이나 hover 색상을 이 단일 Light paint에서 유추하지 않습니다. 글자·glyph·별도 SVG 자산은 없습니다.

## 공용과 무엇이 다른가요?

공용을 켠 UI 작업에서만 `DOCS_ROOT/frontend/design/components/Scrollbar/styles.md`와
`DOCS_ROOT/frontend/design/components/Scrollbar/definition.md`를 비교합니다.

| 항목 | 공용 문서·CMP source baseline | 이 Agent Hub 원본 |
| --- | --- | --- |
| thumb 두께·모서리 | 기본4px·radius9999 | 동일4px·radius9999 |
| 시작 여백 | 기본 inset3px = 두께4×0.75 | 샘플 x3/y3로 동일한 시작 위치 |
| 교차축 비교 폭 | inset3×2 + thumb4 =10px | 독립 gutter11px·오른쪽 잔여4px |
| 기본 Light fill | 실제 CMP는 #555555의30% | #DDDDDD·불투명 |
| hover fill | 공용/CMP는 #555555의55% | 미제공 |
| wrapper | 공용 standalone은 표면·선1px·radius8·content padding16 | 이 원본 gutter에는 표면·선·radius·content가 없음 |
| 길이 | 실제 viewport/content 비율로 계산·기본 최소24px, 짧은 track는 track 길이로 제한 | 180px 영역 안 thumb160px 정적 샘플 |

공용의 참고용 Figma token `--scrollbar-thumb:#DDD`와 실제 fill token `--scrollbar-thumb-fill`을 구분합니다.
공용/CMP의 반투명30% 위에 이 원본의 #DDD를 다시30%로 적용하지 않습니다.
이 차이는 해당 Agent Hub adapter의 기본 paint에만 연결하며 전역 공용 token이나 기존 Menu·Picker·Flyout의 스타일을 일괄 변경하지 않습니다.

공용 문서의 standalone wrapper 선은 styles 표에 #E4E4E4로 적혀 있지만, 비교한 CMP CSS는 `--border-default`를 참조하고 실제 Light theme은 #DDD입니다.
이 문구 차이를 Agent Hub gutter의 새 border로 가져오지 않습니다. wrapper와 scrollbar part는 서로 다른 시각 책임입니다.

원본에는 hover/pressed/focus·dark·노출 timing·모션이 없습니다. 기존 상호작용과 접근성을 지우지 말고,
제품이 채택한 기대값·적용 범위를 따로 기록해 검증합니다.


## 사용처 채택: SNB track 끝과 가로 간격

기본 gutter11px·두께4px·inset3px·불투명 #DDD는 그대로입니다.
SNB만 gutter27px·track right2px·목록 영역 margin-right−16px·추가 track 끝 여백24px를 사용합니다.
288px 패널에서 행 폭244px를 유지하며 행↔thumb21px·패널 오른쪽 경계↔thumb 끝3px·track bottom27px를 확보합니다.
이는 사용자 요청 채택이며 원본 static scrollbar나 다른 컴포넌트의 기본값을 변경하지 않습니다.
track의 CSS 높이와 thumb 계산의 유효 track 길이는 같아야 합니다. 긴 thumb를 bottom 밖에서 clip하는 방식으로 대신하지 않습니다.
