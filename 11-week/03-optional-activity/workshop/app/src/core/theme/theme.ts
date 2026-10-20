// Flat design tokens — see docs/02-code-and-ui/design-system.md.
// Plain object, no theming library. Light mode only for the MVP: no dark palette, no
// theme-switching logic.

export const theme = {
  color: {
    primary: "#2E7D32",
    onPrimary: "#FFFFFF",
    secondary: "#37474F",
    success: "#1B5E20",
    successContainer: "#E8F5E9",
    surface: "#FFFFFF",
    background: "#F5F5F5",
    text: "#1A1A1A",
    textMuted: "#6B6B6B",
    error: "#B00020",
    errorContainer: "#FDECEA",
    border: "#E0E0E0",
    // Card edges and disabled controls: keeps 3:1 against background (non-text contrast).
    borderStrong: "#8A8A8A",
  },
  space: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  layout: {
    // Content stops growing past this width so lines stay readable on tablets (768 px+).
    maxContentWidth: 640,
  },
  radius: {
    sm: 4,
    md: 8,
    pill: 999,
  },
  text: {
    title: { fontSize: 22, fontWeight: "700" as const },
    subtitle: { fontSize: 18, fontWeight: "600" as const },
    body: { fontSize: 16, fontWeight: "400" as const },
    caption: { fontSize: 13, fontWeight: "400" as const },
  },
};
