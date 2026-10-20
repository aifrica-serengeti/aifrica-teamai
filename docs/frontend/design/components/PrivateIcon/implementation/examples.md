# Private Icon — 사용 예제

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← 구현 인덱스](./README.md)

~~~tsx
import { PrivateIcon } from "@components/PrivateIcon";
import { Icon } from "@components/Icon";

// 벤더명이 별도로 보여 장식용으로 사용
<PrivateIcon name="aws" size="4xl" />

// 로고만으로 기술을 구분하므로 대체 텍스트 제공
<PrivateIcon name="python" size="2xl" label="Python" />
~~~

System Icon은 PrivateIcon이 아니라 기존 Icon을 사용한다.

~~~tsx
<Icon name="refresh" size="m" />
~~~
