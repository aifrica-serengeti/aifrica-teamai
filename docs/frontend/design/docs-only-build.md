# 문서 기반 UI 구현 계약

문서만으로 새 UI를 구현할 때도 계약의 입력을 명시해야 한다. 이 저장소에는 실행 컴포넌트와 font·brand
자산이 포함되어 있지 않으므로 “그대로 복사하면 전체 UI 100% 재현”이라고 간주하지 않는다.

## 입력

- [계약 수준](./contract-levels.md), foundations 전체, 대상 컴포넌트의 필수 6개 문서와 제공된 구현 참조
- [registry](./component-registry.json)의 id·alias·direct dependency closure
- [List/Create/Detail](./patterns/README.md), [페이지 정책](./page-policies.md)
- 소비 솔루션의 기술 버전·style 도구·public API mapping·font/icon asset·locale·선택한 profile

선택 솔루션에 추가 registry가 있으면 함께 읽고 공통과 솔루션의 합집합에서 dependency closure를
구한다. 구현 예제가 없는 컴포넌트는 정의·상태·접근성·스타일 역할로 직접 구현하며, 예제 부재를
현재 제품 source를 열람할 근거로 사용하지 않는다.

`unmapped`는 구현이 없다고 단정하는 값이 아니라 이 공통 저장소가 구현 존재를 보증하지 않는다는 뜻이다.
대상 솔루션을 조사하는 유지보수와, 제품 source 없이 계약으로 새로 구현하는 모드를 혼동하지 않는다.

## 구현 순서

1. 버전·reset·font·light/dark 역할 토큰·reduced motion을 연결한다.
2. Icon·Divider·Spinner·Scrollbar·Tooltip처럼 leaf를 구현 또는 매핑한다.
3. Button·Input·NumberInput·Select 등 actions/forms를 조합한다.
4. Menu·Dialog·Notification·content state를 조합한다.
5. Table·Card·Tree·Tab·Pagination·PageHeader를 구현한다.
6. 선택한 솔루션의 shell을 연결하고 List/Create/Detail을 조립한다.

각 dependency는 한 번만 구현한다. 상위 컴포넌트에서 button·SVG·portal·keyboard·scrollbar를 임시 복제하지
않는다. API·route·permission·mutation·draft는 page/domain adapter가 소유한다.

## 완료 조건

- 실제 기술 버전과 public mapping이 확인되었다.
- reference API에서 지원하지 않는 부분과 profile 차이가 기록되었다.
- 모든 dependency와 font·자산이 연결되었고 임시 대체물을 최종 결과로 표시하지 않는다.
- 컴포넌트의 상태·접근성 matrix와 page의 loading/empty/error/refresh/mutation/permission을 확인했다.
- light/dark·좁은 폭·긴 번역·200% zoom·keyboard·reduced motion을 확인했다.
- 해당 저장소에 존재하는 lint/typecheck/test/build와 문서 검증을 실행했다.

구체적인 검증 절차는 [Reproduction](./reproduction.md), 완료 판단은 [Quality](./quality.md)를 따른다.
