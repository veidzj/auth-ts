export class AccountAlreadyActivatedError extends Error {
  constructor() {
    super('Account already activated')
    this.name = 'Conflict'
    Error.captureStackTrace(this, this.constructor)
  }
}
