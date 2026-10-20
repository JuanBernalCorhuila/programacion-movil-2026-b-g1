import { AuthRepository } from "./AuthRepository";

export class Logout {
  constructor(private repository: AuthRepository) {}

  execute(): Promise<void> {
    return this.repository.logout();
  }
}
