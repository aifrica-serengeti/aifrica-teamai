# AgentHubUserMessage — 크기와 색상

[실측](../../references/message-user.figma.json)의 Light mode 기준입니다. 아래 값은 사용자 메시지 범위에 연결합니다.

## 버블과 본문

| 항목 | 확인한 값 |
| --- | --- |
| 배경 / radius | #F4F4F4, `color/surface/default-subtler` / 12px, `radius/surface-sm` |
| 패딩 | 좌우16px·상하10px |
| 실제 border / shadow | 없음 / 없음 |
| 높이 | 한 줄 샘플44px, 원본 FIXED |
| 폭 | HUG, chat 샘플211px·agent 샘플346px |
| 본문 | Pretendard Regular16/24px·400·자간0·#1C1C1C |

chat 본문은179×24px·x16/y10 샘플이며 버블 폭은179+32=211px입니다.
agent는314px content에 좌우 패딩을 더한346px입니다. 문구·메타데이터가 바뀌어도 이 폭을 고정하지 않습니다.
보이는 버블에 `strokeWeight: 1`만 보고 선을 추가하지 않습니다. 실제 `strokes: []`, `effects: []`입니다.

원본은 `clipsContent: true`이지만 본문에는 말줄임·줄 수 제한이 없습니다.
긴 메시지를44px 높이에서 잘라내거나 축약해 삭제하는 구현으로 옮기지 않습니다.
원본 한 줄 비교와 실제 긴 본문 정책을 구분하고, 제품에서 줄바꿈·높이 증가·긴 토큰 처리 방식을 채택해 검증합니다.
`min-height: 44px`, `white-space: pre-wrap` 같은 구현 제안은 [구현 가이드](./implementation.md)에 있으며 다중 줄 Figma 실측값은 아닙니다.

## 에이전트 메타데이터

- 일반 Chip: 높이20px·최대폭200px·좌우8px·radius4px, 글꼴12/16px·600, 배경 #FAF5FF·글자 #9333EA.
  ‘에이전트’ 라벨의 폭58px은 샘플이며 실제 border·leading/trailing 버튼은 없습니다.
- 제목:14/20px·600·#1C1C1C, 샘플 ‘문서 요약’52px. Chip과 제목 사이 gap8px이며 메타데이터 묶음은118×20px 샘플입니다.
- Divider: 외곽17×12px에 좌우8px와1px #DDDDDD 선을 포함합니다. 바깥 gap이나 padding8px를 중복 추가하지 않습니다.
- content frame은 gap0입니다. 샘플 본문은 content 기준 x135(메타118+Divider17)에서 시작합니다.
  숨겨진 description을 두 번째 줄이나 추가 여백으로 만들지 않습니다.

공용 Chip은 의미·재사용 절차의 기준입니다. 원본 없는 transparent border나 다른 Chip의 고정 폭·업무 색상으로 이 배치를 바꾸지 않습니다.

## 예약 경로 표시

schedule 외곽은 투명·radius0·border/shadow 없음, 세로 gap8px·오른쪽 정렬·가로세로 HUG입니다.
샘플 전체211×68px는 상태 행16px + 간격8px + 버블44px입니다. 버블의 padding·배경·radius는 일반형과 같습니다.

상태 행은126×16px 샘플, gap4px입니다. 시계는12×12px·선0.75px·round cap/join·#555555,
문구는12/16px·400·#555555입니다. 텍스트 폭110px와 전체126px는 번역·실제 문구에 따라 달라집니다.
20px 원본을 임의의 CSS 축소로 대체하지 않고 [실제12px export](../../assets/message-user/schedule-12.svg)의 도형·선·위치를 보존합니다.

hover·pressed·focus·dark·긴 본문·mobile·새 메시지 상태의 시각 값은 이 세 정적 구성에서 확인되지 않았습니다.
