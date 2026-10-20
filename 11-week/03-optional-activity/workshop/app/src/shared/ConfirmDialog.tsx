import { Modal, StyleSheet, Text, View } from "react-native";
import { Button } from "./Button";
import { theme } from "../core/theme/theme";

type Props = {
  visible: boolean;
  title: string;
  message: string;
  confirmLabel: string;
  cancelLabel: string;
  onConfirm: () => void;
  onCancel: () => void;
};

// Asks before a destructive action (the IonAlert of the course examples). Built on Modal
// because React Native's Alert.alert does nothing in the web build.
export function ConfirmDialog({
  visible,
  title,
  message,
  confirmLabel,
  cancelLabel,
  onConfirm,
  onCancel,
}: Props) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onCancel}>
      <View style={styles.overlay}>
        <View style={styles.dialog} accessibilityRole="alert" aria-modal>
          <Text style={styles.title} accessibilityRole="header">
            {title}
          </Text>
          <Text style={styles.message}>{message}</Text>
          <Button label={confirmLabel} onPress={onConfirm} variant="danger" />
          <Button label={cancelLabel} onPress={onCancel} variant="text" />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    padding: theme.space.lg,
  },
  dialog: {
    width: "100%",
    maxWidth: 400,
    alignSelf: "center",
    backgroundColor: theme.color.surface,
    borderRadius: theme.radius.md,
    padding: theme.space.lg,
    gap: theme.space.sm,
  },
  title: { ...theme.text.subtitle, color: theme.color.text },
  message: { ...theme.text.body, color: theme.color.textMuted, marginBottom: theme.space.sm },
});
