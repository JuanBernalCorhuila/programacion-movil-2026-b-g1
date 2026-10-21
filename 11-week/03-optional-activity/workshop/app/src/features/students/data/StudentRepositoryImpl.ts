import { apiFetch } from "../../../core/network/apiFetch";
import { cache } from "../../../core/storage/cache";
import { NetworkError } from "../../../core/errors";
import { Student } from "../domain/Student";
import { StudentRepository } from "../domain/StudentRepository";

// Week 11 workshop: lets the list screen be forced into its loading, error and empty states
// without touching the backend. Set in app/.env, e.g. EXPO_PUBLIC_SIMULATE_DELAY_MS=3000
// or EXPO_PUBLIC_SIMULATE_FAILURE=true, or EXPO_PUBLIC_SIMULATE_EMPTY=true. All are off when
// the variables are missing.
const SIMULATED_DELAY_MS = Number(process.env.EXPO_PUBLIC_SIMULATE_DELAY_MS ?? 0);
const SIMULATE_FAILURE = process.env.EXPO_PUBLIC_SIMULATE_FAILURE === "true";
const SIMULATE_EMPTY = process.env.EXPO_PUBLIC_SIMULATE_EMPTY === "true";

// See docs/03-api-and-data/offline-sync.md (read-through cache) and
// docs/03-api-and-data/persistence.md (cache:students:list key).
export class StudentRepositoryImpl implements StudentRepository {
  async getStudents(): Promise<{ students: Student[]; fromCache: boolean }> {
    if (SIMULATED_DELAY_MS > 0) {
      await new Promise((resolve) => setTimeout(resolve, SIMULATED_DELAY_MS));
    }
    if (SIMULATE_FAILURE) {
      throw new NetworkError("Falla simulada");
    }
    if (SIMULATE_EMPTY) {
      return { students: [], fromCache: false };
    }
    try {
      const students = await apiFetch<Student[]>("/students");
      await cache.set(cache.keys.studentsList, students);
      return { students, fromCache: false };
    } catch (err) {
      // Fall back to cache only on a network-ish failure — a validation/auth error should
      // still surface normally, it's not "we're offline."
      if (err instanceof NetworkError) {
        const cached = await cache.get<Student[]>(cache.keys.studentsList);
        if (cached) return { students: cached, fromCache: true };
      }
      throw err;
    }
  }

  // `GET /students/:id` (api-contract.md E-04) does not exist yet in the backend (gap G-06), so
  // the student is looked up in the list response. When E-04 ships, only this method changes.
  async getStudentById(id: string): Promise<Student | null> {
    const { students } = await this.getStudents();
    return students.find((student) => student.id === id) ?? null;
  }

  async createStudent(name: string, documentNumber: string): Promise<Student> {
    // No offline queue — see docs/03-api-and-data/offline-sync.md. If this fails, it fails;
    // the screen shows the error, it is never queued to retry automatically.
    return apiFetch<Student>("/students", {
      method: "POST",
      body: { name, documentNumber },
    });
  }
}
