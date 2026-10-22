# 외부에서 채운 입력과 메시지 본문의 공용 reveal

이번 사용자 요청으로 예시·AI가 공급한 문구에는 **왼쪽에서 오른쪽으로 부드럽게 나타나는 시각 효과**를 채택합니다.
Figma의 정적 레이아웃·글자 수치를 바꾸는 계약이 아니며, 아래400ms와 mask 수치는 **신규 모션 제안값**입니다.
Composer와 UserMessage의 각 구현에 타자 타이머를 복제하지 않고 동일한 TextReveal 계층을 재사용합니다.

## 값과 시각 효과를 나눕니다

- 예시를 선택하면 부모가 원문 전체를 controlled value에 한 번에 반영합니다.400ms 동안 값을 한 글자씩 추가하지 않습니다.
- 검증·전송·복사·선택·접근성 트리에는 처음부터 완전한 본문이 존재합니다. 애니메이션 종료로 요청·값·완료 상태를 갱신하지 않습니다.
- 변화는 글자 위의 mask에만 적용합니다. 글자·caret의 좌표, 본문 폭·행 높이, metadata·버튼·bubble은 이동하지 않습니다.
- 제안 recipe는 mask-size250%×100%, gradient의0–40% 불투명 검정·60–100% 투명,
  mask-position100%→0%를400ms ease-out으로 한 번 전환합니다. 경계의20% 구간이 부드러운 fade를 만듭니다.
  mask 마지막 프레임을 영구 보관하지 않고 종료 시 제거해 정적 본문으로 복귀합니다.
  넓은 textarea의 짧은 문구는 비어 있는 편집기 전체 폭 대신 실제 font로 측정한 문구 폭을 기준으로 같은 비율을 적용합니다.
  mask 폭은 문구 폭의2.5배, 시작 offset은−1.5배입니다. 긴 문구·줄바꿈은 실제 viewport 폭 안으로 제한합니다.

## Composer: 외부 주입을 명시합니다

`externalTextRevision?: string | number` 같은 **외부 주입 식별자**를 입력값과 함께 전달합니다.
예시 선택·AI가 초안을 대체하는 명령·명시한 편집 복원에서만 식별자를 바꿉니다. 같은 문자열을 다시 채우는 경우도 새 식별자로 재생할 수 있습니다.
일반 onChange·붙여넣기·사용자의 직접 타이핑·IME 조합에서는 식별자를 바꾸지 않습니다.

native textarea에 원문 value를 바로 전달하고, 그 control의 glyph만 mask로 드러냅니다.
텍스트 복제 overlay·가짜 textarea·추가 focus ring·숨긴 두 번째 접근성 입력을 만들지 않습니다.
pointer 조작·keydown·onChange·compositionstart가 시작되면 진행 중인 효과를 즉시 취소해 caret·선택·조합을 그대로 표시합니다.
외부 value가 바뀌었지만 식별자가 그대로인 경우에도 이전 효과를 취소합니다.

## 본문: 새 메시지와 새 청크를 구분합니다

UserMessage는 `textMotion?: "static" | "reveal"`와 `textRevision?: string | number` 같은 adapter를 제공합니다.
기존 과거 메시지는 기본 static으로 표시하고, 이번 삽입을 연출할 때만 reveal을 선택합니다.
message id와 발화자·예약·agent 의미는 그대로 유지합니다. AI가 사용자 초안을 채웠다는 이유로 UserMessage를 assistant 역할로 바꾸지 않습니다.
별도 assistant 본문이 있는 제품도 동일한 TextReveal을 **본문 표시 계층**에 연결하며 renderer·요청·stream 소유권을 옮기지 않습니다.

- 새 본문·식별자 변경은 전체 새 본문에 한 번 적용합니다. 빠른 대체·단축·초기화는 이전 시각 조각과 완료 처리를 취소합니다.
- 같은 메시지에서 식별자 변경 없이 문자열이 기존 본문 뒤에 추가되면, 이미 표시한 prefix는 그대로 두고 **실제 새 청크만** reveal합니다.
  각 청크가 도착한 원문을 즉시 렌더하며 자체 글자별 setInterval·가짜 전송 지연을 만들지 않습니다.
- 이전 청크의 효과가 끝나기 전에 다음 청크가 오더라도 이전 효과를 재시작하지 않습니다.
  완료된 앞부분은 정적 조각으로 합쳐 DOM이 모든 과거 packet 수에 비례해 계속 늘지 않도록 합니다.
- HTML 삽입·Markdown 파싱을 이 효과에 포함하지 않습니다. 평문은 React text node로 보존합니다.
  이미 의미 마크업 renderer가 있다면 링크·선택·복사·표 등의 구조를 유지하는 별도 adapter를 검증합니다.

## 취소·접근성·대안

빠른 재주입·요청 교체·unmount에서는 이전 Animation과 완료 handler를 취소합니다.
reduced-motion·forced-colors가 활성화되면 즉시 mask를 제거하며, print와 mask 미지원에서도 처음부터 완전한 정적 글자를 보여 줍니다.
미디어 조건이 바뀌어도 사라졌던 오래된 문구·callback이 다시 나타나지 않아야 합니다.
장식용 텍스트 복제나 새 live region을 추가하지 않습니다. 본문 안내는 기존 transcript의 한 owner가 담당하고,
AI packet이나 animation 완료마다 전체 문장을 중복 공지하지 않습니다.

## 확인할 시나리오

1. 예시 선택 직후 native textarea.value·전송 payload는 전체 원문이며,0/200/400ms의 시각만 다릅니다.
2. reveal 중 직접 타이핑·한국어 IME·caret 이동·선택·붙여넣기를 시작하면 효과가 즉시 끝나고 native 편집이 유지됩니다.
3. 같은 예시 재선택·다른 예시 빠른 교체·빈 값 초기화에서 이전 본문이 남지 않습니다.
4. AI 본문 주입·청크 추가·다른 본문 교체를 연속 조작해 이전 prefix가 다시 흐려지거나 레이아웃이 밀리지 않는지 확인합니다.
5. 긴 한글·emoji·공백·개행·URL·좁은 폭·확대에서 원문·복사 결과·줄바꿈이 유지되는지 비교합니다.
6. reduced-motion·forced-colors·print·unmount에서 mask·진행 중 animation·중복 접근성 문구가 남지 않는지 확인합니다.

이 문서는 소비 제품의 전체 assistant renderer나 네트워크 streaming 완료를 의미하지 않습니다.
실제 source/export·공개 props·연결 범위는 해당 제품에서 확인한 후 로컬 mapping에 기록합니다.
