# Slider — 상태와 동작

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Slider 문서 인덱스](./README.md)

## 7. 상태

4가지 상태. 단일/Range 모드 공통.

| 상태               | 동작                       | 시각 변화                                                            |
| ------------------ | -------------------------- | -------------------------------------------------------------------- |
| **Default**        | 기본 대기 상태             | Track `#ddd`, Range/Thumb `var(--accent-500)`                                  |
| **Hover & Active** | 마우스 오버 또는 드래그 중 | Thumb 주변 primary outline 2px. Tooltip 표시                         |
| **Typing**         | Input 박스에 숫자 입력 중  | Input focused(border 2px). blur 시 min/max clamp 로 값 확정          |
| **Disabled**       | 모든 상호작용 차단         | Range/Thumb 회색(`#eee`), Input 회색 표면. Thumb pointer-events 차단 |

### 구현 주의점

1. **Tooltip 표시 타이밍**: hover(mouseenter) + 드래그(pointerdown ~ pointerup) +
   키보드 포커스(focus) 시 표시. 드래그 중에는 pointerup 전까지 유지.
2. **Tooltip 위치**: 각 Thumb 를 `TooltipTrigger(asChild)` 로 감싸서 Tooltip 이 Thumb
   위에 위치. Radix 가 Thumb 를 절대위치로 이동시키면 Tooltip 도 함께 이동.
3. **Input ↔ Slider 양방향 동기화**: Input 은 `type="text"` + `inputMode="numeric"` 으로
   숫자만 허용. blur(또는 Enter) 시에만 clamp + 커밋(타이핑 도중 강제 변환 방지).
   Range 모드는 min/max 각각 clamp(min Input 은 현재 max 이하, max Input 은 현재 min 이상).
4. **Range 모드 Input 배치**: min Input 은 Track 왼쪽, max Input 은 Track 오른쪽.
   단일 모드는 Track 오른쪽에 Input 1개.
5. **Controlled / Uncontrolled**: `value` prop 이 있으면 controlled, `defaultValue` 면
   uncontrolled. `onValueChange` 콜백으로 값 변경 통지.

---

## 9. 애니메이션

색상 전환은 **개별 컴포넌트 요소 레벨**에서 `transition: '<색상속성> 0.2s ease'`.
전역 `*` 셀렉터 사용 금지. `transition: all` 금지. 0.2s 통일.

```css
/* Track — 배경색만 */
transition: background-color 0.2s ease;

/* Range/Fill — 배경색만 */
transition: background-color 0.2s ease;

/* Thumb — 배경/테두리/outline 색만 */
transition:
  background-color 0.2s ease,
  border-color 0.2s ease,
  outline-color 0.2s ease;

/* Label / requirement / Info 아이콘 / Help·Error / Step 라벨 / tick — 색상만 */
transition: color 0.2s ease;
```

> 다크/라이트 모드 전환 시에도 각 요소의 transition 이 보간되어 깜빡임 없이 부드럽게 전환.
> `@media (prefers-reduced-motion: reduce)` 가 전역으로 transition 을 무력화하므로 컴포넌트는
> 별도 reduced-motion 처리 불필요.
> Tooltip 진입/퇴장 애니메이션은 공용 Tooltip 컴포넌트(fade + slide 0.15s) 상속.

---


## 문구 없는 오류 상태

`invalid=true`만 전달하면 오류 상태만 표시하고 오류 문구를 생성하지 않는다. `errorText`가 있으면 기존처럼 오류 문구를 표시한다.


## 사용자 지정 표시 눈금

`marks`는 표시만 바꾸며 드래그·키보드 이동은 계속 `step`을 따른다. 범위 밖 또는 유한하지 않은 눈금은 제외한다. `marks` 생략 시 기존 동작을 유지하고, `showSteps=false`면 눈금 배열도 생성하지 않는다.

## 보조 문구 배치

`helpTextPlacement`는 `below`(기본값) 또는 `label-end`를 받는다. `label-end`는 라벨 줄의 오른쪽에 기존 보조 문구를 표시한다. 라벨이 없으면 하단 표시를 유지하며 오류는 항상 하단에 표시한다. 배치와 관계없이 보조 문구는 하나만 렌더하고 thumb의 `aria-describedby` 연결을 유지한다. 페이지는 Slider 내부 태그를 선택하는 CSS 대신 이 옵션을 사용한다.
