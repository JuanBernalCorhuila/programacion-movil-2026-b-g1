import { Student } from "./Student";
import { StudentRepository } from "./StudentRepository";

export class GetStudents {
  constructor(private repository: StudentRepository) {}

  execute(): Promise<{ students: Student[]; fromCache: boolean }> {
    return this.repository.getStudents();
  }
}
