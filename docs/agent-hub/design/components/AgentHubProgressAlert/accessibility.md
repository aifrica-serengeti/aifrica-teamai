# AgentHubProgressAlert — 접근성

- 두 동작은 실제 native button으로 구현하고 화면에 보이는 문구로 동작을 알 수 있게 합니다.
  Enter/Space 활성화·실제 disabled 차단·Tab 순서 ‘다시시도 → 프롬프트 편집’을 유지합니다.
- root·아이콘·제목을 별도 클릭 대상으로 만들지 않습니다. 아이콘은 제목과 의미가 겹치므로 SVG를 `aria-hidden`으로 처리하고
  외부 `img`이면 `alt=""`로 장식 처리합니다. 진행률을 나타내지 않으므로 `progressbar`나 가짜 수치 속성을 부여하지 않습니다.
- 이름에 alert가 있다는 이유만으로 `role="alert"`를 단정하지 않습니다. 중단 안내를 비긴급 상태로 알릴지,
  즉각적인 주의가 필요한 오류로 알릴지는 실제 문맥에서 정합니다. 비긴급 갱신은 제품의 `status`/polite 안내 정책에 연결할 수 있습니다.
- 동적 안내는 대화 영역이나 제품이 정한 한 owner가 소유합니다. 기존 transcript live region·이 안내·상위 Notification에서
  같은 중단 문구를 중복 낭독하지 않습니다. 재렌더마다 정적인 과거 안내를 새 상태로 발행하지 않습니다.
- 안내가 나타나거나 재시도가 끝났다는 이유로 대화 입력의 focus를 가져오지 않습니다. ‘프롬프트 편집’을 직접 누른 경우에는
  보존된 draft와 연결한 실제 편집기로 이동하는 정책을 제품이 정하고 검사합니다.
- Figma에 focused 시안이 없어도 [AgentHubButton의 focus 의무](../AgentHubButton/accessibility.md)를 유지합니다.
  공용을 켰다면 `DOCS_ROOT/frontend/design/components/Button/accessibility.md`도 적용하고, outline이 부모 clipping에 가려지지 않게 합니다.
- 28px 시각 높이만으로 접근 가능한 타깃 크기를 충족했다고 간주하지 않습니다. 실제 간격·주변 조작·200% 확대·좁은 화면에서
  버튼과 안내가 겹치지 않는지 확인하고, 필요한 제품 조정은 실측값과 구분해 기록합니다.
- 긴 안내와 번역을 임의로 생략하지 않습니다. 사용자가 상태 전체와 두 동작을 읽고 조작할 수 있어야 하며,
  disabled 색상만 적용한 채 요청 callback을 남겨두지 않습니다.

실측은 Light mode의 시각 계약입니다. 실제 앱의 대비·focus·키보드·live 안내가 통과했다는 보증은 아닙니다.
