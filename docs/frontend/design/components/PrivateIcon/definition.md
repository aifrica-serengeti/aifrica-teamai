# Private Icon — 정의와 구조

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Private Icon](./README.md)

## 의존성

공용 UI 컴포넌트 의존성은 없다. Figma에서 내보낸 SVG/PNG 자산과 공용 이름 타입만 사용한다.

| 구분 | portable module | 책임 |
| --- | --- | --- |
| 이름 계약 | public icon-name type | 허용되는 아이콘 이름 |
| 자산 매핑 | immutable asset map | 이름과 Figma 원본 자산의 일대일 매핑 |
| 컴포넌트 | `PrivateIcon` public export | size·대체 텍스트·렌더링 |

## 구조

    span (지정한 고정 size)
    └── img (Figma 원본 SVG 또는 PNG, contain)

PrivateIcon은 상호작용·상태·도메인 데이터를 소유하지 않는다. 호출부가 제품의 벤더 또는 기술 스택
값을 PrivateIcon의 name으로 변환하고, 해당 로고가 단독으로 의미를 가지면 label을 제공한다.

## 공개 API

| prop | 타입 | 기본값 | 설명 |
| --- | --- | --- | --- |
| name | TPrivateIconName | - | Figma Private icon 이름 |
| size | m, xl, 2xl, 3xl, 4xl, 5xl, 6xl, 7xl | m | Figma size token |
| label | string | 없음 | 단독 의미가 있는 로고의 대체 텍스트 |
| className | string | 없음 | root span 확장 class |
