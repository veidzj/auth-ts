export class AccountAlreadyExistsError extends Error {
  constructor() {
    super('Account already exists')
    this.name = 'Conflict'
    Error.captureStackTrace(this, this.constructor)
  }
}
