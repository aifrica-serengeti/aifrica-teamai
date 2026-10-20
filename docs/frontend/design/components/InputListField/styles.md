# Input List Field 스타일

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

## 5. layout과 visual spec

| 요소          | 값                                          |
| ------------- | ------------------------------------------- |
| root          | column, `gap: 4px`, `min-width: 0`          |
| label         | 14px/20px semibold, `--text`; 내부 gap 2px  |
| list          | column, row gap 8px                         |
| row           | flex, center align, gap 8px, `min-width: 0` |
| Input         | `flex: 1 1 auto`, `min-width: 0`            |
| delete button | xlarge ghost, icon `eliminate`, icon size l |
| add button    | small tertiary, `align-self: flex-start`    |
| help          | top margin 4px, 12px/16px `--text-subtler`  |
| error         | 12px/16px `--text-danger`                   |

Input은 전달받은 `size`/`variant`를 그대로 쓴다. 상세 수정은 `medium/default`, 등록 화면은
`large/create`가 기본이다. 삭제 button을 row 중앙에 두어 input size가 커져도 시각 중심이 맞는다.

### 색상 토큰

| 요소           | light                        | dark                         |
| -------------- | ---------------------------- | ---------------------------- |
| label          | `--text` `#1c1c1c`           | `--text` `#dddddd`           |
| optional/help  | `--text-subtler` `#757575`   | `--text-subtler` `#8f8f8f`   |
| required/error | `--text-danger` `#e81919`    | `--text-danger` `#f52424`    |
| Input focus    | `--border-primary` `var(--accent-500)` | `--border-primary` `var(--accent-400)` |

