# AgentHubSessionPanel — 접근성

다음은 제품 구현 시 적용할 접근성 계약입니다. Figma에서 접근성 속성과 키보드 구현까지 측정한 결과는 아닙니다.

- Session은 이름이 있는 `aside` 또는 적절한 section으로 구성하고 화면 문맥에 맞는 heading 수준을 씁니다.
  전체 패널을 button으로 감싸지 않습니다. 예약·진행·출력·컨텍스트 heading을 구분합니다.
- 펼침은 native button의 `aria-expanded`와 `aria-controls`를 실제 패널 ID에 연결합니다.
  + button은 ‘출력 추가’·‘컨텍스트 추가’처럼 각각 이름을 제공하고 heading/펼침 button과 형제로 둡니다.
- 숨긴 toggle/count/action은 DOM에서 제외하거나 접근성과 focus에서도 숨깁니다.
  empty에서는 두 + action이 남아야 합니다. 제목만으로 빈 섹션에 가짜 펼침 조작을 만들지 않습니다.
- 기록·출력·컨텍스트는 실제 의미에 맞는 목록과 개별 control을 사용합니다. 단순 목록을 tree/menu/listbox로 선언하지 않습니다.
  별도의 복합 패턴이 필요한 제품은 실제 keyboard·focus manager와 role 전체를 함께 구현합니다.
- 현재 보고 있는 실행에는 채택한 탐색 패턴에 맞게 `aria-current` 등 현재 상태를 제공합니다.
  일반 button에 listbox용 `aria-selected`를 붙이지 않습니다. unread는 ‘확인하지 않은 실행’이라는
  보조 텍스트로 전달하고 장식 dot를 중복 읽지 않습니다. 선택과 unread를 색 하나로만 설명하지 않습니다.
- 진행 상태는 순서 있는 목록으로 보여 주고 label과 ‘완료/진행 중/대기’를 텍스트로 전달합니다.
  indicator·connector는 장식으로 숨깁니다. 현재 단계의 `aria-current="step"`은 제품이 단일 현재 단계 의미를 채택한 경우에만 연결합니다.
  정적 진행 전체를 무조건 live region으로 반복 읽거나 progressbar에 근거 없는 percent를 넣지 않습니다.
- 타이틀과 파일명은 시각 ellipsis를 적용해도 접근성 이름에 전체 텍스트를 보존합니다.
  Tooltip을 정보 접근의 유일한 방법으로 삼지 않습니다. count는 해당 label/value와 같은 control의 맥락에서 읽힙니다.
- focus-visible은 제품의 검증된 focus token을 연결합니다. Figma에 없는 focus/disabled 색을 실측값으로 기재하지 않습니다.
  작은 기록16px toggle과24px +의 실제 hit area·간격·키보드 조작을 제품에서 점검하고, 개선이 필요하면
  시각 glyph를 보존하는 접근성 확장으로 기록합니다.
- 접힌 자식은 tab 순서·읽기 순서에서 제외합니다. 실행 조회/추가창 완료 후 focus 복귀,
  자료 변경으로 행이 제거된 경우의 focus 이동도 제품 owner가 관리합니다.

추가 모션을 채택한다면 reduced-motion을 검증합니다. 이 Session 노드에 이미 motion 또는 reduce 지원이 있다고 주장하지 않습니다.

## 채택한 presence와 내부 scroll

[새 채택](../../motion.md)에서도 논리 expanded는 한 owner가 공급합니다. closing 콘텐츠는 시각적으로 남아 있어도 즉시 inert/aria-hidden으로 Tab·AT에서 제외합니다.
animation 종료를 기다려 focus를 복귀시키지 않습니다. 빠른 열기/닫기·부모에 의한 접기·reduced-motion에서도 숨긴 자식에 focus가 남지 않아야 합니다.
내부 viewport에는 이름·keyboard focus와 native wheel/touch/방향키/PageUp/PageDown/Home/End를 연결하고 마지막 행·focus가 보이게 합니다.
thumb는 같은 viewport의 측정값과 drag를 사용합니다. 서로 다른 중첩 스크롤의 hover·위치·thumb 상태를 공유하지 않습니다.
