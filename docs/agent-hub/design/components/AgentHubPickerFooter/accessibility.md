# AgentHubPickerFooter — 접근성

- 키 안내는 일반 텍스트와 `<kbd>`로 읽을 수 있게 하며 keycap·Divider·glyph에 별도 tab stop을 만들지 않습니다.
- 방향키와 Enter의 의미가 기호에만 의존하지 않도록 “이동”·“선택”과 읽을 수 있는 설명을 유지합니다.
  필요하면 Picker owner가 안내 id를 입력/목록의 `aria-describedby`에 연결합니다. 같은 안내를 행마다 반복 연결하지 않습니다.
- keycap을 button으로 표현하거나 Footer에서 전역 단축키를 새로 등록하지 않습니다. 실제 키보드 동작은 Picker와 일치해야 합니다.
- Divider는 장식이며 보조 기술에서 숨깁니다. 찾기 glyph도 장식으로 두고 링크/버튼 label이 이름을 소유합니다.
- route 이동은 이름과 실제 href가 있는 native `<a>`, callback은 `<button type="button">`으로 연결합니다.
  링크는 Enter, 버튼은 Enter/Space로 활성화하고 하나의 host만 사용합니다.
- 찾기 동작의 focus-visible을 유지합니다. 측정된 focus 상태가 없어도 공용의 focus 표시 의무를 제거하지 않습니다.
- 링크 부재 구성은 렌더·접근성 트리·Tab 순서에서 동작 전체를 제외합니다. 보이지 않는 링크를 focus 가능하게 남기지 않습니다.
- Footer의 찾기 동작을 리스트 option처럼 취급하지 않습니다. Picker가 채택한 목록/입력 의미와 별도로 적절한 Tab 경로를 검증합니다.

부모 clipping과 고정 footer가 끝 행·활성 항목·focus outline을 가리지 않아야 합니다.
실제 viewport에서 마지막 항목까지 도달하고 찾기 동작으로 이동·복귀할 수 있는지 확인합니다.
18px keycap은 조작 타깃이 아니며16px 높이의 찾기 표현만으로 링크 타깃 크기를 충족했다고 보증하지 않습니다.
글자 대비·확대·긴 번역·좁은 폭과 실제 링크 주변 간격은 제품에서 검증합니다.
