import { AuthRepository } from "./AuthRepository";

// One use case = one business action — see docs/01-architecture/layers-and-state.md.
export class Login {
  constructor(private repository: AuthRepository) {}

  execute(username: string, password: string): Promise<void> {
    return this.repository.login(username, password);
  }
}
