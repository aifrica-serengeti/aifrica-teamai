# AgentHubCodeLine — 정의와 공용 비교

[문서 인덱스](./README.md) · [Figma 관찰 기록](../../references/file-code-refresh.figma.json)

원본은 `3684:20432`의 **9개** variant입니다.
| 항목 | 관찰·채택 계약 |
| --- | --- |
| empty | indent=0 한 조합 |
| enabled | indent=0/1/2/3 네 조합 |
| current | indent=0/1/2/3 네 조합 |
| 생성 참조 입력 | code, number, placeholder, fold, indent, state |
| 하위 원본 | IndentGuide 3686:20585, fold16 glyph |

empty×indent1/2/3은 관찰하지 않았습니다. 가능한 문자열 조합12개가 모두 시안에 있다는 식으로 확장하지 않습니다.
number는 생성 참조의 문자열이고, 행 재정렬·가상화·문서 변경의 번호 계산은 상위 owner에 둡니다.

```text
CodeLine: 가로 행
├─ gutter68: 번호26 + 선택적 fold16
└─ content FILL: indent 수만큼 guide16.8 + code
   empty에서는 cursor1×18 + gap4 + placeholder
```

current와 empty의 배경은 **코드 content에만** 적용합니다. gutter에는 현재 행 배경이 없습니다.
코드 텍스트·접기 가능한 범위·현재 줄·블록 정보를 주는 편집기나 Viewer는 상위에서 연결합니다.
생성 TypeScript의 props는 관찰 기록이며 native 속성 ID·binding이나 이미 동작하는 editing API의 증거가 아닙니다.
