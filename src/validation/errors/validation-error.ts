export class ValidationError extends Error {
  constructor(errorMessage: string) {
    super(errorMessage)
    this.name = 'Validation'
    Error.captureStackTrace(this, this.constructor)
  }
}
