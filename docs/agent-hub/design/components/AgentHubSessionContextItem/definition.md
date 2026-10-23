# AgentHubSessionContextItem — 정의와 컨텍스트 원본

원본 `2987:22151`은 `session/context-item` COMPONENT_SET이며 기본 state는 default입니다.
그룹의 icon+label, 대표 value, count TEXT로 구성됩니다. 별도 group 종류 variant는 없습니다.

```text
컨텍스트 행
├─ content
│  ├─ label-group: icon16 + label
│  └─ 대표 value
└─ count
```

| 실제 Figma 속성 | 기본값 |
| --- | --- |
| `icon#2987:12` | INSTANCE_SWAP, book-open/16 `2833:17122` |
| `label#2987:15` | TEXT, ‘지식’ |
| `value#2987:18` | TEXT, ‘사내 보고서 작성 가이드’ |
| `count#2987:21` | TEXT, ‘5’ |
| state | default / hovered / pressed / selected |

count는 Boolean이나 숫자 API가 아닌 표시 문자열입니다. value도 전체 목록·실제 선택 ID가 아니라 대표 표시값입니다.
샘플 문자열을 제품 기본 목록·권한·연결 개수로 고정하지 않습니다.

## 실제 Panel의 다섯 그룹

다섯 행은 모두 default 원본 `2987:22133`을 재사용하며 label/value/count/icon을 override합니다.

| label | value 샘플 | count | 실제 icon source |
| --- | --- | --- | --- |
| 첨부파일 | 회계_조직도_근무조회계_9월_업무일지.docx | 5 | file-text/20 `2762:73887` →16px |
| 볼륨 | 회사 업무일지 | 2 | forder/20 `2037:4537` →16px |
| 지식 | 사내 보고서 작성 가이드 | 5 | book-open/16 `2833:17122` |
| 도구 | 그룹웨어 메일 | 5 | wrench/16 `2833:16795` |
| 스킬 | report-writer | 3 | scroll-text/16 `2986:22091` |

원본 설명에 작업 폴더라는 그룹 예시가 있어도 실제 Panel label은 ‘볼륨’입니다.
이 표는 제품의 영구 그룹·순서·서버 목록을 확정하지 않습니다. source의 `forder` 철자와 제품 semantic 이름 folder도 구분합니다.
preferred key5개와 실제 재사용 source를 보존하되 모든 icon×state·locale 조합 검증으로 확대하지 않습니다.

이 구조에는 Flyout·Menu·Dropdown·Checkbox·Link 인스턴스가 없습니다.
selected나 clickable한 모습만으로 Flyout 자동 열기·새 연결·컨텍스트 제거를 추가하지 않습니다.

## 현재 채택: 대표 value viewport

value 원문 한 개를 비상호작용 viewport 안에 두고 [공용 긴 제목 표시](../../title-overflow.md)를 조합합니다.
기존 action host가 hover·focus·활성화를 계속 소유하고 value에 별도 button·tabIndex·복제 문자열을 만들지 않습니다.
icon·label-group66px·count는 고정하며 이동 대상은 value뿐입니다. 이는 사용자 채택 확장이고 원본 ENDING/maxLines1 관찰값은 보존합니다.
