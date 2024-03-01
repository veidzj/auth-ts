export class InvalidCredentialsError extends Error {
  constructor() {
    super('Invalid credentials')
    this.name = 'Authentication'
    Error.captureStackTrace(this, this.constructor)
  }
}
