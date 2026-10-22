# AgentHubSNBSectionHeader — 정의와 원본

원본 `2611:62413`은 `section-header` COMPONENT_SET입니다.
실제 공개 속성은 state VARIANT 하나이며 기본값 enabled, 선택지는 enabled/hovered입니다.
제목 TEXT·count·접힘 Boolean·보조 action 표시 Boolean은 root에 없습니다. 제품의 문자열·펼침·callback API는 별도 제안입니다.

| state | 실제 원본 | 제공된 subtree |
| --- | --- | --- |
| enabled | `2611:62411` | title-group과 제목만 존재 |
| hovered | `2611:62412` | 제목+접기 FRAME, 오른쪽 보조 버튼3개 |

```text
비대화형 Header root20
├─ title-group: section-title + hovered 구성의 collapse-toggle FRAME20
└─ hovered 구성의 보조 그룹60: ghost20 ×3
```

enabled에는 접기/보조 subtree가 없으며 visible=false인 동일 노드를 숨긴 상태가 아닙니다.
hovered는 제목 ‘section-title’과 chevron-down을 보여 주는 샘플이며 expanded/collapsed 상태 쌍이 아닙니다.
원본에는 접힘 glyph·disabled·selected·focus 상태가 없습니다.

| 위치 | 실제 구조와 source |
| --- | --- |
| collapse-toggle `2611:62350` | FRAME20, glyph16 INSTANCE `2611:62351` → chevron-down `2372:37015` |
| 보조1 `3016:104075` | ghost/default/20 `2909:49139`, glyph direct16 `3016:104217` |
| 보조2 `3016:104116` | 같은 ghost20, glyph filter16 `3016:104216` |
| 보조3 `3016:104157` | 같은 ghost20, glyph plus16 `2365:15015` |

접기 FRAME을 실제 IconButton 인스턴스로 기록하지 않습니다. glyph 이름은 필터 팝업·특정 route·생성 요청의 구현 증거가 아닙니다.
제목과 접기·각 보조 명령은 형제 host로 연결하며 전체 Header를 button으로 감싸지 않습니다.

실제 Panel의 ‘고정됨’·‘프로젝트’는 enabled source, ‘채팅’은 hovered source를 재사용하며 제목 문자열을 바꿉니다.
제목은 root TEXT property가 아닌 실제 TEXT layer override입니다. 샘플의 한국어 섹션3개를 제품의 고정 목록으로 만들지 않습니다.
