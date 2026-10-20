# Private Icon

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

Figma Design System의 타사 서비스·클라우드·운영체제·기술 스택 로고를 표시하는 공용 컴포넌트다.
일반 액션 아이콘은 기존 [Icon](../Icon/README.md)을 사용하며, 이 컴포넌트에 섞지 않는다.

## 문서 탐색

- [정의와 구조](./definition.md)
- [스타일과 사이즈](./styles.md)
- [상태와 동작](./behavior.md)
- [접근성](./accessibility.md)
- [검증](./verification.md)
- [구현 인덱스](./implementation/README.md)

## Figma 원본

- [Private icon master](https://www.figma.com/design/RP8QTyB9n2ZpgfCgmuXgsz/%EC%84%B8%EB%A0%9D%EA%B2%8C%ED%8B%B0-Design-System?node-id=4258-8192&m=dev)
- 기준 variant: 각 이름의 Size=4xl
- 원본 자산: 전달 묶음의 `private-icon` asset manifest. 소비 프로젝트의 asset directory 이름은 자유다.

## 솔루션 자산 매핑

`TPrivateIconName`과 자산 manifest의 허용 이름은 소비 솔루션이 정의한다. 특정 cloud vendor나
원본 저장소의 파일명을 공통 필수로 요구하지 않는다. 사용할 자산마다 logical name, source, license,
size/viewBox, 대체 텍스트와 fallback 허용 여부를 매핑한다. 공통 저장소는 SVG·PNG binary를 제공하지 않는다.
