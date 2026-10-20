import { Student } from "./Student";
import { StudentRepository } from "./StudentRepository";

export class CreateStudent {
  constructor(private repository: StudentRepository) {}

  // HU5-CA2 (unique document) is enforced by the backend; this use case doesn't duplicate
  // that check — see docs/03-api-and-data/endpoints/students-create.md.
  execute(name: string, documentNumber: string): Promise<Student> {
    return this.repository.createStudent(name, documentNumber);
  }
}
