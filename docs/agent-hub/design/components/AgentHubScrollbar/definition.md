# AgentHubScrollbar — 정의와 범위

원본 `3155:20473`은 이름이 `scroll-bar`인 단일 COMPONENT입니다.
`componentPropertyDefinitions={}`, `variantProperties=null`, `reactions=[]`이며 INSTANCE·TEXT·SLOT 자식은 없습니다.
따라서 방향·노출 timing·스크롤 위치·disabled·길이를 제어하는 실제 Figma 속성이나 동작 API가 있다고 기록하지 않습니다.

```text
scroll-bar COMPONENT: 투명한11×180px 비교 영역
└─ thumb RECTANGLE: x3/y3·4×160px·radius9999·불투명 #DDD
```

| 원본 요소 | 실제 종류 | 역할과 확인 범위 |
| --- | --- | --- |
| `3155:20473` scroll-bar | COMPONENT | gutter의 정적 배치·표면 없음·클리핑 없음 |
| `3155:20472` thumb | RECTANGLE | 세로 도형 한 개·절대 배치·채움만 있음 |

root의 `overflowDirection=NONE`은 Figma 메타데이터입니다. 제품에서 내용이 넘쳐도 스크롤을 금지하거나 `overflow:hidden`만 적용하라는 지침이 아닙니다.
thumb가 보인다는 사실도 content 크기 측정·휠·키보드·드래그가 구현됐다는 증거가 아닙니다.

공용 ScrollArea는 native overflow viewport와 그 형제인 실제 DOM thumb를 사용합니다.
이 확장은 그 기능에 필요한 상태 소유권을 유지하고, 확인한 Agent Hub 시각만 제품 adapter에 연결합니다.
11px는 scrollbar gutter의 비교 폭이며 콘텐츠 viewport 전체를11px로 제한하는 값이 아닙니다.
180px와160px도 부모·콘텐츠 길이와 무관한 고정 runtime 크기로 사용하지 않습니다.

원본은 세로 thumb처럼 보이는 단일 샘플이며 orientation enum이나 양방향 조합이 없습니다.
hover/pressed·드래그 중·비활성·focus·숨김/표시 전환·dark·가로 방향·양방향 모서리·짧은 track는 별도 제품 검증 범위입니다.
실제 스크롤 의미와 viewport는 제품이 선택한 ScrollArea가 소유하고, 페이지는 콘텐츠·부모 크기·명시적 위치 이동 의도를 제공합니다.

공용을 켠 UI 작업에서만 `DOCS_ROOT/frontend/design/components/Scrollbar/definition.md`를 함께 읽습니다.
원본 serengeti-cmp의 구현은 비교 근거이며 이를 수정하거나 Agent Hub의 source/public export로 자동 매핑하지 않습니다.
