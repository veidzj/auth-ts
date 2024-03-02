export class AccountAlreadyDeactivatedError extends Error {
  constructor() {
    super('Account already deactivated')
    this.name = 'Conflict'
    Error.captureStackTrace(this, this.constructor)
  }
}
