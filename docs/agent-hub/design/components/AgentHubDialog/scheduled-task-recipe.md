# AgentHubDialog — 예약 작업 편집 recipe

실측 source는 FRAME `3192:27853`입니다. 원래 노드 이름은 `Dialog / 리소스 디렉터리`지만 보이는 제목은 ‘예약된 작업 편집’입니다.
다음은 이 화면의 조합 근거와 **제품 구현 제안**입니다. 새 예약 API·Header API나 확정된 validation 정책이 아닙니다.

## 1. 원본 배치를 보존합니다

```text
root580×554 / r16 / #F6F7F9 / Overlay / 실제 선 없음
├─ header580×72: 제목24/32 + legacy 닫기32/r4/glyph24
├─ body580×394
│  └─ content px24 / width532 / gap24
│     ├─ 이름64 = label20 + gap4 + input40
│     ├─ 지침164 = label20 + gap4 + textarea140
│     ├─ 빈도74 = label20 + gap4 + card50
│     └─ 고급20
└─ footer580×88 / p24 / gap8 / 우측: 취소60×40 + 저장하기88×40(disabled)
```

본문의 이름 y0·지침 y88·빈도 y276·고급 y374는 content 기준입니다.
입력과 지침의 r8·선·글꼴은 이 legacy 조합의 실측입니다. 공용 Input·Textarea의 r4·높이를 중복 강제하지 않습니다.
지침 본문은14/20 regular·#1C1C1C이며 샘플 문장은 실제 입력값 표본입니다.

textarea 안 toolbar는 x0/y103·532×37, 위 #EEE1px 선을 layout에 포함합니다.
세 ghost28 Button은 source `3116:14`, font12/16·600, 실제 leading/trailing glyph16이 보입니다.
에이전트98·프로젝트98·채팅77과 모델 FRAME120은 샘플 폭이며 label·모델은 제품 데이터로 공급합니다.
모델 FRAME의 Qwen3.8·logo20·chevron16을 고정 모델 목록이나 API로 만들지 않습니다.

빈도 card는 p12·r12·#DDD1px layout 포함으로 높이50이고 내부 row는 x13/y13·506×24입니다.
‘매시간’ ghost24는14/20 regular입니다. 숨겨진 두 번째 시간 행과 오전9:00을 표시하지 않습니다.
고급의 up16만 보고 추가 내용을 만들거나 펼침 상태를 확정하지 않습니다.

## 2. form owner와 연결합니다

```ts
// 제품 제안이며 Figma 공개 속성이 아닙니다.
type ScheduledTaskDraft = {
  name: string;
  instruction: string;
  frequencyId: string;
  modelId: string;
};
type ScheduledTaskEditorProps = {
  draft: ScheduledTaskDraft;
  onDraftChange: (draft: ScheduledTaskDraft) => void;
  canSubmit: boolean;
  pending: boolean;
  onSubmit: () => void;
  onCancel: () => void;
};
```

이름과 지침의 value/onChange·label·required·오류를 기존 form에 연결합니다.
기존 form이 있으면 새 form을 중첩하지 않고 저장 type=submit의 form 연결 또는 한 owner의 requestSubmit()을 사용합니다.
요청은 onSubmit 한 곳에서 유효성과 pending guard를 확인한 뒤 한 번만 실행합니다.
버튼 onClick에도 같은 저장 요청을 등록하지 않습니다. 취소는 type=button과 하나의 취소 경로를 사용합니다.
실제 disabled 저장 표본을 재현하되 canSubmit·pending은 제안 API이며 원본 비활성 이유와 등치하지 않습니다.

모델·agent/project/chat 연결 context·고급 데이터가 필요하면 제품이 별도 입력과 선택 UI를 정합니다.
위 간단한 draft 타입이 모든 도메인 설정을 표현한다고 가정하지 않습니다.
샘플 지침과 빈도 사이에 예약 실행 시각·timezone·cron을 자동 생성하지 않습니다.
실패해도 작성 중 지침·선택값을 보존하고 오류·focus·닫힘 정책은 제품 owner가 관리합니다.

## 3. textarea와 toolbar를 조합합니다

```text
label[for=실제 textarea id] + required 의미
└─ 지침 영역
   ├─ native textarea: controlled value/onChange, IME·선택/복사
   └─ toolbar: 세 개의 단일 native action + 제품이 채택한 모델 선택
```

textarea 위에 텍스트 div를 얹어 실제 입력을 흉내 내지 않습니다.
140px 안에서 toolbar가 본문과 겹치지 않게 읽기·입력 영역의 하단 공간을 확보하고,
긴 지침·줄바꿈·입력 커서·모바일 키보드를 제품에서 검증합니다. native scroll과 toolbar를 분리한 배치는 구현 제안입니다.
그림으로 숨겨진 inner scrollbar·resize를 보이는 기능으로 추가하지 않습니다.
빈 count wrapper31×20은 원본 근거로만 남기고 숨겨진0/100을 실제 검증 규칙으로 사용하지 않습니다.

현재 사용자 채택은 [AgentHubTextarea](../AgentHubTextarea/styles.md)의 연속 외곽 경계를 사용합니다.
toolbar 불투명 배경 뒤에 부모 inset shadow만 그리지 않고, 자식 위의 pointer-events 없는 장식층으로
전체140px/r8에 default1px #DDD·입력 focus2px #3B82F6·invalid 경계를 표시합니다.
입력 focus 전후103/37 높이와 주변 좌표는 고정하며 toolbar 위 #EEE1px divider는 그대로 유지합니다.
read-only focus는 기본1px 경계이고 toolbar button은 독립 focus-visible을 유지합니다.

빈도 popup은 원본에서 미제공입니다. 현재 [AgentHubSelect](../AgentHubSelect/styles.md)는 사용자 요청에 따라
AgentHubMenu 패널 r12/#DDD1px/white/py4px0/Mid와 MenuItem content28px/pL16R12Y4를 재사용합니다.
선택값·keyboard·combobox/listbox/option 의미는 기존 단일 Select 엔진이 소유하고 명령 menu로 바꾸지 않습니다.
hover #F8F8F8·pressed #F4F4F4의200ms 전환, popup150ms fade/slide6px과 AgentHubScrollbar를 연결합니다.
16px check로 현재 선택을 표시하는 것은 제품 채택이며 빈도 popup이나 selected palette의 Figma 실측이 아닙니다.
기존 공용 r4/32px option·파란 selected 면을 이 예약 adapter에 그대로 복사하지 않습니다.

footer는 [AgentHubDialogFooter](../AgentHubDialogFooter/implementation.md)의40px Button 배치를 참고합니다.
기존 Dialog가 p24를 소유하면 두 action만 넘겨 이중 padding을 피합니다. 이 화면의 footer FRAME을 실제 footer COMPONENT 인스턴스로 기록하지 않습니다.
취소60/저장88 폭은 한글 샘플의 HUG 결과이며 긴 번역을 잘라서 맞추지 않습니다.

## 4. 스크롤과 미제공 범위를 구분합니다

body의 legacy scrollbar source `2019:3708`는11×180, thumb4×160·r8·x3/y3입니다.
이를 AgentHubScrollbar r9999와 같은 source라고 주장하지 않습니다. 실제 thumb는 viewport/content 비율로 계산합니다.
root/header/body의 overflow NONE과 clipping은 기능 proof가 아니며, 가용 높이가 줄면 실제 viewport에서 마지막 입력과 footer에 접근할 수 있어야 합니다.
숨겨진 help text·info·시간 행·body fade는 렌더하지 않습니다.
validation·dirty·pending·실패·저장 성공·dismiss 확인·dark·mobile는 제품 추가 요구와 근거를 확인해 채택합니다.
