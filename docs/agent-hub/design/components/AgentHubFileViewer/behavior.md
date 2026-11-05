# AgentHubFileViewer — 동작과 상태 소유권

[문서 인덱스](./README.md) · [Figma 관찰 기록](../../references/file-code-refresh.figma.json)

파일 경로·원문·syntax 결과·현재 파일·조회 상태·확대 상태는 제품 owner가 공급합니다.
읽기 전용 Viewer에서 code editor의 cursor·입력·undo 상태를 새로 만들지 않습니다.
새 파일 조회를 연결하면 현재 fileId와 완료 응답의 일치를 확인하고 이전 요청 취소/지연 응답 처리를 제품 데이터 계층에서 관리합니다.

복사는 표시된 줄 번호·guide·decorative 문자를 제외한 **원본 코드**에 대해 한 번만 실행합니다.
성공/실패와 일시적 '복사됨' 표시는 실제 clipboard 결과에 연결합니다. 기존 제품의 검증된 copy interaction이 있으면 재사용하며
hover tooltip과 성공 타이머 수명을 섞어 포인터가 떠난 뒤 툴팁이 계속 남지 않게 합니다.
이는 제품 행동 계약이고 Figma에 복사됨 variant가 관찰됐다는 뜻이 아닙니다.

확대는 panel owner에 요청하고 현재 파일/선택/스크롤 위치를 별도 사본으로 초기화하지 않습니다.
한 native viewport에 수평·수직 스크롤을 연결하고 AgentHubScrollbar는 실제 metrics를 표현합니다.
복사/확대 actions는 viewport 위 overlay로 유지할 수 있으나 코드·selection·focus를 가리면 안 됩니다.
50개 행·정적 track는 시각 비교 예시이며 실제 파일 길이에 따라 scroll range/thumbnail을 계산합니다.
