# TeamAI 배포 계약 확인

확인 날짜: 2026-10-20. npm stable `teamai-cli@0.27.0`, gitHead
`40f36f02faf70f393ee3e71bf1a4c017f0106fc2`의 schema/namespace/docs 구현을 확인했다.
upstream main은 `8dc60b082f60ed19a735fde6839ffddb59ec5b4b`였으며 package.json의 0.22.0 표기를
현재 배포 버전으로 사용하지 않았다.

- roles/projects의 knowledge/skills/docs namespace는 합집합이다.
- 같은 이름의 스킬을 두 namespace에 두면 override 우선순위가 아니라 충돌 대상이다.
- role의 resources.docs와 namespace 보존 mirror는 안정 버전에서 지원한다.
- docs 최상위 디렉터리를 manifest에 선언하지 않으면 shared로 취급될 수 있다.
- init은 안정 버전에서 pull한다. 이후 main은 일부 리소스의 동기화를 다음 세션/pull로 미뤘다.
  onboarding은 role/project를 최초 init에 명시하고, 후속 pull을 명시하여 두 차이를 고려한다.

실제 npm 배포 번들에서 TeamaiConfigSchema, roles/projects validator와 resolver를 추출해
별도의 임시 디렉터리에서 이 저장소의 설정을 파싱 검증했다. CLI init/pull을 실행하거나
사용자 도구에 훅을 설치한 검증은 아니다. authoring validator는 manifest namespace 존재,
backend 격리, 솔루션 분리와 공통 registry를 지속적으로 확인한다.

근거: [설정 타입](https://github.com/Tencent/teamai-cli/blob/40f36f02faf70f393ee3e71bf1a4c017f0106fc2/src/types.ts),
[리소스 합성](https://github.com/Tencent/teamai-cli/blob/40f36f02faf70f393ee3e71bf1a4c017f0106fc2/src/resource-namespaces.ts),
[docs 배포](https://github.com/Tencent/teamai-cli/blob/40f36f02faf70f393ee3e71bf1a4c017f0106fc2/src/resources/docs.ts).
