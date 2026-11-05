# AgentHubFileHeader — 스타일과 실측

[문서 인덱스](./README.md) · [Figma 관찰 기록](../../references/file-code-refresh.figma.json)

| 항목 | 관찰·채택 계약 |
| --- | --- |
| root | 높이48px, 좌우패딩16px, 흰 surface/default, 왼쪽+아래 border1px #DDD |
| empty/tabs | 양쪽 정렬. 샘플 폭910px |
| tabs-overflow | 샘플 폭480px, 좌우 group gap24px, clip |
| 탭 | FileTab24px, 탭 사이 gap8px |
| overflow tabs 영역 | flex1·min-width0·justify-end·overflow clip |
| empty 제목 | Pretendard Regular400 16/24 #1C1C1C |
| actions | gap4px, 버튼24×24, glyph16, radius4 |
| 원본 pause 표시 | color/button/opacity-pressed rgba(0,0,0,.1) |
| overflow 버튼 | 24px·radius4·color/button/opacity-active rgba(0,0,0,.1) |
| 배경 blur | 생성 CSS backdrop-blur5.75px. native Figma effect radius 실측으로 주장하지 않음 |

폭910/480은 비교 sample이며 제품 shell의 반응형 폭과 최소폭은 별도입니다.
나머지 액션의 기본 surface는 transparent이고 기존 IconButton hover/pressed/focus를 유지합니다.

왼쪽 fade는 [원본 PNG](../../assets/refresh-20261105/fef1d15863468ea650dd6d6b8e781a486a7fdc25.png)를 사용합니다.
생성 참조에서 원본 표시53×48px를90도 회전하여48×53px wrapper(left -1, top -3)에 놓습니다.
장식이 트리거 위 포인터를 막거나 텍스트 선택을 가로막지 않게 pointer-events:none·aria-hidden을 적용합니다.
임의 CSS blur를 추가해 모든 탭을 뿌옇게 만들지 않습니다.
