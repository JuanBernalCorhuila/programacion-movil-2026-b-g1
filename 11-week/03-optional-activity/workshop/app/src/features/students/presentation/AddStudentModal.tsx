import { useState } from "react";
import { Modal, StyleSheet, Text, View } from "react-native";
import { Button } from "../../../shared/Button";
import { TextField } from "../../../shared/TextField";
import { theme } from "../../../core/theme/theme";
import { ConfirmDialog } from "../../../shared/ConfirmDialog";
import { Student } from "../domain/Student";
import { useStudentForm } from "./useStudentForm";
import { strings } from "./strings";
import {
  DOCUMENT_MAX_LENGTH,
  NAME_MAX_LENGTH,
  validateDocumentNumber,
  validateName,
} from "../domain/validateStudent";

type Props = {
  visible: boolean;
  onClose: () => void;
  onCreated: (student: Student) => void;
};

// "Add student" modal — see docs/01-architecture/screens/student-list.md.
export function AddStudentModal({ visible, onClose, onCreated }: Props) {
  const [name, setName] = useState("");
  const [documentNumber, setDocumentNumber] = useState("");
  // A field shows its message only after the trainer leaves it, not while typing the first letter.
  const [touched, setTouched] = useState({ name: false, documentNumber: false });
  const [confirmDiscard, setConfirmDiscard] = useState(false);

  const { state, submit, reset } = useStudentForm((student) => {
    onCreated(student);
    handleClose();
  });

  function handleClose() {
    setName("");
    setDocumentNumber("");
    setTouched({ name: false, documentNumber: false });
    setConfirmDiscard(false);
    reset();
    onClose();
  }

  // Closing an empty form loses nothing; closing a filled one asks first (audit finding 14).
  function handleCancel() {
    if (name.trim() || documentNumber.trim()) setConfirmDiscard(true);
    else handleClose();
  }

  const isSubmitting = state.status === "submitting";
  const nameError = validateName(name);
  const documentError = validateDocumentNumber(documentNumber);
  const canSave = !nameError && !documentError && !isSubmitting;

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={handleCancel}>
      <View style={styles.overlay}>
        <View style={styles.sheet}>
          <Text style={styles.title} accessibilityRole="header">
            {strings.modal.title}
          </Text>
          <TextField
            label={strings.modal.nameLabel}
            value={name}
            onChangeText={setName}
            onBlur={() => setTouched((t) => ({ ...t, name: true }))}
            error={touched.name && nameError ? strings.modal.validation.name[nameError] : null}
            maxLength={NAME_MAX_LENGTH}
            autoCapitalize="words"
            editable={!isSubmitting}
          />
          <TextField
            label={strings.modal.documentLabel}
            value={documentNumber}
            // Usability test (docs/08-usability-test.md, problem 1): people write their cédula
            // with dots; they are removed as they type instead of blocking the last digits.
            onChangeText={(text) => setDocumentNumber(text.replace(/[.\s]/g, ""))}
            onBlur={() => setTouched((t) => ({ ...t, documentNumber: true }))}
            error={
              touched.documentNumber && documentError
                ? strings.modal.validation.documentNumber[documentError]
                : null
            }
            // Room for the 3 dots of a 10-digit cédula, so pasting "1.075.887.654" is not cut.
            maxLength={DOCUMENT_MAX_LENGTH + 3}
            keyboardType="numeric"
            editable={!isSubmitting}
          />

          {state.status === "error" && (
            <Text style={styles.error} accessibilityRole="alert">
              {state.errorMessage}
            </Text>
          )}

          <Button
            label={strings.modal.saveButton}
            onPress={() => submit(name.trim(), documentNumber.trim())}
            disabled={!canSave}
            loading={isSubmitting}
          />
          <Button
            label={strings.modal.cancelButton}
            onPress={handleCancel}
            variant="text"
            disabled={isSubmitting}
          />
        </View>
        <ConfirmDialog
          visible={confirmDiscard}
          title={strings.modal.discardConfirm.title}
          message={strings.modal.discardConfirm.message}
          confirmLabel={strings.modal.discardConfirm.confirm}
          cancelLabel={strings.modal.discardConfirm.cancel}
          onConfirm={handleClose}
          onCancel={() => setConfirmDiscard(false)}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.4)", justifyContent: "flex-end" },
  sheet: {
    width: "100%",
    maxWidth: theme.layout.maxContentWidth,
    alignSelf: "center",
    backgroundColor: theme.color.surface,
    borderTopLeftRadius: theme.radius.md,
    borderTopRightRadius: theme.radius.md,
    padding: theme.space.lg,
    gap: theme.space.sm,
  },
  title: { ...theme.text.subtitle, color: theme.color.text, marginBottom: theme.space.sm },
  error: { color: theme.color.error, ...theme.text.caption, marginBottom: theme.space.sm },
});
