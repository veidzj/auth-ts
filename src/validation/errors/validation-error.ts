export class ValidationError extends Error {
  constructor(errorMessage: string) {
    super(errorMessage)
    Error.captureStackTrace(this, this.constructor)
  }
}
