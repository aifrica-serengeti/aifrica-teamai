# AgentHubMessageExample — 정의와 재사용 경계

Figma `2320:28612`는 `message/example` COMPONENT_SET입니다. `state`는 enabled·hovered·pressed 세 종류이며
`icon#2367:11` Boolean의 기본값은 true입니다. 세 아이콘 인스턴스의 visible 속성이 이 Boolean에 연결되어 있습니다.
root에는 문구를 전달하는 TEXT property가 없습니다. 보이는 `message`는 예시 문자열입니다.

```text
예시 선택 동작 하나
├─ 평문 label
└─ 선택적 arrow-right20 장식 아이콘
```

| 상태 | 구성 원본 | 아이콘 인스턴스 → 실제 원본 |
| --- | --- | --- |
| enabled | `2320:28611` | `3160:19768` → `2199:23690` |
| hovered | `2320:28610` | `3160:19771` → `2199:23690` |
| pressed | `2320:28609` | `3160:19774` → `2199:23690` |

아이콘 원본은 `icon/arrow-right/20`입니다. [기존 manifest](../../asset-manifest.json)의 동일 원본과
[20px SVG](../../assets/icons/arrow-right/20.svg)를 그대로 연결합니다. 새 SVG나 유사 화살표는 추가하지 않습니다.

아이콘을 끄면 실제 glyph와 wrapper를 조건부로 제거합니다. 투명 아이콘·빈20px 슬롯·남는 gap4px를 유지하지 않습니다.
원본 Boolean과 연결은 확인했지만 icon=false의 별도 렌더링 시안을 측정한 것은 아닙니다.

## 공용·기존 확장과의 관계

직접 의존 계약의 `Button`은 단일 native action·keyboard·disabled·focus 의미를 채택하는 기준입니다.
현재 시안에는 Figma Button·Card·UserMessage 인스턴스가 없습니다. 실제 source를 재사용했다고 기록하지 않습니다.
호환되는 제품 버튼이 이 전용 geometry를 지원하면 그 구현에 연결할 수 있고, 별도 래퍼 생성을 강제하지 않습니다.

- [AgentHubButton](../AgentHubButton/README.md)의 secondary는 enabled 배경 #CCE0FF·글꼴600·높이28/32/40px·radius4/6/8px입니다.
  이 시안의 #EBF3FF·글꼴400·한 줄44px·radius12px를 secondary 이름만으로 덮어쓰지 않습니다.
- [AgentHubUserMessage](../AgentHubUserMessage/README.md)는 발송된 사용자 발화의 표시 계약입니다.
  예시 선택에 발화자·전송 내역·agent/schedule 메타데이터를 자동으로 추가하지 않습니다.
- [AgentHubChatComposer](../AgentHubChatComposer/README.md)는 실제 입력·첨부·전송을 조합합니다.
  예시 선택의 결과를 연결할 수는 있지만 이 컴포넌트가 입력기나 요청 owner를 대체하지 않습니다.

공용을 켠 경우에만 `DOCS_ROOT/frontend/design/components/Card/README.md`와
`DOCS_ROOT/frontend/design/components/Link/README.md`를 의미 비교에 참고합니다.
카드처럼 보인다는 이유로 Card의 footer·selected·shadow를 상속하거나 화살표만 보고 URL 이동을 만들지 않습니다.
