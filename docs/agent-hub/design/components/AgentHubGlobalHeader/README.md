# AgentHubGlobalHeader

Agent Hub의 서비스 로고, 치타 플랫폼 바로가기, 알림을 배치하는 전역 헤더 계약입니다.
적용 조건은 [상위 안내](../../README.md)를 따릅니다. 기존 제품 header가 같은 역할을 맡는다면 그 영역에 시각과 action을 연결하고 새 wrapper를 강제하지 않습니다.

직접 의존 계약은 `Button`, `Link`, `IconButton`입니다. 공용을 켠 UI 작업에서만
`DOCS_ROOT/frontend/design/components/Button/README.md`, `DOCS_ROOT/frontend/design/components/Link/README.md`,
`DOCS_ROOT/frontend/design/components/IconButton/README.md`의 native 동작·이름·focus 계약을 함께 읽습니다.
이 의존은 의미 참고이며 실제 Figma Button·Link·IconButton 인스턴스 재사용이나 전체 시각 상속을 뜻하지 않습니다.
기존 AgentHubButton·AgentHubIconButton·Breadcrumb·NavRail·공용 PageHeader·CMP Header를 자동 조합하지 않습니다.
실제 제품 source/export는 `unmapped`, 공유 설정은 `draft`입니다.

- [정의와 실제 구성](./definition.md)
- [치수·색상·로고 넘침](./styles.md)
- [동작과 제품 상태의 책임](./behavior.md)
- [접근성](./accessibility.md)
- [기존 header 연결과 새 구현](./implementation.md)
- [검증](./verification.md)
- [Figma 실측](../../references/global-header.figma.json)
- [변수와 alias](../../references/global-header.variables.figma.json)
- [전용 SVG3개와 원본 크기](../../assets/global-header/manifest.json)
- [자산 연결 안내](../../assets.md)

2026-10-21에 Figma [Global Header](https://www.figma.com/design/cUKHT2PdHjAKRXZlzulnO5/?node-id=2611-62099)의
Light 단일 COMPONENT를 확인했습니다.774×43px는 샘플이며 root props·variant·prototype 반응은 없습니다.
로고의138px 박스를 넘는 실제 텍스트, 숨겨진 Divider·Breadcrumb·chip을 기본 표시 구조와 구분합니다.

현재 채택 동작은 [상태·모션·스크롤 계약](../../motion.md)을 함께 읽습니다. 정적 Figma 관찰과 계승 동작을 구분합니다.
