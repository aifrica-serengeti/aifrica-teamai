# AgentHubMenuItem — 접근성

- 기존 메뉴 primitive의 menu/menuitem·roving focus·방향키·Home/End·Enter·ESC·닫힘 후 trigger 복귀를 유지합니다.
  공용을 켰다면 `DOCS_ROOT/frontend/design/components/Menu/accessibility.md`와 실제 소비 버전의 동작을 함께 확인합니다.
- 실제 명령 host는 content 하나입니다. 안에 Button·Link·Checkbox를 중첩하거나 icon/check/chevron을 별도 조작으로 만들지 않습니다.
  링크·submenu·체크형 메뉴가 필요한 제품은 그 의미를 가진 단일 host/primitive로 명시적으로 연결합니다.
- 명령 이름은 실제 label에서 제공합니다. 시각적으로 말줄임되더라도 전체 문구를 접근성 이름에 보존하고,
  필요한 경우 제품의 전체 문구 확인 방법을 연결합니다. 보조 value는 의미가 필요할 때 설명으로 연결하되 같은 문구를 중복 읽지 않습니다.
- edit·check·chevron이 label과 의미가 겹치면 장식 SVG로 숨기고 외부 `img`이면 빈 alt를 사용합니다.
  check를 의미 있는 선택 표시로 채택하는 경우에는 glyph만 바꾸지 말고 실제 선택 상태와 menuitemcheckbox/radio 등의 의미를 제품에서 검증합니다.
- header는 명령이 아닌 그룹의 설명이며 divider는 비상호작용 separator입니다. header/line을 command host 안에 넣거나 Tab 대상으로 만들지 않습니다.
  false branch는 실제 읽기 트리에서도 생략합니다. 자식의 visible=true만으로 숨김 조상을 무시하지 않습니다.
- disabled는 primitive 속성·실제 pointer/keyboard 실행·handler guard에 적용합니다. `aria-disabled`나 회색 paint만으로 차단을 대신하지 않습니다.
- Figma에 focused 상태가 없어도 공용 Menu의 keyboard focus 표시 의무를 유지합니다.
  content clipping에 잘리지 않는 inset2px focus를 제품 token으로 연결합니다. 키보드 강조와 hover가 겹치면 hover를 우선해 ring을 숨깁니다.
  focus만으로 hover 배경을 만들거나 기본 outline과 inset ring을 중복하지 않으며 disabled는 두 표현과 실행을 차단합니다.
  새 focus 색상을 이번 Figma의 실측값으로 기록하지 않습니다.
- 표시된 header·긴 label/value·번역·확대·좁은 폭에서 명령과 보조 정보를 읽고 조작할 수 있어야 합니다.
  28px 한 줄 샘플만으로 hit area·대비·전체 keyboard 동작이 검증됐다고 보증하지 않습니다.
- 항목마다 live region이나 전역 단축키 listener를 추가하지 않습니다. 실제 요청 결과와 상태 안내는 제품의 한 owner가 처리합니다.
