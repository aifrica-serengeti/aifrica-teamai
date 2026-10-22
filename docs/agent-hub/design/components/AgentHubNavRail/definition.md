# AgentHubNavRail — 구성과 하위 source

`2611:62055`는 이름이 `nav-rail`인 단일 COMPONENT입니다. root props는 비어 있고 variant·route·callback·native SLOT이 없습니다.
수집한 reactions는 비어 있습니다. nested propertySets는 각 인스턴스의 값이며 root의 공개 API가 아닙니다.

```text
nav-rail68
├─ nav-rail-menu: 세로 항목4개·gap8
│  ├─ selected NavItem + home28
│  ├─ enabled NavItem + search28
│  ├─ enabled NavItem + book28
│  └─ enabled NavItem + clock28
└─ 하단 묶음: gap16
   ├─ ghost/default/32 IconButton + 실제20px settings
   └─ avatar FRAME28 + 이름 한 글자 TEXT
```

| 실제 인스턴스 | source·override |
| --- | --- |
| `2611:62033` | selected NavItem `2611:62031`, clock 대신 home `2611:62006`·blue fill |
| `2611:62045` | enabled NavItem `2611:62030`, search `2611:71783` |
| `2611:71759` | enabled NavItem `2611:62030`, book `2611:62005` |
| `2611:62038` | enabled NavItem `2611:62030`, clock `2611:62004` |
| `3065:47988` | IconButton `2427:25106`, ghost/default/32 |
| `I3065:47988;2427:25107` | `3065:48565`, 이름 icon/settings/24·native24 → 실제20px |

NavItem의 source와 nested glyph swap을 구분합니다.52px 항목이 일반 IconButton source라는 뜻은 아닙니다.
settings glyph는 NavIcon4종과 다른 실제 source입니다. 이름24를 보고 표시 크기를24px로 바꾸지 않습니다.
avatar `2611:61963`은 직접 FRAME이고 `2611:61964`의 ‘김’은 샘플 TEXT입니다. 공용 Avatar·계정 Menu 인스턴스나 인증 기능이 아닙니다.

home/search/book/clock·settings의 실제 route/action, 사용자 데이터·권한·계정 메뉴는 제품이 정합니다.
원본에 Search 입력·Picker·Session·Menu·Scrollbar가 있다는 증거로 취급하지 않습니다.
collapsed/mobile·전체 상태·다른 사용자·dark·요청 상태는 미제공입니다.
