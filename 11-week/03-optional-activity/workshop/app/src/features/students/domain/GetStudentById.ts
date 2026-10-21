import { Student } from "./Student";
import { StudentRepository } from "./StudentRepository";

export class GetStudentById {
  constructor(private repository: StudentRepository) {}

  execute(id: string): Promise<Student | null> {
    return this.repository.getStudentById(id);
  }
}
