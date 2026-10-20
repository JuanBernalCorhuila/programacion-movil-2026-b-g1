import { ActivityIndicator, Pressable, StyleSheet, Text } from "react-native";
import { theme } from "../core/theme/theme";

type Props = {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: "primary" | "text";
};

// Presentation-agnostic, reusable UI only — no business logic here. See
// docs/01-architecture/project-structure.md.
export function Button({ label, onPress, disabled, loading, variant = "primary" }: Props) {
  const isDisabled = disabled || loading;

  return (
    <Pressable
      accessible
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled: isDisabled }}
      onPress={onPress}
      disabled={isDisabled}
      hitSlop={8}
      style={[
        styles.base,
        variant === "primary" ? styles.primary : styles.text,
        isDisabled && styles.disabled,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={variant === "primary" ? theme.color.onPrimary : theme.color.primary} />
      ) : (
        <Text style={variant === "primary" ? styles.primaryLabel : styles.textLabel}>{label}</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: 48, // touch target — see 02-code-and-ui/accessibility.md
    borderRadius: theme.radius.md,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: theme.space.md,
  },
  primary: { backgroundColor: theme.color.primary },
  text: { backgroundColor: "transparent" },
  disabled: { opacity: 0.5 },
  primaryLabel: { color: theme.color.onPrimary, ...theme.text.body, fontWeight: "600" },
  textLabel: { color: theme.color.primary, ...theme.text.body, fontWeight: "600" },
});
