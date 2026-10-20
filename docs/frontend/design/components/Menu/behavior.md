# Menu — 상태와 동작

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Menu 문서 인덱스](./README.md)

## 7. 상태

### 상태 우선순위 (여러 상태 겹칠 때)

```
Disabled (최우선) > Selected > Focused > Hovered/Pressed > Enabled
```

1. **Disabled** — selected 무시, `transparent` 배경, `boxShadow: none`
2. **Selected** — `--menu-item-selected` 배경, `--text-primary` 텍스트
3. **Focused** — 배경 유지, focus 링만 (hover와 겹치면 hover 우선)
4. **Hovered / Pressed** — 배경만 전환
5. **Enabled** — 기본

### Submenu 규칙 (★중요)

```
MenuSub (Radix Sub)
├── MenuSubTrigger
│   ├── <span itemContent>{children}</span>
│   └── <span itemTrailing>
│         └── <ChevronRightIcon className={chevronIcon} />
│       </span>
└── MenuSubContent (기본 size="small")
    └── MenuItem × N
```

> **Submenu 주의사항**:
>
> - `MenuSubTrigger`는 일반 `MenuItem`과 **동일한 스타일**(item + size 클래스)을 적용한다.
> - 우측에 `ChevronRightIcon`(16px)이 **자동 렌더**된다. 색상은 `--text`(폰트와 동일).
> - `MenuSubContent`는 `content` 클래스를 그대로 사용하되, 기본 `size="small"`로 내부 item 크기를 설정한다.
> - SubmenuContent도 자체 `MenuContext.Provider`로 size를 전파해야 한다.

### Selected 동작

- `selected` prop → `data-selected="true"` 속성 설정
- `selected + trailing 미지정` → `<CheckIcon className={checkIcon}>` 자동 렌더 (16px, `--text-primary`)
- `selected + trailing 지정` → check 대신 trailing 표시

---

## 10. 애니메이션

### Menu 진입/퇴장 (fade + 방향별 slide)

| 방향(data-side) | 진입                                       | 퇴장           |
| --------------- | ------------------------------------------ | -------------- |
| **top**         | `fadeInUp` (opacity 0→1, translateY 6px→0) | `fadeOutUp`    |
| **bottom**      | `fadeInDown` (translateY -6px→0)           | `fadeOutDown`  |
| **left**        | `fadeInLeft` (translateX 6px→0)            | `fadeOutLeft`  |
| **right**       | `fadeInRight` (translateX -6px→0)          | `fadeOutRight` |
| **미지정**      | `fadeInDown`                               | `fadeOutDown`  |

- 지속시간: **0.15s**, 타이밍: `ease`, fill-mode: `both`
- `data-state="open"` / `data-state="closed"` + `data-side` 로 제어

### 다크/라이트 전환

- 모든 색상 요소에 개별 `transition: '<속성> 0.2s ease'` 적용
- **`transition: all` 금지**, 전역 `*` 셀렉터 금지
- 적용 요소: Content(bg/border/shadow), Item(bg/color/box-shadow), Section header(color),
  Description(color), Shortcut(color), Check/Chevron icon(color), Divider(bg)

---

