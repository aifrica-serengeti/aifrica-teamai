# Detail Section — 정의와 구조

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

## 의존 컴포넌트

공용 하위 컴포넌트 의존성 없음. header action에 Button 등 다른 공용 컴포넌트를 전달하는 책임은 page 조립자가 가진다.

## Anatomy

```text
DetailSection (section 또는 aside)
├─ Header
│  ├─ Heading copy
│  │  ├─ Title row
│  │  │  ├─ Title (h2 또는 h3, 필수)
│  │  │  └─ optional title accessory
│  │  └─ Description (필수)
│  └─ optional header action
└─ Body
   └─ detail grid, form, table, tree 또는 workflow content
```

## 공개 API

| prop                                | 계약                                                        |
| ----------------------------------- | ----------------------------------------------------------- |
| `title: string`                     | 보이는 heading. 생략 불가                                   |
| `description: string`               | 목적을 설명하는 보이는 한 문장. 생략 불가                   |
| `as?: "section" \| "aside"`         | 기본 `section`, 보조 탐색 panel만 `aside`                   |
| `headingLevel?: 2 \| 3`             | 기본 2. 상위 heading이 실제로 있을 때만 3                   |
| `titleAccessory?: ReactNode`        | 제목 바로 뒤에 표시하는 짧은 개수·상태 보조 정보 slot       |
| `headerAction?: ReactNode`          | card 전체에 적용되는 action slot                            |
| `bodyClassName?: string`            | 본문 layout 조합용 class                                    |
| `bodyPadding?: "default" \| "none"` | 기본 24/20px. 복합 자식이 동일 padding을 소유할 때만 `none` |

컴포넌트가 고유 id를 만들고 root의 `aria-labelledby`와 `aria-describedby`를 보이는 title/description에 연결한다. 호출자가 aria-only 이름으로 이를 우회하지 못한다. `titleAccessory`에는 Chip 같은 비상호작용 요약만 두고 Button은 `headerAction`에 둔다.
