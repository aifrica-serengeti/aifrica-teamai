# AgentHubFileViewer — 스타일과 실측

[문서 인덱스](./README.md) · [Figma 관찰 기록](../../references/file-code-refresh.figma.json)

| 항목 | 관찰·채택 계약 |
| --- | --- |
| 샘플 root | 폭407×전체높이1022. shell이 실제 가용폭/높이를 공급 |
| path | 높이42·p8·surface white·왼쪽+아래 border1 #DDD |
| 경로 글자 | Pretendard Regular400 14/20, color/text/default-subtler #757575 |
| path blur | 생성 CSS backdrop-blur5.75px. native radius로 단정하지 않음 |
| code-block | 샘플높이980·pt10·pb8·white·왼쪽 border1 #DDD |
| 코드·번호 | JetBrains Mono Light300 **12/20**, 독립 CodeLine 기본13px와 다른 인스턴스 override |
| gutter/indent | gutter68·번호26·guide16.8px, CodeLine과 동일 |
| syntax span | #CF222E, #8250DF, #0550AE, #0A3069. 의미별 토큰 native binding은 미확인 |
| actions | code-block 오른쪽8·위8·gap4·container radius8·생성 backdrop-blur10px |
| 각 액션 | target24/glyph16/radius4, color/action/primary-inverse white |
| 정적 scroll sample | track11×180, 오른쪽/위0. thumb폭4·left3·radius8, top1.67%/bottom9.44% |
| scroll-corner | right4/bottom4,16px slot. 생성 참조에는 내부 도형이 없음 |

50×20px 행은1000px이며 code-block980px에 padding도 포함되어 정적 콘텐츠가 샘플 박스를 넘을 수 있습니다.
단순히 모든 행을 이 높이에 맞추어 압축하거나 마지막 행을 잘라 숨기지 않습니다. 실제 제품은 가용높이에 맞춘 한 코드 viewport를 연결합니다.
원본의180px 정적 track/비율을 데이터 길이와 무관한 고정 thumb로 복제하지 않습니다.

코드12px override는 이 Viewer에만 국한하고 CodeLine 기본13px와 공용 전체 typography를 변경하지 않습니다.
외곽 패널/FileHeader/OutputViewer와 조합할 때 헤더42/48/34px를 목적 없이 모두 쌓거나 중복 border를 만들지 않습니다.
