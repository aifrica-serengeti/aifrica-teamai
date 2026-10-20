# Frontend 공용 + 솔루션 확장으로 정리

사용자 정정에 따라 고객별 전용 TeamAI 역할을 제거했다. 원본 고객 저장소는 공통화·CMP 확장을
정리하기 위한 읽기 전용 참고 대상이다. 앞선 고객 전용 배포 구조의 동등성 판정은 현재 사용 안내가 아니다.

- 역할은 `frontend`, `backend` 두 개다.
- frontend 공용 스킬 7종과 공용 컴포넌트 51종·List/Create/Detail 가이드는 유지한다.
- CMP 사용은 `frontend` + `cmp`다. 추가 아키텍처·타입·API/메뉴 경계·페이지 연결·검증은
  [CMP frontend 계약](../docs/cmp/frontend-contract.md)으로 연결한다.
- PaaS·Agent Hub는 기존의 별도 솔루션 확장 구조를 유지한다.
- 고객 전용 역할·스킬 3종·규칙·문서 namespace·원문 pack/loader·실행 profile·생성 도구를 제거했다.
- 관찰 자료와 출처 manifest는 이 감사 폴더 아래에만 보존한다. TeamAI 배포 대상이 아니다.
- 원본 `project.serengeti-cmp`는 수정·초기화·설치하지 않았다. 실제 사용자 홈·원격도 변경하지 않았다.

[JDC 관찰 자료](./jdc/observed-design.json)와 [당시 원문 manifest](./jdc/source-manifest.json)는
추출 근거다. 이를 현재 제품의 구현·채택·고객 전용 스킬로 해석하지 않는다.

정리 후 `npm run verify` 통과: 공용 컴포넌트 51종·스킬 7종·역할/솔루션 6조합·확장 schema 3개와
문서 링크·namespace 격리를 확인했다. `npm test` 8/8 통과. 제거한 고객 전용 4개 테스트는
폐기된 pack/loader 기능의 테스트였으며 공용 동작 검사 8개는 유지했다. 배포 자산·도구에서 폐기한
역할·고유 스킬·원문 실행 경로 참조가 남지 않은 것도 확인했다.
