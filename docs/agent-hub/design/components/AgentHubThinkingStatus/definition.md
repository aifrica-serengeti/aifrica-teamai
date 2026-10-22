# AgentHubThinkingStatus — 정의와 실제 원본

생각 중 상태를 읽을 수 있는 텍스트와 기존 브랜드 이미지로 표시합니다.
사용자가 보낸 메시지·완성된 assistant 응답·중단 안내·진행률 bar와 구분합니다.
원본 `3016:118106`은 assistant-response FRAME `3016:118104` 안의 **FRAME 조합**입니다.
독립 COMPONENT/INSTANCE나 root variant·공개 속성·실행 API가 아닙니다.

```text
status/in-progress FRAME136×32 / HUG / gap8
├─ BrandMark INSTANCE32×32
└─ 상태 TEXT96×20: 생각하는 중 · 4초
```

| 실제 node | 확인한 구조 |
| --- | --- |
| 상태 행 `3016:118106` | 가로·HUG/HUG·세로 중앙 정렬, fills/strokes/effects 없음 |
| 마크 `3016:118107` | INSTANCE, source `2611:74302`, 표시32×32 |
| 실제 이미지 `I3016:118107;2611:74300` | RECTANGLE의 IMAGE paint, 기존 PNG와 같은 imageHash |
| 문구 `3016:118108` | TEXT, `생각하는 중 · 4초`,14/20·400, 정적5-stop gradient |

BrandMark 원본의2048×2048 PNG를32×32로 비율을 보존해 표시합니다.
source COMPONENT의180×180·실제 표시32×32·PNG 고유 해상도2048×2048을 구분합니다.
PNG는 정적 RGBA 이미지이며 GIF/APNG가 아닙니다. 새 이미지·아이콘·회전 variant가 필요하지 않습니다.

`label`·`elapsedSeconds`·request ID·phase·live 안내 입력은 [제품 API 제안](./implementation.md)입니다.
Figma FRAME에 이미 존재하는 속성으로 기록하지 않습니다. ‘4초’는 시작값·갱신 주기·완료 기준이 아닙니다.
완료·중단·실패 UI나 assistant 본문·Markdown·token stream은 이 단일 상태 행에 제공되지 않았습니다.

Header 하단 gradient의 흐름 요구는 [별도 motion 계약](../AgentHubChatHeader/motion.md)에 둡니다.
Header에 motion이 있다는 이유로 이 상태 텍스트나 BrandMark에도 애니메이션을 추가하지 않습니다.
현재 글자 shimmer는 Header에서 유추한 동작이 아니라 [별도로 명시된 사용자 채택](./styles.md)입니다.
원본5-stop 비교값은 보존하되 소비 recipe의 고정 배경은 균일한 단색으로 바꾸고 두 띠의 주기적 패턴만 움직입니다.
빨간 설명·테두리 `3016:118112`/`3016:118113`은 개발 주석이며 제품 DOM·자산·읽기 순서에서 제외합니다.
