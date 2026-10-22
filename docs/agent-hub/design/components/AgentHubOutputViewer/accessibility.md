# AgentHubOutputViewer — 접근성

다음은 소비 제품에서 연결하고 검증할 계약입니다. 정적 Figma 원본에 role·keyboard·focus 구현이 이미 있다는 뜻은 아닙니다.

- 제목이 있는 section 또는 적절한 영역으로 구성하고 안정적인 heading ID와 `aria-labelledby`를 연결합니다.
  주변 화면에 맞는 heading 수준을 사용하며 전체 패널·header를 button으로 감싸지 않습니다.
- expand와 close는 각각 native button 하나입니다. “산출물 보기 확대”, “산출물 보기 닫기”처럼 실제 명령을 설명하는 이름과 `type="button"`을 제공합니다.
  SVG는 장식으로 숨기고 glyph 이름·잘못된 plus24 layer 이름을 접근성 이름으로 쓰지 않습니다.
- Enter/Space는 native 활성화를 사용합니다. 한 입력에 callback을 한 번만 실행하며 숨긴 action에는 Tab target을 남기지 않습니다.
  실제 disabled를 채택하면 host와 명령 실행을 함께 차단합니다. disabled/focus 색을 이 시안의 실측값으로 만들지 않습니다.
- 제목·형식은 일반 텍스트이고 사이의3px 점은 장식입니다. showType=false에서는 점과 형식을 함께 제거합니다.
  showType은 토글 버튼의 상태가 아니며 type 문자열만으로 콘텐츠 역할이나 접근성 패턴을 정하지 않습니다.
- 원본 title/type은 HUG·truncation DISABLED입니다. 긴 제목이 actions를 가리거나 잘리지 않게 제품 배치를 검증합니다.
  말줄임·줄바꿈을 추가할 때에는 제품 확장으로 기록하고 전체 이름을 읽거나 확인할 수 있게 합니다.
- content는 실제 SLOT입니다. 실제 문서의 제목 구조·링크·표·대체 텍스트·renderer 접근성은 콘텐츠 owner가 연결합니다.
  빈 SLOT에 자동 alert·로딩 spinner·document/application role을 추가하지 않습니다.
- 제한된 높이에서는 실제 scroll viewport를 제공하고 keyboard로 마지막 콘텐츠와 본문 control에 접근할 수 있게 합니다.
  독립적으로 focus 가능한 viewport가 필요하면 이름·focus-visible·Tab 순서를 함께 검증합니다. clipping만으로 내용 접근을 막지 않습니다.
- 열기·파일 전환·확대 때 focus를 무조건 옮기지 않습니다. 제품의 선택한 화면 흐름에 맞춰 대상과 이동 시점을 명시합니다.
  닫기로 Viewer 안의 focus가 제거되면 열었던 Session 출력 행 등 저장한 유효 trigger로 복귀합니다.
  해당 행이 사라졌다면 출력 섹션 제목/추가 버튼이나 제품이 정한 가까운 유효 대상으로 복귀하며 없는 요소에 focus를 요청하지 않습니다.

이 패널은 modal/dialog로 확인된 원본이 아닙니다. 기본 구현에 `aria-modal`, focus trap, Escape 닫기를 자동 추가하지 않습니다.
제품이 modal·확대 화면 등 별도 패턴을 채택하면 해당 의미와 닫기·초기 focus·복귀·배경 처리 전체를 함께 구현합니다.
maximize를 pressed/selected 토글로 단정하지 않고 실제 채택한 상태에만 필요한 접근성 속성을 연결합니다.

24px 버튼의 시각 박스만으로 hit area·대비·모든 기기의 조작을 보증하지 않습니다.
실제 배경의 대비·주변 간격·zoom·좁은 화면·큰 글자·긴 파일명·본문 내 focus 가시성을 제품에서 검증합니다.
모션을 추가하면 reduced-motion을 함께 검증하며 원본에 확대 애니메이션이 있다고 주장하지 않습니다.

[본문 scroll 채택](../../motion.md)에서는 viewport 이름과 keyboard focus를 유지하고 문서 끝 control·가로로 긴 내용에 접근할 수 있게 합니다.
Header 조작은 viewport 밖의 독립 Tab target으로 유지합니다. 추가 scroll wrapper가 같은 본문을 두 번 focus하거나 중첩 keyboard scroll을 만들지 않아야 합니다.
