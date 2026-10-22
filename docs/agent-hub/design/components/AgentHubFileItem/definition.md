# AgentHubFileItem — 정의와 속성·하위 원본

원본 `3128:25559`는 단일 `file-item` COMPONENT입니다. root state나 size variant set이 아닙니다.

```text
비대화형 파일 행
├─ 노출된 FileIcon 인스턴스44
├─ info
│  ├─ title
│  └─ meta: 선택적 file-size + 선택적 size-divider + file-type + Divider + extension
└─ 실제 다운로드 버튼: label + trailing chevron
```

| 실제 Figma 속성 | 타입·기본값과 연결 |
| --- | --- |
| `title#3128:0` | TEXT, ‘title’, 파일명 |
| `file-type#3128:1` | TEXT, ‘file-type’, 형식 이름 |
| `extension#3128:2` | TEXT, ‘extension’, 확장자 표시 |
| `file-size#3128:3` | TEXT, ‘file-size’, 숨김 크기 문구 |
| `size#3128:4` | BOOLEAN, false, file-size와 size-divider visible |
| `button#3128:5` | BOOLEAN, true, 선언은 확인했으나 수집된 노드의 visible 연결은 확인하지 못함 |

size는 치수 enum이 아닌 크기 문구의 표시 여부입니다. 제목·파일 형식·확장자·용량은 표시 문자열이며 샘플을 실제 파일 정보로 고정하지 않습니다.
size-divider는 숨김 VECTOR입니다. 이름이나 생성 코드에서 선처럼 표현돼도 별도 Divider 인스턴스가 아닙니다.
button Boolean은 실제 정의에 있지만 현재 button 노드의 property reference는 비어 있고 생성 코드에서도 조건 없이 보입니다.
button=false를 제품에서 제공한다면 명시적인 표시 API와 레이아웃 검증을 연결하며 원본 false 렌더를 확인했다고 기록하지 않습니다.

## 실제 하위 원본

| 구성 | 인스턴스 → source | 실제 조합 |
| --- | --- | --- |
| 파일 타일 | `3128:25560` → `3128:25501` | file-icon spreadsheet·44×44, 노출된 인스턴스 |
| 형식/확장자 Divider | `3128:25553` → `2874:45712` | Vertical, 원본17×165 → 표시17×8 |
| 다운로드 버튼 | `3074:100371` → `3109:144` | tertiary·28·enabled, 원본185×28 → 표시85×28 |
| trailing glyph | `I3074:100371;3109:155` → `2372:37015` | chevron-down/16, 표시16 |

공용 Divider의 다른 문서 예시에 쓰인 `2019:118`과 현재 source `2874:45712`의 identity를 같다고 쓰지 않습니다.
현재 버튼은 label ‘다운로드’, trailing-icon=true, leading-icon=false, keycap=false입니다.
숨긴 leading plus와 keycap 자식이 raw에 있어도 실제 표시·Tab·단축키·새 의존성으로 추가하지 않습니다.

타일 type은 노출된 FileIcon 인스턴스에서 선택합니다. root에 별도 파일 type enum 속성이 있는 것은 아닙니다.
관찰한 타일은 spreadsheet 하나이며 [FileIcon 계약](../AgentHubFileIcon/definition.md)의 다른 형식을 이 행에 조합한 완성 시안까지 검증하지 않았습니다.
버튼 설명은 다운로드 드롭다운을 의도하지만 실제 Menu·명령 목록·route·다운로드 요청은 이 노드에 없습니다.
