import { useCallback, useState } from "react";
import { container } from "../../../core/di/container";
import { strings } from "./strings";

// Exact shape from docs/01-architecture/features/students.md:
// StudentFormState { status: 'idle' | 'submitting' | 'success' | 'error', errorMessage?: string }
type StudentFormState = {
  status: "idle" | "submitting" | "success" | "error";
  errorMessage?: string;
};

export function useStudentForm(onSuccess: () => void) {
  const [state, setState] = useState<StudentFormState>({ status: "idle" });

  const submit = useCallback(
    async (name: string, documentNumber: string) => {
      setState({ status: "submitting" });
      try {
        await container.students.createStudent.execute(name, documentNumber);
        setState({ status: "success" });
        onSuccess();
      } catch {
        // We genuinely can't tell "duplicate document" apart from any other backend
        // validation error without parsing its message text — and parsing error strings is
        // fragile. Being honestly generic beats being specific but sometimes wrong.
        setState({ status: "error", errorMessage: strings.modal.genericError });
      }
    },
    [onSuccess]
  );

  const reset = useCallback(() => setState({ status: "idle" }), []);

  return { state, submit, reset };
}