# AgentHubTextarea — 검증

toolbar의 배경 #F4F4F4·padding4px 8px·위 #EEE1px는 Textarea가 소유해야 합니다.
예약 Dialog의 조상 class나 override가 없는 단독 조합에서도 같은 스타일과 연속 외곽선을 확인합니다.

140px 안 본문103/toolbar37, label gap4·radius8, IME Enter·선택/복사, toolbar keyboard/pointer 차단을 확인합니다.
입력 focus는 surface 한 곳, toolbar/button focus는 독립적으로 보이며 textarea resize가 조합 높이를 바꾸지 않아야 합니다.

default·입력 focus·invalid·invalid+focus·read-only에서 toolbar 양옆과 아래 r8까지 외곽선이 끊기지 않는지 확인합니다.
불투명한 toolbar 배경이 부모 inset shadow를 덮는 방식으로 회귀하지 않아야 합니다.
입력 focus 전후 표면140·본문103·toolbar37과 주변 좌표는 같아야 하며 toolbar 위 #EEE1px divider는 유지합니다.
입력은 내부 사각형 ring 없이 외곽2px 한 곳만, toolbar 버튼을 Tab으로 방문할 때는 버튼별 focus가 표시되어야 합니다.
read-only focus는 기본1px 경계, disabled는 focus·키보드·pointer 조작 차단을 확인합니다.

실제 source/export·직접 의존성·부모 상태 소유권을 확인하고 소비 mapping에만 기록합니다.
reduced-motion과 빠른 조작에서 지연된 상태 복원이나 남은 listener가 없어야 합니다.
