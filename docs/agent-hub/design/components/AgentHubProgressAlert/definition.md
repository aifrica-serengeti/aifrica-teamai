# AgentHubProgressAlert — 정의와 재사용 관계

Figma 원본 `3016:102212`는 `progress-alert`라는 단일 COMPONENT입니다. root의 component properties는 `{}`이며
state·kind enum이나 제목의 TEXT property를 제공하지 않습니다. 하위 버튼 두 개의 variant와 label property를
root의 상태 모델로 바꾸지 않습니다.

## 확인한 구조

```text
중단 안내 surface
├─ 안내 그룹
│  ├─ circle-alert 아이콘 20px
│  └─ 제목 ‘응답이 중단되었습니다.’
└─ 동작 그룹
   ├─ tertiary·28·enabled 버튼 ‘다시시도’
   └─ tertiary·28·enabled 버튼 ‘프롬프트 편집’
```

제목과 버튼 문구는 고정 샘플입니다. 제품이 전달한 실제 안내·locale을 연결할 수 있지만, 그것은
[제안 API](./implementation.md)의 연결점이며 Figma root에 해당 속성이 이미 있다는 뜻은 아닙니다.
두 버튼 label만 `label#3025:0` TEXT property에 연결되어 있습니다.

## 실제 하위 원본

| 요소 | 인스턴스 → 원본 | 재사용 범위 |
| --- | --- | --- |
| 안내 아이콘 | `2898:23789` → `2898:23788` `icon/circle-alert/20` | 기존 AgentHubIcon의 20px 자산·1.25px 선·#1C1C1C |
| 다시시도 버튼 | `3214:59163` → `3109:144` | AgentHubButton `tertiary`·`28`·`enabled`, 샘플 폭 65px |
| 프롬프트 편집 버튼 | `3214:59239` → `3109:144` | 같은 버튼 원본, 샘플 폭 92px |

두 버튼의 leading-icon·trailing-icon·keycap property는 모두 false이며 실제 자식은 label 한 개뿐입니다.
생성 코드가 원본 버튼의 비활성 slot 자산을 참조하더라도 숨김 아이콘·keycap을 다운로드하거나 렌더하지 않습니다.
직접 의존성은 `AgentHubButton`, `AgentHubIcon`으로 한정합니다.

기존 [아이콘 manifest](../../asset-manifest.json)의 `circle-alert`·size20과
[SVG](../../assets/icons/circle-alert/20.svg)를 사용합니다. 새 SVG나 임의의 유사 아이콘을 추가하지 않습니다.

## 공용과의 경계

공용을 켠 환경에서만 `DOCS_ROOT/frontend/design/components/Notification/README.md`,
`DOCS_ROOT/frontend/design/components/Status/README.md`, `DOCS_ROOT/frontend/design/components/Spinner/README.md`를
의미 비교에 참고합니다. 현재 시안은 이 컴포넌트들의 원본 인스턴스를 사용하지 않습니다.

Notification의 accent bar·Toast 스택·자동 닫기, Status의 상태 enum, Spinner의 회전,
AsyncContentState의 조회 overlay·최소 노출 timer를 자동 상속하지 않습니다.
이 시안에는 진행률·남은 시간·실행 취소·dismiss·요청 성공/실패의 전체 상태 모델이 없습니다.
