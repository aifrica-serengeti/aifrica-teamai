# 공통 디자인 계약의 범위

[공통 허브](./README.md)에서 작업 종류를 고른 뒤 [계약 수준](./contract-levels.md)을 적용한다.
이 묶음은 51개 컴포넌트의 공개 참조 API, 조합 의존성, 상세 상태·접근성·검증을 보존한다.
실행 컴포넌트, 브랜드 파일 또는 완성된 제품 shell을 제공하지 않는다.

## 읽기 순서

1. 대상 솔루션·profile과 실제 기술 버전을 확인한다.
2. [Foundations](./foundations.md)에서 필요한 역할 토큰을 읽는다.
3. [카탈로그](./components/index.md)·[registry](./component-registry.json)로 대상을 찾는다.
4. 대상 컴포넌트와 dependency closure의 필수 문서를 읽는다.
5. page 작업은 [List/Create/Detail](./patterns/README.md)와 [페이지 정책](./page-policies.md)을 연결한다.
6. 실제 구현 mapping과 비교하고 해당 상태 matrix를 검증한다.

원본의 navigation·global header·브랜드 자산·관찰된 페이지 값은 관찰 profile이다. 같은 회사에서 사용한다는
이유만으로 다른 솔루션에 자동 적용하지 않는다. 공통 계약을 채택하는 경우에도 필요한 자산·환경과 코드가
없으면 픽셀 수준 동일 재현을 보장하지 않는다.
