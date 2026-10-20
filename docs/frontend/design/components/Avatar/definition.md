# Avatar — 정의와 구조

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Avatar 문서 인덱스](./README.md)

## 2. 의존 컴포넌트

의존 컴포넌트 없음. Avatar는 독립적으로 작동한다.

| 의존 | 가이드라인 | 구현 여부 |
| ---- | ---------- | --------- |
| 없음 | —          | —         |

> Radix Avatar(`@radix-ui/react-avatar` 또는 `radix-ui` 통합 패키지)는 외부 라이브러리
> 의존성이며, 공용 컴포넌트 가이드라인 대상이 아니다. 설치만 하면 된다.

---

## 3. 구조 (Anatomy)

```
Avatar (Radix Avatar.Root — span)
├── Background  ── 원형 컨테이너. 색상 토큰이 배경/글자를 모두 제어
├── (optional) Avatar.Image ── src 제공 시 로드. 실패하면 Fallback 으로 대체
└── Avatar.Fallback ── 이니셜 텍스트(1문자). 루트의 color 를 상속
```

1. **Avatar(Container)** — 원형의 전체 형태를 구성하는 기본 프레임. border-radius 50%.
2. **Initial(Fallback)** — 컨테이너 안에 사용자 이름의 첫 글자를 표시. 이미지가 없거나
   로드에 실패했을 때 나타난다.

---

## 4. 레이아웃 스펙

### Size 치수 (Figma 교차 검증 — node `10013:130785` Size 섹션)

| Size         | 원 크기(px) | font-size | line-height |
| ------------ | ----------- | --------- | ----------- |
| **16**       | 16px        | 10px      | normal      |
| **20**       | 20px        | 12px      | 16px        |
| **24**(표준) | 24px        | 14px      | 20px        |
| **28**       | 28px        | 16px      | 24px        |
| **32**       | 32px        | 18px      | normal      |
| **36**       | 36px        | 20px      | 24px        |
| **40**       | 40px        | 22px      | normal      |
| **48**       | 48px        | 26px      | normal      |

> 표준 size는 **24px**. Figma design guidelines "Size" 섹션이 명시하는 기본값이다.

### 공통 레이아웃

| 항목           | 값                                             |
| -------------- | ---------------------------------------------- |
| border-radius  | **50%** (원형)                                 |
| overflow       | `hidden` (이미지가 원 밖으로 나가지 않게 clip) |
| font-weight    | 600 (SemiBold)                                 |
| text-align     | `center`                                       |
| letter-spacing | 0                                              |
| 기본 배치      | `inline-flex`, 가로/세로 중앙 정렬             |
| font-family    | Pretendard (`--font-sans`)                     |

### 정렬 불변의 원칙

이니셜 텍스트는 항상 원의 **정중앙**에 위치해야 한다. Figma 원본은 이니셜을 절대
위치(`left: 50%, top: 50%, translate -50%/-50%`)로 중앙 정렬하지만, CSS flexbox 의
`align-items/justify-content: center` 로 동일한 결과를 더 안정적으로 얻는다.
`line-height: normal` size(16/32/40/48)는 폰트 메트릭에 따라 약간의 수직 편차가 생길 수
있으므로, Fallback 요소에 `line-height: 1` + flex 중앙 정렬을 적용해 보정한다.

---

