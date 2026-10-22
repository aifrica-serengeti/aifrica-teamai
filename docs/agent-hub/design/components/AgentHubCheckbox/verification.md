# AgentHubCheckbox — 검증

Figma unchecked/checked/indeterminate × small/medium/large × enabled/disabled18종의
Box·Mark·색상·선·radius와 원본 SVG를 확인했습니다. 실제 Agent Hub 앱 source/export·입력 동작은 아직 미검증입니다.

- 시각 박스12/16/20px·radius3/4/5·Box x0/y0·고정 외곽을 비교합니다. 공용 radius2를 그대로 상속하거나
  border로 외곽을14/18/22px로 키우지 않습니다. large 라벨/hit area는 별도 채택 근거가 필요합니다.
- enabled unchecked는 white/1px#1C1C1C, checked/mixed는 #3B82F6·실제 border 없음·white Mark인지 확인합니다.
  strokeWeight1만 보고 선을 추가하거나 원본 SVG 위에 박스·마크를 중복하지 않습니다.
- disabled unchecked는 #EEEEEE/1px#AAAAAA, disabled checked/mixed는 #EEEEEE/1px#DDDDDD·white Mark인지 대조합니다.
  선택·disabled 값을 분리하고 상위 label color가 마크를 바꾸지 않게 합니다.
- 체크 path bounds는6×4.125,8×5.5,10×6.875px와 해당 x/y이며, mixed는 길이6/8/10·geometry height0인 가로선입니다.
  모두 stroke1·CENTER·ROUND cap/join입니다. height0을 숨기거나 일반 check/minus 아이콘으로 치환하지 않습니다.
- 공용의9/12px Lucide SVG frame와 strokeWidth3을 CSS3px로 오해하지 않습니다.
  공용의 채운6×1.5/8×2px mixed 사각형과 원본1px round line은 다른 도형입니다.
- [SVG manifest](../../references/checkbox.assets.json)의12개 원본ID·파일·native viewBox·크기·해시를 확인합니다.
  파일은 Box+Mark 전체이므로 실제 indicator 슬롯·상태별 자산 선택·중복 border 없음과 렌더 크기를 제품에서 확인합니다.
- 실측 JSON의 type3·size3·state2와 제품의 값 모델을 연결합니다. 생성 prototype의 state Boolean을 앱 API 근거로 사용하지 않습니다.
- controlled/uncontrolled·초기 indeterminate·mixed 조작→전체 선택·집계 대상·disabled/read-only 차단을 확인합니다.
  공용 예제 코드의 존재만으로 이 동작이 제품에서 검증됐다고 표시하지 않습니다.
- label·Tab/Space·mixed 노출·form name/value/required/invalid·focus1px+offset1px·clipping 밖 표시를 검증합니다.
  SVG를 실제 입력처럼 사용하거나 클릭으로 native semantics를 대신하지 않습니다.
- small/medium 라벨·hit area·group 계약을 유지하고 large·긴 라벨·확대·배경 대비를 제품에서 확인합니다.
  hover/pressed·focus·read-only/invalid·dark·모션의 새 시각 값을 이번18종에서 확인한 것으로 기록하지 않습니다.
- 제품에서 실제 source/public export를 확인한 뒤에만 로컬 매핑에 implemented로 기록합니다.

공용 원본에서는 `npm run verify`·`npm test`로 문서 탐색·registry·자산 무결성과 솔루션 격리를 확인합니다.
실제 제품의 렌더링·입력·접근성 검사는 해당 제품에서 수행합니다.

## 채택 모션 검증

- 원본18종과12개 전체 SVG의 기록을 유지하고, Mark 전용 자산은 원본 path에서 분리한 출처를 확인합니다.
  Box 위에 전체 SVG를 겹쳐 이중 Box·border를 만들지 않습니다.
- Box 배경·border-color와 라벨 색상은200ms ease, Mark 진입160ms ease-out/퇴장120ms ease-in·opacity0/1을 확인합니다.
  시작·중간·완료 프레임 모두 원본 Mark의 x/y·width/height·중심과1px 선이 같아야 합니다.
  scale·translate·상태별 정렬 교체를 사용하지 않고, 체크의 왼쪽 끝이나 중심이 완료 직전 밀리지 않아야 합니다.
- false/true/mixed 빠른 전환·disabled 전환·unmount에서 잔상·지연된 상태 복원·중복 통지가 없는지 확인합니다.
  입력 DOM·focus·name/value·form 참여를 유지하며 장식 Mark는 읽기·Tab·pointer 대상이 아닙니다.
- reduced-motion에서는 중간 프레임 없이 최종 상태를 표시합니다. 이 모션은 [2026-10-21 채택 제안](../../motion.md)이며 Figma 측정값이 아닙니다.
