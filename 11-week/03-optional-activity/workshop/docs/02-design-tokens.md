# CP2 — Navigation pattern and design tokens

## Navigation pattern: stack

Health Track keeps the **native stack** (React Navigation) that the team already uses, and
moves every authenticated screen to the same native header.

Why a stack and not tabs or a side menu:

- The trainer has **one main section**: the list of their students. Tabs are meant for 3 to
  5 sections at the same level, and the app does not have them.
- Everything else hangs from one student: `StudentDetail`, `AttendanceForm` and
  `AttendanceHistory` all receive a `studentId` (see the route registry in
  [`navigation.md`](https://github.com/code-corhuila/healt-track-docs/blob/main/01-architecture/navigation.md)).
  That is a drill-down flow, list → student → action, which is what a stack is for.
- The most frequent task is "find the student and register their attendance". With a stack
  the trainer always goes forward from the list and comes back with the header back button
  or the Android back gesture.

What changed in `app/`:

| Before | After |
|--------|-------|
| `headerShown: false` for all routes; `StudentListScreen` drew its own header | Login keeps no header; `StudentList` uses the native stack header with the title "Estudiantes" |
| "+" and "⎋" side by side at the top right | "+" (primary action) on the right, "Cerrar sesión" as text on the left, so they cannot be confused |
| Header colors set inside the screen | Header colors come from the tokens in `screenOptions`, so `StudentDetail` and the attendance screens get the same header for free |

## Design tokens

All tokens live in `app/src/core/theme/theme.ts`. Added in this checkpoint: `secondary`,
`success`, `successContainer`, `errorContainer`, `borderStrong` and the `subtitle` text style.

| Group | Token | Value | Use |
|-------|-------|-------|-----|
| Color | `primary` | `#2E7D32` | Main buttons, "+" action, header tint |
| Color | `onPrimary` | `#FFFFFF` | Text on primary buttons |
| Color | `secondary` | `#37474F` | Secondary header action ("Cerrar sesión") |
| Color | `success` / `successContainer` | `#1B5E20` / `#E8F5E9` | "Estudiante registrado" message |
| Color | `error` / `errorContainer` | `#B00020` / `#FDECEA` | Error messages and error state |
| Color | `background` / `surface` | `#F5F5F5` / `#FFFFFF` | Screen background / cards, header, modal |
| Color | `text` / `textMuted` | `#1A1A1A` / `#6B6B6B` | Main text / labels and captions |
| Color | `border` / `borderStrong` | `#E0E0E0` / `#8A8A8A` | Skeleton blocks / card edges and disabled controls |
| Text | `title` | 22 / 700 | Login title |
| Text | `subtitle` | 18 / 600 | Header title |
| Text | `body` | 16 / 400 | Card names, buttons, messages |
| Text | `caption` | 13 / 400 | Field labels, banner, document number |
| Spacing | `xs` `sm` `md` `lg` `xl` | 4 · 8 · 16 · 24 · 32 | Paddings, gaps and margins |
| Radius | `sm` `md` `pill` | 4 · 8 · 999 | Inputs, cards, round icon buttons |

## Contrast

Checked with the [WebAIM contrast checker](https://webaim.org/resources/contrastchecker/).
Text needs at least **4.5:1**; card edges and control borders (non-text) need **3:1**.

| Foreground | Background | Where | Ratio | Result |
|------------|------------|-------|-------|--------|
| `text` `#1A1A1A` | `background` `#F5F5F5` | Messages on the list screen | 15.96:1 | Pass |
| `text` `#1A1A1A` | `surface` `#FFFFFF` | Student name on the card, header title | 17.40:1 | Pass |
| `textMuted` `#6B6B6B` | `surface` `#FFFFFF` | Field labels in the modal | 5.33:1 | Pass |
| `textMuted` `#6B6B6B` | `background` `#F5F5F5` | Empty and error messages | 4.89:1 | Pass |
| `onPrimary` `#FFFFFF` | `primary` `#2E7D32` | "Guardar", "Reintentar" | 5.13:1 | Pass |
| `primary` `#2E7D32` | `surface` `#FFFFFF` | "+" in the header, "Cancelar" | 5.13:1 | Pass |
| `secondary` `#37474F` | `surface` `#FFFFFF` | "Cerrar sesión" in the header | 9.65:1 | Pass |
| `success` `#1B5E20` | `successContainer` `#E8F5E9` | Success message | 7.00:1 | Pass |
| `error` `#B00020` | `surface` `#FFFFFF` | Inline error in the modal | 7.33:1 | Pass |
| `error` `#B00020` | `errorContainer` `#FDECEA` | Error state | 6.41:1 | Pass |
| `text` `#1A1A1A` | `border` `#E0E0E0` | Offline banner | 13.18:1 | Pass |
| `border` `#E0E0E0` | `background` `#F5F5F5` | Card edge (before) | 1.21:1 | **Fail** (non-text) |
| `borderStrong` `#8A8A8A` | `background` `#F5F5F5` | Card edge (after) | 3.17:1 | Pass (non-text) |
