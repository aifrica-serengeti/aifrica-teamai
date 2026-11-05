# AgentHubFileTree — 정의와 공용 비교

[문서 인덱스](./README.md) · [Figma 관찰 기록](../../references/file-code-refresh.figma.json)

원본 `3746:99265`는 **단일 COMPONENT**이고 state variant set이 아닙니다.
샘플400×991px에 Search와31개의 파일/폴더 행을 배치했습니다.
샘플의 데이터·31개 행·고정 높이가 모든 제품의 기본값이나 데이터 제한은 아닙니다.

```text
FileTree panel
├─ AgentHubSearch32
└─ tree viewport
   └─ AgentHubFileTreeEntry28을 gap0으로 배치
```

실제 Search는 source `2304:19748`에 해당하는 인스턴스이며 파일/폴더 검색 placeholder와 leading search16을 보여 줍니다.
원본 label·샘플 폴더명은 비교 데이터 근거일 뿐, 실제 fileId·권한·파일 조회 API를 정의하지 않습니다.
단일 sample에 열림/선택/빈 결과/오류/네트워크 상태의 전체 matrix가 있다고 판단하지 않습니다.
생성 참조에는 className 외 제품 data props가 없고 native 속성 정의·binding은 별도 확인되지 않았습니다.
