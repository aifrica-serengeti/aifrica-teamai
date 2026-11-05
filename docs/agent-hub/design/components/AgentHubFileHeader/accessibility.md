# AgentHubFileHeader — 접근성

[문서 인덱스](./README.md) · [Figma 관찰 기록](../../references/file-code-refresh.figma.json)

이름 있는 파일 패널 header 안에 파일 Tablist와 독립 명령 버튼을 둡니다.
버튼은 실제 명령에 맞춰 `파일 트리 표시/숨기기`, `파일 메뉴`, `확대`, `닫기`, 필요 시 `생성 중지` 등 이름을 공급합니다.
pause의 생성 도형 이름이 icon/plus/24이더라도 레이블을 '추가'로 추측하지 않습니다.

Tablist의 선택·키보드 계약은 FileTab 문서를 따릅니다. 숨은 파일 목록 버튼은 aria-haspopup/menu·열림 상태·연결 대상을 실제 메뉴에 맞춥니다.
닫기 이후 이전 유효 trigger로 focus를 돌리는 owner를 제품 패널에 두고 마지막 탭 닫기·패널 닫기를 구분합니다.
장식 fade는 포인터/접근성 대상이 아니며 가려진 tab·focus 윤곽을 키보드로 실제 드러낼 수 있게 합니다.
disabled 명령은 native 차단을 유지하고 glyph나 parent에서 요청을 우회 호출하지 않습니다.
