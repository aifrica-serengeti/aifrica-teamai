# Global Header v2 — 상태와 동작

공용 묶음 적용 조건: inheritCommon: true를 채택하고 frontend-common 역할을 선택한 UI 작업에만
아래 계약을 적용한다. 공용을 끈 경우 제품 자체 지침을 따르며 공용 문서·스킬·primitive를 요구하지 않는다.

> CMP 확장 계약: 상태·공개 API·접근성을 원본에서 분리했다. 색은 역할 token으로 연결하고 브랜드·메뉴·계정 데이터는 현재 제품에서 제공한다. 치수는 해당 shell 세대를 채택할 때의 참조 baseline이며 제품에서 변경하면 근거와 검증을 기록한다. 과거 구현됨 표기는 현재 제품 구현의 증거가 아니다.

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

