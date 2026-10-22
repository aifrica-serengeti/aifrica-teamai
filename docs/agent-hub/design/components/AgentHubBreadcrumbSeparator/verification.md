# AgentHubBreadcrumbSeparator — 검증

Light mode slash·en dash·arrow 세 유형의 원본 구조·치수·색상을 확인했습니다.
실제 제품 source/export·Breadcrumb 동작은 미검증입니다.

- slash22×24px, dash24×24px, arrow21.557498931884766×24px의 frame과 좌우8px padding을 확인합니다.
  root gap0·내부 자식 하나에 gap10px가 추가 간격을 만들지 않는지 비교합니다.
- 텍스트 구분자는16/24px·400·자간0이며 `/`와 en dash `–`를 정확히 사용합니다. dash를 ASCII `-`로 바꾸지 않습니다.
- 세 유형이 #757575이고 실제 bg·border·shadow가 없는지 확인합니다. 라이브러리의 보라색 테두리·radius5를 화면에 추가하지 않습니다.
- arrow vector는5.557499885559082×9px, x약8/y7.5의 채운 도형입니다. 원본 SVG를 임의 glyph·문자·외곽 stroke로 치환하지 않습니다.
- export SVG는21.5575×24px 전체 frame과 내부 여백을 포함합니다. wrapper px8·공용 gap8을 중복 추가하거나 vector를 전체 크기로 늘리지 않습니다.
- 생성 코드가 arrow를 slash로 반환해도 실제 screenshot·Plugin API·원본 asset을 기준으로 비교합니다.
- 마지막 현재 위치 뒤에는 구분자가 없고, slash 중복 원본 `2372:36931`과 요청한 `2427:25424`의 ID·변수 override를 구분하는지 확인합니다.
- 실제 경로의 측정·축약에서 구분자 폭과 간격을 한 번만 반영하는지 확인합니다.
- 구분자는 장식으로 읽히지 않고 클릭·Tab·선택 상태를 만들지 않으며, 인접 링크 focus와 현재 위치 의미가 유지되는지 확인합니다.
- dash의 상위 Breadcrumb 조합·dark·hover·pressed·focus·disabled를 이번 세 유형에서 검증한 것으로 표시하지 않습니다.
- 제품에서 source/public export를 확인한 뒤 로컬 mapping에 연결합니다. 정적 문서나 SVG 전달만으로 `implemented`로 바꾸지 않습니다.
