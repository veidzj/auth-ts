export class InvalidCredentialsError extends Error {
  constructor() {
    super('Invalid credentials')
    this.name = this.constructor.name
  }
}
