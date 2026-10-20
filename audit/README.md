# 추출·검증 기록

원본은 `project.serengeti-cmp`다. 최초 inventory는 commit
`29f7019c33b7c8b9e66d6c3253bad7428b722049`에서 캡처했다. 추출 날짜는 2026-10-20이다.
작업 도중 원본 checkout에 다른 커밋이 반영됐으므로 개별 추출 시점의 commit·파일 hash는
각 감사 기록을 함께 확인한다. 로컬 작업 트리에서 읽었으며 공식 API 최신성을 재검증한 작업이 아니다.

현재 적용 판정은 [서브 에이전트 최종 점검](./frontend-final-review.md)을 따른다.
공용 묶음을 선택한 CMP의 앞선 원본 비교는 [공통·CMP 재검증](./frontend-cmp-recheck.md)에 남긴다.
원본 55종의 공통/CMP 분리와 실제 CLI 배포·기존 스킬 보존 결과를 포함한다.
현재 공용 묶음은 선택 사항이다. 역할 선택과 비활성화·재활성화 결과는
[공용 묶음 검증](./frontend-bundle-toggle.md)을 따른다.

- [디자인 분리 내역](./design-extraction.md)
- [스킬·기술 문서·아키텍처 분리 내역](./engineering-extraction.md)
- [읽은 원본 inventory](./source-inventory.json)
- [TeamAI 계약 검증](./teamai-contract.md)
- [최종 검증과 원본 동시 변경 관찰](./verification.md)
- [첫 사용자 재검증과 수정](./first-use-recheck.md)
- [실제 TeamAI CLI 초기 도입](./cold-start-cli.md)
- [현재 구조: frontend 공용 + 솔루션 확장](./frontend-solution-cleanup.md)
- [폐기된 고객 전용 구조의 과거 감사](./jdc-skill-parity.md)
- [폐기된 고객 전용 구조의 과거 CLI 검사](./jdc-delivery-parity.md)

사용자 정정에 따라 고객 전용 역할·스킬 배포는 제거했다. 현재는 frontend 공용 스킬과
CMP·PaaS·Agent Hub별 확장 구조다. 앞선 고객 전용 검증 기록은 과거 상태이며 현재 도입 안내가 아니다.

이 폴더는 TeamAI docs namespace 밖에 있으므로 제품에 배포되지 않는다.
원본 hash는 읽기 전용 추출의 검증 근거이며 실제 제품 구현의 채택 상태를 뜻하지 않는다.
