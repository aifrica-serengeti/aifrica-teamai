# AgentHubFileIcon — 정의

Figma `file-icon` component set의 `type` variant 6종을 사용합니다.

| type | 의미 | 자산 |
| --- | --- | --- |
| spreadsheet | 스프레드시트 | [spreadsheet.svg](../../assets/files/spreadsheet.svg) |
| presentation | 프레젠테이션 | [presentation.svg](../../assets/files/presentation.svg) |
| document | 일반 문서 | [document.svg](../../assets/files/document.svg) |
| pdf | PDF | [pdf.svg](../../assets/files/pdf.svg) |
| code | 코드 파일 | [code.svg](../../assets/files/code.svg) |
| archive | 압축 파일 | [archive.svg](../../assets/files/archive.svg) |

권장 표시 API는 `type`과 장식/의미 label입니다. Figma 기본 variant는 spreadsheet이지만,
제품 API에서 type을 생략했다고 spreadsheet으로 판별하지 않습니다. 알 수 없는 유형은 제품의
명시적인 fallback으로 처리합니다. 제품 source/export와 실제 API는 아직 `unmapped`입니다.
직접 공용 컴포넌트 의존성은 없으며 파일명·용량·삭제·다운로드 동작은 호출부가 소유합니다.
