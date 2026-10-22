# AgentHubDialogFooter — 정의와 하위 원본

원본 `3151:20373`은 `dialog/footer` 단일 COMPONENT입니다. variant는 null이고 수집한 모든 reactions는 비어 있습니다.
root의 실제 공개 속성은 다음 하나입니다.

| 원본 속성 | 타입·기본값 | 실제 연결 |
| --- | --- | --- |
| `cancel#3151:0` | BOOLEAN·true | `3151:20371` cancel 인스턴스의 visible |

cancel은 취소 버튼의 **노출값**이며 open·dismiss 허용·요청 취소·disabled 상태가 아닙니다.
버튼 label·pending·callback·폼 제출 방식은 root의 실제 Figma 속성으로 노출되지 않았습니다.
두 버튼 안의 `label#3025:0` TEXT 속성은 해당 Button 인스턴스가 소유하며 root에 같은 TEXT API가 있다는 뜻이 아닙니다.

```text
dialog/footer: padding24·가로 우측 정렬·gap8
├─ cancel=true일 때: tertiary40 Button, label ‘cancel’
└─ confirm: primary40 Button, label ‘confirm’
```

| 인스턴스 → 실제 source | 실제 상태·크기 |
| --- | --- |
| cancel `3151:20371` → `3025:25006` | tertiary /40 /enabled·원본116×40 → 실제81×40 |
| confirm `3151:20372` → `3025:24940` | primary /40 /enabled·원본116×40 → 실제89×40 |

두 버튼은 [AgentHubButton](../AgentHubButton/definition.md)의 실제 source를 사용합니다.
`cancel`/`confirm`은 영어 샘플 label이며 취소 정책·mutation 종류·API endpoint를 확정하지 않습니다.
실제 대상과 결과를 설명하는 문구는 제품이 제공합니다.

leading/trailing plus20 인스턴스는 각 버튼에 두 개씩 총4개 있으며 source는 `3018:24932`입니다.
모두 visible=false입니다. 그 아래 Vector가 visible=true여도 숨김 조상을 무시해 렌더하지 않습니다.
이 glyph를 다운로드해 추가 표시하거나 기본20px 빈 공간을 예약하지 않습니다.
두 Button의 keycap Boolean 값은 true지만40px 원본에는 keycap 자식이 없습니다. keycap·단축키를 새로 만들지 않습니다.

root에 TEXT·SLOT이나 Dialog 인스턴스는 없습니다. 실제 제품은 Dialog의 기존 footer 입력과 이 두 Button의 시각을 연결합니다.
cancel=false·긴 번역·요청 중·disabled·focus·hover/pressed·dark·좁은 화면·전체 Dialog 시안은 별도 검증 범위입니다.
하위 Button 자체의 알려진 상태와 이 footer 조합의 검증 범위를 구분합니다.
