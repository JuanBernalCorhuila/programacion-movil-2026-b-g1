import { useCallback, useEffect, useState } from "react";
import { container } from "../../../core/di/container";
import { Student } from "../domain/Student";

// Exact shape from docs/01-architecture/features/students.md:
// StudentListState { status: 'loading' | 'loaded' | 'empty' | 'error', students: Student[] }
//
// GAP FOUND (worth adding to docs): screens/student-list.md lists "Offline" as its own row
// in the States table (cached list + banner + disabled "+"), but the State object above has
// no field to represent that — a successful read-through-cache fetch is indistinguishable
// from a normal 'loaded' state. Reconciled here with one extra field, `isOffline`, which
// isn't in the documented type. Flagging this rather than silently deciding it doesn't matter.
type StudentListState = {
  status: "loading" | "loaded" | "empty" | "error";
  students: Student[];
  isOffline: boolean;
};

export function useStudentList() {
  const [state, setState] = useState<StudentListState>({
    status: "loading",
    students: [],
    isOffline: false,
  });

  const load = useCallback(async () => {
    setState((prev) => ({ ...prev, status: "loading" }));
    try {
      const { students, fromCache } = await container.students.getStudents.execute();
      setState({
        status: students.length === 0 ? "empty" : "loaded",
        students,
        isOffline: fromCache,
      });
    } catch {
      // NetworkError with no cache available falls through to here (see
      // StudentRepositoryImpl) — everything else (validation/auth) also lands here since
      // this screen only has one failure state per the doc ("Error — Message + retry").
      setState((prev) => ({ ...prev, status: "error" }));
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { state, reload: load };
}
