# CMP shell 컴포넌트 확장

공용 묶음 적용 조건: inheritCommon: true를 채택하고 frontend-common 역할을 선택한 UI 작업에만
아래 계약을 적용한다. 공용을 끈 경우 제품 자체 지침을 따르며 공용 문서·스킬·primitive를 요구하지 않는다.

공통 디자인 51종에 CMP navigation/header 4종을 추가한다. 공용 역할은 `frontend-common`, 프로젝트는 `cmp`이며 별도 고객 역할이나 loader가 필요하지 않다.

[추가 registry](./component-registry.json)에서 id·alias·dependency를 검색한다. 각 docs 경로는 이 registry 기준이다.

- [SNB v1](./components/SNBV1/README.md)
- [SNB v2](./components/SNBV2/README.md)
- [Global Header v1](./components/GlobalHeaderV1/README.md)
- [Global Header v2](./components/GlobalHeaderV2/README.md)

공통 51종과 CMP 4종의 id는 중복하지 않는다. 제품 source·브랜드·메뉴·자산은 로컬 채택 설정에서 연결한다. 원본 스타일의 특정 palette 대신 semantic role을 사용하며 여기의 치수는 shell 세대별 참조 baseline이다.
