# AgentHubOutputViewer — 정의와 슬롯·하위 원본

원본 `3015:24221`은 `output-viewer` 단일 COMPONENT입니다. state/type variant set이 아닙니다.
파일/산출물 제목과 형식, 확대/닫기 조작의 시각, 비어 있는 본문 SLOT로 구성됩니다.

```text
Viewer root: 세로 고정 크기 샘플, Mid 효과
├─ Header: 위쪽 두 모서리만16
│  ├─ title-area
│  │  └─ title-group: title + 표시할 때 dot + type
│  └─ ABSOLUTE actions
│     ├─ 표시할 때 expand IconButton
│     └─ 표시할 때 close IconButton
└─ content SLOT: 남은 높이 FILL, 아래쪽 두 모서리만16
```

## 실제 Figma 속성

| 속성 | 타입·기본값과 연결 |
| --- | --- |
| `title#3015:0` | TEXT, ‘title’, 제목 characters |
| `type#3015:1` | TEXT, ‘file-format’, 형식 characters |
| `show type#3015:2` | BOOLEAN, true, dot와 type의 visible에 함께 연결 |
| `show expand#3015:3` | BOOLEAN, true, expand-button visible |
| `show close#3015:4` | BOOLEAN, true, close-button visible |
| `content#3015:5` | SLOT, content의 slotContentId에 연결·preferredValues 빈 목록 |

type은 파일 형식 **표시 문자열**이며 HTML input/button type이나 파일 유형 enum이 아닙니다.
‘title’·‘file-format’과 설명의 MD/PDF 예시를 실제 기본 데이터·허용 파일 목록으로 고정하지 않습니다.
show type을 끄는 구현은 dot와 형식 문구를 함께 제거하며, 별도 type만 남기거나 빈 gap을 유지하지 않습니다.
세 Boolean의 가능한8개 조합은 속성으로부터 계산한 수이며8개 완성 시안을 측정한 것은 아닙니다.

content 노드 `3015:24236`은 실제 SLOT이고 `children: []`입니다.
빈 슬롯은 네트워크 로딩·조회 실패·빈 파일 상태가 아닙니다. 설명에서 자유로운 미리보기 배치와 인스턴스 높이에 따른 FILL을 확인했지만
실제 PDF/Markdown/HTML·코드·이미지 renderer, 편집기·탭·스크롤·확대 콘텐츠는 제공되지 않았습니다.

## 확인한 실제 하위 원본

| 구성 | 인스턴스 → 실제 source | 확인한 표시 |
| --- | --- | --- |
| expand 버튼 | `3015:24222` → `2427:25108` | ghost/default/24 |
| expand glyph | `I3015:24222;2427:25109` → `3015:24201` | maximize/16 |
| close 버튼 | `3015:24226` → `2427:25108` | ghost/default/24 |
| close glyph | `I3015:24226;2427:25109` → `2311:46284` | x/16 |

두 glyph의 저장 노드 이름과 생성 코드 이름은 `icon/plus/24`이지만 실제 source·도형은 maximize16과 x16입니다.
이름만 보고 plus나24px glyph로 교체하지 않습니다. 정확한 자산은 [자산 기록](../../references/output-viewer.assets.json)에 연결합니다.
dot은 ELLIPSE이며 Icon·Badge·상태/읽음 indicator가 아닙니다.

실제 Tab·Menu·Dialog·OpenPanel·Scrollbar 인스턴스는 없습니다.
공용을 켠 환경에서만 `DOCS_ROOT/frontend/design/components/Dialog/README.md`,
`DOCS_ROOT/frontend/design/components/OpenPanel/README.md`, `DOCS_ROOT/frontend/design/components/Scrollbar/README.md`를
제품의 표시 방식과 비교합니다. modal·포털·scrim·resize handle·모션은 이 원본만으로 확정하지 않습니다.

[Session 출력 행](../AgentHubSessionItem/behavior.md)에서 Viewer를 여는 실제 연결도 제품이 채택·검증합니다.
출력 선택·파일 조회·다운로드·편집·닫힘의 API와 상태는 기존 제품 owner에 연결하며 이 정적 패널에서 새 실행 정책을 만들지 않습니다.
