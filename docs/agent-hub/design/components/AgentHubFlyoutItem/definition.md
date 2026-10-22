# AgentHubFlyoutItem — 정의와 실제 지원 조합

원본 `3005:23146`은 `flyout/item` COMPONENT_SET입니다. 기본값은 kind=item·state=default입니다.
속성 목록에 종류와 상태가 각각 네 개씩 있어도 실제16개 조합을 제공하는 것은 아닙니다.

| kind | 실제 variant | 구조 |
| --- | --- | --- |
| item | default·pressed·selected·hovered | icon + label |
| folder | default·hovered | 오른쪽을 향한 chevron + icon + label + count |
| folder-open | default·hovered | 아래쪽을 향한 chevron + icon + label + count |
| child | default·hovered | 들여쓴 label + meta |

folder와 folder-open은 펼침 상태에 따른 표시 차이입니다. 선택 값·포커스·누름 상태와 별도로 관리합니다.
child에는 아이콘이나 chevron 인스턴스가 없습니다. 공용 Tree의 connector·leaf marker·Checkbox·더 보기 버튼도 이 원본에는 없습니다.

| Figma 속성 | 기본값과 실제 연결 |
| --- | --- |
| `label#3005:4` | TEXT, ‘파일 이름.docx’, 모든 variant의 label |
| `icon#3005:13` | INSTANCE_SWAP, file-text/20 `2762:73887`, item과 두 folder 종류의 icon |
| `count#3005:22` | TEXT, ‘7’, 두 folder 종류의 우측 count |
| `meta#3005:31` | BOOLEAN, true, child meta의 visible |
| `meta#3005:40` | TEXT, ‘방금 생성’, child meta의 characters |

같은 이름의 `meta` 두 속성은 표시 여부와 문구로 나눕니다. 문자열이 비었는지를 Boolean 대신 사용하거나,
표시 Boolean을 문구로 변환하지 않습니다. meta=true는 실제 두 child variant에서 보이며 false의 완성 배치는 별도로 측정하지 않았습니다.

## 실제 하위 원본

- item과 folder의 기본 icon은 모두 **file-text/20 `2762:73887`를16px로 표시한 인스턴스**입니다.
  kind가 folder라고 해서 자동으로 folder/folder-open 도형을 넣지 않습니다.
- folder의 chevron-right는16px 원본 `2842:38917`, folder-open의 chevron-down은16px 원본 `2372:37015`입니다.
- 아이콘 swap의 preferred component key8개는 선택 후보 목록입니다. 모든 도형·자산·상태색을 검증했다는 뜻은 아닙니다.

[자산 기록](../../references/flyout.assets.json)의 정확한 내보내기 결과를 제품의 자산 경로에 연결합니다.
아이콘 원본 재사용과 Button·Tree의 의미 참조를 구분하고, 실제 파일 열기·폴더 API·권한·route는 제품에서 확인합니다.
