# AgentHubScrollbar — 정의와 범위

2026-11-05 보드의 `3679:88871` scroll-bar에는 direction=vertical·horizontal 두 variant가 있습니다.
생성 context도 `direction?: "vertical" | "horizontal"`과 기본 vertical을 제공합니다. 이는 생성 reference의 입력이며
기존 제품 ScrollArea의 `orientation` 공개 API를 강제 변경하거나 native property getter를 수집했다는 뜻이 아닙니다.
과거 단일 COMPONENT의 빈 props/variant 기록은 [역사 스냅샷](../../references/scrollbar.figma.json)으로 보존합니다.

| 방향 | 실제 source | 외곽 비교 영역 | thumb source·배치 |
| --- | --- | --- | --- |
| vertical | `3155:20473` | 11×180px | `3155:20472`·x3/y3·4×160 |
| horizontal | `3679:88872` | 180×11px | `3679:88873`·x3/y3·160×4 |

[갱신 근거](../../references/existing-components-refresh.figma.json)의 metadata는 방향·외곽 크기를,
생성 context는 thumb 크기·좌표·#DDD·radius9999를 확인하는 근거입니다.

root의 `overflowDirection=NONE`은 Figma 메타데이터입니다. 제품에서 내용이 넘쳐도 스크롤을 금지하거나 `overflow:hidden`만 적용하라는 지침이 아닙니다.
thumb가 보인다는 사실도 content 크기 측정·휠·키보드·드래그가 구현됐다는 증거가 아닙니다.

공용 ScrollArea는 native overflow viewport와 그 형제인 실제 DOM thumb를 사용합니다.
이 확장은 그 기능에 필요한 상태 소유권을 유지하고, 확인한 Agent Hub 시각만 제품 adapter에 연결합니다.
11px는 scrollbar gutter의 비교 폭이며 콘텐츠 viewport 전체를11px로 제한하는 값이 아닙니다.
180px와160px도 부모·콘텐츠 길이와 무관한 고정 runtime 크기로 사용하지 않습니다.

원본에는 vertical·horizontal 비교 샘플이 있지만 두 축이 동시에 보이는 모서리 조합은 없습니다.
hover/pressed·드래그 중·비활성·focus·숨김/표시 전환·dark·양방향 모서리·짧은 track는 별도 제품 검증 범위입니다.
실제 스크롤 의미와 viewport는 제품이 선택한 ScrollArea가 소유하고, 페이지는 콘텐츠·부모 크기·명시적 위치 이동 의도를 제공합니다.

공용을 켠 UI 작업에서만 `DOCS_ROOT/frontend/design/components/Scrollbar/definition.md`를 함께 읽습니다.
원본 serengeti-cmp의 구현은 비교 근거이며 이를 수정하거나 Agent Hub의 source/public export로 자동 매핑하지 않습니다.


상위 패널의 빈 공간을 피해야 하면 같은 엔진의 선택적 추가 track 끝 여백을 사용합니다.
콘텐츠 padding·native viewport 크기·실제 scroll range와 별개이며, 별도 thumb나 측정 엔진을 만드는 계약이 아닙니다.
