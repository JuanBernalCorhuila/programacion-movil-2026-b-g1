import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { theme } from "../core/theme/theme";

type Props = {
  message: string | null;
  onHide: () => void;
  durationMs?: number;
};

// Short confirmation after an action succeeds (the IonToast of the course examples). Hides
// itself after `durationMs`; screen readers announce it when it appears.
export function Toast({ message, onHide, durationMs = 3000 }: Props) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(onHide, durationMs);
    return () => clearTimeout(timer);
  }, [message, onHide, durationMs]);

  if (!message) return null;

  return (
    <View style={styles.toast} accessibilityRole="alert" accessibilityLiveRegion="polite">
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  toast: {
    position: "absolute",
    left: theme.space.md,
    right: theme.space.md,
    bottom: theme.space.lg,
    maxWidth: theme.layout.maxContentWidth,
    alignSelf: "center",
    backgroundColor: theme.color.successContainer,
    borderColor: theme.color.success,
    borderWidth: 1,
    borderRadius: theme.radius.md,
    padding: theme.space.md,
  },
  text: { ...theme.text.body, color: theme.color.success, textAlign: "center" },
});
