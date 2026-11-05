# AgentHubFileViewer — 정의와 공용 비교

[문서 인덱스](./README.md) · [Figma 관찰 기록](../../references/file-code-refresh.figma.json)

원본 `3746:96091`는 단일 COMPONENT이며 샘플407×1022px입니다.
path42px와 code-block980px,50개 코드 행, 복사·maximize·정적 스크롤 장식을 확인했습니다.
단일 JS 예시가 지원 언어 전체·파일 API·편집 가능 상태를 정하지 않습니다.

```text
FileViewer
├─ file-path42: 경로 문자열
└─ code-block: 코드 행50개 sample
   ├─ CodeLine 인스턴스, JetBrains Mono12px override
   ├─ 오른쪽 위 copy / maximize
   ├─ 정적 세로 scrollbar 샘플
   └─ 아래 scroll-corner 장식 slot
```

path는 slash가 포함된 텍스트이며 Breadcrumb 링크·각 경로 클릭 기능은 확인되지 않았습니다.
코드의 syntax 색상은 정적 span 결과이고 parser/language engine 구현의 증거가 아닙니다.
생성 참조에는 className 외 제품 API가 없고 native property/slot/instance-swap binding은 별도 확인되지 않았습니다.
scroll-corner는16px 비어 있는 RoundedCorner 노드로 출력되어 실제 glyph 도형까지 추정하지 않습니다.
