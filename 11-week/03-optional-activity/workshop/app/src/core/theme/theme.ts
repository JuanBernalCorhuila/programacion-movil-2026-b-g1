// Flat design tokens — see docs/02-code-and-ui/design-system.md.
// Plain object, no theming library. Light mode only for the MVP: no dark palette, no
// theme-switching logic.

export const theme = {
  color: {
    primary: "#2E7D32",
    onPrimary: "#FFFFFF",
    surface: "#FFFFFF",
    background: "#F5F5F5",
    text: "#1A1A1A",
    textMuted: "#6B6B6B",
    error: "#B00020",
    border: "#E0E0E0",
  },
  space: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  radius: {
    sm: 4,
    md: 8,
    pill: 999,
  },
  text: {
    title: { fontSize: 22, fontWeight: "700" as const },
    body: { fontSize: 16, fontWeight: "400" as const },
    caption: { fontSize: 13, fontWeight: "400" as const },
  },
};
