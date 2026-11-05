# AgentHubIcon — 검증

배포 canonical 자산은 source 210개·SVG 208개·이름 74종입니다. 과거 source 208개·SVG 206개를
보존한 뒤 신규 원본 2개를 추가한 수입니다. 출처·해시·실제 크기는 manifest에 기록했습니다.
코드 source/export·브라우저 렌더링은 아직 미검증입니다.

2026-11-05 최신 보드 대조 범위는 다음과 같습니다.

| 범위 | 수 | 확인한 근거 |
| --- | --- | --- |
| 최신 archive metadata | 266 source | 이름·source ID·실제 frame 크기 |
| 기존 source / 새 source | 206 / 60 | 과거 manifest의 source ID와 대조 |
| 개별 context 확보 / 호출 제한 | 144 / 122 | Figma의 실제 context와 `Rate limit exceeded` 응답 |
| 다른 component context에서 추가 확보 | 3 | 원본 source 함수의 ID·이름·직접 img 참조 |
| 최신 SVG 확인 | 147 | 반환된 URL에서 받은 원본 bytes·SHA-256 |
| 기존 도형·paint 유지 확인 | 142 | SVG segment·paint 수치 대조, 좌표 허용 오차 0.0003 |
| 내부 vector만 반환돼 비교 보류 | 3 | pin 세 크기, canonical 유지 |
| 새 canonical 자산 | 2 | refresh-cw/24·chevron-up/16 |
| 최신 vector 미확보 | 119 | 기존 61개·신규 58개, metadata로 스타일 추정하지 않음 |

과거 upload source `3178:46336`, `3178:46337`은 최신 archive metadata에 없지만,
기존 중복 source와 자산을 보존합니다. archive에서 빠진 사실만으로 폐기 처리하지 않습니다.
[갱신 원장](../../references/icons-refresh-2026-11-05.json)은 모든 source와 비교 결과를 구분하며,
이 회차에서 확인하지 못한 source를 포함해 전체가 변경됐거나 전체가 동일하다고 주장하지 않습니다.

제품에 연결한 뒤 다음을 확인합니다.

- 사용하는 name/size 조합이 존재하고 SVG viewBox와 표시 크기가 같습니다.
- 16px 선 1px, 20px 선 1.25px, 24px 선 1.5px와 filled/miter 예외가 유지됩니다.
- agent·folder·skill과 like/dislike·more·settings를 원본과 비교합니다.
- 장식/독립 이미지/아이콘 버튼의 이름, keyboard·focus·disabled가 의도대로 동작합니다.
- light/dark·zoom·상태색을 확인하고 SVG 로더가 원본 도형을 손상하지 않는지 봅니다.
- 확인한 source/export만 로컬 구현 mapping에 기록합니다.
