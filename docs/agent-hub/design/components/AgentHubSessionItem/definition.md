# AgentHubSessionItem — 정의와 원본

원본 `2986:22114`는 `session/item` COMPONENT_SET이며 기본 state는 default입니다.
예약과 출력은 같은 행의 데이터·아이콘·meta 조합으로 표시하며 별도 kind variant는 없습니다.

```text
예약 또는 출력 행
├─ icon-box FRAME28
│  └─ icon INSTANCE16
└─ content
   ├─ title
   └─ 표시할 때 meta
```

| 실제 Figma 속성 | 기본값과 연결 |
| --- | --- |
| `title#2986:0` | TEXT, ‘항목 이름’, value라는 이름의 제목 노드 |
| `meta#2986:3` | BOOLEAN, false, meta visible |
| `meta#2986:6` | TEXT, ‘매주 월요일’, meta characters |
| `icon#2986:9` | INSTANCE_SWAP, file-text/20 `2762:73887` |
| state | default / hovered / pressed / selected |

원본 설명의 `has-meta`는 사용 의도 표현입니다. 실제 속성 키는 meta BOOLEAN과 같은 이름의 meta TEXT이므로
표시 여부와 문구를 구분합니다. 네 standalone meta 노드는 존재하지만 모두 숨겨져 있습니다.

## Panel에서 확인한 조합

예약 인스턴스 `2975:69417`은 default 원본 `2986:22092`를 재사용합니다.
schedule/20 `2053:5271`로 icon을 바꾸고 meta=true·‘매시간’·실제 예약 제목을 연결했습니다.
출력 다섯 행도 같은 default 원본이며 meta=false, file-text/table/code/image 아이콘을 사용합니다.
code는 HTML·Python 샘플 두 행에 사용됐습니다. 확장자만으로 보안·실행 정책이나 전체 파일 형식 분류기를 만들지 않습니다.

| 표시 | 확인한 icon source |
| --- | --- |
| 기본·문서 출력 | file-text/20 `2762:73887` |
| 예약 | schedule/20 `2053:5271` |
| 표 출력 | table/20 `2762:73885` |
| 코드 출력 | code/20 `2886:54298` |
| 이미지 출력 | image/20 `2057:16192` |

모두 표시 box는16px입니다. 실제 자산은 [자산 기록](../../references/session.assets.json)에 연결하고 native20 파일을 그대로16px box에
임의 재축소하지 않습니다. preferred key5개와 실제 관찰한 source를 구분하며 모든 swap×상태 조합을 검증한 것으로 기록하지 않습니다.

이 행에는 Menu·Checkbox·Link·Tree·예약 편집기·다운로드 Button 인스턴스가 없습니다.
선택 표시와 예약/출력 활성화의 실제 의미는 제품이 정합니다.


## 현재 채택: 긴 제목 viewport

제목 원문 한 개를 비상호작용 viewport 안에 두고 [공용 긴 제목 표시](../../title-overflow.md)를 조합합니다.
상위 native 주 동작이 hover·focus·활성화를 소유하며 제목에 버튼이나 Tab 정지점을 추가하지 않습니다.
선택·expanded·업무 요청·파일/예약 데이터는 기존 owner에 남습니다.
