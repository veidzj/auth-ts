export class AccountNotFoundError extends Error {
  constructor() {
    super('Account not found')
    this.name = 'Not Found'
    Error.captureStackTrace(this, this.constructor)
  }
}
