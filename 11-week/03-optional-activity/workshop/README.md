# Week 11 workshop — UX/UI on advanced screens (Health Track)

Individual workshop for Programación Móvil 2026-B, Corte 3. I apply the week 11 topics
(visual hierarchy, navigation pattern, design tokens, screen states, feedback,
accessibility and responsive layout) to the mobile app of my team, **Health Track**: an app
for gym trainers to register their students and track their attendance.

<!-- CONFIG-START -->
- FULL_NAME: Juan Camilo Bernal Gordillo
- GITHUB_USER: JuanBernalCorhuila
- TEAM: Health Track
- DOCS_REPO: https://github.com/code-corhuila/healt-track-docs
- CODE_REPO: https://github.com/code-corhuila/h-tracker
- BASELINE: team app — `05-release/mvp/mobile` (v1.0.0) from healt-track-docs, commit `3ff10d1`
- REFLECTION_DOC: https://docs.google.com/document/d/1mxMIvFMSMRHBAon2FePWupvnZAurDntKeKw27OFu0jQ/edit?usp=sharing
- MY_SCREENS: (filled in CP1)
<!-- CONFIG-END -->

## Baseline

`app/` is an unchanged copy of the team's mobile app as released in v1.0.0 (Corte 1):
React Native + Expo (TypeScript), React Navigation native stack, plain `StyleSheet` with
tokens in `src/core/theme/theme.ts`. It has two screens built: Login (HU6) and Student list
(HU7) with the "Add student" modal (HU5).

The team app runs, so the course starter was not needed. The guide's examples use Ionic;
the equivalents used here are React Navigation instead of IonTabs/IonRouterOutlet,
`RefreshControl` instead of IonRefresher, and Jest + React Native Testing Library instead of
Vitest (Vitest does not run React Native components without extra setup).

## How to run

1. Start the team backend (`h-tracker/backend`): `npm run dev`, with the trainer already
   seeded (`npm run seed:trainer`).
2. In `app/`: `npm install`, copy `.env.example` to `.env` and set `EXPO_PUBLIC_API_URL`.
3. `npm run web` to open it in the browser, or `npx expo start` to open it with Expo Go.

## Deliverables

| Checkpoint | File |
|------------|------|
| CP1 — UX audit | [`docs/01-ux-audit.md`](docs/01-ux-audit.md) |
| CP2 — Navigation and design tokens | [`docs/02-design-tokens.md`](docs/02-design-tokens.md) |
| CP3 — List screen states | [`docs/03-states.md`](docs/03-states.md) |
| CP4 — Accessibility and responsive | [`docs/04-a11y-responsive.md`](docs/04-a11y-responsive.md) |
