# Global Header v2 — 상태와 동작

> **미채택 JDC 관찰 profile**: 원본 shell의 상세 근거를 보존한 자료입니다. CMP 전체 또는 PaaS·Agent Hub의 기본 규칙이 아닙니다.
> 공통 문서에 대한 참조는 공통 계약을 사용하며, 여기의 색·자산·치수·export 존재 주장은 관찰 시점의 원본에만 해당합니다.


[← Global Header v2 문서 인덱스](README.md)

## 7. 상태와 SNB v2 연동

Header는 SNB state의 단일 진실 원천이 아니다. 부모 application shell이 상태를 소유한다.

| `snbCollapsed` | 토글 `aria-expanded` | `aria-label` | callback payload | 기대되는 SNB v2 |
| --- | --- | --- | --- | --- |
| `false` / 생략 | `true` | `사이드 내비게이션 접기` | `true` | 펼쳐진 SNB를 접음 |
| `true` | `false` | `사이드 내비게이션 펼치기` | `false` | 접힌 SNB를 펼침 |

아래 순서가 application shell의 기준 구현이다. SNB를 먼저 놓고, 그 오른쪽 `appContainer` 내부에
Header를 넣는다. `SNBV2`에는 `collapsed`만 전달하며, state 변경은 Header의 callback에서 부모가
처리한다. `SNBV2`에 존재하지 않는 `onCollapsedChange` prop을 전달하지 않는다.

```tsx
const [snbCollapsed, setSnbCollapsed] = useState(false)

<div className={screen}>
  <SNBV2
    id="primary-snb"
    sections={sections}
    collapsed={snbCollapsed}
  />
  <div className={appContainer}>
    <GlobalHeaderV2
      breadcrumbs={[{ label: '모델/에이전트', current: true }]}
      snbCollapsed={snbCollapsed}
      snbId="primary-snb"
      onSnbCollapsedChange={setSnbCollapsed}
    />
  </div>
</div>
```

## 8. 타이포그래피와 모션

| 요소 | 값 |
| --- | --- |
| Header | Pretendard (`--font-sans`) |
| Breadcrumb | 공용 Breadcrumb Body2 — 14px / 20px / 400 |
| Header shell 전환 | `background-color 0.2s ease, border-color 0.2s ease` |
| Shell / appContainer 전환 | `background-color 0.2s ease` |
| Icon Button | 공용 컴포넌트의 색상 전환과 focus 규칙을 그대로 사용 |
| Divider | 공용 Divider의 background-color transition을 그대로 사용 |

- `transition: all` 또는 전역 `*` transition은 사용하지 않는다.
- Header는 radius 애니메이션을 하지 않는다.
- `prefers-reduced-motion: reduce`는 전역 motion 정책이 처리한다.

