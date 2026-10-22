# AgentHubFileItem — 접근성

- 파일명·형식·확장자는 일반 텍스트로 읽을 수 있게 제공하며 ellipsis가 전체 파일명을 접근성 이름에서도 잘라서는 안 됩니다.
- 타일이 같은 파일 형식을 중복 표현하면 장식으로 숨깁니다. 파일 타일 자체에 Tab·클릭·선택 의미를 추가하지 않습니다.
- 다운로드는 이름이 있는 native button type=button이며 Enter/Space와 focus-visible을 유지합니다.
  대상이 여러 개이면 파일명을 포함한 접근성 이름/설명으로 구분합니다. label과 chevron에 독립 callback을 붙이지 않습니다.
- 다운로드 메뉴를 실제 채택한 경우에만 해당 trigger의 haspopup·expanded·controls와 메뉴 keyboard/닫힘/복귀를 연결합니다.
  chevron 그림만으로 실제 Menu 구현이나 특정 역할이 제공됐다고 선언하지 않습니다.
- root를 button으로 만들거나 다운로드 button 안에 또 Link/button을 넣지 않습니다.
  별도 파일 열기·메뉴·선택은 제품이 채택한 각각의 host로 구분합니다.
- size=false는 파일 크기 문구와 size-divider를 읽기/표시 트리에서도 생략합니다. 두 구분선은 장식으로 처리해 중복 설명을 만들지 않습니다.
- 추가 disabled는 실제 host·메뉴 열림·명령 guard를 함께 차단합니다. 색만 바꾸거나 pointer만 막고 keyboard를 남기지 않습니다.
- 긴 파일명·형식·확장자·용량·번역·좁은 폭·확대에서 전체 정보와 버튼에 접근할 수 있어야 합니다.
  68px 샘플을 고정 clipping으로 강제하거나 숨김 상태의 빈 설명 ID·Tab target을 남기지 않습니다.
- 현재 root에 focus 상태가 없어도 실제 조작의 focus는 필수입니다. 공용을 켠 UI 작업에서만
  `DOCS_ROOT/frontend/design/components/Button/accessibility.md`와 채택한 메뉴 계약을 확인합니다.
- 자동 live region·성공/실패 알림은 원본에 없습니다. 실제 다운로드 결과 안내가 필요하면 제품의 한 owner가 결정합니다.
