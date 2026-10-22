# AgentHubDialogFooter — 접근성

공용을 켠 UI 작업에서만 `DOCS_ROOT/frontend/design/components/Dialog/accessibility.md`와
`DOCS_ROOT/frontend/design/components/Button/accessibility.md`의 관련 의미를 함께 적용합니다.
시각 차이만 연결하고 Dialog의 role·이름/설명·focus trap·Tab 순서·닫힘 후 복귀를 약화하지 않습니다.

- 취소/결과 버튼은 각각 하나의 native button으로 구성합니다. 실제 form 제출일 때만 submit을 명시하고
  기본 action은 `type="button"`으로 연결합니다. Enter/Space를 별도 keydown으로 다시 실행하지 않습니다.
- 제품 locale과 실제 대상·결과가 드러나는 label을 제공합니다. 영어 ‘cancel’/‘confirm’은 실측 샘플이며 필수 제품 문구가 아닙니다.
  색상이나 버튼 순서만으로 안전한 action과 결과 action을 구분하지 않습니다.
- 버튼 내부나 footer 전체에 button/link를 중첩하지 않습니다. 각 button의 접근성 이름은 실제 label이 소유합니다.
  숨겨진 plus는 장식 접근성 트리와 Tab 순서에서도 제거하고, 자식 Vector가 visible=true라는 이유로 다시 표시하지 않습니다.
- cancel=false이면 해당 control과 빈 공간을 제거합니다. 현재 focus된 취소 버튼이 사라지는 경우 제품 owner가 유효한 복귀 위치를 제공합니다.
  취소 노출을 끄는 것과 Dialog의 dismiss 허용값은 별도로 연결합니다.
- confirmation을 채택한 제품은 공용의 안전한 초기 focus 정책을 유지합니다.
  취소 버튼이 없는 경우에도 결과 버튼에 무조건 자동 focus하지 말고, 실제 Dialog 콘텐츠와 위험도에 맞는 유효 위치를 검증합니다.
- pending·권한·disabled를 제공할 때는 실제 host와 실행 경로를 함께 차단합니다.
  Figma에 enabled 시안만 있다는 이유로 실제 실행 가능한 요청을 disabled 색상만으로 막지 않습니다.
- 원본에 focus variant가 없어도 focus-visible을 제거하지 않습니다. 공용 Button의1px outline·1px offset과 제품 semantic 색상을 연결합니다.
  버튼 clipping·Dialog shell·footer/body 경계·zoom에서 focus가 보이는지 확인합니다.
- title·description·오류·요청 결과를 읽을 수 있게 유지하고, footer가 별도 중복 live region을 생성하지 않습니다.
  성공 후 닫힘·실패 후 유지·focus 복귀·공지 빈도는 제품 owner가 관리합니다.
- 긴 문구·번역·큰 글자·협소 화면에서도 두 action이 잘리거나 본문을 가리지 않아야 합니다.
  NO_WRAP 샘플을 좁은 viewport에서 접근 불가능한 고정 폭으로 강제하지 말고 제품이 채택한 배치와 전체 이름 접근을 검증합니다.
- 새 단축키·keycap·loading·negative·dark·모션 시각은 제공되지 않았습니다.
  필요한 경우 실제 근거와 적용 범위를 기록하며 단일 Light footer를 그 검증 결과로 취급하지 않습니다.

footer 자체가 새 모달이나 form을 만들지 않습니다. 기존 Dialog·form·Button의 한 owner를 사용하고 실제 keyboard·포인터·스크린리더 결과를 제품에서 확인합니다.
