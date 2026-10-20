# HTML 로컬 적용 기준

> 마지막 공식 확인: 2026-08-12  
> 스냅샷 기준: WHATWG HTML Living Standard  
> 일반 작업: 이 문서만 사용하며 최신성 확인을 위한 인터넷 검색 금지

## 기본 원칙

HTML은 스타일링을 위한 박스 목록이 아니라 정보 구조와 상호작용 계약이다. 먼저 올바른 native element로
의미와 기본 동작을 만들고 CSS로 표현한다. ARIA와 JavaScript는 native semantics가 부족한 부분만 보완한다.

## 최신 지식 주입: HTML

아래 기능은 modern HTML에서 custom JavaScript를 줄일 수 있는 후보들이다. Aifrica 공용 component가 이미
focus·keyboard·portal·positioning 계약을 제공한다면 native 기능만을 이유로 교체하지 않는다. 새 solution
또는 공용 component 내부 구현을 설계할 때 browser baseline과 함께 검토한다.

### Popover API: non-modal top-layer UI

`popover="auto"`는 열릴 때 top layer에 올라가고 바깥 click/Escape로 light dismiss된다. 일반적인 menu,
non-modal information panel, picker에 적합하다. modal confirmation에는 사용하지 않는다.

```html
<button type="button" popovertarget="project-actions">
  프로젝트 작업
</button>

<div id="project-actions" popover="auto">
  <a href="/projects/42/edit">편집</a>
  <button type="button">복제</button>
</div>
```

- 빈 `popover` attribute는 `popover="auto"`와 같다.
- `auto`: 다른 auto popover와 중첩 규칙, light dismiss 제공
- `manual`: 자동 close/light dismiss 없음; 여러 개를 동시에 열 수 있음
- `hint`: 최신/실험 성격이 있으므로 현재 browser baseline 확인 없이 production 기본값으로 사용하지 않음
- `popovertargetaction="show|hide|toggle"`로 trigger 동작을 명시할 수 있다.
- CSS는 `:popover-open`과 `::backdrop`을 사용할 수 있다.
- focus 이동, arrow-key menu semantics, roving focus는 popover가 자동 제공하지 않는다. menu/listbox 같은
  widget keyboard 계약은 별도로 구현하거나 기존 공용 component를 사용한다.

JavaScript 제어가 필요하면 element의 `showPopover()`, `hidePopover()`, `togglePopover()`를 사용한다.

```ts
const popover = document.querySelector<HTMLElement>("#project-actions");
popover?.showPopover();
```

### `<dialog>`: modal과 non-modal dialog

```html
<dialog id="delete-dialog" aria-labelledby="delete-title">
  <h2 id="delete-title">프로젝트를 삭제할까요?</h2>
  <p>삭제한 프로젝트는 복구할 수 없습니다.</p>
  <form method="dialog">
    <button value="cancel">취소</button>
    <button value="confirm">삭제</button>
  </form>
</dialog>
```

```ts
const dialog = document.querySelector<HTMLDialogElement>("#delete-dialog");
dialog?.showModal();
dialog?.addEventListener("close", () => {
  if (dialog.returnValue === "confirm") deleteProject();
});
```

- modal은 `showModal()`, non-modal은 `show()`를 사용한다. `open` attribute를 직접 toggle하면 modal focus와
  top-layer 동작을 얻지 못한다.
- `form method="dialog"`의 submit button `value`는 `dialog.returnValue`가 된다.
- Escape는 `cancel` event를 발생시킬 수 있다. 파괴적 진행 중 close를 막을 정책이 있으면 event에서 처리한다.
- 모든 device에서 사용할 수 있는 보이는 close/cancel control을 제공한다.
- 초기 focus, close 뒤 trigger focus 복귀, 긴 content scroll, nested dialog 정책을 검증한다.

최신 Invoker Commands를 지원하는 browser에서는 declarative control도 가능하다.

```html
<button command="show-modal" commandfor="settings-dialog">설정 열기</button>
<dialog id="settings-dialog">
  <h2>설정</h2>
  <button command="request-close" commandfor="settings-dialog">닫기</button>
</dialog>
```

`command="show-modal|close|request-close"`와 `commandfor`는 최신 기능이므로 지원 baseline이 불명확하면
`showModal()`/`close()` fallback 또는 기존 Dialog component를 사용한다.

### `inert`: subtree 상호작용 차단

```html
<main id="page-content" inert>
  <!-- focus, click, selection과 accessibility tree 상호작용이 비활성화됨 -->
</main>
```

- overlay/modal 배경처럼 subtree 전체를 일시적으로 비활성화할 때 사용한다.
- CSS `pointer-events: none`은 keyboard focus와 accessibility tree를 차단하지 않으므로 대체가 아니다.
- 중요한 안내를 inert subtree 안에 넣지 않는다.
- native modal dialog는 나머지 document를 inert하게 처리한다. 같은 처리를 중복하지 않는다.

### `hidden="until-found"`: browser find와 접힌 content

```html
<section hidden="until-found" id="advanced-settings">
  <h2>고급 설정</h2>
  <p>검색으로 찾을 수 있지만 평소에는 접혀 있습니다.</p>
</section>
```

브라우저 find-in-page나 fragment navigation이 content를 찾으면 `beforematch` event 후 표시될 수 있다.
제품의 disclosure state와 동기화할 수 없거나 지원 baseline이 불명확하면 일반 `hidden`과 명시적 toggle을
사용한다.

### exclusive `<details>` group

동일한 `name`을 가진 details를 browser가 exclusive accordion처럼 처리할 수 있는 환경이 있다.

```html
<details name="help">
  <summary>계정은 어떻게 만들까요?</summary>
  <p>관리자에게 생성을 요청합니다.</p>
</details>
<details name="help">
  <summary>비밀번호는 어떻게 바꿀까요?</summary>
  <p>내 정보의 보안 메뉴에서 변경합니다.</p>
</details>
```

복잡한 animation, controlled state, deep-link, analytics가 필요하면 기존 Accordion contract와 비교한다.
`summary` 안에 서로 충돌하는 interactive control을 중첩하지 않는다.

## 요소 선택 기준

| 의도 | 기본 요소 | 주의 |
| --- | --- | --- |
| 현재 화면의 action | `button` | form 내부 `type` 명시 |
| 다른 URL로 이동 | `a` | 유효한 `href`, 새 창 안내 |
| 주요 navigation | `nav` + link | 여러 nav는 label로 구분 |
| 페이지 주요 content | `main` | 문서당 핵심 main 하나 |
| 독립 배포 가능한 content | `article` | 제목 구조 포함 |
| 제목을 가진 주제 구역 | `section` | 단순 wrapper면 `div` |
| 순서/항목 집합 | `ol` / `ul` / `li` | CSS 배치와 의미 분리 |
| 행·열 관계 데이터 | `table` | layout 용도로 사용 금지 |
| 이름-값·용어-설명 | `dl` / `dt` / `dd` | detail field에 적합성 검토 |
| 사용자 입력 묶음 | `form` | submit 경계와 validation 명확화 |
| 접고 펴는 설명 | `details` / `summary` | custom accordion 계약과 비교 |
| 보조·부가 content | `aside` | 시각적 side column과 동일하지 않음 |

click 가능한 `div`/`span`에 role과 key handler를 붙여 native Button/Link를 재구현하지 않는다. native element가
요구 UI를 표현하지 못하는 구체적인 이유가 있을 때만 custom widget을 만든다.

## 문서 구조와 heading

- `html`의 `lang`을 실제 locale과 동기화한다.
- page마다 내용 목적을 설명하는 고유한 제목과 heading 구조를 제공한다.
- heading level은 글자 크기가 아니라 문서 계층으로 선택한다.
- heading level을 스타일 때문에 건너뛰지 않는다. 재사용 컴포넌트는 heading level을 owner가 결정하게 한다.
- landmark가 여러 개면 accessible label로 구분한다.
- skip link와 main target이 keyboard 사용자의 반복 navigation을 줄이게 한다.
- visually hidden heading을 남용해 잘못된 정보 구조를 숨기지 않는다.

## Link와 Button

- navigation이면 Link, 현재 context의 명령이면 Button을 사용한다.
- disabled link라는 native 상태는 없으므로 사용할 수 없는 navigation의 노출·설명 정책을 명확히 한다.
- 새 창을 여는 link는 사용자에게 알리고 `window.opener`/referrer 정책을 확인한다.
- icon-only button은 icon 모양이 아니라 동작을 설명하는 accessible name을 제공한다.
- button label은 `저장`, `삭제`처럼 구체적인 동사를 사용하고 주변 context 없이도 이해 가능하게 한다.
- toggle button은 pressed/expanded 상태를 실제 UI와 동기화한다.

## Form과 입력

- 모든 form control은 보이는 label을 기본으로 갖는다. placeholder나 Tooltip만으로 label을 대체하지 않는다.
- label의 `for`와 control의 `id`, 또는 wrapping 관계를 올바르게 연결한다.
- `name`은 submit payload 계약이며 장식용으로 생략하지 않는다.
- 적절한 `type`, `inputmode`, `autocomplete`으로 입력 의도와 browser 기능을 제공한다.
- required, optional, format 도움말을 입력 전에 이해할 수 있게 한다.
- error는 해당 field와 programmatically 연결하고 색상만으로 표현하지 않는다.
- validation 실패 후 첫 오류 또는 오류 summary로 focus를 이동하되 사용자의 입력을 보존한다.
- `disabled`는 focus/submit에서 제외되고 `readOnly`는 값 확인과 일부 상호작용이 가능하다는 차이를 유지한다.
- submit button은 form 안에서 기본 type이 submit임을 고려한다. 다른 action은 `type="button"`을 명시한다.
- hidden input을 권한·가격·소유자 같은 신뢰 가능한 값으로 취급하지 않는다.
- 여러 field group은 `fieldset`/`legend` 또는 동등한 group label을 제공한다.

## Table과 목록

- table은 실제 2차원 관계 데이터에만 사용한다.
- header cell은 `th`와 필요한 scope/association을 제공한다.
- caption 또는 인접 heading으로 table 목적을 설명한다.
- 정렬 가능한 header는 현재 정렬 상태와 action을 모두 전달한다.
- row 전체 click만 제공하지 말고 각 action과 navigation의 semantic target을 둔다.
- 작은 화면에서 table을 card로 바꿀 때 정보 관계와 accessible name이 손실되지 않게 한다.
- loading/empty/error row가 실제 data row와 혼동되지 않도록 table structure와 공용 상태 계약을 따른다.

## 이미지, 미디어와 icon

- 정보 이미지에는 맥락에 맞는 대체 텍스트를 제공한다.
- 장식 이미지는 빈 alt 또는 presentation 처리로 중복 낭독을 피한다.
- 대체 텍스트에 “이미지” 같은 유형을 반복하지 말고 이미지가 전달하는 정보를 설명한다.
- SVG icon이 button/link의 accessible name을 중복하지 않게 한다.
- video/audio는 요구되는 caption, transcript, control과 자동 재생 정책을 확인한다.
- width/height 또는 aspect ratio로 layout shift를 줄인다.

## Dialog, popover와 disclosure

- modal dialog는 제목, 설명, 초기 focus, Tab containment, Escape, 배경 비활성화와 닫힌 뒤 focus 복귀를
  하나의 계약으로 구현한다.
- native `dialog`/popover API 사용 여부는 현재 browser baseline과 기존 공용 overlay component를 먼저 확인한다.
- `hidden`, `inert`, `aria-hidden`의 차이를 이해하고 focus 가능한 자손을 screen reader에서만 숨기지 않는다.
- disclosure trigger는 expanded 상태와 controlled region 관계를 제공한다.
- Tooltip은 핵심 정보나 field label, 오류, 유일한 action 설명을 대신하지 않는다.

## ARIA 적용 규칙

1. 적합한 native element가 있으면 그것을 사용한다.
2. native semantics와 동작을 불필요한 role로 덮지 않는다.
3. role을 추가했다면 해당 widget의 keyboard와 state contract까지 구현한다.
4. `aria-*` 값은 보이는 상태와 항상 일치시킨다.
5. accessible name을 중복하거나 화면 문구와 다르게 만들지 않는다.

`aria-label`은 보이는 text가 없는 경우의 최후 수단에 가깝다. 보이는 label이 있으면 연결을 우선하고,
동적인 status 공지는 사용자 결정에 필요한 변화만 live region으로 전달한다.

## 상태와 focus

- loading은 `aria-busy`만 붙이는 것으로 끝내지 않고 사용할 수 있는 기존 content와 action을 결정한다.
- 오류가 발생해도 focus가 document body로 사라지지 않게 한다.
- route/page 제목 변화와 주요 content 시작점을 screen reader/keyboard 흐름에 맞게 처리한다.
- 삭제·저장 성공 알림은 시각 toast와 접근 가능한 공지를 함께 검토한다.
- skeleton은 실제 control처럼 focus되거나 가짜 값을 낭독하지 않게 한다.
- drag-and-drop 기능은 keyboard와 button 기반 대체 경로를 제공한다.

## 보안과 신뢰 경계

- HTML string 삽입을 피한다. 불가피하면 신뢰 가능한 sanitizer와 allowlist 정책을 사용한다.
- 사용자 URL의 protocol, redirect target과 resource origin을 validation한다.
- `target="_blank"`, iframe sandbox/allow, form target, download filename을 신뢰 경계로 검토한다.
- DOM에 token, secret, 개인 정보를 data attribute나 hidden field로 노출하지 않는다.
- client validation과 HTML constraint validation은 UX이며 server validation을 대체하지 않는다.

## 금지 패턴

- click 가능한 `div`/`span`으로 Button 또는 Link 재구현
- placeholder만 있는 field
- outline 제거 후 대체 focus indicator 미제공
- table을 layout grid로 사용
- heading을 글자 크기로만 선택
- interactive element 중첩
- `disabled`와 `readOnly` 의미 교체
- visible 상태와 다른 `aria-expanded`, `aria-selected`, `aria-checked`
- unsanitized HTML 또는 검증되지 않은 URL 삽입

## 구현 체크리스트

- [ ] native semantic element를 먼저 선택했다.
- [ ] heading과 landmark 계층이 명확하다.
- [ ] 모든 control에 보이는 label과 accessible name이 있다.
- [ ] keyboard만으로 순서대로 조작하고 탈출할 수 있다.
- [ ] focus 시작·오류·닫힘·navigation 후 위치가 정해져 있다.
- [ ] loading/empty/error/disabled/readOnly 상태의 의미가 정확하다.
- [ ] 200% zoom, 긴 문구, screen reader 기준을 확인했다.
- [ ] HTML string, URL, form input의 신뢰 경계를 확인했다.

## 공식 source 기록

- [WHATWG HTML Living Standard](https://html.spec.whatwg.org/)
- [MDN HTML reference](https://developer.mozilla.org/en-US/docs/Web/HTML)

이 링크는 스냅샷의 출처다. 일반 작업 중 다시 열지 않으며 사용자가 업데이트를 요청한 경우에만
`$aifrica-frontend-docs`로 확인한다.
