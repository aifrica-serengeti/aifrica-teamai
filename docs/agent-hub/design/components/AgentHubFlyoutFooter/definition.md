# AgentHubFlyoutFooter — 정의와 override

독립 원본 `3005:23094`는 `flyout/footer` 단일 COMPONENT이며 meta 텍스트 하나를 표시합니다.
`meta#3005:3`은 TEXT 속성이고 기본값은 “볼륨 연결·관리는 치타 플랫폼에서 할 수 있습니다.”입니다.
이 문구는 출처의 샘플이며 치타 전용 구조·권한 규칙·실제 이동 경로나 모든 제품의 운영 정책을 뜻하지 않습니다.

| 대상 | 확인한 구성 |
| --- | --- |
| 독립 원본 `3005:23094` | 280×29px, 배경 없음, padding bottom4 |
| shell 인스턴스 `3010:23520` | 원본 `3005:23094` 재사용, 278×33px, white 배경·padding bottom8 |
| shell 내부 문구 | `meta`라는 샘플 문자열로 TEXT override |

상위 shell에서 Footer의 visible 참조 `footer#3010:0`과 get_design_context의 footer=true 표현은 확인했습니다.
다만 shell 전체 property 정의는 read-only getter 제한(`unavailable-read-only-getter`)으로 수집하지 못했습니다.
이를 상위 property가 없음·빈 객체라는 뜻으로 기록하거나 확인하지 못한 기본값·옵션 목록을 완성하지 않습니다.
Footer가 없는 별도 화면도 검증하지 않았습니다.

Footer는 설명 표시만 소유합니다. 실제 header 이름·설명 관계·Footer 표시 여부·부모 viewport는
[Flyout](../AgentHubFlyout/README.md)과 제품이 소유합니다. 이 부품에 action·닫기 버튼·단축키·키보드 handler를 추가하지 않습니다.
