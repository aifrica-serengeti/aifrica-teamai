# Slider — 접근성

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Slider 문서 인덱스](./README.md)

## 10. 접근성

| 항목                  | 구현                                                                                                      |
| --------------------- | --------------------------------------------------------------------------------------------------------- |
| **키보드**            | Tab 으로 Thumb focus 이동. ←/→ 1 step, Home/End 최소/최대. Radix Slider 기본 지원                         |
| **Focus 표시**        | Thumb 주변 2px primary outline(offset 2px). `:focus-visible`                                              |
| **ARIA**              | Radix 가 `role="slider"`, `aria-valuenow`, `aria-valuemin`, `aria-valuemax`, `aria-orientation` 자동 설정 |
| **Disabled**          | `aria-disabled` + `pointer-events` 차단. Tab focus 불가                                                   |
| **Slider label**      | 각 Thumb에 `aria-label`을 부여. Range는 `"{label} 최솟값"` / `"{label} 최댓값"`으로 구분                  |
| **Input 라벨**        | `aria-label="슬라이더 값"`(단일) / `"최솟값"`, `"최댓값"`(Range)                                          |
| **Help / Error text** | Thumb에 `aria-describedby`로 연결. Error에는 `role="alert"` 적용                                          |
| **Tooltip**           | 값 변경 시 Thumb 위에 시각적 피드백. 스크린 리더는 ARIA 값으로 이미 인지                                  |
| **Info 아이콘**       | `aria-hidden`(장식용). `infoIcon` prop이 true일 때만 표시                                                 |
| **히트 영역**         | Thumb 16px + Radix 포인터 캡처로 드래그 정확도 확보                                                       |

---


## 문구 없는 오류 상태

`invalid=true` 또는 `errorText`가 있으면 입력과 Slider root에 `aria-invalid=true`를 전달한다. 문구가 없으면 빈 alert나 설명 ID를 생성하지 않는다.


## 사용자 지정 표시 눈금

숫자 눈금은 장식 정보로 `aria-hidden=true` 처리한다. Thumb의 실제 값·이동 단위·ARIA는 바뀌지 않는다. `128+` 등 별도 의미가 있는 끝값은 `helpText`로도 설명한다.

## 보조 문구 배치

`helpTextPlacement`는 `below`(기본값) 또는 `label-end`를 받는다. `label-end`는 라벨 줄의 오른쪽에 기존 보조 문구를 표시한다. 라벨이 없으면 하단 표시를 유지하며 오류는 항상 하단에 표시한다. 배치와 관계없이 보조 문구는 하나만 렌더하고 thumb의 `aria-describedby` 연결을 유지한다. 페이지는 Slider 내부 태그를 선택하는 CSS 대신 이 옵션을 사용한다.
