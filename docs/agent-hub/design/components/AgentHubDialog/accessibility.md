# AgentHubDialog — 접근성

공용을 켠 경우에만 `DOCS_ROOT/frontend/design/components/Dialog/accessibility.md`를 함께 적용합니다.
독립 모드에서도 제품의 모달 엔진으로 같은 사용자 접근을 보장합니다. 색상·r16 변경이 모달 의미를 약화하지 않습니다.

- 한 모달 엔진이 `role="dialog"`·`aria-modal="true"`, portal, 배경 상호작용 제한과 scroll lock을 관리합니다.
  시각 recipe 안에 두 번째 dialog·focus trap·전체 화면 banner를 중첩하지 않습니다.
- 보이는 제목을 고유 ID로 연결해 모달의 접근성 이름으로 사용합니다. 숨긴 description을 읽는 것처럼 연결하지 않습니다.
  설명을 제공하는 제품은 실제 내용과 `aria-describedby`를 연결합니다. 두 recipe를 confirmation profile로 자동 변경하지 않습니다.
- 열릴 때 적절한 내부 대상에 focus를 두고 Tab/Shift+Tab이 내부를 순환하게 합니다.
  Finder의 focused Search 외형만 보고 강제 autofocus를 추가하지 않습니다. 제품이 초기 대상과 입력 중 가상 키보드 영향을 정합니다.
- 닫힌 뒤 유효 trigger로 focus를 복귀합니다. trigger가 없어졌으면 가까운 안정적인 대상으로 돌립니다.
  조회 완료·필터 전환·저장 실패가 사용자의 focus를 자동 탈취하지 않게 합니다.
- 닫기32는 native button과 locale에 맞는 ‘다이얼로그 닫기’ 이름을 가지며 glyph24는 장식입니다.
  legacy r4/glyph24를 맞추면서 focus-visible 표시·Enter/Space·한 번의 click 경로를 유지합니다.
- 실제 disabled Button은 native disabled와 handler guard를 연결합니다. 취소는 type=button,
  저장은 명시적인 form submit 경로를 사용하며 키보드와 마우스가 같은 명령을 한 번만 실행합니다.

## 예약 폼

이름·지침에는 실제 label을 native input/textarea의 id와 연결하고 required 의미를 전달합니다.
빨간 별이나 샘플 placeholder만으로 이름·필수·오류를 전달하지 않습니다.
값·onChange·조합 입력은 form owner가 관리하고 hidden count·resize·info·두 번째 시간 행은
DOM·focus·접근성 트리에서 제외합니다. 빈 count wrapper에 가짜 값이나 live region을 채우지 않습니다.
제품에서 disabled/readOnly를 제공한다면 동명의 native 속성에 연결합니다.
readOnly는 선택·복사와 Tab focus를 유지하며 disabled로 치환하지 않습니다.

고급 행·모델 선택·Toolbar action을 실제로 제공할 때만 적절한 이름·상태·제어 대상을 연결합니다.
상세 본문이 없는 고급 행에 존재하지 않는 `aria-controls`나 `aria-expanded` 값을 만들지 않습니다.
Picker·Popover를 추가로 열면 제품이 중첩 layer의 focus 복귀·Escape 처리 우선순위를 검증합니다.
오류는 관련 입력과 연결하고 동적 알림은 한 owner가 담당합니다. Dialog와 form에서 같은 메시지를 이중 live announce하지 않습니다.

## Finder

Search에는 실제 접근성 이름을 제공합니다. placeholder와 장식 caret은 label·실제 커서의 대체가 아닙니다.
clear·IME·readonly 처리는 [AgentHubSearch](../AgentHubSearch/accessibility.md)의 채택 범위를 유지합니다.
Rail의 필터/이동 의미를 제품 데이터에 맞춰 정하고 선택을 색만으로 전달하지 않습니다.
단순 filter button 목록에 role=menu 또는 Tree 키보드 처리를 자동 부여하지 않습니다.
결과 제목·실제 결과 수는 데이터와 연결하며 샘플23이나15개 카드를 서버 count로 고정하지 않습니다.

카드 주 동작과 pin·more 같은 보조 action은 각각 접근할 수 있어야 하며 button/link를 중첩하지 않습니다.
설명의 maxHeight40·ENDING은 시각 실측입니다. 필요한 전체 설명을 접근 가능한 제품 경로로 제공하고
잘린 텍스트를 근거 없이 모두 안다고 가정하지 않습니다.
보이지 않는 help text, Search filter subtree, header의 뒤로 가기는 focus 순서와 AT에서 제외하고 닫기는 유지합니다.

장식 scrollbar와 fade는 AT·Tab 순서에서 제외합니다. 실제 scroll viewport는 keyboard·wheel·touch로 끝까지 접근 가능해야 합니다.
200% zoom·협소 viewport·긴 문구에서도 제목·닫기·footer·마지막 카드·focus ring을 잘라내지 않습니다.
Figma의 고정 크기·clipping을 그대로 복사해 접근을 막지 않고 제품의 반응형 adapter를 검증합니다.
reduced motion은 실제 소비 구현에서 확인하며 source에 없는 전역 reset을 제공된 기능으로 기록하지 않습니다.
