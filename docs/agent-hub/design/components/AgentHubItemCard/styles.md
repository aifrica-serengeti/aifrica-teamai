# AgentHubItemCard — 수치·색상·자산

[실측](../../references/card.figma.json)의 Light6종을 기준으로 제품 token에 연결합니다.

| 영역 | 실제 값 |
| --- | --- |
| root | width324, height146 샘플 HUG, radius24, p16, 세로 gap16 |
| 선 | 1px INSIDE, layout 포함, 기본 #DDD |
| 내부 | width290, content72 + gap16 + footer24 + padding32 + 선2 =146 |
| content | gap8, header44 + description20 |
| header/info | header gap12 저장값, info FILL290·gap4, more는 absolute여서 정상 배치 gap에 참여하지 않음 |
| title-row | HUG45 샘플, gap8·title29 + dot8 |
| title | Pretendard16/24·600·#1C1C1C, textAutoResize WIDTH_AND_HEIGHT·truncation ENDING·maxLines1 |
| meta | 12/16·400·#757575, 샘플 ‘meta · meta · meta’ |
| description | FILL290·높이 HUG·maxHeight40,14/20·400·#555, textAutoResize HEIGHT·truncation ENDING·maxLines null |
| more |20×20, radius4, header의 x270/y0, glyph16·inset2 |
| tools |55×24, tile24×24/r4/#EEE·gap7, 실제 선 없음 |
| tool logo | 첫16.5×13.1175·x3.75/y5.44125, 다음15×15·x4.5/y4.5 |
| actions | 기본24×24 / hovered·pressed52×24, gap4, chat/pin glyph16·inset4 |

324·146과 텍스트 샘플 폭은 fixture입니다. 부모가 실제 폭을 공급하고 설명의 HUG 높이를 보존합니다.
description은 maxHeight40 안에서 HUG입니다. maxLines null을 원본1줄 또는3줄 제한으로 기록하지 않습니다.
Finder 조합의 설명310×40은 같은 최대 높이 안에서 두 줄을 사용해 카드가166px가 됩니다.
40px를 넘는 긴 설명은 ENDING 의도에 맞는 제품 생략 adapter와 전체 내용 접근 경로를 검증합니다.
title-row는 HUG이고 info에 more용 우측 padding은 없습니다. 긴 이름의 겹침 방지는 제품의 별도 배치 검증 대상입니다.

| state | root 표면 | 선 | 그림자 |
| --- | --- | --- | --- |
| default | #FFF | #DDD 1px | 없음 |
| hovered | #F8F8F8 | #DDD 1px | Mid |
| pressed | #F4F4F4 | #DDD 1px | Mid |
| selected | #EBF3FF | #3B82F6 1px | 없음 |
| disabled | #FFF | #DDD 1px | 없음 |
| accent | #EBF3FF | 흰색1px·opacity0, 공간 유지 | 없음 |

Mid는 `0 0 1px rgba(9,30,66,.31)` + `0 4px 6px rgba(9,30,66,.15)`입니다.
공용 Card의2px 선택 표현·전체 자식 opacity.4·r8을 적용하지 않습니다.
accent를 border:0으로 만들면 내부 폭과 위치가 바뀝니다. selected와 같은 배경이어도 선과 선택 의미가 다릅니다.

disabled는 root opacity1을 유지하고 title/meta/description/dot/more/chat을#AAA로 바꿉니다.
도구 타일의#EEE는 유지하며 IMAGE paint는 같은 imageHash에서 saturation만−1입니다.
title·meta·description 전체에 opacity를 낮추거나 선택 배경을 disabled 상태로 사용하지 않습니다.

## 정확한 자산

[자산 기록](../../references/card.assets.json)의 dot-blue8/dot-disabled8,
item-more16/item-more-disabled16, item-chat16/item-chat-disabled16과 pin-hovered16을 연결합니다.
more는#1C1C1C, chat/pin은#757575, disabled glyph는#AAA이며 실제 선1px입니다.
main manifest의 기본 icon 하나를 임의 축소/일괄 color로 바꾸지 않습니다.

제공된 pin fragment는10.3333×14.3323이고16px 전체 아이콘이 아닙니다.
별도 read-only export의 pin-hovered16은 원본 회전이 이미 반영됐으므로 CSS rotate를 다시 더하지 않습니다.

두 원본 로고 PNG의 SHA1은 IMAGE imageHash와 일치합니다. 제공된 disabled32px PNG 두 개는 같은 placeholder이고
어느 원본 hash와도 일치하지 않아 runtime 자산에서 제외했습니다. 실제 데이터 이미지에 grayscale adapter를 연결합니다.
이 차이와 원본 hash·saturation은 자산 예외와 실측에 남겼으며 실제 renderer의 필터 결과는 제품에서 확인합니다.
로고는 동적 데이터이고 메인 BrandMark나 고정된 도구 목록이 아닙니다.
