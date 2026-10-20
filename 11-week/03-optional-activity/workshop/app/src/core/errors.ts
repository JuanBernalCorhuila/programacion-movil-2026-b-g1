// Plain try/catch + typed Error subclasses — no Result/Either wrapper.
// See docs/02-code-and-ui/coding-standards.md.

export class AppError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}

/** Wrong username/password, or a 401 from any authenticated request. */
export class AuthError extends AppError {}

/** Request failed for a reason unrelated to auth or validation (timeout, 5xx, bad payload). */
export class NetworkError extends AppError {}

/** Backend rejected the input (e.g. duplicate document number, empty field). */
export class ValidationError extends AppError {}

/** No connectivity — detected client-side before attempting the request. */
export class OfflineError extends AppError {
  constructor() {
    super("Sin conexión");
  }
}
