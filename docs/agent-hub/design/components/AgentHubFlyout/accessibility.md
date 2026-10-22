# AgentHubFlyout 접근성

Menu와 같은 애니메이션이 role=menu를 뜻하지 않습니다.
제품의 실제 작업을 기준으로 하나의 focus 모델을 선택합니다.

평면 목록은 그대로 지원합니다. 사용자 요청으로 채택한 폴더 조립은 native 폴더 버튼과 중첩 `ul`의 disclosure 목록입니다.
부모 소유 펼침 상태를 `aria-expanded`와 안정적인 child region의 `aria-controls`에 연결합니다.
정적 standalone folder/open/child 참조만으로 동작 구현을 주장하거나, 계층이라는 이유만으로 Tree 역할을 붙이지 않습니다.

- flat 목록의 독립 파일 명령은 native button/링크 중 실제 의미에 맞는 target을 사용합니다.
  단순 값 선택만 제공한다면 검증된 listbox adapter를 검토하고 실제 선택 값과 option 의미를 연결합니다.
- 계층 폴더를 Tree로 채택하면 tree/treeitem/group·aria-expanded·필요한 aria-selected,
  ↑/↓·←/→·Home/End·Enter/Space와 한 roving focus 모델을 연결합니다.
  공용 채택 시 `DOCS_ROOT/frontend/design/components/Tree/accessibility.md`를 실제 제품 primitive와 비교합니다.
- 더 단순한 disclosure 목록으로 채택한다면 native 폴더 버튼의 expanded·controls와 실제 child group을 연결합니다.
  버튼·Tree·listbox의 keydown 규칙을 같은 영역에 중첩하지 않습니다.
  폴더 버튼은 Tab·Enter/Space의 native 동작을 사용하고 클릭 한 번에 펼침 callback을 한 번만 전달합니다.
  닫는 region은 즉시 inert/aria-hidden으로 제외하고 내부 focus를 폴더 버튼으로 옮긴 뒤 높이 전환이 끝나면 제거합니다.
- popup을 dialog로 채택하면 실제 이름·설명·trigger 관계를 연결하고 modal 여부를 명시합니다.
  Figma는 modal/focus trap을 정하지 않았습니다. 모달로 채택한 경우에만 그에 맞는 containment·배경 처리를 적용합니다.
- Header title로 panel 이름을, meta/footer로 필요한 설명을 제공합니다. count를 별도 버튼이나 자동 live region으로 만들지 않습니다.
- file/chevron glyph는 장식으로 숨깁니다. ellipsis로 보이는 label을 줄여도 전체 접근성 이름을 보존합니다.
  child meta는 링크로 구현할 근거가 없으며 별도 Tab stop을 만들지 않습니다.
- 숨김5행과 접힌 branch를 보이지 않는 focus target으로 남기지 않습니다.
  현재 focus가 footer와 clipping에 가려지면 실제 scroll viewport에서 노출합니다.
- 원본에 focused/disabled가 없더라도 focus-visible·실제 disabled guard를 연결합니다.
  제품의 접근 가능한 token을 사용하고 이 Figma에서 측정한 색이라고 주장하지 않습니다.
- 닫힘·Escape·바깥 클릭·중첩 popup 정리와 호출 지점으로의 focus 복귀를 검증합니다.
  closed surface가 pointer/keyboard 명령을 계속 받지 않아야 합니다.
- Header·Header 소유 구분선·Footer는 고정하고 body만 기존 ScrollArea로 스크롤합니다. 방향키 focus 이동에서 공개 항목 노출 handle을
  사용하고 마지막 행·focus outline이 footer 위에 완전히 보이는지 확인합니다. native overflow/drag를 별도로 복제하지 않습니다.

`prefers-reduced-motion: reduce`에서는 [모션 안내](./motion.md)의 animation:none fallback을 명시적으로 채택합니다.
animationend가 오지 않아도 닫힘·focus 복귀·노드 정리가 완료돼야 합니다.
이는 기존 Menu/전역이 이미 reduce를 지원한다는 주장이 아닙니다.
