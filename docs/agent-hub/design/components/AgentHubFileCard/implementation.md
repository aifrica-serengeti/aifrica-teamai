# AgentHubFileCard — 구현 연결

다음은 소비 제품의 새 구현/adapter를 위한 recipe입니다. 이 저장소의 실제 컴포넌트 export나 확정된 제품 API가 아닙니다.
공용을 켠 작업에서는 `DOCS_ROOT/frontend/design/component-workflow.md`와 `DOCS_ROOT/frontend/design/docs-only-build.md`를 함께 적용합니다.

## 역할을 나누어 연결합니다

제품에서 기존 파일 카드 source와 public export를 찾고 geometry/선택/메뉴가 호환되는지 확인합니다.
없다면 기능 범위에 새 FileCard를 만들되 파일 조회/권한/선택 집합을 카드 내부에서 별도로 보관하지 않습니다.
외부에서 `file`, `selected`, `onActivate`, `onSelectionChange`, `onMore`를 받는 구조는 가능한 **제품 제안**입니다.
실제 Figma 속성은 [정의](./definition.md)와 구분합니다. `state="hovered"`를 업무 저장 상태로 받지 않습니다.

```text
비대화형 root: relative / 선택 링의 overflow 허용
├─ card surface: radius24 / clip
│  ├─ 주 실행 host: 비사진형 header+preview 또는 사진
│  ├─ hover dim: pointer-events none
│  ├─ more button: 주 실행 host의 형제
│  └─ checkbox: 주 실행 host의 형제
└─ selection-ring: pointer-events none / inset-3 / border2 / radius26
```

주 실행 host가 형제 controls 밑에 넓게 깔려도 실제 z-index와 hit-test를 분리합니다.
checkbox를 누른 후 주 실행을 다시 호출하거나 title click과 wrapper click이 같은 실행을 두 번 호출하지 않습니다.
동등한 checkbox adapter를 사용하되32/20px 타일과 체크 정렬·선택 색을 원본에 맞춰 검증합니다.

## 원본 자산을 그대로 연결합니다

원본 export와 로컬 파일·SHA256 연결은 [자산 대조](../../references/components-refresh.assets.json)의 `sourceAsset`으로 찾습니다.
이번 카드 전용 슬롯별 경로는 [실측 JSON](../../references/cards-actions-refresh.figma.json)의 `fileCard.assetSlots`에 보존합니다.
header20px와 preview56px는 별개의 원본이며 preview를 일반 파일아이콘 타일로 바꾸지 않습니다.
header-content는 교차축 중앙, details는 세로 주축 중앙, preview glyph는 양축 중앙으로 연결합니다.32px 타일과 title/meta 묶음의 높이가 다르더라도 같은 중앙선을 사용합니다.
사진은 비교 fixture이므로 실제 파일의 썸네일 URL/설명은 제품에서 받습니다. 개발용 임시 URL을 제품 기본 이미지로 고정하지 않습니다.
사진형 img는 원본처럼 card 전체의 absolute inset0·width/height100%·object-fit:cover로 배치하고 radius24 내부에서 자릅니다. 파일 상태 전환에도 이 fit과 영역을 유지합니다. 독립 Thumbnail의 미확인 fit을 이유로 이 실제 사진 원본의 cover를 생략하지 않으며, 제품이 다른 crop을 채택하면 변경 근거를 별도로 남깁니다.

선택 링만 외곽 형제로 두고 hover dim은 card 내부에 두어 clip 소유권을 분리합니다.
색상·선·그림자 모션은 [스타일](./styles.md)의200ms ease와 reduced motion을 적용하며 신규 geometry 모션은 확정하지 않습니다.
제품 검증 전에는 공유 `unmapped`/`draft`를 구현 완료로 바꾸지 않습니다.
