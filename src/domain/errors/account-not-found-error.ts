export class AccountNotFoundError extends Error {
  constructor() {
    super('Account not found')
    this.name = 'Authentication'
    Error.captureStackTrace(this, this.constructor)
  }
}
