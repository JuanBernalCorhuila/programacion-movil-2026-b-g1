import { StyleSheet, Text, TextInput, TextInputProps, View } from "react-native";
import { theme } from "../core/theme/theme";

type Props = TextInputProps & {
  label: string;
  /** Message shown right under the field; also read by screen readers when it appears. */
  error?: string | null;
};

export function TextField({ label, error, style, ...inputProps }: Props) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        accessibilityLabel={label}
        aria-invalid={Boolean(error)}
        placeholderTextColor={theme.color.textMuted}
        style={[styles.input, error ? styles.inputError : null, style]}
        {...inputProps}
      />
      {error ? (
        <Text style={styles.error} accessibilityLiveRegion="polite">
          {error}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { marginBottom: theme.space.md },
  label: { ...theme.text.caption, color: theme.color.textMuted, marginBottom: theme.space.xs },
  input: {
    minHeight: 48, // touch target
    borderWidth: 1,
    borderColor: theme.color.border,
    borderRadius: theme.radius.md,
    paddingHorizontal: theme.space.md,
    ...theme.text.body,
    color: theme.color.text,
    backgroundColor: theme.color.surface,
  },
  inputError: { borderColor: theme.color.error, borderWidth: 2 },
  error: { ...theme.text.caption, color: theme.color.error, marginTop: theme.space.xs },
});
