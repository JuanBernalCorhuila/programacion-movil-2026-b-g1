import { useCallback, useState } from "react";
import { container } from "../../../core/di/container";
import { strings } from "./strings";
import { Student } from "../domain/Student";
import { ConflictError } from "../../../core/errors";

// Exact shape from docs/01-architecture/features/students.md:
// StudentFormState { status: 'idle' | 'submitting' | 'success' | 'error', errorMessage?: string }
type StudentFormState = {
  status: "idle" | "submitting" | "success" | "error";
  errorMessage?: string;
};

export function useStudentForm(onSuccess: (student: Student) => void) {
  const [state, setState] = useState<StudentFormState>({ status: "idle" });

  const submit = useCallback(
    async (name: string, documentNumber: string) => {
      setState({ status: "submitting" });
      try {
        const student = await container.students.createStudent.execute(name, documentNumber);
        setState({ status: "success" });
        onSuccess(student);
      } catch (err) {
        // A 409 is the duplicate document (HU5-CA2); anything else keeps the generic message.
        const errorMessage =
          err instanceof ConflictError
            ? strings.modal.duplicateDocumentError
            : strings.modal.genericError;
        setState({ status: "error", errorMessage });
      }
    },
    [onSuccess]
  );

  const reset = useCallback(() => setState({ status: "idle" }), []);

  return { state, submit, reset };
}