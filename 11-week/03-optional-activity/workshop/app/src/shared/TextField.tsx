import { StyleSheet, Text, TextInput, TextInputProps, View } from "react-native";
import { theme } from "../core/theme/theme";

type Props = TextInputProps & {
  label: string;
};

export function TextField({ label, style, ...inputProps }: Props) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        accessibilityLabel={label}
        placeholderTextColor={theme.color.textMuted}
        style={[styles.input, style]}
        {...inputProps}
      />
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
});
