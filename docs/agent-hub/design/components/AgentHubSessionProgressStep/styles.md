# AgentHubSessionProgressStep — 스타일

| 항목 | 확인한 값 |
| --- | --- |
| standalone | 286×32px, 폭 FIXED·높이 HUG |
| 배치 | horizontal·시작 정렬·gap8·padding0·radius0 |
| root 표면 | fill·border·shadow 없음, opacity1 |
| track / indicator | track20×32, indicator20×20 |
| connector wrapper | 20×12px, 위아래 padding4px |
| 실제 Divider | `2019:118` 원본17×165 → 실제17×4px, 좌우 padding8px |
| 실제 선 | 1×4px·#DDDDDD, wrapper 안 x9.5/y4 |
| label | Pretendard Regular14/20·400·자간0, x28/y0·폭 FILL |
| 마지막 단계 | connector=false, track/전체 높이20px |

indicator20 + connector12 =32px이며 connector를 끄면20px입니다. Divider 전체17px에 좌우 padding8이 포함되므로
선 폭을17px로 그리거나 별도 margin8을 다시 더하지 않습니다. label은 전체 행 높이를 채우며 원본 TRUNCATE/ENDING입니다.
원본 maxLines는 null입니다. 기본 한 줄과 긴 label/번역의 표시 정책은 제품에서 함께 검증합니다.

다음은 Figma 원본 관찰값입니다. active의 현재 표시에는 아래 사용자 채택을 적용합니다.

| status | indicator 실제 paint | label |
| --- | --- | --- |
| done | 20px circle #1C1C1C·내부 흰 check | #1C1C1C |
| active | 20px 정적 원형, fill #3B82F6·inside4px stroke #CCE0FF | #1C1C1C |
| pending | 20px circle #EEEEEE·index #8F8F8F | #8F8F8F |

done check는14px 내부 frame의 실제 선0.875px·round이며 circle 안 x3/y3에 놓입니다.
done/pending circle에 저장된 strokeWeight2만 보고 실제 strokes가 없는 외곽선을 추가하지 않습니다.
pending index는 원 안 x6/y2·8×16px, Pretendard Regular12/16·400입니다. 문자열3/4 샘플 폭을 모든 순번 길이로 보증하지 않습니다.

active는 정적 원본이며 회전·펄스·모션을 확인하지 않았습니다. [정확한 자산](../../references/session.assets.json)을 사용하고
일반 spinner로 대체하거나 그림 이름만 보고 animation을 추가하지 않습니다.
pending의 gray는 disabled 동작이 아니며 전체 opacity로 label·indicator·연결선을 일괄 바꾸지 않습니다.
dark·hover·focus·오류·취소·추가 상태와 다중 줄은 미제공입니다.

## 사용자 채택: 고정 중심과 halo

[현재 채택](../../motion.md)은 원본 SVG에 포함된 정적 #CCE0FF stroke4px를 표시에서 숨기고 파란 중심만 고정합니다.
원본 자산·manifest·실측 JSON은 수정하지 않습니다. active의20×20px 이미지에만 `clip-path:circle(6px at 50% 50%)`를 적용해
원본 파란 내부 지름12px를 노출합니다. 이미지나 wrapper를12px로 줄이지 않으며 done/pending에는 clip을 적용하지 않습니다.
이는 원본 전체를 노출한 채 뒤에 halo를 추가하던 이전 채택을 대체합니다. 정적 하늘색 배경·border·shadow를 다른 층에 복제하지 않습니다.

indicator20/gap8/connector12·행 높이32 또는20px와 파란 중심은 고정입니다. 하늘색은 뒤의20px·border4px #CCE0FF 장식 ring에서만 나타납니다.
장식 halo의1600ms ease-out 반복, scale1→1.08→1.6, opacity0→.6→0은 새 제안값입니다.
최대 시각 지름32px는 overlay이며 layout 폭/높이에 더하지 않습니다. pointer-events:none·장식 숨김을 적용하고 label/connector·focus를 가리지 않는지 검증합니다.
reduced-motion·forced-colors·print에서는 장식 halo를 제거하고 active 이미지의 clip은 유지해 파란 중심만 남깁니다.
동작을 줄인다는 이유로 전체 원본을 다시 노출하지 않습니다. 파란 중심을 새 도형이나 새 자산으로 다시 그리지 않습니다.

루프 경계는0% opacity0/scale1 →22% opacity.6/scale1.08 →100% opacity0/scale1.6으로 연결합니다.
fade-in과 확산을 하나의1600ms ease-out cycle에서 처리하며, 끝에서 보이는 하늘색 ring으로 즉시 복귀하지 않습니다.
