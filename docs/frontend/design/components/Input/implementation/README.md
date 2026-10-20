# Input — 구현 인덱스

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Input 문서 인덱스](../README.md)

## 구현 문서

- [CSS와 스타일 구현](./css.md)
- [TypeScript와 React 구현](./typescript.md)

## 12. 구현 코드

이 디렉터리는 primitive 부분 예제와 `InputField`의 조합·이벤트 참조 계약이다.
`InputField` wrapper와 모든 helper를 포함한 완성된 복사·실행용 소스가 아니다.

[TypeScript 예제](./typescript.md)의 첫 TSX 블록은 bare `Input`만 export한다. 이후 `InputField` 사용
예제는 소비 솔루션의 검증된 public mapping을 전제로 하며, 첫 블록만으로는 실행할 수 없다.
`InputFieldProps` 전체 타입도 제공하지 않는다. 공개 입력의 명시된 부분은
[정의](../definition.md), 수명과 상호작용은 [동작](../behavior.md), 검증은
[체크리스트](../verification.md)를 따른다.

`input-validation`, native validation hook, focus helper, 기본 문구 데이터는 역할 이름과 행동을
설명하며 실행 구현은 번들하지 않는다. 소비 제품의 source·public Props·export·dependency·test를
확인하고 버전·alias·style adapter를 연결해야 한다. 해당 입력이 없으면 동일 재현을 통과로 기록하지 않는다.

스타일 예제는 `@vanilla-extract/css`를 사용하며 아이콘·보조 액션은
공용 [IconButton](../../IconButton/README.md)과 그 의존 계약으로 조합한다. 실제 설치 package와
public API는 소비 솔루션에서 확인한다.
