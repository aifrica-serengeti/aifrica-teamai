# AgentHubFileItem — 다운로드와 상태 소유권

파일 ID·파일명·형식 표시·확장자·용량·타일 type은 제품 데이터 adapter가 제공합니다.
파일 유형 표시를 업로드 허용·MIME 검증·다운로드 권한 판정으로 사용하지 않습니다.
파일명 문자열이나 확장자에서 임의 URL·실행 정책을 만들지 않습니다.

이 원본의 root는 파일 정보를 담는 표면이며 전체 행 선택/열기 action은 확인되지 않았습니다.
다운로드 버튼이 있는 행 전체를 button으로 감싸지 않습니다. 별도 파일 열기를 제품이 채택하면 다운로드 조작과 형제로 구성합니다.

설명상 버튼은 다운로드 드롭다운을 의도합니다. 실제 메뉴·선택지·압축·원본/변환 다운로드·URL·파일 저장 결과는 제품 owner가 정합니다.
chevron만 보고 메뉴 항목이나 브라우저 다운로드를 자동 실행하지 않습니다.
메뉴를 채택하면 실제 popup primitive의 열림·keyboard·focus 복귀와 명령 한 실행 경로를 연결합니다.

기존 AgentHubButton의 native button type=button·Enter/Space·disabled 차단을 유지합니다.
trigger click 한 경로에서 요청하고 wrapper·chevron·별도 keydown에서 같은 callback을 중복 실행하지 않습니다.
파일 요청·대상 revision·권한·pending guard·중복 요청·실패 복구·표시 상태는 제품이 소유합니다.
클릭만으로 파일·대화·draft·첨부를 삭제하거나 초기화하지 않습니다.

size=false이면 file-size와 size-divider를 함께 제거합니다. true일 때 형식화한 문자열을 제공하며 raw byte 계산·locale은 제품 adapter가 소유합니다.
선언된 button Boolean의 visible 연결과 false 화면은 미확인입니다. 제품에서 버튼 숨김을 채택하면 표시 여부와 실제 명령을 명시적으로 연결해 검증합니다.
숨긴 leading/keycap은 렌더하지 않으며 Esc 단축키를 등록하지 않습니다.

root 상태 enum·loading·성공 토스트·재시도·파일 미리보기는 이 단일 시안에 없습니다.
필요한 기능은 기존 제품 owner와 별도 계약으로 연결하고 문서의 정적 source 비교를 실제 요청 검증으로 취급하지 않습니다.


## 공용 색상 모션

공용을 채택한 경우 [Card 모션 적용](../../cards.md#공용-색상-모션-계승)과 [공용 모션](../../motion.md)을 따릅니다.
root의 background-color·border-color·box-shadow·color와 해당 텍스트 color는200ms ease로 전환합니다.
이 값은 공용 계승 계약이며 Figma 정적 시안의 motion 실측값이 아닙니다. 원본에 없는 상태·표면은 새로 만들지 않습니다.
disabled 입력은 즉시 차단하고 이 계약의 paint·opacity·정확한 SVG를 유지합니다. reduced motion에서는 전환을 해제합니다.
