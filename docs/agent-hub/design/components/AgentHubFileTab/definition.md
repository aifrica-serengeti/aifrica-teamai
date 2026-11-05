# AgentHubFileTab — 정의와 공용 비교

[문서 인덱스](./README.md) · [Figma 관찰 기록](../../references/file-code-refresh.figma.json)

원본 `4056:17720`의 state=default `4056:17709`, state=active `4056:17716` 두 조합입니다.
생성 참조에 label 문자열과 state가 있고 native TEXT/VARIANT의 ID·binding은 별도로 노출되지 않았습니다.

```text
FileTab 가로 묶음
├─ 파일 선택 tab trigger: label
└─ 독립 닫기 IconButton24: glyph16
```

Figma 생성 코드는 div 두 개를 묶은 정적 구조입니다. 이를 클릭 가능한 button 안에 또 button을 중첩하는 근거로 쓰지 않습니다.
실제 DOM은 탭 선택 trigger와 닫기 버튼을 형제로 조합합니다.
파일 ID·현재 파일·열린 파일 목록은 FileHeader를 사용하는 제품 owner가 관리합니다.

active는 현재 파일을 뜻하고 CSS :active의 누르는 순간·hover·키보드 focus와 다릅니다.
다른 파일과 이름이 같아도 안정적인 fileId로 식별하며 label을 key/상태 ID로 사용하지 않습니다.
