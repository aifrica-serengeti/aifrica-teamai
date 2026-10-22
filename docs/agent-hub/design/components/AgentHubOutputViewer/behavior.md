# AgentHubOutputViewer — 동작과 상태 소유권

원본은 제목·형식·두 선택적 버튼·본문 SLOT을 조합한 단일 패널입니다.
확대·닫기 control을 포함해 reactions 속성이 있는18개 노드 모두 프로토타입 연결이 비어 있습니다.
실제 파일 조회·닫기·확대·문서 렌더러는 아래 제품 owner와 제안 API로 연결합니다.

| 표시·동작 | 소유자 | 연결 원칙 |
| --- | --- | --- |
| 선택한 output ID·파일 정보·조회 결과 | 제품의 산출물 owner | 제목·형식 문자열을 실제 데이터에서 제공 |
| 패널 표시·닫기 | 제품의 Viewer owner | close 요청을 받아 표시 상태와 focus 복귀를 함께 결정 |
| 확대 요청·배치 크기 | 제품 shell/Viewer owner | 검증한 확대 배치로 연결하며 브라우저 fullscreen을 자동 호출하지 않음 |
| show type | 제품 adapter | 점과 형식 텍스트를 함께 표시·제거 |
| show expand / show close | 제품 adapter | 실제 처리할 수 있는 독립 명령만 표시 |
| content SLOT | 제품의 preview owner | 본문·조회 중·오류·지원하지 않는 형식 등 제품이 채택한 콘텐츠를 제공 |
| 본문 viewport·스크롤 | 제품의 콘텐츠/배치 owner | 제한된 높이에서 마지막 내용과 keyboard focus에 접근 가능하게 구성 |

Session의 `onOutputActivate(outputId)`는 제품에 산출물 활성화 의도를 전달합니다.
제품이 실제 파일 ID·조회 권한·현재 선택을 확인하고 Viewer에 제목·형식·content를 제공합니다.
Session의 행 선택, Viewer의 열린 상태, 콘텐츠 조회 수명은 서로 명시적으로 연결하며 Viewer 안에 경쟁하는 선택·fetch 상태를 복제하지 않습니다.
여러 파일을 빠르게 선택한 경우 이전 요청 결과가 새 제목 아래 표시되지 않도록 요청·결과의 output ID 일치와 취소/폐기 정책을 제품이 검증합니다.

expand/close는 각각 [AgentHubIconButton](../AgentHubIconButton/README.md)의 native 활성화 한 경로를 사용합니다.
click에서 명령을 한 번만 요청하고 Enter/Space의 native 활성화에 같은 keydown callback을 더하지 않습니다.
두 버튼·glyph·header wrapper에 동일 handler를 중복 등록하지 않습니다. 닫기는 파일 삭제·다운로드·실행 취소를 뜻하지 않습니다.

확대 아이콘은 maximize16이고 실제 expanded/restore variant는 없습니다. 버튼 그림만으로 modal·새 창·브라우저 fullscreen·드래그 resize를 채택하지 않습니다.
확대 후 동작과 복원 컨트롤이 필요한 제품은 해당 배치·제어·focus 계약을 별도 확장으로 검증합니다.
close/expand를 숨기면 해당 button·glyph·Tab target을 제거하고 actions의 gap도 남은 항목에 맞춥니다.
점과 형식은 같은 `show type#3015:2` Boolean을 따릅니다. showType=false가 파일 형식·renderer·다운로드 정책을 변경하는 것은 아닙니다.

`content#3015:5`는 실제 SLOT이며 기본 자식은 없습니다. 빈 SLOT을 loading·error·empty 안내로 해석하지 않습니다.
“MD, PDF 등”이라는 설명과 type 문자열은 형식별 renderer가 제공됐다는 증거가 아닙니다.
본문을 채우는 renderer·문서 데이터·외부 콘텐츠의 표시 방식과 처리 가능 형식은 소비 제품에서 결정하고 검증합니다.

원본 높이977px와 content943px는 비교용 크기입니다. 인스턴스 높이를 바꾸면 header 아래 남은 공간을 content가 FILL하는 구조이며 resize handle은 없습니다.
원본 content는 clipping=true·overflowDirection=NONE입니다. 이 metadata는 실제 scroll 구현의 증거가 아니므로
제품에서 충분한 가용 높이와 실제 viewport를 제공하고 내용·focus가 잘리지 않는지 확인합니다.
좁은 폭·긴 제목·실제 문서·요청 상태·확대 전환 모션은 별도 제품 검증 범위입니다.

공용을 켠 UI 작업에서는 관련 공용 절차를 함께 적용하며, 공용을 끈 제품은 자체 절차를 따릅니다.
실제 source/export는 제품 검증 후 로컬에 매핑하고 그 전에는 `unmapped`와 공유 설정의 `draft`를 유지합니다.

## 명시적으로 채택한 본문 scroll

[이번 채택](../../motion.md)은 실제 본문 viewport의 wheel/touch/keyboard/drag와 resize·콘텐츠 변경 재측정을 연결합니다.
header는 스크롤하지 않고 같은 output ID의 읽던 위치를 불필요한 렌더마다 초기화하지 않습니다.
파일 전환 시 위치 복원/초기화가 필요하면 기존 output owner의 명시적 정책으로 처리합니다. 확대·닫기·focus 복귀 owner는 유지합니다.
