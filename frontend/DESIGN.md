# frontend DESIGN.md

이 문서는 `frontend` 전역에 적용되는 AI-first 운영 프로토콜이다. 목적은 기존 공유 UI를 먼저 찾고 일관되게 재사용하도록 강제하는 것이며, 광범위한 design-system specification을 정의하는 문서가 아니다.

## Purpose / Scope / Priority

- Scope: all of `frontend`
- Audience: AI/agent-first contributors
- Priority: shared UI reuse before new shared abstraction

## Mandatory Rules

- MUST shared UI 변경 전에 이 문서를 먼저 따른다.
- MUST `frontend/components/**`를 shared UI hub로 간주하고, 재사용 후보를 여기서 먼저 찾는다.
- MUST role-first canonical surface(`controls`, `display`, `overlay`, `navigation`, `layout`, `typography`)를 shared UI의 유일한 canonical path로 간주하고, root `@/components`는 convenience aggregator로 사용한다.
- MUST `@/components/Button`, `@/components/Menu`, `@/components/Screen` 같은 남아 있는 flat family entrypoint는 compatibility-only로 취급하며, 새 import에는 사용하지 않는다.
- MUST screen-local concern, route composition, screen-only layout은 `frontend/app/**`에 로컬로 둔다.
- MUST `frontend/app/**`의 screen-local component는 체크리스트 근거 없이는 shared로 승격하지 않는다.
- MUST shared UI styling 시 검증된 공용 소스와 기존 shared component 조합을 우선 사용하고, ad-hoc style 추가를 마지막 수단으로 남긴다.

## Forbidden Anti-Patterns

- DO NOT 문서화되지 않은 shared component, variant, token system, API를 지어내지 않는다.
- DO NOT `frontend/app/**`의 로컬 UI를 "언젠가 재사용될 것 같다"는 이유만으로 shared로 올리지 않는다.
- DO NOT 체크리스트 정당화 없이 screen-local component를 `frontend/components/**`로 이동하지 않는다.
- DO NOT 기존 shared component를 우회하는 ad-hoc style, ad-hoc duplication, route별 재구현을 추가하지 않는다.
- DO NOT 필요 이상으로 새 shared component를 만들지 않는다. 한 화면 전용이면 local이 기본이다.

## Component Discovery Flow

- Required flow: `search → reuse → compose → extend → justify → create`
- MUST 모든 UI 작업에서 `search → reuse → compose → extend → justify → create` 순서를 유지한다.
- MUST 먼저 `frontend/components/**`의 shared surface를 검색하고, 있으면 reuse한다.
- MUST 한 화면 전용 요구사항은 `frontend/app/**`에서 local composition으로 해결한다.
- MUST local로 해결 가능한 경우 shared component를 새로 만들지 않는다.
- MUST shared 승격은 복수 화면 재사용 필요와 체크리스트 근거가 있을 때만 justify 후 진행한다.

## Component Map

- 이 맵은 **major shared components only**를 다루는 공개 표면 안내이며, 전체 internal inventory가 아니다.
- canonical path는 아래 role-first folders이고, flat family entrypoint는 기존 consumer 호환을 위한 compatibility surface일 뿐 새 canonical import 경로가 아니다.

| 범주 | canonical path | 대표 group | 언제 먼저 볼지 |
| --- | --- | --- | --- |
| Controls | `frontend/components/controls/**` | `Button`, `Checkbox`, `FilterChip`, `Toggle` | 입력, 토글, 선택 control이 필요하면 여기서 먼저 찾는다. |
| Display | `frontend/components/display/**` | `StatusBadge` | 상품/상태 badge처럼 display-only status 표현이 필요하면 여기서 먼저 찾는다. |
| Overlays / menus | `frontend/components/overlay/**` | `Menu`, `Modal` | 레이어, 액션 메뉴, 확인/닫기 흐름이 필요하면 여기서 먼저 찾는다. |
| Navigation | `frontend/components/navigation/**` | `Nav` | 탭, 상단/하단 이동, 공용 내비게이션 뼈대가 필요하면 여기서 먼저 찾는다. |
| Screens / layout shells | `frontend/components/layout/**` | `Screen` | route-oriented shared screen families(`HomeScreen`, `LoginScreen`, `ProfileScreen`, `SettingScreen` 등)와 그 support export가 필요하면 여기서 먼저 찾는다. |
| Typography / text | `frontend/components/typography/**` | `Text` | 공용 텍스트 표현, typography wrapper, 문구 스타일 통일이 필요하면 여기서 먼저 찾는다. |

## New Shared Component Checklist

- 새 shared component를 만들기 전에 아래 gate를 **모두** 통과해야 한다.
- [ ] `frontend/components/**`에서 유사한 shared component를 먼저 검색했다. 예: 버튼형 CTA가 필요하면 새 `PrimaryAction`을 만들기 전에 `Button` group부터 확인한다.
- [ ] 기존 shared component **composition**만으로 해결되지 않는다. 예: `Screen` + `Text` + `Button` 조합으로 충분하면 새 wrapper를 만들지 않는다.
- [ ] 기존 shared component의 **variant/prop 확장**만으로도 해결되지 않는다. 예: 기존 `FilterChip` 또는 `StatusBadge` 변형으로 끝나는 요구사항이면 새 shared family를 만들지 않는다.
- [ ] 한 화면에서 잠깐 쓰는 임시 UI가 아니다. 예: `frontend/app/settings/**` 한 곳 전용 안내 박스면 local component가 기본이다.
- [ ] 반복 재사용 가치가 충분히 높다.
- [ ] 이름이 역할 기반이며 기존 공개 shared 이름과 충돌하지 않는다. `Chip` 같은 umbrella family 대신 `FilterChip`, `StatusBadge`처럼 역할이 바로 드러나는 이름을 우선한다.
- [ ] `frontend/assets/style.ts`, `frontend/constants/ui.ts`, `frontend/hooks/style.ts`, 기존 shared pattern으로 구현 근거를 설명할 수 있다.
- [ ] 새 shared component를 추가하면 이 문서의 Component Map도 함께 갱신할 계획이 있다.

## Maintenance Rules

- 아래 **material shared change**가 발생하면 `frontend/DESIGN.md`를 같은 변경에서 함께 업데이트해야 한다.
- material shared change는 다음을 뜻한다.
- public shared component가 추가된다.
- public shared component가 삭제된다.
- public shared component 이름이 공개 export surface에서 변경된다.
- public shared component의 public prop이 추가/삭제/이름 변경되거나 호출 방식이 달라진다.
- public shared component의 variant 선택지가 추가/삭제/이름 변경된다.
- Component Map의 category 또는 grouping이 바뀐다.
- 검증된 style source인 `frontend/assets/style.ts`, `frontend/constants/ui.ts`, `frontend/hooks/style.ts`의 shared 사용 기준이 바뀐다.
- 반대로 screen-local UI 수정, route 내부 데이터 변경, 한 화면 전용 레이아웃 변경만 있으면 이 문서 업데이트 대상이 아니다.

## Bad / Good Examples

- Bad: `Button` 조합이나 variant 확장으로 충분한데 `SubmitButton`, `ConfirmButton`, `SaveButton` 같은 새 shared component를 계속 만든다.
- Good: 먼저 기존 shared를 재사용하고, 정말 필요할 때만 기존 component의 variant/prop 확장으로 해결한다.

- Bad: `colors`, UI constants, style helper를 두고도 route나 shared component마다 spacing/color/border 값을 ad-hoc으로 다시 적는다.
- Good: `frontend/assets/style.ts`, `frontend/constants/ui.ts`, `frontend/hooks/style.ts`, 기존 shared style pattern을 먼저 재사용하고 ad-hoc styling은 마지막 수단으로 남긴다.

- Bad: shared component의 공개 이름/prop/variant를 바꿨는데 `frontend/DESIGN.md`의 checklist, map, maintenance 기준은 그대로 둔다.
- Good: shared public surface를 바꾸는 same change에서 `frontend/DESIGN.md`도 함께 갱신해 map과 운영 규칙을 현재 상태에 맞춘다.
