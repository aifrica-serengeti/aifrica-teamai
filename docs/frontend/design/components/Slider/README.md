# Slider

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

이 문서는 **의존 문서와 함께** Slider 컴포넌트를 상세 상태·시각 계약을 구현하기 위한 완전한
스펙이다. 이 디렉터리와 의존 문서로 계약을 확인하고 솔루션 mapping·자산을 추가해야 한다.

---

> 문서 분할 안내: 기존 가이드의 “이 파일” 표현은 이제 이 디렉터리의 문서 묶음 전체를 뜻한다.
> 원문 내용은 삭제하지 않고 목적별 문서로 나눴다.

## 문서 탐색

- [구현 인덱스](./implementation/README.md)
- [정의와 구조](./definition.md)
- [스타일과 토큰](./styles.md)
- [상태와 동작](./behavior.md)
- [접근성](./accessibility.md)
- [검증과 재현](./verification.md)
- [CSS와 스타일 구현](./implementation/css.md)
- [TypeScript와 React 구현](./implementation/typescript.md)

## 1. 개요

슬라이더는 제한된 범위에서 특정 값이나 범위를 직관적으로 설정할 수 있는 입력 요소다.
최솟값(`min`), 최댓값(`max`), 단위(`step`)가 반드시 지정되어야 한다. 두 가지 타입을 지원한다:

- **Default Slider** — 단일 핸들로 하나의 값을 선택.
- **Range Slider** — 두 개의 핸들로 값의 범위(최솟값~최댓값)를 설정.

**기술 기반**: Radix UI 의 `Slider` primitive(`radix-ui` 패키지) 기반의 shadcn 컴포넌트를
커스텀한다. Radix 가 접근성(키보드·ARIA), 드래그 상호작용, Thumb 절대위치 계산을 담당하고,
이 가이드의 CSS 로 Track/Range/Thumb 외형을 Figma 스펙에 맞춘다. 입력 박스는 공용 **Input**
컴포넌트를, 핸들 위 값 표시는 공용 **Tooltip** 컴포넌트를 의존성으로 사용한다.

Slider의 field label은 공용 **InputField**와 동일하게 Label · `(선택사항)` · `*` · Info 아이콘 ·
Help/Error text 조합을 사용한다. Slider 전용 label 스타일을 만들지 않는다.

---


## 문구 없는 오류 상태

`invalid?: boolean`으로 오류 문구 없이 오류 상태를 전달할 수 있다. `errorText`를 제공한 기존 호출도 그대로 동작한다.


## 사용자 지정 표시 눈금

`marks?: readonly { value: number; label?: ReactNode }[]`로 조절 단위(`step`)와 별개인 표시 눈금을 지정할 수 있다. 생략하면 기존 step 기반 눈금을 사용한다.

## 보조 문구 배치

`helpTextPlacement`는 `below`(기본값) 또는 `label-end`를 받는다. `label-end`는 라벨 줄의 오른쪽에 기존 보조 문구를 표시한다. 라벨이 없으면 하단 표시를 유지하며 오류는 항상 하단에 표시한다. 배치와 관계없이 보조 문구는 하나만 렌더하고 thumb의 `aria-describedby` 연결을 유지한다. 페이지는 Slider 내부 태그를 선택하는 CSS 대신 이 옵션을 사용한다.
