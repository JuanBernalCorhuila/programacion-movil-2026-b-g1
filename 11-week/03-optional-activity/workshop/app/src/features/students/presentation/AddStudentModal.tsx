import { useState } from "react";
import { Modal, StyleSheet, Text, View } from "react-native";
import { Button } from "../../../shared/Button";
import { TextField } from "../../../shared/TextField";
import { theme } from "../../../core/theme/theme";
import { useStudentForm } from "./useStudentForm";
import { strings } from "./strings";

type Props = {
  visible: boolean;
  onClose: () => void;
  onCreated: () => void;
};

// "Add student" modal — see docs/01-architecture/screens/student-list.md.
export function AddStudentModal({ visible, onClose, onCreated }: Props) {
  const [name, setName] = useState("");
  const [documentNumber, setDocumentNumber] = useState("");

  const { state, submit, reset } = useStudentForm(() => {
    onCreated();
    handleClose();
  });

  function handleClose() {
    setName("");
    setDocumentNumber("");
    reset();
    onClose();
  }

  const isSubmitting = state.status === "submitting";
  const canSave = name.trim().length > 0 && documentNumber.trim().length > 0 && !isSubmitting;

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={handleClose}>
      <View style={styles.overlay}>
        <View style={styles.sheet}>
          <TextField
            label={strings.modal.nameLabel}
            value={name}
            onChangeText={setName}
            editable={!isSubmitting}
          />
          <TextField
            label={strings.modal.documentLabel}
            value={documentNumber}
            onChangeText={setDocumentNumber}
            keyboardType="numeric"
            editable={!isSubmitting}
          />

          {state.status === "error" && <Text style={styles.error}>{state.errorMessage}</Text>}

          <Button
            label={strings.modal.saveButton}
            onPress={() => submit(name.trim(), documentNumber.trim())}
            disabled={!canSave}
            loading={isSubmitting}
          />
          <Button label="Cancelar" onPress={handleClose} variant="text" disabled={isSubmitting} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.4)", justifyContent: "flex-end" },
  sheet: {
    backgroundColor: theme.color.surface,
    borderTopLeftRadius: theme.radius.md,
    borderTopRightRadius: theme.radius.md,
    padding: theme.space.lg,
    gap: theme.space.sm,
  },
  error: { color: theme.color.error, ...theme.text.caption, marginBottom: theme.space.sm },
});
