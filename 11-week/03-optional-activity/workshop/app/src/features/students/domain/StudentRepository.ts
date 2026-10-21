import { Student } from "./Student";

export interface StudentRepository {
  /**
   * Read-through cache: on a network failure, falls back to cached data (fromCache: true)
   * instead of throwing — see docs/03-api-and-data/offline-sync.md. Throws only if the
   * fetch fails AND there's no cache.
   */
  getStudents(): Promise<{ students: Student[]; fromCache: boolean }>;
  /** One student by id, or null when no student has that id. */
  getStudentById(id: string): Promise<Student | null>;
  /** Requires connectivity — never queued. Throws ValidationError on a duplicate document. */
  createStudent(name: string, documentNumber: string): Promise<Student>;
}
