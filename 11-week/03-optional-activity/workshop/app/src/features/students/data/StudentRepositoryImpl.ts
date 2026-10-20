import { apiFetch } from "../../../core/network/apiFetch";
import { cache } from "../../../core/storage/cache";
import { NetworkError } from "../../../core/errors";
import { Student } from "../domain/Student";
import { StudentRepository } from "../domain/StudentRepository";

// See docs/03-api-and-data/offline-sync.md (read-through cache) and
// docs/03-api-and-data/persistence.md (cache:students:list key).
export class StudentRepositoryImpl implements StudentRepository {
  async getStudents(): Promise<{ students: Student[]; fromCache: boolean }> {
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

  async createStudent(name: string, documentNumber: string): Promise<Student> {
    // No offline queue — see docs/03-api-and-data/offline-sync.md. If this fails, it fails;
    // the screen shows the error, it is never queued to retry automatically.
    return apiFetch<Student>("/students", {
      method: "POST",
      body: { name, documentNumber },
    });
  }
}
