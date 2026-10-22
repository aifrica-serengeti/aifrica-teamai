# AgentHubIcon — 접근성

- 텍스트 label과 같은 뜻이면 장식으로 처리합니다. SVG는 `aria-hidden="true"`, img는 `alt=""`를 사용합니다.
- 아이콘만 있는 버튼은 버튼에 ‘복사’, ‘삭제’처럼 동작 이름을 붙입니다. asset 이름을 그대로 읽게 하지 않습니다.
- 독립 정보 이미지라면 의미 있는 label을 제공합니다. 중복으로 이름을 읽지 않게 합니다.
- SVG 자체에 tab stop이나 click handler를 두지 않습니다. 키보드·focus·disabled·hit area는 컨트롤이 소유합니다.
- 색만으로 선택·오류를 구별하지 않고 제품 배경과의 대비를 확인합니다.
