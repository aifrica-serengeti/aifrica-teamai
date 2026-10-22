# AgentHubCheckbox — 접근성

박스·마크 자산은 장식입니다. native checkbox 또는 현재 제품의 검증된 Checkbox primitive가 의미·키보드·form 연결을 소유합니다.

- 실제 label과 id/접근성 이름을 연결합니다. Figma에 label이 없다는 이유로 이름 없는 조작을 만들지 않습니다.
  group이 있으면 공용의 group 이름·label/help/error 연결을 유지합니다.
- 체크 상태는 false/true/mixed로 노출합니다. native input이면 indeterminate 속성까지 실제 상태에 맞게 연결하고,
  primitive면 해당 mixed 계약을 사용합니다. Mark가 가로선인 것만으로 보조 기술에 mixed가 전달되지는 않습니다.
- 공용의 Tab·Space와 label click을 지원합니다. Enter 토글을 새 필수 동작으로 추가하거나 primitive 처리와
  keydown 처리를 중복하지 않습니다. disabled/read-only는 실제 상태 변경이 차단되는지 확인합니다.
- name/value·form 제출·required와 invalid 의미를 유지합니다. 오류는 기존 공용의 aria 연결·안내에 연결하며
  미제공 invalid 시각 값을 확인한 Figma variant로 표시하지 않습니다.
- Box/Mark·SVG는 `aria-hidden` 장식으로 두고 별도 tab stop이나 button/checkbox 역할을 중복 부여하지 않습니다.
  native input을 `display:none`으로 숨겨 접근성 트리·키보드 focus가 사라지지 않게 합니다.
  실제 input의 name/value·form 연결도 별도로 유지하고 제출 동작을 확인합니다.
- focus-visible은 공용의1px semantic outline·offset1px를 유지하고 clipping된 indicator 바깥에 표시합니다.
  shadow로 gap을 대신하거나 Figma에 focus가 없다는 이유로 outline을 제거하지 않습니다.
- small/medium의 공용 hit area24/32px를 유지합니다. large20px는 시각 크기만 확인했으므로 제품의 타깃 크기·
  라벨 간격·확대 정책을 확인합니다. 원본 크기만으로 접근성 통과를 보증하지 않습니다.
- disabled의 흰 마크는 원본 값이지만 실제 제품 배경·상태 구별·대비 판단을 대신하지 않습니다.
  긴 라벨·200% 확대·keyboard·보조 기술을 채택한 제품에서 확인합니다.

이번 검증은 Light mode18개 시각 구성입니다. 실제 접근성·focus·form 제출·mixed 동작 통과는 별도 제품 검증 대상입니다.
