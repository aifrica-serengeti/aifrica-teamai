# AgentHubFileTab — 스타일과 실측

[문서 인덱스](./README.md) · [Figma 관찰 기록](../../references/file-code-refresh.figma.json)

| 항목 | 관찰·채택 계약 |
| --- | --- |
| 높이 | 24px |
| 샘플 폭 | label 문자열 기준70px HUG 결과. 모든 파일에 고정70px를 강제하지 않음 |
| 패딩·간격 | 왼쪽8px·오른쪽4px·label/close gap4px |
| 모서리 | radius/control-sm 4px |
| 글자 | Pretendard Regular400, 14/20, color/text/default #1C1C1C, nowrap |
| default | 배경 transparent |
| active | color/button/opacity-active rgba(0,0,0,.1) |
| 닫기 | 24×24 hit area, glyph16×16, radius4 |
| 탭 사이 | FileHeader에서8px; FileTab root 자체의 gap과 구분 |

공용 Tab의 밑줄·전체폭 하단선·최소폭120·44px 높이를 동시에 적용하지 않습니다.
긴 파일명의 최대폭·생략·overflow 표시 정책은 FileHeader/제품 adapter가 정하며 샘플 폭을 콘텐츠 제한으로 오해하지 않습니다.
선택 배경과 focus-visible 윤곽은 별도 상태로 유지하고 focus가 잘리지 않도록 실제 탭 viewport를 확인합니다.
Figma에 hover/pressed 조합의 새로운 탭 배경은 없으며 닫기 버튼의 공용 상태 전환은 유지합니다.
