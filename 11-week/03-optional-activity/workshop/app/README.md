# Health Track — Mobile app

React Native + Expo (TypeScript). Stack decisions:
[ADR-002 — Framework selection](https://github.com/code-corhuila/healt-track-docs/blob/main/01-architecture/decisions/records/ADR-002-framework-selection.md),
[ADR-001 — State management pattern](https://github.com/code-corhuila/healt-track-docs/blob/main/01-architecture/decisions/records/ADR-001-state-management-pattern.md).

## Scope of this Corte 1

Only **HU6 (Login)**, **HU7 (Student list)**, and **HU5 (Create student)** are built —
matching the backend's scope for this cut. Tapping a student card is wired to nothing yet
(see the `SCOPE NOTE` comment in `StudentListScreen.tsx`) — it becomes real navigation once
`StudentDetail` is built for the attendance corte.

## Setup

1. `npm install`
2. Copy `.env.example` to `.env` and set `EXPO_PUBLIC_API_URL` to your running backend.
   **If testing on a physical phone with Expo Go, `localhost` means the phone itself** — use
   your computer's local network IP instead (e.g. `http://192.168.1.50:3000`). Your phone and
   computer must be on the same Wi-Fi network.
3. Make sure the backend is running (see the `Backend` repo's README) and you've already run
   `npm run seed:trainer` there.
4. `npx expo start` — scan the QR code with Expo Go (Android) or the Camera app (iOS).

## What's implemented

| Screen | HU | Spec |
|--------|----|----|
| Login | HU6 | [`docs/01-architecture/screens/login.md`](https://github.com/code-corhuila/healt-track-docs/blob/main/01-architecture/screens/login.md) |
| Student list (+ "add student" modal) | HU7, HU5 | [`docs/01-architecture/screens/student-list.md`](https://github.com/code-corhuila/healt-track-docs/blob/main/01-architecture/screens/student-list.md) |

## Project structure

Mirrors [`docs/01-architecture/project-structure.md`](https://github.com/code-corhuila/healt-track-docs/blob/main/01-architecture/project-structure.md)
exactly: `core/` (di, network, storage, theme, navigation), `features/auth/` and
`features/students/` each with `presentation/` `domain/` `data/`, `shared/` for reusable UI.

`features/attendance/` doesn't exist yet — it's built when HU1/HU2/HU3 (check-in/check-out)
are tackled in the next corte.