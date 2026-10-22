# AgentHubFilterChipGroup — 검증

Figma hug·wrap·scroll 3종과 중첩 instance 18개, 우측 fade의 정적 구조를 확인했습니다.
브라우저의 필터 동작·스크롤·반응형 전환·실제 제품 source/export는 아직 미검증입니다.
[조합 대조 결과](../../references/filter-chip-composition.json)는18개 모두 원본 variant·시각·라벨·숨김 override와 일치합니다.
이는 label-only md/enabled 샘플의 Figma 검증이며 다른 상태나 실제 앱 통과를 뜻하지 않습니다.

- hug 344×32 HUG/HUG, wrap 280×72 FIXED/HUG, scroll 280×32 FIXED/HUG라는 원본 geometry를 대조합니다.
  예시 폭·높이를 전체 제품의 고정값으로 만들지 않습니다.
- 그룹 padding 0, 가로 gap 8, wrap 줄 간격 8, fill·border·shadow 없음과 정렬을 확인합니다.
- 예시의 6칩·첫 선택·md·enabled·같은 “전체” 라벨·숨겨진 count를 제품의 필수 상태로 복사하지 않습니다.
- selected 원본 `3092:25164`, unselected 원본 `3092:25109`와 각 중첩 instance가 연결되는지 확인합니다.
- scroll의 actual overflow가 NONE·clipping true인 관찰과 제품에서 추가한 실제 수평 overflow를 구분합니다.
- fade node `3099:25231`의 우측 absolute 48×32, x232, white alpha0→1, transform과 visible 연결을 대조합니다.
  hug·wrap에는 fade가 없는지 확인합니다.
- 칩 0/1/다수, 긴 라벨·count·아이콘·가용 폭 변경에서 hug/wrap/scroll과 모든 칩 접근을 확인합니다.
- single/multi·“전체”·재클릭·해제·disabled·URL/조회 상태를 페이지 owner와 대조합니다.
- Tab·Enter/Space·선택 ARIA·필요한 radio 키보드 계약·focus 스크롤·DOM 순서·zoom을 확인합니다.
- 끝 칩과 outline이 clipping/fade에 가리지 않는지, fade가 pointer·휠·터치를 가로채지 않고 보조 기술에서 숨겨지는지 확인합니다.
- overflow 없음·중간·끝·resize·선택/라벨 변경에서 fade 표시와 실제 scroll 범위를 확인합니다.
- 채택한 가로 스크롤이 공용 엔진 한 곳을 사용하고 focus 이동·ensureVisible이 해당 viewport만 움직이는지 확인합니다.
  선택 전후 폭 유지, 끝 Chip·outline 노출과 필터 변경 뒤 읽던 scrollLeft 보존을 함께 검사합니다.
- Light 이외 surface·dark·모션은 제품에서 검증하고 근거를 남깁니다. source/public export를 확인하기 전에는
  `unmapped`와 `draft`를 유지하며 정적 디자인 전달을 실제 구현 완료로 취급하지 않습니다.
