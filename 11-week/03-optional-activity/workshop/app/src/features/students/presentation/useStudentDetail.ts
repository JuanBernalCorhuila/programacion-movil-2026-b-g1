import { useCallback, useEffect, useState } from "react";
import { container } from "../../../core/di/container";
import { Student } from "../domain/Student";

// States from docs/01-architecture/screens/student-detail.md (Loading, Loaded, Error) plus
// "notFound" for an id that matches no student — the screen has no "Empty" state.
type StudentDetailState =
  | { status: "loading" }
  | { status: "loaded"; student: Student }
  | { status: "notFound" }
  | { status: "error" };

export function useStudentDetail(studentId: string) {
  const [state, setState] = useState<StudentDetailState>({ status: "loading" });

  const load = useCallback(async () => {
    setState({ status: "loading" });
    try {
      const student = await container.students.getStudentById.execute(studentId);
      setState(student ? { status: "loaded", student } : { status: "notFound" });
    } catch {
      setState({ status: "error" });
    }
  }, [studentId]);

  useEffect(() => {
    load();
  }, [load]);

  return { state, reload: load };
}
