# AgentHubCodeLine — 제품 구현 연결

[문서 인덱스](./README.md) · [Figma 관찰 기록](../../references/file-code-refresh.figma.json)

다음은 **제안 API**입니다. 원본 속성 이름이나 소비 제품의 기존 export를 확정하지 않습니다.

```ts
type CodeLineView = {
  number: string;
  text: string;
  indent: 0 | 1 | 2 | 3;
  state: "enabled" | "current" | "empty";
  guidesActive?: readonly boolean[];
  foldAction?: { expanded: boolean; label: string; onRequest: () => void };
};
```

empty는 관찰된 indent0에서만 재현합니다. guidesActive는 각 가이드 상태를 전달하는 제품 확장이며 원본에 같은 이름의 native 속성이 있다는 뜻이 아닙니다.
foldAction이 없으면 정적 glyph 또는 생략, 있으면 기존 버튼·편집기 명령에 연결합니다.

gutter를 flex:0 0 68px, content를 flex:1/min-width:0로 나누고 행 높이는20px로 맞춥니다.
코드 문자의 들여쓰기와 별도 guide 슬롯을 동시에 이중 추가하지 않도록 표시 문자열의 공백 정책을 문서 owner와 맞춥니다.
기본13px·줄 높이20px를 local 변수로 받고 FileViewer의 명시적12px override만 허용하는 식으로 연결할 수 있습니다.
이것은 공용 typography token 전체를12px로 바꾸는 정책이 아닙니다.

fold는 [저장된16px 원본](../../assets/refresh-20261105/5e1161a49db0401f24dc173bbf7e3a25dccaaeab.svg)을 사용합니다.
일반 chevron으로 임의 대체하거나 font 문자로 다시 그리지 않습니다. 가이드선은 별도 CSS 장식입니다.
