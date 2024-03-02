export class InvalidCredentialsError extends Error {
  constructor() {
    super('Invalid credentials')
    this.name = 'Unauthorized'
    Error.captureStackTrace(this, this.constructor)
  }
}
