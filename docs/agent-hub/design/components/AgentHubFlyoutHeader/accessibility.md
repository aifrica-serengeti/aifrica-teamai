# AgentHubFlyoutHeader — 접근성

- 제목·count·설명은 일반 텍스트이며 Tab 순서에 넣거나 button/menuitem 역할을 주지 않습니다.
- 제목의 heading 여부·단계와 패널의 이름·설명 관계는 Flyout owner가 채택한 역할에 맞춥니다.
  필요한 title/description id를 제공해 부모의 `aria-labelledby`·`aria-describedby`에 연결할 수 있습니다.
- count가 무엇의 개수인지 텍스트 맥락에서 이해할 수 있어야 합니다. 숫자 문자열만 별도의 상태 역할로 만들지 않습니다.
- count 갱신을 자동 `aria-live`로 공지하지 않습니다. 갱신 빈도·읽기 흐름은 제품의 한 owner가 결정합니다.
- 전체 제목과 meta를 읽기 트리에 유지하고 긴 문자열·개수·번역·zoom에서 시각적으로도 확인할 수 있게 합니다.
  title-group clipping metadata를 내용 삭제나 접근 불가의 근거로 사용하지 않습니다.

Header에 독립 focus 동작은 없지만 높이가 늘어날 때 상위의 실제 focus 항목·스크롤 공간이 줄어 가려지지 않아야 합니다.
원본 색·글꼴을 보존한 정적 참조이며 실제 surface 대비·보조 기술·긴 문구 검증을 보증하지 않습니다.
