# AgentHubSessionProgressStep — 진행 데이터

단계의 id·순서·label·현재 status·진행 갱신은 SessionPanel과 실제 작업 owner가 관리합니다.
이 부품에 timer·polling·임의 자동 완료·별도의 요청 상태를 만들지 않습니다.
상태 그림을 backend의 성공·실패·완료 보증으로 취급하지 않고 제품의 실제 상태를 명시적으로 매핑합니다.

done은 완료 표시, active는 현재 진행 표시, pending은 대기 표시입니다.
단계 클릭·단계 되돌리기·재시도·취소·이동 명령은 원본에 없습니다. 전용 action으로 채택하려면 새 의미·상태·접근성을 검증합니다.
pending 색상은 대기를 나타내며 disabled 컨트롤이 아닙니다.

connector는 다음 단계와의 시각적 연결선입니다. 마지막 단계에서는 false를 연결하고 wrapper와 선을 함께 제거합니다.
단계를 추가·삭제·재정렬하면 제품의 안정적인 id를 유지하고 실제 마지막 단계에 맞춰 표시를 갱신합니다.
index 문자열3과 부모의 네 단계는 샘플이며 개수 상한·정렬 기준·진행률 계산으로 사용하지 않습니다.

active의 정적 원형에 회전 animation을 자동 추가하지 않습니다. 새 모션이 필요한 제품은 별도 근거와 reduced-motion 정책을 채택합니다.
status 변경마다 개별 live region을 반복 공지하지 않고 필요한 진행 안내는 상위의 한 owner가 조절합니다.

## 명시적으로 채택한 파동

[이번 사용자 요청](../../motion.md)에 따라 active일 때만 장식 halo를 반복합니다. 원본이 Spinner였다는 뜻이 아니며 중심 회전·자동 진행을 추가하지 않습니다.
파란 중심은 계속 표시하고 원본의 정적 하늘색 테두리는 [active 전용 clip](./styles.md)으로 숨깁니다.
하늘색은 파동에서만 나타나며 이전의 전체 active SVG+추가 halo 조합을 사용하지 않습니다.
status가 done/pending으로 바뀌거나 unmount되면 halo도 제거합니다. 새 timer·polling·percent·단계 실행 callback은 만들지 않습니다.

반복 경계의 끊김을 없애기 위해 halo는 투명 상태에서 시작하고, 주기의22%까지 서서히 나타난 뒤 퍼지며 투명하게 사라집니다.
0%와100% 모두 opacity0이므로 scale이 처음으로 돌아갈 때 보이는 하늘색 ring을 갑자기 생성하지 않습니다.
22%와scale1.08·1600ms는 신규 제안값이며 중심점·실제 단계 전환은 애니메이션이 소유하지 않습니다.
