# AgentHubFileHeader — 정의와 공용 비교

[문서 인덱스](./README.md) · [Figma 관찰 기록](../../references/file-code-refresh.figma.json)

원본 `4056:17947`에서 확인한 세 variant입니다.
| 항목 | 관찰·채택 계약 |
| --- | --- |
| content=empty | 4056:17730, 제목 label + actions, 샘플910×48 |
| content=tabs | 4056:17773, 파일 탭 + actions, 샘플910×48 |
| content=tabs-overflow | 4056:17868, 클리핑된 탭 + overflow + actions + 왼쪽 fade, 샘플480×48 |
| 생성 참조 입력 | content, label, pause(Boolean, false) |

native 속성 ID·slot/visible binding은 생성 context만으로 확인되지 않았습니다.
생성 코드의 tab5개는 인스턴스 사용 예시이며 최대 개수·실제 파일 목록·고정 공개 API를 뜻하지 않습니다.

```text
FileHeader48
├─ empty: 제목 / tabs: FileTab 가로 묶음
│  └─ overflow일 때 숨은 탭 목록 명령
├─ actions: [선택적 pause] · tree toggle · more · expand · close
└─ overflow일 때 왼쪽 fade 장식
```

pause는 선택적 명령 **표시 여부**이며 실제 처리 작업이 정지됐다는 완료 상태가 아닙니다.
숨긴 액션·탭은 DOM과 간격에서도 제거하고 동작하지 않는 장식 버튼을 만들어 두지 않습니다.
more·overflow의 메뉴 내용은 정적 시안에 없으며 제품이 실제 명령을 공급합니다.
