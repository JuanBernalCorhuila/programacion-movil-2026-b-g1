// No DI library — for a project this size, manually wiring repositories once here is
// simpler than learning a DI framework. See docs/01-architecture/project-structure.md
// (core/di is the composition root).

import { AuthRepositoryImpl } from "../../features/auth/data/AuthRepositoryImpl";
import { Login } from "../../features/auth/domain/Login";
import { Logout } from "../../features/auth/domain/Logout";
import { StudentRepositoryImpl } from "../../features/students/data/StudentRepositoryImpl";
import { CreateStudent } from "../../features/students/domain/CreateStudent";
import { GetStudents } from "../../features/students/domain/GetStudents";

const authRepository = new AuthRepositoryImpl();
const studentRepository = new StudentRepositoryImpl();

export const container = {
  auth: {
    repository: authRepository,
    login: new Login(authRepository),
    logout: new Logout(authRepository),
  },
  students: {
    repository: studentRepository,
    getStudents: new GetStudents(studentRepository),
    createStudent: new CreateStudent(studentRepository),
  },
};
